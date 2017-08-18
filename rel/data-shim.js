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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzaGltL3BheW1lbnQtbWV0aG9kcy5jb2ZmZWUiLCJzdGFnZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUGF5bWVudE1ldGhvZHNTaGltO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBheW1lbnRNZXRob2RzU2hpbSA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gUGF5bWVudE1ldGhvZHNTaGltKCkge31cblxuICBQYXltZW50TWV0aG9kc1NoaW0ucHJvdG90eXBlLmdldFBheW1lbnRNZXRob2RzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UGF5bWVudE1ldGhvZCgnd29yaycpO1xuICB9O1xuXG4gIFBheW1lbnRNZXRob2RzU2hpbS5wcm90b3R5cGUuZ2V0SW52b2ljZSA9IGZ1bmN0aW9uKHBheW1lbnRNZXRob2RJZCkge1xuICAgIHZhciBwYXltZW50TWV0aG9kO1xuICAgIHBheW1lbnRNZXRob2QgPSB0aGlzLmdldFBheW1lbnRNZXRob2QocGF5bWVudE1ldGhvZElkKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdGU6IFwicGVuZGluZ1wiLFxuICAgICAgaWQ6IFwiMjMxMjNcIixcbiAgICAgIG51bWJlcjogXCIyMzEyM1wiLFxuICAgICAgdG90YWw6IFwiMTAwLjAwXCIsXG4gICAgICBiaWxsaW5nRGF0ZTogMTQ1NTIyOTkxMzAwMCxcbiAgICAgIHBhaWREYXRlOiAxNDU1MjI5OTEzMDAwLFxuICAgICAgZXJyb3I6IFwiVW5hYmxlIHRvIFByb2Nlc3MgQ2FyZFwiLFxuICAgICAgcGFpZFZpYToge1xuICAgICAgICBraW5kOiAnY2FyZCcsXG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICBsYXN0Rm91ckRpZ2l0czogMTIzNFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcGF5bWVudE1ldGhvZDoge1xuICAgICAgICB1c2VySW52b2ljZUluZm86IHBheW1lbnRNZXRob2QudXNlckludm9pY2VJbmZvXG4gICAgICB9LFxuICAgICAgbGluZUl0ZW1zOiBbdGhpcy5nZXRBcHBCaWxsaW5nRXZlbnRORVcoMCksIHRoaXMuZ2V0QXBwQmlsbGluZ0V2ZW50TkVXKDEpXVxuICAgIH07XG4gIH07XG5cbiAgUGF5bWVudE1ldGhvZHNTaGltLnByb3RvdHlwZS5nZXRBcHBCaWxsaW5nRXZlbnQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWN0aW9uOiBcImNoYXJnZVwiLFxuICAgICAgYXBwOiB7XG4gICAgICAgIG5hbWU6IFwiZGlzdGluY3QtZGVsc2llXCJcbiAgICAgIH0sXG4gICAgICBwbGFuOiB7XG4gICAgICAgIG5hbWU6IFwic3RhcnR1cFwiXG4gICAgICB9LFxuICAgICAgYW1vdW50OiBcIjEwMC4wMFwiLFxuICAgICAgc3RhcnRBdDogMTQ1MjU1MTUxMzAwMCxcbiAgICAgIGVuZEF0OiAxNDU1MjI5OTEzMDAwXG4gICAgfTtcbiAgfTtcblxuICBQYXltZW50TWV0aG9kc1NoaW0ucHJvdG90eXBlLmdldEFwcEJpbGxpbmdFdmVudE5FVyA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgdmFyIGFyO1xuICAgIGlmIChpbmRleCA9PSBudWxsKSB7XG4gICAgICBpbmRleCA9IDA7XG4gICAgfVxuICAgIGFyID0gW1xuICAgICAge1xuICAgICAgICBuYW1lOiBcIlRlYW0gUGxhbiAtIDEwIG1lbWJlcnMgQCAkMTUvbWVtYmVyXCIsXG4gICAgICAgIHRvdGFsOiBcIiQxNTBcIixcbiAgICAgICAgY29udGV4dDogXCJuYW5vYm94IHRlYW1cIlxuICAgICAgfSwge1xuICAgICAgICBuYW1lOiBcIkJldGEgdXNlciBkaXNjb3VudFwiLFxuICAgICAgICB0b3RhbDogXCItJDUwXCIsXG4gICAgICAgIGNvbnRleHQ6IFwiXCJcbiAgICAgIH0sIHtcbiAgICAgICAgbmFtZTogXCJUZWFtIFBsYW4gd2l0aCAxMCBtZW1iZXJzIEAgJDE1L21lbWJlclwiLFxuICAgICAgICB0b3RhbDogXCIkMTUwXCIsXG4gICAgICAgIGNvbnRleHQ6IFwibmFub2JveCB0ZWFtXCJcbiAgICAgIH0sIHtcbiAgICAgICAgbmFtZTogXCJUZWFtIFBsYW4gd2l0aCAxMCBtZW1iZXJzIEAgJDE1L21lbWJlclwiLFxuICAgICAgICB0b3RhbDogXCIkMTUwXCIsXG4gICAgICAgIGNvbnRleHQ6IFwibmFub2JveCB0ZWFtXCJcbiAgICAgIH1cbiAgICBdO1xuICAgIHJldHVybiB7XG4gICAgICBhY3Rpb246IFwiY2hhcmdlXCIsXG4gICAgICBuYW1lOiBhcltpbmRleF0ubmFtZSxcbiAgICAgIGFtb3VudDogYXJbaW5kZXhdLnRvdGFsLFxuICAgICAgY29udGV4dDoge1xuICAgICAgICBuYW1lOiBhcltpbmRleF0uY29udGV4dCxcbiAgICAgICAgdHlwZTogXCJhcHBcIlxuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgUGF5bWVudE1ldGhvZHNTaGltLnByb3RvdHlwZS5nZXRPdGhlckJpbGxpbmdFdmVudCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBhY3Rpb246IFwiY3JlZGl0XCIsXG4gICAgICBhbW91bnQ6IFwiLTEwMC4wMFwiLFxuICAgICAgZGVzY3JpcHRpb246IFwiT3BlbiBTb3VyY2UgRGlzY291bnQgLSBkaXN0aW5jdCBkZWxzaWVcIlxuICAgIH07XG4gIH07XG5cbiAgUGF5bWVudE1ldGhvZHNTaGltLnByb3RvdHlwZS5nZXRQYXltZW50TWV0aG9kID0gZnVuY3Rpb24oaWQpIHtcbiAgICBpZiAoaWQgPT0gbnVsbCkge1xuICAgICAgaWQgPSBcIndvcmtcIjtcbiAgICB9XG4gICAgaWYgKGlkID09PSBcIndvcmtcIikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IFwid29ya1wiLFxuICAgICAgICBraW5kOiBcImNhcmRcIixcbiAgICAgICAgYmlsbGluZ0RhdGU6IDE1MTQ5MzY2OTEwMDEsXG4gICAgICAgIHN0YXRlOiBcImFjdGl2ZVwiLFxuICAgICAgICB1c2VySW52b2ljZUluZm86IFwiU29tZSBsb25nIENvbXBhbnkgbmFtZVxcblZhdCBJRCA6IDMzMjEzNDUxXCIsXG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICBOYW1lT25DYXJkOiBcIkpvaG4gRG9lXCIsXG4gICAgICAgICAgbGFzdEZvdXJEaWdpdHM6IDEyMzQsXG4gICAgICAgICAgY2FyZFR5cGU6IFwidmlzYVwiLFxuICAgICAgICAgIGV4cGlyYXRpb25EYXRlOiBcIjA0LzE4XCIsXG4gICAgICAgICAgY3Z2OiAxMjNcbiAgICAgICAgfSxcbiAgICAgICAgYXBwczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwibWFpblwiLFxuICAgICAgICAgICAgaHJlZjogXCIvc29tZS91cmxcIlxuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6IFwic29tZS1hcHBcIixcbiAgICAgICAgICAgIGhyZWY6IFwiL3NvbWUvdXJsXCJcbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiBcImZhY2Vib29rLWFwcFwiLFxuICAgICAgICAgICAgaHJlZjogXCIvc29tZS91cmxcIlxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgaW52b2ljZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogJ3dvcmsnLFxuICAgICAgICAgICAgc3RhcnRBdDogMTQ1MjU1MTUxMzAwMCxcbiAgICAgICAgICAgIGVuZEF0OiAxNDU1MjI5OTEzMDAwXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6ICd6dW1pZXonLFxuICAgICAgICAgICAgc3RhcnRBdDogMTQ1NTIyOTkxMzAwMCxcbiAgICAgICAgICAgIGVuZEF0OiAxNDU3NzM1NTEzMDAwXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAoaWQgPT09IFwienVtaWV6XCIpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlkOiBcInp1bWllelwiLFxuICAgICAgICBraW5kOiBcImRpcmVjdFwiLFxuICAgICAgICBzdGF0ZTogXCJpbmFjdGl2ZVwiLFxuICAgICAgICBiaWxsaW5nRGF0ZTogMTUxNDkzNjY5MTAwMSxcbiAgICAgICAgdXNlckludm9pY2VJbmZvOiBcIlNvbWUgVmF0IGluZm9cIixcbiAgICAgICAgbWV0YToge1xuICAgICAgICAgIGFjY291bnRJZDogXCJqb2huQGRvZS5pb1wiXG4gICAgICAgIH0sXG4gICAgICAgIGFwcHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcInp1bWllei1zaXRlXCIsXG4gICAgICAgICAgICBocmVmOiBcIi9zb21lL3VybFwiXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogXCJ6dW1pZXotYWRtaW5cIixcbiAgICAgICAgICAgIGhyZWY6IFwiL3NvbWUvdXJsXCJcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGludm9pY2VzOiBbXVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IFwicGVyc29uYWxcIixcbiAgICAgICAga2luZDogXCJwYXlwYWxcIixcbiAgICAgICAgc3RhdGU6IFwiaW5hY3RpdmVcIixcbiAgICAgICAgYmlsbGluZ0RhdGU6IDE1MTQ5MzY2OTEwMDEsXG4gICAgICAgIHVzZXJJbnZvaWNlSW5mbzogXCJJIGxvdmUgUGF5cGFsXCIsXG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICBhY2NvdW50SWQ6IFwiam9obkBkb2UuaW9cIlxuICAgICAgICB9LFxuICAgICAgICBhcHBzOiBbXSxcbiAgICAgICAgaW52b2ljZXM6IFtdXG4gICAgICB9O1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gUGF5bWVudE1ldGhvZHNTaGltO1xuXG59KSgpO1xuIiwidmFyIFBheW1lbnRNZXRob2RzU2hpbTtcblxuUGF5bWVudE1ldGhvZHNTaGltID0gcmVxdWlyZSgnLi9zaGltL3BheW1lbnQtbWV0aG9kcycpO1xuXG53aW5kb3cucGF5bWVudE1ldGhvZFNoaW0gPSBuZXcgUGF5bWVudE1ldGhvZHNTaGltKCk7XG5cbndpbmRvdy50ZXN0UGF5bWVudE1ldGhvZHNMb2NhbGx5ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBjb25maWcsIGNyZWF0ZU1pY3JvQ2hvb3NlciwgY3JlYXRlUGF5bWVudEFkZGVyLCBjcmVhdGVTdGFuZGFyZENvbXBvbmVudDtcbiAgY29uZmlnID0ge1xuICAgIGNsaWVudFRva2VuOiAnZXlKMlpYSnphVzl1SWpveUxDSmhkWFJvYjNKcGVtRjBhVzl1Um1sdVoyVnljSEpwYm5RaU9pSTJPVFZrTm1FMVpqWmlOek5rT1dSbFlqUTJNbVprTWprd1pqQmhOVE00TXpnM01UVTRPVEJsTVdabU5HRmhNR1kwWTJNek0yWXhaVFExTnpKaVptVmpmR055WldGMFpXUmZZWFE5TWpBeE55MHdNUzB3TTFReE9Ub3dNem94TkM0eU56WXlNVE00TWprck1EQXdNRngxTURBeU5tMWxjbU5vWVc1MFgybGtQVE0wT0hCck9XTm5aak5pWjNsM01tSmNkVEF3TWpad2RXSnNhV05mYTJWNVBUSnVNalEzWkhZNE9XSnhPWFp0Y0hJaUxDSmpiMjVtYVdkVmNtd2lPaUpvZEhSd2N6b3ZMMkZ3YVM1ellXNWtZbTk0TG1KeVlXbHVkSEpsWldkaGRHVjNZWGt1WTI5dE9qUTBNeTl0WlhKamFHRnVkSE12TXpRNGNHczVZMmRtTTJKbmVYY3lZaTlqYkdsbGJuUmZZWEJwTDNZeEwyTnZibVpwWjNWeVlYUnBiMjRpTENKamFHRnNiR1Z1WjJWeklqcGJYU3dpWlc1MmFYSnZibTFsYm5RaU9pSnpZVzVrWW05NElpd2lZMnhwWlc1MFFYQnBWWEpzSWpvaWFIUjBjSE02THk5aGNHa3VjMkZ1WkdKdmVDNWljbUZwYm5SeVpXVm5ZWFJsZDJGNUxtTnZiVG8wTkRNdmJXVnlZMmhoYm5Sekx6TTBPSEJyT1dOblpqTmlaM2wzTW1JdlkyeHBaVzUwWDJGd2FTSXNJbUZ6YzJWMGMxVnliQ0k2SW1oMGRIQnpPaTh2WVhOelpYUnpMbUp5WVdsdWRISmxaV2RoZEdWM1lYa3VZMjl0SWl3aVlYVjBhRlZ5YkNJNkltaDBkSEJ6T2k4dllYVjBhQzUyWlc1dGJ5NXpZVzVrWW05NExtSnlZV2x1ZEhKbFpXZGhkR1YzWVhrdVkyOXRJaXdpWVc1aGJIbDBhV056SWpwN0luVnliQ0k2SW1oMGRIQnpPaTh2WTJ4cFpXNTBMV0Z1WVd4NWRHbGpjeTV6WVc1a1ltOTRMbUp5WVdsdWRISmxaV2RoZEdWM1lYa3VZMjl0THpNME9IQnJPV05uWmpOaVozbDNNbUlpZlN3aWRHaHlaV1ZFVTJWamRYSmxSVzVoWW14bFpDSTZkSEoxWlN3aWNHRjVjR0ZzUlc1aFlteGxaQ0k2ZEhKMVpTd2ljR0Y1Y0dGc0lqcDdJbVJwYzNCc1lYbE9ZVzFsSWpvaVFXTnRaU0JYYVdSblpYUnpMQ0JNZEdRdUlDaFRZVzVrWW05NEtTSXNJbU5zYVdWdWRFbGtJanB1ZFd4c0xDSndjbWwyWVdONVZYSnNJam9pYUhSMGNEb3ZMMlY0WVcxd2JHVXVZMjl0TDNCd0lpd2lkWE5sY2tGbmNtVmxiV1Z1ZEZWeWJDSTZJbWgwZEhBNkx5OWxlR0Z0Y0d4bExtTnZiUzkwYjNNaUxDSmlZWE5sVlhKc0lqb2lhSFIwY0hNNkx5OWhjM05sZEhNdVluSmhhVzUwY21WbFoyRjBaWGRoZVM1amIyMGlMQ0poYzNObGRITlZjbXdpT2lKb2RIUndjem92TDJOb1pXTnJiM1YwTG5CaGVYQmhiQzVqYjIwaUxDSmthWEpsWTNSQ1lYTmxWWEpzSWpwdWRXeHNMQ0poYkd4dmQwaDBkSEFpT25SeWRXVXNJbVZ1ZG1seWIyNXRaVzUwVG05T1pYUjNiM0pySWpwMGNuVmxMQ0psYm5acGNtOXViV1Z1ZENJNkltOW1abXhwYm1VaUxDSjFiblpsZEhSbFpFMWxjbU5vWVc1MElqcG1ZV3h6WlN3aVluSmhhVzUwY21WbFEyeHBaVzUwU1dRaU9pSnRZWE4wWlhKamJHbGxiblF6SWl3aVltbHNiR2x1WjBGbmNtVmxiV1Z1ZEhORmJtRmliR1ZrSWpwMGNuVmxMQ0p0WlhKamFHRnVkRUZqWTI5MWJuUkpaQ0k2SW1GamJXVjNhV1JuWlhSemJIUmtjMkZ1WkdKdmVDSXNJbU4xY25KbGJtTjVTWE52UTI5a1pTSTZJbFZUUkNKOUxDSmpiMmx1WW1GelpVVnVZV0pzWldRaU9tWmhiSE5sTENKdFpYSmphR0Z1ZEVsa0lqb2lNelE0Y0dzNVkyZG1NMkpuZVhjeVlpSXNJblpsYm0xdklqb2liMlptSW4wPScsXG4gICAgcGF5bWVudE1ldGhvZDogcGF5bWVudE1ldGhvZFNoaW0uZ2V0UGF5bWVudE1ldGhvZHMoKSxcbiAgICBwbVVwZGF0ZUlkOiBcIjEyMzQ1YXNkZmdcIixcbiAgICBjcmVhdGVQYXltZW50TWV0aG9kOiBmdW5jdGlvbihkYXRhLCBub25jZSwgY2IpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdjcmVhdGUgcGF5bWVudCBtZXRob2QnKTtcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgY29uc29sZS5sb2cobm9uY2UpO1xuICAgICAgcmV0dXJuIGNiKHt9KTtcbiAgICB9LFxuICAgIHVwZGF0ZVBheW1lbnRNZXRob2Q6IGZ1bmN0aW9uKGRhdGEsIG5vbmNlLCBjYikge1xuICAgICAgY29uc29sZS5sb2coJ3VwZGF0ZSBwYXltZW50IG1ldGhvZCcpO1xuICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICBjb25zb2xlLmxvZyhub25jZSk7XG4gICAgICByZXR1cm4gY2Ioe30pO1xuICAgIH0sXG4gICAgZGVsZXRlUGF5bWVudE1ldGhvZDogZnVuY3Rpb24oZGF0YSwgY2IpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdkZWxldGUgcGF5bWVudCBtZXRob2QnKTtcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgcmV0dXJuIGNiKHtcbiAgICAgICAgZXJyb3I6IFwibm9wZSwgY2FuJ3QgZG8gaXRcIlxuICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRJbnZvaWNlOiBmdW5jdGlvbihpZCwgY2IpIHtcbiAgICAgIHJldHVybiBjYih3aW5kb3cucGF5bWVudE1ldGhvZFNoaW0uZ2V0SW52b2ljZShpZCkpO1xuICAgIH0sXG4gICAgcGF5SW52b2ljZU5vdzogZnVuY3Rpb24oaWQsIGNiKSB7XG4gICAgICBjb25zb2xlLmxvZyhcInBheWluZyBpbnZvaWNlIFwiICsgaWQpO1xuICAgICAgcmV0dXJuIGNiKHt9KTtcbiAgICB9XG4gIH07XG4gIGNyZWF0ZVN0YW5kYXJkQ29tcG9uZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5wYXlNZXRob2RzID0gbmV3IG5hbm9ib3guUGF5bWVudE1ldGhvZHMoJChcIi5zdGFnZS1ob2xkZXJcIiksIGNvbmZpZywgdHJ1ZSk7XG4gIH07XG4gIGNyZWF0ZU1pY3JvQ2hvb3NlciA9IGZ1bmN0aW9uKCkge1xuICAgIHdpbmRvdy5wYXlNZXRob2RzID0gbmV3IG5hbm9ib3guUGF5bWVudE1ldGhvZHMoJChcIi5zdGFnZS1ob2xkZXJcIiksIGNvbmZpZywgZmFsc2UpO1xuICAgIHJldHVybiBwYXlNZXRob2RzLmNyZWF0ZU1pY3JvQ2hvb3NlcignenVtaWV6JywgZnVuY3Rpb24obmV3UGF5TWV0aG9kKSB7XG4gICAgICByZXR1cm4gY29uc29sZS5sb2cobmV3UGF5TWV0aG9kKTtcbiAgICB9KTtcbiAgfTtcbiAgY3JlYXRlUGF5bWVudEFkZGVyID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgd2luZG93LnBheU1ldGhvZHMgPSBuZXcgbmFub2JveC5QYXltZW50TWV0aG9kcygkKFwiLnN0YWdlLWhvbGRlclwiKSwgY29uZmlnLCBmYWxzZSk7XG4gICAgICByZXR1cm4gcGF5TWV0aG9kcy5jcmVhdGVQYXlNZXRob2Qoe30sICQoXCJib2R5XCIpLCB0cnVlKTtcbiAgICB9O1xuICB9KSh0aGlzKTtcbiAgcmV0dXJuIGNyZWF0ZVN0YW5kYXJkQ29tcG9uZW50KCk7XG59O1xuIl19
