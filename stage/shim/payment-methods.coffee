module.exports = class PaymentMethodsShim

  constructor: () ->

  getPaymentMethods : () ->
    [
      @getPaymentMethod('work'),
      @getPaymentMethod('zumiez'),
      @getPaymentMethod('personal')
    ]

  getInvoice : (paymentMethodId) ->
    paymentMethod  = @getPaymentMethod paymentMethodId
    # Data starts here:
    state: "errored"
    id             : "23123" # also used as the invoice number? if not, we'll need to add `invoiceNum`
    total          : "945.00"
    coverage_dates :
      start: "12 Oct 2017"
      stop:  "12 Nov 2017"
    payDate : "12 Oct 2017"
    paidDate : "12 Oct 2017"
    error: "Unable to Process Card"
    paymentMethod:
      kind: paymentMethod.kind
      meta: paymentMethod.meta
      userCustomData: paymentMethod.userCustomData
    appBillingEvents: [
      @getAppBillingEvent(),
      @getAppBillingEvent(),
      @getAppBillingEvent(),
      @getAppBillingEvent()
    ]
    otherBillingEvents: [
      @getOtherBillingEvent()
    ]


  getAppBillingEvent : () ->
    action : "charge"
    app:
      name: "distinct-delsie"
    plan:
      name  : "startup"
      price : "100.00"
    amount       : "100.00"
    startAt      : "02 Dec"
    endAt        : "02 Jan"
    coverageDays : 28

  getOtherBillingEvent : () ->
    action       : "credit"
    amount       : "-100.00"
    description  : "Open Source Discount - distinct delsie"

  getPaymentMethod : (id="work") ->
    if id == "work"
      id    : "work" # Also == the token braintree needs on update
      name  : "Work"
      kind  : "card"
      userCustomData : "Madison School District 123\nVat ID : 33213451"
      meta  :
        NameOnCard     : "John Doe"
        lastFourDigits : 1234
        cardType       : "visa"
        expirationDate : "04/18"
        imageURL       : "http://thehandbagresource.com/images/payment-visa.png"
        cvv            : 123
      apps:[
        {name:"main", href:"/some/url"}
        {name:"some-app", href:"/some/url"}
        {name:"facebook-app", href:"/some/url"}
      ]
      invoices:[
        {id:'work', start:1452551513000, stop:1455229913000}
        {id:'zumiez', start:1455229913000, stop:1457735513000}
      ]
    else if id=="zumiez"
      id    : "zumiez" # Also == the token braintree needs on update
      name  : "Zumiez"
      kind  : "direct"
      userCustomData : ""
      meta  :
        accountId       : "john@doe.io"
      apps:[
        {name:"zumiez-site", href:"/some/url"}
        {name:"zumiez-admin", href:"/some/url"}
      ]
      invoices : []
    else
      id    : "personal" # Also == the token braintree needs on update
      name  : "Personal"
      kind  : "paypal"
      userCustomData : "I love Paypal"
      meta  :
        accountId       : "john@doe.io"
      apps:[]
      invoices : []
