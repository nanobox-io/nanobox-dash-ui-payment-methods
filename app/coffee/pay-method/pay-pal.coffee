PaymentMethod = require 'pay-method/payment-method'
payPal        = require 'jade/pay-methods/pay-pal'

module.exports = class PayPal extends PaymentMethod

  constructor: (@$el, @authToken, @onSubmitComplete) ->
    @$node = $ payPal( {} )
    @$el.append @$node
    @initBraintree()
    @$paypalButton = $ "button", @$node
    castShadows @$node
    super()

  initBraintree : () ->
    braintree.client.create {authorization: @authToken}, (clientErr, clientInstance)=>

      ###  NOT SURE IF THIS IS NEEDED

      Either it's needed all the time when we are charging agains a vaulted paypal method, or it needed when
       the client is initiating new purchases on a vaulted paypal method

      ........................... ###

      # Create device data collector
      braintree.dataCollector.create {client: clientInstance, paypal: true}, (err, dataCollectorInstance)=>
        if (err)
          console.log "data collector error"
          return;
        # // At this point, you should access the dataCollectorInstance.deviceData value
        # example : deviceData : "{"correlation_id":"c1bd6f958643fd53d0a0599f90a4cbac"}"
        @deviceData = dataCollectorInstance.deviceData

      # Create PayPal component
      braintree.paypal.create {client: clientInstance}, (paypalErr, paypalInstance)=>
        # TODO : We need real error handling in here
        if paypalErr
          console.log "paypal error"
          return

        @$paypalButton.on 'click', ()=>
          # Tokenize here!
          paypalInstance.tokenize {
            flow: 'vault', # This enables the Vault flow
            billingAgreementDescription: 'Any apps you add to this paypal account will be billed once monthly.',
            locale: 'en_US',
          },
            (err, tokenizationPayload)=> @onSubmitComplete err, tokenizationPayload.nonce, {deviceData : @deviceData}
