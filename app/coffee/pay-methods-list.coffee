payMethodsList = require 'jade/pay-methods-list'

module.exports = class PaymentMethodsList

  constructor: ($el, paymentMethods, onAddPayMethCb) ->
    list = payMethodsList
    @$list = $ payMethodsList( {paymentMethods: paymentMethods} )
    $el.append @$list
    castShadows @$list
    $("#add-payment-method", @$list).on 'click', onAddPayMethCb

  hide : () -> @$list.addClass 'hidden'
  show : () -> @$list.removeClass 'hidden'
