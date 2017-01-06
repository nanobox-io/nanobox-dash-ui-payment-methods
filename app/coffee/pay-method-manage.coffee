payMethodManage = require 'jade/pay-method-manage'
CreditCard      = require 'pay-method/credit-card'

module.exports = class PayMethodManage

  constructor: (@$el, @data, @brainTreeAuthoToken, @checkForErrors, onCancel, onReplaceWithNew, @onRename, @onUpdateCard, @onDelete) ->
    @addIcon()
    @$node = $ payMethodManage( @data )
    @$el.append @$node
    castShadows @$node
    lexify @$node

    $("input#name"      , @$node).on 'input', (e)=> @onNameInput(e)
    $("#delete"         , @$node).on 'click', (e)=> @deleteAccountClick(e)
    $("#update-with-new", @$node).on 'click', (e)=> onReplaceWithNew @data
    $("#cancel"         , @$node).on 'click', (e)=> onCancel()
    $("#back-btn"       , @$node).on 'click', (e)=> onCancel()
    $("#update-extras"  , @$node).on 'click', (e)=> @addExtras()
    $("#rename"         , @$node).on 'click', (e)=> @onRename @data, $("input#name", @$node).val(), (result)=> @checkForErrors(result, null, true)

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


  destroy : ()->
    @$node.remove()

  refreshPage : () -> setTimeout "location.reload(true);", 1000
