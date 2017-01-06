creditCard    = require 'jade/pay-methods/credit-card'
PaymentMethod = require 'pay-method/payment-method'

module.exports = class CreditCard extends PaymentMethod

  constructor: (@$el, @authToken, @$submitBtn, @currentVals) ->
    console.log @$submitBtn
    @creatingFromScratch = !@currentVals?
    @initBraintree()
    $("#submit-cc").on 'click', @tokenizeFields
    super()

  initBraintree : () ->
    @$node = $ creditCard( {creatingFromScratch:@creatingFromScratch} )
    @$el.append @$node

    # Initialize the braintree js client
    braintree.client.create {authorization: @authToken}, (err, clientInstance)=>
      if err then console.log "errored : " + err; return

      options =
        client: clientInstance
        styles:
          input : {"font-size":"19px", color:"white", "font-family":'Consolas,"Courier New",Courier,"Lucida Sans Typewriter","Lucida Typewriter",monaco,monospace'}, '::-webkit-input-placeholder' : {'color': '#0092e6'}, ':-moz-placeholder' : {'color': '#0092e6'}, '::-moz-placeholder' : {'color': '#0092e6'}, ':-ms-input-placeholder' : {'color': '#0092e6'}
        fields:
          number         : {selector: '#card-number'}
          cvv            : {selector: '#cvv',}
          expirationDate : {placeholder: "mm / yy", selector: '#expiration-date'}

      # No current Values, we're creating from scratch
      if !@creatingFromScratch then delete options.fields.number

      # Create the braintree iframe fields
      braintree.hostedFields.create options, (hostedFieldsErr, @hostedFieldsInstance)=>
        if (hostedFieldsErr) then return

        # As users edits fields, make sure the fields are filled with potentiall valid vals
        @hostedFieldsInstance.on 'validityChange', @checkFormSubmissionReadiness
        @hostedFieldsInstance.on 'notEmpty', @checkFormSubmissionReadiness
        @$node.removeClass 'loading'

  # When validity of fields change, or become not empty, check if entire form is ready for submission
  checkFormSubmissionReadiness : (e) =>
    for key, field of @hostedFieldsInstance.getState().fields
      # If any field is invalid..
      if !field.isValid
        @updateSubtmiBtn false
        return
    # All fields passed validity check, form is valid
    @updateSubtmiBtn true

  updateSubtmiBtn : (isReady) ->
    if isReady
      @$submitBtn.removeClass 'disabled'
    else
      @$submitBtn.addClass 'disabled'

  # Tokenize the fields
  tokenizeFields : (cb) =>
    @hostedFieldsInstance.tokenize {vault: true}, (tokenizeErr, payload)=>
      if tokenizeErr
        cb tokenizeErr, null
        switch tokenizeErr.code
          when 'HOSTED_FIELDS_FIELDS_EMPTY'
            console.error 'All fields are empty! Please fill out the form.'
          when 'HOSTED_FIELDS_FIELDS_INVALID'
            console.error 'Some fields are invalid:', tokenizeErr.details.invalidFieldKeys
          when 'HOSTED_FIELDS_FAILED_TOKENIZATION'
            console.error 'Tokenization failed server side. Is the card valid?'
          when 'HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR'
            console.error 'Network error occurred when tokenizing.'
          else
            console.error 'Something bad happened!', tokenizeErr

      else
        cb null, payload.nonce
        console.log('Got nonce:', payload.nonce);
