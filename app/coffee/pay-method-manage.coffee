payMethodManage = require 'jade/pay-method-manage'

module.exports = class PayMethodManage

  constructor: (@$el, @data, onCancel, onUpdate, @onDelete) ->
    @addIcon()
    @$node = $ payMethodManage( @data )
    @$el.append @$node
    castShadows @$node
    lexify @$node

    $("input", @$node).on 'input',   (e)=> @onNameInput(e)
    $("#delete", @$node).on 'click', (e)=> @deleteAccountClick(e)
    $("#update", @$node).on 'click', ()=> onUpdate @data
    $("#cancel", @$node).on 'click', ()=> onCancel()

  onNameInput : (e) ->
    if e.currentTarget.value != @data.name
      $("#rename", @$node).removeClass 'hidden'
    else
      $("#rename", @$node).addClass 'hidden'

  deleteAccountClick : (e) ->
    # The first time the user clicks delete, show the confirm message
    if e.currentTarget.className.indexOf("confirm") == -1
      e.currentTarget.className = "#{e.currentTarget.className} confirm"
    else
      @onDelete @data, (results)=>
        if results.error
          @addError results.error
        else
          @refreshPage()

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
