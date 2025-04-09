var _a, _b, _c;
var BOARD_SCALE = 'boardScale';
var PLUS = 'plus';
var MINUS = 'minus';
var DONE = 'done';
var TRADE = 'trade';
var BENYON = 'Benyon';
var HASTINGS = 'Hastings';
var LARKINS = 'Larkins';
var PAXTON = 'Paxton';
var SYKES = 'Sykes';
var WALSH = 'Walsh';
var CROWN = 'Crown';
var CROWN_PLAYER_ID = 1;
var BLUE = 'blue';
var GRAY = 'gray';
var GREEN = 'green';
var PINK = 'pink';
var PURPLE = 'purple';
var YELLOW = 'yellow';
var RED = 'red';
var HEX_COLOR_COLOR_MAP = {
    '99dae9': BLUE,
    dbd9d6: GRAY,
    addb90: GREEN,
    ffb1b9: PINK,
    c7b4e1: PURPLE,
    f9e08d: YELLOW,
};
var COLOR_FAMILY_MAP = (_a = {},
    _a[PINK] = BENYON,
    _a[BLUE] = HASTINGS,
    _a[YELLOW] = LARKINS,
    _a[GRAY] = PAXTON,
    _a[PURPLE] = SYKES,
    _a[GREEN] = WALSH,
    _a);
var SETUP = 'setup';
var LONDON_SEASON = 'londonSeason';
var FAMILY = 'family';
var FIRMS = 'firms';
var HIRING = 'hiring';
var OFFICE = 'office';
var COMPANY_SHARE = 'companyShare';
var CASH = 'cash';
var PRIME_MINISTER = 'primeMinister';
var RANDOM_BLACKMAIL_CARD = 'randomBlackmailCard';
var SHIP = 'ship';
var LUXURY = 'Luxury';
var WORKSHOP = 'Workshop';
var SHIPYARD = 'Shipyard';
var SHARE = 'Share';
var FAMILY_MEMBERS_COUNTER = 'familyMembers';
var CASH_COUNTER = 'cash';
var SHIPS_COUNTER = 'ships';
var SHARES_COUNTER = 'shares';
var WORKSHOPS_COUNTER = 'workshops';
var SHIPYARDS_COUNTER = 'shipyards';
var LUXURIES_COUNTER = 'luxuries';
var COUNTERS = [
    FAMILY_MEMBERS_COUNTER,
    CASH_COUNTER,
    SHIPS_COUNTER,
    SHARES_COUNTER,
    WORKSHOPS_COUNTER,
    SHIPYARDS_COUNTER,
    LUXURIES_COUNTER,
];
var CLOSED = 'closed';
var FILLED = 'filled';
var OPEN = 'open';
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
var CHAIRMAN = 'Chairman';
var DIRECTOR_OF_TRADE = 'DirectorOfTrade';
var MANAGER_OF_SHIPPING = 'ManagerOfShipping';
var MILITARY_AFFAIRS = 'MilitaryAffairs';
var PRESIDENT_OF_BOMBAY = 'PresidentOfBombay';
var PRESIDENT_OF_MADRAS = 'PresidentOfMadras';
var PRESIDENT_OF_BENGAL = 'PresidentOfBengal';
var GOVERNOR_GENERAL = 'GovernorGeneral';
var SUPERINTENDENT_OF_TRADE_IN_CHINE = 'SuperintendentOfTradeInChina';
var GOVERNOR_OF_BOMBAY = 'GovernorOfBombay';
var GOVERNOR_OF_MADRAS = 'GovernorOfMadras';
var GOVERNOR_OF_BENGAL = 'GovernorOfBengal';
var GOVERNOR_OF_PUNJAB = 'GovernorOfPunjab';
var GOVERNOR_OF_DELHI = 'GovernorOfDelhi';
var GOVERNOR_OF_MARATHA = 'GovernorOfMaratha';
var GOVERNOR_OF_HYDERABAD = 'GovernorOfHyderabad';
var GOVERNOR_OF_MYSORE = 'GovernorOfMysore';
var COMMANDER = 'Commander';
var OFFICER = 'Officer';
var OFFICER_IN_TRAINING = 'OfficerInTraining';
var WRITER = 'Writer';
var COURT_OF_DIRECTORS = 'CourtOfDirectors';
var BENGAL = 'Bengal';
var BOMBAY = 'Bombay';
var DELHI = 'Delhi';
var HYDERABAD = 'Hyderabad';
var MADRAS = 'Madras';
var MARATHA = 'Maratha';
var MYSORE = 'Mysore';
var PUNJAB = 'Punjab';
var BENGAL_PRESIDENCY = 'BengalPresidency';
var BOMBAY_PRESIDENCY = 'BombayPresidency';
var MADRAS_PRESIDENCY = 'MadrasPresidency';
var BENGAL_WRITERS = 'Writers_Bengal';
var BOMBAY_WRITERS = 'Writers_Bombay';
var MADRAS_WRITERS = 'Writers_Madras';
var WRITER_LOCATIONS = [BENGAL_WRITERS, BOMBAY_WRITERS, MADRAS_WRITERS];
var BENGAL_ARMY = 'Army_Bengal';
var BOMBAY_ARMY = 'Army_Bombay';
var MADRAS_ARMY = 'Army_Madras';
var ARMIES = [BENGAL_ARMY, BOMBAY_ARMY, MADRAS_ARMY];
var ARMY_REGION_MAP = (_b = {},
    _b[BENGAL_ARMY] = BENGAL,
    _b[BOMBAY_ARMY] = BOMBAY,
    _b[MADRAS_ARMY] = MADRAS,
    _b);
var WEST_INDIAN = 'westIndian';
var EAST_INDIAN = 'eastIndian';
var SOUTH_INDIAN = 'southIndian';
var UNFITTED = 'unfitted';
var SEA_ZONES = [WEST_INDIAN, EAST_INDIAN, SOUTH_INDIAN];
var COMPANY_SHIP = 'CompanyShip';
var EXTRA_SHIP = 'ExtraShip';
var POWER_TOKEN_COMPANY_SHARE = 'companyShare';
var POWER_TOKEN_MANUFACTURING = 'manufacturing';
var POWER_TOKEN_SHIPPING = 'shipping';
var POWER_TOKEN_SOCIAL = 'social';
var SHARE_VICTORY_POINTS_TOKEN = 'shareVictoryPoints';
var POWER_TOKENS = [
    POWER_TOKEN_COMPANY_SHARE,
    POWER_TOKEN_MANUFACTURING,
    POWER_TOKEN_SHIPPING,
    POWER_TOKEN_SOCIAL,
];
var POWER_TOKEN_ICON_MAP = (_c = {},
    _c[POWER_TOKEN_COMPANY_SHARE] = SHARE,
    _c[POWER_TOKEN_MANUFACTURING] = WORKSHOP,
    _c[POWER_TOKEN_SHIPPING] = SHIPYARD,
    _c[POWER_TOKEN_SOCIAL] = LUXURY,
    _c);
var ENLIST_WRITER = 'EnlistWriter';
var ENLIST_OFFICER = 'EnlistOfficer';
var PURCHASE_LUXURY = 'PurchaseLuxury';
var PURCHASE_SHIPYARD = 'PurchaseShipyard';
var PURCHASE_WORKSHOP = 'PurchaseWorkshop';
var SEEK_SHARE = 'SeekShare';
var PURCHASE_ENTERPRISE = 'PurchaseEnterprise';
var STOCK_EXCHANGE_2 = 'StockExchange_2';
var STOCK_EXCHANGE_3_LEFT = 'StockExchange_3_Left';
var STOCK_EXCHANGE_3_RIGHT = 'StockExchange_3_Right';
var STOCK_EXCHANGE_4 = 'StockExchange_4';
var STOCK_EXCHANGE_5 = 'StockExchange_5';
var STOCK_EXCHANGE_POSITIONS = [
    STOCK_EXCHANGE_2,
    STOCK_EXCHANGE_3_LEFT,
    STOCK_EXCHANGE_3_RIGHT,
    STOCK_EXCHANGE_4,
    STOCK_EXCHANGE_5,
];
var BULL = 'Bull';
var STAG = 'Stag';
var LION = 'Lion';
var BEAR = 'Bear';
var PEACOCK = 'Peacock';
var CROWN_CLIMATE = [BULL, STAG, LION, BEAR, PEACOCK];
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
var _this = this;
var moveToAnimation = function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
    var toElement, fromRect, toRect, top, left, originalPositionStyle;
    var game = _b.game, element = _b.element, toId = _b.toId, _c = _b.remove, remove = _c === void 0 ? false : _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                toElement = document.getElementById(toId);
                fromRect = element.getBoundingClientRect();
                toRect = toElement.getBoundingClientRect();
                top = toRect.top - fromRect.top;
                left = toRect.left - fromRect.left;
                originalPositionStyle = element.style.position;
                element.style.top = "".concat(pxNumber(getComputedStyle(element).top) + top, "px");
                element.style.left = "".concat(pxNumber(getComputedStyle(element).left) + left, "px");
                return [4, game.animationManager.play(new BgaSlideAnimation({
                        element: element,
                        transitionTimingFunction: 'ease-in-out',
                        fromRect: fromRect,
                    }))];
            case 1:
                _d.sent();
                if (remove) {
                    element.remove();
                }
                else {
                    element.style.position = originalPositionStyle;
                }
                return [2];
        }
    });
}); };
var pxNumber = function (px) {
    var value = px || '';
    if (value.endsWith('px')) {
        return Number(px.slice(0, -2));
    }
    else {
        return 0;
    }
};
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
    Interaction.prototype.addPlayerButton = function (_a) {
        var id = _a.id, text = _a.text, playerId = _a.playerId, callback = _a.callback, extraClasses = _a.extraClasses;
        this.addSecondaryActionButton({ id: id, text: text, callback: callback, extraClasses: "player-button ".concat(extraClasses) });
        var elt = document.getElementById(id);
        var playerColor = PlayerManager.getInstance().getPlayer(playerId).getColor();
        elt.style.backgroundColor = '#' + playerColor;
    };
    Interaction.prototype.addPrimaryActionButton = function (_a) {
        var id = _a.id, text = _a.text, callback = _a.callback, extraClasses = _a.extraClasses;
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
    Interaction.prototype.addSecondaryActionButton = function (_a) {
        var id = _a.id, text = _a.text, callback = _a.callback, extraClasses = _a.extraClasses;
        if ($(id)) {
            return;
        }
        this.game
            .framework()
            .addActionButton(id, text, callback, 'customActions', false, 'gray');
        if (extraClasses) {
            dojo.addClass(id, extraClasses);
        }
    };
    Interaction.prototype.addCancelButton = function (callback) {
        var _this = this;
        this.addDangerActionButton({
            id: 'cancel_btn',
            text: _('Cancel'),
            callback: function () {
                if (callback) {
                    callback();
                }
                _this.game.onCancel();
            },
        });
    };
    Interaction.prototype.addConfirmButton = function (callback) {
        this.addPrimaryActionButton({
            id: 'confirm_btn',
            text: _('Confirm'),
            callback: callback,
        });
    };
    Interaction.prototype.addDangerActionButton = function (_a) {
        var id = _a.id, text = _a.text, callback = _a.callback, extraClasses = _a.extraClasses;
        if ($(id)) {
            return;
        }
        this.game
            .framework()
            .addActionButton(id, text, callback, 'customActions', false, 'red');
        if (extraClasses) {
            dojo.addClass(id, extraClasses);
        }
    };
    Interaction.prototype.addPassButton = function (optionalAction, text) {
        var _this = this;
        if (optionalAction) {
            this.addSecondaryActionButton({
                id: 'pass_btn',
                text: text ? _(text) : _('Pass'),
                callback: function () {
                    return _this.game.framework().bgaPerformAction('actPassOptionalAction');
                },
            });
        }
    };
    Interaction.prototype.addUndoButtons = function (_a) {
        var previousSteps = _a.previousSteps, previousEngineChoices = _a.previousEngineChoices;
        var lastStep = Math.max.apply(Math, __spreadArray([0], previousSteps, false));
        if (lastStep > 0) {
            this.addDangerActionButton({
                id: 'undo_last_step_btn',
                text: _('Undo last step'),
                callback: function () {
                },
            });
        }
        if (previousEngineChoices > 0) {
            this.addDangerActionButton({
                id: 'restart_btn',
                text: _('Restart turn'),
                callback: function () {
                },
            });
        }
    };
    Interaction.prototype.clearPossible = function () {
        this.game.clearPossible();
    };
    Interaction.prototype.clientUpdatePageTitle = function (text, args, nonActivePlayers) {
        if (nonActivePlayers === void 0) { nonActivePlayers = false; }
        var title = this.game.format_string_recursive(_(text), args);
        this.game.gamedatas.gamestate.descriptionmyturn = title;
        if (nonActivePlayers) {
            this.game.gamedatas.gamestate.description = title;
        }
        this.game.framework().updatePageTitle();
    };
    Interaction.prototype.formatStringRecursive = function (log, args) {
        return this.game.format_string_recursive(log, args);
    };
    Interaction.prototype.onClick = function (node, callback, temporary) {
        if (temporary === void 0) { temporary = true; }
        this.game.onClick(node, callback, temporary);
    };
    Interaction.prototype.setSelected = function (node) {
        if (!node) {
            return;
        }
        node.classList.add(SELECTED);
    };
    Interaction.prototype.performAction = function (actionName, args) {
        this.game.framework().bgaPerformAction('actTakeAtomicAction', {
            actionName: actionName,
            args: JSON.stringify(args),
        });
    };
    Interaction.prototype.wait = function (ms) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.game.framework().wait(ms)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
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
            'changeOrderStatus',
            'companyOperationChairman',
            'draftCardPrivate',
            'draftNewCardsPrivate',
            'enlistFamilyMember',
            'fillOrder',
            'gainCash',
            'gainEnterprise',
            'increaseCompanyBalance',
            'increaseCompanyDebt',
            'makeCheck',
            'moveFamilyMember',
            'moveFamilyMembers',
            'moveRegiment',
            'moveShip',
            'newCompanyShare',
            'nextPhase',
            'payFromTreasury',
            'placeShip',
            'purchaseEnterprise',
            'returnFamilyMemberToSupply',
            'seekShare',
            'setCrownClimate',
            'setupDone',
            'setupFamilyMembers',
        ];
        notifs.forEach(function (notifName) {
            _this.subscriptions.push(dojo.subscribe(notifName, _this, function (notifDetails) {
                debug("notif_".concat(notifName), notifDetails);
                var promise = _this["notif_".concat(notifName)](notifDetails);
                var promises = promise ? [promise] : [];
                var minDuration = 1;
                var msg = _this.game.format_string_recursive(notifDetails.log, notifDetails.args);
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
            ['draftCard'].forEach(function (notifId) {
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
    NotificationManager.prototype.getPlayer = function (playerId) {
        return PlayerManager.getInstance().getPlayer(playerId);
    };
    NotificationManager.prototype.getEnterpriseCounter = function (type) {
        var _a;
        var typeCounterMap = (_a = {},
            _a[LUXURY] = LUXURIES_COUNTER,
            _a[SHIPYARD] = SHIPYARDS_COUNTER,
            _a[WORKSHOP] = WORKSHOPS_COUNTER,
            _a);
        return typeCounterMap[type];
    };
    NotificationManager.prototype.pay = function (playerId, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var logPound, fromRect, player, promises;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.game.framework().wait(1)];
                    case 1:
                        _a.sent();
                        logPound = document.querySelector('#pagemaintitletext .joco_pound');
                        fromRect = document
                            .getElementById("joco-cash-".concat(playerId))
                            .getBoundingClientRect();
                        player = PlayerManager.getInstance().getPlayer(playerId);
                        promises = Array.from(Array(amount).keys()).map(function (_, index) { return __awaiter(_this, void 0, void 0, function () {
                            var element;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, this.game.framework().wait(index * 150)];
                                    case 1:
                                        _a.sent();
                                        player.counters[CASH_COUNTER].incValue(-1);
                                        element = document.createElement('div');
                                        element.classList.add('log_token');
                                        element.classList.add('joco_pound');
                                        element.classList.add('animation');
                                        logPound.insertAdjacentElement('afterbegin', element);
                                        return [4, this.game.animationManager.play(new BgaSlideAnimation({
                                                element: element,
                                                transitionTimingFunction: 'ease-in-out',
                                                fromRect: fromRect,
                                            }))];
                                    case 2:
                                        _a.sent();
                                        element.remove();
                                        return [2];
                                }
                            });
                        }); });
                        return [4, Promise.all(promises)];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
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
    NotificationManager.prototype.notif_draftCardPrivate = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var cardIds;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cardIds = notif.args.cardIds;
                        return [4, Promise.all(cardIds.map(function (cardId, index) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4, this.game.animationManager.attachWithAnimation(new BgaSlideAnimation({ element: document.getElementById(cardId) }), document.getElementById('joco_chosen_cards'))];
                                        case 1:
                                            _a.sent();
                                            return [2];
                                    }
                                });
                            }); }))];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    NotificationManager.prototype.notif_changeOrderStatus = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var order;
            return __generator(this, function (_a) {
                order = notif.args.order;
                Board.getInstance().ui.orders[order.id].setAttribute('data-status', order.status);
                return [2];
            });
        });
    };
    NotificationManager.prototype.notif_companyOperationChairman = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, debtIncreased, companyDebt, treasuries, companyBalance, board;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = notif.args, debtIncreased = _a.debtIncreased, companyDebt = _a.companyDebt, treasuries = _a.treasuries, companyBalance = _a.companyBalance;
                        board = Board.getInstance();
                        Object.entries(treasuries).forEach(function (_a) {
                            var officeId = _a[0], value = _a[1];
                            board.treasuries[officeId].toValue(value);
                        });
                        return [4, Promise.all([
                                board.movePawn('debt', companyDebt),
                                board.movePawn('balance', companyBalance),
                            ])];
                    case 1:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    NotificationManager.prototype.notif_draftNewCardsPrivate = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, cardIds, lastCard;
            return __generator(this, function (_b) {
                _a = notif.args, cardIds = _a.cardIds, lastCard = _a.lastCard;
                SetupArea.getInstance().newCards(cardIds, lastCard);
                return [2];
            });
        });
    };
    NotificationManager.prototype.notif_enlistFamilyMember = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, familyMember, playerId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = notif.args, familyMember = _a.familyMember, playerId = _a.playerId;
                        return [4, Board.getInstance().placeFamilyMembers([familyMember], this.getPlayer(playerId).ui[FAMILY_MEMBERS_COUNTER])];
                    case 1:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    NotificationManager.prototype.notif_fillOrder = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, familyMember, order, from, promises, board, to;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = notif.args, familyMember = _a.familyMember, order = _a.order, from = _a.from;
                        promises = [];
                        board = Board.getInstance();
                        if (familyMember) {
                            to = familyMember.location;
                            familyMember.location = from;
                            promises.push(board.moveFamilyMemberBetweenLocations(familyMember, to));
                        }
                        else {
                            board.ui.orders[order.id].setAttribute('data-status', FILLED);
                        }
                        return [4, Promise.all(promises)];
                    case 1:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    NotificationManager.prototype.notif_gainEnterprise = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, playerId, type, player;
            return __generator(this, function (_b) {
                _a = notif.args, playerId = _a.playerId, type = _a.type;
                player = this.getPlayer(playerId);
                player.counters[this.getEnterpriseCounter(type)].incValue(1);
                if (type === SHIPYARD) {
                    player.counters[SHIPS_COUNTER].incValue(1);
                }
                return [2];
            });
        });
    };
    NotificationManager.prototype.notif_gainCash = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, amount, playerId, logPound, fromRect, promises;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = notif.args, amount = _a.amount, playerId = _a.playerId;
                        return [4, this.game.framework().wait(1)];
                    case 1:
                        _b.sent();
                        logPound = document.querySelector('#pagemaintitletext .joco_pound');
                        fromRect = logPound.getBoundingClientRect();
                        promises = Array.from(Array(amount).keys()).map(function (_, index) { return __awaiter(_this, void 0, void 0, function () {
                            var element;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, this.game.framework().wait(index * 100)];
                                    case 1:
                                        _a.sent();
                                        element = document.createElement('div');
                                        element.classList.add('log_token');
                                        element.classList.add('joco_pound');
                                        element.classList.add('animation');
                                        document
                                            .getElementById("joco-cash-".concat(playerId))
                                            .insertAdjacentElement('afterbegin', element);
                                        return [4, this.game.animationManager.play(new BgaSlideAnimation({
                                                element: element,
                                                transitionTimingFunction: 'ease-in-out',
                                                fromRect: fromRect,
                                            }))];
                                    case 2:
                                        _a.sent();
                                        element.remove();
                                        PlayerManager.getInstance()
                                            .getPlayer(playerId)
                                            .counters[CASH_COUNTER].incValue(1);
                                        return [2];
                                }
                            });
                        }); });
                        return [4, Promise.all(promises)];
                    case 2:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    NotificationManager.prototype.notif_increaseCompanyBalance = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var companyBalance, board;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        companyBalance = notif.args.companyBalance;
                        board = Board.getInstance();
                        return [4, board.movePawn('balance', companyBalance)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    NotificationManager.prototype.notif_increaseCompanyDebt = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, companyBalance, companyDebt, board;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = notif.args, companyBalance = _a.companyBalance, companyDebt = _a.companyDebt;
                        board = Board.getInstance();
                        return [4, Promise.all([
                                board.movePawn('debt', companyDebt),
                                board.movePawn('balance', companyBalance),
                            ])];
                    case 1:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    NotificationManager.prototype.notif_makeCheck = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2];
            });
        });
    };
    NotificationManager.prototype.notif_moveFamilyMember = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, familyMember, to, board;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = notif.args, familyMember = _a.familyMember, to = _a.to;
                        board = Board.getInstance();
                        return [4, board.moveFamilyMemberBetweenLocations(familyMember, to)];
                    case 1:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    NotificationManager.prototype.notif_moveFamilyMembers = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var familyMembers, board;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        familyMembers = notif.args.familyMembers;
                        board = Board.getInstance();
                        return [4, Promise.all(familyMembers.map(function (familyMember, index) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2, board.moveFamilyMember({ familyMember: familyMember, index: index })];
                            }); }); }))];
                    case 1:
                        _a.sent();
                        board.updateFamilyMembers(familyMembers);
                        return [2];
                }
            });
        });
    };
    NotificationManager.prototype.notif_moveRegiment = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, from, regiment;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = notif.args, from = _a.from, regiment = _a.regiment;
                        return [4, Board.getInstance().moveRegimentBetweenArmies(regiment, from)];
                    case 1:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    NotificationManager.prototype.notif_moveShip = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, from, ship;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = notif.args, from = _a.from, ship = _a.ship;
                        return [4, Board.getInstance().moveShip({ ship: ship, from: from })];
                    case 1:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    NotificationManager.prototype.notif_newCompanyShare = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, playerId, familyMember, debt, player, board;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = notif.args, playerId = _a.playerId, familyMember = _a.familyMember, debt = _a.debt;
                        player = this.getPlayer(playerId);
                        board = Board.getInstance();
                        return [4, Promise.all([
                                board.moveFamilyMember({ familyMember: familyMember }),
                                board.movePawn('debt', debt),
                            ])];
                    case 1:
                        _b.sent();
                        player.counters[SHARES_COUNTER].incValue(1);
                        return [2];
                }
            });
        });
    };
    NotificationManager.prototype.notif_nextPhase = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var phase;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        phase = notif.args.phase;
                        return [4, Board.getInstance().movePawn('phase', phase)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    NotificationManager.prototype.notif_payFromTreasury = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, treasury, officeId;
            return __generator(this, function (_b) {
                _a = notif.args, treasury = _a.treasury, officeId = _a.officeId;
                Board.getInstance().treasuries[officeId].toValue(treasury);
                return [2];
            });
        });
    };
    NotificationManager.prototype.notif_placeShip = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, playerId, ship, placedShip, isOtherShip, player, board;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = notif.args, playerId = _a.playerId, ship = _a.ship;
                        placedShip = ship;
                        isOtherShip = [EXTRA_SHIP, COMPANY_SHIP].includes(ship.type);
                        player = this.getPlayer(playerId);
                        board = Board.getInstance();
                        if (isOtherShip) {
                            placedShip = board.updateOtherShip(ship, ship.type);
                        }
                        else if (!board.shipAlreadyInZone(ship.id, ship.location)) {
                            player.counters[SHIPS_COUNTER].incValue(-1);
                        }
                        return [4, board.placeShip(placedShip, player.ui[SHIPS_COUNTER])];
                    case 1:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    NotificationManager.prototype.notif_purchaseEnterprise = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, playerId, type, amount, player;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = notif.args, playerId = _a.playerId, type = _a.type, amount = _a.amount;
                        return [4, this.pay(playerId, amount)];
                    case 1:
                        _b.sent();
                        player = this.getPlayer(playerId);
                        player.counters[this.getEnterpriseCounter(type)].incValue(1);
                        if (type === SHIPYARD) {
                            player.counters[SHIPS_COUNTER].incValue(1);
                        }
                        return [2];
                }
            });
        });
    };
    NotificationManager.prototype.notif_returnFamilyMemberToSupply = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, familyMember, playerId, element;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = notif.args, familyMember = _a.familyMember, playerId = _a.playerId;
                        element = Board.getInstance().ui.familyMembers[familyMember.id];
                        return [4, moveToAnimation({
                                game: this.game,
                                element: element,
                                toId: "joco-familyMembers-".concat(playerId),
                                remove: true,
                            })];
                    case 1:
                        _b.sent();
                        this.getPlayer(playerId).counters[FAMILY_MEMBERS_COUNTER].incValue(1);
                        return [2];
                }
            });
        });
    };
    NotificationManager.prototype.notif_seekShare = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, playerId, familyMember, amount;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = notif.args, playerId = _a.playerId, familyMember = _a.familyMember, amount = _a.amount;
                        return [4, this.pay(playerId, amount)];
                    case 1:
                        _b.sent();
                        return [4, Board.getInstance().placeFamilyMembers([familyMember], this.getPlayer(playerId).ui[FAMILY_MEMBERS_COUNTER])];
                    case 2:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    NotificationManager.prototype.notif_setCrownClimate = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var climate;
            return __generator(this, function (_a) {
                climate = notif.args.climate;
                CrownClimate.getInstance().updateClimate(climate);
                return [2];
            });
        });
    };
    NotificationManager.prototype.notif_setupDone = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                SetupArea.getInstance().hide();
                return [2];
            });
        });
    };
    NotificationManager.prototype.notif_setupFamilyMembers = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, familyMembers, playerId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = notif.args, familyMembers = _a.familyMembers, playerId = _a.playerId;
                        return [4, Board.getInstance().placeFamilyMembers(familyMembers, this.getPlayer(playerId).ui[FAMILY_MEMBERS_COUNTER])];
                    case 1:
                        _b.sent();
                        return [2];
                }
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
        addConfirmButton(function () {
            return _this.game.framework().bgaPerformAction('actConfirmPartialTurn');
        });
        addUndoButtons(this.args);
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
        addConfirmButton(function () {
            return _this.game.framework().bgaPerformAction('actConfirmTurn');
        });
        addUndoButtons(this.args);
    };
    return ConfirmTurn;
}());
var isDebug = window.location.host == 'studio.boardgamearena.com' ||
    window.location.hash.indexOf('debug') > -1;
var debug = isDebug ? console.info.bind(window.console) : function () { };
var addCancelButton = function (callback) {
    Interaction.use().addCancelButton(callback);
};
var addConfirmButton = function (callback) {
    Interaction.use().addConfirmButton(callback);
};
var addDangerActionButton = function (props) {
    Interaction.use().addDangerActionButton(props);
};
var addPassButton = function (optionalAction, text) {
    return Interaction.use().addPassButton(optionalAction, text);
};
var addPlayerButton = function (props) { return Interaction.use().addPlayerButton(props); };
var addPrimaryActionButton = function (props) { return Interaction.use().addPrimaryActionButton(props); };
var addSecondaryActionButton = function (props) { return Interaction.use().addSecondaryActionButton(props); };
var addUndoButtons = function (props) {
    Interaction.use().addUndoButtons(props);
};
var clearPossible = function () {
    Interaction.use().clearPossible();
};
var updatePageTitle = function (text, args, nonActivePlayers) {
    if (args === void 0) { args = {}; }
    if (nonActivePlayers === void 0) { nonActivePlayers = false; }
    return Interaction.use().clientUpdatePageTitle(text, Object.assign(args, { you: '${you}' }), nonActivePlayers);
};
var formatStringRecursive = function (log, args) {
    return Interaction.use().formatStringRecursive(log, args);
};
var setAbsolutePosition = function (elt, scaleVarName, _a) {
    var top = _a.top, left = _a.left;
    if (!elt) {
        return;
    }
    elt.style.top = "calc(var(--".concat(scaleVarName, ") * ").concat(top, "px)");
    elt.style.left = "calc(var(--".concat(scaleVarName, ") * ").concat(left, "px)");
};
var onClick = function (node, callback, temporary) {
    if (temporary === void 0) { temporary = true; }
    var element = typeof node === 'string' ? document.getElementById(node) : node;
    Interaction.use().onClick(element, callback, temporary);
};
var setSelected = function (node) {
    var element = typeof node === 'string' ? document.getElementById(node) : node;
    Interaction.use().setSelected(element);
};
var performAction = function (actionName, args) {
    Interaction.use().clearPossible();
    Interaction.use().performAction(actionName, args);
};
var getPlayerName = function (playerId) {
    return PlayerManager.getInstance().getPlayer(playerId).getName();
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
            Chairman: Chairman,
            ChairmanDebtConsent: ChairmanDebtConsent,
            ConfirmPartialTurn: ConfirmPartialTurn,
            ConfirmTurn: ConfirmTurn,
            DirectorOfTradeSpecialEnvoy: DirectorOfTradeSpecialEnvoy,
            DirectorOfTradeSpecialEnvoySuccess: DirectorOfTradeSpecialEnvoySuccess,
            DirectorOfTradeTransfers: DirectorOfTradeTransfers,
            DraftCard: DraftCard,
            EnlistWriter: EnlistWriter,
            FamilyAction: FamilyAction,
            ManagerOfShipping: ManagerOfShipping,
            MilitaryAffairsAssign: MilitaryAffairsAssign,
            MilitaryAffairsTransfers: MilitaryAffairsTransfers,
            PlayerTurn: PlayerTurn,
            PresidencyDecideOrder: PresidencyDecideOrder,
            PresidencyTrade: PresidencyTrade,
            PresidencyTradeFillOrders: PresidencyTradeFillOrders,
            SeekShare: SeekShare,
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
        this.gameOptions = gamedatas.gameOptions;
        debug('gamedatas', gamedatas);
        this.setupPlayerOrder(gamedatas.playerOrder);
        if (this.gameOptions.crownEnabled) {
            document
                .getElementById('player_boards')
                .insertAdjacentHTML('afterbegin', tplCrownPlayerPanel(_('The Crown'), gamedatas.players[CROWN_PLAYER_ID].color));
        }
        this._connections = [];
        Object.values(this.states).forEach(function (state) { return state.create(_this); });
        this.animationManager = new AnimationManager(this, {
            duration: 500,
        });
        StaticData.create(this);
        Interaction.create(this);
        PlayerManager.create(this);
        if (this.gameOptions.crownEnabled) {
            CrownClimate.create(this);
        }
        NotificationManager.create(this);
        Negotiation.create(this);
        PlayerAreas.create(this);
        Board.create(this);
        Bar.create(this);
        if (this.playerOrder.includes(this.getPlayerId()) &&
            gamedatas.phase === SETUP) {
            SetupArea.create(this);
        }
        NotificationManager.getInstance().setupNotifications();
        debug('Ending game setup');
    };
    JohnCompany.prototype.setupPlayerOrder = function (playerOrder) {
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
        var _a;
        console.log('Entering state: ' + stateName, args);
        var activePlayerIds = (_a = args.args) === null || _a === void 0 ? void 0 : _a.activePlayerIds;
        var playerIsActiveAndStateExists = this.framework().isCurrentPlayerActive() && this.states[stateName];
        var currentPlayerId = this.getPlayerId();
        if (playerIsActiveAndStateExists &&
            (!activePlayerIds || activePlayerIds.includes(currentPlayerId))) {
            this.states[stateName].getInstance().onEnteringState(args.args);
        }
        else if (this.states[stateName]) {
            this.states[stateName]
                .getInstance()
                .setDescription(activePlayerIds || Number(args.active_player), args.args);
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
        if (this.states[stateName]) {
            this.states[stateName].getInstance().onLeavingState();
        }
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
    JohnCompany.prototype.clearInterface = function () {
    };
    JohnCompany.prototype.clearPossible = function () {
        this.framework().removeActionButtons();
        dojo.empty('customActions');
        dojo.forEach(this._connections, dojo.disconnect);
        this._connections = [];
        this._selectableNodes.forEach(function (node) {
            if ($(node)) {
                dojo.removeClass(node, SELECTABLE);
                dojo.removeClass(node, SELECTED);
            }
        });
        this._selectableNodes = [];
        dojo.query(".".concat(SELECTABLE)).removeClass(SELECTABLE);
        dojo.query(".".concat(SELECTED)).removeClass(SELECTED);
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
            dojo.addClass(node, 'selectable');
            this._selectableNodes.push(node);
        }
        else {
            dojo.connect($(node), 'click', safeCallback);
        }
    };
    JohnCompany.prototype.undoToStep = function (_a) {
        var stepId = _a.stepId;
    };
    JohnCompany.prototype.updateLayout = function () {
        var ROOT = document.documentElement;
        var playerAreaContainer = document.getElementById('joco-play-area');
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
    return JohnCompany;
}());
var Bar = (function () {
    function Bar(game) {
        this.ui = {
            tabs: {},
            barButtons: [],
        };
        this.active = 0;
        this.config = [
            {
                id: 'joco-board',
                text: _('Board'),
            },
            {
                id: 'joco-player-areas',
                text: _('Player Areas'),
            },
            {
                id: 'joco-negotiation',
                text: _('Negotiation'),
            },
        ];
        this.game = game;
        this.setup(game.gamedatas);
    }
    Bar.create = function (game) {
        Bar.instance = new Bar(game);
    };
    Bar.getInstance = function () {
        return Bar.instance;
    };
    Bar.prototype.setup = function (gamedatas) {
        var _this = this;
        var bar = document.getElementById('joco-bar');
        this.config.forEach(function (_a, index) {
            var id = _a.id, text = _a.text;
            bar.insertAdjacentHTML('beforeend', tplTabButton(text, index));
            _this.ui.barButtons.push(document.getElementById("joco-bar-item-".concat(index)));
            _this.ui.tabs[id] = document.getElementById(id);
            if (index === _this.active) {
                _this.ui.barButtons[index].classList.add('joco-bar-item-active');
                _this.ui.tabs[id].classList.add('joco-tab-visible');
            }
            else {
                _this.ui.tabs[id].classList.add('joco-tab-hidden');
            }
        });
        bar.addEventListener('click', function (event) { return _this.onIconClick(event); });
    };
    Bar.prototype.onIconClick = function (event) {
        var target = event.target;
        if (!target.classList.contains('joco-bar-item')) {
            return;
        }
        var index = Number(target.id.split('-')[3]);
        this.updateActive();
        this.active = index;
        this.updateActive();
    };
    Bar.prototype.updateActive = function () {
        var tab = this.ui.tabs[this.config[this.active].id];
        tab.classList.toggle('joco-tab-visible');
        tab.classList.toggle('joco-tab-hidden');
        this.ui.barButtons[this.active].classList.toggle('joco-bar-item-active');
    };
    return Bar;
}());
var tplTabButton = function (text, index) { return "\n<div id=\"joco-bar-item-".concat(index, "\" class=\"joco-bar-item\">").concat(text, "</div>\n"); };
var _a, _b, _c, _d, _e, _f, _g;
var ORDERS_CONFIG = (_a = {},
    _a[ORDER_PUNJAB_1] = { top: 22.5, left: 933 },
    _a[ORDER_DELHI_1] = { top: 15, left: 1069 },
    _a[ORDER_DELHI_2] = { top: 47, left: 1158.5 },
    _a[ORDER_DELHI_3] = { top: 62, left: 1038 },
    _a[ORDER_BENGAL_1] = { top: 113, left: 1276 },
    _a[ORDER_BENGAL_2] = { top: 171, left: 1373 },
    _a[ORDER_BOMBAY_1] = { top: 89.5, left: 955 },
    _a[ORDER_BOMBAY_2] = { top: 173, left: 996.5 },
    _a[ORDER_BOMBAY_3] = { top: 233, left: 941 },
    _a[ORDER_MARATHA_1] = { top: 109.5, left: 1171 },
    _a[ORDER_MARATHA_2] = { top: 176.5, left: 1072.5 },
    _a[ORDER_MARATHA_3] = { top: 219.5, left: 1222 },
    _a[ORDER_HYDERABAD_1] = { top: 300.5, left: 1133 },
    _a[ORDER_MYSORE_1] = { top: 344, left: 1017.5 },
    _a[ORDER_MYSORE_2] = { top: 400.5, left: 1055 },
    _a[ORDER_MADRAS_1] = { top: 398, left: 1148.5 },
    _a[ORDER_MADRAS_2] = { top: 447.5, left: 1118.5 },
    _a);
var getCompanyBalanceConfig = function (balance) {
    var left = 24 + 34.5 * (balance % 40);
    return { top: 702, left: left };
};
var COMPANY_DEBT_CONFIG = [
    { top: 149, left: 370 },
    { top: 149, left: 404.5 },
    { top: 149, left: 439 },
    { top: 149, left: 473.5 },
    { top: 149, left: 508 },
    { top: 149, left: 542 },
    { top: 149, left: 576 },
    { top: 149, left: 611 },
    { top: 149, left: 644.5 },
];
var getCompanyDebtConfig = function (debt) {
    return COMPANY_DEBT_CONFIG[debt];
};
var COMPANY_STANDING_CONFIG = {
    fail: { top: 63, left: 370 },
    4: { top: 63, left: 409 },
    6: { top: 63, left: 448 },
    8: { top: 63, left: 487 },
    10: { top: 63, left: 526 },
    12: { top: 63, left: 565 },
    14: { top: 63, left: 604 },
    16: { top: 63, left: 643 },
};
var getCompanyStandingConfig = function (standing) {
    return COMPANY_STANDING_CONFIG[standing];
};
var PHASE_CONFIG = (_b = {},
    _b[SETUP] = { top: 466, left: 226 },
    _b[LONDON_SEASON] = { top: 400, left: 226 },
    _b[FAMILY] = { top: 466, left: 226 },
    _b[FIRMS] = { top: 534, left: 223 },
    _b[HIRING] = { top: 592, left: 223 },
    _b);
var TURN_CONFIG = {
    1: { top: 138, left: 199.5 },
    2: { top: 169, left: 199.5 },
    3: { top: 201, left: 199.5 },
    4: { top: 231, left: 199.5 },
    5: { top: 263, left: 199.5 },
    6: { top: 293, left: 199.5 },
    7: { top: 324, left: 199.5 },
    8: { top: 355, left: 199.5 },
    endGameScoring: { top: 138, left: 199.5 },
};
var getGroupPosition = function (top, left, index, rowSize) {
    var row = Math.floor(index / rowSize);
    var column = index % 4;
    return {
        top: top + 46 * row,
        left: left + 39 * column,
    };
};
var getRegimentGroupPosition = function (top, left, index, rowSize) {
    var row = Math.floor(index / rowSize);
    var column = index % 4;
    return {
        top: top + 46 * row,
        left: left + 10 * column,
    };
};
var getOfficerPosition = function (army, index) {
    console.log('getOfficerPosition', army, index);
    switch (army) {
        case BOMBAY_ARMY:
            return getGroupPosition(22, 760, index, 3);
        case BENGAL_ARMY:
            return getGroupPosition(408, 760, index, 3);
        case MADRAS_ARMY:
            return getGroupPosition(215, 760, index, 3);
        default:
            return { top: 0, left: 0 };
    }
};
var getRegimentPosition = function (location, index, exhausted) {
    switch (location) {
        case BOMBAY_ARMY:
            return getRegimentGroupPosition(22, 694, index, 4);
        case BENGAL_ARMY:
            return getRegimentGroupPosition(408, 694, index, 4);
        case MADRAS_ARMY:
            return getRegimentGroupPosition(215, 694, index, 4);
        default:
            return { top: 0, left: 0 };
    }
};
var getCourtOfDirectorsPosition = function (index) {
    return getGroupPosition(555, 243, index, 4);
};
var getOfficersInTrainingPosition = function (index) {
    return getGroupPosition(602, 692, index, 3);
};
var getWriterPosition = function (location, index) {
    switch (location) {
        case BOMBAY_WRITERS:
            return getGroupPosition(602, 894, index, 3);
        case BENGAL_WRITERS:
            return getGroupPosition(602, 1273, index, 3);
        case MADRAS_WRITERS:
            return getGroupPosition(602, 1084, index, 3);
        default:
            return { top: 0, left: 0 };
    }
};
var getStockExchangePosition = function (position) {
    switch (position) {
        case STOCK_EXCHANGE_2:
            return { top: 458, left: 249 };
        case STOCK_EXCHANGE_3_LEFT:
            return { top: 414, left: 275 };
        case STOCK_EXCHANGE_3_RIGHT:
            return { top: 458, left: 301 };
        case STOCK_EXCHANGE_4:
            return { top: 414, left: 327 };
        case STOCK_EXCHANGE_5:
            return { top: 458, left: 353 };
        default:
            return { top: 0, left: 0 };
    }
};
var WEST_INDIAN_POSITIONS = [
    {
        top: 445,
        left: 870,
    },
    {
        top: 293,
        left: 880,
    },
];
var SOUTH_INDIAN_POSITIONS = [
    {
        top: 391,
        left: 1233,
    },
    {
        top: 491,
        left: 1203,
    },
];
var EAST_INDIAN_POSITIONS = [
    {
        top: 332,
        left: 1273,
    },
    {
        top: 365,
        left: 1313,
    },
];
var getShipPosition = function (sea, index) {
    var numberOfPositions = 2;
    var positionIndex = index % numberOfPositions;
    var offset = Math.floor(index / numberOfPositions);
    var position = { top: 0, left: 0 };
    switch (sea) {
        case WEST_INDIAN:
            position = WEST_INDIAN_POSITIONS[positionIndex];
            break;
        case SOUTH_INDIAN:
            position = SOUTH_INDIAN_POSITIONS[positionIndex];
            break;
        case EAST_INDIAN:
            position = EAST_INDIAN_POSITIONS[positionIndex];
            break;
    }
    position.top = position.top - 20 * offset;
    position.left = position.left + 20 * offset;
    return position;
};
var FAMILY_MEMBER_OFFICE_CONFIG = (_c = {},
    _c[CHAIRMAN] = { top: 662, left: 246 },
    _c[DIRECTOR_OF_TRADE] = { top: 662, left: 420 },
    _c[MANAGER_OF_SHIPPING] = { top: 662, left: 558 },
    _c[MILITARY_AFFAIRS] = { top: 662, left: 694 },
    _c[PRESIDENT_OF_BOMBAY] = { top: 662, left: 831 },
    _c[PRESIDENT_OF_MADRAS] = { top: 662, left: 1021 },
    _c[PRESIDENT_OF_BENGAL] = { top: 662, left: 1210 },
    _c[GOVERNOR_GENERAL] = { top: 662, left: 420 },
    _c[SUPERINTENDENT_OF_TRADE_IN_CHINE] = { top: 662, left: 1400 },
    _c[GOVERNOR_OF_BOMBAY] = { top: 289, left: 964 },
    _c[GOVERNOR_OF_MADRAS] = { top: 500, left: 1119 },
    _c[GOVERNOR_OF_BENGAL] = { top: 107, left: 1349 },
    _c[GOVERNOR_OF_PUNJAB] = { top: 31, left: 861 },
    _c[GOVERNOR_OF_DELHI] = { top: 16, left: 1196 },
    _c[GOVERNOR_OF_MARATHA] = { top: 105, left: 1105 },
    _c[GOVERNOR_OF_HYDERABAD] = { top: 298, left: 1049 },
    _c[GOVERNOR_OF_MYSORE] = { top: 420, left: 993 },
    _c.Commander_Bengal = { top: 471, left: 695 },
    _c.Commander_Bombay = { top: 278, left: 695 },
    _c.Commander_Madras = { top: 84, left: 695 },
    _c);
var towerConfig = (_d = {},
    _d[BENGAL] = { bottom: -149, left: 1339 },
    _d[BOMBAY] = { bottom: -332, left: 954 },
    _d[DELHI] = { bottom: -60, left: 1186 },
    _d[HYDERABAD] = { bottom: -341, left: 1038 },
    _d[MADRAS] = { bottom: -542, left: 1109 },
    _d[MARATHA] = { bottom: -149, left: 1095 },
    _d[MYSORE] = { bottom: -462, left: 983 },
    _d[PUNJAB] = { bottom: -74, left: 851 },
    _d);
var TREASURY_POSITIONS = (_e = {},
    _e[DIRECTOR_OF_TRADE] = { top: 618, left: 416 },
    _e[MANAGER_OF_SHIPPING] = { top: 618, left: 555 },
    _e[PRESIDENT_OF_BOMBAY] = { top: 618, left: 806 },
    _e[PRESIDENT_OF_MADRAS] = { top: 618, left: 996 },
    _e[PRESIDENT_OF_BENGAL] = { top: 618, left: 1185 },
    _e);
var POWER_TOKEN_POSITIONS = [
    { top: 72, left: 276 },
    { top: 115, left: 276 },
    { top: 159, left: 251 },
    { top: 159, left: 301 },
];
var ARMY_SELECT_POSITIONS = (_f = {},
    _f[BOMBAY_ARMY] = { top: 21, left: 692 },
    _f[MADRAS_ARMY] = { top: 214, left: 692 },
    _f[BENGAL_ARMY] = { top: 407, left: 692 },
    _f);
var COMPANY_DEBT_SELECT_POSITIONS = [
    { top: 157, left: 365.5 },
    { top: 157, left: 400 },
    { top: 157, left: 434 },
    { top: 157, left: 468.5 },
    { top: 157, left: 503 },
    { top: 157, left: 537 },
    { top: 157, left: 571.5 },
    { top: 157, left: 606 },
    { top: 157, left: 640 },
];
var SEA_ZONE_SELECT_POSITIONS = (_g = {},
    _g[WEST_INDIAN] = { top: 377, left: 885 },
    _g[SOUTH_INDIAN] = { top: 432, left: 1219 },
    _g[EAST_INDIAN] = { top: 301, left: 1317 },
    _g);
var Board = (function () {
    function Board(game) {
        var _a, _b;
        this.familyMembers = {};
        this.regions = {};
        this.armies = {
            regiments: (_a = {},
                _a[BENGAL_ARMY] = [],
                _a[BOMBAY_ARMY] = [],
                _a[MADRAS_ARMY] = [],
                _a),
        };
        this.powerTokens = {};
        this.seas = (_b = {},
            _b[WEST_INDIAN] = [],
            _b[SOUTH_INDIAN] = [],
            _b[EAST_INDIAN] = [],
            _b);
        this.treasuries = {};
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
            .getElementById('joco')
            .insertAdjacentHTML('afterbegin', tplBoard(gamedatas));
        this.ui = {
            containers: {
                board: document.getElementById('joco-board'),
                familyMembers: document.getElementById('joco-family-members'),
                orders: document.getElementById('joco-orders'),
                regiments: document.getElementById('joco-regiments'),
                pawns: {},
                powerTokens: document.getElementById('joco-power-tokens'),
                selectBoxes: document.getElementById('joco-select-boxes'),
                ships: document.getElementById('joco_ships'),
                treasuries: document.getElementById('joco_treasuries'),
            },
            armyPieces: {},
            familyMembers: {},
            orders: {},
            selectBoxes: {},
            ships: {},
        };
        this.setupArmyPieces(gamedatas);
        this.setupOrders(gamedatas);
        this.setupRegions(gamedatas);
        this.setupPawns(gamedatas);
        this.setupPowerTokens(gamedatas);
        this.setupFamilyMembers(gamedatas);
        this.setupSelectBoxes();
        this.setupShips(gamedatas);
        this.setupTreasuries(gamedatas);
    };
    Board.prototype.setupArmyPieces = function (gamedatas) {
        var _this = this;
        Object.entries(gamedatas.armyPieces).forEach(function (_a) {
            var id = _a[0], piece = _a[1];
            if (id.startsWith('Regiment')) {
                _this.ui.armyPieces[id] = createRegiment();
            }
        });
        this.updateArmyPieces(Object.values(gamedatas.armyPieces));
    };
    Board.prototype.setupFamilyMembers = function (gamedatas) {
        var _this = this;
        Object.values(gamedatas.familyMembers).forEach(function (_a) {
            var id = _a.id, familyId = _a.familyId;
            _this.ui.familyMembers[id] = createFamilyMember(familyId === CROWN
                ? COLOR_FAMILY_MAP[HEX_COLOR_COLOR_MAP[PlayerManager.getInstance()
                    .getPlayer(CROWN_PLAYER_ID)
                    .getColor()]]
                : familyId, id);
            __spreadArray(__spreadArray([
                COURT_OF_DIRECTORS,
                OFFICER_IN_TRAINING
            ], WRITER_LOCATIONS, true), ARMIES, true).forEach(function (location) {
                _this.familyMembers[location] = [];
            });
        });
        this.updateFamilyMembers(Object.values(gamedatas.familyMembers));
    };
    Board.prototype.setupOrders = function (gamedatas) {
        var _this = this;
        Object.keys(gamedatas.orders).forEach(function (orderId) {
            var elt = (_this.ui.orders[orderId] = document.createElement('div'));
            elt.classList.add('joco-order');
        });
        this.updateOrders(gamedatas);
    };
    Board.prototype.setupRegions = function (gamedatas) {
        var _this = this;
        Object.values(gamedatas.regions).forEach(function (region) {
            _this.regions[region.id] = new Region(region.id, _this.game, region);
        });
    };
    Board.prototype.setupPawns = function (gamedatas) {
        var _this = this;
        ['balance', 'standing', 'debt', 'turn', 'phase'].forEach(function (pawn) {
            var elt = (_this.ui.containers.pawns[pawn] =
                document.createElement('div'));
            elt.id = pawn;
            elt.classList.add('joco_pawn');
            elt.setAttribute('data-color', pawn === 'turn' ? 'black' : pawn === 'phase' ? 'silver' : 'red');
            _this.ui.containers.board.appendChild(elt);
        });
        this.updatePawns(gamedatas);
    };
    Board.prototype.setupPowerTokens = function (gamedatas) {
        var _this = this;
        POWER_TOKENS.forEach(function (token) {
            var elt = (_this.ui.containers.powerTokens[token] =
                document.createElement('div'));
            elt.classList.add('joco-power-token');
            elt.setAttribute('data-type', token);
            var iconElt = document.createElement('div');
            iconElt.classList.add('joco-icon');
            iconElt.setAttribute('data-icon', POWER_TOKEN_ICON_MAP[token]);
            elt.appendChild(iconElt);
            _this.ui.containers.powerTokens.appendChild(elt);
        });
        this.updatePowerTokens(gamedatas);
    };
    Board.prototype.setupSelectBoxes = function () {
        var _this = this;
        ARMIES.forEach(function (army) {
            var elt = (_this.ui.selectBoxes[army] = document.createElement('div'));
            elt.classList.add('joco-select-box');
            elt.classList.add('joco-select-army');
            setAbsolutePosition(elt, BOARD_SCALE, ARMY_SELECT_POSITIONS[army]);
            _this.ui.containers.selectBoxes.appendChild(elt);
        });
        [BENGAL, BOMBAY, MADRAS].forEach(function (region) {
            var elt = (_this.ui.selectBoxes["Writers_".concat(region)] =
                document.createElement('div'));
            elt.classList.add('joco-select-box');
            elt.classList.add('joco-select-writer');
            elt.setAttribute('data-region', region);
            _this.ui.containers.selectBoxes.appendChild(elt);
        });
        SEA_ZONES.forEach(function (seaZone) {
            var elt = (_this.ui.selectBoxes[seaZone] =
                document.createElement('div'));
            elt.classList.add('joco-select-box');
            elt.classList.add('joco-select-sea-zone');
            setAbsolutePosition(elt, BOARD_SCALE, SEA_ZONE_SELECT_POSITIONS[seaZone]);
            _this.ui.containers.selectBoxes.appendChild(elt);
        });
        STOCK_EXCHANGE_POSITIONS.forEach(function (position) {
            var elt = (_this.ui.selectBoxes[position] =
                document.createElement('div'));
            elt.classList.add('joco-select-box');
            elt.classList.add('joco-seek-share');
            elt.setAttribute('data-position', position);
            _this.ui.containers.selectBoxes.appendChild(elt);
        });
        Array.from(Array(9).keys()).forEach(function (value) {
            var elt = (_this.ui.selectBoxes["companyDebt_".concat(value)] =
                document.createElement('div'));
            elt.classList.add('joco-select-box');
            elt.classList.add('joco-company-debt');
            setAbsolutePosition(elt, BOARD_SCALE, COMPANY_DEBT_SELECT_POSITIONS[value]);
            _this.ui.containers.selectBoxes.appendChild(elt);
        });
    };
    Board.prototype.setupShips = function (gamedatas) {
        var _this = this;
        Object.values(gamedatas.ships).forEach(function (_a) {
            var id = _a.id, name = _a.name, type = _a.type, fatigued = _a.fatigued;
            _this.ui.ships[id] = createShip({ name: name, type: type, fatigued: fatigued });
        });
        this.updateShips(Object.values(gamedatas.ships));
    };
    Board.prototype.setupTreasuries = function (gamedatas) {
        var _this = this;
        Object.entries(TREASURY_POSITIONS).forEach(function (_a) {
            var office = _a[0], position = _a[1];
            _this.treasuries[office] = new Treasury({
                gamedatas: gamedatas,
                office: office,
                position: position,
                container: _this.ui.containers.treasuries,
            });
        });
    };
    Board.prototype.updateArmyPieces = function (pieces) {
        var _this = this;
        pieces.forEach(function (piece) {
            if (piece.location.startsWith('supply')) {
                return;
            }
            if (piece.id.startsWith('Regiment')) {
                var elt = _this.ui.armyPieces[piece.id];
                if (!_this.ui.armyPieces[piece.id].parentElement) {
                    _this.ui.containers.regiments.appendChild(elt);
                }
                setAbsolutePosition(elt, BOARD_SCALE, getRegimentPosition(piece.location, _this.armies.regiments[piece.location].length, piece.exhausted));
                _this.armies.regiments[piece.location].push(piece);
            }
        });
    };
    Board.prototype.updateFamilyMembers = function (familyMembers) {
        var _this = this;
        familyMembers.forEach(function (familyMember) {
            var location = familyMember.location, id = familyMember.id;
            if (location.startsWith('supply')) {
                return;
            }
            if (!_this.ui.familyMembers[id].parentElement) {
                _this.ui.containers.familyMembers.appendChild(_this.ui.familyMembers[id]);
            }
            var position = { top: 0, left: 0 };
            switch (location) {
                case COURT_OF_DIRECTORS:
                    position = getCourtOfDirectorsPosition(_this.familyMembers[COURT_OF_DIRECTORS].length);
                    _this.familyMembers[COURT_OF_DIRECTORS].push(familyMember);
                    break;
                case OFFICER_IN_TRAINING:
                    position = getOfficersInTrainingPosition(_this.familyMembers[OFFICER_IN_TRAINING].length);
                    _this.familyMembers[OFFICER_IN_TRAINING].push(familyMember);
                    break;
                case BENGAL_WRITERS:
                case BOMBAY_WRITERS:
                case MADRAS_WRITERS:
                    position = getWriterPosition(location, _this.familyMembers[location].length);
                    _this.familyMembers[location].push(familyMember);
                    break;
                case BENGAL_ARMY:
                case BOMBAY_ARMY:
                case MADRAS_ARMY:
                    position = getOfficerPosition(location, _this.familyMembers[location].length);
                    _this.familyMembers[location].push(familyMember);
                    break;
                case STOCK_EXCHANGE_2:
                case STOCK_EXCHANGE_3_LEFT:
                case STOCK_EXCHANGE_3_RIGHT:
                case STOCK_EXCHANGE_4:
                case STOCK_EXCHANGE_5:
                    position = getStockExchangePosition(location);
                    break;
                case ORDER_PUNJAB_1:
                case ORDER_DELHI_1:
                case ORDER_DELHI_2:
                case ORDER_DELHI_3:
                case ORDER_BENGAL_1:
                case ORDER_BENGAL_2:
                case ORDER_BOMBAY_1:
                case ORDER_BOMBAY_2:
                case ORDER_BOMBAY_3:
                case ORDER_MARATHA_1:
                case ORDER_MARATHA_2:
                case ORDER_MARATHA_3:
                case ORDER_HYDERABAD_1:
                case ORDER_MYSORE_1:
                case ORDER_MYSORE_2:
                case ORDER_MADRAS_1:
                case ORDER_MADRAS_2:
                    position = ORDERS_CONFIG[location];
                    break;
                default:
                    position = FAMILY_MEMBER_OFFICE_CONFIG[location];
                    break;
            }
            setAbsolutePosition(_this.ui.familyMembers[id], BOARD_SCALE, position);
        });
    };
    Board.prototype.moveFamilyMember = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var fromRect;
            var familyMember = _b.familyMember, _c = _b.index, index = _c === void 0 ? 0 : _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4, Interaction.use().wait(index * 200)];
                    case 1:
                        _d.sent();
                        fromRect = this.ui.familyMembers[familyMember.id].getBoundingClientRect();
                        this.updateFamilyMembers([familyMember]);
                        return [4, this.game.animationManager.play(new BgaSlideAnimation({
                                element: this.ui.familyMembers[familyMember.id],
                                transitionTimingFunction: 'ease-in-out',
                                fromRect: fromRect,
                            }))];
                    case 2:
                        _d.sent();
                        return [2];
                }
            });
        });
    };
    Board.prototype.moveFamilyMemberBetweenLocations = function (familyMember, to) {
        return __awaiter(this, void 0, void 0, function () {
            var from, promises, remainingFamilyMembers;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        from = familyMember.location;
                        familyMember.location = to;
                        if (this.familyMembers[familyMember.location] &&
                            this.familyMembers[familyMember.location].some(function (memberInLocation) {
                                return memberInLocation.id === familyMember.id;
                            })) {
                            return [2];
                        }
                        promises = [];
                        if (this.familyMembers[from]) {
                            remainingFamilyMembers = this.familyMembers[from].filter(function (member) { return member.id !== familyMember.id; });
                            this.familyMembers[from] = [];
                            promises = remainingFamilyMembers.map(function (member) {
                                return _this.moveFamilyMember({ familyMember: member });
                            });
                        }
                        promises.push(this.moveFamilyMember({ familyMember: familyMember }));
                        return [4, Promise.all(promises)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Board.prototype.placeFamilyMembers = function (familyMembers, fromElement) {
        return __awaiter(this, void 0, void 0, function () {
            var fromRect, promises;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fromRect = fromElement.getBoundingClientRect();
                        promises = familyMembers.map(function (familyMember, index) { return __awaiter(_this, void 0, void 0, function () {
                            var id, player;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        id = familyMember.id;
                                        player = PlayerManager.getInstance().getPlayerForFamily(familyMember.familyId);
                                        return [4, this.game.framework().wait(index * 200)];
                                    case 1:
                                        _a.sent();
                                        player.counters[FAMILY_MEMBERS_COUNTER].incValue(-1);
                                        this.updateFamilyMembers([familyMember]);
                                        return [4, this.game.animationManager.play(new BgaSlideAnimation({
                                                element: this.ui.familyMembers[id],
                                                transitionTimingFunction: 'ease-in-out',
                                                fromRect: fromRect,
                                            }))];
                                    case 2:
                                        _a.sent();
                                        if (familyMember.location === COURT_OF_DIRECTORS ||
                                            familyMember.location === CHAIRMAN) {
                                            player.counters[SHARES_COUNTER].incValue(1);
                                        }
                                        return [2];
                                }
                            });
                        }); });
                        return [4, Promise.all(promises)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Board.prototype.updateOrders = function (gamedatas) {
        var _this = this;
        this.ui.containers.orders.replaceChildren();
        Object.entries(gamedatas.orders).forEach(function (_a) {
            var orderId = _a[0], order = _a[1];
            setAbsolutePosition(_this.ui.orders[orderId], BOARD_SCALE, ORDERS_CONFIG[orderId]);
            _this.ui.orders[orderId].setAttribute('data-status', order.status);
            _this.ui.containers.orders.appendChild(_this.ui.orders[orderId]);
        });
    };
    Board.prototype.updatePowerTokens = function (gamedatas) {
        var _this = this;
        gamedatas.powerTokens.forEach(function (token, index) {
            setAbsolutePosition(_this.ui.containers.powerTokens[token], BOARD_SCALE, POWER_TOKEN_POSITIONS[index]);
        });
    };
    Board.prototype.movePawn = function (type, value) {
        return __awaiter(this, void 0, void 0, function () {
            var fromRect;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fromRect = this.ui.containers.pawns[type].getBoundingClientRect();
                        this.updatePawn(type, value);
                        return [4, this.game.animationManager.play(new BgaSlideAnimation({
                                element: this.ui.containers.pawns[type],
                                transitionTimingFunction: 'ease-in-out',
                                fromRect: fromRect,
                            }))];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Board.prototype.updatePawn = function (type, value) {
        var position;
        switch (type) {
            case 'balance':
                position = getCompanyBalanceConfig(value);
                break;
            case 'debt':
                position = getCompanyDebtConfig(value);
                break;
            case 'phase':
                position = PHASE_CONFIG[value];
                break;
            case 'standing':
                position = getCompanyStandingConfig(value);
                break;
            case 'turn':
                position = TURN_CONFIG[value];
                break;
        }
        setAbsolutePosition(this.ui.containers.pawns[type], BOARD_SCALE, position);
    };
    Board.prototype.updatePawns = function (gamedatas) {
        var _a = gamedatas.company, balance = _a.balance, debt = _a.debt, standing = _a.standing;
        this.updatePawn('balance', balance);
        this.updatePawn('debt', debt);
        this.updatePawn('standing', standing);
        this.updatePawn('phase', gamedatas.phase);
        this.updatePawn('turn', gamedatas.turn);
    };
    Board.prototype.moveRegiment = function (regiment_1) {
        return __awaiter(this, arguments, void 0, function (regiment, index) {
            var fromRect;
            if (index === void 0) { index = 0; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Interaction.use().wait(index * 200)];
                    case 1:
                        _a.sent();
                        fromRect = this.ui.armyPieces[regiment.id].getBoundingClientRect();
                        this.updateArmyPieces([regiment]);
                        return [4, this.game.animationManager.play(new BgaSlideAnimation({
                                element: this.ui.armyPieces[regiment.id],
                                transitionTimingFunction: 'ease-in-out',
                                fromRect: fromRect,
                            }))];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Board.prototype.moveRegimentBetweenArmies = function (regiment, from) {
        return __awaiter(this, void 0, void 0, function () {
            var remainingRegiments, promises;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.armies.regiments[regiment.location].some(function (regimentInLocation) {
                            return regimentInLocation.id === regiment.id;
                        })) {
                            return [2];
                        }
                        remainingRegiments = this.armies.regiments[from].filter(function (piece) { return piece.id !== regiment.id; });
                        this.armies.regiments[from] = [];
                        promises = remainingRegiments.map(function (remaining) {
                            return _this.moveRegiment(remaining);
                        });
                        promises.push(this.moveRegiment(regiment));
                        return [4, Promise.all(promises)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Board.prototype.moveShip = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var fromRect, fromIndex;
            var ship = _b.ship, _c = _b.index, index = _c === void 0 ? 0 : _c, from = _b.from;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4, Interaction.use().wait(index * 200)];
                    case 1:
                        _d.sent();
                        fromRect = this.ui.ships[ship.id].getBoundingClientRect();
                        fromIndex = this.seas[from].findIndex(function (shipInOldZone) { return (shipInOldZone === null || shipInOldZone === void 0 ? void 0 : shipInOldZone.id) === ship.id; });
                        this.placeShip(ship);
                        if (fromIndex >= 0) {
                            this.seas[from][fromIndex] = null;
                        }
                        return [4, this.game.animationManager.play(new BgaSlideAnimation({
                                element: this.ui.ships[ship.id],
                                transitionTimingFunction: 'ease-in-out',
                                fromRect: fromRect,
                            }))];
                    case 2:
                        _d.sent();
                        return [2];
                }
            });
        });
    };
    Board.prototype.removeShip = function (shipId, seaZone) {
        return __awaiter(this, void 0, void 0, function () {
            var fromIndex;
            return __generator(this, function (_a) {
                this.ui.ships[shipId].remove();
                fromIndex = this.seas[seaZone].findIndex(function (shipInOldZone) { return (shipInOldZone === null || shipInOldZone === void 0 ? void 0 : shipInOldZone.id) === shipId; });
                if (fromIndex >= 0) {
                    this.seas[seaZone][fromIndex] = null;
                }
                return [2];
            });
        });
    };
    Board.prototype.updateOtherShip = function (ship, type) {
        this.ui.ships[ship.id].setAttribute('data-type', type);
        ship.type = type;
        ship.name = type === 'ExtraShip' ? _('Extra Ship') : _('Company Ship');
        return ship;
    };
    Board.prototype.shipAlreadyInZone = function (shipId, location) {
        return this.seas[location].some(function (shipInLocation) { return (shipInLocation === null || shipInLocation === void 0 ? void 0 : shipInLocation.id) === shipId; });
    };
    Board.prototype.placeShip = function (ship, fromElement) {
        return __awaiter(this, void 0, void 0, function () {
            var id, location, nullIndex, shipIndex, position, enterprise, player;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = ship.id, location = ship.location;
                        if (![SOUTH_INDIAN, WEST_INDIAN, EAST_INDIAN].includes(location)) return [3, 3];
                        if (this.shipAlreadyInZone(id, location)) {
                            return [2];
                        }
                        if (!this.ui.ships[id].parentElement) {
                            this.ui.containers.ships.appendChild(this.ui.ships[id]);
                        }
                        nullIndex = this.seas[location].findIndex(function (pos) { return pos === null; });
                        shipIndex = nullIndex >= 0 ? nullIndex : this.seas[location].length;
                        position = getShipPosition(location, shipIndex);
                        this.seas[location][shipIndex] = ship;
                        setAbsolutePosition(this.ui.ships[id], BOARD_SCALE, position);
                        if (!fromElement) return [3, 2];
                        return [4, this.game.animationManager.play(new BgaSlideAnimation({
                                element: this.ui.ships[id],
                                transitionTimingFunction: 'ease-in-out',
                                fromRect: fromElement.getBoundingClientRect(),
                            }))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [3, 4];
                    case 3:
                        if (location.startsWith(SHIPYARD)) {
                            enterprise = this.game.gamedatas.enterprises[location];
                            player = PlayerManager.getInstance().getPlayerForFamily(enterprise.location);
                            player.counters[SHIPS_COUNTER].incValue(1);
                        }
                        _a.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    Board.prototype.updateShips = function (ships) {
        var _this = this;
        ships.forEach(function (ship) {
            _this.placeShip(ship);
        });
    };
    return Board;
}());
var Region = (function () {
    function Region(id, game, data) {
        this.id = id;
        this.game = game;
        this.setup(data);
    }
    Region.prototype.setup = function (data) {
        var elt = (this.tower = document.createElement('div'));
        elt.classList.add('joco_tower');
        elt.style.bottom = "calc(var(--boardScale) * ".concat(towerConfig[data.id].bottom, "px)");
        elt.style.left = "calc(var(--boardScale) * ".concat(towerConfig[data.id].left, "px)");
        var towerTop = document.createElement('div');
        towerTop.classList.add('joco_tower_top');
        elt.appendChild(towerTop);
        for (var i = 0; i < 6; i++) {
            var towerLevel = document.createElement('div');
            towerLevel.classList.add('joco_tower_level');
            elt.appendChild(towerLevel);
        }
        document.getElementById('joco_towers').appendChild(elt);
        this.updateStrength(data.strength);
    };
    Region.prototype.updateStrength = function (value) {
        var children = this.tower.children;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (i > value) {
                child.classList.add('hidden');
            }
            else {
                child.classList.remove('hidden');
            }
        }
    };
    return Region;
}());
var tplBoard = function (gamedatas) { return "<div id=\"joco-board\">\n  <div id=\"joco-family-members\"></div>\n  <div id=\"joco-orders\"></div>\n  <div id=\"joco-regiments\"></div>\n  <div id=\"joco-power-tokens\"></div>\n  <div id=\"joco_ships\"></div>\n  <div id=\"joco_towers\"></div>\n  <div id=\"joco_treasuries\"></div>\n  <div id=\"joco-select-boxes\"></div>\n</div>"; };
var createFamilyMember = function (familyId, familyMemberId, extraClasses) {
    var _a;
    var elt = document.createElement('div');
    var familyMemberNumber = typeof familyMemberId === 'number' ? familyMemberId : Number(familyMemberId.split('_')[2]) % 18;
    elt.classList.add('joco-family-member');
    elt.insertAdjacentHTML('afterbegin', (_a = familyMemberSvgs[familyMemberNumber]) !== null && _a !== void 0 ? _a : familyMemberSvgs[1]);
    (extraClasses || []).forEach(function (className) { return elt.classList.add(className); });
    elt.setAttribute('data-family', familyId);
    elt.setAttribute('data-number', "".concat(familyMemberNumber));
    return elt;
};
var createShip = function (_a) {
    var name = _a.name, type = _a.type, fatigued = _a.fatigued, extraClasses = _a.extraClasses;
    var elt = document.createElement('div');
    elt.classList.add('joco-ship');
    (extraClasses || []).forEach(function (className) { return elt.classList.add(className); });
    elt.setAttribute('data-type', type);
    elt.setAttribute('data-fatigued', "".concat(fatigued));
    return elt;
};
var createRegiment = function (extraClasses) {
    if (extraClasses === void 0) { extraClasses = []; }
    var elt = document.createElement('div');
    elt.classList.add('joco-regiment');
    extraClasses.forEach(function (className) { return elt.classList.add(className); });
    return elt;
};
var Treasury = (function () {
    function Treasury(props) {
        this.setup(props);
    }
    Treasury.prototype.setup = function (_a) {
        var container = _a.container, gamedatas = _a.gamedatas, office = _a.office, position = _a.position;
        container.insertAdjacentHTML('afterbegin', tplTreasury(office, position));
        this.element = document.getElementById("joco-treasury-".concat(office));
        this.minusButton = document.getElementById("joco-treasury-".concat(office, "-minus-btn"));
        this.plusButton = document.getElementById("joco-treasury-".concat(office, "-plus-btn"));
        this.counter = new ebg.counter();
        this.counter.create("joco_".concat(office, "_treasury"));
        this.counter.setValue(gamedatas.offices[office].treasury);
        this.setInactive();
    };
    Treasury.prototype.getButtonElement = function (type) {
        return type === PLUS ? this.plusButton : this.minusButton;
    };
    Treasury.prototype.setActive = function () {
        this.element.setAttribute('data-active', 'true');
        this.active = true;
    };
    Treasury.prototype.setInactive = function () {
        this.element.setAttribute('data-active', 'false');
        this.active = false;
    };
    Treasury.prototype.handleClick = function (event) {
        event.stopPropagation();
        event.preventDefault();
        if (!this.active) {
            return;
        }
        var target = event.target;
        if (!target.classList.contains('joco-button')) {
            return;
        }
        var action = target.getAttribute('data-type');
        if (action === 'plus') {
            this.plus();
        }
        else if (action === 'minus') {
            this.minus();
        }
    };
    Treasury.prototype.getValue = function () {
        return this.counter.getValue();
    };
    Treasury.prototype.toValue = function (value) {
        return this.counter.toValue(value);
    };
    Treasury.prototype.incValue = function (value) {
        return this.counter.incValue(value);
    };
    Treasury.prototype.plus = function () {
        this.counter.incValue(1);
    };
    Treasury.prototype.minus = function () {
        this.counter.incValue(-1);
    };
    Treasury.prototype.disableButton = function (type) {
        var elt = type === 'minus' ? this.minusButton : this.plusButton;
        elt.classList.add(DISABLED);
    };
    Treasury.prototype.enableButton = function (type) {
        var elt = type === 'minus' ? this.minusButton : this.plusButton;
        elt.classList.remove(DISABLED);
    };
    return Treasury;
}());
var tplTreasury = function (office, _a) {
    var top = _a.top, left = _a.left;
    return "\n<div id=\"joco-treasury-".concat(office, "\" class=\"joco-treasury\" style=\"top: calc(var(--boardScale) * ").concat(top, "px); left: calc(var(--boardScale) * ").concat(left, "px);\">\n  <div id=\"joco-treasury-").concat(office, "-minus-btn\" class=\"joco-button\" data-type=\"minus\"><i class=\"fa6 fa6-minus\"></i></div>\n  <div class=\"joco-container\">\n    <span>").concat(_('£'), "</span>\n    <span class=\"joco_treasury_counter\" id=\"joco_").concat(office, "_treasury\"></span>\n  </div>\n  <div id=\"joco-treasury-").concat(office, "-plus-btn\" class=\"joco-button\" data-type=\"plus\"><i class=\"fa6 fa6-plus\"></i></div>\n</div>");
};
var CrownClimate = (function () {
    function CrownClimate(game) {
        this.game = game;
        this.climate = {};
        this.game = game;
        this.setup(game.gamedatas);
    }
    CrownClimate.create = function (game) {
        CrownClimate.instance = new CrownClimate(game);
    };
    CrownClimate.getInstance = function () {
        return CrownClimate.instance;
    };
    CrownClimate.prototype.setup = function (gamedatas) {
        var _this = this;
        var row = document.createElement('div');
        row.classList.add('joco-crown-climate-row');
        CROWN_CLIMATE.forEach(function (climate) {
            var elt = document.createElement('div');
            elt.classList.add('joco-crown-climate-icon');
            elt.setAttribute('data-climate', climate);
            row.appendChild(elt);
        });
        CROWN_CLIMATE.forEach(function (climate) {
            var elt = (_this.climate[climate] = document.createElement('div'));
            elt.classList.add('joco-crown-climate-indicator-container');
            var indicatorElt = document.createElement('div');
            indicatorElt.classList.add('joco-crown-climate-indicator');
            elt.appendChild(indicatorElt);
            row.appendChild(elt);
        });
        var node = document.querySelector("#player_board_".concat(CROWN_PLAYER_ID, " .player-board-game-specific-content"));
        node.insertAdjacentElement('afterbegin', row);
        if (gamedatas.crown.climate) {
            this.updateClimate(gamedatas.crown.climate);
        }
    };
    CrownClimate.prototype.updateClimate = function (climate) {
        if (this.active) {
            this.climate[this.active].classList.remove('active');
        }
        this.active = climate;
        this.climate[this.active].classList.add('active');
    };
    return CrownClimate;
}());
var SetupArea = (function () {
    function SetupArea(game) {
        this.cards = {};
        this.game = game;
        this.playerId = game.getPlayerId();
        this.setup(game.gamedatas);
    }
    SetupArea.create = function (game) {
        SetupArea.instance = new SetupArea(game);
    };
    SetupArea.getInstance = function () {
        return SetupArea.instance;
    };
    SetupArea.prototype.setup = function (gamedatas) {
        var _this = this;
        document
            .getElementById('game_play_area')
            .insertAdjacentHTML('afterbegin', tplSetupArea());
        this.ui = {
            setupArea: document.getElementById('joco_setup_area'),
            chosenCards: document.getElementById('joco_chosen_cards'),
            draft: document.getElementById('joco_draft_cards'),
        };
        StaticData.get()
            .setupCards()
            .forEach(function (card) {
            var elt = (_this.cards[card.id] = document.createElement('div'));
            elt.id = card.id;
            elt.classList.add('joco-setup-card');
            elt.setAttribute('data-card-id', card.id);
        });
        var players = gamedatas.players;
        gamedatas.players[this.playerId].draft.forEach(function (_a) {
            var id = _a.id;
            _this.ui.draft.appendChild(_this.cards[id]);
        });
        gamedatas.players[this.playerId].setupCards.forEach(function (_a) {
            var id = _a.id;
            _this.ui.chosenCards.appendChild(_this.cards[id]);
        });
    };
    SetupArea.prototype.newCards = function (cardIds, lastCard) {
        var _this = this;
        this.ui.draft.replaceChildren();
        cardIds.forEach(function (cardId) {
            if (lastCard) {
                _this.ui.chosenCards.appendChild(_this.cards[cardId]);
            }
            else {
                _this.ui.draft.appendChild(_this.cards[cardId]);
            }
        });
    };
    SetupArea.prototype.hide = function () {
        this.ui.setupArea.style.display = 'none';
    };
    return SetupArea;
}());
var tplSetupArea = function () { return "\n<div id=\"joco_setup_area\">\n  <div class=\"joco_container\">\n    <span class=\"joco_label\">".concat(_('Chosen setup cards'), "</span>\n    <div id=\"joco_chosen_cards\"></div>\n  </div>\n  <div class=\"joco_container\">\n    <span class=\"joco_label\">").concat(_('Draft'), "</span>\n    <div id=\"joco_draft_cards\"></div>\n  </div>\n</div"); };
var LOG_TOKEN_BOLD_TEXT = 'boldText';
var LOG_TOKEN_BOLD_ITALIC_TEXT = 'boldItalicText';
var LOG_TOKEN_NEW_LINE = 'newLine';
var LOG_TOKEN_PLAYER_NAME = 'playerName';
var LOG_TOKEN_CLIMATE = 'climate';
var LOG_TOKEN_POUND = 'pound';
var LOG_TOKEN_ENTERPRISE_ICON = 'enterpriseIcon';
var LOG_TOKEN_FAMILY_MEMBER = 'familyMember';
var LOG_TOKEN_ICON = 'icon';
var LOG_TOKEN_REGIMENT = 'regiment';
var LOG_TOKEN_SETUP_CARD = 'setupCard';
var LOG_TOKEN_SHIP = 'ship';
var CLASS_LOG_TOKEN = 'log-token';
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
        case LOG_TOKEN_CLIMATE:
            return tplLogTokenClimate(value);
        case LOG_TOKEN_ICON:
        case LOG_TOKEN_ENTERPRISE_ICON:
            return tplLogTokenIcon(value);
        case LOG_TOKEN_FAMILY_MEMBER:
            var _b = value.split(':'), familyId = _b[0], number = _b[1];
            return createFamilyMember(familyId, Number(number), [CLASS_LOG_TOKEN]).outerHTML;
        case LOG_TOKEN_POUND:
            return tplLogTokenPound();
        case LOG_TOKEN_REGIMENT:
            return createRegiment([CLASS_LOG_TOKEN]).outerHTML;
        case LOG_TOKEN_SETUP_CARD:
            return tplLogTokenSetupCard(value);
        case LOG_TOKEN_SHIP:
            var _c = value.split(':'), type_1 = _c[0], name_1 = _c[1], fatigued = _c[2];
            return createShip({ type: type_1, name: name_1, fatigued: Number(fatigued), extraClasses: [CLASS_LOG_TOKEN] }).outerHTML;
        case LOG_TOKEN_NEW_LINE:
            return '<br class="joco-new-line">';
        case LOG_TOKEN_PLAYER_NAME:
            var player = PlayerManager.getInstance()
                .getPlayers()
                .find(function (player) { return player.getName() === value; });
            return player
                ? tplLogTokenPlayerName({
                    name: player.getName(),
                    color: player.getColor(),
                })
                : value;
        default:
            return value;
    }
};
var tlpLogTokenText = function (_a) {
    var text = _a.text, tooltipId = _a.tooltipId, _b = _a.italic, italic = _b === void 0 ? false : _b;
    return "<span ".concat(tooltipId ? "id=\"".concat(tooltipId, "\" class=\"log_tooltip\"") : '', " style=\"font-weight: 700;").concat(italic ? ' font-style: italic;' : '', "\">").concat(_(text), "</span>");
};
var tplLogTokenClimate = function (climate) { return "<div class=\"log_token joco-crown-climate-icon\" data-climate=\"".concat(climate, "\"></div>"); };
var tplLogTokenPound = function () { return "<div class=\"log_token joco_pound\"></div>"; };
var tplLogTokenIcon = function (type) {
    return "<div class=\"log-token joco-icon\" data-icon=\"".concat(type, "\"></div>");
};
var tplLogTokenSetupCard = function (id) {
    return "<div class=\"log-token joco-setup-card\" data-card-id=\"".concat(id, "\"></div>");
};
var tplLogTokenPlayerName = function (_a) {
    var name = _a.name, color = _a.color;
    return "<span class=\"playername\" style=\"color:#".concat(color, ";\">").concat(name, "</span>");
};
var tknShipValue = function (_a) {
    var name = _a.name, type = _a.type, fatigued = _a.fatigued;
    return [type, name, fatigued].join(':');
};
var Negotiation = (function () {
    function Negotiation(game) {
        this.game = game;
        this.game = game;
        this.setup(game.gamedatas);
    }
    Negotiation.create = function (game) {
        Negotiation.instance = new Negotiation(game);
    };
    Negotiation.getInstance = function () {
        return Negotiation.instance;
    };
    Negotiation.prototype.setup = function (gamedatas) {
        document
            .getElementById('joco')
            .insertAdjacentHTML('afterbegin', tplNegotiation());
    };
    return Negotiation;
}());
var tplNegotiation = function () { return "<div id=\"joco-negotiation\">\n  TODO\n</div>"; };
var PlayerAreas = (function () {
    function PlayerAreas(game) {
        this.game = game;
        this.game = game;
        this.setup(game.gamedatas);
    }
    PlayerAreas.create = function (game) {
        PlayerAreas.instance = new PlayerAreas(game);
    };
    PlayerAreas.getInstance = function () {
        return PlayerAreas.instance;
    };
    PlayerAreas.prototype.setup = function (gamedatas) {
        document
            .getElementById('joco')
            .insertAdjacentHTML('afterbegin', tplPlayerAreas());
        var container = document.getElementById('joco-player-areas');
        this.game.playerOrder.forEach(function (playerId) {
            container.insertAdjacentHTML('beforeend', tplPlayerArea(gamedatas.players[playerId]));
        });
    };
    return PlayerAreas;
}());
var tplPlayerAreas = function () { return "<div id=\"joco-player-areas\">\n</div>"; };
var tplPlayerArea = function (player) { return "\n  <div class=\"joco-player-area\">\n    <span style=\"color:#".concat(player.color, "; align-self: center;\" class=\"playername\">").concat(player.name, "</span>\n  </div>\n"); };
var PlayerManager = (function () {
    function PlayerManager(game) {
        this.game = game;
        this.players = {};
        for (var playerId in game.gamedatas.players) {
            var player = game.gamedatas.players[playerId];
            this.players[playerId] = new JocoPlayer(this.game, player);
        }
    }
    PlayerManager.create = function (game) {
        PlayerManager.instance = new PlayerManager(game);
    };
    PlayerManager.getInstance = function () {
        return PlayerManager.instance;
    };
    PlayerManager.prototype.getPlayer = function (playerId) {
        return this.players[playerId];
    };
    PlayerManager.prototype.getPlayerForFamily = function (familyId) {
        return Object.values(this.players).find(function (player) { return player.familyId === familyId; });
    };
    PlayerManager.prototype.getPlayers = function () {
        return Object.values(this.players);
    };
    PlayerManager.prototype.getPlayerIds = function () {
        return Object.keys(this.players).map(Number);
    };
    PlayerManager.prototype.updatePlayers = function (gamedatas) {
        for (var playerId in gamedatas.players) {
            this.players[playerId].updatePlayer(gamedatas);
        }
    };
    PlayerManager.prototype.clearInterface = function () {
        var _this = this;
        Object.keys(this.players).forEach(function (playerId) {
            _this.players[playerId].clearInterface();
        });
    };
    return PlayerManager;
}());
var JocoPlayer = (function () {
    function JocoPlayer(game, player) {
        this.game = game;
        this.counters = {};
        this.ui = {};
        this.game = game;
        var playerId = player.id;
        this.playerId = Number(playerId);
        this.playerName = player.name;
        this.playerColor = player.color;
        this.familyId = player.familyId;
        var gamedatas = game.gamedatas;
        this.setupPlayer(gamedatas);
    }
    JocoPlayer.prototype.clearInterface = function () { };
    JocoPlayer.prototype.updatePlayer = function (gamedatas) {
        this.updatePlayerPanel(gamedatas);
    };
    JocoPlayer.prototype.setupPlayer = function (gamedatas) {
        this.setupPlayerPanel(gamedatas);
    };
    JocoPlayer.prototype.setupPlayerPanel = function (gamedatas) {
        var _this = this;
        var playerGamedatas = gamedatas.players[this.playerId];
        var node = document.querySelector("#player_board_".concat(this.playerId, " .player-board-game-specific-content"));
        if (!node) {
            return;
        }
        node.insertAdjacentHTML('afterbegin', tplPlayerCounters(this.playerId));
        var familyId = this.familyId === CROWN
            ? COLOR_FAMILY_MAP[HEX_COLOR_COLOR_MAP[this.getColor()]]
            : this.familyId;
        var elt = createFamilyMember(familyId, Math.floor(Math.random() * 18));
        elt.id = "joco-familyMembers-".concat(this.playerId);
        document
            .getElementById("joco-counters-".concat(this.playerId, "-row-1"))
            .insertAdjacentElement('afterbegin', elt);
        COUNTERS.forEach(function (counter) {
            _this.counters[counter] = new ebg.counter();
            _this.counters[counter].create("joco-".concat(counter, "-counter-").concat(_this.playerId));
            _this.ui[counter] = document.getElementById("joco-".concat(counter, "-").concat(_this.playerId));
        });
        this.updatePlayerPanel(gamedatas);
    };
    JocoPlayer.prototype.updatePlayerPanel = function (gamedatas) {
        var _this = this;
        this.counters[CASH_COUNTER].setValue(gamedatas.families[this.familyId].treasury);
        this.counters[FAMILY_MEMBERS_COUNTER].setValue(Object.values(gamedatas.familyMembers).filter(function (_a) {
            var familyId = _a.familyId, location = _a.location;
            return familyId === _this.familyId && location.startsWith('supply');
        }).length);
        this.counters[SHARES_COUNTER].setValue(Object.values(gamedatas.familyMembers).filter(function (_a) {
            var familyId = _a.familyId, location = _a.location;
            return familyId === _this.familyId && (location === COURT_OF_DIRECTORS || location === CHAIRMAN);
        }).length);
        this.counters[SHIPYARDS_COUNTER].setValue(Object.values(gamedatas.enterprises).filter(function (_a) {
            var type = _a.type, location = _a.location;
            return type === SHIPYARD && location === _this.familyId;
        }).length);
        this.counters[LUXURIES_COUNTER].setValue(Object.values(gamedatas.enterprises).filter(function (_a) {
            var type = _a.type, location = _a.location;
            return type === LUXURY && location === _this.familyId;
        }).length);
        this.counters[WORKSHOPS_COUNTER].setValue(Object.values(gamedatas.enterprises).filter(function (_a) {
            var type = _a.type, location = _a.location;
            return type === WORKSHOP && location === _this.familyId;
        }).length);
    };
    JocoPlayer.prototype.getColor = function () {
        return this.playerColor;
    };
    JocoPlayer.prototype.getName = function () {
        return this.playerName;
    };
    JocoPlayer.prototype.getPlayerId = function () {
        return this.playerId;
    };
    return JocoPlayer;
}());
var tplPlayerCounters = function (playerId) { return "\n<div id=\"joco-counters-".concat(playerId, "-row-1\" class=\"joco-counters-row\">\n  <div id=\"joco-cash-").concat(playerId, "\" class=\"log_token joco_pound\"></div>\n  <div id=\"joco-ships-").concat(playerId, "\" class=\"joco-ship\" data-type=\"playerOwnedShip\"></div>\n  <div></div>\n  <div class=\"joco-counter-container\"><span id=\"joco-familyMembers-counter-").concat(playerId, "\" class=\"joco-counter\"></span></div>\n  <div class=\"joco-counter-container\"><span id=\"joco-cash-counter-").concat(playerId, "\" class=\"joco-counter\"></span></div>\n  <div class=\"joco-counter-container\"><span id=\"joco-ships-counter-").concat(playerId, "\" class=\"joco-counter\"></span></div>\n  <div class=\"joco-counter-container\"></div>\n</div>\n<div class=\"joco-counters-row\">\n  <div id=\"joco-shares-").concat(playerId, "\" class=\"joco-icon\" data-icon=\"Share\"></div>\n  <div id=\"joco-workshops-").concat(playerId, "\" class=\"joco-icon\" data-icon=\"Workshop\"></div>\n  <div id=\"joco-shipyards-").concat(playerId, "\" class=\"joco-icon\" data-icon=\"Shipyard\"></div>\n  <div id=\"joco-luxuries-").concat(playerId, "\" class=\"joco-icon\" data-icon=\"Luxury\"></div>\n  <div class=\"joco-counter-container\"><span id=\"joco-shares-counter-").concat(playerId, "\" class=\"joco-counter\"></span></div>\n  <div class=\"joco-counter-container\"><span id=\"joco-workshops-counter-").concat(playerId, "\" class=\"joco-counter\"></span></div>\n  <div class=\"joco-counter-container\"><span id=\"joco-shipyards-counter-").concat(playerId, "\" class=\"joco-counter\"></span></div>\n  <div class=\"joco-counter-container\"><span id=\"joco-luxuries-counter-").concat(playerId, "\" class=\"joco-counter\"></span></div>\n</div>\n"); };
var Chairman = (function () {
    function Chairman(game) {
        this.game = game;
    }
    Chairman.create = function (game) {
        Chairman.instance = new Chairman(game);
    };
    Chairman.getInstance = function () {
        return Chairman.instance;
    };
    Chairman.prototype.onEnteringState = function (args) {
        debug('Entering Chairman state');
        this.args = args;
        this.companyBalance = args.companyBalance;
        this.currentDebt = args.debtOptions.currentDebt;
        this.updateInterfaceInitialStep();
    };
    Chairman.prototype.onLeavingState = function () {
        debug('Leaving Chairman state');
        this.deactivateTreasuries();
    };
    Chairman.prototype.setDescription = function (activePlayerIds, args) {
        console.log('setDescription Chairman');
        updatePageTitle(_('${tkn_playerName} may increase Company Debt and must allocate the Company Balance'), {
            tkn_playerName: getPlayerName(activePlayerIds[0]),
        }, true);
    };
    Chairman.prototype.updateInterfaceInitialStep = function () {
        var _this = this;
        this.game.clearPossible();
        this.updatePageTitle();
        this.setupTreasuries();
        var board = Board.getInstance();
        var interaction = Interaction.use();
        this.args.debtOptions.noVote.forEach(function (value) {
            if (value <= _this.currentDebt) {
                return;
            }
            var elt = board.ui.selectBoxes["companyDebt_".concat(value)];
            interaction.onClick(elt, function () { return _this.handleDebtClick(value, false); });
            elt.setAttribute('data-vote', 'false');
        });
        this.args.debtOptions.vote.forEach(function (value) {
            if (value <= _this.currentDebt) {
                return;
            }
            var elt = board.ui.selectBoxes["companyDebt_".concat(value)];
            interaction.onClick(elt, function () { return _this.handleDebtClick(value, true); });
            elt.setAttribute('data-vote', 'true');
        });
        addPrimaryActionButton({
            id: 'propose_btn',
            text: _('Propose'),
            callback: function () { return _this.performAction(true); },
        });
        addPrimaryActionButton({
            id: 'commit_btn',
            text: _('Commit'),
            callback: function () { return _this.performAction(false); },
            extraClasses: this.companyBalance > 0 ? DISABLED : '',
        });
    };
    Chairman.prototype.udpateInterfaceConfirmVote = function (value) {
        var _this = this;
        this.deactivateTreasuries();
        clearPossible();
        setSelected(Board.getInstance().ui.selectBoxes["companyDebt_".concat(value)]);
        updatePageTitle(_('Ask Court of Directors for consent to increase Company Debt to ${value}?'), {
            value: value,
        });
        addConfirmButton(function () { return _this.performAction(true, value); });
        addDangerActionButton({
            id: 'cancel_btn',
            text: _('Cancel'),
            callback: function () { return _this.updateInterfaceInitialStep(); },
        });
    };
    Chairman.prototype.updatePageTitle = function () {
        if (this.companyBalance === 0) {
            updatePageTitle(_('${you} may increase Company Debt'));
        }
        else {
            updatePageTitle(_('${you} may increase Company Debt and must allocate the Company Balance'));
        }
    };
    Chairman.prototype.performAction = function (propose, debtVote) {
        var treasuries = {};
        Object.entries(Board.getInstance().treasuries).forEach(function (_a) {
            var office = _a[0], treasury = _a[1];
            treasuries[office] = treasury.getValue();
        });
        performAction('actChairman', {
            companyDebt: this.currentDebt,
            debtVote: debtVote !== null && debtVote !== void 0 ? debtVote : null,
            treasuries: treasuries,
            propose: propose,
        });
    };
    Chairman.prototype.deactivateTreasuries = function () {
        Object.entries(Board.getInstance().treasuries).forEach(function (_a) {
            var office = _a[0], treasury = _a[1];
            treasury.setInactive();
        });
    };
    Chairman.prototype.setupTreasuries = function () {
        var _this = this;
        var interaction = Interaction.use();
        this.checkPlusDisabled();
        Object.entries(Board.getInstance().treasuries).forEach(function (_a) {
            var office = _a[0], treasury = _a[1];
            treasury.setActive();
            _this.checkMinusDisabled(office);
            [PLUS, MINUS].forEach(function (type) {
                interaction.onClick(treasury.getButtonElement(type), function () {
                    return _this.handleClick(type, office);
                });
            });
        });
    };
    Chairman.prototype.checkMinusDisabled = function (office) {
        var treasury = Board.getInstance().treasuries[office];
        if (treasury.getValue() === this.args.initialTreasuries[office]) {
            treasury.disableButton('minus');
        }
    };
    Chairman.prototype.checkPlusDisabled = function () {
        var treasuries = Object.values(Board.getInstance().treasuries);
        if (this.companyBalance > 0) {
            treasuries.forEach(function (treasury) {
                treasury.enableButton(PLUS);
            });
            return;
        }
        else {
            treasuries.forEach(function (treasury) {
                treasury.disableButton(PLUS);
            });
        }
    };
    Chairman.prototype.updateCompanyBalance = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var board, increase;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        board = Board.getInstance();
                        increase = value - this.currentDebt;
                        clearPossible();
                        this.currentDebt = value;
                        this.companyBalance += increase * 5;
                        return [4, Promise.all([
                                board.movePawn('debt', value),
                                board.movePawn('balance', this.companyBalance),
                            ])];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Chairman.prototype.handleDebtClick = function (value, requiresVote) {
        return __awaiter(this, void 0, void 0, function () {
            var noVoteOptionCount, noVoteValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!requiresVote) return [3, 3];
                        noVoteOptionCount = this.args.debtOptions.noVote.length;
                        noVoteValue = noVoteOptionCount > 0
                            ? this.args.debtOptions.noVote[noVoteOptionCount - 1]
                            : 0;
                        if (!(noVoteValue > this.currentDebt)) return [3, 2];
                        return [4, this.updateCompanyBalance(noVoteValue)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.udpateInterfaceConfirmVote(value);
                        return [3, 5];
                    case 3: return [4, this.updateCompanyBalance(value)];
                    case 4:
                        _a.sent();
                        this.updateInterfaceInitialStep();
                        _a.label = 5;
                    case 5: return [2];
                }
            });
        });
    };
    Chairman.prototype.handleClick = function (type, office) {
        return __awaiter(this, void 0, void 0, function () {
            var board, treasury;
            return __generator(this, function (_a) {
                board = Board.getInstance();
                treasury = board.treasuries[office];
                if (type === 'plus' && this.companyBalance > 0) {
                    this.companyBalance--;
                    treasury.plus();
                    treasury.enableButton('minus');
                    this.checkPlusDisabled();
                    board.movePawn('balance', this.companyBalance);
                }
                else if (type === 'minus' &&
                    treasury.getValue() > this.args.initialTreasuries[office]) {
                    treasury.minus();
                    this.checkMinusDisabled(office);
                    this.companyBalance++;
                    this.checkPlusDisabled();
                    board.movePawn('balance', this.companyBalance);
                }
                this.updateInterfaceInitialStep();
                return [2];
            });
        });
    };
    return Chairman;
}());
var ChairmanDebtConsent = (function () {
    function ChairmanDebtConsent(game) {
        this.game = game;
    }
    ChairmanDebtConsent.create = function (game) {
        ChairmanDebtConsent.instance = new ChairmanDebtConsent(game);
    };
    ChairmanDebtConsent.getInstance = function () {
        return ChairmanDebtConsent.instance;
    };
    ChairmanDebtConsent.prototype.onEnteringState = function (args) {
        debug('Entering ChairmanDebtConsent state');
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    ChairmanDebtConsent.prototype.onLeavingState = function () {
        debug('Leaving ChairmanDebtConsent state');
    };
    ChairmanDebtConsent.prototype.setDescription = function (activePlayerIds, args) {
        this.args = args;
        updatePageTitle(_('Other players may give consent to increase Company Debt to ${value}'), {
            value: this.args.debt,
        }, true);
    };
    ChairmanDebtConsent.prototype.updateInterfaceInitialStep = function () {
        var _this = this;
        this.game.clearPossible();
        updatePageTitle(_('${tkn_playerName} asks for your consent to increase Company Debt to ${value} (${required} more ${tkn_icon} required)'), {
            value: this.args.debt,
            tkn_playerName: getPlayerName(this.args.chairmanPlayerId),
            required: this.args.remainingVotesRequired,
            tkn_icon: SHARE,
        });
        setSelected(Board.getInstance().ui.selectBoxes["companyDebt_".concat(this.args.debt)]);
        addPrimaryActionButton({
            id: 'yay_btn',
            text: 'Yay',
            callback: function () { return _this.performAction(true); },
        });
        addDangerActionButton({
            id: 'nay_btn',
            text: 'Nay',
            callback: function () { return _this.performAction(false); },
        });
    };
    ChairmanDebtConsent.prototype.performAction = function (yay) {
        performAction('actChairmanDebtConsent', {
            consent: yay,
        });
    };
    return ChairmanDebtConsent;
}());
var DirectorOfTradeSpecialEnvoy = (function () {
    function DirectorOfTradeSpecialEnvoy(game) {
        this.game = game;
    }
    DirectorOfTradeSpecialEnvoy.create = function (game) {
        DirectorOfTradeSpecialEnvoy.instance = new DirectorOfTradeSpecialEnvoy(game);
    };
    DirectorOfTradeSpecialEnvoy.getInstance = function () {
        return DirectorOfTradeSpecialEnvoy.instance;
    };
    DirectorOfTradeSpecialEnvoy.prototype.onEnteringState = function (args) {
        debug('Entering DirectorOfTradeSpecialEnvoy state');
        this.args = args;
        this.spend = args.proposal || 0;
        this.updateInterfaceInitialStep();
    };
    DirectorOfTradeSpecialEnvoy.prototype.onLeavingState = function () {
        debug('Leaving DirectorOfTradeSpecialEnvoy state');
    };
    DirectorOfTradeSpecialEnvoy.prototype.setDescription = function (activePlayerIds, args) {
        if (args.proposal > 0) {
            updatePageTitle(_('Special Envoy: ${tkn_playerName} proposes to spend ${amount} ${tkn_pound} to make a check'), {
                tkn_playerName: getPlayerName(activePlayerIds[0]),
                amount: args.proposal,
                tkn_pound: 'pound',
            }, true);
        }
        else if (args.proposal === 0) {
            updatePageTitle(_('Special Envoy: ${tkn_playerName} proposes not to make a check'), {
                tkn_playerName: getPlayerName(activePlayerIds[0]),
            }, true);
        }
        else {
            updatePageTitle(_('Special Envoy: ${tkn_playerName} may make a check'), {
                tkn_playerName: getPlayerName(activePlayerIds[0]),
            }, true);
        }
    };
    DirectorOfTradeSpecialEnvoy.prototype.updateInterfaceInitialStep = function () {
        var _this = this;
        this.game.clearPossible();
        var available = this.args.treasury - this.spend;
        updatePageTitle(_('Special Envoy: ${you} may spend 1 ${tkn_pound} per die'), {
            available: available,
            tkn_pound: 'pound',
        });
        addSecondaryActionButton({
            id: 'minus_btn',
            text: '-',
            callback: function () {
                _this.spend--;
                _this.updateInterfaceInitialStep();
            },
            extraClasses: this.spend === 0 ? DISABLED : '',
        });
        addPrimaryActionButton({
            id: 'make_check_btn',
            text: formatStringRecursive(_('Roll ${number} dice'), {
                number: this.spend,
            }),
            callback: function () { return _this.updateIntefaceConfirm(); },
        });
        addSecondaryActionButton({
            id: 'plus_btn',
            text: '+',
            callback: function () {
                _this.spend++;
                _this.updateInterfaceInitialStep();
            },
            extraClasses: available === 0 ? DISABLED : '',
        });
        addPrimaryActionButton({
            id: 'propose_btn',
            text: _('Propose'),
            callback: function () { return _this.performAction(false); },
        });
        addPassButton(this.args.optionalAction);
    };
    DirectorOfTradeSpecialEnvoy.prototype.updateIntefaceConfirm = function () {
        var _this = this;
        clearPossible();
        updatePageTitle(_('Special Envoy: make a check with ${number} dice?'), {
            number: this.spend,
        });
        addConfirmButton(function () { return _this.performAction(true); });
        addCancelButton();
    };
    DirectorOfTradeSpecialEnvoy.prototype.performAction = function (makeCheck) {
        if (makeCheck === void 0) { makeCheck = false; }
        performAction('actDirectorOfTradeSpecialEnvoy', {
            spend: this.spend,
            makeCheck: makeCheck,
        });
    };
    return DirectorOfTradeSpecialEnvoy;
}());
var DirectorOfTradeSpecialEnvoySuccess = (function () {
    function DirectorOfTradeSpecialEnvoySuccess(game) {
        this.game = game;
    }
    DirectorOfTradeSpecialEnvoySuccess.create = function (game) {
        DirectorOfTradeSpecialEnvoySuccess.instance =
            new DirectorOfTradeSpecialEnvoySuccess(game);
    };
    DirectorOfTradeSpecialEnvoySuccess.getInstance = function () {
        return DirectorOfTradeSpecialEnvoySuccess.instance;
    };
    DirectorOfTradeSpecialEnvoySuccess.prototype.onEnteringState = function (args) {
        debug('Entering DirectorOfTradeSpecialEnvoySuccess state');
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    DirectorOfTradeSpecialEnvoySuccess.prototype.onLeavingState = function () {
        debug('Leaving DirectorOfTradeSpecialEnvoySuccess state');
    };
    DirectorOfTradeSpecialEnvoySuccess.prototype.setDescription = function (activePlayerIds, args) {
        updatePageTitle(_('${tkn_playerName} may open trade with China or may open a closed order'), {
            tkn_playerName: getPlayerName(activePlayerIds[0]),
        }, true);
    };
    DirectorOfTradeSpecialEnvoySuccess.prototype.updateInterfaceInitialStep = function () {
        var _this = this;
        this.game.clearPossible();
        updatePageTitle(_('${you} may open trade with China or may open a closed order'));
        var board = Board.getInstance();
        this.args.closedOrders.forEach(function (order) {
            onClick(board.ui.orders[order.id], function () { return _this.updateIntefaceConfirm(order); });
        });
    };
    DirectorOfTradeSpecialEnvoySuccess.prototype.updateIntefaceConfirm = function (order) {
        var _this = this;
        clearPossible();
        updatePageTitle(_('Open closed order in ${region}?'), {
            region: _(order.location),
        });
        setSelected(Board.getInstance().ui.orders[order.id]);
        addConfirmButton(function () { return _this.performAction(order, true); });
        addCancelButton();
    };
    DirectorOfTradeSpecialEnvoySuccess.prototype.performAction = function (order, perform) {
        if (perform === void 0) { perform = false; }
        performAction('actDirectorOfTradeSpecialEnvoySuccess', {
            orderId: order.id,
            perform: perform,
        });
    };
    return DirectorOfTradeSpecialEnvoySuccess;
}());
var DirectorOfTradeTransfers = (function () {
    function DirectorOfTradeTransfers(game) {
        this.game = game;
    }
    DirectorOfTradeTransfers.create = function (game) {
        DirectorOfTradeTransfers.instance = new DirectorOfTradeTransfers(game);
    };
    DirectorOfTradeTransfers.getInstance = function () {
        return DirectorOfTradeTransfers.instance;
    };
    DirectorOfTradeTransfers.prototype.onEnteringState = function (args) {
        var _a;
        debug('Entering DirectorOfTradeTransfers state');
        this.args = args;
        this.transfers = (_a = args.transfers) !== null && _a !== void 0 ? _a : {
            ships: {},
            writers: {},
        };
        this.updateInterfaceInitialStep();
    };
    DirectorOfTradeTransfers.prototype.onLeavingState = function () {
        debug('Leaving DirectorOfTradeTransfers state');
    };
    DirectorOfTradeTransfers.prototype.setDescription = function (activePlayerIds, args) {
        updatePageTitle(_('${tkn_playerName} may move writers or ships'), {
            tkn_playerName: getPlayerName(activePlayerIds[0]),
        }, true);
    };
    DirectorOfTradeTransfers.prototype.updateInterfaceInitialStep = function () {
        var _this = this;
        this.game.clearPossible();
        var transferCount = this.getTransferCount();
        if (transferCount === 2) {
            this.updateInterfaceConfirm();
            return;
        }
        updatePageTitle(_('${you} may make up to two transfers (${number} remaining)'), {
            number: 2 - this.getTransferCount(),
        });
        var board = Board.getInstance();
        Object.entries(this.args.options.writers).forEach(function (_a) {
            var id = _a[0], data = _a[1];
            return onClick(board.ui.familyMembers[id], function () {
                return _this.updateInterfaceSelectPresidency(data);
            });
        });
        Object.entries(this.args.options.ships).forEach(function (_a) {
            var id = _a[0], data = _a[1];
            return onClick(board.ui.ships[id], function () { return _this.updateInterfaceSelectSeaZone(data); });
        });
        if (this.getTransferCount() > 0) {
            addPrimaryActionButton({
                id: 'done_btn',
                text: _('Done'),
                callback: function () { return _this.updateInterfaceConfirm(); },
            });
            this.addCancelButton();
        }
        else {
            addPassButton(this.args.optionalAction);
        }
    };
    DirectorOfTradeTransfers.prototype.updateInterfaceSelectPresidency = function (_a) {
        var _this = this;
        var writer = _a.familyMember, locations = _a.locations;
        clearPossible();
        var board = Board.getInstance();
        setSelected(board.ui.familyMembers[writer.id]);
        locations.forEach(function (newLocation) {
            onClick(board.ui.selectBoxes[newLocation], function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.transfers.writers[writer.id] = {
                                writer: writer,
                                from: writer.location,
                                to: newLocation,
                            };
                            return [4, board.moveFamilyMemberBetweenLocations(writer, newLocation)];
                        case 1:
                            _a.sent();
                            this.updateInterfaceInitialStep();
                            return [2];
                    }
                });
            }); });
        });
        this.addCancelButton();
    };
    DirectorOfTradeTransfers.prototype.updateInterfaceSelectSeaZone = function (_a) {
        var _this = this;
        var ship = _a.ship, locations = _a.locations;
        clearPossible();
        var board = Board.getInstance();
        setSelected(board.ui.ships[ship.id]);
        locations.forEach(function (seaZone) {
            onClick(board.ui.selectBoxes[seaZone], function () { return __awaiter(_this, void 0, void 0, function () {
                var from;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            clearPossible();
                            from = ship.location;
                            ship.location = seaZone;
                            this.transfers.ships[ship.id] = {
                                from: from,
                                to: seaZone,
                                ship: ship,
                            };
                            return [4, board.moveShip({ ship: ship, from: from })];
                        case 1:
                            _a.sent();
                            this.updateInterfaceInitialStep();
                            return [2];
                    }
                });
            }); });
        });
        this.addCancelButton();
    };
    DirectorOfTradeTransfers.prototype.updateInterfaceConfirm = function () {
        var _this = this;
        clearPossible();
        updatePageTitle(_('Confirm transfers'));
        addConfirmButton(function () {
            performAction('actDirectorOfTradeTransfers', {
                transfers: _this.transfers,
            });
        });
        this.addCancelButton();
    };
    DirectorOfTradeTransfers.prototype.getTransferCount = function () {
        return (Object.keys(this.transfers.ships).length +
            Object.keys(this.transfers.writers).length);
    };
    DirectorOfTradeTransfers.prototype.returnPieces = function () {
        return __awaiter(this, void 0, void 0, function () {
            var board, _i, _a, data, _b, _c, data;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        board = Board.getInstance();
                        _i = 0, _a = Object.values(this.transfers.ships);
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3, 4];
                        data = _a[_i];
                        data.ship.location = data.from;
                        return [4, board.moveShip({ ship: data.ship, from: data.to })];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4:
                        _b = 0, _c = Object.values(this.transfers.writers);
                        _d.label = 5;
                    case 5:
                        if (!(_b < _c.length)) return [3, 8];
                        data = _c[_b];
                        return [4, board.moveFamilyMemberBetweenLocations(data.writer, data.from)];
                    case 6:
                        _d.sent();
                        _d.label = 7;
                    case 7:
                        _b++;
                        return [3, 5];
                    case 8: return [2];
                }
            });
        });
    };
    DirectorOfTradeTransfers.prototype.addCancelButton = function () {
        var _this = this;
        addDangerActionButton({
            id: 'cancel_btn',
            text: _('Cancel'),
            callback: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.returnPieces()];
                        case 1:
                            _a.sent();
                            this.game.onCancel();
                            return [2];
                    }
                });
            }); },
        });
    };
    return DirectorOfTradeTransfers;
}());
var DraftCard = (function () {
    function DraftCard(game) {
        this.game = game;
    }
    DraftCard.create = function (game) {
        DraftCard.instance = new DraftCard(game);
    };
    DraftCard.getInstance = function () {
        return DraftCard.instance;
    };
    DraftCard.prototype.onEnteringState = function (args) {
        debug('Entering DraftCard state');
        this.args = args;
        this.selectedCards = [];
        this.updateInterfaceInitialStep();
    };
    DraftCard.prototype.onLeavingState = function () {
        debug('Leaving DraftCard state');
    };
    DraftCard.prototype.setDescription = function (activePlayerIds, args) {
        var _a, _b;
        if ((_a = args._private) === null || _a === void 0 ? void 0 : _a.selected) {
            (_b = args._private) === null || _b === void 0 ? void 0 : _b.selected.forEach(function (cardId) { return setSelected(cardId); });
        }
    };
    DraftCard.prototype.updateInterfaceInitialStep = function () {
        var _this = this;
        this.game.clearPossible();
        if (this.args.numberToSelect === 1) {
            updatePageTitle(_('${you} must select a card to draft'));
        }
        else {
            updatePageTitle(_('${you} must select a card to draft (${number} remaining)'), {
                number: this.args.numberToSelect - this.selectedCards.length,
            });
        }
        this.setSelected();
        this.args._private.options.forEach(function (option) {
            var node = document.getElementById(option.id);
            node.classList.add(SELECTABLE);
            onClick(node, function () { return _this.handleClick(option.id); });
        });
        if (this.selectedCards.length > 0) {
            addCancelButton();
        }
    };
    DraftCard.prototype.updateInterfaceConfirm = function () {
        var _this = this;
        clearPossible();
        if (this.args.numberToSelect === 1) {
            updatePageTitle(_('Draft selected card?'));
        }
        else {
            updatePageTitle(_('Draft selected cards'));
        }
        this.setSelected();
        addConfirmButton(function () {
            performAction('actDraftCard', {
                cardIds: _this.selectedCards,
            });
            _this.setSelected();
        });
        addCancelButton();
    };
    DraftCard.prototype.setSelected = function () {
        this.selectedCards.forEach(function (cardId) { return setSelected(cardId); });
    };
    DraftCard.prototype.handleClick = function (cardId) {
        if (this.selectedCards.includes(cardId)) {
            this.selectedCards = this.selectedCards.filter(function (selectedCardId) { return selectedCardId !== cardId; });
        }
        else {
            this.selectedCards.push(cardId);
        }
        if (this.selectedCards.length === this.args.numberToSelect) {
            this.updateInterfaceConfirm();
        }
        else {
            this.updateInterfaceInitialStep();
        }
    };
    return DraftCard;
}());
var EnlistWriter = (function () {
    function EnlistWriter(game) {
        this.game = game;
    }
    EnlistWriter.create = function (game) {
        EnlistWriter.instance = new EnlistWriter(game);
    };
    EnlistWriter.getInstance = function () {
        return EnlistWriter.instance;
    };
    EnlistWriter.prototype.onEnteringState = function (args) {
        debug('Entering EnlistWriter state');
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    EnlistWriter.prototype.onLeavingState = function () {
        debug('Leaving EnlistWriter state');
    };
    EnlistWriter.prototype.setDescription = function (activePlayerIds, args) {
        updatePageTitle(_('${tkn_playerName} must select a region to place their writer'), {
            tkn_playerName: PlayerManager.getInstance()
                .getPlayer(activePlayerIds[0])
                .getName(),
        });
    };
    EnlistWriter.prototype.updateInterfaceInitialStep = function () {
        var _this = this;
        this.game.clearPossible();
        updatePageTitle(_('${you} must select a region to place ${tkn_icon}'), {
            tkn_icon: WRITER
        });
        [BENGAL, BOMBAY, MADRAS].forEach(function (region) {
            var box = Board.getInstance().ui.selectBoxes["Writers_".concat(region)];
            onClick(box, function () { return _this.updateInterfaceConfirm(region); });
        });
    };
    EnlistWriter.prototype.updateInterfaceConfirm = function (regionId) {
        clearPossible();
        setSelected(Board.getInstance().ui.selectBoxes["".concat(regionId, "_").concat(WRITER)]);
        updatePageTitle(_('Enlist ${tkn_icon} in ${regionName}?'), {
            tkn_icon: WRITER,
            regionName: _(StaticData.get().region(regionId).name),
        });
        var callback = function () { return performAction('actEnlistWriter', {
            regionId: regionId,
        }); };
        addConfirmButton(callback);
        addCancelButton();
    };
    return EnlistWriter;
}());
var FamilyAction = (function () {
    function FamilyAction(game) {
        this.game = game;
    }
    FamilyAction.create = function (game) {
        FamilyAction.instance = new FamilyAction(game);
    };
    FamilyAction.getInstance = function () {
        return FamilyAction.instance;
    };
    FamilyAction.prototype.onEnteringState = function (args) {
        debug('Entering FamilyAction state');
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    FamilyAction.prototype.onLeavingState = function () {
        debug('Leaving FamilyAction state');
    };
    FamilyAction.prototype.setDescription = function (activePlayerIds, args) {
        updatePageTitle(_('${tkn_playerName} must perform a family action'), {
            tkn_playerName: PlayerManager.getInstance()
                .getPlayer(activePlayerIds[0])
                .getName(),
        }, true);
    };
    FamilyAction.prototype.updateInterfaceInitialStep = function () {
        this.game.clearPossible();
        updatePageTitle(_('${you} must select a family action'));
        this.addButton(ENLIST_WRITER, WRITER, _('Enlist ${tkn_icon}'));
        this.addButton(ENLIST_OFFICER, OFFICER_IN_TRAINING, _('Enlist ${tkn_icon}'));
        this.addButton(PURCHASE_LUXURY, LUXURY, _('Purchase ${tkn_icon}'));
        this.addButton(PURCHASE_SHIPYARD, SHIPYARD, _('Purchase ${tkn_icon}'));
        this.addButton(PURCHASE_WORKSHOP, WORKSHOP, _('Purchase ${tkn_icon}'));
        this.addButton(SEEK_SHARE, SHARE, _('Seek ${tkn_icon}'));
    };
    FamilyAction.prototype.updateInterfaceConfirm = function (familyAction) {
        clearPossible();
        var callback = function () {
            return performAction('actFamilyAction', {
                familyAction: familyAction,
            });
        };
        callback();
        addCancelButton();
    };
    FamilyAction.prototype.addButton = function (action, icon, text) {
        var _this = this;
        if (this.args.options[action]) {
            addSecondaryActionButton({
                id: "".concat(action, "_btn"),
                text: formatStringRecursive(text, {
                    tkn_icon: icon,
                }),
                callback: function () { return _this.updateInterfaceConfirm(action); },
            });
        }
    };
    return FamilyAction;
}());
var ManagerOfShipping = (function () {
    function ManagerOfShipping(game) {
        this.game = game;
    }
    ManagerOfShipping.create = function (game) {
        ManagerOfShipping.instance = new ManagerOfShipping(game);
    };
    ManagerOfShipping.getInstance = function () {
        return ManagerOfShipping.instance;
    };
    ManagerOfShipping.prototype.onEnteringState = function (args) {
        debug('Entering ManagerOfShipping state');
        this.args = args;
        this.placedCompanyShips = {};
        this.placedExtraShips = {};
        this.placedPlayerShips = {};
        this.treasury = this.args.treasury;
        this.updateInterfaceInitialStep();
    };
    ManagerOfShipping.prototype.onLeavingState = function () {
        debug('Leaving ManagerOfShipping state');
    };
    ManagerOfShipping.prototype.setDescription = function (activePlayerIds, args) {
        updatePageTitle(_('${tkn_playerName} may fit, buy and lease ships'), {
            tkn_playerName: getPlayerName(activePlayerIds[0]),
        }, true);
    };
    ManagerOfShipping.prototype.updateInterfaceInitialStep = function () {
        var _this = this;
        this.game.clearPossible();
        if (this.treasury < 2) {
            this.updateInterfaceConfirm();
            return;
        }
        updatePageTitle(_('${you} may fit, buy and lease ships (£${amount} remaining)'), { amount: this.treasury });
        var board = Board.getInstance();
        var playerShipsAvailable = false;
        this.args.playerShips.forEach(function (ship) {
            var id = ship.id, type = ship.type, name = ship.name, fatigued = ship.fatigued, playerId = ship.owner;
            if (_this.placedPlayerShips[ship.id] || _this.treasury < 3) {
                return;
            }
            playerShipsAvailable = true;
            addPlayerButton({
                id: "".concat(ship.id, "_btn"),
                text: formatStringRecursive(_('Fit ${tkn_ship}'), {
                    tkn_ship: tknShipValue({ type: type, name: name, fatigued: fatigued }),
                }),
                playerId: playerId,
                callback: function () {
                    _this.updateInterfaceSelectSeaZone(ship, playerId);
                },
            });
        });
        if (this.treasury >= 2) {
            addSecondaryActionButton({
                id: 'extraShip_btn',
                text: formatStringRecursive(_('Lease ${tkn_ship}'), {
                    tkn_ship: tknShipValue({
                        type: EXTRA_SHIP,
                        name: _('Extra Ship'),
                        fatigued: 0,
                    }),
                }),
                callback: function () {
                    var ship = _this.args.otherShips.pop();
                    ship.type = EXTRA_SHIP;
                    _this.updateInterfaceSelectSeaZone(ship);
                },
            });
        }
        if (!playerShipsAvailable && this.treasury >= 5) {
            addSecondaryActionButton({
                id: 'companyShip_btn',
                text: formatStringRecursive(_('Buy ${tkn_ship}'), {
                    tkn_ship: tknShipValue({
                        type: COMPANY_SHIP,
                        name: _('Company Ship'),
                        fatigued: 0,
                    }),
                }),
                callback: function () {
                    var ship = _this.args.otherShips.pop();
                    ship.type = COMPANY_SHIP;
                    _this.updateInterfaceSelectSeaZone(ship);
                },
            });
        }
        if (this.treasury === 2) {
            addPrimaryActionButton({
                id: 'done_btn',
                text: _('Done'),
                callback: function () { return _this.updateInterfaceConfirm(); },
            });
        }
        if (Object.keys(this.placedPlayerShips).length > 0 ||
            Object.keys(this.placedExtraShips).length > 0 ||
            Object.keys(this.placedCompanyShips).length > 0) {
            this.addCancelButton();
        }
    };
    ManagerOfShipping.prototype.updateInterfaceSelectSeaZone = function (ship, playerId) {
        var _this = this;
        clearPossible();
        var board = Board.getInstance();
        updatePageTitle(_('${you} must select a sea zone'));
        SEA_ZONES.forEach(function (seaZone) {
            onClick(board.ui.selectBoxes[seaZone], function () { return __awaiter(_this, void 0, void 0, function () {
                var fromElt, player;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ship.location = seaZone;
                            fromElt = undefined;
                            clearPossible();
                            if (playerId) {
                                this.placedPlayerShips[ship.id] = seaZone;
                                player = PlayerManager.getInstance().getPlayer(playerId);
                                player.counters[SHIPS_COUNTER].incValue(-1);
                                fromElt = player.ui[SHIPS_COUNTER];
                                this.pay(3);
                            }
                            else if (ship.type === EXTRA_SHIP) {
                                ship = board.updateOtherShip(ship, EXTRA_SHIP);
                                this.placedExtraShips[ship.id] = seaZone;
                                this.pay(2);
                            }
                            else {
                                ship = board.updateOtherShip(ship, COMPANY_SHIP);
                                this.placedCompanyShips[ship.id] = seaZone;
                                this.pay(5);
                            }
                            return [4, board.placeShip(ship, fromElt)];
                        case 1:
                            _a.sent();
                            this.updateInterfaceInitialStep();
                            return [2];
                    }
                });
            }); });
        });
        this.addCancelButton();
    };
    ManagerOfShipping.prototype.updateInterfaceConfirm = function () {
        var _this = this;
        clearPossible();
        updatePageTitle(_('Confirm ship placement'));
        addConfirmButton(function () {
            performAction('actManagerOfShipping', {
                playerShips: _this.placedPlayerShips,
                extraShips: _this.placedExtraShips,
                companyShips: _this.placedCompanyShips,
            });
        });
        this.addCancelButton();
    };
    ManagerOfShipping.prototype.returnPieces = function () {
        return __awaiter(this, void 0, void 0, function () {
            var board;
            return __generator(this, function (_a) {
                board = Board.getInstance();
                [
                    this.placedCompanyShips,
                    this.placedExtraShips,
                    this.placedPlayerShips,
                ].forEach(function (category) {
                    Object.entries(category).forEach(function (_a) {
                        var shipId = _a[0], seaZone = _a[1];
                        board.removeShip(shipId, seaZone);
                    });
                });
                return [2];
            });
        });
    };
    ManagerOfShipping.prototype.pay = function (amount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.treasury -= amount;
                Board.getInstance().treasuries[MANAGER_OF_SHIPPING].toValue(this.treasury);
                return [2];
            });
        });
    };
    ManagerOfShipping.prototype.addCancelButton = function () {
        var _this = this;
        addDangerActionButton({
            id: 'cancel_btn',
            text: _('Cancel'),
            callback: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.returnPieces()];
                        case 1:
                            _a.sent();
                            this.game.onCancel();
                            return [2];
                    }
                });
            }); },
        });
    };
    return ManagerOfShipping;
}());
var MilitaryAffairsAssign = (function () {
    function MilitaryAffairsAssign(game) {
        this.game = game;
    }
    MilitaryAffairsAssign.create = function (game) {
        MilitaryAffairsAssign.instance = new MilitaryAffairsAssign(game);
    };
    MilitaryAffairsAssign.getInstance = function () {
        return MilitaryAffairsAssign.instance;
    };
    MilitaryAffairsAssign.prototype.onEnteringState = function (args) {
        debug('Entering MilitaryAffairsAssign state');
        this.args = args;
        this.assignedOfficers = {};
        this.updateInterfaceInitialStep();
    };
    MilitaryAffairsAssign.prototype.onLeavingState = function () {
        debug('Leaving MilitaryAffairsAssign state');
    };
    MilitaryAffairsAssign.prototype.setDescription = function (activePlayerIds, args) {
        updatePageTitle(_('${tkn_playerName} must assign officers-in-training'), {
            tkn_playerName: getPlayerName(activePlayerIds[0]),
        }, true);
    };
    MilitaryAffairsAssign.prototype.updateInterfaceInitialStep = function () {
        var _this = this;
        this.game.clearPossible();
        if (Object.keys(this.assignedOfficers).length ===
            Object.keys(this.args.officersInTraining).length) {
            this.updateInterfaceConfirm();
            return;
        }
        updatePageTitle(_('${you} must assign all officers-in-training'));
        var board = Board.getInstance();
        Object.entries(this.args.officersInTraining).forEach(function (_a) {
            var officerId = _a[0], officer = _a[1];
            if (_this.assignedOfficers[officerId]) {
                return;
            }
            onClick(board.ui.familyMembers[officerId], function () {
                return _this.updateInterfaceSelectArmy(officer);
            });
        });
    };
    MilitaryAffairsAssign.prototype.updateInterfaceSelectArmy = function (officer) {
        var _this = this;
        clearPossible();
        var board = Board.getInstance();
        setSelected(board.ui.familyMembers[officer.id]);
        this.args.armies.forEach(function (to) {
            onClick(board.ui.selectBoxes[to], function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            clearPossible();
                            return [4, board.moveFamilyMemberBetweenLocations(officer, to)];
                        case 1:
                            _a.sent();
                            this.assignedOfficers[officer.id] = { officer: officer, to: to };
                            this.updateInterfaceInitialStep();
                            return [2];
                    }
                });
            }); });
        });
        this.addCancelButton();
    };
    MilitaryAffairsAssign.prototype.updateInterfaceConfirm = function () {
        var _this = this;
        clearPossible();
        updatePageTitle(_('Assign officers?'));
        addConfirmButton(function () {
            performAction('actMilitaryAffairsAssign', {
                assignedOfficers: Object.values(_this.assignedOfficers).map(function (_a) {
                    var officer = _a.officer, to = _a.to;
                    return ({ familyMemberId: officer.id, to: to });
                }),
            });
        });
        this.addCancelButton();
    };
    MilitaryAffairsAssign.prototype.returnPieces = function () {
        return __awaiter(this, void 0, void 0, function () {
            var board, _i, _a, _b, officer, to;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        board = Board.getInstance();
                        _i = 0, _a = Object.values(this.assignedOfficers);
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3, 4];
                        _b = _a[_i], officer = _b.officer, to = _b.to;
                        return [4, board.moveFamilyMemberBetweenLocations(officer, OFFICER_IN_TRAINING)];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4: return [2];
                }
            });
        });
    };
    MilitaryAffairsAssign.prototype.addCancelButton = function () {
        var _this = this;
        addDangerActionButton({
            id: 'cancel_btn',
            text: _('Cancel'),
            callback: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.returnPieces()];
                        case 1:
                            _a.sent();
                            this.game.onCancel();
                            return [2];
                    }
                });
            }); },
        });
    };
    return MilitaryAffairsAssign;
}());
var MilitaryAffairsTransfers = (function () {
    function MilitaryAffairsTransfers(game) {
        this.game = game;
    }
    MilitaryAffairsTransfers.create = function (game) {
        MilitaryAffairsTransfers.instance = new MilitaryAffairsTransfers(game);
    };
    MilitaryAffairsTransfers.getInstance = function () {
        return MilitaryAffairsTransfers.instance;
    };
    MilitaryAffairsTransfers.prototype.onEnteringState = function (args) {
        var _a;
        debug('Entering MilitaryAffairsTransfers state');
        this.args = args;
        this.transfers = (_a = args.transfers) !== null && _a !== void 0 ? _a : {
            officers: {},
            regiments: {},
        };
        this.updateInterfaceInitialStep();
    };
    MilitaryAffairsTransfers.prototype.onLeavingState = function () {
        debug('Leaving MilitaryAffairsTransfers state');
    };
    MilitaryAffairsTransfers.prototype.setDescription = function (activePlayerIds, args) {
        updatePageTitle(_('${tkn_playerName} may make Army transfers'), {
            tkn_playerName: getPlayerName(activePlayerIds[0]),
        }, true);
    };
    MilitaryAffairsTransfers.prototype.updateInterfaceInitialStep = function () {
        var _this = this;
        this.game.clearPossible();
        var transferCount = this.getTransferCount();
        if (transferCount === 2) {
            this.updateInterfaceConfirm();
            return;
        }
        updatePageTitle(_('${you} may make up to two Army transfers (${number} remaining)'), {
            number: 2 - this.getTransferCount(),
        });
        var board = Board.getInstance();
        Object.entries(this.args.options.regiments).forEach(function (_a) {
            var id = _a[0], data = _a[1];
            if (_this.transfers.regiments[id]) {
                return;
            }
            onClick(board.ui.armyPieces[id], function () {
                return _this.updateInterfaceSelectArmyForRegiment(data);
            });
        });
        if (this.getTransferCount() > 0) {
            addPrimaryActionButton({
                id: 'done_btn',
                text: _('Done'),
                callback: function () { return _this.updateInterfaceConfirm(); },
            });
            this.addCancelButton();
        }
        else {
            addPassButton(this.args.optionalAction);
        }
    };
    MilitaryAffairsTransfers.prototype.updateInterfaceSelectArmyForRegiment = function (_a) {
        var _this = this;
        var regiment = _a.regiment, locations = _a.locations;
        clearPossible();
        var board = Board.getInstance();
        setSelected(board.ui.armyPieces[regiment.id]);
        locations.forEach(function (to) {
            onClick(board.ui.selectBoxes[to], function () { return __awaiter(_this, void 0, void 0, function () {
                var from;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            from = regiment.location;
                            this.transfers.regiments[regiment.id] = {
                                regiment: regiment,
                                from: from,
                                to: to,
                            };
                            regiment.location = to;
                            clearPossible();
                            return [4, board.moveRegimentBetweenArmies(regiment, from)];
                        case 1:
                            _a.sent();
                            this.updateInterfaceInitialStep();
                            return [2];
                    }
                });
            }); });
        });
        this.addCancelButton();
    };
    MilitaryAffairsTransfers.prototype.updateInterfaceConfirm = function () {
        var _this = this;
        clearPossible();
        updatePageTitle(_('Confirm transfers'));
        addConfirmButton(function () {
            performAction('actMilitaryAffairsTransfers', {
                transfers: _this.transfers,
            });
        });
        this.addCancelButton();
    };
    MilitaryAffairsTransfers.prototype.getTransferCount = function () {
        return (Object.keys(this.transfers.officers).length +
            Object.keys(this.transfers.regiments).length);
    };
    MilitaryAffairsTransfers.prototype.returnPieces = function () {
        return __awaiter(this, void 0, void 0, function () {
            var board, _i, _a, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        board = Board.getInstance();
                        _i = 0, _a = Object.values(this.transfers.regiments);
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3, 4];
                        data = _a[_i];
                        data.regiment.location = data.from;
                        return [4, board.moveRegimentBetweenArmies(data.regiment, data.to)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4: return [2];
                }
            });
        });
    };
    MilitaryAffairsTransfers.prototype.addCancelButton = function () {
        var _this = this;
        addDangerActionButton({
            id: 'cancel_btn',
            text: _('Cancel'),
            callback: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.returnPieces()];
                        case 1:
                            _a.sent();
                            this.game.onCancel();
                            return [2];
                    }
                });
            }); },
        });
    };
    return MilitaryAffairsTransfers;
}());
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
    };
    return PlayerTurn;
}());
var PresidencyDecideOrder = (function () {
    function PresidencyDecideOrder(game) {
        this.game = game;
    }
    PresidencyDecideOrder.create = function (game) {
        PresidencyDecideOrder.instance = new PresidencyDecideOrder(game);
    };
    PresidencyDecideOrder.getInstance = function () {
        return PresidencyDecideOrder.instance;
    };
    PresidencyDecideOrder.prototype.onEnteringState = function (args) {
        debug('Entering PresidencyDecideOrder state');
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    PresidencyDecideOrder.prototype.onLeavingState = function () {
        debug('Leaving PresidencyDecideOrder state');
    };
    PresidencyDecideOrder.prototype.setDescription = function (activePlayerIds, args) {
        updatePageTitle(_('${tkn_playerName} must choose which is next to act'), {
            tkn_playerName: getPlayerName(activePlayerIds[0]),
        }, true);
    };
    PresidencyDecideOrder.prototype.updateInterfaceInitialStep = function () {
        var _this = this;
        this.game.clearPossible();
        updatePageTitle(_('${you} must choose which is next to act'));
        var board = Board.getInstance();
        if (this.args.trade) {
            addPrimaryActionButton({ id: 'trade_btn', text: _('Trade'), callback: function () { return _this.updateInterfaceConfirm(TRADE); } });
        }
        if (this.args.done) {
            addPrimaryActionButton({ id: 'done_btn', text: _('Done'), callback: function () { return _this.updateInterfaceConfirm(DONE); } });
        }
    };
    PresidencyDecideOrder.prototype.updateInterfaceConfirm = function (next) {
        clearPossible();
        switch (next) {
            case TRADE:
                updatePageTitle(_('Perform the Trade action?'));
                break;
            case DONE:
                updatePageTitle(_('Done?'));
                break;
            default:
        }
        addConfirmButton(function () {
            performAction('actPresidencyDecideOrder', {
                next: next
            });
        });
        addCancelButton();
    };
    return PresidencyDecideOrder;
}());
var PresidencyTrade = (function () {
    function PresidencyTrade(game) {
        this.game = game;
    }
    PresidencyTrade.create = function (game) {
        PresidencyTrade.instance = new PresidencyTrade(game);
    };
    PresidencyTrade.getInstance = function () {
        return PresidencyTrade.instance;
    };
    PresidencyTrade.prototype.onEnteringState = function (args) {
        debug('Entering PresidencyTrade state');
        this.args = args;
        this.spend = args.proposal || 0;
        this.selectedRegionIds = [this.args.options.homeRegionId];
        this.updateInterfaceInitialStep();
    };
    PresidencyTrade.prototype.onLeavingState = function () {
        debug('Leaving PresidencyTrade state');
    };
    PresidencyTrade.prototype.setDescription = function (activePlayerIds, args) {
        updatePageTitle(_('${tkn_playerName} must choose regions to trade with and spend ${tkn_pound} to make a check'), {
            tkn_playerName: getPlayerName(activePlayerIds[0]),
            amount: args.proposal,
            tkn_pound: 'pound',
        }, true);
    };
    PresidencyTrade.prototype.updateInterfaceInitialStep = function () {
        var _this = this;
        clearPossible();
        if (this.selectedRegionIds.length === Object.keys(this.args.options.regions).length) {
            this.setMinSpendAmount();
            return;
        }
        updatePageTitle(_('Trade check: ${you} must select the regions in which you wish to trade'));
        var staticData = StaticData.get();
        Object.entries(this.args.options.regions).forEach(function (_a) {
            var regionId = _a[0], region = _a[1];
            if (_this.selectedRegionIds.includes(regionId)) {
                return;
            }
            addPrimaryActionButton({ id: "".concat(regionId, "_btn"), text: _(staticData.region(regionId).name), callback: function () {
                    _this.selectedRegionIds.push(regionId);
                    _this.updateInterfaceInitialStep();
                } });
        });
        addPrimaryActionButton({ id: 'done_btn', text: _('Done'), callback: function () { return _this.setMinSpendAmount(); } });
        if (this.selectedRegionIds.length > 1) {
            addCancelButton();
        }
    };
    PresidencyTrade.prototype.setMinSpendAmount = function () {
        this.spend = this.selectedRegionIds.length;
        Board.getInstance().treasuries[this.args.officeId].incValue(-this.selectedRegionIds.length);
        this.updateInterfaceMakeCheck();
    };
    PresidencyTrade.prototype.updateInterfaceMakeCheck = function () {
        var _this = this;
        clearPossible();
        var penalty = this.selectedRegionIds.length - 1;
        var available = this.args.treasury - this.spend;
        var minSpend = this.selectedRegionIds.length;
        updatePageTitle(_('Trade: ${you} may spend 1 ${tkn_pound} per die'), {
            available: available,
            tkn_pound: 'pound',
        });
        var treasuryCounter = Board.getInstance().treasuries[this.args.officeId];
        addSecondaryActionButton({
            id: 'minus_btn',
            text: '-',
            callback: function () {
                _this.spend--;
                treasuryCounter.incValue(1);
                _this.updateInterfaceMakeCheck();
            },
            extraClasses: this.spend <= minSpend ? DISABLED : '',
        });
        addPrimaryActionButton({
            id: 'make_check_btn',
            text: formatStringRecursive(_('Roll ${number} dice'), {
                number: Math.max(this.spend - penalty, 0),
            }),
            callback: function () { return _this.updateIntefaceConfirm(); },
            extraClasses: this.spend <= penalty ? DISABLED : '',
        });
        addSecondaryActionButton({
            id: 'plus_btn',
            text: '+',
            callback: function () {
                _this.spend++;
                treasuryCounter.incValue(-1);
                _this.updateInterfaceMakeCheck();
            },
            extraClasses: available === 0 ? DISABLED : '',
        });
        this.addCancelButton();
    };
    PresidencyTrade.prototype.updateIntefaceConfirm = function () {
        var _this = this;
        clearPossible();
        updatePageTitle(_('Make a check with ${number} dice to trade in ${tradeLog}?'), {
            number: this.spend,
            tradeLog: this.getTradeLog()
        });
        addConfirmButton(function () { return _this.performAction(true); });
        this.addCancelButton();
    };
    PresidencyTrade.prototype.getTradeLog = function () {
        var log = [];
        var args = {};
        var staticData = StaticData.get();
        this.selectedRegionIds.forEach(function (regionId, index) {
            var key = "key_".concat(index);
            log.push(['${', key, '}'].join(''));
            args[key] = _(staticData.region(regionId).name);
        });
        return {
            log: log.join(', '),
            args: args,
        };
    };
    PresidencyTrade.prototype.performAction = function (makeCheck) {
        if (makeCheck === void 0) { makeCheck = false; }
        performAction('actPresidencyTrade', {
            selectedRegionIds: this.selectedRegionIds,
            spend: this.spend,
            makeCheck: makeCheck,
        });
    };
    PresidencyTrade.prototype.addCancelButton = function () {
        var _this = this;
        addDangerActionButton({
            id: 'cancel_btn',
            text: _('Cancel'),
            callback: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    Board.getInstance().treasuries[this.args.officeId].toValue(this.args.treasury),
                        this.game.onCancel();
                    return [2];
                });
            }); },
        });
    };
    return PresidencyTrade;
}());
var PresidencyTradeFillOrders = (function () {
    function PresidencyTradeFillOrders(game) {
        this.game = game;
    }
    PresidencyTradeFillOrders.create = function (game) {
        PresidencyTradeFillOrders.instance = new PresidencyTradeFillOrders(game);
    };
    PresidencyTradeFillOrders.getInstance = function () {
        return PresidencyTradeFillOrders.instance;
    };
    PresidencyTradeFillOrders.prototype.onEnteringState = function (args) {
        debug('Entering PresidencyTradeFillOrders state');
        this.args = args;
        this.filledOrders = [];
        this.board = Board.getInstance();
        this.balance = this.args.companyBalance;
        this.updateInterfaceInitialStep();
    };
    PresidencyTradeFillOrders.prototype.onLeavingState = function () {
        debug('Leaving PresidencyTradeFillOrders state');
    };
    PresidencyTradeFillOrders.prototype.setDescription = function (activePlayerIds, args) {
        updatePageTitle(_('${tkn_playerName} must fill orders'), {
            tkn_playerName: getPlayerName(activePlayerIds[0]),
        }, true);
    };
    PresidencyTradeFillOrders.prototype.updateInterfaceInitialStep = function () {
        var _this = this;
        clearPossible();
        var numberOfFilledOrders = this.filledOrders.length;
        if (numberOfFilledOrders === this.args.numberOfOrdersToFill) {
            this.updateIntefaceConfirm();
            return;
        }
        var placedWriters = this.filledOrders.map(function (filledOrder) { return filledOrder.filledBy; });
        var availableWriters = this.args.writers.filter(function (writer) { return !placedWriters.includes(writer.id); });
        if (availableWriters.length === 0) {
            this.updateInterfaceSelectOrder();
            return;
        }
        updatePageTitle(_('Fill orders: ${you} must select a writer'));
        availableWriters.forEach(function (writer) {
            onClick(_this.board.ui.familyMembers[writer.id], function () {
                _this.updateInterfaceSelectOrder(writer);
            });
        });
        if (numberOfFilledOrders > 0) {
            this.addCancelButton();
        }
    };
    PresidencyTradeFillOrders.prototype.updateInterfaceSelectOrder = function (writer) {
        var _this = this;
        clearPossible();
        if (writer) {
            setSelected(this.board.ui.familyMembers[writer.id]);
        }
        updatePageTitle(_('Fill orders: ${you} must select an order'));
        this.getAvailableOrderIds().forEach(function (orderId) {
            onClick(_this.board.ui.orders[orderId], function () { return __awaiter(_this, void 0, void 0, function () {
                var promises, order;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.filledOrders.push({ orderId: orderId, filledBy: (writer === null || writer === void 0 ? void 0 : writer.id) || FILLED });
                            promises = [];
                            order = StaticData.get().order(orderId);
                            this.balance += order.value;
                            if (writer) {
                                promises.push(this.board.moveFamilyMemberBetweenLocations(writer, orderId));
                            }
                            else {
                                this.board.ui.orders[orderId].setAttribute('data-status', FILLED);
                            }
                            promises.push(this.board.movePawn('balance', this.balance));
                            clearPossible();
                            return [4, Promise.all(promises)];
                        case 1:
                            _a.sent();
                            this.updateInterfaceInitialStep();
                            return [2];
                    }
                });
            }); });
        });
        this.addCancelButton();
    };
    PresidencyTradeFillOrders.prototype.updateIntefaceConfirm = function () {
        var _this = this;
        clearPossible();
        updatePageTitle(_('Fill orders: confirm?'));
        addConfirmButton(function () { return _this.performAction(true); });
        this.addCancelButton();
    };
    PresidencyTradeFillOrders.prototype.getAvailableOrderIds = function () {
        var filledOrderIds = this.filledOrders.map(function (filledOrder) { return filledOrder.orderId; });
        if (filledOrderIds.length === 0) {
            return [this.args.homePortOrderId];
        }
        var staticData = StaticData.get();
        var orderIds = [];
        Object.values(this.args.orders).forEach(function (order) {
            if (filledOrderIds.includes(order.id)) {
                return;
            }
            var staticOrder = staticData.order(order.id);
            var connectedOrderHasBeenFilled = filledOrderIds.some(function (orderId) {
                return staticOrder.connectedOrders.includes(orderId);
            });
            if (connectedOrderHasBeenFilled && !orderIds.includes(order.id)) {
                orderIds.push(order.id);
            }
        });
        return orderIds;
    };
    PresidencyTradeFillOrders.prototype.returnPieces = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _loop_2, this_1, _i, _a, _b, orderId, filledBy;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _loop_2 = function (orderId, filledBy) {
                            var promises, writer;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        promises = [];
                                        if (filledBy === FILLED) {
                                            this_1.board.ui.orders[orderId].setAttribute('data-status', OPEN);
                                        }
                                        else {
                                            writer = this_1.args.writers.find(function (writer) { return writer.id === filledBy; });
                                            writer.location = orderId;
                                            promises.push(this_1.board.moveFamilyMemberBetweenLocations(writer, 'Writers_Bombay'));
                                        }
                                        this_1.balance = this_1.balance - StaticData.get().order(orderId).value;
                                        promises.push(this_1.board.movePawn('balance', this_1.balance));
                                        return [4, Promise.all(promises)];
                                    case 1:
                                        _d.sent();
                                        return [2];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, _a = this.filledOrders;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3, 4];
                        _b = _a[_i], orderId = _b.orderId, filledBy = _b.filledBy;
                        return [5, _loop_2(orderId, filledBy)];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4: return [2];
                }
            });
        });
    };
    PresidencyTradeFillOrders.prototype.performAction = function (makeCheck) {
        if (makeCheck === void 0) { makeCheck = false; }
        performAction('actPresidencyTradeFillOrders', {
            filledOrders: this.filledOrders,
        });
    };
    PresidencyTradeFillOrders.prototype.addCancelButton = function () {
        var _this = this;
        addDangerActionButton({
            id: 'cancel_btn',
            text: _('Cancel'),
            callback: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.returnPieces()];
                        case 1:
                            _a.sent();
                            this.game.onCancel();
                            return [2];
                    }
                });
            }); },
        });
    };
    return PresidencyTradeFillOrders;
}());
var SeekShare = (function () {
    function SeekShare(game) {
        this.game = game;
    }
    SeekShare.create = function (game) {
        SeekShare.instance = new SeekShare(game);
    };
    SeekShare.getInstance = function () {
        return SeekShare.instance;
    };
    SeekShare.prototype.onEnteringState = function (args) {
        debug('Entering SeekShare state');
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    SeekShare.prototype.onLeavingState = function () {
        debug('Leaving SeekShare state');
    };
    SeekShare.prototype.setDescription = function (activePlayerIds, args) {
        updatePageTitle(_('${tkn_playerName} must place a family member on the Stock Exchange track'), {
            tkn_playerName: PlayerManager.getInstance()
                .getPlayer(activePlayerIds[0])
                .getName(),
        });
    };
    SeekShare.prototype.updateInterfaceInitialStep = function () {
        var _this = this;
        this.game.clearPossible();
        updatePageTitle(_('${you} must select a place on the Stock Exchange track'), {
            tkn_icon: WRITER,
        });
        Object.entries(this.args.options).forEach(function (_a) {
            var position = _a[0], price = _a[1];
            var box = Board.getInstance().ui.selectBoxes[position];
            onClick(box, function () { return _this.updateInterfaceConfirm(position, price); });
        });
    };
    SeekShare.prototype.updateInterfaceConfirm = function (position, price) {
        clearPossible();
        setSelected(Board.getInstance().ui.selectBoxes[position]);
        updatePageTitle(_('Pay ${amount} ${tkn_pound} to seek a ${tkn_icon}?'), {
            amount: price,
            tkn_pound: _('Pounds'),
            tkn_icon: SHARE
        });
        var callback = function () {
            return performAction('actSeekShare', {
                position: position,
            });
        };
        addConfirmButton(callback);
        addCancelButton();
    };
    return SeekShare;
}());
var StaticData = (function () {
    function StaticData(game) {
        this.game = game;
        this.staticData = game.gamedatas.staticData;
    }
    StaticData.create = function (game) {
        StaticData.instance = new StaticData(game);
    };
    StaticData.get = function () {
        return StaticData.instance;
    };
    StaticData.prototype.order = function (id) {
        var order = this.staticData.orders[id];
        if (!order) {
            throw new Error('FE_ERROR_001');
        }
        return order;
    };
    StaticData.prototype.region = function (id) {
        return this.staticData.regions[id];
    };
    StaticData.prototype.setupCard = function (id) {
        return this.staticData.setupCards[id];
    };
    StaticData.prototype.setupCards = function () {
        return Object.values(this.staticData.setupCards);
    };
    return StaticData;
}());
var tplPlayArea = function () { return "\n  <div id=\"joco-play-area\">\n    <div id=\"joco\"></div>\n    <div id=\"joco-overlay\">\n      <div id=\"joco-bar\"></div>\n    </div>\n  </div>\n"; };
var tplCrownPlayerPanel = function (name, color) {
    return "<div id=\"overall_player_board_1\" class=\"player-board\">\n            <div class=\"player_board_inner\" id=\"player_board_inner_".concat(color, "\">\n              <div class=\"emblemwrap\" id=\"avatarwrap_1\">\n                  <div class=\"pp_wakhan_avatar avatar emblem\" id=\"avatar_1\"></div>\n              </div>\n              <div class=\"player-name\" id=\"player_name_1\">\n                <a style=\"color: #").concat(color, "\">").concat(name, "</a>\n              </div>\n              <div id=\"player_board_1\" class=\"player_board_content\">\n                <div class=\"player_score\" style=\"margin-top: 5px;\">\n                  <span id=\"player_score_1\" class=\"player_score_value\"></span> <i class=\"fa fa-star\" id=\"icon_point_1\"></i>\n                </div>\n                <div class=\"player-board-game-specific-content\"></div>\n              </div>\n            </div>\n          </div>");
};
var familyMember2 = "\n  <div class=\"joco-family-member2\">\n    <div class=\"joco-family-member_icon\">\n    </div>\n  </div>\n";
var familyMemberSvgs = {
    1: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50.3 59.45\">\n  <g>\n    <path class=\"cls-1\" d=\"M29.59,5.96s.02.08.04.12c.15,0,.31,0,.46,0,.17,0,.37.12.5-.11-.19-.06-.39-.16-.58-.17-.13,0-.27.1-.41.16ZM27.82,8.23c.12-.21.18-.3.22-.4,0,0-.1-.08-.1-.08-.07.08-.15.17-.2.26-.02.03.03.1.08.22ZM21.05,8.65c-.04-.06-.08-.11-.12-.17-.03.04-.09.09-.08.12.02.07.08.13.12.19.02-.04.04-.08.08-.15ZM16.97,9.2c-.06,0-.12,0-.18,0,.06.23.12.46.18.69,0,0,.05.01.05.01.1-.25.09-.48-.05-.7ZM23.61,9.98c.07,0,.13,0,.2,0-.05-.17-.09-.33-.15-.49,0,0-.09.01-.09.02,0,.16.02.32.04.48ZM34.48,11.78c-.11-.1-.17-.15-.23-.21-.07-.07-.14-.15-.22-.21-.12-.1-.26-.18-.38-.27.11-.12.22-.25.33-.37.15-.16.28-.35.08-.51-.19-.16-.29.09-.41.2-.14.13-.28.32-.44.35-.2.04-.45-.02-.62-.13-.1-.07-.06-.32-.09-.49-.02-.1-.04-.2-.08-.29-.31-.72-.62-1.44-.94-2.16-.04-.08-.11-.18-.19-.21-.29-.11-.6-.2-.9-.28-.08-.02-.17.03-.26.04.04.08.06.19.12.24.47.39.82.87,1.16,1.39.32.5.27,1.01.34,1.52,0,.06-.09.16-.16.2-.38.19-.65.45-.7,1.03-.15-.28-.29-.43-.29-.58,0-.48-.21-.76-.62-1.02-.35-.22-.7-.41-1.17-.53.08.23.1.42.19.55.46.63.66,1.3.61,2.11-.03.5.16,1.03.75,1.23.11.04.32.05.37-.01.19-.24.43-.47.39-.82-.02-.21-.04-.42-.06-.63-.02-.24.28-.58.55-.59.37-.02.25.27.28.46.01.08-.01.19.03.23.07.06.2.1.27.07.07-.03.12-.15.16-.24.22-.45.22-.45.68-.25.11.05.21.12.4.24-1.01.18-1.65.72-2.11,1.47-.08.13-.14.42-.07.47.12.1.35.14.52.11.25-.04.49-.15.73-.24.18-.06.21-.18.05-.29-.11-.08-.24-.12-.36-.18-.08-.04-.15-.09-.23-.13.08-.07.15-.17.24-.2.5-.19,1.16.07,1.52.61.27.39.49.81.78,1.18.22.28.52.51.82.79.05-.11.13-.24.17-.39.05-.2.06-.41.08-.62.05-.41.1-.82.13-1.23.03-.44-.07-.56-.52-.71-.15-.05-.16-.09-.17-.27-.01-.33-.18-.65-.31-1.04-.1.23-.16.39-.25.6ZM31.3,15.16c0,.06-.03.11-.02.14.04.18.04.45.15.52.13.07.37-.02.54-.09.3-.13.59-.31.89-.46.21-.1.22-.19.05-.34-.46-.39-1-.28-1.52-.23-.03,0-.08.08-.08.13-.01.12,0,.24,0,.33ZM12.28,15.88c-.21.2-.36.34-.51.48-.13-.18-.28-.36-.38-.56-.02-.04.22-.28.29-.26.19.05.36.19.6.33ZM16,16.33c-.64.3-1.15.02-1.68-.04-.04,0-.11-.06-.11-.09,0-.05.04-.11.08-.14.04-.03.11-.06.16-.05.49.09.98.2,1.54.31ZM32.12,16.49c-.11.07-.2.14-.29.2.08.05.16.14.23.13.1-.01.18-.1.27-.16-.06-.05-.12-.09-.21-.17ZM25.9,15.55c.38,0,.76,0,1.14,0,.08,0,.15.08.22.12-.08.04-.16.1-.24.12-.23.05-.47.12-.7.11-1.05-.05-1.92.37-2.73.98-.14.11-.29.21-.45.29-.07.03-.17,0-.26,0,0-.07,0-.16.03-.22.03-.07.1-.13.16-.17.49-.31.86-.81,1.46-.96.45-.12.91-.24,1.36-.36,0,.03,0,.06,0,.09ZM13.05,16.34c-.51.15-.6.25-.56.61,0,.09.11.18.16.27.07-.07.18-.12.22-.2.08-.2.11-.41.19-.68ZM14.01,16.77c.61-.01,1.14.2,1.62.55.05.04.09.15.07.2-.01.04-.17.09-.18.07-.41-.45-1.05-.4-1.51-.74,0,0,0-.04,0-.09ZM37.99,14.63c-.03-.59,0-1.18-.58-1.59-.35-.25-.62-.6-.93-.9-.04-.04-.16-.07-.19-.04-.12.11-.22.25-.33.38.1.07.19.13.29.19.07.04.14.07.21.11.95.56,1.3,1.5,1.32,2.49.01.68-.34,1.36-.53,2.04-.04.15-.18.33.06.37.14.02.41.15.46-.18.14-.79.63-1.55.22-2.4-.06-.13,0-.31,0-.47ZM41.67,17.93c-.03-.31-.05-.57-.08-.84-.02-.17-.04-.33-.06-.5-.13.1-.28.18-.39.29-.1.09-.17.21-.24.33-.02.03.01.14.02.14.39-.02.48.37.75.58ZM23.05,15.97c-.55.55-1.07,1.14-1.67,1.64-.28.24-.71.31-1.07.45-.05.02-.16-.05-.18-.09-.02-.05.03-.14.07-.2.02-.03.06-.06.09-.07,1.02-.29,1.72-1.06,2.49-1.72.05-.05.13-.06.2-.09.02.03.04.06.07.09ZM34.7,18.23c-.08.14-.14.2-.15.27-.02.1-.02.21-.02.32.08-.04.18-.07.24-.14.41-.37.45-.93.71-1.38.02-.04-.02-.12-.03-.18-.27.58-.77.86-1.28,1.11-.02,0-.01.06-.03.13.17-.04.31-.07.56-.13ZM35.78,18.83c.53.12.88-.1,1.23-.3.05-.03.05-.16.07-.25-.09,0-.19-.04-.26,0-.33.16-.64.34-1.05.56ZM33.41,19.3c.1-.05.28-.13.44-.23.05-.03.1-.14.09-.19-.01-.05-.12-.09-.18-.1-.31-.01-.63-.02-.94,0-.06,0-.15.09-.15.14,0,.06.04.18.09.2.18.07.38.11.66.19ZM40.6,17.98c-.2.33-.35.56-.48.8-.18.31-.06.76.27.88.14.05.32.03.45-.02.05-.02.05-.23.03-.35-.07-.4-.16-.79-.27-1.3ZM19.21,20.17c-.36-.45-.42-.98-.47-1.51,0-.02.05-.08.07-.07.05,0,.1.03.15.05.01,0,.02.03.03.05.08.49.15.98.23,1.48ZM40.01,21.42c-.19-.16-.38-.31-.58-.47-.13-.13-.25-.29-.41-.38-.36-.2-.74-.37-1.12-.54-.93-.43-1.87-.57-2.87-.22-.21.08-.49-.03-.74-.04-.12,0-.25-.02-.37,0-.32.06-.65.14-.97.22-.06.02-.12.07-.17.1.03.05.06.1.1.13.41.29.9.37,1.36.52.1.03.17.12.25.19-.08.08-.15.21-.25.23-.21.05-.43.05-.66.07.18.13.33.29.52.36.19.07.44.12.6.04.14-.06.17-.35.3-.46.13-.11.46-.11.5-.22.16-.5.54-.45.91-.47.18,0,.35-.02.53-.04.56-.08,1.12-.13,1.65.17.25.14.52.24.78.37-.14,0-.29.02-.43.02-.23,0-.46-.02-.69-.03.47.24.94.38,1.42.5.09.02.21-.03.31-.05ZM29.46,21.53c-.19.09-.32.22-.43.2-.16-.03-.34-.13-.45-.25-.46-.55-.93-1.1-1.11-1.84-.06-.24-.07-.4.15-.48.23-.08.31.1.35.29,0,.04.03.07.04.11.1.66.46,1.15,1.02,1.52.14.09.24.25.43.45ZM23.3,22.16c.7.11,1.48-.24,2.08.38.02.02.1-.03.16-.05-.02-.06-.03-.15-.07-.19-.14-.11-.3-.19-.44-.3-.52-.39-1.17-.34-1.72.16ZM16.58,23.62c-.12-.48-.59-.88-1.06-.88-.09,0-.17.05-.26.08.06.07.1.15.18.19.37.21.75.4,1.14.61ZM36.84,24.01l.09-.08c-.18-.21-.37-.43-.56-.64-.03-.03-.15-.05-.15-.03-.03.06-.07.15-.04.19.06.11.14.22.23.3.13.1.29.18.43.26ZM15.9,24.05c-.34-.72-.95-1.05-1.61-.88-.1.03-.2.09-.29.16-.04.03-.04.11-.06.16.05.01.11.04.16.03.63-.13,1.17.03,1.64.46.03.03.09.03.16.06ZM12.47,24.44c.21-.29.41-.56.59-.83.3-.47.29-.48-.28-.53-.51-.05-.76.16-.54.69.09.2.14.42.23.67ZM14.42,26.12c-.17-.03-.29-.04-.4-.08-.05-.02-.11-.11-.1-.13.02-.06.09-.12.15-.13.29-.05.58-.09.87-.12.06,0,.15.05.18.11.02.03-.04.16-.08.17-.22.08-.45.14-.63.19ZM39.06,26.14s.07,0,.1,0c.03-.09.07-.18.08-.28,0-.07-.03-.14-.05-.21-.05.07-.12.13-.14.2-.02.09,0,.19.01.29ZM24.33,22.78c-.61.03-1.23,0-1.76.39-.1.08-.2.17-.27.28-.15.22-.27.46-.43.67-.21.28-.45.39-.82.17-.28-.16-.64-.19-.97-.26-.48-.11-.49-.21-.56-.67-.12-.82.07-1.7-.35-2.45-.18-.34,0-.42.18-.56.13-.1.19-.06.24.1.04.11.16.2.25.29.05-.11.1-.22.15-.33.04-.09.05-.22.12-.25.43-.22.73-.66,1.27-.69.19-.01.41-.16.54-.31.25-.31.59-.41.9-.27.44.21.7-.01.92-.29.25-.3.49-.5.91-.4.08.02.18-.05.28-.08.69-.19,1.28-.01,1.78.49.08.08.18.17.22.27.29.68.56,1.37.83,2.06.01.04-.01.09-.02.13-.04-.04-.12-.07-.12-.11-.02-.2-.11-.22-.27-.13-.21.13-.38.05-.53-.1-.19-.2-.38-.2-.64-.09-.23.09-.52.12-.76.08-1.13-.21-2.13.23-3.14.63-.2.08-.41.16-.59.28-.15.09-.32.2-.39.34-.09.2-.09.45-.12.67.18-.13.36-.26.53-.4.13-.11.23-.28.38-.36.75-.41,1.52-.78,2.4-.78.19,0,.38.04.57.1.53.16,1.04.36,1.57.48.38.09.57.28.67.64.03.1.19.27.24.26.37-.13.54.13.75.33.12.11.24.2.36.31.15.14.28.24.52.17.14-.04.38.08.5.2.14.14.14.27-.12.38-.38.15-.69.2-1.02-.1-.24-.22-.43-.2-.53.09-.17.49-.51.61-.97.59-.23-.01-.41.04-.55.26-.1.16-.27.28-.43.4-.35.28-.7.58-1.08.8-.24.14-.59.23-.84.17-.8-.2-1.58-.49-2.37-.75-.07-.02-.14-.08-.19-.14-.03-.04-.05-.12-.03-.16.01-.04.09-.08.14-.07.1.01.19.05.28.08.49.14.99.28,1.48.43.61.18,1.17.13,1.67-.31.48-.42.97-.81,1.45-1.22.1-.09.19-.21.25-.33.06-.13.16-.36.11-.39-.18-.14-.37-.06-.51.11-.13.15-.23.33-.38.45-.18.14-.33.5-.66.15-.07-.07-.36.06-.54.12-.28.09-.56.18-.84.3-.28.11-.46-.02-.62-.2-.18-.21-.24-.46-.13-.72.09-.24.23-.13.36-.01.37.32.46.3.57-.19.04-.19.14-.24.28-.2.17.05.31.15.47.21.07.03.15,0,.23.01,0-.09.03-.19,0-.25-.13-.22-.36-.3-.79-.29ZM38.27,24.68s-.07,0-.1,0c-.02.05-.06.1-.06.15,0,.24-.67.54.06.73.03,0,.03.18.03.28,0,.14-.06.27-.05.4,0,.07.11.13.17.19.04-.06.13-.12.13-.18-.05-.53-.12-1.06-.18-1.59ZM36.27,26.61c.24-.68,0-1.25-.25-1.83-.02-.06-.11-.09-.17-.13-.02.06-.06.13-.04.19.15.58.31,1.16.47,1.76ZM10.89,26.39s.05.02.08.04c-.01.06-.04.12-.03.17.04.12.1.22.16.33.08-.08.18-.14.23-.24.04-.08.07-.19.05-.27-.06-.21-.15-.41-.23-.62l-.27.59ZM38.63,27.06c.05-.06.11-.11.13-.17.01-.03-.03-.09-.05-.14-.07.05-.14.1-.21.15.04.04.07.09.13.16ZM32.04,27.18c-.07-.11-.13-.21-.19-.3-.02.06-.08.13-.07.18.02.08.09.15.14.22.04-.03.07-.06.12-.1ZM29.8,27.3c-.2-.2-.51-.35-.39-.74.01-.05.07-.08.11-.13.04.03.09.06.11.1.1.23.18.46.27.69-.03.02-.06.05-.1.07ZM14.02,27.6c-.43,0-.66-.25-.6-.58.03-.19.08-.39.17-.57.03-.07.22-.15.27-.12.56.34,1.03.06,1.5-.2.14-.07.29-.15.44-.16.09,0,.21.09.28.16.02.02-.06.17-.12.22-.36.31-.7.65-1.1.91-.27.18-.62.24-.84.32ZM34.54,25.5s.03.01.04.02c-.1.5-.19,1-.31,1.49-.06.25-.2.41-.51.39-.29-.02-.59,0-.88,0-.16,0-.23.15-.1.23.22.13.34.33.51.51.3.32.73.32,1.05-.02.71-.75.78-1.69.67-2.65-.03-.26-.21-.5-.33-.75-.02-.04-.1-.05-.15-.07-.02.05-.06.09-.05.14.01.23.04.47.06.7ZM43.63,26.39c-.09-.6-.45-1.04-.87-1.44-.02-.02-.16.03-.17.07-.04.13-.06.27-.05.41.03.74-.23,1.43-.35,2.14-.02.13-.09.26-.15.37-.11.22-.38.55-.32.62.24.3.53-.02.8-.06.04,0,.07-.04.11-.05.17-.04.2-.15.26-.31.19-.48.17-1.05.63-1.42.08-.06.08-.21.12-.33ZM34.03,29.25l.12-.11c.06-.04.12-.08.18-.12-.12-.04-.24-.09-.36-.12-.02,0-.07.04-.07.05.04.1.08.2.12.3ZM15.27,28.43c-.11.29-.22.57-.35.89-.21-.42.08-.66.22-.94.04.01.09.03.14.04ZM35.45,28.7c-.09.02-.2.02-.28.06-.22.11-.54.19-.61.36-.12.31-.41.24-.59.38-.08.07-.14.16-.21.25.12.01.27.07.37.03.27-.11.53-.25.76-.42.23-.17.41-.4.61-.61.17-.28.34-.56.51-.85.02-.03-.02-.1-.03-.15-.05.02-.13.02-.15.06-.13.3-.26.6-.38.9ZM34.27,30.49c-.06.08-.11.14-.1.15.1.09.21.17.32.24.02.01.08-.05.12-.08-.1-.1-.21-.19-.33-.31ZM38.63,31.05c.63,0,1.22-.13,1.71-.52.37-.28.67-.65.98-1,.1-.12.15-.29.22-.44-.14.08-.28.16-.41.25-.03.02-.03.08-.06.1-.87.75-1.71,1.58-3.02,1.32-.05,0-.11.07-.17.11.05.05.1.13.16.14.19.03.39.03.59.04ZM40.18,26.53c-.14-.52-.39-.89-.11-1.31.03-.05-.02-.15,0-.23.1-.59-.19-1.11-.28-1.66-.14-.88-.84-1.15-1.5-1.43-.56-.23-1.16-.36-1.74-.52-.14-.04-.3-.3-.43-.04-.02.05.21.24.34.35.06.04.16.02.23.05.6.26,1.23.46,1.77.8.46.28.95.64,1.02,1.23.1.94.28,1.88,0,2.83-.07.24-.12.54-.03.75.15.35.02.55-.19.79-.12.13-.18.3-.29.45-.45.64-.84,1.32-1.62,1.65-.58.25-.94.3-1.26.02-.1-.09-.24-.13-.36-.19.04.14.08.29.12.43.02.06.04.12.08.24-.19-.04-.35-.12-.41-.08-.15.11-.57-.62-.48.15,0,.02-.17.06-.26.1.06.13.08.31.18.39.15.12.34.22.54.06.03-.02.04-.11.02-.15-.29-.43.07-.33.28-.35,1.01-.12,2-.29,2.75-1.07.24-.25.43-.54.68-.78.21-.2.37-.4.39-.69.02-.23.06-.43.34-.19.17.14.31.06.39-.08.14-.23.26-.48.37-.73.05-.1,0-.28.07-.34.45-.37.45-.89.52-1.39.05-.42.07-.82-.22-1.19-.12-.15-.16-.36-.24-.54-.21-.47-.46-.92-.81-1.31.1.76.21,1.5.44,2.21.21.62,0,1.11-.32,1.74ZM39.05,31.77s.04-.07.06-.11c-.05-.02-.11-.06-.16-.05-.1.01-.2.05-.31.08.04.05.07.13.11.13.1,0,.2-.03.3-.05ZM40.86,31.64s-.02-.07-.03-.1c.22-.16.45-.3.65-.48.11-.1.16-.25.24-.38-.13.05-.27.09-.4.14-.13.05-.25.11-.38.16-.55.22-1.1.44-1.71.68.23.08.4.12.55.21.58.37,1.18.21,1.77.05.08-.02.15-.11.22-.16-.09-.06-.19-.16-.28-.16-.2,0-.41.03-.62.05ZM20.49,26.82c1.21.05,2,1.21,1.57,2.33-.1.27-.04.41.15.56,1.14.88,1.94,2.02,2.58,3.28.09.17.14.37.16.56.02.16-.02.32-.03.48-.09-.12-.2-.23-.28-.36-.59-1.04-1.27-1.99-2.15-2.81-.22-.2-.52-.37-.57-.73,0-.08-.2-.21-.26-.18-.11.04-.26.18-.25.27.04.52-.21.88-.58,1.17-.38.29-.83.34-1.3.3-.47-.04-.85.12-1.05.6-.13.3-.37.38-.68.35-.21-.02-.42-.03-.63,0-.37.04-.45,0-.45-.41,0-.19.07-.39.06-.58,0-.14-.07-.28-.12-.42-.13.06-.26.12-.39.19-.22.13-.42.29-.65.38-.08.03-.34-.16-.33-.21.07-.47-.24-.77-.45-1.11-.06-.1-.27-.26-.02-.39.17-.09.3,0,.39.15.22.39.55.63.99.68.53.06,1.06.02,1.47-.39.26-.26.5-.56.79-.79.13-.11.35-.19.53-.18.42.02.83.11,1.21-.13.04-.02.16,0,.16,0,0,.09.01.18,0,.27-.02.08-.06.15-.09.22.08-.01.17,0,.23-.04.14-.1.27-.23.41-.34.13-.11.27-.21.4-.31.09-.07.2-.13.26-.22.46-.68.04-1.63-.76-1.74-.18-.02-.36-.04-.52-.09-.09-.03-.17-.12-.26-.18.09-.06.17-.14.26-.18.07-.02.15.01.21.02ZM31.99,33.24c.15.02.28.02.41.05.13.03.27.07.36.15.19.19.35.42.53.61.06.07.2.15.26.12.14-.06.27-.16.36-.28.03-.04-.06-.21-.14-.28-.2-.19-.43-.34-.62-.53-.45-.45-.77-.42-1.16.16ZM14.02,35.14c-.02-.44.11-.82.42-1.13.12-.12.27-.21.38.02.1.22.24.18.37.06.55-.48,1.16-.41,1.78-.21.17.05.33.13.51.17.31.07.62.09.92-.08.6-.33,1.22-.39,1.89-.2.41.11.84.15,1.28-.03.22-.09.5-.05.74-.03.28.02.53.05.79-.14.12-.1.39-.13.54-.06.48.22.87.58,1.16,1.02.08.13.07.35.04.52-.02.08-.22.2-.28.17-1.26-.52-2.57-.38-3.88-.34-1.13.03-2.25.08-3.38.17-.41.03-.82.15-1.2.28-.26.09-.47.26-.55.57-.09.34-.22.38-.49.18-.18-.14-.35-.23-.59-.21-.3.03-.44-.13-.44-.43,0-.1,0-.2,0-.3ZM20.96,35.69c.27-.06.53-.13.81-.16.11,0,.31.08.33.15.02.13-.04.3-.12.4-.1.11-.27.17-.41.23-1.43.61-2.94.98-4.47,1.21-.29.04-.62-.09-.91-.21-.29-.12-.33-.44-.32-.71,0-.23.55-.63.85-.66.51-.04,1.03-.07,1.54-.1.9-.06,1.81-.13,2.71-.2,0,.02,0,.03.01.05ZM30.45,37.33c-.17.15-.26.26-.32.4-.06.14-.08.3-.09.55.29-.27.5-.53.41-.95ZM15.79,38.69s0,0,0,0c0,0,0,0,0,0v.02s0,0,0,0h0ZM14.14,37.86c.1-.13.14-.2.2-.25.14-.11.29-.2.44-.3,0,.19.06.4,0,.56-.13.31-.32.59-.51.86-.03.05-.23.04-.3-.01-.29-.23-.44-.92-.3-1.27.03-.08.12-.13.19-.19.05.06.1.11.13.18.05.11.07.22.15.44ZM15.79,38.7c-.06.33-.09.54-.15.74-.01.05-.11.09-.16.13-.04-.06-.13-.13-.12-.18.03-.25.08-.5.14-.74.02-.07.1-.13.16-.19.05.08.1.16.13.25,0,0,0,0,0,0ZM21.13,42.64c-.58-.12-1.16-.18-1.72.06-.05.02-.08.08-.13.11.05.04.09.11.14.13.62.22,1.17,0,1.71-.3ZM34.99,43.06c-.07-.07-.14-.21-.22-.22-.11,0-.31.07-.33.14-.08.43-.45.62-.71.9-.09.1-.19.2-.27.31-.03.05,0,.14.02.21,0,.01.1.01.15,0,.58-.21.97-.64,1.3-1.14.03-.05.03-.11.06-.2ZM30.94,46.39c-.13-.09-.21-.15-.3-.21-.05.08-.13.16-.12.24,0,.08.11.14.16.21.06-.06.12-.11.26-.24ZM28.62,48.1c.17-.24.34-.43.44-.65.05-.11,0-.37-.08-.4-.19-.09-.43-.1-.64-.14-.04.28-.11.56-.09.84,0,.11.21.2.38.34ZM35.68,44.5c-.08-.18-.12-.36-.18-.36-.14-.01-.32.02-.42.1-.45.36-.86.76-1.31,1.11-.47.36-.95.7-1.45,1.02-.41.26-.89.43-1.28.72-.72.52-1.48.95-2.29,1.31-.25.11-.5.24-.73.39-.25.17-.22.49.02.91.16.27.34.21.55.11,1.17-.61,2.36-1.21,3.42-2,1.11-.83,2.16-1.72,3.22-2.6.21-.18.32-.47.47-.69ZM21.74,50.09c.06-.03.11-.05.15-.09.37-.29.73-.61,1.13-.87.16-.11.4-.11.61-.12.37-.02.73.06,1.1-.14.38-.21,1.05.14,1.17.59.11.4.37.64.73.8.16.08.34.16.47-.05.11-.17.19-.37.02-.54-.2-.2-.23-.43-.28-.69-.06-.29-.15-.59-.31-.82-.34-.48-.78-1.14-1.37-1.32-.91-.29-2.06.25-2.36.36-.71.26-1.42,1.89-1.4,2.3.01.37.28.61.36.6ZM21.06,50.26c0,.14,0,.18,0,.22.02.18.06.38.3.33.22-.04.16-.23.14-.38,0-.04,0-.09-.02-.11-.08-.1-.17-.19-.25-.29-.07.1-.14.2-.17.23ZM25.3,51.31c-.1.19-.17.3-.2.41-.01.04.08.1.12.16.07-.1.16-.19.2-.3.02-.04-.05-.12-.12-.27ZM23.32,49.74c-.4.26-.34.62-.45.9-.22.57.13.88.47,1.21.3.29.63.13.95.04.09-.02.14-.15.21-.23-.07-.06-.13-.17-.21-.17-.73-.08-.84-.62-.9-1.2-.02-.17-.05-.34-.08-.55ZM19.32,53.84c.47.41.11.3-.2.22-.14-.14-.29-.28-.43-.42-.01-.01.07-.11.11-.17.16.12.32.23.51.37ZM15.06,52.01c-.03-.57-.06-1.08-.09-1.59,0-.1-.04-.21,0-.29.03-.08.13-.13.21-.19.05.07.13.13.14.21.08.47.12.94.23,1.4.19.81.48,1.59,1.1,2.19.39.38.77.78,1.17,1.15.12.11.31.16.47.24.12.06.61.26.71.35.12.11.13.63.23.76-.16.1-1.28-.32-1.46-.46-.6-.46-1.23-.92-1.72-1.49-.56-.65-1.03-1.4-.99-2.27ZM40.05,21.44c.5.69,1.22,1.05,1.98,1.36.09.04.21.03.28.08.51.39,1.01.79,1.51,1.17.31.24.24.71.47.9.31.25.45.54.54.88.19.73.3,1.45.14,2.21-.07.32-.08.66.17.99.17.22.19.54.02.84-.27.45-.42.92-.38,1.47.04.52-.29.87-.84.97-.58.1-1.05.34-1.3.91-.04.09-.17.14-.26.21-.18.13-.37.23-.53.38-.48.47-1.05.79-1.69.99-.33.1-.43.39-.51.66-.13.46-.37.75-.83.9-.41.13-.8.31-1.29.5.53.23.94.03,1.32-.08.58-.18,1.14-.46,1.71-.67.33-.12.68-.21,1.02-.28.54-.11,1.08-.19,1.62-.27.29-.04.35.03.27.3-.03.09-.07.19-.13.26-.62.74-1.08,1.68-1.49,2.52-.03.06-.02.14-.03.22.08-.03.19-.04.24-.09.13-.17.25-.35.35-.54.34-.71.9-1.43,1.24-2.14.04-.08.25.03.31.09.43.45.21.82-.11,1.19-.36.41-.76.8-1.07,1.25-.53.78-1.02,1.56-.83,2.61.12.66-.11,1.32-.51,1.89-.21.29-1.06.47-1.35.26-.25-.18-.49-.26-.8-.27-.51-.02-.94-.29-1.33-.6-.58-.45-1.15-.91-1.73-1.36-.09-.07-.33-.13-.34-.11-.09.18-.29.35-.08.58.67.69,5.05,4.99,5.92,5.8.27.25.28.24.44-.07.18-.33.38-.65.56-.97.25-.45.25-.46-.24-.48-.41-.02-.77-.14-1.06-.44-.06-.06-.08-.16-.12-.24.07-.02.15-.06.22-.06.5,0,1-.02,1.49,0,.33.01.56-.08.68-.42.1-.28.22-.55.38-.81.17-.28.02-.3-.19-.3-.52,0-1.03,0-1.56,0,.32-.75.37-.78,1.1-.75.92.04,1.17.25,1.52-1.06,0-.02.02-.04.02-.06q.17-.48-.37-.49c-.42,0-.83,0-1.25,0-.34-.01-.41-.14-.35-.46.04-.22.18-.23.34-.23.58,0,1.15,0,1.73,0,.46,0,.59-.16.61-.65,0-.15.08-.29.12-.44.11-.39,0-.57-.38-.59-.32-.01-.63.01-.95.02-.15,0-.31,0-.46-.03-.05,0-.14-.09-.14-.14,0-.25.31-.53.57-.53.38,0,.76-.04,1.13.02.43.07.62-.17.78-.47.04-.07.06-.15.08-.22.16-.7.06-.83-.67-.81-.16,0-.31,0-.5,0,.16-.45.35-.73.89-.69.58.04.62-.04.65-.63.04-.83.03-.84-.81-.84-.87,0-1.75,0-2.62,0h-.63c.58-.66.81-.72,1.53-.68.77.04,1.54.02,2.3,0,.42-.02.46-.08.47-.51,0-.33-.02-.66-.04-1-.31-.01-.62-.03-.93-.04-.1,0-.2,0-.3-.02-.03,0-.08-.08-.07-.12.02-.2.46-.58.66-.58.08,0,.16.02.24.02.56,0,.59-.04.57-.6,0-.22,0-.44.03-.65.03-.26-.07-.37-.33-.35-.08,0-.16,0-.24-.02-.11-.02-.3-.03-.31-.08-.04-.18-.03-.38-.02-.57,0-.02.09-.06.15-.06.16-.01.32-.01.48,0,.25,0,.3-.12.28-.34-.04-.29-.11-.59-.07-.87.04-.31-.07-.4-.34-.4-.1,0-.2,0-.3,0-.16-.02-.38.07-.36-.24.01-.25.04-.41.35-.43.49-.03.49-.05.48-.55,0-.23-.08-.47-.08-.7-.01-.37-.15-.54-.55-.48-.48.07-.44-.41-.68-.68.3-.02.55-.06.8-.06.22,0,.25-.15.26-.31,0-.03-.03-.07-.04-.11-.08-.32-.07-.74-.27-.93-.17-.17-.59-.08-.9-.09-.27,0-.54,0-.81,0-.08,0-.17.03-.24,0-.15-.07-.29-.17-.43-.26.13-.13.25-.35.4-.38.3-.07.63-.06.94-.03,1.04.11,1.22-.11.87-1.11-.16-.47-.19-.48-.67-.48-.08,0-.16.03-.24.02-.16-.02-.39.05-.42-.2-.03-.24.16-.48.39-.52.55-.09.59-.13.41-.65-.13-.37-.13-.82-.64-.97-.24-.07-.22-.41-.04-.64.05-.06.08-.17.06-.23-.17-.42-.36-.83-.56-1.24-.03-.05-.13-.1-.2-.1-.5.04-.67-.4-1.1-.65.17-.03.22-.04.27-.04.66.02.76-.12.53-.76-.22-.63-.4-.77-1.06-.77-.53,0-1.06.05-1.58.07-.26,0-.52.01-.77-.01-.26-.03-.39-.23-.37-.46,0-.09.22-.21.34-.22.35-.04.71-.04,1.07-.04.41,0,.83,0,1.24,0,.27,0,.32-.1.17-.32-.25-.35-.47-.73-.75-1.05-.09-.11-.32-.14-.48-.14-.64-.02-1.27,0-1.91,0-.18,0-.34.01-.45-.19-.21-.38-.15-.52.28-.52.45,0,.9.02,1.34.02.17,0,.33-.06.56-.11-.44-.53-.82-1.01-1.23-1.46-.09-.1-.29-.12-.43-.12-.41-.01-.82.01-1.24,0-.28,0-.57,0-.82-.1-.16-.07-.25-.32-.38-.48.07-.05.14-.14.21-.14.44-.02.87,0,1.31-.02.09,0,.19-.04.28-.06-.03-.11-.03-.25-.1-.32-.37-.35-.72-.77-1.17-1-.35-.18-.84-.19-1.25-.15-.82.07-1.58,0-2.25-.65.23-.03.41-.07.6-.08.3-.01.6,0,.89,0,.14,0,.27-.08.41-.12-.1-.09-.19-.19-.31-.26-.45-.25-.93-.45-1.36-.72-.66-.41-1.37-.51-2.11-.42-.54.07-.92-.17-1.26-.52-.05-.05-.05-.16-.08-.24-.02-.05-.04-.14-.08-.15-.62-.18-1.24-.37-1.87-.5-1.36-.28-2.74-.31-4.12-.41-1.08-.08-2.13.05-3.2.08-.45.01-.9.28-1.35.36-1.66.31-3.18.98-4.7,1.67-.76.35-1.51.72-2.27,1.08,0,.04.01.09.02.13.23.02.46.04.72.06-.32.46-.68.71-1.21.61-.62-.11-1.06.18-1.43.65-.18.23-.42.4-.61.62-.16.18-.13.33.15.33.34,0,.68,0,1.01,0,.14,0,.38-.05.33.2-.03.18,0,.46-.34.45-.52-.01-1.04.05-1.55-.02-.67-.09-1.03.33-1.41.71-.23.24-.4.54-.6.81-.04.06-.06.14-.09.21.09.03.17.08.26.08.89,0,1.79,0,2.68,0,.14,0,.27,0,.41,0,.14,0,.35-.06.33.2-.02.21,0,.46-.32.46-.76,0-1.51,0-2.27,0-.45,0-.9-.05-1.35-.04-.12,0-.28.08-.35.17-.26.34-.5.7-.74,1.07-.06.09-.06.2-.09.31.09.02.18.05.27.05,1.13,0,2.26-.01,3.38-.02.14,0,.28,0,.42,0,.16.02.2.12.09.24-.21.24-.44.42-.81.41-1.11-.02-2.23,0-3.34-.02-.31,0-.49.09-.62.34-.17.32-.33.63-.5.95-.14.26-.02.3.22.3.85,0,1.7,0,2.55,0,.12,0,.23.01.35.02-.1.64-.11.65-.68.64-.87-.02-1.73-.04-2.6-.05-.11,0-.26.1-.31.19-.17.36-.29.74-.44,1.1-.11.27-.02.35.25.35,1.03,0,2.07,0,3.1,0,.22,0,.43-.03.49.28.05.24.02.39-.27.38-.46,0-.91,0-1.37,0-.66,0-1.31.02-1.97,0-.36-.01-.62.07-.76.42-.04.11-.13.2-.18.31-.33.8-.28.88.59.88h2.73c-.03.16-.06.27-.06.38,0,.26-.16.28-.36.28-.96,0-1.93,0-2.89,0-.27,0-.44.05-.48.38-.03.26-.21.5-.28.77-.1.39-.05.46.36.46.69,0,1.38-.05,2.07-.05.47,0,.94.04,1.49.07-.34.41-.62.69-1.16.66-.87-.04-1.74,0-2.61-.01-.28,0-.42.08-.46.4-.13,1.08-.15,1.08.93,1.09.6,0,1.19,0,1.79-.01.14,0,.31-.06.29.16-.01.18.06.43-.21.49-.13.03-.28.02-.41.02-.74,0-1.47.01-2.21,0-.27,0-.4.08-.41.36-.01.33-.05.66-.08,1-.02.31.13.41.43.4.75-.02,1.51-.02,2.26,0,.54.01.54.04.71.63-.15.01-.3.03-.45.03-.82,0-1.63,0-2.45,0q-.63,0-.65.6c0,.08,0,.16,0,.24q-.11.77.67.77c1.17,0,2.34,0,3.52,0,.21,0,.45-.05.46.3,0,.24-.06.37-.33.36-.95-.03-1.91-.05-2.86-.06-.43,0-.86.04-1.29.06-.22,0-.27.14-.25.32.01.14.05.27.07.41.04.31-.02.71.16.89.15.15.56.06.86.06,1.07,0,2.15,0,3.22,0,.14,0,.32-.05.41.02.16.12.25.32.38.48-.15.05-.3.15-.45.15-1.39.01-2.77.01-4.16.01-.27,0-.42.07-.34.39.05.21.02.43.04.65.04.41.14.51.56.52,1.31.02,2.61.04,3.92.04.36,0,.71-.05,1.07-.05.18,0,.36.03.52.09.38.15.74.34,1.1.59-.13.01-.26.03-.39.03-1.33,0-2.66,0-3.99,0-.79,0-1.58,0-2.36,0-.25,0-.37.07-.3.34.04.15.02.32.05.47.11.51.32.67.85.67,1.97,0,3.93,0,5.9,0,.12,0,.24,0,.36,0,.33,0,.29.29.32.48.03.26-.21.17-.34.17-1.93,0-3.86,0-5.78,0q-.8,0-.78.79c.02.58.16.73.74.73,1.73,0,3.45-.02,5.18-.03.38,0,.76,0,1.13.04.13.01.29.11.37.22.18.27.12.4-.21.42-.44.02-.87.01-1.31.01-1.67,0-3.34,0-5.01-.01-.4,0-.41,0-.33.39.06.31.15.61.19.93.04.3.19.4.48.38.53-.04,1.07-.07,1.6-.07.47,0,.95.06,1.42.06,1.27.01,2.54.02,3.82,0,.33,0,.53.12.61.43.02.06-.08.21-.15.22-.15.04-.32.02-.47.02-2.13,0-4.25,0-6.37.01-.5,0-.51.02-.4.5.03.12.03.25.08.35.38.69.35.92,1.34.84.66-.05,1.33.02,2,.02.59,0,1.19-.02,1.78-.02.67,0,1.33,0,2,.01.45,0,.91.06,1.36,0,.72-.09,1.27.29,1.86.63-.75,0-1.5,0-2.25,0-.27,0-.55.03-.82.03-.32,0-.63-.01-.95-.03-.1,0-.2-.04-.29-.04-.98.02-1.96.06-2.94.08-.67.01-1.35.02-2.02,0-.34,0-.36.09-.23.38.13.3.19.64.31.95.09.23.28.29.53.28.67-.04,1.34-.06,2.01-.07.98-.01,1.96,0,2.94,0,1.49,0,2.98,0,4.47,0,.09,0,.19.02.4.05-.17.12-.24.18-.33.23-.76.4-1.58.4-2.41.39-1-.02-2.01.05-3.01.07-.25,0-.51-.08-.77-.07-.61.01-1.23.06-1.84.07-.47.01-.94,0-1.49,0,.31.49.62,1.01.97,1.48.08.1.32.12.48.12,1.23,0,2.47,0,3.7,0h.68c-.32.42-.57.7-1.09.68-.93-.05-1.87-.01-2.8-.01-.1,0-.19.03-.29.05.05.1.09.2.14.29.2.32.4.63.61.94.08.11.17.22.25.33.19.22.39.43.56.67.37.51.58.54,1.07.17.46-.35.86-.73,1.14-1.25.19-.36.43-.74.94-.96-.08.21-.09.39-.19.48-.66.63-.69,1.49-.79,2.3-.06.51-.07,1.05.32,1.52.15.18.45.84.5,1.11-.04.03-.4-.27-.43-.24-.41-.29-.83-.57-1.23-.87-.76-.57-1.47-1.19-2.07-1.92-1.17-1.43-2.4-2.84-3.29-4.48-.43-.8-.8-1.63-1.16-2.47-.29-.66-.54-1.34-.79-2.02-.11-.31-.18-.64-.27-.96-.1-.36-.2-.72-.31-1.07-.48-1.59-.77-3.21-1.05-4.84-.25-1.45-.3-2.92-.28-4.39.02-1.24-.02-2.49.04-3.72.06-1.04.2-2.08.36-3.12.14-.88.34-1.75.57-2.61.28-1.08.58-2.16.94-3.22.28-.84.65-1.65,1.02-2.46.38-.85.75-1.72,1.22-2.53.46-.8,1.07-1.51,1.55-2.3.45-.76,1.11-1.29,1.75-1.86.58-.53,1.06-1.18,1.66-1.69.72-.62,1.47-1.21,2.28-1.69,1.03-.6,2.11-1.15,3.22-1.59,1.04-.42,2.15-.66,3.23-1,.82-.26,1.65-.34,2.51-.37.53-.02,1.05-.17,1.57-.24.31-.04.63-.07.95-.06.67.02,1.34.06,2.01.11.9.07,1.8.14,2.66.46.07.03.14.07.22.09.72.19,1.48.3,2.16.58,1.18.5,2.39.91,3.52,1.54.95.52,1.86,1.12,2.82,1.62.18.1.34.26.49.4.4.37.8.76,1.21,1.13.67.61,1.29,1.25,1.74,2.06.18.32.48.58.72.87.86,1.05,1.55,2.2,2.1,3.43.25.58.57,1.13.8,1.72.25.67.42,1.37.64,2.06.17.56.32,1.14.55,1.68.17.41.13.86.28,1.25.42,1.13.51,2.31.72,3.48.15.84.23,1.69.33,2.53.02.23-.04.47-.03.7.02.61.06,1.22.07,1.84,0,.35-.05.71-.06,1.06-.07,2.63-.29,5.25-1,7.8-.29,1.04-.58,2.08-.92,3.1-.26.76-.59,1.5-.91,2.25-.22.52-.46,1.04-.71,1.55-.33.66-.72,1.29-1.13,1.9-.18.28-.31.6-.49.88-.61.96-1.32,1.82-2.23,2.53-.4.31-.69.77-1.07,1.11-.66.59-1.32,1.17-2.03,1.7-.58.43-1.2.82-1.85,1.15-1.24.64-2.48,1.27-3.85,1.61-.75.19-1.48.43-2.22.63-.32.08-.66.13-.99.16-1.08.11-2.15.25-3.23.3-.82.04-1.64-.03-2.46-.07-.41-.02-.49-.15-.39-.56.04-.15.05-.32.09-.47.08-.26.03-.69.56-.45.09.04.33-.17.46-.31.16-.17-.01-.3-.1-.46-.12-.23-.19-.49-.26-.74-.14-.55-.47-.91-1.03-.97-.52-.05-.79-.48-1.15-.75-.29-.21-.44-.6-.67-.89-.49-.64-.66-1.37-.7-2.15,0-.09-.05-.17-.07-.25-.07.06-.14.15-.2.18-.29.15-.35,1.82-.31,2.35-.09-.2-.23-.39-.25-.6-.08-.75-.1-1.49.08-2.24.14-.58.39-1.07.81-1.45.33-.3.74-.54,1.13-.75.31-.17,1.18-.5,1.23-.84.07-.48,0-.54-.5-.44-.84.17-2.24.76-2.91,1.27-.14.11-.51.47-.66.57-.04.03-.11.02-.17.03,0-.07-.02-.16,0-.21.07-.12.4-.47.49-.59-.17,0-.35-.05-.52-.02-.49.09-.97.21-1.45.31-.11.02-.22,0-.33,0,.09-.1.15-.23.26-.28.23-.11.48-.19.72-.26.25-.07.5-.11.75-.17.53-.12.61-.2.38-.66-.47-.95-.9-1.92-1.75-2.65-.57-.5-1.14-.96-1.81-1.31-.43-.23-.74-.58-1-.99-.6-.94-1.12-1.91-1.3-3.02-.1-.58-.11-1.18-.15-1.77-.06-.86-.07-1.73-.18-2.59-.05-.41-.93-.83-1.07-1-.16-.53-.53-1.25-.7-1.77-.03-.08-.12-.13-.19-.19-.02.09-.09.2-.07.26.22.52.46,1.04.69,1.56.01.32.78.89,1.02,1,.18.08.19.17.02.29-.46.32-1.01.3-1.46-.04-.5-.37-.8-.88-.94-1.46-.23-.94-.32-1.89-.16-2.86.04-.26.24-.34.32-.52.06-.14-.31-.08-.21-.38.14-.46.15-.53.65-.63.35-.07.65-.2.62-.63-.86.04-1.69.15-2.05,1.25-.36-.78-.93-1.31-.99-2.1-.05-.64-.07-1.27.39-1.79.12-.13.21-.29.31-.44.27-.41.64-.61,1.15-.56.29.03.59-.05.88-.05.34.01.69.07,1.01.1-.42-.68-1.36-.93-2.31-.55.17-.46.14-.88,0-1.32-.09-.29.08-.52.39-.54.33-.02.67.02.99.1.14.04.27.13.34-.03.04-.1.03-.29-.04-.37-.17-.19-.36-.37-.67-.24-.18.08-.38.12-.58.13-.12,0-.32-.05-.34-.12-.03-.11.02-.32.11-.37.44-.24.8-.65,1.38-.57.12.02.32-.03.35-.11.04-.09-.03-.26-.09-.37-.11-.2-.42-.19-.45-.51-.05-.67-.13-1.34.07-2,.03-.09.09-.18.15-.25.03-.04.12-.08.15-.06.06.03.11.1.12.16.03.09,0,.2.03.29.02.06.11.12.17.14.07.02.17-.04.23-.01.71.31.95-.34,1.34-.67.05-.04.02-.23-.03-.31-.17-.24-.37-.45-.55-.68-.07-.09-.17-.24.04-.24.5,0,.48-.35.49-.7.11.62.47,1.1.9,1.51.21.2.19.35.12.56-.14.39-.25.79-.43,1.17-.46.99-.48,2.06-.59,3.12,0,.04.04.13.06.13.18,0,.36,0,.54-.04.06-.01.09-.13.15-.18.21-.19.45-.2.72-.15.21.04.43.04.64.02.12-.01.28-.17.35-.13.17.09.31.24.43.39.16.2.25.46.42.64.33.36.7.68,1.13,1.1.1-.53-.31-1.07.4-1.28.1.36.3.77.31,1.18,0,.32-.22.64-.33.97-.13.41-.23.83-.35,1.24-.09.3,0,.79-.59.63-.02,0-.09.11-.09.17,0,.3-.17.36-.42.36-.22,0-.43.08-.65.08-.23,0-.47-.04-.68-.11-.11-.03-.26-.2-.25-.28.04-.19,0-.47.29-.51.22-.03.45-.01.68-.03.07,0,.14-.04.2-.06-.03-.07-.03-.15-.08-.19-.53-.49-1.12-.34-1.5.28-.15.25-.42.45-.58.73-.03.05-.28-.03-.43-.05-.4-.04-.45,0-.39.39.17,1.05.22,2.14-.11,3.11-.49,1.41-.25,2.76-.13,4.15.06.66.28,1.32.3,1.98.03.8,0,1.61.16,2.4.28,1.4.8,2.69,1.87,3.69.14.13.32.24.49.33.06.03.24,0,.25-.03.09-.34.42-.35.66-.46.87-.41,1.73-.88,2.7-1.04.15-.03.32-.04.47,0,.57.12,1.14.13,1.7.39.47.22,1.07.37,1.64.17.09-.03.19-.06.26-.12.5-.49,1.13-.7,1.79-.84.15-.03.29-.12.43-.19.21-.1.29-.25.2-.49-.07-.2-.09-.43-.17-.62-.07-.19-.16-.33.14-.38.03,0,.06-.16.06-.24-.03-.65.17-1.21.64-1.65.65-.62.84-1.36.57-2.21-.19-.6-.26-1.23-.64-1.78-.19-.28-.29-.68-.42-1.01-.18-.44-.29-.85-.48-1.29-.05-.1-.01-.24-.01-.37.13.07.3.1.37.21.11.18.19.4.23.61.13.69.39,1.31.85,1.84.1.11.14.28.21.43.17.37.34.72.82.75.17.01.24.12.26.32.08.79.1,1.57-.02,2.35-.04.27-.93,2.94-1.54,3.37-.09.06-.14.19-.18.3-.02.04,0,.13.04.15.03.02.12.01.16-.02.14-.11.27-.24.39-.37.18-.2.36-.4.52-.61.19-.25.36-.52.52-.78.21-.33.42-.66.6-1.01.68-1.32.88-2.7.44-4.14-.12-.39.07-.71.19-1.02.3-.72.68-1.41,1.05-2.1.07-.13.25-.25.39-.28.2-.04.41-.05.36.32-.05.37.48.65.86.5.03-.01.06-.16.03-.2-.08-.13-.2-.23-.28-.36-.02-.03,0-.11.01-.2.4.3.78.57,1.16.85.55.41,1.46.39,1.85,0-.38-.06-.8-.09-1.2-.2-.35-.09-.34-.17-.22-.51.09-.25.13-.53.15-.8,0-.08-.11-.17-.17-.26-.09.06-.18.11-.25.19-.04.04-.02.12-.05.17-.07.13-.15.25-.23.38-.12-.14-.26-.27-.34-.44-.14-.28.14-.7-.1-.88-.21-.17-.59-.13-.9-.17-.2-.03-.38-.04-.17-.3.03-.04.05-.12.03-.17-.26-.73.12-1.5-.16-2.22-.04-.11,0-.27.05-.39.11-.26.26-.51.39-.77.38.16.2.51.25.78.1.51.52.74.9.94.19.1.3.18.38.36.09.21.27.3.49.23.23-.07.3-.24.26-.47-.06-.34-.09-.66-.33-.98-.33-.43-.53-.95-.77-1.45-.03-.06.02-.17.07-.24.1-.16.21-.32.37-.55-.4.05-.71.09-1.02.11-.21.01-.39.06-.33-.34.04-.29.1-.39.34-.49.36-.16.72-.32,1.13-.3.15,0,.31-.04.49-.07-.22-.38-.5-.42-.83-.27-.42.2-.83.01-1.24.08,0-.05-.02-.1-.03-.16.32-.1.63-.25.96-.3.5-.07.08-.37.14-.54.06-.17-.17-.21-.34-.13-.22.09-.43.2-.65.28-.43.16-.83.06-1.19-.18-.89-.6-1.39-1.44-1.47-2.51-.01-.18.08-.36.17-.54.26.56.14,1.28.86,1.69-.11-.29-.2-.5-.26-.72-.06-.25-.1-.51-.09-.76,0-.15.11-.31.17-.46.09.11.19.22.27.34.09.13.17.26.26.39,0,.02.01.04.02.06h.01c.03.49.44.73.68,1.07.03.04.25,0,.35-.07.04-.03.02-.23-.03-.3-.07-.1-.2-.15-.31-.22-.23-.16-.46-.32-.69-.48,0,0,0-.02,0-.02-.01-.02-.02-.03-.03-.05-.17-.61-.07-1.21.11-1.79.09-.29.07-.41-.25-.39-.08,0-.16,0-.26-.02.12-.42.37-.67.8-.66.25,0,.22-.13.16-.24-.19-.34-.39-.68-.6-1-.1-.15-.25-.25-.38-.38-.42-.44-.83-.89-1.24-1.34-.3-.32-.61-.45-1.1-.35-.52.1-1.09.24-1.63-.03-.1-.05-.26.03-.39.05-.21.03-.45.15-.63.09-.89-.27-1.67,0-2.44.4-.37.19-.76.32-1.15.46-.07.02-.19-.01-.24-.07-.25-.27-.41-.13-.57.1-.07.09-.14.2-.24.24-.43.19-.87.37-1.32.53-.12.04-.27.01-.4-.01-.33-.06-.65-.11-.97-.19-.51-.14-.97-.08-1.39.26-.23.19-.39.1-.49-.17-.11-.32-.22-.63-.36-.94-.12-.26-.28-.5-.42-.74-.04.02-.09.03-.13.05.04.24.02.51.12.72.19.4.19.9.59,1.2.06.04.08.25.04.31-.23.32-.49.62-.72.93-.13.18-.22.13-.29-.03-.13-.31-.48-.55-.35-.97.01-.04-.14-.16-.23-.22-.28-.2-.41-.42-.33-.8.16-.79.26-1.58.15-2.4-.05-.34.29-.74.87-1.13-.03.33-.07.6-.07.88,0,.23.05.47.09.7,0,.04.07.07.11.1.04-.05.08-.09.11-.14.02-.03.03-.08.03-.11-.13-.81.07-1.61.18-2.4.03-.21.16-.44.3-.6.18-.2.42-.36.63-.53.13-.11.99-.2,1.07-.08.07.12.06.32.03.47-.12.57-.2,1.14.06,1.79.07-.17.14-.27.14-.38.02-.45-.01-.9.03-1.35.04-.42.15-.84.25-1.26.02-.09.15-.18.25-.23.27-.15.55-.32.84-.43.38-.14.78-.31,1.18-.33.28-.01.59.18.87.31.22.1.5.22.58.41.08.18-.1.45-.12.68-.04.41-.05.83-.06,1.25,0,.06.07.12.1.19.05-.07.14-.13.15-.21.09-.56.15-1.13.25-1.69.06-.33.16-.65.27-.97.11-.33.27-.54.7-.6.5-.07.95-.09,1.44.05.34.1.58.26.82.5.23.23.27.37.03.56-.64.52-.71,1.28-.87,2-.11.48-.16.97-.21,1.46-.01.1.08.2.12.31.06-.09.14-.17.18-.27.03-.07.04-.15.04-.23,0-.49.24-.89.47-1.31.21-.37.38-.77.52-1.17.46-1.35,1.45-1.86,2.81-1.91.92-.03,1.83.06,2.65.4.5.21.96.7,1.1,1.31.04.18.06.23.25.19.1-.02.24.01.33.07.38.26.75.5,1.24.38.08-.02.22.03.27.1.18.28.48.39.73.57.52.37.97.84,1.47,1.23.61.47,1.07,1.09,1.61,1.63.3.3.45.61.61.97.12.26.32.49.52.71.22.23.41.46.48.79.08.4.17.81.31,1.2.14.38.33.74.53,1.09.19.36.33.7.19,1.12-.11.34-.14.7-.26,1.03-.08.21-.25.39-.39.58-.29.38-.34.71-.04,1.04.07.08.44.04.53-.07.43-.49.72-1.07.94-1.69.02-.07-.08-.23-.16-.29-.25-.18-.21-.45-.24-.69-.05-.38.16-.53.54-.42.08.02.15.09.22.08.68-.11,1.2.08,1.58.7.18.3.51.51.77.77.49.49.73,1.08.65,1.76-.07.66-.17,1.33-.32,1.98-.13.57-1.03,1.3-1.53,1.17-.54-.13-1.17.09-1.62-.43-.11-.12-.32-.15-.5-.22,0,0-.01-.02-.02-.03,0,0-.02,0-.02,0h.01s.02.02.03.02ZM23.84.93c-1.31-.1-2.38.29-3.49.49-.75.14-1.4.65-2.2.59-.04,0-.08.02-.11.03-1.07.44-2.13.94-3.23,1.31-1.05.36-1.87,1.08-2.79,1.63-.5.3-.96.7-1.42,1.07-.32.26-.64.52-.93.82-.39.39-.82.77-1.1,1.24-.21.35-.46.63-.75.9-.19.18-.37.37-.52.57-.42.54-.8,1.11-1.23,1.64-.87,1.07-1.31,2.37-1.9,3.58-.24.49-.39,1.03-.59,1.54-.18.44-.39.86-.56,1.3-.21.55-.43,1.1-.59,1.66-.31,1.1-.63,2.21-.86,3.33-.18.85-.28,1.73-.25,2.61.01.5-.17,1-.2,1.51-.04.77.05,1.56-.06,2.32-.15,1.02-.03,2.01.03,3.01.05.85.16,1.69.23,2.54.11,1.34.24,2.68.63,3.97.38,1.24.76,2.47,1.17,3.7.45,1.36,1.01,2.66,1.69,3.91.37.69.86,1.32,1.31,1.97.48.69.97,1.37,1.46,2.06.06.08.12.16.19.23.45.46.76,1.02,1.27,1.46.68.58,1.23,1.33,2,1.82,1.14.74,2.18,1.64,3.47,2.16.22.09.4.25.61.36.21.11.41.23.63.31.41.15.85.25,1.25.43,1.21.55,2.46.95,3.79,1.08.26.02.51.17.78.2.84.09,1.69.18,2.54.21,1.14.04,2.29.06,3.42,0,.65-.03,1.29-.2,1.92-.38,1.12-.33,2.27-.59,3.37-1.02.9-.35,1.81-.68,2.7-1.06.56-.24,1.1-.52,1.63-.82.32-.18.61-.43.91-.64.74-.53,1.47-1.06,2.21-1.59.06-.04.1-.12.15-.19.52-.67,1.13-1.25,1.63-1.94.39-.54.97-.97,1.36-1.55.15-.23.24-.52.44-.69.51-.44.81-1.01,1.14-1.57.2-.33.29-.73.46-1.08.25-.53.54-1.04.78-1.58.22-.48.4-.98.6-1.47.11-.25.25-.49.34-.75.18-.55.26-1.12.49-1.65.53-1.21.78-2.49,1.08-3.76.2-.85.27-1.73.26-2.61,0-.48.17-.97.2-1.45.04-.77-.05-1.56.06-2.32.16-1.07.04-2.13-.04-3.18-.09-1.16-.27-2.32-.33-3.49-.08-1.82-.76-3.5-1.2-5.24-.19-.75-.57-1.46-.82-2.2-.48-1.41-1.11-2.75-1.92-4-.26-.4-.54-.77-.82-1.16-.53-.73-1.04-1.47-1.6-2.18-.4-.51-.78-1.02-1.27-1.46-.76-.68-1.41-1.48-2.3-2.02-.35-.22-.68-.48-1.02-.71-.55-.36-1.1-.71-1.66-1.05-.38-.23-.79-.42-1.19-.62-.18-.09-.35-.19-.53-.25-.38-.13-.8-.18-1.15-.38-1.44-.8-3.06-.95-4.63-1.3-.63-.14-1.29-.15-1.94-.2-.59-.05-1.18-.13-1.77-.13-.45,0-.91.09-1.2.12ZM25.17,0c.23,0,.46,0,.69.01.63.02,1.27.01,1.9.09.56.07,1.11.29,1.67.35,1.56.17,3.04.61,4.51,1.12.64.22,1.31.46,1.89.88.5.36,1.11.57,1.67.85.19.1.41.18.56.32.25.23.39.6.83.57.06,0,.12.14.19.21.11.11.21.28.35.31.64.17,1.01.67,1.43,1.11.31.33.68.61.99.94.57.62,1.13,1.26,1.67,1.91,1.04,1.24,1.89,2.6,2.7,4,.43.75.93,1.46,1.13,2.33.07.28.3.51.41.78.22.58.41,1.17.6,1.76.08.24.16.49.24.73.09.26.17.52.26.77.09.26.17.52.25.78.02.05.07.1.08.16.03.97.51,1.85.59,2.81.06.67.23,1.34.21,2.01-.02.63.11,1.23.11,1.85,0,.25.11.5.13.75.04.38.07.77.07,1.15,0,.79.01,1.59-.02,2.38-.02.47-.09.94-.14,1.41-.12,1.25-.21,2.5-.36,3.75-.07.56-.23,1.12-.36,1.67-.13.56-.25,1.11-.4,1.66-.12.45-.36.87-.43,1.32-.17,1.05-.72,1.97-.99,3-.11.42-.39.8-.58,1.21-.39.82-.74,1.66-1.17,2.45-.56,1.02-1.28,1.94-2.02,2.84-.47.58-.89,1.2-1.37,1.76-.36.43-.77.81-1.18,1.19-.42.39-.85.78-1.3,1.14-.72.56-1.41,1.2-2.22,1.6-.68.34-1.33.73-2.02,1.06-.55.26-1.13.45-1.7.66-.79.29-1.57.61-2.38.85-.81.24-1.63.41-2.46.58-.69.15-1.39.25-1.85.33-1.33,0-2.42.03-3.51,0-.76-.02-1.52-.14-2.27-.31-1.13-.26-2.28-.44-3.41-.72-.74-.18-1.46-.46-2.17-.74-.72-.28-1.47-.55-2.12-.97-.45-.29-.94-.48-1.4-.74-.15-.08-.27-.23-.39-.36-.15-.15-.24-.38-.52-.31-.05.01-.13-.02-.16-.06-.36-.62-1.13-.69-1.58-1.21-.42-.5-.9-.95-1.39-1.37-.92-.79-1.56-1.82-2.32-2.75-.53-.65-.93-1.4-1.38-2.12-.34-.54-.67-1.09-.98-1.65-.22-.39-.41-.81-.61-1.21-.2-.41-.37-.82-.59-1.22-.33-.59-.38-1.27-.61-1.89-.09-.24-.18-.48-.26-.72-.08-.22-.15-.44-.22-.66-.04-.13-.08-.26-.12-.39l-.02-.05c-.04-.13-.08-.26-.12-.39-.02-.06-.07-.11-.07-.16-.02-.97-.52-1.85-.59-2.82-.05-.67-.23-1.34-.22-2.01,0-.61-.09-1.2-.1-1.8,0-.27-.1-.54-.14-.81-.04-.36-.08-.73-.08-1.1,0-.83-.01-1.66.02-2.5.01-.45.1-.9.14-1.35.12-1.25.22-2.51.36-3.76.07-.56.23-1.12.36-1.67.13-.57.26-1.15.42-1.72.12-.43.33-.83.41-1.26.21-1.14.79-2.16,1.09-3.28.09-.33.34-.61.49-.93.31-.63.61-1.28.91-1.91.6-1.26,1.45-2.35,2.32-3.42.46-.56.86-1.16,1.33-1.71.35-.41.75-.78,1.14-1.15.44-.41.87-.83,1.34-1.19.72-.56,1.45-1.12,2.21-1.61.47-.31,1.03-.47,1.53-.74.81-.44,1.69-.69,2.54-1.04.68-.28,1.36-.68,2.07-.75.84-.09,1.55-.57,2.4-.57.34,0,.67-.18,1.01-.21.82-.06,1.64-.08,2.46-.1.2,0,.4,0,.6,0h.01Z\"/>\n  </g>\n</svg>",
    2: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50.27 59.47\">\n  <g>\n    <path d=\"M14.56,8.34s.06.05.09.08c.87-.62,1.38-1.5,1.77-2.48.02-.04-.03-.1-.04-.15-.05.02-.12.02-.15.05-.16.2-.33.4-.47.61-.4.63-.8,1.26-1.19,1.89ZM13.86,9.35s-.06-.05-.09-.08c-.3.25-.6.5-.89.77-.26.24-.51.49-.76.75-.07.08-.09.2-.14.3.11-.04.24-.05.34-.11.21-.14.41-.31.62-.46.43-.3.64-.76.92-1.17ZM15.25,5.31c-.26.21-.45.41-.68.56-.55.39-1.1.76-1.65,1.14-.32.22-.68.41-.96.67-.55.5-1.02,1.09-1.59,1.57-.92.77-1.61,1.72-2.24,2.73-.08.13-.16.27-.24.41-.02.05-.02.11-.03.16.07.01.17.06.21.03.11-.07.2-.17.31-.25.22-.16.42-.37.67-.47,1.01-.4,1.83-1.09,2.61-1.81.4-.37.74-.81,1.11-1.22.36-.41.78-.78,1.05-1.24.2-.33.41-.61.67-.89.35-.37.71-.75.75-1.39ZM8.96,13.43c.08-.04.17-.08.25-.13.46-.3.93-.59,1.38-.91.4-.29.78-.61,1.16-.92.04-.03.03-.13.04-.19-.05,0-.11,0-.16.02-.09.05-.16.12-.24.17-.36.26-.72.53-1.09.78-.45.31-.91.62-1.36.93-.04.03-.06.1-.07.15,0,.02.05.05.1.09ZM8.59,13.58c-.05-.03-.1-.08-.13-.08-.18.06-.36.12-.54.2-.05.02-.06.11-.1.17.05,0,.11.04.16.03.17-.05.33-.11.49-.17.05-.02.07-.08.12-.15ZM6.92,14.35c.1.02.15.05.17.03.17-.08.34-.16.51-.25,0,0,0-.06-.01-.1-.18.05-.36.09-.53.15-.05.02-.07.08-.13.16ZM26.81,18.59s0,.05,0,.07c-.08-.01-.16-.06-.23-.04-.38.09-.77.17-1.13.31-.25.1-.31.36-.22.61.11.31.34.1.5.06.88-.22,1.76-.2,2.64.02.23.06.47.05.71.07-.14-.21-.25-.44-.43-.62-.13-.13-.33-.24-.51-.28-.44-.09-.88-.13-1.32-.2ZM20.24,20.54c-.03-.05-.05-.07-.05-.09,0-.09,0-.18,0-.27,0-.01.05-.02.07-.04,0,.11.01.21.02.32,0,.02-.02.03-.04.07ZM28.49,20.55c-.25-.19-.36-.27-.46-.34,0,0-.09.08-.08.1.07.12.15.25.24.36.02.02.13-.04.3-.11ZM36.62,20.86c.17,0,.35,0,.52.03.07.01.17.12.18.18,0,.06-.1.17-.17.18-.54.09-1.09.17-1.63.24-.04,0-.12-.03-.14-.07-.02-.03.02-.12.05-.14.38-.18.77-.36,1.16-.53.01.03.02.07.03.1ZM15.28,22.13s.05.06.07.09c.28-.19.57-.37.83-.58.06-.05.06-.19.08-.29-.09.02-.2.02-.26.07-.25.23-.49.47-.74.7ZM22.71,21.6c.01.47.53,1.42.88,1.62.1.06.24.13.32.1.13-.05.26-.16.32-.28.04-.08-.02-.3-.09-.33-.56-.21-.89-.63-1.14-1.14-.03-.06-.15-.09-.23-.13-.03.07-.06.13-.07.15ZM14.7,22.91l-.08-.12c-.2.14-.41.26-.59.41-.16.13-.3.29-.45.44-.08.09-.15.2-.22.3.15,0,.3.04.44,0,.1-.02.21-.11.28-.2.22-.28.42-.57.62-.85ZM38.24,23.15c-.87.6-1.55.25-1.92-.41-.18-.31-.35-.32-.61-.24-.13.04-.26.11-.39.15-.18.06-.34.1-.46-.11-.03-.06-.15-.08-.22-.12-.08.16-.17.16-.21,0-.01-.05.11-.21.15-.2.46.1.72-.28,1.09-.4.39-.13.8-.23,1.2-.33.62-.16,1.15-.02,1.61.46.53.55.78,1.17.55,1.94-.06.19-.11.32-.37.16-.33-.2-.65-.37-.42-.89ZM37.18,25.07c.35.1.71.19,1.06.3.05.01.08.05.13.08-.03.05-.06.13-.1.13-.23,0-.47.04-.68-.04-.24-.09-.44-.28-.66-.43,0,0,.01-.01.02-.02l.04-.04s.01-.01.02-.02l.15.04ZM29.15,27.09c.31-.43.62-.85.93-1.28.04.03.07.05.11.08-.16.54-.52.93-.93,1.28-.04-.03-.07-.05-.11-.08ZM8.62,25.96c.1.5-.06.89-.42,1.18-.03.03-.13.04-.14.03-.03-.04-.06-.12-.04-.16.19-.35.4-.7.6-1.05ZM25.1,27.64c.22-.47.52-.88.83-1.28.31-.4.65-.79.94-1.21,0,.44-1.08,1.95-1.78,2.49ZM32.46,24.38c-.02.22-.05.32-.03.42.08.41-.04.74-.39.98-.08.06-.12.18-.18.27.11.02.22.06.33.04.47-.07.93-.22,1.39-.23.83-.02,1.47.41,1.96,1.04.34.44.09,1.6-.37,1.9-.14.09-.38.12-.54.07-.26-.09-.49-.21-.79-.14-.12.03-.29-.09-.43-.15-.51-.22-1.01-.45-1.54,0-.19.16-.46.22-.7.31-.46.18-.82-.02-1.11-.35-.32-.35-.36-.78-.28-1.23,0-.05.06-.11.1-.13.23-.12.38-.28.39-.55,0-.07.07-.17.12-.18.75-.13,1.49-2.51,1.75-2.74.06-.06.16-.07.24-.11.03.09.08.17.08.26.01.22,0,.44,0,.53ZM41.09,29.78c-.02-.08-.04-.16-.04-.23,0-.01.06-.03.1-.05.02.07.04.13.05.2,0,.02-.05.04-.1.08ZM39.57,28.34c-.05.36-.03.65.08.92.11.27.31.51.6.78-.24-.61-.46-1.15-.68-1.7ZM33.49,29.18c.06.6.1,1.04.15,1.49,0,.03-.03.07-.04.1-.04-.02-.07-.03-.11-.05-.03-.02-.08-.04-.09-.07-.12-.45-.2-.91.1-1.47ZM15.66,30.53c.07.5.14,1,.22,1.5.01.08.09.16.14.23.04-.09.11-.18.12-.28.02-.16,0-.32,0-.47,0-.43-.06-.85.08-1.28.11-.33.1-.7.13-1.06,0-.08-.08-.16-.12-.24-.05.05-.1.1-.14.16-.28.43-.4.9-.41,1.43ZM36.35,32.11c.08-.27.2-.54.24-.82.03-.22-.01-.46-.07-.67-.11-.42-.27-.82-.39-1.24-.02-.08.03-.17.05-.26.07.05.17.08.21.14.49.74.72,1.56.74,2.44,0,.21.05.42.09.63,0,.04.02.08.03.12.02.34-.23.79-.45.75-.37-.06-.34-.38-.37-.65-.01-.14,0-.28,0-.42-.02,0-.04-.01-.06-.02ZM39.38,30.65s-.09,0-.13.01c-.22.9-.02,1.76.31,2.61,0,.02.12.04.14.02.04-.03.07-.12.05-.15-.19-.41.05-.91-.26-1.3-.05-.07-.04-.19-.05-.28-.02-.3-.04-.61-.06-.91ZM20.19,21.14s.07-.02.11-.02c.03.07.09.13.09.2-.03.43-.01.88-.14,1.29-.3.99-.75,1.95-1.46,2.69-.56.57-.83,1.28-1.25,1.91-.46.68-.52,1.51-.72,2.29-.2.78-.13,1.56.03,2.33.11.54.29,1.07.47,1.59.08.24.6-.24.79-.03.05.06.17.06.25.08.01-.11.06-.23.03-.32-.18-.6-.44-1.19-.39-1.84.02-.21.05-.44.01-.64-.21-1.02.25-1.92.57-2.83.18-.52.61-.95.9-1.44.37-.59.75-1.18,1.06-1.8.15-.32.12-.72.22-1.07.25-.94.37-1.9.38-2.86.01-.87.06-1.79-.65-2.48-.1-.1-.23-.2-.36-.24-.36-.12-.46-.06-.39.28.08.4.23.78.34,1.17.03.12.1.29.05.37-.4.65-.19,1.34-.16,2.01,0,.05.08.1.12.15.04-.06.1-.12.1-.19.01-.2,0-.39,0-.59ZM17.66,34.02c-.18-.08-.23-.11-.29-.12-.13-.02-.26-.04-.39-.05-.07,0-.14.01-.21.02.05.07.07.17.14.21.11.07.24.13.37.14.09,0,.19-.09.38-.2ZM17.03,26.05s-.07-.06-.11-.09c-.24.35-.69.41-.91.84-.41.78-1.05,1.45-1.38,2.25-.38.92-.87,1.8-.96,2.86-.07.82.04,1.56.25,2.32.06-.32.06-.65.1-.97.02-.21.13-.41.14-.62.03-.82.06-1.65.45-2.4.19-.37.47-.71.55-1.1.13-.61.57-.9.98-1.26.19-.16.31-.4.44-.61.03-.05-.02-.14-.03-.21-.06.03.2-.59.49-1.01ZM11.39,33.66c-.07.3-.13.49-.16.69,0,.03.14.11.21.12.05,0,.15-.11.14-.15-.04-.19-.11-.37-.2-.67ZM28.33,33.18c-.27-.02-.46-.37-.33-.6.11-.18.27-.34.41-.51.23-.29.48-.58.67-.9.12-.2.24-.26.43-.18.18.07.4.14.52.28.28.33.63.31.98.27.33-.04.68-.07.98-.21.59-.27,1.1-.09,1.55.24.34.25.64.3,1.03.16.38-.14.58-.04.78.31.14.24.24.49.36.74.03.07.05.18.1.21.7.38.28.88.13,1.34-.02.08-.14.21-.18.19-.1-.04-.25-.12-.26-.21-.13-.85-.83-1.04-1.47-1.3-.71-.29-1.47-.29-2.21-.4-.32-.05-.66.01-.99.05-.41.04-.82.09-1.23.17-.35.06-.69.15-1.03.24-.1.02-.19.07-.25.09ZM14.89,33.46c-.13.38-.22.78.03,1.16.02.03.17,0,.17,0,.02-.17.07-.34.04-.5-.04-.23-.15-.44-.23-.66ZM18.52,33.64v1.26c.3-.48.17-.88,0-1.26ZM28.92,27.98c-.08.23-.15.48-.26.7-.37.76-.77,1.5-1.14,2.27-.08.17-.11.39-.08.58.13,1,.28,1.99.42,2.99.03.22.01.45.01.67-.12-.19-.31-.36-.35-.56-.2-1.02-.53-2.01-.53-3.07,0-.39.08-.73.27-1.08.3-.53.52-1.09.81-1.63.19-.34.43-.64.66-.96.06.03.12.05.18.08ZM31.86,33.54c.75.17,1.59.36,2.43.55.05.01.13.07.13.1-.02.33.08.62.21.91.02.05-.04.17-.09.2-.05.03-.15,0-.21-.04-.11-.08-.19-.2-.3-.29-.14-.11-.28-.23-.44-.28-.5-.16-1.02-.28-1.53-.43-.17-.05-.34-.11-.47-.22-.12-.1-.19-.26-.28-.39.15-.03.29-.07.55-.13ZM9.66,35.2c.02-.17.02-.25.04-.32.09-.22.2-.44.29-.66.21.23-.02.46,0,.69,0,.08-.03.15-.06.23-.04.11-.09.23-.13.34-.06-.11-.12-.22-.14-.27ZM29.62,36.1c-.41-.13-.65-.48-.9-.83-.12-.18-.24-.36-.34-.55-.03-.05,0-.14,0-.21.06.02.16.02.19.07.36.5.7,1.01,1.05,1.51ZM39.97,30.36s-.08.04-.11.06c.03.11.03.23.08.34.3.66.62,1.31.92,1.97.16.36.24.75.42,1.1.22.43.3.84.14,1.3-.13.37-.2.75-.29,1.13-.03.11-.04.23-.06.35.22-.26.34-.55.46-.84.05-.12.09-.31.18-.35.21-.08.19-.21.2-.37.03-.74-.07-1.45-.43-2.12-.31-.56-.5-1.2-.96-1.68-.12-.12-.16-.32-.25-.47-.09-.15-.2-.28-.3-.42ZM37.76,36.96s.05.03.08.05c.15-.19.32-.37.45-.57.1-.16.43-.39-.07-.5-.03,0-.06-.17-.04-.25.14-.59.28-1.18.44-1.76.08-.28.09-.54-.12-.86-.16.74-.32,1.36-.44,1.98-.12.63-.2,1.27-.3,1.91ZM39.54,35.67s.1.03.15.05c-.1.38-.21.75-.3,1.13-.02.08.04.17.06.26.07-.06.17-.11.2-.19.29-.64.4-1.33.48-2.03,0-.07-.04-.14-.07-.21-.08.04-.2.07-.22.13-.12.28-.21.58-.31.86ZM36.12,36.63c-.12.29-.19.51-.3.72-.05.09-.16.14-.25.2.03-.08.08-.16.07-.24,0-.21-.04-.42-.07-.64-.03-.19-.02-.41.2-.4.12,0,.23.23.34.35ZM10.6,36.51c.29.34.43.69.3,1.1-.03.08-.08.15-.12.23-.07-.08-.21-.16-.21-.25,0-.36.02-.72.04-1.08ZM42.89,37.15c.34-.27.77-.48.66-1.11-.35.34-.75.57-.66,1.11,0,0,0,0-.01,0,0,.01-.02.03-.02.04-.18.13-.36.24-.52.39-.05.04-.03.17-.04.26.09-.03.21-.03.25-.08.12-.18.22-.37.32-.56.01,0,.03-.02.04-.03,0,0,0-.02,0-.02ZM40.41,37.66c.1-.09.2-.19.3-.28-.1.16-.21.32-.31.47,0-.07,0-.13.01-.2ZM10.05,37.6c.08.09.14.15.2.22-.04.02-.1.07-.12.06-.06-.03-.12-.08-.17-.13,0,0,.05-.07.1-.14ZM33.59,38c.14-.09.28-.21.43-.28.59-.3.79-.77.69-1.41-.01-.07.05-.15.08-.23.09.05.25.09.26.16.04.23.07.48.02.7-.11.52-.84,1.07-1.48,1.06ZM14.74,38c-.14-.08-.19-.13-.25-.14-.53-.08-1.02-.26-1.43-.64-.03-.02-.13-.02-.14,0-.02.04-.03.12,0,.16.07.09.14.2.24.25.38.19.77.38,1.17.54.08.03.22-.09.42-.18ZM16.03,37.03c-.14.33.15.79-.27,1.07-.05.03-.07.25.16.18.32-.1.33.06.28.31-.03.12,0,.27.03.39,0,.03.09.09.13.08.04-.01.11-.08.1-.12,0-.09-.07-.19-.06-.28.03-.38,0-.8.13-1.14.14-.37.44-.68.69-1,.13-.17.3-.33.54-.19.17.1.15-.03.17-.12.03-.23.05-.46.09-.68.07-.35-.09-.55-.41-.39-.46.23-1.08.2-1.32.79-.02.04-.09.07-.15.1-.42.17-.83.37-1.26.5-.59.17-1.56-.2-1.79-.67-.19-.38-.33-.8-.49-1.19-.07-.18-.14-.35-.22-.56-.28.4-.1.76-.1,1.12.02.82.47,1.39,1.06,1.83.38.28.9.39,1.36.57.38.15.69-.12,1.02-.23.13-.04.21-.24.31-.37ZM37.03,39.2c.51-.18.98-.58,1.29-1.06.32-.48.48-1.03.41-1.52q-1.27,1.13-1.7,2.58ZM40.41,37.63c-.13.09-.26.18-.38.29-.02.02,0,.1,0,.15.07-.03.13-.07.2-.1.03.28.19.35.41.19.37-.26.71-.57,1.08-.82.75-.51,1.23-1.18,1.36-2.09.01-.11.09-.21.13-.31.07-.16.19-.32.19-.48,0-.75,0-1.51-.47-2.16-.09-.13-.15-.29-.22-.44.04-.02.09-.04.13-.07.2.37.4.75.62,1.11.37.62.47,1.25.18,1.93-.06.14-.11.3-.15.45-.01.05,0,.15.01.16.06.02.15.04.21.01.3-.12.44-.38.52-.68.17-.69.13-1.4.17-2.1.05-.83-.11-1.63-.27-2.41-.24-1.18-.6-2.33-.93-3.48-.39-1.39-.81-2.76-1.22-4.15-.09-.32-.13-.66-.26-.96-.21-.47-.47-.91-.72-1.35-.37-.63-.83-1.23-1.12-1.89-.34-.75-.77-1.36-1.44-1.87-.62-.48-1.16-1.04-1.95-1.22-.3-.07-.6-.16-.91-.18-.39-.02-.73-.23-1.11-.28-.48-.07-.98-.04-1.46-.11-.86-.14-1.67.06-2.5.23-.63.13-1.28.19-1.91.28-.5.07-1.02.08-1.49.23-1.03.34-2.03.76-3.04,1.16-.06.02-.17.11-.16.13.03.08.08.19.16.22.1.04.23.02.35.02.53-.04,1.05-.04,1.59.07.37.08.82.12,1.16-.01.65-.26,1.25-.08,1.85.05.37.08.7.35,1.08.46.6.18,1,.63,1.43,1.02.28.25.48.61.45,1.05-.02.26.11.54.16.81.06.35.14.7.16,1.05.03.43-.09.53-.52.5-.2-.01-.39-.06-.58-.11-.26-.07-.42-.04-.4.29.01.22-.01.44-.06.65-.05.25-.37.43-.65.39-.3-.04-.23-.27-.23-.46,0-.32,0-.63-.04-.95-.02-.17-.05-.38-.17-.48-.13-.12-.34-.17-.52-.21-.03,0-.09.19-.16.25-.06.06-.19.11-.26.09-.19-.06-.36-.16-.54-.24-.18-.07-.32-.06-.48.1-.51.51-1.24.54-1.77.04.03.16.06.27.08.39.11.63.11.63.73.69.14.01.28.08.42.12-.11.11-.21.23-.33.32-.07.06-.18.07-.28.1-.82.21-1.68.23-2.45.65-.08.05-.26.03-.34-.02-.44-.34-1.05-.54-1.07-1.25,0-.06-.01-.14-.05-.17-.47-.32-.27-.81-.34-1.24-.03-.22-.07-.43-.11-.65-.05,0-.1,0-.15.01-.15.65-.09,1.32-.07,1.98.02.51.16,1.02.16,1.52,0,.51.32,1,.07,1.52-.02.04,0,.13.02.17.26.41.18.95.54,1.34.17.18.25.45.39.66.21.32.25.62.07.99-.39.83-.75,1.68-1.11,2.54-.11.27-.15.57-.22.85.04.01.09.02.13.04.06-.12.12-.23.17-.35.28-.67.55-1.35.86-2,.22-.48.51-.93.75-1.39.2-.38.37-.78.57-1.16.09-.17.22-.33.34-.48.03-.04.14-.06.15-.05.04.05.08.13.07.19,0,.07-.07.14-.1.21-.28.65-.54,1.31-.83,1.96-.16.34-.07.6.18.85.35.36.6.77.63,1.29,0,.08.03.16.07.22.38.56.39,1.18.39,1.82,0,.43.02.89.37,1.23.06.06.03.22.05.32.11.55.14,1.14.36,1.64.18.41.57.75.91,1.07.74.7,1.41,1.52,2.51,1.68.21.03.42.11.63.1.33,0,.66-.06.99-.11.66-.1,1.28.06,1.89.26.35.11.69.19,1.03.03.46-.21.93-.42,1.37-.65.18-.09.38-.23.48-.4.4-.66.71-1.38,1.15-2.01.39-.56.54-1.17.68-1.81.26-1.18.54-2.35.88-3.51.17-.6.22-1.2.21-1.81,0-.91-.14-1.81.04-2.72.05-.23.04-.47.08-.71.13-.82.13-1.7.44-2.44.55-1.29-.96-3.12-2.25-2.93-.08.01-.16.03-.23.03-.77-.1-1.36.32-1.94.72-.09.06-.12.23-.18.34-.06.12-.13.25-.2.37-.15-.09-.33-.15-.44-.27-.08-.09-.12-.26-.11-.39.02-.43.05-.87.1-1.3.01-.09.13-.19.22-.25.46-.29.94-.55,1.39-.85.21-.15.38-.16.6-.05.33.17.67.33,1.01.5.89.44,1.76.85,2.15,1.91.35.92.46,1.8.18,2.74-.08.27-.14.6-.07.86.2.77.05,1.53.08,2.29.01.41-.01.82.2,1.21.26.48.41,1.02.66,1.51.46.91.6,1.96,1.26,2.78.05.06.06.15.07.22.11.5.22.99.31,1.49.02.11.02.25-.03.35-.17.32-.19.63-.09.98.03.11-.02.28-.1.38-.38.49-.79.97-1.18,1.46,0-.1.06-.31-.12-.17-.15.11-.19.35-.28.54h0s0,.01,0,.01h0s0,0,0,0h0s0-.03,0-.03ZM39.06,38.36l-.1-.06c-.46.48-.91.95-1.36,1.42.32-.1,1.35-.66,1.39-.8.06-.18.05-.37.07-.56ZM16.09,40.29c.37-.13.82-.23,1.21-.45.28-.15.49-.45.69-.71.11-.15.16-.4-.06-.51-.06-.03-.24.14-.35.24-.21.2-.37.52-.62.61-.64.25-1.32.44-2.01.14-.07-.03-.18,0-.26,0,.05.09.07.25.15.28.39.14.79.25,1.26.4ZM32.39,40.48h0c.32.01.64.04.95,0,.88-.1,1.71-.34,2.42-.91.14-.11.25-.25.36-.38.03-.03.02-.1.03-.16-.07,0-.14,0-.2.03-.05.02-.1.07-.14.11-.62.7-1.44.8-2.31.73-.45-.03-.9-.09-1.36-.09s-.91.05-1.36.1c-.06,0-.16.08-.16.13,0,.08.03.21.09.24.19.09.4.17.61.19.35.03.71,0,1.07,0ZM12.01,41.08c-.17-.25-.34-.5-.5-.76-.03-.05.02-.14.03-.22.07.03.17.04.19.09.14.27.25.55.38.83-.04.02-.07.04-.11.06ZM10.82,43.77c-.04.05-.09.11-.13.17-.01-.04-.04-.08-.03-.11.03-.06.07-.12.11-.18.01.03.03.06.05.11ZM11.98,43.8c-.04.08-.07.14-.1.21-.05-.08-.12-.15-.14-.23-.01-.05.06-.12.09-.18.05.07.09.13.15.21ZM12.97,42.98c-.16.55-.3,1.09-.47,1.63-.02.07-.14.11-.21.16,0-.09-.04-.18-.01-.26.21-.58.33-1.18.24-1.8-.05-.3-.19-.59-.28-.89-.02-.06.03-.14.05-.21.06.03.16.04.19.09.24.38.57.73.38,1.26l.12.02ZM12.07,40.09c.53.1,1,.24,1.37.63.13.14.31.2.34.44,0,.09.13.19.23.24.54.33.73.85.83,1.44.09.53.19,1.05-.05,1.57-.06.12-.14.27-.25.31-.43.15-.86.27-1.3.4-.05.01-.11,0-.17,0,.01-.07,0-.15.04-.2.49-.76.38-1.57.14-2.35-.13-.44-.5-.8-.72-1.21-.2-.38-.5-.75-.45-1.24ZM12.02,45.54c-.05.07-.09.15-.14.23-.01-.04-.05-.09-.04-.12.04-.08.1-.15.16-.22,0,.03.02.07.03.11ZM11.08,45.96c.17-.44.33-.87.5-1.3.04-.09.14-.16.21-.24.04.1.14.2.12.28-.08.32-.16.64-.29.95-.1.23-.3.35-.53.31ZM18.97,19.02s-.05,0-.07.02c-.41.16-.97.12-1.13.7-.02.07-.1.13-.12.2-.12.44-.76.53-.72,1.07.23.07.5-.29.68,0,.19.31-.04.61-.17.89-.03.07-.12.1-.17.16-.75.72-3,2.43-3.13,2.55-.42.36-.86.68-1.29,1.02-.05.04-.11.04-.16.07-.38.27-.79.51-1.13.83-.36.35-2.09,2.26-2.31,3.06-.06.24-.3.42-.37.66-.19.65-.34,1.31-.49,1.97-.05.22-.25.43-.05.68.01.02-.08.1-.09.17-.02.09-.05.19-.04.28.02.15.07.29.11.43.1.4.2.8.31,1.19.03.11.17.21.16.31-.05.44.2.75.4,1.08.19.33.41.64.62.97-.12.02-.18-.01-.22-.07-.25-.35-.47-.73-.74-1.06-.5-.61-.81-1.29-.93-2.07,0-.07-.04-.16-.09-.19-.53-.38-.45-.9-.28-1.44l.21,1.17s.09-.02.13-.02c-.02-.35-.08-.7-.07-1.05.02-.85.07-1.7.12-2.55.04-.66.18-1.29.64-1.81.13-.14.19-.35.3-.51.35-.52.55-1.14,1.15-1.46.12-.06.19-.19.3-.28.45-.41.87-.89,1.37-1.22,1.41-.91,2.59-2.08,3.77-3.25.39-.39.83-.73,1.22-1.12.13-.13.41-.23.26-.52-.15.11-.34.18-.45.32-.33.4-.71.72-1.2.91l.8-.91s-.07-.06-.1-.09c-.52.47-1.05.92-1.54,1.42-.2.21-2.3,1.5-2.65,1.78-.61.49-1.19,1.03-1.79,1.54-.14.12-.29.21-.44.31,0-.16.06-.23.12-.31.27-.34.61-.65.77-1.04.12-.29.29-.49.49-.7.22-.23.41-.48.63-.7.19-.19.03-.27-.09-.35-.22-.15-.39-.02-.52.12-.27.31-.52.65-.78.97-.11.13-.23.29-.38.36-.79.37-1.27,1.03-1.72,1.73-.24.37-.09.98-.71,1.11-.05.01-.07.17-.12.26-.1.19-.17.42-.31.57-.66.7-.77,1.63-.85,2.48-.1,1-.33,2.04.2,3.07.36.71.66,1.44,1.08,2.13.17.27.24.61.34.92.02.05-.04.12-.07.17-.36-.23-.31.3-.55.31.01-.23.1-.49.02-.64-.23-.4-.53-.76-.8-1.14-.1-.15-.21-.3-.26-.46-.19-.6-.42-1.2-.5-1.81-.07-.59-.31-1.17-.15-1.8.13-.48.13-1,.23-1.5.09-.44.18-.89.37-1.29.62-1.28,1.6-2.31,2.41-3.47.29-.42.63-.81.96-1.24-.66-.42-1.31-.82-1.94-1.25-.59-.4-1.14-.85-1.71-1.27-.28-.21-.58-.4-.86-.61-.3-.23-.36-.04-.41.21-.07.33-.14.65-.24.97-.09.32-.22.62-.32.94-.12.4-.05.53.34.54.42.01.84.03,1.25-.02.4-.05.69.09.95.36.06.07.09.16.14.24-.09.03-.17.07-.26.07-.6,0-1.19,0-1.79,0-1.1.02-.82-.17-1.01.97,0,.04,0,.08,0,.12-.01.27.1.4.39.39.6,0,1.19,0,1.79,0,.13,0,.26.06.39.09-.07.16-.11.34-.22.46-.08.08-.25.1-.38.11-.34.01-.68,0-1.01,0q-1.22,0-1.22,1.23c0,.08.03.16.02.24-.02.32.17.4.41.33.36-.11.68-.01,1.01.06-.23.74-.26.61-.79.61-.71,0-.71,0-.77.72-.02.27-.14.63-.01.78.13.16.51.11.77.15-.06.54-.06.55-.53.6-.25.03-.36.12-.32.38.05.29.08.59.1.89.01.21.03.4.32.39.24,0,.28.15.29.35,0,.23-.09.3-.32.32-.09,0-.25.14-.26.22-.01.27.01.54.05.81.06.47.11.53.6.52.33,0,.52.15.65.41.08.16.03.28-.17.28-.26,0-.52,0-.77.02-.07,0-.19.13-.19.19.04.39.05.79.3,1.13.1.14.17.21.38.18.39-.05.79-.03,1.19-.03.44,0,.49.09.29.49-.04.07-.13.15-.2.16-.2.02-.4.01-.6.01-.8,0-.83.03-.78.84.03.55.21.73.76.73.14,0,.28,0,.42,0,.22.01.43.25.41.47-.03.28-.26.18-.42.18-.11,0-.23-.05-.35-.06-.23-.02-.34.09-.29.32.07.31.18.61.21.92.04.38.18.51.58.46.45-.05.91-.03,1.37-.03.26,0,.47.28.43.53-.05.27-.26.25-.47.24-.24-.02-.47-.06-.7-.06-.78.02-.85.13-.57.87.03.07.07.15.11.21.17.23.21.49.22.78.02.52.26.97.61,1.51.05-.34.1-.55.1-.76.01-.67.12-.82.78-.82.27,0,.44-.11.64-.26.48-.37.43-.93.55-1.44.12-.51.01-.9-.45-1.19-.59-.38-.83-1-.99-1.64-.09-.34-.08-.71.08-1.07.13.27.2.55.22.83.04.73.22,1.37.97,1.69.18.08.36.18.51.3.34.27.7.53.79.99.02.13-.04.28-.06.43-.08-.1-.15-.2-.23-.3-.05-.06-.1-.13-.16-.17-.11-.08-.19-.1-.26.07-.16.44-.43.85-.53,1.29-.15.7-.56.96-1.22.93-.08,0-.16.02-.24.01-.17-.01-.18.06-.18.21.02.54.02,1.08.04,1.62,0,.25.22.41.44.26.58-.4,1.15-.82,1.67-1.29.18-.16.16-.53.32-.73.17-.21.5-.29.59-.58.14-.45.41-.87.31-1.37-.05-.29-.1-.57-.15-.86-.04-.22-.03-.47-.14-.64-.26-.41-.59-.78-.88-1.17-.03-.03,0-.1-.01-.15.05,0,.12-.02.16,0,.19.14.39.27.55.45.43.47.8,1,1.26,1.42.51.46.78,1.05,1.07,1.62.13.25.1.58.14.87-.03,0-.07.01-.11.02-.11-.32-.21-.65-.33-.97-.03-.08-.11-.15-.17-.22-.04.08-.09.15-.11.24-.09.35-.17.71-.25,1.06-.05-.72-.09-1.41-.53-2.05-.29.9-.52,1.76-.86,2.57-.18.42-.53.77-.85,1.12-.19.21-.45.36-.68.53-.14.1-.29.21-.44.29-.65.33-.71.21-.22.97.06.1.16.18.23.28.16.22.32.19.49.02.25-.25.47-.54.74-.77.61-.51,1.22-1.01,1.51-1.8.02-.07.15-.1.23-.15.02.09.08.21.04.27-.22.43-.39.91-.72,1.25-.44.45-.82,1.04-1.52,1.18-.02,0-.03.02-.05.03-.22.08-.25.28-.18.44.05.1.24.17.37.18.15.02.32-.03.47-.08.8-.28,1.59-.56,2.41-.79.78-.22,1.51-.64,2.26-.97.11-.05.22-.14.33-.13.62.07,1.04-.35,1.49-.63.31-.19.65-.42.62-.97-.02-.37.06-.7-.24-1-.11-.1-.14-.28-.21-.42-.13-.24-.12-.34.2-.35.17,0,.45-.14.47-.26.05-.23-.05-.49-.09-.74,0-.01-.08-.03-.1-.02-.44.22-.56-.14-.78-.38-.32-.34-.53-.79-1.02-.96-.51-.18-1-.42-1.5-.63-.36-.15-.62-.37-.75-.76-.14-.41-.28-.82-.47-1.21-.16-.34-.27-.67-.16-1.03.05-.16.03-.21-.13-.22-.05,0-.08-.1-.13-.15.06,0,.13,0,.19,0,.11,0,.23-.02.35-.03-.07-.09-.15-.17-.22-.26-.29-.31-.64-.53-.61-1.06.04-.59.17-1.14.46-1.64.26-.46.58-.89.86-1.34.2-.32.43-.64.54-.99.14-.45.35-.81.69-1.15.27-.28.34-.74.7-.97.17-.68.76-1.05,1.19-1.53.44-.49,1.03-.83,1.31-1.48.1-.23.27-.47.47-.61.83-.59,1.25-1.45,1.61-2.34.4-.98.7-2,.6-3.09-.02-.22-.14-.42-.3-.42h0ZM26.8,48.01c-.5-.18-1.01-.32-1.48-.54-.5-.22-.97-.51-1.45-.77-.07-.04-.16-.07-.19-.13-.08-.14-.21-.33-.17-.44.09-.23.33-.27.55-.14.39.22.78.46,1.17.69.5.29,1.01.58,1.52.87.05.03.12.03.16.06.08.07.14.16.21.24-.1.05-.19.1-.32.16ZM27.48,47.98c.42-.03.83-.07,1.25-.1.04,0,.09.05.14.07-.03.04-.07.12-.1.12-.42,0-.85,0-1.27,0l-.02-.1ZM30.48,48.85c-.59.4-1.26.14-1.89.19-.05,0-.13-.13-.15-.21,0-.03.1-.14.15-.14.64,0,1.27,0,1.91,0,0,.05,0,.1-.01.15ZM29.68,50.62c-.09.03-.18.1-.26.09-.53-.03-1.07-.02-1.58-.14-.67-.16-1.32-.42-1.97-.66-.27-.1-.53-.24-.79-.39-.07-.04-.15-.21-.12-.24.06-.08.19-.18.28-.17.25.05.49.14.73.23.93.37,1.85.76,2.79,1.1.28.1.6.05.91.07,0,.03,0,.06,0,.1ZM41.28,41.26l-.02-.16c.35-.35.73-.59,1.29-.56.85.05,1.71.02,2.56.01.35,0,.55-.19.57-.52,0-.11-.04-.24-.02-.35.18-.77.18-.77-.57-.77-.18,0-.36,0-.54,0-.22,0-.44,0-.65-.02-.04,0-.11-.14-.1-.15.17-.2.24-.52.59-.52s.71-.02,1.06,0c.54.02.8-.15.93-.66.18-.71,0-.92-.75-.84-.06,0-.14.04-.17.02-.07-.06-.18-.15-.17-.21.06-.39.23-.5.72-.52.7-.02.81-.15.75-.84,0-.12-.07-.24-.04-.35.08-.28-.08-.29-.28-.3-.13-.01-.35.09-.34-.18,0-.22.03-.45.33-.47.06,0,.12-.03.18-.02.31,0,.44-.13.4-.44-.01-.1.02-.2.01-.3,0-.25.04-.54-.07-.75-.06-.11-.39-.06-.6-.1-.27-.05-.25-.28-.25-.46,0-.08.11-.19.19-.21.26-.05.64.02.77-.13.14-.16.05-.52.06-.79,0-.12.02-.24.03-.36.02-.23-.08-.33-.31-.32-.22,0-.44,0-.66,0-.32-.01-.45-.15-.46-.47,0-.33.26-.23.43-.25.22-.02.44.02.65.02.33,0,.38-.08.33-.39-.04-.25-.09-.5-.08-.75,0-.43.02-.45-.39-.46-.38-.01-.76,0-1.13,0-.34,0-.52-.19-.48-.51.03-.28.28-.12.43-.16.15-.04.31,0,.47,0,1.04.03,1.14-.09.91-1.14-.03-.16-.04-.32-.1-.46-.03-.08-.16-.16-.25-.16-.55,0-1.1.03-1.65.03-.39,0-.44-.07-.46-.44-.02-.38.25-.29.44-.29.5-.02.99-.01,1.49-.05.12,0,.34-.16.34-.22-.03-.33-.13-.65-.2-.97-.04-.19-.17-.25-.35-.25-.12,0-.24,0-.36,0-.48,0-.95,0-1.43,0-.29,0-.28-.24-.32-.42-.05-.26.16-.23.31-.23.34-.01.68-.03,1.01-.01,1.1.06,1.19-.05.82-1.12-.15-.42-.26-.49-.68-.47-.39.01-.78,0-1.18,0q.13-.66.57-.67c.95-.01,1.01-.09.7-1,0-.02-.02-.04-.02-.05-.19-.49-.27-.54-.83-.47-.06,0-.12.01-.18,0-.26,0-.5-.28-.47-.57.03-.28.27-.14.43-.17.08-.02.16,0,.24,0,.27.02.36-.1.28-.35-.03-.11-.09-.22-.13-.33-.25-.62-.56-1.14-1.38-.93-.26.07-.36-.12-.36-.34,0-.22.09-.34.36-.33.64.02.71-.1.5-.71-.03-.09-.07-.19-.11-.27-.36-.7-.73-1.4-1.09-2.1-.14-.28-.33-.56-.4-.86-.1-.47-.43-.63-.8-.81-.2-.1-.32-.04-.31.18.03.71.05,1.43.13,2.13.06.57.22,1.12.32,1.69.05.32-.1.51-.36.48-.25-.02-.38-.18-.44-.41-.06-.25-.16-.49-.23-.73-.21-.7-.44-1.39-.62-2.1-.17-.68-.52-1.33-.48-2.06,0-.04-.03-.07-.04-.11-.12-.52-.27-1.03-.35-1.55-.05-.32-.23-.44-.49-.51-.21-.06-.28.09-.25.22.18.82.36,1.65.57,2.46.11.43.29.84.28,1.31,0,.23.08.47.18.69.46,1.03.97,2.03,1.38,3.08.27.69.83,1.24.94,2,.01.07.08.14.14.19.45.37.55.95.64,1.43.16.79.24,1.65-.32,2.39-.08.11-.07.33-.03.48.21.74.46,1.47.67,2.21.27.95.47,1.91.78,2.85.3.9.71,1.77,1.03,2.66.17.46.34.96.35,1.44,0,.98.03,1.96-.22,2.92-.11.42-.2.87-.41,1.23-.58.98-1.17,1.95-1.88,2.84-.44.55-1.01.94-1.61,1.31.27-.35.54-.71.81-1.06-.04-.03-.07-.06-.11-.09-.17.13-.34.26-.5.4-.27.25-.56.47-.9.65-.69.37-1.34.82-2,1.24-.04.02-.04.09-.12.25.55-.26,1-.46,1.44-.67-.05.2-.15.35-.29.44-.61.36-1.21.76-1.86,1.04-.73.33-1.51.59-2.32.64-.58.03-.6.02-.72.57-.03.15-.05.32-.04.47,0,.52-.05,1.02-.3,1.49-.12.23-.08.45.05.68.21.36.3.73.06,1.12-.21.34-.21.64.06.97.22.27.3.56.03.91-.3.38-.07.84.42.88.21.02.3.08.4.26.16.27.38.51.59.74.08.09.23.14.35.18.43.15.87.26,1.28.43.38.16.75.56,1.08.51.33-.05.59-.52.87-.81.02-.02.02-.06.06-.19-.65.08-1.25.05-1.56-.65.27-.02.55-.07.82-.07.44,0,.87.07,1.3.06.17,0,.39-.08.51-.21.3-.3.56-.64.82-.97.11-.13.19-.29.29-.43-.18-.04-.36-.08-.55-.11-.08-.01-.16,0-.24,0-.93,0-1.85,0-2.78,0-.55,0-1.1,0-1.65,0-.18,0-.36-.04-.52-.1-.1-.04-.24-.18-.22-.23.03-.11.15-.26.25-.28.31-.07.63-.1.94-.11.87-.01,1.75-.02,2.62,0,.85.02,1.7.07,2.55.1.07,0,.17-.03.2-.08.25-.44.49-.9.74-1.34.15-.26.02-.3-.2-.3-.83,0-1.67,0-2.5,0-1.42,0-2.85,0-4.27,0-.2,0-.45,0-.48-.24-.03-.24.17-.38.41-.42.08-.01.16-.03.24-.03.77,0,1.55-.02,2.32-.02,1.55,0,3.1.01,4.65.02.36,0,.6-.12.69-.5.05-.21.18-.39.28-.59.23-.47.23-.48-.32-.48-.74,0-1.47,0-2.21,0-1.67,0-3.33,0-5,0-.13,0-.26-.1-.38-.16.09-.11.18-.24.28-.34.05-.05.15-.06.23-.06.67-.06,1.33-.15,2-.16,1.57-.01,3.14.02,4.7.03q1.29,0,1.71-1.23s.02-.08.04-.11c.09-.19,0-.25-.17-.26-.45-.01-.9-.04-1.36-.04-.74,0-1.48,0-2.22,0ZM25.64,51.11c.62.02,1.14.32,1.65.65.03.02.05.09.04.1-.03.04-.08.08-.12.08-.08,0-.17.02-.23-.01-.46-.23-.93-.47-1.39-.7.02-.04.04-.08.06-.12ZM29.03,3.66c-.02-.06.91-1.08,1.5-.89.51.17.91.29,1.72.51.26.07.51.2.77.31.31.13.6.33.93.39.49.1.91.32,1.33.57,1.11.67,2.25,1.3,3.35,1.99.34.21.6.56.9.83.88.81,1.79,1.59,2.39,2.66.17.3.46.55.68.82.88,1.08,1.6,2.26,2.15,3.54.24.56.56,1.09.77,1.66.26.67.43,1.38.65,2.06.21.66.45,1.3.63,1.96.22.83.4,1.68.58,2.52.13.64.23,1.29.35,1.93.26,1.45.33,2.9.28,4.37-.04,1.24,0,2.48-.05,3.72-.04.95-.13,1.9-.28,2.83-.16.99-.4,1.98-.65,2.95-.28,1.08-.58,2.16-.94,3.22-.33.95-.76,1.86-1.17,2.78-.32.73-.67,1.45-1.03,2.16-.1.2-.31.35-.42.55-.3.5-.54,1.04-.88,1.51-.48.66-1,1.28-1.61,1.83-.48.43-.95.89-1.39,1.36-.64.69-1.39,1.22-2.14,1.77-.88.64-1.88,1.08-2.81,1.62-.54.31-1.15.5-1.74.71-.31.11-.41.01-.39-.3.01-.19.09-.38.11-.58.05-.84.08-1.69.13-2.53.02-.29-.18-.25-.3-.19-.83.44-1.74.16-2.6.32-.09.02-.22-.07-.32-.12-.18-.1-.18-.23.01-.28.39-.11.8-.18,1.2-.27.28-.07.57-.14.85-.23.37-.12.74-.26,1.11-.41.24-.09,1.29-.67,1.3-.94.02-.5-.42-1.07-1.54-.12-.36.3-.92.21-1.38.31-.07.01-.15-.02-.22-.03.05-.07.08-.18.15-.21.46-.22.93-.44,1.41-.62.66-.25,1.19-.49,1.18-1.15,0-.21-.12-.46-.27-.61-.18-.17-.87.04-1.1.2-.19.13-.42.21-.63.31-.03-.03-.06-.06-.08-.09.12-.17.23-.35.4-.6-.92.1-1.77.19-2.61.28l-.03-.17c.25-.05.51-.15.76-.15.73.02,1.41-.16,2.06-.45.31-.13.62-.26.91-.43.18-.1.38-.25.47-.42.07-.14.06-.4-.03-.54-.12-.17-.32-.14-.53-.01-.56.36-1.12.74-1.73,1.01-.55.24-1.11.55-1.79.41-.46-.1-.95-.02-1.43-.04-.08,0-.16-.12-.24-.18.08-.04.17-.13.24-.12.93.09,1.8-.17,2.68-.37.83-.19,1.57-.61,2.25-1.12.11-.08.23-.15.32-.25.18-.22.44-.45.49-.71.11-.56.12-1.14.15-1.71,0-.09-.1-.18-.15-.28-.09.08-.21.15-.27.25-.04.07,0,.19,0,.29-.02.37-.06.72-.3,1.05-.68.92-1.58,1.38-2.71,1.47-1.06.08-2.04-.09-2.99-.56-1.23-.6-2.49-1.14-3.74-1.69-.32-.15-.66-.26-.98-.41-1.11-.55-1.75-1.43-1.95-2.66-.12-.72-.21-1.48-.51-2.12-.46-.97-.49-2-.66-3.01-.1-.58-.1-1.17-.15-1.76-.01-.14,0-.28-.04-.41-.03-.12-.12-.22-.18-.33-.04.12-.1.24-.1.35-.04.83.05,1.63.23,2.45.16.7.1,1.45.23,2.16.13.72.39,1.41.58,2.12.07.24.09.49.13.74-.22-.11-.46-.19-.65-.34-.19-.14-.32-.35-.48-.52-.34-.35-.64-.39-.97-.04-.32.34-.6.74-.86,1.13-.14.21.11.9.37,1.12.07.06.17.1.22.18.35.52,4.67,6.36,5.55,7.61.4.56.6,1.21.53,1.94-.11,1.34-.16,2.68-.25,4.02-.04.54-.12,1.08-.19,1.62,0,.05-.13.14-.2.13-.29-.02-.59-.06-.88-.09-.76-.09-1.53-.15-2.24-.48-.05-.02-.12-.02-.18-.03-.39-.05-.79-.08-1.12-.34-.06-.05-.15-.05-.23-.07-1.32-.3-2.54-.86-3.74-1.45-1.08-.53-2.13-1.14-3.11-1.83-1.05-.73-2.01-1.59-2.79-2.62-.52-.67-1.1-1.3-1.58-1.99-.6-.86-1.15-1.75-1.66-2.66-.41-.74-.77-1.52-1.08-2.3-.27-.68-.45-1.4-.68-2.11-.18-.56-.32-1.14-.55-1.68-.17-.41-.13-.86-.28-1.26-.43-1.12-.5-2.32-.73-3.48-.25-1.25-.31-2.52-.29-3.79.03-1.44-.02-2.88.05-4.32.05-1.04.2-2.08.36-3.11.14-.88.34-1.75.57-2.61.28-1.08.58-2.16.93-3.22.27-.8.64-1.57.97-2.35.21-.49.4-.98.66-1.45.3-.54.54-1.11.94-1.6.3-.38.5-.84.74-1.27.49-.88,1.2-1.57,1.91-2.27.43-.43.85-.87,1.31-1.28.66-.59,1.32-1.18,2.03-1.7.61-.45,1.28-.85,1.95-1.2,1.22-.63,2.45-1.25,3.81-1.57.73-.17,1.44-.42,2.17-.62.32-.09,1.04-.23,1.38-.26.62-.06.07.96,0,1.48-.02.19-.09.38-.15.57-.22.7-2.39,3.63-3.18,4.29-.34.28-.56.7-.83,1.06-.04.05-.04.15-.03.22.09.4.65.58,1.06.58,1.1,0,5.48-2.89,6.12-3.33,1.07-.75,3.46-2.98,4.02-3.53ZM26.49,58.52c1.29.1,2.35-.29,3.44-.49.75-.14,1.4-.65,2.2-.59.04,0,.08-.02.11-.03,1.09-.45,2.17-.95,3.28-1.33,1.03-.35,1.82-1.07,2.73-1.61.51-.3.96-.7,1.42-1.07.32-.26.64-.52.93-.82.39-.39.83-.77,1.1-1.24.22-.37.49-.66.79-.94.17-.16.33-.34.48-.53.41-.54.79-1.12,1.23-1.63.68-.79,1.01-1.77,1.5-2.67.53-.97.78-2.06,1.33-3.02.05-.08.07-.19.1-.28.24-.73.46-1.46.71-2.19.38-1.1.63-2.25.88-3.39.17-.82.26-1.65.24-2.5-.01-.5.17-1,.2-1.51.04-.77-.05-1.56.06-2.32.15-1.03.04-2.05-.03-3.07-.07-1.01-.18-2.01-.27-3.02-.04-.47-.09-.95-.15-1.42-.15-1.06-.42-2.08-.75-3.1-.14-.45-.26-.91-.4-1.36-.15-.44-.35-.87-.48-1.32-.38-1.34-.97-2.6-1.63-3.81-.5-.91-1.08-1.8-1.73-2.62-.49-.61-.9-1.28-1.41-1.88-.37-.43-.69-.88-1.13-1.27-.67-.6-1.23-1.34-2-1.83-1.15-.73-2.18-1.64-3.47-2.16-.22-.09-.4-.25-.61-.36-.21-.11-.41-.23-.63-.31-.41-.15-.85-.25-1.25-.43-1.21-.55-2.46-.96-3.79-1.09-.26-.03-.51-.18-.78-.2-.86-.09-1.72-.19-2.59-.22-1.12-.04-2.25-.05-3.36.01-.65.04-1.29.2-1.92.38-1.12.33-2.27.6-3.37,1.02-.88.34-1.75.74-2.64,1.02-1.08.34-1.91,1.08-2.84,1.64-.62.38-1.19.85-1.78,1.28-.08.06-.17.12-.22.2-.5.73-1.3,1.22-1.67,2.06-.02.05-.07.1-.11.14-.53.37-.93.85-1.27,1.4-.15.25-.28.54-.49.73-.56.5-.91,1.14-1.27,1.77-.16.29-.23.62-.37.93-.36.76-.74,1.52-1.09,2.29-.08.17-.05.42-.16.56-.32.41-.44.88-.57,1.36-.11.4-.18.82-.35,1.19-.54,1.24-.81,2.56-1.1,3.87-.18.82-.26,1.65-.25,2.5,0,.5-.17,1.01-.2,1.51-.04.77.05,1.56-.06,2.32-.15,1.01-.03,2.01.03,3.01.05.73.19,1.46.22,2.19.07,1.85.37,3.65.95,5.41.14.43.23.87.38,1.3.17.52.38,1.03.56,1.54.17.48.29.99.52,1.45.56,1.14,1.13,2.26,1.76,3.36.34.6.79,1.13,1.2,1.69.15.2.37.35.51.56.44.61.85,1.23,1.28,1.84.08.11.2.19.31.28.13.12.25.24.38.36.5.48.97.99,1.51,1.42.59.47,1.22.87,1.85,1.29.53.35,1.07.67,1.62.99.3.18.62.32.93.48.23.12.44.27.68.36.38.14.79.2,1.15.37,1.15.53,2.33.96,3.6,1.09.48.05.95.19,1.43.27.43.07.86.11,1.29.15.67.06,1.34.14,2.01.15.47,0,.95-.09,1.26-.12ZM23.09,0c1.53.03,3.02.03,4.5.1.5.02.99.22,1.49.32,1.02.21,2.06.37,3.07.62.72.18,1.42.45,2.12.73.72.29,1.5.52,2.11.97.65.48,1.57.53,2.01,1.3.04.06.16.08.24.11.07.02.19,0,.22.05.36.62,1.12.71,1.58,1.21.86.95,1.85,1.78,2.67,2.76.71.83,1.28,1.78,1.88,2.69.63.96,1.23,1.95,1.84,2.92.04.07.07.14.1.22.27.61.49,1.25.81,1.83.31.56.33,1.2.58,1.77.09.22.16.45.23.67.1.3.19.59.28.89.02.06,0,.12.02.18.18.6.37,1.19.53,1.79.17.66.32,1.32.34,2.02,0,.5.14.99.21,1.49.01.08.06.16.04.23-.12.63.08,1.24.1,1.86.02.56.15,1.11.19,1.67.03.45-.01.91-.01,1.36,0,1.07-.07,2.13-.23,3.18-.09.58-.09,1.18-.13,1.77-.05.74-.14,1.48-.33,2.21-.23.89-.38,1.81-.6,2.71-.1.41-.33.79-.4,1.21-.21,1.14-.79,2.16-1.08,3.28-.09.35-.35.65-.51.98-.3.62-.6,1.24-.9,1.86-.62,1.27-1.48,2.38-2.37,3.46-.43.53-.83,1.09-1.24,1.63-.38.49-.84.91-1.32,1.3-.13.1-.24.24-.37.35-.41.36-.83.71-1.25,1.06-.28.24-.57.48-.87.69-.33.23-.68.44-1.05.63-.54.28-1.09.52-1.64.79-.17.08-.33.2-.51.26-.71.22-1.38.52-2.04.86-.17.09-.38.11-.56.17-.34.11-.67.21-1.01.33-.09.03-.18.11-.27.11-.69,0-1.29.37-1.93.5-.88.19-1.79.28-2.7.34-1,.06-2.01.03-3.02.02-.91-.01-1.8-.19-2.68-.37-.83-.17-1.66-.3-2.48-.47-.46-.1-.92-.23-1.36-.38-.72-.25-1.45-.47-2.12-.81-.62-.31-1.3-.54-1.84-1.01-.11-.1-.29-.13-.44-.18-.4-.13-.77-.32-1-.7-.02-.03-.05-.08-.08-.09-.46-.1-.7-.56-1.08-.71-.45-.18-.77-.48-1.11-.78-.48-.44-.94-.9-1.39-1.39-.53-.58-1.03-1.18-1.54-1.78-1.05-1.25-1.92-2.63-2.74-4.04-.42-.73-.89-1.44-1.1-2.28-.07-.28-.31-.51-.41-.78-.22-.6-.41-1.21-.61-1.82-.09-.26-.19-.52-.29-.78-.07-.2-.13-.41-.2-.61-.09-.3-.19-.6-.28-.9-.01-.04-.05-.07-.05-.1-.03-1.1-.7-2.09-.55-3.22-.27-.43-.18-.91-.21-1.38-.02-.27-.02-.54-.04-.81,0-.13-.02-.27-.04-.4-.09-.64-.23-1.27-.27-1.91-.04-.74.02-1.48,0-2.23-.02-1.01.09-2.01.22-3.01.09-.66.04-1.34.11-2,.07-.64.21-1.27.34-1.91.19-.93.38-1.85.6-2.77.09-.37.24-.73.36-1.1.02-.06.07-.1.07-.16.16-1.16.8-2.16,1.06-3.28.08-.33.33-.61.49-.93.52-1.02.98-2.07,1.57-3.04.49-.81,1.13-1.52,1.7-2.27.41-.55.8-1.11,1.24-1.63.32-.38.63-.77,1.06-1.07.52-.36.95-.84,1.43-1.26.69-.6,1.41-1.17,2.19-1.64.5-.3,1.05-.52,1.59-.77.94-.42,1.88-.84,2.83-1.25.29-.12.6-.16.9-.25.94-.28,1.87-.62,2.82-.85.82-.19,1.66-.25,2.46-.36Z\"/>\n  </g>\n</svg>",
    3: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50.33 59.47\">\n  <g>\n    <path class=\"cls-1\" d=\"M31.62,4.24c-.49-.2-.89-.36-1.29-.52-.07-.03-.15-.07-.22-.08-1.41-.16-2.82-.36-4.23-.47-.99-.07-1.98.02-2.97-.03-1.01-.05-1.86.64-2.87.51-.03,0-.07.03-.11.05-.25.09-.51.18-.76.28-.13.05-.24.12-.36.18.01.02.02.05.04.07h12.77ZM31.04,8.42c.18.06.27.1.36.13.1.04.2.07.29.11-.04.04-.07.12-.11.12-.14.02-.26.26-.41.04-.06-.09-.13-.18-.18-.28-.02-.04.03-.1.04-.12ZM32.99,9.92s0,0,0,0c0,0,0,0,0,0,0,0,0,0,0,0ZM33,9.92s0,0,0,0h0s0,0,0,0ZM32.99,9.92c-.07.04-.14.09-.22.13-.06.03-.12.03-.18.05-.01-.07-.05-.15-.03-.21.01-.04.11-.07.17-.06.09.01.17.06.26.09ZM16.65,11.35c-.14.17-.27.35-.42.51-.03.03-.15-.01-.22-.02.02-.06.02-.14.06-.19.14-.15.29-.29.43-.44.05.05.1.09.15.14ZM33.44,19.25c-.22.11-.42.26-.48.22-.14-.1-.22-.28-.3-.44-.01-.03.15-.19.17-.17.18.1.35.22.61.4ZM31.67,19.47c.26-.14.38-.26.49-.26.08,0,.16.16.25.25-.07.03-.13.09-.2.08-.14,0-.27-.03-.54-.07ZM31.56,18.63c-.4.15-.81.28-1.19.46-.3.14-.57.35-.87.48-.21.1-.46.12-.69.18-.66.18-1.33.36-1.99.53-.38.1-.71-.02-.98-.28-.1-.09-.17-.28-.15-.41.01-.09.19-.2.31-.22.25-.04.52,0,.77-.04.59-.06,1.18-.13,1.76-.22.17-.03.33-.11.48-.19.09-.05.14-.15.21-.24-.09.04-.18.08-.27.11-.37.11-.73.33-1.12.09-.22-.13-.22-.27,0-.39.14-.07.31-.09.44-.18.28-.19.58.19.89-.08.21-.18.51-.32.78-.34.43-.02.86.08,1.29.12.26.03.49.26.78.07.05-.04.2.01.27.07.1.08.18.2.26.3-.11.07-.21.17-.33.19-.21.04-.43.04-.64.06,0-.03-.02-.06-.03-.09ZM29.47,21.54c.11-.06,0-.15.07-.19-.09-.05-.35-.05-.44-.06-.1,0-.14.22-.25.25.1.06.51-.07.61,0ZM30.17,21.27c-.09.07-.2.12-.21.18-.03.21-.15.24-.34.23-.19,0-.78-.02-.97,0-.09.01-.27.15-.36.19.07.09.6.16.69.21.09.05.22.05.34.06.51.05,1.02.09,1.44.42.09.07.21.1.33.14.2.07.3-.03.35-.21.08-.27-.06-.53-.32-.66-.19-.1-.36-.23-.54-.34-.13-.08-.27-.15-.42-.23ZM18.31,22.74c.7.04,1.31.09,1.93.12.12,0,.32-.06.34-.12.03-.11-.03-.31-.12-.37-.15-.11-.37-.22-.53-.19-.53.09-1.11.04-1.62.57ZM33,9.92c-.09-.22-.11-.51-.5-.35-.06.03-.2-.1-.28-.17-.02-.02.02-.15.06-.17.28-.14.27-.13.08-.32-.18-.18-.34-.37-.45-.63.26.2.53.37.76.6.64.61,1.35,1.16,1.85,1.92.52.79.92,1.63,1.23,2.52.09.24.14.49.23.73.37,1.02.33,2.1.43,3.15.03.35.08.7.11,1.05.05.45.09.91.13,1.36,0,.06,0,.12,0,.18-.02.36-.46.63-.08,1.1.2.25.08.76.13,1.16.04.36.11.72-.34.9-.06.02-.1.11-.15.18-.29.38-.48.37-.62-.1-.2-.68-.33-1.38-.5-2.07-.04-.17-.06-.38-.17-.48-.26-.23-.17-.44-.01-.62.17-.19.19-.36.11-.59-.04-.12-.02-.27-.01-.41,0-.06.06-.15.04-.17-.59-.61.04-1.18.05-1.76,0-.28-.17-.63-.45-.65-.31-.03-.3-.19-.27-.4,0-.08,0-.17.05-.23.26-.34.23-.65.07-1.04-.15-.36-.31-.67-.68-.83-.05-.02-.11-.06-.15-.1-.11-.11-.21-.23.07-.25.2,0,.33-.06.16-.27-.19-.24-.06-.54.05-.66.37-.43.07-.73-.11-1.07-.04-.07-.1-.12-.16-.17-.15-.14-.21-.26-.08-.46.06-.08.06-.28,0-.34-.06-.07-.23-.04-.35-.05-.07,0-.14-.01-.21-.02.02-.05.04-.11.07-.15.12-.16.14-.28-.1-.32ZM15.37,22.87s-.08-.07-.12-.1c-.13.13-.26.28-.4.4-.13.11-.11.21.01.27.08.04.26.02.29-.03.1-.16.15-.35.22-.53ZM37.19,23.98c.08-.09.16-.2.24-.3-.04-.02-.11-.07-.12-.06-.09.09-.18.2-.26.3.03.02.07.03.14.06ZM14.95,23.82c-.1-.05-.16-.11-.22-.11-.06,0-.12.07-.18.1.06.06.11.15.19.18.03.01.11-.09.21-.18ZM31.79,24.5c-.11-.14-.19-.23-.27-.33.11-.06.21-.16.32-.18.07,0,.16.11.24.18-.08.1-.17.19-.28.33ZM29.99,20.9c.84.13,1.62.24,2.4.39.67.13.98.71,1.32,1.21.07.1-.05.43-.18.56-.15.15-.41.26-.61.26-.34,0-.54.09-.72.38-.12.19-.74.2-.88.02-.1-.13-.12-.18-.28-.09-.62.36-1.3.17-1.95.21-.18.01-.37.05-.55.09-.03,0-.02.14-.03.21.06-.02.13-.02.18-.05.26-.17.25-.17.37.11.03.07.13.12.2.14.28.1.57.17.84.28.11.05.23.16.27.27.07.2-.09.33-.3.26-.35-.13-.71-.26-1.05-.41-.33-.14-.64-.27-.99-.04-.08.05-.32-.04-.4-.14-.17-.21-.38-.2-.59-.18-.07,0-.19.13-.18.17.05.16.14.33-.14.31-.26-.02-.58.16-.75-.16-.04-.08,0-.3.07-.34.19-.11.17-.23.11-.4-.12-.35-.22-.72-.36-1.06-.04-.1-.16-.16-.25-.24-.09-.09-.37-.11-.13-.32.12-.11.26-.39.44-.04.03.07.1.14.16.15.08.01.19-.02.26-.06.02-.02,0-.16-.03-.2-.29-.34-.59-.67-.88-1.02-.1-.12-.19-.25-.29-.4.38-.12.69-.08,1.05.03.64.21,1.28,0,1.91-.18,1.03-.29,2.04-.69,3.12-.78.1,0,.21-.05.28-.02.1.04.17.15.25.22-.07.06-.14.12-.2.19-.04.04-.08.08-.19.22.38-.04.66-.08.94-.08.09,0,.18.11.28.17-.09.04-.18.14-.26.13-.49-.07-1.01.11-1.47-.23-.09-.07-.31-.02-.43.05-.14.08-.23.24-.38.4ZM13.01,26.32h0s.02.01.02.01c0,0-.01,0-.02-.01ZM13.02,26.33s0,0,0,.01l-.02-.02s0,0,.01,0ZM37.58,26.68c-.06.66-.08,1.13-.15,1.59-.03.23-.15.45-.26.66-.04.08-.17.12-.26.19-.04-.11-.11-.22-.1-.32.04-.23.11-.46.18-.68.19-.59.11-.76-.44-1.09-.45-.27-.53-.77-.64-1.22-.01-.05.18-.22.27-.22.36.01.71.13.95.42.21.25.56.45.44.68ZM37.33,24.64c-.25.02-.67.12-1.07-.11-.18-.1-.27-.18-.13-.35.28-.32.57-.64.88-.94.12-.13.29-.21.42-.33.5-.42,1.1-.36,1.46.17.32.46.54.92.42,1.54-.17.95-.16,1.93-.35,2.87-.14.71-.46,1.39-.72,2.08-.04.1-.19.17-.3.25-.03-.14-.12-.29-.09-.41.2-.84.45-1.67.64-2.52.11-.5.14-1.01.19-1.52.01-.12,0-.25-.05-.35-.03-.07-.14-.15-.2-.14-.06,0-.15.13-.15.2,0,.14.05.27.09.4.03.11.12.23.11.33-.01.11-.11.22-.17.33-.08-.08-.22-.16-.22-.24.02-.29-.24-.52-.11-.86.11-.3-.1-.44-.67-.41ZM34.68,31.91c-.06-.2-.12-.29-.1-.35.04-.11.13-.2.2-.3.05.08.14.16.13.23-.02.11-.11.21-.23.42ZM35.74,28c.11.52,0,1.04-.07,1.55-.03.18-.09.29.08.46.19.2.31.48.42.74.03.07-.04.22-.11.29-.06.05-.19.03-.28.05-.39.07-.38.07-.28.49.04.16.03.35-.02.5-.02.05-.25.06-.37.02-.06-.02-.1-.21-.07-.3.2-.62.08-1.29.37-1.9.12-.25-.01-.61.02-.91.04-.34.13-.67.2-1.01.04,0,.08.01.12.02ZM13.01,26.32c.03.3.05.6.11.9.02.1.14.22.24.25.34.09.4.16.34.5-.07.39-.13.77-.19,1.16-.05.27.02.49.19.72.24.34.43.71.62,1.07.04.08.05.25,0,.31-.07.07-.25.11-.32.06-.29-.2-.75-.18-.84-.65,0-.05-.11-.08-.17-.12-.03.08-.1.19-.07.25.22.49.45.96.68,1.44.04.09.14.19.12.26-.03.12-.14.22-.21.32-.06-.06-.14-.12-.18-.19-.53-.8-1.07-1.61-1.59-2.42-.33-.51-.74-1-.95-1.57-.35-.97-.54-1.98-.02-2.98.09-.18.2-.25.4-.27.7-.08,1.24.15,1.63.74.06.09.15.14.23.21ZM29.88,34.03c-.04.31-.28.32-.29.31-.05-.03.01-.27-.03-.31.05-.02.09-.07.14-.07.05,0,.1.04.18.07ZM31.77,30.97c.53.74.26,1.56.29,2.35,0,.25-.03.51-.06.77-.02.2-.02.41-.09.58-.06.14-.23.23-.35.34-.05-.14-.16-.29-.15-.42.07-.54.2-1.08.26-1.63.04-.4.02-.82-.03-1.23-.04-.28-.12-.54.13-.76ZM20.43,34.34c0-.49-.19-.71-.58-.73-.21-.01-.3.07-.23.28.08.2.17.4.27.59.11.21.24.42.36.63.06-.24.12-.47.18-.71,0-.02,0-.04,0-.06ZM27.05,34.61c.32.21.63.4.93.61.04.03.01.14.02.21-.07,0-.14,0-.2-.02-.27-.11-.53-.23-.79-.36-.07-.04-.12-.14-.14-.23,0-.04.08-.1.18-.21ZM33.46,35.82c-.06.13-.12.26-.2.38-.01.02-.07.03-.1.04-.01-.05-.06-.11-.04-.13.07-.12.17-.23.25-.35.03.02.06.04.09.06ZM16.49,28.13c.07,0,.13-.01.2-.02.05.2.12.41.14.61.04.39.06.78.07,1.18.01.48,0,.96,0,1.44-.01.62-.02.62.63.82.05.01.1.07.11.11.04.13.07.27.1.4.23,1.07.16,2.21.74,3.2.03.05.03.12.04.17.04.69.57.89,1.11,1.06.17.05.38-.02.57-.06.05-.01.12-.11.12-.17.01-.21.02-.42,0-.62-.03-.26-.08-.55-.37-.63-.45-.12-.62-.49-.74-.86-.17-.51-.29-1.03-.41-1.55-.04-.19-.08-.41-.03-.59.28-.93.56-1.85.89-2.76.27-.74.62-1.46.92-2.19.08-.2.13-.43.11-.64-.02-.24.05-.4.18-.59.17-.24.25-.53.35-.81.09-.26-.01-.45-.25-.5-.25-.05-.37.06-.39.31-.02.2-.03.4-.08.59-.07.25-.23.3-.44.16-.31-.21-.64-.41-.92-.66-.28-.25-.51-.28-.84-.07-.23.15-.48.33-.94.21.65-.33,1.19-.6,1.72-.88.07-.04.12-.1.18-.16-.09-.03-.18-.11-.26-.1-.54.11-1.01.37-1.49.61-.19.1-.38.21-.58.3-.29.13-.46-.11-.65-.25-.2-.15-.14-.35-.06-.54.08-.2.2-.4.23-.61.02-.09-.1-.28-.19-.31-.09-.03-.23.08-.33.16-.05.04-.03.15-.05.23-.18.77-.27,1.56-.71,2.25-.09.14,0,.56.11.62.31.16.3.38.3.64,0,1.11.36,2.17.54,3.25.04.21.15.38.39.38.06,0,.18-.09.18-.13-.06-.7-.15-1.39-.21-2.09-.02-.3.02-.61.03-.91ZM29.91,35.72c.75.16,1.21.64,1.65,1.13.07.08.03.25.05.37-.11-.03-.24-.03-.34-.09-.1-.06-.17-.16-.25-.25-.36-.38-.71-.76-1.1-1.17ZM22.2,36.67s-.08.01-.08.02c-.02.17-.05.35-.06.52,0,.02.13.09.17.07.25-.13.04-.21-.03-.32-.02-.03.04-.11.04-.16,0-.04-.02-.09-.04-.13ZM31.95,39.9c-.42.25-.83.5-1.25.74.01.05.03.1.04.15.18,0,.36.02.54.03,0-.49.52-.55.71-.89.4-.24.85-.42,1.06-.88-.47.15-.92.33-1.1.84ZM35.67,47.69c-.04-.15-.08-.91-.2-1.06-.25-.33-1.38-.47-1.66-.2-.16.15-.46.33-.34.61.22.48.48.94.76,1.39.17.27.69.31,1.03.14.41-.21.52-.44.41-.87ZM16.79,50c.05.17-.11.54.26.45.39-.1.62.02.87.29.14.16.36.22.6.11.42-.2.6-.26.5-.96-.08-.53-.51-.73-.85-1-.25-.19-.52,0-.7.24-.02.03-.07.04-.1.06-.48.18-.58.32-.58.81ZM36.47,51.27c.52,0,.52,0,.71-.53.03-.09.08-.18.14-.26.27-.39.28-.44-.08-.74-.15-.12-.34-.19-.52-.26-.33-.13-.62-.06-.83.24-.22.31-.42.68-.28,1.04.13.32.44.56.86.51ZM37.7,51.8c-.66-.03-1.25.62-1.19,1.24,0,.05.16.13.19.11.44-.33.88-.67,1.3-1.02.19-.16.09-.27-.11-.31-.08-.01-.16-.01-.19-.02ZM18.04,52.75c.05-.17-1.03-1.07-1.44-.84-.4.22-.81.51-.9,1.06-.05.3.19.4.26.61.18.54,1.24.79,1.59.34.26-.32.36-.77.49-1.18ZM13.02,26.33c-.09-.24-.14-.49-.27-.7-.34-.54-.87-.69-1.54-.51-.05.01-.11,0-.17,0,.02-.06.02-.15.07-.19.24-.18.48-.32.82-.22.34.1.7.13,1.05.17.1.01.28-.04.29-.09.02-.1-.02-.24-.08-.33-.06-.09-.19-.14-.27-.22-.25-.25-.18-.57.15-.69.16-.06.32-.08.53-.13-.07-.06-.09-.08-.1-.09q-.77-.06-.91-.84c-.11-.62-.23-1.23-.34-1.85,0-.04.02-.08.02-.12.02-.87.03-1.73.05-2.6,0-.19.06-.38.09-.58.02-.1.09-.2.07-.28-.2-.87.18-1.66.38-2.46.09-.36.42-.64.61-.98.4-.72.76-1.47,1.17-2.19.24-.43.38-.94.85-1.22.02,0,.03-.03.04-.05.45-.72,1.08-1.25,1.74-1.75.44-.33.86-.69,1.43-.83.3-.08.61-.2.85-.39.66-.51,1.44-.69,2.2-.93.61-.19,1.25-.33,1.88-.44.36-.07.73-.05,1.09-.06.47,0,.94-.03,1.4,0,.4.04.8.15,1.19.25.61.16,1.22.3,1.8.51.33.12.61.35.92.53,0,0-.03.08-.06.11-.05.05-.12.1-.18.15-.05.04-.12.12-.16.1-.18-.07-.26-.39-.58-.13-.26.2-.4-.2-.61-.31-.7-.35-1.46-.33-2.2-.43-.95-.13-1.89-.07-2.84-.04-.37.01-.75.2-1.12.32-.28.09-.55.2-.83.28-.41.12-.81.21-1.13.56-.17.19-.47.28-.73.36-.8.24-1.47.65-2.04,1.25-.27.28-.6.51-.89.77-.53.48-.97,1.02-1.21,1.72-.15.44-.36.87-.56,1.29-.07.14-.16.23-.03.42.06.08-.06.33-.15.46-.16.24-.37.45-.55.67-.19.24-.27.48-.13.81.1.22.08.57-.03.79-.27.52-.3,1.02-.22,1.59.09.62.07,1.26,0,1.88-.03.36.04.66.15.98.08.25.14.51.23.82.37-.22.8-.44,1.19-.72.4-.29.84-.43,1.3-.54.22-.05.53-.07.49-.38-.01-.08-.42-.18-.62-.13-.4.1-.78.28-1.15.45-.21.09-.38.35-.59,0-.15-.26-.07-.61.21-.77.83-.45,1.66-.84,2.64-.45.32.13.65.2,1.03.08.25-.08.58.03.85.13.59.21,1.24.31,1.72.76.11.1.19.24.28.37-.13.07-.26.13-.39.2-.24.14-.44.05-.67-.04-.46-.17-.9-.53-1.46-.25-.09.04-.31-.12-.44-.22-.35-.31-.56-.29-.72.15-.14.38-.46.12-.65.25.25.34.31.37.9.46.53.08,1.05.16,1.58.25.13.02.24.13.37.18.41.14.82.29,1.24.39.13.03.3-.08.43-.14.14-.07.26-.18.4-.24.56-.2.57-.19.61-.8,0-.08-.01-.17.02-.24.07-.13.16-.24.25-.36.04.13.12.28.1.4-.07.49-.19.96-.25,1.45-.03.24-.06.52.03.74.2.52.25,1.02.15,1.56-.03.14.05.31.09.46.15.57.24,1.14-.14,1.65-.29.38-.13.75-.06,1.12.12.63.13.63-.49.87-.09.04-.17.1-.27.13-.52.19-.54.22-.54.92.26-.32.57-.44.95-.43.31.01.53.06.76.34.33.41.88.47,1.35.36.47-.11.91-.38,1.34-.61.23-.12.41-.27.56.09.02.06.2.12.23.09.11-.1.28-.25.26-.35-.06-.41-.18-.8-.27-1.2,0-.02-.03-.03-.03-.05-.08-.15-.16-.3-.24-.45.17.07.35.11.5.2.13.08.24.21.32.34.11.18.22.28.44.35.18.06.36.26.45.45.58,1.21,1.49,2.19,2.26,3.26.51.71.58,1.49.53,2.32-.02.31-.24.46-.48.6.49-1.12.08-2.05-.59-2.9-.43-.56-.96-1.04-1.41-1.59-.26-.32-.47-.68-.7-1.03-.11-.18-.17-.33-.34-.01-.16.3-.42.56-.65.83-.23.28-.57.19-.84.16-.78-.07-1.41.29-2.05.62-.42.21-.8.51-1.19.77-.1.07-.18.15-.27.24-.28.29-.28.41.05.66.53.41,1.12.55,1.79.41,1.08-.24,2.18-.38,3.29-.39.65,0,1.21.19,1.62.72.07.09.14.2.15.3.02.15-.04.29-.24.18-.05-.03-.11-.06-.15-.1-.57-.51-1.28-.47-1.97-.52-.29-.02-.58-.02-.87.02-.19.02-.39.09-.56.18-.57.33-1.15.58-1.83.57-.39,0-.88.52-.88.92,0,.07.12.18.2.22.74.33,1.5.23,2.26.08.24-.05.47-.17.72-.24.15-.04.31-.04.6-.07-.2.29-.33.48-.47.67-.05.06-.14.09-.18.15-.27.37-.19.58.25.66.34.06.64.19.88.44.15.16.12.3-.08.36-.18.06-.38.1-.57.1-.63,0-1.26-.02-1.88-.02-.08,0-.16,0-.24.02-.13.03-.25.08-.38.12.1.07.19.15.3.22.16.1.22.21.08.39-.07.09-.15.19-.15.29,0,.12.15.29-.09.3-.2.01-.37-.05-.45-.29-.06-.18.32-.34.04-.44-.26-.09-.58-.1-.86-.05-.32.07-.76.84-.7,1.15.03.12.14.24.24.33.73.65,1.48,1.22,2.53,1.27.49.02.97.1,1.47,0,.26-.06.54.06.81.02.36-.06.71-.19,1.06-.29.09-.03.19-.15.25-.13.57.22.81-.21,1.1-.53.05-.06.16-.07.25-.1-.02.09-.02.19-.07.26-.46.57-1.05.95-1.74,1.19-.44.16-.9.33-1.26.61-.47.36-.98.3-1.49.34-.48.04-.95-.11-1.41.22-.23.17-.62.13-.95-.05-.4-.21-.85-.3-1.32-.2-1.02.22-1.36,1.28-.69,2.08.27.32.46.69.93.73.03,0,.1.11.09.13-.05.06-.12.14-.17.13-.29-.04-.63-.03-.86-.18-1.05-.69-2.3.97-1.64,1.74.29.34.48.76.99.94.33.12.58.15.88.01.05-.03.11-.07.16-.07.17-.02.34-.02.51-.03,0,0,.03.1.03.1-.16.05-.31.13-.48.15-.4.06-.76.17-1,.54-.13.2-.33.36-.42.57-.1.22-.2.52-.12.72.29.78,0,1.49-.23,2.19-.24.71.05,1.41.74,1.62.11.03.34-.02.35-.06.08-.37.35-.36.63-.36.11,0,.21-.05.39-.09-.38.59-.73,1.11-1.06,1.64-.07.11-.08.26-.1.4-.04.28-.16.6-.06.84.08.2.4.3.62.45.03.02.06.05.08.09.11.13.21.26.32.39-.16.04-.32.1-.48.13-.22.04-.41.08-.24.37.08.14.05.2-.15.16-1.5-.29-2.92-.82-4.31-1.44-.88-.4-1.78-.76-2.62-1.24-.84-.47-1.65-1.01-2.41-1.61-.69-.55-1.36-1.16-1.93-1.84-1.2-1.42-2.4-2.84-3.29-4.48-.42-.76-.76-1.56-1.11-2.36-.3-.68-.55-1.38-.81-2.08-.11-.29-.16-.61-.24-.91-.11-.39-.23-.79-.35-1.18-.62-2.08-1-4.21-1.24-6.37-.07-.65-.09-1.31-.1-1.96-.02-.89-.04-1.78,0-2.68.06-1.87.16-3.74.54-5.58.14-.68.25-1.36.43-2.03.3-1.12.6-2.24.98-3.33.31-.89.72-1.75,1.11-2.62.35-.78.68-1.58,1.11-2.32.57-.97,1.22-1.91,1.88-2.82.28-.39.69-.7,1.04-1.05.46-.45.94-.9,1.38-1.37.63-.66,1.33-1.23,2.1-1.71.6-.38,1.18-.78,1.8-1.11,1.2-.63,2.41-1.24,3.74-1.58.77-.19,1.52-.44,2.28-.64.32-.08.66-.12.99-.16,1.09-.11,2.19-.28,3.28-.31,1.02-.03,2.04.05,3.06.15.62.06,1.22.26,1.84.4.02,0,.04.01.06.02.76.2,1.52.38,2.26.62.49.15.96.37,1.43.57.55.23,1.1.44,1.62.72.88.47,1.74.98,2.61,1.48.22.13.45.25.66.4.19.13.37.28.54.43.42.38.84.77,1.25,1.16.62.6,1.23,1.2,1.66,1.97.17.31.45.55.68.83.89,1.09,1.64,2.27,2.18,3.58.23.55.54,1.06.75,1.61.25.66.43,1.34.65,2.01.2.64.42,1.27.61,1.91.08.28.12.57.17.86.02.1.02.2.05.29.55,1.6.72,3.28.91,4.94.11,1,.08,2.02.11,3.03.01.53.03,1.06.01,1.59-.07,1.89-.15,3.78-.55,5.65-.16.74-.23,1.5-.46,2.21-.37,1.11-.71,2.24-1.2,3.31-.13.28-.22.59-.3.89-.3,1.23-.83,2.36-1.49,3.44-.45.75-.86,1.52-1.34,2.25-.45.68-.93,1.36-1.47,1.97-.4.45-.92.8-1.38,1.2-.58.51-1.11,1.07-1.72,1.53-.56.43-1.19.76-1.8,1.12-.37.22-.74.43-1.15.67-.03-.34-.06-.6-.06-.86,0-.08.04-.19.09-.24.26-.21.38-.35-.06-.49-.23-.07-.46-.2-.66-.35-.11-.08-.15-.25-.22-.38-.11-.2-.01-.27.18-.32.05-.01.1-.2.09-.29-.11-.65-.43-.97-1.09-1.09-.35-.06-.7-.11-1.05-.18-.09-.02-.17-.08-.26-.13.07-.08.13-.21.22-.24.29-.08.5-.24.57-.54.02-.09.07-.2.05-.29-.1-.43-.22-.86-.33-1.29-.01-.06-1.22-.19-1.52-.09-.26.08-.55.09-.81.06-.17-.02-.32-.16-.27-.39.04-.19.17-.15.32-.15.35,0,.69.02,1.04.07.25.03.64-.3.83-.56.48-.67.43-.99-.08-1.7-.19-.27-.13-.64.17-.95.15-.16.34-.28.49-.43.15-.15.31-.31.42-.5.33-.56.25-.94-.31-1.29-.39-.24-.81-.4-1.31-.34-.41.05-4.01-.08-4.55.24-.29.18-.38-.34-.4-.6,0-.08.33-.22.53-.26.35-.07.7-.1,1.06-.13.39-.04.2-.1.01-.17.04-.06.06-.15.11-.16.63-.21,1.27-.41,1.91-.62.47-.16.88-.33,1.18-.8.28-.43.74-.75,1.16-1.08.69-.53,1.12-1.25,1.54-1.99.56-.99.68-2.13,1.02-3.2.08-.25.04-.54.05-.81h0c-.19.28-.41.54-.55.84-.27.57-.49,1.15-.74,1.73-.04.09-.06.2-.12.26-.06.06-.17.07-.26.1,0-.09-.04-.19-.02-.27.22-.75.45-1.49.68-2.23.07-.23.13-.46.22-.68.02-.05.12-.11.17-.11.06,0,.15.11.14.14-.13.41.14.23.3.22.06,0,.11,0,.17,0h0s0,0,0,0h0s0,0,0,0c0,0,0,0,0,0,.1-.03.26-.26.28.05.02.3.04.62-.03.91-.09.39.15.57.4.7.38.2.8.33,1.2.51.89.42,1.79.83,2.66,1.29.42.22.36.73-.09,1.15-.46.44-.94.86-1.38,1.32-.58.61-1.12,1.25-1.67,1.87-.28.32-1.48,1.66-1.73,1.97-.07.08-.08.21-.11.32.13-.02.29,0,.37-.08.2-.18,2.43-2.26,2.85-2.64.62-.56,1.27-1.07,1.87-1.65.37-.36.79-.32,1.26-.33.68-.02,3.97.42,4.93.48.27.02.34-.48.39-.68.02-.08.05-.35.06-.41.03-.26-.02-.43-.32-.42-.25,0-.5.01-.76,0-.71-.02-1.41-.05-2.12-.06-.49,0-.98.04-1.47.06-.26.01-.41-.07-.41-.37,0-.28.1-.38.38-.38,1.31.01,2.62-.02,3.93,0,1.04.02,1.1,0,1.04-1.02-.03-.47-.03-.47-.5-.47-2,0-4.01,0-6.01,0-.38,0-.74.02-1.09-.2-.19-.12-.46-.11-.68-.19-.11-.04-.2-.14-.3-.22.1-.03.21-.09.31-.09.69,0,1.39,0,2.09,0,1.25,0,2.5.03,3.75.03.75,0,1.51-.01,2.26-.01.32,0,.48-.11.43-.46-.03-.21,0-.43,0-.65-.02-.49-.05-.5-.54-.48-.98.04-1.97.09-2.96.09-.84,0-1.69-.07-2.53-.08-1.34-.01-2.68,0-4.02,0-.14,0-.31.08-.26-.16.04-.18-.13-.49.22-.51.46-.03.91-.01,1.37-.01,1.93,0,3.86,0,5.78.01.85,0,1.71,0,2.56,0,.52,0,.53-.03.5-.54-.01-.2,0-.4.03-.59.05-.45.05-.47-.42-.47-1.93,0-3.85,0-5.78,0-.61,0-1.23,0-1.85,0q.25-.7.9-.7c2.21,0,4.41,0,6.62,0,.6,0,.59,0,.49-.57-.03-.19-.01-.4,0-.59,0-.41,0-.42-.43-.44-.14,0-.28,0-.42,0h-5.66c-.14,0-.28,0-.42,0-.17,0-.35-.01-.29-.25.04-.16-.03-.42.3-.41.55.02,1.1,0,1.66,0,.04,0,.08,0,.12,0,1.52,0,3.04,0,4.56,0,.43,0,.45-.01.42-.42-.02-.35-.07-.7-.12-1.05-.03-.21-.12-.29-.4-.28-.73.03-1.45-.03-2.18-.04-.34,0-.68,0-1.01,0-.89,0-1.78.01-2.67.04-.23,0-.4.02-.38-.29.02-.23.01-.39.36-.37,1,.04,2.01.04,3.01.02.93-.01,1.86-.06,2.79-.1.25,0,.38-.07.31-.4-.23-1.03-.21-1.05-1.3-1.05-1.61,0-3.22,0-4.82,0-.33,0-.59-.04-.67-.42-.05-.21.02-.29.23-.28.77.02,1.55.03,2.32.03,1.11,0,2.22,0,3.34,0,.59,0,.74-.21.57-.78-.04-.13-.13-.26-.15-.39-.05-.36-.29-.45-.6-.44-.89.03-1.77.08-2.66.08-1.59,0-3.17-.05-4.76-.08-.2,0-.35-.02-.34-.28,0-.23.04-.38.33-.38.69,0,1.39-.02,2.08-.02,1.73,0,3.45,0,5.18,0,.36,0,.42-.08.34-.43-.05-.19-.1-.38-.16-.56-.16-.52-.29-.59-.85-.52-.1.01-.2.01-.3.01-.94-.02-1.88-.04-2.82-.05-.55,0-1.09.04-1.64.04-.61,0-1.21-.04-1.82-.07-.18,0-.31-.07-.33-.27-.01-.22.12-.34.32-.36.45-.03.91-.06,1.36-.06,1.7,0,3.41.02,5.11.02.48,0,.55-.12.36-.56,0-.02-.02-.03-.03-.05-.18-.32-.3-.76-.58-.93-.26-.16-.69-.06-1.05-.06-1.75,0-3.5,0-5.25,0-.12,0-.3.02-.34-.04-.09-.14-.12-.33-.15-.5,0-.03.14-.11.22-.11.85-.02,1.71-.04,2.56-.04,1.13,0,2.26.02,3.39.03.36,0,.42-.07.35-.43-.05-.23-.14-.45-.25-.66-.14-.28-.35-.42-.71-.42-1.75.02-3.49,0-5.24,0-.26,0-.52.01-.77-.01-.08,0-.19-.1-.22-.18-.19-.46-.18-.48.33-.47,1.03.02,2.06.08,3.09.08.87,0,1.74-.06,2.6-.09.19,0,.27-.07.15-.24-.27-.41-.53-.83-.84-1.21-.08-.1-.32-.11-.49-.11-1.59,0-3.18-.03-4.77,0-.51.01-.78-.15-.9-.7h5.61c-.5-.61-.9-1.12-1.34-1.59-.11-.11-.37-.11-.56-.11-1.47,0-2.94-.02-4.41,0-.52,0-.86-.17-1.09-.72h5.2c-.2-.23-.34-.41-.5-.58-.12-.13-.3-.21-.4-.35-.44-.61-1.05-.67-1.74-.65-1.43.04-2.86,0-4.29.03-.5.01-.61-.44-.94-.69h5.01c-.14-.16-.18-.24-.26-.29-.62-.35-1.23-.73-1.87-1.01-.39-.17-.84-.27-1.26-.28-1.85-.03-3.7,0-5.54-.02-.71,0-1.41-.14-2.12-.17-.77-.03-1.54,0-2.31.02-1.07.04-2.14.12-3.2.14-1.03.02-2.06-.02-3.09-.02-.19,0-.39.07-.57.14-.33.13-.66.27-.98.43-.57.29-1.14.61-1.7,1.01h5.04l.02.12c-.09.05-.18.12-.28.15-.09.03-.22,0-.29.06-.71.58-1.55.32-2.34.35-1.01.04-2.02-.02-3.04,0-.2,0-.44.08-.59.21-.43.39-.83.83-1.34,1.35.81.05,1.49.02,2.16.02.7,0,1.39,0,2.09,0-.21.59-.3.66-.87.66-1.15,0-2.3.05-3.45-.02-.65-.04-1.04.29-1.42.7-.21.23-.38.51-.56.77-.17.23-.14.3.15.31.75,0,1.51,0,2.26,0,.51,0,1.03-.03,1.54-.02.11,0,.22.09.32.14-.1.18,0,.46-.28.53-.06.01-.12.01-.18.01-1.01,0-2.03,0-3.04-.01-.24,0-.48,0-.71-.01-.5-.05-.87.06-1.03.62-.07.22-.33.39-.49.59-.07.09-.1.2-.15.3.11.03.21.08.32.08,1.11,0,2.23,0,3.34,0h1.2c-.17.66-.17.66-.71.66-1.27,0-2.55.06-3.82-.03-.56-.04-.84.1-1.02.59-.11.29-.26.57-.39.85.3.02.6.07.91.07,1.33.02,2.66.02,3.99.04.19,0,.47-.13.55.18.07.28-.18.47-.6.47-.89,0-1.79,0-2.68,0-.75,0-1.51,0-2.26,0-.12,0-.29.08-.34.17-.17.38-.31.77-.45,1.16-.06.17-.01.27.18.27.43,0,.86.02,1.3.02,1.39,0,2.78,0,4.18-.02.27,0,.31.14.32.38,0,.28-.15.28-.34.28-1.71,0-3.42,0-5.13,0-.27,0-.62-.02-.78.13-.35.32-.53.79-.55,1.28,0,.06.18.18.28.18.68.01,1.35,0,2.03,0,1.43,0,2.85.01,4.28.01.25,0,.34.09.35.35,0,.3-.16.31-.37.31-1.69,0-3.38,0-5.07,0-.26,0-.52,0-.77,0-.31.01-.62.05-.93.07-.13.41-.26.82-.39,1.22-.06.2.03.3.23.3.16,0,.32,0,.48,0,2.1-.01,4.21-.03,6.31-.04.16,0,.32,0,.48,0,.29.01.36.23.36.46,0,.27-.22.23-.39.23-1.95,0-3.9-.01-5.85-.02-.52,0-1.03.01-1.55.02-.09,0-.26.04-.27.07-.06.43-.09.86-.11,1.29,0,.04.2.11.31.11.28.02.56,0,.83.01,1.63,0,3.26,0,4.89,0,.16,0,.32,0,.48,0,.15.01.21.07.13.23-.14.28-.31.44-.68.43-1.87-.02-3.74-.01-5.6,0-.63,0-.5-.06-.62.54-.07.32,0,.67-.02,1,0,.21.09.28.29.27.63-.03,1.26-.07,1.88-.07.35,0,.71.06,1.06.07.79.01,1.58.01,2.36,0,.3,0,.4.07.4.39,0,.36-.21.27-.39.27-1.63,0-3.26,0-4.89,0-.16,0-.32.01-.48,0-.28-.02-.39.09-.4.37,0,.27-.05.55-.08.82-.03.29.05.43.38.42,1.01-.02,2.03,0,3.04,0,1.09,0,2.19,0,3.28,0,.17,0,.37.03.49.12.13.09.18.29.26.44-.15.03-.3.09-.45.09-1.63,0-3.26,0-4.89,0-.57,0-1.13-.03-1.7-.03-.38,0-.44.07-.41.46.02.28.09.55.09.83,0,.34.16.39.44.39,1.01,0,2.03,0,3.04,0h4.16c.12,0,.24,0,.36,0,.21.02.61.45.51.54-.1.1-.31.11-.47.11-2.39,0-4.77,0-7.16,0-.14,0-.28,0-.42,0q-.45.01-.44.46c0,.12,0,.24,0,.36.01.62.12.75.76.75,1.57.01,3.14,0,4.7,0,1.13,0,2.26,0,3.39,0,.44,0,.86.1,1.04.66-.7,0-1.37,0-2.04,0-1.01.02-2.02.08-3.03.07-1.41,0-2.82-.04-4.22-.07-.1,0-.21-.02-.3.01-.07.02-.18.12-.17.17.02.27.05.56.13.82.14.44.29.5.77.5.53,0,1.07.06,1.6.06.35,0,.71-.06,1.06-.06,1.86,0,3.73,0,5.59,0,.66,0,1.32.02,1.98.04.16,0,.47.32.42.46-.03.08-.18.15-.27.15-.88.02-1.77.03-2.65.03-1.76,0-3.52,0-5.28-.01-.69,0-1.39,0-2.08,0-.16,0-.32,0-.47.04-.07.02-.15.12-.16.19-.03.21-.04.42-.03.64.03.55.19.7.72.69,1.82-.02,3.64-.07,5.46-.07,1.34,0,2.68.06,4.06.1-.19.45-.53.63-.98.64-.47,0-.94-.01-1.41-.01-.64,0-1.29.01-1.93.01-1.49,0-2.98,0-4.47,0-.2,0-.39-.04-.59-.06-.24-.03-.4.03-.32.32.11.44.22.88.33,1.31.43.02.86.06,1.29.06,1.65,0,3.3,0,4.95.02.15,0,.3.06.49.11-.45.44-.93.59-1.52.57-.63-.03-1.27.06-1.9.06-.59,0-1.17-.05-1.76-.06-.34-.01-.67-.02-1.01,0-.07,0-.18.15-.18.22.03.51.27.94.55,1.35.05.07.21.1.31.1.42.02.83.03,1.25.03.85,0,1.71-.02,2.56-.02.07,0,.14.04.21.06-.03.06-.05.14-.1.19-.29.31-.62.45-1.06.44-.79-.03-1.59,0-2.38,0-.46,0-.4,0-.35.45.09.88.8,1.44,1.05,2.22.09.27.23.25.43.07.68-.59,1.38-1.17,2.08-1.74.13-.11.3-.18.45-.28.26-.17.52-.35.79-.52.25-.16.49-.09.76-.21.28-.13,4.48,2.67,4.81,2.82.03.02.27-.11.26-.3,0-.18-.66-.65-.73-.71-.37-.29-2.77-2-3.29-2.32-.1-.07-.9-.35-1.01-.64-.12-.32-.07-.6.18-.81.58-.5,1.19-.97,1.76-1.48.62-.55,1.27-1.06,1.94-1.54.2-.14.39-.35.32-.66-.01-.05-.02-.14,0-.17.48-.56.05-1.05-.16-1.52-.09-.22-.14-.43-.21-.65-.18-.58-.43-1.14-.68-1.7-.01-.03-.23.01-.35.04-.15.04-.28.3-.46.08-.15-.19-.33-.41-.11-.69.1-.13.15-.3.2-.46.06-.22.21-.43.4-.34.26.13.57.04.78.21.19.15.3.41.44.62.03.04.05.1.15.13-.04-.27-.06-.55-.13-.82-.15-.64-.33-1.28-.49-1.93-.08-.32-.14-.64-.18-.97-.03-.26-.17-.37-.4-.46-.58-.22-.73-.58-.73-1.17,0-.68-.1-1.36-.22-2.07-.26.24-.5.36-.81.22ZM26.51,58.53c1.24.12,2.32-.26,3.42-.49.47-.1.91-.38,1.38-.49.51-.12,1.03-.15,1.53-.39.92-.44,1.89-.77,2.84-1.15.37-.15.76-.26,1.09-.47.67-.44,1.31-.93,1.95-1.4.21-.15.38-.36.61-.48.62-.34,1.12-.8,1.56-1.35.27-.34.66-.6.86-.97.19-.34.44-.6.71-.85.19-.18.37-.36.52-.57.42-.54.8-1.12,1.24-1.64.69-.81,1.05-1.8,1.51-2.73.48-.97.92-1.96,1.31-2.96.36-.91.64-1.86.93-2.8.16-.51.29-1.03.42-1.55.16-.65.29-1.31.43-1.97.18-.85.07-1.72.24-2.56.15-.76.18-1.52.19-2.28,0-.46.03-.91.03-1.37,0-.88.01-1.77-.04-2.65-.07-1.09-.23-2.17-.31-3.25-.11-1.6-.48-3.14-.99-4.66-.27-.8-.56-1.59-.8-2.39-.51-1.7-1.25-3.29-2.19-4.78-.24-.38-.59-.7-.79-1.1-.39-.79-1.09-1.33-1.54-2.08-.35-.58-.8-1.14-1.37-1.61-.69-.57-1.24-1.32-2-1.83-1.61-1.09-3.18-2.24-5.05-2.89-.59-.2-1.14-.5-1.71-.74-1.33-.54-2.77-.67-4.16-.94-.25-.05-.52,0-.77-.05-1.57-.32-3.15-.1-4.73-.17-.04,0-.08.02-.11.03-1.14.3-2.35.35-3.44.87-.57.28-1.22.2-1.8.51-.83.44-1.74.75-2.63,1.05-1.16.39-2.08,1.16-3.06,1.84-.39.27-.78.54-1.15.84-.32.25-.65.52-.93.81-.4.41-.83.81-1.14,1.29-.22.34-.44.64-.75.89-.18.14-.33.34-.48.53-.43.56-.82,1.15-1.27,1.68-.67.78-.98,1.74-1.47,2.61-.55.98-.86,2.06-1.33,3.08-.42.9-.64,1.9-.93,2.85-.15.47-.28.95-.4,1.43-.16.65-.3,1.31-.43,1.97-.18.85-.07,1.73-.24,2.56-.15.78-.18,1.56-.2,2.34-.01.44,0,.88-.04,1.31-.1.91,0,1.8.05,2.7.07,1.07.23,2.13.3,3.19.1,1.57.47,3.07.93,4.56.26.84.59,1.66.84,2.5.52,1.71,1.26,3.33,2.22,4.84.24.38.53.73.8,1.1.55.76,1.1,1.53,1.67,2.27.38.5.75.99,1.23,1.42.69.61,1.29,1.33,2.05,1.87.45.32.91.63,1.38.93.5.32,1,.64,1.51.94.42.25.86.46,1.29.68.16.08.32.16.48.22.38.13.79.21,1.16.38,1.12.51,2.25.94,3.49,1.06.5.05.99.2,1.49.28.53.08,1.06.13,1.58.18.57.05,1.14.12,1.72.13.45,0,.91-.08,1.28-.12ZM27.55,59.47c-1.2,0-2.36,0-3.52,0-.95,0-1.88-.19-2.8-.38-.81-.16-1.62-.29-2.43-.46-.48-.1-.97-.21-1.42-.4-.99-.4-2.05-.62-2.95-1.26-.52-.37-1.16-.56-1.73-.85-.18-.09-.35-.2-.48-.34-.21-.23-.36-.52-.75-.5-.06,0-.13-.14-.2-.2-.2-.15-.41-.28-.61-.43-.3-.22-.62-.43-.89-.68-.48-.44-.91-.93-1.39-1.38-.66-.61-1.15-1.34-1.71-2.02-.73-.89-1.3-1.87-1.92-2.81-.7-1.07-1.36-2.14-1.77-3.36-.08-.24-.23-.46-.37-.67-.38-.59-.39-1.3-.63-1.93-.28-.75-.55-1.51-.79-2.27-.07-.22-.01-.47-.07-.69-.13-.49-.31-.97-.44-1.46-.06-.21-.04-.43-.07-.64-.1-.93-.27-1.84-.25-2.78.02-.67-.2-1.35-.29-2.02-.04-.32-.05-.65-.05-.97,0-.85-.01-1.69,0-2.54,0-.35.12-.7.15-1.05.12-1.34.21-2.69.36-4.04.06-.54.23-1.07.36-1.61.13-.55.26-1.11.41-1.65.12-.43.27-.84.39-1.27.08-.3.1-.61.19-.9.09-.28.24-.53.35-.8.14-.37.24-.75.39-1.11.23-.54.48-1.06.73-1.59.29-.62.59-1.24.89-1.86.6-1.23,1.43-2.31,2.29-3.37.45-.56.86-1.17,1.33-1.72.36-.43.77-.81,1.18-1.19.43-.4.86-.78,1.32-1.14.72-.56,1.4-1.21,2.2-1.61.68-.34,1.33-.73,2.02-1.06.56-.27,1.17-.46,1.76-.67.75-.28,1.5-.55,2.26-.81.13-.05.27-.08.4-.11.35-.08.71-.11,1.04-.23,1.1-.4,2.24-.54,3.4-.56.64,0,1.28-.07,1.92-.06.85.01,1.7.03,2.54.12.56.06,1.1.34,1.66.39.89.08,1.74.33,2.6.54.74.18,1.46.46,2.17.74.72.28,1.47.55,2.12.97.45.3.95.47,1.4.74.15.09.27.23.39.35.14.15.23.39.51.31.05-.01.13.02.16.06.32.6,1.07.64,1.49,1.14.41.48.91.88,1.35,1.33.47.48.97.93,1.38,1.46.65.83,1.25,1.71,1.85,2.58.45.65.87,1.32,1.27,2.01.43.75.91,1.47,1.13,2.33.07.26.23.5.39.73.36.54.36,1.18.59,1.76.31.8.65,1.61.81,2.45.1.54.25,1.06.4,1.59.22.75.13,1.54.38,2.29.09.27.05.59.06.88.04.64.06,1.29.11,1.93.02.27.11.54.14.81.04.36.08.72.08,1.08.01.83.02,1.65,0,2.48-.01.39-.11.78-.14,1.17-.12,1.32-.21,2.65-.36,3.97-.07.58-.27,1.15-.4,1.72-.08.34-.15.69-.25,1.02-.17.6-.35,1.19-.52,1.79-.01.04-.06.07-.06.1.07.56-.31.99-.45,1.49-.12.43-.33.84-.43,1.28-.13.55-.47.99-.7,1.49-.28.61-.57,1.21-.86,1.81-.6,1.23-1.42,2.32-2.28,3.38-.48.59-.94,1.2-1.4,1.81-.36.49-.83.87-1.28,1.26-.14.12-.28.25-.42.38-.41.36-.82.72-1.24,1.07-.27.22-.54.45-.83.64-.35.24-.72.46-1.09.66-.55.29-1.12.56-1.67.84-.1.05-.2.12-.3.15-.77.23-1.49.55-2.21.91-.29.15-.64.18-.96.27-.9.27-1.8.58-2.71.8-.73.18-1.48.26-2.19.38Z\"/>\n  </g>\n</svg>",
    4: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50.3 59.46\">\n  <g>\n    <path class=\"cls-1\" d=\"M31.8,4.13c-.05-.05-.1-.13-.16-.14-.38-.07-.75-.13-1.06-.41-.08-.07-.28,0-.43,0,.06.11.1.24.18.34.43.52.8.6,1.38.32.03-.01.05-.05.1-.11ZM24.17,4.81c.14.04.28.05.39.12.05.03.05.16.07.25-.06,0-.13.03-.19.02-.11-.02-.23-.04-.34-.09-.08-.03-.15-.1-.22-.15.09-.05.19-.09.28-.14ZM23.73,4.4c-.28.46-.54.82-.73,1.22-.16.36-.21-.16-.28-.02-.12.21-.2.44-.3.67-.01.03.04.08.03.11-.03.13.21.29-.04.37-.02,0-.18-.25-.17-.38.03-.56-.01-1.18.71-1.41.11-.04.17-.22.28-.3.14-.1.3-.17.49-.27ZM28.06,7.43c.01-.29.03-.5.03-.7,0-.14.02-.26-.16-.39-.12-.08-.08-.4-.1-.61,0-.01.21-.08.25-.05.1.11.19.25.25.39.17.39.08.92-.26,1.36ZM37.79,7.18s0-.01,0-.02c0,0-.02,0-.02,0l.02.02c0,.26.15.37.45.29l-.45-.29ZM25.3,8.78c.05-.26.11-.53.16-.79.04,0,.09.02.13.03-.06.26-.12.52-.18.78-.04,0-.08-.02-.11-.02ZM27.92,8.56c.09.17.15.28.2.39.01.03-.03.08-.05.13-.07-.1-.15-.19-.21-.3-.02-.03.02-.09.06-.22ZM21.52,7.72c.09.44.28.82.63,1.12.04.04,0,.16.01.24-.07-.02-.18,0-.21-.05-.19-.27-.3-.33-.36.07,0,.06-.18.17-.19.16-.24-.21-.46-.43-.67-.66,0,0-.03-.37.29-.31.49.08.5.06.49-.45,0-.04.02-.07.03-.11ZM32.05,7.67c.02.66.04,1.22.05,1.79,0,.04-.06.13-.07.13-.14-.06-.38-.11-.39-.19-.05-.38-.1-.79-.02-1.16.14-.63.09-1.23-.14-1.82-.03-.08-.01-.23.05-.28.17-.13.27.03.29.16.05.49.55.91.24,1.37ZM28.73,8.8c.09-.2.15-.34.25-.55.1.21.18.35.24.51.06.15.03.37.29.39.25.02.39-.1.54-.29.29-.4.12-.82.06-1.21-.09-.61-.29-1.21-.46-1.86.2.03.49,0,.71.11.38.19.49.6.54.99.04.29.08.59.05.87-.06.53-.17,1.05-.28,1.57-.01.06-.1.13-.16.13-.45.05-.9.07-1.35.13-.28.04-.46-.08-.57-.32-.09-.2-.2-.39-.28-.59-.03-.07,0-.17,0-.26.08.04.17.08.23.13.06.05.1.12.19.24ZM33.2,7.08c.5.63.39,1.24.27,1.84,0,.02,0,.04-.02.05-.21.21-.06.66-.49.73.07-.26.17-.51.19-.77.04-.4.04-.81.05-1.21,0-.19,0-.37,0-.65ZM37.41,7.95c-.01.08-.02.12-.02.16.03.58.28,1.16.02,1.75-.01.03.11.17.17.18.09,0,.24-.05.26-.12.19-.68-.01-1.31-.3-1.91-.01-.02-.07-.03-.13-.05ZM34.45,7.04c.15.08.24.1.28.15.11.17.14.53.46.17.07.14.24.35.2.4-.48.6-.21,1.34-.4,2-.06.21-.1.33-.33.28-.21-.04-.43-.16-.33-.39.24-.52.12-1.04.1-1.56,0-.25-.09-.49-.1-.74,0-.09.07-.19.13-.32ZM39.86,10.39c.18-.02,1.08.44,1.25.37.09-.03-.48-.69-.51-.73-.12-.21-.29-.4-.45-.59,0,0-.15.07-.17.13-.06.26-.09.52-.13.82ZM39.69,10.24c-.1-.08-.17-.13-.24-.19-.03.06-.11.12-.1.17.02.07.1.13.15.2.05-.05.1-.1.18-.17ZM27.29,11.47c-.12.05-.22.11-.24.09-.08-.08-.14-.18-.19-.29-.01-.02.08-.09.12-.14.09.1.17.19.3.33ZM26.33,11.54s0-.04,0-.05c.06-.13.13-.26.2-.39.03.02.08.04.08.05-.05.16-.1.31-.15.47-.04-.02-.08-.05-.13-.07ZM39.83,11.72c-.06-.16-.16-.28-.32-.13-.18.16-.03.26.11.34-.13.33-.11,1.54.38,1.71.1.04.63.21.57-.47,0-.02-.08-.53-.07-.63,0-.14,0-.28-.03-.41-.06-.3-.25-.41-.63-.4ZM42.17,12.89s.06-.01.1-.02c0-.12-.03-.24,0-.35.19-.67-.36-.91-.74-1.23-.05-.04-.18,0-.27,0,.01.1,0,.23.04.31.13.21.29.4.43.61.15.22.29.45.44.68ZM36.88,12.84c-.04.1-.06.22-.12.31-.11.16-.22.13-.29-.04-.17-.45-.34-.91-.49-1.37-.04-.11.01-.26.02-.38.16.05.42.07.47.17.17.42.28.86.42,1.31ZM42.69,12.68c-.04.1-.07.15-.07.2.02.11.03.26.1.33.09.1.25.13.37.2-.03-.11-.03-.24-.08-.34-.08-.13-.19-.23-.33-.38ZM41.15,14.67c.12-.22,1.17.46,1.3.28.35-.48-.83-2.27-.9-2.76-.03-.2-.24-.39-.41-.55-.16-.15-.3-.03-.36.13-.03.08.02.18.03.28.11.72.22,1.84.34,2.62ZM31.64,15.38c.13-.02.19-.05.2-.03.11.11.22.23.32.34-.03.01-.09.05-.1.04-.13-.1-.25-.21-.43-.35ZM35.75,14.88c.14.26.23.41.3.56.12.27-.13.21-.25.25-.24.1-.43-.04-.42-.25,0-.15.19-.3.37-.57ZM35.79,16.04c.09.11.17.19.22.28,0,.02-.07.08-.1.13-.07-.08-.14-.15-.19-.24-.01-.02.03-.08.07-.17ZM43.36,16.87c.8-.44,1-1.96.34-2.55-.04-.03-.12-.06-.15-.04-.04.02-.06.09-.06.15-.08.7.03,1.42-.17,2.12-.03.1.02.22.04.33,0,0,0,0-.01,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0-.01,0-.02ZM39.72,16.73c-.03.08-.08.15-.06.16.1.1.22.18.34.26,0,0,.07-.07.1-.11-.12-.1-.24-.2-.38-.31ZM37.52,16.53c.12.05.26.09.37.15.22.12.43.26.59.49l-1.04-.54s.05-.07.08-.1ZM31.45,16.99c-.04.07-.08.15-.12.22-.04-.1-.09-.2-.11-.31,0-.03.06-.11.09-.11.09,0,.17.04.26.07-.04.04-.08.09-.11.13ZM28.51,15.86c0,.22-.14.53.31.36.02.09.08.2.05.26-.27.43-.56.85-.85,1.26-.02.02-.1.02-.14,0-.02,0-.03-.07-.02-.11.03-.09.07-.18.11-.27.14-.29.28-.57.43-.86-.3-.28,0-.64-.11-.94-.03-.07.03-.17.04-.25.06.08.15.16.18.25.03.09,0,.19,0,.29ZM29.41,15.84c-.09-.44-.04-.9-.42-1.22-.06-.05-.07-.21-.1-.21-.23.02-.54-.02-.68.11-.23.22-.37.18-.61.07-.13-.06-.32-.04-.47,0-.37.11-.69.07-.99-.19-.05-.04-.14-.04-.21-.05,0,.07-.03.16,0,.21.41.54.28,1.09.13,1.69-.14.56-.2,1.17-.05,1.76.1.42.38.58.79.48.23-.06.46-.15.69-.15.7,0,1.06-.41,1.31-.99.16-.36.33-.71.48-1.08.06-.14.08-.3.11-.44ZM41.51,18.95c.33-.58.33-.97.03-1.29-.03-.04-.11-.06-.16-.05-.03,0-.06.1-.05.14.05.38.11.76.18,1.2ZM27.6,18.98c.05-.1.13-.19.12-.26,0-.07-.13-.18-.19-.17-.1.02-.19.11-.29.17.09.06.17.13.35.26ZM43.45,18.43c-.1.28-.21.48-.26.71-.02.11.07.24.1.36.09-.07.24-.13.27-.22.07-.26.12-.53-.11-.84ZM37.9,19.13c-.14.15-.24.26-.33.38,0,0,.04.06.07.1.12-.1.24-.19.35-.3,0,0-.04-.08-.09-.18ZM41.94,17.39c.03.44.06.82.08,1.21.01.27,0,.54,0,.81,0,.07.04.2.07.2.09,0,.19-.02.26-.06.06-.04.08-.12.11-.19.34-.76.22-1.24-.54-1.96ZM37.07,16.55c-.09.56-.12,1.13-.28,1.66-.18.61-.61,1.09-1.09,1.52-.06.05-.24.03-.31-.02-.35-.23-.37-.84-.01-1.06.27-.16.49-.31.5-.66,0-.08.13-.22.18-.21.65.08.53-.47.68-.81.07-.16.16-.32.24-.48.03.02.06.04.09.06ZM39.79,19.38s-.07-.06-.11-.09c-.14.17-.28.33-.42.5.04.03.09.07.13.1.13-.17.27-.34.4-.51ZM42.73,20.13l.09.06c.07-.06.17-.11.22-.19.07-.1.1-.23.14-.35,0-.02-.05-.05-.07-.08-.09.09-.18.16-.25.26-.06.09-.09.19-.13.29ZM39.64,20.52c.69-.27.96-.86,1.28-1.4,0-.01-.12-.14-.16-.13-.1.03-.22.09-.27.18-.28.42-.53.85-.84,1.36ZM29.12,20.88s.03,0,.05,0c0-.27.03-.55-.01-.81-.04-.22-.17-.43-.27-.63-.01-.03-.1-.02-.15-.02,0,0-.03.06-.02.09.13.46.27.92.4,1.37ZM37.77,7.16c-.42-.28-.85-.56-1.27-.83-.1-.06-.2-.1-.31-.15,0,.12,0,.24,0,.37,0,.1.04.24,0,.29-.25.24-.06.39.08.57.07.09.14.17.21.26-.26-.08-.46-.22-.63-.37-.06-.05-.12-.17-.1-.24.2-.95-.19-1.51-1.21-1.68.22.23.41.45.62.66.17.16.26.29-.06.38-.05.01-.06.14-.1.2-.11.15-.21.08-.27-.03-.04-.08-.03-.19-.04-.29-.08-.51-.39-.9-.74-1.24-.07-.07-.22-.06-.33-.08-.01.11-.05.22-.04.32.03.21.09.42.12.64.02.16,0,.33-.01.49,0,.02-.12.05-.15.03-.22-.13-.13-.34-.14-.53-.01-.25-.05-.51-.12-.75-.13-.47-.25-.53-.88-.54.5.43.88.87.57,1.54-.05.1-.12.26-.18.26-.1,0-.23-.09-.29-.18-.13-.19-.18-.42.06-.55.16-.08.19-.1.05-.22-.08-.06-.17-.13-.2-.21-.24-.54-.69-.56-1.15-.53.02.25.03.47.06.81-.52-.5-.94-.91-1.36-1.31-.06-.05-.12-.11-.19-.13-.23-.06-.4-.14-.33-.43,0-.03-.16-.14-.25-.16-.78-.1-1.57-.24-2.36-.27-1.02-.03-2.06-.35-3.08.04-.03.01-.07,0-.11-.01-.24-.04-.49-.09-.73-.13-.37-.06-.55.13-.65.46-.1.34-.23.67-.31,1.02-.15.67-.38,1.34-.18,2.04.05.17.12.34.16.51.02.06-.02.14-.03.21-.06-.04-.15-.07-.16-.11-.05-.32-.36-.58-.25-.96.02-.07-.13-.21-.22-.3-.09-.09-.19-.17-.29-.24-.09-.06-.23-.14-.28-.11-.19.13-.32.03-.48-.04-.15-.06-.36-.07-.49,0-.48.22-.93.49-1.09,1.05-.09.34-.25.68-.28,1.03-.06.67-.12,1.36.35,1.92.21.25.45.47.68.7-.24.03-.51-.11-.64-.04-.18.11-.25.39-.37.59-.04.07-.11.12-.16.17-.93,1.02-1.59,2.22-2.21,3.44-.35.68-.49,1.46-.75,2.19-.12.35-.22.77-.48.99-.58.49-.71,1.13-.79,1.81-.04.34.04.63.44.8.33.13.6.4.92.62.04-.5.08-.99-.1-1.47-.15-.41.03-.66.48-.63.35.03.63-.08.89-.27.38-.28.76-.58,1.1-.91.37-.35.69-.16,1.05-.53.26-.26.35-.24.53.09.11.21.2.48.38.58.26.14.44-.06.59.09.27.27.39.6.71.68,1.2.31,2.27.8,3.15,1.68.06.06.16.07.25.1,0-.09.05-.21,0-.27-.23-.32-.49-.62-.72-.94-.06-.08-.1-.21-.07-.28.15-.43.29-.87.51-1.26.46-.87.63-1.83.89-2.76.13-.45.27-.95.21-1.4-.08-.58-.29-1.16-.57-1.67-.26-.49-.44-.9-.05-1.41.09-.12-.02-.41-.04-.62-.14.04-.27.09-.41.13-.07.03-.14.07-.22.1-.69.25-1.04.05-1.2-.68-.06-.26-.2-.5-.26-.76-.02-.1.05-.25.13-.33.18-.18.16.07.2.13.09.15.15.32.24.48.22.39.56.45.92.19.33-.25.66-.49,1.01-.76.01.14.03.25.02.34-.03.25-.09.51-.13.76-.09.61.16.91.76.92.59.01,1.06-.36,1.2-.94.06-.23.09-.48.21-.68.37-.61.25-1.22.04-1.83-.15-.44-.15-.41.31-.52.14-.03.16-.06.13.08-.03.16-.02.26.18.29.06,0,.15.2.13.25-.24.4-.25.78-.02,1.18.04.06.03.15.02.23-.05.39-.04.81-.18,1.15-.1.24.38.26.1.45-.18.12-.37.21-.57.28-.13.04-.29-.02-.41.03-.24.08-.58.09-.55.48.23-.08.46-.22.71-.24.56-.06.81.19.91.81-.25-.16-.47-.38-.74-.45-.27-.08-.59-.02-.88-.02h0c-.13.14-.32.26-.36.42-.19.66-.2,1.34.02,1.99.09.25.36.55.59.59.36.07.73.03,1.09.18.1.04.25.01.35-.04.14-.07.25-.19.38-.29-.15,0-.29,0-.44,0-.04,0-.08,0-.13-.01.2-.16.4-.32.6-.48.08.23.14.43.21.64.57-.44.78-1.53.41-2.06-.04-.06-.13-.09-.2-.12-.38-.12-.53-.4-.46-.75.05-.23.15-.29.37-.25.49.09,1.2.83,1.16,1.42-.03.45-.02.91,0,1.37,0,.1.09.27.16.29.2.05.33-.06.34-.29.03-.35.12-.7.11-1.06,0-.32-.08-.65-.16-.97-.04-.16-.15-.3-.28-.55.69.43.81.97.71,1.6-.04.23-.1.46-.14.7-.01.08.01.17.02.26.09-.04.2-.06.26-.13.18-.21.29-.52.51-.65.51-.31.44-.7.27-1.13-.08-.2-.18-.39-.3-.65.29-.03.55-.08.82-.08.36,0,.36.02.23.41-.03.09-.02.2-.04.29-.06.59-.13,1.18-.19,1.76,0,.07-.03.2,0,.2.2.07.41.16.62.16.23,0,.16-.22.21-.36.03-.08.15-.12.23-.18.03.1.1.2.08.29-.03.16-.12.3-.23.56.86-.79.99-1.28.63-2.19-.11-.29-.24-.56-.37-.85.28-.03.59-.24.6.27,0,.13.22.26.34.39.02.02.09,0,.12-.02.24-.21.33-.21.4.07.14.54.37,1.09.08,1.67-.06.12-.21.32.03.39.14.05.35.03.48-.04.19-.11.33-.31.56-.54,0,.2,0,.32,0,.43-.02.22.1.27.28.28.37.02.75.05,1.12.07.18,0,.65-.41.57-.5-.22-.23-.08-.48-.07-.72,0-.25-.02-.49-.28-.73,0,.18,0,.27,0,.37-.03.33-.06.67-.12.99-.01.07-.16.12-.25.18-.01-.09-.06-.2-.03-.28.19-.43.27-.86.11-1.31-.01-.03.09-.13.16-.17.12-.06.25-.1.38-.14.05-.02.16-.02.17,0,.18.52.56.97.56,1.55,0,.18,0,.36.02.54,0,.07.06.13.1.2.06-.03.14-.06.19-.11.34-.34.43-1.28.14-1.74-.19-.3-.31-.52.13-.69.08-.03.14-.14.17-.23.02-.05-.04-.18-.05-.18-.44.05-.3-.21-.26-.45.04-.23.31-.64.34-.87.1-.61-.26-.88-.58-1.33-.04-.05-.42-.06-.49-.1,0,.09-.03.18,0,.25.08.3.2.6.27.91.07.32.1.65.11.98,0,.19-.04.41-.15.56-.04.05-.31-.05-.47-.09-.06-.01-.11-.06-.16-.07-.2-.01-.4-.05-.58,0-.06.02-.04.29-.06.44,0,.02,0,.04,0,.06-.03.04-.06.11-.09.11-.05,0-.12-.03-.15-.08-.04-.06-.05-.14-.08-.22-.19-.63-.3-.72-.94-.77-.09,0-.17-.06-.26-.09.11-.18.19-.4.35-.53.19-.15.05.17.17.17.07,0,.19-.03.19-.05.05-.37.11-.74.11-1.11,0-.18-.38-.34-.15-.54.09-.08.38.06.62.11-.01-.28-.09-.5-.29-.68-.02-.02,0-.1.01-.15,0-.02.08-.03.1-.02.39.3.71-.05,1.06-.1ZM30.81,21.49s-.06-.05-.09-.07c-.05.07-.12.14-.16.22-.03.07-.03.16-.05.25.07-.05.15-.08.19-.15.05-.07.07-.17.1-.25ZM28.38,22.08s0,0,0,0c0,0,0,0,0,0,0,0,0,0,0,0-.04.12-.09.25-.12.37,0,.03.05.09.09.12,0,0,.07-.03.09-.06.06-.16.19-.32-.05-.44ZM28.38,22.08s0,0,0,0c.02-.13.03-.26.07-.38.22-.65.17-1.28-.17-1.89-.14-.26-.36-.32-.56-.17-.16.12-.15.04-.24-.04-.34-.31-.49-.31-.65.1-.14.34-.16.74-.23,1.11l.1.02c.14-.33.28-.67.42-1,.13.27.17.54.22.81.01.09,0,.21.16.1.26-.17.32-.14.3.16,0,.18-.04.36-.08.53-.03.13-.11.25-.17.38-.1-.08-.2-.16-.3-.24-.1-.08-.2-.16-.38-.31.06.37.06.65.15.9.1.29.27.55.42.82.02.03.14,0,.21,0-.13-.37.26-.26.37-.39.13-.16.24-.34.35-.51ZM44.91,21.57s-.07-.18-.17-.25c-.08-.05-.28-.06-.32,0-.07.09-.08.24-.07.37.01.18.06.35.09.52.09.43-.07.77-.35,1.08-.1.11-.19.25-.28.38.17-.04.37-.03.5-.12.15-.1.29-.27.33-.44.11-.46.17-.93.27-1.53ZM42.56,24.42c-.05-.11-.07-.15-.08-.18-.12.07-.25.12-.35.21-.07.06-.09.17-.12.26,0,0,.08.06.09.05.16-.11.32-.24.46-.34ZM43.36,16.88c-.09-.04-.17-.12-.26-.12-.53,0-1.02-.08-1.37-.53-.44.01-.75-.25-1.08-.48-.07-.05-.19-.07-.29-.06-.43.02-.79-.38-1.26-.21-.05.02-.14-.12-.23-.16-.34-.18-.66-.48-1.07-.23-.32.19-.6.11-.9-.04-.27-.14-.7.02-.81-.46-.02-.08-.21-.16-.33-.18-.39-.04-.78-.06-1.18-.06-.31,0-.63.03-.94.08-.29.05-.55.14-.85-.03-.12-.07-.35-.02-.5.04-.42.2-.86.3-1.33.25-.18-.02-.36,0-.53.02-.31.04-.62.09-.93.13.4.58.32,1.23.08,1.89-.07.19-.06.41-.09.61.21-.1.43-.19.63-.3.1-.06.15-.18.24-.26.09-.09.18-.17.38-.35-.06.32-.11.49-.12.66,0,.08.07.23.09.23.28-.04.43.14.6.31.05.05.27.02.35-.05.57-.5,1.08-1.04,1.09-1.87,0-.05.05-.1.07-.15.05.05.13.08.15.14.13.53.18,1.05-.13,1.54-.08.12-.08.28-.12.42.17-.02.35-.02.5-.08.14-.06.29-.17.35-.3.15-.34.26-.69.38-1.04.04-.1.08-.21.11-.31.1.09.26.16.29.27.04.13.02.31-.03.45-.17.48-.37.96-.55,1.43-.07.18-.22.38,0,.53.22.15.36,0,.47-.19.02-.05.09-.1.14-.1.32,0,.38-.24.44-.48.07-.3.12-.62.2-.92.02-.07.22-.15.23-.15.12.16.27.32.33.5.03.11-.07.26-.11.39-.05.14-.15.38-.13.4.4.25.1.35-.09.41-.25.08-.38.23-.5.46-.24.46-.67.56-1.09.27-.16-.11-.26-.29-.49-.11-.04.03-.32-.11-.32-.16.02-.4-.31-.39-.52-.42-.72-.09-1.45-.13-2.18-.18-.07,0-.18,0-.21.05-.18.32-.43.21-.67.11-.25-.1-.48-.1-.65.1-.09.1-.16.31-.11.4.05.09.27.15.39.13.39-.07.52.05.51.44,0,.27.03.55.09.82.13.65.14,1.26-.3,1.81-.05.06-.14.13-.14.18,0,.14.07.28.1.42.12-.04.29-.05.36-.13.48-.66.9-1.35.92-2.2,0-.09.06-.17.1-.26.1.08.24.13.28.23.05.12,0,.27,0,.41,0,.08.06.16.09.24.05-.08.11-.15.15-.23.04-.1.06-.22.08-.33.12.06.27.09.37.17.1.09.17.22.23.34.17.33.33.67.48,1,.04.1.08.21.09.32.03.35.06.38.35.17.24-.18.44-.41.63-.59.3.44.34.93.08,1.43-.05.1-.04.24-.02.35,0,.06.08.15.13.16.06.01.17-.02.21-.07.06-.07.06-.19.11-.27.31-.64.06-1.32.11-1.98,0-.1-.12-.3-.21-.32-.29-.06-.33-.28-.36-.49-.02-.14.04-.39.13-.42.15-.06.39-.12.45.2.05.29.15.58.26.85.12.28.22.65.44.78.34.2.23.38.18.63-.06.27-.1.54-.14.8,0,.04.06.11.09.12.04,0,.12-.04.14-.08.12-.26.26-.52.13-.83-.11-.28.38-.18.3-.45.12.07.29.1.33.2.07.15.06.33.05.5,0,.15-.09.31-.08.46,0,.09.11.21.2.25.05.02.19-.05.24-.12.07-.09.11-.21.14-.32.15-.56.11-1.13.07-1.69-.01-.18.02-.23.2-.26.31-.05.4.13.41.36.02.33-.14.71-.01.98.24.52-.02.87-.23,1.26-.17.32-.42.52-.82.47-.09-.01-.18.04-.27.07.05.09.08.19.15.25.19.17.52.16.76-.02.62-.47.96-1.08.95-1.87,0-.26-.05-.57.08-.76.18-.28.07-.45-.04-.67-.06-.13-.13-.26-.21-.42.92.34,1.17.81.92,1.66-.09.31-.18.62-.27.92.4-.31.42-.76.52-1.17.05-.2.14-.48.05-.59-.26-.29-.2-.63-.25-.95,0-.08.04-.21.09-.23.07-.03.21,0,.26.06.49.54.6,1.21.49,1.88-.11.63-.38,1.23-.58,1.85-.03.11-.05.24-.03.34.02.1.11.19.18.28.09-.06.18-.11.26-.17.49-.37.7-.94.96-1.45.27-.52.47-1.11.15-1.69-.11-.2-.32-.35-.45-.55-.06-.09-.01-.25-.01-.37.11.04.27.05.33.13.41.6.68,1.24.67,1.99,0,.55-.16,1.05-.34,1.56-.03.09.03.21.05.31.1-.05.24-.07.3-.15.23-.29.48-.58.65-.9.12-.23.15-.52.19-.79.03-.17-.04-.36,0-.53.06-.34-.11-.57-.33-.78-.1-.09-.23-.15-.34-.24-.17-.15-.14-.34.08-.4.13-.03.3,0,.43.07.24.12.46.29.7.42.66.34,1.18.91.97,1.83-.03.14-.04.29-.07.43.05.01.09.02.14.04.06-.26.14-.51.17-.77.03-.23.1-.37.33-.19.25.19.38.06.44-.15.12-.43.32-.84.14-1.32-.11-.31-.12-.66-.17-.99-.01-.09.01-.19.02-.28-.09.08-.22.13-.25.23-.05.14-.04.31-.05.48-.3-.33-.43-.33-.59.01-.06.13-.09.28-.11.35-.14-.09-.38-.28-.41-.25-.31.29-.58,0-.85-.05-.27-.05-.32-.22-.18-.48.15-.27.41-.52.34-.95-.11.14-.17.28-.26.31-.39.13-.65.41-.9.71-.13.15-.47.29-.62.22-.24-.11-.47-.15-.72-.18-.35-.04-.37-.1-.18-.41.05-.08.03-.19.04-.29-.1.02-.22,0-.3.06-.16.11-.29.27-.46.37-.07.04-.24.01-.28-.05-.22-.28-.46-.33-.77-.18-.35.18-.69.15-1.06-.04.18-.14.34-.23.46-.36.31-.35.61-.71.88-1.1.12-.18.22-.46-.2-.46-.03,0-.05-.08-.08-.12.16-.09.31-.24.48-.26.13-.01.28.14.43.21-.2.34.26.37.29.6,0,.01.13.03.19,0,.08-.03.15-.1.22-.16.02.02.04.05.07.07-.2.28-.41.57-.61.85.03.03.06.05.09.08.17-.13.36-.23.5-.39.34-.39.48-.88.48-1.37,0-.38-.27-.63-.59-.84-.13-.09-.21-.27-.39-.5.21.07.32.12.43.13.05,0,.16-.06.16-.1.02-.4.03-.41.36-.26.26.12.5.29.76.44.23-.29.49-.02.74-.05.02,0,.09.11.07.14-.02.06-.1.16-.14.15-.19-.03-.37-.08-.55-.13.08.22.15.44.24.65.06.16.16.22.3.06.05-.05.15-.11.2-.09.52.17.96-.26,1.5-.14.28.06.55.12.81.24.2.09.31.55.65.2,0,0,.09.05.13.09.1.12.19.26.3.37.45.47.78.99.65,1.69,0,.04.12.16.15.15.11-.05.25-.12.3-.22.04-.09-.02-.23-.06-.33-.08-.22-.23-.44-.25-.66-.03-.37-.05-.69-.42-.91-.08-.05-.1-.29-.08-.43.06-.42-.06-.77-.33-1.17-.15.28-.27.53-.42.76-.16.25-.35.24-.55-.01ZM14.65,20.88c-.06.04-.12.06-.16.1-.49.51-1.02,1-1.47,1.55-.75.92-1.34,1.97-2.31,2.7-.18.48-.37.95-.53,1.43-.03.09.06.21.09.32.12-.04.28-.04.36-.12.33-.36.71-.71.94-1.14.72-1.29,1.57-2.48,2.53-3.6.22-.26.46-.5.66-.76.06-.07.06-.2.04-.3-.01-.06-.1-.12-.15-.18ZM34.05,27.22s0-.06.01-.09c.02-.12.04-.24.07-.36.03.02.09.03.1.05.03.17.12.38-.17.41,0,0,0,.01,0,.02l-.02-.02s.01,0,.02,0ZM40.93,27.5c-.25-.03-.41-.03-.55-.09-.07-.03-.09-.18-.13-.28.09,0,.21-.04.28,0,.13.07.22.2.4.36ZM34.03,27.24s0-.01,0-.02c0,0,.02.02.02.02,0,0-.01,0-.02,0,0,.03,0,.06-.02.1-.01.09-.03.18-.04.27-.04-.03-.11-.04-.13-.08-.07-.18.01-.27.19-.29ZM45.76,25.69c.27.6.22,1.14-.11,1.66-.08.12-.13.28-.16.42,0,.04.09.15.11.14.17-.08.4-.13.49-.26.19-.29.3-.63.44-.96.09-.2.12-.32-.2-.3-.2.01-.26-.16-.07-.31.05-.04.09-.08.13-.12.28-.24.44-.48.23-.87-.09-.17-.12-.47-.03-.62.09-.16.12-.24.05-.41-.06-.15-.07-.33-.11-.57-.16.22-.25.39-.39.53-.13.14-.28.26-.45.35-.08.04-.21-.02-.32-.03.04-.09.06-.22.14-.27.42-.28.56-.68.6-1.15.03-.29-.15-.63.22-.86.06-.04-.07-.43-.15-.64-.05-.12-.2-.2-.25-.32-.09-.21-.18-.19-.36-.09-.19.11-.25.22-.18.43.08.22.15.45.19.68.02.1-.03.31-.07.32-.48.06-.36.43-.39.73-.05.55-.45.88-1.01.85-.1,0-.2.01-.3.02.05.1.08.21.15.28.63.67.84,1.47.7,2.35-.05.29,0,.45.27.6.32.17.32.21.43-.17.14-.46.26-.93.4-1.4ZM44.71,27.36l-.1.05c.04.14.06.29.12.43.02.04.13.09.17.08.06-.03.13-.15.11-.17-.09-.14-.2-.26-.3-.38ZM28.24,27.82c-.1-.08-.15-.14-.17-.14-.16.06-.31.14-.47.21.06.07.15.21.17.2.15-.07.28-.16.46-.28ZM34.67,27.14c-.05.32-.09.64-.17.96-.02.07-.15.11-.24.17,0-.09-.04-.18-.01-.26.1-.29.22-.57.33-.85.03,0,.06-.01.09-.02ZM46.77,27.89s-.12-.09-.13-.08c-.13.13-.25.27-.36.42-.01.02.06.09.09.14.11-.1.22-.19.31-.3.04-.04.05-.11.08-.18ZM38.08,28.11c-.02.09-.04.2-.08.31-.02.06-.1.17-.12.16-.08-.03-.21-.09-.21-.15-.01-.39-.28-.63-.49-.91-.06-.08-.11-.17-.12-.26,0-.08.03-.19.08-.25.03-.04.15-.03.22,0,.33.12.73.71.72,1.09ZM35.47,27.39c-.14.34-.3.79-.51,1.23-.04.08-.22.1-.34.15,0-.11,0-.21,0-.32,0-.06,0-.14.03-.17.34-.34.36-.79.43-1.22.01-.08.1-.15.15-.23.06.09.13.17.18.26.03.05.02.11.06.3ZM25.82,28.43s-.06,0-.09,0c.01-.4.03-.8.04-1.19,0-.02,0-.04-.02-.06-.08-.1-.16-.28-.23-.27-.13.02-.29.11-.36.22-.06.1-.06.27-.03.39.09.36.2.71.32,1.06.04.12.14.21.21.32.04-.12.09-.23.13-.35.01-.04.01-.08.02-.12ZM40.69,28.85l-.06.1c-.05-.07-.1-.14-.13-.21-.01-.03.01-.07.02-.11.06.07.12.15.17.21ZM42.13,28.52l-.08.09c.04.13.1.25.13.38.06.26.16.43.47.34.11-.03.23-.02.35-.03-.05-.14-.07-.33-.17-.4-.21-.16-.46-.26-.7-.38ZM44.24,30.95c-.03-.17-.06-.32-.09-.48-.03-.16-.06-.31-.09-.49.42.43.44.5.19.97ZM40.04,30.67s-.07.03-.1.05c-.03.09-.06.17-.08.26,0,.01.07.06.08.06.06-.07.12-.13.16-.21.02-.04-.03-.1-.05-.15ZM39.48,31.71s.04-.08.07-.12c-.06-.01-.12-.05-.17-.03-.08.03-.16.09-.22.16-.02.02.03.1.04.15.09-.05.19-.11.28-.16ZM40.13,32.28c.07-.02.14-.03.18-.06.43-.32.87-.64,1.3-.96.03-.02.06-.06.06-.1.03-.11.04-.22.06-.33-.1.03-.22.03-.31.09-.1.06-.17.23-.25.24-.58.03-.67.69-1.14.87-.03,0-.04.11-.02.16.01.04.08.07.12.1ZM38.67,28.51c-.56-.44-.51-.93-.43-1.42.02-.14.11-.35.21-.37.12-.03.34.06.41.17.18.28.3.6.44.9.08.17.13.38.25.52.25.26.53.48.5.9,0,.06.1.19.12.18.3-.1.21.13.22.26.01.1-.03.21,0,.29.04.1.13.18.2.26.05-.08.11-.16.16-.25.08-.14-.03-.58.35-.2.05-.06.15-.13.14-.17-.05-.23-.14-.45-.2-.68-.02-.07,0-.15,0-.23.09,0,.22-.03.27.02.11.1.18.24.26.37.05.07.09.14.14.21.03-.08.1-.18.08-.25-.14-.44-.29-.88-.44-1.32-.02-.07-.03-.14-.04-.2.07.04.19.07.21.13.15.43.4.63.88.62.19,0,.41.22.55.39.2.24.34.53.51.8.07.1.18.25.27.25.28,0,.23.18.21.32-.04.31-.11.62-.17.93-.02.09-.04.24-.02.25.34.15.14.35,0,.41-.29.1-.38.51-.78.47-.11-.01-.26.22-.36.36-.05.08-.02.22-.02.33.11,0,.23.03.32,0,.52-.22.88-.66,1.25-1.05.45-.47.65-1.04.31-1.68-.13-.25-.26-.51-.4-.76.17.07.33.14.48.19.62.18.74.32.7.97-.03.55-.09,1.1-.13,1.65,0,.06.02.11.04.17.07-.03.17-.04.19-.09.19-.39.44-.76.4-1.22-.02-.26.09-.38.35-.3.16.05.3.14.45.22-.08.13-.16.25-.24.38-.03.05-.06.1-.08.16-.29.56-.58,1.11-.87,1.67-.02.04-.03.1-.04.15.07,0,.15,0,.2-.03.54-.43.92-.97,1.2-1.6.05-.12.15-.33.2-.32.26.02.24-.11.22-.28-.02-.21.05-.54-.06-.62-.31-.23.16-.3.05-.49-.12-.2-.12-.42.02-.66.07-.12-.08-.36-.13-.54-.12.04-.26.05-.36.12-.06.04-.1.16-.1.25,0,.3.04.61.07.94-.19-.16-.39-.3-.54-.47-.11-.12-.23-.3-.22-.44.01-.41-.26-.64-.46-.93-.15-.21-.3-.1-.37.03-.07.15-.04.33-.06.5-.11-.13-.22-.27-.35-.39-.04-.04-.12-.02-.17-.05-.21-.13-.48-.23-.62-.42-.41-.58-.93-.92-1.63-1.04-.14-.02-.25-.26-.34-.42-.01-.03.16-.18.27-.25.12-.07.25-.13.38-.17.1-.03.27-.06.31-.02.07.09.09.24.09.37,0,.16-.04.33-.08.64.36-.37.62-.4.92-.14.26.23.42.14.4-.23-.04-.53-.1-1.06-.22-1.58-.11-.47-.4-.53-.73-.17-.39.43-.77.64-1.37.38-.27-.11-.31-.16-.18-.39.22-.38.44-.75.64-1.13.23-.44.13-.89-.04-1.32-.03-.08-.17-.13-.26-.19-.02.09-.07.18-.07.27.01.94-.17,1.78-.89,2.48-.39.38-.32.6.14.93.31.22.37.41.25.81-.24-.14-.48-.26-.71-.42-.06-.04-.1-.19-.08-.27.12-.36.02-.68-.3-.68-.23,0-.55.09-.67.26-.19.25.19.25.3.39.04.06.07.13.1.19-.07.03-.15.1-.2.08-.11-.03-.24-.09-.32-.17-.23-.23-.47-.45-.8-.46-.43-.02-.87-.02-1.29.05-.34.06-.6.03-.89-.14-.41-.25-.87-.4-1.32-.05-.15.12-.27.05-.42-.03-.41-.23-.81-.49-1.32-.47-.21,0-.28-.13-.35-.33-.2-.6-.32-.64-.9-.37-.53.25-.79.24-1.12-.21-.31-.43-.7-.28-1.06-.27-.21,0-.43.1-.61.21-.25.14-.44.1-.66-.05-.14-.09-.34-.23-.47-.2-.68.18-1.51.14-1.72,1.08-.02.07-.07.14-.12.2-.35.45-.27.94-.15,1.48.25-.31.26-.31.31-.72.02-.23.12-.33.34-.28.22.04.22.18.14.36-.21.46-.06.88.21,1.38.15-.28.25-.51.4-.7.15-.18.35-.31.54-.47.01.19.03.38.03.56,0,.14-.03.24.15.32.21.09.3.02.37-.14.1-.23.18-.47.28-.71.03-.08.1-.15.15-.22.06.08.13.14.17.23.25.61.14,1.15-.33,1.62-.11.11-.21.24-.3.37-.02.03-.01.12.01.15.03.03.11.05.16.03.09-.04.19-.08.24-.16.48-.62.72-1.34.93-2.08.02-.08.05-.16.08-.24.09.06.22.09.28.18.1.16.13.37.24.51.29.37.33.79.27,1.24-.03.2-.1.39-.11.58,0,.09.09.22.17.25.08.03.21-.01.3-.06.06-.03.12-.12.14-.19.11-.52.3-1.02.19-1.57-.05-.21-.04-.43-.04-.65,0-.04.05-.09.07-.13.04.03.12.06.13.1.06.38.21.79.14,1.15-.12.59,0,1.22-.33,1.77-.12.21.07.4.31.32.31-.11.61-.26.91-.41.22-.12.42-.28.67-.45.04.3.07.55.11.8.04.2.14.31.38.25.57-.17,1.07-.58,1.72-.44.01,0,.04-.02.05-.03.17-.33.41-.65.49-1,.04-.17-.18-.49-.37-.6-.29-.17-.2-.45-.31-.66.15-.07.3-.14.46-.2.39-.14.67,0,.69.41.01.23-.02.48-.1.7-.21.62-.49,1.2-.91,1.71-.21.25-.07.6.24.66.06.01.13-.03.17,0,.14.08.27.19.4.28-.09.09-.17.21-.28.26-.19.09-.41.14-.6.23-.07.03-.1.15-.15.23.08.04.18.12.24.1.37-.12.74-.26,1.11-.41.07-.03.11-.14.15-.23.11-.26.19-.54.34-.77.07-.1.34-.19.44-.13.56.29.55.65,0,.95-.12.07-.25.13-.37.18-.12.06-.27.09-.37.17-.08.06-.11.19-.16.29.09.04.18.12.27.13.55.04.99-.17,1.29-.63.16-.24.27-.52.4-.78.5-1.06.18-2.01-.48-2.9.08.48.16.95.26,1.54ZM43.67,32.77c-.24.17-.46.29-.64.46-.08.07-.07.24-.1.36.12.01.26.07.35.02.51-.23.5-.24.39-.84ZM28.47,34.37c.02-.1.02-.14.04-.17.05-.08.11-.15.17-.23.02.02.07.06.07.06-.05.1-.11.2-.17.3,0,.01-.04.01-.11.03ZM25.76,34.61s0-.06-.01-.07c-.23-.23-.46-.46-.7-.69,0,0-.09.02-.1.05-.05.13-.14.29-.1.41.06.21.59.46.8.4.05-.01.08-.07.12-.1ZM34.55,33.93c.06.14.1.18.11.23.02.18.02.36.03.54,0,0-.06.01-.1.02-.01-.17-.02-.34-.03-.5,0-.06,0-.12,0-.29ZM26.35,34.5c-.12.08-.21.15-.3.21.06.04.12.11.16.1.1-.03.19-.1.28-.16-.04-.05-.08-.09-.14-.15ZM35.55,35.3c-.11-.08-.21-.16-.22-.15-.12.13-.24.26-.34.41,0,.01.08.09.12.14.14-.12.27-.24.45-.4ZM29.32,35.86c.28-.26.57-.52.83-.79.23-.24.44-.49.39-.86-.18.14-.35.26-.51.4-.39.33-.68.72-.72,1.25,0,0-.01.01-.02.02,0,0-.01,0-.02,0,.01,0,.02,0,.03.01,0-.01,0-.03,0-.04ZM42.93,36.1c.03.08.08.15.09.24,0,.06-.03.12-.04.18-.03-.04-.07-.08-.08-.13-.03-.08-.04-.17-.06-.26.03,0,.06-.02.09-.03ZM25.77,36.5c-.2-.24-.41-.22-.63-.11-.03.01-.04.07-.05.1.16.02.33.05.49.07.05,0,.11-.03.19-.06ZM34.19,36.67c.43.01.8-.54.68-.84-.02-.04-.19-.07-.22-.04-.23.21-.45.44-.65.67-.02.02.04.16.09.19.05.03.14.01.11,0,0,0,0,0,0,0,0,0,0,0,0,0ZM19.72,22.45s0-.06,0-.09c-.25-.09-.56-.11-.74-.28-.22-.22-.44-.38-.72-.49-.03-.01-.04-.1-.05-.16.05,0,.12-.05.15-.03.32.2.61.09.88-.11.07-.05.1-.15.15-.23-.08-.04-.16-.1-.25-.13-.46-.14-.8.19-1.17.33-.14.05-.17.37-.28.55-.07.12-.18.3-.28.31-.11,0-.26-.14-.34-.26-.11-.18-.19-.39-.26-.6-.12-.38-.11-.38.28-.45.72-.13,1.43-.32,2.05-.73.31-.21.33-.36.11-.76-.17-.3-.27-.33-.63-.17-.72.32-1.38.74-2.05,1.16-.24.15-.32.28-.2.58.42,1,.54,2.06.64,3.13,0,.08-.04.19-.1.25-.17.18-.31.37-.61.42-.36.06-.61.64-.42.82.58.53.71,1.27.91,1.97.2.69.27,1.35-.24,2.02-.48.63-.43.69-1.21.49-.56-.15-1.1-.46-1.72-.3-.07.02-.19-.06-.26-.12-.27-.25-.46-.18-.47.15,0,.08-.11.51-.14.64.15.03.3.08.44.07.25-.01.51-.11.76-.08.82.11,1.61.43,2.47.26.3-.06.59.36.56.71-.03.33-.25.47-.66.39-.15-.03-.31-.08-.45-.15-1-.53-2.01-.23-3.01-.02-.17.04-.34.41-.38.65-.03.21.63.54.83.44.47-.24.94-.5,1.41-.75.14-.07.28-.16.43-.21.23-.07.35.06.27.29-.04.11-.11.22-.19.29-.47.36-.96.7-1.43,1.06-.27.2-.57.39-.75.66-.56.82-.51,1.71-.17,2.6.08.21.22.42.38.58.52.53,1.17.39,1.79.26.2-.04.41-.14.57-.28.33-.29.64-.61.95-.93.45-.47.88-.95,1.33-1.42.17-.18.35-.37.55-.52.19-.15.34-.05.39.17.06.25.09.51.16.76.05.18.14.36.22.54.25-.14.17-.39.15-.58-.04-.55-.17-1.09-.21-1.64-.07-.91-.09-1.83-.16-2.73-.07-.83.1-1.62.38-2.39.38-1.05,1.2-1.76,1.94-2.54.17-.18.31-.45.52-.53.55-.22.87-.66,1.21-1.1.28-.37.32-.71.07-1.14-.16-.27-.31-.38-.61-.35-.18.02-.35.04-.53.03-.23-.02-.5-.17-.67-.09-.2.1-.33.37-.47.58-.08.11-.11.25-.16.38-.16.37-.28.41-.64.28-.16-.06-.34-.05-.5-.11-.17-.06-.43-.13-.47-.25-.08-.26.22-.19.36-.27.08-.05.17-.14.17-.21,0-.08-.09-.19-.17-.22-.12-.05-.27-.05-.4-.07-.14-.03-.28-.06-.42-.09,0-.04,0-.07,0-.11.37-.06.75-.11,1.12-.17ZM40.77,37.37s-.09-.05-.14-.08c-.08.16-.16.32-.24.48.03.02.07.04.1.06.09-.15.19-.31.28-.46ZM29.79,38.25s-.08.09-.08.09c-.06-.04-.11-.09-.17-.13.03-.03.06-.07.09-.1.05.05.11.1.16.15ZM26.05,38.36c.19,0,.23-.12.2-.28,0-.02-.06-.04-.09-.06-.04.1-.08.2-.12.29,0,.01,0,.03.01.04,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,.01,0,0,0,0,0,0-.01ZM38.12,38.3c-.1.07-.16.12-.23.14-.02,0-.07-.06-.11-.09.06-.03.12-.08.18-.1.03,0,.08.02.16.05ZM26.05,38.37c-.07-.06-.14-.13-.22-.17-.06-.03-.14-.04-.21-.05.03.08.05.17.1.24.11.13.23.15.33,0ZM32.88,39.02c-.04.09-.06.15-.07.15-.14-.02-.3-.01-.41-.08-.1-.06-.14-.21-.21-.32.03-.01.08-.05.1-.04.2.09.4.19.59.29ZM36.57,38.75c-.04.14-.08.2-.07.26.01.07.07.13.11.19.05-.07.12-.14.13-.22,0-.04-.08-.1-.17-.23ZM25.48,39.08c.07-.35-.14-.49-.37-.53-.25-.05-.39.14-.41.39,0,.1-.01.2,0,.29,0,.18,0,.33-.25.24-.04-.01-.11.06-.16.1.06.04.12.13.17.12.23-.05.44-.15.67-.17.32-.03.38-.22.36-.44ZM34.96,39.7c-.1.08-.17.18-.2.16-.09-.04-.17-.12-.24-.19,0,0,.06-.11.08-.11.11.03.21.08.36.14ZM38.81,39.9s.09-.07.13-.09c-.04-.05-.08-.12-.13-.13-.07-.01-.14.02-.21.04.07.06.14.12.22.19ZM36.3,41.19h0s0,0,0,0ZM36.32,41.19c.02-.08.05-.16.07-.24.05.07.1.15.14.22-.07,0-.14,0-.21.01,0,0,0,0,0,.01h0s-.01,0-.01,0h0s0-.01,0-.01h0s0,0,0,0h0s.01,0,.01,0ZM27.21,39.55c-.1.77-.46,1.28-.98,1.67-.1.07-.29.03-.44.03.06-.13.09-.29.18-.38.41-.36.73-.77.82-1.33.02-.09.12-.17.18-.26.09.1.19.2.24.26ZM34.09,41.59c-.06.05-.11.1-.12.1-.05-.04-.1-.09-.12-.14,0-.03.06-.08.09-.12.04.05.09.1.15.17ZM29.28,35.88c-.13-.04-.31-.04-.22-.28.02-.07,0-.15,0-.22-.22.06-.26,0-.13-.19.25-.39.54-.77.5-1.29,0-.09.12-.19.18-.29.06-.09.14-.19.15-.29.02-.49.16-.98-.04-1.47-.05-.13-.02-.3-.03-.46.13.05.26.15.38.14.43-.05.56.27.75.53.01.02.06.02.09.03.15-.46.35-.52.67-.19.07.07.15.15.17.24.06.35.1.69.15,1.04.05.45-.21.95.25,1.32.04.03.01.15,0,.22,0,.09-.03.18-.04.27.09-.07.22-.12.26-.21.11-.23.17-.48.26-.72.03-.09.07-.23.13-.24.29-.07.35-.29.4-.53.01-.07.1-.18.13-.17.47.09.31-.25.26-.43-.07-.24-.2-.47-.32-.7-.06-.12-.16-.23-.21-.35-.02-.05,0-.17.05-.2.04-.03.18-.02.2.01.22.37.54.73.59,1.13.11.79.04,1.6-.47,2.28-.06.08-.12.22-.18.22-.43.02-.61.41-.93.59-.28.16-.57.46-.97.23-.04-.02-.13,0-.17.03-.02.02,0,.11.02.16.17.28.53.35.82.12.26-.2.51-.34.84-.39.23-.03.43-.26.63-.41.1-.08.18-.19.28-.29.14.3-.01.49-.13.7-.04.06-.02.21.03.26.05.04.17.01.26,0,.05-.01.1-.07.13-.12.24-.37.53-.68.95-.85.39-.16.38-.59.6-.94.19.59.41,1.1.49,1.64.06.34.2.82-.36.99-.03,0-.06.16-.05.17.23.12.12.28.09.45-.02.09.07.22.14.29.03.03.16-.08.26-.1.15-.04.35-.13.44-.07.24.16.27.04.28-.15.03-.3.18-.47.42-.66.26-.2.58-.46.29-.89-.04-.07-.04-.23,0-.28.31-.32.21-.69.16-1.06-.01-.11.03-.22.05-.33.1.07.25.12.3.22.08.15.11.33.14.51.03.15,0,.33.05.47.14.39.04.69-.23.98-.09.1-.19.32-.15.38.16.24-.05.31-.15.43-.18.2-.44.36-.51.59-.09.3-.08.66-.01.97.02.1.37.14.57.18.67.13,1.24-.2,1.45-.83.05-.16.12-.35.23-.47.44-.46.7-.99.84-1.6.08-.35.28-.63.64-.77.35-.14.53-.08.58.3.08.59.09,1.19-.21,1.74-.09.17-.26.31-.35.48-.05.09,0,.22,0,.33.12-.03.3-.02.35-.1.19-.32.35-.66.49-1,.07-.18.09-.38.12-.58.04-.28.29-.35.47-.38.24-.03.23.22.26.39.13.96-.07,1.86-.58,2.69-.13.22-.31.41-.43.63-.06.11-.06.25-.09.38.13.02.28.08.39.05.13-.03.26-.13.35-.24.18-.24.33-.49.49-.74.54-.82,1.05-1.66.96-2.75.27.1.47.2.58.48.14.36.17.83.7.92.09.01.16.22.2.35.31.87-.16,2.39-.91,2.97-.53.41-1.08.75-1.8.52-.05-.02-.13.05-.19.07.03.04.05.11.1.13.14.06.3.15.44.13.37-.05.73-.15,1.1-.22.41-.08.62-.66,1.14-.47,0,0,.05-.1.07-.15.06-.29.18-.55.41-.76.1-.09.11-.28.15-.43.04-.15.04-.3.08-.45.15-.57.31-1.13.47-1.73-.09.01-.14.01-.19.03-.24.09-.48.11-.64-.12-.1-.15.14-.32.55-.39.49-.09.72-.65.41-1.06-.03-.04-.16-.08-.17-.06-.22.23-.41.1-.64,0-.24-.09-.41.07-.3.28.08.16.13.26-.07.29-.11.02-.31,0-.34-.07-.09-.19-.13-.41-.16-.62-.07-.48-.26-.85-.79-.97-.18-.04-.41-.16-.49-.3-.18-.37-.33-.67-.82-.39-.06.04-.22-.06-.31-.13-.16-.11-.29-.28-.46-.37-.29-.15-.56-.51-.94-.15-.03.03-.2,0-.24-.06-.49-.68-1.18-.99-1.97-1.06-.32-.03-.5-.15-.67-.39-.33-.47-.7-.87-1.36-.76-.07.01-.15-.03-.23-.05-.41-.14-.78-.14-1.02.31-.03.05-.12.08-.18.11-.03-.07-.06-.13-.09-.2-.1-.2-.16-.47-.33-.59-.27-.21-.58-.38-.96-.42-.37-.04-.81.06-1.07-.35-.26-.41-.66-.45-1.05-.28-.39.17-.64.13-.83-.25-.03-.06-.13-.15-.18-.14-.61.1-1.03-.31-1.52-.54-.12-.06-.26-.1-.39-.13-.39-.11-.73.06-.95.46l-.85-.04s0,.09,0,.14h.73q.32.53-.29.7c-.29.08-.58.14-.85.25-.24.09-.33.33-.21.49.01.02.08,0,.12,0,0,.04,0,.09-.03.12-.24.22-.54.39-.59.76-.43.11-.3.36-.21.66.08.23-.03.52.03.76.04.16.2.32.35.42.08.05.31,0,.36-.07.23-.36.45-.74.63-1.13.1-.23-.06-.37-.32-.32-.15.03-.3.12-.45.15-.08.01-.17-.06-.25-.1.03-.06.05-.14.1-.18.09-.08.2-.13.29-.21.45-.4.92-.04,1.03.32.07.23,0,.5-.02.75,0,.09-.09.18-.1.28,0,.07.04.14.07.21.06-.02.15-.03.19-.07.38-.44.58-.95.52-1.53-.06-.57-.46-.93-1.05-1-.03,0-.06-.05-.1-.08.33-.06.65.05.93-.02.35-.08.38.13.41.33.05.4,0,.82.1,1.21.14.55-.07,1-.25,1.49-.2.54-.58.82-1.12.96q.47.5.99.11s.06-.06.1-.06c.05-.01.13-.03.15,0,.03.03.03.11.01.16-.05.11-.11.21-.19.3-.2.25-.08.45.14.52.34.11.68.32,1.06.17ZM30.53,42.82c-.04-.06-.06-.08-.08-.11-.06.06-.12.12-.18.18,0,0,.04.06.07.09.06-.06.13-.11.19-.17ZM42.7,42.94s0,.08,0,.12c.17.09.34.18.52.27.04.02.1,0,.15,0-.01-.05-.01-.14-.04-.15-.2-.08-.41-.15-.62-.23ZM28.57,42.95c.16.08.35.14.49.26.28.24.55.18.74-.05.29-.34.52-.74.76-1.12,0-.01-.08-.09-.12-.13-.2.22-.51.09-.71.22-.4.24-.77.54-1.17.82ZM42.35,43.79c.06.12.12.21.17.3.07-.09.19-.17.2-.26,0-.08-.12-.16-.19-.24-.05.06-.1.12-.17.2ZM35.86,43.98q.45-.12.4-.68c-.16.24-.3.45-.44.65l-.43.41c.27,0,.46-.1.47-.38ZM37.28,45.65c.13.02.23.05.32.04.04,0,.08-.06.13-.1-.09-.08-.18-.15-.27-.23-.05.08-.1.16-.18.28ZM43.23,44.25c-.02.1-.03.26-.1.39-.22.42-.47.82-.71,1.23-.1.17-.2.34-.31.51.26-.07.52-.12.78-.21.07-.03.12-.15.17-.24.28-.54.55-1.08.83-1.62.09-.18.04-.25-.15-.27-.1-.01-.19-.05-.28-.09-.22-.09-.36-.07-.23.28ZM36.3,41.2c0,.3-.02.61-.02.91.37.04.22.27.18.47-.02.09-.01.2.02.29.25.63.24,1.23-.1,1.83-.03.05.01.13.02.2.07-.03.19-.04.21-.09.12-.31.23-.63.33-.95.07-.21.12-.43.17-.65.05.01.09.02.14.03-.04.34-.09.68-.11,1.02,0,.08.06.16.1.24.07-.03.17-.05.2-.1.2-.45.46-.9.57-1.38.09-.37-.02-.79-.02-1.18,0-.11.09-.21.14-.32.09.06.22.11.24.19.05.18.03.38.06.57.11.77.05,1.5-.36,2.18-.06.1-.05.23-.09.41.72-.36,1.39-.65,1.27-1.57,0-.05.03-.12.07-.16.18-.24.11-.48.03-.73-.24-.7-.23-.71.39-1.03.18-.09.51.03.58.23.01.04-.06.14-.11.16-.06.01-.14-.04-.22-.05-.32-.06-.39.03-.29.34.09.28.18.56.27.84.21-.05.41-.12.63-.15.4-.05.57.16.49.55-.03.13-.05.27-.02.39.08.3,0,.55-.16.79-.12.2-.24.41-.36.61.15.01.23-.04.32-.08.18-.08.23-.44.49-.29.06.04-.05.39-.13.59-.04.12-.15.22-.24.31-.19.18-.37.36-.58.5-.19.13-.39.26-.61.31-.34.08-.7.1-1.05.15.38.05.76.06,1.14.05.39-.01.72-.18.99-.47.12-.13.25-.25.39-.36.61-.49.67-.69.42-1.4-.04-.12-.04-.26-.06-.39.09.08.19.15.28.24.06.06.08.14.14.19.05.03.13.02.2.03,0-.05,0-.13-.03-.16-.23-.22-.27-.44-.17-.78.09-.3.06-.69-.05-.99-.12-.32-.35-.72-.62-.81-.4-.13-.73-.37-1.12-.49-.2-.06-.42-.1-.63-.09-.21.01-.36-.02-.44-.21-.14-.35-.39-.53-.78-.53-.35,0-.72-.1-1.06-.04-.4.07-.67-.05-.85-.37-.23-.41-.58-.64-1.01-.77-.32-.1-.63-.24-.95-.32-.39-.1-.77-.16-1.09-.47-.23-.23-.56-.36-.85-.53-.1-.06-.23-.11-.33-.1-.21.04-.42.2-.61.17-.17-.03-.29-.28-.47-.37-.4-.19-.82-.35-1.25-.48-.15-.04-.44-.02-.49.08-.24.43-.43.37-.65,0-.03-.04-.1-.05-.15-.08-.41-.23-.81-.47-1.22-.7-.41-.24-.9-.19-1.25.14-.02.02-.05.08-.05.08.3.18.07.51.19.71.33.53.24,1.05.09,1.6-.1.37-.24.75-.28,1.13-.03.27-.12.37-.34.47-.18.08-.3.29-.48.38-.17.09-.37.11-.56.14-.08.01-.17-.02-.26-.03.04-.08.07-.16.11-.24.04-.06.08-.12.13-.17-.07-.03-.13-.07-.21-.08-.21-.03-.45.01-.63-.07-.38-.16-.51-.55-.42-1.06.03-.14.17-.4-.18-.18-.01,0-.13-.09-.13-.15,0-.08.04-.17.06-.26-.13.06-.32.09-.36.19-.08.17-.07.38-.08.58,0,.18.08.39,0,.53-.21.45.06.82.19,1.19.15.41.49.67.88.85.34.16.72.17,1.01-.05.22-.17.39-.23.64-.1.05.02.2-.04.2-.07.02-.34.25-.23.44-.22.22.01.38.09.4.34,0,.1.02.2.06.29.13.28.33.29.5.02.15-.23.3-.46.42-.7.23-.43.44-.88.66-1.31.09-.17.22-.4.25.03,0,0,.17.02.18,0,.09-.17.13-.37.24-.52.06-.09.21-.13.32-.19.01.1.07.23.03.31-.29.64-.6,1.26-.9,1.89,0,0-.02,0-.03.01v.02c-.29.01-.35.2-.4.41l.11.08c.1-.16.19-.33.29-.49,0,0,.02,0,.02,0,0,0,0-.02.01-.03.14-.05.29-.08.39-.17.56-.5.88-1.13.97-1.88.01-.1.14-.18.21-.28.05.09.15.2.14.28-.08.63.04,1.32-.51,1.83-.05.05-.03.17-.04.25.09-.03.2-.04.26-.1.27-.26.49-.55.62-.91.08-.21.26-.38.39-.57.29.2.13.44.1.69-.04.31.19.49.49.39.14-.05.29-.14.39-.26.22-.24.42-.5.64-.78.5,1.06-.08,1.99-.35,2.96.61-.22,1.06-.6,1.46-1.05.1-.12.23-.22.36-.3.07-.04.22-.05.26,0,.05.06.05.19.02.27-.06.12-.17.22-.25.32-.24.29-.48.58-.72.87.03.03.06.07.09.1.38-.26.84-.45,1.13-.78.38-.43.63-.97.93-1.47.07-.12.11-.25.16-.38.06.14.14.28.16.42.02.13-.03.26-.02.39,0,.06.07.12.11.17.05-.05.13-.08.15-.14.02-.09,0-.19,0-.29,0-.39,0-.39.44-.3ZM20.66,49.65c.32-.49-.11-1.5-.49-1.65-.3-.12-.95-.34-1.32.23-.23.35-.18.78-.06,1.21.17.58,1.54.71,1.87.21ZM11.61,49.91s0,.08-.01.11c-.24.19-.49.38-.72.59-.04.03-.04.15-.01.2.07.12.15.23.24.33.33.37.39.37.77.07.36-.28.7-.58,1.07-.84.94-.65.91-.37.75-1.64-.14-1.11-.23-2.24-.31-3.36-.03-.43.14-.6.57-.71.4-.11,4.31-1.03,5.06-1.19.5-.11.53-.19.23-.62-.21-.31-.42-.62-.64-.93-.74-1.03-1.67-1.78-2.87-2.24-.7-.27-1.37-.62-2.03-.99-.37-.21-.73-.49-1-.82-.84-1.05-1.03-2.23-.45-3.46.23-.48.27-.93.03-1.36-.3-.54-.21-1.05.07-1.52.17-.29.1-.43-.12-.59-.31-.22-.34-.51-.21-.84.09-.24.17-.49.25-.73.16-.48.16-.49-.29-.69-.21-.1-.44-.17-.67-.22-.86-.21-1.59-1-1.54-1.74.05-.82.3-1.54.98-2.09.41-.33.82-.71,1.11-1.15.39-.58.73-1.18,1.26-1.65.18-.16.15-.32-.05-.44-.17-.1-.3-.2-.24-.42.09-.3-.03-.49-.28-.64-.15-.09-.27-.23-.39-.36-.16-.18-.11-.37.11-.46.11-.04.24-.09.35-.07.45.07.48-.19.55-.55.13-.66.29-1.31.92-1.74.2-.14.34-.45.39-.71.24-1.11.86-2.05,1.42-3,.49-.84,1.06-1.62,1.62-2.42.1-.14.26-.23.41-.33.23-.16.29-.36.23-.62-.09-.44-.16-.89-.26-1.33-.23-1.07,0-2,.7-2.85.47-.58,1-.97,1.79-1,.76-.03.76-.08.97-.83.06-.22.1-.44.15-.66-.2.06-.39.14-.59.17-.57.07-1.13.17-1.68.37-.15.06-.36.05-.44.16-.3.41-.76.48-1.19.59-.73.19-1.44.4-2.12.74-.56.28-1.12.57-1.68.87-.04.02-.07.08-.14.17.21.01.36.03.51.03.84,0,1.67,0,2.51,0,.12,0,.32.06.34.12.03.14.01.35-.08.44-.08.09-.28.11-.43.11-1.19,0-2.38-.01-3.57,0-.21,0-.47.03-.61.15-.48.42-.91.89-1.47,1.45h.74c1.57,0,3.14,0,4.71,0,.14,0,.28,0,.42,0,.23.03.26.16.22.37-.07.34-.33.28-.56.28-1.87,0-3.73.04-5.6-.02-.69-.02-1.05.35-1.43.78-.12.13-.21.29-.31.43-.1.16-.19.33-.29.49.19.02.38.07.57.07,1.98,0,3.97-.02,5.95-.03.16,0,.32.08.49.12-.09.17-.16.37-.29.5-.07.08-.26.07-.39.07-1.73,0-3.46,0-5.19,0-.48,0-.95-.02-1.43,0-.12,0-.29.06-.36.15-.27.34-.5.7-.74,1.06-.06.09-.08.21-.12.31.11.02.22.06.34.06,2.11,0,4.21,0,6.32,0,.16,0,.32,0,.48,0,.18,0,.17.09.11.23-.15.33-.38.44-.75.44-2.01-.02-4.02,0-6.03,0-.77-.3-1.05.24-1.32.78-.04.09-.08.18-.12.27-.2.45-.19.47.33.47.34,0,.67,0,1.01,0,1.75,0,3.5,0,5.25,0,.16,0,.32,0,.48,0,.19,0,.24.1.21.27-.04.23-.11.41-.41.38-.45-.03-.91-.05-1.37-.04-1.67,0-3.34.03-5.01.04-1.03,0-1.03,0-1.4,1q-.21.58.38.61c.18.01.35.05.53.05,1.72-.01,3.45-.03,5.17-.05.22,0,.44,0,.66,0,.21,0,.28.08.22.3-.09.32-.3.36-.59.36-2.01,0-4.02,0-6.03,0-.71,0-.97.19-1.18.88-.03.09-.05.19-.07.29-.1.42-.09.43.35.44,1.07,0,2.14-.01,3.22-.01.77,0,1.54.01,2.32,0,.45,0,.82.05.92.57,0,.03.01.06.02.11h-.42c-2.05,0-4.09,0-6.14,0-.5,0-.49,0-.61.47-.03.11-.08.22-.13.32-.36.68-.28.82.48.82,2.12,0,4.24-.03,6.37-.03.17,0,.4.03.49.14.08.09-.36.53-.53.54-.14.01-.28,0-.42,0-1.97,0-3.94,0-5.9,0-1.14,0-.82-.1-.99.92-.08.47.01.56.5.56,1.61,0,3.22,0,4.83.01.19,0,.38,0,.61,0-.2.53-.51.68-1.01.67-1.45-.04-2.9-.01-4.35-.01q-.79,0-.82.83c0,.06,0,.12,0,.18q-.03.78.71.73s.08,0,.12,0c.85.02,1.69.06,2.54.07.3,0,.59-.05.89-.05.31,0,.63.03.94.05.34.01.27.33.38.52-.13.05-.26.14-.39.15-1.41.01-2.82,0-4.24,0-.26,0-.52-.02-.77.01-.11.01-.27.12-.29.21-.07.35-.08.7-.12,1.06-.02.23.09.33.31.32.14,0,.28,0,.42,0,2.35,0,4.69,0,7.04,0,.13,0,.25.05.38.08-.05.17-.08.36-.18.49-.06.08-.25.09-.38.09-1.83,0-3.66,0-5.49,0-.57,0-1.14-.02-1.7-.01-.37,0-.41.06-.37.42.02.24.04.47.07.71.05.51.05.52.56.52,1.17,0,2.35,0,3.52,0,.37,0,.75.05,1.12.05.87,0,1.75-.03,2.62-.05.28,0,.32.15.3.39-.04.34-.29.27-.49.27-2.31,0-4.61,0-6.92,0-.16,0-.32-.02-.47.02-.08.02-.2.14-.2.22,0,.29.03.58.06.87.03.32.17.48.54.47,1.33-.01,2.66,0,3.99.01,1.03,0,2.06,0,3.09.01.14,0,.28.09.42.13-.06.15-.08.33-.18.43-.07.08-.25.09-.38.09-1.09,0-2.17,0-3.26,0s-2.26,0-3.4,0c-.24,0-.66,0-.69.11-.08.24,0,.55.06.81.04.17.15.33.26.47.06.07.19.13.28.13,1.07,0,2.13-.02,3.2-.03.87,0,1.75,0,2.62,0,.3,0,.6.07.89.03.45-.06.38.3.39.5.01.31-.23.14-.39.13-.14,0-.28,0-.42,0-1.86,0-3.73,0-5.59,0-.71,0-.71,0-.75.69,0,.02-.01.04-.01.06-.01.58.21.82.8.81,1.11,0,2.21-.04,3.32-.04s2.21.06,3.32.02c.48-.02.73.17.97.6-.83.03-1.6.08-2.38.07-1.73,0-3.45-.04-5.18-.07-.22,0-.35.09-.3.32.08.37.17.73.24,1.09.05.25.19.3.42.3.65-.02,1.31-.01,1.96,0,1.51,0,3.02,0,4.52.01,1.08,0,2.17-.04,3.25.02.49.03.97.24,1.5.59-.84.04-1.56.11-2.28.11-1.27,0-2.54-.05-3.81-.05-.75,0-1.5.07-2.26.07-.76,0-1.53-.04-2.29-.05-.63,0-.64,0-.47.59.05.19.14.36.2.55.15.49.52.56.97.55,1.21-.02,2.42-.02,3.63-.02,1.51,0,3.01-.01,4.52-.01.45,0,1.4.04,1.86.04-.62.29-1.73.44-2.35.63-.05.02-.12,0-.18,0-1.47,0-2.94,0-4.41,0-1.15,0-2.29,0-3.47,0,.12.44.21.82.34,1.19.09.25.24.44.57.43.85-.03,1.71-.02,2.56-.03.75,0,1.51-.01,2.26,0,.14,0,.33.06.39.16.17.27.03.48-.31.49-1.31.02-2.62.02-3.93.04-.28,0-.55,0-.83.01.11.26.2.54.33.79.27.5.57.88,1.26.83,1.03-.07,2.06-.02,3.09-.02.16,0,.34-.03.47.03.11.05.19.22.22.35.04.14-.02.28-.21.28-.41,0-.82.01-1.23.01-.75,0-1.51,0-2.27,0-.22,0-.23.09-.11.25.23.32.49.63.69.96.33.57.49.64,1.15.58.38-.04.76,0,1.15,0ZM22.81,45.97c-.59-.38-1.08-.7-1.56-1.03-.14-.09-.25-.22-.39-.31-.35-.22-.59-.65-1.1-.53-.81.19-5.62,1.17-5.63,1.32-.08,1.25.84,7.32.93,7.86.05.31.17.73.4.88.46.29,1.01.44,1.53.64.17.07.27,0,.28-.18.04-1.64.09-6.45.1-7.22,0-.48.04-.52.53-.61.7-.14,4.35-.72,4.93-.82ZM2.3,31.38c-.02-.36-.08-.97-.09-1.58-.01-.41.01-.82.04-1.23.11-1.46.17-2.92.35-4.37.14-1.11.34-2.24.7-3.3.33-.95.44-1.96.83-2.88.16-.38.31-.76.47-1.14.46-1.07.9-2.14,1.4-3.19.25-.52.61-.98.91-1.48.17-.29.3-.6.48-.88.62-.95,1.33-1.81,2.22-2.53.41-.33.72-.79,1.11-1.14.66-.59,1.33-1.17,2.04-1.69.6-.44,1.24-.83,1.91-1.17,1.24-.64,2.49-1.27,3.86-1.59.73-.17,1.44-.42,2.17-.62.3-.08.62-.11.93-.15,1.07-.11,2.15-.28,3.23-.31,1.06-.03,2.12.05,3.18.15.62.06,1.22.27,1.83.41.06.01.11.04.17.05.72.19,1.44.36,2.15.57.39.12.77.31,1.15.47.62.26,1.25.5,1.84.81.89.46,1.74.98,2.61,1.48.05.03.09.08.15.1,1.03.47,1.77,1.3,2.52,2.09,1.43,1.5,2.69,3.15,3.72,4.95.44.77.78,1.6,1.14,2.41.3.68.55,1.38.81,2.07.11.31.18.64.27.96.1.34.2.68.29,1.02.46,1.61.81,3.24,1.05,4.9.12.82.23,1.65.31,2.47.03.31-.02.63-.03.94-.01,1.56.02,3.12-.05,4.68-.04,1.04-.2,2.08-.36,3.12-.14.88-.34,1.75-.57,2.61-.28,1.08-.58,2.16-.94,3.22-.27.8-.63,1.58-.97,2.35-.4.89-.7,1.87-1.28,2.62-.58.76-.93,1.64-1.53,2.38-.52.64-1.08,1.21-1.69,1.75-.42.38-.75.87-1.17,1.25-.54.49-1.1.96-1.69,1.38-.61.43-1.25.82-1.9,1.19-1.29.72-2.6,1.4-4.06,1.73-.71.16-1.4.43-2.11.62-.32.09-.66.12-.99.16-1.07.12-2.15.35-3.22.32-1.27-.05-2.55.01-3.83-.25-.75-.15-1.51-.33-2.23-.55-1.5-.45-2.97-1.05-4.4-1.71-1.1-.51-2.17-1.14-3.16-1.85-1.04-.74-2.01-1.59-2.78-2.63-.5-.68-1.11-1.29-1.59-1.98-.59-.86-1.14-1.76-1.65-2.67-.41-.74-.78-1.51-1.1-2.3-.27-.66-.44-1.37-.65-2.05-.17-.52-.33-1.05-.51-1.57-.15-.43-.18-.9-.32-1.3-.29-.82-.4-1.65-.55-2.49-.26-1.44-.53-2.89-.44-4.62ZM26.64,58.5c1.31.06,2.55-.28,3.79-.62.56-.15,1.08-.48,1.69-.44.06,0,.11-.03.17-.05,1.04-.42,2.06-.89,3.12-1.26,1.17-.42,2.12-1.18,3.11-1.88.42-.3.82-.62,1.25-.9.8-.51,1.33-1.3,1.93-2,.29-.34.56-.69.88-1.01.22-.22.42-.47.61-.73.23-.32.42-.66.65-.98.38-.53.8-1.02,1.15-1.57.21-.33.3-.73.46-1.08.23-.5.51-.97.73-1.47.23-.5.41-1.02.62-1.53.11-.27.26-.53.37-.8.27-.68.44-1.39.68-2.07.39-1.07.64-2.2.88-3.33.18-.83.27-1.69.25-2.55-.01-.5.18-1,.21-1.51.04-.77-.05-1.56.06-2.32.15-1.05.04-2.09-.03-3.13-.05-.81-.16-1.62-.23-2.42-.11-1.34-.23-2.68-.63-3.97-.37-1.22-.7-2.45-1.17-3.64-.31-.79-.56-1.61-.9-2.38-.38-.85-.83-1.66-1.28-2.48-.63-1.14-1.54-2.09-2.29-3.14-.41-.58-.7-1.31-1.42-1.63-.05-.02-.07-.1-.11-.14-.49-.49-.93-1.03-1.48-1.45-.88-.67-1.79-1.33-2.76-1.85-.89-.48-1.71-1.09-2.72-1.35-.58-.15-1.1-.49-1.66-.72-1.32-.53-2.71-.74-4.1-.92-1.6-.21-3.21-.45-4.84-.22-.17.02-.36-.02-.53-.02-.11,0-.23-.02-.35,0-.64.12-1.29.22-1.92.4-1.13.32-2.27.59-3.37,1.02-.9.35-1.8.69-2.7,1.05-.4.16-.82.3-1.18.53-.75.5-1.46,1.05-2.19,1.59-.18.13-.35.27-.53.38-.46.28-.88.58-1.22,1.01-.33.42-.77.76-1.05,1.2-.22.36-.47.66-.79.94-.25.22-.46.49-.65.77-.24.33-.44.69-.68,1.02-.37.51-.78.98-1.12,1.51-.26.41-.45.87-.64,1.31-.34.77-.67,1.55-1,2.33-.07.16-.13.32-.2.48-.13.29-.28.57-.38.86-.17.52-.26,1.09-.48,1.59-.53,1.21-.78,2.49-1.08,3.76-.19.85-.28,1.73-.26,2.61,0,.48-.17.97-.19,1.45-.04.77.05,1.56-.06,2.32-.16,1.05-.03,2.09.04,3.13.04.73.19,1.46.22,2.19.08,1.85.4,3.65.97,5.41.13.41.23.83.37,1.24.15.46.33.92.5,1.38.24.65.48,1.29.74,1.93.15.37.33.72.49,1.08.6,1.37,1.49,2.56,2.4,3.73.12.15.29.26.4.42.43.61.85,1.23,1.27,1.85.07.1.17.17.25.25.17.16.33.32.5.48.49.46.96.95,1.48,1.36.57.45,1.19.85,1.81,1.25.51.34,1.03.67,1.56.98.37.22.76.4,1.14.59.19.1.38.2.59.28.38.14.78.21,1.15.38,1.21.55,2.45.99,3.79,1.1.38.03.76.16,1.14.21.51.08,1.01.13,1.52.18.61.06,1.22.14,1.83.14.47,0,.95-.08,1.42-.13ZM23.25,0c1.39.03,2.86.03,4.33.1.5.02.99.24,1.49.31,1.03.16,2.06.34,3.07.62.73.21,1.46.46,2.17.74.72.28,1.47.55,2.12.97.46.29.94.49,1.4.74.14.07.25.19.36.31.16.19.29.43.61.36.02,0,.04,0,.06.02.64.53,1.3,1.06,1.93,1.61.43.38.81.81,1.24,1.19.64.56,1.1,1.28,1.63,1.93.74.9,1.33,1.89,1.96,2.86.69,1.05,1.35,2.11,1.74,3.32.08.26.26.49.4.72.35.56.36,1.23.6,1.83.09.24.18.48.26.72.08.24.16.48.24.72.08.26.16.52.25.78.02.06.08.1.08.16.04.99.55,1.89.6,2.87.03.64.22,1.26.22,1.89,0,.6.03,1.2.11,1.8.04.31.11.62.14.93.04.36.06.73.06,1.1,0,.79,0,1.59-.02,2.38-.01.43-.1.86-.13,1.29-.08.94-.12,1.89-.23,2.82-.07.62-.22,1.24-.35,1.85-.18.89-.37,1.77-.58,2.65-.1.41-.32.79-.4,1.21-.22,1.14-.78,2.16-1.09,3.28-.09.33-.34.61-.49.93-.32.65-.61,1.32-.93,1.97-.61,1.25-1.46,2.34-2.33,3.41-.45.54-.84,1.13-1.29,1.67-.31.37-.61.74-1.02,1.03-.52.36-.93.86-1.42,1.27-.72.59-1.44,1.2-2.25,1.67-.47.27-.98.49-1.48.72-.97.44-1.93.95-2.94,1.25-.76.23-1.48.64-2.32.65-.23,0-.45.13-.68.21-1.11.39-2.25.56-3.42.59-.99.02-1.97.02-2.96,0-.89-.01-1.76-.17-2.62-.35-.86-.18-1.74-.31-2.6-.49-.46-.1-.92-.24-1.36-.39-.65-.21-1.31-.4-1.91-.7-.69-.35-1.43-.63-2.04-1.12-.12-.09-.29-.12-.44-.18-.38-.13-.74-.29-.96-.66-.03-.05-.07-.13-.12-.13-.49-.05-.68-.58-1.08-.71-.44-.15-.74-.46-1.06-.74-.45-.41-.86-.88-1.31-1.3-.62-.58-1.15-1.24-1.67-1.91-1-1.27-1.89-2.61-2.69-4.01-.43-.75-.92-1.47-1.13-2.33-.07-.28-.26-.53-.42-.77-.36-.56-.35-1.23-.6-1.83-.1-.24-.18-.48-.26-.72-.08-.24-.16-.48-.23-.72-.08-.26-.16-.52-.25-.79-.02-.06-.08-.1-.08-.16-.04-.99-.54-1.88-.6-2.87-.03-.64-.22-1.26-.22-1.89,0-.6-.03-1.2-.11-1.79-.04-.31-.11-.62-.14-.93-.04-.36-.06-.73-.06-1.1,0-.81-.01-1.63.01-2.44.01-.43.09-.86.14-1.29.11-1.05.22-2.11.33-3.16.15-1.45.49-2.87.87-4.27.16-.59.29-1.22.51-1.77.36-.89.65-1.81.96-2.71.1-.29.33-.53.47-.81.53-1.03,1-2.11,1.59-3.1.46-.77,1.08-1.46,1.63-2.18.44-.58.86-1.17,1.32-1.72.36-.43.77-.81,1.18-1.19.42-.39.85-.78,1.31-1.14.72-.56,1.44-1.13,2.2-1.63.51-.33,1.12-.48,1.64-.78.88-.51,1.88-.76,2.79-1.21.71-.35,1.53-.44,2.31-.65.23-.06.47-.1.69-.19,1.03-.46,2.14-.47,3.3-.63Z\"/>\n  </g>\n</svg>",
    5: "<svg viewBox=\"0 0 50.33 59.5\">\n  <g>\n    <path class=\"cls-1\" d=\"M15.75,5.44c1.34.26,25.59,6.18,26.1,6.21.32.02-.22-.56-.41-.8-.16-.2-.32-.41-.49-.6-.3-.32-22.02-4.97-22.65-5.18-.93-.3-1.75-.18-2.55.37ZM25.51,13.53c-.46-.27-.95-.07-1.42-.03-.48.05-.95.23-1.42.37-.06.02-.09.11-.13.17.07.02.14.07.21.07.08,0,.15-.04.23-.06.84-.17,1.69-.35,2.54-.52ZM24.11,14.52c-.08,0-.12,0-.16,0-.12.02-.25.04-.37.06.11.09.21.19.32.27.05.04.11.09.16.08.22-.03.45-.08.67-.13.02,0,.03-.13.03-.13-.18-.05-.37-.1-.56-.15-.04,0-.07,0-.08,0,0,0,0,0,0,0h0ZM20.8,17c.16.11.29.04.4-.09.19-.22.38-.43.57-.65.13-.15.26-.29.37-.46.05-.08.02-.2.03-.31-.11.02-.26,0-.31.06-.37.46-.92.8-1.06,1.44h0ZM37.04,17.42s-.07.09-.11.14c.26.17.52.34.77.5-.06-.44-.4-.49-.67-.64ZM32.89,18.66s-.11.05-.14.03c-.23-.17-.46-.36-.68-.54-.02-.01.01-.08.02-.12.26.18.52.37.78.55.01,0,0,.04.02.08ZM20.8,17s0,0,0,0c0,0,0,.02,0,.02-.07.15-.15.24-.38.25-.41.01-.8.54-.77.95-.3.02-.54.1-.45.56.19-.18.35-.34.52-.49.41-.24.79-.53,1.04-.94.05-.09.03-.22.04-.33,0,0,0-.01,0-.02ZM38.04,18.22c.37.24.74.48,1.11.71.04.03.13-.02.2-.03-.02-.05-.02-.14-.06-.15-.4-.2-.74-.54-1.25-.52ZM12.93,19.43c.08-.26.38-.43.28-.75,0,0-.02-.01-.04-.02-.09.22-.19.45-.28.67,0,.02.03.07.04.1ZM17.72,19.75c.09-.04.16-.05.22-.09.22-.15.44-.32.67-.49-.55-.18-.73-.06-.89.58ZM38.57,20.06s-.02.04-.03.06c.27.28.54.56.82.83.05.05.17.07.25.07.23-.02.31-.18.24-.38-.06-.16-.08-.4-.4-.3-.14.04-.32-.04-.48-.09-.14-.04-.26-.12-.39-.19ZM33.57,16.99s-.04.05-.06.07c.36.56.73,1.11,1.06,1.68.55.95,1.25,1.75,2.24,2.28.18.1.31.16.49.06-.09-.13-.15-.32-.27-.38-.81-.44-1.33-1.15-1.86-1.87-.09-.12-.16-.23.02-.35.03-.02.03-.18-.02-.23-.12-.13-.27-.23-.41-.34-.25-.18-.51-.36-.75-.54-.15-.12-.29-.25-.43-.38ZM12.76,19.85l-.02-.11c-.05.02-.12.02-.15.06-.33.41-.66.82-.98,1.25-.09.12-.1.23.09.32.17.08.24.06.32-.09.24-.46.48-.92.72-1.37,0-.02.01-.04.02-.05ZM42.23,21.4c.25.12.44.22.64.31,0,0,.05-.07.05-.07-.16-.14-.32-.27-.49-.39-.01,0-.08.06-.2.15ZM31.22,21.61c-.05-.07-.07-.09-.09-.12-.08.1-.16.19-.23.3,0,.02.05.07.07.11.08-.1.17-.2.25-.29ZM12.47,21.94c-.14-.11-.22-.19-.31-.24-.04-.02-.11.02-.17.03.09.09.17.18.26.25.02.02.09-.01.21-.04ZM16.26,22.61c.17-.36.22-.68.41-.81.33-.22.18-.44.13-.69-.05-.22-.17-.12-.22-.02-.22.43-.44.86-.31,1.53ZM15.81,17.12c-.15-.1-.27-.04-.4.08-.55.48-.85,1.12-1.13,1.77-.31.71-.47,1.49-1.1,2.03-.04.04-.04.14-.05.21,0,.16-.01.33,0,.49,0,.27,0,.55.04.81.02.11.15.28.22.28.11,0,.25-.11.33-.22.06-.08.07-.22.04-.32-.1-.39,0-.73.17-1.08.13-.24.28-.5.32-.76.23-1.37,1.38-2.1,2.16-3.08.03-.04.09-.08.15-.1.72-.2.83-.94,1.26-1.39,0,0-.04-.05-.07-.11-.19.1-.39.18-.56.31-.42.35-.83.72-1.24,1.07-.02.02-.08,0-.12,0,0,0,0,0,0,0,.12-.15.24-.31.36-.46-.26.06-.56.09-.36.46h0s0,0,0,0c0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0-.01,0,0,0,0,0,0,0h0ZM18.19,23.06h.06c-.03-.19-.07-.36-.1-.53-.04,0-.07.02-.11.02.05.17.1.34.15.51ZM25.36,23.51c.15-.17.26-.25.31-.36.02-.05-.07-.15-.11-.23-.09.08-.21.15-.28.25-.03.05.03.16.08.34ZM32.12,18.81c.84.64,1.72,1.05,2.04,2.02.02.05.07.14.1.14.44-.02.45.38.58.63.13.26.17.56.24.84.06.25.12.5.13.75,0,.14-.09.28-.14.41-.11-.06-.27-.1-.33-.2-.58-.89-1.15-1.79-1.7-2.7-.3-.5-.55-1.04-.82-1.57-.03-.06-.05-.14-.11-.33ZM32.73,22.18c-.14-.01-.29-.07-.42-.03-.31.08-.61.18-.9.3-.74.3-.75.31-.54,1.09,0,.03.04.06.1.13.42-.68,1-1.16,1.76-1.49ZM42.27,23.81c-.07-.17-.14-.32-.21-.46,0-.02-.1,0-.1,0-.02.17-.07.34-.05.51,0,.09.12.17.19.25.05-.09.11-.17.17-.28ZM20.47,16.41l-.05-.09c-.19.05-.38.08-.56.16-.48.2-1.03.23-1.43.62-.36.34-.73.66-1.09,1-.19.18-.39.36-.51.57-.41.69-.81,1.4-1.19,2.11-.1.19-.17.41-.19.62-.09.86-.16,1.72-.23,2.58,0,.1.07.2.11.3.06-.08.17-.16.19-.26.17-.83.38-1.66.47-2.5.07-.64.41-1.16.63-1.72.11-.3.42-.52.65-.77.17-.19.35-.38.54-.55.4-.35.79-.71,1.21-1.03.48-.37.98-.7,1.48-1.05ZM26.12,24.39c.06-.29.11-.57.17-.86.02-.09.09-.19.07-.27-.02-.08-.12-.14-.18-.22-.05.07-.15.14-.14.2.13.79-.55.91-1.01,1.1-.5.2-1-.06-1.43-.37-.1-.07-.11-.24-.17-.36-.15-.3-.27-.3-.54-.09-.15.12-.32.22-.5.3-.31.14-.62.25-.94.37-.12.04-.27.08-.39.06-.2-.04-.24-.22-.05-.32.41-.24.83-.47,1.26-.67.72-.33,1.46-.58,2.24-.71.18-.03.34-.16.51-.24-.15-.29-.35-.04-.51-.03-1.2.02-2.32.36-3.4.88-.17.08-.28.27-.43.38-.09.06-.25.09-.32.05-.07-.04-.1-.21-.08-.3.04-.2.14-.33.38-.39.76-.2,1.5-.47,2.26-.68.98-.27,1.98-.4,3-.36.29,0,.5.1.65.34.25.4.52.8.76,1.21.04.07.02.18.03.28-.09,0-.19.02-.25-.02-.2-.13-.22.04-.3.15-.17.23-.36.44-.55.66-.06-.03-.11-.05-.17-.08ZM17.23,24.32c-.08-.22-.16-.46-.25-.69-.01-.03-.1-.07-.14-.06-.04.01-.09.09-.08.12.06.24.12.48.21.72.02.06.1.09.15.14.03-.07.06-.13.11-.24ZM45,24.86s.06-.03.1-.04c-.04-.39-.06-.77-.12-1.16-.02-.15-.1-.29-.19-.42-.3-.43-.68-.83-.92-1.29-.31-.59-.65-1.16-1.04-1.7-.45-.62-1.09-.96-1.7-1.35-.04-.02-.11,0-.16,0,.02.05.04.1.07.15.22.36.46.68.9.8.1.03.21.11.28.19.32.42.65.84.94,1.29.16.25.22.57.38.82.25.4.56.76.82,1.15.22.34.51.65.45,1.12-.02.14.14.3.21.45ZM42.28,24.78c-.05-.12-.09-.23-.14-.35-.04.05-.12.13-.11.16.05.13.13.25.2.37.01-.06.03-.12.05-.19ZM15.15,24.4s-.05,0-.08-.01c-.04.16-.09.33-.12.49,0,.04.05.09.08.14.04-.03.11-.07.12-.1.01-.17,0-.35,0-.52ZM24.19,25.43c-.09.05-.2.16-.27.14-.38-.15-.76-.33-1.13-.51-.05-.02-.1-.14-.08-.19.02-.06.13-.14.17-.12.42.17.83.36,1.24.54.02.01.03.07.06.15ZM42.48,26.11c-.03-.16-.05-.34-.1-.51-.02-.06-.11-.1-.17-.14-.02.06-.07.13-.07.19.02.23.06.47.1.7,0,.04.07.1.11.11.03,0,.1-.05.11-.1.02-.07.02-.15.03-.24ZM17.19,26.59c-.15-.21-.33-.27-.71-.13.31.08.49.13.66.18.19.25.41.46.7.55.03-.04.05-.08.08-.11-.24-.16-.49-.33-.73-.49ZM12.27,25.11s.06.05.09.08c.19-.13.41-.23.55-.4.16-.2.39-.51.33-.69-.08-.24-.39-.42-.63-.59-.1-.08-.26-.09-.4-.12-.76-.17-1.52-.18-2.3-.06-.37.06-.75.03-1.07-.22-.05-.04-.1-.11-.14-.1-.41.06-.85.05-1.21.22-.82.39-1.39,1.06-1.75,1.89-.14.32-.26.67-.35,1.01-.09.34-.12.7-.18,1.04.04,0,.08.02.12.03.05-.1.1-.2.14-.31.28-.67.53-1.37.85-2.02.15-.31.45-.54.7-.79.05-.06.17-.05.26-.07,0,.07,0,.15-.03.21-.11.27-.24.53-.33.8-.03.07.03.17.05.25.06-.04.14-.06.19-.12.11-.13.21-.28.32-.42.06.14,0,.22-.02.31-.11.32-.23.63-.3.96-.02.1.1.23.16.35.08-.07.19-.13.24-.22.28-.52.51-1.07.82-1.58.3-.49.73-.84,1.36-.81.55.02,1.11.05,1.66.04.5-.01.87.22,1.23.51.15.13.19.23.03.38-.14.13-.26.28-.39.42ZM10.58,27.3c.44-.08.79-.21,1.09-.53.33-.36.02-.76.27-1.08-.05-.02-.09-.05-.14-.07-.41.56-.81,1.12-1.22,1.67ZM16.4,26.5c.09-.25.17-.5.25-.75,0-.03-.02-.08-.05-.1-.02-.02-.09-.03-.1-.02-.08.2-.17.4-.22.6-.02.08.06.17.11.26,0,0,0,.01,0,.02,0,0,0,.01,0,.02-.54.23-.62.71-.75,1.3.51-.37.66-.82.75-1.3,0,0,.02,0,.03-.01,0-.01-.01-.02-.02-.03ZM39.71,25.01c-.03.19-.06.39-.08.58-.03.25-.1.34-.31.11-.13-.14-.3-.24-.47-.34-.16-.09-.24.02-.17.15.1.18.24.36.39.5.32.29.36.46.14.82-.08.13-.18.26-.24.4-.02.05,0,.18.04.2.05.03.18.02.21-.02.11-.13.2-.29.3-.44.13-.21.25-.3.43-.04.33.48.67.95,1.01,1.42.04.05.12.08.18.11,0-.07.05-.16.02-.22-.27-.46-.54-.92-.83-1.36-.16-.24-.42-.41-.39-.75.07-.89.12-1.77.19-2.66,0-.11.03-.31.08-.32.53-.13.17-.36.07-.54-.09-.15-.21-.3-.36-.39-.23-.15-.2-.19.01-.34.22-.15.15-.3-.16-.37-.69-.15-1.38-.28-2.07-.41-.05,0-.14.02-.15.05-.01.05,0,.13.04.16.12.1.24.21.38.26.24.08.49.11.73.17.29.07.45.22.56.53.31.89.55,1.77.46,2.73ZM39.79,28.85c-.08-.17-.15-.3-.21-.43-.13.15-.3.29-.37.47-.02.05.21.21.33.32.08-.12.16-.23.25-.36ZM41.98,28.14s-.07.02-.1.02c.06.25.06.55.19.75.24.35.55.66.88.93.14.11.41.08.63.09.05,0,.11-.08.17-.12-.06-.03-.13-.09-.19-.08-.56.08-.88-.21-1.11-.67-.15-.31-.31-.61-.47-.92ZM39.46,29.3c-.17.16-.3.3-.39.47-.09.17-.14.37-.13.62.37-.31.56-.6.53-1.09ZM39.86,30.98c.08-.18.14-.31.19-.44,0-.02-.07-.06-.1-.09-.08.12-.16.24-.23.36,0,.02.06.07.14.17ZM37.39,30.32c.09.11.17.22.26.34.09.11.18.23.27.35q-.29-.09-.52-.68ZM26.57,29.63c-.07-.26-.19-.51-.19-.77,0-.43.45-.75.98-.77.29,0,.59.26.63.6.01.09-.03.19-.08.26-.01.02-.17,0-.19-.04-.16-.24-.36-.39-.65-.24-.3.15-.52.36-.49.74,0,.07,0,.14-.01.21,0,0,0,.01,0,.02,0,0,0,.02,0,.01h0s0,0,0,0c.26-.11.34.07.35.25.02.4.24.45.56.36.11-.03.24-.06.35-.03.07.02.19.16.18.18-.15.27-.28.58-.51.76-.33.27-.73.21-1-.1-.15-.17-.27-.39-.35-.61-.05-.14-.07-.33,0-.46.05-.1.23-.14.35-.22.04-.03.06-.09.08-.14,0,0,0-.02,0-.03ZM19.21,31.44c.67-.42.67-.42.71-.69.13-.83-.14-1.54-.64-2.19-.03-.04-.1-.05-.15-.08-.02.05-.08.1-.07.14.09.38.11.81.32,1.11.12.17.18.31.19.49.03.44-.05.85-.37,1.21ZM33.54,23.53c.58,0,.83.27.83.8,0,.15.08.31.14.45.05.1.13.19.2.28.02-.1.02-.2.06-.29.01-.03.09-.04.14-.05.02.22.22.28.34.41.05.06-.02.26-.07.39-.07.18-.15.14-.23,0-.02-.04-.1-.09-.1-.09-.41.37-.5.02-.65-.26-.13-.23-.54-.24-.52-.63,0-.03-.22-.05-.32-.1-.19-.09-.38-.18-.54-.31-.18-.15-.17-.3.1-.37.09-.02.18-.07.26-.12.04-.03.06-.11.05-.15-.01-.04-.09-.09-.13-.09-.4.1-.86.02-1.13.48-.14.25-.36.48-.6.65-.26.19-.27.38-.2.66.1.44.1.9.2,1.34.06.3.18.6.33.87.14.25.36.47.54.69-.19.02-.46-.03-.54.07-.09.12-.04.37,0,.55.04.19.11.39.23.54.08.1.28.17.41.15.17-.03.23-.19.15-.38-.03-.07.03-.17.04-.25.07.07.19.12.21.21.11.38.07.71-.26,1.02-.45.43-.93.86-1.35,1.3-.49.5-1,.53-1.56.53-.79,0-1.32-.6-1.31-1.39,0-.18.09-.26.27-.19.16.07.32.16.48.22.59.2,1.02-.19,1.45-.46.17-.11.26-.31.52-.25.05.01.13-.08.17-.14.24-.33.28-.97,0-1.29-.56-.63-.65-1.39-.58-2.16.05-.59-.09-1.13-.22-1.68-.16-.69-.27-1.4-.37-2.1-.04-.28-.04-.58,0-.86.02-.13.13-.32.25-.36.49-.18,1-.31,1.51-.47.28-.09.48.06.62.24.53.7,1.06,1.41,1.56,2.13.3.43-.23.23-.38.46ZM45.6,31.19c-.07-.12-.1-.26-.18-.3-.23-.12-.23-.11-.27-.17-.14-.2-.28-.4-.44-.6-.03-.03-.12-.05-.16-.03-.04.02-.07.09-.06.14.03.37.03.75.13,1.1.06.23.26.42.41.62.01.02.17-.02.19-.06.04-.11-.02-.25.18-.31.1-.03.13-.25.19-.4ZM16.25,33.49c-.11.18-.21.35-.31.51.03.02.08.05.09.04.11-.15.21-.3.31-.45,0,0-.02-.03-.09-.1ZM41.44,30.94c-.5.23-.56.61-.67.97-.02.07-.09.12-.13.18-.06-.05-.14-.09-.16-.15-.09-.21-.16-.44-.25-.66-.02-.04-.07-.07-.11-.1-.03.04-.1.09-.1.12.15.45-.15.95.15,1.39.05.08.01.31-.06.36-.46.33-.71.89-1.28,1.11-.32.12-.4.48-.45.79-.01.08.03.21.09.25.06.04.18.02.27,0,.05-.01.09-.07.13-.11.29-.27.56-.55.86-.79.38-.3.78-.58,1.18-.85.05-.03.18.03.26.07.21.1.41.23.63.32.07.03.18-.03.27-.05-.03-.08-.04-.18-.09-.24-.14-.14-.3-.26-.44-.39-.25-.24-.41-.47-.28-.88.13-.4.13-.85.19-1.33ZM24.82,35.02c.06-.19-.04-.53.44-.44.2.04.44-.15.66-.23.62-.23,1.29-.33,1.84-.75.09-.07.32-.03.43.04.5.3,1,.32,1.53.13.09-.03.2-.06.29-.04.6.18,1.2.37,1.8.56.13.04.27.07.39.12.12.05.32.11.32.17.02.28-.14.5-.39.6-.08.03-.24-.04-.32-.12-.35-.34-.5-.38-1-.14-.54.26-1.1.46-1.71.41-.35-.03-.71-.07-1.04-.19-.66-.25-1.27-.13-1.9.08-.28.09-.57.14-.86.21-.41.09-.49.04-.49-.41ZM13.26,36.28h.09c.01-.08.02-.17.04-.27.01-.09.03-.17.04-.26,0,0-.09-.04-.09-.03-.06.09-.13.19-.15.29-.01.08.04.18.07.27ZM13.78,30.93s-.06,0-.09-.01c-.09.27-.19.54-.27.82-.25.9-.4,1.82-.25,2.75.1.59.26,1.18.91,1.53-.16.08-.29.1-.36.18-.07.07-.08.2-.11.31.11,0,.21,0,.32-.03.05-.01.08-.08.12-.12.42-.38.84-.76,1.25-1.16.19-.19.36-.42.51-.65.04-.06.01-.18.01-.27-.08.03-.19.03-.25.09-.43.46-.86.93-1.29,1.4-.66-.79-.69-1.71-.64-2.64.04-.73.1-1.46.14-2.2ZM44.38,36.59c.19-.25.37-.49.56-.73,0-.01.04,0,.06-.01-.06.5-.23.71-.61.74ZM20.91,34.74c-.04.13-.06.28-.13.39-.29.49-.31,1.02-.27,1.56,0,.12.08.24.12.35.07-.11.15-.22.19-.34.09-.28.16-.57.24-.86.11-.38.05-.74-.16-1.09ZM14.06,37.33c.11-.22.23-.44.33-.66.02-.04-.02-.11-.04-.16-.05.02-.12.03-.14.06-.11.21-.21.42-.3.64,0,.02.1.08.16.12,0,0,0,.01,0,.02,0,0,0,0,.01-.01,0,0,0,0,0,0ZM18.64,35.93c.05-.11.1-.22.15-.34-.02,0-.04-.01-.05-.02-.03.12-.06.24-.09.35-.01.03-.03.07-.04.1,0,.01,0,.02,0,.03-.12.44-.24.88-.36,1.32.05.01.11.02.16.03.06-.45.33-.86.2-1.35v-.02s.02-.06.03-.09v-.03ZM30.44,37.44c-1.12-.13-2.04-.25-2.95-.35-.19-.02-.33-.11-.26-.3.04-.1.24-.22.35-.2.86.16,1.68-.12,2.52-.17.46-.03.84.12,1.25.23.19.05.22.24.03.35-.36.19-.73.35-.93.45ZM8.94,35.51c-.03.65-.27,1.26-.05,1.89,0,.02-.03.08-.04.08-.03,0-.08-.02-.1-.04-.15-.26-.32-.51-.21-.83.13-.37.27-.74.4-1.1ZM37.24,37.65s.05-.05.08-.08c-.06-.07-.11-.16-.18-.21-.11-.08-.24-.14-.36-.22.07.12.14.25.23.36.06.07.16.1.24.15ZM19.14,35.64l-.51,2.13c.51-.62.6-1.35.51-2.13ZM41.49,37.78s-.05,0-.07-.05c-.02-.03,0-.1.03-.14.04-.04.1-.06.15-.08.14-.06.29-.12.44-.19,0,.02.02.05.01.05-.18.13-.36.26-.57.4ZM16.11,35.61c-.39.71-.11,1.38.04,2.05.02.09.11.16.18.22.04.04.12.05.18.07,0-.05.02-.1.01-.15-.1-.54-.19-1.08-.29-1.62-.04-.19-.08-.38-.12-.57ZM20.07,39.02s.07.05.1.07c.35-.49.63-1,.72-1.73-.31.62-.56,1.14-.82,1.65ZM14.39,39.1c-.06.04-.12.07-.19.11-.02-.04-.06-.11-.05-.11.06-.04.13-.07.19-.11.01.03.03.06.04.11ZM35.8,38.27c-.01.33.03.56.13.72.11.16.29.25.56.32-.23-.34-.44-.67-.69-1.04ZM11.37,32.88c-.19.49-.38.89-.79,1.12-.05.03-.05.14-.07.22-.05.21-.07.43-.16.63-.22.5-.28,1.02-.25,1.55,0,.08,0,.16,0,.24-.13,1.01.12,1.91.79,2.69.03.04.11.06.15.04.03-.01.07-.11.06-.14-.14-.27-.3-.54-.44-.81-.04-.07-.07-.17-.06-.25.05-.54.1-1.08.16-1.62.07-.68.29-1.33.48-1.98.14-.5.39-1.02.14-1.69ZM14.07,37.34h0c-.32.4-1.78,1.65-2.18,1.87-.03.02-.06.08-.05.09.03.03.1.09.12.08.4-.19.8-.38,1.19-.59.03-.02.29.08.5-.17.13-.15.19-.31.28-.47.19-.35.49-.64.71-.98.09-.13.1-.31.15-.47-.04-.02-.08-.04-.12-.06-.1.13-.19.27-.3.4-.09.11-.2.2-.3.3ZM18.59,38.55c-.36.32-.66.57-.94.83-.04.04-.04.13-.04.2,0,0,.09.04.1.02.33-.27.86-.35.88-1.05ZM20.14,39.61s0,.04-.02.06c-.05.07-.11.14-.17.21,0-.08-.02-.15,0-.23,0-.05.06-.1.09-.14.03.03.07.07.1.1ZM16.14,40.19c.06.03.11.06.17.09.16-.22.32-.43.48-.65.01-.02,0-.07,0-.1-.18.09-.37.16-.54.27-.07.04-.13.13-.16.21-.02.05.03.12.06.18ZM13.34,40.63c.23-.06.54-.04.69-.19.48-.48.77-1.09.84-1.78,0-.06-.05-.13-.07-.2-.34.23-.22,0-.2-.18.01-.11-.01-.22-.02-.33-.11.07-.23.11-.32.2-.1.09-.16.22-.23.34-.17.26-.33.52-.5.78-.13.2-.03.24.15.22.05,0,.11.02.16.02-.03.05-.04.12-.08.15-.2.13-.41.24-.6.38-.18.13-.35.28-.53.41.22.05.45.11.71.17ZM36.21,41.07c0,.28.12.42.36.42.06,0,.17-.12.18-.2.03-.26-.05-.49-.33-.54-.05,0-.14.2-.21.31ZM27.93,17.18c-.49-.19-.68-.3-1.2-.24-.45.05-.9.12-1.34.23-.84.21-1.67.46-2.51.69-.46.13-.91.32-1.37.37-.57.05-1.02.3-1.45.62-.43.32-.84.66-1.27.97-.43.31-.45,1.02,0,1.33.22.16.37.3.21.58-.03.06-.01.15-.01.22.08-.04.18-.05.23-.11.64-.81,1.48-1.15,2.49-1.18.95-.03,1.9-.1,2.85-.16.84-.06,1.66.01,2.46.27.61.2.89.5.94,1.11.01.19-.03.28-.23.18-.21-.11-.41-.26-.63-.34-1.63-.57-3.28-.69-4.96-.22-.27.07-.61.07-.78.24-.45.43-1.14.14-1.55.61q-.77.14-.58.92c.01.06.04.11.05.17.03.71.05,1.42.07,2.14,0,.12-.07.29-.2.15-.22-.25-.53-.44-.46-.89.08-.53-.08-1.03-.45-1.6.05.32.09.51.11.7.02.15.03.31.02.47,0,.04-.06.08-.11.1-.01,0-.07-.04-.09-.07-.21-.51-.43-1.02-.63-1.53-.05-.12-.08-.24-.13-.36-.1.22-.11.43-.08.63.13.79.67,1.41.93,2.15.04.12.17.21.26.32.44.53.94,1.02,1.16,1.71.22.66.49,1.3.71,1.96.26.76.45,1.53-.08,2.28-.12.17-.09.42-.16.63-.14.42-.22.83-.53,1.22-.41.49-.84.68-1.43.65-.14,0-.28.03-.42.04.21.16.42.2.62.24.16.04.26.1.12.28-.18.24-.35.48-.5.74-.07.12-.1.28-.14.42.15-.04.35-.04.46-.14.32-.29.6-.62.9-.93.12-.13.23-.36.37-.37.41-.05.48-.37.62-.63.2-.38.4-.76.63-1.19.38.43.51.91.63,1.38.07.25.13.5.19.74.05.2.1.4.12.61.02.14-.01.28-.02.41-.03.61-.03,1.23-.1,1.83-.03.27,0,.46.18.64,1.14,1.11,2.33,2.16,3.76,2.89.94.48,1.94.72,2.97.35.72-.26,1.44-.38,2.19-.47.58-.07,1.12-.32,1.45-.83.41-.62.81-1.24,1.12-1.92.3-.64.38-1.32.5-1.99.1-.5.2-.98.42-1.45.19-.39.37-.78.5-1.19.33-1.1.63-2.2.94-3.31.11-.37.09-.73-.04-1.09-.27-.73-.32-1.08-.23-1.71.12.93.8,1.45.98,2.21,0,.02.02.03.03.05.31.58.76,1.04,1.24,1.48.13.12.71.16.72.05.04-.29.26-.39.45-.54.05-.04.02-.18.02-.27-.07,0-.18-.02-.21.02-.26.38-.48.25-.73,0-.12-.13-.27-.26-.42-.31-.64-.2-.76-.71-.86-1.27-.04-.24-.15-.5-.3-.7-.46-.6-.51-1.31-.63-2.01-.02-.09,0-.2.05-.29.03-.06.12-.1.18-.14.02.07.05.13.05.2.02.47.03.95.04,1.42.04,0,.09,0,.13,0,.02-.57.1-1.14.04-1.7-.03-.29-.05-.53.04-.8.14-.41.29-.82.42-1.23.02-.07-.02-.16-.04-.24-.07.06-.17.1-.21.17-.11.19-.2.4-.29.6-.16-.44-.22-.87-.3-1.28-.05-.25-.16-.48-.21-.73-.01-.06.09-.15.14-.23.17.29.22.11.16-.06-.19-.57-.32-1.21-.66-1.68-.45-.63-.97-1.24-1.7-1.62-.24-.12-.46-.32-.65-.52-.13-.14-.31-.35-.28-.49.06-.26-.09-.35-.21-.5-.31-.38-.62-.76-.93-1.13-.08-.1-.19-.17-.29-.25.01.13,0,.26.04.38.06.14.16.27.24.4.29.45.58.9.89,1.39-.28-.18-.56-.48-.72-.43-.28.09-.36-.06-.47-.18-.68-.74-1.03-1.63-1.22-2.59-.02-.09-.06-.18-.09-.27-.14,1.75.43,3.19,1.86,4.27-.51-.14-1.01-.29-1.43-.56-.4-.25-.79-.43-1.25-.46-.09,0-.24-.11-.25-.18-.03-.35-.45-.54-.56-.62-.35-.28-.72-.54-1.08-.8-.07-.05-.18-.05-.37-.1.55.46.71.85,1.17,1.24ZM16.86,42.25c-.09-.55-.18-1.01-.25-1.47-.03-.18,0-.39-.28-.31-.22.06-.42.14-.31.44.17.47.33.95.84,1.34ZM30.64,43.79s.1.07.14.1c.21-.24.42-.49.62-.74.03-.04,0-.13,0-.2-.07.01-.18,0-.22.04-.19.26-.37.53-.56.79ZM43.66,32.37c.15.4.38.79.41,1.2.03.34.13.6.3.86.23.36.22,1.22-.05,1.45-.33.27-.45.62-.43,1,.04.79-.63,1.02-1.06,1.43-.13.12-.78-.07-.79-.22,0-.15.13-.33.23-.48.1-.15.2-.3.33-.42.47-.45.66-1.06.96-1.61.02-.04,0-.11,0-.16-.07.01-.16,0-.2.04-.26.25-.51.51-.76.76-.04-.03-.09-.06-.13-.09.38-.47.4-1.03.5-1.58.21-1.14.19-2.26-.13-3.38-.02-.05-.04-.11-.07-.16-.02-.03-.07-.05-.1-.05-.02,0-.07.05-.06.07,0,.12,0,.24.04.35.13.39.21.75-.09,1.11-.08.09-.05.27-.06.4-.02.48-.03.97-.04,1.46-.01.37-.08.7-.5.84-.18.06-.22.17,0,.27.05.02.11.06.13.1.3.7-.1,1.45-.86,1.61-.07.02-.21-.03-.24-.09-.26-.67-.76-1.29-.51-2.09.04-.12-.07-.29-.11-.43-.1.06-.2.12-.3.17-.03.02-.08.06-.1.05-.45-.12-.36.18-.36.44.01,1.14.61,3.07,1.3,3.96.07.09.09.24.07.34-.02.14-.09.29-.19.39-.04.04-.23,0-.31-.07-.12-.09-1-.83-1.08-.96-.3-.51-.59-1.02-.88-1.53-.11-.18-.3-.36-.31-.55-.08-1.03-.12-2.06.29-3.04.35-.87.7-1.74,1.05-2.6-.47.18-.47.18-.97.87-.5.69-.74,1.49-.76,2.32,0,.4-.01.79-.05,1.19-.03.31-.05.62-.04.94,0,.29.03.59.08.88.08.42.12.86.54,1.1.35.2.36.22.06.52-.1.1-.21.18-.28.28-.04.06-.05.22-.02.24.35.2.29.53.28.84,0,.18,0,.36.04.53.06.28.16.31.42.2.43-.18.37-.53.3-.9.3.27.56.51.8.73-.5.37-.97.71-1.43,1.07-.14.11-.21.08-.27-.05-.16-.34-.35-.67-.43-1.03-.04-.17-.48-.42.01-.59-.02-.04-.04-.11-.06-.11-.39-.09-.38-.39-.42-.69-.07-.48-.15-.97-.25-1.45-.02-.09-.12-.17-.18-.25-.03.09-.08.17-.08.26.01.45.06.9.11,1.34.09.87.44,1.61.82,2.35.12.24.44.44.46.67.02.23-.23.48-.36.72-.02.03-.03.07-.04.11-.14.37-.14.37.25.43,1.67.25,3.34.48,5,.75.82.13.82.16,1.08-.58,0-.02.03-.04.03-.05-.02-.06-.02-.15-.06-.18-.31-.2-.59-.46-1-.47-.37-.01-.74-.1-1.11-.15,0-.04,0-.08,0-.13.45,0,.9-.02,1.35,0,1.33.08,1.25.06,1.71-1.25,0-.02.01-.04.02-.06.07-.19.03-.31-.2-.31-.14,0-.28,0-.42,0h-2.48c.39-.44.71-.72,1.22-.7.65.02,1.31,0,1.97,0,.33,0,.46-.2.54-.45.07-.24.1-.48.14-.73.05-.31-.08-.47-.39-.51-.2-.02-.41-.02-.65-.03q.47-.62.83-.63c.44-.01.68-.2.78-.63.03-.13.04-.27.07-.41.04-.23.06-.44-.28-.46-.05,0-.14-.14-.13-.2.05-.23.04-.55.42-.51.19.02.25-.1.26-.25.01-.22.02-.44.03-.65.01-.33-.04-.61-.52-.67.09-.13.22-.17.29-.25.17-.19.42-.38.45-.59.11-.73.19-1.48.2-2.22,0-.94-.06-1.88-.11-2.82-.04-.76-.07-1.53-.13-2.29-.05-.67-.07-1.35-.21-2-.16-.79-.43-1.56-.38-2.39,0-.08-.1-.23-.14-.22-.29.02-.57.07-.86.12.04.24.08.49.13.73.01.06.05.11.08.16.7,1.12.82,2.32.47,3.56-.1.35-.25.7-.69.79-.13.03-.23.16-.39.28.29.06.53.18.7.12.44-.15.38.13.36.36-.02.17-.1.33-.15.49-.43-.28-.84-.54-1.25-.82-.09-.06-.17-.17-.22-.27-.2-.45-.31-.51-.84-.37.23.12.42.22.66.34-.27.04-.48.07-.71.11.27.46.6.76,1.01.98.49.26.93.57,1.05,1.19.04.23.26.42.4.63.05.08.14.16.16.25.2.84.28,1.66-.52,2.26-.2.15-.22.31-.16.51.06.21.13.42.18.63.11.55.05,1.05-.41,1.51-.09-.33-.21-.62-.25-.92-.05-.34.03-.71-.05-1.04-.06-.24-.29-.45-.44-.67-.34.2-.55-.15-.83-.19,0,0,0-.01,0-.02,0,0-.01,0-.02-.01-.09-.31-.37-.59-.15-.96.02-.04-.11-.19-.18-.27-.03-.04-.11-.07-.14-.06-.03.01-.08.1-.07.14.13.41.13.88.54,1.16,0,0,0,.02,0,.02,0,0,.01,0,.02,0ZM20.04,39.5c-.3-.3-.42-.31-.65-.05-.17.19-.31.4-.51.56-.66.53-.83,1.19-.66,2.01.09.45.08.93.09,1.4.01.47,0,.94.01,1.41,0,.27.13.44.44.44.29,0,.5.13.68.38.14.18.4.3.63.39.36.14.75.24,1.13.34.1.03.24.03.33-.02.5-.28,1-.56,1.49-.86.49-.29.52-.65.18-1.09-.32-.4-.65-.81-.86-1.26-.34-.72-.62-1.47-1.13-2.1-.15-.18-.29-.39-.36-.61-.11-.39-.35-.65-.7-.82-.03-.03-.07-.07-.1-.1ZM8.87,34.42c-.05.05-.1.14-.16.16-.57.16-.85.5-.87,1.09-.01.47,0,.93,0,1.41-.39-.21-.53-.37-.65-.77-.07-.27-.08-.56-.2-.8-.36-.73-.04-1.42.07-2.12.03-.16.11-.32.16-.48-.15.13-.3.25-.43.4-.07.09-.1.21-.14.32-.29.76-.1,1.54-.09,2.32,0,.07-.02.13-.03.2-.05-.02-.13-.03-.16-.07-.35-.43-.72-.84-1.02-1.31-.13-.2-.48-.57.13-.71.07-.02.09-.2.15-.3.15-.26.29-.52.45-.76.03-.04.19-.05.19-.04.13.36.21.08.26-.03.19-.4.51-.58.95-.59.19,0,.39-.06.56-.15.38-.19,1.01-.1,1.27.21.13.15.5-.35.65-.51.24-.26.5-.52.65-.83.34-.71.78-1.31,1.44-1.76.14-.1.23-.27.35-.39.22-.22.44-.44.67-.65.14-.14.3-.26.45-.39.21-.19.31-.53.68-.5.03,0,.08-.07.1-.11.18-.44.35-.87.52-1.31.07-.19.13-.39.2-.59-.05-.02-.1-.04-.14-.05-.1.23-.18.46-.3.67-.06.11-.24.28-.29.26-.22-.1-.25,0-.24.17.02.48-.15.83-.62,1.01-.23.09-1.34,1.13-1.66,1.48-.5.55-1.11,1.01-1.43,1.72-.09.19-.25.35-.39.52-.02.02-.16-.02-.16-.04-.04-.3-.15-.62-.09-.89.13-.59.35-1.17.53-1.75.05-.17.1-.33.15-.5-.6.85-1.04,1.75-1.01,2.81,0,.29-.05.58-.06.87,0,.2-.07.3-.28.24-.28-.08-.55-.17-.83-.25.1-.06.18-.04.25-.06.08-.03.14-.09.21-.14-.06-.05-.11-.11-.18-.13-.09-.02-.2-.03-.3-.01-.58.08-1.18.13-1.75.28-.26.07-.33,0-.37-.2-.03-.13-.05-.3.01-.39.25-.35.28-.77.45-1.14.24-.49.51-.97.82-1.42.51-.73,1.04-1.44,1.59-2.14.36-.46.66-1.02,1.34-1.08.39-.03.78,0,1.17,0,.09,0,.18-.01.28-.02-.05-.09-.08-.25-.16-.27-.33-.11-.7-.32-1-.25-.62.17-1.27.29-1.75.83-.72.81-1.41,1.63-1.81,2.66-.19.48-.48.92-.74,1.41-.09-.21-.15-.35-.22-.5-.09.3-.06.57-.06.85,0,.06-.04.12-.07.19-.03-.06-.07-.11-.09-.17-.07-.16-.1-.41-.22-.46-.36-.14-.39-.4-.37-.71,0-.13-.03-.27-.07-.41-.13-.53-.26-1.05-.4-1.57-.06.39-.12.81-.07,1.2.05.4.21.78.34,1.24-.65-.28-.9-.74-.86-1.27.06-.76.18-1.53.4-2.27.16-.56.52-1.02.96-1.45.37-.36.71-.75,1.2-.92.61-.21,1.19-.53,1.85-.56.07,0,.14-.05.2-.07,0-.03,0-.06-.01-.09-.38.03-.75.05-1.11.08.3-.29.66-.47,1.11-.42.07,0,.14-.04.21-.06-.17-.11-.06-.19.04-.25.12-.06.25-.12.38-.14.18-.02.37,0,.55,0-.14.11-.27.22-.46.37.2,0,.36-.03.51,0,.12.03.22.19.34.21.37.07.75.1,1.12.13.08,0,.16-.06.24-.1-.04-.07-.06-.15-.11-.19-.13-.09-.26-.18-.41-.24-.5-.2-1.04-.32-1.5-.59-.64-.38-1.24-.23-1.82,0-.47.18-1,.36-1.23.9-.07.15-.09.38-.34.34-.29-.05-.2-.29-.22-.47-.05-.41.26-.69.39-1.04.07-.19.08-.28-.13-.35-.45-.15-.9-.32-1.35-.46-.36-.11-.58.06-.64.46-.02.09-.08.17-.1.27-.13.45-.34.89-.37,1.35-.02.3-.07.57-.17.85-.07.18-.11.38-.13.57-.07.68.09,1.39-.25,2.04-.05.09-.03.23-.02.35.06.89-.09,1.76-.23,2.63-.08.47-.02.55.49.54.33,0,.57.09.77.35.15.21.07.29-.14.31-.22.01-.44,0-.66,0-.47,0-.48.01-.45.46,0,.08.01.16.02.24.04.31-.03.74.15.9.18.17.6.07.91.09.15.01.29.05.44.07-.08.14-.12.31-.24.4-.13.1-.31.17-.47.19-.69.06-.69.05-.69.76,0,.08,0,.16,0,.24.04.29.12.56.47.59.33.03.19.3.23.46.04.18-.1.24-.26.23-.32-.02-.38.12-.28.4.04.11.03.23.05.35.08.56.28.74.84.74.1,0,.2,0,.3,0,.1.01.44.47.39.52-.09.08-.23.11-.35.13-.19.03-.44-.02-.57.08-.1.08-.06.34-.08.53,0,.06-.01.12,0,.18,0,.56.18.74.74.74.79,0,1.59,0,2.38-.03.51-.03.81.2,1.05.69-.21,0-.36,0-.51,0-.93,0-1.87,0-2.8-.02-.25,0-.44,0-.31.36.11.31.18.65.22.98.04.32.19.39.48.37.49-.04.99-.07,1.48-.07.71,0,1.43.11,2.14.05.7-.06,1.2.26,1.73.65-1.01.05-2.02.05-3.02.05-.67,0-1.35,0-2.02-.02-.26,0-.36.08-.31.35.08.46.25.9.57,1.21.26.25.67.19,1.02.1.05-.01.11.03.17.03.93,0,1.86.02,2.79.01.8,0,1.61-.05,2.41-.05.79,0,1.58.03,2.36,0,.44-.01.81.13,1.16.36.06.04.07.17.11.25-.07.03-.14.07-.21.07-.56,0-1.12-.02-1.69-.02-.43,0-.86.04-1.29.04-.34,0-.67-.02-1.01-.03-.24,0-.47-.02-.71-.01-.4.01-.79.06-1.19.06-1.02,0-2.04,0-3.06,0-.19,0-.38.05-.57.08.05.17.1.34.14.5.01.06,0,.13.02.18.13.26.23.57.43.76.11.1.4.01.61.01.06,0,.12,0,.18,0,1.1,0,2.2,0,3.29,0,.27,0,.55.01.82.02,0,.04,0,.09.01.13-.4.16-.79.42-1.2.46-.87.1-1.74.09-2.62.1-.25,0-.5-.06-.82-.09.42.76.8,1.44,1.18,2.13.1.18.24.17.41.1.91-.4,1.81-.79,2.72-1.18,1.2-.51,2.4-1.01,3.61-1.52.73-.31,1.5-.55,2.04-1.18.22-.26.21-.32-.07-.48-.29-.16-.61-.3-.83-.54-.31-.33-.69-.59-.83-1.11-.18-.65-.45-.71-1.14-.61-.02,0-.04.02-.06.01-.32-.01-.65,0-.95-.06-.22-.05-.43-.19-.6-.35-.3-.29-.83-.25-1.01-.72,0-.02-.63-.37-.77-.53-.46-.52-.94-1.01-1.4-1.53-.1-.11-.2-.27-.2-.4.04-.91.08-1.81.17-2.71.03-.25.11-.39-.23-.27-.01,0-.08-.11-.1-.18-.02-.09-.02-.18-.03-.27h0c.19-.03.38-.03.56-.08.04,0,.03-.17.05-.26-.09-.01-.2-.07-.25-.03-.13.1-.24.24-.35.36,0,0,0,0,0,0,0,0,0,0,0,0ZM36.78,40.12s.05-.08.07-.12c-.07-.06-.15-.12-.23-.17-.67-.46-1.37-.87-1.86-1.54-.06-.08-.17-.13-.25-.19,0,.13-.03.27,0,.39.03.1.14.19.22.28.23.24.64.46.66.71.02.3-.27.63-.44.94-.24.43-.49.85-.76,1.26-.23.34-.5.66-.75.99-.19.25-.35.53-.57.75-.55.54-1.1,1.07-1.69,1.56-.35.29-.48.6-.36,1.04.06.2.06.42.07.64,0,.25-.04.5-.03.74,0,.21.1.41-.1.61-.14.13-.07.35.11.35.15,0,.31-.18.46-.28.06.19.09.4.36.38.02,0,.04,0,.06,0,1.12-.19,2.27-.33,3.03-1.35.04-.06.13-.09.19-.14.76-.59,1.52-1.18,2.27-1.78.11-.09.19-.26.21-.4.09-.76,0-1.51-.3-2.21-.11-.26-.34-.47-.53-.7-.04-.05-.15-.12-.2-.1-.3.13-.65.23-.86.45-.62.65-1.18,1.36-1.79,2.02-.3.32-.65.59-.98.89-.03-.03-.07-.06-.1-.09.29-.38.62-.75.87-1.16.53-.88,1.03-1.77,1.53-2.67.19-.34.34-.71.53-1.05.21-.38.3-.4.7-.23.16.07.32.12.48.18ZM27.48,46.43c-.04-.09-.06-.13-.06-.17-.1-.52-.18-1.04-.31-1.55-.04-.15-.19-.32-.34-.39-.26-.13-.54-.23-.83-.3-.71-.16-1.36-.35-1.67-1.14-.2-.49-.49-.95-.8-1.39-.19-.27-.45-.55-.74-.66-.62-.23-.97-.73-1.37-1.18-.12-.13-.2-.3-.31-.43-.04-.04-.12-.05-.19-.07,0,.05-.03.12,0,.16.14.24.32.45.43.7.33.72.82,1.34,1.19,2.04.37.69.67,1.47,1.34,2,.37.29.67.67,1.22.41.08-.04.19-.01.29,0,.48.12.76.29.84.92.02.15.03.42.09.43.34.08.29.29.18.48-.35.58,0,1.11.1,1.64.04.2.22.32.45.1.18-.18.39-.33.6-.47.05-.04.14-.03.21-.04,0,.08.02.16,0,.22-.14.4-.41.72-.74.98-.08.06-.11.18-.17.27.11.02.24.08.34.05.69-.21,1.28-.58,1.56-1.27.34-.82.65-1.67.3-2.58,0-.02.04-.05.07-.09.04.04.09.07.13.11.54.73.28,2.7-.48,3.2-.52.34-.91.91-1.68.91.51.42.98.42,1.46.19.28-.14.53-.35.8-.5.54-.31.68-.91,1.02-1.37.04-.05,0-.19-.03-.28-.11-.39-.38-.81-.31-1.16.14-.7-.34-.94-.72-1.28-.27-.23-.6-.4-.82-.67-.62-.75-1.74-.73-2.68-.5.66.14,1.33.16,1.65.84.28.58.53,1.16.02,1.82ZM26.14,47.58c-.03-.19-.12-.44-.09-.65.12-.7-.42-.97-.82-1.32-.07-.06-.4-.2-.23.18,0,0-.12.11-.17.1-.33-.06-.65-.19-.97-.19-.65-.02-1.1.48-1.62.77-.18.1-.22.45-.32.69.2-.13.44-.23.6-.41.34-.39.74-.5,1.22-.38.68.17,1.22.55,1.67,1.08.08.09.15.2.17.31,0,.06-.14.2-.16.19-.36-.21-1.01.02-1.05-.7,0-.08-.2-.21-.31-.21-.09,0-.19.15-.26.25-.04.06-.02.18-.07.22-.16.13-.34.23-.51.34,0-.16,0-.31,0-.47,0-.02.03-.04.02-.05-.01-.07-.03-.14-.05-.2-.07.02-.17.02-.2.07-.15.25-.28.51-.42.77-.1.18-.17.42-.33.54-.41.3-.39.71-.36,1.12.01.16.07.29.31.15.46-.27.94-.48,1.43-.7.64-.29,1.24-.09,1.82.22.17.09.35.19.53.26.12.04.26.02.4.03-.01-.15.03-.33-.04-.45-.28-.47-.31-.96-.16-1.52ZM29.69,56.9c0-.65.16-1.21-.01-1.82-.31-1.09-1.06-1.78-1.85-2.51-.8-.73-1.55-1.57-1.98-2.6-.09-.22-.19-.31-.43-.31-.31,0-.61-.07-.92-.09-.19-.01-.39-.02-.58.02-.08.02-.18.16-.18.25,0,.25.03.52.09.76.31,1.14.66,2.28.96,3.42.25.99.22,1.97-.06,2.94-.05,0-.1,0-.14,0,.01-.3.04-.6.04-.89,0-.63-.02-1.26-.04-1.89,0-.08-.08-.15-.12-.22-.06.07-.17.13-.19.21-.11.54-.2,1.08-.31,1.61-.06.27-.12.54-.23.8-.05.13-.64.02-.59-.04.76-.92.8-2.07.99-3.17.03-.16-.05-.35-.1-.52-.12-.39-.3-.76-.25-1.2.02-.23-.19-.47-.24-.71-.05-.29-.04-.59-.06-.89-.02-.27-.16-.37-.4-.26-.43.19-.83.43-.86.97-.05.79-.08,1.58-.09,2.37,0,.78-.06,1.54-.33,2.28-.22.6-.78.88-1.16,1.34-.03.04-.11.05-.16.04-.46-.11-.91-.24-1.36-.36-.09-.03-.18-.09-.27-.11-2-.53-3.87-1.37-5.65-2.39-1.08-.62-2.06-1.39-2.91-2.31-.53-.56-1.12-1.07-1.57-1.69-.9-1.25-1.96-2.39-2.65-3.78-.37-.74-.71-1.5-1.03-2.26-.28-.67-.54-1.34-.79-2.03-.11-.31-.17-.64-.27-.96-.11-.38-.24-.75-.34-1.12-.42-1.49-.74-3.01-.99-4.55-.27-1.63-.4-3.26-.33-4.91.05-1.2-.03-2.41.02-3.61.05-.94.19-1.88.35-2.82.15-.92.34-1.83.58-2.73.3-1.14.62-2.28,1-3.39.31-.89.72-1.75,1.11-2.62.34-.76.71-1.52,1.08-2.27.09-.19.27-.32.38-.5.27-.43.53-.87.78-1.31.47-.82,1.13-1.48,1.81-2.13.45-.44.92-.86,1.34-1.32.62-.67,1.34-1.22,2.09-1.72.77-.51,1.6-.92,2.4-1.38,1.55-.89,3.24-1.31,4.92-1.8.81-.24,1.62-.3,2.45-.35.76-.04,1.53-.31,2.28-.26,1.23.08,2.47,0,3.71.25.75.15,1.49.37,2.23.54,1.03.24,2,.69,2.99,1.07.44.17.89.35,1.3.57.92.5,1.82,1.03,2.72,1.55.21.12.42.23.61.36.2.14.39.31.58.48.4.36.78.72,1.18,1.08.67.61,1.27,1.27,1.75,2.06.31.52.75.96,1.14,1.44.86,1.08,1.44,2.32,1.98,3.57.37.84.7,1.7,1.04,2.56.1.25.11.54.19.8.2.63.51,1.25.63,1.89.37,1.89.85,3.77,1,5.7.06.75.09,1.5.1,2.25.02.81.03,1.63,0,2.44-.06,1.87-.16,3.74-.54,5.58-.14.7-.21,1.42-.45,2.09-.39,1.08-.54,2.22-.96,3.28-.34.86-.71,1.71-1.09,2.56-.36.8-.7,1.62-1.14,2.37-.57.97-1.22,1.91-1.88,2.83-.28.39-.69.7-1.04,1.05-.46.45-.91.93-1.39,1.36-.62.55-1.26,1.07-1.9,1.58-.94.76-2.04,1.26-3.09,1.82-.83.44-1.76.7-2.66,1-.74.25-1.51.43-2.25.64ZM26.34,53.91c.06.16.16.32.17.49.08.81.14,1.61.19,2.42,0,.09-.08.19-.12.28-.03-.1-.08-.2-.09-.31-.01-.28,0-.55-.01-.83-.04-.51-.09-1.02-.14-1.53-.02-.17-.06-.34-.09-.5.03,0,.06-.01.08-.02ZM25.55,54.31c.24.52.34,1.1.3,1.6-.04.51-.21.95-.51,1.2.31-.96.38-1.88.21-2.8ZM23.66.98c-1.41.02-2.79.27-4.12.76-.24.09-.47.25-.71.25-.47,0-.88.15-1.3.33-.97.43-1.97.81-2.95,1.2-.35.14-.73.23-1.04.43-.66.43-1.28.9-1.91,1.37-.21.15-.38.37-.6.48-.66.35-1.18.85-1.65,1.43-.26.32-.63.57-.82.93-.18.33-.41.57-.66.81-.18.18-.38.36-.53.56-.43.56-.82,1.15-1.27,1.68-.68.79-1,1.78-1.49,2.67-.54.96-.85,2.03-1.31,3.03-.41.89-.64,1.85-.94,2.79-.16.51-.3,1.03-.42,1.55-.18.75-.35,1.5-.49,2.26-.08.44-.11.89-.14,1.34-.02.33.05.68-.04.98-.17.6-.16,1.2-.18,1.81-.02.56.03,1.12-.04,1.67-.11.91-.01,1.81.04,2.71.08,1.28.21,2.57.36,3.84.1.84.2,1.69.44,2.49.4,1.33.81,2.66,1.26,3.97.59,1.73,1.3,3.39,2.28,4.93.29.46.59.94.95,1.35.52.59.91,1.28,1.41,1.88.41.49.76,1.03,1.27,1.47.68.58,1.24,1.32,2,1.83.93.61,1.8,1.32,2.79,1.79.75.36,1.39.95,2.26,1.12.64.12,1.22.5,1.84.74.85.33,1.72.56,2.63.67.5.06.98.18,1.48.26.25.04.51.04.77.06.95.06,1.89.14,2.84.17.41.02.83-.1,1.24-.06.46.04.9,0,1.34-.14.19-.06.39-.1.58-.12.69-.08,1.36-.24,1.99-.53.28-.13.6-.17.9-.25.28-.08.56-.14.84-.24.5-.18.99-.39,1.49-.59.88-.35,1.78-.66,2.62-1.08.62-.32,1.17-.79,1.74-1.2.43-.31.87-.62,1.29-.95.31-.24.62-.49.89-.77.43-.44.83-.91,1.23-1.37.2-.23.37-.5.57-.73.18-.21.4-.38.57-.6.45-.57.85-1.17,1.31-1.72.66-.8.98-1.78,1.48-2.67.53-.95.82-2,1.29-2.97.42-.88.65-1.85.94-2.79.16-.51.3-1.03.42-1.55.16-.65.29-1.31.43-1.97.18-.85.08-1.72.24-2.56.16-.8.17-1.6.19-2.4.01-.42,0-.84.04-1.25.11-.91,0-1.8-.06-2.7-.07-1.07-.23-2.13-.3-3.19-.11-1.6-.48-3.15-.99-4.66-.27-.8-.57-1.58-.79-2.39-.37-1.35-.97-2.6-1.62-3.81-.51-.95-1.17-1.82-1.78-2.72-.11-.16-.27-.29-.4-.43-.08-.08-.17-.16-.24-.25-.42-.62-.84-1.24-1.27-1.85-.07-.1-.17-.17-.26-.25-.17-.16-.33-.33-.5-.48-.48-.45-.92-.94-1.44-1.33-1.5-1.13-3.1-2.09-4.76-2.98-.1-.06-.21-.1-.33-.14-.39-.12-.8-.19-1.16-.36-1.15-.54-2.32-.97-3.6-1.1-.37-.04-.72-.18-1.08-.23-.6-.08-1.21-.13-1.82-.19-.63-.06-1.26-.14-1.89-.14-.45,0-.91.09-1.36.13ZM26.85,59.5c-.62,0-1.24.01-1.86,0-.84-.02-1.7,0-2.53-.13-1.45-.25-2.89-.58-4.32-.93-.72-.18-1.42-.45-2.12-.73-.72-.29-1.47-.56-2.12-.97-.46-.29-.94-.48-1.4-.74-.17-.09-.3-.25-.43-.4-.13-.14-.23-.33-.48-.27-.05.01-.14-.02-.16-.06-.32-.6-1.07-.64-1.49-1.14-.39-.46-.88-.85-1.31-1.28-.48-.49-1-.96-1.42-1.5-.65-.83-1.25-1.71-1.85-2.58-.45-.66-.87-1.33-1.27-2.02-.43-.75-.91-1.47-1.13-2.33-.07-.26-.23-.5-.39-.73-.36-.54-.36-1.18-.59-1.76-.31-.8-.65-1.61-.81-2.45-.1-.54-.25-1.06-.4-1.59-.22-.75-.13-1.54-.38-2.29-.09-.27-.05-.58-.06-.88-.03-.62-.06-1.25-.11-1.87-.02-.29-.11-.58-.14-.87-.04-.36-.08-.72-.08-1.08-.01-.83-.02-1.65,0-2.48.01-.39.11-.78.14-1.17.12-1.32.21-2.65.36-3.97.07-.58.27-1.15.4-1.72.08-.34.15-.69.25-1.02.17-.6.35-1.19.52-1.79.02-.06.08-.11.08-.16-.08-.57.33-.99.45-1.49.1-.42.32-.81.42-1.22.13-.55.47-.99.7-1.48.29-.62.58-1.25.88-1.86.59-1.21,1.4-2.28,2.25-3.33.48-.59.94-1.2,1.4-1.81.36-.49.84-.86,1.28-1.26.15-.14.3-.28.46-.42.42-.35.83-.71,1.25-1.06.24-.2.48-.4.74-.57.37-.25.74-.49,1.13-.7.55-.3,1.12-.56,1.67-.84.1-.05.2-.13.3-.16.77-.23,1.5-.55,2.21-.91.24-.12.53-.13.79-.21.96-.29,1.9-.63,2.88-.86.88-.2,1.79-.33,2.69-.38,1.04-.06,2.09-.03,3.14-.01.91.02,1.8.2,2.68.38.81.16,1.62.28,2.43.46.52.11,1.02.28,1.53.44.58.18,1.15.38,1.71.59.2.07.38.2.57.3.76.39,1.53.78,2.29,1.18.17.09.35.2.48.34.21.23.36.52.75.5.06,0,.13.14.2.2.2.15.41.28.61.43.3.22.62.43.89.68.46.43.92.87,1.34,1.34.58.64,1.13,1.3,1.7,1.96.77.9,1.38,1.9,1.99,2.91.42.7.9,1.37,1.28,2.09.46.89.99,1.79,1.19,2.75.21,1.01.68,1.91.9,2.91.2.9.4,1.82.73,2.7.07.18.03.39.05.59.1.93.27,1.84.25,2.79-.02.67.2,1.35.29,2.02.04.32.05.64.05.97,0,.85.01,1.69,0,2.54-.01.37-.11.74-.15,1.11-.12,1.32-.21,2.65-.36,3.97-.07.58-.26,1.15-.4,1.72-.08.34-.15.69-.25,1.02-.17.62-.36,1.23-.55,1.84-.02.06-.06.11-.06.16-.18,1.17-.8,2.19-1.08,3.33-.07.29-.34.53-.46.81-.46,1.09-.97,2.16-1.6,3.16-.47.75-1.06,1.42-1.6,2.13-.44.58-.86,1.17-1.32,1.72-.36.43-.77.81-1.18,1.19-.43.4-.86.78-1.32,1.14-.72.56-1.4,1.21-2.2,1.61-.69.33-1.34.72-2.02,1.06-.19.1-.42.11-.62.19-.59.25-1.17.57-1.77.77-.76.26-1.54.43-2.32.64-.23.06-.47.1-.69.19-1.13.45-2.32.54-3.52.65Z\"/>\n  </g>\n</svg>",
    6: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50.33 59.48\">\n  <g>\n    <path class=\"cls-1\" d=\"M22.49,7.27c.05-.11.1-.2.12-.29,0-.01-.1-.08-.13-.07-.07.03-.13.09-.19.14.03.04.07.08.2.22ZM19.06,10.57c-.06.07-.12.15-.19.23-.07.08-.14.16-.22.26-.02-.34.15-.45.41-.49ZM24.7,9.92c-.68.13-1.09.62-1.57,1.01-1.12.94-1.12.95-1.17,1.39.51-.35.97-.66,1.44-.98.08-.05.17-.1.27-.12.69-.17.95-.66,1.04-1.3ZM26.55,11.42c-.35.18-.65.32-.93.47-.38.2-.75.4-1.12.6-.03.02-.05.12-.04.16.04.12.12.23.17.35.08.2.17.17.36.11.64-.21,1.07-.72,1.6-1.09.09-.06.11-.24.12-.36,0-.06-.08-.14-.15-.25ZM21.65,13.37c.06.02.1.05.13.04,1.06-.36,1.9-1.06,2.71-1.8.03-.03.02-.1.03-.15-.06,0-.12-.04-.17-.02-.09.02-.2.05-.27.1-.76.51-1.51,1.02-2.25,1.54-.08.06-.11.19-.17.3ZM36.94,13.48s.03-.08.05-.12c-.26-.14-.52-.28-.78-.42.15.36.4.51.73.54ZM37.81,12.97c0-.4-.39-.48-.62-.68-.15-.13-.23-.45-.54-.33.15.16.28.34.44.48.23.19.48.35.72.53,0,0,0,.01,0,.02,0,0,.01,0,.02,0,0,.01.01.02.02.03.17.2.35.4.52.6,0,0,.09-.04.08-.05-.09-.32-.31-.51-.63-.58,0,0,0,0,0-.01,0,0,0,0-.01,0ZM17.05,13.12c0,.13,0,.21,0,.29,0,.15,0,.3,0,.45.1-.07.19-.16.29-.2.07-.02.18.02.24.07.14.11.2.04.28-.07.15-.23.3-.45.47-.67.06-.08.15-.14.22-.21-.02.1-.03.21-.06.31-.01.06-.05.11-.07.16-.04.14-.07.28-.11.42.14-.05.3-.08.42-.17.1-.07.17-.2.24-.31.34-.5.66-1.01,1.16-1.39.44-.33.84-.69,1.26-1.05.57-.49,1.12-.99,1.7-1.47.3-.25.64-.44,1.07-.37.06,0,.2-.06.2-.07-.04-.19-.08-.39-.18-.56-.03-.05-.26-.04-.35.02-.23.14-.44.33-.67.48-.48.31-.98.58-1.44.92-.74.55-1.54,1.03-2.02,1.88-.22.39-.59.69-.89,1.03.09-.56.31-1.01.7-1.4.7-.7,1.3-1.49,2.13-2.06.36-.25.65-.6,1.05-.96-.64,0-1.09.31-1.51.56-.6.36-1.26.66-1.63,1.32-.03.06-.13.08-.19.11,0-.09-.02-.19.02-.25.19-.32,1.13-1.14,1.47-1.32.05-.03.08-.08.12-.13.22-.22.44-.43.66-.65.1-.09.21-.18.28-.28.02-.03-.06-.12-.1-.19-.3.28-.67.1-1,.16-.34.06-.65.14-.89.42-.56.64-1.13,1.27-1.67,1.92-.39.47-.8.93-1.12,1.44-.29.46-.49.99-.67,1.51-.06.17.08.41.13.62.13-.1.26-.2.45-.33ZM32.37,13.03c.33.6.89.52,1.29.72.42.2.85.47,1.47.38-.82-.71-1.72-.92-2.76-1.11ZM23.28,13.71c-.09-.02-.2-.09-.25-.06-.46.27-.56.78-.77,1.22,0,0,.13.1.15.09.4-.31.72-.68.87-1.25ZM19.33,15.24s.06.07.09.11l.32-.35s-.05-.05-.07-.07c-.11.11-.23.21-.35.32ZM35.32,15.47c-.8-.82-1.79-1.17-2.91-1.09-.14.01-.28.09-.42.14.13.06.26.17.39.18.95.07,1.87.26,2.71.73.06.03.15.03.22.04ZM22.38,10.86c-.12,0-.21-.03-.24,0-.49.45-1.11.73-1.55,1.25-.31.35-.69.64-1.04.96-.21.19-.49.34-.64.57-.34.52-.65,1.07-.93,1.63-.08.16-.31.34-.12.57.13-.13.27-.26.38-.4.47-.58.94-1.16,1.42-1.73.34-.41.69-.81,1.06-1.19.49-.49,1-.95,1.5-1.42.05-.05.08-.13.16-.24ZM37.53,13.79s-.04.05-.06.08c.06.07.1.15.17.21.35.32.71.62,1.04.95.32.32.62.66.94.98.07.07.19.07.29.11-.01-.11,0-.22-.04-.33-.02-.07-.1-.12-.15-.18-.58-.53-1.17-1.06-1.76-1.58-.12-.11-.29-.16-.43-.24ZM34.8,15.99c.51.67,1.29.83,1.89,1.25.05.03.15,0,.22-.01-.02-.07-.03-.16-.07-.2-.49-.51-1.11-.81-1.76-1.06-.07-.03-.17.01-.28.02ZM38.74,17.56c.34,0,.41-.11.28-.43-.06-.16-.14-.32-.22-.48-.02-.05-.07-.08-.11-.12-.04.06-.1.11-.12.18-.05.17-.08.34-.13.51-.07.28,0,.35.29.34ZM36.76,17.68c.02-.05.04-.11.06-.16-.28-.12-.57-.24-.85-.35-.03-.01-.11.05-.12.09-.01.04.03.12.07.13.28.1.57.19.85.28ZM15.6,17.48c-.42.5-.76.99-.45,1.65.02.05.06.09.08.14.06-.04.17-.07.18-.12.12-.49.22-.99.31-1.48,0-.05-.08-.12-.13-.19ZM16.46,22.34s-.02-.1-.03-.15c-.17-.06-.34-.11-.5-.18-.21-.09-.31-.47-.57-.31-.17.1-.23.39-.33.6-.06.12-.12.26-.13.39,0,.18.05.36.07.54.11-.11.24-.21.33-.33.27-.39.44-.92,1.14-.55ZM27.03,23.63s-.02.09-.03.14c.23.05.46.11.69.14.05,0,.12-.07.18-.11-.05-.04-.1-.1-.16-.11-.23-.03-.46-.04-.68-.06ZM16.6,22.95c-.09-.01-.19-.06-.25-.03-.46.17-.62.57-.75.98-.03.08,0,.18,0,.27.09-.05.19-.1.27-.16.03-.02.04-.07.05-.1.14-.32.25-.66.62-.82.02,0,.03-.06.06-.14ZM26.12,25.68c-.05.11-.11.19-.09.22.06.09.13.18.23.22.03.01.13-.11.19-.17-.09-.08-.19-.16-.33-.27ZM37.13,27.35c-.05-.09-.07-.19-.12-.22-.3-.15-.6-.29-.91-.42-.03-.01-.14.05-.14.08,0,.07.01.16.06.2.23.19.46.37.7.53.07.04.19.03.27,0,.06-.02.09-.11.14-.17ZM37.58,28.01c-.03-.06-.04-.09-.06-.12-.06.07-.12.13-.16.2-.01.02.05.08.07.12.05-.07.1-.14.14-.2ZM35.54,28.62c.08-.11.16-.17.16-.24,0-.05-.09-.16-.12-.16-.08.03-.17.08-.21.15-.02.04.08.13.16.24ZM28.48,26.07c-.45-.99-1.5-1.07-2.01-1.77l.06-.11c.37.16.74.33,1.11.48.07.03.14.04.21.06-.03-.08-.04-.18-.1-.24-.08-.09-.18-.17-.29-.2-.63-.22-1.26-.45-1.9-.64-.36-.11-.74-.14-1.1-.23-.08-.02-.13-.12-.2-.19.09-.07.16-.14.26-.19.04-.02.12,0,.17.02.91.37,1.87.25,2.81.32.25.02.5.1.72.21.63.33,1.37.32,1.99.67.19.11.24.6.39.76.41.43.38.64-.12.97-.08.05-.2.06-.26.13-.04.05-.06.19-.02.23.18.21.56-.24.81-.4.12-.07.22-.17.33-.25.11-.08.22-.16.34-.24.04.55-.29,1.1-.8,1.12-.44.01-.8.41-.98.92-.07.2-.34.46-.68.23-.2-.14-.25.08-.27.18-.11.49-.56.69-.86,1.01-.26.28-2.47.9-2.92.77.28-.23,2.37-.98,2.62-1.21.06-.05.06-.16.09-.24-.1-.02-.24-.1-.3-.06-.57.4-1.05.11-1.53-.18-.11-.07-.2-.19-.26-.31-.07-.15-.02-.28.18-.26.1,0,.19.06.29.08.61.11,1.31-.34,1.45-.94.01-.05-.05-.18-.09-.18-.08,0-.19.01-.25.06-.23.19-.42.42-.67.58-.15.09-.41.16-.54.09-.49-.26-.93-.61-1.08-1.2-.12-.47-.64-.86-1.12-.8-.2.02-.31,0-.37-.18-.08-.25.14-.22.27-.29.45-.26.86-.25,1.35-.02.85.4,1.75.71,2.62,1.06.19.08.36.21.65.38ZM35.86,29.06s-.05-.07-.07-.08c-.35-.25-.66-.16-.82.24-.05.13-.12.25-.15.39-.02.06,0,.17.05.21.04.04.17.05.21.01.25-.19.48-.4.72-.61.04-.04.05-.1.07-.15ZM12.64,26.8c-.09-.11-.14-.22-.23-.28-.46-.32-1.24-.13-1.55.33-.16.24-1.4,1.67-1.55,1.88-.27.39-1.61,2.39-2.11,2.84-.11.1-.21.25-.24.39-.03.11.35.32.41.24.33-.41,5.13-5.19,5.27-5.39ZM27.91,32.75c.06-.26.27-.31.48-.35.07-.01.15,0,.22,0,.02,0,.06.08.05.09-.19.25-.44.36-.75.25ZM7.99,32.83c.27-.02.51-.29.49-.54,0-.07-.1-.14-.15-.21-.17.2-.34.4-.49.6,0,0,.11.11.15.14ZM33.96,32.45c.03.21.03.39.08.56.03.1.13.19.23.23.03.02.16-.1.2-.17.33-.68.48-1.41.54-2.16,0-.05-.03-.16-.05-.16-.07,0-.17.01-.21.06-.44.47-.71,1.03-.79,1.64ZM5.82,35.86c.13-.15.24-.26.32-.38.01-.02-.14-.19-.15-.18-.12.07-.24.16-.33.27-.02.03.08.15.16.29ZM18.5,36.25c.26.2.48.35.66.54.02.02-.14.25-.24.35-.03.03-.21-.03-.25-.09-.1-.15-.18-.33-.24-.5-.02-.07.04-.16.07-.3ZM22.74,38.31c-.04-.2-.11-.41-.12-.61-.02-.35-.09-.73.01-1.05.25-.81.16-1.77.99-2.36.28-.2.5-.51.73-.78.54-.64,1.25-1.07,1.93-1.53.51-.34,1-.7,1.49-1.06.06-.04.1-.13.17-.15.14-.04.28-.05.42-.07-.06.13-.1.29-.2.38-.35.34-.72.66-1.09.97-.98.81-1.98,1.6-2.95,2.43-.57.48-.99,1.05-.97,1.86,0,.44-.05.89-.1,1.33-.03.21-.11.41-.17.62-.05,0-.1,0-.15.01ZM29.82,42.3c-.25.18-.5.36-.74.54-.25.18-.5.36-.74.54.35-.57.86-.91,1.49-1.08ZM31.66,44.42c-.27.11-.54.22-.81.31-.17.06-.34.08-.52.11.15-.11.3-.24.46-.32.26-.11.54-.19.81-.28.02.06.04.11.05.17ZM23.99,44.4c.19.19.32.33.46.47,0,0-.05.08-.06.07-.2-.08-.4-.17-.6-.26.05-.07.1-.14.21-.28ZM25.76,46.37c-.53-.35-1-.66-1.47-.97,0-.01.02-.03.03-.04.15.06.31.14.47.19.06.02.14-.02.21-.03-.03-.07-.05-.15-.09-.21-.05-.06-.14-.07-.19-.13-.03-.04-.03-.11-.05-.16.07,0,.17-.04.2-.01.24.22.49.43.67.69.12.16.13.39.22.66ZM30.42,46.62c-.04-.08-.09-.16-.09-.16.12-.11.25-.21.38-.31.05.07.11.14.16.21-.14.08-.29.17-.45.26ZM26.6,45.96c-.08.27-.16.54-.24.81-.14-.34-.14-.64.11-.88.04.02.08.05.13.07ZM31.89,47.32c.39-.67,1.03-.51,1.62-.54.01.04.02.08.03.13-.29.04-.58.05-.86.12-.27.07-.53.19-.8.29,0,0,0,.01-.01.02h-.01s.02-.02.02-.02ZM31.84,47.38s.02-.03.03-.04h.01s-.03.03-.04.04c-.11.16-.21.32-.33.48-.02.03-.1.01-.15.02,0-.05,0-.12.03-.14.15-.12.3-.24.45-.35ZM33.76,47.57c-.4.17-.81.34-1.21.51l-.06-.15c.4-.17.8-.34,1.2-.51.03.05.05.1.08.15ZM28.47,45.73c.26-.05.4-.2.43-.47.07-.56.53-.82.9-1.14.03-.02.12-.01.15.01.03.04.05.12.03.16-.11.19-.2.43-.36.53-.25.16-.31.38-.45.61-.16.28-.15.42.06.64.36.37.37.79.08,1.21-.14.21-.27.44-.45.62-.47.47-.79.5-1.42.22-.33-.15-.66-.27-.8-.65-.02-.07-.03-.14-.04-.21.09.01.21,0,.26.05.34.35.74.4,1.19.32.68-.13,1.06-.69.95-1.34-.06-.32-.21-.5-.52-.56h0,0c-.4-.14-.79-.27-1.19-.41-.06-.02-.09-.09-.14-.13.05-.03.1-.09.15-.08.38.04.78.05,1.14.15.32.08.08.31.04.47h0ZM30.33,48.29c0-.07-.02-.15,0-.2.05-.09.14-.16.29-.18-.1.13-.2.25-.3.38,0,0,0,.01,0,.02h-.01s0-.02,0-.02ZM32.01,48.59c-.06.05-.13.11-.2.17-.02-.03-.06-.09-.05-.1.06-.07.13-.13.2-.19.01.03.02.06.04.12ZM24.48,49.13c-.15.11-.23.21-.29.2-.1-.02-.18-.11-.28-.17.04-.05.09-.15.12-.15.12.01.24.06.45.11ZM25.95,48.69c-.23-.1-.46-.21-.74-.33.64-.08,2.46.76,2.92,1.32-.65-.2-1.29-.41-1.95-.58-.29-.08-.61-.05-.92-.09-.05,0-.1-.1-.15-.15.06-.03.13-.08.19-.08.21-.01.42,0,.63,0,0-.03,0-.05,0-.08ZM30.32,48.31s0,0,0-.01h.01s0,0-.01.01c0,.17-.04.35,0,.52.04.18.09.46.22.51.75.3.67.96.61,1.52-.1.89-.96,1.57-1.87,1.6-.02,0-.04,0-.06,0-.24-.02-.6-.33-.5-.4.17-.11.28-.37.6-.23.35.15,1.19-.26,1.22-.6.02-.24-.07-.47.19-.63.02-.01,0-.19-.05-.21-.2-.12-.32-.18-.05-.39.11-.08-.4-.52-.5-.39-.22.31-.39.12-.6.02-.16-.09-.35-.14-.59-.22.27-.18.62.16.72-.25.32.05.34-.16.36-.39.02-.18.02-.4.28-.45ZM34.87,26.52c-.48-.22-.48-.23-.86-.04-.31.16-.58,0-.83-.13-.07-.04-.14-.22-.11-.3.04-.11.16-.24.27-.26.44-.08,1.11.06,1.55-.18.2-.11,1.41.05,1.65.36.22.29.82.12.71.6-.02.07.01.17.06.22.06.06.16.1.25.11.03,0,.09-.11.11-.18.02-.07.01-.16.03-.24.17-1.21.33-2.43.5-3.64.09-.62.05-.66-.54-.49-.11.03-.22.09-.34.11-.56.09-1.11.33-1.68.05-.47-.23-.94-.46-1.4-.69-.54-.26-1.08-.54-1.64-.78-.59-.26-1.21-.44-1.79-.72-.46-.22-.98-.39-1.13-1.03-.07-.31-.26-.66-.72-.71-.28-.03-.61-.12-.81-.31-.45-.4-.94-.67-1.53-.76-.04,0-.07-.04-.1-.06-.19-.12-.37-.06-.45.12-.22.47-.65.54-1.08.62-.25.05-.48.17-.73.22-.95.2-1.51.91-1.97,1.65-.25.4-.56.75-.79,1.15-.4.67-1.02,1.3-.51,2.22.13.23,0,.61-.02.92-.49.21-.25.63-.29.97-.03.25-.04.51-.15.73-.31.65-.52,1.33-.38,2.05.12.57.11,1.16-.13,1.62-.32.64-.11,1.25.04,1.77.15.54,0,.92-.15,1.35-.06.17-.21.22-.38.1-.51-.35-1.03-.7-1.55-1.05-.61-.41-.84-1.1-.63-1.8.09-.3.16-.6.2-.91.03-.26,0-.54,0-.8.01-.72.03-1.44-.16-2.16-.1-.37-.46-.79-.07-1.21.02-.02-.06-.17-.12-.2-.1-.05-.24-.02-.34-.07-.26-.11-.36-.03-.38.24-.02.25-.03.54-.15.75-.16.3-.08.53.08.76.09.14.22.26.37.44-.64-.16-.85-.41-.91-.93-.01-.13,0-.32-.09-.38-.36-.27-.34-.65-.35-1.02,0-.12,0-.25-.05-.35-.04-.08-.15-.12-.23-.18-.04.08-.1.15-.11.23-.01.15-.01.31.02.46.18.86.24,1.72.21,2.6-.01.33.04.68.15.99.09.25.28.51.49.65.13.08.4-.06.61-.09.05,0,.1.02.12.02-.16.45-.39.88-.47,1.33-.25,1.45-.83,2.79-1.39,4.13-.06.15-.45,1.13-.63,1-.85-.61-1.71-1.2-2.56-1.81-.06-.04-.2-.15-.19-.17.05-.08,3.13-1.24,3.34-1.51.07-.09.4-.7.15-.64-.48.11-2.88,1.04-3.56,1.37-1.39.66-1.04.39-1.15,1.68-.07.87-.21,1.86-.29,2.73-.02.19-.13.41-.27.54-.32.29-2.86,1.98-3.84,2.63-.35.23-.54.52-.36.96.06-.02.12-.02.16-.05.75-.52,4.15-2.83,4.57-3.11.09-.06.34-.42.37-.63.02-.15.34-3.28.34-3.28.05-.29.15-.31.38-.12.66.55,8.09,6.57,8.46,6.84.22.15.54.2.15.55-.15.14-.14.44-.2.67-.05.2.04.25.22.22.07-.01.15.03.22.04-.05.08-.08.16-.15.22-.2.19-.45.33-.6.55-.3.46-.49.96-.18,1.5.03.05.03.11.03.17.04.92.59,1.57,1.15,2.21.21.25.47.26.75.12.3-.16.59-.32.89-.49.57-.32,1.14-.27,1.67.09.13.09.17.32.25.48-.14-.01-.31.02-.43-.04-.5-.23-.92-.14-1.28.27-.23.26-.47.51-.67.79-.08.12-.14.3-.12.44.05.51.1,1.03.22,1.52.18.73.43,1.44.15,2.2-.04.11-.02.24-.02.35,0,.38.13.6.48.73.33.12.67.22,1.01.31.09.02.19.02.28,0,.38-.09.76-.18,1.14-.27.44-.11.88-.16,1.29-.4.4-.23.85-.28,1.31-.04-.55.26-1.12.46-1.69.67-.2.07-.42.12-.61.21-.32.14-.63.35-.96.45-.32.09-.55.13-.54.54,0,.26-.32.45-.18.81.2.52.22.61.77.64.57.03,1.14.04,1.71.04,1.35,0,2.66-.34,3.98-.59.4-.07.71-.22.71-.68,0-.22-.07-.44-.11-.66-.01-.08-.06-.22-.04-.24.13-.07.28-.15.41-.14.11.01.27.13.3.23.08.26.14.54.14.81,0,.31.14.32.36.23.52-.23,1.06-.43,1.56-.7.47-.26,1.02-.21,1.48-.51.47-.31,1.02-.51,1.52-.79.47-.27.93-.58,1.38-.89.05-.03.08-.19.04-.23-.27-.36-.55-.72-.85-1.06-.5-.56-.89-.62-1.56-.25-.26.14-.53.28-.79.41,0-.13.04-.2.1-.24.56-.44,1.1-.9,1.76-1.2.62-.28.62-.37.09-.78-.47-.37-.6-.86-.63-1.41-.02-.26,0-.51,0-.77.02-.8-.32-1.1-1.11-1.06-.53.03-1.07-.05-1.6-.11-.09,0-.16-.15-.24-.23.08-.06.16-.17.25-.18.19-.02.41-.04.58.02.47.17.9.05,1.33-.11.29-.1.43-.31.42-.64,0-.83-.26-1.19-1.12-1.44-.31-.09-.44-.32-.42-.57.03-.28.15-.58.3-.83.22-.37.29-.37.64-.11,1,.74,1.99,1.48,2.99,2.22.67.5,1.25,1.08,1.65,1.82.52.98.9,2.01,1.28,3.05.19.51.18.51.52.14.07-.07.16-.12.22-.19.3-.32.3-.33.1-.77-.06-.14-.11-.29-.19-.49.27.03.48.07.69.08.09,0,.24-.02.28-.08.25-.42.48-.86.72-1.29.12-.21.05-.29-.17-.29-.06,0-.12,0-.18,0-.55,0-1.11.01-1.66,0-.28-.01-.61.01-.76-.34-.04-.1-.09-.21-.14-.31.11-.03.22-.08.33-.08.68,0,1.36-.07,2.03.01.9.11,1.44-.17,1.71-1.06.14-.49.21-.47-.28-.48-.12,0-.24,0-.36,0-1.41,0-2.82,0-4.24,0-.51,0-.84-.22-1.12-.74.3,0,.57,0,.84,0,.45.01.91.05,1.36.05,1.03,0,2.06-.06,3.09-.05,1.26.01,1.23.23,1.72-1.24.11-.34.1-.37-.28-.37-1.13-.01-2.26-.02-3.39-.02-1.67,0-3.33,0-5,.03-.62.01-1.08-.25-1.55-.65.1-.03.15-.05.2-.05,1.01,0,2.01,0,3.02,0,.86,0,1.72,0,2.59,0,1.47,0,2.94,0,4.41,0,.52,0,.63-.12.67-.67,0-.12.02-.24.06-.35.16-.55.09-.66-.47-.67-.59-.01-1.18,0-1.77,0-2,0-3.99,0-5.99,0-.37,0-.75.08-1.12.07-.67,0-1.35-.05-2.02-.08-.17,0-.34-.04-.52-.05.09-.19.15-.41.29-.56.08-.09.29-.08.44-.07.91,0,1.83.02,2.74.02,1.35,0,2.69-.03,4.04-.03,1.47,0,2.93.02,4.4.04.22,0,.39-.06.46-.28.09-.32.19-.63.26-.95.04-.17-.08-.25-.25-.25-.34,0-.67,0-1.01,0-1.51,0-3.02,0-4.52,0-1.82,0-3.65,0-5.47,0-.43,0-.46-.09-.31-.49.09-.25.3-.26.48-.26.71-.02,1.42-.02,2.13,0,.88.01,1.77.06,2.65.07,1.49.01,2.98,0,4.47,0,.35,0,.7,0,1.06,0,1.13,0,1.08.11,1.05-1.05,0-.02-.01-.04,0-.06.05-.29-.08-.4-.36-.38-.14.01-.28,0-.42,0-2.49,0-4.97,0-7.46,0-.87,0-1.75,0-2.63,0-.37,0-.4-.08-.28-.43.09-.26.26-.31.5-.31.97,0,1.94,0,2.9,0,.77,0,1.54,0,2.31,0,1.5.01,2.99.04,4.49.06.24,0,.48.03.71,0,.44-.04.47-.08.49-.55,0-.2.01-.39,0-.59-.02-.47-.03-.46-.5-.46-1.33.01-2.66.02-3.99.03-.79,0-1.59,0-2.38,0-1.13,0-2.27,0-3.4,0-.15,0-.41-.03-.42-.08-.03-.16-.02-.41.08-.5.12-.11.36-.11.54-.11,2.19,0,4.37,0,6.56-.01.51,0,1.02-.03,1.54-.03.57,0,1.15.02,1.72.03.28,0,.44-.11.41-.43-.03-.25-.01-.51.02-.76.04-.29-.06-.39-.35-.39-.91-.01-1.82-.07-2.73-.07-1.11,0-2.21.06-3.32.07-.33,0-.68-.11-1-.06-.4.06-.77.07-1.15-.06.27-.63.27-.62.93-.62,2.05,0,4.09,0,6.14,0,.38,0,.75,0,1.13,0,.27,0,.41-.08.33-.39-.05-.23-.07-.47-.07-.7,0-.51.01-.51-.53-.52-.78,0-1.55,0-2.33,0-1.55,0-3.1.02-4.65.03-.09,0-.24-.07-.26-.14-.1-.36.09-.59.47-.58.83.01,1.67.03,2.5.03,1.19,0,2.38-.02,3.57,0,1.2.02,1.26-.02,1-1.2-.02-.08-.02-.16-.04-.24-.04-.24-.17-.3-.42-.3-1.29,0-2.58-.02-3.88-.02-.83,0-1.67,0-2.5.01-.2,0-.36.01-.35-.26.01-.23.03-.45.35-.42.12,0,.24,0,.36,0,1.79,0,3.57,0,5.36-.02,1.03-.01,1.03-.04.83-1-.07-.35-.26-.52-.61-.51-.77.01-1.53.05-2.3.05-.43,0-.87-.07-1.3-.07-.61,0-1.22.05-1.83.07-.11,0-.21-.04-.32-.06,0-.04-.02-.08-.03-.12.39-.16.77-.4,1.18-.46.54-.08,1.1-.02,1.65-.02.93,0,1.86,0,2.79,0,.49,0,.65-.21.54-.68-.04-.15-.11-.3-.17-.45-.16-.46-.18-.47-.67-.47-.64,0-1.27,0-1.91,0-.48,0-.54-.09-.3-.49.05-.09.21-.16.32-.16.38-.03.75-.03,1.13-.03,1.31.01,1.04.03.79-1.08-.01-.06-.06-.1-.08-.16-.1-.25-.26-.38-.55-.34-.24.03-.48.03-.71.02-.29,0-.42-.17-.41-.5.01-.3.25-.17.4-.19.18-.02.36,0,.54,0,.38-.01.42-.04.29-.36-.16-.4-.32-.83-.6-1.15-.13-.15-.52-.07-.79-.09-.02,0-.04,0-.06,0-.21-.04-.52-.34-.48-.53.06-.3.3-.13.48-.13.06,0,.12,0,.18,0,.29,0,.43-.16.34-.41-.12-.35-.26-.72-.49-.99-.12-.15-.46-.12-.71-.15-.14-.02-.28,0-.41.02-.28.06-.41-.09-.51-.3-.08-.18-.09-.33.19-.34.26,0,.51-.03.77-.07.07,0,.18-.12.17-.15-.15-.49-.47-.87-.83-1.21-.15-.14-.48-.16-.72-.14-.51.04-.91-.07-1.06-.64.35-.05.71-.09,1.17-.15-.4-.46-.79-.81-1.06-1.23-.23-.34-.5-.4-.85-.39-.14,0-.28,0-.42.01-.54.03-.9-.26-1.27-.75.41,0,.73,0,1.04,0,.08,0,.15-.03.23-.05-.03-.09-.02-.22-.08-.26-.61-.49-1.04-1.29-1.98-1.26-.16,0-.31.02-.47.03-.18,0-.4.09-.52,0-.23-.15-.41-.4-.6-.6.18-.04.36-.08.55-.12.02,0,.04,0,.06,0,.06-.04.11-.08.17-.12-.03-.05-.06-.11-.1-.14-.22-.12-.46-.22-.68-.35-.66-.4-1.32-.8-2.1-.94-.13-.02-.25-.12-.38-.17-1.02-.37-2.01-.84-3.06-1.09-1.87-.45-3.79-.55-5.71-.57-1.23-.01-2.48.01-3.68.46-.53.2-1.12.29-1.68.44-.12.03-.23.13-.39.22.53,0,.96,0,1.39,0,.41,0,.82.01,1.24.02-.32.26-.63.42-.95.58-.1.05-.22.12-.33.11-.72,0-1.43-.04-2.15-.04-.43,0-.89-.06-1.27.1-.91.37-1.78.84-2.66,1.28-.04.02-.1.03-.1.05,0,.05,0,.15.03.16.09.02.19.02.28.02,1.17,0,2.35-.01,3.52-.02.1,0,.2,0,.29.03.03,0,.09.1.07.12-.13.21-.21.49-.53.5-.33.01-.67.02-1,.02-.49,0-.98-.01-1.47-.02-.47,0-.94,0-1.41,0-.34,0-.73-.1-1,.04-.6.3-1.03.82-1.43,1.36-.02.03.06.18.11.19.15.03.32.02.48.02,1.29,0,2.59,0,3.88,0,.16,0,.32.07.48.11-.15.18-.27.39-.46.51-.11.08-.31.02-.47.02-1.53,0-3.06,0-4.59,0-.3,0-.55.06-.74.29-.34.41-.69.81-1.03,1.22-.05.06-.07.14-.1.2.09.03.17.09.26.09,1.17-.02,2.33-.06,3.5-.06.65,0,1.3.05,2.02.08-.26.38-.42.67-.87.66-1.41-.05-2.82-.07-4.23-.09-.33,0-.67,0-1,.03-.1,0-.23.09-.29.18-.27.36-.53.73-.78,1.11-.16.23-.11.32.15.32.41,0,.82-.03,1.23-.03,1.21,0,2.43,0,3.64,0,.14,0,.29-.02.41.02.08.02.17.15.17.23,0,.32-.11.41-.5.41-1.71,0-3.42,0-5.13,0-.19,0-.39-.07-.51.17-.2.39-.42.76-.62,1.15-.1.19,0,.25.18.25.47,0,.95,0,1.42,0,1.39,0,2.78,0,4.18,0,.31,0,.49.2.44.5,0,.05-.1.13-.15.13-.61.02-1.22.03-1.83.03-1.19,0-2.37,0-3.56,0-.35,0-.8-.13-1.02.04-.26.2-.33.66-.48,1-.02.05-.03.11-.05.17-.11.37-.11.38.29.39,1.51,0,3.01,0,4.52,0,.62,0,1.23.01,1.85,0,.32,0,.28.22.31.4.03.21-.12.27-.3.27-.14,0-.28,0-.42,0-1.97,0-3.94,0-5.91,0-.64,0-.82.12-1.06.71-.05.13-.08.26-.12.4-.12.47-.11.49.4.49,1.32,0,2.64-.03,3.96-.05.21,0,.29.02.2.27-.12.32-.29.46-.65.46-1.24-.02-2.48-.01-3.72,0-.16,0-.41.05-.46.15-.16.35-.24.74-.36,1.11-.08.25.03.33.25.33.48,0,.95-.02,1.43-.02.75,0,1.5,0,2.24.03.06,0,.17.14.18.22.02.33-.11.44-.55.44-1.03,0-2.06,0-3.09,0-.75,0-.73-.08-.8.8,0,.06,0,.12,0,.18,0,.48,0,.49.5.49,1.33,0,2.65.02,3.98,0,.63,0,1.17.23,1.79.58-.34.05-.57.12-.8.12-1.53,0-3.06-.02-4.59-.03-1.14,0-1.18.03-1.17,1.17,0,.12,0,.25.05.35.05.1.17.22.27.22.51.02,1.03,0,1.55,0,.85,0,1.71-.02,2.56-.02.18,0,.41.03.38.26-.02.14-.18.31-.32.36-.2.08-.43.07-.65.07-.99,0-1.99,0-2.98,0-.3,0-.66-.07-.87.08-.15.1-.09.51-.12.78-.01.1-.06.19-.06.29-.03.4,0,.45.4.46.16,0,.32,0,.48,0,.48,0,.95,0,1.43,0,.3,0,.31.25.42.42-.13.06-.25.13-.38.17-.17.04-.35.06-.53.07-.51,0-1.01.01-1.52,0-.23,0-.33.09-.31.32.04.39.07.79.13,1.18,0,.07.1.16.17.18.15.03.32,0,.47.02.13.02.25.09.38.13-.11.17-.2.38-.35.5-.1.08-.31,0-.47.04-.08.01-.2.11-.2.16.05.43-.15.93.19,1.26.25.24.24.52.12.68-.19.25-.17.45-.09.7.11.41.21.82.34,1.34.23-.39.53-.68.56-.98.06-.81.56-1.34,1.01-1.92.05-.07.1-.23.09-.24-.4-.22-.06-.47.02-.64.13-.28.35-.52.55-.77.39-.48.84-.91,1.17-1.42.31-.49,2.29-2.92,2.77-3.69.14-.22.32-.37.59-.45.67-.19,1.23-.6,1.77-1.1-.31-.15-1.81-.87-2.32-1.01-.61-.17-.69-.17-.78-.85,0-.04-.02-.08-.03-.11-.19-.53-.05-1.01.24-1.47.08-.13.47-.69.55-.83.42-.7.11-1.48,1.14-1.53.05,0,2.08.83,2.32,1.6,0,.03.06.08.08.08.07-.02.18-.04.19-.09.03-.11.05-.27,0-.35-.26-.38-.16-.81-.18-1.21-.04-.85.01-1.71.01-2.56,0-1.1.53-2.08,1-3.01.52-1.04,1.3-1.94,1.89-2.95.88-1.49,2.06-2.71,3.19-3.99.33-.37.7-.69,1.17-.87.05-.02.12-.04.15-.08.45-.62,1.06-.99,1.81-1.14.06-.01.1-.06.15-.09.62-.31,1.29-.44,1.96-.44.84,0,1.69.14,2.53.24,1.17.14,2.34.25,3.5.57,1.04.29,1.95.8,2.85,1.33.75.45,1.49.93,2.12,1.57.55.56,1.17,1.05,1.69,1.63.63.69,1.19,1.44,1.78,2.17.14.18.3.35.42.54.32.49.63.99.94,1.49.23.37.48.72.66,1.11.27.55.48,1.13.71,1.7.07.18.16.35.2.54.1.46.31.93-.07,1.36-.02.02-.03.08-.01.11.21.31.04.6-.02.9-.06.29-.09.59-.1.88,0,.56-.36,1.01-.91,1.11-.17.03-.35.08-.51.14-.4.16-.79.39-1.21.5-.35.1-.47.28-.51.62-.09.78-.24,1.56-.34,2.34-.08.65-.15,1.3-.15,1.95,0,.38-.09.69-.26,1.02-.54,1.06-1.33,1.91-2.27,2.62-.38.29-.56.65-.57,1.11,0,.29-.02.59-.07.88-.13.73-.6,1.32-.89,1.98-.22.51-.51,1-.62,1.53-.18.93-.42,1.8-1.01,2.56-.06.08-.1.17-.15.26-.52.91-1.1,1.75-2.14,2.17-.55.22-1.04.57-1.56.86-.12.07-.23.18-.36.21-.74.16-1.13.75-1.57,1.27-.42.5-.4.52-.93.14-.12-.09-.22-.2-.33-.3.17,0,.34-.03.5,0,.26.06.47.09.53-.17-.85-.37-1.67-.73-2.5-1.09-.22-.09-.44-.18-.65-.28-.55-.27-1.11-.52-1.65-.81-.38-.2-.73-.44-1.09-.67-.36-.24-.82-.42-1.03-.76-.32-.53-.46-1.16-.65-1.76-.03-.08.15-.23.25-.34,0,0,.19.08.2.14.1.65.94.9.85,1.64.28.28.53.62.86.82.57.35,1.19.62,1.79.91.28.13.62.17.86.35,1.01.74,2.16,1.05,3.37,1.19.1.01.23-.03.31-.09.07-.05.08-.16.12-.25-.07-.02-.14-.03-.22-.05-.21-.05-.42-.09-.63-.14-.28-.08-.48-.37-.85-.3-.17.03-.36-.15-.26-.42.03-.09.02-.2.04-.29.03-.15.08-.29.12-.44.16.07.31.13.47.2.02,0,.03.03.04.04.36.45.87.41,1.36.43.09,0,.26-.12.26-.19.04-.45.18-.96.02-1.33-.17-.39-.44-.82-.9-1.03-.2-.09-.38-.21-.55-.35-.11-.09-.18-.23-.27-.34.16-.03.32-.06.48-.09.02,0,.04,0,.06.02,1.06.42,2.2.22,3.28.42.08.01.16.01.24,0,.26-.05.43-.39.28-.6-.11-.15-.28-.29-.45-.37-.64-.32-1.34-.29-2.03-.28-.29,0-.6.01-.87-.08-.44-.16-.81-.07-1.17.17-.22.14-.42.3-.64.43-.17.1-.35.18-.54.22-.11.02-.29,0-.34-.08-.06-.08-.06-.27,0-.37.23-.4.48-.78.73-1.16.14-.21.3-.26.45,0,.04.07.13.19.18.19.27-.05.54-.14.81-.19.53-.09,1.02-.38,1.6-.29.51.08,1.02.1,1.54.14.07,0,.14-.04.21-.06-.06-.07-.12-.14-.19-.19-.04-.03-.12-.02-.18-.02-.32,0-.51-.05-.47-.47.04-.38-.2-.54-.58-.58-.3-.03-.6-.04-.89-.1-.48-.1-.89-.64-.83-1.09.02-.14.15-.26.23-.38.08.11.18.21.24.33.04.08.02.2.05.29.04.12.11.34.16.34.13,0,.29-.07.4-.17.4-.36.68-.38,1.05.02.38.4.74.81,1.32.93.12.02.21.18.34.24.09.05.23.08.32.05.29-.13.64-.23.82-.46.21-.27.35-.67.36-1.01,0-.37-.14-.79-.3-1.1-.24-.49-.13-.89.02-1.3.33-.89.4-1.8.38-2.74,0-.4.67-1.41,1.05-1.53.44-.14.86-.39,1.31-.6ZM2.28,31.41c0-.91-.03-1.82,0-2.72.07-1.85.16-3.71.54-5.53.15-.7.21-1.42.45-2.09.39-1.1.55-2.26.97-3.34.35-.88.73-1.75,1.12-2.62.34-.76.71-1.52,1.08-2.27.09-.19.27-.32.39-.5.27-.43.53-.87.78-1.31.47-.82,1.13-1.48,1.81-2.13.45-.44.91-.86,1.34-1.32.62-.67,1.34-1.22,2.09-1.72.77-.51,1.6-.92,2.4-1.38,1.55-.89,3.24-1.31,4.92-1.8.81-.24,1.62-.3,2.45-.35.76-.04,1.53-.31,2.28-.26,1.24.08,2.48,0,3.71.25.75.15,1.49.37,2.23.54,1.03.24,2,.69,2.99,1.07.44.17.89.35,1.3.57.92.5,1.82,1.03,2.72,1.55.21.12.42.23.61.36.2.14.39.31.58.48.38.34.75.7,1.13,1.04.68.63,1.31,1.29,1.79,2.1.31.52.75.96,1.14,1.44.86,1.08,1.44,2.32,1.98,3.57.36.84.71,1.7,1.04,2.56.12.31.17.64.26.96.16.54.36,1.08.51,1.63.08.28.04.59.13.87.6,1.86.76,3.79,1.02,5.71.05.33,0,.67,0,1.01,0,.97.03,1.94,0,2.91-.06,1.87-.16,3.74-.54,5.58-.14.7-.21,1.42-.45,2.09-.39,1.08-.54,2.22-.96,3.28-.34.86-.71,1.71-1.09,2.56-.36.8-.7,1.62-1.14,2.37-.58.99-1.24,1.94-1.91,2.88-.27.38-.67.66-1.01,1-.46.45-.94.9-1.38,1.37-.63.66-1.33,1.23-2.1,1.71-.6.38-1.18.78-1.8,1.11-1.2.64-2.41,1.23-3.74,1.58-.78.21-1.56.45-2.34.65-.3.08-.62.11-.93.14-1.1.11-2.19.28-3.29.31-1.04.03-2.08-.05-3.11-.15-.6-.06-1.19-.25-1.78-.4-.78-.2-1.56-.4-2.33-.64-.49-.15-.96-.37-1.43-.57-.56-.24-1.13-.46-1.67-.74-1.58-.81-3.12-1.68-4.44-2.88-.54-.49-1.01-1.05-1.49-1.6-.55-.64-1.09-1.3-1.6-1.98-.64-.85-1.25-1.73-1.69-2.71-.34-.76-.73-1.49-1.04-2.25-.26-.65-.45-1.33-.66-2-.15-.47-.29-.94-.44-1.4-.14-.45-.4-.86-.34-1.36,0-.08,0-.16-.03-.24-.63-1.81-.75-3.71-1.03-5.58-.07-.47,0-.95,0-1.43h-.03ZM49.34,27.86s-.03,0-.05,0c0-.16,0-.32-.02-.47-.12-1.22-.21-2.45-.36-3.67-.11-.9-.22-1.8-.47-2.67-.38-1.32-.81-2.62-1.23-3.92-.45-1.38-1.02-2.7-1.72-3.97-.51-.93-1.16-1.79-1.75-2.67-.1-.14-.25-.25-.37-.38-.08-.08-.16-.16-.23-.26-.43-.62-.84-1.24-1.27-1.85-.09-.12-.24-.2-.36-.3-.09-.08-.19-.15-.27-.23-.46-.46-.85-1.02-1.38-1.38-1.29-.87-2.46-1.94-3.94-2.51-.25-.1-.47-.29-.71-.42-.2-.12-.41-.25-.63-.33-.38-.14-.81-.18-1.15-.37-1.44-.81-3.06-1.05-4.63-1.29-1.63-.26-3.28-.37-4.95-.29-1.2.06-2.34.32-3.51.55-.73.14-1.36.64-2.15.57-.04,0-.08.02-.11.03-1.15.48-2.29.95-3.44,1.43-.37.15-.76.26-1.09.47-.62.4-1.23.84-1.81,1.3-.86.69-1.87,1.21-2.52,2.15-.19.27-.51.47-.65.76-.15.32-.37.55-.62.77-.2.19-.41.38-.58.6-.43.56-.82,1.15-1.27,1.68-.68.79-.99,1.78-1.49,2.67-.54.96-.84,2.03-1.31,3.03-.41.86-.64,1.81-.93,2.73-.17.53-.3,1.07-.43,1.61-.15.65-.29,1.31-.43,1.97-.17.83-.06,1.69-.23,2.5-.18.88-.18,1.76-.2,2.64,0,.32.01.64-.03.95-.12.91-.01,1.81.04,2.71.08,1.26.2,2.53.36,3.78.12.91.28,1.82.52,2.71.34,1.29.76,2.55,1.19,3.81.58,1.71,1.28,3.36,2.25,4.88.23.36.56.67.75,1.05.41.77,1.08,1.34,1.54,2.08.35.56.69,1.22,1.35,1.54.05.02.06.1.1.14.47.47.91.99,1.44,1.4.75.58,1.55,1.11,2.35,1.61.8.5,1.64.94,2.46,1.4.1.06.22.1.33.13.42.14.86.24,1.26.42,1.19.55,2.42.94,3.72,1.09.28.03.55.18.83.21.88.1,1.77.18,2.65.23.65.04,1.3.01,1.96.01.35,0,.71-.02,1.06-.03.12,0,.24.03.35,0,1.14-.31,2.35-.35,3.44-.87.59-.28,1.25-.21,1.86-.53.85-.44,1.78-.75,2.69-1.06,1.03-.34,1.83-1.06,2.73-1.61.51-.3.95-.7,1.42-1.07.31-.24.61-.49.89-.77.41-.42.85-.84,1.17-1.33.2-.3.4-.57.67-.81.19-.17.37-.36.53-.56.43-.55.82-1.14,1.28-1.68.67-.79,1-1.78,1.49-2.66.54-.96.84-2.03,1.31-3.02.42-.88.64-1.85.93-2.79.15-.49.28-.99.4-1.49.18-.79.36-1.58.51-2.37.08-.42.11-.85.14-1.28.02-.33-.06-.68.04-.98.18-.58.17-1.17.18-1.75.04-1.34.05-2.68.08-4.01ZM25.39,0c.13,0,.26,0,.39,0,.63.02,1.27.04,1.9.09.31.03.61.14.92.19,1.64.3,3.3.53,4.87,1.14.83.32,1.68.57,2.45,1.07.54.35,1.16.56,1.74.85.18.09.35.2.49.33.22.21.34.55.74.5.05,0,.13.09.17.15.17.26.42.38.69.52.31.16.59.4.85.64.46.43.92.87,1.34,1.34.58.64,1.14,1.3,1.7,1.96.77.9,1.39,1.9,1.99,2.91.43.72.89,1.42,1.31,2.14.13.22.17.49.27.72.18.39.35.8.56,1.17.36.6.4,1.3.63,1.93.27.75.53,1.51.8,2.27.04.11.04.23.06.35.03.21.03.43.1.63.27.72.44,1.46.42,2.23,0,.06-.02.13,0,.17.32.48.16,1.04.23,1.56.09.68.09,1.37.13,2.05,0,.1-.01.21.02.29.26.54.14,1.1.12,1.65,0,.43-.05.87-.01,1.3.08.93-.1,1.84-.2,2.76-.07.66-.04,1.33-.11,1.99-.08.72-.22,1.43-.37,2.14-.17.83-.36,1.65-.57,2.47-.1.41-.26.81-.39,1.21-.02.05-.06.1-.07.16-.18,1.17-.8,2.19-1.08,3.33-.07.29-.34.53-.46.81-.23.57-.49,1.13-.77,1.68-.26.5-.53,1-.84,1.48-.48.76-1.09,1.45-1.64,2.17-.43.56-.83,1.14-1.29,1.67-.36.42-.77.81-1.18,1.19-.43.4-.87.77-1.32,1.14-.26.22-.56.41-.81.64-.23.21-.47.4-.72.57-.37.25-.77.46-1.21.61-.44.15-.83.44-1.25.65-.26.13-.53.23-.79.35-.61.27-1.21.56-1.82.81-.3.12-.64.18-.96.27-.9.27-1.8.59-2.72.8-.91.2-1.85.28-2.68.4-.75,0-1.39.01-2.03,0-.84-.02-1.69-.03-2.53-.13-.58-.07-1.14-.33-1.72-.39-.89-.09-1.75-.32-2.6-.54-.72-.19-1.42-.45-2.12-.73-.72-.29-1.47-.56-2.12-.97-.47-.3-.99-.49-1.45-.77-.15-.09-.27-.23-.39-.36-.13-.14-.22-.34-.47-.28-.05.01-.14-.01-.16-.05-.36-.62-1.12-.7-1.58-1.21-.86-.94-1.84-1.79-2.67-2.76-.69-.82-1.25-1.75-1.85-2.64-.42-.63-.86-1.25-1.23-1.9-.43-.75-.92-1.47-1.13-2.33-.07-.26-.24-.5-.39-.73-.37-.55-.37-1.22-.6-1.82-.3-.79-.64-1.57-.8-2.39-.11-.54-.24-1.07-.4-1.59-.23-.75-.14-1.54-.38-2.29-.1-.31-.05-.66-.07-1-.02-.29-.03-.58-.05-.87v-.25c-.03-.29-.05-.58-.06-.87,0-.12.03-.27-.03-.35-.3-.43-.11-.92-.16-1.37-.09-.82-.04-1.65-.01-2.47.01-.41.1-.82.14-1.23.12-1.3.21-2.61.36-3.91.06-.54.24-1.07.37-1.61.13-.55.26-1.11.41-1.65.12-.43.26-.85.39-1.27.02-.05.09-.11.08-.15-.07-.56.32-.99.45-1.49.11-.42.32-.81.42-1.22.13-.55.46-.99.7-1.48.3-.62.58-1.25.88-1.86.6-1.23,1.44-2.3,2.28-3.38.46-.58.98-1.11,1.38-1.75.34-.54.83-.97,1.38-1.32.05-.03.13-.04.15-.08.44-.76,1.24-1.11,1.87-1.66.55-.48,1.15-.85,1.84-1.09.44-.15.83-.44,1.24-.66.17-.09.33-.2.51-.26.71-.22,1.38-.52,2.04-.86.17-.09.38-.11.56-.17.34-.11.67-.24,1.01-.33.83-.22,1.66-.43,2.5-.63.37-.09.75-.19,1.13-.22.82-.06,1.64-.08,2.46-.11.26,0,.53-.02.79-.02h0Z\"/>\n  </g>\n</svg>",
    7: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50.28 59.45\">\n  <g>\n    <path class=\"cls-1\" d=\"M28.65,6.65s.03.08.05.11c.38-.13.76-.25,1.14-.39.05-.02.07-.12.1-.19-.07-.02-.16-.07-.21-.04-.36.16-.72.34-1.08.51ZM26.29,9.2c.09-.12.17-.25.26-.37.09-.12.17-.25.26-.37q-.44.18-.52.74ZM32.21,11.58s.07.02.11.02c.08,0,.16,0,.24,0,.11,0,.32.11.24-.13-.02-.06-.36,0-.55.01,0,0-.02.06-.02.09ZM30.01,12.58s.06.07.09.1c.33-.24.66-.47.99-.71-.48.03-.85.21-1.08.6ZM31.55,8.91s-.03-.04-.05-.07c-.06.03-.14.04-.19.08-.95.73-1.62,1.67-2.05,2.78-.13.33-.19.68-.26,1.03-.01.07.06.16.09.24.05-.05.12-.1.15-.16.32-.68.63-1.36.94-2.04.29-.64.63-1.23,1.21-1.65.07-.05.11-.14.17-.21ZM19.94,9.24c.23-.32.47-.64.69-.96.57-.85,1.19-1.62,2.06-2.23.71-.49,1.45-.82,2.27-.93.45-.06.93.04,1.4.07.01.05.03.11.04.16-.24.15-.46.37-.72.44-.44.1-.73.37-1.02.67-.11.11-.2.26-.34.33-.6.35-1.02.89-1.4,1.43-.34.48-.73.99-.73,1.65,0,.12,0,.26-.07.34-.54.65-.39,1.42-.37,2.29.11-.38.16-.65.27-.91.06-.13,0-.37.35-.32.19.03.23-.41.11-.59-.18-.3-.21-.45.18-.52.05,0,.1-.12.12-.2.38-1.13,1.04-2.07,1.96-2.81.44-.36.94-.66,1.44-.93.64-.35,1.27-.73,2-.89.1-.02.19-.07.28-.08.09,0,.19.03.28.05-.05.1-.08.23-.16.28-.14.1-.32.15-.47.25-1.13.71-2.15,1.55-2.95,2.63-.29.4-.66.75-.89,1.18-.29.53-.48,1.13-.7,1.69-.26.64-.52,1.28-.76,1.93-.07.18-.17.24-.3.17-.58-.29-4.15.25-4.31.42-.05.06-.14-.24-.14-.37,0-.47-.03-.94.03-1.4.23-1.76,1.03-3.26,2.16-4.6.57-.68,1.31-1.15,1.96-1.74l.11.11c-.16.15-.31.3-.47.45-.77.76-1.4,1.61-1.84,2.6-.04.09-.04.21-.05.31,0,0-.01.01-.02.02,0,.01,0,.02,0,.03-.07.18-.15.37-.22.55,0,0-.01,0-.02,0,0,.01,0,.03,0,.04-.07.12-.14.24-.21.37.04.02.08.03.12.05.03-.14.05-.28.08-.41,0-.01.01-.02.02-.03v-.02c.23-.12.24-.33.23-.55v-.02s.01-.02.01-.03ZM17.54,13.74c-.02.16-.27.89-.49.98-.39.16-.74.34-1.04.65-.25.25-.35.22-.43-.11-.07-.31-.13-.62-.15-.94-.06-.89-.14-1.77.05-2.66.18-.83.51-1.59.99-2.3.74-1.07,1.69-1.93,2.65-2.78.38-.34.84-.57,1.42-.59-.44.55-.91,1.05-1.26,1.6-.35.55-.68,1.13-.87,1.75-.28.86-.45,1.76-.62,2.65-.12.58-.18,1.17-.23,1.75ZM35.06,16.85c-.24-.32-.51-.55-.78-.67-.27-.12-.53-.14-.78-.05.49.23.97.44,1.55.71ZM38.79,17.02c-.4-.53-.55-.58-1.09-.35.35.21.68.39,1.09.35ZM38.85,17.05l-.04-.03s-.01,0-.02,0c0,0,0,0,0,.01.02,0,.04.01.05.02l2.03,1.5c-.2-.36-.41-.71-.69-1-.35-.38-.89-.35-1.34-.5ZM38.98,20.18s.03.07.04.11c.15-.04.33-.04.44-.12.15-.11.25-.29.36-.45.01-.02-.01-.1-.03-.1-.05-.01-.12-.02-.15,0-.22.18-.44.36-.66.55ZM42.86,22.3l.11-.02c0-.17,0-.34-.03-.51,0-.04-.08-.09-.12-.1-.03,0-.1.08-.09.11.04.18.09.35.13.52ZM34.81,22.63c-.17-.06-.24-.11-.3-.09-.08.02-.16.09-.23.14.08.03.17.07.25.07.06,0,.12-.05.28-.12ZM36.42,23.84c-.1-.47-.18-.89-.61-1.14-.18-.1-.31-.28-.46-.41-.04-.03-.12-.07-.12-.07-.1.13-.2.27-.26.42-.01.04.14.18.24.2.52.14.77.49.86,1,.01.09.13.16.19.24.06-.09.12-.18.17-.24ZM21.41,21.19c.43-.02.86-.04,1.29-.06.08,0,.16,0,.23.04.4.22.77.47,1.18.66.56.25.83.78,1.17,1.23.14.19.03.57,0,.86,0,.03-.13.1-.17.08-.19-.08-.39-.17-.55-.3-.29-.24-.56-.5-.84-.75-.04-.04-.1-.09-.15-.09-1.3-.11-2.62-.33-3.9.08-.46.14-.85.48-1.26.74-.2.13-.35.32-.55.45-.09.06-.28.09-.36.03-.07-.05-.11-.25-.07-.35.09-.24.25-.45.36-.68.05-.1.09-.22.07-.33,0-.05-.18-.15-.2-.13-.28.23-.75.18-.88.63-.03.11-.18.19-.28.27-.03.02-.12,0-.16-.04-.03-.03-.04-.12-.01-.15.41-.54.74-1.16,1.29-1.58.34-.26.72-.39,1.14-.42.88-.07,1.76-.17,2.64-.25,0,.02,0,.04,0,.06ZM34.33,24.46s.05-.08.07-.12c-.21-.17-.41-.36-.63-.51-.1-.07-.25-.08-.37-.09-.04,0-.1.06-.12.11,0,.03.03.11.07.13.32.16.65.32.98.48ZM38.38,24.46s.03.08.05.12c.15-.06.33-.07.45-.17.48-.4,1.03-.64,1.63-.78.06-.02.12-.07.18-.1-.08-.04-.17-.12-.24-.11-.81.13-1.52.44-2.08,1.04ZM13.03,24.96c-.43-.14-.74-.25-1.05-.34-.06-.02-.22.08-.21.1.04.17.08.34.17.48.03.04.22-.01.34-.04.2-.05.41-.11.76-.21ZM20.82,24.16c-.46.12-.83.21-1.18.31-.49.14-.92.34-1.09.89-.03.09-.1.17-.14.26-.15.33-.36.21-.59.11-.27-.12-.29-.29-.14-.52.2-.31.36-.6.82-.68.43-.07.81-.39,1.22-.57.37-.16.72-.12,1.1.21ZM37.28,26.77s.07,0,.1,0c.26-.5.52-.99.76-1.5.05-.1.02-.23.02-.35-.12.05-.29.08-.34.17-.19.36-.36.74-.51,1.12-.06.17-.03.37-.04.56ZM20.44,26.92c-.52-.04-.83-.24-.99-.65-.14-.35-.14-.35-.43-.08-.03.03-.05.08-.08.09-.12.05-.25.08-.37.13,0-.14-.05-.31,0-.43.09-.21.24-.41.38-.6.49-.64,1.14-.8,2.09-.5.9.29,1.79.6,2.69.91.07.02.16.05.21.11.04.05.06.14.06.21,0,.04-.08.09-.13.09-.12,0-.24,0-.35-.02-.61-.13-1.23-.27-1.84-.42-.17-.04-.21,0-.23.15-.05.44-.34.7-.7.9-.11.06-.25.1-.3.12ZM20.31,27.44c.36-.05.73-.11,1.09-.15.04,0,.12.05.12.09,0,.04-.05.12-.09.13-.36.06-.73.1-1.09.15,0-.07-.02-.14-.03-.21ZM45.27,31.02c-.11-.16-.19-.29-.29-.4-.04-.04-.12-.03-.18-.05,0,.05-.03.13,0,.16.09.11.2.21.3.31.02.02.09,0,.17-.02ZM42.74,32.5c.08-.07.16-.14.25-.21,0,0-.03-.04-.03-.04-.09.07-.18.13-.28.2.02.02.04.04.06.06ZM41.07,33.62c.28-.01.44-.04.58-.12s.26-.24.46-.5c-.39.23-.72.43-1.04.62ZM34.36,33.7c-.07-.03-.13-.08-.16-.07-.05.02-.08.08-.12.13.05.02.1.06.14.05.04,0,.08-.06.14-.11ZM44.48,32.93c-.21.26-.36.44-.5.63-.59.78-1.24,1.45-2.31,1.45-.02,0-.05,0-.06,0-.07.06-.19.12-.18.17,0,.08.1.2.17.2.46.01.94.21,1.34-.22.36-.39.8-.71,1.13-1.12.22-.28.49-.58.42-1.12ZM14.06,37.01c-.08.04-.14.06-.17.1-.09.14,0,.49.14.59.03.02.1.02.1.02.05-.15.13-.29.12-.44,0-.09-.13-.17-.2-.27ZM27.48,49.99c.12-.07.23-.12.31-.19.28-.25,6.57-5.35,6.85-5.59.13-.11.26-.25.32-.4.04-.1.02-.31-.05-.37-.08-.06-.29-.05-.38.01-.29.2-7.08,5.96-7.23,6.14-.05.06-.05.19-.02.27.02.06.12.09.19.14ZM23.34,48.54c-.22.11-.37.23-.54.27-.88.24-1.26.86-1.36,1.72-.08.66-.23,1.32-.3,1.99-.02.24.09.5.16.75.02.06.1.11.16.16.05-.08.13-.15.15-.24.03-.17-.02-.37.04-.53.23-.67.46-1.35.75-2,.28-.63.63-1.23.94-1.85.03-.06.01-.15.02-.27ZM19.09,54.16c-.15-.23-.23-.35-.27-.5-.04-.15-.03-.34-.02-.71.26.35.28.42.29,1.21ZM19.26,51.13c.27.6.37,1.21.47,1.81.1.6.18,1.19.41,1.75-.4-.45-.93-2.58-.88-3.55ZM13.42,11.18c-.14.28-.34.55-.39.84-.12.76-.23,1.53.06,2.29.09.23.05.5.09.74.03.21.08.42.15.63.1.28.2.56.33.82.12.23.07.37-.13.5-.53.34-.65.87-.76,1.45-.14.73-.38,1.44-.54,2.17-.12.56-.15,1.14-.24,1.7-.05.32.09.4.39.44.58.07,1.18.19,1.5.72.35.58.69,1.19.67,1.92,0,.22.1.45.16.67.09.29.02.45-.24.56-.28.12-.4-.03-.46-.28-.04-.15-.1-.3-.17-.44-.21-.41-.31-.44-.79-.29-.28.09-.58.14-.86.23-.06.02-.1.1-.15.16.07.04.15.13.22.13.47-.05.91,0,1.33.22.17.09.33.18.12.4-.05.05-.1.13-.11.2-.09.39-.18.78-.63.95.21,0,.42,0,.63,0,.35,0,.53.19.4.49-.37.83-.74,1.66-1.16,2.47-.16.31-.1.52.1.74.25.26.5.51.76.75.27.27.48.26.76-.02.49-.49,1.18-.63,1.79-.36.16.07.33.14.47.25.32.24.63.31.96.01.03-.02.07-.03.11-.04.18-.04.41-.2.52.06.04.09-.11.3-.22.41-.31.34-.67.47-1.17.4-.54-.08-1.11,0-1.66.02-.24,0-.29.14-.28.36.02.48.02.95.02,1.43,0,.1.04.23,0,.29-.29.43.06.54.32.71.22.15.42.19.64-.01.1-.09.27-.13.34-.23.2-.27.44-.21.7-.14.8.21,1.6.41,2.4.63.28.08.56.18.84.28.16.06.32.17.49.18.31.02.39.24.46.47.06.17-.04.31-.21.24-.62-.29-1.29-.09-1.92-.21-.29-.06-.59-.07-.89-.09-.13,0-.3-.03-.4.04-.58.38-1.25.28-1.89.38-.13.02-.33.01-.37.08-.08.17-.1.38-.11.57,0,.03.15.1.24.1.64.01,1.29.01,1.93.02.42,0,.76.15,1.03.49.11.14.29.22.39.36.1.13.19.3.22.46.05.3-.03.33-.36.32-.8-.03-1.6-.05-2.41-.04-.45,0-.44.06-.47.5-.05.94.47,1.4,1.35,1.68.15.05.33.04.46.12.47.29.96.21,1.48.16.93-.08,1.83-.3,2.72-.54.27-.07.54-.11.82-.14.83-.09,1.49-.53,2.12-1,1.34-1.01,2.65-2.07,3.79-3.31.37-.4.7-.85,1.06-1.27.21-.25.44-.28.66-.1.21.17.26.37.08.62-.12.17-.21.39-.25.59-.15.9-.5,1.73-.99,2.47-.38.57-.8,1.15-1.47,1.51-.37.19-.62.59-.94.88-.33.31-.68.59-1.01.91-.17.17-.31.38-.46.58-.07.09-.13.24-.21.26-.7.12-.88.75-1.22,1.24.64-.19,1.24-.45,1.82-.77.56-.31,1.12-.63,1.71-.88-.54.61-1.22,1.04-1.94,1.4-.71.35-1.42.67-2.11,1.07.98-.2,1.91-.59,2.85-.91l.06.12c-.11.09-.21.22-.34.28-1.07.46-2.13.95-3.22,1.35-.64.24-1.34.33-2.01.48-.12.03-.25.02-.35.08-.11.06-.19.17-.28.26.1.02.21.07.31.06,1.2-.15,2.38-.36,3.5-.86.08-.03.18-.01.27-.02-.05.08-.09.18-.16.22-.59.36-1.17.72-1.88.81-.14.02-.26.14-.41.22.57.4,1.13.29,1.68.1.63-.22,1.29-.38,1.85-.79.06-.04.15-.07.22-.08.07,0,.14.04.2.08.01,0-.01.12-.05.15-.19.17-.37.36-.59.49-.26.16-.59.22-.82.4-.22.18-.37.45-.52.7-.29.47-.58.91-.61,1.51-.04,1.01-.18,2.01-.27,2.85-.09-.6-.22-1.37-.07-2.16.01-.08-.04-.17-.07-.25-.07.06-.18.12-.2.19-.22.76-.47,1.51-.62,2.29-.1.52-.08,1.07-.09,1.6,0,.15.06.31.13.45.22.46.46.92.69,1.38.03.06.03.15.04.22-.07,0-.15.02-.22.02-.22.02-.31-.13-.39-.3-.45-.97-.91-1.92-1.26-2.95-.36-1.07-.42-2.16-.55-3.26-.04-.33.04-.67.03-1.01,0-.56-.15-.65-.69-.51-.42.11-.65.38-.68.79-.04.67-.03,1.35-.06,2.02,0,.19-.05.37-.08.56-.05,0-.1,0-.16,0l-.14-1.89c-.33.39-.53.78-.51,1.26.01.26-.02.51-.03.77-.02,1.11.12,2.21.36,3.3.08.36-.03.48-.37.35-.74-.28-1.49-.52-2.2-.87-1.35-.66-2.67-1.39-3.9-2.24-.56-.39-1.08-.86-1.57-1.33-.55-.53-1.11-1.08-1.57-1.69-1.05-1.41-2.27-2.7-2.95-4.35-.32-.76-.75-1.48-1.06-2.25-.27-.66-.45-1.37-.66-2.05-.14-.43-.28-.86-.4-1.3-.13-.47-.44-.89-.36-1.41.01-.07-.02-.16-.05-.23-.58-1.7-.72-3.48-.98-5.24-.06-.41-.05-.83-.05-1.25,0-1.72-.05-3.44.05-5.16.07-1.34.32-2.67.52-3.99.12-.79.28-1.59.64-2.33.13-.26.09-.59.19-.87.3-.93.6-1.87.96-2.79.41-1.02.86-2.03,1.33-3.02.27-.55.62-1.06.94-1.59.21-.35.43-.69.63-1.04.46-.85,1.13-1.52,1.82-2.18.45-.44.92-.86,1.34-1.32.59-.64,1.27-1.18,1.99-1.67.8-.54,1.66-.97,2.5-1.45,1.59-.91,3.32-1.34,5.04-1.83.75-.22,1.5-.28,2.27-.33.51-.03,1.01-.16,1.52-.2.47-.04.94-.03,1.41-.03.38,0,.75,0,1.13.03.67.06,1.33.19,1.99.2.79.01,1.5.35,2.24.52,1.04.25,2.04.7,3.05,1.09.42.16.85.33,1.24.55.91.52,1.89.9,2.73,1.54.2.15.45.24.67.39.19.13.37.28.54.44.39.36.78.73,1.17,1.09.68.63,1.31,1.28,1.78,2.1.31.54.78.99,1.18,1.49.97,1.23,1.56,2.66,2.19,4.07.3.67.62,1.36.79,2.07.23.9.59,1.75.8,2.64.52,2.23.95,4.48,1.15,6.76.02.21-.05.43-.05.64.02.63.06,1.26.07,1.9,0,.37-.02.75-.04,1.12-.11,1.54-.17,3.08-.35,4.61-.12,1.02-.4,2.02-.66,3.01-.28,1.08-.59,2.16-.94,3.22-.25.75-.58,1.47-.88,2.19-.21.49-.45.96-.67,1.44-.33.73-.75,1.4-1.2,2.06-.15.23-.27.48-.41.72-.59,1.03-1.35,1.9-2.26,2.65-.41.34-.72.79-1.11,1.14-.66.59-1.33,1.17-2.04,1.69-.6.44-1.24.83-1.9,1.17-1.23.65-2.49,1.25-3.86,1.6-.84.21-1.65.56-2.48.82-.35.11-.73.21-1.09.23-.77.04-1.54.03-2.31.03-.45,0-.47-.05-.44-.49.11-1.3.69-8.07.77-8.69.03-.19.15-.41.29-.54,1-.84,6.88-5.5,7.9-6.37.14-.12.29-.32.29-.49,0-.91.04-1.83-.09-2.73-.1-.71-.44-1.38-.67-2.08-.07-.2-.18-.43-.14-.62.1-.48-.12-.8-.39-1.13-.18-.21-.38-.41-.55-.63-.07-.09-.09-.21-.13-.31.11,0,.25-.04.32.01.38.27.8.13,1.2.13.04,0,.08,0,.12-.01.25-.07.55-.47.43-.54-.19-.1-.43-.15-.65-.13-.21.02-.39.2-.6.25-.16.04-.35.03-.51,0-.14-.03-.24-.14-.14-.31.08-.13.11-.32.22-.41.47-.41.97-.8,1.45-1.2.18-.15.36-.3.5-.49.27-.36.53-.73.77-1.1.18-.28.17-.58.15-.91-.06-.87-.06-1.74-.04-2.61.02-.65-.18-1.03-.73-1.18-.04.04-.07.07-.11.11.13.08.28.14.39.24.15.13.22.25,0,.43-.1.08-.12.31-.09.46.13.88-.05,1.71-.31,2.53-.09.29-.27.54-.68.57-.3.02-.59.21-.89.31-.05.02-.13.01-.16-.02-.03-.03-.04-.13-.02-.15.39-.38.22-.83.15-1.39-.13.21-.24.33-.29.48-.17.44-.3.9-.48,1.34-.2.48,0,1.03-.46,1.4-.18.14-.46.45-.55.7-.29.79-.95,1.13-1.74.89-.32-.1-.63-.22-.95-.34-.3-.11-.45-.35-.39-.65.14-.68.3-1.35.47-2.02.33-1.28.71-2.56,1-3.85.09-.38.06-.84-.06-1.22-.32-1.02-.72-2.01-1.07-3.02-.07-.2-.07-.43-.06-.64.02-.89.06-1.78.06-2.68,0-.79-.04-1.58-.02-2.38,0-.4-.2-.59-.5-.71-1.3-.54-2.59-1.1-4.02-1.18-.12,0-.23-.05-.35-.08-.9-.23-.93-.24-.68-1.14.16-.57.43-1.1.68-1.64.23-.5.5-.99.75-1.48.04-.07.06-.16.11-.21.5-.45.99-.9,1.5-1.32.56-.46,1.13-.91,1.71-1.34.4-.29.81-.57,1.24-.82.34-.21,1.26.05,1.53.39.11.14.05.21-.1.24-.06.01-.13.04-.19.15.36.07.71.13,1.07.2,0,.04,0,.08,0,.12-.31.09-.63.17-.94.27-.9.3-1.77.67-2.53,1.25-.31.23-.57.54-1.02.53-.08,0-.23.17-.22.23.09.49-.23.86-.36,1.28-.03.09,0,.19,0,.28.08-.04.18-.07.24-.13,1-1.07,2.08-2.06,3.48-2.58.77-.29,1.6-.46,2.41-.62.27-.06.59.02.86.11.47.15.92.36,1.37.56.13.05.27.11.35.21.37.45.73.91,1.12,1.42-.49-.04-.94-.07-1.38-.11-.26-.02-.49-.01-.72.17-.17.13-.44.12-.76.2.63.06,1.16.11,1.7.14.25.01.44.1.47.35.06.4.35.41.64.45-.03-.19-.06-.35-.08-.5.16.05.32.1.47.17.61.26,1.16.6,1.45,1.23.04.09.06.2.08.3-.11-.02-.23-.03-.32-.08-.41-.23-.84-.26-1.44-.2.5.22.88.39,1.25.56.77.35,1.46.8,2.02,1.44.15.17.24.39.33.6.14.35.26.71.39,1.06.08.21.02.35-.14.52-.17.18-.31.12-.47.05-.26-.11-.51-.23-.76-.34-.59-.25-1.2-.3-1.83-.24,1.11.43,2.11,1.05,3.1,1.68.56.35,1.12.71,1.62,1.13.26.21.39.57.57.87,0,.01-.07.1-.09.1-.33-.06-.35.01-.1.21.11.09.21.21.33.24.77.24,1.15.88,1.58,1.47.23.32.3.69.19,1.13-.1.38-.21.79-.01,1.21.18.38-.39.87-.86.74-.26-.07-.51-.22-.76-.32-.3-.12-.58-.23-.9-.01-.26.18-.44.32-.32.71.07.25-.07.57-.15.85-.13.45-.28.89-.43,1.33.05.02.1.04.15.06.06-.15.14-.29.19-.44.03-.09,0-.22.04-.29.1-.12.25-.3.37-.3.21,0,.27.24.21.42-.24.73-.46,1.48-1.22,1.89-.18.1-.4.3-.41.47-.03.37-.23.62-.52.92.84-.02,1.33-.46,1.74-1.03.15-.21.24-.46.41-.65.27-.3.38-.62.35-1.03-.02-.37.04-.74.09-1.11,0-.05.15-.14.19-.12.22.09.43.16.43.49,0,.33.06.67.14,1,.03.14.16.27.27.37.35.34.37.4.12.79-.07.11-.15.24-.15.36-.03,1.39-.93,2.16-2.02,2.77-.46.26-.96.47-1.52.48-.1,0-.2.08-.3.12,0,.04.02.08.02.12.4-.04.81-.03,1.2-.12.88-.19,1.78-.31,2.58-.8.38-.23.51-.57.7-.91.04-.07.03-.16.04-.23.16-.73.32-.79.88-.28.68.62.94,1.4.71,2.3-.22.82-.5,1.63-.72,2.45-.15.55-.25,1.11-.38,1.67-.12.5-.62.91-1.1.89-.42-.02-.8.08-1.2.21-.53.18-1.12.21-1.69.24-.52.03-.61-.49-.86-.79-.04-.05-.02-.16-.06-.23-.11-.18-.36-.18-.41.02-.13.54-.35,1-.78,1.37-.05.04-.04.17-.04.27-.02.33-.16,3.03-.2,3.18-.29.95.1,1.69.69,2.39.83.98,1.64,1.98,2.47,2.96.08.09.16.18.25.25.29.26.29.26.5-.06.11-.16.24-.32.34-.49.1-.17.17-.35.26-.53-.16-.04-.35-.04-.48-.13-.2-.15-.36-.36-.52-.55,0,0,.09-.16.14-.16.34-.02.68-.02,1.01,0,.32.02.52-.11.62-.41.03-.09.07-.18.11-.28.11-.27.21-.53.32-.8-.3-.01-.59-.04-.89-.04-.85,0-1.71.01-2.57-.01-.22,0-.46-.09-.65-.21-.13-.08-.2-.27-.29-.42.14-.01.29-.03.43-.03,1.22,0,2.45-.02,3.67-.02.56,0,.8-.16.99-.71.07-.2.13-.42.21-.61.13-.29-.01-.34-.26-.34-1.41,0-2.82,0-4.23,0-.18,0-.36,0-.54,0-.21,0-.42,0-.35-.31.05-.22.04-.48.4-.46.81.04,1.62.06,2.44.07.85.01,1.71,0,2.57,0,.42,0,.6-.2.62-.6.01-.28.04-.56.1-.83.04-.16,0-.21-.15-.21-.24,0-.47-.04-.71-.04-1.35,0-2.69,0-4.05-.1.82-.14,1.65-.24,2.45-.45.75-.19,1.5-.11,2.24-.12.46,0,.69-.14.82-.59.06-.21.06-.43.07-.65,0-.08-.06-.18-.13-.23-.08-.06-.2-.08-.3-.11.06-.14.12-.29.18-.43.03-.05.08-.11.13-.12.5-.09.41-.49.44-.82.03-.35-.04-.73.07-1.05.19-.58.17-1.17.19-1.76.02-.63.08-1.25.12-1.87.04-.55.04-.57-.5-.59-.19,0-.36,0-.44-.21-.06-.16-.11-.33-.17-.49.15-.01.3-.02.46-.03.12,0,.24,0,.36,0,.27.01.33-.12.29-.37-.04-.29-.08-.59-.05-.87.03-.28-.09-.36-.33-.36-.48,0-.95,0-1.43,0-.12,0-.29-.05-.36-.13-.09-.11-.11-.29-.16-.43.14-.03.28-.09.43-.09.46,0,.91,0,1.37,0,.23,0,.34-.09.31-.32-.04-.39-.08-.78-.13-1.18-.02-.2-.16-.24-.34-.24-.4.01-.79,0-1.2,0q.13-.65.68-.71c.14-.01.28-.06.41-.05.28.03.35-.1.31-.35-.03-.17-.06-.35-.09-.52-.06-.43-.14-.53-.57-.6-.13-.02-.31.04-.26-.19.03-.15-.08-.34.18-.44.47-.18.53-.33.4-.79-.05-.17-.1-.35-.19-.5-.07-.12-.2-.28-.32-.28-.29-.01-.42-.19-.53-.4-.1-.18-.16-.34.17-.3.29.03.32-.19.28-.4-.05-.25-.12-.5-.21-.74-.12-.33-.31-.54-.72-.44-.17.04-.36-.01-.53.02-.56.09-.89-.19-1.14-.7.59,0,1.14,0,1.69,0,.19,0,.32-.05.22-.28-.19-.41-.36-.83-.58-1.23-.04-.08-.25-.09-.38-.09-.6,0-1.19,0-1.79,0-.18,0-.34,0-.42-.24-.12-.34-.09-.42.27-.43.49,0,.99,0,1.48,0,.41,0,.54-.09.44-.49-.09-.33-.29-.64-.47-.94-.04-.07-.2-.09-.3-.1-.57-.01-1.14-.01-1.71-.01-.2,0-.59-.39-.53-.57.02-.06.16-.11.24-.11.49-.01.98,0,1.48,0,.38,0,.41-.03.23-.35-.22-.37-.47-.72-.75-1.05-.08-.09-.29-.11-.43-.11-.56-.01-1.11-.03-1.67,0-.49.03-.78-.17-.96-.71.64,0,1.24,0,1.84,0,.08,0,.16,0,.23-.01.32-.06.34-.1.14-.35-.32-.4-.65-.8-1-1.18-.09-.1-.28-.14-.42-.14-.43-.02-.86,0-1.3,0-.44-.02-.92.04-1.21-.44-.13-.22-.06-.29.16-.3.48,0,.95,0,1.43-.01.09,0,.18-.05.27-.08-.03-.09-.03-.21-.09-.27-.41-.37-.79-.8-1.26-1.08-.29-.17-.72-.13-1.09-.14-.41-.01-.83.04-1.25.04-.55,0-.93-.35-1.31-.74.63,0,1.25,0,1.88,0,.08,0,.16-.07.25-.1-.06-.07-.11-.16-.18-.2-.59-.32-1.18-.65-1.77-.95-.55-.28-1.14-.28-1.73-.28-.3,0-.59-.02-.89-.03-.14,0-.29-.06-.41-.03-.69.19-1.32-.04-1.98-.22-.58-.16-1.19-.24-1.78-.45h3.62c-1.3-.64-2.67-.87-4.07-.94-1.01-.05-2.01-.18-3.02-.18-.89,0-1.78.1-2.66.23-.51.08-.98.32-1.53.35-.45.02-.89.3-1.31.56h4.03s-.05.11-.09.12c-.95.2-1.84.68-2.88.54-.76-.1-1.56.11-2.32.02-1.02-.12-1.75.5-2.58.85-.33.14-.63.32-.95.48-.06.03-.11.09-.16.13.06.04.12.1.19.12.17.04.43,0,.51.1.09.12-.42.51-.68.52-.24,0-.48.02-.72,0-.42-.05-.72.12-.99.42-.26.29-.57.54-.81.84-.21.25-.16.33.17.35.32.01.64,0,.95,0,.23,0,.36.04.19.31-.15.23-.3.38-.61.36-.4-.03-.8.04-1.19-.02-.65-.09-.97.37-1.33.74-.22.22-.39.5-.56.76-.05.07-.07.17-.1.26.09.02.18.06.27.06.69,0,1.39,0,2.08,0,.14,0,.39-.15.42.14.02.27-.2.51-.46.51-.48,0-.95-.03-1.43-.04-.41,0-.82-.02-1.23,0-.1,0-.22.09-.29.18-.26.35-.5.7-.74,1.06-.05.07-.07.17-.1.26.1.03.2.08.31.08.93,0,1.86-.02,2.79,0,.15,0,.4.06.43.16.09.24-.18.49-.47.49-1.01,0-2.03,0-3.04,0-.21,0-.39,0-.5.21-.23.43-.47.86-.75,1.37h3.08c.3,0,.6,0,.89,0,.14,0,.37-.06.33.2-.03.2-.02.46-.34.46-.14,0-.28,0-.42,0-1.18-.02-2.37-.04-3.55-.05-.1,0-.26.11-.3.21-.17.36-.29.74-.44,1.1-.12.29.02.34.27.34,1.21,0,2.42,0,3.63,0,.08,0,.16-.01.24,0,.14.03.33.04.4.13.08.11-.22.5-.39.52-.14.02-.28.01-.42.01-1.13,0-2.27.03-3.4-.01-.47-.02-.75.13-.93.55-.03.07-.08.14-.11.21-.31.79-.27.86.56.86,1.01,0,2.02-.03,3.02-.05.22,0,.26.08.18.28-.13.33-.35.44-.69.43-1-.02-2.01,0-3.01,0-.29,0-.48.04-.52.4-.02.24-.21.46-.27.71-.11.42-.05.5.38.49.73,0,1.46-.04,2.19-.06.08,0,.17-.03.24,0,.13.05.31.11.35.22.07.2-.15.51-.36.51-.36,0-.71-.04-1.07-.03-.59,0-1.19.03-1.78.06-.09,0-.17.14-.24.22-.02.02,0,.08-.01.12-.18,1.12-.18,1.13.94,1.13.62,0,1.23.01,1.85-.04.38-.03.31.21.34.41.04.24-.07.3-.3.3-.83-.01-1.67,0-2.51,0-.51,0-.52,0-.6.49-.05.29-.03.59-.05.88-.02.33.16.39.45.38,1.01-.01,2.02,0,3.03.01.15,0,.33.09.45.2.09.08.11.24.17.37-.12.03-.25.08-.37.09-1.07,0-2.15,0-3.22,0-.62,0-.63,0-.65.6,0,.08,0,.16,0,.24q-.11.77.68.77c1.37,0,2.74,0,4.11,0,.38,0,.47.11.36.46-.02.08-.15.18-.23.18-1.09,0-2.19,0-3.28,0-.49,0-.98.01-1.47.02-.22,0-.26.14-.24.32.01.12.05.23.06.35.03.31.06.63.09.94.35.03.7.07,1.05.07,1.33.02,2.66.05,4,.02.38,0,.41.23.51.45.01.03-.06.13-.11.14-.23.03-.47.05-.71.05-1.41,0-2.81,0-4.22,0-.12,0-.25-.02-.35.02-.09.04-.17.14-.19.24-.02.08.05.19.05.29-.07,1.26.31,1.02,1.14,1.05,1.22.04,2.45,0,3.68,0,1.09,0,2.17,0,3.26.01.19,0,.38-.03.45.25.09.37.09.36-.31.36-1.05,0-2.1.05-3.15.05-.93,0-1.86-.06-2.79-.06-.67,0-1.34.04-2.01.07-.06,0-.15.12-.15.18.01.24.03.48.09.71.14.49.29.58.8.58,2.4,0,4.81,0,7.21,0,.14,0,.33-.04.4.03.11.1.17.29.19.45.03.21-.15.19-.28.19-1.27,0-2.54,0-3.81,0-1.17,0-2.35,0-3.52,0-.44,0-.44.01-.47.47,0,.16-.03.32-.02.47.05.47.16.58.64.57,1.75,0,3.49-.02,5.24-.03.77,0,1.55.01,2.32.03.23,0,.52.31.48.53,0,.05-.14.1-.21.1-.89.02-1.79.03-2.68.03-1.65,0-3.3,0-4.95-.02-.27,0-.44.05-.32.37.02.06.03.11.05.17.33,1.47,0,1.11,1.38,1.16.77.03,1.54,0,2.31,0,1.63,0,3.26,0,4.89,0,.28,0,.5.04.6.35.06.2.05.31-.18.31-.16,0-.32,0-.48,0-2.09.01-4.17.02-6.26.03-.44,0-.87-.01-1.31-.03-.28-.01-.36.12-.3.37.06.23.13.46.23.67.32.66.47.71,1.21.67.67-.03,1.33,0,2,.01.59,0,1.19-.01,1.78-.01.69,0,1.37,0,2.06,0,.67,0,1.34-.03,2.01-.03.17,0,.38,0,.5.08.17.12.27.33.4.5-.2.04-.4.1-.6.1-.72.01-1.44,0-2.16,0-.04,0-.08.01-.12.01-.95,0-1.9,0-2.84,0-.56,0-1.13,0-1.7,0-.63,0-1.26,0-1.92,0,.14.46.23.85.37,1.23.11.29.32.38.66.35.63-.07,1.26-.05,1.89-.06.98,0,1.96,0,2.94,0,1.27.02,2.54.04,3.81.08.22,0,.57-.04.56.29-.01.3-.36.26-.58.27-.57.02-1.15,0-1.72.01-.96.02-1.93.06-2.89.08-.31,0-.63-.08-.94-.07-.71.01-1.43.06-2.14.07-.32,0-.65-.05-1.08-.08.37.57.68,1.03.97,1.52.14.23.34.17.53.17,1.25,0,2.5,0,3.76,0h.83c-.61.36-1.25.65-1.95.67-.69.02-1.39,0-2.09,0-.11,0-.23.04-.34.06.05.1.09.2.15.29.2.32.42.62.6.94.32.55.57.61,1.15.36.72-.32,7.23-3.03,7.44-3.17.24-.17.39-.39.38-.7-.04-.75-.05-1.52-.42-2.19-.2-.36-.54-.73-.91-.91-.91-.44-1.56-1.05-1.81-2.03-.1-.39-.22-.72-.53-1.03-.28-.28-.43-.7-.64-1.05-.19-.34-.9-3.71-.98-4.07-.07-.31-.11-.62-.19-.92-.14-.47-.3-.93-.46-1.39-.02-.07-.15-.13-.23-.13-.2-.01-.4,0-.59.02-.1,0-.2.04-.29.03-.6-.04-1.03-.45-1.39-.85-.21-.24-.29-.7-.26-1.05.08-.77.26-1.52.41-2.28.07-.35.15-.7.2-1.05.01-.09-.07-.19-.1-.29-.09.06-.23.1-.27.18-.15.32-.26.66-.39.99-.03.09-.08.17-.18.38-.21-.75-.76-1.11-1.12-1.6-.38-.52-.56-1.24-.43-1.92.14-.74.4-1.45.63-2.17.22-.7.81-1.11,1.28-1.61.73-.79,1.33-1.66,1.75-2.65.11-.27.16-.57.23-.86.07-.26.15-.53.22-.79.01-.04.05-.07.05-.11.06-.68.18-1.37.17-2.05,0-.67.12-1.29.33-1.91.08-.24.1-.49.15-.73.01-.08.02-.16.05-.22.47-.91.78-1.92,1.46-2.72.19-.23.35-.47.68-.53.51-.09.84-.5,1.25-.77.33-.21.68-.39,1.04-.57.06-.03.17.05.26.09-.03.07-.05.14-.09.2-.31.41-.54.86-.94,1.21-.4.36-.76.84-.98,1.33-.26.56-.39,1.19-.53,1.81-.14.64-.13,1.3,0,1.94.09.48.25.95.37,1.42.15.62-.07,1.06-.65,1.28-.07.03-.24-.05-.27-.11-.23-.5-.51-1-.63-1.53-.17-.71-.25-1.44-.29-2.17-.02-.44.11-.9.18-1.35,0-.01.01-.03.02-.04,0-.01,0-.02,0-.03.28-.5.57-1,.86-1.5-.05-.03-.09-.05-.14-.08-.25.42-.5.84-.73,1.27-.04.08,0,.2.01.31v.02s-.02.04-.02.06ZM28.71,1.15c-1.67-.14-3.33-.34-5.01-.26-1.14.06-2.23.3-3.33.53-.49.1-.95.39-1.44.5-.47.11-.95.14-1.42.35-.99.44-2.04.72-3,1.24-.33.18-.72.24-1.03.44-.62.4-1.21.86-1.81,1.29-.27.2-.52.44-.8.61-.46.29-.88.59-1.23,1.01-.33.4-.78.72-1.02,1.15-.26.47-.64.79-1,1.15-.2.19-.36.42-.52.65-.22.32-.42.66-.64.98-.38.53-.8,1.02-1.15,1.57-.21.33-.3.73-.46,1.08-.23.5-.51.97-.73,1.47-.23.5-.41,1.02-.62,1.53-.11.27-.26.53-.37.8-.27.68-.43,1.39-.68,2.07-.39,1.05-.65,2.16-.87,3.27-.17.85-.28,1.73-.25,2.61.02.5-.18,1-.21,1.51-.04.79.05,1.6-.06,2.38-.15,1-.03,1.97.03,2.95.04.73.2,1.45.22,2.18.07,1.83.36,3.61.92,5.35.15.47.26.95.41,1.42.17.52.36,1.03.56,1.54.22.59.44,1.18.68,1.76.16.38.32.77.52,1.13.45.81.91,1.62,1.41,2.41.49.78,1.17,1.42,1.65,2.21.27.45.62.86.94,1.29.07.09.17.17.25.25.5.47.99.95,1.49,1.42.17.16.34.34.53.48.76.54,1.51,1.09,2.3,1.58.78.49,1.61.92,2.41,1.37.1.06.22.09.33.13.47.17.95.32,1.41.51,1.17.47,2.36.9,3.63,1.01.26.02.51.19.78.21,1.2.11,2.4.22,3.6.27.79.04,1.58.02,2.36-.06.67-.07,1.33-.22,1.97-.4,1.13-.32,2.27-.59,3.37-1.02.9-.35,1.78-.72,2.69-1.04,1.15-.41,2.07-1.18,3.05-1.86.37-.26.72-.57,1.11-.79.43-.24.74-.59,1.03-.96.42-.56,1.09-.92,1.32-1.64,0-.02.03-.03.04-.04.53-.37.93-.85,1.27-1.4.15-.25.28-.54.49-.73.56-.5.91-1.14,1.27-1.77.16-.29.23-.63.37-.93.36-.76.74-1.52,1.09-2.29.08-.17.05-.42.16-.56.33-.42.45-.92.59-1.42.11-.38.18-.77.33-1.13.54-1.24.81-2.56,1.1-3.87.18-.82.27-1.65.25-2.5-.01-.4.2-.81.22-1.22.06-1.21.08-2.41.1-3.62.01-.53,0-1.06,0-1.59,0,0-.01,0-.02,0h-.01s-.01,0-.02,0c0-.08,0-.16,0-.23-.29-2-.21-4.04-.75-6-.28-1.02-.53-2.05-.83-3.07-.16-.54-.39-1.06-.58-1.6-.17-.46-.28-.95-.5-1.39-.56-1.13-1.13-2.26-1.76-3.36-.34-.6-.78-1.13-1.2-1.69-.15-.2-.37-.35-.52-.55-.44-.61-.85-1.23-1.28-1.84-.07-.1-.17-.17-.26-.25-.17-.16-.33-.33-.5-.49-.46-.44-.89-.91-1.39-1.29-.75-.58-1.54-1.12-2.35-1.62-.8-.5-1.64-.94-2.46-1.4-.1-.06-.22-.1-.33-.14-.39-.12-.79-.19-1.16-.36-1.15-.53-2.32-.97-3.6-1.09-.36-.03-.72-.21-1.08-.24-1.4-.12-2.79-.28-4.2-.28l4.2.28ZM27.03,59.45c-1.39-.03-2.89-.03-4.39-.1-.5-.02-.99-.22-1.49-.32-1-.21-2.02-.37-3.01-.62-.74-.19-1.46-.46-2.17-.74-.72-.29-1.47-.56-2.12-.97-.44-.28-.9-.48-1.35-.71-.17-.09-.3-.25-.44-.39-.15-.15-.24-.38-.52-.31-.05.01-.13-.02-.16-.06-.38-.62-1.16-.72-1.62-1.25-.46-.52-1-.96-1.45-1.48-.76-.85-1.51-1.71-2.2-2.61-.51-.67-.93-1.4-1.37-2.12-.42-.68-.87-1.35-1.23-2.06-.47-.93-.96-1.86-1.28-2.84-.22-.69-.49-1.37-.66-2.06-.16-.64-.46-1.24-.48-1.94-.01-.48-.27-.94-.37-1.42-.08-.38-.1-.77-.15-1.15-.07-.5-.14-.99-.21-1.49-.02-.12-.06-.24-.04-.35.09-.69-.04-1.37-.15-2.03-.24-1.35-.03-2.7-.14-4.05-.03-.34.1-.7.14-1.05.12-1.37.17-2.75.38-4.11.18-1.2.49-2.39.82-3.56.17-.59.28-1.23.51-1.77.38-.87.62-1.77.95-2.66.11-.29.34-.53.47-.81.49-1.08.96-2.17,1.6-3.16.5-.76,1.09-1.45,1.64-2.18.44-.57.86-1.17,1.33-1.72.35-.41.75-.78,1.14-1.15.44-.41.87-.83,1.34-1.19.72-.56,1.4-1.24,2.22-1.58,1.03-.42,1.89-1.19,3.04-1.37.44-.07.83-.41,1.26-.6.19-.09.41-.12.62-.19.32-.1.63-.23.95-.31.85-.22,1.7-.44,2.55-.64.37-.09.75-.19,1.13-.22.82-.06,1.64-.08,2.46-.1.44-.01.87-.01,1.31,0,.63.02,1.27.01,1.9.09.58.07,1.15.29,1.73.36,1.53.17,3,.61,4.45,1.11.64.22,1.31.46,1.89.88.5.36,1.11.56,1.67.85.23.12.47.23.64.41.21.21.34.49.7.45.02,0,.04.01.05.03.56.69,1.51.91,2.01,1.69.23.36.65.58.94.9.57.62,1.13,1.26,1.67,1.91,1.04,1.24,1.89,2.61,2.7,4,.43.75.92,1.47,1.13,2.33.07.28.3.51.41.78.22.58.4,1.17.6,1.76.08.24.16.49.25.73.09.26.17.52.26.78.08.24.14.49.22.73.02.07.1.14.1.21.03.97.51,1.85.59,2.81.06.67.23,1.34.21,2.01-.02.63.11,1.23.11,1.85,0,.25.11.5.13.75.04.38.07.77.07,1.15,0,.79,0,1.59-.01,2.38-.01.39-.09.78-.13,1.17-.11,1.09-.21,2.19-.32,3.28-.15,1.43-.49,2.83-.85,4.22-.1.39-.33.75-.39,1.15-.16,1.04-.74,1.93-.95,2.94-.09.44-.39.77-.58,1.15-.48,1.01-.91,2.05-1.5,3.01-.52.85-1.14,1.61-1.74,2.39-.45.59-.88,1.2-1.36,1.76-.36.43-.77.81-1.18,1.19-.42.39-.85.79-1.3,1.14-.72.56-1.41,1.2-2.22,1.6-.68.34-1.33.74-2.02,1.06-.57.26-1.17.45-1.76.67-.75.28-1.5.56-2.26.82-.18.06-.39.06-.58.1-.25.05-.51.09-.75.19-1.03.45-2.13.48-3.34.64Z\"/>\n  </g>\n</svg>",
    8: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50.32 59.46\">\n  <g>\n    <path class=\"cls-1\" d=\"M18.65,4.23c4.33-.08,8.52.05,12.71-.08-.41-.2-.81-.41-1.24-.5-1.82-.39-3.67-.48-5.52-.57-.67-.03-1.34.04-2.01.09-.51.03-1.02.05-1.48.34-.17.11-.42.16-.62.15-.53-.05-.96.31-1.46.36-.1,0-.19.11-.37.22ZM27.35,13.57s-.06-.05-.08-.08c-.17.12-.34.23-.49.36-.05.04-.05.13-.08.19.07,0,.18.04.21,0,.16-.15.3-.32.44-.49ZM30.57,13.98c-.32-.01-.64-.03-.95-.03-.04,0-.1.1-.13.16-.01.02.05.11.07.11.34-.08.67-.16,1.01-.25ZM15.49,15.1c-.08.04-.15.08-.21.11.06.05.12.12.18.13.05,0,.12-.06.18-.1-.05-.04-.1-.09-.16-.14ZM18.84,16.2c.24.24.51.31.84.19.76-.26,1.1-.92,1.43-1.57.02-.04-.02-.11-.03-.16-.06.02-.16.02-.19.07-.07.12-.1.26-.17.37-.43.72-.94,1.29-1.88,1.09ZM14.55,16.85c-.1-.05-.16-.1-.23-.11-.11-.01-.23,0-.34,0-.13,0-.26-.02-.39-.04.12.08.23.19.36.25.12.05.26.07.39.07.05,0,.1-.09.2-.17ZM10.83,18.11s.07.06.1.09c.17-.13.35-.26.5-.41.05-.05.04-.17.06-.25-.09,0-.23-.03-.27.02-.15.17-.26.37-.39.55ZM12.87,17.39c-.05.04-.1.06-.14.1-.02.02-.02.09,0,.1.3.25.59.51.9.75.04.03.15-.02.22-.03-.02-.07-.02-.16-.06-.2-.25-.23-.5-.44-.76-.66-.04-.04-.1-.04-.16-.07ZM31.99,20.03c.02-.29.04-.58.08-.86.02-.19.03-.48.28-.44.3.04.15.32.09.48-.09.29-.22.58-.33.86-.04-.02-.08-.03-.12-.05ZM33.49,20.38c-.03-.07-.06-.11-.05-.14.03-.07.07-.14.11-.21.02.04.06.09.05.12-.02.07-.06.13-.11.22ZM10.18,20.62v-.08c.13,0,.25,0,.37,0,.69-.07,1.2-.47,1.68-.93.04-.04.02-.13.03-.19-.08,0-.15-.01-.22,0-.03,0-.06.05-.09.08-.72.57-1.45,1.09-2.45.78-.05-.02-.13.04-.2.06.05.05.09.14.15.15.24.06.49.09.73.13ZM31.38,20.09c-.24-.06-.18-.53-.51-.4-.16.07-.29.31-.34.5-.08.26.09.43.35.52q.06-.67.5-.63ZM29.31,19.26c-.05.11-.1.19-.11.28-.12.7.18,1.13.97,1.38.1.03.22,0,.33.01-.07-.08-.13-.21-.22-.24-.49-.18-.72-.52-.71-1.04,0-.09-.05-.19-.09-.28-.02-.04-.08-.06-.17-.11ZM26.6,7.64c1.54.05,2.97.27,4.33.85.54.23,1.1.39,1.63.63.46.21.89.49,1.33.74.05.03.09.09.14.11,1.23.41,2.13,1.27,3.01,2.17.35.36.76.67,1.14,1.01.49.45.8,1.03,1.05,1.63.26.64.46,1.3.66,1.96.17.54.35,1.08.44,1.63.1.6.12,1.22.14,1.83.01.28-.04.55-.08.83,0,.06-.08.11-.13.16-.03-.06-.08-.13-.08-.19,0-.24.05-.48.01-.71-.13-.76-.24-1.53-.45-2.27-.26-.87-.57-1.73-.95-2.55-.36-.78-.77-1.57-1.31-2.23-.51-.61-1.23-1.04-1.84-1.57-.8-.71-1.74-1.16-2.7-1.57-.51-.21-.99-.47-1.49-.71-.07-.03-.17-.1-.21-.08-.4.21-.62-.11-.89-.29-.08-.06-.17-.17-.24-.17-.68.08-1.25-.35-1.89-.38-.63-.04-1.27-.07-1.9-.03-1.06.06-2.13.1-3.17.29-1.08.19-2.14.56-3.21.83-.11.03-.24-.02-.36-.03.05-.14.05-.34.15-.4.36-.23.72-.47,1.12-.6.86-.28,1.73-.55,2.66-.59.76-.03,1.52-.2,2.28-.29.29-.03.59,0,.82,0ZM11.59,20.69c-.46.05-.54.37-.66.62-.14.28-.22.58-.3.88-.02.06.08.15.13.23.08-.05.16-.09.23-.15.04-.04.07-.11.07-.16-.03-.52.27-.92.54-1.42ZM40.03,22.04s.02.04.01.05c-.08.15-.15.29-.23.43.04-.17.09-.34.13-.51.03,0,.06.02.09.03ZM10.61,23.12c.02.07.04.25.12.4.04.09.17.13.27.2.06-.09.17-.19.16-.28,0-.25-.05-.51-.11-.76-.02-.07-.15-.18-.19-.16-.09.03-.2.11-.24.2-.04.08,0,.19,0,.4ZM13.7,24.43c.12-.39.22-.72.32-1.04,0,0-.04-.03-.04-.02-.3.24-.33.58-.37.92,0,.01.02.03.1.15ZM22.27,24.66c.29-.04.5-.05.71-.09.07-.01.13-.09.2-.14-.07-.07-.15-.2-.19-.19-.26.07-.5.18-.75.28-.02,0-.04.09-.03.1.04.03.09.05.06.04ZM13.44,25.02c.05.08.12.21.2.34,0,.01.1,0,.1-.02.02-.12.04-.25.05-.37,0-.09,0-.19-.03-.28,0-.04-.06-.11-.09-.1-.05,0-.11.04-.13.09-.04.09-.05.19-.09.36ZM37.61,24.02c-.34.19-.6.36-.89.49-.31.14-.48.36-.45.71.01.11.02.27.08.31.08.04.22-.01.32-.06.37-.17.72-.38,1.1-.54.22-.1.35-.26.26-.45-.08-.17-.28-.29-.43-.45ZM24.75,25.74s.07,0,.11,0c.02-.14.06-.28.04-.42-.01-.1-.13-.26-.17-.25-.23.06-.06.2-.04.31.02.12.04.24.06.36ZM12.08,25.15c.04.27.04.44.1.6.03.09.15.14.23.21.03-.09.1-.18.09-.26-.06-.57-.02-1.13.17-1.68.02-.06-.02-.14-.03-.22-.08.04-.2.06-.22.12-.13.43-.24.87-.33,1.23ZM22.38,25.39l-.23.84c.33-.21.44-.48.23-.84ZM32.55,26.16c-.26.07-.41.12-.57.15-.02,0-.06-.08-.09-.12.14-.05.27-.11.42-.16.03,0,.08.04.24.12ZM35.84,26.58s.02.06.03.09c.45-.07.9-.13,1.35-.22.06-.01.09-.15.14-.23-.08-.03-.16-.09-.23-.08-.3.06-.61.14-.9.23-.14.04-.25.14-.38.21ZM21.71,27.24l-.13-.05c-.1.12-.21.23-.3.36-.06.09-.14.25-.11.29.09.09.22.17.35.18.06,0,.17-.15.19-.24.03-.18,0-.36,0-.55ZM31.22,27.89c.16-.08.26-.15.38-.19.02,0,.07.07.11.1-.09.09-.17.19-.27.27-.01,0-.11-.09-.22-.17ZM7.4,28.93c0-.05.02-.16-.02-.2-.05-.05-.15-.05-.23-.07-.03.26-.06.53-.07.79,0,.03.09.07.13.1.06-.2.12-.39.19-.62ZM19.64,28.26c.12.12.21.18.24.26.11.27.21.54.3.82.02.05-.04.13-.07.2-.05-.02-.13-.02-.14-.06-.14-.34-.27-.68-.4-1.03-.01-.04.03-.1.07-.2ZM20.93,30.37c-.1,0-.2.01-.23-.02-.15-.17-.28-.35-.42-.53,0-.01.03-.06.05-.09.17.15.33.29.49.45.04.03.05.1.1.2ZM26.91,31.03s0,.07,0,.11l.53-.03s0-.05,0-.08h-.53ZM39.41,30.98s-.07.09-.1.13c-.2-.17-.4-.33-.6-.51-.42-.37-.87-.33-1.15.1-.2.3-.06.58.05.85.15.34.32.4.66.2.34-.2.63-.18.93.05.19.15.36.31.55.45.21.15.42.31.65.39.36.13.72.06,1.01-.18.26-.22.16-.54.11-.82-.01-.08-.05-.15-.07-.23-.21-.74-.51-1.47-.59-2.23-.09-.84-.52-1.46-.98-2.09-.24-.32-.29-.3-.44.06-.07.16-.16.32-.22.48-.27.66-.53,1.32-.79,1.98-.09.24-.04.41.22.52.39.16.6.5.77.86ZM23.81,32.26c.21.36.11.56-.2.75-.48.3-.92.68-1.4.98-.49.31-.49.27-.82-.2-.23-.33-.51-.64-.78-.95-.27-.31-.33-.55-.17-.76.3-.38.38-.38.69.01.21.26.42.52.65.77.36.39,1.37.29,1.71-.16.1-.14.2-.28.3-.44ZM18.44,35.38c-.23.15-.48.28-.67.46-.2.19-.12.4.14.39.32-.01.64-.12.96-.21.1-.03.17-.14.25-.21-.36,0-.61.31-.97.12.13-.16.25-.32.37-.47.1-.11.21-.22.31-.32-.03-.02-.08-.07-.08-.07-.11.1-.21.21-.31.31ZM37.36,37.07c-.01-.52-.39-.96-.83-.97-.3,0-.42.17-.3.45.15.37.43.61.77.78.25.12.37.03.36-.25ZM9.89,37.91c-.18.16-.28.32-.35.31-.15-.03-.29-.14-.44-.22.13-.05.26-.13.4-.16.08-.02.18.03.39.07ZM30.63,13.99c.05.1.09.23.17.28.15.1.32.15.49.2.35.12.57.32.59.72.02.35.09.71.21,1.05.1.29.06.53-.02.8-.27.99-.5,2-.46,3.04,0,.17.01.41.12.48.12.08.34.02.54.02-.07.33-.13.68-.21,1.03-.06.24-.2.35-.43.18-.24-.18-.47-.37-.71-.56-.2.36-.4.72-.63,1.12-.2-.12-.46-.27-.7-.42-.22-.14-.42-.31-.64-.44-.07-.04-.18,0-.27,0,.04.09.05.2.11.25.53.44,1.09.84,1.77,1.02.51.14.78.51.6.99-.24.63-.55,1.24-.84,1.86-.03.06-.17.12-.22.1-.19-.09-.2.02-.21.15,0,.08,0,.16-.01.24-.03.23-.04.21-.36.26-.12.02-.29.17-.32.28-.11.46-.22.92-.25,1.39-.04.67-.02,1.34-.03,2.02,0,.1-.02.25-.09.3-.23.18-.48.32-.82.55.27-.03.42-.06.57-.05.08,0,.21.05.23.1.13.56.25,1.12-.05,1.67-.09.17-.18.19-.32.08-.08-.06-.16-.11-.25-.15-.1-.04-.21-.06-.31-.09-.02.1-.03.21-.05.31-.02.07-.05.13-.08.19-.04-.03-.1-.05-.13-.09-.16-.27-.36-.4-.69-.28-.14.05-.31.03-.46.02-.27-.03-.49-.09-.52-.44-.03-.33-.13-.66-.19-.99-.08-.43-.25-.86-.21-1.28.03-.37-.03-.67-.21-.95-.32-.5-.71-.92-1.36-1.02-.13-.02-.25-.16-.37-.25-.12-.09-.24-.27-.33-.25-.25.05-.23.27-.2.48.08.5.17,1.01.23,1.51.02.19.03.4-.02.58-.06.25-.23.28-.38.06-.16-.24-.26-.51-.36-.78-.15-.43-.14-.44-.53-.24-.07.04-.14.08-.21.09-.63.07-1.56-.66-1.67-1.3-.09-.55-.17-1.11-.25-1.67-.1.14-.13.3-.16.47-.05.29-.08.58-.15.87-.02.09-.15.16-.23.23-.05-.09-.14-.17-.14-.26,0-.71-.02-1.43.07-2.13.07-.54.53-.8,1.1-.75.26.02.51.1.76.12.25.03.32-.13.27-.34-.09-.41-.43-.5-.78-.58-.76-.19-1.78.53-1.86,1.31-.04.39-.08.78-.12,1.17-.02.15-.08.32-.04.46.2.72.4,1.44.66,2.14.12.32.36.61.57.89.2.28.1.68.41.94.21.18.09.7-.13.87-.25.2-.47.21-.73-.02-.22-.2-.33-.13-.34.18-.02.47.27.7.74.6.09-.02.18,0,.27.01-.04.09-.05.22-.12.26-.17.1-.36.15-.54.23-.09.04-.24.12-.23.18.01.44.06.89.1,1.33.04.43.22.91.09,1.28-.15.39-.29.79-.41,1.2-.06.22-.16.49-.09.68.13.31.37.58.58.85.03.04.11.04.17.05.28.04.55.08.82.11.67.09,1.36.09,1.99.29,1.26.4,2.54.5,3.84.47.19,0,.39-.06.58-.12.43-.13.86-.29,1.29-.41,1.18-.33,2.11-1.03,2.93-1.91.31-.33.67-.6,1.02-.89.05-.04.19-.06.21-.03.05.08.08.18.07.27-.01.09-.09.17-.13.27-.16.4-.32.81-.47,1.22-.02.06.02.14.04.21.06-.03.14-.05.19-.1.08-.09.15-.19.2-.3.44-.94.9-1.88,1.21-2.87.15-.48.33-.96.57-1.41.2-.38.49-.71.74-1.05.04-.05.13-.1.19-.09.04,0,.11.11.1.17-.04.23-.08.47-.17.69-.38.95-.73,1.88-.73,2.94,0,.91-.09,1.81.06,2.74.12.77.58,1.27.98,1.83.09.13.37.23.51.19.37-.12.59-.93.4-1.3-.29-.55-.58-1.1-.87-1.65-.38.4-.38.46-.17.91.06.14.09.3.11.45,0,.04-.1.11-.16.14-.03.01-.12-.05-.12-.08-.01-.46-.15-.9-.25-1.35-.14-.61,0-1.24.33-1.83.16-.28.18-.63.27-.95-.04-.02-.09-.03-.13-.05-.18.32-.35.65-.54.96-.02.04-.09.05-.14.06,0,0-.05-.08-.04-.09.23-.36.05-.85.41-1.18.29-.26.49-.62.74-.93.29-.36.57-.75.57-1.21,0-.38.13-.67.27-1,.39-.9.46-1.78-.21-2.62-.37-.47-.57-1.01-.43-1.65.08-.39-.21-.57-.55-.38-.17.09-.34.21-.48.34-.21.19-.39.41-.58.61.05-.22.18-.38.29-.55.03-.05,0-.14,0-.21-.07,0-.17,0-.2.03-.09.13-.16.14-.33.13-.37-.03-.74.04-1.05.29-.15.12-.3.25-.47.35-.15.09-.3.1-.39-.11-.09-.19-.05-.27.15-.34.5-.17.87-.61,1.44-.67.11-.01.21-.16.35-.29-.2-.06-.35-.08-.49-.15-.09-.04-.23-.17-.21-.2.05-.11.14-.22.25-.27.1-.04.24-.02.35,0,.34.05.56-.03.69-.39.08-.2.27-.41.47-.51.67-.32,1.07-.91,1.54-1.44.05-.05.02-.17.02-.26-.09.01-.21,0-.26.05-.23.21-.44.45-.65.67-.14.16-.28.32-.43.47-.02.02-.1,0-.16-.02.01-.05,0-.12.04-.15.27-.32.51-.67.83-.93.61-.5,1.21-1.12,2.14-.6.17.09.42.03.64.03.1,0,.2-.03.29-.03.26.01.39.11.36.41-.03.29-.01.59.04.88.05.28,0,.48-.18.71-.34.42-.23.79.2,1.12.37.28.75.57,1.08.91.37.38.65.83.78,1.38.18.76.46,1.5.69,2.25.13.41.28.82.38,1.24.14.55-.27,1.32-.73,1.4-.34.06-.69.14-1.03.16-.25.02-.51,0-.74-.09-.85-.29-1.59.17-1.66,1.05,0,.08.02.17,0,.24-.15.4,0,.9-.36,1.23-.29.27-.29.52-.04.81.29.34.32.7.09,1.1-.14.23-.31.47-.35.73-.1.68-.27,1.38.28,1.98.07.07.11.17.15.26.51,1.18.41,2.17-.76,2.99-.84.59-1.83.7-2.79.8-.58.06-1.13.16-1.64.42-.37.19-.38.31-.09.62.45.47.89.96,1.36,1.41.18.18.21.32.14.57-.14.51-.18,1.05-.33,1.56-.08.27,0,.42.16.57.91.88,1.83,1.74,2.73,2.63.5.49.87.35,1.3-.02.41-.36.76-.79,1.13-1.19.07-.08.13-.17.2-.25-.11-.03-.21-.08-.32-.08-.73,0-1.46-.02-2.19,0-.35.01-.57-.12-.74-.39-.05-.07-.07-.16-.11-.24.07-.02.15-.04.22-.04,1.25,0,2.5.02,3.75.02.13,0,.3-.02.37-.09.42-.47.83-.96,1.23-1.45.02-.02-.04-.16-.1-.19-.06-.03-.16-.01-.23-.01-1.59,0-3.18,0-4.77-.01-.34,0-.67-.02-1.01-.02-.31,0-.34-.23-.35-.45-.01-.26.19-.21.34-.21,1.07,0,2.14-.02,3.21,0,1.11.02,2.21.07,3.32.1.06,0,.15-.05.18-.1.24-.43.47-.86.72-1.29.15-.26.01-.3-.21-.31-.77-.01-1.54-.05-2.31-.04-1.43,0-2.86.03-4.29.04-.73,0-1.48.11-2.04-.54-.05-.05-.14-.07-.21-.1,0-.05.01-.09.02-.14.43,0,.86,0,1.3,0,2.38.01,4.77-.02,7.15.06.95.03,1.52-.19,1.78-1.14.11-.41.17-.41-.25-.41-1.67,0-3.34,0-5.01,0-.09,0-.17,0-.34,0,.11-.15.2-.22.22-.3.11-.39.4-.45.73-.44.28,0,.55.06.83.05,1.03-.01,2.06-.06,3.09-.05,1.26.01,1.23.23,1.72-1.23.11-.35.1-.37-.27-.38-1.17-.01-2.34-.01-3.51-.01-.6,0-1.19,0-1.79,0-.31,0-.42-.13-.44-.48-.02-.34.27-.23.42-.24.33-.02.66.02.99.03,1.57,0,3.14,0,4.71,0,.32,0,.5-.19.55-.5.03-.21.07-.41.12-.62.09-.38-.02-.55-.44-.56-.37-.01-.75.04-1.12.04-1.21,0-2.42-.04-3.63-.04-.61,0-1.21.04-1.82.08-.3.02-.39-.18-.42-.4-.03-.23.1-.35.36-.35.87,0,1.74-.03,2.61-.03,1.37,0,2.73,0,4.1.02.7,0,.82-.1.96-.8.15-.75.03-.68-.61-.68-2.1-.01-4.21,0-6.31.02-.14,0-.28.01-.42,0-.3-.05-.18-.35-.29-.51.1-.06.2-.16.3-.16.39-.02.78,0,1.18,0h4.24c.41,0,.82,0,1.24,0,1.08-.01,1.04.12,1.01-1.03-.01-.44-.03-.45-.47-.45-1.67,0-3.34,0-5.01,0-.6,0-1.19,0-1.79,0-.14,0-.38.05-.33-.2.03-.14.19-.3.33-.34.16-.04.35.04.52.07.69.14,1.38.11,2.05-.12.24-.08.49-.15.74-.15.8-.01,1.61,0,2.41.02.4,0,.79.06,1.18.05.55-.01.58-.06.61-.61.01-.19-.02-.39,0-.59.06-.38-.14-.42-.44-.41-.75.03-1.51.03-2.26.04-.3,0-.6,0-.89,0-.31,0-.3-.26-.33-.47-.03-.25.16-.23.31-.24.55-.02,1.1-.04,1.66-.04.57,0,1.15.02,1.72.02.3,0,.43-.13.39-.44-.02-.23,0-.47.02-.7.04-.29-.02-.44-.36-.44-1.11.01-2.21,0-3.32,0-.2,0-.4.01-.6,0-.2-.02-.37-.3-.34-.54.03-.24.22-.18.37-.19.14-.01.28,0,.42,0,1.13,0,2.27,0,3.4,0,.46,0,.46-.03.38-.47-.03-.19-.04-.39-.03-.59,0-.53.01-.54-.51-.54-1.33,0-2.66,0-4,0-.16,0-.37.05-.47-.03-.15-.12-.23-.34-.35-.51.12-.04.25-.11.37-.11.6-.01,1.19,0,1.78,0,.87,0,1.75,0,2.62,0,.31,0,.44-.1.4-.42-.05-.35-.08-.7-.14-1.05-.03-.17-.11-.27-.32-.27-1.43,0-2.86,0-4.29-.01-.56,0-1.11.01-1.67.01-.3,0-.56-.19-.55-.42.02-.33.29-.25.5-.25.04,0,.08,0,.12,0,1.73,0,3.46,0,5.18-.03.98-.01.98-.04.8-.98-.07-.38-.26-.53-.65-.53-1.42.01-2.83.03-4.25.04-.14,0-.28-.01-.41-.03-.39-.04-.44-.12-.21-.42.07-.1.21-.2.32-.2.37-.03.74,0,1.11,0,.95,0,1.9-.05,2.85,0,.87.04,1.3-.03.86-1.08-.22-.51-.19-.51-.76-.51-1.17,0-2.34-.01-3.5-.02-.19,0-.3-.05-.31-.26-.02-.26.02-.4.34-.4,1.13,0,2.26,0,3.39-.02.39,0,.45-.08.36-.46-.06-.25-.14-.49-.23-.73-.1-.26-.26-.39-.58-.38-.99.03-1.98,0-2.98,0-.35,0-.54-.16-.51-.46.03-.34.33-.2.51-.2.91-.02,1.83,0,2.74,0,.43,0,.49-.09.33-.48-.11-.27-.31-.51-.41-.79-.1-.28-.28-.34-.55-.33-.83,0-1.67,0-2.51,0-.14,0-.33.05-.41-.02-.15-.13-.23-.33-.35-.5.13-.06.26-.17.39-.18.77,0,1.54,0,2.31.03.63.02.74-.11.53-.73-.04-.13-.12-.25-.18-.38-.15-.31-.39-.47-.75-.45-.59.04-1.18.07-1.76.07-.41,0-.84,0-1.24-.09-.15-.03-.24-.32-.36-.49.1-.05.2-.14.3-.14.86-.01,1.72-.01,2.58-.02.53,0,.63.07.32-.53-.04-.07-.06-.15-.11-.21-.36-.48-.72-.89-1.44-.8-.68.09-1.39,0-2.09.03-.37.01-.6-.11-.76-.43-.14-.27-.11-.33.22-.32.35.01.7.05,1.06.05.49,0,.97,0,1.46-.03.33-.02.35-.09.14-.34-.28-.33-.62-.63-.85-.99-.19-.31-.44-.36-.74-.36-.81,0-1.61-.04-2.41.03-.8.07-1.35-.36-2.08-.77.25-.01.36-.02.48-.02,1.07.01,2.14.03,3.22.03.1,0,.21-.06.31-.09-.04-.09-.05-.2-.11-.26-.39-.36-.79-.72-1.2-1.06-.09-.08-.26-.09-.39-.1-.82-.03-1.65-.06-2.47-.06-1.01,0-2.02,0-3.03.06-.87.05-1.58-.36-2.32-.7.1-.04.19-.06.29-.06,1.5.01,3.01.03,4.51.04.54,0,1.07-.02,1.61-.05.08,0,.15-.08.23-.12-.05-.06-.09-.13-.15-.17-.49-.26-.99-.49-1.46-.79-.58-.36-1.22-.47-1.87-.48-.77-.02-1.54.04-2.31.04-.87,0-1.74-.07-2.61-.07-1.06,0-2.12.06-3.18.07-1.22.01-2.44.01-3.66,0-1.11-.01-2.23-.09-3.34-.05-.49.01-1.01-.14-1.5.16-.3.19-.66.26-.98.42-.51.26-1.01.54-1.5.82-.04.02-.06.08-.09.12.05.03.1.09.14.09.24,0,.47-.03.71-.03,2.78,0,5.57,0,8.35,0,.15,0,.29.02.44.02-.37.19-.75.3-1.13.37-.52.1-1.05.23-1.57.25-1.09.04-2.18,0-3.27.01-.49,0-.98.07-1.47.07-1.04,0-2.09-.05-3.13-.07-.13,0-.3.01-.39.09-.41.36-.8.75-1.19,1.13-.03.03-.04.07-.06.1-.09.16-.08.27.13.28.14,0,.28,0,.42,0,1.55,0,3.1,0,4.65,0,.19,0,.38.02.61.03-.52.5-1.08.66-1.75.64-1.51-.04-3.02,0-4.53-.02-.41,0-.74.08-.99.41-.31.39-.63.76-.94,1.14-.11.14-.13.26.1.26.18,0,.36,0,.54,0,1.28,0,2.57,0,3.85,0,.12,0,.25.02.37.03-.08.11-.14.24-.24.31-.17.13-.36.31-.54.31-1.11,0-2.22-.05-3.33-.05-.65,0-1.42-.23-1.7.7-.01.05-.08.09-.12.13-.16.23-.32.47-.48.71.3.03.6.08.9.08,1.21,0,2.42-.03,3.63-.03.11,0,.22.1.33.15-.12.16-.21.36-.36.48-.09.07-.27.02-.41.02-1.17,0-2.35,0-3.52,0q-1.03,0-1.5.94c-.04.07-.07.14-.1.22-.18.4-.17.41.29.41,1.11,0,2.22,0,3.33,0h.82q-.81.66-1.67.66c-.73,0-1.46,0-2.19,0-.35,0-.79-.12-1.01.05-.26.2-.33.66-.47,1-.04.09-.05.19-.09.28-.08.18-.01.26.17.26.43,0,.87.01,1.3.01.59,0,1.18,0,1.8,0-.15.48-.38.69-.87.66-.75-.04-1.51-.02-2.27,0-.16,0-.39.06-.45.17-.2.36-.34.74-.49,1.13-.07.18-.02.3.21.3.73-.02,1.47-.04,2.2-.03.24,0,.5.05.7.17.12.07-.28.47-.61.52-.14.02-.28,0-.42,0-.65,0-1.3,0-1.95,0-.14,0-.34.07-.39.17-.14.27-.28.57-.32.87-.07.5-.21.55.42.55.63,0,1.26-.05,1.9-.06.13,0,.36.04.37.1.03.16.02.37-.07.5-.06.09-.27.12-.41.13-.57.01-1.14,0-1.71,0-.83.02-.83.03-.85.87,0,.08,0,.16,0,.24-.02.29.13.38.4.37.3-.01.61,0,.91,0-.41.32-.69.81-1.27.68-.05-.01-.17.07-.18.11-.08.56-.34,1.13.1,1.67.16.19.13.48-.1.6-.18.09-.24.17-.24.35,0,1-.02,2.01-.03,3.01,0,.18-.02.42.08.51.12.11.36.1.55.11.32.02.32.28.35.47.04.26-.2.17-.34.19-.12.02-.24-.01-.36.02-.08.02-.2.1-.2.16,0,.35.02.71.07,1.06.03.21.19.34.43.33.35,0,.71-.03,1.06-.02.1,0,.26.04.3.11.16.29-.03.6-.36.6-.38,0-.76,0-1.13.02-.08,0-.24.12-.23.17.02.27.05.56.14.81.15.44.25.49.74.49.34,0,.68,0,1.01,0,.23,0,.5.27.47.5-.03.27-.28.15-.43.16-.38.02-.75.01-1.13.03-.07,0-.19.09-.2.14-.02.25-.03.5,0,.75.04.45.19.59.64.6.46,0,.92.03,1.37,0,.51-.04.77.24,1.06.64-.21,0-.35.02-.48.02-.58,0-1.15,0-1.73-.02-.26,0-.43.01-.31.36.11.31.18.65.22.98.04.32.2.37.48.37.99-.01,1.98,0,2.96,0,.1,0,.2,0,.3,0,.33,0,.39.3.42.49.04.29-.26.17-.39.18-.87.02-1.75,0-2.62.01-.76,0-.86.17-.54.89.03.07.09.13.12.21.19.45.39.89.56,1.35.07.19.13.24.34.16.66-.26,1.33-.5,2-.71.34-.11.7-.12,1.04-.23.89-.29,1.68-.78,2.47-1.26.67-.4,1.16-1.04,1.89-1.37.27-.12.42-.19.66.05.62.6,14.46,12.92,14.92,13.54.14.18.39.12.45-.1.06-.22.12-.45.15-.68.11-.94.34-3.05.66-3.93.17-.46.14-.9-.16-1.27-.15-.19-.4-.31-.6-.47-1.28-1-8.6-6.39-8.98-6.55-.67-.29-4.46-1.93-4.74-1.99-.3-.07-.66-.21-.91-.11-.44.19-1,.1-1.35.54-.05.06-.13.13-.19.13-.21,0-.46-.1-.62-.02-.15.08-.16.39-.3.52-.39.35-.4.31-.88.08-.41-.2-.84-.41-1.23.09-.18.22-.68.14-.86-.08-.27-.33-.31-.77-.05-1.02.47-.45.93-.91,1.44-1.32.41-.33.57-.74.55-1.24,0-.06-.12-.12-.18-.18-.04.06-.12.13-.11.17.1.39-.23.59-.36.87-.03.06-.16.08-.25.11-.02-.09-.07-.18-.06-.27.02-.16.08-.31.12-.46-.19.06-.26.18-.36.26-.07.06-.23.11-.25.08-.22-.25-.34-.06-.46.08-.09.11-.15.22-.33.11-.05-.03-.21.05-.3.11-.5.4-.49.4-1.03.06-.06-.04-.24,0-.24,0-.03.27-.2.33-.42.25-.23-.08-.28-.27-.31-.51-.03-.3-.17-.59-.29-.87-.12-.27-.3-.51-.42-.77-.23-.52-.21-.54.37-.63.05,0,.09-.06.13-.09-.04-.04-.07-.1-.12-.11-.11-.01-.23.01-.34,0-.06,0-.17-.06-.17-.1-.02-.26-.06-.52,0-.76.03-.14.23-.26.38-.34.15-.09.33-.14.5-.17.32-.06.65-.09,1-.14-.31-.36-.41-.43-.61-.35-.44.17-.93.25-1.3.57-.05.05-.19.07-.24.04-.17-.13-.36-.26-.46-.43-.31-.56-.59-1.13-.59-1.79,0-.43,0-.82-.4-1.1-.07-.05-.08-.18-.13-.26-.1-.17-.18-.35-.31-.48-.35-.37-.38-.44,0-.83.45-.47.59-1,.45-1.63-.04-.2-.05-.46.05-.62.11-.18.36-.27.55-.4.07.19.15.37.21.56.02.07-.02.16,0,.24.02.1.07.19.11.28.1-.08.27-.15.27-.23,0-.27-.05-.54-.08-.81-.02-.13-.09-.28-.04-.38.16-.31.39-.56.78-.54.26.01.52,0,.77.06.22.05.35-.01.41-.22.05-.18.09-.37.11-.56.05-.43.08-.86.11-1.29.01-.19.02-.39-.02-.58-.15-.62-.05-.89.45-1.27.19-.14.3-.23.56-.06.23.16.56.19.85.23.11.01.23-.12.35-.18-.11-.04-.22-.09-.34-.13-.07-.02-.16,0-.24-.01-.43-.05-.46-.09-.4-.52.02-.13,0-.26-.01-.39-.11-1.01.13-1.34,1.11-1.58.11-.03.29-.25.27-.29-.28-.53.13-.82.39-1.14.3-.38.88-.37,1.24-.03.05.05.12.08.18.12.04-.06.09-.12.12-.19.13-.41.26-.82.39-1.22.04-.11.12-.22.11-.33-.03-.8.41-1.44.77-2.07.55-.97,1.41-1.7,2.28-2.39.6-.48,1.31-.81,1.98-1.19.2-.12.43-.23.65-.27.17-.03.43.02.52.13.16.21-.13.28-.25.38-.09.07-.22.09-.33.14-.59.27-1.32.28-1.74.91-1.23.7-1.87,1.94-2.73,2.98-.06.07-.09.17-.13.26.1.02.21.05.31.06.1.01.2,0,.29.03.45.17.79.03,1.13-.29.25-.24.57-.52.88-.54.51-.04.92-.23,1.3-.51.44-.33.84-.7,1.27-1.05.12-.1.37-.15.38-.24.05-.56.57-.62.9-.83.55-.35.81-.27,1.33.15.25.2.5.37.86.27.37-.11.76-.17,1.15-.21.5-.05.5-.04.85.43.02-.29.02-.51.05-.73.02-.17.04-.36.13-.49.28-.42.95-.55,1.37-.25.47.33.9.71,1.37,1.04.23.16.51.29.79.36.09.03.24-.16.36-.24.26-.16.53-.19.79-.02.39.26.74.59,1.14.82.57.33.98.7.85,1.44-.04.22.08.47.13.71-.25-.04-.5-.08-.75-.12-.05,0-.1-.03-.15-.05,0,0,0-.01-.01-.02-.02,0-.04,0-.05.01.02,0,.03,0,.05,0,0,0,.01,0,.02,0ZM2.26,31.42c0-.91-.03-1.82,0-2.72.07-1.85.16-3.71.55-5.53.15-.7.21-1.42.45-2.09.39-1.1.55-2.26.97-3.34.35-.88.73-1.75,1.12-2.62.34-.76.71-1.52,1.08-2.27.09-.19.27-.32.39-.5.27-.43.53-.87.78-1.31.47-.82,1.14-1.48,1.81-2.13.45-.44.92-.86,1.34-1.32.62-.67,1.34-1.22,2.09-1.72.77-.51,1.6-.92,2.4-1.38,1.55-.88,3.24-1.31,4.92-1.8.79-.23,1.58-.31,2.39-.35.53-.02,1.05-.16,1.57-.23.37-.04.75-.07,1.12-.06.45,0,.91.04,1.36.08.65.06,1.29.18,1.93.2.79.02,1.49.37,2.24.52.84.17,1.65.51,2.44.85.87.36,1.69.85,2.57,1.2,1.02.41,1.85,1.14,2.84,1.6.09.04.18.1.25.16.74.71,1.48,1.42,2.2,2.14.22.22.4.48.58.74.63.86,1.25,1.73,1.88,2.58.79,1.06,1.23,2.3,1.78,3.48.3.64.53,1.31.77,1.97.11.31.17.64.27.96.11.38.24.74.35,1.12.59,2.09,1.01,4.21,1.23,6.37.08.73.09,1.46.11,2.19.02.83.04,1.66,0,2.5-.07,1.87-.16,3.74-.54,5.58-.14.7-.21,1.42-.45,2.09-.39,1.08-.54,2.22-.96,3.28-.34.86-.71,1.71-1.09,2.56-.36.8-.7,1.62-1.14,2.37-.57.98-1.22,1.91-1.88,2.83-.28.39-.69.7-1.04,1.04-.46.45-.94.9-1.38,1.37-.63.66-1.33,1.22-2.1,1.71-.6.38-1.18.78-1.8,1.11-1.22.64-2.45,1.25-3.8,1.59-.75.19-1.48.43-2.23.63-.32.08-.66.13-.99.16-1.08.11-2.15.28-3.23.3-1.06.03-2.12-.05-3.17-.15-.6-.06-1.18-.26-1.78-.4-.06-.01-.11-.04-.17-.06-.74-.19-1.48-.36-2.21-.59-.53-.16-1.04-.39-1.54-.62-.95-.43-1.92-.83-2.81-1.35-.91-.54-1.85-1.05-2.62-1.81-.52-.51-1.13-.94-1.59-1.49-1.26-1.49-2.53-2.98-3.47-4.71-.4-.74-.73-1.53-1.07-2.31-.29-.66-.54-1.34-.79-2.02-.11-.31-.17-.64-.26-.96-.11-.38-.24-.75-.34-1.12-.42-1.52-.77-3.05-.99-4.61-.09-.63-.19-1.25-.25-1.88-.06-.61-.08-1.22-.12-1.84,0,0,.01,0,.02,0ZM23.69.96c-1.31-.07-2.55.29-3.79.61-.56.15-1.07.5-1.69.45-.06,0-.12.02-.17.04-1.16.49-2.3,1.05-3.49,1.44-1.04.35-1.8,1.11-2.69,1.66-.42.26-.81.56-1.2.87-.34.27-.67.55-.97.85-.39.39-.82.77-1.1,1.24-.21.35-.46.63-.75.89-.17.16-.34.34-.48.52-.42.54-.79,1.12-1.24,1.63-.68.79-1.01,1.77-1.5,2.67-.53.99-.88,2.06-1.34,3.08-.38.85-.56,1.8-.9,2.68-.21.53-.32,1.1-.45,1.66-.15.65-.3,1.31-.42,1.97-.11.63-.18,1.27-.16,1.92.01.46-.21.92-.24,1.39-.07,1.06-.09,2.13-.12,3.19-.01.33-.02.67,0,1,.04.65.12,1.3.17,1.95.1,1.12.16,2.25.3,3.37.14,1.13.4,2.23.74,3.33.38,1.21.75,2.43,1.19,3.63.32.87.67,1.73,1.09,2.56.41.81.91,1.58,1.39,2.35.45.73,1.1,1.32,1.55,2.06.31.5.69.96,1.05,1.43.07.09.17.16.26.25.17.16.33.33.5.49.46.44.88.93,1.38,1.3,1.53,1.12,3.14,2.12,4.81,3.02.1.06.22.09.33.13.42.14.86.24,1.26.43,1.23.56,2.49.97,3.85,1.09.24.02.47.18.72.2.88.1,1.77.19,2.65.24.65.04,1.3.01,1.96,0,.35,0,.71-.02,1.06-.02.12,0,.24.02.35,0,1.14-.3,2.35-.35,3.44-.87.59-.28,1.25-.21,1.86-.53.83-.44,1.74-.74,2.63-1.04,1.14-.39,2.04-1.15,3-1.82.39-.27.78-.54,1.15-.84.32-.25.64-.52.93-.81.38-.38.82-.73,1.07-1.18.27-.49.66-.83,1.03-1.2.1-.1.18-.21.27-.32.42-.56.82-1.14,1.27-1.68.67-.79.99-1.78,1.49-2.67.54-.96.83-2.03,1.31-3.02.42-.86.63-1.81.92-2.73.17-.53.31-1.07.44-1.6.15-.63.28-1.27.41-1.91.17-.84.07-1.73.24-2.56.18-.9.18-1.8.2-2.7,0-.34,0-.68.04-1.01.1-.9,0-1.8-.06-2.7-.04-.77-.13-1.54-.23-2.31-.14-1.12-.28-2.24-.47-3.35-.11-.65-.31-1.29-.49-1.93-.13-.45-.27-.9-.42-1.35-.15-.44-.34-.87-.48-1.32-.52-1.67-1.23-3.25-2.17-4.73-.25-.4-.55-.77-.83-1.15-.57-.77-1.13-1.55-1.7-2.32-.37-.48-.72-.96-1.19-1.38-.7-.63-1.32-1.36-2.1-1.9-.59-.41-1.17-.81-1.77-1.2-.36-.24-.74-.46-1.12-.67-.39-.22-.79-.42-1.19-.62-.18-.09-.35-.19-.53-.25-.38-.13-.81-.18-1.15-.37-1.44-.8-3.07-.95-4.63-1.31-.63-.14-1.29-.15-1.94-.21-.59-.05-1.18-.13-1.77-.13-.45,0-.91.09-1.36.13ZM27.17,59.46c-1.51-.03-3.01-.04-4.52-.11-.48-.02-.95-.23-1.43-.31-1.01-.16-2.03-.31-3.01-.61-.75-.23-1.5-.48-2.23-.77-.72-.28-1.47-.55-2.12-.96-.42-.27-.86-.46-1.3-.68-.17-.09-.32-.24-.45-.38-.16-.17-.26-.42-.57-.34-.03,0-.08-.02-.1-.04-.57-.71-1.54-.94-2.06-1.74-.26-.4-.7-.7-1.07-1.02-.63-.54-1.12-1.21-1.6-1.88-.59-.8-1.21-1.58-1.74-2.43-.76-1.23-1.59-2.42-2.02-3.83-.07-.24-.23-.46-.37-.67-.38-.59-.39-1.3-.63-1.93-.28-.75-.55-1.51-.79-2.27-.07-.22-.02-.47-.07-.69-.1-.42-.24-.83-.34-1.25-.07-.26-.12-.53-.15-.8-.11-.94-.29-1.87-.26-2.84.02-.67-.2-1.35-.29-2.03-.04-.34-.05-.68-.05-1.03,0-.81-.02-1.61,0-2.42.01-.43.1-.86.14-1.29.12-1.28.21-2.57.36-3.85.06-.54.23-1.07.36-1.61.13-.55.26-1.11.41-1.65.12-.43.26-.85.39-1.27.06-.19.1-.37.14-.56.02-.09-.03-.22.02-.29.43-.61.58-1.33.78-2.02.16-.54.46-.99.7-1.48.31-.63.6-1.28.91-1.92.6-1.23,1.45-2.3,2.29-3.37.44-.57.97-1.07,1.34-1.71.31-.54.84-.9,1.32-1.3.13-.11.24-.23.37-.34.41-.36.82-.72,1.24-1.07.28-.24.57-.48.87-.68.34-.23.68-.44,1.04-.63.54-.28,1.09-.53,1.64-.79.19-.09.37-.22.57-.28.69-.22,1.34-.51,1.99-.84.19-.1.42-.11.62-.18.32-.1.63-.24.95-.32.85-.22,1.7-.43,2.56-.63.37-.09.75-.2,1.13-.23.8-.06,1.6-.07,2.4-.1.2,0,.4-.02.6-.02.91.03,1.82.03,2.73.11.52.05,1.03.27,1.55.35,1.39.19,2.74.5,4.06.99.82.3,1.65.55,2.39,1.05.51.35,1.11.56,1.68.83.09.04.21.06.26.13.38.47.97.67,1.39,1.09.07.07.14.18.22.19.47.07.77.41,1.07.71.89.87,1.8,1.73,2.6,2.67.69.8,1.26,1.7,1.86,2.58.44.64.85,1.3,1.24,1.98.43.77.94,1.5,1.16,2.38.07.26.23.5.39.73.36.53.36,1.18.58,1.76.31.8.66,1.61.81,2.45.1.56.26,1.1.42,1.64.21.71.12,1.47.35,2.18.09.29.06.62.08.93.04.62.06,1.25.11,1.87.02.29.11.58.14.87.04.38.07.76.07,1.14,0,.77,0,1.54-.01,2.3-.01.37-.1.74-.13,1.11-.12,1.38-.21,2.77-.36,4.15-.06.54-.25,1.07-.37,1.61-.11.48-.2.96-.33,1.43-.14.5-.31,1-.48,1.49-.02.06-.08.11-.08.16.09.57-.33.99-.45,1.49-.1.4-.29.77-.4,1.17-.14.56-.47,1.03-.72,1.54-.3.64-.61,1.28-.92,1.92-.61,1.25-1.46,2.34-2.33,3.41-.43.53-.81,1.11-1.25,1.63-.37.44-.8.84-1.22,1.24-.42.4-.85.8-1.31,1.14-.86.63-1.6,1.42-2.65,1.77-.48.16-.9.48-1.35.71-.24.12-.5.2-.75.31-.61.27-1.21.56-1.82.81-.27.11-.57.14-.85.23-.96.29-1.9.64-2.88.87-.82.19-1.67.25-2.5.37Z\"/>\n  </g>\n</svg>",
    9: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50.35 59.45\">\n  <g>\n    <path class=\"cls-1\" d=\"M16.8,10.25c-.01.36.37.69.65.52.3-.18.58-.41.66-.79.06-.26-.08-.53-.3-.55-.56-.03-1.01.25-1.01.81ZM14.09,15.14c.02-.5-.35-.75-.71-.56-.47.24-.88.51-1.17,1.03-.26.46-.55.88-.68,1.4-.06.26-.05.49.16.64.23.16.38-.06.56-.18.35-.23.6-.53.82-.88.23-.36.55-.66.81-1.01.11-.15.17-.35.21-.44ZM11.72,19.17c-.19-.02-.37.18-.39.43-.02.24.19.53.39.49.13-.03.29-.19.33-.32.08-.27-.12-.58-.33-.6ZM29.54,24.84c-.58.1-1.08.29-1.48.7-.04.04-.02.14-.02.21.07,0,.17.04.21.01.5-.37,1.11-.37,1.67-.52.09-.02.16-.07.25-.11-.08-.07-.15-.15-.24-.19-.12-.05-.26-.07-.38-.1ZM8.72,25.82l.08.08c.24-.16.51-.3.73-.49.37-.32.72-.67,1.05-1.03.07-.08.03-.26.04-.39-.12.03-.27.03-.34.1-.3.3-.58.63-.87.95-.23.26-.46.52-.69.77ZM29.19,26.33c.08-.11.17-.18.18-.25,0-.06-.09-.13-.14-.19-.07.05-.18.1-.18.16,0,.08.08.16.15.28ZM20.22,26.42c.06-.12.13-.21.11-.24-.04-.08-.13-.13-.2-.19-.04.06-.11.12-.1.17.02.07.09.14.18.26ZM29.9,27.16c.23-.02.44-.05.65-.07,0-.02,0-.05-.01-.05-.2,0-.4,0-.6.02,0,0-.01.03-.04.1ZM21.35,27.76q.53-.47.17-1.13c-.11.15-.2.31-.32.44-.42.47-1.15.35-1.41-.23-.02-.04-.03-.08-.05-.11-.1-.17-.25-.51-.29-.49-.27.09-.64.03-.73.47-.07.32-.43.43-.72.28-.16-.08-.38-.24-.4-.38-.02-.15.14-.37.28-.47.5-.37,1.1-.52,1.7-.64.24-.05.49-.08.74-.12,0-.05,0-.1,0-.16-.34-.04-.69-.05-1.02-.11-.35-.07-.82.23-1.02-.33-.02-.04-.19-.02-.27-.05-.12-.05-.22-.12-.33-.18.12-.08.22-.21.35-.24.29-.07.59-.11.88-.13.2-.01.34-.07.52-.19.19-.14.52-.13.78-.1.23.02.44.18.66.26.66.24,1.32.48,2.04.51.34.01.54.32.32.55-.22.22-.11.4-.05.59.08.26.21.51.29.78.08.28-.02.38-.3.32-.13-.03-.23-.14-.36-.18-.1-.03-.22-.04-.32-.03-.06,0-.09.1-.14.16.05.02.1.03.14.06.12.09.23.18.34.27-.11.12-.21.28-.35.34-.35.15-.73.26-1.1.38-.01-.04-.02-.09-.04-.13ZM19.98,27.98c-.09.06-.13.11-.16.1-.08-.02-.16-.06-.24-.1.03-.04.06-.11.08-.1.09.01.17.05.32.1ZM30.92,27.59c-.33.04-.58.08-.82.1-.24.02-.61-.04-.56-.28.06-.3-.06-.32-.24-.41-.26-.13-.46-.31-.49-.62-.03-.29-.18-.26-.36-.13-.08.06-.14.15-.22.2-.29.18-.38.38-.13.67.18.21.07.39-.14.47-.17.07-.37.06-.56.07-.06,0-.12,0-.19,0,0,.06-.02.13,0,.17.06.1.15.18.21.28.17.27.41.52.47.81.18.79.27,1.59.41,2.38.07.39.13.78.27,1.14.27.7,1.34,1.05,1.94.73.3-.16.33-.44.42-.68.4-1.05.74-2.12,1.15-3.17.2-.52.19-1.01.11-1.49-.71.16-1.4.32-2.09.46-.11.02-.24-.12-.37-.19.1-.06.2-.13.31-.17.26-.1.6.05.87-.35ZM29.81,37.59c.22-.26.33-.42.37-.58.04-.16,0-.31-.1-.55-.1.42-.18.78-.27,1.13ZM19.11,36.48c0-.4.12-.73.43-1,.26-.23.48-.52.73-.77.06-.06.2-.03.31-.05-.02.1-.02.22-.07.31-.12.18-.26.35-.41.51-.36.39-.56.8-.51,1.38.04.47-.03.93.26,1.35.03.05.01.14.02.21-.08-.03-.2-.03-.24-.09-.13-.17-.28-.36-.32-.56-.09-.42-.13-.86-.19-1.29ZM30.08,39.18c.63-.7,1.1-1.77,1.16-2.52.04-.6-.19-1.06-.69-1.31.28.65.09,1.27-.01,1.88-.1.62-.28,1.22-.46,1.95ZM21.45,44.92c-.36-.3-1.34-1.26-1.53-1.53.21.12.35.16.43.25.66.72,1.51,1.18,2.32,1.69.12.08.3.12.22.33h0s0,0,0,0c0,0,0,0,.01,0,0,0-.02,0-.03,0h0s0,0,0,0h0s0,0,0,0c0,0,0,0,0-.01-.56-.09-1.02-.38-1.44-.74ZM22.91,45.67c.32-.07.62-.04.96.18-.4.11-.69.04-.96-.18ZM28.73,46.33c.05-.01.11-.02.16-.03.89-.31,1.63-.87,2.39-1.4.34-.23.72-.46.94-.78.56-.81,1.06-1.67,1.55-2.53.22-.38.48-.77.43-1.27-.53,1.31-1.55,2.27-2.32,3.4-.82,1.18-2.14,1.71-3.15,2.61ZM26.06,49.62c.24-.18.5-.18.75-.15s.5.08.73,0c-.42.57-.98.07-1.47.14ZM25.42,49.85c-.5.07-.91.17-1.32.16-.38-.01-.81-.07-1.13-.26-.54-.31-1.12-.58-1.55-1.08-.21-.24-.54-.4-.84-.52-.53-.21-.86-.53-.92-1.11-.02-.21-.11-.41-.2-.74.2.16.31.24.42.34.56.5,1.06,1.07,1.67,1.49.53.36,1.17.56,1.76.83.36.16.71.31,1.07.47.32.14.64.27,1.04.44ZM32,46.2c-.45.41-2.74,2.92-3.24,2.63-.03-.02-.08-.02-.11,0-.72.27-1.46.15-2.19.12-.13,0-.27.05-.41.08-.11.02-.26.07-.34.03-.67-.38-1.45-.35-2.14-.62-.4-.16-.77-.39-1.15-.61-.07-.04-.16-.16-.14-.2.04-.08.14-.17.22-.17.11,0,.23.05.33.09,1.04.41,2.13.59,3.23.7.56.06,1.14-.05,1.71-.09.07,0,.18-.09.18-.12-.01-.08-.07-.2-.13-.22-.47-.14-.94-.29-1.42-.39-.56-.12-1.13-.2-1.69-.32-.14-.03-.26-.14-.38-.26,1.3-.02,2.59.15,3.97-.27-.6-.17-1.05-.21-1.57-.13-.46.07-.96-.13-1.54-.24.29-.25.53-.14.74-.19.14-.03.27-.13.4-.19-.08-.1-.15-.23-.26-.29-.35-.18-.71-.34-1.08-.49-.53-.22-1.07-.41-1.61-.62-.12-.05-.24-.13-.34-.3.25.02.51.01.76.06.83.18,1.41-.23,1.95-.77.2-.19.33-.45.52-.65.37-.39.66-.32.83.17.03.09.07.19.1.28.08.24.23.26.41.14.16-.11.37-.21.45-.37.26-.52.72-.82,1.14-1.17.16-.14.32-.31.39-.5.05-.13,0-.36-.09-.48-.06-.08-.29-.09-.42-.06-.93.24-1.81.64-2.71.95-.49.17-1.05.39-1.6.11-.13-.07-.26-.15-.39-.22.14-.04.28-.07.41-.13.11-.05.27-.11.28-.19.03-.17,0-.37-.23-.41-.21-.04-.44-.06-.64-.13-.22-.08-.42-.2-.62-.33-.12-.08-.29-.87-.2-.97.04-.05.14-.08.2-.08.22,0,.43.02.65.04.75.09,1.48.16,2.17-.34.71-.52,1.49-.95,2.24-1.41-.02-.04-.04-.08-.06-.11-.8.18-1.61.34-2.41.56-.75.2-1.48.25-2.23.05-.69-.19-1.38-.34-2.08-.5-.27-.06-.52-.1-.78.11-.21.18-.44.06-.45-.21,0-.21.02-.44.09-.64.09-.24.31-.3.53-.15.54.36,1.13.38,1.74.22.15-.04.32-.07.45-.15.43-.25.82-.19,1.22.08.09.06.28.09.35.04.55-.43,1.2-.34,1.82-.37.15,0,.31,0,.5,0-.19-.41-.5-.51-.85-.48-.35.03-.58-.08-.68-.42-.07-.24-.23-.27-.46-.26-.23.01-.31.14-.37.32-.06.19-.12.38-.21.55-.01.03-.25,0-.26-.04-.04-.17-.05-.35-.05-.53,0-.18.05-.36.03-.53-.03-.24.15-.54-.17-.69-.39-.19-.8-.28-1.19-.02-.16.11-.29.33-.48.07-.2-.28-.17-.6.05-.77.28-.22.61-.24.91-.14.76.26,1.23-.18,1.62-.67.38-.49.54-1.13.42-1.74-.23-1.16-.22-2.32-.22-3.49,0-.45-.07-.91-.08-1.36-.02-.61-.02-1.22-.02-1.83,0-.06.07-.17.11-.17.06,0,.17.04.2.1.08.16.16.32.2.49.07.29.2.24.37.11.08-.06.16-.13.21-.21.29-.52.8-.69,1.34-.78.51-.08.94-.29,1.29-.67.13-.15.29-.26.44-.4.33-.31.65-.47,1.08-.09.24.21.49-.03.67-.2.13-.12.2-.24.38-.07.02.02.15,0,.17-.04.15-.28.37-.25.61-.15.16.07.21-.03.2-.17,0-.12-.05-.27,0-.34.14-.18.29-.37.17-.58-.12-.2-.28-.41-.48-.51-.24-.13-.21-.25-.19-.47.03-.36-.26-.56-.37-.95-.08-.27-1.05-1.65-1.55-1.9-.22-.11-.37-.3-.68-.22-.27.07-.6.04-.87-.05-.46-.14-.9-.11-1.34,0-.57.13-2.92.68-3.47.59-.15-.03-.33,0-.47-.06-.49-.2-.93,0-1.38.12-.31.08-.6.25-.91.36-.08.03-.2,0-.29-.02-.37-.12-.52.12-.77.34-.64.55-.77,1.41-1.36,1.97-.1.09-.16.24-.27.31-.42.26-.61.65-.75,1.09-.09.29-.27.56-.39.85-.19.46-.35.93-.53,1.38-.07.16-.15.33-.27.45-.22.23-.32.49-.31.81,0,.27-.03.51-.41.31-.12-.06-.27-.03-.41-.06-.36-.06-.62.05-.76.41-.02.06-.04.11-.07.16-.38.5-.42,1.03-.16,1.61.3.68.5,1.42.87,2.06.27.47.4.89.37,1.42-.02.25.09.56.24.77.63.86.76,1.88.99,2.87.02.11-.04.23-.04.35,0,.13-.03.31.04.39.48.6.39,1.35.55,2.04.06.24-.03.46-.34.54-.14.03-.26.18-.4.25-.16.07-.37.19-.48.13-.41-.2-.77.03-1.15.04-.23,0-.51.11-.68.02-.37-.2-.87-.44-.99-.78-.27-.71-.85-.8-1.36-.78-.87.04-1.66-.25-2.47-.44-.56-.13-1.18-.35-1.59-.85-.16-.19-.35-.3-.63-.37-.27-.06-.56-.38-.69-.66-.09-.2.07-.53.15-.78.09-.28.26-.53.33-.81.07-.26.14-.55-.19-.73-.07-.04-.1-.16-.14-.26-.12-.27-.27-.47-.6-.49-.3-.02-.34-.24-.28-.48.07-.3.2-.59.24-.9.06-.47.32-.79.73-.93.49-.17.84-.5,1.2-.83.46-.43.92-.88,1.34-1.35.12-.13.11-.38.16-.58-.16.08-.34.14-.49.24-.42.29-.83.59-1.24.88-.21-.5-.42-.93-.58-1.38-.14-.41-.28-.82-.33-1.25-.05-.43.17-.8.48-1.1.23-.22.51-.4.67-.67.34-.57.81-1.01,1.35-1.38.2-.13.41-.24.61-.35.33-.18.37-.3.12-.59-.4-.46-.56-.96-.41-1.59.12-.48.05-1,.19-1.46.31-.99.58-2.01,1.46-2.71.34-.27.74-.44,1.08-.67.83-.58,1.35-1.41,1.61-2.39.1-.4.12-.83.26-1.21.14-.38.37-.74.59-1.08.14-.22.36-.38.49-.59.32-.54.7-.98,1.36-1.08.07-.01.17-.05.21-.11.49-.7,1.37-.74,2.02-1.19.23-.16.54-.19.81-.29.43-.16.78-.44,1.08-.79.29-.33.73-.44,1.14-.43.72.02,1.38-.24,2.08-.29.67-.05,1.34-.1,2,.07.17.04.36.04.53.01.64-.1,1.2.16,1.77.38.18.07.32.23.47.35.14.11.26.25.41.32.49.23.99.45,1.51.64.19.07.43.07.63.03.35-.05.63,0,.95.19.45.27.96.43,1.45.64.36.15.75.25.94.66.04.08.14.17.22.18.69.11.93.75,1.4,1.13.52.42.65,1.08.96,1.63.25.44.52.89.88,1.25.45.45.59,1.02.74,1.59.08.3.19.63,0,.98-.06.1.1.35.2.5.07.11.2.17.3.27.22.23.35.61.78.5.48.42,1.09.67,1.49,1.22.48.66.72,1.4.79,2.18.05.58-.08,1.18-.21,1.76-.13.56-.19,1.03.35,1.42.27.2.37.62.81.6.18.48.8.75.54,1.45-.15.41-.17.87-.37,1.28-.32.64-.08,1.33-.13,2,0,.08.12.19.2.24.66.44,1.03,1.06,1.2,1.83.1.44.22.88.33,1.32.2.79.25,1.58-.06,2.37-.03.09-.02.19-.03.29-.04.43-.27.74-.66.91-.22.1-.44.19-.65.3-.16.09-.3.24-.46.33-.32.17-.56.54-1.05.29-.3-.15-.69-.11-1.04-.13-.23-.02-.5.14-.62-.21-.01-.03-.2-.05-.27-.01-.46.25-.93.5-1.37.78-.11.07-.12.28-.2.42-.17.28-.29.63-.73.58-.02,0-.05-.01-.06,0-.53.66-1.4.44-2.05.8-.19.11-.46.09-.69.12-.28.04-.36-.17-.49-.35-.06-.08-.23-.08-.35-.11,0,.1-.03.2-.02.29,0,.08.01.18.06.22.42.4.31.91.28,1.4-.01.18,0,.35,0,.53,0,.42,0,.81-.23,1.21-.3.52-.15.78.38,1.07.77.42,1.61.67,2.45.88,1.78.45,3.46,1.14,5.16,1.8.18.07.38.14.57.14.12,0,.32-.12.35-.22.13-.58.48-1.06.7-1.6.14-.35.16-.35-.2-.35-1.29,0-2.59.02-3.88,0-.79-.02-1.52-.31-2.26-.56,0-.04.01-.09.02-.13.58,0,1.16,0,1.74,0,1.45,0,2.9,0,4.35.01.64,0,.78-.09,1-.68.34-.9.34-.9-.62-.94-.86-.03-1.72-.07-2.58-.07-1.43,0-2.85.05-4.28.07-.51,0-1.02-.03-1.53-.05-.24,0-.17-.19-.16-.3.02-.15-.12-.39.19-.4.48-.01.95-.03,1.43-.03,2.16,0,4.33.02,6.49.04.46,0,.91,0,1.37,0,.12,0,.26-.04.36-.11.14-.11.36-1.18.27-1.33-.05-.09-.2-.18-.31-.18-.57-.02-1.15-.02-1.73-.02-1.67,0-3.34.03-5.01.03-.18,0-.37-.08-.55-.12.11-.13.21-.27.32-.4.22-.27.53-.24.82-.24.86,0,1.73.08,2.59.06,1.27-.02,2.55-.02,3.82.01.19,0,.31-.06.44-.23.23-.31.26-.66.29-1.01,0-.07-.11-.22-.19-.23-.21-.04-.42-.04-.64-.05-.45-.01-.91,0-1.36-.02-.06,0-.12-.07-.18-.11.05-.06.08-.17.14-.18.56-.13,1.02-.51,1.67-.43.87.1.84.05.85-.83,0-.06-.02-.12-.01-.18.05-.35-.07-.51-.45-.47-.1.01-.36.14-.3-.18.04-.2-.05-.43.3-.47.76-.1.76-.12.73-.9,0-.08-.02-.16-.02-.24-.02-.45-.02-.45-.49-.47-.11,0-.31,0-.32-.05-.05-.17-.04-.35-.03-.53,0-.04.11-.09.18-.1.12-.01.24.01.36,0,.45-.03.46-.05.44-.48-.01-.2,0-.4,0-.59.05-.51.06-.51-.48-.52-.22,0-.44.01-.66,0-.11,0-.25-.06-.3-.13-.08-.13-.1-.29-.15-.44.14-.04.28-.11.42-.12.3-.02.59,0,.89,0,.27.01.35-.11.31-.37-.04-.27-.09-.55-.08-.82.02-.32-.09-.43-.4-.42-.72,0-1.43.01-2.15,0-.32,0-.44-.28-.25-.53.06-.08.2-.12.3-.12.39-.02.79-.01,1.18-.01.3,0,.6,0,.89,0,.16,0,.28-.04.26-.23-.05-.45-.1-.9-.17-1.35-.01-.08-.15-.18-.23-.19-.39-.02-.78-.01-1.18,0-.44,0-.44-.02-.41-.44.01-.19.09-.24.25-.25.36-.01.71-.02,1.07-.04.41-.03.42-.05.35-.45q-.19-.99-1.21-1c-.3,0-.6.01-.89,0-.13,0-.28-.04-.38-.12-.13-.11-.22-.27-.33-.41.16-.04.32-.12.48-.12.5-.02.99,0,1.49,0,.53,0,.68-.2.55-.7-.04-.15-.14-.29-.17-.44-.06-.39-.31-.46-.64-.46-.63,0-1.26,0-1.9,0-.13,0-.35.08-.34-.19,0-.23.04-.45.34-.46.54-.01,1.07-.02,1.61-.03.56-.01.59-.06.44-.57-.03-.11-.07-.22-.1-.34-.17-.6-.27-.64-.9-.61-.43.02-.87-.04-1.3-.07-.33-.02-.15-.31-.22-.47,0-.02.18-.17.28-.18.46-.02.91-.01,1.37-.01.21,0,.3-.12.22-.3-.18-.41-.38-.82-.6-1.21-.04-.08-.25-.08-.38-.08-.6,0-1.19-.01-1.79,0-.31,0-.58,0-.79-.29-.09-.13-.28-.19-.47-.32.09-.04.15-.08.22-.08.79,0,1.59.02,2.38.03.52,0,.61-.1.46-.59-.06-.19-.16-.36-.25-.54-.14-.28-.35-.38-.67-.38-.97.02-1.94,0-2.91,0-.24,0-.49.01-.61-.26-.04-.1-.08-.21-.12-.31.1-.03.21-.09.31-.1.7,0,1.41,0,2.11,0,.39,0,.79,0,1.21,0-.1-.66-.56-1.03-.9-1.48-.07-.09-.29-.1-.44-.1-.84,0-1.67,0-2.51,0-.22,0-.36-.04-.45-.28-.15-.39-.14-.41.29-.4.81,0,1.61,0,2.57,0-.5-.61-.9-1.11-1.33-1.59-.09-.09-.29-.11-.44-.12-.62-.02-1.24-.07-1.85-.01-.57.06-.95-.15-1.29-.62.45-.14.9-.05,1.33-.07.43-.02.85,0,1.33-.11-.22-.22-.46-.41-.65-.65-.6-.8-1.41-.9-2.33-.82-.63.06-1.27.02-1.91,0-.17,0-.35-.04-.51-.11-.34-.14-.68-.32-1.02-.53.36-.07.74-.05,1.11-.05.4,0,.8,0,1.19,0h1.23c-.05-.1-.07-.17-.11-.19-.78-.41-1.56-.84-2.36-1.22-.24-.11-.54-.15-.81-.15-1.21-.02-2.43-.05-3.64,0-.89.05-1.67-.2-2.42-.68h4.3c-1.05-.51-2.14-.77-3.27-.91-1.77-.21-3.55-.3-5.34-.21-.62.03-1.27.02-1.84.37-.08.05-.19.07-.29.06-.59,0-1.11.26-1.67.39-.12.03-.23.11-.33.25h3.88c-.58.22-1.1.43-1.63.62-.16.06-.35.08-.52.08-1.15,0-2.3-.02-3.45-.02-.18,0-.37,0-.53.07-.44.17-.88.35-1.31.57-.52.27-1.02.57-1.52.95h3.98c-.49.56-1.09.72-1.76.71-1.01-.02-2.03-.03-3.04-.02-.19,0-.43.03-.56.14-.47.42-.91.89-1.36,1.34l.06.12h2.42c.18,0,.36-.02.54,0,.17.02.43.03.49.13.09.14-.31.51-.54.52-.49.01-.99,0-1.48,0-.56,0-1.12.05-1.67-.01-.63-.08-1.01.29-1.37.67-.23.24-.4.54-.6.81-.15.19-.1.29.13.29.54,0,1.07,0,1.61,0,.77,0,1.55-.03,2.32-.03.38,0,.46.13.38.47-.05.22-.2.21-.36.21-1.09,0-2.19,0-3.28-.01-.24,0-.48,0-.71-.01-.5-.05-.87.06-1.03.62-.06.21-.31.36-.45.54-.08.1-.13.23-.19.35.13.03.25.08.38.08,1.29,0,2.58,0,3.88,0,.15,0,.3,0,.46.05-.48.35-.93.67-1.58.63-1.09-.07-2.18-.06-3.27-.07-.1,0-.24.11-.31.21-.17.26-.33.54-.47.82-.27.54-.25.55.32.55.83,0,1.67,0,2.5,0,.17,0,.44-.14.47.19.02.28-.21.46-.54.46-.89,0-1.79,0-2.68,0-.6,0-.6,0-.84.57-.44,1.05-.44,1.07.69,1.09.77.02,1.54-.04,2.32-.05.4,0,.52.18.31.5-.06.1-.26.14-.4.14-.93.01-1.87.04-2.8,0-.5-.03-.78.16-.98.57-.06.12-.11.25-.14.38-.19.66-.19.66.46.66,1.03,0,2.06-.02,3.1-.03.45,0,.46.01.63.65-.15.01-.3.03-.44.03-1.21,0-2.42.01-3.64,0-.35,0-.5.09-.55.44-.03.24-.2.47-.25.71-.09.41-.05.46.36.46.76,0,1.51-.03,2.26-.03.27,0,.54.04.84.07-.26.49-.59.66-1.09.64-.75-.04-1.51,0-2.26-.02-.28,0-.39.11-.44.36-.2,1.01-.11,1.12.91,1.13.38,0,.76,0,1.13,0,.22,0,.32.07.31.31,0,.25-.07.35-.34.35-.62-.01-1.23,0-1.85,0-.23,0-.38.04-.39.32,0,.41-.03.82-.06,1.23-.01.22.11.27.3.26.63-.03,1.25-.06,1.88-.07.29,0,.59.05.89.08.28.02.27.25.29.44.02.25-.18.22-.33.22-.89,0-1.79,0-2.69,0-.45,0-.47.03-.49.46,0,.08.01.16.01.24,0,.29-.12.65.01.83.1.14.52.07.79.07.46,0,.91,0,1.37,0,.23,0,.26.07.16.28-.14.3-.33.38-.66.36-.5-.03-1.01,0-1.52.02-.22,0-.26.14-.25.32.04.35.09.71.11,1.06.01.22.14.26.31.26.3,0,.6,0,.89,0,.26.01.46.33.37.55-.03.06-.15.1-.24.1-.34.01-.68.01-1.01,0-.22,0-.34.07-.32.31.02.3.02.59.07.89.04.27.19.4.49.39.47-.02.95,0,1.43.02.15,0,.42-.08.38.22-.02.21-.09.43-.39.43-.5,0-.99.02-1.49,0-.29,0-.41.07-.31.38.05.15.02.32.07.47.07.2.14.44.29.57.11.1.35.07.53.08.38,0,.76,0,1.13,0,.18,0,.37.01.52.09.26.13.48.31.72.48-.23.28-.52.06-.77.08-.5.04-.99,0-1.49.02-.25,0-.49.01-.39.4.04.16-.05.35-.04.52.05.53.17.65.71.65,1.09,0,2.17-.04,3.26-.04,1.15,0,2.29.03,3.44.05.2,0,.39.05.59.09.3.06.3.07.54.51-.7,0-1.36,0-2.01,0-1.13.01-2.26.05-3.39.05-.77,0-1.54-.04-2.32-.07-.22,0-.35.06-.28.31.09.36.19.73.25,1.1.04.26.18.3.41.3,1.65,0,3.3,0,4.94,0,2.39,0,4.78,0,7.17,0,.29,0,.37.11.39.38.01.22-.07.28-.26.28-.72,0-1.43,0-2.15,0-1.94,0-3.89,0-5.83,0-.87,0-1.73.06-2.6.07-.45,0-.91-.05-1.36-.08-.25-.02-.3.09-.27.32.06.46.27.86.53,1.24.06.09.23.13.36.14.37.02.75.03,1.13.02,1.07,0,2.14-.01,3.22-.02,1.65,0,3.29,0,4.94,0,.03,0,.06.04.12.08-.08.05-.14.1-.2.11-1.02.23-2.02.53-3.1.5-1.77-.04-3.53-.02-5.3-.02-.22,0-.44,0-.65.02-.06,0-.16.13-.15.17.1.36.32.84.46,1.19.1.27,10.65-1.07,11.06-1.06.4,0,.55.12.52.53-.09,1.31.24,2.55.74,3.73.29.68.78,1.27,1.19,1.89.03.05.12.08.19.09,1.24.23,11.48,1.8,12.5,1.88.65.05,1.29.18,1.94.26.23.03,0,2.66,0,2.66-.14.46-.55.6-.73.67-.88.39-1.78.64-2.69.92-.47.14-.88.41-1.39.45-.9.08-1.79.3-2.69.37-.73.05-1.46.25-2.2,0-.23-.08-.51-.04-.77-.03-.32,0-1.39-.04-1.45-.04-.2-.02-.39-.04-.59-.08-.55-.12-1.11-.25-1.66-.37-.15-.04-.3-.09-.46-.12-.37-.06-.75-.08-1.06-.34-.06-.05-.15-.05-.23-.07-1.32-.3-2.55-.87-3.75-1.45-1.08-.53-2.13-1.13-3.11-1.83-1.04-.74-2.01-1.59-2.79-2.63-.51-.68-1.08-1.31-1.59-1.99-.64-.86-1.26-1.72-1.69-2.71-.33-.76-.73-1.49-1.04-2.25-.26-.65-.44-1.33-.66-2-.2-.63-.42-1.26-.61-1.9-.08-.28-.12-.57-.17-.85-.01-.08,0-.16-.03-.24-.62-1.81-.74-3.71-1.04-5.59-.02-.12-.02-.24-.02-.36,0-1.25-.03-2.5,0-3.75.05-1.87.16-3.74.54-5.58.14-.7.21-1.42.45-2.09.39-1.08.54-2.22.96-3.28.34-.86.71-1.72,1.09-2.56.36-.8.7-1.62,1.14-2.37.58-.99,1.24-1.94,1.91-2.88.27-.38.66-.67,1-1,.46-.45.91-.93,1.39-1.36.64-.57,1.29-1.15,1.99-1.66.62-.45,1.28-.85,1.95-1.21,1.22-.64,2.46-1.24,3.81-1.57.73-.18,1.44-.43,2.17-.62.32-.08.66-.12.99-.16,1.07-.11,2.14-.28,3.22-.31,1.06-.03,2.12.05,3.18.16.62.06,1.23.26,1.83.42.76.19,1.52.38,2.27.62.49.15.96.37,1.43.57.54.23,1.1.44,1.62.72.9.48,1.78,1.01,2.66,1.51.19.11.39.21.56.33.22.16.43.33.63.51.38.34.75.7,1.12,1.04.68.63,1.32,1.28,1.78,2.1.17.3.46.54.68.82.85,1.05,1.56,2.19,2.1,3.43.26.6.59,1.17.82,1.77.25.66.41,1.34.63,2.01.2.62.42,1.23.61,1.85.09.28.12.57.17.86.02.1.02.2.05.29.54,1.6.72,3.28.92,4.94.1.86.09,1.74.11,2.61.02.69.03,1.38,0,2.07-.07,1.87-.16,3.75-.55,5.59-.15.7-.21,1.42-.44,2.09-.51,1.47-.74,3.02-1.46,4.42-.46.91-.8,1.88-1.24,2.8-.28.57-.65,1.1-.97,1.65-.18.31-.35.61-.51.93-.31.61-.85,1.04-1.3,1.53-.4.43-.78.89-1.21,1.3-.31.3-.67.55-1,.82-.21.17-.44.34-.64.53-.79.78-1.7,1.39-2.64,1.97-.13.08-.35.08-.5.04-.06-.02-.08-.26-.08-.4.01-.53.04-1.06.07-1.6.02-.42-.13-.64-.52-.71-.74-.13-1.48-.24-2.22-.34-.23-.03-.35-.07-.21-.32.05-.08.08-.2.06-.28-.22-.7-.11-1.34.28-1.96.1-.16.13-.38.14-.57.06-.72.24-1.38.6-2.02.27-.48.37-1.06.45-1.64-.09.12-.18.24-.26.37-.28.47-.56.96-.84,1.43-.05.09-.18.21-.25.2-.4-.06-.52.21-.65.48-.05.1-.13.2-.21.28-.03.03-.14.04-.16.03-.03-.06-.05-.13-.05-.2,0-.03.04-.07.06-.1.33-.42.7-.83,1-1.27.41-.6.77-1.23,1.15-1.85.03-.05.05-.12.04-.17-.02-.07-.06-.15-.11-.18-.04-.02-.16.05-.17.09-.15.77-.87,1.2-1.12,1.92-.09.25-.41.41-.63.61ZM26.57,58.52c1.27.1,2.33-.29,3.42-.49.75-.14,1.4-.65,2.2-.59.04,0,.08-.02.11-.03,1.02-.42,2.04-.84,3.05-1.26.27-.11.56-.21.82-.34.26-.12.54-.25.77-.43.82-.64,1.72-1.14,2.53-1.79.53-.42,1.05-.82,1.48-1.35.26-.32.63-.57.82-.93.18-.35.43-.6.7-.85.19-.18.37-.36.52-.57.42-.54.8-1.12,1.24-1.64.69-.81,1.05-1.8,1.51-2.72.48-.97.92-1.96,1.31-2.96.36-.91.64-1.86.93-2.8.16-.51.29-1.03.42-1.55.16-.65.31-1.31.42-1.97.11-.65.19-1.31.16-1.98-.02-.46.21-.92.24-1.39.07-1.04.08-2.09.11-3.14.01-.33.05-.66.03-.99-.04-.69-.12-1.38-.18-2.07-.1-1.11-.16-2.21-.3-3.31-.14-1.11-.4-2.19-.73-3.27-.39-1.25-.76-2.51-1.23-3.74-.28-.74-.65-1.44-.93-2.18-.53-1.41-1.43-2.6-2.34-3.75-.53-.66-.91-1.42-1.52-2.02-.24-.23-.45-.49-.67-.74-.08-.09-.17-.16-.25-.24-.47-.47-.9-1-1.42-1.42-.65-.52-1.35-.98-2.06-1.41-.92-.57-1.87-1.09-2.8-1.63-.08-.05-.18-.08-.27-.11-.44-.15-.89-.25-1.31-.44-1.23-.56-2.49-.97-3.84-1.09-.24-.02-.47-.17-.72-.2-.86-.09-1.73-.19-2.59-.22-1.12-.04-2.25-.08-3.36,0-.88.07-1.74.33-2.6.55-.68.17-1.3.57-2.04.55-.11,0-.21.09-.32.14-.55.22-1.1.43-1.65.65-.87.36-1.78.67-2.6,1.11-.72.39-1.35.94-2.02,1.42-.3.22-.62.43-.91.66-.32.26-.65.52-.93.81-.41.42-.85.84-1.17,1.33-.2.3-.4.57-.67.81-.19.17-.37.36-.53.56-.43.55-.82,1.14-1.28,1.68-.67.79-.99,1.78-1.49,2.66-.54.96-.84,2.03-1.31,3.02-.42.88-.64,1.85-.93,2.79-.15.49-.26,1-.41,1.49-.28.99-.53,1.99-.55,3.03,0,.21-.08.42-.1.63-.02.33.06.68-.04.98-.19.58-.15,1.17-.18,1.75-.03.57.03,1.16-.04,1.73-.11.91-.01,1.81.04,2.7.07,1.19.21,2.37.35,3.55.09.75.2,1.49.35,2.23.13.65.31,1.29.49,1.93.12.45.27.9.42,1.35.15.44.36.87.48,1.32.36,1.35.97,2.6,1.63,3.81.5.93,1.08,1.85,1.76,2.66.51.6.89,1.29,1.4,1.88.37.43.71.87,1.14,1.26.69.64,1.31,1.37,2.11,1.89.58.38,1.14.79,1.72,1.17.35.23.7.44,1.07.64.44.25.89.48,1.34.72.14.07.28.15.43.19.39.13.79.2,1.16.37,1.15.54,2.33.97,3.6,1.09.37.04.72.18,1.08.23.52.08,1.05.13,1.58.18.69.06,1.38.15,2.07.16.47,0,.95-.09,1.28-.12ZM23.11,0c1.57.03,3.06.03,4.55.1.5.02.99.24,1.49.31,1.04.15,2.06.34,3.07.62.72.2,1.42.46,2.12.73.72.29,1.47.56,2.12.97.46.29.94.48,1.4.74.17.09,2.18,1.43,2.65,1.93.86.94,1.84,1.79,2.67,2.76.69.82,1.25,1.75,1.85,2.64.42.63.85,1.25,1.23,1.9.43.75.92,1.47,1.14,2.33.07.26.24.49.39.73.3.49.38,1.06.52,1.6.19.7.5,1.36.68,2.07.24.9.42,1.82.73,2.7.06.16.02.35.04.53.12.96.29,1.91.27,2.9-.02.67.2,1.35.29,2.03.04.32.05.65.05.97,0,.83.01,1.65-.01,2.48-.01.37-.12.74-.15,1.11-.08.82-.14,1.64-.21,2.46-.01.17.02.35-.01.52-.31,1.53-.62,3.07-.95,4.6-.07.34-.23.65-.35.98-.03.07-.09.14-.09.21.03.64-.4,1.13-.56,1.7-.09.3-.19.6-.27.9-.15.56-.47,1.03-.72,1.54-.31.62-.58,1.25-.88,1.86-.6,1.23-1.42,2.32-2.29,3.37-.47.58-.9,1.18-1.36,1.76-.4.5-.84.97-1.39,1.31-.05.03-.13.04-.15.08-.42.72-1.17,1.08-1.78,1.59-.59.49-1.19.92-1.93,1.17-.46.16-.86.47-1.29.7-.12.07-.23.14-.36.18-.75.23-1.46.53-2.15.9-.17.09-.38.11-.56.16-.34.11-.66.24-1.01.33-.83.22-1.66.42-2.5.63-.37.09-.75.19-1.13.22-.82.06-1.64.08-2.46.11-.4.01-.79.02-1.19,0-.63-.02-1.27-.04-1.9-.09-.33-.03-.65-.12-.98-.19-1.61-.35-3.26-.53-4.81-1.14-.85-.33-1.72-.59-2.5-1.1-.54-.35-1.16-.55-1.73-.84-.21-.11-.38-.28-.55-.44-.16-.17-.27-.4-.57-.35-.03,0-.09-.01-.11-.04-.55-.71-1.52-.9-2.02-1.69-.22-.36-.62-.61-.94-.9-.66-.58-1.18-1.27-1.71-1.95-.74-.94-1.41-1.93-2.02-2.97-.42-.72-.88-1.43-1.31-2.14-.06-.1-.09-.22-.14-.33-.22-.5-.41-1.02-.68-1.5-.35-.63-.41-1.33-.64-1.99-.27-.75-.54-1.51-.8-2.27-.04-.11-.04-.23-.06-.35-.03-.21-.03-.43-.1-.63-.27-.72-.44-1.46-.42-2.23,0-.06.02-.13,0-.18-.33-.5-.16-1.08-.23-1.62-.09-.68-.1-1.37-.14-2.05,0-.06.02-.14,0-.18-.32-.42-.13-.91-.18-1.36-.09-.84-.04-1.69-.02-2.54.01-.39.11-.78.14-1.17.12-1.31.21-2.61.37-3.92.07-.58.26-1.15.39-1.72.08-.36.15-.73.26-1.08.17-.6.35-1.19.54-1.78.02-.06.06-.1.07-.16.19-1.17.79-2.19,1.08-3.33.07-.29.34-.52.46-.81.45-1.1.97-2.16,1.6-3.16.46-.73,1.03-1.39,1.56-2.08.46-.61.91-1.22,1.4-1.81.35-.41.75-.78,1.14-1.15.43-.39.87-.77,1.32-1.14.34-.28.73-.52,1.04-.83.47-.47,1.05-.72,1.64-.98.47-.2.9-.48,1.35-.72.2-.11.43-.18.64-.27.63-.28,1.25-.57,1.88-.83.27-.11.56-.15.84-.23.96-.29,1.91-.64,2.88-.87.83-.2,1.7-.27,2.47-.39Z\"/>\n  </g>\n</svg>",
    10: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50.33 59.47\">\n  <g>\n    <path class=\"cls-1\" d=\"M23.45,6.43s0,.1,0,.15c.37,0,.73,0,1.1,0,.2,0,.35-.06.3-.31-.04-.22-.2-.23-.36-.18-.35.11-.7.23-1.05.34ZM28.75,6.4c-.09.08-.23.15-.28.26-.03.06.09.21.18.28.09.07.21.12.32.15.32.09.66.14.98.23.6.19,1.19.4,1.79.6.55.19,1.12.34,1.65.57.63.27,1.23.62,1.85.93.07.03.17,0,.26-.01-.02-.09-.01-.21-.06-.27-.07-.09-.19-.14-.29-.2-1.28-.84-2.63-1.54-4.13-1.91-.73-.18-1.45-.4-2.25-.63ZM14.45,13.01c.04.13.07.17.06.19-.02.04-.07.06-.11.09-.01-.03-.04-.06-.04-.09,0-.05.04-.1.08-.19ZM13.97,15.48s.02.07.02.08c-.07.14-.13.28-.21.41,0,.01-.13-.02-.13-.03-.02-.15-.03-.3-.01-.45,0-.07.08-.13.12-.2.04-.06.09-.12.14-.18.02.07.04.14.06.22.01.06.02.12.02.15ZM14.85,15.44c-.07.27-.13.55-.21.82-.01.04-.08.07-.12.11-.03-.06-.09-.13-.07-.18.08-.27.18-.53.28-.79.04.01.08.03.12.04ZM13.41,16.98s.03.01.05.02c-.08.53-.17,1.05-.24,1.58,0,.07.07.23.1.23.11,0,.26-.03.31-.1.08-.13.09-.3.13-.45.07-.27.1-.55.21-.8.21-.49.4-.49.74-.05.04.06.11.1.16.15.05-.08.12-.15.14-.23.08-.36.31-.53.66-.58.14-.02.27-.07.4-.11.57-.17.67-.12.87.45.17.48.47.69.95.59.28-.06.48-.04.69.15.08.07.36.06.41-.01.36-.51.98-.67,1.42-1.05.29-.25.61-.32.94-.24.27.07.69-.01.75.34.03.17-.26.4-.4.6-.1.16-.19.32-.28.48.19.07.39.16.59.2.12.02.28-.02.4-.09.59-.34,1.28-.52,1.72-1.12.17-.24.48-.4.75-.54.38-.2.75-.37.75-.89,0-.07.04-.18.09-.21.46-.31.5-.83.66-1.28.11-.32.16-.72.39-.94.84-.82,1.01-2.02,1.74-2.88.01-.01.02-.04.02-.06,0-.09,0-.19,0-.28-.1.04-.23.04-.29.11-.38.48-.75.97-1.13,1.46-.11.14-.22.32-.37.38-.64.26-1.01.78-1.42,1.28-.04.05-.12.08-.18.11-.02-.07-.08-.14-.07-.21.05-.47.11-.94.16-1.4.01-.1-.03-.21-.04-.32-.08.05-.21.08-.23.15-.13.33-.46.35-.71.49-.23.13-.29.03-.33-.2-.08-.5-.16-.57-.59-.54-.39.03-.77.13-1.15.23-.09.02-.19.19-.2.29-.03.32-.22.46-.5.5-.43.06-.77.2-1.03.6-.19.29-.56.29-.92.2-.35-.09-.33-.34-.36-.59-.07-.56-.23-.66-.73-.45-.16.07-.34.17-.42.31-.2.32-.5.42-.83.53-.24.08-.33.09-.43-.18-.09-.25-.22-.24-.36,0-.07.12-.1.26-.16.38-.28.53-.56,1.05-.84,1.58-.04-.02-.09-.05-.13-.07.6-2,1.71-3.76,2.68-5.6-.38.32-.7.69-.99,1.08-.32.43-.64.86-.89,1.33-.27.49-.88.56-1.16,1.03,0-.13.06-.22.08-.32.02-.13,0-.26-.01-.39-.11.05-.27.08-.34.17-.25.33-.48.68-.69,1.04-.21.35-.38.72-.56,1.08-.07-.14-.09-.25-.04-.35.31-.66.58-1.34.95-1.97s.75-1.25,1.28-1.77c.47-.46.75-1.11,1.36-1.45.07-.04.09-.28.05-.4-.07-.22-.21-.1-.32-.02-.23.15-.47.3-.69.47-.68.54-1.38,1.03-1.95,1.71-.54.65-.86,1.46-1.54,1.99-.05.04-.11.14-.09.21.1.57-.25.98-.51,1.4-.31.51-.34,1.08-.45,1.63-.03.14.06.3.09.46.06.22.17.26.32.09.22-.25.42-.53.65-.77.12-.13.26-.23.41-.31.16-.09.31-.09.29.17-.02.33-.04.66-.06.99-.02.4-.04.79-.05,1.19,0,.04.06.12.1.12.04,0,.11-.04.14-.08.04-.06.05-.14.07-.21ZM21.55,20.48q.5.09,1.09-.1c.18-.06.32-.14.54.02.47.34.6.27,1.1-.08.46-.33.99-.57,1.48-.85.15-.09.36-.14.45-.27.53-.78,1.47-1.11,2.02-1.89.36-.52.9-.93,1.35-1.39.08-.08.14-.19.21-.29.34-.47.67-.94,1.01-1.4.32-.43.74-.81.94-1.29.55-1.26.72-1.16-.45-2.01-.28-.2-.62-.33-.93-.49-.1-.06-.2-.13-.29-.2-.4-.34-.66-.32-1,.08-.32.37-.57.76-.75,1.24-.22.59-.67,1.1-1.07,1.6-.27.33-.41.67-.43,1.07-.01.21.02.42.27.46.2.04.16.15.18.3.04.36-.23.48-.45.63-.33.23-.78.29-.94.74-.02.06-.17.09-.26.11-.5.08-.61.58-.92.86-.03.03,0,.11,0,.17.06.54.06.57-.43.7-.32.08-.55.24-.66.53-.25.63-.76.98-1.31,1.31-.22.13-.43.27-.73.46ZM33.31,22.02c.22,0,.35.03.45,0,.84-.33,1.68-.68,2.51-1.03.07-.03.09-.15.14-.22-.08-.04-.17-.11-.25-.1-1.07.11-2.02.48-2.84,1.36ZM12.01,21.89c-.04-.2-.15-.38-.39-.29-.2.07-.38.19-.56.31-.1.07-.25.25-.22.29.08.14.21.3.36.36.3.12.83-.32.81-.66ZM33.81,12.64c-.11-.01-.21-.05-.23-.02-.23.26-.52.51-.66.82-.33.72-.73,1.37-1.26,1.96-.24.26-.44.56-.66.83-.31.38-.63.76-.96,1.13-.21.23-.44.43-.65.66-.42.45-.82.9-1.23,1.35-.58.63-1.34,1.09-1.72,1.91-.04.08-.13.14-.21.2-.49.43-1.02.81-1.46,1.29-.31.34-.6.67-1.06.81-.08.02-.12.14-.18.21.09.01.19.05.26.02.22-.09.44-.19.64-.32.57-.36,1.14-.71,1.7-1.1.66-.46,1.39-.85,1.75-1.64.08-.17.27-.28.42-.41.45-.38.93-.74,1.35-1.15.46-.45.89-.94,1.29-1.45.21-.27.32-.62.48-.92.18-.35.35-.7.56-1.02.25-.4.57-.76.81-1.16.31-.52.58-1.07.87-1.61.05-.1.1-.21.17-.38ZM33.29,24.28c.05-.06.07-.12.1-.12.74-.09,1.49-.19,2.24-.27.18-.02.37.04.37-.24,0-.24.01-.56-.3-.55-.67.01-1.38-.17-1.97.39-.2.19-.53.26-.82.31-.27.05-.37-.16-.22-.4.12-.19.21-.34-.01-.5-.18-.13-.34-.24-.57-.01-.17.17-.39.35-.68.2.1-.2.16-.46.32-.58.42-.33.88-.6,1.32-.89.06-.04.16-.04.22-.09.71-.65,1.6-.92,2.49-1.16.36-.1.75-.06,1.12-.1.09,0,.17-.07.25-.11-.08-.07-.16-.18-.25-.19-.37-.04-.75-.06-1.13-.08-.37-.02-.73.11-1.11-.06-.17-.08-.46.06-.67.16-.68.3-1.35.63-2.03.95-.07.03-.15.06-.23.07-.07,0-.14-.02-.21-.04.01-.05,0-.12.04-.16.07-.09.15-.19.24-.25.36-.23.74-.45,1.1-.69.31-.2.48-.53.83-.72,1.2-.65,2.44-.83,3.76-.53.16.04.34-.02.51-.06.33-.07.46.02.39.35-.04.2-.16.4-.28.57-.09.14-.36.24-.35.34.01.33.12.65.2.97,0,.03.05.06.08.09.15.19.15.37-.07.5-.61.38-.8,1-.92,1.66-.02.11-.06.28-.13.32-.44.19-.38.59-.44.95-.02.11-.12.21-.19.32-.09-.09-.21-.16-.25-.27-.11-.31-.28-.31-.55-.2-.6.24-1.23.29-1.86.21-.11-.01-.21-.07-.33-.1ZM15.38,24.22c-.06,0-.12,0-.18,0-.62-.01-.65.02-.64.66,0,.06,0,.12-.02.17-.17.29.05.45.25.49.6.13,1.13.61,1.8.34.13-.05.29-.06.43-.09-.05-.14-.08-.3-.17-.42-.09-.13-.21-.24-.34-.32-.2-.11-.35-.21-.31-.5.03-.23-.17-.34-.4-.35-.14,0-.28.01-.42.02ZM21.29,24.72c-.01.73.09,1.44.38,2.11.02.06.11.09.17.14.02-.08.09-.17.07-.23-.2-.67-.41-1.34-.61-2.01ZM15.88,26.87c-.07-.06-.12-.12-.13-.11-.08.05-.15.1-.21.17-.02.02.03.09.04.13.09-.05.18-.11.3-.18ZM22.1,27.24s-.51,0-.3.2l.54.78s.04-.02.04-.03c-.07-.18-.21-.77-.27-.95ZM38.07,26.79c-.05.05-.1.1-.16.14-.37.3-.51.67-.35,1.15.03.1-.04.23-.06.35-.13-.05-.3-.07-.38-.16-.09-.11-.16-.3-.13-.43.15-.5.42-.93.91-1.17.03-.02.08-.02.11,0,.03.01.03.06.06.12ZM24.56,29.93c-.59-.45-1.15-.87-1.71-1.28-.06-.04-.18-.01-.27-.02,0,.09-.02.19,0,.28.26.71,1.02,1.11,1.97,1.02ZM23.26,30.07c-.2-.18-.4-.37-.6-.54-.05-.04-.14-.03-.21-.05,0,.09-.02.2.02.26.17.25.42.39.79.32ZM6.31,30.75c.13-.16.27-.3.37-.47.25-.45.43-.94.72-1.36.61-.87,1.26-1.72,1.91-2.56.6-.76,1.22-1.5,2.04-2.06.34-.23.68-.49.99-.95-1.67.85-2.76,2.17-3.93,3.41.13-.33.26-.65.46-.92.35-.44.73-.86,1.14-1.26.25-.24.56-.41.84-.63.06-.05.08-.15.12-.22-.09,0-.21-.03-.28.02-.41.28-.81.56-1.2.86-.33.25-.72.46-.95.78-.48.69-.88,1.45-1.3,2.18-.08.13-.15.32-.11.45.14.46-.07.8-.27,1.17-.17.31-.33.64-.46.97-.07.18-.07.39-.1.59,0,0-.01.01-.02.02v.03c-.43.45-.44,1.02-.46,1.6.15-.53.3-1.06.45-1.6,0,0,.01-.02.02-.02,0-.01,0-.02,0-.03ZM8.78,32.73c.02.08,0,.17.05.23.23.3.27.65.33,1,.03.15.23.35.38.39.15.03.38-.07.51-.19.16-.14.32-.33.37-.53.13-.53.26-1.05.62-1.49.14-.18.18-.43.3-.63.24-.43.6-.83.71-1.29.28-1.17,1.45-1.46,2.08-2.27.03-.04.15-.01.23-.04.5-.17.61-.4.46-.91-.03-.09-.05-.2-.03-.29.04-.29-.11-.44-.33-.57-.29-.17-.59-.33-.87-.51-.4-.26-.36.05-.84.13-.88.14-3.91,5.4-3.95,6.98ZM7.87,35.68c-.24.19-.38.33-.46.53-.07.2-.08.45-.05.85.18-.5.32-.89.5-1.38ZM25.37,40.49c-.77-.02-1.28-.46-1.72-1.01-.02-.03-.02-.13,0-.15.04-.03.11-.02.16,0,.5.16,1,.34,1.51.49.21.06.43.06.64.12.1.03.17.14.26.21-.09.09-.17.22-.28.25-.18.06-.38.07-.57.1ZM9.96,41.33c.06.08.13.18.2.28.06-.1.15-.19.18-.29.07-.24.11-.49.16-.74.04-.19.07-.38.09-.58,0-.05-.05-.1-.08-.14-.06.03-.16.06-.17.1-.13.43-.25.87-.38,1.37ZM8.52,41.85c-.05.03-.1.06-.15.08.18.37.32.75.55,1.09.39.59.76,1.22,1.28,1.69.71.65,1.63.97,2.6,1,1.17.04,2.33-.09,3.47-.35.11-.03.24-.06.32-.13.09-.08.15-.21.21-.32-.12-.03-.25-.11-.36-.09-.31.06-.6.22-.91.25-.81.06-1.62.12-2.43.1-1.57-.03-2.79-.73-3.68-2.02-.3-.43-.6-.87-.9-1.31ZM10.91,46.06c-.24-.25-.38-.4-.53-.55-.37-.35-.78-.67-1.13-1.03-1.08-1.11-1.72-2.47-1.94-3.99-.11-.77-.02-1.57-.03-2.36,0-.09-.08-.19-.12-.28-.05.08-.12.15-.14.23-.45,1.76-.26,3.44.64,5.03.69,1.21,1.71,2.1,2.86,2.86.07.05.18.04.4.09ZM32.54,42.02c.02.27.03,1.64.51,2.87.17.43,2.54,4.28,2.99,4.64.18.14.32.33.47.5.47.53.93,1.07,1.4,1.59.25.27.39.26.64,0,.73-.71,1.47-1.43,2.2-2.14.28-.27.28-.41,0-.68-.27-.25-.55-.49-.85-.71-.46-.33-.97-.61-1.41-.95-.64-.49-1.24-1.03-1.87-1.54-.31-.25-.67-.43-.96-.69-1.02-.93-2.01-1.87-3.11-2.9ZM6.56,23.59s-.09-.08-.13-.12c.34-.57.57-1.25,1.04-1.68.58-.53,1.29-.99,2.18-.97.3,0,.61-.15.9-.27.08-.03.1-.19.15-.29-.08-.04-.17-.07-.25-.11-.16-.08-.45-.13-.47-.23-.1-.58-.18-1.17-.18-1.76,0-.49.06-1,.21-1.46.25-.74.18-1.6.79-2.2.03-.03.03-.11.04-.17.07-.51.26-.96.48-1.42.29-.6.79-1.09.87-1.79.03-.24.2-.46.3-.68.55-1.24,4-4.01,4.42-4.02.18,0,.3-.19.45-.29.21-.14.4-.32.62-.41.64-.28,1.28-.59,1.95-.76.66-.17,1.37-.2,2.06-.25,1.5-.11,3.01-.23,4.49.13,1.54.37,3.07.77,4.61,1.12,1.6.37,3.03,1.12,4.46,1.91.16.09.31.18.44.31.39.39.77.79,1.14,1.19.16.17.33.34.46.54.72,1.03,1.2,2.18,1.56,3.38.13.45.32.94.27,1.39-.06.64,0,1.26.03,1.88.03.73.18,1.45.29,2.17.03.2.09.44.22.58.36.37.37.35.04.68-.16.16-.5.27-.36.53.07.13.41.12.63.17.02,0,.04,0,.06,0,.11.02.21.05.32.08-.09.09-.17.19-.26.27-.04.04-.11.05-.16.08-.34.16-.48.4-.47.77,0,.12-.05.24-.08.36-.03.12-.1.25-.07.36.14.64.49,1.19.82,1.73.39.63,1.35,1.98,1.39,2.04.23.39.24.72.22,1.09-.03.6-.62.8-1.09.94-.85.26-.85.28-.55,1.16.03.08.06.15.08.23.1.58.06,1.14-.46,1.49-.25.17-.29.31-.26.57.04.36-.02.71-.31.96-.72.63-.81.86-.48,1.73.22.57-.15,1.15-.6,1.51-.42.33-.59.51-1.02.83-.49.37-1.02.6-1.64.64-.28.02-.55.05-.83.07-.78.06-1.57.21-2.32-.17-.2-.1-.26,0-.24.17.07.63.12,3.72.65,3.95.6.26,1.06.72,1.46,1.16.4.43.91.69,1.31,1.12.53.56,1.22,1.01,1.86,1.48.66.48,1.28,1.06,1.94,1.55.49.36.96.76,1.45,1.13.39.29.91.21,1.06-.25.19-.56.52-1.02.8-1.52.13-.24.06-.32-.19-.32-.57,0-1.15,0-1.72,0-.58,0-1.06-.2-1.51-.7.25-.02.42-.04.59-.04,1.01,0,2.03-.01,3.04,0,.27,0,.47-.06.59-.28.18-.33.31-.68.48-1.02.08-.16.02-.22-.13-.23-.16,0-.32,0-.48,0-1.91,0-3.82-.02-5.72.01-.47,0-.8-.19-1.12-.46-.05-.04-.06-.13-.09-.19.07-.03.13-.09.2-.09.41,0,.82-.02,1.24,0,.73.01,1.46.06,2.19.06,1.03,0,2.06-.06,3.09-.05,1.26.02,1.24.22,1.72-1.23.12-.35.1-.38-.27-.38-1.09-.02-2.18-.03-3.27-.03-2.28,0-4.56.02-6.84.02-.47,0-.68-.18-.87-.7h4.22c.92,0,1.84,0,2.77,0,1.33,0,2.66,0,4,0,.82,0,.82,0,.93-.82.01-.08.05-.15.07-.22.16-.5.07-.63-.45-.65-.37,0-.75.02-1.12.02-1.66,0-3.33-.02-4.99-.02-.25,0-.51.05-.76.05-.51,0-1.03-.04-1.54-.05-.73,0-1.46,0-2.19,0,.98-.31,1.95-.58,2.95-.68,1.1-.11,2.22-.08,3.33-.07,1.58.01,3.16.05,4.75.09.24,0,.44-.05.51-.3.1-.32.19-.64.24-.96.01-.06-.12-.19-.2-.22-.15-.04-.31-.04-.47-.04-1.37,0-2.74.01-4.11.02-.61,0-1.21,0-1.94,0,.31-.3.28-.71.76-.7,1.76.02,3.53.01,5.29,0,1.03,0,.98.09.96-.96,0-.51-.02-.52-.53-.52-1.73,0-3.46,0-5.19,0-.14,0-.28,0-.42,0-.19,0-.28-.07-.28-.29,0-.39.04-.46.43-.45,1.48,0,2.96,0,4.43.02.39,0,.79.06,1.18.05.55-.01.58-.06.61-.61.01-.25.02-.51,0-.76,0-.08-.12-.18-.2-.21-.11-.04-.24,0-.35,0-1.65,0-3.3-.01-4.94,0-.34,0-.38-.16-.4-.43-.03-.39.26-.23.4-.23,1.37-.01,2.73,0,4.1,0,.4,0,.79-.02,1.19-.02.27,0,.39-.12.38-.4-.01-.27-.01-.55.02-.82.03-.27-.07-.35-.32-.36-.95-.02-1.9-.06-2.85-.07-.67,0-1.34.04-2,.07-.34.02-.37-.17-.39-.44-.02-.32.16-.3.37-.3,1.13,0,2.26,0,3.4,0,.5,0,.99,0,1.49,0,.26,0,.34-.12.29-.37-.05-.23-.07-.47-.07-.7,0-.52.01-.53-.52-.53-1.03,0-2.07,0-3.1,0-.27,0-.49-.26-.43-.55.02-.08.27-.12.42-.15.09-.02.2.02.3.02.95,0,1.9.01,2.86.02.26,0,.37-.11.34-.36-.03-.31-.08-.62-.1-.94-.03-.34-.18-.45-.54-.44-1.23.02-2.46-.03-3.7-.01-.36,0-.54-.16-.7-.43-.12-.21-.03-.24.14-.24.48,0,.95,0,1.43,0,.97-.02,1.94-.05,2.91-.05.27,0,.29-.13.28-.32,0-.1-.06-.19-.07-.29q-.12-.84-.93-.82c-.06,0-.12,0-.18,0-1.2,0-2.4,0-3.6,0-.26,0-.51-.04-.77-.05-.33-.01-.28-.28-.31-.48,0-.03.21-.13.32-.13.47-.01.94,0,1.41,0h3.15c.06,0,.12,0,.18,0,.42-.04.56-.21.47-.63-.04-.19-.16-.37-.18-.56-.05-.35-.27-.4-.55-.4-.64,0-1.27,0-1.91,0-.44,0-.88.03-1.31,0-.56-.04-.56-.07-.66-.66.2,0,.4,0,.6,0,1.01,0,2.02-.01,3.03-.02.36,0,.43-.08.35-.43-.07-.28-.18-.56-.28-.84-.08-.24-.24-.32-.5-.31-1.21.01-2.42,0-3.63.01-.27,0-.4-.04-.41-.34-.01-.32.14-.35.4-.34,1.07.01,2.15,0,3.22,0,.65,0,.68-.06.37-.67-.02-.04-.04-.07-.05-.11-.22-.67-.65-.92-1.38-.84-.77.08-1.55.02-2.33.01-.37,0-.43-.12-.37-.48.05-.28.28-.22.41-.22.79,0,1.58.02,2.37.04.51.02.63-.11.5-.59-.04-.17-.13-.33-.21-.49-.16-.33-.4-.5-.79-.48-.57.04-1.14.05-1.7.07-.14,0-.28.01-.42.01-.36,0-.33-.31-.37-.52-.04-.27.21-.23.38-.23.55,0,1.1,0,1.65,0,.53,0,.63.07.32-.53-.04-.07-.06-.15-.11-.21-.36-.48-.72-.93-1.44-.79-.33.06-.67.02-1.01,0-.2-.01-.46-.37-.41-.56.07-.27.28-.11.44-.11.39,0,.8.06,1.21-.17-.39-.44-.78-.81-1.08-1.25-.17-.24-.35-.29-.59-.29-.33,0-.67,0-1-.02-.16,0-.64-.44-.6-.57.09-.29.35-.14.55-.15.06,0,.12.01.18,0,.1-.01.19-.04.28-.06-.04-.11-.05-.24-.13-.31-.24-.24-.55-.41-.75-.68-.38-.5-.94-.6-1.44-.52-.65.11-.9-.29-1.35-.66.24-.02.38-.02.51-.04.09-.01.17-.06.26-.09-.06-.07-.1-.17-.18-.21-.48-.27-.99-.49-1.46-.79-.58-.37-1.24-.55-1.87-.45-1.07.16-1.95-.43-2.93-.55,0-.04,0-.08,0-.12.45-.03.9-.05,1.45-.08-.54-.21-.95-.43-1.38-.52-1.8-.39-3.64-.48-5.47-.57-.71-.03-1.42.06-2.14.09-.48.02-.94.07-1.37.31-.21.12-.49.16-.74.16-.54,0-1.02.26-1.51.42-.6.2-1.14.57-1.74.74-1.14.32-2.12.94-3.17,1.44-.06.03-.12.09-.17.13.06.05.11.11.18.13.11.04.23.05.35.07-.1.09-.19.19-.3.28-.25.22-.55.29-.88.27-.21-.01-.49-.04-.63.08-.45.37-.86.8-1.26,1.22-.14.15-.11.29.14.3.1,0,.2,0,.3,0,.11.01.23.04.34.06-.05.12-.09.24-.14.36-.08.19-.24.24-.44.23-.28-.01-.56.01-.83,0-.3-.02-.54.07-.74.3-.32.38-.64.75-.95,1.13-.07.09-.11.2-.16.3.11.03.21.07.32.08.44,0,.88,0,1.36,0-.27.68-.27.66-.87.6-.37-.04-.75-.02-1.11.02-.13.01-.26.16-.35.27-.2.24-.38.5-.55.77-.1.16-.17.33-.26.5.17.02.33.04.5.05.17,0,.35,0,.52,0,.32,0,.64-.01.95,0,.07,0,.18.09.19.16.03.25-.18.48-.44.49-.34,0-.68,0-1.01,0q-1.23,0-1.73,1.14s-.03.08-.05.11c-.14.23-.07.32.19.32.67,0,1.35,0,2.02,0,.11,0,.31.11.31.14-.04.2-.02.49-.31.5-.53.03-1.06.01-1.59.02-.35,0-.78-.11-1.01.06-.25.18-.31.62-.45.95-.03.07-.04.16-.07.23-.15.3-.04.38.26.37.79-.01,1.58,0,2.37,0,.11,0,.32.1.31.15-.02.16-.07.34-.17.47-.05.06-.22.04-.34.04-.7,0-1.39,0-2.09,0-.64,0-.82.13-1.06.72-.32.8-.27.89.59.89h2.98c-.49.47-.96.69-1.54.67-.67-.02-1.34-.01-2.01,0-.14,0-.36.05-.4.15-.15.33-.24.7-.35,1.05-.09.27,0,.41.29.4.42,0,.84,0,1.25,0,.11,0,.22.02.33.02-.05.12-.08.26-.16.35-.08.09-.21.18-.33.2-.31.05-.63.09-.94.09-.75,0-.72-.05-.79.75-.01.14,0,.28,0,.42,0,.23.11.32.33.32.26,0,.53,0,.82,0-.13.4-.19.68-.64.68-.72-.01-.74.03-.77.76,0,.2,0,.39,0,.59-.02.3.09.46.41.4.16-.03.28,0,.24.2-.03.17.1.42-.22.46-.17.02-.42,0-.49.1-.1.14-.06.38-.08.57,0,.08-.03.15-.03.23-.01.2-.08.42-.01.58.04.1.3.11.46.14.31.07.2.34.25.53,0,.01-.16.1-.26.11-.51.05-.51.04-.47.55,0,.14,0,.28.02.42.02.22,0,.48.11.63.08.11.38.03.54.12.12.07.19.26.24.41.01.05-.12.19-.2.21-.18.06-.48,0-.54.12-.1.16-.03.42-.04.63,0,.08,0,.16,0,.24.04.44.17.55.64.59.12,0,.24.03.36.04.31.03.25.32.35.49-.12.06-.24.12-.37.18-.03.01-.08,0-.12,0q-.76.02-.64.76c.01.08.02.16.05.23.16.43.27.5.74.5.28,0,.56,0,.84,0,.17,0,.33.01.31.25-.01.21-.03.41-.31.41-.14,0-.28,0-.42,0-.64,0-.66,0-.69.62-.01.25.04.53.17.73.07.12.35.1.52.18.07.03.17.16.15.22-.03.14-.09.32-.19.38-.16.09-.17.16-.12.32.09.28.12.58.2.86.19.66.39,1.31.6,1.96.06.18.18.35.27.53.17.33.4.65.49,1,.17.64.21,1.32.74,1.82.09.09.13.24.19.37.19.4.34.83.59,1.2.42.61.45.6,1.21.6.16,0,.32,0,.48,0,.44,0,.88-.03,1.31.01.24.02.56.08.52.44-.04.33-.34.19-.52.2-.56.02-1.11,0-1.67.01-.09,0-.18.05-.26.08.04.08.08.17.13.24.19.28.43.53.56.84.22.51.59.65,1.1.59.27-.03.56-.03.83-.02.3.02.29.29.29.49,0,.06-.17.16-.28.18-.16.04-.33.03-.57.04.85.96,1.76,1.72,2.8,2.37-.09-.81-.83-3.49-.97-4.02-.08-.29-.13-.55-.12-.86.03-.54-.14-1.01-.73-1.23-.31-.12-.64-.17-.95-.25-.63-.17-1.21-.51-1.8-.8-.16-.08-.27-.28-.43-.31-.34-.06-.49-.3-.65-.55-.24-.38-.45-.8-.9-1-.06-.03-.1-.12-.13-.19-.22-.5-.62-.91-.68-1.47-.07-.64-.33-1.24-.33-1.91,0-1.09.29-2.11.58-3.13.1-.34.35-.63.46-.96.3-.89.47-1.83.92-2.66.09-.17-.04-.33-.23-.26-.11.04-.23.16-.27.27-.08.22-.09.47-.16.7-.04.15-.1.38-.2.41-.36.1-.53.31-.6.65,0,.04-.13.1-.17.08-.22-.09-.48-.73-.33-.85.27-.22.2-.49.21-.76.01-.2.08-.41.17-.6.28-.59.6-1.16.88-1.74.07-.15.1-.34.11-.51,0-.1-.06-.2-.1-.3-.08.06-.18.1-.22.17-.2.32-.4.64-.55.98-.24.52-.43,1.06-.66,1.59-.03.07-.13.12-.2.18-.04-.06-.09-.12-.12-.18-.03-.07-.06-.15-.06-.23-.1-1.19-.21-2.38-.31-3.56-.02-.28-.07-.56-.03-.83.09-.71.23-1.42.34-2.13.15-.99.83-1.65,1.49-2.33,0,.16-.04.31-.09.45-.06.15-.18.29-.18.44,0,.22,0,.54.13.63.21.14.5.05.69-.17.04-.04.07-.1.11-.14.35-.4.7-.81,1.05-1.21.13-.15.25-.4.4-.42.49-.08.78-.51,1.23-.66.22-.07.36-.15.13-.4-.07-.08-.07-.26-.05-.38.05-.37-.03-.51-.38-.55-.22-.02-.46.03-.64-.05-.36-.17-.6-.09-.82.21-.06.08-.14.13-.22.19-.45.32-.93.6-1.22,1.11-.05.08-.19.12-.28.18ZM24.73,55.92c.82-.03,3.02-.14,3.29-.17.61-.08,1.21-.16,1.82-.27,1.24-.21,2.49-.43,3.64-.99.55-.26,1.1-.52,1.65-.79.33-.16.35-.27.09-.51-.15-.13-.3-.26-.47-.35-.43-.24-.8-.55-1.14-.9-.09-.1-.2-.18-.32-.25-.74-.45-1.46-.9-2.27-1.24-.76-.31-1.5-.61-2.3-.79-.82-.19-1.65-.38-2.47-.55-.56-.11-1.12-.2-1.68-.29-.4-.07-.81-.16-1.21-.2-1.26-.1-2.51-.18-3.77-.28-.26-.02-.51-.09-.77-.08-1.03.03-2.04-.02-3.05-.28-.23-.06-.53-.02-.74.08-.41.2-.4.24-.54-.17-.05-.15-.1-.3-.13-.46-.05-.26-.21-.38-.46-.37-.2,0-.39.05-.59.07-.19.02-.17.12-.16.28.03,1.37.66,2.6.92,3.92.15.76.68,1.42.8,2.21.02.11.2.24.34.29.72.32,1.43.69,2.18.9,1.13.32,2.29.56,3.45.77.83.15,1.68.22,2.52.31.45.05.9.12,1.35.1ZM25.45,42.47c-.12-.03-.32,0-.41-.1-.53-.51-2.63-2.4-2.83-2.75-.48-.83-.95-1.68-1.33-2.55-.21-.48-.26-1.03-.37-1.55-.02-.11.01-.24-.03-.35-.05-.14-.14-.26-.21-.39-.1.09-.19.19-.3.27-.67.53-.56,1.31-.65,2.02-.01.1.05.23.12.32.02.03.19.03.21,0,.11-.22.21-.46.3-.69.07-.19.12-.4.18-.6.04,0,.08.02.12.03-.02.27-.02.54-.06.8-.08.45-.18.89-.28,1.33-.08.4-.17.81-.25,1.21-.02.13-.01.27-.02.41,0,.2,0,.4-.02.59-.06.53-.11,1.06-.22,1.58-.14.67-.3,1.36-.79,1.88-.32.34-.52.73-.67,1.17-.19.58-.39,1.17-.66,1.73-.04.08-.02.26.04.3.21.14.44.32.66.34.61.04,1.23,0,1.85,0,.24,0,.47.07.71.09,1.1.1,2.19.21,3.29.3.73.06,6.25,1.3,6.47,1.37,1.13.33,2.12.95,3.12,1.53.52.31.97.73,1.45,1.11.54.43,1.1.86,1.62,1.33.68.61.82.54-.08,1.09-.99.59-2.05.98-3.15,1.32-.47.15-.9.4-1.37.52-.79.19-1.56.54-2.41.47-.11,0-.22.04-.33.06-.25.04-.5.1-.75.13-.78.08-1.57.16-2.35.2-.47.03-.94.02-1.41-.02-.65-.05-1.29-.13-1.94-.21-.31-.04-3.83-.42-4.41-.62-.82-.28-1.65-.53-2.48-.79-.06-.02-.12-.04-.16-.07-.55-.48-1.22-.75-1.88-1.05-.25-.11-.47-.28-.7-.43-1.36-.85-2.64-1.81-3.67-3.05-1.16-1.4-2.36-2.77-3.22-4.38-.44-.82-.81-1.67-1.19-2.51-.28-.65-.53-1.31-.77-1.97-.11-.31-.18-.64-.27-.96-.12-.4-.24-.79-.36-1.18-.42-1.46-.73-2.94-.98-4.43-.28-1.65-.41-3.3-.34-4.97.05-1.2,0-2.41.03-3.61.02-.59.14-1.17.21-1.76.17-1.26.29-2.52.7-3.73.5-1.51.76-3.09,1.47-4.54.46-.93.82-1.91,1.26-2.85.21-.45.44-.89.77-1.3.35-.43.6-.96.87-1.46.46-.84,1.13-1.48,1.8-2.14.45-.44.88-.9,1.35-1.32.63-.56,1.27-1.12,1.94-1.62.79-.59,1.69-1,2.54-1.49,1.57-.9,3.28-1.32,4.98-1.81.77-.22,1.54-.3,2.33-.34.51-.02,1.01-.16,1.52-.2.45-.04.9-.03,1.35-.03.4,0,.79,0,1.19.04.65.05,1.29.17,1.93.19.77.02,1.45.36,2.18.52.87.2,1.73.53,2.56.87.86.35,1.66.83,2.52,1.17,1.02.4,1.85,1.14,2.84,1.59.09.04.18.09.25.16.75.72,1.52,1.44,2.24,2.19.31.32.52.74.78,1.1.16.22.34.43.52.64,1.15,1.33,1.99,2.85,2.67,4.46.36.85.7,1.7,1.03,2.56.12.31.17.64.26.96.11.38.22.75.33,1.12.61,2.08,1,4.21,1.24,6.37.07.67.09,1.34.1,2.01.02.89.05,1.79,0,2.67-.07,1.31-.11,2.63-.29,3.94-.17,1.2-.33,2.39-.66,3.56-.32,1.13-.62,2.28-1,3.39-.29.86-.68,1.68-1.06,2.51-.37.82-.67,1.69-1.18,2.42-.93,1.32-1.6,2.83-2.89,3.9-.71.58-1.33,1.29-1.98,1.94-.06.06-.11.12-.17.17-.42.34-.57.33-.95-.07-.12-.12-1.16-1.04-1.54-1.41-.53-.53-1.01-1.09-1.4-1.74-.57-.94-1.26-1.81-1.85-2.73-.32-.5-.66-1.02-.79-1.58-.11-.45-.2-.93-.29-1.37-.22-1.07-.08-2.17-.42-3.23-.2-.64-.37-1.28-.67-1.88-.6-1.22-1.34-2.31-2.52-3.07-.53-.34-1.01-.76-1.51-1.16-.17-.13-.39-.26-.25-.53.1-.21.37-.22.68-.01.52.35,1.01.75,1.55,1.07.68.4,1.39.77,2.1,1.11.46.22.96.37,1.43.57.96.4,1.96.53,2.98.41.41-.05.96-.18,1.42-.43.42-.23,1-.82,1.29-1.06.11-.09.15-.44.14-.86,0-.46-.26-.77-.61-1.02-.06-.04-.17-.05-.21-.1-.08-.1-.17-.22-.17-.33,0-.07.15-.17.24-.2.39-.1.78-.16,1.17-.25.36-.08.65-.6.51-.93-.02-.05-.13-.11-.18-.1-.88.23-1.83.18-2.63.69-.17.11-.33.23-.5.33-.2.12-.36.05-.36-.19,0-.16.06-.35.16-.48.13-.17.33-.28.49-.43.16-.15.3-.18.46-.02.23.23.48.17.71.04.55-.31,1.14-.54,1.56-1.05.13-.15.37-.22.57-.3.56-.23.62-.62.19-1.03-.16-.15-.26-.09-.42-.07-.31.05-.62.09-.93.08-.11,0-.21-.18-.32-.28.12-.08.25-.24.34-.22.5.09.88-.17,1.28-.38.33-.17.68-.32,1.03-.44.66-.23.87-.72.54-1.35-.04-.07-.08-.14-.12-.21-.49-.76-1.05-1.48-1.46-2.28-.4-.78-.79-1.56-.81-2.5-.01-.72.03-1.4.25-2.08.03-.11.03-.24.02-.35-.05-.74-.06-1.48-.23-2.21-.18-.83-.27-1.67-.47-2.49-.28-1.15-.84-2.18-1.56-3.11-.08-.11-.19-.2-.3-.28-.13-.1-.22-.04-.25.11-.19.87-.71,1.56-1.2,2.27-.8,1.14-1.57,2.3-2.38,3.43-.32.45-.71.86-1.09,1.26-.93.98-1.84,1.98-2.81,2.91-.48.46-1.09.79-1.62,1.2-.77.59-1.5,1.24-2.05,2.05-.13.19-.23.42-.32.64-.3.79-.61,1.58-.76,2.41-.11.57-.06,1.1.34,1.57.18.21.35.44.44.69.06.15,0,.47-.09.51-.28.11-.46.35-.72.48-.15.07-.32.2-.38.34-.26.68-.56,1.34-.73,2.06-.17.74.13,1.44.03,2.16,0,.06,0,.12.03.18.27.69.54,1.39.83,2.07.09.21.16.4-.09.5-.23.09-.3-.12-.42-.29-.53-.68-.71-1.5-.99-2.27-.16-.42-.21-.88-.28-1.33-.07-.49-.08-.98-.14-1.47-.01-.1-.11-.19-.16-.28-.1.08-.22.14-.29.24-.1.15-.17.33-.26.5-.09-.18-.22-.35-.26-.55-.11-.52-.34-1.01-.26-1.59.1-.73.05-1.49.03-2.23,0-.17-.12-.34-.18-.51-.1.16-.23.31-.28.48-.29.96-.29,1.93-.16,2.93.11.76.3,1.48.56,2.2.16.46.19.97.34,1.44.27.8.59,1.59.91,2.38.47,1.14,1.2,2.11,2.01,3.03.55.62,1.07,1.26,1.63,1.94ZM49.31,27.93s-.05,0-.07,0c0-.18.01-.36,0-.53-.11-1.22-.21-2.45-.36-3.67-.12-.91-.25-1.84-.49-2.72-.36-1.3-.79-2.58-1.21-3.87-.45-1.36-1.01-2.67-1.69-3.91-.5-.91-1.07-1.81-1.73-2.61-.5-.6-.88-1.3-1.41-1.88-.37-.4-.69-.84-1.1-1.22-.69-.65-1.31-1.36-2.1-1.91-.59-.41-1.17-.81-1.77-1.2-.35-.23-.71-.44-1.07-.64-.44-.25-.89-.48-1.34-.72-.16-.08-.32-.14-.49-.2-.4-.14-.8-.28-1.2-.42-.92-.31-1.81-.69-2.75-.91-.98-.23-2-.33-3-.46-1.18-.15-2.35-.21-3.55-.15-.81.04-1.62.07-2.41.27-.61.15-1.23.28-1.84.46-.48.14-.92.45-1.46.38-.07,0-.16.02-.23.05-1.15.47-2.29.95-3.44,1.43-.37.15-.76.26-1.09.47-.62.4-1.23.83-1.81,1.3-.84.68-1.84,1.17-2.47,2.11-.2.29-.54.5-.69.8-.16.32-.38.54-.62.77-.2.19-.4.38-.57.6-.42.54-.79,1.12-1.24,1.63-.68.79-1.01,1.77-1.5,2.67-.54.98-.87,2.06-1.34,3.08-.39.85-.55,1.8-.9,2.68-.21.53-.32,1.1-.45,1.66-.15.65-.3,1.31-.42,1.97-.11.63-.17,1.27-.16,1.92.01.46-.21.92-.24,1.39-.07,1.06-.09,2.13-.12,3.19-.01.33-.03.67,0,1,.04.65.12,1.3.17,1.95.1,1.12.16,2.25.3,3.37.14,1.13.4,2.23.75,3.33.38,1.21.74,2.43,1.18,3.63.32.87.67,1.73,1.09,2.56.41.81.91,1.58,1.39,2.35.45.73,1.1,1.32,1.55,2.06.31.5.69.96,1.05,1.43.08.11.2.19.3.28.15.15.3.3.45.45.46.44.87.93,1.38,1.3,1.53,1.12,3.14,2.13,4.81,3.02.1.05.22.09.33.13.42.14.86.24,1.26.43,1.21.55,2.46.95,3.79,1.09.26.03.51.18.77.21.88.1,1.77.19,2.65.23.65.04,1.3.01,1.96,0,.35,0,.71-.02,1.06-.02.12,0,.24.02.35,0,1.14-.3,2.35-.35,3.44-.87.59-.28,1.26-.2,1.86-.53.79-.43,1.66-.73,2.52-1.01,1.21-.39,2.16-1.19,3.17-1.89.37-.26.75-.52,1.11-.8.32-.25.65-.52.93-.81.41-.42.85-.84,1.17-1.33.2-.3.4-.57.67-.81.19-.17.37-.36.53-.56.43-.56.82-1.14,1.28-1.68.67-.79.99-1.78,1.49-2.67.54-.96.84-2.03,1.31-3.02.42-.88.64-1.85.93-2.79.15-.49.27-.99.41-1.49.28-.99.54-1.99.55-3.03,0-.21.08-.42.1-.63.02-.33-.06-.68.04-.98.17-.52.16-1.05.18-1.57.04-1.38.05-2.76.08-4.13ZM27.16,59.47c-1.5-.03-3.01-.04-4.51-.11-.48-.02-.95-.24-1.43-.31-1.01-.16-2.03-.32-3.01-.61-.75-.23-1.5-.48-2.23-.77-.72-.28-1.47-.55-2.12-.96-.42-.27-.86-.46-1.3-.68-.17-.09-.32-.24-.45-.38-.16-.17-.26-.41-.57-.34-.03,0-.08-.02-.1-.04-.57-.71-1.54-.94-2.06-1.74-.26-.4-.7-.7-1.07-1.02-.64-.54-1.11-1.21-1.6-1.88-.59-.8-1.21-1.58-1.74-2.43-.76-1.23-1.59-2.42-2.02-3.83-.07-.24-.23-.46-.37-.67-.38-.59-.39-1.3-.63-1.94-.28-.75-.63-1.5-.76-2.28-.1-.57-.26-1.1-.42-1.64-.21-.73-.12-1.5-.36-2.23-.09-.27-.05-.58-.06-.88-.04-.64-.06-1.29-.11-1.93-.02-.27-.1-.54-.13-.81-.04-.36-.09-.72-.09-1.08,0-.49.08-.98.06-1.47-.04-1.01.17-2,.19-3,.02-1.04.2-2.06.28-3.09.04-.56.22-1.11.35-1.66.13-.55.26-1.11.41-1.65.12-.43.26-.85.39-1.27.06-.19.1-.37.14-.56.02-.11-.01-.26.05-.34.47-.66.52-1.47.84-2.19.19-.43.41-.84.62-1.26.3-.64.6-1.28.91-1.92.6-1.23,1.45-2.3,2.29-3.37.44-.57.97-1.07,1.34-1.71.31-.54.84-.9,1.32-1.3.13-.11.24-.23.37-.34.41-.36.82-.72,1.24-1.07.28-.24.57-.48.87-.68.34-.23.69-.44,1.05-.63.55-.29,1.12-.56,1.68-.83.14-.07.27-.16.41-.2.73-.22,1.42-.53,2.1-.87.19-.1.42-.11.62-.17.32-.1.63-.21.95-.33.11-.04.22-.13.33-.12.66.02,1.21-.35,1.83-.47.91-.18,1.83-.3,2.76-.36.98-.06,1.97-.03,2.96-.02.91.01,1.8.18,2.69.37.85.17,1.7.3,2.54.48.48.1.95.26,1.42.41.61.2,1.22.42,1.82.64.2.07.37.2.56.3.75.38,1.5.75,2.24,1.15.22.12.42.29.61.46.17.16,2.15,1.27,2.66,2.03.28.42.72.73,1.1,1.07.66.58,1.13,1.31,1.68,1.97.75.89,1.32,1.9,1.96,2.86.69,1.05,1.34,2.11,1.74,3.31.08.24.23.46.37.67.36.55.38,1.22.6,1.81.3.81.66,1.61.81,2.45.1.56.26,1.1.42,1.64.21.71.11,1.47.35,2.18.1.29.06.62.08.93.04.62.06,1.25.11,1.87.02.29.11.58.14.87.04.36.07.72.08,1.08.01.83.02,1.65,0,2.48-.01.41-.11.82-.15,1.23-.12,1.29-.21,2.57-.36,3.86-.07.56-.24,1.11-.37,1.67-.11.48-.2.96-.33,1.43-.14.5-.31,1-.48,1.49-.02.05-.08.11-.07.16.09.57-.33.98-.45,1.49-.09.4-.3.77-.4,1.16-.14.56-.47,1.03-.72,1.54-.3.64-.61,1.28-.92,1.92-.61,1.25-1.46,2.34-2.33,3.41-.43.53-.81,1.11-1.25,1.63-.37.44-.8.84-1.22,1.23-.42.4-.86.78-1.31,1.15-.33.27-.71.48-1.01.78-.47.46-1.05.72-1.64.98-.47.2-.9.48-1.35.71-.24.12-.5.2-.75.31-.61.27-1.21.56-1.82.81-.27.11-.57.14-.85.23-.96.29-1.9.64-2.88.87-.82.19-1.67.25-2.5.37Z\"/>\n  </g>\n</svg>",
    11: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50.3 59.45\">\n  <g>\n    <path class=\"cls-1\" d=\"M27.7,7.05c.06-.06.11-.11.15-.17,0-.01-.08-.1-.08-.1-.08.05-.14.1-.21.16.04.03.08.06.15.11ZM31.45,7.62c.21-.05.43-.1.64-.14s.43-.1.64-.14c-.47-.07-.96-.23-1.28.29ZM32.37,10.22c-.14-.06-.28-.12-.42-.18,0,.04-.02.07-.03.11.14.03.28.05.42.08,0,0,.02,0,.03,0ZM32.41,10.22h0s-.02,0-.03,0h.02s.01,0,.02,0h0ZM23.24,10.2c-.08.1-.17.18-.23.28-.15.22-.32.44-.43.67-.03.07.07.29.15.31.52.15,1.42-.46,1.56-.98.1-.38.19-.82.76-.85.29-.02.43-.28.49-.54.06-.27-.25-.89-.44-.97-.22-.09-.44-.16-.67-.23-.26-.08-.48.08-.54.36-.08.38-.17.77-.26,1.15-.19-.34-.35-.7-.36-1.05-.02-.67-.5-.89-.96-1.15-.39-.22-.68.07-.98.24-.11.06-.18.2-.27.3-.1.11-.19.22-.29.33-.06.06-.13.12-.19.18.08.06.15.16.23.16.42.01.62.24.79.6.17.39.53.51.95.4.11-.03.21-.1.32-.14.03-.01.1,0,.1.02,0,.05,0,.12-.02.15-.05.05-.13.09-.2.12-.11.06-.23.11-.35.17.11.13.2.31.34.39.13.08.32.05.51.08ZM20.24,9.41c.31.33.62.67.93,1,.03.03.11.04.16.03.02,0,.04-.09.03-.14,0-.05-.06-.13-.05-.14.31-.22.1-.25-.1-.36-.28-.15-.56-.34-.79-.57-.14-.14-.18-.38-.29-.65-.06.34-.13.6.1.81v.03c-.06.1-.13.19-.2.29-.43.61-.17,1.17.18,1.69.25.37.7.38,1.03.1.22-.18.24-.41,0-.53-.66-.32-.84-.93-1.02-1.55h0s-.01-.02-.01-.02h0s0,0,0,0h0s0,.01.01.02h0ZM18.65,11.93c.11-.79.22-1.59.32-2.38.03-.19.05-.39.05-.59,0-.09-.08-.19-.12-.28-.05.08-.13.15-.15.23-.09.54-.13,1.1-.26,1.64-.12.48-.07.93.15,1.38ZM11.71,12.49s-.07.02-.11.03c.02.12.03.25.05.37.02,0,.04,0,.06,0v-.39ZM9.8,13.01c-.14-.2-.21-.29-.27-.38-.03.08-.09.16-.08.22.01.08.07.17.14.21.04.03.13-.03.21-.05ZM18.55,13.25s.06,0,.09,0v-.64s-.08,0-.12,0c.01.21.02.43.03.64ZM17.49,9.27c-.06.11-.11.32-.17.32-.5,0-.37.38-.36.62.04.7.1,1.39.2,2.09.06.44.2.87.31,1.31.04-.77.04-1.53.04-2.29,0-.18-.04-.37.01-.53.17-.5.04-1-.02-1.52ZM32.55,12.92c-.16.17-.33.28-.38.43-.14.45-.51.26-.76.25-.28,0-.39-.29-.45-.55-.09-.45,0-.87.21-1.26.21-.39.8-.5,1.13-.21.07.06.14.17.13.24,0,.06-.14.11-.22.15-.05.02-.12,0-.18,0-.14.04-.28.09-.42.14.06.16.07.35.17.47.18.21.39.42.76.33ZM30.45,14.01c-.44-.48-.38-.99-.48-1.45-.09-.43-.07-.84.19-1.21.18-.25.41-.43.74-.39.07,0,.13.04.2.07-.03.07-.05.17-.1.2-.45.27-.5.72-.53,1.18-.02.25-.11.5-.12.75,0,.24.05.48.09.85ZM9.81,14.07s.09-.02.14-.03c-.05-.25-.09-.5-.15-.74,0-.04-.1-.08-.14-.08-.04,0-.09.1-.08.13.07.24.15.48.23.72ZM30.84,14.65c-.11.05-.17.09-.23.12-.04-.08-.09-.15-.11-.23,0-.02.09-.1.1-.09.07.05.13.11.23.2ZM32.41,10.22c.33.24.66.47.98.72.46.36.47.45.18,1.1-.12-.2-.22-.36-.3-.53-.12-.25-.33-.42-.6-.43-.46-.03-.75-.24-.94-.64-.09-.18-.22-.24-.43-.11-.21.12-.45.2-.74.07.31-.24.56-.49.93-.24.02.01.09-.04.14-.07-.04-.04-.07-.08-.11-.11-.05-.04-.12-.08-.22-.15.13,0,.19-.02.24-.01.23.04.6.25.65-.04.05-.25-.36-.14-.57-.19-.64-.13-1.24,0-1.86.14-.68.15-1.2.44-1.58,1.01-.03.05-.1.07-.13.12-.2.36-.53.72-.54,1.09-.02.49.18,1,.33,1.49.05.15.26.26.42.4.07-.39.12-.7.18-1.01.16.12.22.24.26.37.15.45.27.91.44,1.34.14.34.35.61.79.69.4.07.66-.19.99-.27.13-.03.26-.12.37-.1.74.11,1.1-.05,1.5-.68.09-.14.23-.28.39-.35.12-.05.4,0,.41.04.06.32.18.24.34.08.59-.59.87-1.26.6-2.1-.05-.17-.04-.37-.12-.51-.21-.37-.46-.72-.69-1.08-.44.07-.88-.2-1.31,0ZM32.71,15s-.05-.09-.08-.14c-.17.07-.36.13-.52.22-.05.03-.05.16-.07.24.07,0,.16.05.21.02.16-.1.31-.23.46-.35ZM10.45,15.55c.08-.42-.13-.7-.35-.99-.04.02-.08.04-.12.06.15.31.31.62.46.93ZM11.31,16.55c-.16-.23-.32-.47-.48-.71-.02-.02-.07-.02-.1-.02,0,.05-.04.12-.02.15.13.21.28.42.42.63.02.03.07.05.1.04.03,0,.05-.04.09-.09ZM9.53,17.61c.08.26.19.44.34.58.15.13.34.21.57.23-.32-.29-.62-.55-.91-.81ZM37.42,16.59c-.08.29-.15.53-.21.77-.06.22-.14.44-.18.66-.05.29-.22.44-.49.52-.35.11-.7.05-1.05.02-.1-.01-.2.02-.31.04.06.11.09.27.18.33.35.23.73.32,1.17.3.76-.04,1.13-.64,1.63-1.06.07-.06.11-.26.06-.32-.3-.41-.16-.79,0-1.19.06-.15.01-.35-.02-.53-.07-.35-.18-.69-.23-1.04-.05-.29-.19-.5-.46-.55-.64-.13-1.27-.17-1.74.42-.04.05-.11.07-.18.13q-.02-.4-.16-.36c-.42.12-.93.87-.86,1.3,0,.07.09.12.13.18.05-.05.13-.1.16-.16.09-.17.14-.37.25-.53.07-.1.28-.23.31-.21.19.16-.08.19-.11.3-.07.26-.14.53-.2.79-.02.09,0,.25-.05.28-.6.31-.15.33.11.41.06.02.14.03.16.07.23.42.64.27.96.26.17,0,.47-.2.49-.34.03-.39.29-.41.65-.48ZM6.83,18.74s-.07.03-.11.05c.01.09.01.19.04.27.2.55.4,1.11.63,1.66.28.67.76,1.19,1.38,1.57.08.05.24.06.3,0,.06-.05.07-.22.03-.29-.21-.3-.45-.59-.67-.88-.42-.56-1.04-.96-1.18-1.72-.04-.24-.27-.44-.41-.66ZM6.34,22.15c-.07.18-.12.25-.1.3.14.5.48.87.86,1.2.12.11.28-.04.22-.13-.28-.44-.6-.86-.98-1.38ZM13,23.86c-.18-.05-.3-.09-.43-.12,0,0-.05.13-.05.13.1.04.2.09.3.11.03,0,.08-.05.17-.12ZM15.34,23.78c-.25.06-.47.1-.7.16-.05.01-.09.05-.14.08.05.06.1.16.15.16.23-.01.47-.04.69-.1.09-.02.16-.12.24-.18-.08-.04-.17-.08-.24-.11ZM30.51,23.55s-.01-.04-.02-.06c-.61.15-1.22.28-1.83.44-.17.05-.35.18-.26.38.04.08.27.12.4.11.69-.05,1.38-.12,2.06-.2.11-.01.31-.15.3-.17-.06-.17-.13-.36-.26-.48-.08-.07-.27-.03-.4-.03ZM28.65,24.99c-.25.17-.43.28-.61.4.13.13.24.32.4.37.24.07.51-.16.48-.38-.02-.12-.14-.22-.26-.39ZM6.89,25.26c-.08.15-.16.25-.14.26.1.1.22.19.33.28.04-.05.13-.13.12-.15-.07-.12-.17-.22-.3-.39ZM19.76,25.4c-.41.13-.8.25-1.19.37-.27.09-.5.21-.84.11-.23-.07-.55.15-.83.22-.14.03-.29.02-.43.03.11-.12.2-.29.33-.35.43-.19.88-.34,1.32-.51.44-.18.91-.32,1.31-.56.63-.38,1.26-.2,1.9-.11.17.03.35.07.52.12.54.16.71.37.76.94.02.29-.15.44-.39.27-.75-.53-1.66-.19-2.45-.53ZM7.75,26.06c-.07.13-.15.23-.14.24.11.12.23.23.37.32.01.01.1-.07.15-.1-.1-.13-.2-.25-.37-.46ZM8.21,26.8c.22.09.36.16.5.22.01-.03.04-.1.03-.1-.12-.07-.25-.14-.38-.2,0,0-.03.02-.16.09ZM19.54,27.06c-.17.09-.29.16-.41.23.08.08.18.24.25.23.15-.02.29-.13.44-.2-.08-.08-.17-.16-.28-.26ZM11.83,27.76s0,.06,0,.09h.6s0-.06,0-.09h-.6ZM10.85,27.9c.13,0,.27.03.41.02.06,0,.12-.07.18-.11-.05-.07-.09-.16-.16-.21-.04-.03-.11-.04-.16-.03-.4.1-.73-.05-1.06-.24-.17-.09-.36-.14-.55-.17-.1-.02-.21.05-.31.07.05.07.09.18.17.22.47.22.91.57,1.49.45ZM16.7,28.6c.13-.7.37-1.32.86-1.8.13-.13.34-.18.52-.24.77-.25,1.54-.5,2.31-.74.14-.04.33-.05.46.02.42.21.83.46,1.24.7.02.01.04.02.05.03.2.18.42.41.25.65-.09.13-.43.16-.64.13-.22-.03-.43-.19-.64-.3-.44-.24-.52-.22-.57.26-.08.68-.92,1.03-1.44.91-.12-.03-.26-.13-.32-.24-.15-.25-.29-.3-.49-.05-.11.14-.24.25-.37.37-.09.08-.2.24-.26.22-.35-.11-.56-.02-.67.33,0,.03-.14.05-.15.03-.06-.09-.1-.2-.14-.29ZM8.86,29.38s-.13.04-.22.08c.07.08.13.18.21.25.41.36.92.25,1.4.27.08,0,.17-.13.26-.19-.09-.08-.18-.21-.28-.23-.43-.08-.86-.12-1.37-.18ZM40.19,29.84s-.05.03-.07.05c.03.08.05.18.1.25.05.07.13.12.19.18,0-.08.01-.18-.02-.25-.04-.09-.13-.15-.19-.23ZM8.16,30.8c.68.45,1.38.62,2.07.73.55.09,1.14-.03,1.71-.07.23-.02.46-.08.7-.12.89-.14,1.61-.61,2.25-1.21.1-.09.23-.14.35-.2.05.12.13.23.16.35.07.31.14.62.18.93.01.11-.02.26-.09.34-.23.24-.49.45-.74.68-.73.68-1.6,1.05-2.58,1.18-.16.02-.31.07-.47.06-.43-.02-.86-.03-1.29-.09-.25-.03-.49-.21-.74-.21-.54,0-.8-.29-.98-.76-.14-.37-.34-.71-.48-1.08-.06-.16-.05-.34-.07-.51ZM43.6,33.43c-.06-.09-.08-.15-.13-.18-.62-.47-1.24-.94-1.87-1.41-.03-.02-.09.02-.14.04.02.07.03.16.07.2.47.41.94.82,1.42,1.21.12.09.28.14.43.18.05.02.12-.03.21-.05ZM25.73,34.55c-.13-.06-.37-.19-.62-.27-.5-.16-1.01-.29-1.52-.42-.16-.04-.39.02-.41-.23-.03-.25.16-.36.36-.4.16-.03.35.02.52.03.54.04,1.06.26,1.63.19.42-.05.76-.21,1.02-.51.14-.16.27-.25.49-.27.3-.02.61-.11.9-.19.27-.08.41.02.42.3,0,.23,0,.46.04.68.05.34-.16.49-.41.63-.71.39-1.51.35-2.43.47ZM16.49,34.21c-.15.15-.31.31-.46.46-.03.08-.06.16-.1.24-.34.2-.68.4-1.02.59-.13.07-.28.15-.42.15-.47,0-.94-.05-1.42-.05-.53,0-1.01-.14-1.45-.43-.15-.09-.32-.14-.48-.22-.54-.26-1.02-.58-1.31-1.2,1.07.07,2.14.24,3.18-.13,1.03-.37,1.87-1,2.66-1.83.29.74.57,1.43.83,2.12.03.08-.01.19-.02.29,0,0,0,0,0,0,0,0,0,0,0,0,0,0,.01,0,.01,0h0s0,.02,0,.02c.1.1.25.18.28.3.18.54.37,1.09.47,1.65.06.33-.04.69-.08,1.04,0,.07-.08.14-.14.19-.33.33-1.3.19-1.5-.23-.2-.41-.38-.82-.54-1.24-.03-.07.05-.2.11-.26.27-.26.55-.5.83-.75.03-.08.06-.16.1-.24.33.02.45-.16.47-.45,0,0,0,0-.01-.01ZM43.43,36.47c.34.38.67.76,1.01,1.14.03.04.1.05.15.07.02-.07.08-.15.06-.2-.23-.53-.57-.96-1.22-1.01ZM22.2,37.46c.05-.12.09-.23.14-.35.11.05.27.07.34.16.17.2.33.19.52.06.47-.32.95-.64,1.42-.96.15-.1.3-.18.44-.29.25-.19.47-.21.75-.03.33.21.69.25,1.03-.06.41-.38.89-.39,1.36-.14.45.24.95.33,1.44.47.19.05.25.02.33-.18.12-.29.37-.29.51,0,.1.21.28.41.12.71-.25.48-.3.51-.8.28-.27-.12-.53-.19-.85-.12-.37.08-.76,0-1.15.02-.15,0-.32.04-.45.11-.54.28-1.13.33-1.72.38-.61.05-1.22.12-1.82.22-.2.03-.41.15-.56.28-.18.16-.31.4-.59.31-.31-.1-.36-.39-.38-.68,0-.06,0-.12,0-.18-.02,0-.04-.01-.06-.02ZM25.99,39.57c-.52-.15-1.04-.29-1.56-.45-.07-.02-.11-.15-.16-.23.11-.05.25-.18.33-.15.76.27,1.47-.05,2.21-.1.57-.04.95-.33,1.24-.79.1-.17.19-.36.34-.47.09-.07.3-.07.41-.02.14.06.19.79.07.92-.56.63-1.21,1.11-2.1,1.16-.25.01-.5.04-.75.07,0,.02-.02.03-.02.05ZM40.7,36.62s-.04.07-.05.11c.18.11.35.23.53.35.42.27.85.5,1.24.81.29.23.47.61.77.8.75.47,1.36,1.07,1.97,1.7.07.07.21.16.26.14.17-.09.17-.26.06-.4-.64-.89-1.38-1.68-2.34-2.24-.49-.29-.99-.58-1.49-.84-.3-.16-.63-.28-.95-.42ZM6.02,43.59c.14.46.23.86.38,1.24.08.23.24.39.54.37.67-.05,1.34-.07,2.01-.07.96,0,1.92,0,2.88,0,1.79,0,3.58,0,5.37-.01.02,0,.04,0,.06,0,.14.05.28.09.42.14-.12.19-.2.43-.36.56-.11.09-.34.04-.52.04-.96-.02-1.93-.08-2.89-.08-.96,0-1.93.06-2.89.07-.33,0-.67-.08-1-.07-.65,0-1.31.07-1.96.07-.35,0-.7-.05-1.16-.08.33.5.65.91.88,1.36.16.32.38.34.67.34,2.15,0,4.29,0,6.44,0h.67c-.28.36-.93.66-1.43.66-1.67,0-3.34,0-5.01,0-.1,0-.2-.01-.3,0-.07,0-.15.04-.22.06.02.07.04.14.08.2.24.36.51.7.71,1.08.18.36.66.36.8.81.1.31.46.59.77.77.17.1.51.04.72-.07,1.62-.83,3.22-1.69,4.84-2.52.42-.22.84-.46,1.29-.58.36-.1.53-.3.64-.61.21-.58.37-1.17.35-1.79,0-.15.03-.32.08-.46.03-.07.15-.18.2-.16.1.02.18.12.26.19.01,0,.02.04.01.06-.05.9,0,1.82-.5,2.65-.2.35-.45.62-.79.85-.61.42-.85,1.49-.5,2.14.22.42.51.8.75,1.21.28.48.52.97.8,1.45.67,1.12,1.21,2.32,2.07,3.32.05.06.07.14.1.21-.06.03-.1.06-.13.05-.63-.15-1.26-.3-1.89-.48-.28-.08-.54-.23-.81-.32-1.33-.43-2.64-.89-3.84-1.64-.4-.25-.84-.43-1.25-.65-1.02-.53-1.94-1.22-2.79-1.98-.59-.52-1.09-1.14-1.6-1.74-.61-.72-1.18-1.48-1.76-2.22-.84-1.09-1.44-2.32-1.98-3.57-.38-.88-.81-1.75-1.06-2.67-.25-.89-.59-1.75-.8-2.65-.45-1.94-.86-3.89-1.05-5.88-.05-.47-.03-.95-.05-1.43-.02-.67-.06-1.34-.07-2.01,0-.35.03-.71.04-1.06.12-2.55.27-5.1.98-7.57.31-1.09.59-2.2.96-3.28.28-.84.65-1.65,1.02-2.46.38-.86.79-1.7,1.21-2.54.09-.19.29-.32.4-.49.26-.41.51-.83.75-1.25.47-.84,1.13-1.52,1.82-2.18.45-.44.88-.9,1.35-1.31.66-.59,1.31-1.2,2.04-1.69.93-.63,1.9-1.18,2.89-1.7.87-.46,1.8-.79,2.77-1.03.65-.16,1.29-.38,1.94-.54.47-.12.96-.21,1.44-.28.82-.11,1.64-.23,2.46-.28.59-.04,1.18.07,1.77.04,1.06-.05,2.11.06,3.11.3.71.17,1.48.24,2.13.64.07.04.15.06.22.08,1.25.27,2.4.79,3.53,1.35.95.47,1.92.91,2.78,1.56.2.15.45.25.67.38.14.08.29.15.4.26.45.43.89.89,1.35,1.32.64.61,1.26,1.23,1.7,2.02.18.32.48.58.72.87.86,1.04,1.55,2.2,2.1,3.43.26.58.58,1.13.8,1.72.25.67.43,1.37.64,2.06.17.56.32,1.14.55,1.68.17.41.13.86.28,1.26.43,1.12.51,2.32.72,3.48.16.83.23,1.69.33,2.53.02.23-.04.47-.03.7.02.61.06,1.22.07,1.84,0,.37-.03.75-.05,1.12-.09,2.63-.32,5.25-1.01,7.8-.28,1.02-.57,2.05-.92,3.05-.28.8-.64,1.57-.97,2.35-.21.49-.42.98-.65,1.45-.33.66-.71,1.29-1.13,1.9-.19.28-.3.6-.48.88-.62.95-1.33,1.82-2.23,2.53-.4.31-.71.74-1.06,1.12-.63.69-1.35,1.25-2.14,1.75-.6.37-1.19.77-1.8,1.12-.52.29-1.08.52-1.74.84.4-.8.73-1.46,1.06-2.13.11-.23.21-.46.32-.69.66-1.41,1.35-2.82,1.98-4.24.2-.44.28-.95.34-1.43.04-.31-.13-.55-.39-.79-.76-.69-1.7-1.01-2.62-1.36-.67-.26-1.04-.55-.98-1.34.06-.78-.04-1.57-.08-2.35,0-.13-.12-.38-.15-.37-.21.04-.44.11-.42.4.02.22.04.43.07.65.1.79.21,1.57.28,2.36.05.52.28.8.79.94.53.15,1.05.35,1.54.61.41.22.78.54,1.14.85.39.34.42.78.22,1.24-.32.74-1.64,3.65-2.03,4.33-.32.56-.64.57-1,0-.81-1.24-1.63-2.47-2.41-3.73-.4-.66-.98-1.13-1.55-1.61-.9-.77-1.83-1.51-2.74-2.26-.06-.05-.09-.12-.19-.25.72-.24,1.4-.44,2.06-.68.57-.21,1.13-.46,1.69-.71.06-.03.1-.1.15-.15-.07-.06-.14-.15-.22-.16-.13-.01-.28.01-.41.05-.6.17-1.2.36-1.8.54-.83.25-1.66.27-2.5.05-.11-.03-.21-.13-.31-.2.11-.07.21-.18.33-.21.17-.04.36-.04.53-.04,1.5,0,2.74-.68,3.87-1.58.45-.36.78-.88,1.22-1.25.27-.23.55-.44.74-.75.26-.44.56-.85.77-1.31.14-.31.14-.68.19-1.03.07-.51.13-1.02.19-1.53.12-1.17.2-2.34.35-3.5.06-.5.22-1,.34-1.49.04-.15.08-.3.1-.46.05-.55.05-1.11.16-1.65.14-.73-.15-1.35-.4-1.98-.11-.28-.49-.33-.7-.1-.59.67-1.43.86-2.2,1.2-.16.07-.32.19-.49.2-.16,0-.31-.11-.47-.17.06-.12.1-.25.18-.36.08-.11.2-.18.29-.28.39-.46.32-.77-.24-1.05-.07-.04-.15-.05-.21-.1-.24-.19-.41-.2-.54.13-.05.14-.18.26-.29.37-.22.22-.46.33-.8.18-.31-.14-.69-.14-.86-.53-.04-.09-.23-.11-.34-.16-.06.14-.17.28-.15.41.02.2.31.39.1.59-.21.19-.48.35-.75.44-.47.16-.58.11-.76-.37-.14-.4-.23-.83-.29-1.26-.02-.14.09-.33.18-.46.32-.44.76-.72,1.21-1.02.5-.33,1.01-.58,1.54-.85.69-.35,1.44-.44,2.17-.59.39-.07.79-.08,1.18-.1.3-.02.48-.21.35-.46-.49-.93-.77-1.98-1.68-2.68-.71-.55-1.47-1-2.29-1.28-.64-.22-1.36-.21-2.05-.31-1.06-.15-2.12-.26-3.17-.45-.68-.13-1.34-.36-1.99-.6-.29-.11-.53-.09-.79.02-.33.13-.67.24-.99.36-.12.05-.26.11-.35.21-.37.39-.72.78-1.07,1.18-.25.28-.47.59-.71.88-.46.57-.77,1.2-.8,1.94-.02.66-.05,1.33-.12,1.99-.04.35-.16.69-.24,1.03-.18.81-.37,1.62-.53,2.43-.16.82-.34,1.63-.25,2.47.03.28-.16.43-.34.58-.23.18-.45.37-.68.56-.08.06-.17.16-.24.16-.38-.03-.66.23-.99.34-.65.22-1.31.23-2,.23-.9,0-1.6-.56-2.45-.58-.05,0-.12-.04-.16-.07-.8-.66-1.67-1.27-2.06-2.29-.3-.79-.56-1.6-.39-2.48.06-.33.01-.69.01-1.07.13.08.22.14.31.19.28.12.37.06.35-.23-.01-.15-.06-.32-.01-.45.07-.2.19-.37-.18-.31-.02,0-.11-.17-.1-.24.04-.27-.04-.5-.13-.73-.2-.48-.25-.99-.24-1.51.02-.73-.16-1.48,0-2.17.27-1.16.76-2.25,1.91-2.85.26-.13.31-.33.38-.6.09-.34.17-1.14.34-1.83.05-.22-.09-.5-.04-.71.12-.45.51-.69.58-.84.02-.03.05-.08.08-.08.58-.07.9-.52,1.32-.85.1-.08.25-.14.38-.14.58.02,1.08-.15,1.5-.57.2-.2.27-.05.32.18.19.83.38,1.65.62,2.46.1.32.32.61.48.91.05-.02.09-.04.14-.06-.04-.14-.06-.29-.13-.42-.37-.68-.55-1.43-.68-2.19-.15-.92-.22-1.84.04-2.74.23-.79.73-1.42,1.28-2.02.51-.56,1.12-.93,1.88-1.06.17-.03.32-.14.48-.23.33-.18.63-.06.88.13.08.06.05.26.08.4.01.05.05.09.08.14.04-.03.1-.05.13-.09.11-.21.26-.14.19.09-.01.04.03.1.04.15.05-.03.12-.04.14-.08.11-.2.21-.42.31-.63.12-.26.28-.44.6-.28.4.2.5.4.39.78-.11.36-.23.72-.33,1.08-.03.09-.02.19.04.32.24-.37.58-.71.71-1.12.16-.55.63-.81.9-1.24.44-.69,1.19-.58,1.83-.71.27-.05.55,0,.76-.24.06-.06.17-.1.26-.1.43,0,.78-.18,1.15-.38.23-.12.59-.03.88.02.39.08.76.21,1.15.32.02,0,.04.01.06,0,.48-.3.85-.14,1.19.24.04.04.1.07.16.08.77.03,1.33.47,1.85.98.05.05.11.11.16.17-.08.05-.14.12-.23.14-.57.13-1.15.26-1.65.59-.05.03-.13.04-.16.08-.07.1-.13.22-.19.33.11-.01.22-.01.33-.05.66-.2,1.31-.42,1.97-.62.56-.17,1,.16,1.44.4.37.2.69.5,1,.8.45.44.87.89,1.44,1.19.41.22.7.65,1.1.88.39.22.73.44,1,.8.11.15.31.24.48.34.48.3.79.7.87,1.28.05.38.16.77.43,1.07.07.08.13.18.21.29-.41.07-.77.13-1.13.19,0,.03,0,.06,0,.1.18,0,.36.05.53.02.85-.13,1.64.14,2.42.4.25.08.47.35.62.59.36.56.67,1.16.98,1.75.08.15.16.33.16.5.02.28.11.48.35.63.37.23.47.64.52,1.03.07.6.33,1.14.47,1.71.02.07.12.16.1.21-.13.43.17.7.34,1.02.31.58.36,1.18.28,1.84-.09.84-.37,1.57-.95,2.17-.35.36-.3.75-.17,1.15.15.43.33.85.56,1.24.23.4.28.78.17,1.22-.65-.43-1.28-.85-1.69-1.52-.02-.04-.09-.04-.14-.06-.02.05-.06.12-.05.16.04.09.1.17.16.25.64.82,1.4,1.5,2.34,1.98,1.12.57,1.28,1.44.88,2.53-.06.16-.11.33-.12.5-.01.41.01.82.01,1.23,0,.34-.39.24-.71.12-.05-.02-.11-.03-.22.02.18.15.73.41.9.57.04.04.04.13.05.2-.06,0-.13.04-.17.02-.77-.43-1.68-.56-2.36-1.17-.35-.31-.77-.54-1.12-.85-.31-.27-.63-.55-.84-.9-.48-.79-.87-1.63-1.33-2.43-.35-.62-.32-1.3-.32-1.97,0-.2,0-.39,0-.59-.04,0-.08-.02-.12-.02-.05.2-.13.39-.14.59-.03.98.02,1.93.56,2.81.43.7.76,1.47,1.2,2.16.32.51.78.93,1.29,1.28.22.15.39.4.62.53.43.24.87.47,1.33.64,1.08.4,2.02.98,2.68,1.95.35-.65.48-1.43.39-2.07-.04-.3-.25-.18-.4-.2-.36-.05-.44-.12-.35-.43.03-.1.16-.21.26-.23.8-.14.8-.14.78-.96,0-.06-.01-.12-.02-.18-.02-.46-.02-.46-.5-.48-.18,0-.4.04-.37-.23.02-.2-.04-.53.37-.44.11.02.24-.03.35-.03.24,0,.3-.13.29-.34,0-.24-.02-.47,0-.71.02-.51.01-.53-.51-.54-.12,0-.24.02-.36.02-.29,0-.74-.31-.8-.58,0-.04.11-.15.17-.15.36-.02.71,0,1.07-.01.47,0,.47-.03.39-.47-.04-.19-.05-.39-.04-.59.03-.54.04-.55-.52-.55-.58,0-1.15.01-1.73,0-.13,0-.31-.08-.37-.18-.19-.34-.12-.45.27-.46.59-.02,1.19,0,1.78,0,.42,0,.44-.02.43-.43,0-.25-.03-.51-.09-.76-.11-.53-.12-.53-.68-.53-.52,0-1.03,0-1.55,0-.26,0-.25-.13-.17-.3.13-.27.32-.42.65-.4.41.02.83-.06,1.24-.05.29,0,.35-.11.32-.35,0-.02-.02-.04-.02-.06-.08-.32-.07-.74-.27-.93-.17-.17-.59-.08-.9-.1-.08,0-.16-.05-.23-.03-.22.05-.37.02-.33-.25.03-.21.01-.47.37-.4.17.03.36.03.54.02.49-.02.63-.19.52-.68-.05-.21-.15-.41-.2-.62-.05-.22-.2-.28-.39-.29-.22,0-.44,0-.65,0-.24,0-.36-.12-.4-.35-.04-.21,0-.35.26-.34.1,0,.2-.03.29-.03.52-.03.58-.11.45-.58-.03-.11-.07-.22-.1-.34-.18-.59-.24-.63-.88-.62-.17,0-.4.02-.5-.08-.13-.12-.15-.35-.22-.54.15-.03.29-.07.44-.08.74-.02.77-.08.44-.75-.27-.56-.56-1.02-1.31-.86-.46.1-.59-.3-.8-.66.33,0,.62,0,.9,0,.35,0,.42-.07.4-.42-.02-.4-.21-.72-.47-1-.07-.07-.2-.1-.3-.1-.45-.02-.9-.06-1.35-.03-.39.03-.43-.28-.56-.5,0,0,.14-.15.21-.16.37-.02.74,0,1.12-.01.47-.01.49-.03.25-.46-.19-.34-.44-.66-.71-.94-.1-.1-.32-.12-.49-.12-.78-.01-1.55,0-2.33,0-.15,0-.36,0-.44-.1-.12-.14-.14-.35-.21-.54.14,0,.29-.03.43-.03.62,0,1.25,0,1.87-.02.15,0,.29-.09.44-.13-.07-.11-.13-.23-.21-.34-.3-.37-.6-.74-.92-1.09-.08-.09-.24-.13-.37-.13-.78-.01-1.57-.05-2.35,0-.61.04-.91-.34-1.33-.77.88,0,1.67,0,2.45,0,.12,0,.24.01.36,0,.16,0,.22-.09.13-.23-.08-.11-.17-.22-.27-.31-.19-.18-.42-.32-.57-.52-.41-.53-.99-.5-1.56-.51-.44,0-.87.03-1.31.05-.21,0-.43-.02-.64,0-.54.04-.93-.22-1.33-.71.24-.01.41-.03.59-.03.67,0,1.35,0,2.02,0,.07,0,.14-.05.21-.07-.03-.06-.05-.16-.1-.19-.7-.37-1.38-.78-2.11-1.08-.41-.17-.89-.18-1.33-.22-.49-.04-1,.03-1.48-.06-.36-.07-.69-.32-1-.59.3-.02.6-.05.99-.08-1.28-.55-2.8-.86-4.15-.91-1.01-.04-2.01-.18-3.02-.18-.87,0-1.74.1-2.6.22-.55.08-1.06.33-1.65.38-.5.04-.97.37-1.46.56-.55.21-1.12.39-1.66.62-.74.31-1.49.61-2.21,1-.66.36-1.31.73-1.9,1.19-.51.39-1,.82-1.46,1.27-.43.42-.82.88-1.3,1.26-.6.48-1.04,1.11-1.42,1.8-.26.48-.6.92-.93,1.36-.18.24-.41.42-.4.76,0,.11-.13.23-.2.35-.36.63-.82,1.2-.94,1.95-.05.29-.31.54-.44.82-.42.87-.52,1.87-1.07,2.7-.1.16-.12.38-.14.57,0,.08.07.23.13.25.25.08.19.28.19.44,0,.22-.17.23-.34.24-.07,0-.19.04-.2.09-.14.42-.28.85-.39,1.28-.01.05.12.19.2.21.19.03.4.03.59.02.25-.02.34.1.41.32.06.19.02.26-.16.28-.32.03-.63.05-.95.06-.24,0-.38.09-.37.35,0,.1-.01.2-.03.3-.11.81-.11.81.72.84.06,0,.12,0,.18,0,.11.02.33-.07.27.17-.04.18.06.48-.29.49-.26,0-.52,0-.78,0-.18,0-.3.05-.31.26,0,.18-.07.35-.08.52-.05.91-.05.91.87.94.08,0,.16.02.24.02q.54.04.71.67c-.5,0-.99,0-1.47,0-.47,0-.46.01-.49.46-.01.22-.05.43-.08.64-.05.41.01.49.43.5.54,0,1.08.03,1.61,0,.48-.03.87.06,1.04.62-.13.01-.27.04-.41.04-.75,0-1.5,0-2.24,0-.42,0-.45.05-.41.44.03.29.09.59.08.89,0,.3.12.37.39.36.89-.01,1.79,0,2.68,0,.28,0,.56.02.83,0,.29-.03.37.13.44.36.04.16,0,.21-.15.23-.28.02-.55.08-.83.08-.97,0-1.95,0-2.92,0-.42,0-.42.02-.38.44,0,.04.02.08.02.12-.1,1.21.32,1.01,1.21,1.04,1.23.04,2.45.02,3.68,0,.45,0,.55.4.84.64-.3.02-.61.07-.91.06-.87-.02-1.74-.09-2.61-.1-.63,0-1.26.04-1.89.09-.07,0-.18.13-.18.2,0,.2.02.4.06.59.11.51.32.68.85.67,2.25,0,4.49,0,6.74,0,.14,0,.28,0,.41.03.57.16,1.13.32,1.7.49.07.02.12.09.19.14-2.88,0-5.76,0-8.63,0-.73,0-.73,0-.74.72,0,.61.18.8.8.8,1.73,0,3.45-.03,5.18-.03s3.41.03,5.12.03c.48,0,.71.33,1.13.64-.26.01-.39.02-.52.02-3.6,0-7.19,0-10.79-.01-.43,0-.43,0-.35.42.01.06.02.12.03.18q.17,1.11,1.26,1.1c.81,0,1.62,0,2.43,0,3.12,0,6.24,0,9.36,0,.32,0,.53.07.63.39.06.19,0,.26-.18.28-.08,0-.16.01-.24.01-2.64,0-5.29,0-7.93,0-1.45,0-2.9,0-4.35,0-.37,0-.42.06-.33.42.04.19.1.38.19.56.31.6.32.77,1.24.72.67-.04,1.33.01,2,.01.59,0,1.19-.01,1.78-.02.69,0,1.37,0,2.06,0,.51,0,1.03,0,1.54,0,.61,0,1.21-.04,1.82-.04.67,0,1.34.02,2,.04.12,0,.25.05.37.08-.11.17-.18.39-.33.5-.12.09-.34.1-.51.1-.94-.02-1.88-.06-2.81-.07-.7,0-1.4.07-2.1.07-1.01,0-2.01-.04-3.02-.05-.61,0-1.22.04-1.82.05-.51,0-1.02,0-1.56,0ZM23.83.93c-.53,0-.9-.06-1.24,0-1.73.34-3.44.78-5.1,1.39-.98.36-1.92.84-2.91,1.14-1,.3-1.7,1.05-2.57,1.54-.6.34-1.12.81-1.67,1.22-.09.07-.22.12-.28.21-.52.72-1.3,1.22-1.68,2.05-.05.1-.17.16-.25.25-.35.4-.72.79-1.05,1.2-.22.27-.39.58-.6.87-.38.52-.8,1.02-1.15,1.57-.21.33-.3.73-.47,1.08-.23.5-.51.97-.73,1.47-.23.5-.41,1.02-.62,1.53-.11.27-.26.53-.37.8-.27.68-.44,1.39-.68,2.07-.39,1.07-.64,2.2-.88,3.33-.18.84-.27,1.69-.25,2.55.01.5-.18,1-.21,1.51-.04.77.05,1.56-.06,2.32-.15,1.07-.03,2.13.04,3.19.05.79.15,1.58.22,2.36.11,1.34.23,2.68.63,3.97.37,1.22.7,2.45,1.17,3.64.31.79.56,1.61.9,2.38.38.85.83,1.66,1.28,2.48.63,1.14,1.54,2.09,2.29,3.14.41.58.71,1.3,1.42,1.63.05.02.07.1.11.14.5.5.97,1.05,1.52,1.48.73.58,1.51,1.09,2.3,1.59.8.5,1.64.94,2.46,1.4.1.06.22.09.33.13.42.14.86.24,1.26.42,1.19.55,2.42.95,3.72,1.09.3.03.59.17.9.2.84.09,1.69.18,2.54.23.71.03,1.42,0,2.13,0,.3,0,.59,0,.89,0,.13,0,.28.04.4,0,1.14-.3,2.35-.34,3.44-.87.59-.28,1.25-.2,1.86-.52.85-.45,1.78-.74,2.69-1.07,1.13-.4,2.03-1.17,2.99-1.84.49-.34.97-.68,1.46-1.02.1-.07.21-.13.28-.22.51-.72,1.28-1.23,1.67-2.06.03-.07.09-.13.16-.18.48-.36.88-.79,1.18-1.32.15-.27.3-.57.53-.77.57-.52.93-1.17,1.3-1.82.15-.27.21-.59.34-.88.23-.49.51-.97.73-1.47.23-.5.41-1.02.61-1.53.11-.27.27-.53.36-.81.17-.52.26-1.08.47-1.59.53-1.27.82-2.6,1.11-3.93.17-.8.24-1.61.23-2.44,0-.5.17-1.01.2-1.51.04-.77-.05-1.56.06-2.32.15-1.03.03-2.05-.03-3.07-.05-.75-.19-1.49-.22-2.24-.08-1.85-.41-3.65-.97-5.41-.13-.39-.21-.8-.34-1.19-.18-.54-.39-1.06-.59-1.6-.21-.57-.42-1.15-.65-1.71-.15-.37-.34-.72-.49-1.08-.6-1.39-1.51-2.59-2.42-3.79-.12-.15-.29-.27-.4-.42-.43-.61-.85-1.23-1.28-1.84-.07-.1-.17-.17-.26-.25-.17-.16-.33-.33-.5-.49-.46-.44-.89-.91-1.39-1.29-.75-.58-1.54-1.12-2.35-1.62-.8-.5-1.64-.94-2.46-1.4-.1-.06-.22-.1-.33-.14-.39-.12-.79-.19-1.16-.36-1.15-.53-2.32-.97-3.6-1.09-.36-.03-.72-.19-1.08-.24-.58-.08-1.17-.13-1.76-.18-.65-.06-1.3-.14-1.95-.15-.45,0-.91.09-1.19.12ZM27.04,59.45c-1.39-.03-2.91-.04-4.43-.1-.48-.02-.95-.22-1.43-.32-1-.21-2.02-.37-3.01-.62-.74-.19-1.46-.46-2.17-.74-.72-.29-1.47-.56-2.12-.97-.44-.27-.9-.48-1.35-.71-.17-.09-.3-.25-.44-.39-.15-.15-.24-.38-.52-.31-.05.01-.13-.02-.16-.06-.38-.63-1.16-.71-1.62-1.25-.44-.51-.97-.93-1.42-1.43-.77-.87-1.54-1.74-2.24-2.65-.51-.67-.93-1.4-1.37-2.12-.42-.68-.87-1.35-1.23-2.06-.47-.93-.97-1.86-1.28-2.84-.22-.69-.37-1.39-.69-2.05-.12-.24-.05-.56-.15-.81-.34-.86-.45-1.78-.73-2.65-.08-.24-.11-.5-.12-.75-.03-.91-.29-1.78-.21-2.71.05-.64-.19-1.3-.28-1.96-.05-.34-.06-.69-.06-1.04,0-.83,0-1.66.02-2.5.01-.39.1-.78.14-1.17.12-1.33.18-2.67.38-3.99.19-1.2.5-2.39.82-3.56.17-.59.28-1.23.51-1.77.37-.87.62-1.78.95-2.66.11-.29.34-.53.47-.81.49-1.08.95-2.17,1.6-3.16.5-.76,1.09-1.45,1.64-2.18.44-.57.86-1.17,1.33-1.72.35-.41.75-.78,1.14-1.15.44-.41.87-.83,1.34-1.19.72-.56,1.4-1.24,2.22-1.58,1.03-.43,1.89-1.19,3.04-1.38.44-.07.83-.41,1.26-.6.19-.09.41-.12.61-.19.32-.1.63-.22.95-.31.85-.22,1.7-.44,2.55-.65.37-.09.75-.19,1.13-.22.82-.06,1.64-.08,2.46-.1.44-.01.87-.01,1.31,0,.63.02,1.27.01,1.9.09.58.07,1.15.29,1.73.36,1.53.18,3,.61,4.45,1.11.64.22,1.31.46,1.89.88.5.36,1.11.57,1.67.85.19.1.41.18.56.32.25.23,1.24,1.06,1.37,1.1.64.17,1.01.67,1.43,1.11.31.33.68.61.99.94.57.62,1.13,1.26,1.67,1.91,1.04,1.24,1.89,2.6,2.7,4,.43.75.92,1.47,1.13,2.33.07.28.3.51.41.78.22.58.41,1.17.6,1.76.08.24.16.49.24.73.09.26.17.52.26.78.09.26.17.52.25.78.02.05.07.1.08.16.03.97.51,1.85.59,2.81.06.67.23,1.34.21,2.01-.02.63.11,1.23.11,1.85,0,.25.11.5.13.75.04.38.07.77.07,1.15,0,.79.01,1.59-.01,2.38-.01.47-.09.94-.14,1.41-.12,1.25-.21,2.5-.36,3.75-.07.58-.24,1.15-.38,1.73-.13.56-.25,1.11-.4,1.66-.12.43-.35.83-.41,1.26-.17,1.05-.72,1.97-.98,3-.1.39-.38.73-.55,1.1-.47,1.02-.9,2.05-1.49,3.02-.52.85-1.14,1.61-1.74,2.39-.45.59-.88,1.2-1.36,1.76-.36.42-.77.81-1.18,1.19-.42.39-.85.78-1.3,1.14-.72.56-1.41,1.2-2.22,1.6-.68.34-1.33.74-2.02,1.06-.56.27-1.17.45-1.76.67-.75.28-1.5.55-2.26.82-.16.06-.35.06-.52.1-.27.06-.56.08-.81.19-1.03.45-2.13.49-3.36.64Z\"/>\n  </g>\n</svg>",
    12: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50.33 59.46\">\n  <g>\n    <path class=\"cls-1\" d=\"M27.14,4.21s-.06-.05-.09-.07c-.11-.11-.38-.09-.3-.36,0-.02.07-.05.09-.04.18.1.42.18.3.47h0s0,0,0,0h0ZM30.61,4.93c.15-.23.29-.36.32-.52.02-.1-.15-.23-.23-.34-.16.13-.34.25-.45.42-.03.04.19.24.36.45ZM27.14,4.21c-.02.36-.2.5-.56.43-.11-.02-.24,0-.36,0-.11,0-.22.02-.42.05.58.29,1.21.16,1.58.71.12.18.43.27.68.33.14.03.34-.07.45-.17.07-.06.08-.31.02-.36-.33-.3-.4-.73-.49-1.1-.18-.77-1.36-1.01-1.93-.53-.16.13-.2.61-.06.81.13.19.38.21.63.06.15-.09.31-.16.46-.24h0s0,0,0,0h0ZM15.27,6.21c.06,0,.12.01.17,0,.08-.02.16-.06.23-.1-.07-.06-.13-.12-.2-.18-.03-.02-.08-.05-.1-.05-.16.04-.32.09-.48.15-.02,0-.03.06-.04.1.14.03.28.05.42.08ZM33.46,6.51c-.15-.16-.21-.3-.29-.3-.11,0-.22.08-.33.13.04.08.07.21.11.22.13.02.27-.02.51-.04ZM29.38,5.36s-.02.06-.03.09c.24.12.63.2.69.38.28.83,1.07.69,1.64.96.02.01.14-.07.13-.1-.03-.43-.07-.91-.43-1.15-.26-.17-.68-.08-.98-.28-.02-.01-.11.06-.13.1-.15.27-.29.23-.49.04-.08-.07-.26-.03-.4-.04ZM29.49,7.71c.11-.06.25-.11.36-.21.03-.03,0-.22-.05-.26-.38-.24-.76-.57-1.18-.66-.47-.09-.92-.15-1.31-.44-.21-.16-.46-.11-.62.13-.09.13.02.56.19.63.37.16.76.3,1.15.42.33.1.68.18,1.02.26.13.03.26.07.45.13ZM33.55,7.49c-.08.02-.12.03-.15.04-.27.11-.38.42-.25.68.05.1.14.24.22.25.22.03.44,0,.66,0-.04-.15-.08-.29-.13-.44-.04-.13-.09-.26-.16-.37-.05-.07-.14-.12-.2-.16ZM22.08,8.35c.14-.02.26-.02.36-.06.31-.13.58-.19.8.19.07.12.32.24.44.21.5-.14,1.09-.03,1.5-.47.05-.05.14-.08.21-.08.47-.04.94-.09,1.42-.09.16,0,.36.07.46.19.31.36.74.43,1.15.57.24.08.41-.03.47-.22.03-.09-.12-.26-.22-.35-.33-.28-.67-.53-1-.81-.24-.2-.47-.24-.6.02-.15.29-.37.3-.61.34-.33.07-.65.13-.98.17-.08.01-.23-.02-.26-.08-.14-.3-.41-.26-.66-.3-.37-.05-.74-.12-1.11-.14-.14,0-.31.04-.42.13-.31.23-.6.49-.95.78ZM31.32,8.21c-.24-.22-.47-.46-.73-.65-.07-.05-.27.05-.4.08.08.1.14.24.24.28.29.12.59.2.89.29.01,0,.02.02.03.03h.02c.09.49.4.74,1.11.79-.37-.26-.74-.52-1.11-.78,0,0,0-.02,0-.03-.02,0-.03,0-.05-.01ZM36.09,8.91c-.07-.1-.11-.15-.15-.2-.08.07-.17.13-.24.2,0,.01.09.16.11.15.09-.03.17-.09.29-.15ZM24.54,9.48c.45.19.78.33,1.11.47.02-.04.03-.08.05-.12-.3-.24-.58-.52-1.16-.35ZM34.83,9.44c.17.25.28.42.4.6.14-.13.33-.23.4-.39.07-.17-.23-.5-.42-.47-.11.02-.21.14-.37.26ZM29.81,8.93l-.02.12c.22.05.45.08.67.15.18.06.44.14.49.28.17.43.49.56.88.67.15.04.27.18.41,0,.15-.19,0-.29-.13-.38-.58-.45-1.26-.67-1.96-.83-.11-.02-.23,0-.34,0ZM13.85,10.39c.08,0,.19-.01.27.02.1.04.17.12.26.19-.1.12,0,.39-.27.38-.07,0-.21-.01-.21,0-.2.67-1.01.71-1.32,1.28-.13.25-.64.3-.89.15-.04-.03-.07-.17-.03-.22.33-.46.7-.89,1.01-1.37.29-.45.74-.39,1.18-.44ZM35.75,12.31c.04.18.08.36.14.53.02.05.13.07.2.1.03-.08.1-.19.07-.23-.1-.16-.23-.3-.35-.44.12-.54-.3-.85-.53-1.23-.11-.17-.25-.42-.53-.31.25.46.5.91.76,1.36.05.09.16.16.23.24ZM30.63,11.36c.24.62.47,1.24.72,1.85.03.07.12.12.18.18.02-.07.07-.15.05-.22-.17-.68-.36-1.36-.9-1.86-.27-.85-.93-1.27-1.71-1.56-.09-.04-.25.06-.36.13-.03.02-.04.16,0,.21.03.05.18.08.19.07.22-.37.43-.08.58.04.44.37.84.77,1.26,1.16ZM33.87,13.6c.07-.28,0-.5-.2-.68,0,0-.03,0-.05.01.05.2.1.39.15.59,0,.03.05.05.1.08ZM35.2,12.64c-.17-.46-.31-.93-.52-1.37-.12-.26-.35-.48-.55-.69-.06-.06-.21-.04-.32-.06.03.08.04.18.09.24.36.41.68.85.84,1.39.06.2.28.34.43.51-.2.18-.02.36,0,.54.03.17.11.44.05.48-.23.17-.02.32-.05.47-.05.25.06.35.29.4.07.01.11.13.17.2.04-.1.13-.21.11-.31-.08-.63-.12-1.28-.56-1.8ZM39.34,14.11s-.08-.04-.12-.07c-.14.27-.28.53-.41.81-.03.06,0,.15,0,.22.08-.03.21-.04.23-.09.12-.28.21-.58.3-.87ZM38.85,13.47c-.28.37-.53.66-.72.97-.19.31-.31.65-.52,1.1.75-.64.99-1.04,1.24-2.07ZM40.86,12.29s-.07-.1-.13-.19c-.05.1-.12.19-.14.29-.05.27-.05.55-.12.81-.34,1.18-.76,2.32-1.79,3.11-.06.05-.08.16-.12.24.09.02.18.05.28.06.05,0,.12-.02.17-.06.72-.51,1.34-1.14,1.55-2.01.17-.7.21-1.44.32-2.25ZM31.83,14.82c-.04-.25-.08-.6-.15-.94,0-.05-.11-.09-.17-.11-.02,0-.09.09-.09.14-.03.35-.09.71-.08,1.06.01.61.07,1.22-.43,1.69-.03.03-.04.13-.01.14.04.03.12.04.16.02.1-.06.2-.13.28-.21.48-.47.52-1.07.5-1.79ZM33.03,15.84c-.04-.06-.06-.12-.07-.12-.07.02-.18.03-.21.08-.33.61-.9,1-1.35,1.5-.13.15-.25.3-.38.45.22-.06.45-.1.67-.18.09-.03.17-.1.23-.17.34-.43.68-.87,1.01-1.31.06-.07.08-.17.11-.24ZM34.48,18.37s0,0-.01,0c0,0,0,0,0,0,0,0,0,0,.01,0,0,0,0,0,0,0ZM34.48,18.37c.3.08.51-.09.69-.29,0,0-.02-.04-.02-.04-.21.08-.41.16-.61.25-.03.01-.04.05-.06.08ZM10.63,17.89l.08.02c0,.16-.02.32,0,.47.01.08.09.15.15.22.06-.05.14-.09.17-.15.06-.16.12-.34.15-.51.07-.49.11-.98.18-1.47.02-.15.08-.31.08-.46,0-.08-.11-.15-.16-.22-.05.05-.14.1-.16.16-.17.64-.32,1.29-.48,1.94ZM21.85,6.22s.05-.04.07-.05c0-.1,0-.19,0-.29-.02-.28.1-.44.35-.42.09,0,.18.1.27.1.27.01.25.19.26.37,0,.21-.1.24-.28.29-.25.08-.51.2-.71.37-.57.45-1.18.72-1.91.67-.65-.05-1.16-.74-1.01-1.38.01-.06.09-.15.15-.16.06,0,.15.06.18.12.05.1.05.23.09.33.08.2.15.41.27.58.16.21.42.13.47-.13.03-.18-.02-.37-.06-.55-.09-.35-.47-.32-.7-.48-.38-.27-.62-.24-.95.13-.2.22-.33.26-.49-.03-.13-.24-.22-.07-.26.06-.03.1,0,.22.02.32.05.24.02.43-.08.67-.23.52-.67.7-1.12.88-.3.12-.58.25-.89.58.22-.05.32-.06.41-.09.38-.12.75-.24,1.13-.37.16-.05.27-.05.42.1.16.16.39.23.59.34.07.04.15.08.23.11-.07.06-.14.13-.22.18-.27.16-.55.3-.81.47-.56.36-1.11.74-1.68,1.1-.3.19-.39.15-.43-.18-.04-.32-.17-.5-.5-.57-.11-.02-.29-.22-.28-.23.15-.22-.06-.32-.14-.46-.26-.47-.14-.89.31-1.16.07-.04.14-.14.14-.21.02-.24-.27-.67-.38-.6-.17.1-.3.29-.4.46-.06.11-.02.27-.05.41-.05.21-.12.42-.2.68-.11-.13-.15-.18-.18-.22q-.4-.53.11-1.01s.06-.12.04-.14c-.05-.05-.15-.12-.19-.1-.28.14-.55.3-.82.47-.13.08-.37.22-.35.28.11.42-.29.62-.37.94-.05.2-.06.44.01.62.15.41.36.79.53,1.19.03.08,0,.21-.06.3-.31.54-.73,1.02-.89,1.65-.03.11-.28.27-.32.25-.4-.25-.63.22-.97.21-.05,0-.13.14-.16.23-.07.18-.12.38-.17.57-.07.26.03.4.31.43.44.05.45.05.33.45-.07.24-.18.48-.24.73-.06.24-.11.49-.13.74,0,.08.1.17.16.25.06-.09.15-.16.17-.26.08-.37.13-.74.21-1.11.05-.21.11-.42.21-.61.12-.23.33-.22.57-.17.21.04.34.06.42.32.22.67.28,1.36.35,2.06.04.35-.03.65-.14.97-.18.48-.33.98-.46,1.47-.03.09.07.22.1.34.1-.08.24-.13.28-.23.12-.27.2-.56.3-.83.08-.22.18-.43.27-.65.2.1.4.22.61.29.25.09.55.24.78.18.75-.18,1.41-1.38,1.22-2.15-.07-.28-.27-.55-.55-.51-.26.04-.37-.08-.49-.22-.21-.23-.4-.47-.61-.71-.02.15,0,.3.07.43.08.16.22.29.29.44.04.08,0,.2,0,.31-.09-.03-.19-.05-.25-.11-.54-.51-.83-1.16-.86-1.89-.01-.32.17-.64.26-.96.15.05.29.11.44.15.04.01.11-.04.16-.07.3-.17.61-.33.91-.51.08-.05.22-.16.23-.15.17.18.33.38.49.57.15.19-.03.24-.13.35-.25.28-.46.59-.67.9-.05.07-.03.17-.05.26.09,0,.19,0,.28,0,.35-.03.44-.37.64-.57.29-.29.29-.3.54,0,.29.35.29.34.69.07.13-.09.28-.15.43-.21.92-.42,1.21-1.4.67-2.25-.13-.2-.32-.39-.52-.28-.22.12-.65-.12-.67.39,0,.27-.22.17-.33.06-.35-.33-.28-.91.13-1.18.11-.08.25-.12.36-.21.62-.5,1.33-.39,1.64.31.14.31.25.31.46.14.13-.1.21-.12.35,0,.61.54.61.53,1.3.17.09-.05.17-.1.26-.15q.9-.55.48-1.51c-.08-.18-.21-.36.1-.45.04-.01.06-.12.09-.18-.07,0-.16-.01-.22,0-.16.06-.31.14-.46.21-.05-.06-.09-.11-.14-.17.13-.08.26-.17.4-.24.58-.3,1.07-.75,1.79-.8.66-.04,1.32-.23,1.97-.39.31-.07.69-.09.82-.49.04-.12.07-.29.02-.39-.1-.19-.22,0-.34.01-.22.02-.52.23-.65-.13-.13-.38-.39-.48-.74-.37-.24.07-.31-.02-.35-.24-.05-.37-.13-.71-.43-1-.43-.42-.97-.48-1.41-.05-.04.04-.08.11-.06.15.01.04.09.07.14.07.28,0,.56,0,.83.02.1.01.29.13.28.17-.04.18-.07.42-.37.34-.07-.02-.14-.07-.22-.08-.02,0-.09.1-.08.11.2.19.01.22-.11.27-.4.17-.8.33-1.19.52-.06.03-.14.16-.12.21.03.08.13.17.21.17.11,0,.24-.04.33-.1.25-.15.41-.07.52.17.03.07.08.14.12.2ZM38.65,20.55v.08s1.12,0,1.12,0c0-.03,0-.05,0-.08h-1.12ZM21.69,14.56c-.08.05-.16.09-.22.15-.65.63-1.28,1.29-1.96,1.89-.38.34-.85.58-1.27.87-.44.31-.86.63-1.29.95-.17.13-.35.25-.52.39-.08.07-.17.15-.25.22-.24.22-.45.43-.62.63-.24.3-.39.64-.5.99.14-.02.57-.37,1.11-.89,1.18-1.14,2.4-2.16,3.47-2.91.79-.55,2.08-2.02,2.04-2.29ZM25.78,19.97c-.89.48-1.2.9-.9,1.2.05.05.59-.08,1.2-.3.91-.32,1.24-.36,1.84-.23.91.2,2.94.96,3.71,1.39.79.44.91.24.13-.22-.34-.2-.62-.43-.62-.52,0-.19-.79-.61-2.32-1.24-1.68-.69-1.91-.69-3.04-.09ZM11.56,22.33c.6,0,.59,0,.62-.61,0-.11.09-.21.14-.31.08-.13.18-.25.26-.39.24-.4.16-.82.1-1.25-.05-.32-.13-.43-.43-.34-.38.12-.71.34-.87.74-.1.24-.2.47-.28.71-.1.29-.22.59-.27.89-.06.38.1.54.48.57.08,0,.16-.01.24-.02ZM17.53,23.19c-.06.09.24.16.39.16s.69-.19.69-.28-.08-.13-.17-.13-.84.16-.9.26ZM14.52,23.28c0,.28.06.4.11.26.05-.14.19-.37.31-.51.12-.14.26-.54.32-.88.08-.46.28-.74.76-1.07.36-.25.72-.45.81-.45.09,0,.77-.66,1.5-1.46,1.3-1.41,1.6-1.96.55-.98-.28.26-.81.7-1.18.98-.98.74-2.73,2.53-3.02,3.07-.07.34-.13.69-.17,1.04ZM9.42,23.13c.07.14.15.28.25.49-.44-.33-1.01-.4-1.25-1.03.43.13.56.61,1,.54,0,0,0-.01-.01-.02,0,0,0,0,0,0h0s0,0,0,0c0,0,0,.01.01.02h0s0,0,0,0c0,0,0,0,0,0ZM25.2,22.74c-.97.51-1.39,1.09-1.36,1.88.02.55.11.69.63.97.39.21.7.27.85.18.2-.12.19-.19-.08-.39-.32-.23-.32-.25,0-.69.39-.53.56-.57.71-.16.16.44.4.55,1.21.55.52,0,.82-.1,1.02-.33.25-.29.43-.32,1.28-.23.65.07,1,.04,1-.08,0-.47-2.38-1.41-3.56-1.41-.32,0-.54-.07-.48-.15.05-.08.38-.12.74-.08.76.09,3.32.88,3.55,1.11.21.2.44.2.44,0,0-.08-.14-.2-.3-.25-.17-.05-.5-.26-.73-.45-1.05-.86-3.69-1.11-4.91-.46ZM9.07,25.75c-.11,0-.23,0-.34,0v.09c.22.05.45.12.67.16.05,0,.11-.07.17-.11-.05-.05-.1-.13-.16-.13-.1,0-.2,0-.3,0h-.04ZM39.04,26.21c-.43.57-.78,1.05-1.14,1.53-.03.04-.01.1-.02.15.05,0,.13.02.16,0,.49-.43.83-.95,1-1.68ZM30.17,27.25c-.14.37.16.83.55.83.17,0,.38-.12.48-.28.26-.42.02-.84-.48-.84-.25,0-.49.12-.55.28ZM35.36,28.34c-.15.42-.28.79-.43,1.15-.02.05-.16.05-.25.08,0-.07-.04-.15-.02-.22.06-.35.12-.7.2-1.04.03-.12.11-.23.17-.34.1.12.21.23.33.36ZM13.22,30.02c.05-.04.13-.07.14-.12.09-.58.18-1.16.23-1.74.02-.21-.06-.42-.1-.64,0-.05-.06-.08-.09-.12-.03.04-.09.08-.1.11-.03.83-.05,1.67-.08,2.5,0,0-.01,0-.02.01,0,0,0,.01,0,.02-.15.22-.27.45-.18.77.29-.23.31-.48.18-.77,0,0,0,0,0,0v-.02ZM9.47,31.4s.04.08.06.13c.14-.05.28-.1.43-.14-.01-.03-.02-.07-.03-.11-.15.04-.3.08-.45.12ZM10.49,32.98s.06.05.08.08c.08-.05.17-.09.23-.15.05-.05.07-.13.11-.2-.08.02-.18.02-.24.06-.07.05-.12.14-.18.21ZM10.09,33.52c.09-.1.16-.18.24-.26-.06-.03-.14-.1-.16-.08-.08.06-.14.15-.21.23.04.03.08.07.14.12ZM12.69,33.58s.06.05.1.07c.11-.08.24-.14.32-.25.07-.09.07-.23.1-.34-.1.05-.22.07-.29.14-.1.11-.16.25-.23.38ZM20.11,33.41c-.68.6-1.32.73-1.61.33-.28-.38-.53-.18-.58.44-.06.79-.02.92.24.7.33-.28,2.41-.37,2.91-.1.31.17.9.25,1.72.1.59-.1,1.36-.13,1.74-.05.38.07,1.02.06,1.42-.02.52-.11.81-.09.99.06.21.17.25.14.25-.21,0-.23-.11-.57-.24-.75-.23-.31-.26-.32-.57-.03-.47.43-1.06.37-2.14-.2-.84-.45-.94-.69-1.63-.33-.5.26-.8.12-1.22-.1-.67-.35-.71-.34-1.28.16ZM35.92,34.69h-.01c0-.14-.06-.26-.11-.37-.05-.11-.08-.25-.19-.28-.07-.02-.2.11-.26.2-.16.27-.19.57.01.82.07.09.24.17.34.14.09-.02.17-.18.22-.28.03-.06,0-.15,0-.23ZM11.3,34.82c-.03-.05-.05-.1-.08-.16-.42.15-.84.3-1.25.46-.07.03-.12.13-.18.2.11.03.23.1.31.07.4-.18.8-.38,1.19-.58ZM9.41,23.11c-.1-.15-.2-.3-.32-.44-.09-.1-.22-.17-.29-.28-.35-.59-.7-1.19-1-1.8-.25-.51-.19-1.02.12-1.48.11.56.17,1.14.34,1.7.18.61.63,1.12,1.07,1.35-.07-.16-.1-.3-.18-.4-.6-.77-.58-1.7-.68-2.6-.05-.48.11-.99-.16-1.45-.02-.03.03-.1.05-.15.04.02.11.04.13.07.3.64.61,1.27.48,2.03-.04.26,0,.56.11.8.24.58.82.7,1.35.37.28-.17.28-.46.39-.7.08-.18.35-.31.19-.58-.11-.19-.16-.47-.31-.55-.51-.26-.46-.73-.55-1.17-.04-.2-.13-.49-.27-.55-.3-.13-.39-.26-.28-.57.04-.1.02-.24-.02-.34-.16-.44.01-.96-.35-1.35-.02-.02,0-.08,0-.11.07-.77-.09-1.55.08-2.31.02-.1-.02-.25-.09-.33-.26-.29-.33-.62-.24-.99.02-.08-.02-.18-.04-.27-.07.05-.16.09-.21.15-.5.54-.63,1.33-1.21,1.82-.09.08-.13.23-.19.35.14.03.28.06.42.08.06.01.12.02.18.03.24.04.31.19.3.42-.01.27-.2.19-.34.2-.22,0-.44-.02-.66,0-.1,0-.25.05-.3.12-.24.41-.47.83-.68,1.25-.02.04.07.18.12.19.2.02.4,0,.59,0,.5,0,1,.02,1.53.03-.17.37-.34.59-.73.57-.53-.02-1.07.05-1.6.03-.2,0-.3.03-.37.2-.15.39-.29.78-.45,1.16-.09.22,0,.28.2.28.41,0,.83.02,1.24,0,.24,0,.27.11.23.29-.05.24-.16.39-.45.37-.28-.02-.56,0-.83,0-.65,0-.83.12-1.06.71-.07.18-.1.38-.15.57-.06.23,0,.33.25.32.46-.01.91,0,1.37,0,.17,0,.37-.04.33.26-.03.24-.07.42-.38.41-.49-.02-.98-.01-1.47,0-.12,0-.31.06-.35.14-.14.32-.26.65-.34.99-.1.42-.07.46.34.45.61,0,1.22-.05,1.84-.07.34,0,.41.11.34.43-.06.25-.21.31-.43.3-.53,0-1.06,0-1.6,0-.77-.01-.77-.12-.84.83,0,.06,0,.12,0,.18,0,.45.01.47.47.47.62,0,1.23.01,1.85,0,.23,0,.3.09.31.31.01.26-.08.36-.33.35-.7,0-1.39,0-2.09,0-.24,0-.38.06-.39.32-.02.39-.04.78-.05,1.18,0,.21.11.27.3.27.56-.01,1.11-.03,1.67-.03.4,0,.79.01,1.19.04.26.01.5.27.46.51-.04.27-.29.13-.43.14-.8.02-1.59,0-2.39.01-.29,0-.64-.05-.86.09-.13.08-.06.47-.09.73,0,.08-.06.15-.08.22-.07.48-.01.56.47.57.74,0,1.47,0,2.21,0,.28,0,.55.04.86.06-.37.51-.8.64-1.34.6-.6-.04-1.21,0-1.82-.02-.33-.01-.42.13-.39.42.04.33.09.67.11,1,0,.21.1.27.29.27.42,0,.84,0,1.25,0,.09,0,.23.09.24.15.03.27-.17.48-.45.5-.16.01-.32,0-.48,0q-.86,0-.82.86c.01.28.03.59.35.69.31.1.17.23.08.38-.1.18-.28.36-.29.55-.05.78.24,1.02,1.02.92.08,0,.15-.05.23-.06.88-.14,1.75-.35,2.63-.39.82-.03,1.58-.31,2.32-.55,1.27-.41,2.2-1.36,2.96-2.46.07-.09.08-.22.12-.34-.22.1-.34.25-.46.4-1.1,1.38-2.51,2.19-4.26,2.45-.84.12-1.67.29-2.51.44-.45.08-.89.16-1.34.25.22-.28.46-.6.75-.66.61-.13,1.21-.3,1.86-.3.68,0,1.36-.18,2.03-.34.38-.09.75-.26,1.03-.58-.97.3-1.94.55-2.97.51.58-.25,1.17-.46,1.76-.65.31-.1.66-.13.96-.27.44-.2.85-.48,1.27-.72.09-.05.27-.13.28-.12.17.31.32.05.4-.05.11-.12.17-.3.25-.46-.38-.18-.02-.36.01-.54.02-.11.07-.22.11-.32-.69.89-1.6,1.46-2.53,1.97-.83.46-1.77.55-2.69.67-.26.03-.58-.2-.83-.36-.04-.03.08-.34.16-.52.16-.38.31-.76.5-1.12.15-.27.35-.51.55-.75.45-.53.71-1.32,1.65-1.25.19.01.39-.36.61-.4.22-.04.47.23.76-.01-.64-.17-.46-.91-.88-1.24,0,0,.02-.08.05-.09.21-.08.14-.13-.01-.19-.52-.21-.86-.62-1.23-1.01-.3-.32-.46-.69-.18-1.13.13.06.25.13.38.17.06.02.15-.02.22-.04-.02-.07-.05-.13-.06-.2-.06-.32-.28-.51-.53-.68-.18-.12-.32-.29-.48-.44-.28-.26.08-.51,0-.77.17-.04.33-.11.5-.1.15,0,.3.09.44.16.4.2.79.46,1.21.62.38.14.81.18,1.21.24.08.01.17-.05.26-.08-.06-.09-.1-.2-.18-.28-.1-.09-.27-.11-.33-.21-.29-.51-.45-.66-.94-.78ZM34.27,35.61c-.04-.11.19-1.16.35-1.49.23-.49.29-.97.16-1.49-.06-.25-.05-.51-.06-.76,0-.06.07-.12.11-.18.07.05.19.09.21.16.05.15.05.31.05.47,0,.24-.03.48.02.71.03.14.17.27.27.39.18.23.41.42.54.67.17.33.21.72.39,1.04.24.44-.05.72-.2,1.05-.17.36-.5.4-.85.43-.3.03-.52-.09-.63-.34-.1-.23-.29-.41-.37-.66ZM9.36,35.99c-.91.05-1.57.58-2.26,1.06-.05.03-.04.13-.07.2.07,0,.15.02.2-.01.71-.41,1.42-.83,2.12-1.25ZM6.28,36.71s.08.09.11.14c-.13.11-.27.22-.4.34-.05.05-.07.12-.11.19.08-.01.18,0,.25-.03.95-.59,1.74-1.44,2.85-1.78.05-.02.08-.12.12-.18-.07-.02-.19-.08-.21-.06-.3.33-.83.1-1.12.53-.13.19-.54.2-.82.28-.96.25-1.83.85-2.21,1.56.53-.34,1.03-.66,1.53-.98ZM20.34,36.73c0,.46.34.68,1.42.9.86.17,1.03.16,1.74-.19.53-.26.78-.49.78-.72,0-.3-.07-.32-.64-.2-.8.17-1.45.17-2.49.01-.72-.11-.81-.09-.81.2ZM4.53,38.01c-.06-.05-.11-.11-.13-.1-.08.05-.15.11-.22.16.03.04.08.11.09.1.08-.04.16-.09.26-.17ZM5.77,38.88s-.08-.06-.12-.09c-.48.32-.67.85-.9,1.35-.03.06-.01.16,0,.23.01.05.07.13.1.13.06,0,.15-.04.18-.09.25-.51.49-1.02.73-1.53ZM7.62,40.28c-.12.03-.25.06-.37.09-.63.14-1.26.31-1.9.39-.4.05-.4-.02-.25.34.07.16.08.28.32.13.2-.13.48-.12.73-.18.55-.13,1.07-.33,1.48-.77ZM13.48,39.76c-.07-.17-.1-.34-.21-.44-.05-.05-.26.03-.36.1-.34.25-.67.52-1,.79-.31.24-.74.42-.89.73-.19.41-1.83,2.1-2.09,2.4-.53.6-1.04,1.22-1.56,1.84-.09.1-.21.19-.28.3-.07.11-.18.29-.13.38.21.4.45.78.71,1.15.1.14.23.11.32-.05.13-.24.26-.49.41-.72.37-.53.76-1.05,1.13-1.58.23-.34.44-.7.67-1.03.14-.21.35-.37.47-.59.34-.58.67-1.15,1.19-1.6.49-.42.93-.89,1.39-1.35.09-.09.15-.22.22-.33ZM14.89,38.31s-.07.04-.09.07c-.13.16-.22.36-.29.56-.2.56-.36,1.13-.57,1.68-.43,1.17-.48,2.36-.24,3.56.15.73.39,1.44.58,2.16.25.93.6,1.85.63,2.83,0,.25.05.51.09.76.15.79.31,1.58.47,2.38-.09.55-.18,1.09-.27,1.63-.01.08,0,.21.04.24.34.21.68.4,1.04.58.13.06.27.03.28-.18,0-.42.07-.84.03-1.25-.08-.92-.21-1.84-.32-2.75-.2-1.69-.83-3.25-1.41-4.82-.33-.89-.56-1.79-.47-2.72.11-1.18.31-2.36.67-3.5-.05-.32-.11-.72-.16-1.21ZM16.46,34.86c.15.45.31.88.49,1.29,1.16,2.63,2.84,4.17,3.26,4.5,1.05.82,2.91.67,4.21.63,1.2-.04,2.11-.49,3.11-1.21.38-.28.85-.41,1.28-.6.21-.09.42.14.36.38-.02.09-.09.18-.15.25-.51.62-1.05,1.23-1.53,1.87-.56.75-.82,1.14-.67,1.77.21.86,1.6,4.31,1.77,4.94.71,2.57,1.78,6.04-1.7,3.14-.9-.75-2.92-3.04-4.38-4.59-.65-.69-2.49-2.44-2.7-2.67-.71-.78-1.12-1.75-1.62-2.66-.23-.42-.53-.82-.85-1.3-.08.35,1.01,2.9,1.25,3.28.93,1.49,9.59,10.75,10.25,11.45.25.26.49.52.73.78.36.39.28.63-.2.77-1.12.34-2.28.35-3.43.48-.41.05-.83.12-1.24.11-.75-.02-1.5-.1-2.25-.15-.33-.02-.56-.28-.92-.31-.63-.06-1.24-.23-1.86-.39-.34-.09-.65-.25-.99-.34-1.3-.35-2.53-.89-3.73-1.48-1.04-.51-2.03-1.13-3-1.76-.54-.35-1.04-.79-1.5-1.24-.61-.59-1.22-1.19-1.73-1.86-1.18-1.58-2.5-3.06-3.21-4.96-.21-.55-.54-1.06-.75-1.61-.25-.66-.42-1.34-.63-2.01-.2-.64-.43-1.27-.63-1.9-.08-.26-.11-.53-.16-.8-.01-.08,0-.16-.03-.24-.63-1.81-.74-3.71-1.03-5.58-.02-.12-.02-.24-.02-.36,0-1.25-.04-2.49,0-3.74.05-1.87.15-3.75.54-5.59.15-.7.21-1.42.45-2.09.51-1.47.75-3.02,1.45-4.42.47-.93.81-1.91,1.26-2.85.22-.47.47-.93.8-1.35.33-.43.55-.94.84-1.41.52-.86,1.2-1.57,1.96-2.23.41-.36.78-.77,1.16-1.18.63-.69,1.37-1.24,2.14-1.76.77-.52,1.61-.91,2.4-1.37,1.53-.89,3.21-1.29,4.87-1.78.83-.25,1.66-.32,2.51-.36.76-.04,1.52-.23,2.28-.28.59-.04,1.18.08,1.77.05.63-.03,1.26-.17,1.83.2.75-.14,1.36.34,2.04.49,1.14.26,2.26.67,3.33,1.17.89.42,1.79.83,2.67,1.26.34.16.64.39.96.59.15.1.28.23.44.31,1.09.53,1.88,1.43,2.68,2.28,1.33,1.43,2.52,2.98,3.5,4.68.45.78.8,1.63,1.17,2.46.29.66.54,1.34.79,2.02.11.31.17.64.27.96.11.38.23.75.34,1.12.6,2.09,1,4.21,1.23,6.37.07.71.09,1.42.1,2.13.02.83.04,1.67,0,2.5-.06,1.35-.1,2.71-.29,4.06-.17,1.22-.34,2.43-.68,3.62-.32,1.12-.61,2.24-.99,3.33-.33.95-.76,1.86-1.18,2.78-.33.73-.64,1.47-1.04,2.15-.58.97-1.22,1.91-1.88,2.83-.25.35-.61.61-.92.91-.5.5-1.02.98-1.5,1.5-.19.21-.28.21-.41-.04-.41-.76-5.17-8.62-5.42-9.19-.57-1.27-.97-2.59-1.13-3.96-.06-.53.11-1.09.21-1.64.02-.1.16-.19.25-.28.07.1.15.19.21.29.03.06.36.78.41,1.09.17,1.08.92,1.58,1.84,1.95.62.25,5.41,5.33,5.78,6.03.26.48.5.97.77,1.49.13-.27.26-.51.36-.76.04-.1.03-.24,0-.34-.27-.7-6.74-6.79-7.39-7.08-.12-.05-.22-.13-.41-.25.17-.03.25-.06.32-.05,1.68.36,3.35.73,4.96,1.37,1.46.58,2.82,1.32,4.12,2.18.39.26.42.25.68-.16.01-.02.03-.03.03-.05.12-.35.41-.76.32-1.05-.12-.38-.63-.17-.95-.15-.76.05-1.37-.27-2.08-.68.21-.02.33-.04.45-.04.87,0,1.75,0,2.62,0,.16,0,.42-.08.45-.18.12-.42.19-.85.25-1.28,0-.05-.11-.15-.18-.17-.17-.04-.35-.05-.53-.05-1.43,0-2.85-.01-4.28,0-.69,0-1.37.07-2.06.07-.71,0-1.42-.03-2.14-.06-.28-.01-.57-.26-.89-.71.23,0,.42,0,.61,0,1.31,0,2.62,0,3.93,0,1.8,0,3.6,0,5.4.03.3,0,.49-.08.61-.35.03-.07.09-.13.12-.21.28-.81.15-.96-.71-.96-1.51.01-3.02-.01-4.53-.01-1.11,0-2.23.02-3.34.02-.11,0-.3-.06-.31-.12-.05-.23.16-.57.33-.57,1.12,0,2.25,0,3.37,0,1.13,0,2.27,0,3.4,0,.57,0,1.14,0,1.71,0,.29,0,.41-.11.44-.41.1-1.02.07-1.07-.94-1.07-2.6,0-5.21,0-7.81,0-.16,0-.37.06-.46-.02-.19-.17-.32-.41-.47-.63.17-.03.33-.08.5-.09.47-.01.94,0,1.41,0,1.62,0,3.24-.02,4.86-.01.7,0,1.41.06,2.11.08.24,0,.48-.01.71-.03.23-.02.33-.13.34-.38.08-1.16.09-1.15-1.04-1.15-1.57,0-3.14-.02-4.71-.03-1.47,0-2.94,0-4.41,0,0-.66,0-.67.62-.67,2.19,0,4.37,0,6.56,0,.85,0,1.7,0,2.54,0,.52,0,.57-.06.55-.57,0-.21.02-.43.05-.65.03-.24-.01-.38-.3-.38-1.11,0-2.21,0-3.32,0-1.14-.01-2.29-.04-3.43-.06-.2,0-.39.04-.59.04-.24,0-.48-.02-.82-.04.51-.48.94-.7,1.56-.69,2.12.04,4.25.02,6.38.02.1,0,.2,0,.3,0,.22,0,.25-.14.23-.32-.03-.25-.08-.51-.08-.76,0-.51,0-.52-.53-.52-1.71,0-3.42,0-5.13,0-.16,0-.32-.07-.48-.1.11-.18.2-.38.35-.54.06-.06.22-.04.34-.04,1.61,0,3.21.02,4.82.02.49,0,.49-.01.49-.5,0-.14.02-.28,0-.41-.11-.81-.12-.81-.95-.81-1.35,0-2.7,0-4.05-.01-.09,0-.18-.05-.27-.08.05-.08.09-.16.15-.24.2-.27.46-.38.81-.38,1.01.02,2.03,0,3.04-.02.26,0,.51,0,.76-.05.1-.02.18-.15.26-.24.01-.01-.02-.07-.03-.11-.08-.32-.07-.7-.25-.96-.21-.31-.63-.11-.95-.12-.63-.02-1.26.02-1.89,0-.13,0-.26-.11-.38-.17.12-.17.22-.46.35-.47.57-.06,1.15-.1,1.71-.05,1.12.1,1.26-.07.93-1.15-.11-.35-.28-.43-.59-.43-.58,0-1.15,0-1.73,0-.24,0-.36-.06-.35-.34,0-.28.11-.33.35-.33.51,0,1.02,0,1.54-.01.33,0,.39-.08.33-.4-.03-.17-.1-.34-.15-.51-.18-.65-.21-.67-.9-.65-.3,0-.6.02-.89-.01-.14-.01-.29-.1-.38-.21-.09-.11-.12-.28-.17-.42.13-.02.27-.05.4-.05.4,0,.8,0,1.19,0,.21,0,.31-.08.22-.28-.19-.41-.37-.83-.59-1.22-.04-.08-.25-.09-.38-.1-.54-.01-1.07,0-1.61,0-.14,0-.38.06-.34-.19.03-.18.01-.47.34-.46.37,0,.75-.01,1.12,0,.47.01.61-.11.48-.55-.09-.3-.26-.58-.44-.83-.2-.29-.55-.16-.82-.17-.28,0-.38-.1-.43-.36-.04-.22.03-.3.23-.31.1,0,.2,0,.3,0,.17,0,.25-.04.16-.25-.19-.5-.57-.85-.9-1.24-.15-.17-.34-.33-.43-.53-.26-.57-.68-1.01-1.2-1.54.04.22.03.33.08.41.43.78.6,1.62.62,2.5,0,.29.02.58.1.86.17.64-.09,1.19-.37,1.7-.34.64-.78,1.22-1.18,1.82-.19.05-.37.09-.56.15-.03,0-.06.1-.05.14.02.04.1.1.13.09.18-.09.36-.2.54-.31.78-.4,1.53-.22,1.98.3.26.3.35.74.5,1.13.36.96.17,1.95-.05,2.89-.2.85-.42,1.72-.98,2.46-.22.29-.44.55-.82.69-.16-.74-.26-1.52-.91-2.06.06.18.1.37.18.55.54,1.25.65,2.49.19,3.81-.22.61-.44,1.18-.9,1.63-.56.56-1.26.69-2.03.59-.34-.05-.36-.29-.35-.57-.04,0-.09,0-.13.01-.02.15-.03.31-.05.46-.03.36-.08.69-.46.9-.14.07-.19.29-.3.42-.05.05-.15.06-.23.08-.01-.09-.06-.19-.03-.25.07-.16.19-.3.26-.46.08-.16.14-.33.18-.5.15-.57.36-1.14.4-1.71.04-.68-.06-1.37-.12-2.05-.02-.18-.15-.24-.27-.05-.11.18-.21.37-.3.56-.25.54-.48,1.08-1.07,1.35-.27.13-.53.17-.78,0-.26-.19-.26-.49-.2-.76.12-.6.32-1.18.43-1.78.13-.69.31-1.4.26-2.09-.05-.77-.26-1.55-.87-2.15-.16-.16-.18-.45-.29-.75,1.28.52,2.33.19,3.31-.53-.01-.04-.03-.09-.04-.13-.17.07-.33.15-.5.22-.18.07-.36.15-.55.21-.2.06-.41.1-.66.09.86-.56,1.54-1.25,1.92-2.23-.39.31-.79.61-1.16.94-.54.48-1.15.82-1.83,1.06-.28.1-.45.1-.51-.24-.02-.1-.14-.19-.26-.35.26-.04.46-.08.66-.09.38,0,.72-.11.95-.43-.09-.02-.18-.04-.27-.06-.07-.02-.15-.03-.22-.04.04-.08.06-.18.11-.24.28-.31.57-.6.84-.92.15-.18.27-.39.38-.6.02-.04-.04-.13-.06-.2-.05.03-.12.04-.15.08-.08.11-.14.24-.22.35-.19.25-.37.52-.77.43-.09-.02-.21.09-.32.14.06-1.11.58-2.22.08-3.35,0,.42,0,.85,0,1.27.02.85-.32,1.56-.83,2.23-.31.41-.74.63-1.16.88-.48.28-.88.14-1.14-.38-.14-.28-.27-.4-.64-.34-.53.09-.96-.28-1.3-.61-.47-.45-.8-1-1-1.67l-.02-.06c-.05-.05-.08-.09-.09-.13-.4-1.2-.75-1.73-1.14-1.73-.13,0-.5.27-.83.59-.04.04-.08.07-.12.11,0,.01,0,.02-.01.04-.03.11-.18.2-.3.27-.23.15-.46.31-.71.44-.37.2-.74.38-1.12.56-.47.27-.94.6-1.2.84-1.41,1.33-3.32,3.24-3.32,3.33,0,.05.33.11.74.13.8.04,2.18.57,2.52.98.12.14.17.37.12.5-.11.28-1.38.1-2.21-.31-.61-.31-1.86-.12-2.38.34-.3.27-1.43,1.96-1.31,1.96.03,0,.35-.15.72-.34.49-.25,1.01-.34,1.93-.34.8,0,1.22-.06,1.15-.17-.06-.09-.45-.17-.87-.17s-.76-.07-.76-.16.43-.13.95-.09c2.69.18,3.3,2.89,1.38,6.16-.54.93-.57,1.73-.07,2.27.49.52,1.02.5,1.69-.06.52-.44.57-.45,1.39-.24.95.24,1.44.04,1.26-.51-.05-.17-.02-.35.07-.41.09-.06.22.24.29.69.17,1.16-.33,1.51-1.7,1.18-.31-.07-.82,0-1.4.19-.85.29-.94.29-1.35.03-.24-.16-.68-.3-.98-.33-.57-.04-1.02-.5-1.02-1.05,0-.29.02-.3.28-.04.23.23.31.24.43.06.08-.12.15-.38.15-.57,0-.36.09-.53,1.1-2.31.7-1.22.92-1.96.63-2.14-.1-.06-.43.16-.73.5-.51.58-1.52,1.25-1.52,1.01,0-.06.23-.37.51-.7.8-.91.59-1.61-.28-.93-.52.41-1.07.44-2.03.1-.6-.21-.78-.21-1.54.04-.48.15-.96.4-1.07.55-.05.06-.09.24-.12.51.07.23.08.48.03.73-.05.28-.02.58-.05.87-.02.26-.05.52-.08.78,0,1.91.49,3.11,1.61,6.55ZM1.01,31.59s.02,0,.04,0c.02.21.05.43.07.65.07.67.15,1.34.2,2.01.11,1.49.23,2.99.68,4.43.1.32.18.64.27.96.14.47.27.95.43,1.41.15.44.36.87.49,1.31.5,1.7,1.25,3.28,2.18,4.78.24.38.54.73.8,1.1.5.7.96,1.44,1.51,2.1.45.54.82,1.13,1.39,1.61.7.59,1.27,1.34,2.05,1.86.49.33.97.68,1.47,1,.5.32,1.01.63,1.52.93.34.2.69.37,1.04.55.21.11.41.23.63.32.41.16.85.25,1.25.43,1.21.55,2.46.95,3.79,1.08.26.03.51.17.77.2.84.09,1.69.18,2.54.21,1.14.04,2.29.06,3.43,0,.65-.03,1.29-.2,1.92-.38,1.12-.33,2.27-.6,3.37-1.02.88-.34,1.75-.72,2.65-1.02,1.16-.39,2.08-1.17,3.06-1.84.39-.27.78-.55,1.15-.84.31-.24.61-.49.89-.77.39-.39.84-.76,1.11-1.23.27-.46.62-.8.99-1.15.1-.1.19-.2.27-.31.42-.56.82-1.15,1.27-1.68.68-.79,1.01-1.77,1.5-2.66.54-.98.86-2.06,1.33-3.08.42-.9.64-1.9.93-2.85.15-.47.28-.95.4-1.43.16-.65.3-1.31.43-1.97.17-.83.07-1.69.23-2.5.2-1.02.18-2.04.21-3.06,0-.22,0-.44.04-.65.12-.9,0-1.8-.05-2.7-.07-1.07-.18-2.13-.31-3.19-.12-1-.22-2-.45-2.97-.29-1.22-.67-2.42-1.1-3.6-.41-1.11-.82-2.22-1.32-3.3-.61-1.35-1.47-2.52-2.29-3.73-.1-.15-.24-.26-.35-.4-.12-.15-.23-.3-.34-.45-.45-.6-.88-1.22-1.34-1.81-.13-.17-.36-.25-.5-.41-.62-.69-1.27-1.35-2.04-1.89-.45-.32-.91-.63-1.38-.93-.51-.33-1.03-.66-1.56-.97-.37-.22-.76-.4-1.14-.59-.19-.1-.38-.2-.59-.28-.42-.16-.84-.29-1.26-.44-.88-.3-1.75-.62-2.63-.9-.38-.12-.83-.05-1.14-.39-.05-.05-.18-.03-.28-.03-.49,0-.98.02-1.46-.02-1.16-.1-2.32-.25-3.49-.16-.53.04-1.08-.04-1.6.05-.9.15-1.78.36-2.67.59-.39.1-.76.38-1.15.42-.48.05-.92.17-1.36.36-.94.41-1.9.77-2.85,1.15-.37.15-.76.25-1.09.47-.67.44-1.31.93-1.95,1.4-.21.15-.38.36-.61.48-.62.34-1.12.8-1.56,1.35-.27.34-.66.6-.86.97-.19.34-.43.6-.7.86-.19.18-.37.36-.53.56-.42.54-.8,1.11-1.24,1.64-.69.81-1.05,1.79-1.51,2.72-.48.97-.92,1.96-1.31,2.97-.36.91-.64,1.86-.93,2.8-.24.78-.47,1.56-.63,2.35-.19.91-.31,1.83-.43,2.74-.05.34.06.72-.03,1.04-.18.62-.17,1.24-.18,1.87-.03,1.3-.05,2.6-.07,3.9ZM27.17,59.46c-.5-.02-1.03-.04-1.55-.05-.39,0-.78,0-1.17,0-.57,0-1.14.02-1.71-.04-.52-.06-1.03-.22-1.55-.33-1-.21-2.02-.37-3.01-.62-.74-.19-1.46-.46-2.17-.74-.72-.28-1.47-.56-2.12-.96-.44-.27-.9-.48-1.35-.71-.17-.09-.31-.24-.44-.39-.15-.16-.24-.38-.52-.31-.04.01-.13-.03-.15-.07-.38-.62-1.17-.71-1.63-1.25-.44-.51-.92-.98-1.42-1.42-.88-.77-1.49-1.77-2.23-2.66-.53-.64-.93-1.4-1.37-2.11-.34-.54-.67-1.09-.98-1.64-.23-.41-.42-.85-.63-1.27-.19-.39-.4-.77-.56-1.17-.22-.58-.4-1.17-.6-1.76-.28-.83-.67-1.65-.82-2.51-.1-.57-.31-1.09-.4-1.65-.12-.72-.26-1.44-.37-2.17-.05-.31-.05-.63-.07-.94-.04-.64-.06-1.29-.11-1.93-.02-.25-.1-.5-.13-.75-.04-.36-.09-.72-.1-1.08-.01-.84-.01-1.69,0-2.54.01-.37.11-.74.15-1.11.12-1.34.21-2.69.36-4.03.06-.56.25-1.11.39-1.66.13-.55.26-1.11.4-1.66.1-.37.23-.73.34-1.11.07-.24.09-.5.17-.73.1-.29.25-.56.36-.85.18-.48.32-.97.51-1.44.2-.49.43-.96.65-1.44.29-.62.59-1.24.89-1.86.61-1.25,1.47-2.33,2.32-3.42.43-.55.95-1.03,1.3-1.66.3-.54.83-.91,1.31-1.31.14-.12.27-.26.42-.38.43-.37.86-.73,1.3-1.09.23-.19.46-.37.7-.53.37-.25.73-.51,1.12-.72.56-.31,1.15-.58,1.73-.86.1-.05.2-.12.31-.15.76-.24,1.5-.54,2.21-.92.24-.12.53-.13.79-.21.96-.29,1.9-.64,2.88-.86.9-.2,1.83-.31,2.76-.37,1-.06,2.01-.04,3.02-.02.91.01,1.8.2,2.69.37.83.16,1.66.29,2.49.47.5.11.99.27,1.48.42.59.19,1.18.4,1.77.61.18.07.35.17.52.26.78.41,1.5.92,2.33,1.22.2.07.37.23.52.38.19.19.31.48.65.42.02,0,.05,0,.06.02.52.69,1.44.87,1.95,1.59.3.43.74.76,1.14,1.11.66.58,1.13,1.3,1.68,1.97.74.9,1.32,1.9,1.96,2.86.7,1.07,1.36,2.15,1.76,3.37.08.24.23.46.37.67.37.57.38,1.26.61,1.87.29.77.63,1.53.79,2.33.11.54.24,1.07.4,1.59.23.75.14,1.54.38,2.29.1.29.05.62.07.93.03.64.06,1.29.1,1.93.02.25.1.5.14.75.04.36.09.72.09,1.08,0,.51-.09,1.02-.06,1.53.05.97-.09,1.93-.2,2.88-.07.66-.03,1.33-.11,1.99-.08.72-.23,1.43-.37,2.14-.17.83-.36,1.65-.56,2.47-.09.37-.23.73-.34,1.1-.06.22-.11.45-.16.67-.02.09,0,.21-.06.28-.45.64-.52,1.43-.83,2.13-.2.44-.42.88-.63,1.32-.3.64-.6,1.28-.91,1.92-.62,1.27-1.48,2.37-2.37,3.45-.42.51-.8,1.06-1.2,1.59-.38.49-.83.92-1.32,1.3-.16.13-.3.29-.46.43-.43.37-.86.73-1.3,1.08-.21.17-.47.3-.65.5-.34.38-.81.52-1.24.74-.21.11-.44.18-.64.31-.61.4-1.27.69-1.94.94-.51.19-1,.44-1.51.65-.2.08-.41.14-.61.2-.32.1-.64.19-.96.28-.24.07-.49.13-.74.19-.25.06-.51.09-.75.19-1.03.45-2.13.49-3.24.63Z\"/>\n  </g>\n</svg>",
    13: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50.32 59.47\">\n  <g>\n    <path class=\"cls-1\" d=\"M24.75,3.71c-.08-.04-.13-.09-.17-.08-.44.16-.88.32-1.32.5-.04.02-.06.09-.09.14.07.02.15.06.2.04.39-.14.78-.29,1.16-.44.07-.03.12-.09.21-.16ZM26,4.3c0,.05,0,.1,0,.15.05.02.11.07.16.06.53-.13,1.06-.27,1.59-.4.02,0,.04-.02.04-.04.02-.03.04-.07.04-.1,0-.03-.06-.07-.08-.06-.58.13-1.16.26-1.75.4ZM33.5,6.52s.02-.1.04-.15c-.4-.11-.8-.23-1.2-.33-.26-.07-.56-.06-.8-.18-.81-.42-1.58.01-2.36.09-.08,0-.14.15-.2.24.09.06.17.16.27.19.11.03.24.02.35-.03.57-.23.56-.23,1.07-.18-.17.03-.34.04-.51.06-.05,0-.1.06-.15.09.05.06.09.15.15.16.09.02.2,0,.29-.01.69-.15,1.39-.22,2.09-.09.32.06.65.09.97.13ZM23.73,5.06c-.29.13-.58.25-.86.38-.07.03-.17.12-.16.16.1.41-.26.48-.47.62-.42.29-.88.52-1.3.8-.08.05-.09.22-.14.34.11-.02.22-.02.32-.05.05-.01.09-.07.14-.1.52-.35,1.05-.69,1.57-1.04.33-.22.65-.44.96-.67.17-.13.2-.28-.05-.38.38-.04.75-.08,1.22-.14-.54-.39-.92-.28-1.26.1ZM38.19,7.6c.02-.05.04-.1.06-.15-.17-.08-.33-.21-.5-.22-.43-.02-.86,0-1.29.03-.05,0-.09.15-.14.23.08.04.16.11.24.12.54,0,1.09,0,1.63,0ZM32.69,8.47c.26.03.52.06.78.09.26.03.52.06.78.09-.49-.39-1.03-.19-1.55-.17ZM31.32,8.59c-.11.07-.2.12-.28.18.09.06.18.14.28.16.07.01.16-.07.24-.11-.07-.07-.15-.14-.24-.23ZM39.99,9.85l.02-.11c-.16-.06-.31-.14-.48-.19-.04-.01-.15.06-.16.1,0,.06.05.18.08.18.17.02.35,0,.52,0ZM26.86,9.98s.04.09.06.13c.84-.37,1.68-.74,2.53-1.11-.93.17-1.85.36-2.58.98ZM21.5,11.73c.31-.28.64-.58.98-.89.34-.31.69-.63,1.03-.94-.98.36-1.83.85-2.01,1.83ZM36.32,11.85c.78-.32,1.53-.65,2.29-.95.35-.14.17-.4.17-.6,0-.21-.17-.25-.35-.2-.34.1-.68.2-1.01.32-.6.21-1.19.44-1.07,1.27,0,.05-.02.11-.03.16ZM12.42,12.16c.35-.47.79-.83,1.25-1.16.46-.33.94-.63,1.37-1-.97.6-2.11.99-2.62,2.16ZM24.68,12.25l.08.09c.07-.08.15-.16.21-.25.03-.04,0-.1.01-.16-.04.03-.09.06-.13.1-.06.07-.12.15-.18.22ZM37.18,12.73c.35-.08.67-.16.99-.23.31-.07.61-.15.92-.22-.65-.09-1.31-.19-1.9.45ZM21.1,12.83l-.12-.07c-.08.29-.17.58-.25.87,0,.04.05.09.08.14.04-.03.11-.06.12-.1.07-.28.12-.56.18-.84ZM23.52,13.93c.24-.08.43-.22.53-.47.06-.14.16-.27.23-.41.05-.11.09-.22.13-.33-.11.07-.25.11-.32.21-.14.21-.24.45-.36.67-.06.11-.13.22-.2.33h0s0,0,0,0c-.04.29-.08.57-.12.86.11-.28.4-.55.12-.86h0s0,0,0,0ZM14.25,14.24c.16.31.61.64.8.6.03,0,.05-.04.08-.07-.21-.16-.42-.32-.64-.47-.05-.04-.14-.04-.24-.06ZM17.35,16.17s.08-.08.12-.12c-.23-.39-.37-.87-1.01-.96.33.4.61.74.88,1.08ZM18.85,16.38s.08-.03.12-.04c-.07-.28-.12-.57-.2-.85-.16-.6-.33-1.21-.73-1.71-.13-.17-.31-.3-.48-.43-.04-.03-.16,0-.2.04-.04.04-.06.16-.03.21.23.37.48.73.73,1.09.08.11.16.23.21.35.2.45.39.9.59,1.35ZM13.59,15.56c-.07.03-.15.06-.22.1.08.04.15.1.24.13.65.22,1.31.41,1.95.65.4.15.76.39,1.15.59.06.03.14.02.2.03,0-.09.01-.2-.03-.27-.05-.07-.17-.1-.25-.15-.21-.13-.47-.23-.62-.42-.18-.21-.38-.24-.61-.27-.25-.03-.5-.06-.74-.12-.35-.08-.69-.18-1.05-.28ZM20.11,17.88s.05.04.08.06c.25-.28.5-.56.74-.86.03-.04-.01-.14-.02-.21-.08.02-.21.02-.24.07-.19.3-.37.62-.55.93ZM24.5,7.27c-.5.14-.86.21-1.21.35-1.34.53-2.49,1.34-3.55,2.32-.76.7-1.2,2.2-.67,3.34.21.45.28.92.29,1.36.02.61.18,1.18.26,1.76.04.3,0,.63-.08.93-.07.26-.14.59-.52.62-.05,0-.09.11-.14.17.09.02.19.07.27.04.59-.2,1.21-1.28,1.11-1.95-.05-.33-.17-.66-.17-.99,0-.61-.23-1.21-.03-1.82.15-.46.24-.95.33-1.43.13-.68.46-1.25.96-1.71.5-.46,1.06-.87,1.63-1.26.62-.43.99-1.04,1.51-1.74ZM18.83,18.74c-.08-.07-.17-.14-.26-.21-.01.03-.04.08-.03.1.08.08.16.16.24.24.01-.03.02-.07.04-.13ZM12.18,19.58c.23-.03.43-.04.63-.08.04,0,.1-.08.09-.11-.01-.04-.08-.11-.11-.1-.21.03-.42.08-.63.12-.03,0-.06.07-.06.09.03.04.07.07.08.08ZM23.25,18.68c-.55.89-1.38,1.33-2.37,1.5.74-.51,1.48-1.01,2.22-1.51.03-.02.1,0,.15,0ZM21.02,20.82c.55,0,1.51-.37,1.69-.64-.19.05-.41.07-.59.16-.36.19-.84.09-1.11.48ZM21.02,20.82s-.01,0-.02,0c0,0,0,0-.01,0,0,0,.01,0,.02,0,0,0,0,0,0-.01ZM20.99,20.83c-.23-.04-.46-.17-.74.08.3.07.53.09.74-.08ZM18.83,21.53s.02-.08.04-.11c-.38-.11-.76-.22-1.14-.35-.24-.08-.48-.16-.7-.28-.83-.44-1.65-.91-2.48-1.35-.13-.07-.3-.05-.45-.08.08.2.17.33.29.36.83.18,1.5.68,2.2,1.12.69.43,1.47.59,2.26.69ZM19.42,21.86s0-.05,0-.07h-1.06v.07h1.06ZM15.67,22.07c.49.14.97.29,1.46.43-.44-.34-.9-.57-1.46-.43ZM40.98,22.38c-.09-.12-.15-.19-.21-.27-.07.1-.2.19-.21.29,0,.11.1.22.16.34.08-.11.16-.22.26-.36ZM27.23,22.56c0,.14-.91.57-1.1.73-.15.13-.39.21-.59.22-.12,0-.3-.16-.36-.3-.03-.07.11-.28.21-.33.38-.19.79-.35,1.18-.51.22-.09.64.03.65.19ZM40.12,26.29c.07-.1.13-.14.14-.2.15-.74.29-1.49.43-2.24.02-.09-.01-.19-.03-.29,0-.02-.07-.04-.1-.04-.03,0-.09.06-.09.06.22.36-.14.61-.18.91-.07.56-.11,1.12-.18,1.78ZM26.38,23.99c.64.11,1.29.19,1.92.35.33.09.53-.08.78-.17.04-.02.07-.12.08-.19.02-.11,0-.23.04-.34.04-.16.18-.33.15-.46-.03-.11-.24-.17-.38-.25-.08-.05-.21-.08-.25-.15-.21-.42-.52-.5-.93-.3-.06.03-.17-.05-.25-.08.07-.05.13-.14.21-.15.27-.03.54-.03.81-.05.05,0,.12-.04.14-.08.01-.03-.03-.09-.07-.13-.02-.03-.07-.04-.11-.05-1.01-.2-2.01-.54-3.06-.23-.04.01-.08.03-.11.03-.25-.04-.55.12-.75-.17.19-.18.36-.43.59-.53,1.15-.48,2.36-.6,3.61-.52,1.36.09,2.42.86,3.58,1.41.29.13.54.33.82.48.22.11.29.29.21.49-.1.25-.23.5-.4.71-.12.17-.32.24-.51.05-.05-.05-.14-.08-.21-.11-.35-.14-.43-.1-.44.27,0,.37.04.75.03,1.12,0,.21-.08.41-.14.61-.01.04-.1.08-.14.07-.04,0-.08-.08-.09-.13,0-.22,0-.44,0-.65,0-.11-.02-.31-.06-.32-.15-.03-.39-.06-.45.02-.12.18-.17.41-.2.63-.02.12.12.27.08.37-.07.18-.18.37-.33.48-.47.34-.97.62-1.6.47-.11-.03-.23-.01-.34-.02-.5-.04-.98-.1-1.31-.55-.49-.67-1.19-1.09-1.94-1.41-.07-.03-.18-.03-.21-.09-.05-.07-.07-.18-.06-.27,0-.05.11-.11.17-.12.38-.01.75,0,1.13,0v-.06ZM36.53,25.72c-.11.07-.2.13-.29.19.07.07.12.18.21.22.34.16.69.29,1.03.44.16.07.3.12.4-.07.1-.19.04-.38-.15-.44-.39-.13-.79-.23-1.2-.34ZM41.76,27.53c.4-.21.6-.41.6-.81,0-.33.13-.66.16-.99.05-.68.32-1.33.17-2.03-.04-.21-.07-.42-.08-.64-.08-1.57-.34-3.1-.92-4.56-.17-.42-.26-.87-.5-1.24-.21-.31-.36-.61-.36-.97,0-.34-.2-.58-.43-.73-.14-.09-.38-.02-.61-.02.48.85.91,1.64,1.36,2.41.39.67.58,1.4.7,2.15.13.82.19,1.65.28,2.47.01.09.04.19.03.28-.02.57-.03,1.13-.07,1.7-.04.66-.1,1.33-.17,1.99-.03.3-.1.59-.17.97ZM36.27,26.77s-.1.04-.12.08c-.02.04,0,.14.03.16.34.23.68.46,1.02.68.02.02.09.01.1,0,.02-.05.05-.11.03-.16-.06-.27-.77-.77-1.07-.76ZM15.66,25.15c.21.16.32.28.46.34.13.06.33.11.42.05.1-.07.16-.26.16-.4,0-.19-.07-.39-.14-.57-.06-.17-.17-.46-.25-.46-.26.01-.2.27-.23.46-.02.11-.08.22-.12.33-.11-.07-.23-.13-.31-.22-.07-.08-.12-.21-.11-.32.01-.42.02-.85.09-1.26.03-.19.02-.31-.14-.4-.17-.09-.36-.17-.55-.23-.05-.01-.17.05-.17.09-.1.49-.51.92-.33,1.47.07.2.2.39.24.59.03.14-.05.31-.07.46-.12-.08-.32-.14-.34-.24-.07-.28-.06-.58-.08-.87-.01-.15-.01-.31-.06-.45-.16-.43-.39-.85-.25-1.34.01-.05-.04-.15-.08-.17-.51-.18-1,.17-.9.68.16.79.38,1.57.61,2.34.2.67.45,1.31,1.11,1.69.09.05.14.23.17.35.03.19.02.38.04.57.01.13.11.28.21.13.3-.46.77-.33,1.18-.39.45-.07.46-.11.24-.48-.31-.53-.74-1.01-.78-1.77ZM15.83,28.01c-.15-.13-.23-.27-.33-.27-.08,0-.25.14-.25.22,0,.13.1.27.16.4.12-.1.24-.21.42-.35ZM38.57,29.01c.29-.3.58-.59.87-.89.39-.4.64-.88.75-1.42.02-.08-.03-.17-.05-.26-.05.05-.1.1-.14.16-.26.43-.53.86-.78,1.29-.22.37-.43.74-.64,1.11l-.03.03v.02c-.21.17-.21.18-.18.49.06-.16.12-.33.17-.49h.02s.02-.04.02-.06ZM16.18,30.62c.14-.27.28-.42.28-.56,0-.1-.17-.2-.27-.31-.08.12-.21.23-.22.35-.01.13.1.26.21.52ZM31.12,29.43c-.2.07-.39.1-.54.2-.26.17-.52.36-.5.74,0,.11-.05.23-.11.32-.02.03-.15,0-.23-.02.11-.39.19-.8.35-1.17.1-.23.64-.25,1.03-.08ZM15,34.87c-.07.1-.11.2-.11.29,0,.1.03.2.11.3v-.59ZM15.37,39.01s-.01,0-.02,0c.04.43.07.86.12,1.29,0,.05.11.1.16.14.04-.05.12-.11.11-.16-.05-.7-.12-1.41-.18-2.11,0-.04-.08-.07-.12-.11-.03.04-.08.08-.08.12,0,.28,0,.55,0,.83ZM33.67,12.55c-.27-.11-.53-.25-.81-.32-.32-.08-.67-.08-.99-.16-.7-.17-1.37-.18-2.01.19-.52.3-1.1.55-1.48,1.22.51-.19.91-.34,1.31-.49.4-.15.8-.42,1.2-.45.9-.05,1.82-.18,2.72.08.09.07.17.15.26.22.14.1.33.17.41.31.08.13.11.33.06.48-.02.07-.29.14-.39.1-.75-.32-1.56-.1-2.32-.31-.47-.13-.63-.27-.08-.43-.78-.15-1.38.12-1.98.27-.83.21-1.58.65-2.21,1.26-.04.04-.09.06-.13.09.06.05.13.15.17.14.22-.06.45-.11.63-.24.41-.28.76-.47,1.05-.5-.02.03-.03.08-.06.1-.68.5-1.09,1.31-1.88,1.7-.1.05-.17.16-.24.26-.46.65-.88,1.32-1.37,1.93-.7.88-1.4,1.76-2.18,2.57-.75.79-1.61,1.46-2.37,2.24-.99,1.01-1.85,2.11-2.03,3.6-.06.49-.19.96-.28,1.45-.08.44-.13.88-.21,1.31-.09.51-.23,1.02-.3,1.54-.08.66-.16,1.32-.16,1.98,0,.53.03,1.1.24,1.57.42.97.94,1.9,1.46,2.82.42.73,1.07,1.25,1.81,1.64.56.29,1.14.53,1.71.8.48.22.94.47,1.43.67.74.31,1.49.63,2.25.88.63.2,1.29.38,1.94.44,1.17.09,2.04-.8,2.04-1.98,0-.18-.02-.36.01-.53.06-.37-.09-.63-.4-.79-.19-.1-.41-.13-.62-.21-.18-.07-.44-.1-.52-.23-.21-.36-.46-.56-.9-.48-.06.01-.19-.04-.21-.09-.06-.13-.11-.29-.09-.42.03-.18.17-.17.33-.11.24.1.48.2.72.27.07.02.2-.02.22-.06.1-.25-.2-1.04-.46-1.1-.57-.13-1.15-.21-1.73-.3-.23-.04-.48-.03-.7-.1-.09-.03-.2-.22-.18-.31.09-.42.32-.76.69-1,.19-.12.3-.06.35.13.03.11,0,.24.02.35.02.07.09.18.15.18.21.02.42.03.63,0,.95-.09,1.9-.18,2.85-.28.33-.03.61-.06.81.3.13.22.35.15.43-.12.05-.15.01-.34.09-.46.26-.42.12-.74-.18-1.06-.17-.18-.35-.36-.34-.66.03-.44-.06-.51-.48-.52-.15,0-.31.04-.46.08-.28.09-.45-.07-.48-.29-.01-.11.17-.31.3-.36.42-.13.84-.16,1.26.08.2.12.43.21.66.23.31.02.62-.06.93-.07.28,0,.45-.11.49-.39.02-.14.07-.27.07-.41.05-1.33.11-2.65.13-3.98.01-.75.42-1.37.63-2.06.09-.28.34-.52.53-.76.06-.07.16-.12.25-.15.72-.2,1.43-.47,2.21-.3.39.09.51,0,.68-.39.06-.13.09-.26.15-.39.13-.28.27-.52.59-.69.25-.14.46-.5.53-.8.13-.55.16-1.13.2-1.69.08-1.26-.09-2.45-1.08-3.39-.59-.57-1.19-1.11-2.03-1.28-.09-.02-.21-.05-.27-.12-.05-.06-.07-.18-.06-.27,0-.06.08-.15.13-.16.19,0,.39-.02.55.04.09.04.1.24.16.36.03.06.09.11.15.18q.13-.51.58-.41s.04,0,.06.01c.3.09.59.17.83.41.15.15.5.24.63,0,.14-.25-.21-.3-.35-.43-.06-.06-.19-.04-.28-.08-.39-.16-.77-.33-1.18-.5.24-.16.39-.3.57-.38.16-.07.34-.12.51-.1.59.05,1.17.12,1.76.2.34.04.64.16.89.44.18.21.4.38.61.56.04.03.1.03.15.04,0-.05.04-.13.01-.16-.36-.43-.76-.84-1.28-1.01-1.45-.46-2.92-.36-4.38.05-.13.04-.28.02-.42.03.18-.24.4-.37.58-.54.08-.08.09-.23.13-.34-.11.02-.24,0-.32.06-.19.14-.33.34-.52.48-.18.14-.38.32-.58.35-.3.03-.49.14-.59.4-.07.2-.19.23-.36.17-.24-.09-.14-.33-.07-.39.42-.38.11-.71-.06-1.04-.04-.07-.15-.14-.23-.15-.22-.04-.45-.04-.67-.06ZM15.32,42.03c-.14.05-.33.12-.51.19,0,0,.02.14.04.14.22.02.45.03.67.03.03,0,.07-.03.1-.06.04-.04.1-.09.09-.13,0-.05-.07-.1-.12-.12-.07-.03-.15-.03-.28-.05ZM15.4,43.93c-.04-.12-.12-.36-.21-.59-.02-.04-.09-.08-.14-.08-.04,0-.11.08-.11.11.05.34.1.68.17,1.02,0,.03.1.07.15.07.03,0,.08-.07.09-.11.02-.09.02-.19.05-.43ZM14.92,44.41c-.04-.08-.05-.12-.07-.15-.4-.54-.8-1.08-1.21-1.6-.06-.08-.2-.13-.31-.14-.17-.02-.27.08-.2.26.07.16.15.41.26.43.45.09.53.43.69.76.1.21.34.37.54.52.05.04.19-.04.3-.07ZM13.92,53.29c.06-.03.11-.06.17-.09-.07-.2-.13-.39-.2-.59-.53-1.59-1.3-3.09-1.62-4.75-.05-.24-.24-.45-.37-.67-.02-.04-.1-.08-.14-.07-.04,0-.09.08-.09.12.05.37.03.77.18,1.1.64,1.4,1.17,2.84,1.68,4.29.08.24.27.44.41.66ZM23.27,18.65c.02-.13,0-.28.08-.36.42-.41.71-.86.89-1.44.17-.55.57-1.03.84-1.55.31-.61.55-1.27.9-1.85.26-.43.64-.79,1.01-1.13.55-.5,1.11-1,1.72-1.42,1.22-.84,2.59-1.16,4.06-1.01.24.03.47.19.71.28.17.06.33.13.5.17.05.01.11-.03.17-.05-.03-.07-.04-.16-.09-.19-.29-.17-.58-.37-.9-.46-.51-.14-1.04-.25-1.57-.28-1.68-.1-3.26.29-4.62,1.26-.61.43-1.08,1.09-1.58,1.67-.29.33-.53.69-.78,1.05-.13.19-.27.4-.34.62-.11.36-.28.68-.51.99-.17.24-.27.53-.41.79-.01.03-.14.04-.16,0-.05-.05-.07-.13-.1-.2-.07.06-.17.11-.2.19-.11.29-.19.59-.3.94-.22-.39-.13-.76-.12-1.13,0-.23-.05-.47,0-.69.11-.41.27-.81.45-1.21.52-1.16,1.44-2.03,2.25-2.97.72-.83,1.53-1.58,2.66-1.86.11-.03.2-.09.39-.16-.44-.16-.77-.01-1.08.08-1.1.34-2.21.67-3.09,1.46-.9.81-1.69,1.71-2.12,2.87-.06.17-.12.33-.15.51-.09.48-.18.96-.25,1.44-.03.17-.04.36.01.52.24.84.26,1.69.16,2.54-.11.92-1.04,1.7-2.03,1.52-.1-.02-.22-.03-.27-.09-.39-.42-.95-.61-1.35-.99-.53-.5-1.21-.75-1.77-1.18-.99-.76-2.17-.89-3.31-1.17-.34-.08-.67.07-1.03-.12-.82-.43-1.23-1.49-.9-2.36.57-1.52,1.63-2.58,2.97-3.42.25-.16.44-.52.68-.54.32-.03.56-.18.81-.32.49-.26.96-.55,1.44-.84.07-.04.08-.19.12-.28-.11-.01-.23-.07-.31-.03-.5.24-.99.49-1.48.76-1.14.64-2.22,1.37-3.23,2.2-.33.27-.38.26-.49-.15-.17-.6-.05-1.18.17-1.74.2-.51.44-1,.7-1.48.07-.13.28-.18.42-.28.1-.07.22-.14.26-.24.04-.09,0-.22-.01-.33-.09.03-.19.05-.26.1-.26.17-.52.35-.77.54-.18.14-.39.29-.5.48-.13.23-.6.33-.35.74-.17.23-.27.55-.63.56-.38,0-.58.15-.57.57.01.28-.12.47-.49.39-.24-.05-.34.18-.34.61,0,.27.21.17.33.18.24.02.48.01.71.01.19,0,.28.1.31.29.03.23,0,.38-.3.37-.52-.02-1.03,0-1.55-.02-.3-.01-.45.08-.58.37-.15.31-.42.57-.63.86-.06.09-.08.2-.12.31.09.02.18.05.28.05.7,0,1.39,0,2.09,0,.14,0,.35-.06.33.21-.02.21.02.46-.32.45-.79-.01-1.59.01-2.38-.04-.25-.02-.37.02-.47.22-.17.31-.36.62-.51.94-.18.37-.15.4.25.4.95,0,1.91.03,2.86,0,.55-.02.96.12,1.27.66h-2.31c-.75,0-1.51,0-2.26,0-.12,0-.29.08-.33.17-.17.38-.3.77-.45,1.16-.07.18,0,.27.19.27.51,0,1.02,0,1.53,0,.95,0,1.91,0,2.86,0,.13,0,.26.09.4.14-.12.17-.22.37-.38.49-.09.07-.27.02-.41.02-1.25,0-2.51,0-3.76,0-.67,0-.91.17-1.14.79-.28.77-.24.82.58.82,1.19,0,2.38,0,3.57-.02.28,0,.31.06.19.3-.14.27-.3.4-.64.39-1.21-.03-2.42,0-3.63-.02-.3,0-.47.07-.53.4-.04.24-.19.47-.25.71-.1.43-.05.49.38.5.3,0,.6,0,.89,0,1.05,0,2.1-.02,3.15-.03.26,0,.52.31.44.55-.02.07-.18.13-.27.13-.97,0-1.95,0-2.92,0-.54,0-1.07,0-1.61.01-.02,0-.04,0-.06,0-.57.19-.27.7-.36,1.06-.07.29.08.43.39.43,1.89,0,3.78.02,5.66,0,.56,0,1.01.08,1.28.65-.12.03-.25.1-.38.1-1.09-.02-2.18-.06-3.27-.07-1.11-.01-2.22,0-3.34,0-.51,0-.52,0-.59.51-.02.16-.02.32-.01.47,0,.25-.05.55.07.74.07.1.43,0,.66.01.83.02,1.65.07,2.48.07.98,0,1.97-.05,2.95-.06.71,0,1.43.06,2.14.05.37,0,.4.27.5.49.01.03-.1.17-.16.17-.34.02-.68.01-1.01.01-2.43,0-4.87,0-7.3,0-.45,0-.46.02-.49.47-.02.27-.05.55-.07.82-.02.22.07.34.31.31.14-.01.28,0,.42,0h8.65c.14,0,.28-.02.42,0,.11.02.22.09.33.14-.09.17-.15.35-.27.49-.04.05-.19.02-.29.02-2.48,0-4.97,0-7.45,0-.57,0-1.13-.02-1.7-.02-.27,0-.42.08-.41.42.06,1.24.04,1.24,1.29,1.24h2.57c1.57,0,3.13,0,4.7,0,.3,0,.59.03.89.06.11.01.3-.14.32.11.02.24-.16.49-.37.49-1.21,0-2.43,0-3.64,0-1.71,0-3.42,0-5.13,0-.49,0-.49,0-.47.48,0,.12,0,.24,0,.36.01.59.14.73.72.73,1.61,0,3.22-.01,4.82,0,1.33.01,2.65.06,3.98.1.23,0,.51.25.51.46,0,.04-.08.12-.13.12-.12.02-.24,0-.36,0-1.23,0-2.46,0-3.7,0-1.76,0-3.53,0-5.29,0-.44,0-.44,0-.37.45.02.1,0,.2.03.29.08.22.16.44.27.65.15.29.39.07.59.08.53.05,1.07.07,1.6.08.31,0,.63-.07.95-.07,1.88,0,3.77,0,5.65,0,.45,0,.59.14.46.43-.05.1-.19.21-.3.22-.59.04-1.18.06-1.77.06-1.41,0-2.82-.03-4.22-.05-.69,0-1.39,0-2.08,0-.55,0-.55,0-.61.55-.02.14-.03.28,0,.41.06.49.2.61.69.61.83,0,1.67-.05,2.5-.05,1.28,0,2.56.03,3.84.05.37,0,.75-.01,1.12,0,.1,0,.19.08.28.13-.07.15-.12.32-.23.43-.07.07-.22.08-.34.08-2.18,0-4.35.01-6.53.01-.18,0-.35-.05-.53-.07-.22-.02-.35.06-.28.31.09.36.19.73.25,1.1.04.26.18.3.41.3,1.65,0,3.3,0,4.94,0,.44,0,.87.04,1.31.04.15,0,.36-.1.33.15-.02.19-.03.47-.35.47-.36,0-.72,0-1.07,0-.83.02-1.66.07-2.5.08-.74,0-1.49-.05-2.23-.07-.43-.01-.45.01-.36.43.04.17.06.36.15.51.49.83.25.77,1.25.76,1.43,0,2.86,0,4.29-.02.45,0,.76.16.9.69-.96,0-1.9,0-2.83,0-.87,0-1.75,0-2.62,0-.23,0-.34.04-.23.3.11.29.17.61.29.9.11.28.29.41.64.4,1.15-.04,2.3-.02,3.46-.02.1,0,.21.06.31.09-.07.17-.1.38-.23.5-.09.09-.3.06-.46.06-.91,0-1.83,0-2.74.01-.33,0-.36.04-.22.33.11.21.21.43.34.63.11.16.23.36.39.43.12.05.31-.08.48-.1.47-.07.94-.19,1.41-.17.75.03,1.27-.36,1.76-.84.06-.06.1-.18.08-.25-.13-.44.17-.75.3-1.11.03-.07.09-.13.15-.17.55-.41,1.39-.16,1.66.47.46,1.09,4.65,10.44,4.67,10.57.02.18,0,.37,0,.55-.23-.01-1.71-.53-2.2-.81-.51-.29-1.04-.57-1.58-.79-.88-.37-1.69-.87-2.46-1.42-.58-.41-1.16-.83-1.67-1.32-.63-.6-1.27-1.21-1.77-1.91-.9-1.25-1.96-2.39-2.65-3.78-.37-.74-.71-1.5-1.04-2.26-.29-.66-.54-1.34-.79-2.03-.11-.31-.17-.64-.27-.96-.11-.38-.23-.75-.34-1.12-.6-2.09-1-4.21-1.23-6.37-.07-.69-.09-1.39-.1-2.08-.02-.87-.05-1.75,0-2.62.06-1.31.11-2.63.29-3.94.17-1.24.3-2.49.7-3.67.37-1.1.55-2.26.97-3.34.35-.88.73-1.75,1.11-2.62.34-.76.71-1.52,1.08-2.27.09-.19.28-.33.39-.51.4-.62.83-1.23,1.19-1.88.33-.61.88-1,1.34-1.49.44-.47.9-.93,1.38-1.36.66-.59,1.32-1.17,2.03-1.7.6-.44,1.24-.83,1.9-1.17,1.22-.64,2.45-1.25,3.8-1.58.73-.18,1.44-.45,2.17-.61.59-.13,1.21-.16,1.81-.24.56-.07,1.12-.15,1.69-.21.31-.03.63-.05.95-.04.7.02,1.41.06,2.11.1.93.05,1.84.19,2.72.5.02,0,.04.01.06.02.74.19,1.48.38,2.21.59.34.1.66.25.99.39.67.29,1.36.54,2.01.88.91.47,1.78,1,2.67,1.51.05.03.09.08.14.1,1.26.63,2.1,1.74,3.11,2.66.34.31.53.77.81,1.15.21.29.45.55.68.83.91,1.11,1.66,2.31,2.21,3.63.22.55.55,1.06.75,1.61.25.66.43,1.34.64,2.01.1.34.19.68.31,1.02.22.65.36,1.32.55,1.97.42,1.41.56,2.87.82,4.3.22,1.18.19,2.37.19,3.56,0,.61.03,1.22,0,1.83-.08,1.85-.16,3.71-.54,5.53-.15.7-.22,1.42-.45,2.09-.39,1.1-.55,2.26-.97,3.34-.35.88-.73,1.75-1.12,2.62-.34.76-.71,1.52-1.08,2.27-.09.19-.27.32-.39.5-.25.4-.51.79-.73,1.21-.47.88-1.17,1.55-1.86,2.23-.45.44-.91.87-1.34,1.33-.62.67-1.34,1.22-2.09,1.72-.77.51-1.6.92-2.4,1.38-1.55.89-3.25,1.3-4.93,1.8-.79.23-1.58.31-2.39.34-.53.02-1.05.16-1.57.23-.31.04-.63.07-.94.07-.39,0-.79-.06-1.18-.1-.05,0-.11-.03-.16-.05.03-.06.04-.14.09-.19.27-.35,7.77-9.08,8.13-9.55.34-.44.79-.73,1.23-.4.35.27.39.46.4.96.01.53.19.97.72,1.26,1.25.69,2.46,1.44,3.69,2.15.24.14.52.05.76-.23.15-.18.28-.37.44-.59-.3-.05-.6-.04-.85-.15-.26-.12-.46-.36-.75-.6.4,0,.74,0,1.09,0,.24,0,.48,0,.71.02.71.08,1.14-.24,1.43-.86.1-.22.33-.39.49-.58.17-.19.1-.28-.13-.28-.38,0-.76,0-1.13,0-1.26-.02-2.52-.04-3.78-.06-.45,0-.9,0-1.35.01-.38,0-.3-.3-.34-.51-.05-.25.14-.22.3-.22,2.04,0,4.09.01,6.13.02.83,0,.83,0,1.31-.68.19-.27.35-.55.58-.92-1.04,0-1.97-.01-2.9,0-.91.01-1.82.08-2.74.08-1.07,0-2.14-.06-3.21-.07-.57,0-1.15.04-1.72.07-.4.02-.56-.13-.55-.49,0-.2.08-.3.27-.31.16,0,.31-.02.47-.02.69,0,1.38-.02,2.08-.02.24,0,.47.02.71.03,2.52.01,5.04.03,7.57.04.35,0,.59-.1.7-.48.09-.3.27-.57.42-.85.08-.15.05-.22-.12-.23-.14,0-.28,0-.42,0-1.69.02-3.38.04-5.06.06-1.5.01-2.99.02-4.49.02-.59,0-1.19-.06-1.78-.06-.23,0-.21-.14-.2-.27,0-.16-.11-.39.16-.43.16-.03.32-.01.48-.01,1.74,0,3.49,0,5.23,0,1.97,0,3.93,0,5.9.01.67,0,.79-.08,1.02-.73.03-.09.06-.19.09-.28.19-.6.19-.59-.41-.61-.49-.01-.98-.08-1.46-.07-.65,0-1.29.05-1.94.07-.63.01-1.27.02-1.9,0-1.05-.02-2.1-.06-3.15-.07-.71,0-1.41.03-2.12.04-.21,0-.42-.03-.7-.04.12-.15.21-.22.26-.32.15-.33.42-.35.74-.35,1.29,0,2.58,0,3.87,0,1.91,0,3.81,0,5.72,0,.44,0,.88-.03,1.31.01.25.02.41-.07.46-.27.09-.35.13-.71.19-1.07.05-.26-.11-.31-.31-.31-.56,0-1.11-.01-1.67-.01-1.69,0-3.38.03-5.07.03-1.07,0-2.14-.02-3.22-.04-.11,0-.22-.06-.32-.09.04-.11.05-.25.12-.32.16-.13.34-.27.53-.32.23-.05.47-.01.71,0,.77.02,1.53.06,2.3.06.81,0,1.61-.05,2.41-.06.94,0,1.88,0,2.82,0,.47,0,.94.03,1.41.06.49.03.73-.13.86-.6.02-.07.01-.16.02-.24.1-.58-.04-.72-.63-.71-.86.01-1.72,0-2.59,0-.49,0-.98.06-1.47.07-1.4.02-2.81.02-4.22.03-.1,0-.19-.02-.29-.02.03-.11.04-.23.09-.32.14-.27.28-.44.67-.44,2.1.04,4.21.02,6.32.02.66,0,1.31,0,1.96,0,.44-.01.47-.06.5-.48q.07-1-.94-1h-6.73c-.14,0-.28.01-.42,0-.12-.01-.32.08-.29-.17.03-.2-.05-.47.27-.52.14-.02.28,0,.42,0,1.77.01,3.53.03,5.3.03.73,0,1.47-.01,2.2-.01.31,0,.49-.1.44-.46-.03-.21,0-.43,0-.65-.02-.5-.05-.5-.53-.48-.98.04-1.97.09-2.96.09-.9,0-1.81-.06-2.71-.08-.57-.01-1.14,0-1.71.01-.26,0-.36-.06-.36-.33,0-.26.11-.35.36-.35.42,0,.83,0,1.25,0,2.11,0,4.21,0,6.32,0,.5,0,.51-.03.48-.56,0-.14-.02-.28,0-.42.15-.72,0-.62-.6-.62-1.77,0-3.54,0-5.3,0-.17,0-.35,0-.53-.04.44-.36.84-.69,1.48-.66,1.49.05,2.98.01,4.47.01.1,0,.2,0,.3,0,.27,0,.26-.18.24-.37-.03-.27-.09-.55-.07-.82.02-.33-.11-.42-.41-.41-.85,0-1.71,0-2.57,0-.08,0-.16.01-.24,0-.16-.04-.39-.05-.44-.15-.09-.16.23-.5.45-.5.63-.01,1.27,0,1.9-.01.12,0,.24,0,.36,0,.87,0,.9-.03.8-.89-.02-.16-.08-.31-.1-.46-.04-.32-.15-.45-.53-.39-.56.07-1.14.04-1.71,0-.17,0-.41-.11-.48-.24-.15-.28.02-.47.36-.48.56-.02,1.11-.02,1.67-.04.55-.02.55-.03.46-.56q-.14-.89-1.05-.9c-.38,0-.75,0-1.13,0-.25,0-.41-.04-.42-.35-.01-.31.16-.32.37-.32.48,0,.95,0,1.43,0,.52,0,.67-.21.53-.71-.04-.15-.12-.29-.17-.44-.14-.39-.24-.46-.65-.45-.29,0-.58,0-.89,0q.2-.65.75-.68c.39-.02.48-.09.34-.41-.18-.42-.08-1.01-.69-1.23-.07-.03-.11-.38-.04-.54.12-.28.04-.49-.08-.72-.37-.7-.76-1.39-.84-2.2-.02-.17-.12-.33-.21-.49-.31-.57-.63-1.14-.95-1.71-.06-.11-.15-.22-.26-.31.12.47.13.95.43,1.37.32.44.15.8-.38,1-.04.02-.1.14-.08.17.16.23.3.48.51.66.46.38.65.87.72,1.44.05.45.1.91.18,1.35.17.99-.22,1.85-.65,2.73-.08-.44-.16-.87-.25-1.35-.27.2-.19.44-.16.65.19,1.23.23,2.47.09,3.71-.06.61-.14,1.2-.26,1.8-.29,1.4-1.08,2.31-2.37,2.87-.61.26-1.16.65-1.8.87-.35.12-.66.38-.6.92.05.46-.14.93-.18,1.4-.05.53-.13,1.05-.45,1.5-.03.05-.08.11-.07.16.08.62-.41.98-.64,1.46-.42.89-1.04,1.62-1.74,2.29-.74.71-1.18,1.62-1.74,2.45-.25.38-.56.72-.87,1.05-.13.14-.32.27-.5.3-.51.07-.6.39-.61.83,0,.53-.07,1.06-.11,1.59,0,.08.03.18-.01.24-.31.43-.11.84,0,1.27.05.19.04.39.03.59-.03.39,0,.77.31,1.04.2.17.12.32.03.47-.09.15-.21.29-.32.43-.74.92-1.48,1.84-2.22,2.76-.1.12-.15.28-.25.38-.27.25-.52.2-.66-.13-.24-.58-.54-1.16-.66-1.78-.1-.52-.44-.9-.6-1.37-.2-.59-.5-1.17-.84-1.69-.47-.73-1.03-1.4-1.54-2.1-.18-.24-.5-.37-.54-.73,0-.09-.17-.16-.24-.24-.13-.14-.25-.29-.37-.44-.06-.08-.09-.21-.16-.25-.64-.31-.92-.99-1.44-1.43-1.04-.88-2.16-1.64-3.33-2.33-.15-.09-.33-.14-.49-.21-.7-.31-.65-.69-.6-1.3.02-.18.07-.35.07-.52,0-.85-.01-1.7,0-2.55,0-.25.04-.51.09-.76.08-.32.05-.63-.1-.92-.13-.26-.29-.5-.43-.75-.01.04,0,.15-.06.17-.54.28-.42.82-.42,1.25-.01.57-.21.96-.71,1.19-.26.12-.28.26-.16.5.07.14.07.31.11.46.16.54.52,2.62.59,3.1.17,1.09.36,2.19.55,3.28,0,.04.03.08.03.11.03.32-.11.45-.46.43-.09,0-.18.02-.27.04.04.08.07.19.14.23.21.13.18.28.08.46-.06.1-.14.2-.18.31-.03.09,0,.2,0,.3.08-.04.2-.06.24-.13.33-.61.88-1.13.75-1.95.3.48.15.83-.1,1.23-.43.64-.79,1.33-1.19,1.99-.3.5-.49.76-.69.79-.21.03-1.37-1.19-1.52-1.37-.26-.3-.46-.64-.71-.95-.32-.38-.36-.72-.04-1.14.21.35.5.45.88.26.12-.06.27-.06.41-.08.5-.09.59-.16.31-.6-.46-.72-.32-1.42-.13-2.16.11-.43.4-.83.23-1.33-.45.06-.31.83-.94.69.16-.55.32-1.13.48-1.71.04,0,.07,0,.11,0,.02.09.04.19.05.28.03.23.11.26.31.12.32-.22.53-.49.5-.89,0-.12-.09-.25-.17-.35-.12-.13-.5-.08-.27-.43-.34-.24-.05-.46.03-.66.11-.28.08-.45-.18-.64-.33-.24-.7-.48-.75-.94-.01-.11.03-.22.04-.33.1.03.21.04.3.09.17.09.33.22.51.29.36.14.53.08.74-.25.2-.32.53-.62.3-1.07-.01-.02.12-.12.18-.18.09-.09.23-.17.24-.27.02-.13-.04-.29-.11-.42-.03-.05-.23-.06-.26-.02-.09.11-.17.25-.18.38-.01.35,0,.36-.33.23-.13-.05-.25-.11-.38-.15-.45-.14-.71-.6-.61-1.11.04,0,.08,0,.11.02.56.22.65.2.91-.17.21-.3.21-.87-.06-1.1-.24-.21-.36-.44-.42-.75-.06-.31-.22-.55-.61-.64-.74-.18-1.18-.69-1.33-1.44-.01-.06-.03-.12-.03-.18-.06-.91-.5-1.6-1.2-2.15-.26-.2-.52-.4-.78-.6-.45-.33-.73-.78-.89-1.3-.14-.46.02-1,.45-1.26.71-.44,1.46-.82,2.35-.62.11.02.25.04.33.11.8.73,1.79,1.15,2.71,1.69h0s0,0,0,0h0s0,0,0,0c.16-.21.12-.33-.13-.45-.39-.18-.77-.41-1.14-.63-.08-.05-.13-.17-.19-.26.12-.06.23-.17.35-.17.13,0,.27.07.39.13.46.23.9.48,1.36.72.31.16.64.27.98.26-.91-.52-1.82-1.03-2.73-1.53-.14-.08-.28-.15-.43-.18-.96-.19-1.91-.24-2.83.19-.12.06-.25.11-.39.15-.24.06-.55.11-.59-.18-.03-.2.12-.54.29-.64.6-.34,1.24-.6,1.87-.88.11-.05.26-.02.38-.01.13,0,.27.05.4.05.07,0,.13-.07.2-.11-.05-.07-.09-.15-.15-.21-.03-.04-.08-.06-.24-.17.6,0,1.08-.06,1.53.01.66.11,1.32.3,1.88.68.3.21.59.48.8.78.21.3.48.42.89.62-.64-.81-1.24-1.45-2.09-1.85-.46-.21-.89-.51-1.34-.74-.63-.32-1.23-.14-1.81.14-.32.16-.61.37-.94.5-.16.07-.37.02-.55.03,0-.18-.07-.39,0-.54.15-.32.34-.65.72-.74.32-.08.58-.28.99-.19,1.21.26,2.37.63,3.42,1.25.51.3.89.83,1.33,1.25.33.31.64.64,1,.92.51.4,1.1.4,1.7.24.4-.11.8-.22,1.2-.32.55-.13.97-.47,1.37-.85.17-.17.38-.3.57-.45.85-.69,1.4-1.62,1.85-2.58.45-.96.99-1.86,1.67-2.63.9-1.02,1.96-1.93,3.26-2.46.63-.25,1.29-.19,1.93-.23.18-.01.38.19.55.33.32.26.63.54.95.8.05.04.14.03.21.05-.01-.07,0-.15-.04-.2-.12-.18-.27-.34-.39-.52-.04-.07-.04-.17-.06-.25.1,0,.23-.02.28.04.24.25.51.5.66.8.13.26.25.47.47.65.13.1.17.31.28.45.08.1.19.17.29.25.02-.12.07-.24.06-.35-.08-1.1-.83-1.64-1.73-2.05-.71-.32-1.48-.55-2.24-.49-.79.06-1.58.3-2.24.84-.64.52-1.32.99-2,1.46-.87.61-1.55,1.38-1.97,2.37-.47,1.1-1.06,2.14-1.77,3.11-.11.16-.32.24-.48.36,0,0,0,.02,0,.02h0s0,0,0,0c0,0-.01,0-.02,0h0s0-.01,0-.01c0,0,.01,0,.02-.01ZM26.56,58.51c1.25.11,2.32-.27,3.4-.49.47-.1.91-.38,1.38-.49.49-.12.99-.14,1.48-.37.96-.46,1.96-.81,2.95-1.21.35-.14.73-.23,1.04-.43.62-.4,1.23-.84,1.81-1.3.86-.68,1.87-1.21,2.52-2.15.19-.27.52-.47.65-.76.16-.34.41-.57.66-.81.19-.18.37-.36.53-.56.43-.56.81-1.15,1.27-1.68.68-.79.99-1.78,1.49-2.67.54-.96.84-2.03,1.31-3.03.41-.86.64-1.81.93-2.73.17-.53.3-1.07.43-1.61.16-.67.3-1.35.44-2.03.16-.81.05-1.65.22-2.44.19-.9.18-1.8.2-2.7,0-.34,0-.68.04-1.01.1-.9-.01-1.8-.06-2.7-.04-.69-.17-1.38-.21-2.07-.1-1.54-.26-3.06-.69-4.54-.08-.28-.17-.56-.25-.84-.16-.51-.3-1.02-.47-1.52-.14-.42-.34-.83-.46-1.26-.35-1.33-.96-2.56-1.6-3.75-.5-.93-1.11-1.81-1.74-2.67-.36-.49-.71-.98-1.09-1.44-.46-.56-.73-1.29-1.44-1.64-.05-.02-.06-.1-.1-.14-.47-.48-.91-1-1.43-1.41-.65-.52-1.35-.97-2.06-1.41-1.11-.7-2.22-1.39-3.48-1.81-.59-.2-1.14-.5-1.72-.73-1.33-.54-2.76-.67-4.16-.94-.31-.06-.63-.08-.94-.09-1.03-.06-2.05-.11-3.08-.15-.31-.01-.64.1-.94.06-.45-.06-.86.02-1.28.14-.21.06-.42.11-.64.13-.67.07-1.31.25-1.94.51-.33.14-.72.16-1.08.25-.21.05-.41.12-.61.2-.53.21-1.06.42-1.59.64-.89.36-1.81.67-2.65,1.12-.72.39-1.35.94-2.02,1.42-.3.22-.62.43-.91.66-.32.26-.65.52-.93.81-.41.42-.85.84-1.17,1.33-.2.3-.4.57-.67.81-.19.17-.37.36-.53.56-.43.55-.82,1.14-1.28,1.68-.67.79-.99,1.78-1.49,2.66-.54.96-.84,2.03-1.31,3.02-.42.88-.64,1.85-.93,2.79-.15.49-.27.99-.41,1.49-.28.99-.54,1.98-.55,3.03,0,.21-.08.42-.1.63-.02.31.06.64-.03.93-.21.71-.19,1.44-.2,2.16-.01.5,0,1-.04,1.49-.09.91.01,1.8.06,2.7.04.77.13,1.54.23,2.31.14,1.12.28,2.24.47,3.35.11.65.31,1.29.49,1.93.13.45.27.9.42,1.35.15.44.36.87.48,1.32.36,1.35.97,2.6,1.63,3.81.5.93,1.08,1.84,1.76,2.65.51.6.88,1.29,1.41,1.88.36.41.69.84,1.1,1.22.69.65,1.31,1.36,2.09,1.91.6.42,1.2.83,1.82,1.24.33.22.68.41,1.02.6.44.25.89.48,1.34.72.14.07.28.15.43.19.38.13.79.2,1.16.37,1.15.54,2.33.96,3.6,1.09.37.04.72.18,1.09.23.52.08,1.05.13,1.58.18.69.06,1.38.15,2.07.16.47,0,.94-.09,1.3-.12ZM23.28,0c1.38.03,2.87.03,4.36.1.5.02.99.22,1.49.32,1.02.21,2.06.37,3.07.62.72.18,1.42.45,2.12.73.72.29,1.47.56,2.12.97.45.29.94.48,1.4.74.17.09,2.6,1.67,3.12,2.47.26.4.7.7,1.07,1.02.63.53,1.09,1.19,1.57,1.83.61.81,1.24,1.61,1.77,2.48.75,1.23,1.59,2.42,2.01,3.83.07.24.23.46.37.67.38.57.38,1.26.62,1.88.29.77.63,1.53.79,2.33.11.54.24,1.07.4,1.59.23.74.13,1.54.38,2.29.09.27.05.58.06.88.04.6.06,1.21.12,1.81.03.33.11.66.15.99.04.36.07.72.06,1.08,0,.57-.09,1.14-.06,1.71.05.85-.13,1.68-.18,2.52-.04.62-.07,1.25-.13,1.87-.08.8-.21,1.58-.37,2.36-.17.83-.36,1.65-.56,2.47-.09.37-.24.73-.34,1.1-.06.22-.11.45-.16.68-.02.08,0,.17-.03.23-.45.62-.58,1.37-.8,2.07-.16.52-.46.95-.68,1.43-.29.62-.58,1.25-.88,1.86-.6,1.23-1.42,2.32-2.29,3.37-.47.57-.91,1.17-1.36,1.76-.36.49-.84.86-1.28,1.27-.15.14-.3.28-.46.42-.38.33-.77.66-1.16.99-.28.24-.57.48-.88.69-.35.24-.72.46-1.09.66-.55.29-1.12.56-1.68.84-.12.06-.23.14-.36.18-.75.23-1.46.54-2.15.89-.26.13-.57.15-.85.24-.96.29-1.9.64-2.88.86-.9.2-1.83.29-2.76.35-.98.06-1.97.03-2.96.02-.95,0-1.88-.2-2.8-.39-.79-.16-1.58-.28-2.37-.45-.46-.1-.93-.2-1.36-.38-1.01-.41-2.08-.63-3-1.28-.52-.36-1.15-.56-1.73-.85-.18-.09-.35-.2-.49-.33-.22-.21-.34-.55-.74-.5-.05,0-.13-.09-.17-.15-.17-.26-.42-.38-.69-.52-.31-.16-.59-.4-.85-.64-.47-.45-.91-.93-1.39-1.38-.66-.61-1.2-1.3-1.71-2.03-.55-.79-1.17-1.53-1.68-2.34-.76-1.23-1.6-2.42-2.02-3.83-.07-.24-.28-.44-.36-.68-.22-.58-.4-1.17-.6-1.75-.28-.83-.66-1.65-.82-2.51-.1-.56-.26-1.1-.42-1.64-.21-.72-.11-1.47-.35-2.18-.1-.29-.06-.62-.08-.93-.04-.62-.06-1.25-.11-1.87-.02-.29-.11-.58-.15-.87-.04-.34-.07-.68-.08-1.02,0-.85-.02-1.69,0-2.54.01-.39.11-.78.14-1.17.12-1.3.21-2.61.36-3.92.07-.56.25-1.11.37-1.67.1-.46.19-.92.31-1.37.15-.52.33-1.03.5-1.55.02-.06.06-.1.07-.16.18-1.17.8-2.19,1.08-3.33.07-.29.34-.52.46-.81.45-1.09.97-2.16,1.6-3.15.49-.76,1.09-1.45,1.64-2.17.43-.56.83-1.14,1.28-1.67.36-.42.77-.81,1.18-1.19.43-.39.87-.77,1.32-1.14.34-.28.73-.52,1.04-.83.47-.47,1.04-.73,1.64-.98.45-.19.87-.46,1.3-.68.26-.13.53-.23.79-.35.61-.27,1.2-.59,1.82-.81.74-.26,1.5-.43,2.26-.63.25-.07.51-.09.74-.2,1.03-.46,2.13-.48,3.33-.63Z\"/>\n  </g>\n</svg>",
    14: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50.33 59.48\">\n  <g>\n    <path class=\"cls-1\" d=\"M23.08,7.25s.09,0,.14,0c.05-.15.12-.29.13-.44.06-.76.05-1.53.24-2.28.09-.37.11-.77.18-1.15.04-.2-.04-.24-.21-.24-.22,0-.32.1-.32.33,0,.18.04.38-.03.53-.34.77-.11,1.6-.27,2.39-.05.26.09.56.14.84ZM26.35,8.06l.12.02c.11-.39.25-.78.33-1.17.09-.4.14-.81.2-1.21,0-.05-.02-.1-.03-.16-.06.04-.13.06-.17.11-.05.06-.08.14-.09.21-.12.73-.24,1.47-.35,2.2ZM18.83,4.05c-.57.35-.63.52-.55,1.05.06.39.05.78.08,1.17.06.84.12,1.68.19,2.52.01.15.07.29.1.43.04,0,.08,0,.11-.01-.05-.97-.09-1.93-.14-2.9,0-.13-.03-.27,0-.38.19-.61.29-1.23.2-1.89ZM23.09,8.47c.06-.23.12-.46.16-.69.01-.07-.07-.15-.12-.22-.03.06-.09.13-.09.19,0,.24.03.48.05.73,0,0,0,.02,0,.03,0,0,0,0,0,0-.1.32-.07.63.14.95.12-.37.14-.68-.14-.95,0,0,0,0,0-.01,0,0,0-.01,0-.02ZM21.42,9.68c.08-.13.13-.17.14-.22.05-.96.13-1.93.12-2.89,0-.62.07-1.21.2-1.8.09-.42.2-.84.28-1.27.02-.08-.03-.25-.07-.25-.11-.02-.25,0-.33.06-.08.06-.15.2-.14.3.07.68-.1,1.33-.22,1.98-.18,1.03-.27,2.07-.15,3.12.03.3.1.6.17.98ZM19.87,9.75c.07,0,.14,0,.22,0-.02-.74-.05-1.48-.07-2.22,0-.32-.02-.65,0-.97.05-.88.11-1.77.16-2.65,0-.08-.06-.15-.1-.23-.09.06-.23.11-.26.19-.08.26-.14.54-.15.81-.02,1.13-.04,2.26,0,3.4.01.56.13,1.12.21,1.68ZM24.46,9.04h.02c-.02.24-.04.48-.04.71,0,.06.05.13.08.19.05-.07.14-.14.15-.21.1-.86.16-1.73.3-2.58.19-1.22.44-2.42.66-3.64.02-.1-.05-.21-.08-.32-.08.07-.19.12-.24.21-.41.83-.53,1.74-.66,2.63-.15.99-.14,2-.19,3ZM37.43,14.88c-.22-.11-.43-.21-.65-.32-.01.03-.04.07-.03.1.12.28.35.34.68.22ZM33.55,15.14c-.04.05-.08.1-.12.15.28.23.56.46.85.68.04.03.12.01.19.02-.02-.07-.01-.17-.06-.21-.28-.22-.57-.43-.86-.64ZM38.67,15.74s-.05.08-.07.12c.22.15.43.31.65.44.05.03.14-.01.21-.02-.03-.07-.03-.18-.09-.2-.23-.13-.47-.23-.7-.35ZM34.64,16.08c0,.05-.05.14-.03.17.4.48.9.82,1.46,1.05.05.02.15-.03.21-.07.02,0,0-.11-.04-.16-.37-.52-1.02-.62-1.5-.99-.01,0-.04,0-.11,0ZM26.5,21.91c.17-.07.35-.13.52-.2.13-.04.27-.14.38-.11.54.12,1.06.27,1.59.41.2.05.4.13.61.17.09.02.19-.01.28-.02-.05-.1-.07-.25-.15-.28-.63-.29-1.22-.72-1.98-.68-.54.03-.98.19-1.26.71ZM38.81,21.2c.2.27.41.54.62.82.21.28.42.55.63.84-.05-.77-.35-1.19-1.25-1.66ZM28.33,22.94s.17-.09.2-.17c.02-.06-.1-.23-.17-.24-.58-.07-1.16-.23-1.75-.04-.18.06-.33.12-.24.3.04.08.27.12.38.09.44-.13.83-.13,1.31.03.05.02.12.02.26.04ZM17.91,23.37s0,.1.01.15c.17,0,.35.02.52,0,.21-.04.4-.13.61-.18.31-.07.62-.11.93-.18.06-.01.1-.1.15-.16-.05-.04-.1-.12-.16-.12-.74-.05-1.44.08-2.05.5ZM18.93,22.58c-.77-.45-1.44-.63-2.15-.17-.19.13-.38.26-.57.38-.04.02-.1.02-.14.02,0-.05-.01-.12.01-.16.1-.15.21-.29.32-.42.14-.17.3-.32.42-.5.38-.53.7-.67,1.34-.53.52.11,1.02.22,1.57.25,1.05.06,1.64.85,1.64,1.94,0,.18-.09.34.09.54.18.2.01.58-.27.67-.52.17-1.03.39-1.6.17-.31-.11-.6-.19-.72-.53-.08-.22-.21-.22-.35-.06-.1.11-.27.24-.28.37-.03.36-.28.4-.5.34-.34-.09-.56.03-.78.25-.07.07-.15.14-.24.16-.1.03-.22.01-.33.02.04-.08.06-.21.13-.25.53-.27.34-.8.39-1.21.06-.48.27-.7.69-.82.41-.12.82-.28,1.34-.46ZM40.08,25.71c.06,0,.11,0,.17-.01-.08-.37-.15-.75-.25-1.11-.31-1.09-1.04-1.94-1.71-2.81-.2-.26-.46-.49-.73-.68-.57-.4-1.14-.79-1.75-1.12-.55-.3-1.15-.52-1.73-.78-.02.04-.04.08-.06.12.31.2.62.41.93.6.52.32,1.08.58,1.55.96.65.51,1.25,1.09,1.82,1.68.34.35.66.75.89,1.18.34.64.58,1.32.87,1.99ZM21.59,32.33c-.27,0-.51-.15-.62-.43-.19-.51-.46-.93-.92-1.23-.1-.07-.14-.22-.21-.33.12-.05.24-.14.36-.15.46-.05.9-.09,1.21-.42.71-.77,1.01-1.89,1.36-2.86.05-.15.18-.27.28-.41.11.1.27.17.33.3.57,1.1,1.12,2.21,1.67,3.33.18.37.03.92-.34,1.07-.94.39-1.9.74-2.86,1.11-.07.03-.16.02-.28.03ZM35.5,30.63c-.21.96-.35,3.56-.32,3.88.04.5.36.82.82.83.32.01.51-.25.64-.73.11-.44-.43-3.67-.58-3.98-.05-.11-.17-.36-.3-.44-.06.11-.22.32-.25.44ZM24.57,34.61c-.8.12-1.46.24-2.12.33-.58.08-1.17.1-1.75.19-.23.04-.46.12-.68.19-.11.04-.18.35-.29.38-.37.1-.62-.39-.52-.75.03-.11.16-.23.27-.26.43-.1.78-.33,1.14-.57.43-.29.86-.56,1.43-.28.13.06.33.04.48-.05.28-.18.61-.35.93-.26.7.19,1.39.42,2.1.59.34.08.63.42.58.71-.04.26-.4.54-.67.45-.2-.07-.35-.28-.53-.42-.14-.11-.29-.2-.35-.24ZM22.59,35.65c.21.02.49.02.75.07.22.05.24.23.07.38-.41.35-1.39.36-1.82.01-.15-.12-.12-.33.11-.39.26-.06.54-.05.88-.08ZM43.91,36.02c.66,0,1.26,0,1.87,0,1.06-.01,1.02.1.99-.99-.01-.52.05-.48-.49-.49-1.13,0-2.27,0-3.4,0-.44,0-.44-.03-.32-.44.06-.2.15-.31.37-.3.33,0,.67-.01,1,0,.8.02,1.61.07,2.41.08.62,0,.65-.05.69-.66.01-.19-.02-.39,0-.59.04-.32-.11-.36-.38-.36-.73.02-1.47.03-2.2.04-.58,0-1.15,0-1.73-.01-.19,0-.39-.27-.35-.51.01-.07.19-.16.29-.16.73-.04,1.46-.08,2.2-.08.59,0,1.18.06,1.78.06.49,0,.54-.07.52-.55,0-.23.01-.47.04-.71.03-.23-.03-.34-.28-.34-.3,0-.6,0-.89,0-.85,0-1.7,0-2.54,0-.57,0-1.14,0-1.71,0-.28,0-.37-.17-.36-.43.01-.39.3-.3.52-.3,1.61,0,3.22,0,4.83,0,.47,0,.47-.02.39-.47-.03-.17-.04-.35-.04-.53.01-.6.01-.61-.61-.61-1.25,0-2.51,0-3.76,0-.44,0-.5-.1-.26-.46.07-.11.24-.21.37-.22.27-.03.55,0,.83,0,.97,0,1.94.02,2.92.03.27,0,.42-.08.38-.38-.04-.33-.08-.66-.12-1-.03-.29-.18-.37-.48-.37-1.07.01-2.15,0-3.22-.03-.11,0-.31-.09-.32-.16-.02-.14.01-.35.1-.42.1-.08.3-.07.45-.07.81,0,1.63,0,2.44-.02.88-.03.88-.04.77-.89-.07-.52-.2-.61-.74-.6-.65.02-1.3.02-1.95.02-.11,0-.22-.09-.33-.14.1-.17,0-.49.32-.5.47-.02.95-.07,1.42-.02,1.05.1,1.23-.1.89-1.09,0-.02-.01-.04-.02-.06-.02-.41-.3-.45-.63-.45-.34,0-.67,0-1.01-.01-.07,0-.18-.09-.19-.16-.05-.3.15-.51.46-.51,1.28,0,.98-.03.76-1.02-.02-.11-.08-.23-.15-.32-.08-.1-.19-.19-.3-.24-.31-.13-.39-.38-.2-.66.06-.08.16-.18.14-.26-.12-.54-.44-.98-.75-1.55-.36,1.51-.44,2.95-.98,4.36-.16-.39-.23-.76-.43-1.02-.6-.81-1.19-1.65-2.04-2.25-.32-.23-.61-.5-.93-.73-.08-.06-.2-.06-.31-.08.05.11.07.25.15.32.68.59,1.37,1.17,2.06,1.75.06.05.1.12.14.18.25.47.53.92.73,1.41.28.66.44,1.34-.06,2.01-.2.27-.33.61-.49.93-1.53-2.98-4.21-5.4-5.54-5.61.17.22.31.44.49.61.22.2.47.35.72.51.82.55,1.58,1.15,2.14,1.99.39.59.85,1.13,1.22,1.74.34.57.57,1.18.44,1.9-.11.57-.12,1.16-.12,1.74,0,.95-.23,1.79-1.01,2.42-.12.1-.23.22-.33.34-.42.49-.32,1.08.21,1.46.54.39.92.89,1.04,1.59.1.59,0,1.13-.16,1.69-.23.79-.45,1.6.08,2.39.19.28.29.5.67.32.09-.04.24,0,.34.04,1.11.53,2.09,1.2,2.52,2.45.17.5.36.99.56,1.47.03.09.12.16.17.23.04-.09.09-.17.1-.26.15-.75.15-1.52.6-2.22.49-.74.22-1.11-.65-1.07-.06,0-.12,0-.18,0-.65.12-1.12-.18-1.58-.7ZM26.12,12.57c.27-.11,4.59-2.73,5.36-3.42l-.8.36c-.81.56-4.43,2.67-5.33,3.04-.66.27-1.61.44-2.32.51-1.25.12-2.4.47-3.43,1.27-1.69,1.33-2.71,3.07-3.26,5.1-.28,1.01-.42,2.05-.61,3.08-.13.68-.27,1.36-.33,2.04-.04.51.11,1.03.04,1.54-.16,1.18-.2,2.34.04,3.51.1.46.17.93.31,1.39.12.41,1.63,4.94,2.44,6.74.25.56.54,1.1.81,1.66.18.37.3.77.5,1.13.29.52.7.94,1.16,1.33.93.78,1.89,1.51,3.15,1.68.24.03.5-.01.75-.02-.03-.39-.38-.36-.62-.44-.55-.19-1.07-.41-1.33-1-.07-.17-.24-.32-.4-.43-.3-.21-.64-.39-.95-.59-.07-.05-.11-.14-.16-.21.07-.04.13-.1.2-.11.14-.02.28,0,.42,0,.73-.01,1.44-.07,2.14-.33.72-.27,1.24-.88,1.31-1.65.04-.47.08-.94.14-1.41.03-.24.15-.37.42-.48.49-.2.96-.15,1.44-.12.31.02.63.06.94.03.35-.03.97-.56.93-.81-.07-.52-.19-1.02-.32-1.53-.1-.41-.35-.8-.29-1.25.07-.5.12-1.02.3-1.49.26-.68.57-1.36.98-1.95.59-.85,1.16-1.72,1.85-2.5.69-.78,1.07-1.73,1.37-2.69-.62,0-1.21,0-1.8,0-.13,0-.25-.09-.38-.13.11-.06.21-.12.32-.17.17-.08.36-.14.53-.22.07-.03.12-.09.18-.13-.06-.07-.11-.16-.19-.2-.5-.25-1.04-.2-1.57-.18-.08,0-.21.05-.24.11-.02.06.03.2.09.24.33.22.22.43-.02.61-.22.17-.45.31-.69.44-.59.31-1.23.27-1.86.25-.33-.01-.67-.07-1-.13-.09-.02-.16-.15-.24-.22.09-.06.17-.18.27-.18.34-.02.69-.06,1.01.03.43.11.75-.03,1.09-.26-.23-.04-.46-.04-.68-.04-.49-.01-.6-.06-.7-.55-.07-.34-.21-.26-.39-.16-.13.07-.24.19-.36.3-.22.19-.43.4-.67.57-.16.12-.37.13-.38-.15-.02-.35-.23-.23-.35-.14-.19.16-.36.35-.5.56-.12.18-.16.41-.27.6-.16.28-.48.34-.62.09-.14-.24-.2-.29-.37-.06,0,0-.16-.07-.16-.1,0-.18-.03-.39.05-.52.2-.29.18-.6.18-.91,0-.56.01-1.11,0-1.67-.01-.41-.04-.8.54-.84.11,0,.22-.1.31-.16.93-.6,1.97-.87,3.03-1.08.53-.11,1.1-.14,1.64-.12.37.02.73.23,1.1.31.42.09.66.44.99.65.27.17.52.36.79.53.09.06.22.1.33.09.06,0,.17-.1.18-.17.05-.24.13-.5.09-.73-.05-.3.07-.31.27-.25.19.06.38.13.54.24.42.28.83.58,1.24.87.23.17.45.38.71.49.82.36,1.38,1.01,1.92,1.68.17.21.28.47.45.68.51.64.95,1.3,1.16,2.11.1.4.26.78.41,1.17.03.08.12.13.19.2.04-.08.11-.16.11-.24,0-.26,0-.52-.05-.77-.14-.69-.43-1.33-.74-1.97-.47-1.01-1.11-1.87-1.87-2.66-.89-.93-2.05-1.45-3.17-2.03-.73-.38-1.51-.71-2.16-1.2-.82-.61-1.8-.99-2.53-1.73-.37-.37-.77-.7-1.05-1.15-.22-.35-.47-.68-.7-1.03-.3-.46-1.37-2.04-1.51-2.19.21-.11.41-.23.63-.31ZM12.21,16.16c-.51.32-.74.82-.89,1.37-.13.47-.2.96-.32,1.43-.12.49-.24.99-.37,1.48-.05.2-.14.38-.21.57-.14-.18-.31-.34-.42-.54-.06-.11-.02-.27-.02-.4,0-.18.03-.36,0-.53-.12-.73-.19-1.44.16-2.14.07-.13.08-.31.07-.46-.04-.76.06-1.49.32-2.21.08-.23.25-.5.05-.79-.05-.07-.02-.27.05-.34.43-.49.42-1.08.43-1.67,0-.11.07-.22.11-.34.09-.28.25-.56.27-.85.04-.66.39-1.15.81-1.59.37-.39.76-.76,1.16-1.11.9-.77,1.91-1.34,3.06-1.66.38-.1.53-.01.58.35.04.25.11.51.09.76-.07,1.09.28,2.11.5,3.15.02.08.1.15.15.23.03-.1.09-.22.07-.3-.21-.75-.22-1.51-.21-2.28,0-.04,0-.08-.02-.12-.27-.87-.07-1.76-.09-2.64-.02-.73-.03-.81-.75-.62-.04,0-.08.02-.11.04-.94.45-1.88.91-2.82,1.36-.07.03-.12.1-.18.15-.32.23-.63.46-.95.68-.16.11-.36.17-.49.31-.43.46-.94.83-1.27,1.38-.13.21-.3.47-.51.55-.52.19-.84.55-1.13.98-.17.26-.36.51-.54.76.32.02.65.05.97.07.29.02.35.1.23.36-.07.18-.17.28-.4.26-.35-.03-.71-.02-1.06,0-.12,0-.27.09-.35.19-.26.34-.51.7-.75,1.06-.06.09-.07.2-.11.3.09.02.18.05.27.05.49,0,.98-.02,1.47-.01.1,0,.25.07.28.15.08.22-.15.49-.4.5-.32,0-.64,0-.95,0q-1.14,0-1.62,1.03c-.03.05-.05.11-.08.16-.16.37-.15.38.27.38.67,0,1.34,0,2.02,0,.22,0,.39.01.37.31-.02.24-.12.36-.37.35-.55,0-1.1,0-1.65,0-.36,0-.84-.11-1.06.07-.27.22-.34.69-.49,1.06-.02.05-.02.12-.05.17-.13.26,0,.31.23.3.08,0,.16,0,.24,0,.89,0,1.78,0,2.67,0,.26,0,.34.1.34.35,0,.29-.17.32-.39.32-.91,0-1.83.04-2.74-.01-.48-.03-.75.15-.92.55-.11.25-.17.52-.25.79-.07.21.02.29.23.28.72-.01,1.43-.02,2.15-.02.55,0,1.1.02,1.65.02.3,0,.45.13.43.43-.01.31-.26.24-.45.24-1.18,0-2.36,0-3.55,0-.2,0-.45-.05-.58.05-.14.11-.16.37-.24.56-.03.07-.09.13-.12.2-.31.63-.22.79.48.79,1.6,0,3.19-.01,4.79-.02.29,0,.62.28.57.52-.06.29-.33.14-.5.15-.34.02-.68,0-1.01,0-1.33,0-2.65,0-3.98,0-.74,0-.73-.09-.8.81,0,.08,0,.16,0,.24.01.41.03.44.45.43.85,0,1.7-.05,2.56-.05,1.35,0,2.7.04,4.05.06.1,0,.23-.03.29.02.17.15.31.34.46.51-.15.05-.3.11-.46.14-.12.03-.24.03-.36.03-2.03,0-4.05-.02-6.08-.03-1.14,0-1.24.1-1.17,1.27,0,.02,0,.04,0,.06.04.43.04.43.45.42.65-.01,1.31-.03,1.96-.02,1.11,0,2.22.03,3.33.03,1.29,0,2.58,0,3.87,0,.15,0,.32.03.45.11.16.09.41.19.29.44-.04.08-.27.08-.42.1-.12.02-.24,0-.36,0-2.92,0-5.84,0-8.77,0-.29,0-.64-.05-.86.09-.13.08-.06.47-.09.73-.01.12-.07.23-.08.34-.03.39,0,.45.42.45,1.17,0,2.34,0,3.51,0,2.03,0,4.06,0,6.09,0,.14,0,.28,0,.42,0,.31.02.32.26.33.47.01.27-.21.15-.34.18-.08.02-.16.02-.24.02-2.66,0-5.33-.01-7.99-.02-.59,0-1.17,0-1.76,0-.43,0-.45.03-.43.43.02.34.09.67.1,1.01,0,.23.13.25.3.25,1.61,0,3.22.02,4.83.02,1.93,0,3.86,0,5.78-.03.33,0,.33.2.35.42.04.3-.19.25-.35.25-.42,0-.83,0-1.25,0-1.84-.02-3.69-.07-5.53-.07-1.07,0-2.14.06-3.21.07-.98.01-1.08.12-.88,1.08.06.3.2.49.56.49.57-.01,1.14.03,1.71.03,1.98,0,3.96,0,5.94,0,.41,0,.82.08,1.23.06.65-.02,1.3-.09,1.94-.14.29-.02.46.14.48.48.02.28-.23.21-.38.25-.13.04-.28.01-.42.01h-4.99c-1.72,0-3.44,0-5.17,0-.27,0-.68-.17-.78.15-.08.26.06.62.17.91.07.2.14.44.48.43.71-.02,1.43.02,2.15.02,2.17,0,4.33-.02,6.5-.03.68,0,1.36,0,2.04,0,.22,0,.44,0,.66,0,.26,0,.4.15.47.37.02.05-.06.19-.1.19-.27.02-.54.02-.81.02-1.34.03-2.68.09-4.02.1-2.09.01-4.17-.02-6.26-.02-.66,0-.69,0-.7.68-.01.56.12.87.77.85,1.33-.04,2.66-.01,3.99-.01.91,0,1.83,0,2.74,0,.79,0,1.59,0,2.38,0,.07,0,.15.04.22.06-.04.08-.08.16-.13.23-.19.27-.44.38-.8.38-2.6-.02-5.21-.01-7.81-.01-.2,0-.4-.02-.6-.02-.18,0-.31.04-.23.28.1.36.19.72.25,1.09.05.28.2.33.46.33.93,0,1.86,0,2.79,0,1.01,0,2.03,0,3.04,0,.54,0,1.07,0,1.61,0,.23,0,.26.09.2.29-.09.36-.34.38-.64.38-2.13,0-4.25,0-6.38.01-.7,0-.74.05-.52.72.06.19.17.35.26.53.15.32.41.46.76.45.35,0,.71,0,1.06,0,.87-.01,1.74-.03,2.6-.04.65-.01,1.29-.03,1.94-.03.21,0,.46-.06.51.26.05.32-.08.48-.42.47-.37,0-.75-.05-1.12-.05-.4,0-.79.05-1.19.05-1.04,0-2.08,0-3.11,0-.48,0-.47.03-.37.48.04.15.04.31.1.46.2.59.3.65.93.59.08,0,.16,0,.24,0,1.06,0,2.12,0,3.18,0,.08,0,.17.06.27.1-.57.41-1.14.61-1.81.56-.63-.05-1.26,0-1.89,0-.19,0-.26.05-.14.24.24.36.49.71.69,1.09.15.29.49.45.48.85,0,.16.18.26.36.12.2-.16.41-.31.62-.46.58-.43,1.12-.93,1.75-1.29.52-.3,1.13-.45,1.71-.64.25-.08.38-.02.35.31-.05.57-.04,1.15,0,1.72.06.87.16,1.74.23,2.61.05.63.05,1.26.11,1.89.04.44.18.83.74,1.02-.09-.43-.21-.79-.24-1.15-.14-1.41-.28-2.83-.36-4.24-.05-1.01-.23-2.03.1-3.05.09-.27.06-.58.07-.88,0-1.17.08-2.32.54-3.42.11-.27.22-.56.39-.79.26-.35,2.13-1.97,2.58-2.32.39-.3.38-.31.18-.77-.25-.59-.53-1.18-.74-1.79-.39-1.14-.74-2.29-1.11-3.44-.36-1.12-.64-2.26-.58-3.46.02-.32-.07-.57-.38-.73-.78-.39-1.08-1.09-1.19-1.91-.02-.13-.11-.27-.21-.37-.15-.15-.34-.28-.52-.4-1.1-.76-1.54-1.88-1.62-3.13-.06-.89.26-1.76.49-2.62.24-.88.63-1.72.7-2.65,0,0,.01,0,.02-.01,0,0,0-.01-.01-.02.22-.36.47-.71.66-1.08.16-.31.24-.65.35-.99.02-.06-.03-.14-.04-.22-.09.02-.18.03-.26.07-.05.02-.09.08-.11.14-.22.65-.45,1.3-.66,1.95-.01.03.03.08.05.13,0,0,0,0,0,0,0,0,0,.02,0,.02ZM20.25,49.95c-.16.3-1.82,3.45-2.37,4.31-.06.1-.1.22-.17.31-.13.17-.11.27.1.34.6.2,1.19.41,1.78.61.18.06.37.11.56.16.01-.19.15-3.91.1-5.73ZM26.47,52.59c-.25-1.2-.13-2.35.26-3.48.02-.06.03-.12.06-.17.42-.72.8-1.46,1.27-2.14.77-1.11,1.74-2.03,2.78-2.89,1-.83,1.99-1.69,2.75-2.76.02-.03.07-.05.09-.08.03-.08.04-.17.06-.25-.07.02-.15.03-.2.07-.11.09-.19.19-.3.28-.82.72-1.64,1.43-2.47,2.14-.89.75-1.78,1.49-2.67,2.25-.27.23-.51.5-.76.74-.36.35-.71.73-1.11,1.05-.12.1-.37.07-.56.06-1.09-.07-2-.55-2.82-1.23-.51-.43-1-.88-1.58-1.38.05.39.07.73.14,1.06.08.41.18.81.31,1.21.34,1.02.66,2.06,1.06,3.06.22.54.59,1.02.87,1.54.08.15-.34.43-.44.29-.46-.65-.95-1.31-1.29-2.03-.16-.33-.28-.69-.42-1.04-.07-.17-.09-.35-.18-.5-.06-.1-.21-.15-.32-.22-.03.1-.1.2-.09.31.02.71.07,1.43.09,2.14.04,1.43.15,5.11.19,5.52.06.61-.16.79-.75.63-.77-.21-1.56-.39-2.32-.63-.51-.16-1-.37-1.48-.6-.96-.44-1.96-.84-2.87-1.38-1.25-.74-2.49-1.51-3.5-2.6-.52-.56-1.12-1.07-1.57-1.69-.89-1.23-1.93-2.36-2.62-3.73-.37-.74-.72-1.49-1.05-2.26-.29-.68-.55-1.38-.81-2.08-.11-.31-.17-.64-.26-.96-.11-.38-.23-.75-.34-1.13-.43-1.51-.75-3.05-1-4.61-.27-1.61-.4-3.22-.31-4.85.05-.87.09-1.74.04-2.6-.06-1.2.16-2.36.29-3.53.13-1.1.31-2.21.68-3.25.33-.91.4-1.89.82-2.77.19-.39.31-.81.48-1.21.46-1.09.9-2.18,1.39-3.25.19-.42.51-.77.76-1.17.29-.47.57-.94.83-1.42.46-.83,1.13-1.49,1.8-2.14.45-.44.88-.9,1.35-1.32.63-.56,1.26-1.12,1.94-1.62.79-.58,1.69-1,2.54-1.49,1.57-.9,3.28-1.32,4.98-1.81.79-.23,1.58-.3,2.39-.34.53-.02,1.05-.17,1.57-.23.33-.04.67-.07,1-.06.65.02,1.3.06,1.95.11.92.07,1.84.15,2.72.47.07.03.14.07.22.08,1.79.35,3.47,1.05,5.11,1.82.92.44,1.78,1.01,2.67,1.52.19.11.38.21.56.34.23.17.46.35.68.54.4.35.79.72,1.18,1.08.65.6,1.26,1.24,1.7,2.02.17.3.46.55.68.82.87,1.08,1.61,2.24,2.14,3.53.23.56.56,1.09.78,1.66.25.66.41,1.34.63,2.01.2.63.43,1.26.63,1.9.08.26.1.53.15.8.01.08,0,.16.03.24.62,1.81.75,3.71,1.03,5.59.06.37.02.75.02,1.13,0,1.01.05,2.02,0,3.03-.06,1.31-.11,2.63-.29,3.94-.17,1.2-.33,2.39-.66,3.56-.32,1.13-.62,2.28-1,3.39-.29.86-.68,1.68-1.06,2.51-.37.82-.67,1.69-1.18,2.42-.93,1.32-1.59,2.84-2.89,3.9-.61.49-1.12,1.11-1.67,1.66-.79.78-1.71,1.41-2.64,1.98-1.06.65-2.21,1.19-3.36,1.68-.89.37-1.85.57-2.78.85-.95.29-1.92.44-2.91.46-.66.02-1.32.18-1.99.24-.38.03-.41-.03-.36-.39.03-.19.17-1.89.35-2.53.17-.59.67-.96,1.02-1.43.26-.35.6-.63.93-.92.78-.71,1.66-1.26,2.6-1.73.81-.4,1.57-.89,2.37-1.32,1.32-.72,2.44-1.72,3.58-2.67,1.06-.88,1.97-1.93,2.8-3.03.41-.54.7-1.18,1.02-1.79.07-.13-.31-.36-.38-.24-.31.48-.63.96-.86,1.48-.35.76-.97,1.29-1.5,1.9-.47.54-1.06.99-1.61,1.45-.95.79-1.86,1.64-2.87,2.33-.97.66-2.05,1.16-3.07,1.75-.53.31-1,.71-1.54.97-.48.24-.86.68-1.26.99-.13.1-.23.25-.37.41ZM23.85.94c-1.27-.11-2.35.26-3.45.49-.47.1-.91.38-1.38.49-.52.12-1.03.16-1.53.39-.91.43-1.86.75-2.79,1.12-.38.15-.79.28-1.14.5-.61.39-1.18.84-1.76,1.27-.25.19-.48.43-.75.58-.66.36-1.19.85-1.65,1.43-.26.32-.63.57-.82.93-.18.35-.44.59-.71.85-.17.16-.35.33-.49.52-.43.56-.82,1.15-1.27,1.68-.69.81-1.04,1.8-1.5,2.73-.48.97-.92,1.96-1.31,2.96-.36.91-.63,1.86-.93,2.8-.16.51-.3,1.03-.42,1.55-.18.75-.35,1.5-.49,2.26-.08.44-.11.89-.15,1.34-.02.33.05.68-.04.98-.17.6-.16,1.2-.18,1.81-.02.56.03,1.12-.04,1.67-.11.91-.01,1.81.04,2.71.08,1.28.21,2.57.36,3.84.1.84.21,1.68.44,2.49.38,1.34.88,2.63,1.28,3.97.53,1.76,1.29,3.4,2.27,4.94.22.35.55.64.72,1,.39.79,1.09,1.33,1.54,2.08.35.58.8,1.14,1.37,1.61.69.57,1.24,1.32,2,1.83.93.61,1.8,1.32,2.79,1.8.75.36,1.39.94,2.26,1.11.64.12,1.22.5,1.84.74.85.33,1.72.57,2.63.67.48.05.94.18,1.42.25.25.04.52,0,.77.06,1.57.31,3.16.18,4.73.14.83-.02,1.69-.25,2.48-.53.96-.34,1.99-.45,2.91-.9.37-.18.77-.3,1.16-.46.88-.35,1.78-.66,2.62-1.08.62-.32,1.17-.79,1.74-1.2.43-.31.87-.62,1.29-.95.31-.24.61-.49.89-.77.4-.41.84-.8,1.14-1.28.24-.37.49-.7.83-.97.17-.13.3-.32.43-.49.41-.54.8-1.11,1.24-1.63.69-.81,1.01-1.81,1.51-2.72.53-.95.82-1.99,1.29-2.97.42-.88.65-1.85.94-2.79.16-.51.29-1.03.42-1.55.16-.65.29-1.31.43-1.97.18-.84.07-1.72.24-2.56.16-.82.18-1.64.2-2.46,0-.4,0-.8.04-1.19.11-.9,0-1.8-.06-2.7-.07-1.07-.18-2.13-.31-3.19-.12-1-.2-2.01-.46-2.97-.35-1.34-.87-2.64-1.27-3.97-.3-1.01-.74-1.95-1.15-2.92-.57-1.37-1.46-2.53-2.28-3.73-.11-.16-.27-.29-.4-.44-.09-.1-.18-.2-.26-.3-.43-.61-.85-1.23-1.29-1.84-.08-.11-.21-.18-.31-.27-.1-.09-.21-.18-.31-.27-.49-.48-.94-1.03-1.48-1.45-1.52-1.16-3.17-2.13-4.86-3.04-.09-.05-.18-.08-.27-.11-.39-.12-.8-.19-1.16-.36-1.15-.54-2.32-.97-3.6-1.1-.37-.04-.72-.18-1.08-.23-.6-.08-1.21-.13-1.82-.19-.63-.06-1.26-.14-1.89-.15-.43,0-.87.09-1.18.12ZM26.66,59.48c-.38,0-1.02.01-1.67,0-.84-.02-1.7,0-2.53-.13-1.45-.25-2.89-.58-4.32-.93-.72-.18-1.42-.45-2.12-.73-.72-.29-1.47-.56-2.12-.97-.46-.29-.94-.49-1.4-.74-.14-.07-.25-.19-.36-.3-.17-.19-.28-.45-.61-.37-.02,0-.04,0-.05-.02-.65-.53-1.3-1.05-1.94-1.6-.43-.38-.8-.82-1.24-1.19-.62-.53-1.09-1.19-1.57-1.83-.61-.81-1.24-1.61-1.77-2.48-.75-1.23-1.6-2.42-2.01-3.83-.07-.24-.23-.46-.37-.67-.37-.55-.38-1.22-.6-1.82-.3-.79-.65-1.57-.8-2.39-.1-.54-.25-1.06-.4-1.58-.22-.75-.13-1.54-.38-2.29-.09-.27-.05-.58-.06-.88-.03-.64-.06-1.29-.11-1.93-.02-.27-.11-.54-.14-.81-.04-.36-.08-.72-.08-1.08-.01-.83-.02-1.65,0-2.48.01-.39.11-.78.14-1.17.12-1.32.21-2.65.36-3.97.06-.54.24-1.07.37-1.61.13-.55.26-1.11.41-1.65.12-.43.26-.85.4-1.27.02-.05.08-.11.08-.16-.08-.57.33-.99.45-1.5.1-.42.32-.81.42-1.22.13-.55.46-.99.7-1.49.29-.62.58-1.25.88-1.86.59-1.21,1.4-2.28,2.25-3.33.48-.59.94-1.2,1.4-1.81.36-.49.84-.86,1.28-1.26.15-.14.3-.28.46-.42.42-.36.83-.71,1.25-1.06.24-.2.48-.4.74-.57.37-.25.74-.49,1.13-.7.55-.3,1.12-.56,1.68-.84.12-.06.23-.14.36-.18.75-.23,1.46-.54,2.15-.9.24-.12.53-.13.79-.21.96-.29,1.9-.63,2.88-.86.92-.22,1.85-.39,2.81-.39.99,0,1.98-.02,2.96,0,.95.01,1.87.2,2.8.4.79.16,1.58.28,2.37.44.46.1.93.2,1.36.38,1.01.41,2.09.64,3.01,1.28.52.36,1.16.56,1.73.85.18.09.35.2.49.33.22.22.35.54.74.5.06,0,.13.14.2.2.2.15.41.28.61.43.3.22.62.43.89.68.46.43.92.87,1.34,1.34.58.64,1.13,1.31,1.7,1.96.77.9,1.38,1.9,1.99,2.91.43.72.92,1.4,1.3,2.15.45.87.97,1.76,1.17,2.69.21,1.01.68,1.91.9,2.91.2.9.4,1.82.73,2.7.07.18.03.39.05.59.1.93.28,1.84.25,2.79-.02.67.19,1.35.28,2.02.04.32.05.64.06.97,0,.85.01,1.69,0,2.54-.01.37-.11.74-.15,1.11-.12,1.32-.21,2.65-.36,3.98-.06.56-.25,1.11-.37,1.67-.1.44-.18.88-.3,1.31-.15.54-.34,1.07-.51,1.61-.02.05-.06.1-.07.16-.18,1.17-.8,2.19-1.08,3.33-.07.29-.34.53-.46.81-.46,1.09-.97,2.16-1.6,3.16-.48.74-1.06,1.42-1.6,2.13-.44.58-.86,1.17-1.32,1.72-.36.42-.77.81-1.18,1.19-.43.4-.86.78-1.32,1.14-.72.56-1.4,1.21-2.2,1.61-.68.34-1.35.71-2.02,1.06-.19.1-.42.11-.62.19-.59.25-1.17.57-1.77.77-.76.26-1.54.43-2.32.64-.25.07-.5.12-.74.21-1.09.43-2.25.5-3.66.63Z\"/>\n  </g>\n</svg>",
    15: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50.28 59.48\">\n  <g>\n    <path class=\"cls-1\" d=\"M19.22,5.28l.02-.02s.08.06.12.1c-.05-.02-.09-.05-.14-.07ZM22.63,8c.01.45.22.7.57.67.33-.03.59-.37.58-.77-.01-.32-.34-.77-.56-.76-.28.01-.6.48-.59.86ZM19.04,8.11c.03-.33-.29-.69-.67-.74-.29-.04-.38.08-.46.54-.01.08-.02.16-.02.23,0,.31.35.72.65.73.38,0,.41-.3.46-.57.01-.06.03-.12.04-.19ZM25.16,6.78c-.14-.01-.23-.03-.33-.03-.06,0-.11.03-.17.04.03.07.04.15.08.2.1.11.21.23.34.32.17.12.34.25.53.31.27.09.51.02.76-.17.16-.13.47-.09.71-.07.05,0,.08.3.09.47.02.33.13.61.4.83.34.28.4.29.48-.11.06-.27.19-.36.43-.4.09-.01.17-.07.26-.11-.08-.05-.15-.11-.23-.14-.31-.12-.64-.19-.92-.34-.3-.17-.27-.38-.02-.62.24-.24.5-.17.78-.14.1.01.21-.01.31-.02-.11-.31.11-.25.27-.25.21,0,.28-.1.27-.29-.01-.41-.51-1.07-.91-1.15-.07-.01-.18.1-.23.17-.31.43-.66.46-1,.06-.12-.13-.22-.28-.32-.43-.25-.33-.5-.67-.74-1-.17-.23-.4-.31-.68-.25-.39.08-.77.16-1.15.26-.09.02-.19.11-.22.18-.12.36-.31.37-.62.2-.12-.07-.4-.04-.48.06-.08.09-.05.35.02.49.16.36.36.7.57,1.03.07.11.21.21.33.23.44.06.86.18,1.26-.23.41-.43.62-.37,1.04.05.04.04.1.08.13.12.05.08.09.17.14.25-.08.02-.17.05-.25.07-.12.04-.34.06-.35.13-.08.38-.33.33-.56.29ZM31.39,9.27c-.11-.05-.19-.1-.27-.11-.03,0-.11.11-.1.16.02.07.09.13.14.2.04-.05.09-.1.23-.25ZM19.5,9.94c.2-.57.61-.68,1.05-.75.09-.01.18-.11.26-.16-.08-.08-.15-.19-.25-.23-.65-.24-1.2.29-1.06,1.14ZM34.39,10.6c0-.3-.27-.58-.55-.58-.23,0-.47.24-.46.46.01.26.44.66.69.63.29-.04.3-.27.31-.51ZM29.87,10.25c.01-.21.03-.31.02-.4-.03-.22-.27-.4-.47-.34-.22.08-.44.17-.64.29-.32.19-.43.52-.39.87.04.34.18.65.51.81.07.03.15.05.23.04.49-.06.86-.61.75-1.1-.02-.09-.01-.19-.01-.18ZM31.44,11.19c.02.28.04.49.06.71.02.23.16.33.38.39.36.1.71.21,1.05.37.66.3.72.62.31,1.24-.1.15-.22.29-.29.45-.24.49.06,1.04.57,1.16.32.07.62.24.93.37.17.08.19.2.13.39-.09.28-.16.57-.19.85-.01.09.09.27.15.27.12.01.25-.05.36-.12.05-.03.04-.14.06-.22.08-.38.27-.53.58-.37.45.23.8.02,1.17-.17.16-.08.17-.18.04-.33-.3-.37-.7-.4-1.13-.39-.11,0-.22-.1-.34-.15.08-.13.12-.31.23-.37.21-.11.46-.16.69-.23-.12-.14-.28-.26-.33-.41-.15-.41-.45-.62-.81-.82-.16-.08-.32-.25-.37-.41-.13-.4-.4-.67-.69-.94-.34-.32-.68-.64-1-.99-.09-.1-.11-.29-.12-.44-.01-.36,0-.71,0-1.07,0-.18-.1-.38-.27-.26-.38.28-.95.28-1.18.79-.03.06-.19.08-.29.09-.75.06-1.11.45-1.08,1.14,0,.04-.03.07-.04.11-.2.77.1,1.42.5,2.04.18.29.49.32.8.27.36-.06.46-.23.41-.62-.01-.11,0-.23.04-.32.25-.43.24-.46-.21-.65-.74-.31-.8-.84-.1-1.37ZM39.6,17.34c-.31,0-.43.08-.42.29.01.27.26.6.47.62.24.02.54-.3.49-.56-.05-.29-.29-.34-.54-.34ZM32.39,19.62c.13-.24.29-.47.15-.76-.03-.07-.09-.15-.15-.16-.05,0-.13.07-.17.12-.27.32-.09.56.17.8ZM41.38,18.59c-.12.11-.35.32-.34.33.24.31.49.61.77.87.13.12.31.11.47-.07.16-.19.38-.34.57-.5-.26-.12-.52-.25-.79-.36-.2-.09-.4-.16-.68-.26ZM34.72,17.45c-.85.02-.9.09-.61.63.18.33.37.65.36,1.05,0,.09.09.2.18.26.37.25.37.25.22.72-.2.61.2,1.24.83,1.31.4.04.54-.14.4-.51-.04-.11-.1-.22-.13-.33-.11-.48.01-.66.44-.69.47-.04.91-.37,1.43-.2.12.04.3-.07.45-.14.26-.12.33-.42.15-.64-.09-.1-.21-.19-.33-.25-.17-.1-.43-.13-.51-.27-.06-.1.14-.33.19-.5.03-.12.05-.33,0-.36-.14-.07-.34-.12-.48-.08-.3.08-.58.22-.77.51-.24.37-.25.34-.62.06-.41-.31-.87-.55-1.18-.56ZM18.68,21.82c-.13-.12-.19-.2-.26-.24-.42-.23-.84-.44-1.26-.66-.14-.07-.26-.12-.31.09-.04.16-.06.32.15.38.46.16.93.32,1.39.47.06.02.13-.01.29-.04ZM42.49,21.77c0-.3-.16-.44-.37-.35-.31.14-.6.71-.5,1.04.08.28.22.31.47.15.32-.2.38-.51.41-.84ZM17.41,23.05c.17-.11.3-.19.43-.27-.11-.06-.21-.15-.32-.16-.07,0-.18.1-.22.18-.02.05.06.15.11.26ZM41.04,22.51c.05-.35-.12-.57-.41-.72-.25-.13-.47-.03-.64.15-.23.23-.27.52-.14.82.14.33.54.64.75.58.2-.05.43-.48.44-.83ZM46.29,22.66c-.14.13-.22.21-.31.29-.09.07-.18.16-.29.19-.22.07-.19.21-.13.37.1.26.65.44.89.27.06-.04.1-.17.08-.25-.06-.26-.15-.52-.24-.86ZM33.73,25.64c-.06-.11-.12-.18-.1-.19.09-.1.2-.19.3-.29.03.04.09.1.08.11-.08.12-.17.22-.28.36ZM30.51,26.72c-.04-.12-.13-.25-.1-.29.36-.46.45-.99.46-1.56,0-.25.18-.52.43-.46.24.05.44.28.66.44-.04.05-.08.09-.11.14-.18.23-.37.45-.53.69-.2.29-.36.59-.56.88-.04.06-.13.08-.25.16ZM30.95,27.13c.49.03.89-.12,1.25-.45.38-.34.81-.61,1.22-.91.04-.03.15-.03.16-.01.03.06.05.16.02.19-.21.21-.41.43-.65.6-.34.24-.72.42-1.07.63-.32.19-.63.1-.93-.06ZM43.38,23.81c-.13.13-.29.25-.38.4-.09.15,0,.27.15.39.16.13.32.32.36.51.06.31.26.41.51.49.46.15.92.32,1.37.49.04.01.07.04.09.07.2.24.41.48.58.74.15.23.26.48.37.74.11.27.36.27.57.34-.03-.14-.05-.28-.08-.41,0-.02,0-.04,0-.06,0-.38-.01-.75-.5-.87-.05-.01-.08-.13-.13-.19-.34-.35-.32-.96-.86-1.16-.03,0-.03-.07-.05-.1-.28-.52-.65-.91-1.25-1.06-.25-.06-.47-.2-.76-.32ZM31.92,28.16c-.19-.09-.29-.18-.4-.19-.06,0-.14.09-.22.14.09.09.16.22.26.26.06.02.18-.1.36-.21ZM31.09,28.79c-.03.23-.05.36-.06.5-.03.32-.3.49-.54.32-.25-.18-.49-.39-.68-.63-.08-.11-.11-.39-.04-.46.16-.14.34-.02.43.16.12.24.29.38.56.31.09-.02.16-.09.34-.19ZM31.45,35.83c-.21-.17-.29-.23-.37-.3-.03.04-.09.1-.08.12.04.1.1.2.17.26.03.02.14-.04.28-.09ZM31.61,37.27c0-.48-.25-.76-.55-.77-.18,0-.39.26-.4.51,0,.27.3.56.6.51.15-.02.27-.19.35-.25ZM31.28,38.48c.14-.44-.2-.57-.43-.76-.08-.07-.2-.15-.28-.13-.12.02-.32.13-.31.19,0,.19-.08.45.23.52.27.06.53.12.79.18ZM31.32,39.15c.07-.09.13-.13.15-.19.01-.05-.02-.11-.03-.16-.07.06-.14.1-.19.17-.01.02.03.08.07.18ZM31.99,38.6c-.04.07-.1.13-.09.19.01.21.36.45.56.38.04-.01.09-.16.07-.17-.16-.13-.33-.25-.54-.4ZM31.34,39.48c-.15-.09-.27-.18-.4-.24-.01,0-.09.1-.13.16.13.07.26.15.4.22.01,0,.06-.06.13-.14ZM31.69,40.64c.05.13.1.25.14.37.08-.09.24-.19.23-.27,0-.09-.16-.17-.25-.26-.04.05-.07.11-.12.17ZM32.44,40.91s-.07-.05-.11-.08c-.07.15-.16.29-.19.45-.02.12.04.25.06.37.05-.1.13-.19.16-.29.04-.14.06-.3.08-.45ZM46.92,33.53c-.52.58-1.15.85-1.85,1.02-.21.05-.37.2-.26.54.13.39-.04.77-.36,1.06-.19.17-.38.34-.57.53-.56.56-1.49.7-2.18.3-.19-.11-.29-.07-.41.04-.09.1-.18.21-.24.33-.14.26-.35.39-.63.27-.23-.1-.21,0-.27.19-.26.85-.22,1.73-.18,2.59.03.66.28,1.29.66,1.86.16.24,3.44,1.13,3.59.93.38-.48.63-1.02.8-1.61.05-.19,0-.26-.18-.26-.75-.03-1.49-.06-2.24-.09-.33,0-.66.02-.99,0-.1,0-.23-.08-.28-.17-.17-.27-.04-.49.3-.49,1.15,0,2.3,0,3.46,0,.35,0,.55-.19.58-.51.02-.19.04-.38.09-.56.1-.36-.01-.55-.37-.57-.3-.01-.6,0-.89,0-.95,0-1.91,0-2.86-.01-.16,0-.36,0-.32-.23.03-.17.13-.45.24-.47.36-.06.74-.03,1.1-.02.34,0,.67.05,1.01.05.61,0,1.21-.02,1.82,0,.5.01.75-.15.89-.64.2-.71.02-.92-.73-.87-.06,0-.13.04-.17.01-.05-.03-.11-.15-.1-.16.21-.23.32-.57.76-.57.55,0,.58-.08.62-.61.04-.6.11-1.2.17-1.88ZM19.22,5.28c-.1.16-.21.31-.3.48-.12.22-.28.36-.55.38-.25.02-.28.15-.11.34.33.38,1.05.57,1.51.39.45-.18.88-.38,1.32.03.08.07.22.09.34.1.19.03.38.05.57.07,0-.14.01-.29.02-.43,0-.02.01-.04.03-.05.32-.26.07-.46-.1-.63-.12-.12-.29-.2-.46-.26-.28-.1-.46-.22-.27-.55.14-.25-.08-.59.19-.82,0,0-.06-.16-.11-.18-.17-.05-.35-.09-.47.12-.18.32-.26.15-.37-.06-.07-.13-.19-.27-.32-.32-.38-.16-1.37.19-1.63.55-.03.05-.1.11-.14.11-.7-.09-1.28.33-1.91.51-.88.26-1.68.77-2.51,1.18-.1.05-.2.09-.3.13.04.05.08.1.12.14.77,0,1.55,0,2.32,0,.13,0,.26.04.39.06-.06.14-.11.28-.2.41-.14.2-.34.21-.58.21-.93-.02-1.87-.02-2.8,0-.2,0-.46.05-.6.18-.46.41-.88.87-1.39,1.39.26.01.39.02.53.02,1.07,0,2.15,0,3.22,0,.37,0,.38.06.29.42-.07.29-.28.24-.46.24-1.29,0-2.58,0-3.87,0-.32,0-.59.06-.8.31-.32.38-.63.75-.94,1.14-.05.07-.07.17-.1.25.09.02.18.06.28.06.52,0,1.03,0,1.55,0,1.51-.01,3.01-.03,4.52-.03.13,0,.35.06.38.15.05.12,0,.34-.08.43-.09.09-.28.11-.43.11-.7.01-1.39,0-2.09,0-1.33,0-2.66,0-3.99-.03-.47,0-.86.04-.99.59-.03.12-.17.21-.26.32-.11.14-.23.27-.34.41-.15.21-.05.28.16.28.08,0,.16,0,.24,0,2.17,0,4.33,0,6.5,0,.14,0,.42-.14.41.15,0,.22-.1.48-.41.5-.12,0-.24,0-.36,0-2.03,0-4.06.07-6.08-.03-.8-.04-1.13.27-1.4.88-.06.13-.12.25-.17.38-.1.21-.02.29.2.29.42,0,.83,0,1.25,0,2.01,0,4.01,0,6.02-.02.24,0,.31.04.31.28,0,.3-.11.42-.43.4-.59-.03-1.19-.04-1.78-.04-1.61,0-3.22.03-4.83.04-1.28,0-1.27,0-1.64,1.24-.08.27-.04.37.24.37.57,0,1.14,0,1.71,0,1.89,0,3.78,0,5.66,0,.16,0,.32-.02.47.02.08.02.18.14.19.23.05.35-.02.41-.44.41-2.47,0-4.93,0-7.4,0-.74,0-1,.2-1.21.92-.02.08-.04.15-.06.23-.1.43-.1.45.33.45,1.31,0,2.62,0,3.93-.01,1.53,0,3.05-.01,4.58-.02.25,0,.38.18.38.47,0,.25-.19.2-.34.21-.14,0-.28,0-.42,0-2.7,0-5.41,0-8.11,0-.55,0-.54,0-.71.55-.03.09-.09.17-.14.26-.35.65-.27.8.47.8,2.14,0,4.28-.03,6.43-.03,1,0,2,.03,3.01.04-.14.57-.49.67-.98.66-2.8-.02-5.61-.02-8.41,0-1.1,0-.83-.17-1,.97-.06.43.03.5.5.5,1.83,0,3.66,0,5.48.01.82,0,1.63,0,2.45,0,.15,0,.33.03.42.12.09.08-.28.51-.45.53-.12.01-.24,0-.36,0h-7.14q-1.15,0-1.18,1.14c0,.14-.02.29.03.41.04.1.16.24.25.24.59,0,1.18-.03,1.76-.05.14,0,.28,0,.42,0,.51.02,1.03.06,1.54.06,1.22,0,2.44,0,3.66,0,.07,0,.17.02.2.07.09.14-.25.59-.43.59-.8,0-1.61,0-2.41,0-1.47,0-2.94,0-4.42,0-.69,0-.69,0-.75.68-.01.18-.07.35-.09.53-.03.26.05.42.36.4.14-.01.28,0,.42,0h6.44c.14,0,.28,0,.42,0,.35,0,.28.33.41.5-.13.05-.25.12-.38.15-.11.03-.24,0-.36,0-2.26,0-4.52-.01-6.77-.02-.45,0-.64.05-.49.53.05.15.02.32.03.47.05.65.05.65.68.65,1.07,0,2.15,0,3.22,0,.37,0,.75.07,1.12.07.73,0,1.47-.06,2.2-.07.85-.01,1.7,0,2.55,0,.33,0,.46.13.46.46,0,.32-.26.15-.4.19-.11.03-.24,0-.36,0-2.92,0-5.84,0-8.77,0-.16,0-.32-.01-.48.02-.07.01-.19.11-.18.17.01.35.04.7.09,1.05.04.25.19.35.46.35.67,0,1.35.03,2.02.02,2.61-.03,5.23.03,7.84-.02.06,0,.13-.02.18,0,.08.04.18.09.2.16.13.4.04.51-.4.51-2.04,0-4.08,0-6.12,0-1.13,0-2.26,0-3.4,0-.78,0-.79,0-.64.77.05.24.17.51.33.68.09.1.36.04.54.04.24,0,.48,0,.72,0,1.11.01,2.21.04,3.32.04,2.13,0,4.25-.02,6.38-.03.2,0,.34.05.35.3,0,.23-.09.33-.31.35-.08,0-.16,0-.24,0-.57,0-1.14,0-1.71,0-.81,0-1.61,0-2.42,0-1.92,0-3.85,0-5.77,0-.6,0-.6,0-.65.59-.07.77.13.98.9.98,1.09,0,2.17-.03,3.26-.03,1.09,0,2.17.02,3.26.02,1.03,0,2.05,0,3.08,0,.06,0,.15-.01.17.02.11.16.2.32.3.49-.13.05-.26.14-.39.15-.55.02-1.1.01-1.65,0-.82-.01-1.64-.04-2.46-.05-1.88-.01-3.77-.01-5.65-.02-.22,0-.35.08-.3.32.08.37.17.73.24,1.09.05.25.18.3.42.3,1.03-.01,2.06,0,3.1,0,1.23,0,2.46,0,3.69,0,1.03,0,2.05,0,3.08,0,.81,0,1.61-.01,2.39.31.96.39,1.97.39,2.96.04.79-.28,1.61-.41,2.45-.34.08,0,.16,0,.24,0,.26.02.53.27.46.49-.03.11-.26.2-.41.22-.33.04-.66.03-.99.02-1.12-.02-2.25-.06-3.37-.06-1.55,0-3.09.05-4.64.05-1.27,0-2.54-.05-3.81-.06-.83,0-1.66.07-2.49.07-.74,0-1.49-.05-2.23-.07-.39,0-.46.06-.35.45.08.28.22.54.32.82.13.34.38.45.73.45,1.11-.01,2.22,0,3.33,0,.85,0,1.7-.03,2.56-.03,1.51,0,3.01.03,4.52.03s2.86-.03,4.29-.03c.71,0,1.43.03,2.14.07.09,0,.25.15.24.2-.04.17.01.43-.3.42-.16,0-.32,0-.48,0-2.68,0-5.36-.02-8.05-.03-1.75,0-3.49,0-5.24,0-1.07,0-2.14,0-3.22,0,.09.37.15.68.23.98.16.54.31.64.89.62.1,0,.2,0,.3,0,3.26,0,6.52,0,9.78,0,1.33,0,2.66,0,3.99,0,.1,0,.21.05.31.08-.05.08-.08.17-.14.25-.2.3-.51.35-.84.35-1.35,0-2.7,0-4.05,0-1.07,0-2.14-.02-3.22-.02-.83,0-1.67.02-2.5.02-1.17,0-2.34-.01-3.52-.02-.22,0-.3.07-.19.28.12.23.23.46.36.68.28.45.62.72,1.23.7,1.6-.05,3.21-.03,4.82-.02.22,0,.44.08.65.12-.18.15-.35.31-.53.46-.06.04-.14.06-.22.07-.75.02-1.5.06-2.25.06-.79,0-1.59-.03-2.38-.05-.07,0-.14.04-.22.05.02.07.03.15.07.2.25.38.52.74.76,1.13.19.3.43.45.79.42.27-.02.54-.02.82-.01.15,0,.29.02.44.04-.07.15-.12.33-.23.46-.11.12-.28.19-.47.3.26.25.5.5.76.74.11.1.24.16.33-.03.21-.46,3.62-3.03,4.17-3.48.45-.37.95-.56,1.74-.1l1.68.89c.21-.1.71-.5.89-.65.43-.34,1.93-1.37,2.17-1.63.51-.54,1.38-1.28,1.7-1.98.13-.28.69-1.56.67-2.16,0-.45.06-.91.05-1.36,0-.32-.02-.68-.17-.94-.35-.6-1.22-.86-1.92-.74-1.43.26-2.81.89-4.32.62-.54-.1-1.09-.17-1.6-.36-.7-.25-1.11-1.01-1.03-1.75.07-.64.17-1.28.05-1.94-.07-.37-.19-.63-.56-.74-.27-.08-.42-.28-.53-.53-.15-.34-.13-.67.05-.97.17-.28.17-.46-.2-.51-.3-.04-.41-.26-.53-.5-.23-.48-.04-.93.06-1.38.09-.38.19-.77.21-1.16.03-.35-.12-.46-.47-.43-.21.02-.43.08-.64.15-1.07.32-1.93-.65-1.5-1.51.23-.47.35-1.01.57-1.48.53-1.14,1.09-2.27,1.91-3.24.21-.25.35-.57.52-.86.24-.43.09-.81-.22-1.11-.15-.15-.16-.23-.08-.39.05-.1.1-.21.1-.32.02-.6.09-1.22.03-1.81-.14-1.23.08-2.4.38-3.57.13-.49.19-1.02.39-1.48.3-.69.7-1.33,1.04-2,.14-.26.36-.55.34-.81-.03-.37-.24-.73-.39-1.09-.16-.38-.3-.75-.19-1.2.14-.55.49-.89.89-1.22.08-.06.2-.2.18-.24-.22-.41-.08-.65.3-.84.09-.04.17-.3.14-.32-.28-.21-.08-.34.06-.47.23-.22.45-.44.71-.62.1-.08.28-.11.41-.08.12.02.23.09.34.15ZM16.06,29.4c-.08.4-.57.48-.8.44-.37-.06-.38.05-.38.36-.01.37-.12.74-.21,1.1-.07.28-.12.51.26.57.06,0,.11.05.16.09.47.32.95.5,1.55.39.4-.07.67.14.81.45.07.15.06.28-.13.31-.37.05-.69.28-1.12.17-.34-.09-.69.18-.97.43-.03.02.05.18.09.25.01.02.11-.02.17-.01.49.03.48.03.35.5-.03.11-.01.31.06.35.68.45.59,1.14.59,1.81,0,.55-.04,1.09-.03,1.64.01.57.69.95,1.26.96.82.01,1.32-.09,2.06-.51.86-.48,1.67-1.05,2.46-1.65.59-.45,1.24-.84,1.89-1.23.91-.54,1.83-1.06,2.75-1.59.24-.14.48-.28.72-.4.49-.23.93,0,.89.54-.04.5-.12,1.01-.57,1.38-.41.34-.75.74-.73,1.36.01.41-.28.73-.53,1.04-.2.25-.42.48-.61.74-.32.45-.28.88.03,1.36.49.77.96,3.09.94,4.01-.03.96.05,1.9.31,2.86.04.15-.58-.44-.58-.44.08-.32-.37-3.85-1.14-4.91-.02.16-.23,2.12-.67,2.82-.77,1.23-1.72,2.31-2.95,3.12-.57.38-1.15.74-1.7,1.14-.33.24-.31.26,0,.49.89.63,11.32,6.69,11.72,6.88-1.45.5-2.8.92-4.25.92-.49,0-.97.15-1.46.19-.49.04-.98.03-1.46.03-.4,0-.79.01-1.19-.02-.63-.05-1.25-.18-1.88-.19-.75,0-1.41-.35-2.12-.51-.89-.2-1.76-.54-2.62-.89-.85-.35-1.66-.82-2.51-1.17-.92-.38-1.74-.94-2.56-1.48-.54-.35-1.05-.77-1.52-1.23-.62-.6-1.26-1.21-1.76-1.91-.9-1.25-1.97-2.39-2.65-3.78-.46-.94-.95-1.87-1.32-2.85-.36-.93-.58-1.9-.87-2.85-.07-.22-.17-.44-.24-.66-.47-1.61-.79-3.25-1.06-4.9-.2-1.24-.29-2.48-.27-3.73.02-1.46-.05-2.92.05-4.38.08-1.32.31-2.62.51-3.93.1-.64.2-1.31.44-1.91.4-.99.49-2.07.89-3.05.31-.77.62-1.53.95-2.29.19-.45.41-.89.61-1.34.33-.73.75-1.41,1.19-2.07.18-.28.3-.6.48-.88.62-.95,1.33-1.81,2.22-2.53.41-.33.72-.79,1.11-1.14.66-.59,1.33-1.17,2.04-1.69.6-.44,1.24-.83,1.91-1.17,1.24-.64,2.49-1.27,3.86-1.59.73-.17,1.44-.42,2.17-.62.3-.08.62-.11.93-.15,1.07-.11,2.15-.28,3.23-.31,1.06-.03,2.12.05,3.18.16.62.06,1.22.27,1.83.41.06.01.11.04.17.05.72.19,1.44.36,2.15.57.34.1.66.26.98.4.65.28,1.32.53,1.95.85.91.47,1.78,1,2.67,1.51.03.02.06.05.1.06,1.11.56,1.94,1.46,2.76,2.35,1.33,1.43,2.52,2.98,3.49,4.68.45.79.8,1.63,1.17,2.46.3.68.55,1.38.81,2.07.11.31.18.64.27.96.1.34.21.67.29,1.02.32,1.34.56,2.69.95,4.01.33,1.14.18,2.31.43,3.45.05.22-.04.47-.04.71-.02,1.6.05,3.2-.06,4.8-.14,2.01-.33,4.03-.96,5.95-.31.95-.45,1.95-.83,2.88-.16.38-.31.76-.48,1.14-.46,1.07-.9,2.14-1.4,3.19-.26.54-.64,1.01-.95,1.52-.17.28-.3.59-.48.87-.61.95-1.31,1.82-2.22,2.51-.4.31-.68.77-1.06,1.11-.64.58-1.3,1.15-1.99,1.67-.62.45-1.29.83-1.95,1.22-.28.17,4.55-10.52,4.76-10.89.11-.21.12-.4-.03-.61-.49-.68-.81-1.44-1.01-2.24-.15-.57-.12-1.14-.09-1.73.03-.76.23-1.48.28-2.22,0-.15-.04-.31-.12-.44-.02-.03-.23.04-.35.08-.52.17-1.01-.09-1.25-.62-.36-.81-.68-1.64-1.12-2.4-.53-.9-.92-1.86-1.33-2.82-.18-.42-.45-.68-.95-.63-.09,0-.19-.1-.28-.16-.41-.28-.8-.6-1.35-.4-.09.03-.2.02-.3,0-.53-.04-.58-.04-.57.52.01.97.11,1.94.12,2.91.01.79.45,1.45.59,2.2.04.19.12.38.16.57.04.22.05.43-.19.57-.08.05-.11.22-.12.34,0,.03.18.07.26.11.11.05.23.11.31.19.02.02-.07.18-.13.25-.12.12-.1.16.03.26.2.16.16.38-.08.36-.37-.02-.36.17-.32.4.04.22.11.43.43.35.08-.02.25.04.28.1.03.09,0,.25-.06.32-.11.14-.28.22-.4.35-.07.08-.13.21-.11.3.01.07.15.15.24.17.42.11.52.33.33.73-.07.15-.14.32-.17.48-.04.23-.04.44-.36.44-.06,0-.12.13-.17.21-.23.38-.5.4-.69.01-.17-.36-.5-.67-.41-1.14.01-.06-.09-.14-.14-.21-.03.07-.1.15-.1.22.02.43-.16.89.25,1.25.04.04,0,.25-.07.32-.28.26-.63.2-.96.16-.3-.03-.36-.29-.44-.5-.06-.15,0-.21.18-.16.49.14.6.06.58-.43,0-.16-.02-.29.09-.43.05-.06,0-.3-.08-.33-.12-.06-.3-.05-.42,0-.09.04-.15.18-.2.28-.12.23-.32.37-.53.23-.17-.12-.32-.35-.36-.56-.04-.2.06-.43.12-.64.02-.08.13-.13.19-.19.05.07.14.14.14.21,0,.36.17.24.3.09.09-.09.16-.22.17-.35.03-.26.1-.46.34-.59.06-.03.08-.11.12-.17-.07-.02-.17-.08-.21-.05-.18.12-.35.3-.56.05-.19-.23-.26-.46-.14-.77.11-.28.1-.6.42-.8.1-.06.09-.3.1-.47.01-.25-.06-.53,0-.76.21-.72.47-1.43.71-2.15,0-.03.06-.04.17-.09-.03.42-.06.81-.09,1.19-.02.24.06.15.18.09.02-.01.12.07.16.13.05.09.08.2.11.29l.16-.28s.04-.07.09-.16c.08.23.15.43.22.63.04,0,.07-.01.11-.02,0-.28,0-.57,0-.85,0-.05-.07-.14-.1-.14-.53.08-.31-.33-.34-.55-.07-.45-.1-.9-.16-1.49-.14.35-.23.57-.32.8-.01-.45-.09-.89.2-1.27.09-.11.1-.3.1-.45,0-.71,0-1.43-.03-2.14-.01-.35.05-.71-.26-1-.22-.21-.12-.48,0-.72.11-.25.32-.13.51-.16.39-.07.48.08.41.42-.01.07.02.15.04.29.4-.22.8-.39,1.15-.63.94-.65,1.72-1.48,2.23-2.5.28-.55.22-1.2.17-1.82-.02-.23-.04-.47-.07-.7-.02-.13-.07-.26-.12-.39-.11-.28-.39-.21-.61-.28-.04.16-.09.31-.11.47-.03.25-.04.5-.05.75-.31-.14-.12-.46-.24-.68-.15-.28-.11-.63-.51-.8-.25-.1-.43-.06-.59.05-.06.04,0,.31.05.46.08.2.23.37.3.58.03.08-.05.21-.08.31-.08-.05-.16-.09-.23-.15-.03-.02-.05-.06-.07-.09-.1-.14-.25-.4-.3-.38-.2.06-.37.21-.53.35-.04.03-.02.19.03.24.06.06.18.08.27.1.78.2.94.71.88,1.52,0,.06-.12.12-.18.18-.06-.07-.15-.14-.16-.22-.03-.23,0-.47-.05-.69-.08-.36-.37-.5-.7-.54-.07,0-.16.05-.23.09-.09.05-.17.12-.25.18-.04-.1-.1-.2-.11-.31-.01-.29,0-.59,0-.88.01-.27.03-.55.06-.89-.14.13-.23.22-.32.31-.22.21-.46.32-.75.18-.56-.28-.99.08-1.44.3-.11.05-.18.26-.19.4-.03.28,0,.56,0,.83,0,.41-.17.64-.5.69-.38.05-.86-.25-.92-.58-.02-.12-.01-.24-.04-.35-.09-.34-.29-.57-.65-.61-.39-.04-.76-.08-.98-.46-.28-.48-.57-.99-.45-1.57.05-.26.01-.41-.16-.57-.46-.42-.65-.89-.28-1.47.12-.19.04-.35-.16-.43-.32-.12-.64-.2-.96-.32-.47-.17-.94-.36-1.09-.91-.09-.37-.17-.75-.25-1.13-.26.17-.49.38-.76.48-.28.11-.56-.08-.63-.32-.21-.69-.81-1-1.28-1.44-.43-.41-.66-.88-.7-1.46-.04-.56-.05-.59-.6-.69-.19-.04-.41-.11-.58-.07-.37.09-.69.06-.98-.2-.23-.2-.35-.03-.47.14-.66.87-1.18,1.81-1.53,2.86-.37,1.15-.48,2.31-.49,3.49,0,.08,0,.16.01.24.04.14.11.28.16.42.11-.08.22-.16.32-.25.69-.6,1.46-1,2.41-.9.17.02.35.08.51.15.18.08.29.41.57.12.03-.03.28.11.39.22.06.06.06.22.03.32-.01.04-.17.08-.25.06-.56-.1-1.1-.09-1.65.07-.39.11-.67.31-.81.72,1.04.19,1.78.83,2.5,1.52.19.18.38.35.59.49.22.15.2.28.01.41-.31.21-.63.4-.94.6-.29.19-.59.38-.86.6-.1.08-.11.27-.19.39-.09.15-.19.36-.33.42-.22.1-.29-.14-.37-.29-.14-.29-.29-.57-.8-.54.21-.15.32-.22.41-.31.05-.06.1-.19.07-.24-.37-.6-.75-1.2-1.13-1.79-.04.01-.08.02-.13.03-.01.06-.05.13-.04.19.05.78-.37,1.7-.88,2.23-.62.65-.85,1.19-1.19,1.99-.29.67-.64,1.32-.95,1.98-.11.25-.21.5-.09.8.12.29.3.45.63.42.53-.04,1.06-.09,1.59.08.13.04.27.06.37.14.33.26.8.25,1.21.18v-.02s.02.01.02.01h-.02ZM26.51,58.53c1.24.11,2.32-.26,3.42-.49.47-.1.91-.36,1.38-.49.49-.13.99-.15,1.48-.37.98-.45,2.04-.72,3-1.24.33-.18.72-.25,1.03-.45.62-.4,1.21-.85,1.81-1.29.27-.2.52-.43.8-.61.45-.29.88-.59,1.23-1.01.35-.43.8-.79,1.08-1.25.19-.31.41-.57.66-.81.22-.2.43-.42.61-.65.41-.52.77-1.08,1.2-1.58.69-.81,1.02-1.81,1.52-2.72.52-.95.75-2.03,1.31-2.96.06-.1.07-.22.11-.34.25-.7.44-1.43.7-2.13.38-1.08.64-2.2.87-3.33.17-.84.27-1.69.25-2.55-.01-.5.18-1,.21-1.51.04-.77-.05-1.56.06-2.32.15-1.05.04-2.09-.03-3.13-.06-.81-.16-1.62-.22-2.42-.11-1.34-.23-2.68-.63-3.97-.38-1.22-.69-2.45-1.17-3.64-.32-.79-.55-1.61-.91-2.38-.43-.93-.91-1.84-1.44-2.73-.65-1.1-1.57-2.02-2.25-3.1-.15-.23-.34-.43-.52-.64-.19-.22-.38-.44-.58-.66-.09-.1-.21-.18-.3-.27-.47-.47-.9-1.01-1.43-1.41-.86-.66-1.76-1.3-2.71-1.83-.92-.51-1.78-1.12-2.82-1.41-.59-.16-1.13-.51-1.71-.74-1.32-.53-2.71-.74-4.1-.91-1.54-.19-3.1-.45-4.66-.2-.21.03-.43-.02-.65-.02-.12,0-.24-.02-.35,0-1.14.29-2.35.34-3.44.87-.59.28-1.25.21-1.86.52-.85.44-1.77.76-2.69,1.06-1.03.34-1.82,1.07-2.73,1.61-.64.38-1.22.87-1.83,1.31-.05.03-.1.07-.13.12-.53.73-1.3,1.27-1.71,2.1-.03.07-.09.13-.15.18-.48.36-.89.79-1.19,1.31-.15.27-.3.56-.53.77-.56.52-.93,1.17-1.3,1.82-.15.27-.21.59-.34.88-.23.49-.51.97-.74,1.47-.23.5-.41,1.02-.61,1.53-.11.27-.27.53-.36.81-.17.53-.26,1.08-.47,1.59-.53,1.27-.82,2.6-1.11,3.93-.17.8-.24,1.61-.23,2.44,0,.5-.17,1.01-.2,1.51-.04.77.05,1.56-.06,2.32-.15,1.03-.03,2.05.03,3.07.05.85.17,1.69.23,2.54.11,1.36.24,2.72.65,4.03.37,1.16.65,2.34,1.13,3.47.33.78.58,1.59.89,2.38.1.28.26.53.38.8.6,1.39,1.51,2.59,2.42,3.79.12.15.29.26.4.42.43.61.85,1.23,1.28,1.84.07.1.17.17.26.25.17.16.33.33.5.48.52.48,1.03.98,1.58,1.43.51.41,1.06.76,1.61,1.12.51.34,1.03.67,1.56.98.45.27.92.5,1.39.75.14.07.29.13.44.18.38.13.78.22,1.15.38,1.12.49,2.25.94,3.49,1.05.5.05.99.2,1.49.28.51.08,1.02.12,1.53.17.59.05,1.18.13,1.78.14.45,0,.91-.08,1.27-.12ZM27.23,59.47c-1.34,0-2.28,0-3.23,0-.93,0-1.84-.19-2.74-.37-.83-.17-1.66-.3-2.48-.47-.46-.1-.92-.23-1.36-.38-.72-.25-1.45-.47-2.12-.81-.62-.31-1.3-.54-1.84-1.01-.1-.09-.25-.13-.38-.17-.43-.13-.82-.31-1.06-.71-.02-.03-.05-.08-.08-.09-.53-.07-.77-.6-1.23-.8-.35-.15-.66-.43-.95-.7-.45-.41-.88-.85-1.3-1.3-.56-.61-1.09-1.24-1.62-1.87-1.06-1.25-1.92-2.63-2.74-4.04-.42-.73-.9-1.44-1.11-2.28-.07-.28-.31-.51-.41-.78-.22-.6-.41-1.21-.61-1.82-.09-.26-.19-.52-.29-.78-.07-.2-.13-.41-.2-.61-.09-.3-.19-.6-.28-.9-.01-.04-.05-.07-.05-.1-.03-1.1-.7-2.09-.55-3.22-.29-.44-.15-.96-.24-1.44-.04-.19-.07-.39-.05-.58.09-.69-.15-1.35-.15-2.03,0-.44-.13-.87-.14-1.31-.02-.81-.01-1.63.01-2.44.01-.37.1-.74.14-1.11.13-1.37.18-2.75.38-4.11.18-1.18.49-2.35.81-3.5.17-.61.29-1.26.53-1.83.36-.87.63-1.77.95-2.66.11-.31.33-.57.49-.87.52-1.02.98-2.07,1.57-3.04.48-.79,1.1-1.49,1.66-2.23.43-.56.83-1.14,1.29-1.68.31-.36.6-.74,1.01-1.03.53-.37.98-.87,1.48-1.29.69-.6,1.41-1.17,2.19-1.64.5-.3,1.05-.52,1.59-.77.94-.42,1.88-.85,2.83-1.24.32-.13.68-.19,1.02-.29.88-.26,1.76-.59,2.65-.79.88-.19,1.78-.27,2.68-.35C23.97,0,24.68,0,25.38,0c.81.01,1.62.04,2.42.12.46.05.91.23,1.37.32,1,.21,2.02.37,3.01.61.72.18,1.42.45,2.12.73.72.29,1.5.52,2.11.97.65.48,3.56,2.14,4,2.64.87.96,1.88,1.81,2.72,2.8.71.83,1.28,1.78,1.88,2.69.63.96,1.23,1.95,1.84,2.92.04.07.07.14.1.22.27.61.49,1.25.81,1.83.31.56.33,1.2.58,1.78.09.22.16.45.23.67.1.3.19.59.28.89.02.06,0,.12.02.18.18.6.37,1.19.53,1.79.17.66.32,1.32.34,2.02,0,.5.14.99.21,1.49.02.12.03.23.04.35.04.68.02,1.37.14,2.03.26,1.35.06,2.7.14,4.05.03.56-.13,1.13-.21,1.7-.01.08-.03.16-.04.24-.07.84-.11,1.69-.22,2.52-.1.8-.26,1.59-.42,2.38-.09.48-.2.96-.33,1.43-.14.5-.38.98-.48,1.49-.22,1.14-.8,2.16-1.08,3.28-.08.31-.33.57-.48.87-.32.65-.61,1.32-.93,1.97-.62,1.27-1.48,2.38-2.37,3.46-.43.53-.83,1.09-1.24,1.63-.38.49-.84.91-1.32,1.3-.13.1-.24.24-.37.35-.45.38-.89.76-1.35,1.13-.21.17-.43.34-.65.49-.38.26-.76.54-1.17.76-.53.29-1.09.53-1.64.79-.17.08-.33.2-.51.26-.71.22-1.38.52-2.04.86-.17.09-.38.11-.56.17-.34.11-.67.21-1,.33-.09.03-.18.11-.27.11-.69,0-1.29.37-1.93.51-.92.2-1.87.28-2.43.35Z\"/>\n  </g>\n</svg>",
    16: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50.29 59.47\">\n  <g>\n    <path class=\"cls-1\" d=\"M23.51,6.42c.75.26,1.41.49,2.06.72.72.25,1.44.5,2.15.77.47.18.92.4,1.39.59.52.21,1.06.38,1.58.58.09.04.16.13.24.19-.1.04-.2.12-.29.1-.34-.08-.68-.17-1-.3-.92-.37-1.81-.79-2.74-1.13-.7-.26-1.46-.37-2.13-.7-.42-.21-.96-.22-1.27-.82ZM27.67,13.63c.1-.27.17-.4.2-.54.01-.06-.06-.13-.09-.2-.09.09-.22.17-.25.28-.03.08.06.2.15.45ZM11.61,13.44c.16.03.26.04.35.08.04.02.1.08.09.12,0,.04-.07.1-.12.1-.09,0-.19,0-.28-.04-.08-.03-.14-.1-.22-.16.08-.04.15-.08.18-.1ZM14.76,13.75c-.11.04-.15.07-.19.07-.08-.01-.16-.04-.24-.06.04-.04.08-.11.11-.11.09,0,.17.05.32.1ZM38.69,11.18c.47,0,.8,0,1.13,0,.51,0,1.01-.02,1.52-.04.2,0,.3-.09.12-.29-.28-.31-.6-.6-.82-.94-.25-.41-.58-.45-1-.43-.64.03-1.29.02-1.94,0-.1,0-.26-.18-.28-.29-.05-.26.12-.42.42-.43.38-.01.75,0,1.13-.01.12,0,.25-.06.37-.1-.06-.12-.1-.27-.19-.36-.17-.17-.4-.28-.54-.46-.47-.6-1.09-.72-1.8-.64-.12.01-.27-.05-.37-.13-.17-.13-.31-.3-.46-.46.17-.07.33-.14.58-.24-.56-.32-1.06-.62-1.58-.89-.35-.18-.71-.4-1.09-.46-.61-.08-1.12-.38-1.67-.6-.62-.25-1.24-.59-1.89-.71-1.26-.24-2.54-.35-3.81-.51-.12-.01-.25.02-.37.03.33.22.66.37,1.01.5.65.24,1.31.45,1.94.71.48.19.9.56,1.47.46.08-.01.18.07.27.11.84.32,1.65.71,2.43,1.18.39.23.87.33,1.2.62.58.51,1.29.86,1.6,1.72.26.71.48,1.39.52,2.14.01.28.09.52.33.72.31.26.72.34,1,.57.81.67,1.79,1.04,2.65,1.63.3.21.59.42.9.61.23.14.49.24.73.37.52.28,1.04.57,1.56.85.24.13.33.01.3-.22-.09-.56-.37-1-.85-1.29-.2-.12-.41-.24-.71-.41.2-.04.25-.06.31-.06.26,0,.36-.03.21-.34-.38-.78-.84-1.38-1.84-1.19-.17.03-.36-.02-.54,0-.72.1-1.3-.23-1.98-.7ZM29.03,16.22c-.19-.39-.39-.79-.57-1.19-.04-.09-.03-.2-.04-.31.13.02.28,0,.37.06.25.18.38,1.12.24,1.44ZM27.92,15.41c.04.49-.18.91.23,1.2,0,0-.05.17-.1.19-.19.06-.34.01-.4-.21-.09-.4-.08-.77.27-1.18ZM28.66,17.99c-.04.05-.1.12-.16.19-.17-.17-.34-.34-.5-.52.08-.04.16-.12.24-.12.27-.01.38.16.42.45ZM28.61,18.56c-.1.09-.16.16-.23.2-.02.01-.14-.1-.14-.12.04-.08.1-.16.17-.21.02-.01.11.07.2.14ZM22.21,18.59c-.04.07-.1.15-.16.24-.01-.03-.05-.07-.04-.09.05-.1.1-.19.16-.28,0,.03.02.06.04.14ZM27.64,19.08c-.06.04-.11.09-.17.1-.34.09-.58-.12-.55-.49,0-.13.05-.27.11-.39.04-.07.14-.1.22-.15.03.06.07.13.08.19.03.13.03.27.08.4.04.11.13.19.23.33ZM21.73,19.58c.02-.09.02-.19.06-.27.02-.05.1-.07.16-.1,0,.05,0,.11-.02.16-.04.08-.09.16-.14.24-.02,0-.04-.01-.06-.02ZM29.37,20.4c.25-.12.45-.18.6-.29.42-.31.87-.49,1.4-.57.4-.06.79-.24,1.17-.39.07-.03.1-.14.15-.21-.06-.04-.13-.1-.19-.1-.43,0-.87-.01-1.3.02-.19.02-.4.18-.31-.2,0,0-.14-.07-.19-.05-.19.09-.39.19-.56.31-.5.33-.61.87-.78,1.48ZM27.85,21c-.1.05-.17.1-.18.09-.09-.08-.16-.18-.23-.27,0,0,.1-.1.11-.1.09.08.18.16.3.28ZM32.52,20.6c-.12-.06-.2-.13-.25-.12-.45.12-.89.25-1.33.4-.06.02-.08.15-.12.23.08.04.18.12.25.1.41-.12.81-.26,1.21-.41.08-.03.13-.11.23-.21ZM19.75,21.96c-.09-.03-.15-.05-.2-.07.03-.07.03-.16.08-.2.26-.2.54-.39.8-.59.37-.29.72-.59.94-1.01.04-.07.17-.09.26-.13,0,.1.03.24-.02.31-.28.35-.57.7-.89,1.01-.23.23-.52.41-.78.61-.06.04-.14.06-.18.07ZM26.6,21.56c.07.14.16.27.19.41.01.07-.1.16-.15.24-.07-.05-.19-.09-.2-.14-.02-.16.01-.33.02-.49l.14-.02ZM32.62,22.38c-.22-.18-.34-.3-.48-.4-.05-.03-.16-.02-.2.02-.04.04-.05.15-.02.21.11.24.32.24.71.17ZM19.38,22.08c-.12.24-.3.39-.51.51-.2.12-.43.2-.66.28.34-.33.63-.73,1.16-.8ZM26.43,23.64s.09.05.14.08c0,.01-.01.02-.02.03l-.04.06s-.01.02-.02.03c-.05.03-.09.07-.14.11-.02-.08-.05-.15-.04-.23,0-.03.08-.08.12-.08h0ZM26.52,24.57c-.09-.08-.17-.13-.17-.15.03-.14.09-.27.14-.41.05.04.15.08.15.11-.02.14-.07.28-.12.45ZM25.49,24.62c.07.07.13.12.16.18.07.15.14.3.18.46.01.05-.03.14-.08.17-.05.04-.19.05-.2.03-.08-.21-.16-.43-.21-.65,0-.04.08-.11.15-.19ZM25.52,27.61c.04-.23.07-.45.13-.67,0-.04.13-.06.2-.07.02,0,.07.1.06.15-.07.22-.16.43-.24.64-.05-.01-.1-.03-.15-.04ZM16.89,12.06c.43.01.51.42.72.71.12-.14.2-.28.32-.36.4-.27.45-.76.19-1.33-.05-.11-.15-.19-.19-.3-.03-.07,0-.16.01-.25.09.02.2.02.25.08.06.06.05.18.07.27.01.05.54.49.57.47.26-.14.53-.26.77-.43.08-.06.04-.27.11-.38.03-.04.25.06.3.02.23-.23.19-.54-.08-.69-.18-.09-.4-.12-.6-.15-.23-.03-.25-.38-.58-.31-.3.06-.63,0-.94-.08-.5-.12-.93,0-1.33.23.38.18.77.35,1.16.54.07.03.09.16.13.24-.09,0-.19.04-.27.01-.36-.12-.7-.27-1.06-.37-.22-.06-.42-.09-.62.16-.24.31-.57.55-.87.79-.26.21-.52.46-.83.56-.58.19-1.12.43-1.67.72-.78.42-1.49.9-1.99,1.63-.42.6-.94,1.17-.97,1.97,0,.04-.07.1-.11.11-.38.09-.34.45-.42.71-.08.25-.06.53-.09.8-.08.95-.25,1.91-.21,2.85.04,1.21.21,2.42.53,3.59.29,1.04.66,2.06,1.04,3.08.12.33.34.63.57.9.24.28.42.21.62-.1.21-.34.19-.68.08-1.03-.15-.5-.1-1.01.15-1.43.4-.69.91-1.33,1.35-2,.33-.49.8-.9.86-1.56.03-.29.12-.58.23-.85.27-.69.56-1.38.87-2.05.13-.28.22-.54.15-.84.37-.3.09-.46-.13-.63-.27-.2-.55-.38-.82-.59-.05-.04-.06-.13-.09-.19.07-.02.16-.06.21-.04.18.07.38.13.53.25.34.28.64.18.95-.04.2-.14.35-.27.41-.54.07-.36.22-.7.34-1.04.19-.54.16-.59-.4-.8-.26-.1-.5-.24-.74-.37-.06-.03-.09-.11-.13-.17.06-.03.14-.1.19-.09.3.07.64.1.89.26.33.21.53.02.75-.11.21-.14.29-.38.2-.63-.08-.22-.18-.44-.25-.66-.06-.17-.1-.35-.14-.53,0,0-.02,0-.02,0h0s0,0,0,0c0,0,0-.01,0-.02-.05,0-.11,0-.14-.03-.05-.04-.09-.1-.12-.16,0,0,.05-.07.06-.07.06.03.13.06.17.11.03.03.03.09.04.14,0,0,.02,0,.02,0,0,0,0,0,0,0h0s0,0,0,.01ZM16,28.19c.07-.12.14-.24.22-.36,0,0,.09.02.09.03-.01.12-.01.25-.05.37-.03.09-.1.16-.15.24-.03-.08-.06-.16-.11-.29ZM24.45,27.93c.16.27.25.41.31.55.04.09.02.2.03.3-.12-.06-.32-.09-.35-.18-.05-.16,0-.35.02-.67ZM9.43,28.93c-.03-.08-.06-.17-.1-.26-.16-.37-.32-.75-.5-1.12-.09-.19-.23-.36-.35-.53.05.19.09.39.17.58.18.45.37.9.57,1.35.02.05.1.07.16.1.02-.03.03-.07.06-.12ZM25.42,29.53c0-.06-.03-.13-.01-.18.03-.1.09-.19.14-.28.04.05.13.1.12.13-.04.12-.1.23-.16.34h-.09ZM9.83,29.67c-.11-.13-.19-.23-.27-.33-.03.04-.1.09-.1.1.05.1.11.2.18.29.01.01.09-.03.19-.06ZM16.97,29.48s.09-.19.16-.34c.22.11.23.29.17.5-.02.06.01.13-.01.18-.04.08-.11.14-.16.22-.05-.09-.1-.17-.14-.26-.02-.05-.01-.12-.02-.3ZM16.13,28.78c0,.47,0,.93,0,1.4,0,.21.06.43.07.64,0,.06-.06.13-.11.18-.01.01-.13-.04-.13-.07-.17-.73-.24-1.45.18-2.14ZM24.63,31.13h.02s-.01.01-.01.01h0s0,0,0,0c0,0,0,0,0,0,0,0,0,0,0-.01ZM24.63,31.13c-.24.06-.47.13-.71.17-.1.02-.23,0-.31-.07-.06-.04-.05-.17-.07-.26.06.01.14.01.19.05.21.15.37.02.54-.07.2-.1.33-.07.36.17ZM37.48,30.84c-.17-.11-.23-.17-.29-.18-.48-.08-.57-.41-.56-.82.01-.29-.03-.59,0-.88.01-.13.12-.28.23-.35.29-.17.59-.33.91-.42.48-.14.67-.46.68-.92.02-.8-.17-1.52-.75-2.12-.91-.96-1.78-1.94-2.14-3.26-.02-.08-.14-.17-.24-.2-.15-.04-.32,0-.47-.05-.22-.07-.3.03-.42.19-.58.81-.67,1.76-.75,2.7-.03.35-.1.77.35.98.08.04.12.15.16.24.22.55.24.57.8.47.19-.03.39-.07.58-.08.06,0,.13.08.19.13-.05.06-.09.15-.14.16-.54.05-.62.52-.74.88-.09.26-.13.68.01.82.2.2.53,0,.8-.14.41-.19.84-.33,1.27-.46.11-.03.26.04.37.1.03.02.03.21,0,.22-.78.36-1.43,1.03-2.38.97-.18-.01-.29.03-.37.21-.26.61-.54,1.2-.81,1.81-.15.34-.04.6.31.63.25.02.52-.02.75-.1.74-.28,1.46-.61,2.29-.48.07.01.15-.03.34-.08ZM13.38,23.69s-.07-.02-.11-.03c-.37.59-.77,1.16-1.1,1.78-.13.24-.09.57-.13.86.49.16.1.38.04.58-.02.07-.05.15-.04.23.02.69-.15,1.33-.4,1.96-.09.23-.13.5-.15.75,0,.09.06.26.13.28.26.1.23.29.22.49-.03.51-.05,1.03-.08,1.54.2-.61.31-1.23.47-1.83.1-.38.18-.76.15-1.16-.05-.62.12-1.2.31-1.78.21-.63.51-1.25.29-1.95-.02-.06.06-.14.07-.21.12-.5.23-1,.35-1.49ZM18.97,29.43c-.14-.57-.28-1.14-.41-1.72-.02-.09.02-.19.03-.28.08.04.18.07.23.14.35.48.48,1.04.48,1.62,0,.29.16.63-.14.89-.02.02.05.14.07.21.16.77-.28,1.8-1.06,2.13-.4.17-1.1-.14-1.19-.57-.07-.35-.11-.71-.11-1.06,0-.15.11-.4.21-.42.23-.04.24.2.27.37.03.21.11.44.09.64-.04.3.16.46.28.68.11.19.2.13.31,0,.5-.58.82-1.24.85-2.02,0-.2,0-.4,0-.59.03,0,.06-.01.1-.02ZM22.05,33.18c-.06-.13-.11-.22-.16-.31.05-.02.13-.08.13-.07.06.07.12.15.16.23,0,.02-.06.07-.13.14ZM22.83,33.26c-.04-.06-.07-.1-.07-.11.04-.06.09-.11.14-.17.02.03.07.08.06.1-.03.06-.08.11-.13.18ZM19.09,20.8h0c-.28.32-.55.65-.83.97-.77.88-1.53,1.76-2.3,2.64-.43.49-.74,1.05-.9,1.67-.18.7-.35,1.41-.45,2.12-.1.73-.12,1.48-.14,2.22,0,.17.11.35.17.52.03-.18.09-.36.09-.53-.04-1.53.26-2.97,1.16-4.24.16-.22.34-.43.47-.66.42-.77,1.12-1.16,1.86-1.55.92-.49,1.8-1.07,2.69-1.62.13-.08.31-.22.31-.33.02-.45.4-.61.65-.86.62-.63.87-1.46,1.15-2.25.36-.97.38-2.01.2-3.04-.08-.47-.05-.94.23-1.38.09.43.17.82.23,1.2.07.42.16.84.17,1.26,0,.49-.02.99-.11,1.47-.25,1.41-.87,2.61-2.01,3.51-.2.16-.45.28-.6.48-.59.77-1.4,1.25-2.27,1.57-1.85.69-2.83,2.07-3.29,3.9-.16.65-.22,1.32-.26,1.99-.04.58-.01,1.18.24,1.73.23.5.49.98.73,1.48.1.2.58.48.81.48.52,0,1.08-.13,1.49.36.03.04.11.04.16.07.59.29.68.27,1.03-.28.26-.42.46-.52.8-.44.53.13.66.04.71-.5.07-.66.27-.91.85-1.08.41-.12.5-.24.49-.66,0-.16-.05-.31-.05-.47,0-.39.1-.72.48-.96.37-.24.58-.58.5-1.1-.09-.6.04-1.23.57-1.58.64-.42.69-.92.54-1.58-.13-.57-.12-1.12.39-1.59.38-.35.46-.89.36-1.38-.15-.73.11-1.35.52-1.87.31-.39.31-.74.14-1.09-.23-.48-.13-.94.04-1.35.19-.43.39-.83.49-1.3.09-.41.17-.8.04-1.22-.09-.29-.06-.56.2-.81.29-.27.53-.58.23-1.03-.11-.17,0-.41-.39-.39-.31.02-.64-.16-.96-.28-.38-.15-.4-.14-.53.21-.27.79-.27,1.59-.2,2.41.05.55.14,1.1.18,1.65.04.72-.16,1.39-.35,2.08-.38,1.38-1.12,2.57-1.81,3.79-.07.12-.15.24-.24.34-.06.07-.16.1-.24.14.01-.08,0-.18.04-.25.41-.89.99-1.7,1.29-2.64.21-.67.67-1.25.7-1.99.02-.56.19-1.09.08-1.68-.14-.83-.14-1.69-.16-2.54-.03-1.02.53-1.83,1.03-2.64.11-.18.29-.27.2-.51-.1-.26-.27-.44-.57-.44-.2,0-.4-.03-.59,0-.33.06-.65.22-.97.22-.87,0-1.45.55-1.97,1.07-.85.85-1.38,1.9-1.56,3.13-.08.58-.26,1.16-.5,1.69-.31.68-.69,1.33-1.09,1.97-.48.77-.64,1.65-.92,2.48-.02.07.02.15.03.23.09-.03.2-.04.26-.1.21-.21.41-.43.6-.66.17-.2.36-.31.63-.2h0c-.13-.13-.25-.27-.11-.46.44-.61.89-1.22,1.36-1.81-.23.86-.65,1.61-1.26,2.27h0s0,0,0,0h0,0s0,0,0,0h0ZM11.83,32.7s-.05,0-.07.01c-.02.22,0,.45-.05.67-.08.4.12.72.25,1.06.02.06.15.09.22.13.03-.07.09-.14.08-.19-.14-.56-.28-1.12-.43-1.67ZM21.72,34.67c-.11.04-.21.08-.32.11-.01,0-.05-.07-.07-.1.11-.04.21-.08.32-.11,0,0,.04.05.07.11ZM17.29,34.94s.04.01.06.02l.23.07s.08.02.12.03c-.01.05-.02.09-.04.14-.15-.04-.31-.09-.46-.13.01-.04.02-.09.03-.14l.06.02ZM18.46,35.34c-.13-.21-.22-.35-.3-.5,0-.01.08-.1.09-.1.13.1.26.2.38.31,0,0-.04.08-.16.3ZM19.91,35.56c-.09-.12-.16-.22-.23-.31.04-.02.1-.07.13-.06.12.05.23.11.35.17-.07.05-.13.1-.25.2ZM24.63,31.14c.62-.23,1.12-.61,1.28-1.27.14-.59.21-1.2.28-1.8.13-1.12.19-2.24.58-3.31.1-.27.28-.51.38-.79.29-.77.49-1.56.44-2.4,0-.1.1-.29.11-.29.3.07.25-.16.3-.32.38-1.16.68-2.36,1.16-3.48.44-1.02.39-2.07.48-3.12.02-.19.05-.42-.3-.31-.17.05-.14-.1-.15-.23-.02-.26-.65-.79-.84-.68-.34.19-.02.48-.02.74,0,.06.06.11.06.17,0,.14.02.36-.06.41-.18.11-.34.03-.37-.21,0-.04-.05-.08-.08-.13-.04.04-.1.07-.11.12-.05.14-.05.37-.15.43-.43.29-.45.65-.28,1.08.03.07.01.16,0,.23-.03.77-.36,1.45-.7,2.11-.26.5-.35.95-.03,1.44.18.27.12.51-.05.77-.23.37-.44.75-.62,1.14-.09.21-.17.48-.11.68.23.78-.03,1.39-.57,1.93-.25.25-.38.51-.19.9.33.7.17,1.53-.44,2.02-.49.4-.59.86-.49,1.42.12.65-.09,1.13-.68,1.42-.39.19-.47.48-.41.88.13.81-.05,1.08-.82,1.27-.34.09-.6.19-.54.62.02.11-.05.23-.06.35-.08.7-.36.9-1.08.8-.11-.02-.25.03-.35.09-.09.06-.15.18-.23.27-.53.57-.72.59-1.43.25-.12-.06-.34-.06-.42,0-.27.25-.55.29-.88.18-.22-.07-.29.06-.31.24-.01.1-.02.2-.04.29-.14.57.1.92.66,1,.14.02.33-.04.4.03.26.26.5.11.76.04.15-.04.31-.06.46-.08.57-.09,1.13-.16,1.63-.5.2-.13.48-.15.72-.22.11-.03.27-.07.31-.14.24-.61.81-.98,1.04-1.62.18-.52.58-.98.89-1.46.08-.13.19-.25.29-.37.17-.2.36-.39.54-.58ZM8.85,36.05q-.25.66-.87.65c-.32,0-.63,0-.95-.02-.06,0-.16-.07-.17-.12-.01-.05.05-.14.11-.17.58-.34,1.21-.4,1.87-.33ZM11.47,37.1c0-.06,0-.1,0-.14,0-.25-.05-.51-.33-.52-.24,0-.44.16-.46.44,0,.11-.03.23-.02.35.04.28.26.45.59.45.37,0,.08-.31.2-.44.03-.03.01-.11.01-.15ZM34.2,39.39c.2.3.37.56.55.81.09.13.19.25.3.35.22.2.47.37.67.57.37.37.71.78,1.21,1,.59.26,1.16.6,1.84.57.35-.01.7.03,1.04.06.23.02.47.07.7.11.33.05.68.06.99.17.76.26,1.51.56,2.27.85.16.06.31.11.39-.09.31-.77.61-1.54.91-2.3.06-.15-.02-.22-.17-.22-.14,0-.28,0-.42,0-2.22,0-4.45-.02-6.67.01-.48,0-.84-.16-1.17-.47-.07-.06-.1-.15-.16-.23.09-.03.18-.1.27-.09.45.02.91.07,1.36.08.84.01,1.69,0,2.53,0,1.43,0,2.86,0,4.3,0,.62,0,.67-.06.71-.71,0-.08.03-.15.05-.23.21-.68.16-.74-.54-.75-.02,0-.04,0-.06,0-1.45,0-2.89,0-4.34,0-.55,0-1.1,0-1.65,0-.41,0-.82,0-1.23-.01-.05,0-.14-.08-.14-.12,0-.23.36-.56.58-.56.87-.02,1.74-.05,2.61-.05,1.56.01,3.13.04,4.69.09.3,0,.5-.08.61-.35.08-.2.16-.4.19-.61.07-.51.04-.54-.48-.54-.99,0-1.98,0-2.98,0-1.45,0-2.9,0-4.35.01-.22,0-.36-.06-.3-.3.04-.18-.08-.45.32-.43.75.04,1.5.03,2.25.03,1.67,0,3.33,0,4.99,0,.86,0,.97-.11.86-1-.06-.48-.06-.49-.55-.49-1.77,0-3.54,0-5.31,0-.54,0-1.07,0-1.61,0-.15,0-.39.09-.38-.22,0-.38.09-.51.4-.51.3,0,.59.06.89.06,1.66,0,3.31-.03,4.97-.04.41,0,.83.06,1.24.05.55-.01.59-.07.61-.61,0-.22-.01-.44.01-.65.03-.29-.13-.34-.36-.33-.42.01-.83.03-1.25.03-1.53,0-3.06-.02-4.58-.03-.36,0-.71,0-1.07,0-.14,0-.37.06-.33-.2.03-.2.04-.46.35-.46.08,0,.16,0,.24,0,2.16,0,4.32,0,6.48,0,.62,0,.65-.02.64-.64,0-.2.02-.4.04-.59.03-.24-.04-.36-.32-.37-.93-.01-1.86-.07-2.79-.07-1.09,0-2.17.05-3.26.07-.14,0-.28,0-.42,0-.18-.02-.28-.11-.29-.31-.03-.35.05-.43.52-.43,1.97,0,3.94,0,5.9,0,.66,0,.66.01.55-.61-.01-.06-.01-.12,0-.18.02-.26-.12-.32-.36-.35-.47-.05-.94-.14-1.4-.22-.64-.12-1.27-.3-1.91-.37-1.01-.11-1.99-.27-2.95-.6-.35-.12-.73-.2-.78-.68,0-.08-.11-.16-.17-.23-.32-.46-.64-.92-.96-1.39-.05-.07-.08-.23-.06-.24.4-.27.32-.83.7-1.13.15-.12.55-.45.03-.7-.03-.01-.04-.14,0-.17.24-.25-.03-.52.02-.78.05-.27-.06-.58-.11-.87-.04-.23-.16-.46-.15-.69.05-1.51-.66-2.84-.97-4.26-.02-.09-.18-.14-.28-.21,0,.09-.01.18,0,.27.03.13.09.26.14.39.52,1.46.73,2.98.85,4.52.02.22.14.43.15.65.01.37,0,.75-.06,1.12-.08.4-.21.8-.36,1.18-.13.35-.46.69-.43,1.01.03.32.42.59.62.9.2.32.45.64.24,1.09-.06.13,0,.36.06.51.39.88.32,1.75.06,2.64-.19.66-.39,1.32-.53,2-.19.93-.4,1.86-.83,2.7-.27.52-.28,1.03-.29,1.59,0,.6.03,1.59-.38,2.12-.09.12-.56.53-.87.61-.63.17-1.26.34-1.89.51ZM7.13,42.96s0,.08,0,.12c-.21.11-.42.21-.63.32-.49.26-.47.25-.31.75.07.21.13.26.32.18.56-.22,1.13-.42,1.7-.64.74-.28,1.47-.58,2.2-.86.5-.19,1.01-.34,1.51-.52.14-.05.27-.1.12-.33-.18-.28-.32-.6-.37-.93-.06-.35-.23-.36-.5-.31-.92.16-2.02-.85-1.86-1.79.09-.53-.04-1.1.27-1.6-.01-1.11.72-1.9,1.22-2.78.26-.46.3-.48.04-.97-.14-.27-.26-.24-.44-.07-.3.29-.57.6-.89.87-.89.75-2.04.81-3.09,1.13-.31.09-.4-.09-.43-.39-.04-.45-.16-.89-.22-1.33-.06-.43-.1-.85-.14-1.28-.02-.25.15-.35.35-.41.28-.09.56-.18.85-.27.3-.09.64-.13.9-.29.6-.38,1.16-.81,1.73-1.23.04-.03.08-.13.07-.17-.25-.63-.47-1.26-1.16-1.58-.69-.33-1.38-.68-2.06-1.04-.6-.33-1.25-.6-1.58-1.27-.06-.12-.2-.21-.25-.33-.14-.3-.32-.6-.36-.92-.04-.37.02-.75.1-1.12.15-.71.57-.93,1.22-.61.51.25,1.03.55,1.43.94.27.26.62.64.37,1.15-.04.08.11.35.23.41.37.17.56.49.78.79.06.09.12.18.23.33,0-1.41-.9-2.28-1.65-3.17-.42-.5-1.06-.92-1.83-.92,1.16-.39,2.26-.09,3.32.3-.07-.55-.16-1.06-.18-1.56-.04-1.27-.2-2.54.09-3.8.06-.25-.01-.4-.29-.48-.4-.1-.78-.26-1.17-.39-.33-.11-.67-.2-1.01-.3-.15.34-.31.68-.46,1.02-.09.2,0,.29.21.29.36,0,.72.03,1.07.02.22,0,.39-.03.39.28,0,.3-.14.37-.41.36-.3-.01-.6.04-.89,0-.53-.08-.81.19-1,.63-.09.22-.15.45-.21.68-.07.24.05.31.28.31.62,0,1.23,0,1.85,0,.35,0,.41.1.37.41-.03.27-.22.24-.39.25-.65,0-1.3,0-1.95,0-.14,0-.35.06-.4.16-.15.34-.29.69-.35,1.05-.22,1.26-.41,2.53-.6,3.8-.04.25,0,.51-.02.77-.02.33.15.4.44.39.6-.03.6-.01.88.66-.29,0-.56,0-.84,0-.6,0-.59,0-.62.62,0,.12-.03.23-.05.35-.1.57-.06.63.5.63,1.21,0,2.42,0,3.63,0,.3,0,.56.03.71.32.05.1.1.2.14.29-.09.02-.19.05-.28.05-.62,0-1.23,0-1.85,0-.85,0-1.69,0-2.54,0-.29,0-.39.11-.36.39.04.31.1.63.1.94,0,.3.13.37.4.36.49-.01.98,0,1.51,0q-.55.66-1.28.66c-.12,0-.25-.03-.35.02-.1.04-.23.16-.24.25-.01.27.02.55.06.82.03.29.16.48.49.48.32,0,.64.04.95,0,.36-.06.33.14.36.37.04.28-.08.35-.33.34-.38-.01-.75,0-1.13.01-.08,0-.22.12-.22.17.02.27.04.56.13.82.16.46.24.49.74.49.3,0,.6,0,.89,0,.33-.01.42.2.42.46.01.3-.24.19-.39.21-.14.02-.28,0-.42,0q-.87,0-.79.89c.05.55.14.63.71.63,1.05,0,2.1-.01,3.16-.02.39,0,.44.04.44.37,0,.28-.15.32-.38.31-1.01-.01-2.03-.01-3.04-.02-.4,0-.41,0-.33.39.06.31.15.61.19.93.04.3.19.39.48.38.95-.01,1.9.05,2.84-.02.59-.04.91.29,1.37.65-.2.01-.3.03-.4.03-1.05,0-2.1,0-3.15.02-.74,0-.82.07-.54.75.3.73.39,1.08,1.39.92.15-.02.31.03.46.05ZM39.79,43.69s-.02.05-.03.08c.17.12.35.24.52.35.5.34,1.01.68,1.51,1.04.33.24.64.51.96.78.15.12.25.07.33-.07.18-.3.35-.61.53-.91.1-.16.04-.28-.1-.34-.65-.27-1.3-.6-1.98-.78-.56-.15-1.16-.11-1.74-.15ZM38.5,48.75c-.06-.09-.14-.17-.19-.27-.42-.87-.8-1.76-1.26-2.62-.51-.95-.85-1.98-1.47-2.88-.57-.83-.81-1.86-1.43-2.67-.09-.12-.18-.26-.29-.35-.12-.09-.28-.14-.42-.21.08.12.18.24.24.37.07.16.08.35.17.49.8,1.33,1.3,2.79,1.81,4.24.64,1.83,1.26,3.65,2.1,5.39.23.47.41.95.65,1.54.78-1.13,1.97-1.74,2.65-2.86.33-.54.78-1.01,1.15-1.52.11-.15.18-.35.24-.53.02-.07,0-.2-.05-.25-.32-.29-.64-.59-.99-.84-1.05-.77-2.12-1.52-3.19-2.26-.28-.19-.59-.34-.88-.51.34.81.78,1.51,1.14,2.25.36.73.81,1.44.88,2.29-.77-.69-1.09-1.67-1.64-2.51-.56-.86-1.01-1.79-1.72-2.55.43,1.03.91,2.04,1.39,3.05.48,1.02,1.02,2.03,1.12,3.2ZM32.7,54.12c0,.26,0,.4,0,.54,0,.39,0,.4.38.23.19-.09.38-.18.57-.26.36-.16.72-.31,1.07-.48.26-.13.5-.32.77-.44.76-.31,1.43-.74,2.05-1.27.14-.12.21-.2.12-.39-.24-.5-.46-1-.68-1.5-.39-.88-.79-1.75-1.16-2.64-.18-.44-.27-.91-.44-1.35-.76-2.03-1.48-4.08-2.39-6.04-.07-.15-.17-.28-.26-.42-.05.16-.12.31-.15.47-.12.58-.29,1.15-.33,1.74-.04.64.04,1.3.06,1.95.05,1.46.11,2.92.16,4.38.04,1.16.07,2.33.12,3.49.03.71.08,1.42.11,2.01ZM14.27,38.43s0,.11.03.21c.11.57.51.98.8,1.44.33.53.76.99,1.16,1.47.43.51.87,1.01,1.32,1.51.09.1.23.16.34.24.13.09.26.18.37.29.65.66,1.29,1.32,1.92,1.98.61.64,1.22,1.28,1.82,1.94.39.43.75.9,1.15,1.33.45.49.93.95,1.4,1.42.2.21.43.39.62.61.4.45.71,1.03,1.18,1.35.69.47,1.09,1.19,1.69,1.72.5.44.97.93,1.46,1.38.04.04.15.02.23.02-.02-.07-.02-.16-.06-.21-.56-.68-1.14-1.33-1.67-2.03-.42-.54-.75-1.14-1.17-1.68-.53-.7-1.11-1.35-1.66-2.03-.65-.81-1.3-1.63-1.95-2.44-.39-.49-.78-.99-1.18-1.47-.39-.47-.79-.94-1.19-1.4-.64-.74-1.36-1.42-1.93-2.21-.6-.84-1.28-1.62-1.77-2.55-.28-.52-.48-1.03-.53-1.61-.02-.22-.01-.44-.04-.65-.07-.57-.36-1.05-.78-1.42-.11-.1-.33-.13-.49-.12-.34.02-.85.47-.89.82-.08.66-.12,1.33-.18,2.09ZM20.56,39.19c-.49,1.27,4.21,7.73,4.58,8.2.34.42,2.43,3.9,2.66,4.22.25.34.47.7.73,1.03.66.85,1.36,1.68,2.01,2.55.39.51.36.53.91.4.53-.13.55-.16.52-.73-.06-1.11-.13-2.21-.18-3.32-.06-1.35-.1-2.71-.15-4.07-.02-.45.04-.92-.07-1.35-.18-.72-.44-1.43-.72-2.13-.22-.56-.58-1.03-1.29-.97-.04,0-.09.01-.12,0-.1-.05-.21-.1-.27-.18-.02-.03.07-.17.13-.23.31-.27.63-.54.96-.8.23-.19.45-.39.49-.71.02-.18.08-.28-.2-.29-.47,0-.94-.06-1.4-.14-.77-.14-1.56-.26-2.26-.64-.09-.05-.13-.19-.2-.29.1-.03.22-.11.31-.1.91.16,1.81.35,2.72.49.42.06.87.11,1.27,0,.68-.18,1.32-.48,1.97-.75.09-.04.15-.16.22-.25-.09-.05-.18-.12-.28-.15-.15-.05-.32-.03-.45-.1-.39-.19-.77-.4-1.15-.62-.35-.2-.51-.54-.58-.92-.01-.07.07-.18.13-.23.02-.02.14.04.19.08.06.05.1.12.16.18.8.82,1.79,1.19,2.91,1.02.52-.08,1.04-.18,1.57-.21.32-.02.63-.07.82-.38.25-.4.18-.86.27-1.29.02-.4-.2-2.56-.78-2.68.05-.04.11-.12.16-.12.14,0,.27.04.41.05.24.02.49.09.7.02.15-.04.29-.26.34-.42.07-.23-.17-.2-.31-.25-.22-.08-.5-.12-.65-.28-.59-.65-1.32-.73-2.12-.63-.08,0-.16.02-.24,0-.64-.15-1.05.2-1.41.64-.09.11-.15.24-.24.34-.09.09-.21.18-.34.21-.17.04-.33,0-.25-.25.08-.25.13-.5.22-.74.26-.68.59-1.33.79-2.03.33-1.13.69-2.28.35-3.49-.2-.69-.44-1.34-1.21-1.64-.53-.2-.73-.8-.58-1.38.03-.1-.02-.31-.08-.33-.59-.18-1.14-.58-1.82-.32-.21.08-.46.05-.63.26-.07.08-.26.1-.39.09-.19-.01-.36-.13-.54.07-.16.18-.18.37-.22.59-.1.62-.2,1.25-.39,1.85-.11.33-.25.61-.24.98.02.59-.04,1.19-.12,1.79-.11.81-.24,1.63-.54,2.4-.19.48-.43.96-.92,1.27-.62.4-1.21.92-1.3,1.69-.15,1.26-.58,2.28-1.59,3.12-.58.48-1.07,1.05-1.8,1.3-.3.1-.35.29-.47.6ZM12.52,44.61c.25.53.45.99.67,1.43.39.75,1.02,1.32,1.57,1.95.18.2.29.48.48.66.45.44.93.84,1.4,1.25.58.5,1.19.97,1.74,1.49.59.57,1.13,1.19,1.7,1.78.53.55,1.05,1.11,1.64,1.61.4.34.76.68.94,1.19.03.09.13.2.21.22.27.07.54.09.81.14.94.19,1.89.21,2.84.13.7-.06,1.47-.18,2.16-.32.33-.07.28-.31.04-.55-.4-.4-.82-.78-1.21-1.18-.86-.89-1.7-1.79-2.55-2.69-1.01-1.07-2.03-2.13-3.03-3.2-.86-.92-1.7-1.86-2.55-2.79-.15-.16-.28-.32-.44-.47-.49-.47-1-.92-1.48-1.4-.56-.56-1.1-1.12-1.62-1.71-.72-.81-1.5-1.57-1.99-2.56-.03-.06-.21-.13-.25-.1-.39.27-.78.54-1.14.85-.1.08-.16.28-.15.42.05.59.29,1.04.9,1.27.26.1.51.36.66.61.37.62.5,1.32.47,2.03-.01.25-.18.51-.32.74-.09.14-.26.1-.33-.06-.05-.1-.1-.25-.06-.34.19-.52-.06-.95-.23-1.41-.28-.75-.34-.8-1.06-.52-.85.32-1.7.64-2.53,1.02-.81.37-1.76.44-2.47,1.07-.29.26-.44.59-.27.92.13.24.24.5.39.73.21.35.43.71.67,1.04.39.53.8,1.04,1.21,1.56.13.17.27.34.43.48.18.17.4.29.58.46.67.64,1.28,1.37,2.02,1.91.94.68,1.97,1.25,3.01,1.77.86.42,1.79.7,2.69,1.04.27.1.54.23.82.32.62.2,1.25.37,1.87.58.43.15.86.22,1.37.14-.16-.19-.26-.36-.4-.49-.54-.49-1.1-.95-1.62-1.45-.29-.28-.52-.62-.82-.9-.92-.87-1.85-1.72-2.78-2.57-.25-.23-.51-.44-.75-.66-.43-.4-.88-.8-1.28-1.23-.36-.39-.66-.83-1-1.23-.59-.71-1.04-1.48-1.02-2.44,0-.15.04-.29.07-.49ZM21.84,2.92c-.05,0-.4-.46.14-.54.74-.1,1.48-.19,2.22-.27.31-.03.63-.06.95-.05.69.02,1.38.03,2.07.11.86.1,1.73.14,2.54.46.11.04.22.08.34.11.72.19,1.45.36,2.16.58.51.16,1,.37,1.48.59.95.43,1.9.88,2.83,1.35.4.2.76.5,1.14.74.25.16.52.28.77.45.19.13.37.28.54.44.39.36.78.73,1.17,1.09.68.63,1.31,1.28,1.78,2.1.31.54.78.99,1.18,1.48.97,1.23,1.56,2.66,2.19,4.07.3.67.62,1.36.79,2.07.22.9.59,1.75.8,2.64.52,2.23.95,4.48,1.15,6.76.02.27-.05.55-.05.82.01.57.06,1.14.07,1.72,0,.35-.05.71-.05,1.06,0,1.56-.18,3.12-.34,4.67-.11,1.08-.34,2.16-.69,3.18-.34.97-.46,1.99-.85,2.94-.14.35-.3.68-.45,1.03-.47,1.1-.92,2.22-1.43,3.3-.24.5-.59.95-.89,1.43-.15.25-.3.51-.44.77-.58,1.03-1.35,1.9-2.26,2.65-.41.34-.72.79-1.11,1.14-.66.59-1.33,1.17-2.04,1.69-.6.44-1.25.82-1.9,1.17-1.32.71-2.68,1.33-4.14,1.68-.61.15-1.21.35-1.82.51-.32.08-.66.12-.99.16-1.11.12-2.23.28-3.35.31-1.02.03-2.04-.05-3.06-.15-.6-.06-1.19-.25-1.78-.39-.06-.01-.11-.04-.17-.06-.74-.2-1.48-.37-2.21-.6-.47-.15-.92-.36-1.37-.55-.56-.24-1.13-.46-1.67-.74-1.6-.81-3.15-1.7-4.49-2.91-.54-.49-1.01-1.05-1.48-1.61-.54-.63-1.06-1.27-1.56-1.93-.64-.85-1.26-1.73-1.69-2.71-.34-.78-.76-1.52-1.08-2.31-.27-.66-.44-1.37-.66-2.05-.21-.66-.45-1.3-.62-1.97-.22-.83-.41-1.67-.58-2.52-.14-.7-.26-1.4-.36-2.11-.14-1.06-.24-2.12-.36-3.18.04,0,.08,0,.12-.01-.04-.59-.09-1.18-.11-1.77-.01-.39,0-.79.03-1.18.11-1.5.17-3.01.36-4.5.14-1.09.34-2.2.7-3.24.33-.95.45-1.95.83-2.88.16-.38.31-.76.48-1.14.46-1.06.9-2.14,1.39-3.19.21-.45.53-.84.8-1.27.26-.41.51-.83.74-1.25.46-.85,1.13-1.51,1.82-2.18.45-.44.91-.86,1.34-1.32.49-.53,1.05-.97,1.63-1.39.17-.12,1.95.24,2.09.28.72.19,1.45.35,2.18.53,1.15.27,2.3.54,3.45.82.38.09.77.18,1.14.3.65.21,1.3.42,1.93.68.92.38,1.97.4,2.82.99.04.03.12.05.17.03.28-.12.49.05.73.14.31.12.62.29.95.33.84.12,1.61.46,2.38.78.89.36,1.76.74,2.66,1.08.66.26,1.29.58,1.95.84.64.25,1.24.62,1.86.91,1.07.49,2.15.96,3.22,1.45.83.38,1.67.77,2.49,1.19.67.34,1.3.73,1.96,1.1.15.09.31.19.48.23.15.04.31.02.29-.23-.06-.61-.52-1.22-.52-1.22-.11-.02-2.05-1.05-2.57-1.36-1.54-.92-3.13-1.77-4.7-2.64-.22-.12-.45-.26-.68-.36-1.54-.7-3.08-1.4-4.62-2.1-.25-.11-.5-.23-.74-.37-.09-.05-.14-.15-.2-.23.09-.03.19-.1.28-.08.23.05.46.12.67.22.93.43,1.85.87,2.78,1.31.18.09.37.15.56.22-.37-.63-.96-.97-1.53-1.27-.87-.45-1.78-.85-2.73-1.11-1.07-.29-1.95-.99-3.04-1.2-.11-.02-.22-.09-.32-.15-1.25-.69-2.62-1.06-3.96-1.53-.38-.13-.49-.17-.74-.52,1.04.34,2.06.64,3.06,1.01,1.26.46,2.51.97,3.76,1.45.42.16.83.33,1.25.48,1.28.46,2.55.94,3.64,1.78.27.2.51.43.78.63.05.04.13.05.19.07.01-.06.04-.12.03-.17-.03-.11-.04-.24-.12-.32-.23-.24-.46-.51-.74-.69-.69-.45-1.4-.89-2.13-1.27-.7-.37-1.43-.67-2.16-.97-.7-.29-1.41-.53-2.12-.81-.71-.28-1.38-.65-2.11-.85-.54-.14-.97-.46-1.46-.67-.07-.03-.1-.15-.15-.22.09,0,.18-.02.26,0,.8.3,1.59.65,2.41.91.93.3,1.74.86,2.67,1.14.5.15,1,.33,1.48.55.88.4,1.77.79,2.61,1.25.49.27.92.67,1.37,1.01.03-.01.07-.03.1-.04-.08-.17-.12-.37-.24-.51-.2-.23-.44-.43-.69-.62-.36-.28-.76-.51-1.08-.82-.35-.33-1-.06-1.18-.65-.03.02-.05.05-.08.06-.1.01-.2.05-.29.02-.46-.17-.92-.36-1.37-.54-.73-.3-1.45-.6-2.18-.9-.26-.11-.54-.19-.8-.3-.04-.02-.06-.09-.09-.14.06-.03.13-.09.18-.08.41.09.84.08,1.22.32.27.17.6.22.91.33-.08-.17-.19-.29-.33-.34-.81-.3-1.63-.59-2.45-.88-.08-.03-.19.03-.28.05.07.07.13.13.2.2.1.1.3.27.28.31-.11.19-.26.07-.4,0-.05-.02-.12,0-.17-.02-.36-.1-.72-.2-1.08-.32-.36-.13-.43-.3-.3-.54.2-.35.19-.33-.15-.47-.91-.36-2.11-.8-3.44-.8ZM23.67.96c-1.3-.05-2.55.28-3.79.61-.56.15-1.07.48-1.69.44-.06,0-.11.03-.17.05-1.06.43-2.09.92-3.17,1.28-1.07.36-1.91,1.08-2.84,1.66-.59.36-1.12.81-1.67,1.23-.16.12-.32.24-.44.39-.5.66-1.21,1.14-1.56,1.92-.03.07-.12.1-.17.16-.38.43-.77.85-1.13,1.29-.21.25-.33.59-.57.81-.59.53-.94,1.22-1.33,1.87-.15.25-.19.56-.31.82-.35.77-.73,1.53-1.08,2.3-.09.19-.12.41-.2.61-.14.35-.32.68-.45,1.03-.23.63-.47,1.25-.66,1.89-.31,1.08-.63,2.17-.85,3.27-.17.85-.28,1.72-.26,2.61.02.5-.18,1-.21,1.51-.04.79.05,1.6-.06,2.38-.14,1-.04,1.97.03,2.95.08,1.2.29,2.4.34,3.61.08,1.85.75,3.55,1.2,5.3.19.75.57,1.45.82,2.2.47,1.44,1.13,2.78,1.94,4.05.23.37.55.68.75,1.06.42.76,1.06,1.36,1.54,2.08.37.55.67,1.23,1.35,1.54.05.02.06.11.1.15.51.5.98,1.04,1.53,1.47.73.57,1.51,1.09,2.3,1.58.78.49,1.61.92,2.41,1.37.1.06.22.09.33.13.47.17.95.32,1.41.51,1.19.48,2.39.91,3.69,1.01.24.02.47.19.72.21,1.2.11,2.4.22,3.6.27.79.04,1.58.02,2.36-.06.67-.07,1.33-.22,1.97-.4,1.13-.32,2.27-.6,3.37-1.02.99-.38,2.02-.67,2.95-1.2.31-.17.69-.22.98-.41.66-.43,1.28-.9,1.92-1.36.22-.16.41-.39.65-.51.63-.33,1.12-.79,1.56-1.34.27-.34.65-.6.86-.97.19-.34.42-.6.71-.85.19-.17.37-.36.52-.57.42-.54.8-1.11,1.23-1.63.7-.83,1.06-1.83,1.53-2.78.28-.56.51-1.13.76-1.7.04-.09.06-.19.09-.28.07-.18.14-.36.21-.54.12-.27.27-.53.36-.81.17-.53.26-1.08.47-1.59.53-1.27.82-2.6,1.11-3.93.17-.8.24-1.61.23-2.44,0-.5.17-1.01.2-1.51.04-.77-.05-1.56.06-2.32.15-1.03.03-2.05-.03-3.06-.04-.75-.19-1.49-.22-2.24-.08-1.85-.41-3.65-.97-5.41-.13-.39-.21-.8-.34-1.19-.18-.54-.39-1.07-.59-1.6-.22-.59-.45-1.18-.68-1.76-.14-.35-.32-.68-.47-1.03-.6-1.39-1.51-2.59-2.42-3.79-.12-.15-.29-.26-.4-.42-.43-.61-.85-1.23-1.28-1.84-.07-.1-.17-.17-.26-.25-.17-.16-.33-.33-.5-.48-.47-.45-.92-.93-1.43-1.33-.74-.57-1.51-1.09-2.3-1.58-.8-.5-1.64-.94-2.46-1.4-.1-.06-.22-.1-.33-.14-.39-.12-.79-.19-1.16-.36-1.15-.53-2.32-.97-3.6-1.09-.36-.04-.72-.19-1.08-.24-.6-.08-1.21-.13-1.82-.18-.63-.06-1.26-.14-1.89-.15-.45,0-.9.09-1.36.13ZM27.22,59.47c-1.57-.03-3.08-.04-4.58-.11-.5-.02-.99-.24-1.49-.32-.99-.16-1.99-.31-2.95-.61-.75-.23-1.5-.47-2.23-.76-.72-.28-1.47-.56-2.12-.97-.42-.27-.86-.46-1.3-.68-.2-.1-.34-.32-.53-.47-.13-.1-.28-.17-.43-.24-.05-.03-.14-.01-.16-.05-.34-.62-1.08-.69-1.53-1.18-.88-.96-1.87-1.82-2.72-2.79-.68-.78-1.26-1.66-1.83-2.53-.66-1.01-1.27-2.06-1.89-3.09-.04-.07-.07-.14-.1-.21-.34-.77-.7-1.54-1.02-2.32-.17-.41-.25-.86-.38-1.29-.07-.23-.15-.45-.23-.67-.1-.3-.19-.59-.28-.89-.02-.06,0-.12-.02-.18-.17-.6-.37-1.19-.52-1.79-.17-.66-.33-1.32-.34-2.02,0-.5-.13-.99-.21-1.49-.01-.08-.06-.16-.04-.23.12-.61-.09-1.2-.09-1.8,0-.27-.11-.54-.14-.81-.04-.36-.07-.73-.07-1.1,0-.81,0-1.62.02-2.44.01-.37.1-.74.14-1.11.12-1.37.18-2.75.38-4.11.18-1.2.49-2.39.82-3.56.17-.57.39-1.12.47-1.73.04-.3.25-.57.36-.86.21-.57.38-1.16.61-1.72.13-.32.34-.61.5-.93.3-.62.59-1.24.89-1.86.6-1.26,1.44-2.35,2.31-3.43.47-.58.91-1.17,1.36-1.76.37-.48.82-.88,1.28-1.26.13-.11.24-.23.37-.34.43-.37.86-.74,1.29-1.1.27-.22.53-.46.82-.65.35-.24.73-.45,1.1-.65.54-.28,1.08-.54,1.63-.81.14-.07.27-.16.41-.2.73-.23,1.42-.53,2.1-.88.19-.1.41-.11.62-.18.32-.1.63-.21.95-.32.13-.04.26-.14.39-.14.52.02.96-.22,1.43-.35,1.01-.28,2.04-.46,3.08-.48C24.35,0,25.36,0,26.36.01c.91.02,1.8.19,2.68.37.83.17,1.66.29,2.49.47.52.11,1.02.28,1.53.44.57.18,1.14.38,1.71.59.2.07.38.2.57.29.76.39,1.53.78,2.29,1.18.17.09.36.2.48.34.21.23.36.52.74.5.06,0,.13.14.21.2.2.15.41.28.61.43.3.22.62.43.89.69.45.42.89.85,1.3,1.3.56.61,1.09,1.24,1.62,1.87,1.06,1.25,1.91,2.64,2.74,4.04.42.73.89,1.44,1.11,2.28.07.28.27.52.42.78.35.58.39,1.26.61,1.88.27.76.63,1.5.76,2.28.1.61.35,1.17.43,1.77.07.52.01,1.08.21,1.54.22.52.18,1.05.22,1.56.05.57.06,1.16.13,1.73.04.33.12.65.15.98.03.36.04.73.05,1.1,0,.77,0,1.55-.02,2.32-.02.53-.1,1.06-.14,1.59-.07.8-.11,1.61-.2,2.41-.07.6-.18,1.2-.3,1.79-.2.96-.41,1.92-.64,2.88-.1.41-.33.79-.41,1.2-.2,1.15-.79,2.16-1.08,3.28-.09.33-.33.61-.49.93-.31.64-.61,1.28-.92,1.92-.61,1.27-1.47,2.38-2.37,3.46-.44.53-.82,1.09-1.24,1.63-.38.49-.83.92-1.32,1.29-.15.11-.26.27-.41.39-.43.37-.86.74-1.3,1.09-.2.16-.45.26-.62.44-.41.45-.95.65-1.49.89-.48.22-.93.49-1.4.74-.2.1-.42.18-.63.27-.63.28-1.25.56-1.88.83-.18.08-.37.13-.56.19-.17.05-.34.08-.51.13-.88.26-1.76.58-2.65.79-.84.19-1.7.27-2.49.39Z\"/>\n  </g>\n</svg>",
    17: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50.32 59.45\">\n  <g>\n    <path class=\"cls-1\" d=\"M29.72,5.55c-.31.04-.38-.07-.32-.37.05-.21-.06-.62.01-.64.28-.1.6-.1.9-.1.07,0,.22.14.21.19-.08.28-.16.57-.31.81-.07.1-.32.09-.49.12ZM27.68,5.85c-.04.32-.23.43-.34.29-.2-.23-.35-.5-.5-.77-.02-.04.07-.19.13-.22.09-.03.27-.04.31.01.17.25.31.52.4.69ZM24.71,5.9c.06-.15.12-.3.17-.45.04-.14.09-.28.1-.43,0-.09-.05-.19-.07-.28.15.01.39-.02.43.05.14.29.24.6.31.92.03.14-.04.31-.04.47,0,.27-.13.46-.37.53-.21.06-.43-.23-.46-.56,0-.08,0-.16,0-.24-.02,0-.04-.02-.07-.02ZM34.86,6.94s-.08.01-.13.02c-.47.05-.54-.02-.48-.5.01-.08.08-.21.13-.22.08,0,.21.05.24.12.1.18.16.38.24.57ZM32.63,5.24c.08,0,.16,0,.24,0,.19.02.28.17.1.26-.34.17-.18.44-.19.66-.02.52-.34.89-.84.95-.24.03-.42-.14-.33-.34.2-.45.42-.9.65-1.33.06-.11.21-.18.31-.27.02.02.04.05.06.07ZM22.92,7.33c-.18.09-.27.16-.37.18-.17.04-.27-.04-.24-.22.02-.1.08-.19.12-.28.14.09.28.18.49.32ZM34.96,7.67s.07.06.08.09c.09.24.17.47.25.71.01.04-.03.13-.07.14-.03.01-.13-.03-.14-.06-.09-.25-.16-.51-.23-.77,0-.02.07-.07.11-.11ZM18.86,8.8c-.12.09-.22.17-.31.24-.04-.06-.11-.18-.1-.19.08-.07.18-.13.27-.17.02,0,.07.06.14.12ZM37.15,9.26c.17-.06.25-.12.3-.09.08.03.14.11.18.19,0,.01-.09.13-.12.13-.07-.01-.14-.07-.37-.22ZM36.87,9.33c-.1.09-.18.16-.26.24-.03-.07-.04-.18-.09-.21-.07-.03-.17-.02-.26,0-.11.01-.22.05-.33.07,0-.13-.02-.27-.03-.4,0-.03.04-.1.05-.1.26.06.51.12.76.2.06.02.09.11.15.2ZM36.83,10.52c-.09-.13-.21-.23-.2-.31,0-.08.14-.17.23-.2.04-.01.18.13.17.19-.01.1-.11.18-.2.32ZM17.11,11.82c-.02.15,0,.33-.08.45-.09.12-.27.27-.4.26-.18-.02-.34-.17-.51-.27,0,0,.03-.11.07-.12.46-.11.5-.45.49-.83,0-.1.01-.2.03-.29,0-.04.06-.08.09-.12.04.04.11.06.12.11.07.27.13.53.2.82ZM37.99,15.18s-.06,0-.09,0c.02.23.03.46.06.68,0,.04.07.07.1.11.03-.05.08-.1.07-.14-.04-.22-.09-.44-.14-.66ZM23.39,16.04c-.19.22-.33.48-.76.43-.23-.03-.5.22-.74.35-.19.1-.36.24-.56.33-.16.07-.35.1-.53.15.11-.22.16-.5.33-.65.18-.16.46-.23.7-.29.51-.12,1.04-.21,1.55-.31ZM38.43,17.65c-.07-.22-.11-.44-.22-.62-.05-.08-.22-.09-.35-.1-.02,0-.1.16-.08.22.05.21.12.41.21.6.04.08.17.13.25.19.06-.1.12-.19.18-.29ZM24.96,20.02c-.29,0-.58-.01-.86,0-.39.02-.78.05-1.17.08-.07,0-.16.04-.21.09-.46.45-1.08.73-1.44,1.3-.08.12-.23.2-.43.25.09-.24.19-.48.28-.72.02-.05.07-.11.05-.15-.03-.09-.32-.11-.09-.28.05-.04.19.06.29.07.04,0,.12-.07.11-.1-.09-.43.31-.46.52-.56.47-.21.98-.37,1.49-.48.55-.12,1.07-.06,1.45.49ZM11.33,22.17s.04,0,.06,0c.03-.1.06-.21.08-.31.03-.1.06-.2.09-.3-.04,0-.1-.02-.1-.01-.06.09-.13.19-.15.29-.02.1.01.21.02.32ZM26.12,20.71s.1.05.18.08c-.07.02-.14.04-.2.06-.03.01-.07.02-.11.02.03.04.04.11.08.13.67.35,1.35.68,2.03,1.03.04.02.11.07.1.1-.01.05-.06.12-.1.13-.11.02-.24.04-.33,0-.31-.15-.6-.34-.9-.5-.29-.16-.59-.31-.88-.48-.08-.05-.17-.1-.23-.18-.06-.09-.09-.2-.14-.3.1-.02.2-.05.3-.07.04,0,.08-.01.18-.02ZM34.81,21.37c-.74.06-1.25.61-1.9.84-.38.14-.8.18-1.21.25-.06,0-.14-.09-.21-.14.07-.06.13-.17.2-.16.77.03,1.37-.44,2.06-.67.33-.11.67-.18,1.01-.27.02.05.04.11.05.16ZM29.99,21.54c.08.43.17.86.24,1.29.01.07-.08.15-.12.23-.04-.06-.12-.12-.13-.18-.07-.44-.13-.87-.19-1.31.07,0,.14-.02.2-.02ZM35.95,23.11s.02-.09.03-.13c-.29-.06-.58-.12-.87-.19,0,.05-.02.09-.03.14.29.06.58.12.87.18ZM18.35,22.43l-.13-.05c-.17.23-.37.44-.48.7-.05.12.08.32.13.49.14-.09.3-.15.4-.27.07-.08.07-.22.08-.34.01-.18,0-.35,0-.53ZM21.61,22.08c-.09.23-.12.34-.18.43-.34.49-.65.99-.72,1.6,0,.06-.04.11-.08.16-.03.04-.11.1-.13.08-.06-.04-.14-.11-.13-.16.14-.81.48-1.51,1.23-2.12ZM15.5,24.49c-.16-.45-.24-.9-.47-1.24-.14-.21-.5-.32-.78-.37-.3-.05-.63,0-.94.04-.5.06-.5.08-.59.59-.02.11-.07.22-.14.3-.16.19.03.26.11.38.09.14.13.14.3.07.34-.13.71-.09,1.08.02.32.09.43.3.56.54.18.32.19.31.46,0,.03-.04.12-.02.16-.05.09-.08.16-.18.25-.28ZM36.97,23.84c.07.06.13.13.21.17.48.22.23.7.37,1.04,0,.02-.09.12-.15.13-.06,0-.17-.03-.19-.08-.06-.14-.09-.3-.12-.45-.04-.26-.07-.52-.11-.8ZM19.65,25.73v-.02s0,.02,0,.02h0ZM19.66,25.71s0-.1,0-.15c-.02-.13-.04-.25-.06-.38.03,0,.09-.02.1,0,.1.16.2.32.3.47-.11.02-.22.04-.34.06,0,0,0,.02,0,.02,0,0-.02-.02-.02-.02,0,0,.01,0,.02,0ZM17.84,25.75c.16-.12.28-.19.36-.29.13-.19.24-.39.34-.6.03-.06,0-.15,0-.22-.09,0-.23-.03-.26.02-.19.29-.35.59-.52.89-.02.03.04.1.08.2ZM19.65,25.73l.12.23c-.08,0-.17.03-.24,0-.24-.08-.47-.18-.69-.36.27.04.54.08.82.12ZM34.82,26.37c.04-.5.35-.79.67-1.01.23-.15.16-.28.1-.43-.01-.04-.13-.04-.2-.06-.07.31-.36.13-.52.24-.12.09-.26.17-.34.29-.46.77-.56.82-1.48.66-.03,0-.07.02-.22.07.3.22.55.4.78.59.08.06.17.19.15.26-.02.09-.18.24-.22.22-.25-.09-.54.09-.77-.13-.11-.1-.28-.14-.42-.21-.36-.16-.65-.37-.6-.84.02-.21-.02-.35-.33-.32-.33.03-.4-.13-.32-.47.03-.13.08-.27.16-.38.05-.07.19-.13.26-.1.57.17.58.18.87-.34.06-.1.13-.2.17-.31.03-.08,0-.17.01-.26-.08.04-.15.09-.23.1-.15.03-.31.09-.45.06-.11-.03-.22-.17-.25-.28-.02-.07.08-.24.16-.26.33-.09.57-.26.71-.57.02-.04.2-.08.23-.04.21.23.39.08.58-.02.82-.43,1.65-.83,2.58-.95.11-.01.26-.05.32,0,.52.51,1.02,1.04,1.51,1.58.09.1.08.29.12.43-.16-.02-.35.01-.48-.06-.14-.08-.26-.24-.34-.39-.13-.22-.3-.37-.56-.38-.06,0-.15.03-.19.08-.17.26-.17.26-.42.2-.94-.21-1.84,0-2.72.33-.08.03-.09.22-.13.34.09-.01.18-.03.26-.04.58-.05,1.17-.14,1.75-.11.3.02.6.26.87.43.31.2.27.54.3.85,0,.07.11.14.17.2.29-.41.35-.02.45.14.08.13.13.29.16.45.02.1-.04.21-.06.31-.1-.03-.27-.04-.29-.1-.08-.2-.14-.2-.28-.05-.04.04-.17.04-.2,0-.45-.49-.8-.2-1.15.13-.04.04-.1.06-.19.12ZM18.81,27.45c.22-.62.67-.78,1.04-1.02.05-.03.14.01.21.02-.04.06-.06.13-.12.18-.22.19-.45.37-.68.55-.1.08-.22.13-.46.27ZM31.74,27.55c.06.15.13.29.19.44-.01.01-.03.03-.04.04-.06-.07-.13-.14-.17-.22-.03-.07-.03-.16-.05-.25.02,0,.05-.01.07-.02ZM22.39,27.93c.3.08.6.16.9.24,0,.02,0,.05-.01.07-.31-.06-.62-.12-.92-.18.01-.04.02-.09.03-.13ZM29.2,27.58c.03.45.09.96-.3,1.4-.13.14-.19.41-.42.24-.1-.08-.12-.39-.05-.52.23-.41.53-.78.77-1.12ZM32.36,28.9c.74.07,1.25.52,1.77.96.04.04.04.14.06.21-.09.01-.21.07-.27.03-.37-.28-.93-.31-1.12-.85-.05-.15-.29-.23-.45-.34ZM12.37,24.9c-.05.61-.11,1.19-.13,1.77,0,.27.08.55.15.81.03.1.12.23.21.25.33.07.33.38.32.56-.03.6.25,1,.67,1.35.07.06.15.12.2.19.11.16.33.36.29.48-.16.46.22.18.31.27.02.02.05.1.04.1-.28.17.04.41-.08.63-.18.33-.07.63.21.9.28.26.72.35,1.12.15.37-.19.44-.39.31-.88-.02-.07,0-.16,0-.24-.01-.81-.04-1.61-.03-2.42,0-.28-.07-.39-.36-.49-.33-.1-.72-.25-.76-.72,0-.05-.05-.09-.08-.14-.04.05-.11.09-.13.15-.21.64.26,1.54.96,1.79.22.08.27.13.09.31-.13.13-.36.21-.26.47.02.06-.05.2-.1.22-.07.02-.18-.03-.25-.08-.44-.32-.79-.71-.97-1.24-.07-.22-.12-.49-.48-.36-.03.01-.12-.08-.15-.14-.09-.17-.18-.34-.25-.51-.22-.5-.46-.98-.38-1.58.07-.56.09-1.16-.47-1.6ZM22.84,32.49c.1-.47.24-.92.56-1.26.46-.49.87-1.01,1.44-1.39.39-.26.7-.62,1.06-.93.1-.08.23-.12.37-.14-1.25,1.14-2.63,2.17-3.43,3.73ZM33.79,33.71c-.29-.55-.57-1.11-.86-1.66-.05-.09-.09-.19-.15-.25-.06-.06-.17-.13-.24-.12-.06,0-.14.15-.12.22.07.46-.25.7-.53.93-.28.24-.62.43-.94.63-.19.12-.8-.05-.95-.25-.02-.03-.03-.1-.02-.1.04-.03.1-.05.14-.05.14.01.27.06.4.06.78.02,1.34-.41,1.45-1.19.03-.19.33-.37.03-.64-.13-.11-.07-.44-.08-.67,0-.1.03-.2.05-.31.09.02.21.01.26.07.44.6.94,1.18,1.28,1.84.23.43.23.98.33,1.47-.01,0-.03.01-.05.02ZM16.91,35.26c0,.11-.02.23-.01.34,0,.03.11.08.11.08.09-.12.17-.24.26-.36-.12-.02-.23-.05-.35-.07-.03-.19-.08-.38-.1-.57-.02-.16-.09-.2-.23-.12-.25.14-.28.39-.05.55.11.08.25.1.38.14ZM17.29,36.44c-.04.33-.09.62-.11.91,0,.05.07.11.11.17.04-.05.12-.11.12-.16,0-.29.23-.61-.11-.92ZM34.15,36.08c-.08-.53-.16-.93-.21-1.34-.01-.1.03-.21.05-.31.05.07.12.14.14.21.17.69.34,1.38.49,2.07.02.09-.06.2-.09.3-.08-.04-.17-.06-.23-.12-.3-.3-.67-.53-.85-.95-.13-.3-.45-.46-.84-.34-.39.12-.81.12-1.1.48-.09.11-.28.13-.42.19-.12.05-.28.05-.36.13-.36.35-.81.33-1.24.26-.58-.09-1.06.24-1.58.36-.2.05-.29.23-.3.45,0,.06-.13.13-.22.15-.04,0-.16-.13-.15-.14.21-.3.1-.48-.22-.56-.38-.09-.62-.02-.8.32-.23.41-.4.85-.6,1.28-.04.09-.05.18-.09.32-.23-.76-.21-1.02.13-1.8.09-.22.31-.45.08-.71-.05-.06-.12-.09-.18-.14-.02.06-.05.13-.07.19-.07.28-.14.56-.27.82-.2-.46-.26-.9-.09-1.37.28-.82.47-1.66.76-2.47.19-.53.49-1.03.72-1.55.05-.11.05-.27,0-.38-.04-.09-.16-.17-.26-.19-.04-.01-.14.12-.18.2-.29.61-.54,1.25-.91,1.82-.04.06-.03.17-.08.21-.17.15-.35.29-.52.43-.2-.28.11-.42.2-.6.5-1.03,1.13-1.98,1.8-2.91.46-.63,1.73-.87,2.36-.43.22.16.35.46.5.72.03.06-.03.24-.07.25-.18.04-.37.06-.55.03-.23-.03-.44-.17-.67-.18-.31-.02-.58.23-.67.57-.09.35-.06.71.21.94.13.11.45.13.62.06.58-.26.88.15,1.25.43.04.03.07.15.05.2-.02.05-.13.11-.18.09-.18-.06-.36-.15-.54-.24-.29-.15-.57-.22-.88-.03-.3.19-.64.3-.94.49-.18.11-.3.3-.46.44-.14.13-.35.21-.43.36-.09.18,0,.5-.11.62-.25.25-.13.52-.17.78,0,.05.17.19.2.18.43-.22.93-.08,1.33-.24.42-.17.83-.2,1.24-.18.22,0,.48.07.66.2.33.24.62.2.94.03.15-.08.32-.19.48-.19.65,0,1.23-.25,1.82-.46.47-.17.72-.09.95.36.1.19.16.4.26.59.04.08.13.12.3.28ZM20.44,39.4s.1-.07.15-.1c-.77-.78-.81-1.92-1.46-2.83-.23.5-.26.96.02,1.35.4.55.86,1.06,1.29,1.59ZM27.75,39.71c.01.07.06.26.07.45,0,.07-.08.14-.12.21-.05-.05-.14-.09-.14-.14-.05-.29-.12-.59-.11-.88.02-.66.23-1.27.55-1.84.05-.09.18-.13.27-.19.02.08.02.17.06.25.03.07.1.17.14.17.38-.05.7.24,1.13.08.58-.22,1.22-.3,1.84-.43.07-.02.16,0,.23.03.1.04.18.1.27.16-.07.05-.14.12-.22.16-.64.3-1.31.49-2.02.6-.52.08-1.06-.11-1.56.16-.2.1-.33.14-.31.4.02.23-.03.47-.06.84ZM33.59,40.02c-.25.29-.5.59-.77.88-.02.03-.13-.03-.2-.05,0,0,0-.08.02-.1.28-.27.57-.54.85-.82.03.03.06.05.09.08ZM4.32,20.89c-.17.38-.33.67-.41.99-.04.17-.15.39.11.58.2.14.15.59,0,.6-.54.03-.43.43-.46.74-.08.75-.06.77.68.76.35,0,.6.08.79.39.12.21.09.28-.15.28-.4,0-.8,0-1.19,0-.18,0-.31.04-.32.25-.02.43-.04.86-.07,1.29,0,.16.04.26.23.26.53,0,1.08.07,1.59-.04.46-.1.65.11.87.41.15.2.1.29-.13.29-.58,0-1.15,0-1.73,0-.3,0-.66-.06-.86.08-.15.11-.1.5-.14.77q-.12.75.63.75c1.21,0,2.42,0,3.64,0-.2.76-.08.66-.76.66-.91,0-1.81.02-2.72,0-1.11-.02-.83,0-.82.9,0,.04,0,.08,0,.12q.09.63.72.63c.99,0,1.99,0,2.98,0,.14,0,.31-.04.41.03.11.07.2.23.24.37.05.18-.1.23-.26.24-.2,0-.4.03-.59.03-1.01,0-2.03,0-3.04,0-.17,0-.39-.04-.38.24.01.32.02.63.06.95.04.26.18.4.49.4,1.35,0,2.7,0,4.05.02.18,0,.36-.01.53.01.11.02.3.13.3.14-.05.17-.11.37-.23.49-.08.08-.26.08-.39.08-.87-.02-1.74-.07-2.61-.09-.6-.01-1.19,0-1.79.03-.09,0-.26.11-.25.15.09.42.05.88.35,1.23.06.07.19.13.29.13,1.23,0,2.45-.02,3.68-.03.28,0,.56.05.83,0,.55-.09.89.18,1.25.65h-.59c-1.49,0-2.97,0-4.46,0-.18,0-.36,0-.53.03-.07.01-.18.08-.18.12,0,.35,0,.7.05,1.04.04.26.22.38.52.37,1.11-.03,2.21-.03,3.32-.04.61,0,1.23,0,1.84,0,.21,0,.61.35.62.54,0,.05-.08.13-.13.14-.11.02-.24.02-.36.01-1.69-.02-3.37-.05-5.06-.07-.22,0-.34.07-.28.32.09.36.19.73.25,1.1.04.27.19.3.42.3.93,0,1.86,0,2.8,0,1.56,0,3.13,0,4.69,0,.34,0,.41.13.3.45-.08.23-.25.21-.43.21-.66,0-1.31-.01-1.97,0-.83.02-1.66.07-2.5.08-.57,0-1.13-.06-1.7-.07-.38,0-.77.05-1.15.09-.02.43.13.81.34,1.18.15.26.32.46.67.46,1.17-.02,2.34,0,3.51,0,.68,0,1.36,0,2.16,0-.54.41-.98.71-1.62.68-1.21-.05-2.42-.02-3.63-.02-.14,0-.28-.01-.42.02-.06.01-.14.13-.12.18.09.34.19.68.31,1.01.11.29.3.42.65.39.48-.04.96-.01,1.44-.01.01.05.03.1.04.16-.32.17-.61.44-.95.5-.56.1-.57.04-.3.55.04.07.07.14.11.21.22.43.22.43.62.1.12-.1.26-.18.39-.27.78-.53,1.57-1.05,2.35-1.59.49-.34.93-.74,1.43-1.05.7-.44,1.22-.95,1.5-1.8.39-1.15.39-2.29.38-3.6-.33.58-.84.54-1.26.66-.3.09-.62-.02-.87-.28-.13-.14-.3-.26-.45-.39-.38-.32-.68-.67-.53-1.22.02-.09-.01-.2-.01-.29,0-.59-.48-.9-.82-1.25-.46-.47-.66-.92-.52-1.58.13-.62-.24-1.27-.82-1.56-.23-.12-.34-.27-.36-.54-.03-.39-.1-.78-.19-1.15-.18-.77.12-1.35.9-1.61.58-.2,1.17-.38,1.75-.57.08-.03.13-.11.2-.17-.08-.04-.16-.14-.22-.13-.27.06-.53.13-.79.22-.24.08-.45.24-.69-.03-.07-.08-.33-.02-.48.04-.21.07-.39.18-.6-.03-.07-.07-.22-.05-.33-.06-.55-.03-.66-.15-.83-.66-.11-.33-.23-.7-.47-.93-.25-.24-.35-.45-.32-.77.02-.25.03-.51,0-.76-.03-.22-.06-.47-.18-.65-.2-.31-.45-.58-.69-.86-.24-.28-.36-.59-.34-.98,0-.2-.01-.49-.14-.6-.39-.34-.56-.77-.64-1.35ZM21.69,38.81c.18-.21.24-.03.28.12.2.73.64,1.23,1.38,1.44.05.02.11.06.15.09.52.47,1.16.53,1.81.52.05,0,.12-.07.15-.12.04-.07.06-.16.09-.24.07.08.17.15.21.24.16.4.4.7.84.82.15.04.28.15.41.23.44.28.92.42,1.43.54.67.17,1.32.1,1.97.03.29-.03.62-.09.85-.25.22-.17.44-.21.68-.28.61-.19,1.18-.42,1.46-1.09.13-.32.34-.63.57-.89.18-.2.18-.39.14-.6-.08-.35-.2-.69-.28-1.03-.08-.33-.15-.67-.23-1.01.04-.01.08-.02.12-.03.2.51.4,1.02.62,1.52.15.35.25.36.48.08.52-.6.96-1.25,1.21-2.01.14-.43.43-.81.55-1.25.12-.44.43-.81.43-1.28,0-.02.22-.09.25-.06.07.09.16.23.13.32-.17.65-.4,1.28-.79,1.84-.18.25-.29.55-.39.85-.23.72-.58,1.35-1.22,1.77-.35.23-.54.56-.7.93-.15.36-.32.72-.54,1.04-.17.26-.22.45.03.67.1.09.19.21.29.29,1.43,1.11,2.51,2.54,3.62,3.95.27.34.58.65.83,1,.54.78,1.05,1.58,1.58,2.36.3.43.53.41.8-.05.12-.2.26-.38.39-.56.1-.14.19-.28.33-.47-.25-.01-.44-.05-.61-.02-.43.07-.6-.24-.8-.5-.1-.12-.05-.24.11-.24.34-.02.68-.03,1.01,0,.23.01.52.19.67.11.18-.11.24-.43.37-.65.2-.33.41-.65.66-1.04-.23-.01-.36-.03-.5-.03-1.05,0-2.11-.04-3.16.01-.57.03-.87-.23-1.12-.71,1.44,0,2.83-.04,4.22.02.76.03,1.2-.16,1.46-.92.24-.69.31-.67-.45-.67-2.1,0-4.21,0-6.31,0-.23,0-.49.06-.65-.19-.09-.14-.16-.29-.25-.44.15-.02.31-.06.46-.06,2.2,0,4.41,0,6.61,0,1.25,0,1.34-.06,1.7-1.27,0-.02,0-.04.01-.06.05-.16.02-.27-.18-.27-.75-.03-1.49-.08-2.24-.08-.75,0-1.49.06-2.24.07-1.07.02-2.14.02-3.21.02-.61,0-1.22-.03-1.83-.06-.14,0-.28-.09-.41-.14.13-.18.24-.38.4-.54.07-.07.23-.04.35-.04,1.01,0,2.02-.01,3.04,0,2.12,0,4.25.02,6.37.03.37,0,.54-.15.58-.5.02-.17.02-.35.07-.52.14-.48.07-.6-.41-.63-.06,0-.12,0-.18,0-2.15.01-4.29.02-6.44.03-.71,0-1.41,0-2.17,0,.16-.45.26-.77.79-.72.51.06,1.02.01,1.53,0,.86-.02,1.73-.06,2.59-.06.67,0,1.33.06,2,.07.74.01,1.49,0,2.24,0,.13,0,.3-.02.38-.1.3-.32.38-.73.38-1.15,0-.07-.09-.18-.16-.2-.17-.05-.35-.09-.52-.09-1.04,0-2.08.04-3.11.04-.55,0-1.1-.06-1.65-.05-.85,0-1.7.05-2.56.08-.18,0-.36,0-.54,0-.22,0-.26-.09-.2-.3.11-.42.19-.48.8-.47.79,0,1.59.03,2.38.03,1.59,0,3.18-.02,4.77,0,1.1.02,1.12.02,1.08-1.1-.01-.32-.1-.4-.4-.4-1.11.01-2.22,0-3.32,0-1.43,0-2.86,0-4.3,0-.36,0-.4-.09-.28-.43.07-.2.19-.27.4-.27.52,0,1.03,0,1.55,0,1.29,0,2.58.02,3.87.03.75,0,1.51.01,2.26-.01.45-.01.46-.04.47-.47,0-.21,0-.43,0-.65-.02-.49-.03-.49-.49-.47-.85.03-1.69.06-2.54.09-.22,0-.44,0-.65-.01-.96-.02-1.93-.05-2.89-.06-.49,0-.98,0-1.47,0-.18,0-.22-.11-.2-.28.06-.37.31-.4.61-.4,2.03,0,4.05,0,6.08,0,.46,0,.91-.02,1.37-.02.21,0,.34-.07.35-.3,0-.33,0-.67.02-1,0-.21-.09-.29-.28-.28-.14,0-.28,0-.42,0-1.91,0-3.81,0-5.72,0-.16,0-.32,0-.48-.01-.18-.01-.25-.11-.16-.28.15-.29.35-.42.71-.41,1.95.02,3.9,0,5.84,0,.55,0,.54,0,.44-.52-.03-.17-.04-.35-.03-.53.01-.55.01-.55-.55-.55-1.23,0-2.47,0-3.7,0-.5,0-.99,0-1.49,0-.1,0-.25-.07-.27-.14-.05-.16.27-.56.43-.56.63-.02,1.27-.04,1.9-.04.73,0,1.46.03,2.19.05.36,0,.71.04,1.07.03.1,0,.27-.14.27-.2-.03-.47-.1-.94-.17-1.4,0-.06-.13-.16-.2-.16-.47,0-.94.04-1.41.04-1.13,0-2.26-.03-3.39-.04-.02,0-.04,0-.06,0-.29-.04-.32-.28-.33-.49-.01-.25.2-.18.35-.2.08,0,.16,0,.24,0,1.3,0,2.6,0,3.91-.02.79,0,.79-.02.71-.78-.07-.65-.12-.7-.76-.7-1.61,0-3.22,0-4.82,0-.18,0-.38.04-.37-.25,0-.24.03-.43.35-.42,1.41,0,2.82,0,4.23,0,.22,0,.44.03.65.02.44-.02.57-.18.48-.61-.05-.25-.12-.51-.25-.73-.07-.13-.28-.25-.43-.26-.77-.02-1.54,0-2.31-.01-.59,0-1.18-.01-1.77,0-.33,0-.26-.26-.28-.42-.03-.19.08-.26.29-.26,1.05.01,2.11,0,3.16,0,1.12,0,1.2-.1.75-1.14-.02-.04-.05-.07-.06-.1-.1-.28-.28-.35-.59-.33-.9.05-1.81.03-2.71.03-.25,0-.5-.04-.75-.04-.17,0-.24-.07-.26-.24-.02-.24-.03-.41.32-.41,1.07.02,2.14,0,3.21-.02.41,0,.5-.13.33-.5-.1-.23-.29-.43-.37-.67-.12-.38-.36-.45-.72-.44-.87.02-1.75.01-2.62,0-.34,0-.48-.13-.48-.44,0-.36.31-.21.49-.25.08-.01.16.02.24.02.75,0,1.51,0,2.26,0,.1,0,.29-.11.29-.18.04-.42-.16-.75-.38-1.1-.17-.26-.41-.21-.64-.21-.83,0-1.67,0-2.5.02-.48.02-.74-.18-.83-.7h3.38s.05-.09.07-.14c-.28-.39-.58-.78-.84-1.19-.13-.2-.28-.25-.5-.24-.5,0-.99,0-1.49,0-.07,0-.17-.02-.2-.07-.07-.08.22-.57.33-.58.36-.03.72-.05,1.18-.07-.41-.46-.77-.81-1.05-1.21-.23-.34-.47-.48-.87-.46-.3.02-.63-.44-.45-.63.19-.2.05-.27-.02-.35-.26-.27-.53-.53-.82-.77-.15-.13-.33-.24-.5-.36-.01.21-.04.42-.03.62,0,.16.04.31.08.46.01.05.11.12.13.11.42-.18.36.22.41.38.07.24,0,.52.07.76.06.24-.3.74.36.67.01,0,.03.02.04.04.22.46.35.92.15,1.42-.11.26-.41.32-.6.12-.17-.18-.32-.39-.49-.57-.26-.27-.36-.6-.14-.9.24-.33.18-.67.13-1.01-.03-.19-.07-.45-.2-.53-.37-.23-.55-.55-.65-.94-.01-.05-.11-.08-.16-.12,0,.07-.01.14-.03.21-.01.06-.04.15-.07.15-.13,0-.4-.34-.36-.47.08-.28.18-.56.28-.84.07-.22.08-.37-.2-.51-1.22-.6-2.43-1.23-3.64-1.85-.35-.18-.68-.26-1.08-.1-.35.14-.69.08-.92-.29-.08-.14-.28-.28-.42-.29-.37-.02-.79-.05-1.11.1-.37.17-.5.07-.72-.19-.16-.19-.44-.34-.69-.4-.34-.09-.71-.07-1.06-.1-.39-.03-.7,0-.88.46-.13.36-.38.7-.89.47-.08-.04-.23.02-.34.07-.86.41-1.76.75-2.25,1.66-.1.19-.22.19-.38.05-.07-.06-.18-.11-.27-.1-.72.05-1.46-.07-2.17.19-.61.22-.9.6-.91,1.24,0,.2-.03.39-.03.59,0,.22-.1.33-.31.37-.41.07-.81.19-1.23.21-.49.02-.78.27-.96.67-.26.58-.51,1.15-.25,1.82.12.32-.01.51-.29.51-1,.01-1.46.67-1.83,1.45-.19.41-.23.83-.07,1.27.13.35.23.71.36,1.09-.11,0-.2,0-.3,0-.41-.05-.72.04-.91.47-.18.39-.4.78-.68,1.11-.24.29-.14.51.01.74.29.42.27.5-.06.88-.21.24-.4.54-.52.84-.19.48-.06.77.41,1.02.24.13.46.28.49.55.02.2-.04.41-.06.62-.11-.12-.22-.24-.33-.35-.01-.01-.04-.02-.05-.03-.09-.16-.2-.2-.38-.1-.15.09-.23.16-.19.37.05.28.05.58.03.87-.04.57-.1,1.14-.15,1.71-.02.23.19.54.32.46.1-.06.1-.28.14-.44,0-.02-.01-.04-.01-.06.03-.47.05-.94.09-1.41.01-.13.02-.26.25-.13.29.16.32.1.32-.26,0-.16.04-.35.13-.47.35-.48.35-1.12-.06-1.55-.12-.13-.29-.21-.41-.34-.06-.07-.11-.2-.09-.28.03-.12.19-.31.2-.3.28.16.28-.1.37-.24.08-.13.15-.31.27-.37.3-.13.51-.29.51-.65,0-.02.11-.04.16-.07.08-.05.15-.1.22-.16.07-.07.12-.19.2-.24.7-.45,1.01-1.13,1.09-1.92.02-.26.02-.46.37-.47.12,0,.25-.11.35-.2.45-.39.8-.85,1.07-1.38.26-.5.55-.99.84-1.48.12-.2.31-.4.1-.61-.03-.03-.32.2-.49.31-.02.01-.06,0-.08,0-.19-.68-.07-.87.6-.93.12-.01.24.01.36.01.51,0,.66-.16.53-.66-.14-.54.11-.96.29-1.41.09-.21.2-.19.37-.09.25.15.51.29.79.4.59.23.9.14,1.28-.36.13-.17.23-.37.31-.56.09-.25.27-.39.5-.3.29.11.54.07.8-.03.08-.03.22-.03.28.02.32.27.64.2.99.1.39-.11.59-.27.44-.63-.15-.36.13-.4.25-.39.46.01.58-.33.73-.61.32.19.62.37.93.55.2.11.2.11.03.33-.03.04-.05.13-.04.14.18.13.36.31.57.35.19.04.52-.37.42-.45-.47-.35.03-.37.16-.41.37-.13.76-.22.95-.64.02-.06.13-.1.2-.1.21-.02.42-.03.63-.04.32-.02.45.11.46.45,0,.19-.02.4.05.57.08.19.05.3-.13.38-.05.02-.1.06-.14.09.06.04.11.1.18.11.11.02.22.02.33,0,.55-.05,1.09-.13,1.63-.16.29-.02.5-.04.54-.39.09-.66.49-1.17.82-1.72.04-.07.16-.1.24-.14.04.1.12.2.12.29-.01.25-.12.51-.09.75.04.3.09.57-.07.86-.05.09.08.39.1.39.38-.04.2.16.17.33-.01.09.09.2.14.31.11.23.33.38.34.7,0,.19.22.4.5.42.13,0,.27.05.4.09.36.11.38.13.13.37-.22.21-.27.37,0,.57.14.1.24.27.39.37.1.07.3.16.36.12.31-.24.32.02.36.2.09.34.17.64.5.89.21.15.31.56.31.85,0,.66-.09,1.33-.12,2,0,.1.12.21.18.31.11-.07.27-.12.3-.22.05-.14,0-.3-.02-.46-.04-.58-.17-1.14.06-1.74.1-.26-.15-.66-.26-.98-.07-.2-.22-.26-.43-.18-.03.01-.13-.08-.14-.14-.03-.14-.04-.29-.05-.43.35.26.61.58.9.87.31.33.68.61.61,1.14,0,.07.04.14.07.21.16.4.33.79.46,1.2.12.37.14.79.31,1.14.34.71.51,1.44.56,2.22.04.67.1,1.34.16,2,.05.51.13,1.02.17,1.53.03.39-.02.81-.37,1.01-.5.27-.45.64-.32,1.05.08.26.21.51.33.77.21.49.42.97.64,1.46.17.37.11.73-.04,1.09-.22.54-.75.93-.78,1.57,0,.04-.09.08-.12.13-.14.26-.29.51-.39.77-.11.27-.15.57-.26.85-.23.56-.48,1.09-1.19,1.18-.26.03-.27.21-.26.44.02.59.01,1.18,0,1.77,0,.06-.08.11-.12.17-.03-.06-.09-.12-.09-.18-.02-.29-.06-.59-.04-.89.02-.43.02-.88.16-1.28.13-.36.25-.69.27-1.07.02-.52-.08-1.04.18-1.56.27-.54.48-1.12.64-1.7.16-.59.29-1.19.33-1.8.06-.87-.32-1.64-.64-2.42-.2-.49-.62-.9-.58-1.49,0-.08-.18-.25-.24-.23-.3.07-.28-.1-.28-.3,0-.13.01-.28-.05-.39-.11-.19-.15-.35,0-.55.04-.05.02-.21-.03-.27-.3-.33-.03-.61.12-.84.12-.18-.14-.79.48-.53,0,0,.09-.09.08-.12-.02-.11-.06-.23-.1-.33-.29-.73-.6-1.46-.86-2.2-.18-.5-.29-1.02-.44-1.52-.03-.1-.13-.19-.23-.25-.04-.02-.14.06-.21.1.11.23-.14.58.27.71.06.02.11.26.09.28-.35.2-.09.39,0,.59.09.19.19.38.25.59.02.07-.08.16-.12.25-.07-.05-.17-.08-.21-.14-.41-.63-.81-1.26-1.2-1.9-.08-.13-.2-.27-.2-.4,0-.41-.24-.52-.57-.51-.29,0-.53-.06-.77-.23-.12-.08-.35-.15-.43-.09-.24.19-.45.08-.65,0-.67-.28-1.39-.49-1.7-1.26-.01-.04-.04-.07-.07-.1-.04-.03-.1-.05-.15-.07-.03.07-.09.15-.07.2.07.19.16.36.24.54-.04.02-.07.04-.11.06-.19-.25-.37-.5-.57-.73-.05-.06-.17-.06-.25-.08,0,.09-.01.19.02.26.1.21.23.42.35.62-.36-.11-.65-.26-.93-.42-.04-.02-.06-.1-.08-.15-.19-.43-.38-.86-.57-1.29-.05-.11-.09-.22-.14-.32-.02-.04-.1-.08-.13-.07-.04.01-.1.07-.1.12-.04.37-.07.75-.12,1.12-.01.1-.1.18-.16.28-.07-.06-.15-.11-.22-.17-.04-.04-.04-.12-.09-.15-.1-.08-.24-.21-.31-.18-.1.04-.17.19-.21.31-.1.27-.2.55-.27.83-.12.54-.66.81-.8,1.34,0,.03-.14.06-.14.06-.22-.41-.3-.05-.43.07-.09.09-.2.17-.31.25-.19.13-.4.24-.59.37-.04.03-.09.13-.08.15.05.05.11.08.18.1.08.02.16.02.24.03-.23.15-.53.2-.37.58.02.04-.11.17-.19.21-.41.19-.81.45-1.24.54-.95.21-1.86.47-2.65,1.08-.82.64-1.55,1.35-2.11,2.23-.04.07-.03.18,0,.26,0,.02.15.04.2,0,.38-.24.93-.2,1.17-.7.05-.1.23-.15.35-.2.14-.06.16-.03.19.15.07.41-.04.78-.25,1.09-.48.73-.57,1.51-.29,2.32.16.47.09.89-.04,1.33-.16.56-.16.56.31.82.26.15.43.31.59.6.17.32.41.75.96.83-.09-.19-.17-.3-.19-.43-.02-.07.05-.24.08-.24.44,0,.59-.29.71-.66.05-.15.23-.29.38-.36.55-.28,1.12-.53,1.69-.78.18-.08.34-.18.28-.38-.02-.08-.21-.11-.33-.14-.09-.02-.2,0-.3,0-.39-.02-.72.21-1.07.28-.53.1-.99.3-1.45.58.23-.29.49-.56.57-.95.02-.12.22-.21.35-.3.14-.1.31-.17.45-.28.43-.34.86-.56,1.37-.13.12.1.28.16.43.19.17.03.4.08.51,0,.32-.26.59-.12.89-.01.24.09.5.11.73.21.26.12.62.23.73.45.15.32.33.54.62.74.31.23.52.6.81.86.29.27.32.55.21.9-.13.42-.19.84-.09,1.28.09.43.08.43.66.39-.49.35-.7.77-.8,1.27-.04.2-.2.31-.37.11-.22-.26-.4-.13-.6.02-.2.16-.4.33-.6.48-.11.08-.25.15-.36-.02-.11-.16-.05-.25.11-.32.09-.04.16-.12.3-.21-.19-.03-.31-.05-.42-.07.07-.11.12-.23.2-.31.12-.13.27-.22.4-.34.24-.23.49-.46.69-.72.08-.1.13-.33.07-.4-.17-.19-.31,0-.44.11-.04.04-.08.08-.12.13-.32.41-.61.86-.98,1.23-.34.35-.78.59-1.29.65.09-.11.32-.19.31-.22-.08-.38.22-.36.43-.44.11-.04.23-.11.29-.2.27-.39.53-.78.76-1.19.19-.33.13-.47-.1-.76-.08-.1-.07-.26-.1-.39.14,0,.3-.05.43-.01.15.04.27.16.4.25.09-.16.19-.31.25-.46.05-.14.09-.31.06-.45-.09-.47-.98-1.26-1.45-1.3-.06,0-.12,0-.17.01-.84.12-1.67.25-2.51.35-.62.08-1.2.5-1.38,1.04-.18.11-.28.24-.15.54.09-.21.15-.35.21-.48.05-.03.1-.06.15-.1.44-.39.83-.89,1.54-.59.03.01.08-.02.11-.02.51-.06,1.04-.2,1.44.3.47,0,.63.39.88.71-.35.1-.52-.13-.65-.34-.25-.38-.56.21-.8-.07-.02-.02-.19.03-.2.08-.03.1-.04.23,0,.31.04.07.16.1.25.13.28.12.35.3.18.52-.06.08-.15.13-.23.18-.54.35-1.1.43-1.68.1-.08-.04-.19-.01-.29-.02.06.08.11.18.19.24.2.16.41.3.61.45-.39.02-.73.04-1.03-.22-.13-.11-.39-.08-.6-.11,0,.16-.05.35.02.46.13.22-.08.23-.15.31-.13.15-.23.09-.32-.06-.02-.03-.16-.05-.17-.03-.23.35-.27.36-.53.07-.18-.2-.16-.52-.4-.7-.02-.02.01-.17.04-.18.28-.08.18-.2.05-.33-.13-.12-.27-.24-.38-.37-.33-.39-.91-.45-1.18-.91,0,0-.2.05-.23.12-.17.29-.3.6-.46.89-.08.14-.19.25-.29.37.13.06.26.11.38.19.06.04.09.12.17.25-.2-.03-.33-.05-.46-.08-.27-.06-.53-.06-.64.23-.16.39-.07.66.22.86.04.03.05.11.07.16-.26.1-.09.25-.05.38.07.19.14.32.38.17.06-.03.26.13.36.23.15.16.26.35.38.53.1.14.27.28.28.43.01.15-.13.31-.22.49.37-.1.65-.08.7.37,0,.08.1.17.17.21.28.15.26.41.27.66.01.33.02.65.05.98.04.5.21,1.01-.24,1.43-.02.02-.03.09-.02.1.5.35-.04.22-.14.3-.08.08-.2.18-.2.27-.03.52.02,1.02.33,1.47.21.3.41.61.57.95.36.78.68,1.58,1.02,2.37,0,0,0,.01-.01.02,0,0,.01.01.02.02,0,.05,0,.09.01.14.05.13.11.25.17.37,0,0,.03-.01.05-.02-.04-.11-.08-.23-.13-.34-.03-.06-.07-.1-.11-.15,0-.01,0-.02,0-.03h0ZM33.21,41.78c-.09.06-.17.08-.18.11,0,.04.02.11.06.15.49.54.99,1.06,1.46,1.61.42.5.81,1.02,1.19,1.55.93,1.31,1.85,2.64,2.77,3.96.28.4.55.82.81,1.23.11.18.21.21.38.07.27-.22.29-.37.02-.69-.19-.22-.44-.39-.61-.62-.41-.57-.77-1.16-1.17-1.73-.13-.19-.3-.36-.43-.55-.45-.6-.86-1.23-1.34-1.81-.86-1.02-1.76-2.01-2.64-3-.1-.11-.22-.19-.32-.29ZM32.54,46.83c-.02-.69.09-3.66.08-4.45,0-.08-.2-.23-.25-.21-.36.14-.72.31-1.06.49-.04.02-.06.16-.04.24.27,1.03.56,2.05.83,3.07.02.09,0,.19,0,.29.01.43.03.87.04,1.3.01.4.03.79.04,1.19,0,.08,0,.17-.04.23-.13.17-.26.39-.44.46-.1.04-.3-.18-.45-.29-.1-.07-.19-.13-.29-.2-.36-.25-.59-.91-.39-1.31.3-.59.33-1.21.33-1.85,0-.51.02-1.03.03-1.54,0-.2,0-.44-.24-.48-.13-.02-.31.09-.42.2-.27.29-.44.65-.81.87-.13.07-.16.31-.22.47-.03.07,0,.16-.02.24-.13.92-.52,1.1-1.27.52-.29-.22-.51-.55-.72-.86-.4-.6-.87-1.12-1.54-1.43-.23-.1-.48-.16-.68-.29-.3-.18-.3-.3.02-.41.27-.09.22-.22.07-.31-.34-.19-.71-.32-1.08-.46-.03-.01-.15.1-.15.17-.08.63-.16,1.27-.21,1.9-.03.32-.21.5-.46.62-.26.13-.34-.13-.47-.25-.44-.42-4.87-4.75-5.85-5.69-.13-.12-.28-.46-.49-.21-.18.21.16.3.28.43.32.35,14.99,15.69,15.89,16.41.16.13.13.24-.05.29-.96.29-1.22.44-2.18.74-.86.26-1.73.35-2.63.39-.76.03-1.53.31-2.27.26-1.24-.09-2.48,0-3.72-.25-.75-.15-1.49-.37-2.23-.55-1.04-.25-2.04-.69-3.04-1.11-.91-.38-1.81-.78-2.67-1.27-.84-.47-1.66-1.01-2.41-1.61-.69-.55-1.36-1.16-1.93-1.84-1.2-1.41-2.4-2.84-3.3-4.47-.42-.76-.77-1.56-1.11-2.35-.3-.68-.55-1.38-.81-2.08-.11-.29-.16-.61-.24-.91-.11-.39-.24-.79-.36-1.18-.61-2.08-1-4.21-1.24-6.37-.07-.67-.09-1.35-.1-2.02-.02-.87-.03-1.74,0-2.62.06-1.87.16-3.74.54-5.58.14-.7.21-1.42.45-2.09.39-1.08.54-2.22.96-3.28.34-.86.71-1.71,1.09-2.56.36-.8.69-1.62,1.14-2.37.58-.99,1.24-1.94,1.91-2.88.27-.38.67-.67,1-1,.46-.45.91-.93,1.39-1.36.64-.57,1.29-1.15,1.99-1.66.62-.45,1.28-.85,1.95-1.21,1.23-.65,2.49-1.26,3.87-1.58.73-.17,1.44-.43,2.17-.62.3-.08.62-.11.93-.14,1.07-.11,2.15-.28,3.22-.31,1.06-.03,2.12.05,3.18.16.62.06,1.23.26,1.83.42.76.19,1.52.38,2.27.62.51.16,1,.38,1.49.58.53.22,1.06.43,1.56.7.9.48,1.78,1.01,2.66,1.52.21.12.42.23.61.36.19.13.37.28.54.43.42.38.84.77,1.25,1.16.62.6,1.23,1.2,1.66,1.97.17.3.45.55.68.83.89,1.09,1.64,2.27,2.18,3.58.22.55.54,1.06.75,1.61.25.66.43,1.34.65,2.01.2.64.42,1.27.61,1.91.08.28.12.57.17.86.02.1.02.2.05.29.55,1.6.72,3.28.91,4.94.11,1,.08,2.02.11,3.03.01.53.03,1.06.01,1.59-.07,1.89-.15,3.79-.55,5.65-.15.7-.21,1.42-.44,2.09-.51,1.46-.74,3.02-1.46,4.42-.46.91-.8,1.88-1.24,2.8-.28.57-.65,1.1-.97,1.65-.18.31-.33.63-.52.93-.6.94-1.3,1.78-2.18,2.48-.46.37-.81.86-1.22,1.29-.12.13-.25.26-.38.37-.27.22-.57.23-.74-.05l-5.61-5.1c-.1-.05-.19-.25-.19-.38ZM26.52,58.52c1.27.11,2.33-.27,3.42-.49.47-.1.91-.38,1.38-.49.49-.12.99-.14,1.48-.37.96-.46,1.96-.81,2.95-1.21.35-.14.73-.24,1.04-.44.62-.4,1.23-.84,1.81-1.3.86-.68,1.87-1.21,2.52-2.15.18-.26.5-.43.62-.71.18-.41.48-.66.79-.94.16-.14.31-.31.44-.48.43-.56.81-1.15,1.27-1.69.68-.79.99-1.78,1.49-2.67.54-.96.84-2.03,1.31-3.03.41-.86.64-1.81.93-2.73.17-.53.3-1.07.43-1.61.15-.65.32-1.31.42-1.97.11-.77.13-1.55.21-2.33.04-.33.18-.65.2-.98.06-1.08.09-2.17.12-3.25.01-.31.02-.63,0-.94-.05-.67-.11-1.34-.18-2.01-.12-1.2-.22-2.41-.36-3.61-.11-1.04-.39-2.03-.69-3.03-.37-1.22-.73-2.44-1.17-3.63-.32-.87-.68-1.73-1.09-2.56-.39-.78-.84-1.53-1.31-2.26-.53-.82-1.25-1.51-1.75-2.35-.24-.41-.55-.77-.85-1.14-.14-.17-.32-.29-.48-.44-.09-.08-.18-.15-.26-.23-.47-.48-.89-1.02-1.42-1.42-.86-.66-1.76-1.3-2.71-1.83-.92-.51-1.79-1.12-2.83-1.41-.59-.17-1.14-.5-1.71-.74-1.32-.53-2.72-.74-4.11-.91-1.56-.2-3.14-.45-4.73-.21-.19.03-.4-.01-.59-.02-.12,0-.23-.03-.35,0-.62.12-1.25.2-1.86.38-1.14.34-2.31.61-3.42,1.04-.88.34-1.75.73-2.65,1.02-1.07.35-1.91,1.08-2.84,1.66-.48.3-.92.68-1.37,1.03-.31.24-.62.49-.89.77-.41.42-.85.84-1.18,1.33-.21.32-.42.6-.71.85-.18.15-.34.33-.48.52-.44.57-.85,1.17-1.31,1.72-.66.78-.98,1.74-1.46,2.61-.53.96-.85,2.03-1.31,3.02-.41.88-.64,1.85-.94,2.79-.16.51-.3,1.03-.42,1.55-.18.79-.35,1.58-.5,2.38-.07.4-.11.82-.14,1.22-.02.33.06.68-.03.98-.19.62-.17,1.24-.19,1.87-.02.58.01,1.16-.05,1.73-.1.91,0,1.8.06,2.7.06,1.05.18,2.09.31,3.13.13,1.05.23,2.12.51,3.14.36,1.32.72,2.65,1.25,3.92.31.75.56,1.52.86,2.27.62,1.55,1.53,2.94,2.52,4.27.13.17.3.32.44.48.09.1.18.2.25.31.43.61.85,1.23,1.29,1.84.08.11.21.17.32.26.1.09.2.18.3.28.49.48.94,1.03,1.48,1.44,1.51,1.14,3.13,2.12,4.8,3.01.1.06.22.1.33.13.4.13.84.2,1.21.4,1.49.78,3.13,1,4.76,1.28.48.09.97.13,1.46.18.69.07,1.38.15,2.07.16.47,0,.95-.09,1.28-.12ZM23.07,0c1.57.03,3.06.03,4.55.1.52.02,1.03.22,1.55.33,1,.2,2.02.36,3.01.61.72.18,1.42.45,2.12.73.72.29,1.47.56,2.11.97.47.3.98.49,1.45.77.15.09.26.23.39.36.13.14,1.75,1.03,2.21,1.54.86.94,1.84,1.79,2.67,2.76.69.82,1.25,1.75,1.85,2.64.41.61.82,1.22,1.19,1.86.46.78.94,1.54,1.19,2.43.11.41.41.76.57,1.16.16.41.28.84.39,1.28.16.67.44,1.3.63,1.96.25.9.4,1.83.73,2.7.06.16.01.35.03.53.12.94.28,1.87.26,2.84-.02.67.2,1.35.29,2.03.04.32.05.65.05.97,0,.84.01,1.69,0,2.54-.01.35-.12.7-.15,1.05-.08.82-.14,1.64-.21,2.46-.02.21-.02.42-.05.63-.19,1.1-.34,2.21-.61,3.29-.14.56-.14,1.18-.53,1.68-.12.15-.15.4-.17.61-.14,1.08-.71,2.02-1,3.05-.11.41-.41.75-.57,1.15-.44,1.1-.95,2.17-1.59,3.16-.48.74-1.07,1.41-1.59,2.14-.43.61-.97,1.12-1.37,1.75-.34.54-.83.97-1.38,1.32-.05.03-.13.04-.15.08-.42.72-1.17,1.07-1.78,1.59-.59.49-1.19.92-1.93,1.17-.44.15-.83.44-1.25.66-.17.09-.33.2-.51.26-.71.22-1.38.52-2.04.86-.19.1-.42.1-.62.17-.3.09-.59.22-.89.3-.85.23-1.7.44-2.55.65-.39.09-.79.2-1.19.23-.8.06-1.6.08-2.4.1-.4.01-.79.02-1.19,0-.63-.02-1.27-.04-1.9-.09-.33-.03-.65-.12-.98-.19-1.61-.35-3.26-.53-4.81-1.14-.85-.33-1.72-.59-2.5-1.09-.54-.35-1.16-.55-1.73-.84-.21-.11-.38-.28-.55-.44-.16-.17-.27-.4-.57-.35-.03,0-.09-.01-.11-.04-.55-.71-1.51-.9-2.02-1.69-.26-.4-.69-.7-1.07-1.02-.65-.56-1.11-1.27-1.65-1.92-.76-.91-1.35-1.93-1.99-2.91-.68-1.05-1.34-2.11-1.74-3.31-.08-.24-.24-.46-.37-.67-.37-.59-.4-1.29-.63-1.93-.28-.75-.54-1.51-.8-2.27-.04-.11-.05-.23-.06-.35-.03-.21-.03-.43-.1-.63-.26-.72-.44-1.45-.42-2.23,0-.06.03-.14,0-.18-.32-.46-.16-1-.24-1.5-.09-.64-.07-1.29-.12-1.93-.02-.23-.09-.46-.12-.69-.04-.32-.08-.64-.09-.96,0-.94,0-1.89.02-2.83,0-.33.09-.66.12-1,.12-1.3.21-2.61.36-3.92.06-.56.24-1.11.37-1.67.13-.53.25-1.07.39-1.6.12-.45.28-.88.42-1.33.02-.06.06-.1.07-.16.19-1.16.79-2.19,1.08-3.33.07-.29.34-.52.46-.81.45-1.09.97-2.16,1.6-3.16.49-.76,1.09-1.45,1.64-2.17.43-.56.83-1.14,1.28-1.67.36-.43.77-.81,1.18-1.19.43-.4.87-.77,1.32-1.14.34-.28.73-.52,1.04-.83.47-.47,1.05-.72,1.64-.98.47-.2.9-.48,1.35-.71.2-.11.43-.18.64-.27.63-.28,1.25-.57,1.88-.83.27-.11.56-.15.84-.23.96-.29,1.91-.63,2.88-.87.83-.2,1.7-.27,2.47-.39Z\"/>\n  </g>\n</svg>",
    0: "<svg viewBox=\"0 0 50.28 59.47\">\n  <g>\n    <path class=\"cls-1\" d=\"M24.91,4.23c.12-.23.21-.39.27-.56,0-.02-.13-.1-.2-.15-.08.16-.18.31-.25.48-.01.03.07.1.17.22ZM22.33,5.33c0,.11.02.22.03.37.57-.72,1.1-1.4,1.63-2.08.05-.07.06-.18.09-.27-.11-.03-.23-.11-.31-.08-.14.04-.29.13-.37.24-.37.6-.71,1.21-1.06,1.82ZM27.29,3.66c-.15.2-.37.36-.37.51,0,.4-.41.74-.2,1.17.02.05-.06.17-.12.25-.07.09-.2.14-.25.24-.04.09-.06.24,0,.31.05.08.19.13.29.16.02,0,.1-.14.12-.22.06-.25.18-.5.15-.74-.05-.41.25-.57.46-.8.05-.05.18-.04.21-.09.09-.14.22-.33.18-.45-.03-.12-.25-.19-.46-.34ZM29.05,6.22c.07.18.12.3.17.42.13-.07.31-.11.37-.22.23-.4.64-.72.65-1.23,0-.14-.03-.29-.05-.43-.16.04-.41.03-.47.13-.26.43-.46.9-.68,1.34ZM27.9,5.64c-.05.12-.14.35-.23.58-.06.15-.15.33.07.4.19.06.46.27.58,0,.2-.44.36-.92.45-1.39.06-.33-.25-.52-.55-.36-.23.12-.51.28-.32.77ZM22.93,6.85c.09-.06.14-.08.19-.11.37-.23.6-.54.67-.97.04-.23.13-.45.19-.67.04-.14.06-.28.09-.42-.13.07-.26.13-.38.21-.04.03-.04.12-.08.15-.44.43-.39,1.09-.7,1.58-.03.04,0,.13.02.23ZM31.68,5.5c-.05-.08-.1-.25-.19-.27-.1-.03-.25.05-.35.13-.5.39-.59.99-.77,1.55-.01.04.03.15.04.15.07,0,.17-.01.21-.06.33-.36.66-.73.97-1.1.07-.08.06-.22.09-.4ZM19.67,5.91c.04.38.06.69.1,1.01,0,.05.05.1.08.15.06-.04.15-.08.17-.13.07-.24.09-.49.17-.72.22-.56.36-1.15.72-1.65.07-.1.07-.26.1-.39-.15-.01-.31-.06-.45-.03-.1.02-.22.1-.29.18-.35.49-.5,1.06-.6,1.59ZM33.3,6.26c-.13-.07-.25-.19-.37-.19-.51,0-.68.2-.74.82,0,.05,0,.15.01.16.07.02.16.04.21,0,.26-.18.5-.38.74-.58.04-.04.06-.1.14-.21ZM22.33,5.34v.02c.01-.45-.03-.91.39-1.23.06-.04.04-.18.06-.27-.13-.01-.3-.09-.37-.03-.35.29-.72.58-1,.93-.42.53-.65,1.17-.78,1.82-.04.2.12.48.26.68.06.08.32.12.42.06.26-.16.51-.32.58-.69.08-.44.29-.85.44-1.27h0s0,0,0,0ZM19.59,5.34c-.07-.11-.13-.27-.25-.35-.04-.03-.24.1-.32.2-.43.55-.56,1.2-.62,1.87-.02.27.16.57-.13.81-.01,0,.06.19.11.2.42.06.95-.51.87-.93-.08-.41-.12-.81.11-1.2.1-.17.14-.36.23-.59ZM17.26,6.99c.04.35.08.69.14,1.03.02.09.13.17.19.25.04-.08.09-.16.11-.25.07-.38.1-.78.2-1.16.18-.66.22-1.38.71-1.93.01-.01.02-.04.02-.06-.02-.09-.05-.18-.07-.27-.09.02-.21.02-.27.08-.12.12-.18.3-.29.42-.51.52-.8,1.12-.74,1.88ZM35.18,10.48c.11.11.21.22.32.32.02-.03.07-.07.06-.08-.1-.11-.21-.21-.32-.31-.12-.11-.24-.21-.36-.31,0,0-.05.04-.08.06l.37.32ZM12.02,12.51c0,.56.31.96.83,1.03.05,0,.13,0,.16-.04.03-.03.02-.13,0-.15-.34-.26-.44-.77-.91-.9-.02-.16,0-.33-.06-.47-.21-.46-.23-.91-.1-1.39.02-.07,0-.14,0-.26-.47.63-.41,1.56.09,2.18ZM35.11,13.86s-.01-.11-.04-.16c-.26-.64-.47-1.29-.79-1.9-.63-1.24-1.53-2.25-2.77-2.92-.06-.03-.16,0-.24,0,.03.07.04.17.09.21.2.16.46.27.62.46.67.81,1.32,1.63,1.96,2.46.13.17.2.38.3.57.21.44.42.89.64,1.33.02.05.12.06.18.09.01-.04.03-.07.05-.12ZM37.38,13.99c-.13-.42-.22-.85-.4-1.24-.23-.5-.52-.96-.8-1.43-.04-.06-.16-.07-.25-.1,0,.09-.02.19.02.25.53.71.83,1.54,1.13,2.36.03.07.03.16.07.22.03.04.1.08.14.07.04,0,.05-.09.08-.14ZM9.99,13.68c-.04.1-.07.16-.09.22-.12.54.37,1.44.73,1.64.13.08.33.07.5.04.15-.02.18-.17.04-.25-.48-.26-.72-.69-.87-1.19-.03-.11-.09-.22-.15-.32-.02-.04-.07-.07-.15-.15ZM9.78,15.34c-.05.11-.1.18-.09.19.13.13.26.26.39.38.03-.04.09-.1.09-.11-.11-.15-.24-.29-.39-.46ZM37.17,15.28c.5.94,1.33,1.48,2.19,2,.07.04.17.01.26.02-.03-.07-.05-.15-.1-.2-.27-.29-.53-.59-.81-.86-.91-.88-1.84-1.71-2.22-3.04-.26-.89-.93-1.63-1.58-2.32-.13-.14-.28-.27-.48-.46.46.97.88,1.83,1.29,2.7.35.74.73,1.48.99,2.25.2.59.54,1.05.94,1.5.02.03.1.01.15,0,.01,0,.03-.07.02-.09-.05-.08-.11-.16-.18-.24-.3-.36-.46-.78-.45-1.25ZM38.53,17.68c-.1-.11-.18-.21-.28-.3,0,0-.08.05-.12.08.09.09.18.19.28.27,0,0,.06-.03.12-.06ZM10.23,18.33c-.12-.17-.21-.3-.3-.42,0-.01-.06.01-.09.02.08.14.16.28.24.41,0,0,.03,0,.15,0ZM10.73,22.05c.33-.45.58-.79.83-1.14.07-.09.12-.21.13-.33.07-.5.39-.86.67-1.24.27-.36.57-.68.85-1.03.03-.04.03-.11.04-.17-.06,0-.14-.03-.19,0-.35.18-.67.39-.91.72-.66.94-1.2,1.92-1.43,3.18ZM42.34,23.38s-.07.03-.1.04c.03.13.05.25.1.38,0,.03.08.04.12.05.01-.04.04-.08.03-.11-.04-.12-.1-.24-.15-.37ZM40.58,22.37c.42.61.82,1.2,1.23,1.79.05-.03.1-.06.15-.09-.14-.31-.32-.61-.41-.94-.14-.53-.54-.67-.97-.76ZM45.97,20.55s-.08.02-.12.03c0,.21,0,.43,0,.64,0,.06-.06.12-.1.18-.04-.03-.09-.06-.13-.1-.21-.26-.41-.53-.63-.78-.18-.21-.35-.46-.58-.59-.21-.12-.5-.1-.76-.13-.06,0-.13.02-.2.03.02.05.03.11.07.16.41.55.82,1.1,1.22,1.66.62.85,1.19,1.71,1.51,2.73.02.07.15.17.18.15.1-.05.25-.18.24-.21-.19-.4.05-.92-.39-1.25-.12-.09-.22-.45-.16-.51.36-.37.06-.75.05-1.11,0-.3-.13-.59-.2-.89ZM29.39,23.83c-.5.07-.87.14-1.24.17-.52.04-.89-.18-1.04-.69-.07-.24-.18-.22-.34-.1-.27.2-.54.39-.82.58-.06.04-.15.03-.23.05-.02-.09-.08-.21-.05-.27.12-.2.27-.4.43-.56.45-.43.97-.73,1.63-.73.23,0,.47-.09.7-.09.39,0,.78.04,1.18.05.1,0,.2-.05.31-.08-.07-.09-.11-.23-.2-.26-.25-.1-.52-.17-.79-.25-.17-.05-.35-.06-.52-.11-.11-.04-.2-.11-.3-.17.13-.04.26-.13.38-.12.33.02.67.07.99.14.46.09.61,0,.7-.49.08-.41.08-.41-.32-.5-.42-.1-.85-.21-1.27-.27-.17-.02-.37.07-.55.11-.37.1-.75.18-1.11.32-.38.15-.77.33-1.11.54-.44.28-.72.67-.63,1.24.1.64-.25,1.09-.69,1.47-.1.09-.35.09-.48.02-.09-.05-.17-.29-.14-.4.07-.23.03-.36-.12-.56-.25-.34-.1-.74.06-1.07.25-.53.45-1.13.84-1.53.37-.38.72-.82,1.32-1.03.58-.21,1.17-.36,1.76-.49.52-.11,1.08-.08,1.64.07,1.03.29,1.93.88,2.94,1.21.39.12.52.49.61.82.04.15-.14.47-.28.51-.32.09-.44.41-.44.55.02.65-.41.83-.88.92-.3.06-.42.17-.42.45,0,.52-.38.76-.76.95-.33.17-.7.26-1.07.35-.11.03-.25-.07-.37-.11.05-.11.09-.25.17-.33.11-.1.26-.16.5-.3ZM39.28,25.76c.05-.72-.36-1.2-.64-1.72-.15-.28-.28.13-.46.13-.19,0-.06.12-.01.18.35.44.71.89,1.12,1.4ZM40.26,26.05c.18-.1.39-.15.41-.24.07-.26.17-.57-.1-.78-.37-.29-.12-.71-.27-1.04,0-.01.05-.08.07-.07.44.06.24-.24.16-.34-.25-.33-.52-.65-.83-.93-.62-.55-1.21-.59-1.76-.17-.18.14-.13.22.03.29.69.29,1.03.92,1.43,1.49.14.2.22.46.31.69.09.26.14.53.24.79.05.11.18.19.3.31ZM38.1,26.89c0-.11,0-.21-.03-.3-.01-.03-.15-.07-.16-.05-.11.16-.26.31-.29.49-.02.09.16.22.25.34.07-.08.15-.16.2-.25.03-.07.02-.15.03-.22ZM12.5,25.73s-.08,0-.12,0c-.05.34-.12.67-.16,1.01-.03.25-.04.51-.04.77,0,.06.07.11.1.17.04-.06.1-.12.11-.18.04-.41.08-.82.1-1.23.01-.18,0-.36,0-.54ZM11.44,25.54c-.08.93-.15,1.75-.23,2.57,0,.1-.1.18-.16.27-.05-.09-.15-.19-.15-.28.04-.69.09-1.37.14-2.06.01-.15.04-.31.1-.45.05-.11.16-.18.25-.27.02.11.05.22.05.22ZM25.68,28.89c-.05.08-.06.15-.1.16-.04.01-.12-.01-.15-.05-.12-.15-.24-.3-.34-.47-.06-.11-.08-.25-.12-.38.13.07.3.1.39.21.14.15.22.35.32.53ZM37.82,27.83s.01-.08,0-.12c-.03-.09-.07-.17-.11-.26-.06.06-.15.11-.18.19-.08.2-.13.41-.21.61-.22.55-.75.81-1.18.59-.09-.05-.2-.07-.3-.1,0,.13-.04.27,0,.39.09.29.32.4.65.35.7-.1,1.34-.89,1.34-1.65ZM42.98,31.06c-.08-.12-.11-.19-.16-.25-.17-.19-.33-.4-.53-.56-.49-.37-1.04-.55-1.66-.48-.14.01-.26.27-.42.02-.02-.03-.17-.01-.19.03-.04.05-.05.17-.01.22.15.23.3.42.63.47.48.07.95.23,1.42.36.22.06.43.18.65.25.07.02.15-.03.27-.05ZM44.09,31.19c.01-.17.09-.38.02-.51-.2-.38-.46-.72-.7-1.08-.04-.06-.14-.11-.13-.15.06-.41-.3-.45-.53-.59-.44-.27-.9-.06-1.35-.07-.37,0-.65.14-1.04.36,1.53.25,2.88.62,3.72,2.04ZM24.98,31.84c-.77-.34-1.45.12-2.16.16-.29.01-.6.03-.88-.02-.14-.02-.31-.17-.37-.3-.11-.27-.29-.45-.52-.62-.17-.12-.32-.3-.44-.47-.18-.24-.11-.77.1-.97.19-.19.44-.21.62.01.44.56.94.45,1.5.25.48-.17.97-.29,1.47-.41.12-.03.26.04.4.05.13,0,.3.04.39-.02.4-.28.69-.01.96.19.26.19.26.5.17.81-.13.43-.16.91-.64,1.14-.19.09-.4.14-.59.21ZM42.68,33.78s.07-.05.1-.07c-.34-.51-.67-1.02-1.01-1.54l.1-.09c.14.14.3.26.42.42.21.26.5.3.79.3.05,0,.15-.18.13-.22-.17-.31-.33-.65-.57-.88-.29-.28-.67-.47-1.01-.69-.74-.46-1.26-.4-1.85.2-.17.18-.22.66-.08.93.12.24.29.37.57.19.04-.02.11,0,.17.02.74.25,1.5.44,1.94,1.18.06.11.2.17.31.26ZM42.17,34.35c-.07-.14-.11-.3-.21-.41-.22-.23-.48-.4-.69-.63-.49-.53-1.1-.72-1.8-.68-.08,0-.16.08-.23.13.07.05.14.11.22.14.96.36,1.85.84,2.72,1.45ZM26.85,34.47c-.25-.02-.5-.09-.74-.06-.39.05-.79.1-1.14.25-.84.34-1.66.24-2.5.06-.2-.05-.42,0-.63-.02-.57-.03-1.14-.03-1.7-.11-.33-.04-.44-.29-.36-.56.09-.3.31-.37.56-.25.61.3.99.05,1.36-.43.32-.41.76-.44,1.21-.16.15.09.31.17.48.24.2.08.37.04.54-.12.2-.19.43-.49.63-.48.4.01.83.15,1.17.35.47.27.88.36,1.37.07.4-.23.65-.03.61.43-.04.5-.38.8-.86.81ZM41.16,34.65c-.14-.2-.25-.51-.42-.55-.57-.11-1.16-.12-1.74-.14-.09,0-.18.15-.28.23.12.03.25.09.37.09.23-.01.45-.07.67-.1.54-.07.95.27,1.4.47,0,0,.01.02.02.02.02.02.04.03.05.05.1.14.19.27.29.41.03-.02.05-.04.08-.06-.12-.12-.25-.23-.37-.35-.01-.02-.03-.04-.04-.06,0,0-.02,0-.03-.01ZM23.37,36.92c-.27-.05-.55-.06-.81-.16-.14-.05-.29-.23-.33-.37-.02-.08.16-.26.28-.33.15-.08.33-.11.5-.11.37,0,.74.06,1.12.07.29,0,.58-.02.87-.04.11-.01.22-.09.34-.1.22,0,.5-.14.63.13.08.17-.33.63-.56.66-.33.04-.66.08-.99.11-.35.03-.7.05-1.05.08v.05ZM15.97,36.1c-.11-.04-.26-.12-.29-.09-.38.34-.74.69-1.1,1.05-.03.03,0,.11,0,.16.05,0,.11,0,.14-.02.38-.3.76-.6,1.13-.91.04-.03.06-.1.11-.19ZM19.67,22.67c-.43-.27-.72-.46-1.02-.65-.35-.23-.74-.37-1.15-.37-.48,0-.97.15-1.45.11-.64-.05-1.08.29-1.57.58-.37.23-.47.53-.38.96.19.86.36,1.71.19,2.62-.28,1.45.06,2.87.45,4.26.26.92.74,1.77,1.06,2.68.35,1.01.95,1.9,1.4,2.86.12.27,2.35,3.28,2.68,3.77.39.58.94.91,1.63.93,1.07.03,2.13.02,3.2-.18.92-.17,1.73-.49,2.54-.9.44-.22.69-.59.96-.95.11-.14.2-.29.31-.43.76-.93,1.56-1.83,2.28-2.78.6-.79,1.02-1.68,1.23-2.67.34-1.6.65-3.21,1.07-4.78.22-.85.58-1.67.99-2.45.33-.64.68-1.27.71-1.99.03-.69-.02-1.4-.14-2.08-.08-.47-.31-.92-.5-1.36-.11-.27-.23-.56-.43-.76-.52-.54-.9-1.14-1.1-1.86-.14-.49-.23-1-.37-1.49-.12-.42-.26-.83-.44-1.22-.09-.21-.25-.42-.44-.55-.5-.35-1.02-.69-1.56-.97-.85-.45-1.72-.87-2.6-1.28-.26-.12-.55-.25-.83-.26-.47-.02-.95.04-1.42.09-1.3.15-2.6.28-3.89.47-.92.13-1.83.32-2.54,1.01-.24.23-.53.42-.78.64-.42.36-.81.75-1.23,1.11-.36.31-.74.58-1.11.88-.09.07-.19.17-.22.28-.13.39-.27.78-.35,1.18-.27,1.41-.51,2.83-.75,4.24-.03.15.05.23.2.15.26-.14.58-.24.76-.46.53-.64,1.35-.5,2-.79.21-.09.46-.07.69-.11.37-.05.68.01.98.27.38.32.83.57,1.21.89.49.41.66,1.01.84,1.6.18.6.19.59-.35.94-.19.12-.41.18-.28.54.11.31-.21.55-.46.68-.38.19-.79.33-1.2.46-.39.12-.8.21-1.2.31-.37.09-.47.01-.57-.37-.04-.15-.09-.3-.13-.46-.04-.16-.14-.19-.26-.1-.11.08-.28.18-.28.28-.01.17.08.35.15.58-.23-.04-.45-.04-.65-.11-.15-.06-.37-.29-.36-.32.21-.36-.06-.53-.25-.75-.06-.07-.05-.23-.02-.32.1-.28.16-.61.36-.79.15-.14.48-.07.73-.1.1-.01.21-.02.45-.05-.3.34-.51.57-.71.8-.03.04-.04.1-.06.16.07,0,.16.04.21,0,.75-.56,1.64-.71,2.53-.85.14-.02.28-.03.41-.06.06-.01.16-.1.15-.11-.24-.54.22-.46.64-.56ZM12.41,44.17s-.06-.06-.09-.08c-.25.25-.5.5-.74.76-.06.07-.09.17-.11.27,0,.04.03.1.06.14,0,0,.08-.02.1-.04.26-.35.52-.7.78-1.04ZM12.15,45.01c-.65.3-.6.89-.87,1.28-.02.03.02.11.03.16.06-.02.17-.02.19-.06.21-.42.4-.84.66-1.38ZM13.2,46.87c.13-.1.22-.15.28-.22.11-.14.2-.29.31-.43.4-.51.81-1.01,1.21-1.53.05-.07.01-.21.01-.32-.09.02-.2.02-.26.07-.4.37-.82.73-1.17,1.16-.22.27-.32.63-.46.96-.03.07.04.19.07.32ZM10.42,29.96c-.59,0-1.1,0-1.61,0-1.21,0-2.43,0-3.64,0-.59,0-1.18-.02-1.76-.01-.37,0-.4.06-.37.43.03.3.07.59.08.89,0,.26.13.34.37.34,1.55.02,3.1.06,4.64.07.79,0,1.59-.05,2.38-.07.12,0,.24,0,.36.01.3.05.22.33.32.51-.11.04-.22.1-.34.13-.12.02-.24,0-.36,0-2.23,0-4.45,0-6.68,0-.16,0-.32-.01-.48.01-.07.01-.19.11-.19.16.02.37.04.74.1,1.11.03.22.2.31.44.3.4-.02.79-.01,1.19-.01,2.26,0,4.53.03,6.79,0,.39,0,.59.15.76.44.12.19.02.24-.15.24-.4,0-.79,0-1.19,0-1.86,0-3.72,0-5.59,0-.64,0-1.27,0-1.91.02-.12,0-.32-.06-.28.18.06.41.05.84.33,1.18.07.08.18.16.27.16.97,0,1.93-.03,2.9-.04.55,0,1.11,0,1.66,0,1.13,0,2.26,0,3.39,0,.37,0,.39.1.23.43-.1.2-.25.22-.44.22-.47,0-.94,0-1.41,0-1.86,0-3.73,0-5.59,0-.18,0-.36.01-.53.04-.07,0-.18.08-.18.12.03.4-.16.84.12,1.2.08.1.26.19.39.19,1.52,0,3.04,0,4.57,0,.63,0,1.26,0,1.89.02.06,0,.15.05.17.1.06.19-.2.55-.4.55-1.98-.02-3.96-.04-5.94-.06-.22,0-.35.08-.3.32.07.37.17.73.24,1.09.05.25.18.31.42.3,1.03-.01,2.06,0,3.1,0,.76,0,1.51.02,2.27,0,.32,0,.48.11.56.4.05.17.03.26-.17.26-1.05.02-2.1.07-3.15.08-.57,0-1.14-.1-1.7-.05-.28.02-.72-.24-.83.15-.08.27.11.64.24.95.14.34.33.63.81.62,1.19-.04,2.38-.03,3.57-.03.59,0,1.19.01,1.86.02-.65.64-.69.66-1.44.66-1.13,0-2.26,0-3.4,0-.22,0-.44,0-.66.02-.05,0-.14.1-.14.13.1.36.19.72.33,1.07.11.28.31.4.65.39.85-.04,1.71-.03,2.56-.02.11,0,.3.09.32.17.04.2-.02.41-.26.47-.11.03-.24.02-.36.02-.66,0-1.31,0-1.97,0-.29,0-.34.07-.2.31.2.34.41.67.64.98.37.51.63.57,1.19.29.19-.1.39-.2.58-.31.7-.41,1.33-.87,1.39-1.78,0-.09.09-.17.14-.25.19-.36.6-.53.8-.83.38-.57.84-1.01,1.42-1.36.16-.1.3-.25.55-.46-.6.01-.85-.33-1.1-.65-.25-.32-.51-.65-.66-1.02-.19-.45-.14-.92-.04-1.43.22-1.15.74-2.12,1.48-2.99.39-.47.81-.92,1.29-1.47-.31.1-.51.17-.71.24-.02-.23-.06-.45-.05-.68,0-.09.12-.18.19-.26.09-.1.21-.17.29-.28.05-.07.04-.17.06-.26-.09-.02-.2-.07-.28-.04-.11.03-.2.12-.29.19-.29.25-.58.52-.97.86.04-.44.16-.78.09-1.06-.14-.56.17-.84.51-1.14.09-.08.23-.13.27-.23.06-.15.05-.33.07-.49-.14.05-.28.09-.4.15-.05.03-.06.14-.1.19-.27.36-.8.48-1,.18-.21-.31-.37-.68-.48-1.05-.25-.79-.45-1.59-.4-2.44,0-.02-.01-.04-.02-.06-.12-.85-.16-1.69.13-2.51.17-.5.34-1.01.5-1.51.02-.07-.05-.18-.07-.27-.07.04-.16.08-.22.14-.08.09-.11.21-.19.3-.04.05-.13.06-.2.08-.02-.05-.05-.11-.04-.17,0-.12.01-.24.05-.35.32-1.08.75-2.11,1.38-3.06.2-.3.46-.55.66-.84.07-.09.05-.24.08-.36-.13.05-.31.05-.39.14-.27.29-.51.6-.76.91-.17.22-.37.42-.5.66-.34.61-.63,1.24-.97,1.85-.12.22-.4.37-.47.59-.13.47-.25.97-.22,1.44.07.98.25,1.96.37,2.94.02.15-.05.31-.07.47-.12-.14-.26-.27-.37-.41-.05-.07-.04-.19-.08-.28-.41-1.01-.22-2.07-.25-3.1-.02-.55.24-1.11.34-1.68.06-.34.13-.71.09-1.05-.09-.68-.24-1.35.23-1.98.14-.19.15-.49.16-.74,0-.09-.12-.23-.22-.28-.41-.2-.79-.41-1.09-.78-.48-.59-.48-1.31-.62-1.99-.07-.32-.07-.66-.08-1,0-.32.31-.75.52-.74.5,0,.5,0,.53-.46.04-.64.07-1.28.11-2.02.13.14.18.17.21.22.21.44.4.9.62,1.33.2.41.58.59,1.01.64.09,0,.19-.1.28-.16-.05-.07-.09-.17-.16-.21-.31-.18-.44-.45-.48-.89.21.19.32.32.47.41.18.11.38.19.58.27.06.02.17-.02.21-.07.03-.04,0-.15-.04-.21-.05-.08-.13-.16-.22-.2-.38-.18-.53-.53-.62-.9-.15-.61-.25-1.24-.42-1.84-.14-.48.02-.85.3-1.19.18-.21.43-.37.63-.54-.04.12-.11.28-.15.45-.03.13-.02.27,0,.4.01.19.04.38.06.57.02.11.02.23.07.34.15.32.34.62.48.94.11.26.31.35.55.39.08.01.18-.05.26-.08-.04-.08-.05-.21-.12-.25-.31-.17-.33-.38-.19-.68.06-.12,0-.29,0-.52.16.2.28.33.38.47.21.32.51.5.88.53.14.01.36,0,.41-.09.1-.17.18-.41-.03-.58-.43-.34-.7-.79-.92-1.29-.02-.05-.06-.1-.1-.15-.02-.02-.08-.05-.1-.04-.04.03-.11.09-.11.12.06.2.12.41.2.61.07.16.18.3.26.46.03.07,0,.16,0,.25-.07-.02-.17-.02-.22-.07-.49-.54-.91-1.12-.74-1.91.09-.4.2-.8.32-1.2.04-.13.15-.27.27-.34.82-.46,1.66-.9,2.49-1.35.14-.07.23-.06.24.11.01.18,0,.36.02.54.01.1.09.19.14.29.06-.09.17-.17.17-.25-.04-.74.15-1.42.51-2.08-.81-.04-1.4.41-2.04.68-.64.27-1.31.52-1.8,1.09-.2.23-.51.35-.78.52-.18.11-.4.19-.55.33-.36.34-.68.71-1.02,1.06-.28.28-.53.6-.85.82-.71.48-1.17,1.17-1.63,1.86-.32.47-.62.96-.93,1.44-.15.23-.31.45-.46.67.24.04.49.06.73.11.11.02.22.07.33.11-.11.17,0,.47-.31.51-.14.02-.29.05-.41,0-.59-.19-.87.11-1.06.6-.08.2-.2.39-.3.58-.15.27-.02.35.24.35.4,0,.79,0,1.19,0,.21,0,.27.11.23.31-.03.21-.13.32-.35.33-.22,0-.44.02-.65.02q-1.18,0-1.54,1.12c-.15.46-.15.47.31.48.61.01,1.22,0,1.83,0,.42,0,.51.09.52.4,0,.38-.29.25-.47.25-.7.01-1.39,0-2.09.01-.16,0-.39.04-.47.15-.18.23-.33.5-.42.77-.22.67-.2.68.51.68,1.39,0,2.78-.01,4.17,0,.41,0,.41.05.32.45-.06.27-.24.21-.41.21-1.41,0-2.82,0-4.23,0-.2,0-.46-.06-.58.04-.13.11-.14.37-.22.56-.05.13-.15.23-.21.36-.21.47-.1.65.42.65,1.25,0,2.5,0,3.75,0,.3,0,.59-.02.89-.01.17,0,.3.05.32.27.04.33,0,.4-.37.4-1.49,0-2.98,0-4.47,0-.85,0-.85,0-.94.85-.06.55,0,.63.54.63,1.57,0,3.14,0,4.71.02.41,0,.56.17.39.48-.06.11-.29.17-.44.17-1.53.01-3.06,0-4.59,0q-.84,0-.87.84c0,.08,0,.16,0,.24-.02.89.1.82.67.66.06-.02.12,0,.18,0,.99.02,1.97.05,2.96.07.53,0,1.06.02,1.59,0,.33-.01.35.17.33.41-.01.31-.25.26-.43.26-1.57,0-3.14,0-4.71,0-.16,0-.32-.02-.47.02-.09.02-.21.13-.23.22-.06.35-.08.71-.11,1.06-.02.18.05.31.26.31.14,0,.28,0,.42,0,1.75,0,3.5,0,5.25,0,.19,0,.39.05.56.13.28.13.53.3.92.52ZM13.85,44.49c-.01-.17-.19-.19-.39-.07-.66.38-1.09.98-1.48,1.61-.05.08-.27.46.2.3.01,0,.09.1.08.12-.05.12-.13.24-.19.36-.28.55-.57,1.1-.84,1.66-.05.1.03.26.05.39.11-.06.26-.1.32-.2.25-.4.48-.82.69-1.24.46-.95.75-1.99,1.49-2.79.04-.04.05-.1.06-.13ZM46.73,34.03c-.37.17-.77.33-1.16.52-.1.05-.2.17-.22.28-.12.61-.19,1.25-.65,1.74-.07.07-.06.22-.09.33-.03.13-.04.28-.11.39-.31.56-.61,1.13-.97,1.67-.23.35-.36.82-.83.97-.71.23-1.43.43-2.2.33-.54-.07-1.1-.07-1.65-.12-.17-.02-.35-.07-.51-.14-.43-.17-.45-.18-.54.24-.14.7-.53,1.29-.87,1.89-.31.53-.74.99-1.13,1.47-.21.26-.16.49.15.6.11.04.24,0,.35.04.51.13,1.04.23,1.52.42.82.33,1.38.92,1.71,1.76.34.86.63,1.71.55,2.65-.02.2-.02.4-.02.59,0,.07.04.14.07.21.07-.03.16-.03.2-.08.38-.44.75-.89,1.12-1.34.02-.03-.04-.17-.09-.2-.08-.04-.25.01-.28-.04-.09-.13-.16-.29-.18-.44-.03-.18.06-.31.27-.29.29.03.65.18.84.06.23-.15.31-.52.46-.8.03-.05.08-.09.11-.14.1-.21.2-.42.3-.64-.23-.03-.45-.08-.68-.08-.46-.01-.91,0-1.37,0-.22,0-.7-.47-.6-.57.11-.11.34-.12.52-.12.74-.01,1.47,0,2.21,0,.35,0,.6-.1.7-.48.07-.24.22-.46.33-.7.18-.37.18-.39-.23-.39-1.63,0-3.26,0-4.89,0-.41,0-.83,0-1.24,0-.17,0-.21-.09-.13-.23.15-.26.3-.47.68-.47,1.81.02,3.61,0,5.42.02.93,0,.99-.02,1.26-.95.04-.13.08-.26.14-.39.08-.18.02-.26-.17-.27-.39-.02-.79-.05-1.18-.08-.16-.01-.32-.03-.48-.05.11-.16.2-.35.34-.47.11-.09.29-.13.44-.14.26-.02.52.02.77,0,.25-.01.53,0,.73-.12.23-.14.25-.43.17-.7,0-.02,0-.04.02-.06.15-.18.18-.39.11-.6-.09-.28-.36-.11-.53-.19-.06-.03-.13-.14-.13-.14.17-.18.33-.39.54-.5.16-.08.4.02.49-.24.07-.2.21-.38.25-.59.04-.2.06-.48-.04-.61-.11-.13-.3-.16-.15-.38.09-.14.15-.38.27-.42.21-.06.25-.2.25-.34.02-.56,0-1.12,0-1.66ZM16.29,50.63c.31-.11.62-.21.93-.32.06-.02.1-.1.16-.14-.08-.04-.19-.12-.23-.1-.29.18-.57.37-.85.56-.02,0-.04.01-.06.02h-.01s.02.01.03.01c.02-.01.03-.02.05-.03ZM16.22,50.66c-.63-.06-.78.02-.98.62.38-.24.68-.43.98-.62ZM13.18,51.88c.13-.24.26-.46.38-.67.12-.21.23-.41.34-.61-.49.27-.9.57-.72,1.27ZM20.48,52.6c-.1-.19-.16-.31-.22-.43-.08.15-.18.29-.23.44-.01.04.13.19.19.18.09-.02.17-.12.27-.2ZM20.93,51.18c-.23-.03-.31-.07-.38-.05-.49.19-.98.38-1.45.61-.28.13-.55.31-.8.49-.12.09-.22.21-.29.34-.03.07.02.18.04.28.08-.05.17-.08.23-.15.45-.52.93-.95,1.64-1.08.31-.06.59-.25,1.01-.44ZM14.32,52.78s-.05.02-.07.02c.1.27.19.54.3.8.02.05.12.07.19.11.03-.06.07-.12.08-.18.04-.28.08-.57.12-.85.02-.17-.19-.42-.39-.4-.08,0-.17.16-.22.27-.03.06,0,.15,0,.23ZM22.23,52.89s-.02-.06-.03-.09c-.37.11-.74.21-1.11.34-.14.05-.27.22-.4.23-.56,0-.77.49-1.12.78-.04.03-.04.1-.06.16.07.02.14.07.2.06.37-.09.78-.04,1.01-.48.08-.15.3-.24.47-.33.46-.26.95-.44,1.49-.41.06,0,.12-.07.18-.11-.06-.04-.11-.11-.17-.12-.16-.02-.31-.02-.47-.03ZM19.06,51.08s-.02-.06-.02-.09c-.48.05-.97.07-1.44.15-.2.04-.41.18-.55.33-.62.65-1.11,1.38-1.26,2.29-.08.47,0,.58.46.61.14.01.28.02.42.01.16,0,.21-.06.21-.26,0-1.1.46-1.96,1.42-2.54.27-.16.52-.34.78-.51ZM35.21,32.35c-.15.61-.3,1.22-.46,1.83-.24.88-4.95,15.9-5.14,16.61-.06.23-.09.47-.15.69-.11.42-.3.5-.67.27-.21-.13-.4-.32-.56-.51-.78-.91-8.47-10.24-9.01-10.97-.15.28-.14.55-.08.83.18.79.21,1.58-.16,2.32-.22.43-.53.82-.83,1.21-.52.68-1.21,1.16-1.94,1.59-.13.08-.22.21-.37.34.75.19,1.48.28,2.13.56.78.32,1.54.75,1.74,1.71.02.08.14.18.23.19.42.09.86.14,1.28.23.55.12.95.5,1.32.88.42.44.86.88,1.11,1.45.26.56.58,1.1.57,1.75,0,.2.07.39.07.59,0,.25-.02.5-.04.76-.02.23-.07.46-.05.69.03.27-.04.46-.24.63-.42.36-.82.75-1.26,1.07-.18.13-.49.17-.72.13-.85-.16-1.7-.33-2.52-.58-.99-.3-1.98-.66-2.94-1.06-.96-.4-1.9-.87-2.83-1.34-.46-.23-.89-.51-1.32-.79-1.13-.75-2.15-1.63-3.01-2.67-1.15-1.4-2.35-2.77-3.22-4.38-.43-.8-.8-1.63-1.17-2.47-.3-.7-.63-1.39-.81-2.13-.22-.9-.59-1.75-.79-2.64-.45-1.94-.86-3.89-1.05-5.88-.05-.47-.03-.95-.05-1.43-.02-.67-.06-1.34-.07-2.01,0-.37.02-.75.04-1.12.13-2.59.31-5.17,1.02-7.68.29-1.04.58-2.08.92-3.1.26-.76.59-1.5.91-2.24.21-.51.45-1,.69-1.5.33-.68.73-1.33,1.15-1.96.23-.34.43-.7.63-1.06.48-.89,1.21-1.57,1.92-2.26.41-.4.79-.82,1.22-1.2.66-.58,1.32-1.18,2.03-1.7.61-.45,1.28-.85,1.95-1.2,1.24-.65,2.49-1.26,3.86-1.59.75-.18,1.48-.44,2.22-.64.28-.08.58-.1.88-.13,1.12-.11,2.23-.28,3.35-.31,1.04-.03,2.08.06,3.12.16.6.06,1.19.26,1.78.4.02,0,.04.01.06.02.76.2,1.52.38,2.27.61.55.17,1.08.39,1.6.63.93.43,1.86.86,2.76,1.35.74.4,1.49.82,2.15,1.33.65.49,1.21,1.1,1.79,1.68.56.55,1.09,1.13,1.46,1.84.09.17.28.28.4.44.84,1,1.6,2.04,2.1,3.26.31.77.75,1.48,1.06,2.25.27.67.44,1.38.65,2.06.21.65.45,1.3.63,1.96.22.83.4,1.68.58,2.52.14.66.23,1.33.35,1.99.27,1.41.32,2.82.28,4.25-.03,1.26.01,2.52-.05,3.78-.05,1-.18,2-.34,3-.15.94-.36,1.87-.59,2.79-.28,1.08-.57,2.16-.94,3.22-.33.95-.76,1.86-1.17,2.78-.32.73-.67,1.45-1.03,2.16-.1.2-.3.35-.42.55-.3.5-.54,1.04-.88,1.51-.48.66-1,1.28-1.61,1.83-.48.43-.94.89-1.39,1.36-.64.68-1.39,1.22-2.14,1.77-.89.64-1.9,1.05-2.81,1.63-.31.2-.67.33-1.02.47-.16.07-.27.06-.33-.17-.29-1.12-.59-2.23-.92-3.34-.18-.6-.45-1.18-.68-1.77-.02-.05-.05-.12-.09-.15-.1-.07-.2-.13-.31-.2-.01.11-.05.21-.04.32.01.12.04.24.1.34.32.54.16,1.06-.06,1.57-.21.49-.42.98-.63,1.47-.03.07-.07.15-.12.21-.22.29-.57.27-.67-.08-.1-.37-.14-.78-.15-1.17-.03-1.37,5.34-17.34,5.43-17.99.11-.78.53-1.56.06-2.39ZM26.34,58.54c1.55.05,2.82-.3,4.08-.64.54-.15,1.03-.48,1.63-.43.07,0,.16-.03.23-.06,1.04-.42,2.06-.9,3.12-1.26,1.09-.37,1.94-1.1,2.89-1.69.57-.35,1.08-.79,1.62-1.2.17-.13.35-.26.49-.43.52-.66,1.25-1.17,1.59-1.97.96-.61,1.4-1.68,2.14-2.49.74-.81,1.09-1.86,1.6-2.81.51-.96.74-2.03,1.3-2.97.06-.1.07-.22.11-.34.25-.7.44-1.43.7-2.13.38-1.08.64-2.2.88-3.33.17-.83.27-1.69.25-2.55-.01-.5.18-1,.21-1.51.04-.77-.05-1.56.06-2.32.15-1.05.04-2.09-.03-3.13-.06-.81-.16-1.62-.22-2.42-.11-1.34-.23-2.68-.63-3.97-.38-1.22-.69-2.45-1.17-3.64-.32-.79-.55-1.61-.91-2.38-.43-.93-.91-1.85-1.44-2.73-.65-1.1-1.56-2.02-2.25-3.1-.15-.23-.34-.43-.52-.64-.19-.22-.38-.44-.58-.66-.09-.1-.21-.17-.3-.27-.47-.47-.9-1.01-1.43-1.41-.86-.66-1.76-1.3-2.7-1.83-.92-.51-1.78-1.12-2.82-1.41-.59-.16-1.14-.51-1.71-.74-1.32-.53-2.72-.74-4.11-.91-1.54-.19-3.1-.45-4.66-.2-.21.03-.43-.02-.65-.02-.11,0-.24-.03-.34,0-1.14.3-2.35.34-3.44.87-.59.28-1.25.21-1.86.53-.85.44-1.78.75-2.69,1.06-1.03.34-1.83,1.06-2.73,1.6-.64.38-1.22.87-1.83,1.31-.05.04-.1.07-.13.12-.53.73-1.3,1.27-1.71,2.1-.03.07-.09.13-.15.18-.48.36-.89.79-1.19,1.31-.15.27-.3.57-.53.77-.56.52-.93,1.17-1.3,1.82-.15.27-.21.59-.34.88-.23.49-.51.97-.74,1.47-.23.5-.41,1.02-.61,1.53-.11.27-.27.53-.36.81-.18.54-.26,1.12-.49,1.65-.53,1.21-.78,2.49-1.07,3.76-.19.85-.27,1.73-.26,2.61,0,.48-.17.97-.19,1.45-.04.77.05,1.56-.06,2.32-.15,1.03-.03,2.05.03,3.07.05.85.17,1.69.23,2.54.11,1.36.24,2.73.65,4.03.37,1.16.64,2.34,1.13,3.47.33.78.58,1.59.89,2.38.09.24.25.45.34.69.57,1.44,1.51,2.64,2.42,3.86.13.17.32.29.44.46.43.61.85,1.23,1.28,1.84.07.1.17.17.26.25.17.16.33.33.5.48.52.48,1.03.99,1.58,1.43.51.41,1.06.76,1.61,1.12.51.34,1.03.67,1.56.98.45.27.93.5,1.39.75.14.07.29.13.44.18.38.13.78.22,1.15.38,1.1.48,2.21.93,3.43,1.04.52.05,1.03.21,1.55.29.51.08,1.02.12,1.53.17.59.06,1.18.13,1.78.14.45,0,.91-.08,1.13-.1ZM27.24,59.47c-1.39,0-2.33.01-3.28,0-.89-.01-1.76-.17-2.62-.35-.86-.18-1.74-.31-2.6-.49-.44-.09-.88-.22-1.31-.37-.7-.24-1.4-.47-2.07-.78-.67-.31-1.36-.59-1.95-1.06-.13-.1-.33-.14-.49-.2-.36-.13-.7-.29-.91-.64-.03-.05-.07-.12-.12-.13-.48-.07-.69-.57-1.08-.71-.46-.17-.77-.48-1.1-.78-.48-.44-.94-.9-1.39-1.39-.53-.58-1.03-1.18-1.54-1.78-1.04-1.24-1.9-2.6-2.7-4-.43-.75-.92-1.47-1.13-2.33-.07-.28-.26-.53-.42-.77-.36-.56-.35-1.24-.6-1.83-.08-.2-.16-.4-.22-.61-.1-.32-.2-.63-.29-.95-.02-.08,0-.17-.04-.23-.36-.54-.3-1.21-.51-1.8-.21-.61-.22-1.3-.32-1.95-.08-.5-.16-.99-.23-1.49-.01-.1-.04-.2-.02-.29.09-.65-.04-1.29-.15-1.91-.24-1.39-.06-2.78-.15-4.17-.03-.43.09-.86.13-1.29.11-1.05.22-2.11.33-3.16.15-1.43.48-2.83.85-4.22.17-.63.3-1.3.54-1.88.35-.86.61-1.74.93-2.6.11-.29.34-.53.47-.81.49-1.08.94-2.17,1.6-3.16.51-.77,1.11-1.48,1.67-2.22.43-.56.83-1.14,1.28-1.68.36-.43.77-.81,1.18-1.19.42-.39.85-.78,1.31-1.14.72-.56,1.43-1.13,2.2-1.63.51-.33,1.09-.52,1.65-.77.92-.42,1.83-.88,2.77-1.23.75-.28,1.54-.43,2.32-.64.25-.07.5-.12.74-.21,1.1-.42,2.24-.55,3.4-.56.64,0,1.29-.07,1.93-.06.85.01,1.7.03,2.54.12.56.06,1.1.33,1.66.38.89.09,1.75.32,2.6.54.74.19,1.46.46,2.17.74.72.28,1.47.55,2.12.97.46.29.94.49,1.4.74.14.07.25.19.36.31.17.19,1.96,1.44,2.59,1.99.43.38.81.82,1.24,1.19.62.53,1.06,1.21,1.57,1.83.76.93,1.38,1.95,2.02,2.96.68,1.06,1.35,2.11,1.74,3.32.08.26.26.49.4.72.35.56.36,1.23.6,1.83.1.24.18.48.26.72.08.24.16.48.24.72.08.26.16.52.25.78.02.06.08.1.08.16.04.99.55,1.89.6,2.87.03.64.22,1.26.22,1.89,0,.6.03,1.2.11,1.8.04.31.11.62.14.93.04.36.06.73.06,1.1,0,.81.01,1.62-.01,2.44-.01.47-.1.94-.14,1.41-.07.86-.11,1.73-.21,2.58-.07.62-.22,1.24-.35,1.85-.19.92-.38,1.85-.6,2.77-.09.39-.31.76-.38,1.15-.2,1.09-.74,2.05-1.04,3.11-.11.39-.38.72-.54,1.1-.48,1.08-.95,2.17-1.59,3.16-.51.77-1.11,1.48-1.67,2.22-.43.56-.85,1.12-1.28,1.68-.4.51-.84.96-1.39,1.31-.05.03-.13.04-.15.09-.43.71-1.18,1.07-1.78,1.58-.59.5-1.19.92-1.93,1.17-.44.15-.83.44-1.24.66-.17.09-.33.2-.51.26-.71.22-1.38.53-2.04.86-.26.13-.57.15-.85.23-.96.29-1.9.64-2.87.86-.94.21-1.91.3-2.43.37Z\"/>\n  </g>\n</svg>",
};
