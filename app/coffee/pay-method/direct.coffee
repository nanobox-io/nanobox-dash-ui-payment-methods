PaymentMethod = require 'pay-method/payment-method'
direct        = require 'jade/pay-methods/direct'

module.exports = class Direct extends PaymentMethod

  constructor: (@$el) ->
    @$node = $ direct( {} )
    @$el.append @$node
    castShadows @$node
    super()
