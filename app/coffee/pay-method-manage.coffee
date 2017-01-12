payMethodManage = require 'jade/pay-method-manage'
CreditCard      = require 'pay-method/credit-card'
Invoice         = require 'invoice'

module.exports = class PayMethodManage

  constructor: (@$el, @data, @brainTreeAuthoToken, @checkForErrors, onCancel, @retrieveInvoice, onReplaceWithNew, @onRename, @onUpdateCard, @onDelete) ->
    @formatInvoicesWithDate @data.invoices
    @addIcon()
    @$node = $ payMethodManage( @data )
    @$el.append @$node
    castShadows @$node
    lexify @$node

    $("input#name"      , @$node).on 'input' , (e)=> @onNameInput(e)
    $("#delete"         , @$node).on 'click' , (e)=> @deleteAccountClick(e)
    $("#update-with-new", @$node).on 'click' , (e)=> onReplaceWithNew @data
    $("#cancel"         , @$node).on 'click' , (e)=> onCancel()
    $("#back-btn"       , @$node).on 'click' , (e)=> onCancel()
    $("#update-extras"  , @$node).on 'click' , (e)=> @addExtras()
    $("#rename"         , @$node).on 'click' , (e)=> @onRename @data, $("input#name", @$node).val(), (result)=> @checkForErrors(result, null, true)
    $("#invoices"       , @$node).on 'change', (e)=> @showInvoice e.currentTarget.value
  onNameInput : (e) ->
    if e.currentTarget.value != @data.name
      $("#rename", @$node).removeClass 'hidden'
    else
      $("#rename", @$node).addClass 'hidden'

  addExtras : () ->
    if @data.kind == "card"
      @$saveBtn = $("#save-extras", @$node)
      $("#update-extras", @$node).addClass "hidden"
      @paymentMethod = new CreditCard $(".payment-holder", @$node), @brainTreeAuthoToken, @$saveBtn, @data
      $(".save-section", @$node).removeClass 'hidden'
      @$saveBtn.on 'click', ()=> @paymentMethod.tokenizeFields (err, nonce)=>
        if err?
          @checkForErrors {error:err}
        else
          @onUpdateCard @data, nonce, (results)=>
            @checkForErrors results, null, true

  onCardFieldsReadyForSubmit : () ->

  deleteAccountClick : (e) ->
    # The first time the user clicks delete, show the confirm message
    if @data.apps.length != 0
      e.currentTarget.className = "#{e.currentTarget.className} not-empty"
    else if e.currentTarget.className.indexOf("confirm") == -1
      e.currentTarget.className = "#{e.currentTarget.className} confirm"
    else
      @onDelete @data, (results)=> @checkForErrors(results, null, true)


  addIcon : () ->
    switch @data.kind
      when 'direct' then @data.icon = 'pay-direct'
      when 'paypal' then @data.icon = 'pay-paypal'
      when 'card'
        switch @data.meta.cardType
          when 'visa' then @data.icon = "visa"
          else
            @data.icon = false
            @data.image = @data.meta.imageURL

  formatInvoicesWithDate : (invoices) ->
    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    for invoice in invoices
      start = new Date invoice.start
      stop  = new Date invoice.stop
      invoice.title = "#{start.getDay()} #{months[start.getMonth()]} - #{stop.getDay()} #{months[stop.getMonth()]} : #{stop.getFullYear()}"


  showInvoice : (id) ->
    @retrieveInvoice id, (result)=>
      if @invoice? then @invoice.destroy()
      @invoice = new Invoice $('.invoice-holder', @$node), result

  destroy : ()->
    @$node.remove()

  refreshPage : () -> setTimeout "location.reload(true);", 1000
