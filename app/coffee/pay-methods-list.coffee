payMethodsList = require 'jade/pay-methods-list'

module.exports = class PaymentMethodsList

  constructor: ($el, paymentMethods, onAddPayMethCb, managePayMethCb) ->
    list = payMethodsList
    @$list = $ payMethodsList( {paymentMethods: paymentMethods} )
    $el.append @$list
    castShadows @$list
    $("#add-payment-method", @$list).on 'click', ()-> onAddPayMethCb()
    $(".manage.button", @$list).on 'click', (e)-> managePayMethCb e.currentTarget.dataset.id

  hide : () -> @$list.addClass 'hidden'
  show : () -> @$list.removeClass 'hidden'
