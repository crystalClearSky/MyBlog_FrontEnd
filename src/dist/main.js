"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var App_vue_1 = require("./App.vue");
var router_1 = require("./router");
var moment_1 = require("moment");
var index_1 = require("@/store/index");
vue_1["default"].config.productionTip = false;
vue_1["default"].filter('humanize', function (date) {
    return moment_1["default"](date).fromNow();
});
vue_1["default"].filter("byDate", function (date) { return moment_1["default"](date).calendar({
    sameElse: 'Do MMMM YYYY [at] hh:mm A'
}); });
new vue_1["default"]({
    store: index_1["default"],
    router: router_1["default"],
    render: function (h) { return h(App_vue_1["default"]); }
}).$mount('#app');
