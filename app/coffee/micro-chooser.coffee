microChooser = require 'jade/micro-chooser'

module.exports = class MicroChooser

  constructor: ($el, payMethods, currentPayMethodId, changeCb) ->
    @$node = $ microChooser( {paymentMethods:payMethods} )
    $el.append @$node
    # Set initial value
    $("option[value='#{currentPayMethodId}']", @$node).attr selected: 'selected'
    $('select', @$node).on 'change', (e)-> changeCb e.currentTarget.value
    lexify $el

  getVal : ()-> $('select', @$node).val()
