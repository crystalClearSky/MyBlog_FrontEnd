"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var vue_router_1 = require("vue-router");
var Home_vue_1 = require("@/views/Home.vue");
var Content_vue_1 = require("@/views/Content.vue");
var AddCard_vue_1 = require("@/views/AddCard.vue");
var LogIn_vue_1 = require("@/views/LogIn.vue");
vue_1["default"].use(vue_router_1["default"]);
var routes = [
    {
        path: '/',
        name: 'Home',
        component: Home_vue_1["default"]
    },
    {
        path: '/content',
        name: 'Content',
        component: Content_vue_1["default"]
        //component: () => import(/* webpackChunkName: "about" */ '../views/Content.vue')
    },
    {
        path: '/addcard',
        name: 'AddCard',
        component: AddCard_vue_1["default"]
        //component: () => import(/* webpackChunkName: "about" */ '../views/Content.vue')
    },
    {
        path: '/login',
        name: 'LogIn',
        component: LogIn_vue_1["default"]
        //component: () => import(/* webpackChunkName: "about" */ '../views/Content.vue')
    }
];
var router = new vue_router_1["default"]({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
});
exports["default"] = router;
