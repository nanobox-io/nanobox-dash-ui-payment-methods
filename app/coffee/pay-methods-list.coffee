payMethodsList = require 'jade/pay-methods-list'
Invoice        = require 'invoice'

module.exports = class PaymentMethodsList

  constructor: ($el, @config, onAddPayMethCb, managePayMethCb, @checkForErrors) ->
    if @config.paymentMethod[0]?
      @formatInvoicesWithDate @config.paymentMethod[0].invoices

    @setNames()
    @addIcons()

    @$list = $ payMethodsList( {paymentMethods: @config.paymentMethod, thereAreActivePMs:@areActivePMs() } )
    $el.append @$list
    castShadows @$list

    $("#add-payment-method", @$list).on 'click', ()-> onAddPayMethCb()
    $(".manage.button", @$list).on 'click', (e)-> managePayMethCb e.currentTarget.dataset.id
    $("#invoices", @$node).on 'change', (e)=> @showInvoice e.currentTarget.value
    lexify @$node

  setNames : () ->
    for paymentMethod in @config.paymentMethod
      if paymentMethod.kind == "card"
        paymentMethod.name = "Credit Card"
      else if paymentMethod.kind == "paypal"
        paymentMethod.name = "Paypal"
      else
        paymentMethod.name = "Direct"

  hide : () -> @$list.addClass 'hidden'
  show : () -> @$list.removeClass 'hidden'

  # ------------------------------------ Helpers

  formatInvoicesWithDate : (invoices) ->
    for invoice in invoices
      startAt = new Date invoice.startAt
      endAt   = new Date invoice.endAt
      invoice.title = "#{startAt.getDate()} #{nanobox.monthsAr[startAt.getUTCMonth()]} - #{endAt.getDate()} #{nanobox.monthsAr[endAt.getUTCMonth()]} : #{endAt.getFullYear()}"


  showInvoice : (id) ->
    return if @currentInvoiceId == id || id == ""
    @currentInvoiceId = id
    @config.getInvoice @currentInvoiceId, (result)=>
      if @invoice? then @invoice.destroy()
      @invoice = new Invoice $('.invoice-holder', @$node), result, @checkForErrors, @config.payInvoiceNow

  areActivePMs : () ->
    for pm in @config.paymentMethod
      if pm?
        if pm.state == 'active'
          return true
    return false

  addIcons : () ->
    for pm in @config.paymentMethod
      @addIcon pm

  addIcon : (data) ->
    return if data.icon?
    switch data.kind
      when 'direct' then data.icon = 'pay-direct'
      when 'paypal' then data.icon = 'pay-paypal'
      when 'card'

        switch data.meta.cardType.toLowerCase()
          when 'visa' then              data.icon = "visa"
          when 'mastercard' then        data.icon = "mastercard"
          when 'american express' then  data.icon = "american-express"
          when 'discover' then          data.icon = "discover"
          else                          data.icon = "default"
            # if data.meta.imageURL?
            #   data.icon = false
            #   data.image = @data.meta.imageURL
