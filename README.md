### UI for adding, removing and update payment methods.

## Usage

``` coffeescript

config =
  clientToken          : 'eyJ2ZXJza'
  paymentMethods       : shim.getPaymentMethods()
  # Create new payment method √
  createPaymentMethod  : (data, nonce, cb)-> console.log 'create payment method'; console.log data; console.log nonce; cb({error:"nope, can't do it"})
  # Update existing payment method √
  updatePaymentMethod  : (data, nonce, cb)-> console.log 'update payment method'; console.log data; console.log nonce; cb({})
  # Rename payment method √
  renamePaymentMethod  : (data, newName, cb)-> console.log 'rename payment method'; console.log data; console.log newName; cb({})
  # Replace existing payment method with new payment method √
  replacePaymentMethod : (oldData, newData, nonce, cb)-> console.log 'replace payment method'; console.log oldData; console.log newData; console.log nonce; cb({})
  # Delete payment method √
  deletePaymentMethod  : (data, cb)-> console.log 'delete payment method'; console.log data; cb({error:"nope, can't do it"})

app = new nanobox.PaymentMethods $(".stage-holder"), config

```
