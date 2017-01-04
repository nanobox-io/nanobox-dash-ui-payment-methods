PaymentMethodsShim = require './shim/payment-methods'
shim = new PaymentMethodsShim()


config =
  paymentMethods  : shim.getPaymentMethods()
  clientToken     : "1234567890"
  onCreateSuccess : (nonce)->

app = new nanobox.PaymentMethods $(".holder"), config
