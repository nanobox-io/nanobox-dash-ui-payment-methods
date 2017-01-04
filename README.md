### UI for adding, removing and update payment methods.

## Usage

``` coffeescript
### Callbacks ###

# Called on new payment method create
# ----------------------------------------------------
# @nonce               : Nonce returned from braintree
# @name                : Name of the payment method
# @payMethodToReplace  : Data object of the payment method to replace, will be `null`
#                        if this should not replace an existing payment method.
onNewPaymentMethod = (name, nonce, payMethodToReplace)->
  # If this is replacing an existing payment method
  if payMethodToReplace?
    console.log "Replacing #{payMethodToReplace.id} with `#{name}`. Here is the nonce : #{nonce}"
  else
    console.log "Creating a new payment method `#{name}`. Here is the nonce : #{noncwe}"

# Delete an existing payment method
# ----------------------------------------------------
deletePaymendMethod = (data)->  console.log "Deleting #{data.id}"

# Update an existing payment method, usually just name
# ----------------------------------------------------
updatePaymentMethod = (data)->  console.log "Updating #{data.id}"



config =
  clientToken         : 'eyJ2ZXJzaW9uIjoyLCJhd'
  paymentMethods      : shim.getPaymentMethods()
  onNewPaymentMethod  : onNewPaymentMethod
  deletePaymendMethod : deletePaymendMethod
  updatePaymentMethod : updatePaymentMethod

app = new nanobox.PaymentMethods $(".stage-holder"), config

```
