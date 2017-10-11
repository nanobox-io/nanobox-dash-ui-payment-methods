(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var PaymentMethodsShim;

module.exports = PaymentMethodsShim = (function() {
  function PaymentMethodsShim() {}

  PaymentMethodsShim.prototype.getPaymentMethods = function() {
    return this.getPaymentMethod('personal');
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
        state: "active",
        billingDate: 1514936691001,
        userInvoiceInfo: "I love Paypal",
        meta: {
          accountId: "johnwithareallyreallylongeamailaddressforyou@doe.io"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzaGltL3BheW1lbnQtbWV0aG9kcy5jb2ZmZWUiLCJzdGFnZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUGF5bWVudE1ldGhvZHNTaGltO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBheW1lbnRNZXRob2RzU2hpbSA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gUGF5bWVudE1ldGhvZHNTaGltKCkge31cblxuICBQYXltZW50TWV0aG9kc1NoaW0ucHJvdG90eXBlLmdldFBheW1lbnRNZXRob2RzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UGF5bWVudE1ldGhvZCgncGVyc29uYWwnKTtcbiAgfTtcblxuICBQYXltZW50TWV0aG9kc1NoaW0ucHJvdG90eXBlLmdldEludm9pY2UgPSBmdW5jdGlvbihwYXltZW50TWV0aG9kSWQpIHtcbiAgICB2YXIgcGF5bWVudE1ldGhvZDtcbiAgICBwYXltZW50TWV0aG9kID0gdGhpcy5nZXRQYXltZW50TWV0aG9kKHBheW1lbnRNZXRob2RJZCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXRlOiBcInBlbmRpbmdcIixcbiAgICAgIGlkOiBcIjIzMTIzXCIsXG4gICAgICBudW1iZXI6IFwiMjMxMjNcIixcbiAgICAgIHRvdGFsOiBcIjEwMC4wMFwiLFxuICAgICAgYmlsbGluZ0RhdGU6IDE0NTUyMjk5MTMwMDAsXG4gICAgICBwYWlkRGF0ZTogMTQ1NTIyOTkxMzAwMCxcbiAgICAgIGVycm9yOiBcIlVuYWJsZSB0byBQcm9jZXNzIENhcmRcIixcbiAgICAgIHBhaWRWaWE6IHtcbiAgICAgICAga2luZDogJ2NhcmQnLFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgbGFzdEZvdXJEaWdpdHM6IDEyMzRcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHBheW1lbnRNZXRob2Q6IHtcbiAgICAgICAgdXNlckludm9pY2VJbmZvOiBwYXltZW50TWV0aG9kLnVzZXJJbnZvaWNlSW5mb1xuICAgICAgfSxcbiAgICAgIGxpbmVJdGVtczogW3RoaXMuZ2V0QXBwQmlsbGluZ0V2ZW50TkVXKDApLCB0aGlzLmdldEFwcEJpbGxpbmdFdmVudE5FVygxKV1cbiAgICB9O1xuICB9O1xuXG4gIFBheW1lbnRNZXRob2RzU2hpbS5wcm90b3R5cGUuZ2V0QXBwQmlsbGluZ0V2ZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFjdGlvbjogXCJjaGFyZ2VcIixcbiAgICAgIGFwcDoge1xuICAgICAgICBuYW1lOiBcImRpc3RpbmN0LWRlbHNpZVwiXG4gICAgICB9LFxuICAgICAgcGxhbjoge1xuICAgICAgICBuYW1lOiBcInN0YXJ0dXBcIlxuICAgICAgfSxcbiAgICAgIGFtb3VudDogXCIxMDAuMDBcIixcbiAgICAgIHN0YXJ0QXQ6IDE0NTI1NTE1MTMwMDAsXG4gICAgICBlbmRBdDogMTQ1NTIyOTkxMzAwMFxuICAgIH07XG4gIH07XG5cbiAgUGF5bWVudE1ldGhvZHNTaGltLnByb3RvdHlwZS5nZXRBcHBCaWxsaW5nRXZlbnRORVcgPSBmdW5jdGlvbihpbmRleCkge1xuICAgIHZhciBhcjtcbiAgICBpZiAoaW5kZXggPT0gbnVsbCkge1xuICAgICAgaW5kZXggPSAwO1xuICAgIH1cbiAgICBhciA9IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogXCJUZWFtIFBsYW4gLSAxMCBtZW1iZXJzIEAgJDE1L21lbWJlclwiLFxuICAgICAgICB0b3RhbDogXCIkMTUwXCIsXG4gICAgICAgIGNvbnRleHQ6IFwibmFub2JveCB0ZWFtXCJcbiAgICAgIH0sIHtcbiAgICAgICAgbmFtZTogXCJCZXRhIHVzZXIgZGlzY291bnRcIixcbiAgICAgICAgdG90YWw6IFwiLSQ1MFwiLFxuICAgICAgICBjb250ZXh0OiBcIlwiXG4gICAgICB9LCB7XG4gICAgICAgIG5hbWU6IFwiVGVhbSBQbGFuIHdpdGggMTAgbWVtYmVycyBAICQxNS9tZW1iZXJcIixcbiAgICAgICAgdG90YWw6IFwiJDE1MFwiLFxuICAgICAgICBjb250ZXh0OiBcIm5hbm9ib3ggdGVhbVwiXG4gICAgICB9LCB7XG4gICAgICAgIG5hbWU6IFwiVGVhbSBQbGFuIHdpdGggMTAgbWVtYmVycyBAICQxNS9tZW1iZXJcIixcbiAgICAgICAgdG90YWw6IFwiJDE1MFwiLFxuICAgICAgICBjb250ZXh0OiBcIm5hbm9ib3ggdGVhbVwiXG4gICAgICB9XG4gICAgXTtcbiAgICByZXR1cm4ge1xuICAgICAgYWN0aW9uOiBcImNoYXJnZVwiLFxuICAgICAgbmFtZTogYXJbaW5kZXhdLm5hbWUsXG4gICAgICBhbW91bnQ6IGFyW2luZGV4XS50b3RhbCxcbiAgICAgIGNvbnRleHQ6IHtcbiAgICAgICAgbmFtZTogYXJbaW5kZXhdLmNvbnRleHQsXG4gICAgICAgIHR5cGU6IFwiYXBwXCJcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIFBheW1lbnRNZXRob2RzU2hpbS5wcm90b3R5cGUuZ2V0T3RoZXJCaWxsaW5nRXZlbnQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWN0aW9uOiBcImNyZWRpdFwiLFxuICAgICAgYW1vdW50OiBcIi0xMDAuMDBcIixcbiAgICAgIGRlc2NyaXB0aW9uOiBcIk9wZW4gU291cmNlIERpc2NvdW50IC0gZGlzdGluY3QgZGVsc2llXCJcbiAgICB9O1xuICB9O1xuXG4gIFBheW1lbnRNZXRob2RzU2hpbS5wcm90b3R5cGUuZ2V0UGF5bWVudE1ldGhvZCA9IGZ1bmN0aW9uKGlkKSB7XG4gICAgaWYgKGlkID09IG51bGwpIHtcbiAgICAgIGlkID0gXCJ3b3JrXCI7XG4gICAgfVxuICAgIGlmIChpZCA9PT0gXCJ3b3JrXCIpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlkOiBcIndvcmtcIixcbiAgICAgICAga2luZDogXCJjYXJkXCIsXG4gICAgICAgIGJpbGxpbmdEYXRlOiAxNTE0OTM2NjkxMDAxLFxuICAgICAgICBzdGF0ZTogXCJhY3RpdmVcIixcbiAgICAgICAgdXNlckludm9pY2VJbmZvOiBcIlNvbWUgbG9uZyBDb21wYW55IG5hbWVcXG5WYXQgSUQgOiAzMzIxMzQ1MVwiLFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgTmFtZU9uQ2FyZDogXCJKb2huIERvZVwiLFxuICAgICAgICAgIGxhc3RGb3VyRGlnaXRzOiAxMjM0LFxuICAgICAgICAgIGNhcmRUeXBlOiBcInZpc2FcIixcbiAgICAgICAgICBleHBpcmF0aW9uRGF0ZTogXCIwNC8xOFwiLFxuICAgICAgICAgIGN2djogMTIzXG4gICAgICAgIH0sXG4gICAgICAgIGFwcHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcIm1haW5cIixcbiAgICAgICAgICAgIGhyZWY6IFwiL3NvbWUvdXJsXCJcbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiBcInNvbWUtYXBwXCIsXG4gICAgICAgICAgICBocmVmOiBcIi9zb21lL3VybFwiXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogXCJmYWNlYm9vay1hcHBcIixcbiAgICAgICAgICAgIGhyZWY6IFwiL3NvbWUvdXJsXCJcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGludm9pY2VzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICd3b3JrJyxcbiAgICAgICAgICAgIHN0YXJ0QXQ6IDE0NTI1NTE1MTMwMDAsXG4gICAgICAgICAgICBlbmRBdDogMTQ1NTIyOTkxMzAwMFxuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAnenVtaWV6JyxcbiAgICAgICAgICAgIHN0YXJ0QXQ6IDE0NTUyMjk5MTMwMDAsXG4gICAgICAgICAgICBlbmRBdDogMTQ1NzczNTUxMzAwMFxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGlkID09PSBcInp1bWllelwiKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogXCJ6dW1pZXpcIixcbiAgICAgICAga2luZDogXCJkaXJlY3RcIixcbiAgICAgICAgc3RhdGU6IFwiaW5hY3RpdmVcIixcbiAgICAgICAgYmlsbGluZ0RhdGU6IDE1MTQ5MzY2OTEwMDEsXG4gICAgICAgIHVzZXJJbnZvaWNlSW5mbzogXCJTb21lIFZhdCBpbmZvXCIsXG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICBhY2NvdW50SWQ6IFwiam9obkBkb2UuaW9cIlxuICAgICAgICB9LFxuICAgICAgICBhcHBzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJ6dW1pZXotc2l0ZVwiLFxuICAgICAgICAgICAgaHJlZjogXCIvc29tZS91cmxcIlxuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6IFwienVtaWV6LWFkbWluXCIsXG4gICAgICAgICAgICBocmVmOiBcIi9zb21lL3VybFwiXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBpbnZvaWNlczogW11cbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlkOiBcInBlcnNvbmFsXCIsXG4gICAgICAgIGtpbmQ6IFwicGF5cGFsXCIsXG4gICAgICAgIHN0YXRlOiBcImFjdGl2ZVwiLFxuICAgICAgICBiaWxsaW5nRGF0ZTogMTUxNDkzNjY5MTAwMSxcbiAgICAgICAgdXNlckludm9pY2VJbmZvOiBcIkkgbG92ZSBQYXlwYWxcIixcbiAgICAgICAgbWV0YToge1xuICAgICAgICAgIGFjY291bnRJZDogXCJqb2hud2l0aGFyZWFsbHlyZWFsbHlsb25nZWFtYWlsYWRkcmVzc2ZvcnlvdUBkb2UuaW9cIlxuICAgICAgICB9LFxuICAgICAgICBhcHBzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJtYWluXCIsXG4gICAgICAgICAgICBocmVmOiBcIi9zb21lL3VybFwiXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogXCJzb21lLWFwcFwiLFxuICAgICAgICAgICAgaHJlZjogXCIvc29tZS91cmxcIlxuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6IFwiZmFjZWJvb2stYXBwXCIsXG4gICAgICAgICAgICBocmVmOiBcIi9zb21lL3VybFwiXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBpbnZvaWNlczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAnd29yaycsXG4gICAgICAgICAgICBzdGFydEF0OiAxNDUyNTUxNTEzMDAwLFxuICAgICAgICAgICAgZW5kQXQ6IDE0NTUyMjk5MTMwMDBcbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICBpZDogJ3p1bWlleicsXG4gICAgICAgICAgICBzdGFydEF0OiAxNDU1MjI5OTEzMDAwLFxuICAgICAgICAgICAgZW5kQXQ6IDE0NTc3MzU1MTMwMDBcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH07XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBQYXltZW50TWV0aG9kc1NoaW07XG5cbn0pKCk7XG4iLCJ2YXIgUGF5bWVudE1ldGhvZHNTaGltO1xuXG5QYXltZW50TWV0aG9kc1NoaW0gPSByZXF1aXJlKCcuL3NoaW0vcGF5bWVudC1tZXRob2RzJyk7XG5cbndpbmRvdy5wYXltZW50TWV0aG9kU2hpbSA9IG5ldyBQYXltZW50TWV0aG9kc1NoaW0oKTtcblxud2luZG93LnRlc3RQYXltZW50TWV0aG9kc0xvY2FsbHkgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGNvbmZpZywgY3JlYXRlTWljcm9DaG9vc2VyLCBjcmVhdGVQYXltZW50QWRkZXIsIGNyZWF0ZVN0YW5kYXJkQ29tcG9uZW50O1xuICBjb25maWcgPSB7XG4gICAgY2xpZW50VG9rZW46ICdleUoyWlhKemFXOXVJam95TENKaGRYUm9iM0pwZW1GMGFXOXVSbWx1WjJWeWNISnBiblFpT2lJMk9UVmtObUUxWmpaaU56TmtPV1JsWWpRMk1tWmtNamt3WmpCaE5UTTRNemczTVRVNE9UQmxNV1ptTkdGaE1HWTBZMk16TTJZeFpUUTFOekppWm1WamZHTnlaV0YwWldSZllYUTlNakF4Tnkwd01TMHdNMVF4T1Rvd016b3hOQzR5TnpZeU1UTTRNamtyTURBd01GeDFNREF5Tm0xbGNtTm9ZVzUwWDJsa1BUTTBPSEJyT1dOblpqTmlaM2wzTW1KY2RUQXdNalp3ZFdKc2FXTmZhMlY1UFRKdU1qUTNaSFk0T1dKeE9YWnRjSElpTENKamIyNW1hV2RWY213aU9pSm9kSFJ3Y3pvdkwyRndhUzV6WVc1a1ltOTRMbUp5WVdsdWRISmxaV2RoZEdWM1lYa3VZMjl0T2pRME15OXRaWEpqYUdGdWRITXZNelE0Y0dzNVkyZG1NMkpuZVhjeVlpOWpiR2xsYm5SZllYQnBMM1l4TDJOdmJtWnBaM1Z5WVhScGIyNGlMQ0pqYUdGc2JHVnVaMlZ6SWpwYlhTd2laVzUyYVhKdmJtMWxiblFpT2lKellXNWtZbTk0SWl3aVkyeHBaVzUwUVhCcFZYSnNJam9pYUhSMGNITTZMeTloY0drdWMyRnVaR0p2ZUM1aWNtRnBiblJ5WldWbllYUmxkMkY1TG1OdmJUbzBORE12YldWeVkyaGhiblJ6THpNME9IQnJPV05uWmpOaVozbDNNbUl2WTJ4cFpXNTBYMkZ3YVNJc0ltRnpjMlYwYzFWeWJDSTZJbWgwZEhCek9pOHZZWE56WlhSekxtSnlZV2x1ZEhKbFpXZGhkR1YzWVhrdVkyOXRJaXdpWVhWMGFGVnliQ0k2SW1oMGRIQnpPaTh2WVhWMGFDNTJaVzV0Ynk1ellXNWtZbTk0TG1KeVlXbHVkSEpsWldkaGRHVjNZWGt1WTI5dElpd2lZVzVoYkhsMGFXTnpJanA3SW5WeWJDSTZJbWgwZEhCek9pOHZZMnhwWlc1MExXRnVZV3g1ZEdsamN5NXpZVzVrWW05NExtSnlZV2x1ZEhKbFpXZGhkR1YzWVhrdVkyOXRMek0wT0hCck9XTm5aak5pWjNsM01tSWlmU3dpZEdoeVpXVkVVMlZqZFhKbFJXNWhZbXhsWkNJNmRISjFaU3dpY0dGNWNHRnNSVzVoWW14bFpDSTZkSEoxWlN3aWNHRjVjR0ZzSWpwN0ltUnBjM0JzWVhsT1lXMWxJam9pUVdOdFpTQlhhV1JuWlhSekxDQk1kR1F1SUNoVFlXNWtZbTk0S1NJc0ltTnNhV1Z1ZEVsa0lqcHVkV3hzTENKd2NtbDJZV041VlhKc0lqb2lhSFIwY0RvdkwyVjRZVzF3YkdVdVkyOXRMM0J3SWl3aWRYTmxja0ZuY21WbGJXVnVkRlZ5YkNJNkltaDBkSEE2THk5bGVHRnRjR3hsTG1OdmJTOTBiM01pTENKaVlYTmxWWEpzSWpvaWFIUjBjSE02THk5aGMzTmxkSE11WW5KaGFXNTBjbVZsWjJGMFpYZGhlUzVqYjIwaUxDSmhjM05sZEhOVmNtd2lPaUpvZEhSd2N6b3ZMMk5vWldOcmIzVjBMbkJoZVhCaGJDNWpiMjBpTENKa2FYSmxZM1JDWVhObFZYSnNJanB1ZFd4c0xDSmhiR3h2ZDBoMGRIQWlPblJ5ZFdVc0ltVnVkbWx5YjI1dFpXNTBUbTlPWlhSM2IzSnJJanAwY25WbExDSmxiblpwY205dWJXVnVkQ0k2SW05bVpteHBibVVpTENKMWJuWmxkSFJsWkUxbGNtTm9ZVzUwSWpwbVlXeHpaU3dpWW5KaGFXNTBjbVZsUTJ4cFpXNTBTV1FpT2lKdFlYTjBaWEpqYkdsbGJuUXpJaXdpWW1sc2JHbHVaMEZuY21WbGJXVnVkSE5GYm1GaWJHVmtJanAwY25WbExDSnRaWEpqYUdGdWRFRmpZMjkxYm5SSlpDSTZJbUZqYldWM2FXUm5aWFJ6YkhSa2MyRnVaR0p2ZUNJc0ltTjFjbkpsYm1ONVNYTnZRMjlrWlNJNklsVlRSQ0o5TENKamIybHVZbUZ6WlVWdVlXSnNaV1FpT21aaGJITmxMQ0p0WlhKamFHRnVkRWxrSWpvaU16UTRjR3M1WTJkbU0ySm5lWGN5WWlJc0luWmxibTF2SWpvaWIyWm1JbjA9JyxcbiAgICBwYXltZW50TWV0aG9kOiBwYXltZW50TWV0aG9kU2hpbS5nZXRQYXltZW50TWV0aG9kcygpLFxuICAgIHBtVXBkYXRlSWQ6IFwiMTIzNDVhc2RmZ1wiLFxuICAgIGNyZWF0ZVBheW1lbnRNZXRob2Q6IGZ1bmN0aW9uKGRhdGEsIG5vbmNlLCBjYikge1xuICAgICAgY29uc29sZS5sb2coJ2NyZWF0ZSBwYXltZW50IG1ldGhvZCcpO1xuICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICBjb25zb2xlLmxvZyhub25jZSk7XG4gICAgICByZXR1cm4gY2Ioe30pO1xuICAgIH0sXG4gICAgdXBkYXRlUGF5bWVudE1ldGhvZDogZnVuY3Rpb24oZGF0YSwgbm9uY2UsIGNiKSB7XG4gICAgICBjb25zb2xlLmxvZygndXBkYXRlIHBheW1lbnQgbWV0aG9kJyk7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIGNvbnNvbGUubG9nKG5vbmNlKTtcbiAgICAgIHJldHVybiBjYih7fSk7XG4gICAgfSxcbiAgICBkZWxldGVQYXltZW50TWV0aG9kOiBmdW5jdGlvbihkYXRhLCBjYikge1xuICAgICAgY29uc29sZS5sb2coJ2RlbGV0ZSBwYXltZW50IG1ldGhvZCcpO1xuICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICByZXR1cm4gY2Ioe1xuICAgICAgICBlcnJvcjogXCJub3BlLCBjYW4ndCBkbyBpdFwiXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGdldEludm9pY2U6IGZ1bmN0aW9uKGlkLCBjYikge1xuICAgICAgcmV0dXJuIGNiKHdpbmRvdy5wYXltZW50TWV0aG9kU2hpbS5nZXRJbnZvaWNlKGlkKSk7XG4gICAgfSxcbiAgICBwYXlJbnZvaWNlTm93OiBmdW5jdGlvbihpZCwgY2IpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwicGF5aW5nIGludm9pY2UgXCIgKyBpZCk7XG4gICAgICByZXR1cm4gY2Ioe30pO1xuICAgIH1cbiAgfTtcbiAgY3JlYXRlU3RhbmRhcmRDb21wb25lbnQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gd2luZG93LnBheU1ldGhvZHMgPSBuZXcgbmFub2JveC5QYXltZW50TWV0aG9kcygkKFwiLnN0YWdlLWhvbGRlclwiKSwgY29uZmlnLCB0cnVlKTtcbiAgfTtcbiAgY3JlYXRlTWljcm9DaG9vc2VyID0gZnVuY3Rpb24oKSB7XG4gICAgd2luZG93LnBheU1ldGhvZHMgPSBuZXcgbmFub2JveC5QYXltZW50TWV0aG9kcygkKFwiLnN0YWdlLWhvbGRlclwiKSwgY29uZmlnLCBmYWxzZSk7XG4gICAgcmV0dXJuIHBheU1ldGhvZHMuY3JlYXRlTWljcm9DaG9vc2VyKCd6dW1pZXonLCBmdW5jdGlvbihuZXdQYXlNZXRob2QpIHtcbiAgICAgIHJldHVybiBjb25zb2xlLmxvZyhuZXdQYXlNZXRob2QpO1xuICAgIH0pO1xuICB9O1xuICBjcmVhdGVQYXltZW50QWRkZXIgPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB3aW5kb3cucGF5TWV0aG9kcyA9IG5ldyBuYW5vYm94LlBheW1lbnRNZXRob2RzKCQoXCIuc3RhZ2UtaG9sZGVyXCIpLCBjb25maWcsIGZhbHNlKTtcbiAgICAgIHJldHVybiBwYXlNZXRob2RzLmNyZWF0ZVBheU1ldGhvZCh7fSwgJChcImJvZHlcIiksIHRydWUpO1xuICAgIH07XG4gIH0pKHRoaXMpO1xuICByZXR1cm4gY3JlYXRlU3RhbmRhcmRDb21wb25lbnQoKTtcbn07XG4iXX0=
