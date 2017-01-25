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
  var app, config;
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
      return cb(shim.getInvoice(id));
    },
    payInvoiceNow: function(id, cb) {
      console.log("paying invoice " + id);
      return cb({});
    }
  };
  return app = new nanobox.PaymentMethods($(".stage-holder"), config);
};

},{"./shim/payment-methods":1}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9ndWxwLWNvZmZlZWlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic2hpbS9wYXltZW50LW1ldGhvZHMuY29mZmVlIiwic3RhZ2UuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBQYXltZW50TWV0aG9kc1NoaW07XG5cbm1vZHVsZS5leHBvcnRzID0gUGF5bWVudE1ldGhvZHNTaGltID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBQYXltZW50TWV0aG9kc1NoaW0oKSB7fVxuXG4gIFBheW1lbnRNZXRob2RzU2hpbS5wcm90b3R5cGUuZ2V0UGF5bWVudE1ldGhvZHMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gW3RoaXMuZ2V0UGF5bWVudE1ldGhvZCgnd29yaycpLCB0aGlzLmdldFBheW1lbnRNZXRob2QoJ3p1bWlleicpLCB0aGlzLmdldFBheW1lbnRNZXRob2QoJ3BlcnNvbmFsJyldO1xuICB9O1xuXG4gIFBheW1lbnRNZXRob2RzU2hpbS5wcm90b3R5cGUuZ2V0SW52b2ljZSA9IGZ1bmN0aW9uKHBheW1lbnRNZXRob2RJZCkge1xuICAgIHZhciBwYXltZW50TWV0aG9kO1xuICAgIHBheW1lbnRNZXRob2QgPSB0aGlzLmdldFBheW1lbnRNZXRob2QocGF5bWVudE1ldGhvZElkKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdGU6IFwicGVuZGluZ1wiLFxuICAgICAgaWQ6IFwiMjMxMjNcIixcbiAgICAgIG51bWJlcjogXCIyMzEyM1wiLFxuICAgICAgdG90YWw6IFwiOTQ1LjAwXCIsXG4gICAgICBiaWxsaW5nRGF0ZTogMTQ1NTIyOTkxMzAwMCxcbiAgICAgIHBhaWREYXRlOiAxNDU1MjI5OTEzMDAwLFxuICAgICAgZXJyb3I6IFwiVW5hYmxlIHRvIFByb2Nlc3MgQ2FyZFwiLFxuICAgICAgcGFpZFZpYToge1xuICAgICAgICBraW5kOiAnY2FyZCcsXG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICBsYXN0Rm91ckRpZ2l0czogMTIzNFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcGF5bWVudE1ldGhvZDoge1xuICAgICAgICB1c2VySW52b2ljZUluZm86IHBheW1lbnRNZXRob2QudXNlckludm9pY2VJbmZvXG4gICAgICB9LFxuICAgICAgYXBwQmlsbGluZ0V2ZW50czogW3RoaXMuZ2V0QXBwQmlsbGluZ0V2ZW50KCksIHRoaXMuZ2V0QXBwQmlsbGluZ0V2ZW50KCksIHRoaXMuZ2V0QXBwQmlsbGluZ0V2ZW50KCksIHRoaXMuZ2V0QXBwQmlsbGluZ0V2ZW50KCldLFxuICAgICAgb3RoZXJCaWxsaW5nRXZlbnRzOiBbdGhpcy5nZXRPdGhlckJpbGxpbmdFdmVudCgpXVxuICAgIH07XG4gIH07XG5cbiAgUGF5bWVudE1ldGhvZHNTaGltLnByb3RvdHlwZS5nZXRBcHBCaWxsaW5nRXZlbnQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWN0aW9uOiBcImNoYXJnZVwiLFxuICAgICAgYXBwOiB7XG4gICAgICAgIG5hbWU6IFwiZGlzdGluY3QtZGVsc2llXCJcbiAgICAgIH0sXG4gICAgICBwbGFuOiB7XG4gICAgICAgIG5hbWU6IFwic3RhcnR1cFwiXG4gICAgICB9LFxuICAgICAgYW1vdW50OiBcIjEwMC4wMFwiLFxuICAgICAgc3RhcnRBdDogMTQ1MjU1MTUxMzAwMCxcbiAgICAgIGVuZEF0OiAxNDU1MjI5OTEzMDAwXG4gICAgfTtcbiAgfTtcblxuICBQYXltZW50TWV0aG9kc1NoaW0ucHJvdG90eXBlLmdldE90aGVyQmlsbGluZ0V2ZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFjdGlvbjogXCJjcmVkaXRcIixcbiAgICAgIGFtb3VudDogXCItMTAwLjAwXCIsXG4gICAgICBkZXNjcmlwdGlvbjogXCJPcGVuIFNvdXJjZSBEaXNjb3VudCAtIGRpc3RpbmN0IGRlbHNpZVwiXG4gICAgfTtcbiAgfTtcblxuICBQYXltZW50TWV0aG9kc1NoaW0ucHJvdG90eXBlLmdldFBheW1lbnRNZXRob2QgPSBmdW5jdGlvbihpZCkge1xuICAgIGlmIChpZCA9PSBudWxsKSB7XG4gICAgICBpZCA9IFwid29ya1wiO1xuICAgIH1cbiAgICBpZiAoaWQgPT09IFwid29ya1wiKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogXCJ3b3JrXCIsXG4gICAgICAgIG5hbWU6IFwiV29ya1wiLFxuICAgICAgICBraW5kOiBcImNhcmRcIixcbiAgICAgICAgYmlsbGluZ0RheTogMjMsXG4gICAgICAgIHVzZXJJbnZvaWNlSW5mbzogXCJTb21lIGxvbmcgQ29tcGFueSBuYW1lXFxuVmF0IElEIDogMzMyMTM0NTFcIixcbiAgICAgICAgbWV0YToge1xuICAgICAgICAgIE5hbWVPbkNhcmQ6IFwiSm9obiBEb2VcIixcbiAgICAgICAgICBsYXN0Rm91ckRpZ2l0czogMTIzNCxcbiAgICAgICAgICBjYXJkVHlwZTogXCJ2aXNhXCIsXG4gICAgICAgICAgZXhwaXJhdGlvbkRhdGU6IFwiMDQvMThcIixcbiAgICAgICAgICBpbWFnZVVSTDogXCJodHRwOi8vdGhlaGFuZGJhZ3Jlc291cmNlLmNvbS9pbWFnZXMvcGF5bWVudC12aXNhLnBuZ1wiLFxuICAgICAgICAgIGN2djogMTIzXG4gICAgICAgIH0sXG4gICAgICAgIGFwcHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcIm1haW5cIixcbiAgICAgICAgICAgIGhyZWY6IFwiL3NvbWUvdXJsXCJcbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiBcInNvbWUtYXBwXCIsXG4gICAgICAgICAgICBocmVmOiBcIi9zb21lL3VybFwiXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbmFtZTogXCJmYWNlYm9vay1hcHBcIixcbiAgICAgICAgICAgIGhyZWY6IFwiL3NvbWUvdXJsXCJcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGludm9pY2VzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICd3b3JrJyxcbiAgICAgICAgICAgIHN0YXJ0QXQ6IDE0NTI1NTE1MTMwMDAsXG4gICAgICAgICAgICBlbmRBdDogMTQ1NTIyOTkxMzAwMFxuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIGlkOiAnenVtaWV6JyxcbiAgICAgICAgICAgIHN0YXJ0QXQ6IDE0NTUyMjk5MTMwMDAsXG4gICAgICAgICAgICBlbmRBdDogMTQ1NzczNTUxMzAwMFxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGlkID09PSBcInp1bWllelwiKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogXCJ6dW1pZXpcIixcbiAgICAgICAgbmFtZTogXCJadW1pZXpcIixcbiAgICAgICAga2luZDogXCJkaXJlY3RcIixcbiAgICAgICAgYmlsbGluZ0RheTogMixcbiAgICAgICAgdXNlckludm9pY2VJbmZvOiBcIlwiLFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgYWNjb3VudElkOiBcImpvaG5AZG9lLmlvXCJcbiAgICAgICAgfSxcbiAgICAgICAgYXBwczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwienVtaWV6LXNpdGVcIixcbiAgICAgICAgICAgIGhyZWY6IFwiL3NvbWUvdXJsXCJcbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICBuYW1lOiBcInp1bWllei1hZG1pblwiLFxuICAgICAgICAgICAgaHJlZjogXCIvc29tZS91cmxcIlxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgaW52b2ljZXM6IFtdXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogXCJwZXJzb25hbFwiLFxuICAgICAgICBuYW1lOiBcIlBlcnNvbmFsXCIsXG4gICAgICAgIGtpbmQ6IFwicGF5cGFsXCIsXG4gICAgICAgIGJpbGxpbmdEYXk6IDEyLFxuICAgICAgICB1c2VySW52b2ljZUluZm86IFwiSSBsb3ZlIFBheXBhbFwiLFxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgYWNjb3VudElkOiBcImpvaG5AZG9lLmlvXCJcbiAgICAgICAgfSxcbiAgICAgICAgYXBwczogW10sXG4gICAgICAgIGludm9pY2VzOiBbXVxuICAgICAgfTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIFBheW1lbnRNZXRob2RzU2hpbTtcblxufSkoKTtcbiIsInZhciBQYXltZW50TWV0aG9kc1NoaW07XG5cblBheW1lbnRNZXRob2RzU2hpbSA9IHJlcXVpcmUoJy4vc2hpbS9wYXltZW50LW1ldGhvZHMnKTtcblxud2luZG93LnBheW1lbnRNZXRob2RTaGltID0gbmV3IFBheW1lbnRNZXRob2RzU2hpbSgpO1xuXG53aW5kb3cudGVzdFBheW1lbnRNZXRob2RzTG9jYWxseSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYXBwLCBjb25maWc7XG4gIGNvbmZpZyA9IHtcbiAgICBjbGllbnRUb2tlbjogJ2V5SjJaWEp6YVc5dUlqb3lMQ0poZFhSb2IzSnBlbUYwYVc5dVJtbHVaMlZ5Y0hKcGJuUWlPaUkyT1RWa05tRTFaalppTnpOa09XUmxZalEyTW1aa01qa3daakJoTlRNNE16ZzNNVFU0T1RCbE1XWm1OR0ZoTUdZMFkyTXpNMll4WlRRMU56SmlabVZqZkdOeVpXRjBaV1JmWVhROU1qQXhOeTB3TVMwd00xUXhPVG93TXpveE5DNHlOell5TVRNNE1qa3JNREF3TUZ4MU1EQXlObTFsY21Ob1lXNTBYMmxrUFRNME9IQnJPV05uWmpOaVozbDNNbUpjZFRBd01qWndkV0pzYVdOZmEyVjVQVEp1TWpRM1pIWTRPV0p4T1hadGNISWlMQ0pqYjI1bWFXZFZjbXdpT2lKb2RIUndjem92TDJGd2FTNXpZVzVrWW05NExtSnlZV2x1ZEhKbFpXZGhkR1YzWVhrdVkyOXRPalEwTXk5dFpYSmphR0Z1ZEhNdk16UTRjR3M1WTJkbU0ySm5lWGN5WWk5amJHbGxiblJmWVhCcEwzWXhMMk52Ym1acFozVnlZWFJwYjI0aUxDSmphR0ZzYkdWdVoyVnpJanBiWFN3aVpXNTJhWEp2Ym0xbGJuUWlPaUp6WVc1a1ltOTRJaXdpWTJ4cFpXNTBRWEJwVlhKc0lqb2lhSFIwY0hNNkx5OWhjR2t1YzJGdVpHSnZlQzVpY21GcGJuUnlaV1ZuWVhSbGQyRjVMbU52YlRvME5ETXZiV1Z5WTJoaGJuUnpMek0wT0hCck9XTm5aak5pWjNsM01tSXZZMnhwWlc1MFgyRndhU0lzSW1GemMyVjBjMVZ5YkNJNkltaDBkSEJ6T2k4dllYTnpaWFJ6TG1KeVlXbHVkSEpsWldkaGRHVjNZWGt1WTI5dElpd2lZWFYwYUZWeWJDSTZJbWgwZEhCek9pOHZZWFYwYUM1MlpXNXRieTV6WVc1a1ltOTRMbUp5WVdsdWRISmxaV2RoZEdWM1lYa3VZMjl0SWl3aVlXNWhiSGwwYVdOeklqcDdJblZ5YkNJNkltaDBkSEJ6T2k4dlkyeHBaVzUwTFdGdVlXeDVkR2xqY3k1ellXNWtZbTk0TG1KeVlXbHVkSEpsWldkaGRHVjNZWGt1WTI5dEx6TTBPSEJyT1dOblpqTmlaM2wzTW1JaWZTd2lkR2h5WldWRVUyVmpkWEpsUlc1aFlteGxaQ0k2ZEhKMVpTd2ljR0Y1Y0dGc1JXNWhZbXhsWkNJNmRISjFaU3dpY0dGNWNHRnNJanA3SW1ScGMzQnNZWGxPWVcxbElqb2lRV050WlNCWGFXUm5aWFJ6TENCTWRHUXVJQ2hUWVc1a1ltOTRLU0lzSW1Oc2FXVnVkRWxrSWpwdWRXeHNMQ0p3Y21sMllXTjVWWEpzSWpvaWFIUjBjRG92TDJWNFlXMXdiR1V1WTI5dEwzQndJaXdpZFhObGNrRm5jbVZsYldWdWRGVnliQ0k2SW1oMGRIQTZMeTlsZUdGdGNHeGxMbU52YlM5MGIzTWlMQ0ppWVhObFZYSnNJam9pYUhSMGNITTZMeTloYzNObGRITXVZbkpoYVc1MGNtVmxaMkYwWlhkaGVTNWpiMjBpTENKaGMzTmxkSE5WY213aU9pSm9kSFJ3Y3pvdkwyTm9aV05yYjNWMExuQmhlWEJoYkM1amIyMGlMQ0prYVhKbFkzUkNZWE5sVlhKc0lqcHVkV3hzTENKaGJHeHZkMGgwZEhBaU9uUnlkV1VzSW1WdWRtbHliMjV0Wlc1MFRtOU9aWFIzYjNKcklqcDBjblZsTENKbGJuWnBjbTl1YldWdWRDSTZJbTltWm14cGJtVWlMQ0oxYm5abGRIUmxaRTFsY21Ob1lXNTBJanBtWVd4elpTd2lZbkpoYVc1MGNtVmxRMnhwWlc1MFNXUWlPaUp0WVhOMFpYSmpiR2xsYm5Reklpd2lZbWxzYkdsdVowRm5jbVZsYldWdWRITkZibUZpYkdWa0lqcDBjblZsTENKdFpYSmphR0Z1ZEVGalkyOTFiblJKWkNJNkltRmpiV1YzYVdSblpYUnpiSFJrYzJGdVpHSnZlQ0lzSW1OMWNuSmxibU41U1hOdlEyOWtaU0k2SWxWVFJDSjlMQ0pqYjJsdVltRnpaVVZ1WVdKc1pXUWlPbVpoYkhObExDSnRaWEpqYUdGdWRFbGtJam9pTXpRNGNHczVZMmRtTTJKbmVYY3lZaUlzSW5abGJtMXZJam9pYjJabUluMD0nLFxuICAgIHBheW1lbnRNZXRob2RzOiBwYXltZW50TWV0aG9kU2hpbS5nZXRQYXltZW50TWV0aG9kcygpLFxuICAgIGNyZWF0ZVBheW1lbnRNZXRob2Q6IGZ1bmN0aW9uKGRhdGEsIG5vbmNlLCBjYikge1xuICAgICAgY29uc29sZS5sb2coJ2NyZWF0ZSBwYXltZW50IG1ldGhvZCcpO1xuICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICBjb25zb2xlLmxvZyhub25jZSk7XG4gICAgICByZXR1cm4gY2Ioe30pO1xuICAgIH0sXG4gICAgdXBkYXRlUGF5bWVudE1ldGhvZDogZnVuY3Rpb24oZGF0YSwgbm9uY2UsIGNiKSB7XG4gICAgICBjb25zb2xlLmxvZygndXBkYXRlIHBheW1lbnQgbWV0aG9kJyk7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIGNvbnNvbGUubG9nKG5vbmNlKTtcbiAgICAgIHJldHVybiBjYih7fSk7XG4gICAgfSxcbiAgICBkZWxldGVQYXltZW50TWV0aG9kOiBmdW5jdGlvbihkYXRhLCBjYikge1xuICAgICAgY29uc29sZS5sb2coJ2RlbGV0ZSBwYXltZW50IG1ldGhvZCcpO1xuICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICByZXR1cm4gY2Ioe1xuICAgICAgICBlcnJvcjogXCJub3BlLCBjYW4ndCBkbyBpdFwiXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGdldEludm9pY2U6IGZ1bmN0aW9uKGlkLCBjYikge1xuICAgICAgcmV0dXJuIGNiKHNoaW0uZ2V0SW52b2ljZShpZCkpO1xuICAgIH0sXG4gICAgcGF5SW52b2ljZU5vdzogZnVuY3Rpb24oaWQsIGNiKSB7XG4gICAgICBjb25zb2xlLmxvZyhcInBheWluZyBpbnZvaWNlIFwiICsgaWQpO1xuICAgICAgcmV0dXJuIGNiKHt9KTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBhcHAgPSBuZXcgbmFub2JveC5QYXltZW50TWV0aG9kcygkKFwiLnN0YWdlLWhvbGRlclwiKSwgY29uZmlnKTtcbn07XG4iXX0=
