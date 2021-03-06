creditCard    = require 'jade/pay-methods/credit-card'
PaymentMethod = require 'pay-method/payment-method'

module.exports = class CreditCard extends PaymentMethod

  constructor: (@$el, @authToken, @$submitBtn, @currentVals) ->
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
          input : {"font-size":"20px", color:"#384D59", "font-family":'monospace'}, height:"50px",  '::-webkit-input-placeholder' : {'color': '#b3b3b3'}, ':-moz-placeholder' : {'color': '#b3b3b3'}, '::-moz-placeholder' : {'color': '#b3b3b3'}, ':-ms-input-placeholder' : {'color': '#b3b3b3'}
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
        switch tokenizeErr.code
          when 'HOSTED_FIELDS_FIELDS_EMPTY'
            cb 'All fields are empty! Please fill out the form.'
          when 'HOSTED_FIELDS_FIELDS_INVALID'
            cb 'Some fields are invalid:' #, tokenizeErr.details.invalidFieldKeys
          when 'HOSTED_FIELDS_FAILED_TOKENIZATION'
            cb 'Tokenization failed server side. Is the card valid?'
          when 'HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR'
            cb 'Network error occurred when tokenizing.'
          else
            cb "Something bad happened! #{tokenizeErr}"

      else
        cb null, payload.nonce
