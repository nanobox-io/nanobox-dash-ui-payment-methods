payMethodManage = require 'jade/pay-method-manage'
CreditCard      = require 'pay-method/credit-card'

module.exports = class PayMethodManage

  constructor: (@$el, @data, @brainTreeAuthoToken, @checkForErrors, onCancel, onReplaceWithNew, @onUpdatePaymentMethod, @onDelete) ->
    @addIcon()
    @$node = $ payMethodManage( @data )
    @$el.append @$node
    castShadows @$node
    lexify @$node

    $("input#name"           , @$node).on 'input' , (e)=> @onFieldsEdit(e.currentTarget.value, 'name')
    $("textarea#special-data", @$node).on 'input' , (e)=> @onFieldsEdit(e.currentTarget.value, 'userInvoiceInfo')
    $("#delete"              , @$node).on 'click' , (e)=> @deleteAccountClick(e)
    $("#update-with-new"     , @$node).on 'click' , (e)=> onReplaceWithNew @data
    $("#cancel"              , @$node).on 'click' , (e)=> @restoreInfo()
    $("#back-btn"            , @$node).on 'click' , (e)=> onCancel()
    $("#update-extras"       , @$node).on 'click' , (e)=> @addExtras()
    $("#save-extras"         , @$node).on 'click' , (e)=> @onUpdateInfo()
    # If ever needed, uncomment to allow them to change the monthiversary
    # $("select#billing-day"   , @$node).on 'change', (e)=> @onFieldsEdit(Number(e.currentTarget.value), 'billingDay')

  onFieldsEdit : (newVal, key) ->
    if newVal != @data[key]
      $(".save-section", @$node).removeClass 'hidden'
    else
      if @data.name            != $("input#name",                @$node).val()  then console.log 'a'; return
      if @data.userInvoiceInfo != $("textarea#special-data",     @$node).val()  then console.log 'b'; return
      # Uncomment to allow billing day change
      # if @data.billingDay      != Number($("select#billing-day", @$node).val()) then console.log 'c'; return
      $(".save-section", @$node).addClass 'hidden'

  restoreInfo : () ->
    $(".save-section", @$node).addClass 'hidden'
    $("input#name"           , @$node).val @data.name
    $("textarea#special-data", @$node).val @data.userInvoiceInfo
    # Uncomment to allow billing day change
    # $("select#billing-day"   , @$node).val @data.billingDay

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
          @onUpdatePaymentMethod @data, nonce, (results)=>
            @checkForErrors results, null, true

  onCardFieldsReadyForSubmit : () ->

  onUpdateInfo : ()->
    @data.name            =        $("input#name"            , @$node).val()
    @data.userInvoiceInfo =        $("textarea#special-data" , @$node).val()
    # Uncomment to allow billing day change
    # @data.billingDay      = Number $("select#billing-day"    , @$node).val()

    @onUpdatePaymentMethod @data, null, (result)=> @checkForErrors(result, null, true)

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

  destroy : ()->
    @$node.remove()

  refreshPage : () -> setTimeout "location.reload(true);", 1000
