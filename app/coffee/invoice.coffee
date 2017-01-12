invoice = require 'jade/invoice'

module.exports = class Invoice

  constructor: (@$el, @invoiceData, @checkForErrors, @payNow) ->
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

  destroy : () ->
    $("#print", @$el).off()
    @$node.remove()
