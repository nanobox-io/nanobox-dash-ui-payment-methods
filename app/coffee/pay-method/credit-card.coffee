creditCard    = require 'jade/pay-methods/credit-card'
PaymentMethod = require 'pay-method/payment-method'

module.exports = class CreditCard extends PaymentMethod

  constructor: (@$el, @authToken) ->
    @initBraintree()
    super()

  initBraintree : () ->
    @$node = $ creditCard( {} )
    @$el.append @$node


    braintree.client.create {authorization: @authToken}, (err, clientInstance)=>

      if err
        console.log "errored : " + err
        return

      azul2 = "white"
      options =
        client: clientInstance,
        styles:
          input : {"font-size":"19px", color:"white", "font-family":'Consolas,"Courier New",Courier,"Lucida Sans Typewriter","Lucida Typewriter",monaco,monospace'}
          '::-webkit-input-placeholder' : {'color': '#0092e6'}
          ':-moz-placeholder'           : {'color': '#0092e6'}
          '::-moz-placeholder'          : {'color': '#0092e6'}
          ':-ms-input-placeholder'      : {'color': '#0092e6'}
        fields:
          number:
            selector: '#card-number',
          cvv:
            selector: '#cvv',
          expirationDate:
            placeholder: "mm / yy"
            selector: '#expiration-date',

      braintree.hostedFields.create options, (hostedFieldsErr, hostedFieldsInstance)=>
        if (hostedFieldsErr)
          return;

        console.log 'worked'
        @$node.removeClass 'loading'
        # Use the Hosted Fields instance here to tokenize a card
