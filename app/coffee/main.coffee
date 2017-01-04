PayMethodsList  = require 'pay-methods-list'
PayMethodCreate = require 'pay-method-create'

class PaymentMethods

  constructor: (@$el, @config) ->
    @list = new PayMethodsList @$el, @config.paymentMethods, @createPayMethod

  createPayMethod : () =>
    @list.hide()
    @creator = new PayMethodCreate @$el, @config.paymentMethods, @showList

  showList : () =>
    @creator.destroy()
    @list.show()


window.nanobox ||= {}
nanobox.PaymentMethods = PaymentMethods
