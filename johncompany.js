var ORDER_PUNJAB_1 = 'Order_Punjab_1';
var ORDER_DELHI_1 = 'Order_Delhi_1';
var ORDER_DELHI_2 = 'Order_Delhi_2';
var ORDER_DELHI_3 = 'Order_Delhi_3';
var ORDER_BENGAL_1 = 'Order_Bengal_1';
var ORDER_BENGAL_2 = 'Order_Bengal_2';
var ORDER_BOMBAY_1 = 'Order_Bombay_1';
var ORDER_BOMBAY_2 = 'Order_Bombay_2';
var ORDER_BOMBAY_3 = 'Order_Bombay_3';
var ORDER_MARATHA_1 = 'Order_Maratha_1';
var ORDER_MARATHA_2 = 'Order_Maratha_2';
var ORDER_MARATHA_3 = 'Order_Maratha_3';
var ORDER_HYDERABAD_1 = 'Order_Hyderabad_1';
var ORDER_MYSORE_1 = 'Order_Mysore_1';
var ORDER_MYSORE_2 = 'Order_Mysore_2';
var ORDER_MADRAS_1 = 'Order_Madras_1';
var ORDER_MADRAS_2 = 'Order_Madras_2';
var ORDERS = [
    ORDER_PUNJAB_1,
    ORDER_DELHI_1,
    ORDER_DELHI_2,
    ORDER_DELHI_3,
    ORDER_BENGAL_1,
    ORDER_BENGAL_2,
    ORDER_BOMBAY_1,
    ORDER_BOMBAY_2,
    ORDER_BOMBAY_3,
    ORDER_MARATHA_1,
    ORDER_MARATHA_2,
    ORDER_MARATHA_3,
    ORDER_HYDERABAD_1,
    ORDER_MYSORE_1,
    ORDER_MYSORE_2,
    ORDER_MADRAS_1,
    ORDER_MADRAS_2,
];
var BgaAnimation = (function () {
    function BgaAnimation(animationFunction, settings) {
        this.animationFunction = animationFunction;
        this.settings = settings;
        this.played = null;
        this.result = null;
        this.playWhenNoAnimation = false;
    }
    return BgaAnimation;
}());
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function attachWithAnimation(animationManager, animation) {
    var _a;
    var settings = animation.settings;
    var element = settings.animation.settings.element;
    var fromRect = element.getBoundingClientRect();
    settings.animation.settings.fromRect = fromRect;
    settings.attachElement.appendChild(element);
    (_a = settings.afterAttach) === null || _a === void 0 ? void 0 : _a.call(settings, element, settings.attachElement);
    return animationManager.play(settings.animation);
}
var BgaAttachWithAnimation = (function (_super) {
    __extends(BgaAttachWithAnimation, _super);
    function BgaAttachWithAnimation(settings) {
        var _this = _super.call(this, attachWithAnimation, settings) || this;
        _this.playWhenNoAnimation = true;
        return _this;
    }
    return BgaAttachWithAnimation;
}(BgaAnimation));
function cumulatedAnimations(animationManager, animation) {
    return animationManager.playSequence(animation.settings.animations);
}
var BgaCumulatedAnimation = (function (_super) {
    __extends(BgaCumulatedAnimation, _super);
    function BgaCumulatedAnimation(settings) {
        var _this = _super.call(this, cumulatedAnimations, settings) || this;
        _this.playWhenNoAnimation = true;
        return _this;
    }
    return BgaCumulatedAnimation;
}(BgaAnimation));
function showScreenCenterAnimation(animationManager, animation) {
    var promise = new Promise(function (success) {
        var _a, _b, _c, _d;
        var settings = animation.settings;
        var element = settings.element;
        var elementBR = element.getBoundingClientRect();
        var xCenter = (elementBR.left + elementBR.right) / 2;
        var yCenter = (elementBR.top + elementBR.bottom) / 2;
        var x = xCenter - (window.innerWidth / 2);
        var y = yCenter - (window.innerHeight / 2);
        var duration = (_a = settings === null || settings === void 0 ? void 0 : settings.duration) !== null && _a !== void 0 ? _a : 500;
        var originalZIndex = element.style.zIndex;
        var originalTransition = element.style.transition;
        var transitionTimingFunction = (_b = settings.transitionTimingFunction) !== null && _b !== void 0 ? _b : 'linear';
        element.style.zIndex = "".concat((_c = settings === null || settings === void 0 ? void 0 : settings.zIndex) !== null && _c !== void 0 ? _c : 10);
        var timeoutId = null;
        var cleanOnTransitionEnd = function () {
            element.style.zIndex = originalZIndex;
            element.style.transition = originalTransition;
            success();
            element.removeEventListener('transitioncancel', cleanOnTransitionEnd);
            element.removeEventListener('transitionend', cleanOnTransitionEnd);
            document.removeEventListener('visibilitychange', cleanOnTransitionEnd);
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
        var cleanOnTransitionCancel = function () {
            var _a;
            element.style.transition = "";
            element.offsetHeight;
            element.style.transform = (_a = settings === null || settings === void 0 ? void 0 : settings.finalTransform) !== null && _a !== void 0 ? _a : null;
            element.offsetHeight;
            cleanOnTransitionEnd();
        };
        element.addEventListener('transitioncancel', cleanOnTransitionEnd);
        element.addEventListener('transitionend', cleanOnTransitionEnd);
        document.addEventListener('visibilitychange', cleanOnTransitionCancel);
        element.offsetHeight;
        element.style.transition = "transform ".concat(duration, "ms ").concat(transitionTimingFunction);
        element.offsetHeight;
        element.style.transform = "translate(".concat(-x, "px, ").concat(-y, "px) rotate(").concat((_d = settings === null || settings === void 0 ? void 0 : settings.rotationDelta) !== null && _d !== void 0 ? _d : 0, "deg)");
        timeoutId = setTimeout(cleanOnTransitionEnd, duration + 100);
    });
    return promise;
}
var BgaShowScreenCenterAnimation = (function (_super) {
    __extends(BgaShowScreenCenterAnimation, _super);
    function BgaShowScreenCenterAnimation(settings) {
        return _super.call(this, showScreenCenterAnimation, settings) || this;
    }
    return BgaShowScreenCenterAnimation;
}(BgaAnimation));
function slideToAnimation(animationManager, animation) {
    var promise = new Promise(function (success) {
        var _a, _b, _c, _d, _e;
        var settings = animation.settings;
        var element = settings.element;
        var _f = getDeltaCoordinates(element, settings), x = _f.x, y = _f.y;
        var duration = (_a = settings === null || settings === void 0 ? void 0 : settings.duration) !== null && _a !== void 0 ? _a : 500;
        var originalZIndex = element.style.zIndex;
        var originalTransition = element.style.transition;
        var transitionTimingFunction = (_b = settings.transitionTimingFunction) !== null && _b !== void 0 ? _b : 'linear';
        element.style.zIndex = "".concat((_c = settings === null || settings === void 0 ? void 0 : settings.zIndex) !== null && _c !== void 0 ? _c : 10);
        var timeoutId = null;
        var cleanOnTransitionEnd = function () {
            element.style.zIndex = originalZIndex;
            element.style.transition = originalTransition;
            success();
            element.removeEventListener('transitioncancel', cleanOnTransitionEnd);
            element.removeEventListener('transitionend', cleanOnTransitionEnd);
            document.removeEventListener('visibilitychange', cleanOnTransitionEnd);
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
        var cleanOnTransitionCancel = function () {
            var _a;
            element.style.transition = "";
            element.offsetHeight;
            element.style.transform = (_a = settings === null || settings === void 0 ? void 0 : settings.finalTransform) !== null && _a !== void 0 ? _a : null;
            element.offsetHeight;
            cleanOnTransitionEnd();
        };
        element.addEventListener('transitioncancel', cleanOnTransitionEnd);
        element.addEventListener('transitionend', cleanOnTransitionEnd);
        document.addEventListener('visibilitychange', cleanOnTransitionCancel);
        element.offsetHeight;
        element.style.transition = "transform ".concat(duration, "ms ").concat(transitionTimingFunction);
        element.offsetHeight;
        element.style.transform = "translate(".concat(-x, "px, ").concat(-y, "px) rotate(").concat((_d = settings === null || settings === void 0 ? void 0 : settings.rotationDelta) !== null && _d !== void 0 ? _d : 0, "deg) scale(").concat((_e = settings.scale) !== null && _e !== void 0 ? _e : 1, ")");
        timeoutId = setTimeout(cleanOnTransitionEnd, duration + 100);
    });
    return promise;
}
var BgaSlideToAnimation = (function (_super) {
    __extends(BgaSlideToAnimation, _super);
    function BgaSlideToAnimation(settings) {
        return _super.call(this, slideToAnimation, settings) || this;
    }
    return BgaSlideToAnimation;
}(BgaAnimation));
function slideAnimation(animationManager, animation) {
    var promise = new Promise(function (success) {
        var _a, _b, _c, _d, _e;
        var settings = animation.settings;
        var element = settings.element;
        var _f = getDeltaCoordinates(element, settings), x = _f.x, y = _f.y;
        var duration = (_a = settings.duration) !== null && _a !== void 0 ? _a : 500;
        var originalZIndex = element.style.zIndex;
        var originalTransition = element.style.transition;
        var transitionTimingFunction = (_b = settings.transitionTimingFunction) !== null && _b !== void 0 ? _b : 'linear';
        element.style.zIndex = "".concat((_c = settings === null || settings === void 0 ? void 0 : settings.zIndex) !== null && _c !== void 0 ? _c : 10);
        element.style.transition = null;
        element.offsetHeight;
        element.style.transform = "translate(".concat(-x, "px, ").concat(-y, "px) rotate(").concat((_d = settings === null || settings === void 0 ? void 0 : settings.rotationDelta) !== null && _d !== void 0 ? _d : 0, "deg)");
        var timeoutId = null;
        var cleanOnTransitionEnd = function () {
            element.style.zIndex = originalZIndex;
            element.style.transition = originalTransition;
            success();
            element.removeEventListener('transitioncancel', cleanOnTransitionEnd);
            element.removeEventListener('transitionend', cleanOnTransitionEnd);
            document.removeEventListener('visibilitychange', cleanOnTransitionEnd);
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
        var cleanOnTransitionCancel = function () {
            var _a;
            element.style.transition = "";
            element.offsetHeight;
            element.style.transform = (_a = settings === null || settings === void 0 ? void 0 : settings.finalTransform) !== null && _a !== void 0 ? _a : null;
            element.offsetHeight;
            cleanOnTransitionEnd();
        };
        element.addEventListener('transitioncancel', cleanOnTransitionCancel);
        element.addEventListener('transitionend', cleanOnTransitionEnd);
        document.addEventListener('visibilitychange', cleanOnTransitionCancel);
        element.offsetHeight;
        element.style.transition = "transform ".concat(duration, "ms ").concat(transitionTimingFunction);
        element.offsetHeight;
        element.style.transform = (_e = settings === null || settings === void 0 ? void 0 : settings.finalTransform) !== null && _e !== void 0 ? _e : null;
        timeoutId = setTimeout(cleanOnTransitionEnd, duration + 100);
    });
    return promise;
}
var BgaSlideAnimation = (function (_super) {
    __extends(BgaSlideAnimation, _super);
    function BgaSlideAnimation(settings) {
        return _super.call(this, slideAnimation, settings) || this;
    }
    return BgaSlideAnimation;
}(BgaAnimation));
function pauseAnimation(animationManager, animation) {
    var promise = new Promise(function (success) {
        var _a;
        var settings = animation.settings;
        var duration = (_a = settings === null || settings === void 0 ? void 0 : settings.duration) !== null && _a !== void 0 ? _a : 500;
        setTimeout(function () { return success(); }, duration);
    });
    return promise;
}
var BgaPauseAnimation = (function (_super) {
    __extends(BgaPauseAnimation, _super);
    function BgaPauseAnimation(settings) {
        return _super.call(this, pauseAnimation, settings) || this;
    }
    return BgaPauseAnimation;
}(BgaAnimation));
function shouldAnimate(settings) {
    var _a;
    return document.visibilityState !== 'hidden' && !((_a = settings === null || settings === void 0 ? void 0 : settings.game) === null || _a === void 0 ? void 0 : _a.instantaneousMode);
}
function getDeltaCoordinates(element, settings) {
    var _a;
    if (!settings.fromDelta && !settings.fromRect && !settings.fromElement) {
        throw new Error("[bga-animation] fromDelta, fromRect or fromElement need to be set");
    }
    var x = 0;
    var y = 0;
    if (settings.fromDelta) {
        x = settings.fromDelta.x;
        y = settings.fromDelta.y;
    }
    else {
        var originBR = (_a = settings.fromRect) !== null && _a !== void 0 ? _a : settings.fromElement.getBoundingClientRect();
        var originalTransform = element.style.transform;
        element.style.transform = '';
        var destinationBR = element.getBoundingClientRect();
        element.style.transform = originalTransform;
        x = (destinationBR.left + destinationBR.right) / 2 - (originBR.left + originBR.right) / 2;
        y = (destinationBR.top + destinationBR.bottom) / 2 - (originBR.top + originBR.bottom) / 2;
    }
    if (settings.scale) {
        x /= settings.scale;
        y /= settings.scale;
    }
    return { x: x, y: y };
}
function logAnimation(animationManager, animation) {
    var settings = animation.settings;
    var element = settings.element;
    if (element) {
        console.log(animation, settings, element, element.getBoundingClientRect(), element.style.transform);
    }
    else {
        console.log(animation, settings);
    }
    return Promise.resolve(false);
}
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var AnimationManager = (function () {
    function AnimationManager(game, settings) {
        this.game = game;
        this.settings = settings;
        this.zoomManager = settings === null || settings === void 0 ? void 0 : settings.zoomManager;
        if (!game) {
            throw new Error('You must set your game as the first parameter of AnimationManager');
        }
    }
    AnimationManager.prototype.getZoomManager = function () {
        return this.zoomManager;
    };
    AnimationManager.prototype.setZoomManager = function (zoomManager) {
        this.zoomManager = zoomManager;
    };
    AnimationManager.prototype.getSettings = function () {
        return this.settings;
    };
    AnimationManager.prototype.animationsActive = function () {
        return document.visibilityState !== 'hidden' && !this.game.instantaneousMode;
    };
    AnimationManager.prototype.play = function (animation) {
        return __awaiter(this, void 0, void 0, function () {
            var settings, _a;
            var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
            return __generator(this, function (_s) {
                switch (_s.label) {
                    case 0:
                        animation.played = animation.playWhenNoAnimation || this.animationsActive();
                        if (!animation.played) return [3, 2];
                        settings = animation.settings;
                        (_b = settings.animationStart) === null || _b === void 0 ? void 0 : _b.call(settings, animation);
                        (_c = settings.element) === null || _c === void 0 ? void 0 : _c.classList.add((_d = settings.animationClass) !== null && _d !== void 0 ? _d : 'bga-animations_animated');
                        animation.settings = __assign({ duration: (_h = (_f = (_e = animation.settings) === null || _e === void 0 ? void 0 : _e.duration) !== null && _f !== void 0 ? _f : (_g = this.settings) === null || _g === void 0 ? void 0 : _g.duration) !== null && _h !== void 0 ? _h : 500, scale: (_m = (_k = (_j = animation.settings) === null || _j === void 0 ? void 0 : _j.scale) !== null && _k !== void 0 ? _k : (_l = this.zoomManager) === null || _l === void 0 ? void 0 : _l.zoom) !== null && _m !== void 0 ? _m : undefined }, animation.settings);
                        _a = animation;
                        return [4, animation.animationFunction(this, animation)];
                    case 1:
                        _a.result = _s.sent();
                        (_p = (_o = animation.settings).animationEnd) === null || _p === void 0 ? void 0 : _p.call(_o, animation);
                        (_q = settings.element) === null || _q === void 0 ? void 0 : _q.classList.remove((_r = settings.animationClass) !== null && _r !== void 0 ? _r : 'bga-animations_animated');
                        return [3, 3];
                    case 2: return [2, Promise.resolve(animation)];
                    case 3: return [2];
                }
            });
        });
    };
    AnimationManager.prototype.playParallel = function (animations) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, Promise.all(animations.map(function (animation) { return _this.play(animation); }))];
            });
        });
    };
    AnimationManager.prototype.playSequence = function (animations) {
        return __awaiter(this, void 0, void 0, function () {
            var result, others;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!animations.length) return [3, 3];
                        return [4, this.play(animations[0])];
                    case 1:
                        result = _a.sent();
                        return [4, this.playSequence(animations.slice(1))];
                    case 2:
                        others = _a.sent();
                        return [2, __spreadArray([result], others, true)];
                    case 3: return [2, Promise.resolve([])];
                }
            });
        });
    };
    AnimationManager.prototype.playWithDelay = function (animations, delay) {
        return __awaiter(this, void 0, void 0, function () {
            var promise;
            var _this = this;
            return __generator(this, function (_a) {
                promise = new Promise(function (success) {
                    var promises = [];
                    var _loop_1 = function (i) {
                        setTimeout(function () {
                            promises.push(_this.play(animations[i]));
                            if (i == animations.length - 1) {
                                Promise.all(promises).then(function (result) {
                                    success(result);
                                });
                            }
                        }, i * delay);
                    };
                    for (var i = 0; i < animations.length; i++) {
                        _loop_1(i);
                    }
                });
                return [2, promise];
            });
        });
    };
    AnimationManager.prototype.attachWithAnimation = function (animation, attachElement) {
        var attachWithAnimation = new BgaAttachWithAnimation({
            animation: animation,
            attachElement: attachElement
        });
        return this.play(attachWithAnimation);
    };
    return AnimationManager;
}());
var DISABLED = 'disabled';
var SELECTABLE = 'selectable';
var SELECTED = 'selected';
define([
    'dojo',
    'dojo/_base/declare',
    'dojo/fx',
    'dojox/fx/ext-dojo/complex',
    'ebg/core/gamegui',
    'ebg/counter',
], function (dojo, declare, noUiSliderDefined) {
    return declare('bgagame.johncompany', ebg.core.gamegui, new JohnCompany());
});
var Interaction = (function () {
    function Interaction(game) {
        this.game = game;
        this.subscriptions = [];
    }
    Interaction.create = function (game) {
        Interaction.instance = new Interaction(game);
    };
    Interaction.use = function () {
        return Interaction.instance;
    };
    Interaction.prototype.addPrimaryActionButton = function (_a) {
        var id = _a.id, text = _a.text, callback = _a.callback, extraClasses = _a.extraClasses;
        Interaction.use().addPrimaryActionButton;
        if ($(id)) {
            return;
        }
        this.game
            .framework()
            .addActionButton(id, text, callback, 'customActions', false, 'blue');
        if (extraClasses) {
            dojo.addClass(id, extraClasses);
        }
    };
    Interaction.prototype.clientUpdatePageTitle = function (text, args, nonActivePlayers) {
        if (nonActivePlayers === void 0) { nonActivePlayers = false; }
        var title = this.game.format_string_recursive(_(text), args);
        if (nonActivePlayers) {
            this.game.gamedatas.gamestate.description = title;
        }
        else {
            this.game.gamedatas.gamestate.descriptionmyturn = title;
        }
        this.game.framework().updatePageTitle();
    };
    return Interaction;
}());
var MIN_NOTIFICATION_MS = 1200;
var NotificationManager = (function () {
    function NotificationManager(game) {
        this.game = game;
        this.subscriptions = [];
    }
    NotificationManager.create = function (game) {
        NotificationManager.instance = new NotificationManager(game);
    };
    NotificationManager.getInstance = function () {
        return NotificationManager.instance;
    };
    NotificationManager.prototype.setupNotifications = function () {
        var _this = this;
        console.log('notifications subscriptions setup');
        dojo.connect(this.game.framework().notifqueue, 'addToLog', function () {
            _this.game.addLogClass();
        });
        var notifs = [
            'log',
            'message',
        ];
        notifs.forEach(function (notifName) {
            _this.subscriptions.push(dojo.subscribe(notifName, _this, function (notifDetails) {
                debug("notif_".concat(notifName), notifDetails);
                var promise = _this["notif_".concat(notifName)](notifDetails);
                var promises = promise ? [promise] : [];
                var minDuration = 1;
                var msg = _this.game.format_string_recursive(notifDetails.log, notifDetails.args);
                _this.game.clearPossible();
                if (msg != '') {
                    $('gameaction_status').innerHTML = msg;
                    $('pagemaintitletext').innerHTML = msg;
                    $('generalactions').innerHTML = '';
                    minDuration = MIN_NOTIFICATION_MS;
                }
                if (_this.game.animationManager.animationsActive()) {
                    Promise.all(__spreadArray(__spreadArray([], promises, true), [sleep(minDuration)], false)).then(function () {
                        return _this.game.framework().notifqueue.onSynchronousNotificationEnd();
                    });
                }
                else {
                    _this.game.framework().notifqueue.setSynchronousDuration(0);
                }
            }));
            _this.game.framework().notifqueue.setSynchronous(notifName, undefined);
            [].forEach(function (notifId) {
                _this.game
                    .framework()
                    .notifqueue.setIgnoreNotificationCheck(notifId, function (notif) {
                    return notif.args.playerId == _this.game.getPlayerId();
                });
            });
        });
    };
    NotificationManager.prototype.destroy = function () {
        dojo.forEach(this.subscriptions, dojo.unsubscribe);
    };
    NotificationManager.prototype.notif_log = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                debug('notif_log', notif.args);
                return [2];
            });
        });
    };
    NotificationManager.prototype.notif_message = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2];
            });
        });
    };
    return NotificationManager;
}());
var ConfirmPartialTurn = (function () {
    function ConfirmPartialTurn(game) {
        this.game = game;
    }
    ConfirmPartialTurn.create = function (game) {
        ConfirmPartialTurn.instance = new ConfirmPartialTurn(game);
    };
    ConfirmPartialTurn.getInstance = function () {
        return ConfirmPartialTurn.instance;
    };
    ConfirmPartialTurn.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    ConfirmPartialTurn.prototype.onLeavingState = function () {
        debug('Leaving ConfirmTurnState');
    };
    ConfirmPartialTurn.prototype.setDescription = function (activePlayerId) {
    };
    ConfirmPartialTurn.prototype.updateInterfaceInitialStep = function () {
        var _this = this;
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _('${you} must confirm the switch of player. You will not be able to restart your turn'),
            args: {
                you: '${you}',
            },
        });
        this.game.addConfirmButton({
            callback: function () {
                return _this.game.takeAction({
                    action: 'actConfirmPartialTurn',
                    atomicAction: false,
                });
            },
        });
        this.game.addUndoButtons(this.args);
    };
    return ConfirmPartialTurn;
}());
var ConfirmTurn = (function () {
    function ConfirmTurn(game) {
        this.game = game;
    }
    ConfirmTurn.create = function (game) {
        ConfirmTurn.instance = new ConfirmTurn(game);
    };
    ConfirmTurn.getInstance = function () {
        return ConfirmTurn.instance;
    };
    ConfirmTurn.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    ConfirmTurn.prototype.onLeavingState = function () {
        debug('Leaving ConfirmTurnState');
    };
    ConfirmTurn.prototype.setDescription = function (activePlayerId) {
    };
    ConfirmTurn.prototype.updateInterfaceInitialStep = function () {
        var _this = this;
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _('${you} must confirm or restart your turn'),
            args: {
                you: '${you}',
            },
        });
        this.game.addConfirmButton({
            callback: function () {
                return _this.game.takeAction({ action: 'actConfirmTurn', atomicAction: false });
            },
        });
        this.game.addUndoButtons(this.args);
    };
    return ConfirmTurn;
}());
var isDebug = window.location.host == 'studio.boardgamearena.com' ||
    window.location.hash.indexOf('debug') > -1;
