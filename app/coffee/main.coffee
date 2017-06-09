paymentMethods  = require 'jade/payment-methods-parent'
PayMethodsList  = require 'pay-methods-list'
PayMethodCreate = require 'pay-method-create'
PayMethodManage = require 'pay-method-manage'
MicroChooser    = require 'micro-chooser'

class PaymentMethods

  constructor: (@$el, @config, doBuild=true) ->
    @config.paymentMethod = [@config.paymentMethod]
    nanobox.monthsAr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

    if doBuild
      $node = $ paymentMethods( {} )
      @$el.append $node
      @$holder = $ ".pay-wrapper", $node
      @$errors = $ ".errors", $node
      @list = new PayMethodsList @$holder, @config, @createPayMethod, @managePayMethod, @checkForErrors,

  createPayMethod : (data, $holder=@$holder, isStandAlone=false) =>
    @clearErrors()
    @list?.hide()
    @manager?.destroy()
    @creator = new PayMethodCreate $holder, @config.paymentMethod, @showList, @config.clientToken, data, @config.createPaymentMethod, @config.updatePaymentMethod, @checkForErrors, @clearErrors, isStandAlone

  createMicroChooser : (currentPayMethodId, changeCb) ->
    return if @config.paymentMethod.length == 0
    @microChooser = new MicroChooser(@$el, @config.paymentMethod, currentPayMethodId, changeCb)

  getMicroChooserVal : ()-> @microChooser.getVal()

  showList : () =>
    @clearErrors()
    @creator?.destroy()
    @manager?.destroy()
    @list.show()

  displayInvoice : (paymentMethodId, invoiceId) ->
    @managePayMethod paymentMethodId
    @manager.showInvoice invoiceId
    @manager.scrollToInvoice()

  managePayMethod : (id)=>
    @list.hide()
    @clearErrors()
    @manager = new PayMethodManage @$holder, @getPaymentMethodDataById(id), @config.clientToken, @checkForErrors, @showList, @createPayMethod, @config.updatePaymentMethod, @config.deletePaymentMethod

  getPaymentMethodDataById : (id) ->
    for methData in @config.paymentMethod
      if methData.id == id
        return methData

  checkForErrors : (results, cb, doRefreshOnSuccess) =>
    isErrorFree = !results.error?
    if isErrorFree
      @clearErrors()
    else
      @addError results.error
      @scrollToTop()

    if cb? then cb(isErrorFree)
    if isErrorFree && doRefreshOnSuccess then @refreshPage()

  scrollToTop : () =>
    if document.body.scrollTop != 0 || document.documentElement.scrollTop != 0
      window.scrollBy 0, -50
      requestAnimationFrame @scrollToTop

  addError : (error) =>
    if @$errors?
      @$errors.text(error).removeClass 'hidden'

  clearErrors : () =>
    if @$errors?
      @$errors.addClass 'hidden'

  refreshPage : () -> setTimeout "location.reload(true);", 1000


window.nanobox ||= {}
nanobox.PaymentMethods = PaymentMethods
