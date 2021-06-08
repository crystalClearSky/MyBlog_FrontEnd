"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var vuex_1 = require("vuex");
var user_1 = require("@/store/user");
var getters_1 = require("@/store/user/getters");
var mutations_1 = require("@/store/user/mutations");
var actions_1 = require("@/store/user/actions");
vue_1["default"].use(vuex_1["default"]);
var store = {
    state: {
        helloMessage: "Hello form Me"
    },
    modules: {
        user: user_1.user,
        getters: getters_1.getters,
        mutations: mutations_1.mutations,
        actions: actions_1.actions
    }
};
exports["default"] = new vuex_1["default"].Store(store);
