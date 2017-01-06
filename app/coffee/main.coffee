paymentMethods  = require 'jade/payment-methods-parent'
PayMethodsList  = require 'pay-methods-list'
PayMethodCreate = require 'pay-method-create'
PayMethodManage = require 'pay-method-manage'

class PaymentMethods

  constructor: ($el, @config) ->
    $node = $ paymentMethods( {} )
    $el.append $node
    @$holder = $ ".pay-wrapper", $node
    @$errors = $ ".errors", $node

    @list = new PayMethodsList @$holder, @config.paymentMethods, @createPayMethod, @managePayMethod

  createPayMethod : (data) =>
    @clearErrors()
    @list.hide()
    @manager?.destroy()
    @creator = new PayMethodCreate @$holder, @config.paymentMethods, @showList, @config.clientToken, data, @config.createPaymentMethod, @config.replacePaymentMethod, @checkForErrors, @clearErrors

  showList : () =>
    @clearErrors()
    @creator?.destroy()
    @manager?.destroy()
    @list.show()

  managePayMethod : (id)=>
    @list.hide()
    @clearErrors()
    @manager = new PayMethodManage @$holder, @getPaymentMethodDataById(id), @config.clientToken, @checkForErrors, @showList, @createPayMethod, @config.renamePaymentMethod, @config.updatePaymentMethod, @config.deletePaymentMethod

  getPaymentMethodDataById : (id) ->
    for methData in @config.paymentMethods
      if methData.id == id
        return methData

  # TODO
  checkForErrors : (results, cb, doRefreshOnSuccess) =>
    isErrorFree = !results.error?
    if isErrorFree
      @clearErrors()
    else
      @addError results.error

    if cb? then cb(isErrorFree)
    if isErrorFree && doRefreshOnSuccess then @refreshPage()


  addError : (error) =>
    @$errors.text(error).removeClass 'hidden'

  clearErrors : () =>
    @$errors.addClass 'hidden'

  refreshPage : () -> setTimeout "location.reload(true);", 1000


window.nanobox ||= {}
nanobox.PaymentMethods = PaymentMethods
