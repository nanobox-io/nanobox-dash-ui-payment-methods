PaymentMethod = require 'pay-method/payment-method'
payPal        = require 'jade/pay-methods/pay-pal'

module.exports = class PayPal extends PaymentMethod

  constructor: (@$el, @authToken) ->
    @$node = $ payPal( {} )
    @$el.append @$node
    @initBraintree()
    @$paypalButton = $ "button", @$node
    castShadows @$node
    super()

  initBraintree : () ->
    braintree.client.create {authorization: @authToken}, (clientErr, clientInstance)=>
      # Create PayPal component
      braintree.paypal.create {client: clientInstance}, (paypalErr, paypalInstance)=>
        @$paypalButton.on 'click', ()=>
          # Tokenize here!
          paypalInstance.tokenize
            flow: 'vault', # This enables the Vault flow
            billingAgreementDescription: 'Your agreement description',
            locale: 'en_US',
            enableShippingAddress: true,
            shippingAddressEditable: false,
            shippingAddressOverride:
              recipientName: 'Scruff McGruff',
              line1: '1234 Main St.',
              line2: 'Unit 1',
              city: 'Chicago',
              countryCode: 'US',
              postalCode: '60652',
              state: 'IL',
              phone: '123.456.7890'

          , (err, tokenizationPayload)=>
            if err?
              console.log "error : " + err
              return
            console.log "worked"
