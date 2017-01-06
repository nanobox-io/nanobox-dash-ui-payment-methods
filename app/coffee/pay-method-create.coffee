payMethodCreate  = require 'jade/pay-method-create'
CreditCard       = require 'pay-method/credit-card'
PayPal           = require 'pay-method/pay-pal'
Direct           = require 'pay-method/direct'

module.exports = class PayMethodCreate

  constructor: ($el, paymentMethods, @destroyCb, @brainTreeAuthoToken, data) ->
    currentData = @prepareCurrentData data, paymentMethods
    @$node = $ payMethodCreate( {apps:[], paymentMethods:paymentMethods, currentData:currentData} )
    @$paymentHolder = $ ".payment-holder", @$node
    $el.append @$node
    castShadows @$node
    lexify @$node

    # Payment method chooser (credit, paypal, etc)
    $("input[name='new-or-existing']", @$node).on 'click', (e)=>
      @switchNewOrExisting e.currentTarget.value

    # Payment method chooser (credit, paypal, etc)
    $("input[name='pay-methods']", @$node).on 'click', (e)=>
      @switchPaymentMethod e.currentTarget.value

    $("#cancel").on 'click', @destroyCb

    # Default
    kind = if currentData.replaceExisting then currentData.kind else 'card'
    $("input[value='#{kind}']", @$node).trigger 'click'

  switchPaymentMethod : (kind) ->
    @removeOldPayMethod()
    switch kind
      when 'card'
        @paymentMethod = new CreditCard @$paymentHolder, @brainTreeAuthoToken, @onCardFieldsReadyForSubmit
        @$saveBtn      = $("#save", @$node)
        @$saveBtn.removeClass 'hidden'
        @$saveBtn.on 'click', ()=> @paymentMethod.tokenizeFields(@onSubmitComplete)

      when 'paypal'
        @paymentMethod = new PayPal @$paymentHolder, @brainTreeAuthoToken
      when 'direct'
        @paymentMethod = new Direct @$paymentHolder

  switchNewOrExisting : (val) ->
    $existingOption = $(".option#existing")
    if val == 'existing'
      $existingOption.removeClass 'disabled'
    else
      $existingOption.addClass 'disabled'

  removeOldPayMethod : () ->
    return if !@paymentMethod?
    @paymentMethod.destroy()

  destroy : () =>
    $("input[name='pay-methods']", @$node).off 'click'
    @paymentMethod.destroy()
    @$node.remove()

  # ------------------------------------ Credit Card Specific

  onCardFieldsReadyForSubmit : (isReady) =>
    if isReady
      @$saveBtn.removeClass 'disabled'
    else
      @$saveBtn.addClass 'disabled'

  onSubmitComplete : (err, nonce)=>
    return if err
    console.log nonce


  # ------------------------------------ Helpers

  prepareCurrentData : (data, paymentMethods) ->
    obj = {name:""}
    if !data? then return obj
    obj.name = data.name
    obj.replaceExisting = true
    obj.kind = data.kind
    for payMethod in paymentMethods
      if payMethod.id == data.id
        payMethod.selected = true
      else
        payMethod.selected = null

    return obj
