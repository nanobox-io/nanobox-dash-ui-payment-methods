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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9ndWxwLWNvZmZlZWlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic2hpbS9wYXltZW50LW1ldGhvZHMuY29mZmVlIiwic3RhZ2UuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFBheW1lbnRNZXRob2RzU2hpbTtcblxubW9kdWxlLmV4cG9ydHMgPSBQYXltZW50TWV0aG9kc1NoaW0gPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIFBheW1lbnRNZXRob2RzU2hpbSgpIHt9XG5cbiAgUGF5bWVudE1ldGhvZHNTaGltLnByb3RvdHlwZS5nZXRQYXltZW50TWV0aG9kcyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmdldFBheW1lbnRNZXRob2QoJ3dvcmsnKTtcbiAgfTtcblxuICBQYXltZW50TWV0aG9kc1NoaW0ucHJvdG90eXBlLmdldEludm9pY2UgPSBmdW5jdGlvbihwYXltZW50TWV0aG9kSWQpIHtcbiAgICB2YXIgcGF5bWVudE1ldGhvZDtcbiAgICBwYXltZW50TWV0aG9kID0gdGhpcy5nZXRQYXltZW50TWV0aG9kKHBheW1lbnRNZXRob2RJZCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXRlOiBcInBlbmRpbmdcIixcbiAgICAgIGlkOiBcIjIzMTIzXCIsXG4gICAgICBudW1iZXI6IFwiMjMxMjNcIixcbiAgICAgIHRvdGFsOiBcIjk0NS4wMFwiLFxuICAgICAgYmlsbGluZ0RhdGU6IDE0NTUyMjk5MTMwMDAsXG4gICAgICBwYWlkRGF0ZTogMTQ1NTIyOTkxMzAwMCxcbiAgICAgIGVycm9yOiBcIlVuYWJsZSB0byBQcm9jZXNzIENhcmRcIixcbiAgICAgIHBhaWRWaWE6IHtcbiAgICAgICAga2luZDogJ2NhcmQnLFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgbGFzdEZvdXJEaWdpdHM6IDEyMzRcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHBheW1lbnRNZXRob2Q6IHtcbiAgICAgICAgdXNlckludm9pY2VJbmZvOiBwYXltZW50TWV0aG9kLnVzZXJJbnZvaWNlSW5mb1xuICAgICAgfSxcbiAgICAgIGFwcEJpbGxpbmdFdmVudHM6IFt0aGlzLmdldEFwcEJpbGxpbmdFdmVudCgpLCB0aGlzLmdldEFwcEJpbGxpbmdFdmVudCgpLCB0aGlzLmdldEFwcEJpbGxpbmdFdmVudCgpLCB0aGlzLmdldEFwcEJpbGxpbmdFdmVudCgpXSxcbiAgICAgIG90aGVyQmlsbGluZ0V2ZW50czogW3RoaXMuZ2V0T3RoZXJCaWxsaW5nRXZlbnQoKV1cbiAgICB9O1xuICB9O1xuXG4gIFBheW1lbnRNZXRob2RzU2hpbS5wcm90b3R5cGUuZ2V0QXBwQmlsbGluZ0V2ZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFjdGlvbjogXCJjaGFyZ2VcIixcbiAgICAgIGFwcDoge1xuICAgICAgICBuYW1lOiBcImRpc3RpbmN0LWRlbHNpZVwiXG4gICAgICB9LFxuICAgICAgcGxhbjoge1xuICAgICAgICBuYW1lOiBcInN0YXJ0dXBcIlxuICAgICAgfSxcbiAgICAgIGFtb3VudDogXCIxMDAuMDBcIixcbiAgICAgIHN0YXJ0QXQ6IDE0NTI1NTE1MTMwMDAsXG4gICAgICBlbmRBdDogMTQ1NTIyOTkxMzAwMFxuICAgIH07XG4gIH07XG5cbiAgUGF5bWVudE1ldGhvZHNTaGltLnByb3RvdHlwZS5nZXRPdGhlckJpbGxpbmdFdmVudCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBhY3Rpb246IFwiY3JlZGl0XCIsXG4gICAgICBhbW91bnQ6IFwiLTEwMC4wMFwiLFxuICAgICAgZGVzY3JpcHRpb246IFwiT3BlbiBTb3VyY2UgRGlzY291bnQgLSBkaXN0aW5jdCBkZWxzaWVcIlxuICAgIH07XG4gIH07XG5cbiAgUGF5bWVudE1ldGhvZHNTaGltLnByb3RvdHlwZS5nZXRQYXltZW50TWV0aG9kID0gZnVuY3Rpb24oaWQpIHtcbiAgICBpZiAoaWQgPT0gbnVsbCkge1xuICAgICAgaWQgPSBcIndvcmtcIjtcbiAgICB9XG4gICAgaWYgKGlkID09PSBcIndvcmtcIikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IFwid29ya1wiLFxuICAgICAgICBraW5kOiBcImNhcmRcIixcbiAgICAgICAgYmlsbGluZ0RheTogMjMsXG4gICAgICAgIHVzZXJJbnZvaWNlSW5mbzogXCJTb21lIGxvbmcgQ29tcGFueSBuYW1lXFxuVmF0IElEIDogMzMyMTM0NTFcIixcbiAgICAgICAgbWV0YToge1xuICAgICAgICAgIE5hbWVPbkNhcmQ6IFwiSm9obiBEb2VcIixcbiAgICAgICAgICBsYXN0Rm91ckRpZ2l0czogMTIzNCxcbiAgICAgICAgICBjYXJkVHlwZTogXCJ2aXNhXCIsXG4gICAgICAgICAgZXhwaXJhdGlvbkRhdGU6IFwiMDQvMThcIixcbiAgICAgICAgICBpbWFnZVVSTDogXCJodHRwOi8vdGhlaGFuZGJhZ3Jlc291cmNlLmNvbS9pbWFnZXMvcGF5bWVudC12aXNhLnBuZ1wiLFxuICAgICAgICAgIGN2djogMTIzXG4gICAgICAgIH0sXG4gICAgICAgIGFwcHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcIm1haW5cIixcbiAgICAgICAgICAgIGhyZWY6IFwiL3NvbWUvdXJsXCJcbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiBcInNvbWUtYXBwXCIsXG4gICAgICAgICAgICBocmVmOiBcIi9zb21lL3VybFwiXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogXCJmYWNlYm9vay1hcHBcIixcbiAgICAgICAgICAgIGhyZWY6IFwiL3NvbWUvdXJsXCJcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGludm9pY2VzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICd3b3JrJyxcbiAgICAgICAgICAgIHN0YXJ0QXQ6IDE0NTI1NTE1MTMwMDAsXG4gICAgICAgICAgICBlbmRBdDogMTQ1NTIyOTkxMzAwMFxuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAnenVtaWV6JyxcbiAgICAgICAgICAgIHN0YXJ0QXQ6IDE0NTUyMjk5MTMwMDAsXG4gICAgICAgICAgICBlbmRBdDogMTQ1NzczNTUxMzAwMFxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGlkID09PSBcInp1bWllelwiKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogXCJ6dW1pZXpcIixcbiAgICAgICAga2luZDogXCJkaXJlY3RcIixcbiAgICAgICAgYmlsbGluZ0RheTogMixcbiAgICAgICAgdXNlckludm9pY2VJbmZvOiBcIlwiLFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgYWNjb3VudElkOiBcImpvaG5AZG9lLmlvXCJcbiAgICAgICAgfSxcbiAgICAgICAgYXBwczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwienVtaWV6LXNpdGVcIixcbiAgICAgICAgICAgIGhyZWY6IFwiL3NvbWUvdXJsXCJcbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiBcInp1bWllei1hZG1pblwiLFxuICAgICAgICAgICAgaHJlZjogXCIvc29tZS91cmxcIlxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgaW52b2ljZXM6IFtdXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogXCJwZXJzb25hbFwiLFxuICAgICAgICBraW5kOiBcInBheXBhbFwiLFxuICAgICAgICBiaWxsaW5nRGF5OiAxMixcbiAgICAgICAgdXNlckludm9pY2VJbmZvOiBcIkkgbG92ZSBQYXlwYWxcIixcbiAgICAgICAgbWV0YToge1xuICAgICAgICAgIGFjY291bnRJZDogXCJqb2huQGRvZS5pb1wiXG4gICAgICAgIH0sXG4gICAgICAgIGFwcHM6IFtdLFxuICAgICAgICBpbnZvaWNlczogW11cbiAgICAgIH07XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBQYXltZW50TWV0aG9kc1NoaW07XG5cbn0pKCk7XG4iLCJ2YXIgUGF5bWVudE1ldGhvZHNTaGltO1xuXG5QYXltZW50TWV0aG9kc1NoaW0gPSByZXF1aXJlKCcuL3NoaW0vcGF5bWVudC1tZXRob2RzJyk7XG5cbndpbmRvdy5wYXltZW50TWV0aG9kU2hpbSA9IG5ldyBQYXltZW50TWV0aG9kc1NoaW0oKTtcblxud2luZG93LnRlc3RQYXltZW50TWV0aG9kc0xvY2FsbHkgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGNvbmZpZywgY3JlYXRlTWljcm9DaG9vc2VyLCBjcmVhdGVQYXltZW50QWRkZXIsIGNyZWF0ZVN0YW5kYXJkQ29tcG9uZW50O1xuICBjb25maWcgPSB7XG4gICAgY2xpZW50VG9rZW46ICdleUoyWlhKemFXOXVJam95TENKaGRYUm9iM0pwZW1GMGFXOXVSbWx1WjJWeWNISnBiblFpT2lJMk9UVmtObUUxWmpaaU56TmtPV1JsWWpRMk1tWmtNamt3WmpCaE5UTTRNemczTVRVNE9UQmxNV1ptTkdGaE1HWTBZMk16TTJZeFpUUTFOekppWm1WamZHTnlaV0YwWldSZllYUTlNakF4Tnkwd01TMHdNMVF4T1Rvd016b3hOQzR5TnpZeU1UTTRNamtyTURBd01GeDFNREF5Tm0xbGNtTm9ZVzUwWDJsa1BUTTBPSEJyT1dOblpqTmlaM2wzTW1KY2RUQXdNalp3ZFdKc2FXTmZhMlY1UFRKdU1qUTNaSFk0T1dKeE9YWnRjSElpTENKamIyNW1hV2RWY213aU9pSm9kSFJ3Y3pvdkwyRndhUzV6WVc1a1ltOTRMbUp5WVdsdWRISmxaV2RoZEdWM1lYa3VZMjl0T2pRME15OXRaWEpqYUdGdWRITXZNelE0Y0dzNVkyZG1NMkpuZVhjeVlpOWpiR2xsYm5SZllYQnBMM1l4TDJOdmJtWnBaM1Z5WVhScGIyNGlMQ0pqYUdGc2JHVnVaMlZ6SWpwYlhTd2laVzUyYVhKdmJtMWxiblFpT2lKellXNWtZbTk0SWl3aVkyeHBaVzUwUVhCcFZYSnNJam9pYUhSMGNITTZMeTloY0drdWMyRnVaR0p2ZUM1aWNtRnBiblJ5WldWbllYUmxkMkY1TG1OdmJUbzBORE12YldWeVkyaGhiblJ6THpNME9IQnJPV05uWmpOaVozbDNNbUl2WTJ4cFpXNTBYMkZ3YVNJc0ltRnpjMlYwYzFWeWJDSTZJbWgwZEhCek9pOHZZWE56WlhSekxtSnlZV2x1ZEhKbFpXZGhkR1YzWVhrdVkyOXRJaXdpWVhWMGFGVnliQ0k2SW1oMGRIQnpPaTh2WVhWMGFDNTJaVzV0Ynk1ellXNWtZbTk0TG1KeVlXbHVkSEpsWldkaGRHVjNZWGt1WTI5dElpd2lZVzVoYkhsMGFXTnpJanA3SW5WeWJDSTZJbWgwZEhCek9pOHZZMnhwWlc1MExXRnVZV3g1ZEdsamN5NXpZVzVrWW05NExtSnlZV2x1ZEhKbFpXZGhkR1YzWVhrdVkyOXRMek0wT0hCck9XTm5aak5pWjNsM01tSWlmU3dpZEdoeVpXVkVVMlZqZFhKbFJXNWhZbXhsWkNJNmRISjFaU3dpY0dGNWNHRnNSVzVoWW14bFpDSTZkSEoxWlN3aWNHRjVjR0ZzSWpwN0ltUnBjM0JzWVhsT1lXMWxJam9pUVdOdFpTQlhhV1JuWlhSekxDQk1kR1F1SUNoVFlXNWtZbTk0S1NJc0ltTnNhV1Z1ZEVsa0lqcHVkV3hzTENKd2NtbDJZV041VlhKc0lqb2lhSFIwY0RvdkwyVjRZVzF3YkdVdVkyOXRMM0J3SWl3aWRYTmxja0ZuY21WbGJXVnVkRlZ5YkNJNkltaDBkSEE2THk5bGVHRnRjR3hsTG1OdmJTOTBiM01pTENKaVlYTmxWWEpzSWpvaWFIUjBjSE02THk5aGMzTmxkSE11WW5KaGFXNTBjbVZsWjJGMFpYZGhlUzVqYjIwaUxDSmhjM05sZEhOVmNtd2lPaUpvZEhSd2N6b3ZMMk5vWldOcmIzVjBMbkJoZVhCaGJDNWpiMjBpTENKa2FYSmxZM1JDWVhObFZYSnNJanB1ZFd4c0xDSmhiR3h2ZDBoMGRIQWlPblJ5ZFdVc0ltVnVkbWx5YjI1dFpXNTBUbTlPWlhSM2IzSnJJanAwY25WbExDSmxiblpwY205dWJXVnVkQ0k2SW05bVpteHBibVVpTENKMWJuWmxkSFJsWkUxbGNtTm9ZVzUwSWpwbVlXeHpaU3dpWW5KaGFXNTBjbVZsUTJ4cFpXNTBTV1FpT2lKdFlYTjBaWEpqYkdsbGJuUXpJaXdpWW1sc2JHbHVaMEZuY21WbGJXVnVkSE5GYm1GaWJHVmtJanAwY25WbExDSnRaWEpqYUdGdWRFRmpZMjkxYm5SSlpDSTZJbUZqYldWM2FXUm5aWFJ6YkhSa2MyRnVaR0p2ZUNJc0ltTjFjbkpsYm1ONVNYTnZRMjlrWlNJNklsVlRSQ0o5TENKamIybHVZbUZ6WlVWdVlXSnNaV1FpT21aaGJITmxMQ0p0WlhKamFHRnVkRWxrSWpvaU16UTRjR3M1WTJkbU0ySm5lWGN5WWlJc0luWmxibTF2SWpvaWIyWm1JbjA9JyxcbiAgICBwYXltZW50TWV0aG9kOiBwYXltZW50TWV0aG9kU2hpbS5nZXRQYXltZW50TWV0aG9kcygpLFxuICAgIHBtVXBkYXRlSWQ6IFwiMTIzNDVhc2RmZ1wiLFxuICAgIGNyZWF0ZVBheW1lbnRNZXRob2Q6IGZ1bmN0aW9uKGRhdGEsIG5vbmNlLCBjYikge1xuICAgICAgY29uc29sZS5sb2coJ2NyZWF0ZSBwYXltZW50IG1ldGhvZCcpO1xuICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICBjb25zb2xlLmxvZyhub25jZSk7XG4gICAgICByZXR1cm4gY2Ioe30pO1xuICAgIH0sXG4gICAgdXBkYXRlUGF5bWVudE1ldGhvZDogZnVuY3Rpb24oZGF0YSwgbm9uY2UsIGNiKSB7XG4gICAgICBjb25zb2xlLmxvZygndXBkYXRlIHBheW1lbnQgbWV0aG9kJyk7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIGNvbnNvbGUubG9nKG5vbmNlKTtcbiAgICAgIHJldHVybiBjYih7fSk7XG4gICAgfSxcbiAgICBkZWxldGVQYXltZW50TWV0aG9kOiBmdW5jdGlvbihkYXRhLCBjYikge1xuICAgICAgY29uc29sZS5sb2coJ2RlbGV0ZSBwYXltZW50IG1ldGhvZCcpO1xuICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICByZXR1cm4gY2Ioe1xuICAgICAgICBlcnJvcjogXCJub3BlLCBjYW4ndCBkbyBpdFwiXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGdldEludm9pY2U6IGZ1bmN0aW9uKGlkLCBjYikge1xuICAgICAgcmV0dXJuIGNiKHdpbmRvdy5wYXltZW50TWV0aG9kU2hpbS5nZXRJbnZvaWNlKGlkKSk7XG4gICAgfSxcbiAgICBwYXlJbnZvaWNlTm93OiBmdW5jdGlvbihpZCwgY2IpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwicGF5aW5nIGludm9pY2UgXCIgKyBpZCk7XG4gICAgICByZXR1cm4gY2Ioe30pO1xuICAgIH1cbiAgfTtcbiAgY3JlYXRlU3RhbmRhcmRDb21wb25lbnQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gd2luZG93LnBheU1ldGhvZHMgPSBuZXcgbmFub2JveC5QYXltZW50TWV0aG9kcygkKFwiLnN0YWdlLWhvbGRlclwiKSwgY29uZmlnLCB0cnVlKTtcbiAgfTtcbiAgY3JlYXRlTWljcm9DaG9vc2VyID0gZnVuY3Rpb24oKSB7XG4gICAgd2luZG93LnBheU1ldGhvZHMgPSBuZXcgbmFub2JveC5QYXltZW50TWV0aG9kcygkKFwiLnN0YWdlLWhvbGRlclwiKSwgY29uZmlnLCBmYWxzZSk7XG4gICAgcmV0dXJuIHBheU1ldGhvZHMuY3JlYXRlTWljcm9DaG9vc2VyKCd6dW1pZXonLCBmdW5jdGlvbihuZXdQYXlNZXRob2QpIHtcbiAgICAgIHJldHVybiBjb25zb2xlLmxvZyhuZXdQYXlNZXRob2QpO1xuICAgIH0pO1xuICB9O1xuICBjcmVhdGVQYXltZW50QWRkZXIgPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB3aW5kb3cucGF5TWV0aG9kcyA9IG5ldyBuYW5vYm94LlBheW1lbnRNZXRob2RzKCQoXCIuc3RhZ2UtaG9sZGVyXCIpLCBjb25maWcsIGZhbHNlKTtcbiAgICAgIHJldHVybiBwYXlNZXRob2RzLmNyZWF0ZVBheU1ldGhvZCh7fSwgJChcImJvZHlcIiksIHRydWUpO1xuICAgIH07XG4gIH0pKHRoaXMpO1xuICByZXR1cm4gY3JlYXRlU3RhbmRhcmRDb21wb25lbnQoKTtcbn07XG4iXX0=
