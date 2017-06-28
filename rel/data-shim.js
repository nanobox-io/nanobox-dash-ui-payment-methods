(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var PaymentMethodsShim;

module.exports = PaymentMethodsShim = (function() {
  function PaymentMethodsShim() {}

  PaymentMethodsShim.prototype.getPaymentMethods = function() {
    return this.getPaymentMethod('work');
  };

  PaymentMethodsShim.prototype.getInvoice = function(paymentMethodId) {
    var paymentMethod;
    paymentMethod = this.getPaymentMethod(paymentMethodId);
    return {
      state: "pending",
      id: "23123",
      number: "23123",
      total: "100.00",
      billingDate: 1455229913000,
      paidDate: 1455229913000,
      error: "Unable to Process Card",
      paidVia: {
        kind: 'card',
        meta: {
          lastFourDigits: 1234
        }
      },
      paymentMethod: {
        userInvoiceInfo: paymentMethod.userInvoiceInfo
      },
      lineItems: [this.getAppBillingEventNEW(0), this.getAppBillingEventNEW(1)]
    };
  };

  PaymentMethodsShim.prototype.getAppBillingEvent = function() {
    return {
      action: "charge",
      app: {
        name: "distinct-delsie"
      },
      plan: {
        name: "startup"
      },
      amount: "100.00",
      startAt: 1452551513000,
      endAt: 1455229913000
    };
  };

  PaymentMethodsShim.prototype.getAppBillingEventNEW = function(index) {
    var ar;
    if (index == null) {
      index = 0;
    }
    ar = [
      {
        name: "Team Plan - 10 members @ $15/member",
        total: "$150",
        context: "nanobox team"
      }, {
        name: "Beta user discount",
        total: "-$50",
        context: ""
      }, {
        name: "Team Plan with 10 members @ $15/member",
        total: "$150",
        context: "nanobox team"
      }, {
        name: "Team Plan with 10 members @ $15/member",
        total: "$150",
        context: "nanobox team"
      }
    ];
    return {
      action: "charge",
      name: ar[index].name,
      amount: ar[index].total,
      context: {
        name: ar[index].context,
        type: "app"
      }
    };
  };

  PaymentMethodsShim.prototype.getOtherBillingEvent = function() {
    return {
      action: "credit",
      amount: "-100.00",
      description: "Open Source Discount - distinct delsie"
    };
  };

  PaymentMethodsShim.prototype.getPaymentMethod = function(id) {
    if (id == null) {
      id = "work";
    }
    if (id === "work") {
      return {
        id: "work",
        kind: "card",
        billingDate: 1514936691001,
        state: "active",
        userInvoiceInfo: "Some long Company name\nVat ID : 33213451",
        meta: {
          NameOnCard: "John Doe",
          lastFourDigits: 1234,
          cardType: "visa",
          expirationDate: "04/18",
          cvv: 123
        },
        apps: [
          {
            name: "main",
            href: "/some/url"
          }, {
            name: "some-app",
            href: "/some/url"
          }, {
            name: "facebook-app",
            href: "/some/url"
          }
        ],
        invoices: [
          {
            id: 'work',
            startAt: 1452551513000,
            endAt: 1455229913000
          }, {
            id: 'zumiez',
            startAt: 1455229913000,
            endAt: 1457735513000
          }
        ]
      };
    } else if (id === "zumiez") {
      return {
        id: "zumiez",
        kind: "direct",
        state: "inactive",
        billingDate: 1514936691001,
        userInvoiceInfo: "Some Vat info",
        meta: {
          accountId: "john@doe.io"
        },
        apps: [
          {
            name: "zumiez-site",
            href: "/some/url"
          }, {
            name: "zumiez-admin",
            href: "/some/url"
          }
        ],
        invoices: []
      };
    } else {
      return {
        id: "personal",
        kind: "paypal",
        state: "inactive",
        billingDate: 1514936691001,
        userInvoiceInfo: "I love Paypal",
        meta: {
          accountId: "john@doe.io"
        },
        apps: [],
        invoices: []
      };
    }
  };

  return PaymentMethodsShim;

})();

},{}],2:[function(require,module,exports){
var PaymentMethodsShim;

PaymentMethodsShim = require('./shim/payment-methods');

window.paymentMethodShim = new PaymentMethodsShim();

window.testPaymentMethodsLocally = function() {
  var config, createMicroChooser, createPaymentAdder, createStandardComponent;
  config = {
    clientToken: 'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiI2OTVkNmE1ZjZiNzNkOWRlYjQ2MmZkMjkwZjBhNTM4Mzg3MTU4OTBlMWZmNGFhMGY0Y2MzM2YxZTQ1NzJiZmVjfGNyZWF0ZWRfYXQ9MjAxNy0wMS0wM1QxOTowMzoxNC4yNzYyMTM4MjkrMDAwMFx1MDAyNm1lcmNoYW50X2lkPTM0OHBrOWNnZjNiZ3l3MmJcdTAwMjZwdWJsaWNfa2V5PTJuMjQ3ZHY4OWJxOXZtcHIiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMzQ4cGs5Y2dmM2JneXcyYi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzLzM0OHBrOWNnZjNiZ3l3MmIvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tLzM0OHBrOWNnZjNiZ3l3MmIifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQWNtZSBXaWRnZXRzLCBMdGQuIChTYW5kYm94KSIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQzIiwiYmlsbGluZ0FncmVlbWVudHNFbmFibGVkIjp0cnVlLCJtZXJjaGFudEFjY291bnRJZCI6ImFjbWV3aWRnZXRzbHRkc2FuZGJveCIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJjb2luYmFzZUVuYWJsZWQiOmZhbHNlLCJtZXJjaGFudElkIjoiMzQ4cGs5Y2dmM2JneXcyYiIsInZlbm1vIjoib2ZmIn0=',
    paymentMethod: paymentMethodShim.getPaymentMethods(),
    pmUpdateId: "12345asdfg",
    createPaymentMethod: function(data, nonce, cb) {
      console.log('create payment method');
      console.log(data);
      console.log(nonce);
      return cb({});
    },
    updatePaymentMethod: function(data, nonce, cb) {
      console.log('update payment method');
      console.log(data);
      console.log(nonce);
      return cb({});
    },
    deletePaymentMethod: function(data, cb) {
      console.log('delete payment method');
      console.log(data);
      return cb({
        error: "nope, can't do it"
      });
    },
    getInvoice: function(id, cb) {
      return cb(window.paymentMethodShim.getInvoice(id));
    },
    payInvoiceNow: function(id, cb) {
      console.log("paying invoice " + id);
      return cb({});
    }
  };
  createStandardComponent = function() {
    return window.payMethods = new nanobox.PaymentMethods($(".stage-holder"), config, true);
  };
  createMicroChooser = function() {
    window.payMethods = new nanobox.PaymentMethods($(".stage-holder"), config, false);
    return payMethods.createMicroChooser('zumiez', function(newPayMethod) {
      return console.log(newPayMethod);
    });
  };
  createPaymentAdder = (function(_this) {
    return function() {
      window.payMethods = new nanobox.PaymentMethods($(".stage-holder"), config, false);
      return payMethods.createPayMethod({}, $("body"), true);
    };
  })(this);
  return createStandardComponent();
};

},{"./shim/payment-methods":1}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9ndWxwLWNvZmZlZWlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic2hpbS9wYXltZW50LW1ldGhvZHMuY29mZmVlIiwic3RhZ2UuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFBheW1lbnRNZXRob2RzU2hpbTtcblxubW9kdWxlLmV4cG9ydHMgPSBQYXltZW50TWV0aG9kc1NoaW0gPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIFBheW1lbnRNZXRob2RzU2hpbSgpIHt9XG5cbiAgUGF5bWVudE1ldGhvZHNTaGltLnByb3RvdHlwZS5nZXRQYXltZW50TWV0aG9kcyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmdldFBheW1lbnRNZXRob2QoJ3dvcmsnKTtcbiAgfTtcblxuICBQYXltZW50TWV0aG9kc1NoaW0ucHJvdG90eXBlLmdldEludm9pY2UgPSBmdW5jdGlvbihwYXltZW50TWV0aG9kSWQpIHtcbiAgICB2YXIgcGF5bWVudE1ldGhvZDtcbiAgICBwYXltZW50TWV0aG9kID0gdGhpcy5nZXRQYXltZW50TWV0aG9kKHBheW1lbnRNZXRob2RJZCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXRlOiBcInBlbmRpbmdcIixcbiAgICAgIGlkOiBcIjIzMTIzXCIsXG4gICAgICBudW1iZXI6IFwiMjMxMjNcIixcbiAgICAgIHRvdGFsOiBcIjEwMC4wMFwiLFxuICAgICAgYmlsbGluZ0RhdGU6IDE0NTUyMjk5MTMwMDAsXG4gICAgICBwYWlkRGF0ZTogMTQ1NTIyOTkxMzAwMCxcbiAgICAgIGVycm9yOiBcIlVuYWJsZSB0byBQcm9jZXNzIENhcmRcIixcbiAgICAgIHBhaWRWaWE6IHtcbiAgICAgICAga2luZDogJ2NhcmQnLFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgbGFzdEZvdXJEaWdpdHM6IDEyMzRcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHBheW1lbnRNZXRob2Q6IHtcbiAgICAgICAgdXNlckludm9pY2VJbmZvOiBwYXltZW50TWV0aG9kLnVzZXJJbnZvaWNlSW5mb1xuICAgICAgfSxcbiAgICAgIGxpbmVJdGVtczogW3RoaXMuZ2V0QXBwQmlsbGluZ0V2ZW50TkVXKDApLCB0aGlzLmdldEFwcEJpbGxpbmdFdmVudE5FVygxKV1cbiAgICB9O1xuICB9O1xuXG4gIFBheW1lbnRNZXRob2RzU2hpbS5wcm90b3R5cGUuZ2V0QXBwQmlsbGluZ0V2ZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFjdGlvbjogXCJjaGFyZ2VcIixcbiAgICAgIGFwcDoge1xuICAgICAgICBuYW1lOiBcImRpc3RpbmN0LWRlbHNpZVwiXG4gICAgICB9LFxuICAgICAgcGxhbjoge1xuICAgICAgICBuYW1lOiBcInN0YXJ0dXBcIlxuICAgICAgfSxcbiAgICAgIGFtb3VudDogXCIxMDAuMDBcIixcbiAgICAgIHN0YXJ0QXQ6IDE0NTI1NTE1MTMwMDAsXG4gICAgICBlbmRBdDogMTQ1NTIyOTkxMzAwMFxuICAgIH07XG4gIH07XG5cbiAgUGF5bWVudE1ldGhvZHNTaGltLnByb3RvdHlwZS5nZXRBcHBCaWxsaW5nRXZlbnRORVcgPSBmdW5jdGlvbihpbmRleCkge1xuICAgIHZhciBhcjtcbiAgICBpZiAoaW5kZXggPT0gbnVsbCkge1xuICAgICAgaW5kZXggPSAwO1xuICAgIH1cbiAgICBhciA9IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogXCJUZWFtIFBsYW4gLSAxMCBtZW1iZXJzIEAgJDE1L21lbWJlclwiLFxuICAgICAgICB0b3RhbDogXCIkMTUwXCIsXG4gICAgICAgIGNvbnRleHQ6IFwibmFub2JveCB0ZWFtXCJcbiAgICAgIH0sIHtcbiAgICAgICAgbmFtZTogXCJCZXRhIHVzZXIgZGlzY291bnRcIixcbiAgICAgICAgdG90YWw6IFwiLSQ1MFwiLFxuICAgICAgICBjb250ZXh0OiBcIlwiXG4gICAgICB9LCB7XG4gICAgICAgIG5hbWU6IFwiVGVhbSBQbGFuIHdpdGggMTAgbWVtYmVycyBAICQxNS9tZW1iZXJcIixcbiAgICAgICAgdG90YWw6IFwiJDE1MFwiLFxuICAgICAgICBjb250ZXh0OiBcIm5hbm9ib3ggdGVhbVwiXG4gICAgICB9LCB7XG4gICAgICAgIG5hbWU6IFwiVGVhbSBQbGFuIHdpdGggMTAgbWVtYmVycyBAICQxNS9tZW1iZXJcIixcbiAgICAgICAgdG90YWw6IFwiJDE1MFwiLFxuICAgICAgICBjb250ZXh0OiBcIm5hbm9ib3ggdGVhbVwiXG4gICAgICB9XG4gICAgXTtcbiAgICByZXR1cm4ge1xuICAgICAgYWN0aW9uOiBcImNoYXJnZVwiLFxuICAgICAgbmFtZTogYXJbaW5kZXhdLm5hbWUsXG4gICAgICBhbW91bnQ6IGFyW2luZGV4XS50b3RhbCxcbiAgICAgIGNvbnRleHQ6IHtcbiAgICAgICAgbmFtZTogYXJbaW5kZXhdLmNvbnRleHQsXG4gICAgICAgIHR5cGU6IFwiYXBwXCJcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIFBheW1lbnRNZXRob2RzU2hpbS5wcm90b3R5cGUuZ2V0T3RoZXJCaWxsaW5nRXZlbnQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWN0aW9uOiBcImNyZWRpdFwiLFxuICAgICAgYW1vdW50OiBcIi0xMDAuMDBcIixcbiAgICAgIGRlc2NyaXB0aW9uOiBcIk9wZW4gU291cmNlIERpc2NvdW50IC0gZGlzdGluY3QgZGVsc2llXCJcbiAgICB9O1xuICB9O1xuXG4gIFBheW1lbnRNZXRob2RzU2hpbS5wcm90b3R5cGUuZ2V0UGF5bWVudE1ldGhvZCA9IGZ1bmN0aW9uKGlkKSB7XG4gICAgaWYgKGlkID09IG51bGwpIHtcbiAgICAgIGlkID0gXCJ3b3JrXCI7XG4gICAgfVxuICAgIGlmIChpZCA9PT0gXCJ3b3JrXCIpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlkOiBcIndvcmtcIixcbiAgICAgICAga2luZDogXCJjYXJkXCIsXG4gICAgICAgIGJpbGxpbmdEYXRlOiAxNTE0OTM2NjkxMDAxLFxuICAgICAgICBzdGF0ZTogXCJhY3RpdmVcIixcbiAgICAgICAgdXNlckludm9pY2VJbmZvOiBcIlNvbWUgbG9uZyBDb21wYW55IG5hbWVcXG5WYXQgSUQgOiAzMzIxMzQ1MVwiLFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgTmFtZU9uQ2FyZDogXCJKb2huIERvZVwiLFxuICAgICAgICAgIGxhc3RGb3VyRGlnaXRzOiAxMjM0LFxuICAgICAgICAgIGNhcmRUeXBlOiBcInZpc2FcIixcbiAgICAgICAgICBleHBpcmF0aW9uRGF0ZTogXCIwNC8xOFwiLFxuICAgICAgICAgIGN2djogMTIzXG4gICAgICAgIH0sXG4gICAgICAgIGFwcHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcIm1haW5cIixcbiAgICAgICAgICAgIGhyZWY6IFwiL3NvbWUvdXJsXCJcbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiBcInNvbWUtYXBwXCIsXG4gICAgICAgICAgICBocmVmOiBcIi9zb21lL3VybFwiXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogXCJmYWNlYm9vay1hcHBcIixcbiAgICAgICAgICAgIGhyZWY6IFwiL3NvbWUvdXJsXCJcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGludm9pY2VzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICd3b3JrJyxcbiAgICAgICAgICAgIHN0YXJ0QXQ6IDE0NTI1NTE1MTMwMDAsXG4gICAgICAgICAgICBlbmRBdDogMTQ1NTIyOTkxMzAwMFxuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAnenVtaWV6JyxcbiAgICAgICAgICAgIHN0YXJ0QXQ6IDE0NTUyMjk5MTMwMDAsXG4gICAgICAgICAgICBlbmRBdDogMTQ1NzczNTUxMzAwMFxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGlkID09PSBcInp1bWllelwiKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogXCJ6dW1pZXpcIixcbiAgICAgICAga2luZDogXCJkaXJlY3RcIixcbiAgICAgICAgc3RhdGU6IFwiaW5hY3RpdmVcIixcbiAgICAgICAgYmlsbGluZ0RhdGU6IDE1MTQ5MzY2OTEwMDEsXG4gICAgICAgIHVzZXJJbnZvaWNlSW5mbzogXCJTb21lIFZhdCBpbmZvXCIsXG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICBhY2NvdW50SWQ6IFwiam9obkBkb2UuaW9cIlxuICAgICAgICB9LFxuICAgICAgICBhcHBzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJ6dW1pZXotc2l0ZVwiLFxuICAgICAgICAgICAgaHJlZjogXCIvc29tZS91cmxcIlxuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6IFwienVtaWV6LWFkbWluXCIsXG4gICAgICAgICAgICBocmVmOiBcIi9zb21lL3VybFwiXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBpbnZvaWNlczogW11cbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlkOiBcInBlcnNvbmFsXCIsXG4gICAgICAgIGtpbmQ6IFwicGF5cGFsXCIsXG4gICAgICAgIHN0YXRlOiBcImluYWN0aXZlXCIsXG4gICAgICAgIGJpbGxpbmdEYXRlOiAxNTE0OTM2NjkxMDAxLFxuICAgICAgICB1c2VySW52b2ljZUluZm86IFwiSSBsb3ZlIFBheXBhbFwiLFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgYWNjb3VudElkOiBcImpvaG5AZG9lLmlvXCJcbiAgICAgICAgfSxcbiAgICAgICAgYXBwczogW10sXG4gICAgICAgIGludm9pY2VzOiBbXVxuICAgICAgfTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIFBheW1lbnRNZXRob2RzU2hpbTtcblxufSkoKTtcbiIsInZhciBQYXltZW50TWV0aG9kc1NoaW07XG5cblBheW1lbnRNZXRob2RzU2hpbSA9IHJlcXVpcmUoJy4vc2hpbS9wYXltZW50LW1ldGhvZHMnKTtcblxud2luZG93LnBheW1lbnRNZXRob2RTaGltID0gbmV3IFBheW1lbnRNZXRob2RzU2hpbSgpO1xuXG53aW5kb3cudGVzdFBheW1lbnRNZXRob2RzTG9jYWxseSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgY29uZmlnLCBjcmVhdGVNaWNyb0Nob29zZXIsIGNyZWF0ZVBheW1lbnRBZGRlciwgY3JlYXRlU3RhbmRhcmRDb21wb25lbnQ7XG4gIGNvbmZpZyA9IHtcbiAgICBjbGllbnRUb2tlbjogJ2V5SjJaWEp6YVc5dUlqb3lMQ0poZFhSb2IzSnBlbUYwYVc5dVJtbHVaMlZ5Y0hKcGJuUWlPaUkyT1RWa05tRTFaalppTnpOa09XUmxZalEyTW1aa01qa3daakJoTlRNNE16ZzNNVFU0T1RCbE1XWm1OR0ZoTUdZMFkyTXpNMll4WlRRMU56SmlabVZqZkdOeVpXRjBaV1JmWVhROU1qQXhOeTB3TVMwd00xUXhPVG93TXpveE5DNHlOell5TVRNNE1qa3JNREF3TUZ4MU1EQXlObTFsY21Ob1lXNTBYMmxrUFRNME9IQnJPV05uWmpOaVozbDNNbUpjZFRBd01qWndkV0pzYVdOZmEyVjVQVEp1TWpRM1pIWTRPV0p4T1hadGNISWlMQ0pqYjI1bWFXZFZjbXdpT2lKb2RIUndjem92TDJGd2FTNXpZVzVrWW05NExtSnlZV2x1ZEhKbFpXZGhkR1YzWVhrdVkyOXRPalEwTXk5dFpYSmphR0Z1ZEhNdk16UTRjR3M1WTJkbU0ySm5lWGN5WWk5amJHbGxiblJmWVhCcEwzWXhMMk52Ym1acFozVnlZWFJwYjI0aUxDSmphR0ZzYkdWdVoyVnpJanBiWFN3aVpXNTJhWEp2Ym0xbGJuUWlPaUp6WVc1a1ltOTRJaXdpWTJ4cFpXNTBRWEJwVlhKc0lqb2lhSFIwY0hNNkx5OWhjR2t1YzJGdVpHSnZlQzVpY21GcGJuUnlaV1ZuWVhSbGQyRjVMbU52YlRvME5ETXZiV1Z5WTJoaGJuUnpMek0wT0hCck9XTm5aak5pWjNsM01tSXZZMnhwWlc1MFgyRndhU0lzSW1GemMyVjBjMVZ5YkNJNkltaDBkSEJ6T2k4dllYTnpaWFJ6TG1KeVlXbHVkSEpsWldkaGRHVjNZWGt1WTI5dElpd2lZWFYwYUZWeWJDSTZJbWgwZEhCek9pOHZZWFYwYUM1MlpXNXRieTV6WVc1a1ltOTRMbUp5WVdsdWRISmxaV2RoZEdWM1lYa3VZMjl0SWl3aVlXNWhiSGwwYVdOeklqcDdJblZ5YkNJNkltaDBkSEJ6T2k4dlkyeHBaVzUwTFdGdVlXeDVkR2xqY3k1ellXNWtZbTk0TG1KeVlXbHVkSEpsWldkaGRHVjNZWGt1WTI5dEx6TTBPSEJyT1dOblpqTmlaM2wzTW1JaWZTd2lkR2h5WldWRVUyVmpkWEpsUlc1aFlteGxaQ0k2ZEhKMVpTd2ljR0Y1Y0dGc1JXNWhZbXhsWkNJNmRISjFaU3dpY0dGNWNHRnNJanA3SW1ScGMzQnNZWGxPWVcxbElqb2lRV050WlNCWGFXUm5aWFJ6TENCTWRHUXVJQ2hUWVc1a1ltOTRLU0lzSW1Oc2FXVnVkRWxrSWpwdWRXeHNMQ0p3Y21sMllXTjVWWEpzSWpvaWFIUjBjRG92TDJWNFlXMXdiR1V1WTI5dEwzQndJaXdpZFhObGNrRm5jbVZsYldWdWRGVnliQ0k2SW1oMGRIQTZMeTlsZUdGdGNHeGxMbU52YlM5MGIzTWlMQ0ppWVhObFZYSnNJam9pYUhSMGNITTZMeTloYzNObGRITXVZbkpoYVc1MGNtVmxaMkYwWlhkaGVTNWpiMjBpTENKaGMzTmxkSE5WY213aU9pSm9kSFJ3Y3pvdkwyTm9aV05yYjNWMExuQmhlWEJoYkM1amIyMGlMQ0prYVhKbFkzUkNZWE5sVlhKc0lqcHVkV3hzTENKaGJHeHZkMGgwZEhBaU9uUnlkV1VzSW1WdWRtbHliMjV0Wlc1MFRtOU9aWFIzYjNKcklqcDBjblZsTENKbGJuWnBjbTl1YldWdWRDSTZJbTltWm14cGJtVWlMQ0oxYm5abGRIUmxaRTFsY21Ob1lXNTBJanBtWVd4elpTd2lZbkpoYVc1MGNtVmxRMnhwWlc1MFNXUWlPaUp0WVhOMFpYSmpiR2xsYm5Reklpd2lZbWxzYkdsdVowRm5jbVZsYldWdWRITkZibUZpYkdWa0lqcDBjblZsTENKdFpYSmphR0Z1ZEVGalkyOTFiblJKWkNJNkltRmpiV1YzYVdSblpYUnpiSFJrYzJGdVpHSnZlQ0lzSW1OMWNuSmxibU41U1hOdlEyOWtaU0k2SWxWVFJDSjlMQ0pqYjJsdVltRnpaVVZ1WVdKc1pXUWlPbVpoYkhObExDSnRaWEpqYUdGdWRFbGtJam9pTXpRNGNHczVZMmRtTTJKbmVYY3lZaUlzSW5abGJtMXZJam9pYjJabUluMD0nLFxuICAgIHBheW1lbnRNZXRob2Q6IHBheW1lbnRNZXRob2RTaGltLmdldFBheW1lbnRNZXRob2RzKCksXG4gICAgcG1VcGRhdGVJZDogXCIxMjM0NWFzZGZnXCIsXG4gICAgY3JlYXRlUGF5bWVudE1ldGhvZDogZnVuY3Rpb24oZGF0YSwgbm9uY2UsIGNiKSB7XG4gICAgICBjb25zb2xlLmxvZygnY3JlYXRlIHBheW1lbnQgbWV0aG9kJyk7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIGNvbnNvbGUubG9nKG5vbmNlKTtcbiAgICAgIHJldHVybiBjYih7fSk7XG4gICAgfSxcbiAgICB1cGRhdGVQYXltZW50TWV0aG9kOiBmdW5jdGlvbihkYXRhLCBub25jZSwgY2IpIHtcbiAgICAgIGNvbnNvbGUubG9nKCd1cGRhdGUgcGF5bWVudCBtZXRob2QnKTtcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgY29uc29sZS5sb2cobm9uY2UpO1xuICAgICAgcmV0dXJuIGNiKHt9KTtcbiAgICB9LFxuICAgIGRlbGV0ZVBheW1lbnRNZXRob2Q6IGZ1bmN0aW9uKGRhdGEsIGNiKSB7XG4gICAgICBjb25zb2xlLmxvZygnZGVsZXRlIHBheW1lbnQgbWV0aG9kJyk7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIHJldHVybiBjYih7XG4gICAgICAgIGVycm9yOiBcIm5vcGUsIGNhbid0IGRvIGl0XCJcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0SW52b2ljZTogZnVuY3Rpb24oaWQsIGNiKSB7XG4gICAgICByZXR1cm4gY2Iod2luZG93LnBheW1lbnRNZXRob2RTaGltLmdldEludm9pY2UoaWQpKTtcbiAgICB9LFxuICAgIHBheUludm9pY2VOb3c6IGZ1bmN0aW9uKGlkLCBjYikge1xuICAgICAgY29uc29sZS5sb2coXCJwYXlpbmcgaW52b2ljZSBcIiArIGlkKTtcbiAgICAgIHJldHVybiBjYih7fSk7XG4gICAgfVxuICB9O1xuICBjcmVhdGVTdGFuZGFyZENvbXBvbmVudCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB3aW5kb3cucGF5TWV0aG9kcyA9IG5ldyBuYW5vYm94LlBheW1lbnRNZXRob2RzKCQoXCIuc3RhZ2UtaG9sZGVyXCIpLCBjb25maWcsIHRydWUpO1xuICB9O1xuICBjcmVhdGVNaWNyb0Nob29zZXIgPSBmdW5jdGlvbigpIHtcbiAgICB3aW5kb3cucGF5TWV0aG9kcyA9IG5ldyBuYW5vYm94LlBheW1lbnRNZXRob2RzKCQoXCIuc3RhZ2UtaG9sZGVyXCIpLCBjb25maWcsIGZhbHNlKTtcbiAgICByZXR1cm4gcGF5TWV0aG9kcy5jcmVhdGVNaWNyb0Nob29zZXIoJ3p1bWlleicsIGZ1bmN0aW9uKG5ld1BheU1ldGhvZCkge1xuICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKG5ld1BheU1ldGhvZCk7XG4gICAgfSk7XG4gIH07XG4gIGNyZWF0ZVBheW1lbnRBZGRlciA9IChmdW5jdGlvbihfdGhpcykge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHdpbmRvdy5wYXlNZXRob2RzID0gbmV3IG5hbm9ib3guUGF5bWVudE1ldGhvZHMoJChcIi5zdGFnZS1ob2xkZXJcIiksIGNvbmZpZywgZmFsc2UpO1xuICAgICAgcmV0dXJuIHBheU1ldGhvZHMuY3JlYXRlUGF5TWV0aG9kKHt9LCAkKFwiYm9keVwiKSwgdHJ1ZSk7XG4gICAgfTtcbiAgfSkodGhpcyk7XG4gIHJldHVybiBjcmVhdGVTdGFuZGFyZENvbXBvbmVudCgpO1xufTtcbiJdfQ==
