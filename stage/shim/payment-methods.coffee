module.exports = class PaymentMethodsShim

  constructor: () ->

  getPaymentMethods : () ->
    [
      {
        id    : "123456789" # Also == the token braintree needs on update
        name  : "Work"
        kind  : "card"
        meta  :
          cardType       : "visa"
          expirationDate : "04/18"
          imageURL       : "some.url/file.jpg"
        apps:[
          {name:"some-app", href:"/some/url"}
        ]
      }
      {
        id    : "234567890" # Also == the token braintree needs on update
        name  : "Zumiez"
        kind  : "direct"
        meta  :
          accountId       : "john@doe.io"
        apps:[
          {name:"some-app", href:"/some/url"}
        ]
      }
      {
        id    : "34567890" # Also == the token braintree needs on update
        name  : "Personal"
        kind  : "paypal"
        meta  :
          accountId       : "john@doe.io"
        apps:[
          {name:"some-app", href:"/some/url"}
        ]
      }
    ]
