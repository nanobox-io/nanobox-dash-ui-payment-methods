PayMethodsList  = require 'pay-methods-list'
PayMethodCreate = require 'pay-method-create'
PayMethodManage = require 'pay-method-manage'

class PaymentMethods

  constructor: (@$el, @config) ->
    @list = new PayMethodsList @$el, @config.paymentMethods, @createPayMethod, @managePayMethod

  createPayMethod : (data) =>
    @list.hide()
    @manager?.destroy()
    @creator = new PayMethodCreate @$el, @config.paymentMethods, @showList, @config.clientToken, data

  showList : () =>
    @creator?.destroy()
    @manager?.destroy()
    @list.show()

  managePayMethod : (id)=>
    @list.hide()
    @manager = new PayMethodManage @$el, @getPaymentMethodDataById(id), @config.clientToken, @showList, @createPayMethod, @updateCard, @deletePayMethod

  updateCard : (err) ->
    if err then console.log err; return

  getPaymentMethodDataById : (id) ->
    for methData in @config.paymentMethods
      if methData.id == id
        return methData

  deletePayMethod : (data) ->
    console.log "DELETE: "
    console.log data

window.nanobox ||= {}
nanobox.PaymentMethods = PaymentMethods
