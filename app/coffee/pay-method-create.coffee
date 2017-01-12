payMethodCreate  = require 'jade/pay-method-create'
CreditCard       = require 'pay-method/credit-card'
PayPal           = require 'pay-method/pay-pal'
Direct           = require 'pay-method/direct'

module.exports = class PayMethodCreate

  constructor: ($el, @paymentMethods, @destroyCb, @brainTreeAuthoToken, currentItemData, @createPayMethod, @replacePaymentMethod, @checkForErrors, @clearErrors) ->
    curItemData = @prepareCurrentData currentItemData, @paymentMethods
    @$node = $ payMethodCreate( {apps:[], paymentMethods:@paymentMethods, currentData:curItemData} )
    @$paymentHolder = $ ".payment-holder", @$node
    $el.append @$node
    castShadows @$node
    lexify @$node

    # New, or existing card
    $("input[name='new-or-existing']", @$node).on 'click', (e)=>
      @switchNewOrExisting e.currentTarget.value

    # Payment method chooser (credit, paypal, etc)
    $("input[name='pay-methods']", @$node).on 'click', (e)=>
      @switchPaymentMethod e.currentTarget.value

    $("#back-btn", @$node).on 'click', @destroyCb

    # Default
    kind = if curItemData.replaceExisting then curItemData.kind else 'card'
    $("input[value='#{kind}']", @$node).trigger 'click'

  switchPaymentMethod : (kind) ->
    @removeOldPayMethod()
    @clearErrors()
    @$node.removeClass "card paypal direct"
    @$node.addClass kind
    switch kind
      when 'card'
        @$saveBtn      = $("#save", @$node)
        @paymentMethod = new CreditCard @$paymentHolder, @brainTreeAuthoToken, @$saveBtn, null
        @$saveBtn.removeClass 'hidden'
        @$saveBtn.on 'click', ()=>
          @clearErrors()
          @paymentMethod.tokenizeFields(@onSubmitComplete)

      when 'paypal'
        @paymentMethod = new PayPal @$paymentHolder, @brainTreeAuthoToken, @onSubmitComplete
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

  # ------------------------------------ Called on payment submission complete

  onSubmitComplete : (err, nonce, extraData)=>
    if err?
      @checkForErrors {error:err}
    else
      newData =
        name : $("input#name", @$node).val()
        kind : $("input[name='pay-methods']:checked", @$node).val()

      newData[key] = val for key, val of extraData

      # New payment method from scratch
      if $("input[name='new-or-existing']:checked", @$node).val() == "new" || @paymentMethods.length == 0
        @createPayMethod newData, nonce, (results)=> @checkForErrors(results, null, true)
      else
        @replacePaymentMethod @getReplaceeData(), newData, nonce, (results)=> @checkForErrors(results, null, true)


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

  # Get the data for the payment method we are replacing
  getReplaceeData : () ->
    id = $('select#payment-methods').val()
    for paymentMethod in @paymentMethods
      if paymentMethod.id == id
        return paymentMethod
