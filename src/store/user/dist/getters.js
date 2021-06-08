"use strict";
exports.__esModule = true;
exports.getters = void 0;
exports.getters = {
    getuserInfo: function (state) {
        return "Username: " + state.username + " - email: " + state.email;
    },
    getUsername: function (state) {
        return state.isLiving;
    },
    getIpData: function (state) {
        return;
    }
};
