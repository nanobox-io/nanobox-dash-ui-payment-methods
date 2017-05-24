payMethodsList = require 'jade/pay-methods-list'

module.exports = class PaymentMethodsList

  constructor: ($el, paymentMethods, onAddPayMethCb, managePayMethCb) ->
    list = payMethodsList
    @setNames paymentMethods
    @$list = $ payMethodsList( {paymentMethods: paymentMethods} )
    $el.append @$list
    castShadows @$list
    $("#add-payment-method", @$list).on 'click', ()-> onAddPayMethCb()
    $(".manage.button", @$list).on 'click', (e)-> managePayMethCb e.currentTarget.dataset.id

  setNames : (paymentMethods) ->
    for paymentMethod in paymentMethods
      if paymentMethod.kind == "card"
        paymentMethod.name = "Credit Card"
      else if paymentMethod.kind == "paypal"
        paymentMethod.name = "Paypal"
      else
        paymentMethod.name = "Direct"

  hide : () -> @$list.addClass 'hidden'
  show : () -> @$list.removeClass 'hidden'
