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
    state         : "pending"
    id            : "23123"
    number        : "23123" # Use this for invoice number (instead of id)
    total         : "945.00"
    billingDate   : 1455229913000 # "12 Oct 2017"
    paidDate      : 1455229913000 # "12 Oct 2017"
    error         : "Unable to Process Card"
    paidVia       :
      kind: 'card'
      meta:{lastFourDigits: 1234}
    paymentMethod :
      userInvoiceInfo: paymentMethod.userInvoiceInfo
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
    amount       : "100.00"
    startAt      : 1452551513000 #"02 Dec" # TODO : Convert all date strings into timestamps
    endAt        : 1455229913000

  getOtherBillingEvent : () ->
    action       : "credit"
    amount       : "-100.00"
    description  : "Open Source Discount - distinct delsie"

  getPaymentMethod : (id="work") ->
    if id == "work"
      id    : "work" # Also == the token braintree needs on update
      name  : "Work"
      kind  : "card"
      billingDay : 23
      userInvoiceInfo : "Some long Company name\nVat ID : 33213451"
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
        {id:'work', startAt:1452551513000, endAt:1455229913000}
        {id:'zumiez', startAt:1455229913000, endAt:1457735513000}
      ]
    else if id=="zumiez"
      id    : "zumiez" # Also == the token braintree needs on update
      name  : "Zumiez"
      kind  : "direct"
      billingDay : 2
      userInvoiceInfo : ""
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
      billingDay : 12
      userInvoiceInfo : "I love Paypal"
      meta  :
        accountId       : "john@doe.io"
      apps:[]
      invoices : []
