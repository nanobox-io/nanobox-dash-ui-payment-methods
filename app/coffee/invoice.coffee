invoice = require 'jade/invoice'

module.exports = class Invoice

  constructor: (@$el, @invoiceData, @checkForErrors, @payNow) ->
    if !@invoiceData.otherBillingEvents? then @invoiceData.otherBillingEvents = []
    @formatInvoiceDate()
    @formatBillingEventDates @invoiceData.appBillingEvents
    @formatBillingEventDates @invoiceData.otherBillingEvents
    @addStampMetaData()
    @$node = $ invoice( @invoiceData )
    @$el.append @$node

    if @invoiceData.state == 'pending'
      $("#pay-now", @$node).removeClass 'hidden'
      $("#pay-now", @$node).on 'click', ()=>
        @payNow @invoiceData.id, (results)=> @checkForErrors(results, null, true)

    else if @invoiceData.state == 'errored'
      $("#errored", @$node).removeClass 'hidden'
      $("#errored", @$node).on 'click', ()=>
        @payNow @invoiceData.id, (results)=> @checkForErrors(results, null, true)

    $("#print", @$el).on 'click', ()=> window.print()
    castShadows @$node

  formatBillingEventDates : (events)->
    dayMonth = (date)-> "#{('0' + date.getDay()).slice(-2)} #{nanobox.monthsAr[date.getMonth()]}"
    for event in events
      event.dateRange = "#{dayMonth(new Date(event.startAt))} - #{dayMonth(new Date(event.endAt))}"

  addStampMetaData : () ->
    switch @invoiceData.state
      when 'paid'
        @invoiceData.stampMeta =
          text  : "Paid"
          blurb : @getPaidBlurb()
      when 'pending'
        @invoiceData.stampMeta =
          text  : "Open"
          blurb : "Scheduled to charge on #{@invoiceData.payDate}"
      when 'errored'
        @invoiceData.stampMeta =
          text  : "Error"
          blurb : @invoiceData.error

  getPaidBlurb : ()->
    switch @invoiceData.paymentMethod.kind
      when 'card'   then return "via card ending in #{@invoiceData.paymentMethod.meta.lastFourDigits}"
      when 'paypal' then return "via paypal account #{@invoiceData.paymentMethod.meta.accountId}"
      when 'direct' then return "via Direct Transfer"
      else               return "Paid in Full"

  formatInvoiceDate : () ->
    if @invoiceData.state == "paid"
      @invoiceData._invoiceDate = @invoiceData.paidDate
    else
      @invoiceData._invoiceDate = @invoiceData.billingDate

    date = new Date @invoiceData._invoiceDate
    @invoiceData._invoiceDate = "#{date.getDay()} #{nanobox.monthsAr[date.getMonth()]} #{date.getFullYear()}"




  destroy : () ->
    $("#print", @$el).off()
    @$node.remove()