var debug = isDebug ? console.info.bind(window.console) : function () { };
var addPrimaryActionButton = function (props) { return Interaction.use().addPrimaryActionButton(props); };
var updatePageTitle = function (text, args, nonActivePlayers) {
    if (args === void 0) { args = {}; }
    if (nonActivePlayers === void 0) { nonActivePlayers = false; }
    return Interaction.use().clientUpdatePageTitle(text, Object.assign(args, { you: '${you}' }), nonActivePlayers);
};
function sleep(ms) {
    return new Promise(function (r) { return setTimeout(r, ms); });
}
var JohnCompany = (function () {
    function JohnCompany() {
        this._helpMode = false;
        this._last_notif = null;
        this._notif_uid_to_log_id = {};
        this._notif_uid_to_mobile_log_id = {};
        this._selectableNodes = [];
        this.mobileVersion = false;
        this.states = {
            ConfirmPartialTurn: ConfirmPartialTurn,
            ConfirmTurn: ConfirmTurn,
            PlayerTurn: PlayerTurn,
        };
        console.log('johncompany constructor');
    }
    JohnCompany.prototype.setup = function (gamedatas) {
        var _this = this;
        var body = document.getElementById('ebd-body');
        this.mobileVersion = body && body.classList.contains('mobile_version');
        dojo.place("<div id='customActions' style='display:inline-block'></div>", $('generalactions'), 'after');
        document
            .getElementById('game_play_area')
            .insertAdjacentHTML('afterbegin', tplPlayArea());
        this.setupDontPreloadImages();
        this.gamedatas = gamedatas;
        debug('gamedatas', gamedatas);
        this._connections = [];
        Object.values(this.states).forEach(function (state) { return state.create(_this); });
        this.animationManager = new AnimationManager(this, {
            duration: 500,
        });
        Interaction.create(this);
        NotificationManager.create(this);
        Board.create(this);
        Hand.create(this);
        NotificationManager.getInstance().setupNotifications();
        debug('Ending game setup');
    };
    JohnCompany.prototype.setupPlayerOrder = function (_a) {
        var playerOrder = _a.playerOrder;
        var currentPlayerId = this.getPlayerId();
        var isInGame = playerOrder.includes(currentPlayerId);
        if (isInGame) {
            while (playerOrder[0] !== currentPlayerId) {
                var firstItem = playerOrder.shift();
                playerOrder.push(firstItem);
            }
        }
        this.playerOrder = playerOrder;
    };
    JohnCompany.prototype.setupDontPreloadImages = function () { };
    JohnCompany.prototype.onEnteringState = function (stateName, args) {
        var _this = this;
        console.log('Entering state: ' + stateName, args);
        console.log('state', this.states[stateName]);
        if (this.framework().isCurrentPlayerActive() &&
            this.states[stateName]) {
            this.states[stateName].getInstance().onEnteringState(args.args);
        }
        else if (this.states[stateName]) {
            this.states[stateName]
                .getInstance()
                .setDescription(Number(args.active_player), args.args);
        }
        if (args.args && args.args.previousSteps) {
            args.args.previousSteps.forEach(function (stepId) {
                var logEntry = $('logs').querySelector(".log.notif_newUndoableStep[data-step=\"".concat(stepId, "\"]"));
                if (logEntry) {
                    _this.onClick(logEntry, function () { return _this.undoToStep({ stepId: stepId }); });
                }
                logEntry = document.querySelector(".chatwindowlogs_zone .log.notif_newUndoableStep[data-step=\"".concat(stepId, "\"]"));
                if (logEntry) {
                    _this.onClick(logEntry, function () { return _this.undoToStep({ stepId: stepId }); });
                }
            });
        }
    };
    JohnCompany.prototype.onLeavingState = function (stateName) {
        this.clearPossible();
    };
    JohnCompany.prototype.onUpdateActionButtons = function (stateName, args) {
    };
    JohnCompany.prototype.destroy = function (elem) {
        if (this.framework().tooltips[elem.id]) {
            this.framework().tooltips[elem.id].destroy();
            delete this.framework().tooltips[elem.id];
        }
        elem.remove();
    };
    JohnCompany.prototype.addActionButtonClient = function (_a) {
        var id = _a.id, text = _a.text, callback = _a.callback, extraClasses = _a.extraClasses, _b = _a.color, color = _b === void 0 ? 'none' : _b;
        if ($(id)) {
            return;
        }
        this.framework().addActionButton(id, text, callback, 'customActions', false, color);
        if (extraClasses) {
            dojo.addClass(id, extraClasses);
        }
    };
    JohnCompany.prototype.addCancelButton = function (_a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, callback = _b.callback;
        this.addDangerActionButton({
            id: 'cancel_btn',
            text: _('Cancel'),
            callback: function () {
                if (callback) {
                    callback();
                }
                _this.onCancel();
            },
        });
    };
    JohnCompany.prototype.addConfirmButton = function (_a) {
        var callback = _a.callback;
        this.addPrimaryActionButton({
            id: 'confirm_btn',
            text: _('Confirm'),
            callback: callback,
        });
    };
    JohnCompany.prototype.addPassButton = function (_a) {
        var _this = this;
        var optionalAction = _a.optionalAction, text = _a.text;
        if (optionalAction) {
            this.addSecondaryActionButton({
                id: 'pass_btn',
                text: text ? _(text) : _('Pass'),
                callback: function () {
                    return _this.takeAction({
                        action: 'actPassOptionalAction',
                        atomicAction: false,
                    });
                },
            });
        }
    };
    JohnCompany.prototype.addPlayerButton = function (_a) {
        var player = _a.player, callback = _a.callback;
        var id = "select_".concat(player.id);
        this.addPrimaryActionButton({
            id: id,
            text: player.name,
            callback: callback,
        });
        var node = document.getElementById(id);
        node.style.backgroundColor = "#".concat(player.color);
    };
    JohnCompany.prototype.addPrimaryActionButton = function (_a) {
        var id = _a.id, text = _a.text, callback = _a.callback, extraClasses = _a.extraClasses;
        if ($(id)) {
            return;
        }
        this.framework().addActionButton(id, text, callback, 'customActions', false, 'blue');
        if (extraClasses) {
            dojo.addClass(id, extraClasses);
        }
    };
    JohnCompany.prototype.addSecondaryActionButton = function (_a) {
        var id = _a.id, text = _a.text, callback = _a.callback, extraClasses = _a.extraClasses;
        if ($(id)) {
            return;
        }
        this.framework().addActionButton(id, text, callback, 'customActions', false, 'gray');
        if (extraClasses) {
            dojo.addClass(id, extraClasses);
        }
    };
    JohnCompany.prototype.addDangerActionButton = function (_a) {
        var id = _a.id, text = _a.text, callback = _a.callback, extraClasses = _a.extraClasses;
        if ($(id)) {
            return;
        }
        this.framework().addActionButton(id, text, callback, 'customActions', false, 'red');
        if (extraClasses) {
            dojo.addClass(id, extraClasses);
        }
    };
    JohnCompany.prototype.addUndoButtons = function (_a) {
        var _this = this;
        var previousSteps = _a.previousSteps, previousEngineChoices = _a.previousEngineChoices;
        var lastStep = Math.max.apply(Math, __spreadArray([0], previousSteps, false));
        if (lastStep > 0) {
            this.addDangerActionButton({
                id: 'undo_last_step_btn',
                text: _('Undo last step'),
                callback: function () {
                    return _this.takeAction({
                        action: 'actUndoToStep',
                        args: {
                            stepId: lastStep,
                        },
                        checkAction: 'actRestart',
                        atomicAction: false,
                    });
                },
            });
        }
        if (previousEngineChoices > 0) {
            this.addDangerActionButton({
                id: 'restart_btn',
                text: _('Restart turn'),
                callback: function () {
                    return _this.takeAction({ action: 'actRestart', atomicAction: false });
                },
            });
        }
    };
    JohnCompany.prototype.clearInterface = function () {
    };
    JohnCompany.prototype.clearPossible = function () {
        this.framework().removeActionButtons();
        dojo.empty('customActions');
    };
    JohnCompany.prototype.getPlayerId = function () {
        return Number(this.framework().player_id);
    };
    JohnCompany.prototype.framework = function () {
        return this;
    };
    JohnCompany.prototype.onCancel = function () {
        this.clearPossible();
        this.framework().restoreServerGameState();
    };
    JohnCompany.prototype.clientUpdatePageTitle = function (_a) {
        var text = _a.text, args = _a.args, _b = _a.nonActivePlayers, nonActivePlayers = _b === void 0 ? false : _b;
        var title = this.format_string_recursive(_(text), args);
        if (nonActivePlayers) {
            this.gamedatas.gamestate.description = title;
        }
        else {
            this.gamedatas.gamestate.descriptionmyturn = title;
        }
        this.framework().updatePageTitle();
    };
    JohnCompany.prototype.connect = function (node, action, callback) {
        this._connections.push(dojo.connect($(node), action, callback));
    };
    JohnCompany.prototype.onClick = function (node, callback, temporary) {
        var _this = this;
        if (temporary === void 0) { temporary = true; }
        var safeCallback = function (evt) {
            evt.stopPropagation();
            if (_this.framework().isInterfaceLocked()) {
                return false;
            }
            if (_this._helpMode) {
                return false;
            }
            callback(evt);
        };
        if (temporary) {
            this.connect($(node), 'click', safeCallback);
            this._selectableNodes.push(node);
        }
        else {
            dojo.connect($(node), 'click', safeCallback);
        }
    };
    JohnCompany.prototype.undoToStep = function (_a) {
        var stepId = _a.stepId;
        this.takeAction({
            action: 'actUndoToStep',
            atomicAction: false,
            args: {
                stepId: stepId,
            },
            checkAction: 'actRestart',
        });
    };
    JohnCompany.prototype.updateLayout = function () {
        console.log('updateLayout');
        var ROOT = document.documentElement;
        var playerAreaContainer = document.getElementById('play_area_container');
        if (!playerAreaContainer) {
            return;
        }
        var WIDTH = playerAreaContainer.getBoundingClientRect()['width'];
        var LEFT_COLUMN = 1500;
        var RIGHT_COLUMN = 634;
        var LEFT_SIZE = WIDTH;
        var leftColumnScale = LEFT_SIZE / LEFT_COLUMN;
        ROOT.style.setProperty('--leftColumnScale', "".concat(leftColumnScale));
        var RIGHT_SIZE = WIDTH;
        var rightColumnScale = RIGHT_SIZE / RIGHT_COLUMN;
        ROOT.style.setProperty('--rightColumnScale', "".concat(rightColumnScale));
    };
    JohnCompany.prototype.onAddingNewUndoableStepToLog = function (notif) {
        var _this = this;
        var _a;
        if (!$("log_".concat(notif.logId)))
            return;
        var stepId = notif.msg.args.stepId;
        $("log_".concat(notif.logId)).dataset.step = stepId;
        if ($("dockedlog_".concat(notif.mobileLogId)))
            $("dockedlog_".concat(notif.mobileLogId)).dataset.step = stepId;
        if ((_a = this.gamedatas.gamestate.args.previousSteps) === null || _a === void 0 ? void 0 : _a.includes(Number(stepId))) {
            this.onClick($("log_".concat(notif.logId)), function () { return _this.undoToStep({ stepId: stepId }); });
            if ($("dockedlog_".concat(notif.mobileLogId)))
                this.onClick($("dockedlog_".concat(notif.mobileLogId)), function () {
                    return _this.undoToStep({ stepId: stepId });
                });
        }
    };
    JohnCompany.prototype.onScreenWidthChange = function () {
        this.updateLayout();
    };
    JohnCompany.prototype.format_string_recursive = function (log, args) {
        var _this = this;
        try {
            if (log && args && !args.processed) {
                args.processed = true;
                Object.entries(args).forEach(function (_a) {
                    var key = _a[0], value = _a[1];
                    if (key.startsWith('tkn_')) {
                        args[key] = getTokenDiv({
                            key: key,
                            value: value,
                            game: _this,
                        });
                    }
                });
            }
        }
        catch (e) {
            console.error(log, args, 'Exception thrown', e.stack);
        }
        return this.inherited(arguments);
    };
    JohnCompany.prototype.onPlaceLogOnChannel = function (msg) {
        var currentLogId = this.framework().notifqueue.next_log_id;
        var currentMobileLogId = this.framework().next_log_id;
        var res = this.framework().inherited(arguments);
        this._notif_uid_to_log_id[msg.uid] = currentLogId;
        this._notif_uid_to_mobile_log_id[msg.uid] = currentMobileLogId;
        this._last_notif = {
            logId: currentLogId,
            mobileLogId: currentMobileLogId,
            msg: msg,
        };
        return res;
    };
    JohnCompany.prototype.checkLogCancel = function (notifId) {
        if (this.gamedatas.canceledNotifIds != null &&
            this.gamedatas.canceledNotifIds.includes(notifId)) {
        }
    };
    JohnCompany.prototype.cancelLogs = function (notifIds) {
        var _this = this;
        notifIds.forEach(function (uid) {
            if (_this._notif_uid_to_log_id.hasOwnProperty(uid)) {
                var logId = _this._notif_uid_to_log_id[uid];
                if ($('log_' + logId))
                    dojo.addClass('log_' + logId, 'cancel');
            }
            if (_this._notif_uid_to_mobile_log_id.hasOwnProperty(uid)) {
                var mobileLogId = _this._notif_uid_to_mobile_log_id[uid];
                if ($('dockedlog_' + mobileLogId))
                    dojo.addClass('dockedlog_' + mobileLogId, 'cancel');
            }
        });
    };
    JohnCompany.prototype.addLogClass = function () {
        var _a;
        if (this._last_notif == null) {
            return;
        }
        var notif = this._last_notif;
        var type = notif.msg.type;
        if (type == 'history_history') {
            type = notif.msg.args.originalType;
        }
        if ($('log_' + notif.logId)) {
            dojo.addClass('log_' + notif.logId, 'notif_' + type);
            var methodName = 'onAdding' + type.charAt(0).toUpperCase() + type.slice(1) + 'ToLog';
            (_a = this[methodName]) === null || _a === void 0 ? void 0 : _a.call(this, notif);
        }
        if ($('dockedlog_' + notif.mobileLogId)) {
            dojo.addClass('dockedlog_' + notif.mobileLogId, 'notif_' + type);
        }
    };
    JohnCompany.prototype.addLogTooltip = function (_a) {
        var tooltipId = _a.tooltipId, cardId = _a.cardId;
    };
    JohnCompany.prototype.updateLogTooltips = function () {
    };
    JohnCompany.prototype.setLoader = function (value, max) {
        this.framework().inherited(arguments);
        if (!this.framework().isLoadingComplete && value >= 100) {
            this.framework().isLoadingComplete = true;
            this.onLoadingComplete();
        }
    };
    JohnCompany.prototype.onLoadingComplete = function () {
        this.updateLayout();
    };
    JohnCompany.prototype.updatePlayerOrdering = function () {
        this.framework().inherited(arguments);
        var container = document.getElementById('player_boards');
        var infoPanel = document.getElementById('info_panel');
        if (!container) {
            return;
        }
    };
    JohnCompany.prototype.actionError = function (actionName) {
        this.framework().showMessage("cannot take ".concat(actionName, " action"), 'error');
    };
    JohnCompany.prototype.takeAction = function (_a) {
        var action = _a.action, _b = _a.atomicAction, atomicAction = _b === void 0 ? true : _b, _c = _a.args, args = _c === void 0 ? {} : _c, checkAction = _a.checkAction;
        var actionName = atomicAction ? action : undefined;
        if (!this.framework().checkAction(checkAction || action)) {
            this.actionError(action);
            return;
        }
        var data = {
            lock: true,
            actionName: actionName,
            args: JSON.stringify(args),
        };
        var gameName = this.framework().game_name;
        this.framework().ajaxcall("/".concat(gameName, "/").concat(gameName, "/").concat(atomicAction ? 'actTakeAtomicAction' : action, ".html"), data, this, function () { });
    };
    return JohnCompany;
}());
var _a;
var ORDERS_CONFIG = (_a = {},
    _a[ORDER_PUNJAB_1] = [25, 935],
    _a[ORDER_DELHI_1] = [17, 1071],
    _a[ORDER_DELHI_2] = [49, 1160],
    _a[ORDER_DELHI_3] = [64, 1040],
    _a[ORDER_BENGAL_1] = [115, 1278],
    _a[ORDER_BENGAL_2] = [173, 1375],
    _a[ORDER_BOMBAY_1] = [92, 957],
    _a[ORDER_BOMBAY_2] = [175, 999],
    _a[ORDER_BOMBAY_3] = [235, 943],
    _a[ORDER_MARATHA_1] = [111, 1173],
    _a[ORDER_MARATHA_2] = [179, 1074],
    _a[ORDER_MARATHA_3] = [221, 1224],
    _a[ORDER_HYDERABAD_1] = [302, 1135],
    _a[ORDER_MYSORE_1] = [346, 1020],
    _a[ORDER_MYSORE_2] = [402, 1057],
    _a[ORDER_MADRAS_1] = [400, 1151],
    _a[ORDER_MADRAS_2] = [450, 1120],
    _a);
