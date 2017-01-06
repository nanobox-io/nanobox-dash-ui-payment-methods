module.exports = class PaymentMethod 

  constructor: () ->

  destroy : () =>
    if @$node?
      @$node.remove()
