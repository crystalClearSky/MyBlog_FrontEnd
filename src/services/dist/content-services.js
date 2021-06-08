"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var axios_1 = require("axios");
var ContentService = /** @class */ (function () {
    function ContentService() {
        this.API_URL = process.env.VUE_APP_API_URL;
        this.IP_URL = process.env.VUE_APP_IP_URL;
        this.reasons = [
            "Abusive",
            "Offensive",
            "Illegal",
            "Concerning",
            "Threatening",
            "Spam",
            "other",
        ];
        this.flagged = {
            reasonText: ""
        };
        this.reslt = false;
    }
    ContentService.prototype.flagComment = function (flaggedItem) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.flagged.reasonText = flaggedItem.reason;
                        console.log(this.flagged);
                        return [4 /*yield*/, axios_1["default"].post(this.API_URL + "/content/" + flaggedItem.contentId + "/user/comment/" + flaggedItem.commentId + "/flag", this.flagged, { withCredentials: true })];
                    case 1:
                        result = _a.sent();
                        console.log("Flag - " + result.data);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    ContentService.prototype.getAllCards = function (q, limit, skipBy, postType, avatarId, typeSearch) {
        if (limit === void 0) { limit = 5; }
        if (skipBy === void 0) { skipBy = 1; }
        if (postType === void 0) { postType = -1; }
        if (avatarId === void 0) { avatarId = -1; }
        if (typeSearch === void 0) { typeSearch = ""; }
        return __awaiter(this, void 0, Promise, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].get(this.API_URL + "/content/search?q=" + q + "&limit=" + limit + "&skipBy=" + skipBy + "&postType=" + postType + "&avatarId=" + avatarId + "&typeSearch=" + typeSearch)];
                    case 1:
                        result = _a.sent();
                        console.log("pageSize - " + limit + " pageNumber - " + skipBy);
                        console.log(result.data + " - ALL Cards");
                        //console.log('hello!!!');
                        return [2 /*return*/, Promise.resolve(result.data)];
                }
            });
        });
    };
    ContentService.prototype.getCardById = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].get(this.API_URL + "/content/" + id + "/")];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, Promise.resolve(result.data)];
                }
            });
        });
    };
    ContentService.prototype.addNewCard = function (card) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].post(this.API_URL + "/content/", card, {
                            withCredentials: true
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    ContentService.prototype.updateCard = function (card, id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Updating card!!");
                        console.log(id + " " + card);
                        return [4 /*yield*/, axios_1["default"].put(this.API_URL + "/content/" + id + "/", card, {
                                withCredentials: true
                            })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    ContentService.prototype.getComments = function () {
        return __awaiter(this, void 0, Promise, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].get(this.API_URL + "/comments")];
                    case 1:
                        result = _a.sent();
                        console.log(result.data + " - ALL Comments");
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    ContentService.prototype.getCommentsByCard = function (contentId, pageSize, pageNumber) {
        if (pageSize === void 0) { pageSize = 4; }
        if (pageNumber === void 0) { pageNumber = 1; }
        return __awaiter(this, void 0, Promise, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].get(this.API_URL + "/comments/" + contentId + "?commentPageSize=" + pageSize + "&commentPageNumber=" + pageNumber)];
                    case 1:
                        result = _a.sent();
                        console.log("Card Comments - " + result.data);
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    ContentService.prototype.checkSession = function () {
        return __awaiter(this, void 0, Promise, function () {
            var result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("IN CHECKING SESSION!!!");
                        return [4 /*yield*/, axios_1["default"]
                                .get(this.API_URL + "/content/user/sessionstate", {
                                withCredentials: true
                            })
                                .then(function (res) {
                                console.log(res.status);
                                _this.reslt = res.status === 200;
                                return _this.reslt;
                            })["catch"](function (err) {
                                console.log(err);
                                _this.reslt = false;
                            })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, this.reslt];
                }
            });
        });
    };
    ContentService.prototype.getCurrentUserIP = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.ipDetails) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, axios_1["default"].get("http://ip-api.com/json?callback=?")];
                    case 1:
                        _a.ipDetails = _b.sent();
                        console.log("In Current IP");
                        this.ipDetails.data = this.ipDetails.data.replace(/[()?;]/gi, "");
                        this.ipDetails.data = JSON.parse(this.ipDetails.data);
                        _b.label = 2;
                    case 2:
                        console.log(this.ipDetails.data);
                        return [2 /*return*/, this.ipDetails.data];
                }
            });
        });
    };
    ContentService.prototype.getRemainingFruits = function () {
        return __awaiter(this, void 0, Promise, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].get(this.API_URL + "/content/user/fruits", {
                            withCredentials: true
                        })];
                    case 1:
                        result = _a.sent();
                        console.log("results from fruit - " + result.data);
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    ContentService.prototype.addCurrentUnregisteredUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("In add Unregistered guest.");
                        if (!!this.guestIP) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.getCurrentUserIP()];
                    case 1:
                        _a.guestIP = _b.sent();
                        _b.label = 2;
                    case 2:
                        this.finalUnregistedGuest = {
                            ipAddress: this.guestIP.query,
                            region: this.guestIP.regionName,
                            country: this.guestIP.country
                        };
                        return [4 /*yield*/, axios_1["default"].post("" + this.API_URL, this.finalUnregistedGuest, {
                                withCredentials: true
                            })];
                    case 3:
                        result = _b.sent();
                        console.log("Final Unregistered guest - " + this.finalUnregistedGuest);
                        console.log("engable guest? -" + this.finalUnregistedGuest.enableGuest);
                        return [2 /*return*/, this.finalUnregistedGuest];
                }
            });
        });
    };
    ContentService.prototype.getandAddAnon = function () {
        return __awaiter(this, void 0, Promise, function () {
            var anon, anon;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.finalAnon && !this.finalUnregistedGuest)) return [3 /*break*/, 2];
                        console.log("In add and register new anon");
                        return [4 /*yield*/, axios_1["default"].get(this.API_URL + "/anon", {
                                withCredentials: true
                            })];
                    case 1:
                        anon = _a.sent();
                        this.finalAnon = anon.data;
                        console.log("Fist seen: " + this.finalAnon.firstSeen);
                        return [2 /*return*/, this.finalAnon];
                    case 2:
                        if (!!this.finalUnregistedGuest) return [3 /*break*/, 4];
                        console.log("In the wrong place.");
                        return [4 /*yield*/, axios_1["default"].get(this.API_URL + "/anon", {
                                withCredentials: true
                            })];
                    case 3:
                        anon = _a.sent();
                        this.finalAnon = anon.data;
                        return [2 /*return*/, this.finalAnon];
                    case 4: return [2 /*return*/, this.finalAnon];
                }
            });
        });
    };
    ContentService.prototype.createAndAddGuest = function () {
        return __awaiter(this, void 0, Promise, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.finalUnregistedGuest && !this.avatar)) return [3 /*break*/, 2];
                        console.log(this.finalUnregistedGuest);
                        return [4 /*yield*/, axios_1["default"].post(this.API_URL + "/content/guest", this.finalUnregistedGuest, {
                                withCredentials: true
                            })];
                    case 1:
                        result = _a.sent();
                        this.finalGuest = result.data;
                        console.log("Guest!! - " + this.finalGuest.country);
                        return [2 /*return*/, this.finalGuest];
                    case 2:
                        console.log("No Data for guest was created!!");
                        console.log("Avatar in create guest - " + this.avatar);
                        return [2 /*return*/, this.finalGuest];
                }
            });
        });
    };
    ContentService.prototype.getGuestById = function (id, ip) {
        if (id === void 0) { id = -1; }
        if (ip === void 0) { ip = ""; }
        return __awaiter(this, void 0, Promise, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].get(this.API_URL + "/content/guest?id=" + id + "&ip=" + ip)];
                    case 1:
                        result = _a.sent();
                        console.log("Guest --- Id - " + result.data[1]);
                        this.guests = result.data;
                        this.lastGuest = this.guests.filter(function (x) {
                            return ip != "" ? x.ipAddress == ip : id != -1 ? x.id == id : x;
                        })[0];
                        console.log("Guest by Id - " + this.lastGuest.ipAddress);
                        return [2 /*return*/, this.lastGuest];
                }
            });
        });
    };
    ContentService.prototype.enableThisGuest = function (uguest) {
        return __awaiter(this, void 0, Promise, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].put(this.API_URL + "/enableguest", uguest, {
                            withCredentials: true
                        })];
                    case 1:
                        result = _a.sent();
                        this.finalUnregistedGuest = result.data;
                        console.log("Result from enable guest - " + this.finalUnregistedGuest.enableGuest);
                        return [2 /*return*/, this.finalUnregistedGuest];
                }
            });
        });
    };
    ContentService.prototype.logOutGuest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].get(this.API_URL + "/content/guest/logoutguest", { withCredentials: true })];
                    case 1:
                        result = _a.sent();
                        console.log("Result from Guest log out" + result.data);
                        return [2 /*return*/];
                }
            });
        });
    };
    ContentService.prototype.enableOption = function (option) {
        return __awaiter(this, void 0, Promise, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].post(this.API_URL + "/content/enableoption", option, { withCredentials: true })];
                    case 1:
                        result = _a.sent();
                        console.log(result.data);
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    ContentService.prototype.getOptionByIp = function (ip) {
        if (ip === void 0) { ip = ""; }
        return __awaiter(this, void 0, Promise, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].get(this.API_URL + "/content/optionbyip?IpAddress=" + ip)];
                    case 1:
                        result = _a.sent();
                        if (result.status > 200) {
                            console.log("Unable to retrieve options by with ip " + ip);
                        }
                        console.log("Result from getOptionByIp -" + result.data);
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    ContentService.prototype.getOptions = function () {
        return __awaiter(this, void 0, Promise, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].get(this.API_URL + "/content/enableoption", {
                            withCredentials: true
                        })];
                    case 1:
                        result = _a.sent();
                        this.options = result.data;
                        console.log("GEt Options" + this.options);
                        return [2 /*return*/, this.options];
                }
            });
        });
    };
    ContentService.prototype.editOption = function (editedOption) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].put(this.API_URL + "/content/editoption", editedOption, {
                            withCredentials: true
                        })];
                    case 1:
                        result = _a.sent();
                        console.log("Result from edit option" + result.data);
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    ContentService.prototype.createNewAvatar = function (createAvatar) {
        return __awaiter(this, void 0, Promise, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].post(this.API_URL + "/content/user/", createAvatar, { withCredentials: true })];
                    case 1:
                        result = _a.sent();
                        console.log("result from CREATEAVATAR" + result.data);
                        this.avatar = result.data;
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    ContentService.prototype.getThisAvatar = function () {
        return __awaiter(this, void 0, Promise, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].get(this.API_URL + "/content/user", {
                            withCredentials: true
                        })];
                    case 1:
                        result = _a.sent();
                        console.log(result.data + " - ONE Users");
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    ContentService.prototype.getAllAvatars = function () {
        return __awaiter(this, void 0, Promise, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].get(this.API_URL + "/content/user/all/")];
                    case 1:
                        result = _a.sent();
                        console.log(result.data + " - ALL Users");
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    ContentService.prototype.getAllTags = function (tagQuery, pageLimit) {
        if (tagQuery === void 0) { tagQuery = ""; }
        if (pageLimit === void 0) { pageLimit = 5; }
        return __awaiter(this, void 0, Promise, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].get(this.API_URL + "/content/tags?pageLimit=" + pageLimit + "&tagQuery=" + tagQuery)];
                    case 1:
                        result = _a.sent();
                        console.log(result.data + " - ALL Tags");
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    ContentService.prototype.sendEmail = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].post(this.API_URL + "/contact", message)];
                    case 1:
                        result = _a.sent();
                        console.log("Result from sendMessage - " + result.data);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    ContentService.prototype.resetGuestSession = function () {
        var _this = this;
        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
            var ip, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ip = {
                            iPAddress: this.guestIP.query
                        };
                        console.log("guets - " + ip.iPAddress);
                        if (!!this.guestIP) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.getCurrentUserIP()];
                    case 1:
                        _a.guestIP = _b.sent();
                        _b.label = 2;
                    case 2: return [4 /*yield*/, axios_1["default"].post(this.API_URL + "/content/guest/set", ip, {
                            withCredentials: true
                        })];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); }, 100);
    };
    ContentService.prototype.loginIn = function (login) {
        return __awaiter(this, void 0, void 0, function () {
            var usertType, result, details;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (login.usertype) {
                            usertType = {
                                admin: {
                                    id: login.usertype,
                                    name: login.name
                                }
                            };
                            console.log(usertType);
                        }
                        else {
                            usertType = {
                                user: {
                                    currentIp: login.currentIp
                                }
                            };
                        }
                        return [4 /*yield*/, axios_1["default"].post(this.API_URL + "/content/user/set", usertType, { withCredentials: true })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, axios_1["default"].get(this.API_URL + "/content/user/0/" + login.currentIp)];
                    case 2:
                        details = _a.sent();
                        //console.log(details.status);
                        if (result.status === 200) {
                            return [2 /*return*/, result.data];
                        }
                        return [2 /*return*/, details.data];
                }
            });
        });
    };
    ContentService.prototype.signUserOut = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].get(this.API_URL + "/content/user/logout", {
                            withCredentials: true
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    ContentService.prototype.sendNewMessage = function (text, id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].post(this.API_URL + "/content/" + id + "/user/comment", text, { withCredentials: true })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    ContentService.prototype.sendReplyMessage = function (text, id, commentId) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].post(this.API_URL + "/content/" + id + "/user/comment/" + commentId, text, { withCredentials: true })];
                    case 1:
                        result = _a.sent();
                        console.log("Result from REPLY - " + result.data);
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    ContentService.prototype.updateMessage = function (text, id, commentId) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].put(this.API_URL + "/content/" + id + "/user/comment/" + commentId, text, { withCredentials: true })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.status];
                }
            });
        });
    };
    ContentService.prototype.addNewUpVote = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].get(this.API_URL + "/content/" + id + "/upvote", {
                            withCredentials: true
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ContentService.prototype.GetCount = function (avatarId, contentId) {
        if (avatarId === void 0) { avatarId = 0; }
        if (contentId === void 0) { contentId = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].get(this.API_URL + "/comments/comment_count?avatarId=" + avatarId + "&contentId=" + contentId, {
                            withCredentials: true
                        })];
                    case 1:
                        result = _a.sent();
                        console.log("Count result - " + result.data);
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    ContentService.prototype.addLiketoComment = function (id, contentId) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].get(this.API_URL + "/content/" + contentId + "/user/comment/" + id + "/like", { withCredentials: true })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.status];
                }
            });
        });
    };
    ContentService.prototype.addView = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].get(this.API_URL + "/content/" + id + "/view", {
                            withCredentials: true
                        })];
                    case 1:
                        result = _a.sent();
                        console.log("Result from view - " + result.data);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    ContentService.prototype.deleteThisComment = function (contentId, id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"]["delete"](this.API_URL + "/content/" + contentId + "/user/comment/" + id, { withCredentials: true })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.status];
                }
            });
        });
    };
    ContentService.prototype.deleteCard = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"]["delete"](this.API_URL + "/content/" + id, {
                            withCredentials: true
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.status];
                }
            });
        });
    };
    return ContentService;
}());
exports["default"] = ContentService;