var Board = (function () {
    function Board(game) {
        this.orders = {};
        this.game = game;
        this.setup(game.gamedatas);
    }
    Board.create = function (game) {
        Board.instance = new Board(game);
    };
    Board.getInstance = function () {
        return Board.instance;
    };
    Board.prototype.setup = function (gamedatas) {
        document
            .getElementById('play_area_container')
            .insertAdjacentHTML('afterbegin', tplBoard(gamedatas));
        this.ui = {
            board: document.getElementById('joco_board'),
            orders: document.getElementById('joco_orders'),
        };
        this.ui.board.insertAdjacentHTML('afterbegin', familyMember);
        this.setupOrders(gamedatas);
    };
    Board.prototype.setupOrders = function (gamedatas) {
        var _this = this;
        Object.keys(gamedatas.orders).forEach(function (orderId) {
            var elt = (_this.orders[orderId] = document.createElement('div'));
            elt.classList.add('joco_order');
        });
        this.updateOrders(gamedatas);
    };
    Board.prototype.updateOrders = function (gamedatas) {
        var _this = this;
        this.ui.orders.replaceChildren();
        Object.entries(gamedatas.orders).forEach(function (_a) {
            var orderId = _a[0], order = _a[1];
            _this.orders[orderId].style.top = "calc(var(--boardScale) * ".concat(ORDERS_CONFIG[orderId][0], "px)");
            _this.orders[orderId].style.left = "calc(var(--boardScale) * ".concat(ORDERS_CONFIG[orderId][1], "px)");
            _this.orders[orderId].setAttribute('data-status', order.status);
            _this.ui.orders.appendChild(_this.orders[orderId]);
        });
    };
    return Board;
}());
var tplBoard = function (gamedatas) { return "<div id=\"joco_board\">\n  <div id=\"joco_orders\"></div>\n</div>"; };
var Hand = (function () {
    function Hand(game) {
        this.game = game;
        this.setup(game.gamedatas);
    }
    Hand.create = function (game) {
        Hand.instance = new Hand(game);
    };
    Hand.getInstance = function () {
        return Hand.instance;
    };
    Hand.prototype.setup = function (gamedatas) {
        document
            .getElementById('play_area_container')
            .insertAdjacentHTML('afterbegin', tplHand());
        Object.values(gamedatas.players).forEach(function (player) {
            var cards = player.hand.map(function (_a) {
                var id = _a.id;
                return "<div id=\"".concat(id, "\" class=\"joco_setup_card\"></div>");
            });
            if (cards.length > 0) {
                document.getElementById('joco_hand').insertAdjacentHTML('afterbegin', cards.join(''));
            }
        });
    };
    return Hand;
}());
var tplHand = function () { return "\n  <div id=\"joco_hand\"></div>\n"; };
var LOG_TOKEN_BOLD_TEXT = 'boldText';
var LOG_TOKEN_BOLD_ITALIC_TEXT = 'boldItalicText';
var tooltipIdCounter = 0;
var getTokenDiv = function (_a) {
    var key = _a.key, value = _a.value, game = _a.game;
    var splitKey = key.split('_');
    var type = splitKey[1];
    switch (type) {
        case LOG_TOKEN_BOLD_TEXT:
            return tlpLogTokenText({ text: value });
        case LOG_TOKEN_BOLD_ITALIC_TEXT:
            return tlpLogTokenText({ text: value, italic: true });
        default:
            return value;
    }
};
var tlpLogTokenText = function (_a) {
    var text = _a.text, tooltipId = _a.tooltipId, _b = _a.italic, italic = _b === void 0 ? false : _b;
    return "<span ".concat(tooltipId ? "id=\"".concat(tooltipId, "\" class=\"log_tooltip\"") : '', " style=\"font-weight: 700;").concat(italic ? ' font-style: italic;' : '', "\">").concat(_(text), "</span>");
};
var PlayerTurn = (function () {
    function PlayerTurn(game) {
        this.game = game;
    }
    PlayerTurn.create = function (game) {
        PlayerTurn.instance = new PlayerTurn(game);
    };
    PlayerTurn.getInstance = function () {
        return PlayerTurn.instance;
    };
    PlayerTurn.prototype.onEnteringState = function (args) {
        debug('Entering SelectPlotState');
        this.updateInterfaceInitialStep();
    };
    PlayerTurn.prototype.onLeavingState = function () {
        debug('Leaving SelectPlotState');
    };
    PlayerTurn.prototype.setDescription = function (activePlayerId) { };
    PlayerTurn.prototype.updateInterfaceInitialStep = function () {
        this.game.clearPossible();
        updatePageTitle(_('${you} must select a card'));
        var cards = document.getElementById('joco_hand').children;
        for (var i = 0; i < cards.length; i++) {
            var node = cards.item(i);
            node.classList.add(SELECTABLE);
        }
    };
    return PlayerTurn;
}());
var tplPlayArea = function () { return "\n  <div id=\"play_area_container\">\n    \n  </div>\n"; };
var familyMember = "\n<div class=\"joco_family_member\">\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50.27 59.47\">\n  <g>\n    <path d=\"M14.56,8.34s.06.05.09.08c.87-.62,1.38-1.5,1.77-2.48.02-.04-.03-.1-.04-.15-.05.02-.12.02-.15.05-.16.2-.33.4-.47.61-.4.63-.8,1.26-1.19,1.89ZM13.86,9.35s-.06-.05-.09-.08c-.3.25-.6.5-.89.77-.26.24-.51.49-.76.75-.07.08-.09.2-.14.3.11-.04.24-.05.34-.11.21-.14.41-.31.62-.46.43-.3.64-.76.92-1.17ZM15.25,5.31c-.26.21-.45.41-.68.56-.55.39-1.1.76-1.65,1.14-.32.22-.68.41-.96.67-.55.5-1.02,1.09-1.59,1.57-.92.77-1.61,1.72-2.24,2.73-.08.13-.16.27-.24.41-.02.05-.02.11-.03.16.07.01.17.06.21.03.11-.07.2-.17.31-.25.22-.16.42-.37.67-.47,1.01-.4,1.83-1.09,2.61-1.81.4-.37.74-.81,1.11-1.22.36-.41.78-.78,1.05-1.24.2-.33.41-.61.67-.89.35-.37.71-.75.75-1.39ZM8.96,13.43c.08-.04.17-.08.25-.13.46-.3.93-.59,1.38-.91.4-.29.78-.61,1.16-.92.04-.03.03-.13.04-.19-.05,0-.11,0-.16.02-.09.05-.16.12-.24.17-.36.26-.72.53-1.09.78-.45.31-.91.62-1.36.93-.04.03-.06.1-.07.15,0,.02.05.05.1.09ZM8.59,13.58c-.05-.03-.1-.08-.13-.08-.18.06-.36.12-.54.2-.05.02-.06.11-.1.17.05,0,.11.04.16.03.17-.05.33-.11.49-.17.05-.02.07-.08.12-.15ZM6.92,14.35c.1.02.15.05.17.03.17-.08.34-.16.51-.25,0,0,0-.06-.01-.1-.18.05-.36.09-.53.15-.05.02-.07.08-.13.16ZM26.81,18.59s0,.05,0,.07c-.08-.01-.16-.06-.23-.04-.38.09-.77.17-1.13.31-.25.1-.31.36-.22.61.11.31.34.1.5.06.88-.22,1.76-.2,2.64.02.23.06.47.05.71.07-.14-.21-.25-.44-.43-.62-.13-.13-.33-.24-.51-.28-.44-.09-.88-.13-1.32-.2ZM20.24,20.54c-.03-.05-.05-.07-.05-.09,0-.09,0-.18,0-.27,0-.01.05-.02.07-.04,0,.11.01.21.02.32,0,.02-.02.03-.04.07ZM28.49,20.55c-.25-.19-.36-.27-.46-.34,0,0-.09.08-.08.1.07.12.15.25.24.36.02.02.13-.04.3-.11ZM36.62,20.86c.17,0,.35,0,.52.03.07.01.17.12.18.18,0,.06-.1.17-.17.18-.54.09-1.09.17-1.63.24-.04,0-.12-.03-.14-.07-.02-.03.02-.12.05-.14.38-.18.77-.36,1.16-.53.01.03.02.07.03.1ZM15.28,22.13s.05.06.07.09c.28-.19.57-.37.83-.58.06-.05.06-.19.08-.29-.09.02-.2.02-.26.07-.25.23-.49.47-.74.7ZM22.71,21.6c.01.47.53,1.42.88,1.62.1.06.24.13.32.1.13-.05.26-.16.32-.28.04-.08-.02-.3-.09-.33-.56-.21-.89-.63-1.14-1.14-.03-.06-.15-.09-.23-.13-.03.07-.06.13-.07.15ZM14.7,22.91l-.08-.12c-.2.14-.41.26-.59.41-.16.13-.3.29-.45.44-.08.09-.15.2-.22.3.15,0,.3.04.44,0,.1-.02.21-.11.28-.2.22-.28.42-.57.62-.85ZM38.24,23.15c-.87.6-1.55.25-1.92-.41-.18-.31-.35-.32-.61-.24-.13.04-.26.11-.39.15-.18.06-.34.1-.46-.11-.03-.06-.15-.08-.22-.12-.08.16-.17.16-.21,0-.01-.05.11-.21.15-.2.46.1.72-.28,1.09-.4.39-.13.8-.23,1.2-.33.62-.16,1.15-.02,1.61.46.53.55.78,1.17.55,1.94-.06.19-.11.32-.37.16-.33-.2-.65-.37-.42-.89ZM37.18,25.07c.35.1.71.19,1.06.3.05.01.08.05.13.08-.03.05-.06.13-.1.13-.23,0-.47.04-.68-.04-.24-.09-.44-.28-.66-.43,0,0,.01-.01.02-.02l.04-.04s.01-.01.02-.02l.15.04ZM29.15,27.09c.31-.43.62-.85.93-1.28.04.03.07.05.11.08-.16.54-.52.93-.93,1.28-.04-.03-.07-.05-.11-.08ZM8.62,25.96c.1.5-.06.89-.42,1.18-.03.03-.13.04-.14.03-.03-.04-.06-.12-.04-.16.19-.35.4-.7.6-1.05ZM25.1,27.64c.22-.47.52-.88.83-1.28.31-.4.65-.79.94-1.21,0,.44-1.08,1.95-1.78,2.49ZM32.46,24.38c-.02.22-.05.32-.03.42.08.41-.04.74-.39.98-.08.06-.12.18-.18.27.11.02.22.06.33.04.47-.07.93-.22,1.39-.23.83-.02,1.47.41,1.96,1.04.34.44.09,1.6-.37,1.9-.14.09-.38.12-.54.07-.26-.09-.49-.21-.79-.14-.12.03-.29-.09-.43-.15-.51-.22-1.01-.45-1.54,0-.19.16-.46.22-.7.31-.46.18-.82-.02-1.11-.35-.32-.35-.36-.78-.28-1.23,0-.05.06-.11.1-.13.23-.12.38-.28.39-.55,0-.07.07-.17.12-.18.75-.13,1.49-2.51,1.75-2.74.06-.06.16-.07.24-.11.03.09.08.17.08.26.01.22,0,.44,0,.53ZM41.09,29.78c-.02-.08-.04-.16-.04-.23,0-.01.06-.03.1-.05.02.07.04.13.05.2,0,.02-.05.04-.1.08ZM39.57,28.34c-.05.36-.03.65.08.92.11.27.31.51.6.78-.24-.61-.46-1.15-.68-1.7ZM33.49,29.18c.06.6.1,1.04.15,1.49,0,.03-.03.07-.04.1-.04-.02-.07-.03-.11-.05-.03-.02-.08-.04-.09-.07-.12-.45-.2-.91.1-1.47ZM15.66,30.53c.07.5.14,1,.22,1.5.01.08.09.16.14.23.04-.09.11-.18.12-.28.02-.16,0-.32,0-.47,0-.43-.06-.85.08-1.28.11-.33.1-.7.13-1.06,0-.08-.08-.16-.12-.24-.05.05-.1.1-.14.16-.28.43-.4.9-.41,1.43ZM36.35,32.11c.08-.27.2-.54.24-.82.03-.22-.01-.46-.07-.67-.11-.42-.27-.82-.39-1.24-.02-.08.03-.17.05-.26.07.05.17.08.21.14.49.74.72,1.56.74,2.44,0,.21.05.42.09.63,0,.04.02.08.03.12.02.34-.23.79-.45.75-.37-.06-.34-.38-.37-.65-.01-.14,0-.28,0-.42-.02,0-.04-.01-.06-.02ZM39.38,30.65s-.09,0-.13.01c-.22.9-.02,1.76.31,2.61,0,.02.12.04.14.02.04-.03.07-.12.05-.15-.19-.41.05-.91-.26-1.3-.05-.07-.04-.19-.05-.28-.02-.3-.04-.61-.06-.91ZM20.19,21.14s.07-.02.11-.02c.03.07.09.13.09.2-.03.43-.01.88-.14,1.29-.3.99-.75,1.95-1.46,2.69-.56.57-.83,1.28-1.25,1.91-.46.68-.52,1.51-.72,2.29-.2.78-.13,1.56.03,2.33.11.54.29,1.07.47,1.59.08.24.6-.24.79-.03.05.06.17.06.25.08.01-.11.06-.23.03-.32-.18-.6-.44-1.19-.39-1.84.02-.21.05-.44.01-.64-.21-1.02.25-1.92.57-2.83.18-.52.61-.95.9-1.44.37-.59.75-1.18,1.06-1.8.15-.32.12-.72.22-1.07.25-.94.37-1.9.38-2.86.01-.87.06-1.79-.65-2.48-.1-.1-.23-.2-.36-.24-.36-.12-.46-.06-.39.28.08.4.23.78.34,1.17.03.12.1.29.05.37-.4.65-.19,1.34-.16,2.01,0,.05.08.1.12.15.04-.06.1-.12.1-.19.01-.2,0-.39,0-.59ZM17.66,34.02c-.18-.08-.23-.11-.29-.12-.13-.02-.26-.04-.39-.05-.07,0-.14.01-.21.02.05.07.07.17.14.21.11.07.24.13.37.14.09,0,.19-.09.38-.2ZM17.03,26.05s-.07-.06-.11-.09c-.24.35-.69.41-.91.84-.41.78-1.05,1.45-1.38,2.25-.38.92-.87,1.8-.96,2.86-.07.82.04,1.56.25,2.32.06-.32.06-.65.1-.97.02-.21.13-.41.14-.62.03-.82.06-1.65.45-2.4.19-.37.47-.71.55-1.1.13-.61.57-.9.98-1.26.19-.16.31-.4.44-.61.03-.05-.02-.14-.03-.21-.06.03.2-.59.49-1.01ZM11.39,33.66c-.07.3-.13.49-.16.69,0,.03.14.11.21.12.05,0,.15-.11.14-.15-.04-.19-.11-.37-.2-.67ZM28.33,33.18c-.27-.02-.46-.37-.33-.6.11-.18.27-.34.41-.51.23-.29.48-.58.67-.9.12-.2.24-.26.43-.18.18.07.4.14.52.28.28.33.63.31.98.27.33-.04.68-.07.98-.21.59-.27,1.1-.09,1.55.24.34.25.64.3,1.03.16.38-.14.58-.04.78.31.14.24.24.49.36.74.03.07.05.18.1.21.7.38.28.88.13,1.34-.02.08-.14.21-.18.19-.1-.04-.25-.12-.26-.21-.13-.85-.83-1.04-1.47-1.3-.71-.29-1.47-.29-2.21-.4-.32-.05-.66.01-.99.05-.41.04-.82.09-1.23.17-.35.06-.69.15-1.03.24-.1.02-.19.07-.25.09ZM14.89,33.46c-.13.38-.22.78.03,1.16.02.03.17,0,.17,0,.02-.17.07-.34.04-.5-.04-.23-.15-.44-.23-.66ZM18.52,33.64v1.26c.3-.48.17-.88,0-1.26ZM28.92,27.98c-.08.23-.15.48-.26.7-.37.76-.77,1.5-1.14,2.27-.08.17-.11.39-.08.58.13,1,.28,1.99.42,2.99.03.22.01.45.01.67-.12-.19-.31-.36-.35-.56-.2-1.02-.53-2.01-.53-3.07,0-.39.08-.73.27-1.08.3-.53.52-1.09.81-1.63.19-.34.43-.64.66-.96.06.03.12.05.18.08ZM31.86,33.54c.75.17,1.59.36,2.43.55.05.01.13.07.13.1-.02.33.08.62.21.91.02.05-.04.17-.09.2-.05.03-.15,0-.21-.04-.11-.08-.19-.2-.3-.29-.14-.11-.28-.23-.44-.28-.5-.16-1.02-.28-1.53-.43-.17-.05-.34-.11-.47-.22-.12-.1-.19-.26-.28-.39.15-.03.29-.07.55-.13ZM9.66,35.2c.02-.17.02-.25.04-.32.09-.22.2-.44.29-.66.21.23-.02.46,0,.69,0,.08-.03.15-.06.23-.04.11-.09.23-.13.34-.06-.11-.12-.22-.14-.27ZM29.62,36.1c-.41-.13-.65-.48-.9-.83-.12-.18-.24-.36-.34-.55-.03-.05,0-.14,0-.21.06.02.16.02.19.07.36.5.7,1.01,1.05,1.51ZM39.97,30.36s-.08.04-.11.06c.03.11.03.23.08.34.3.66.62,1.31.92,1.97.16.36.24.75.42,1.1.22.43.3.84.14,1.3-.13.37-.2.75-.29,1.13-.03.11-.04.23-.06.35.22-.26.34-.55.46-.84.05-.12.09-.31.18-.35.21-.08.19-.21.2-.37.03-.74-.07-1.45-.43-2.12-.31-.56-.5-1.2-.96-1.68-.12-.12-.16-.32-.25-.47-.09-.15-.2-.28-.3-.42ZM37.76,36.96s.05.03.08.05c.15-.19.32-.37.45-.57.1-.16.43-.39-.07-.5-.03,0-.06-.17-.04-.25.14-.59.28-1.18.44-1.76.08-.28.09-.54-.12-.86-.16.74-.32,1.36-.44,1.98-.12.63-.2,1.27-.3,1.91ZM39.54,35.67s.1.03.15.05c-.1.38-.21.75-.3,1.13-.02.08.04.17.06.26.07-.06.17-.11.2-.19.29-.64.4-1.33.48-2.03,0-.07-.04-.14-.07-.21-.08.04-.2.07-.22.13-.12.28-.21.58-.31.86ZM36.12,36.63c-.12.29-.19.51-.3.72-.05.09-.16.14-.25.2.03-.08.08-.16.07-.24,0-.21-.04-.42-.07-.64-.03-.19-.02-.41.2-.4.12,0,.23.23.34.35ZM10.6,36.51c.29.34.43.69.3,1.1-.03.08-.08.15-.12.23-.07-.08-.21-.16-.21-.25,0-.36.02-.72.04-1.08ZM42.89,37.15c.34-.27.77-.48.66-1.11-.35.34-.75.57-.66,1.11,0,0,0,0-.01,0,0,.01-.02.03-.02.04-.18.13-.36.24-.52.39-.05.04-.03.17-.04.26.09-.03.21-.03.25-.08.12-.18.22-.37.32-.56.01,0,.03-.02.04-.03,0,0,0-.02,0-.02ZM40.41,37.66c.1-.09.2-.19.3-.28-.1.16-.21.32-.31.47,0-.07,0-.13.01-.2ZM10.05,37.6c.08.09.14.15.2.22-.04.02-.1.07-.12.06-.06-.03-.12-.08-.17-.13,0,0,.05-.07.1-.14ZM33.59,38c.14-.09.28-.21.43-.28.59-.3.79-.77.69-1.41-.01-.07.05-.15.08-.23.09.05.25.09.26.16.04.23.07.48.02.7-.11.52-.84,1.07-1.48,1.06ZM14.74,38c-.14-.08-.19-.13-.25-.14-.53-.08-1.02-.26-1.43-.64-.03-.02-.13-.02-.14,0-.02.04-.03.12,0,.16.07.09.14.2.24.25.38.19.77.38,1.17.54.08.03.22-.09.42-.18ZM16.03,37.03c-.14.33.15.79-.27,1.07-.05.03-.07.25.16.18.32-.1.33.06.28.31-.03.12,0,.27.03.39,0,.03.09.09.13.08.04-.01.11-.08.1-.12,0-.09-.07-.19-.06-.28.03-.38,0-.8.13-1.14.14-.37.44-.68.69-1,.13-.17.3-.33.54-.19.17.1.15-.03.17-.12.03-.23.05-.46.09-.68.07-.35-.09-.55-.41-.39-.46.23-1.08.2-1.32.79-.02.04-.09.07-.15.1-.42.17-.83.37-1.26.5-.59.17-1.56-.2-1.79-.67-.19-.38-.33-.8-.49-1.19-.07-.18-.14-.35-.22-.56-.28.4-.1.76-.1,1.12.02.82.47,1.39,1.06,1.83.38.28.9.39,1.36.57.38.15.69-.12,1.02-.23.13-.04.21-.24.31-.37ZM37.03,39.2c.51-.18.98-.58,1.29-1.06.32-.48.48-1.03.41-1.52q-1.27,1.13-1.7,2.58ZM40.41,37.63c-.13.09-.26.18-.38.29-.02.02,0,.1,0,.15.07-.03.13-.07.2-.1.03.28.19.35.41.19.37-.26.71-.57,1.08-.82.75-.51,1.23-1.18,1.36-2.09.01-.11.09-.21.13-.31.07-.16.19-.32.19-.48,0-.75,0-1.51-.47-2.16-.09-.13-.15-.29-.22-.44.04-.02.09-.04.13-.07.2.37.4.75.62,1.11.37.62.47,1.25.18,1.93-.06.14-.11.3-.15.45-.01.05,0,.15.01.16.06.02.15.04.21.01.3-.12.44-.38.52-.68.17-.69.13-1.4.17-2.1.05-.83-.11-1.63-.27-2.41-.24-1.18-.6-2.33-.93-3.48-.39-1.39-.81-2.76-1.22-4.15-.09-.32-.13-.66-.26-.96-.21-.47-.47-.91-.72-1.35-.37-.63-.83-1.23-1.12-1.89-.34-.75-.77-1.36-1.44-1.87-.62-.48-1.16-1.04-1.95-1.22-.3-.07-.6-.16-.91-.18-.39-.02-.73-.23-1.11-.28-.48-.07-.98-.04-1.46-.11-.86-.14-1.67.06-2.5.23-.63.13-1.28.19-1.91.28-.5.07-1.02.08-1.49.23-1.03.34-2.03.76-3.04,1.16-.06.02-.17.11-.16.13.03.08.08.19.16.22.1.04.23.02.35.02.53-.04,1.05-.04,1.59.07.37.08.82.12,1.16-.01.65-.26,1.25-.08,1.85.05.37.08.7.35,1.08.46.6.18,1,.63,1.43,1.02.28.25.48.61.45,1.05-.02.26.11.54.16.81.06.35.14.7.16,1.05.03.43-.09.53-.52.5-.2-.01-.39-.06-.58-.11-.26-.07-.42-.04-.4.29.01.22-.01.44-.06.65-.05.25-.37.43-.65.39-.3-.04-.23-.27-.23-.46,0-.32,0-.63-.04-.95-.02-.17-.05-.38-.17-.48-.13-.12-.34-.17-.52-.21-.03,0-.09.19-.16.25-.06.06-.19.11-.26.09-.19-.06-.36-.16-.54-.24-.18-.07-.32-.06-.48.1-.51.51-1.24.54-1.77.04.03.16.06.27.08.39.11.63.11.63.73.69.14.01.28.08.42.12-.11.11-.21.23-.33.32-.07.06-.18.07-.28.1-.82.21-1.68.23-2.45.65-.08.05-.26.03-.34-.02-.44-.34-1.05-.54-1.07-1.25,0-.06-.01-.14-.05-.17-.47-.32-.27-.81-.34-1.24-.03-.22-.07-.43-.11-.65-.05,0-.1,0-.15.01-.15.65-.09,1.32-.07,1.98.02.51.16,1.02.16,1.52,0,.51.32,1,.07,1.52-.02.04,0,.13.02.17.26.41.18.95.54,1.34.17.18.25.45.39.66.21.32.25.62.07.99-.39.83-.75,1.68-1.11,2.54-.11.27-.15.57-.22.85.04.01.09.02.13.04.06-.12.12-.23.17-.35.28-.67.55-1.35.86-2,.22-.48.51-.93.75-1.39.2-.38.37-.78.57-1.16.09-.17.22-.33.34-.48.03-.04.14-.06.15-.05.04.05.08.13.07.19,0,.07-.07.14-.1.21-.28.65-.54,1.31-.83,1.96-.16.34-.07.6.18.85.35.36.6.77.63,1.29,0,.08.03.16.07.22.38.56.39,1.18.39,1.82,0,.43.02.89.37,1.23.06.06.03.22.05.32.11.55.14,1.14.36,1.64.18.41.57.75.91,1.07.74.7,1.41,1.52,2.51,1.68.21.03.42.11.63.1.33,0,.66-.06.99-.11.66-.1,1.28.06,1.89.26.35.11.69.19,1.03.03.46-.21.93-.42,1.37-.65.18-.09.38-.23.48-.4.4-.66.71-1.38,1.15-2.01.39-.56.54-1.17.68-1.81.26-1.18.54-2.35.88-3.51.17-.6.22-1.2.21-1.81,0-.91-.14-1.81.04-2.72.05-.23.04-.47.08-.71.13-.82.13-1.7.44-2.44.55-1.29-.96-3.12-2.25-2.93-.08.01-.16.03-.23.03-.77-.1-1.36.32-1.94.72-.09.06-.12.23-.18.34-.06.12-.13.25-.2.37-.15-.09-.33-.15-.44-.27-.08-.09-.12-.26-.11-.39.02-.43.05-.87.1-1.3.01-.09.13-.19.22-.25.46-.29.94-.55,1.39-.85.21-.15.38-.16.6-.05.33.17.67.33,1.01.5.89.44,1.76.85,2.15,1.91.35.92.46,1.8.18,2.74-.08.27-.14.6-.07.86.2.77.05,1.53.08,2.29.01.41-.01.82.2,1.21.26.48.41,1.02.66,1.51.46.91.6,1.96,1.26,2.78.05.06.06.15.07.22.11.5.22.99.31,1.49.02.11.02.25-.03.35-.17.32-.19.63-.09.98.03.11-.02.28-.1.38-.38.49-.79.97-1.18,1.46,0-.1.06-.31-.12-.17-.15.11-.19.35-.28.54h0s0,.01,0,.01h0s0,0,0,0h0s0-.03,0-.03ZM39.06,38.36l-.1-.06c-.46.48-.91.95-1.36,1.42.32-.1,1.35-.66,1.39-.8.06-.18.05-.37.07-.56ZM16.09,40.29c.37-.13.82-.23,1.21-.45.28-.15.49-.45.69-.71.11-.15.16-.4-.06-.51-.06-.03-.24.14-.35.24-.21.2-.37.52-.62.61-.64.25-1.32.44-2.01.14-.07-.03-.18,0-.26,0,.05.09.07.25.15.28.39.14.79.25,1.26.4ZM32.39,40.48h0c.32.01.64.04.95,0,.88-.1,1.71-.34,2.42-.91.14-.11.25-.25.36-.38.03-.03.02-.1.03-.16-.07,0-.14,0-.2.03-.05.02-.1.07-.14.11-.62.7-1.44.8-2.31.73-.45-.03-.9-.09-1.36-.09s-.91.05-1.36.1c-.06,0-.16.08-.16.13,0,.08.03.21.09.24.19.09.4.17.61.19.35.03.71,0,1.07,0ZM12.01,41.08c-.17-.25-.34-.5-.5-.76-.03-.05.02-.14.03-.22.07.03.17.04.19.09.14.27.25.55.38.83-.04.02-.07.04-.11.06ZM10.82,43.77c-.04.05-.09.11-.13.17-.01-.04-.04-.08-.03-.11.03-.06.07-.12.11-.18.01.03.03.06.05.11ZM11.98,43.8c-.04.08-.07.14-.1.21-.05-.08-.12-.15-.14-.23-.01-.05.06-.12.09-.18.05.07.09.13.15.21ZM12.97,42.98c-.16.55-.3,1.09-.47,1.63-.02.07-.14.11-.21.16,0-.09-.04-.18-.01-.26.21-.58.33-1.18.24-1.8-.05-.3-.19-.59-.28-.89-.02-.06.03-.14.05-.21.06.03.16.04.19.09.24.38.57.73.38,1.26l.12.02ZM12.07,40.09c.53.1,1,.24,1.37.63.13.14.31.2.34.44,0,.09.13.19.23.24.54.33.73.85.83,1.44.09.53.19,1.05-.05,1.57-.06.12-.14.27-.25.31-.43.15-.86.27-1.3.4-.05.01-.11,0-.17,0,.01-.07,0-.15.04-.2.49-.76.38-1.57.14-2.35-.13-.44-.5-.8-.72-1.21-.2-.38-.5-.75-.45-1.24ZM12.02,45.54c-.05.07-.09.15-.14.23-.01-.04-.05-.09-.04-.12.04-.08.1-.15.16-.22,0,.03.02.07.03.11ZM11.08,45.96c.17-.44.33-.87.5-1.3.04-.09.14-.16.21-.24.04.1.14.2.12.28-.08.32-.16.64-.29.95-.1.23-.3.35-.53.31ZM18.97,19.02s-.05,0-.07.02c-.41.16-.97.12-1.13.7-.02.07-.1.13-.12.2-.12.44-.76.53-.72,1.07.23.07.5-.29.68,0,.19.31-.04.61-.17.89-.03.07-.12.1-.17.16-.75.72-3,2.43-3.13,2.55-.42.36-.86.68-1.29,1.02-.05.04-.11.04-.16.07-.38.27-.79.51-1.13.83-.36.35-2.09,2.26-2.31,3.06-.06.24-.3.42-.37.66-.19.65-.34,1.31-.49,1.97-.05.22-.25.43-.05.68.01.02-.08.1-.09.17-.02.09-.05.19-.04.28.02.15.07.29.11.43.1.4.2.8.31,1.19.03.11.17.21.16.31-.05.44.2.75.4,1.08.19.33.41.64.62.97-.12.02-.18-.01-.22-.07-.25-.35-.47-.73-.74-1.06-.5-.61-.81-1.29-.93-2.07,0-.07-.04-.16-.09-.19-.53-.38-.45-.9-.28-1.44l.21,1.17s.09-.02.13-.02c-.02-.35-.08-.7-.07-1.05.02-.85.07-1.7.12-2.55.04-.66.18-1.29.64-1.81.13-.14.19-.35.3-.51.35-.52.55-1.14,1.15-1.46.12-.06.19-.19.3-.28.45-.41.87-.89,1.37-1.22,1.41-.91,2.59-2.08,3.77-3.25.39-.39.83-.73,1.22-1.12.13-.13.41-.23.26-.52-.15.11-.34.18-.45.32-.33.4-.71.72-1.2.91l.8-.91s-.07-.06-.1-.09c-.52.47-1.05.92-1.54,1.42-.2.21-2.3,1.5-2.65,1.78-.61.49-1.19,1.03-1.79,1.54-.14.12-.29.21-.44.31,0-.16.06-.23.12-.31.27-.34.61-.65.77-1.04.12-.29.29-.49.49-.7.22-.23.41-.48.63-.7.19-.19.03-.27-.09-.35-.22-.15-.39-.02-.52.12-.27.31-.52.65-.78.97-.11.13-.23.29-.38.36-.79.37-1.27,1.03-1.72,1.73-.24.37-.09.98-.71,1.11-.05.01-.07.17-.12.26-.1.19-.17.42-.31.57-.66.7-.77,1.63-.85,2.48-.1,1-.33,2.04.2,3.07.36.71.66,1.44,1.08,2.13.17.27.24.61.34.92.02.05-.04.12-.07.17-.36-.23-.31.3-.55.31.01-.23.1-.49.02-.64-.23-.4-.53-.76-.8-1.14-.1-.15-.21-.3-.26-.46-.19-.6-.42-1.2-.5-1.81-.07-.59-.31-1.17-.15-1.8.13-.48.13-1,.23-1.5.09-.44.18-.89.37-1.29.62-1.28,1.6-2.31,2.41-3.47.29-.42.63-.81.96-1.24-.66-.42-1.31-.82-1.94-1.25-.59-.4-1.14-.85-1.71-1.27-.28-.21-.58-.4-.86-.61-.3-.23-.36-.04-.41.21-.07.33-.14.65-.24.97-.09.32-.22.62-.32.94-.12.4-.05.53.34.54.42.01.84.03,1.25-.02.4-.05.69.09.95.36.06.07.09.16.14.24-.09.03-.17.07-.26.07-.6,0-1.19,0-1.79,0-1.1.02-.82-.17-1.01.97,0,.04,0,.08,0,.12-.01.27.1.4.39.39.6,0,1.19,0,1.79,0,.13,0,.26.06.39.09-.07.16-.11.34-.22.46-.08.08-.25.1-.38.11-.34.01-.68,0-1.01,0q-1.22,0-1.22,1.23c0,.08.03.16.02.24-.02.32.17.4.41.33.36-.11.68-.01,1.01.06-.23.74-.26.61-.79.61-.71,0-.71,0-.77.72-.02.27-.14.63-.01.78.13.16.51.11.77.15-.06.54-.06.55-.53.6-.25.03-.36.12-.32.38.05.29.08.59.1.89.01.21.03.4.32.39.24,0,.28.15.29.35,0,.23-.09.3-.32.32-.09,0-.25.14-.26.22-.01.27.01.54.05.81.06.47.11.53.6.52.33,0,.52.15.65.41.08.16.03.28-.17.28-.26,0-.52,0-.77.02-.07,0-.19.13-.19.19.04.39.05.79.3,1.13.1.14.17.21.38.18.39-.05.79-.03,1.19-.03.44,0,.49.09.29.49-.04.07-.13.15-.2.16-.2.02-.4.01-.6.01-.8,0-.83.03-.78.84.03.55.21.73.76.73.14,0,.28,0,.42,0,.22.01.43.25.41.47-.03.28-.26.18-.42.18-.11,0-.23-.05-.35-.06-.23-.02-.34.09-.29.32.07.31.18.61.21.92.04.38.18.51.58.46.45-.05.91-.03,1.37-.03.26,0,.47.28.43.53-.05.27-.26.25-.47.24-.24-.02-.47-.06-.7-.06-.78.02-.85.13-.57.87.03.07.07.15.11.21.17.23.21.49.22.78.02.52.26.97.61,1.51.05-.34.1-.55.1-.76.01-.67.12-.82.78-.82.27,0,.44-.11.64-.26.48-.37.43-.93.55-1.44.12-.51.01-.9-.45-1.19-.59-.38-.83-1-.99-1.64-.09-.34-.08-.71.08-1.07.13.27.2.55.22.83.04.73.22,1.37.97,1.69.18.08.36.18.51.3.34.27.7.53.79.99.02.13-.04.28-.06.43-.08-.1-.15-.2-.23-.3-.05-.06-.1-.13-.16-.17-.11-.08-.19-.1-.26.07-.16.44-.43.85-.53,1.29-.15.7-.56.96-1.22.93-.08,0-.16.02-.24.01-.17-.01-.18.06-.18.21.02.54.02,1.08.04,1.62,0,.25.22.41.44.26.58-.4,1.15-.82,1.67-1.29.18-.16.16-.53.32-.73.17-.21.5-.29.59-.58.14-.45.41-.87.31-1.37-.05-.29-.1-.57-.15-.86-.04-.22-.03-.47-.14-.64-.26-.41-.59-.78-.88-1.17-.03-.03,0-.1-.01-.15.05,0,.12-.02.16,0,.19.14.39.27.55.45.43.47.8,1,1.26,1.42.51.46.78,1.05,1.07,1.62.13.25.1.58.14.87-.03,0-.07.01-.11.02-.11-.32-.21-.65-.33-.97-.03-.08-.11-.15-.17-.22-.04.08-.09.15-.11.24-.09.35-.17.71-.25,1.06-.05-.72-.09-1.41-.53-2.05-.29.9-.52,1.76-.86,2.57-.18.42-.53.77-.85,1.12-.19.21-.45.36-.68.53-.14.1-.29.21-.44.29-.65.33-.71.21-.22.97.06.1.16.18.23.28.16.22.32.19.49.02.25-.25.47-.54.74-.77.61-.51,1.22-1.01,1.51-1.8.02-.07.15-.1.23-.15.02.09.08.21.04.27-.22.43-.39.91-.72,1.25-.44.45-.82,1.04-1.52,1.18-.02,0-.03.02-.05.03-.22.08-.25.28-.18.44.05.1.24.17.37.18.15.02.32-.03.47-.08.8-.28,1.59-.56,2.41-.79.78-.22,1.51-.64,2.26-.97.11-.05.22-.14.33-.13.62.07,1.04-.35,1.49-.63.31-.19.65-.42.62-.97-.02-.37.06-.7-.24-1-.11-.1-.14-.28-.21-.42-.13-.24-.12-.34.2-.35.17,0,.45-.14.47-.26.05-.23-.05-.49-.09-.74,0-.01-.08-.03-.1-.02-.44.22-.56-.14-.78-.38-.32-.34-.53-.79-1.02-.96-.51-.18-1-.42-1.5-.63-.36-.15-.62-.37-.75-.76-.14-.41-.28-.82-.47-1.21-.16-.34-.27-.67-.16-1.03.05-.16.03-.21-.13-.22-.05,0-.08-.1-.13-.15.06,0,.13,0,.19,0,.11,0,.23-.02.35-.03-.07-.09-.15-.17-.22-.26-.29-.31-.64-.53-.61-1.06.04-.59.17-1.14.46-1.64.26-.46.58-.89.86-1.34.2-.32.43-.64.54-.99.14-.45.35-.81.69-1.15.27-.28.34-.74.7-.97.17-.68.76-1.05,1.19-1.53.44-.49,1.03-.83,1.31-1.48.1-.23.27-.47.47-.61.83-.59,1.25-1.45,1.61-2.34.4-.98.7-2,.6-3.09-.02-.22-.14-.42-.3-.42h0ZM26.8,48.01c-.5-.18-1.01-.32-1.48-.54-.5-.22-.97-.51-1.45-.77-.07-.04-.16-.07-.19-.13-.08-.14-.21-.33-.17-.44.09-.23.33-.27.55-.14.39.22.78.46,1.17.69.5.29,1.01.58,1.52.87.05.03.12.03.16.06.08.07.14.16.21.24-.1.05-.19.1-.32.16ZM27.48,47.98c.42-.03.83-.07,1.25-.1.04,0,.09.05.14.07-.03.04-.07.12-.1.12-.42,0-.85,0-1.27,0l-.02-.1ZM30.48,48.85c-.59.4-1.26.14-1.89.19-.05,0-.13-.13-.15-.21,0-.03.1-.14.15-.14.64,0,1.27,0,1.91,0,0,.05,0,.1-.01.15ZM29.68,50.62c-.09.03-.18.1-.26.09-.53-.03-1.07-.02-1.58-.14-.67-.16-1.32-.42-1.97-.66-.27-.1-.53-.24-.79-.39-.07-.04-.15-.21-.12-.24.06-.08.19-.18.28-.17.25.05.49.14.73.23.93.37,1.85.76,2.79,1.1.28.1.6.05.91.07,0,.03,0,.06,0,.1ZM41.28,41.26l-.02-.16c.35-.35.73-.59,1.29-.56.85.05,1.71.02,2.56.01.35,0,.55-.19.57-.52,0-.11-.04-.24-.02-.35.18-.77.18-.77-.57-.77-.18,0-.36,0-.54,0-.22,0-.44,0-.65-.02-.04,0-.11-.14-.1-.15.17-.2.24-.52.59-.52s.71-.02,1.06,0c.54.02.8-.15.93-.66.18-.71,0-.92-.75-.84-.06,0-.14.04-.17.02-.07-.06-.18-.15-.17-.21.06-.39.23-.5.72-.52.7-.02.81-.15.75-.84,0-.12-.07-.24-.04-.35.08-.28-.08-.29-.28-.3-.13-.01-.35.09-.34-.18,0-.22.03-.45.33-.47.06,0,.12-.03.18-.02.31,0,.44-.13.4-.44-.01-.1.02-.2.01-.3,0-.25.04-.54-.07-.75-.06-.11-.39-.06-.6-.1-.27-.05-.25-.28-.25-.46,0-.08.11-.19.19-.21.26-.05.64.02.77-.13.14-.16.05-.52.06-.79,0-.12.02-.24.03-.36.02-.23-.08-.33-.31-.32-.22,0-.44,0-.66,0-.32-.01-.45-.15-.46-.47,0-.33.26-.23.43-.25.22-.02.44.02.65.02.33,0,.38-.08.33-.39-.04-.25-.09-.5-.08-.75,0-.43.02-.45-.39-.46-.38-.01-.76,0-1.13,0-.34,0-.52-.19-.48-.51.03-.28.28-.12.43-.16.15-.04.31,0,.47,0,1.04.03,1.14-.09.91-1.14-.03-.16-.04-.32-.1-.46-.03-.08-.16-.16-.25-.16-.55,0-1.1.03-1.65.03-.39,0-.44-.07-.46-.44-.02-.38.25-.29.44-.29.5-.02.99-.01,1.49-.05.12,0,.34-.16.34-.22-.03-.33-.13-.65-.2-.97-.04-.19-.17-.25-.35-.25-.12,0-.24,0-.36,0-.48,0-.95,0-1.43,0-.29,0-.28-.24-.32-.42-.05-.26.16-.23.31-.23.34-.01.68-.03,1.01-.01,1.1.06,1.19-.05.82-1.12-.15-.42-.26-.49-.68-.47-.39.01-.78,0-1.18,0q.13-.66.57-.67c.95-.01,1.01-.09.7-1,0-.02-.02-.04-.02-.05-.19-.49-.27-.54-.83-.47-.06,0-.12.01-.18,0-.26,0-.5-.28-.47-.57.03-.28.27-.14.43-.17.08-.02.16,0,.24,0,.27.02.36-.1.28-.35-.03-.11-.09-.22-.13-.33-.25-.62-.56-1.14-1.38-.93-.26.07-.36-.12-.36-.34,0-.22.09-.34.36-.33.64.02.71-.1.5-.71-.03-.09-.07-.19-.11-.27-.36-.7-.73-1.4-1.09-2.1-.14-.28-.33-.56-.4-.86-.1-.47-.43-.63-.8-.81-.2-.1-.32-.04-.31.18.03.71.05,1.43.13,2.13.06.57.22,1.12.32,1.69.05.32-.1.51-.36.48-.25-.02-.38-.18-.44-.41-.06-.25-.16-.49-.23-.73-.21-.7-.44-1.39-.62-2.1-.17-.68-.52-1.33-.48-2.06,0-.04-.03-.07-.04-.11-.12-.52-.27-1.03-.35-1.55-.05-.32-.23-.44-.49-.51-.21-.06-.28.09-.25.22.18.82.36,1.65.57,2.46.11.43.29.84.28,1.31,0,.23.08.47.18.69.46,1.03.97,2.03,1.38,3.08.27.69.83,1.24.94,2,.01.07.08.14.14.19.45.37.55.95.64,1.43.16.79.24,1.65-.32,2.39-.08.11-.07.33-.03.48.21.74.46,1.47.67,2.21.27.95.47,1.91.78,2.85.3.9.71,1.77,1.03,2.66.17.46.34.96.35,1.44,0,.98.03,1.96-.22,2.92-.11.42-.2.87-.41,1.23-.58.98-1.17,1.95-1.88,2.84-.44.55-1.01.94-1.61,1.31.27-.35.54-.71.81-1.06-.04-.03-.07-.06-.11-.09-.17.13-.34.26-.5.4-.27.25-.56.47-.9.65-.69.37-1.34.82-2,1.24-.04.02-.04.09-.12.25.55-.26,1-.46,1.44-.67-.05.2-.15.35-.29.44-.61.36-1.21.76-1.86,1.04-.73.33-1.51.59-2.32.64-.58.03-.6.02-.72.57-.03.15-.05.32-.04.47,0,.52-.05,1.02-.3,1.49-.12.23-.08.45.05.68.21.36.3.73.06,1.12-.21.34-.21.64.06.97.22.27.3.56.03.91-.3.38-.07.84.42.88.21.02.3.08.4.26.16.27.38.51.59.74.08.09.23.14.35.18.43.15.87.26,1.28.43.38.16.75.56,1.08.51.33-.05.59-.52.87-.81.02-.02.02-.06.06-.19-.65.08-1.25.05-1.56-.65.27-.02.55-.07.82-.07.44,0,.87.07,1.3.06.17,0,.39-.08.51-.21.3-.3.56-.64.82-.97.11-.13.19-.29.29-.43-.18-.04-.36-.08-.55-.11-.08-.01-.16,0-.24,0-.93,0-1.85,0-2.78,0-.55,0-1.1,0-1.65,0-.18,0-.36-.04-.52-.1-.1-.04-.24-.18-.22-.23.03-.11.15-.26.25-.28.31-.07.63-.1.94-.11.87-.01,1.75-.02,2.62,0,.85.02,1.7.07,2.55.1.07,0,.17-.03.2-.08.25-.44.49-.9.74-1.34.15-.26.02-.3-.2-.3-.83,0-1.67,0-2.5,0-1.42,0-2.85,0-4.27,0-.2,0-.45,0-.48-.24-.03-.24.17-.38.41-.42.08-.01.16-.03.24-.03.77,0,1.55-.02,2.32-.02,1.55,0,3.1.01,4.65.02.36,0,.6-.12.69-.5.05-.21.18-.39.28-.59.23-.47.23-.48-.32-.48-.74,0-1.47,0-2.21,0-1.67,0-3.33,0-5,0-.13,0-.26-.1-.38-.16.09-.11.18-.24.28-.34.05-.05.15-.06.23-.06.67-.06,1.33-.15,2-.16,1.57-.01,3.14.02,4.7.03q1.29,0,1.71-1.23s.02-.08.04-.11c.09-.19,0-.25-.17-.26-.45-.01-.9-.04-1.36-.04-.74,0-1.48,0-2.22,0ZM25.64,51.11c.62.02,1.14.32,1.65.65.03.02.05.09.04.1-.03.04-.08.08-.12.08-.08,0-.17.02-.23-.01-.46-.23-.93-.47-1.39-.7.02-.04.04-.08.06-.12ZM29.03,3.66c-.02-.06.91-1.08,1.5-.89.51.17.91.29,1.72.51.26.07.51.2.77.31.31.13.6.33.93.39.49.1.91.32,1.33.57,1.11.67,2.25,1.3,3.35,1.99.34.21.6.56.9.83.88.81,1.79,1.59,2.39,2.66.17.3.46.55.68.82.88,1.08,1.6,2.26,2.15,3.54.24.56.56,1.09.77,1.66.26.67.43,1.38.65,2.06.21.66.45,1.3.63,1.96.22.83.4,1.68.58,2.52.13.64.23,1.29.35,1.93.26,1.45.33,2.9.28,4.37-.04,1.24,0,2.48-.05,3.72-.04.95-.13,1.9-.28,2.83-.16.99-.4,1.98-.65,2.95-.28,1.08-.58,2.16-.94,3.22-.33.95-.76,1.86-1.17,2.78-.32.73-.67,1.45-1.03,2.16-.1.2-.31.35-.42.55-.3.5-.54,1.04-.88,1.51-.48.66-1,1.28-1.61,1.83-.48.43-.95.89-1.39,1.36-.64.69-1.39,1.22-2.14,1.77-.88.64-1.88,1.08-2.81,1.62-.54.31-1.15.5-1.74.71-.31.11-.41.01-.39-.3.01-.19.09-.38.11-.58.05-.84.08-1.69.13-2.53.02-.29-.18-.25-.3-.19-.83.44-1.74.16-2.6.32-.09.02-.22-.07-.32-.12-.18-.1-.18-.23.01-.28.39-.11.8-.18,1.2-.27.28-.07.57-.14.85-.23.37-.12.74-.26,1.11-.41.24-.09,1.29-.67,1.3-.94.02-.5-.42-1.07-1.54-.12-.36.3-.92.21-1.38.31-.07.01-.15-.02-.22-.03.05-.07.08-.18.15-.21.46-.22.93-.44,1.41-.62.66-.25,1.19-.49,1.18-1.15,0-.21-.12-.46-.27-.61-.18-.17-.87.04-1.1.2-.19.13-.42.21-.63.31-.03-.03-.06-.06-.08-.09.12-.17.23-.35.4-.6-.92.1-1.77.19-2.61.28l-.03-.17c.25-.05.51-.15.76-.15.73.02,1.41-.16,2.06-.45.31-.13.62-.26.91-.43.18-.1.38-.25.47-.42.07-.14.06-.4-.03-.54-.12-.17-.32-.14-.53-.01-.56.36-1.12.74-1.73,1.01-.55.24-1.11.55-1.79.41-.46-.1-.95-.02-1.43-.04-.08,0-.16-.12-.24-.18.08-.04.17-.13.24-.12.93.09,1.8-.17,2.68-.37.83-.19,1.57-.61,2.25-1.12.11-.08.23-.15.32-.25.18-.22.44-.45.49-.71.11-.56.12-1.14.15-1.71,0-.09-.1-.18-.15-.28-.09.08-.21.15-.27.25-.04.07,0,.19,0,.29-.02.37-.06.72-.3,1.05-.68.92-1.58,1.38-2.71,1.47-1.06.08-2.04-.09-2.99-.56-1.23-.6-2.49-1.14-3.74-1.69-.32-.15-.66-.26-.98-.41-1.11-.55-1.75-1.43-1.95-2.66-.12-.72-.21-1.48-.51-2.12-.46-.97-.49-2-.66-3.01-.1-.58-.1-1.17-.15-1.76-.01-.14,0-.28-.04-.41-.03-.12-.12-.22-.18-.33-.04.12-.1.24-.1.35-.04.83.05,1.63.23,2.45.16.7.1,1.45.23,2.16.13.72.39,1.41.58,2.12.07.24.09.49.13.74-.22-.11-.46-.19-.65-.34-.19-.14-.32-.35-.48-.52-.34-.35-.64-.39-.97-.04-.32.34-.6.74-.86,1.13-.14.21.11.9.37,1.12.07.06.17.1.22.18.35.52,4.67,6.36,5.55,7.61.4.56.6,1.21.53,1.94-.11,1.34-.16,2.68-.25,4.02-.04.54-.12,1.08-.19,1.62,0,.05-.13.14-.2.13-.29-.02-.59-.06-.88-.09-.76-.09-1.53-.15-2.24-.48-.05-.02-.12-.02-.18-.03-.39-.05-.79-.08-1.12-.34-.06-.05-.15-.05-.23-.07-1.32-.3-2.54-.86-3.74-1.45-1.08-.53-2.13-1.14-3.11-1.83-1.05-.73-2.01-1.59-2.79-2.62-.52-.67-1.1-1.3-1.58-1.99-.6-.86-1.15-1.75-1.66-2.66-.41-.74-.77-1.52-1.08-2.3-.27-.68-.45-1.4-.68-2.11-.18-.56-.32-1.14-.55-1.68-.17-.41-.13-.86-.28-1.26-.43-1.12-.5-2.32-.73-3.48-.25-1.25-.31-2.52-.29-3.79.03-1.44-.02-2.88.05-4.32.05-1.04.2-2.08.36-3.11.14-.88.34-1.75.57-2.61.28-1.08.58-2.16.93-3.22.27-.8.64-1.57.97-2.35.21-.49.4-.98.66-1.45.3-.54.54-1.11.94-1.6.3-.38.5-.84.74-1.27.49-.88,1.2-1.57,1.91-2.27.43-.43.85-.87,1.31-1.28.66-.59,1.32-1.18,2.03-1.7.61-.45,1.28-.85,1.95-1.2,1.22-.63,2.45-1.25,3.81-1.57.73-.17,1.44-.42,2.17-.62.32-.09,1.04-.23,1.38-.26.62-.06.07.96,0,1.48-.02.19-.09.38-.15.57-.22.7-2.39,3.63-3.18,4.29-.34.28-.56.7-.83,1.06-.04.05-.04.15-.03.22.09.4.65.58,1.06.58,1.1,0,5.48-2.89,6.12-3.33,1.07-.75,3.46-2.98,4.02-3.53ZM26.49,58.52c1.29.1,2.35-.29,3.44-.49.75-.14,1.4-.65,2.2-.59.04,0,.08-.02.11-.03,1.09-.45,2.17-.95,3.28-1.33,1.03-.35,1.82-1.07,2.73-1.61.51-.3.96-.7,1.42-1.07.32-.26.64-.52.93-.82.39-.39.83-.77,1.1-1.24.22-.37.49-.66.79-.94.17-.16.33-.34.48-.53.41-.54.79-1.12,1.23-1.63.68-.79,1.01-1.77,1.5-2.67.53-.97.78-2.06,1.33-3.02.05-.08.07-.19.1-.28.24-.73.46-1.46.71-2.19.38-1.1.63-2.25.88-3.39.17-.82.26-1.65.24-2.5-.01-.5.17-1,.2-1.51.04-.77-.05-1.56.06-2.32.15-1.03.04-2.05-.03-3.07-.07-1.01-.18-2.01-.27-3.02-.04-.47-.09-.95-.15-1.42-.15-1.06-.42-2.08-.75-3.1-.14-.45-.26-.91-.4-1.36-.15-.44-.35-.87-.48-1.32-.38-1.34-.97-2.6-1.63-3.81-.5-.91-1.08-1.8-1.73-2.62-.49-.61-.9-1.28-1.41-1.88-.37-.43-.69-.88-1.13-1.27-.67-.6-1.23-1.34-2-1.83-1.15-.73-2.18-1.64-3.47-2.16-.22-.09-.4-.25-.61-.36-.21-.11-.41-.23-.63-.31-.41-.15-.85-.25-1.25-.43-1.21-.55-2.46-.96-3.79-1.09-.26-.03-.51-.18-.78-.2-.86-.09-1.72-.19-2.59-.22-1.12-.04-2.25-.05-3.36.01-.65.04-1.29.2-1.92.38-1.12.33-2.27.6-3.37,1.02-.88.34-1.75.74-2.64,1.02-1.08.34-1.91,1.08-2.84,1.64-.62.38-1.19.85-1.78,1.28-.08.06-.17.12-.22.2-.5.73-1.3,1.22-1.67,2.06-.02.05-.07.1-.11.14-.53.37-.93.85-1.27,1.4-.15.25-.28.54-.49.73-.56.5-.91,1.14-1.27,1.77-.16.29-.23.62-.37.93-.36.76-.74,1.52-1.09,2.29-.08.17-.05.42-.16.56-.32.41-.44.88-.57,1.36-.11.4-.18.82-.35,1.19-.54,1.24-.81,2.56-1.1,3.87-.18.82-.26,1.65-.25,2.5,0,.5-.17,1.01-.2,1.51-.04.77.05,1.56-.06,2.32-.15,1.01-.03,2.01.03,3.01.05.73.19,1.46.22,2.19.07,1.85.37,3.65.95,5.41.14.43.23.87.38,1.3.17.52.38,1.03.56,1.54.17.48.29.99.52,1.45.56,1.14,1.13,2.26,1.76,3.36.34.6.79,1.13,1.2,1.69.15.2.37.35.51.56.44.61.85,1.23,1.28,1.84.08.11.2.19.31.28.13.12.25.24.38.36.5.48.97.99,1.51,1.42.59.47,1.22.87,1.85,1.29.53.35,1.07.67,1.62.99.3.18.62.32.93.48.23.12.44.27.68.36.38.14.79.2,1.15.37,1.15.53,2.33.96,3.6,1.09.48.05.95.19,1.43.27.43.07.86.11,1.29.15.67.06,1.34.14,2.01.15.47,0,.95-.09,1.26-.12ZM23.09,0c1.53.03,3.02.03,4.5.1.5.02.99.22,1.49.32,1.02.21,2.06.37,3.07.62.72.18,1.42.45,2.12.73.72.29,1.5.52,2.11.97.65.48,1.57.53,2.01,1.3.04.06.16.08.24.11.07.02.19,0,.22.05.36.62,1.12.71,1.58,1.21.86.95,1.85,1.78,2.67,2.76.71.83,1.28,1.78,1.88,2.69.63.96,1.23,1.95,1.84,2.92.04.07.07.14.1.22.27.61.49,1.25.81,1.83.31.56.33,1.2.58,1.77.09.22.16.45.23.67.1.3.19.59.28.89.02.06,0,.12.02.18.18.6.37,1.19.53,1.79.17.66.32,1.32.34,2.02,0,.5.14.99.21,1.49.01.08.06.16.04.23-.12.63.08,1.24.1,1.86.02.56.15,1.11.19,1.67.03.45-.01.91-.01,1.36,0,1.07-.07,2.13-.23,3.18-.09.58-.09,1.18-.13,1.77-.05.74-.14,1.48-.33,2.21-.23.89-.38,1.81-.6,2.71-.1.41-.33.79-.4,1.21-.21,1.14-.79,2.16-1.08,3.28-.09.35-.35.65-.51.98-.3.62-.6,1.24-.9,1.86-.62,1.27-1.48,2.38-2.37,3.46-.43.53-.83,1.09-1.24,1.63-.38.49-.84.91-1.32,1.3-.13.1-.24.24-.37.35-.41.36-.83.71-1.25,1.06-.28.24-.57.48-.87.69-.33.23-.68.44-1.05.63-.54.28-1.09.52-1.64.79-.17.08-.33.2-.51.26-.71.22-1.38.52-2.04.86-.17.09-.38.11-.56.17-.34.11-.67.21-1.01.33-.09.03-.18.11-.27.11-.69,0-1.29.37-1.93.5-.88.19-1.79.28-2.7.34-1,.06-2.01.03-3.02.02-.91-.01-1.8-.19-2.68-.37-.83-.17-1.66-.3-2.48-.47-.46-.1-.92-.23-1.36-.38-.72-.25-1.45-.47-2.12-.81-.62-.31-1.3-.54-1.84-1.01-.11-.1-.29-.13-.44-.18-.4-.13-.77-.32-1-.7-.02-.03-.05-.08-.08-.09-.46-.1-.7-.56-1.08-.71-.45-.18-.77-.48-1.11-.78-.48-.44-.94-.9-1.39-1.39-.53-.58-1.03-1.18-1.54-1.78-1.05-1.25-1.92-2.63-2.74-4.04-.42-.73-.89-1.44-1.1-2.28-.07-.28-.31-.51-.41-.78-.22-.6-.41-1.21-.61-1.82-.09-.26-.19-.52-.29-.78-.07-.2-.13-.41-.2-.61-.09-.3-.19-.6-.28-.9-.01-.04-.05-.07-.05-.1-.03-1.1-.7-2.09-.55-3.22-.27-.43-.18-.91-.21-1.38-.02-.27-.02-.54-.04-.81,0-.13-.02-.27-.04-.4-.09-.64-.23-1.27-.27-1.91-.04-.74.02-1.48,0-2.23-.02-1.01.09-2.01.22-3.01.09-.66.04-1.34.11-2,.07-.64.21-1.27.34-1.91.19-.93.38-1.85.6-2.77.09-.37.24-.73.36-1.1.02-.06.07-.1.07-.16.16-1.16.8-2.16,1.06-3.28.08-.33.33-.61.49-.93.52-1.02.98-2.07,1.57-3.04.49-.81,1.13-1.52,1.7-2.27.41-.55.8-1.11,1.24-1.63.32-.38.63-.77,1.06-1.07.52-.36.95-.84,1.43-1.26.69-.6,1.41-1.17,2.19-1.64.5-.3,1.05-.52,1.59-.77.94-.42,1.88-.84,2.83-1.25.29-.12.6-.16.9-.25.94-.28,1.87-.62,2.82-.85.82-.19,1.66-.25,2.46-.36Z\"/>\n  </g>\n</svg>\n</div>";
