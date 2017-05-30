payMethodCreate  = require 'jade/pay-method-create'
CreditCard       = require 'pay-method/credit-card'
PayPal           = require 'pay-method/pay-pal'
Direct           = require 'pay-method/direct'

module.exports = class PayMethodCreate

  constructor: ($el, @paymentMethods, @destroyCb, @brainTreeAuthoToken, @currentItemData, @createPayMethod, @updatePayMethod, @checkForErrors, @clearErrors, @isStandAlone) ->
    curItemData = @prepareCurrentData @currentItemData, @paymentMethods
    @$node = $ payMethodCreate( {apps:[], paymentMethods:@paymentMethods, currentData:curItemData} )
    @$paymentHolder = $ ".payment-holder", @$node
    $el.append @$node
    castShadows @$node
    lexify @$node
    if @isStandAlone then @$node.addClass 'stand-alone'

    # Payment method chooser (credit, paypal, etc)
    $("input[name='pay-methods']", @$node).on 'click', (e)=>
      @switchPaymentMethod $(e.currentTarget), e.currentTarget.value

    $("#back-btn", @$node).on 'click', @destroyCb

    # Default
    kind = if curItemData.replaceExisting then curItemData.kind else 'card'
    if !kind? then kind = 'card'
    $("input[value='#{kind}']", @$node).trigger 'click'

  switchPaymentMethod : (@$el, kind) ->
    @clearErrors()
    $('label').removeClass 'active'                # Deactivate currently selected tab
    $(@$el.parent()).parent().addClass 'active'    # activate new tab
    @removeOldPayMethod()                          # Reset ui :
    @$node.removeClass "card paypal direct"
    @$node.addClass kind
    # Add UI for the apropriate payment method kind:
    switch kind
      when 'card'
        @setSaveBtn $("#save", @$node)
        @paymentMethod = new CreditCard @$paymentHolder, @brainTreeAuthoToken, @$saveBtn, null
        @$saveBtn.removeClass 'hidden'
        @$saveBtn.on 'click', ()=>
          @$saveBtn.addClass 'ing'
          @clearErrors()
          @paymentMethod.tokenizeFields(@onSubmitComplete)
      when 'paypal'
        @paymentMethod = new PayPal @$paymentHolder, @brainTreeAuthoToken, @onSubmitComplete
      when 'direct'
        @paymentMethod = new Direct @$paymentHolder

  setSaveBtn : ($btn) -> @$saveBtn = $btn

  removeOldPayMethod : () ->
    return if !@paymentMethod?
    @paymentMethod.destroy()

  destroy : () =>
    $("input[name='pay-methods']", @$node).off 'click'
    @paymentMethod.destroy()
    @$node.remove()

  # ------------------------------------ Called on payment submission complete, back from braintree

  onSubmitComplete : (err, nonce, extraData)=>
    if err?
      @checkForErrors {error:err}
    else
      newData =
        name : $("input#name", @$node).val()
        kind : $("input[name='pay-methods']:checked", @$node).val()

      # If this is a stand alone, then we KNOW it is creating a new component
      if @isStandAlone
        @createPayMethod newData, nonce, (results)=> @checkForErrors(results, null, true)
      # else, this is the main component, and can only update
      else
        @updatePayMethod @getReplaceeData(newData), nonce, (results)=> @checkForErrors(results, null, true)


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
  getReplaceeData : (newData) ->
    id = $('select#payment-methods').val()
    for paymentMethod in @paymentMethods
      if paymentMethod.id == id
        paymentMethod.name = newData.name
        paymentMethod.kind = newData.kind
        return paymentMethod
