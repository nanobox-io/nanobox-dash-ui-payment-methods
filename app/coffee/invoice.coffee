invoice = require 'jade/invoice'

module.exports = class Invoice

  constructor: (@$el, @invoiceData) ->
    console.log @invoiceData
    $node = $ invoice( @invoiceData )
    @$el.append $node


  destroy : () ->
