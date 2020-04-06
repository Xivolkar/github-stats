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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var github_client_1 = require("./client/github-client");
var user_model_1 = require("./model/user.model");
var Server = /** @class */ (function () {
    function Server() {
    }
    Server.prototype.startServer = function () {
        var _this = this;
        var app = express_1.default();
        var port = process.env.PORT || '8000';
        app.get('/', function (_req, res) {
            return res.send('API is working 🤓');
        });
        app.get('/users/languages/:name', function (_req, res) { return __awaiter(_this, void 0, void 0, function () {
            var client, response_1, payload_1, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = new github_client_1.GithubClient();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, client.getUsersByLanguage(_req.params.name)];
                    case 2:
                        response_1 = _a.sent();
                        payload_1 = new user_model_1.UserResponse();
                        return [4 /*yield*/, Promise.all(response_1.items.map(function (user) { return __awaiter(_this, void 0, void 0, function () {
                                var userId, userData;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            userId = user.login;
                                            return [4 /*yield*/, client.getUserData(userId)];
                                        case 1:
                                            userData = _a.sent();
                                            payload_1.items.push(new user_model_1.User(userId, userData.name, userData.avatar_url, userData.followers));
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 3:
                        _a.sent();
                        payload_1.total_count = response_1.items.length;
                        res.send(payload_1);
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [2 /*return*/, res.send('ruh roh')];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        app.listen(port, function (err) {
            if (err)
                return console.error(err);
            return console.log("Server is listening on " + port);
        });
    };
    return Server;
}());
exports.Server = Server;
;
