"use strict";
var _a;
exports.__esModule = true;
exports.mutations = exports.UserMutations = void 0;
var UserMutations;
(function (UserMutations) {
    UserMutations["SET_LIVING"] = "SET_LIVING";
})(UserMutations = exports.UserMutations || (exports.UserMutations = {}));
exports.mutations = (_a = {},
    _a[UserMutations.SET_LIVING] = function (state, payload) {
        state.isLiving = payload;
    },
    _a);
