module.exports = class PaymentMethodsShim

  constructor: () ->

  getPaymentMethods : () ->
    [
      {
        id    : "123456789" # Also == the token braintree needs on update
        name  : "Work"
        kind  : "card"
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
      }
      {
        id    : "234567890" # Also == the token braintree needs on update
        name  : "Zumiez"
        kind  : "direct"
        meta  :
          accountId       : "john@doe.io"
        apps:[
          {name:"zumiez-site", href:"/some/url"}
          {name:"zumiez-admin", href:"/some/url"}
        ]
      }
      {
        id    : "34567890" # Also == the token braintree needs on update
        name  : "Personal"
        kind  : "paypal"
        meta  :
          accountId       : "john@doe.io"
        apps:[
        ]
      }
    ]
