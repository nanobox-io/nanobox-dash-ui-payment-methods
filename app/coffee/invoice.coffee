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
      $payNow = $("#pay-now", @$node)
      $payNow.removeClass 'hidden'
      $payNow.on 'click', ()=>
        $payNow.addClass 'ing'
        @payNow @invoiceData.id, (results)=>
          # $payNow.removeClass 'ing'
          @checkForErrors(results, null, true)

    else if @invoiceData.state == 'errored'
      $errored = $("#errored", @$node)
      $errored.removeClass 'hidden'
      $errored.on 'click', ()=>
        $errored.addClass 'ing'
        @payNow @invoiceData.id, (results)=>
          $errored.removeClass 'ing'
          @checkForErrors(results, null, true)

    $("#print", @$el).on 'click', ()=> window.print()
    castShadows @$node

  formatBillingEventDates : (events)->
    dayMonth = (date)-> "#{('0' + date.getUTCDate()).slice(-2)} #{nanobox.monthsAr[date.getUTCMonth()]}"
    for event in events
      event.dateRange = "#{dayMonth(new Date(event.startAt))} - #{dayMonth(new Date(event.endAt))}"

  addStampMetaData : () ->
    switch @invoiceData.state
      when 'paid'
        @invoiceData.stampMeta =
          text  : "Paid"
          blurb : @getPaidBlurb()
      when 'pending'
        date = new Date(@invoiceData.billingDate)
        @invoiceData.stampMeta =
          text  : "Open"
          blurb : "Scheduled to charge on : #{nanobox.monthsAr[date.getUTCMonth()]} #{date.getUTCDate()}"
      when 'errored'
        @invoiceData.stampMeta =
          text  : "Error"
          blurb : @invoiceData.error

  getPaidBlurb : ()->
    switch @invoiceData.paidVia.kind
      when 'card'   then return "via card ending in #{@invoiceData.paidVia.meta.lastFourDigits}"
      when 'paypal' then return "via paypal account #{@invoiceData.paidVia.meta.accountId}"
      when 'direct' then return "via Direct Transfer"
      else               return "Paid in Full"

  formatInvoiceDate : () ->
    if @invoiceData.state == "paid"
      @invoiceData._invoiceDate = @invoiceData.paidDate
    else
      @invoiceData._invoiceDate = @invoiceData.billingDate

    date = new Date @invoiceData._invoiceDate
    @invoiceData._invoiceDate = "#{date.getUTCDate()} #{nanobox.monthsAr[date.getUTCMonth()]} #{date.getFullYear()}"




  destroy : () ->
    $("#print", @$el).off()
    @$node.remove()
