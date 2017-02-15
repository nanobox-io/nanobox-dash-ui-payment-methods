(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var PaymentMethodsShim;

module.exports = PaymentMethodsShim = (function() {
  function PaymentMethodsShim() {}

  PaymentMethodsShim.prototype.getPaymentMethods = function() {
    return [this.getPaymentMethod('work'), this.getPaymentMethod('zumiez'), this.getPaymentMethod('personal')];
  };

  PaymentMethodsShim.prototype.getInvoice = function(paymentMethodId) {
    var paymentMethod;
    paymentMethod = this.getPaymentMethod(paymentMethodId);
    return {
      state: "pending",
      id: "23123",
      number: "23123",
      total: "945.00",
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
      appBillingEvents: [this.getAppBillingEvent(), this.getAppBillingEvent(), this.getAppBillingEvent(), this.getAppBillingEvent()],
      otherBillingEvents: [this.getOtherBillingEvent()]
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
        name: "Work",
        kind: "card",
        billingDay: 23,
        userInvoiceInfo: "Some long Company name\nVat ID : 33213451",
        meta: {
          NameOnCard: "John Doe",
          lastFourDigits: 1234,
          cardType: "visa",
          expirationDate: "04/18",
          imageURL: "http://thehandbagresource.com/images/payment-visa.png",
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
        name: "Zumiez",
        kind: "direct",
        billingDay: 2,
        userInvoiceInfo: "",
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
        name: "Personal",
        kind: "paypal",
        billingDay: 12,
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
  var config;
  config = {
    clientToken: 'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiI2OTVkNmE1ZjZiNzNkOWRlYjQ2MmZkMjkwZjBhNTM4Mzg3MTU4OTBlMWZmNGFhMGY0Y2MzM2YxZTQ1NzJiZmVjfGNyZWF0ZWRfYXQ9MjAxNy0wMS0wM1QxOTowMzoxNC4yNzYyMTM4MjkrMDAwMFx1MDAyNm1lcmNoYW50X2lkPTM0OHBrOWNnZjNiZ3l3MmJcdTAwMjZwdWJsaWNfa2V5PTJuMjQ3ZHY4OWJxOXZtcHIiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMzQ4cGs5Y2dmM2JneXcyYi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzLzM0OHBrOWNnZjNiZ3l3MmIvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tLzM0OHBrOWNnZjNiZ3l3MmIifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQWNtZSBXaWRnZXRzLCBMdGQuIChTYW5kYm94KSIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQzIiwiYmlsbGluZ0FncmVlbWVudHNFbmFibGVkIjp0cnVlLCJtZXJjaGFudEFjY291bnRJZCI6ImFjbWV3aWRnZXRzbHRkc2FuZGJveCIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJjb2luYmFzZUVuYWJsZWQiOmZhbHNlLCJtZXJjaGFudElkIjoiMzQ4cGs5Y2dmM2JneXcyYiIsInZlbm1vIjoib2ZmIn0=',
    paymentMethods: paymentMethodShim.getPaymentMethods(),
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
  window.payMethods = new nanobox.PaymentMethods($(".stage-holder"), config, true);
  return payMethods.displayInvoice('work', 'work');
};

},{"./shim/payment-methods":1}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9ndWxwLWNvZmZlZWlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic2hpbS9wYXltZW50LW1ldGhvZHMuY29mZmVlIiwic3RhZ2UuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFBheW1lbnRNZXRob2RzU2hpbTtcblxubW9kdWxlLmV4cG9ydHMgPSBQYXltZW50TWV0aG9kc1NoaW0gPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIFBheW1lbnRNZXRob2RzU2hpbSgpIHt9XG5cbiAgUGF5bWVudE1ldGhvZHNTaGltLnByb3RvdHlwZS5nZXRQYXltZW50TWV0aG9kcyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBbdGhpcy5nZXRQYXltZW50TWV0aG9kKCd3b3JrJyksIHRoaXMuZ2V0UGF5bWVudE1ldGhvZCgnenVtaWV6JyksIHRoaXMuZ2V0UGF5bWVudE1ldGhvZCgncGVyc29uYWwnKV07XG4gIH07XG5cbiAgUGF5bWVudE1ldGhvZHNTaGltLnByb3RvdHlwZS5nZXRJbnZvaWNlID0gZnVuY3Rpb24ocGF5bWVudE1ldGhvZElkKSB7XG4gICAgdmFyIHBheW1lbnRNZXRob2Q7XG4gICAgcGF5bWVudE1ldGhvZCA9IHRoaXMuZ2V0UGF5bWVudE1ldGhvZChwYXltZW50TWV0aG9kSWQpO1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0ZTogXCJwZW5kaW5nXCIsXG4gICAgICBpZDogXCIyMzEyM1wiLFxuICAgICAgbnVtYmVyOiBcIjIzMTIzXCIsXG4gICAgICB0b3RhbDogXCI5NDUuMDBcIixcbiAgICAgIGJpbGxpbmdEYXRlOiAxNDU1MjI5OTEzMDAwLFxuICAgICAgcGFpZERhdGU6IDE0NTUyMjk5MTMwMDAsXG4gICAgICBlcnJvcjogXCJVbmFibGUgdG8gUHJvY2VzcyBDYXJkXCIsXG4gICAgICBwYWlkVmlhOiB7XG4gICAgICAgIGtpbmQ6ICdjYXJkJyxcbiAgICAgICAgbWV0YToge1xuICAgICAgICAgIGxhc3RGb3VyRGlnaXRzOiAxMjM0XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwYXltZW50TWV0aG9kOiB7XG4gICAgICAgIHVzZXJJbnZvaWNlSW5mbzogcGF5bWVudE1ldGhvZC51c2VySW52b2ljZUluZm9cbiAgICAgIH0sXG4gICAgICBhcHBCaWxsaW5nRXZlbnRzOiBbdGhpcy5nZXRBcHBCaWxsaW5nRXZlbnQoKSwgdGhpcy5nZXRBcHBCaWxsaW5nRXZlbnQoKSwgdGhpcy5nZXRBcHBCaWxsaW5nRXZlbnQoKSwgdGhpcy5nZXRBcHBCaWxsaW5nRXZlbnQoKV0sXG4gICAgICBvdGhlckJpbGxpbmdFdmVudHM6IFt0aGlzLmdldE90aGVyQmlsbGluZ0V2ZW50KCldXG4gICAgfTtcbiAgfTtcblxuICBQYXltZW50TWV0aG9kc1NoaW0ucHJvdG90eXBlLmdldEFwcEJpbGxpbmdFdmVudCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBhY3Rpb246IFwiY2hhcmdlXCIsXG4gICAgICBhcHA6IHtcbiAgICAgICAgbmFtZTogXCJkaXN0aW5jdC1kZWxzaWVcIlxuICAgICAgfSxcbiAgICAgIHBsYW46IHtcbiAgICAgICAgbmFtZTogXCJzdGFydHVwXCJcbiAgICAgIH0sXG4gICAgICBhbW91bnQ6IFwiMTAwLjAwXCIsXG4gICAgICBzdGFydEF0OiAxNDUyNTUxNTEzMDAwLFxuICAgICAgZW5kQXQ6IDE0NTUyMjk5MTMwMDBcbiAgICB9O1xuICB9O1xuXG4gIFBheW1lbnRNZXRob2RzU2hpbS5wcm90b3R5cGUuZ2V0T3RoZXJCaWxsaW5nRXZlbnQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWN0aW9uOiBcImNyZWRpdFwiLFxuICAgICAgYW1vdW50OiBcIi0xMDAuMDBcIixcbiAgICAgIGRlc2NyaXB0aW9uOiBcIk9wZW4gU291cmNlIERpc2NvdW50IC0gZGlzdGluY3QgZGVsc2llXCJcbiAgICB9O1xuICB9O1xuXG4gIFBheW1lbnRNZXRob2RzU2hpbS5wcm90b3R5cGUuZ2V0UGF5bWVudE1ldGhvZCA9IGZ1bmN0aW9uKGlkKSB7XG4gICAgaWYgKGlkID09IG51bGwpIHtcbiAgICAgIGlkID0gXCJ3b3JrXCI7XG4gICAgfVxuICAgIGlmIChpZCA9PT0gXCJ3b3JrXCIpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlkOiBcIndvcmtcIixcbiAgICAgICAgbmFtZTogXCJXb3JrXCIsXG4gICAgICAgIGtpbmQ6IFwiY2FyZFwiLFxuICAgICAgICBiaWxsaW5nRGF5OiAyMyxcbiAgICAgICAgdXNlckludm9pY2VJbmZvOiBcIlNvbWUgbG9uZyBDb21wYW55IG5hbWVcXG5WYXQgSUQgOiAzMzIxMzQ1MVwiLFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgTmFtZU9uQ2FyZDogXCJKb2huIERvZVwiLFxuICAgICAgICAgIGxhc3RGb3VyRGlnaXRzOiAxMjM0LFxuICAgICAgICAgIGNhcmRUeXBlOiBcInZpc2FcIixcbiAgICAgICAgICBleHBpcmF0aW9uRGF0ZTogXCIwNC8xOFwiLFxuICAgICAgICAgIGltYWdlVVJMOiBcImh0dHA6Ly90aGVoYW5kYmFncmVzb3VyY2UuY29tL2ltYWdlcy9wYXltZW50LXZpc2EucG5nXCIsXG4gICAgICAgICAgY3Z2OiAxMjNcbiAgICAgICAgfSxcbiAgICAgICAgYXBwczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwibWFpblwiLFxuICAgICAgICAgICAgaHJlZjogXCIvc29tZS91cmxcIlxuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6IFwic29tZS1hcHBcIixcbiAgICAgICAgICAgIGhyZWY6IFwiL3NvbWUvdXJsXCJcbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiBcImZhY2Vib29rLWFwcFwiLFxuICAgICAgICAgICAgaHJlZjogXCIvc29tZS91cmxcIlxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgaW52b2ljZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogJ3dvcmsnLFxuICAgICAgICAgICAgc3RhcnRBdDogMTQ1MjU1MTUxMzAwMCxcbiAgICAgICAgICAgIGVuZEF0OiAxNDU1MjI5OTEzMDAwXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgaWQ6ICd6dW1pZXonLFxuICAgICAgICAgICAgc3RhcnRBdDogMTQ1NTIyOTkxMzAwMCxcbiAgICAgICAgICAgIGVuZEF0OiAxNDU3NzM1NTEzMDAwXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAoaWQgPT09IFwienVtaWV6XCIpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlkOiBcInp1bWllelwiLFxuICAgICAgICBuYW1lOiBcIlp1bWllelwiLFxuICAgICAgICBraW5kOiBcImRpcmVjdFwiLFxuICAgICAgICBiaWxsaW5nRGF5OiAyLFxuICAgICAgICB1c2VySW52b2ljZUluZm86IFwiXCIsXG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICBhY2NvdW50SWQ6IFwiam9obkBkb2UuaW9cIlxuICAgICAgICB9LFxuICAgICAgICBhcHBzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJ6dW1pZXotc2l0ZVwiLFxuICAgICAgICAgICAgaHJlZjogXCIvc29tZS91cmxcIlxuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIG5hbWU6IFwienVtaWV6LWFkbWluXCIsXG4gICAgICAgICAgICBocmVmOiBcIi9zb21lL3VybFwiXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBpbnZvaWNlczogW11cbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlkOiBcInBlcnNvbmFsXCIsXG4gICAgICAgIG5hbWU6IFwiUGVyc29uYWxcIixcbiAgICAgICAga2luZDogXCJwYXlwYWxcIixcbiAgICAgICAgYmlsbGluZ0RheTogMTIsXG4gICAgICAgIHVzZXJJbnZvaWNlSW5mbzogXCJJIGxvdmUgUGF5cGFsXCIsXG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICBhY2NvdW50SWQ6IFwiam9obkBkb2UuaW9cIlxuICAgICAgICB9LFxuICAgICAgICBhcHBzOiBbXSxcbiAgICAgICAgaW52b2ljZXM6IFtdXG4gICAgICB9O1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gUGF5bWVudE1ldGhvZHNTaGltO1xuXG59KSgpO1xuIiwidmFyIFBheW1lbnRNZXRob2RzU2hpbTtcblxuUGF5bWVudE1ldGhvZHNTaGltID0gcmVxdWlyZSgnLi9zaGltL3BheW1lbnQtbWV0aG9kcycpO1xuXG53aW5kb3cucGF5bWVudE1ldGhvZFNoaW0gPSBuZXcgUGF5bWVudE1ldGhvZHNTaGltKCk7XG5cbndpbmRvdy50ZXN0UGF5bWVudE1ldGhvZHNMb2NhbGx5ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBjb25maWc7XG4gIGNvbmZpZyA9IHtcbiAgICBjbGllbnRUb2tlbjogJ2V5SjJaWEp6YVc5dUlqb3lMQ0poZFhSb2IzSnBlbUYwYVc5dVJtbHVaMlZ5Y0hKcGJuUWlPaUkyT1RWa05tRTFaalppTnpOa09XUmxZalEyTW1aa01qa3daakJoTlRNNE16ZzNNVFU0T1RCbE1XWm1OR0ZoTUdZMFkyTXpNMll4WlRRMU56SmlabVZqZkdOeVpXRjBaV1JmWVhROU1qQXhOeTB3TVMwd00xUXhPVG93TXpveE5DNHlOell5TVRNNE1qa3JNREF3TUZ4MU1EQXlObTFsY21Ob1lXNTBYMmxrUFRNME9IQnJPV05uWmpOaVozbDNNbUpjZFRBd01qWndkV0pzYVdOZmEyVjVQVEp1TWpRM1pIWTRPV0p4T1hadGNISWlMQ0pqYjI1bWFXZFZjbXdpT2lKb2RIUndjem92TDJGd2FTNXpZVzVrWW05NExtSnlZV2x1ZEhKbFpXZGhkR1YzWVhrdVkyOXRPalEwTXk5dFpYSmphR0Z1ZEhNdk16UTRjR3M1WTJkbU0ySm5lWGN5WWk5amJHbGxiblJmWVhCcEwzWXhMMk52Ym1acFozVnlZWFJwYjI0aUxDSmphR0ZzYkdWdVoyVnpJanBiWFN3aVpXNTJhWEp2Ym0xbGJuUWlPaUp6WVc1a1ltOTRJaXdpWTJ4cFpXNTBRWEJwVlhKc0lqb2lhSFIwY0hNNkx5OWhjR2t1YzJGdVpHSnZlQzVpY21GcGJuUnlaV1ZuWVhSbGQyRjVMbU52YlRvME5ETXZiV1Z5WTJoaGJuUnpMek0wT0hCck9XTm5aak5pWjNsM01tSXZZMnhwWlc1MFgyRndhU0lzSW1GemMyVjBjMVZ5YkNJNkltaDBkSEJ6T2k4dllYTnpaWFJ6TG1KeVlXbHVkSEpsWldkaGRHVjNZWGt1WTI5dElpd2lZWFYwYUZWeWJDSTZJbWgwZEhCek9pOHZZWFYwYUM1MlpXNXRieTV6WVc1a1ltOTRMbUp5WVdsdWRISmxaV2RoZEdWM1lYa3VZMjl0SWl3aVlXNWhiSGwwYVdOeklqcDdJblZ5YkNJNkltaDBkSEJ6T2k4dlkyeHBaVzUwTFdGdVlXeDVkR2xqY3k1ellXNWtZbTk0TG1KeVlXbHVkSEpsWldkaGRHVjNZWGt1WTI5dEx6TTBPSEJyT1dOblpqTmlaM2wzTW1JaWZTd2lkR2h5WldWRVUyVmpkWEpsUlc1aFlteGxaQ0k2ZEhKMVpTd2ljR0Y1Y0dGc1JXNWhZbXhsWkNJNmRISjFaU3dpY0dGNWNHRnNJanA3SW1ScGMzQnNZWGxPWVcxbElqb2lRV050WlNCWGFXUm5aWFJ6TENCTWRHUXVJQ2hUWVc1a1ltOTRLU0lzSW1Oc2FXVnVkRWxrSWpwdWRXeHNMQ0p3Y21sMllXTjVWWEpzSWpvaWFIUjBjRG92TDJWNFlXMXdiR1V1WTI5dEwzQndJaXdpZFhObGNrRm5jbVZsYldWdWRGVnliQ0k2SW1oMGRIQTZMeTlsZUdGdGNHeGxMbU52YlM5MGIzTWlMQ0ppWVhObFZYSnNJam9pYUhSMGNITTZMeTloYzNObGRITXVZbkpoYVc1MGNtVmxaMkYwWlhkaGVTNWpiMjBpTENKaGMzTmxkSE5WY213aU9pSm9kSFJ3Y3pvdkwyTm9aV05yYjNWMExuQmhlWEJoYkM1amIyMGlMQ0prYVhKbFkzUkNZWE5sVlhKc0lqcHVkV3hzTENKaGJHeHZkMGgwZEhBaU9uUnlkV1VzSW1WdWRtbHliMjV0Wlc1MFRtOU9aWFIzYjNKcklqcDBjblZsTENKbGJuWnBjbTl1YldWdWRDSTZJbTltWm14cGJtVWlMQ0oxYm5abGRIUmxaRTFsY21Ob1lXNTBJanBtWVd4elpTd2lZbkpoYVc1MGNtVmxRMnhwWlc1MFNXUWlPaUp0WVhOMFpYSmpiR2xsYm5Reklpd2lZbWxzYkdsdVowRm5jbVZsYldWdWRITkZibUZpYkdWa0lqcDBjblZsTENKdFpYSmphR0Z1ZEVGalkyOTFiblJKWkNJNkltRmpiV1YzYVdSblpYUnpiSFJrYzJGdVpHSnZlQ0lzSW1OMWNuSmxibU41U1hOdlEyOWtaU0k2SWxWVFJDSjlMQ0pqYjJsdVltRnpaVVZ1WVdKc1pXUWlPbVpoYkhObExDSnRaWEpqYUdGdWRFbGtJam9pTXpRNGNHczVZMmRtTTJKbmVYY3lZaUlzSW5abGJtMXZJam9pYjJabUluMD0nLFxuICAgIHBheW1lbnRNZXRob2RzOiBwYXltZW50TWV0aG9kU2hpbS5nZXRQYXltZW50TWV0aG9kcygpLFxuICAgIGNyZWF0ZVBheW1lbnRNZXRob2Q6IGZ1bmN0aW9uKGRhdGEsIG5vbmNlLCBjYikge1xuICAgICAgY29uc29sZS5sb2coJ2NyZWF0ZSBwYXltZW50IG1ldGhvZCcpO1xuICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICBjb25zb2xlLmxvZyhub25jZSk7XG4gICAgICByZXR1cm4gY2Ioe30pO1xuICAgIH0sXG4gICAgdXBkYXRlUGF5bWVudE1ldGhvZDogZnVuY3Rpb24oZGF0YSwgbm9uY2UsIGNiKSB7XG4gICAgICBjb25zb2xlLmxvZygndXBkYXRlIHBheW1lbnQgbWV0aG9kJyk7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIGNvbnNvbGUubG9nKG5vbmNlKTtcbiAgICAgIHJldHVybiBjYih7fSk7XG4gICAgfSxcbiAgICBkZWxldGVQYXltZW50TWV0aG9kOiBmdW5jdGlvbihkYXRhLCBjYikge1xuICAgICAgY29uc29sZS5sb2coJ2RlbGV0ZSBwYXltZW50IG1ldGhvZCcpO1xuICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICByZXR1cm4gY2Ioe1xuICAgICAgICBlcnJvcjogXCJub3BlLCBjYW4ndCBkbyBpdFwiXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGdldEludm9pY2U6IGZ1bmN0aW9uKGlkLCBjYikge1xuICAgICAgcmV0dXJuIGNiKHdpbmRvdy5wYXltZW50TWV0aG9kU2hpbS5nZXRJbnZvaWNlKGlkKSk7XG4gICAgfSxcbiAgICBwYXlJbnZvaWNlTm93OiBmdW5jdGlvbihpZCwgY2IpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwicGF5aW5nIGludm9pY2UgXCIgKyBpZCk7XG4gICAgICByZXR1cm4gY2Ioe30pO1xuICAgIH1cbiAgfTtcbiAgd2luZG93LnBheU1ldGhvZHMgPSBuZXcgbmFub2JveC5QYXltZW50TWV0aG9kcygkKFwiLnN0YWdlLWhvbGRlclwiKSwgY29uZmlnLCB0cnVlKTtcbiAgcmV0dXJuIHBheU1ldGhvZHMuZGlzcGxheUludm9pY2UoJ3dvcmsnLCAnd29yaycpO1xufTtcbiJdfQ==
