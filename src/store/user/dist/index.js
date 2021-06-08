"use strict";
exports.__esModule = true;
exports.user = void 0;
var getters_1 = require("@/store/user/getters");
var mutations_1 = require("@/store/user/mutations");
var actions_1 = require("@/store/user/actions");
var state = {
    username: "John Smith",
    email: "johnsmith@happy.com",
    lastLogin: new Date(),
    isLiving: false
};
exports.user = {
    state: state,
    getters: getters_1.getters,
    mutations: mutations_1.mutations,
    actions: actions_1.actions
};
