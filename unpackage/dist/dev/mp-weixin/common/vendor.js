(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!*********************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var objectKeys = ['qy', 'env', 'error', 'version', 'lanDebug', 'cloud', 'serviceMarket', 'router', 'worklet'];
var singlePageDisableKey = ['lanDebug', 'router', 'worklet'];
var target = typeof globalThis !== 'undefined' ? globalThis : function () {
  return this;
}();
var key = ['w', 'x'].join('');
var oldWx = target[key];
var launchOption = oldWx.getLaunchOptionsSync ? oldWx.getLaunchOptionsSync() : null;
function isWxKey(key) {
  if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key)) {
    return false;
  }
  return objectKeys.indexOf(key) > -1 || typeof oldWx[key] === 'function';
}
function initWx() {
  var newWx = {};
  for (var _key in oldWx) {
    if (isWxKey(_key)) {
      // TODO wrapper function
      newWx[_key] = oldWx[_key];
    }
  }
  return newWx;
}
target[key] = initWx();
var _default = target[key];
exports.default = _default;

/***/ }),
/* 2 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApp = createApp;
exports.createComponent = createComponent;
exports.createPage = createPage;
exports.createPlugin = createPlugin;
exports.createSubpackageApp = createSubpackageApp;
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _construct2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/construct */ 15));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 22);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var realAtob;
var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;
    var result = '';
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}
function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {
    var _getCurrentUserInfo = getCurrentUserInfo(),
      role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {
    var _getCurrentUserInfo2 = getCurrentUserInfo(),
      permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {
    var _getCurrentUserInfo3 = getCurrentUserInfo(),
      tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}
var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function isFn(fn) {
  return typeof fn === 'function';
}
function isStr(str) {
  return typeof str === 'string';
}
function isObject(obj) {
  return obj !== null && (0, _typeof2.default)(obj) === 'object';
}
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
function noop() {}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
function sortObject(obj) {
  var sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach(function (key) {
      sortObj[key] = obj[key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
var HOOKS = ['invoke', 'success', 'fail', 'complete', 'returnValue'];
var globalInterceptors = {};
var scopedInterceptors = {};
function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}
function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}
function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}
function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}
function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}
function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}
function isPromise(obj) {
  return !!obj && ((0, _typeof2.default)(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {}
        };
      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    }
  };
}
function wrapperOptions(interceptor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options) {
  for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    params[_key - 3] = arguments[_key];
  }
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}
var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  }
};
var SYNC_API_RE = /^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting|initUTS|requireUTS|registerUTS/;
var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection', 'createPushMessage'];
var CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}
function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).catch(function (err) {
    return [err];
  });
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(function (value) {
      return promise.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return promise.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };
}
function promisify(name, api) {
  if (!shouldPromise(name) || !isFn(api)) {
    return api;
  }
  return function promiseApi() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      params[_key2 - 1] = arguments[_key2];
    }
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject
      })].concat(params));
    })));
  };
}
var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;
function checkDeviceWidth() {
  var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
    platform = _wx$getSystemInfoSync.platform,
    pixelRatio = _wx$getSystemInfoSync.pixelRatio,
    windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}
function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}
var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';
var messages = {};
var locale;
{
  locale = normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}
function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}
initI18nMessages();
var i18n = (0, _uniI18n.initVueI18n)(locale, {});
var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {
    var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    }
  }
};
var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;
function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale()
  });
  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {
        return watch(v);
      });
    }
  });
}
function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // 优先使用 $locale
  if (isFn(getApp)) {
    var app = getApp({
      allowDefault: true
    });
    if (app && app.$vm) {
      return app.$vm.$locale;
    }
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}
function setLocale$1(locale) {
  var app = isFn(getApp) ? getApp() : false;
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {
      return fn({
        locale: locale
      });
    });
    return true;
  }
  return false;
}
var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}
if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}
var interceptors = {
  promiseInterceptor: promiseInterceptor
};
var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors
});
function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}
var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  }
};
var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(function (item, index) {
        return index < currentIndex ? item !== urls[currentIndex] : true;
      });
    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function useDeviceId(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId
    });
  }
  result.deviceId = deviceId;
}
function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom
    };
  }
}
function populateParameters(result) {
  var _result$brand = result.brand,
    brand = _result$brand === void 0 ? '' : _result$brand,
    _result$model = result.model,
    model = _result$model === void 0 ? '' : _result$model,
    _result$system = result.system,
    system = _result$system === void 0 ? '' : _result$system,
    _result$language = result.language,
    language = _result$language === void 0 ? '' : _result$language,
    theme = result.theme,
    version = result.version,
    platform = result.platform,
    fontSizeSetting = result.fontSizeSetting,
    SDKVersion = result.SDKVersion,
    pixelRatio = result.pixelRatio,
    deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-weixin".indexOf('quickapp-webview') !== -1

  var extraParam = {};

  // osName osVersion
  var osName = '';
  var osVersion = '';
  {
    osName = system.split(' ')[0] || '';
    osVersion = system.split(' ')[1] || '';
  }
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;

  // hostLanguage
  var hostLanguage = language.replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "__UNI__6ED99F6",
    appName: "NeteaseMusic-uni",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.7.3",
    uniRuntimeVersion: "3.7.3",
    uniPlatform: undefined || "mp-weixin",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined
  };
  Object.assign(result, parameters, extraParam);
}
function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc'
    };
    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale$1 ? getLocale$1() : defaultLanguage;
}
function getHostName(result) {
  var _platform = 'WeChat';
  var _hostName = result.hostName || _platform; // mp-jd
  {
    if (result.environment) {
      _hostName = result.environment;
    } else if (result.host && result.host.env) {
      _hostName = result.host.env;
    }
  }
  return _hostName;
}
var getSystemInfo = {
  returnValue: function returnValue(result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  }
};
var showActionSheet = {
  args: function args(fromArgs) {
    if ((0, _typeof2.default)(fromArgs) === 'object') {
      fromArgs.alertText = fromArgs.title;
    }
  }
};
var getAppBaseInfo = {
  returnValue: function returnValue(result) {
    var _result = result,
      version = _result.version,
      language = _result.language,
      SDKVersion = _result.SDKVersion,
      theme = _result.theme;
    var _hostName = getHostName(result);
    var hostLanguage = language.replace('_', '-');
    result = sortObject(Object.assign(result, {
      appId: "__UNI__6ED99F6",
      appName: "NeteaseMusic-uni",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage),
      hostVersion: version,
      hostLanguage: hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme
    }));
  }
};
var getDeviceInfo = {
  returnValue: function returnValue(result) {
    var _result2 = result,
      brand = _result2.brand,
      model = _result2.model;
    var deviceType = getGetDeviceType(result, model);
    var deviceBrand = getDeviceBrand(brand);
    useDeviceId(result);
    result = sortObject(Object.assign(result, {
      deviceType: deviceType,
      deviceBrand: deviceBrand,
      deviceModel: model
    }));
  }
};
var getWindowInfo = {
  returnValue: function returnValue(result) {
    addSafeAreaInsets(result);
    result = sortObject(Object.assign(result, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
var getAppAuthorizeSetting = {
  returnValue: function returnValue(result) {
    var locationReducedAccuracy = result.locationReducedAccuracy;
    result.locationAccuracy = 'unsupported';
    if (locationReducedAccuracy === true) {
      result.locationAccuracy = 'reduced';
    } else if (locationReducedAccuracy === false) {
      result.locationAccuracy = 'full';
    }
  }
};

// import navigateTo from 'uni-helpers/navigate-to'

var compressImage = {
  args: function args(fromArgs) {
    // https://developers.weixin.qq.com/community/develop/doc/000c08940c865011298e0a43256800?highLine=compressHeight
    if (fromArgs.compressedHeight && !fromArgs.compressHeight) {
      fromArgs.compressHeight = fromArgs.compressedHeight;
    }
    if (fromArgs.compressedWidth && !fromArgs.compressWidth) {
      fromArgs.compressWidth = fromArgs.compressedWidth;
    }
  }
};
var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet: showActionSheet,
  getAppBaseInfo: getAppBaseInfo,
  getDeviceInfo: getDeviceInfo,
  getWindowInfo: getWindowInfo,
  getAppAuthorizeSetting: getAppAuthorizeSetting,
  compressImage: compressImage
};
var todos = ['vibrate', 'preloadPage', 'unPreloadPage', 'loadSubPackage'];
var canIUses = [];
var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];
function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}
function processArgs(methodName, fromArgs) {
  var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {
    // 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {
          // 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {
          // 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {
          // {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}
function processReturnValue(methodName, res, returnValue) {
  var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {
    // 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}
function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {
      // 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {
      // 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        // 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}
var todoApis = Object.create(null);
var TODOS = ['onTabBarMidButtonTap', 'subscribePush', 'unsubscribePush', 'onPush', 'offPush', 'share'];
function createTodoApi(name) {
  return function todoApi(_ref) {
    var fail = _ref.fail,
      complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported")
    };
    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}
TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});
var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin']
};
function getProvider(_ref2) {
  var service = _ref2.service,
    success = _ref2.success,
    fail = _ref2.fail,
    complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service]
    };
    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found'
    };
    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}
var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider
});
var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();
function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}
function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}
var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit
});

/**
 * 框架内 try-catch
 */
/**
 * 开发者 try-catch
 */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}
function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}
var cid;
var cidErrMsg;
var enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}
function invokePushCallback(args) {
  if (args.type === 'enabled') {
    enabled = true;
  } else if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    var message = {
      type: 'receive',
      data: normalizePushMessage(args.message)
    };
    for (var i = 0; i < onPushMessageCallbacks.length; i++) {
      var callback = onPushMessageCallbacks[i];
      callback(message);
      // 该消息已被阻止
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message)
      });
    });
  }
}
var getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
function getPushClientId(args) {
  if (!isPlainObject(args)) {
    args = {};
  }
  var _getApiCallbacks = getApiCallbacks(args),
    success = _getApiCallbacks.success,
    fail = _getApiCallbacks.fail,
    complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);
  Promise.resolve().then(function () {
    if (typeof enabled === 'undefined') {
      enabled = false;
      cid = '';
      cidErrMsg = 'uniPush is not enabled';
    }
    getPushCidCallbacks.push(function (cid, errMsg) {
      var res;
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid: cid
        };
        hasSuccess && success(res);
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '')
        };
        hasFail && fail(res);
      }
      hasComplete && complete(res);
    });
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
}
var onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};
var baseInfo = wx.getAppBaseInfo && wx.getAppBaseInfo();
if (!baseInfo) {
  baseInfo = wx.getSystemInfoSync();
}
var host = baseInfo ? baseInfo.host : null;
var shareVideoMessage = host && host.env === 'SAAASDK' ? wx.miniapp.shareVideoMessage : wx.shareVideoMessage;
var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  shareVideoMessage: shareVideoMessage,
  getPushClientId: getPushClientId,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback
});
var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];
function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
function initBehavior(options) {
  return Behavior(options);
}
function isPage() {
  return !!this.route;
}
function initRelation(detail) {
  this.triggerEvent('__l', detail);
}
function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector) || [];
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || toSkip(component);
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}
function syncRefs(refs, newRefs) {
  var oldKeys = (0, _construct2.default)(Set, (0, _toConsumableArray2.default)(Object.keys(refs)));
  var newKeys = Object.keys(newRefs);
  newKeys.forEach(function (key) {
    var oldValue = refs[key];
    var newValue = newRefs[key];
    if (Array.isArray(oldValue) && Array.isArray(newValue) && oldValue.length === newValue.length && newValue.every(function (value) {
      return oldValue.includes(value);
    })) {
      return;
    }
    refs[key] = newValue;
    oldKeys.delete(key);
  });
  oldKeys.forEach(function (key) {
    delete refs[key];
  });
  return refs;
}
function initRefs(vm) {
  var mpInstance = vm.$scope;
  var refs = {};
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for') || [];
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || toSkip(component));
      });
      return syncRefs(refs, $refs);
    }
  });
}
function handleLink(event) {
  var _ref3 = event.detail || event.value,
    vuePid = _ref3.vuePid,
    vueOptions = _ref3.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  vueOptions.parent = parentVm;
}
function markMPComponent(component) {
  // 在 Vue 中标记为小程序组件
  var IS_MP = '__v_isMPComponent';
  Object.defineProperty(component, IS_MP, {
    configurable: true,
    enumerable: false,
    value: true
  });
  return component;
}
function toSkip(obj) {
  var OB = '__ob__';
  var SKIP = '__v_skip';
  if (isObject(obj) && Object.isExtensible(obj)) {
    // 避免被 @vue/composition-api 观测
    Object.defineProperty(obj, OB, {
      configurable: true,
      enumerable: false,
      value: (0, _defineProperty2.default)({}, SKIP, true)
    });
  }
  return obj;
}
var MPPage = Page;
var MPComponent = Component;
var customizeRE = /:/g;
var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});
function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    // 事件名统一转驼峰格式，仅处理：当前组件为 vue 组件、当前组件为 vue 组件子组件
    if (this.$vm || this.dataset && this.dataset.comType) {
      event = customize(event);
    } else {
      // 针对微信/QQ小程序单独补充驼峰格式事件，以兼容历史项目
      var newEvent = customize(event);
      if (newEvent !== event) {
        oldTriggerEvent.apply(this, [newEvent].concat(args));
      }
    }
    return oldTriggerEvent.apply(this, [event].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initHook(name, options, isComponent) {
  var oldHook = options[name];
  options[name] = function () {
    markMPComponent(this);
    initTriggerEvent(this);
    if (oldHook) {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return oldHook.apply(this, args);
    }
  };
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;
  Component = function Component() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}
var PAGE_EVENT_HOOKS = ['onPullDownRefresh', 'onReachBottom', 'onAddToFavorites', 'onShareTimeline', 'onShareAppMessage', 'onPageScroll', 'onResize', 'onTabItemTap'];
function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}
function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }
  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }
  vueOptions = vueOptions.default || vueOptions;
  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super && vueOptions.super.options && Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }
  if (isFn(vueOptions[hook]) || Array.isArray(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {
      return hasHook(hook, mixin);
    });
  }
}
function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}
function initUnknownHooks(mpOptions, vueOptions) {
  var excludes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  findHooks(vueOptions).forEach(function (hook) {
    return initHook$1(mpOptions, hook, excludes);
  });
}
function findHooks(vueOptions) {
  var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (vueOptions) {
    Object.keys(vueOptions).forEach(function (name) {
      if (name.indexOf('on') === 0 && isFn(vueOptions[name])) {
        hooks.push(name);
      }
    });
  }
  return hooks;
}
function initHook$1(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  }
}
function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}
function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}
function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;
  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}
function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};
  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"NeteaseMusic-uni","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }
  if (!isPlainObject(data)) {
    data = {};
  }
  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });
  return data;
}
var PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;
  var vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: ''
          };
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ''
          };
        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(initBehavior({
      properties: initProperties(vueExtends.props, true)
    }));
  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(initBehavior({
          properties: initProperties(vueMixin.props, true)
        }));
      }
    });
  }
  return behaviors;
}
function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function initProperties(props) {
  var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var options = arguments.length > 3 ? arguments[3] : undefined;
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: ''
    };
    {
      if (options.virtualHost) {
        properties.virtualHostStyle = {
          type: null,
          value: ''
        };
        properties.virtualHostClass = {
          type: null,
          value: ''
        };
      }
    }
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: ''
    };
    properties.vueSlots = {
      // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots
        });
      }
    };
  }
  if (Array.isArray(props)) {
    // ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key)
      };
    });
  } else if (isPlainObject(props)) {
    // {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {
        // title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }
        opts.type = parsePropType(key, opts.type);
        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key)
        };
      } else {
        // content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key)
        };
      }
    });
  }
  return properties;
}
function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}
  event.stopPropagation = noop;
  event.preventDefault = noop;
  event.target = event.target || {};
  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }
  if (hasOwn(event, 'markerId')) {
    event.detail = (0, _typeof2.default)(event.detail) === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }
  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }
  return event;
}
function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {
      // ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];
      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }
      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }
      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}
function processEventExtra(vm, extra, event, __args__) {
  var extraObj = {};
  if (Array.isArray(extra) && extra.length) {
    /**
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *'test'
     */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {
          // model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {
            // $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            extraObj['$' + index] = event.detail ? event.detail.__args__ || __args__ : __args__;
          } else if (dataPath.indexOf('$event.') === 0) {
            // $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }
  return extraObj;
}
function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}
function processEventArgs(vm, event) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var isCustom = arguments.length > 4 ? arguments[4] : undefined;
  var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  // fixed 用户直接触发 mpInstance.triggerEvent
  var __args__ = isPlainObject(event.detail) ? event.detail.__args__ || [event.detail] : [event.detail];
  if (isCustom) {
    // 自定义事件
    isCustomMPEvent = event.currentTarget && event.currentTarget.dataset && event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {
      // 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return __args__;
    }
  }
  var extraObj = processEventExtra(vm, extra, event, __args__);
  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {
        // input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(__args__[0]);
        } else {
          // wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });
  return ret;
}
var ONCE = '~';
var CUSTOM = '^';
function isMatchEventType(eventType, optType) {
  return eventType === optType || optType === 'regionchange' && (eventType === 'begin' || eventType === 'end');
}
function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}
function handleEvent(event) {
  var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;
  var ret = [];
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];
    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;
    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {
            // mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx, processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName));
            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            var _type = _this2.$vm.mpType === 'page' ? 'Page' : 'Component';
            var path = _this2.route || _this2.is;
            throw new Error("".concat(_type, " \"").concat(path, "\" does not have a method \"").concat(methodName, "\""));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName);
          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });
  if (eventType === 'input' && ret.length === 1 && typeof ret[0] !== 'undefined') {
    return ret[0];
  }
}
var eventChannels = {};
var eventChannelStack = [];
function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}
var hooks = ['onShow', 'onHide', 'onError', 'onPageNotFound', 'onThemeChange', 'onUnhandledRejection'];
function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}
function initScopedSlotsParams() {
  var center = {};
  var parents = {};
  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };
  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };
  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };
  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    }
  });
}
function parseBaseApp(vm, _ref4) {
  var mocks = _ref4.mocks,
    initRefs = _ref4.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);
  _vue.default.prototype.mpHost = "mp-weixin";
  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }
      this.mpType = this.$options.mpType;
      this.$mp = (0, _defineProperty2.default)({
        data: {}
      }, this.mpType, this.$options.mpInstance);
      this.$scope = this.$options.mpInstance;
      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {
        // hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    }
  });
  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {
        // 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {
          // 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }
      this.$vm = vm;
      this.$vm.$mp = {
        app: this
      };
      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;
      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);
      this.$vm.__call_hook('onLaunch', args);
    }
  };

  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }
  initAppLocale(_vue.default, vm, normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);
  initHooks(appOptions, hooks);
  initUnknownHooks(appOptions, vm.$options);
  return appOptions;
}
function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs
  });
}
function createApp(vm) {
  App(parseApp(vm));
  return vm;
}
var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {
  return '%' + c.charCodeAt(0).toString(16);
};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};
function stringifyQuery(obj) {
  var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];
    if (val === undefined) {
      return '';
    }
    if (val === null) {
      return encodeStr(key);
    }
    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }
    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?".concat(res) : '';
}
function parseBaseComponent(vueComponentOptions) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    isPage = _ref5.isPage,
    initRelation = _ref5.initRelation;
  var needVueOptions = arguments.length > 2 ? arguments[2] : undefined;
  var _initVueComponent = initVueComponent(_vue.default, vueComponentOptions),
    _initVueComponent2 = (0, _slicedToArray2.default)(_initVueComponent, 2),
    VueComponent = _initVueComponent2[0],
    vueOptions = _initVueComponent2[1];
  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true
  }, vueOptions.options || {});
  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }
  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file, options),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;
        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties
        };
        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options
        });

        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      }
    },
    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      }
    },
    methods: {
      __l: handleLink,
      __e: handleEvent
    }
  };
  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }
  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }
  if (needVueOptions) {
    return [componentOptions, vueOptions, VueComponent];
  }
  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}
function parseComponent(vueComponentOptions, needVueOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation
  }, needVueOptions);
}
var hooks$1 = ['onShow', 'onHide', 'onUnload'];
hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);
function parseBasePage(vuePageOptions) {
  var _parseComponent = parseComponent(vuePageOptions, true),
    _parseComponent2 = (0, _slicedToArray2.default)(_parseComponent, 2),
    pageOptions = _parseComponent2[0],
    vueOptions = _parseComponent2[1];
  initHooks(pageOptions.methods, hooks$1, vueOptions);
  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery)
    };
    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };
  {
    initUnknownHooks(pageOptions.methods, vuePageOptions, ['onReady']);
  }
  return pageOptions;
}
function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions);
}
function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}
function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}
function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true
  });
  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});
canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name : canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});
var uni = {};
if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    }
  });
} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });
  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }
  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });
  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });
  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}
wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;
var uni$1 = uni;
var _default = uni$1;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 5 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ 6);
var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit.js */ 7);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 8);
var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ 10);
function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 6 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 7 */
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) {
        ;
      }
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 8 */
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 9);
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 9 */
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 10 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 11 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 12);
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 12 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
var toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ 14);
function _toPropertyKey(arg) {
  var key = toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
module.exports = _toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 13 */
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 14 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
module.exports = _toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 15 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/construct.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ 16);
var isNativeReflectConstruct = __webpack_require__(/*! ./isNativeReflectConstruct.js */ 17);
function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct.bind(), module.exports.__esModule = true, module.exports["default"] = module.exports;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
  return _construct.apply(null, arguments);
}
module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 16 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 17 */
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 18 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles.js */ 19);
var iterableToArray = __webpack_require__(/*! ./iterableToArray.js */ 20);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 8);
var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread.js */ 21);
function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}
module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 19 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 9);
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}
module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 20 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 21 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 22 */
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;
exports.compileI18nJsonStr = compileI18nJsonStr;
exports.hasI18nJson = hasI18nJson;
exports.initVueI18n = initVueI18n;
exports.isI18nStr = isI18nStr;
exports.isString = void 0;
exports.normalizeLocale = normalizeLocale;
exports.parseI18nJson = parseI18nJson;
exports.resolveLocale = resolveLocale;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var isArray = Array.isArray;
var isObject = function isObject(val) {
  return val !== null && (0, _typeof2.default)(val) === 'object';
};
var defaultDelimiters = ['{', '}'];
var BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {
    (0, _classCallCheck2.default)(this, BaseFormatter);
    this._caches = Object.create(null);
  }
  (0, _createClass2.default)(BaseFormatter, [{
    key: "interpolate",
    value: function interpolate(message, values) {
      var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }]);
  return BaseFormatter;
}();
exports.Formatter = BaseFormatter;
var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {
  var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
    startDelimiter = _ref2[0],
    endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({
          type: 'text',
          value: text
        });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ? 'list' : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? 'named' : 'unknown';
      tokens.push({
        value: sub,
        type: type
      });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
      text += char;
    }
  }
  text && tokens.push({
    type: 'text',
    value: text
  });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ? 'list' : isObject(values) ? 'named' : 'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;
    }
    index++;
  }
  return compiled;
}
var LOCALE_ZH_HANS = 'zh-Hans';
exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';
exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';
exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';
exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';
exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {
  return hasOwnProperty.call(val, key);
};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
var I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {
    var locale = _ref3.locale,
      fallbackLocale = _ref3.fallbackLocale,
      messages = _ref3.messages,
      watcher = _ref3.watcher,
      formater = _ref3.formater;
    (0, _classCallCheck2.default)(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  (0, _createClass2.default)(I18n, [{
    key: "setLocale",
    value: function setLocale(locale) {
      var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    }
  }, {
    key: "getLocale",
    value: function getLocale() {
      return this.locale;
    }
  }, {
    key: "watchLocale",
    value: function watchLocale(fn) {
      var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    }
  }, {
    key: "add",
    value: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
  }, {
    key: "f",
    value: function f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    }
  }, {
    key: "t",
    value: function t(key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    }
  }]);
  return I18n;
}();
exports.I18n = I18n;
function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else {
    appVm.$watch(function () {
      return appVm.$locale;
    }, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {
  var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;
  var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {
    var _ref4 = [messages, locale];
    locale = _ref4[0];
    messages = _ref4[1];
  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale = typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher
  });
  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    }
  };
}
var isString = function isString(val) {
  return typeof val === 'string';
};
exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {
  var locale = _ref5.locale,
    locales = _ref5.locales,
    delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name]
      });
    }
  });
  localeValues.unshift({
    locale: locale,
    values: locales[locale]
  });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  } catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}
function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {
      return locales.indexOf(locale) > -1;
    });
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 23 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 24 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 12);
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 25 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2022 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue &&
    !value.__v_isMPComponent
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
var NULLTYPE = '[object Null]';
var UNDEFINEDTYPE = '[object Undefined]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function nullOrUndefined(currentType, preType) {
    if(
        (currentType === NULLTYPE || currentType === UNDEFINEDTYPE) && 
        (preType === NULLTYPE || preType === UNDEFINEDTYPE)
    ) {
        return false
    }
    return true
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key] && nullOrUndefined(currentType, preType)) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"NeteaseMusic-uni","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"NeteaseMusic-uni","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"NeteaseMusic-uni","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function clearInstance(key, value) {
  // 简易去除 Vue 和小程序组件实例
  if (value) {
    if (value._isVue || value.__v_isMPComponent) {
      return {}
    }
  }
  return value
}

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret, clearInstance))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"NeteaseMusic-uni","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      var triggerEvent = this.$scope['_triggerEvent'] || this.$scope['triggerEvent'];
      if (triggerEvent) {
        try {
          triggerEvent.call(this.$scope, event, {
            __args__: toArray(arguments, 1)
          });
        } catch (error) {

        }
      }
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize',
    'onUploadDouyinVideo'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 26 */
/*!***********************************************************************!*\
  !*** D:/HBuilderX/HBProject/NeteaseMusic/NeteaseMusic-uni/pages.json ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    if(typeof renderjs.beforeCreate === 'function'){
			renderjs.beforeCreate = [renderjs.beforeCreate]
		}
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */
/*!*********************************************************************************!*\
  !*** D:/HBuilderX/HBProject/NeteaseMusic/NeteaseMusic-uni/static/biaosheng.png ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 38 */
/*!****************************************************************************!*\
  !*** D:/HBuilderX/HBProject/NeteaseMusic/NeteaseMusic-uni/static/rege.png ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 39 */
/*!**********************************************************************************!*\
  !*** D:/HBuilderX/HBProject/NeteaseMusic/NeteaseMusic-uni/static/yuanchuang.png ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAACMCAIAAAAhotZpAAAACXBIWXMAABJ0AAASdAHeZh94AAAAEXRFWHRTb2Z0d2FyZQBTbmlwYXN0ZV0Xzt0AACAASURBVHicnb1bs2XXdR72jbn3Pmefa59u9AUEuiGCuBAUQYgQFdOkyKiiyIwuTqxUyn7Ig+3KU1L+K668psrl8kvKVamUK3E5JVccx7QkExIpURAFgqRA3NFAE31Dd5/7vs0vD3Pc5tqtl+wC+uy99lpzjjku3/jmmHOtLf/Tv3oPAASACAgIBABAQsS/AggAIkLoCfoVhIDECXptKSD1qIi1QUgBqx2xq7xT0PuDiF6i3wpASPtAE0CSIPmIXiUQtqsYJ/fjTb3nQXTnqypCE9L1rofFP7dWCkgpwqYHESEhqg2Vz47om2gzTgZQUrMkQYAEK717HQiB1ijoKkL7JELrzUbdzgQ7qbNVSPGG/KRsf4BEpV5CgtUb0r5UHhdEKNLGoQZuQ3LhOwvFVd1IRex0G6xZKPUCQAYXkgD1pR2wev/JKSVO1gZhXZh/tyYlBlismeQg/mqmIvU/sAlnTbuI1bRKRGuunaQC1ZHaslksBFg7l6645LPqToOrmnNZIPhbi8V0VvMNdUZTsKk4xCYgbbASDTBOjtOgDgN7mw5JO1/Fzf+Gv+bGEbI1UT2SmHVqgkbkKOhJCJdGqgKxxUYaiUjSjimDHjzuUE0XLkBSqGSJ2Pl/AIu4HCJATW34mEUAcUVJ+Ir5rhuyyWwKihikjjcAMqk2y2wC975p6SP3nHwIoHTQlcbZmium8773MDMHfxWUSOmONHAzwHEviJHSO3JFdHpxRHJrhQskzfogo1+7oCFuNbVmVLDuXOZODLqy1tWUOg0HzY2kC/+my7UjyQIA+UJmqMhXNTmLDlOSglQoYThbJhFo3sHkEHGaqVvokObNtkze28O+oQiYVOvdhUXdlSIg6YjQqy3FY59BAUI8USA5OUWGijI51fPckElX7St3wtSt92u4l+A+pQ8fWK/PMBsppahGmt2CGoWfdkOubDzGh+G6DAEbkqntM5BWQw5nepLogEUek2arDd/1It5UAIb3qmNpsefO52ZWx3KE7SwBdomOORM3JKfSy8iIlUmb2UQDW4bvaWhATM6AWSGV8AzTOcdmv+BjAkFlZhGM1pouqktMigVHRjANGzKlD2ecAGqFCGmsVdHAqKrrPjhtOzWntGSjNoRwsBokDUmC+MpSkBlPv21XNeF7Os38tRMZ93UT1bTGGFOjmdpofKfDDKQlS9KPCdTOLnHIZKWGlMVjmi4wq0bfsMeXDMVU+YZA7B5gab9hXQ7lPh0A0k0L3P2b3RIjiUs8W9CIkGXTCJ1Qm3TaGWaXUDvFJy1xmmmKQui0QSNYZycDzQRyesyID6cZRizoAUhJ2OgQ18sZo2qR1F0Rrr3G9KEWB9uMMg4LxbVmjbh70qCShiftA8XIzlCFSdemA0Y+tTbpPQWPaIcEvZfl/Mrkgw6XiplDbhIMMPJoO9LmLd14SbIyU+BqM4HmeTVELSnb+/WBAMlohCVJcWoX+cbMAcfibsBSrUfrLk1T7ew+5iKdOijpAUsonadYTgo/6wPCZvKDy7Rp59aKP2YaEWmkxgZrncgQP1rrzC7c6Fwal47Yehble8JsPRPIYp4xT8rDS1UKUcgyKTSTB9VWYdTJ3GVcDVUtY20yZqZUoPdITdbNbt9N0TyuXB6a5KZcvZSWHdt/NXSTtErjOUiNWxvStEfJBzsq4T5mjYuPU2VgjmbEyaaAFjfdhNnwGwBZIeQ4aSclYaPKYjQs+aqAFIi2nozsRtNexfNm+9p8I7QkTUolNiRLz4NFCHZzC7vMxGs1OXG7BDtp1LHn5+LkqJ3qMrvbBF8QZRkVKD1/Y2tJYc9xRwyqdfBUmPexGNvqCYJfH3JkBQBau9Okncxu3tWSH7yaYDYhOmiKJjMpCi9b86A0YtDwxAlP14Ksi54hWfLn4IWGY11XlluIfLVJEUkxWmRP4m2c+o+6ieUSHxpNG0MN9ee0IIhE7NPlISCXaBE2zSP6saVQodnIcrXjhJ1q+VYQ00YCtdrwqCHFmIeb8I8zvHdIryXm48kPVLxchzVEylprgj2mG5saxbctYqoeXL+mcVJHaSYm3NpqTtNf2Gm3mnhGp4cNAgCK6o1WhOhcOfK6ajF4DnufBdgICQcevaYLIEd7xmJQ7ZrHUWPe2p2f0jjSDMrmKzRm6NJ6PA8zn14VIRkW7wCwE7YTknBSlw424LMOOg10ZpOBa/YpEGC3VDEEO106CvCVPFXPYWtgaBme4d1d/1lZGXUQbiheUWJ3VYYous9qd4y1HFoVoM9t3ciygf0StygoyphsugPHQKVBlNx6ay3WT1LDCiphPxpjzIK5gbsWQ8gSyTwRldABe2wlgqV0olPtoiVn13todxD0mTdGLLYqmlFZG4C+6Zas9FsbeFDfNMtRV/Clm2D1zVpGkhLbVefMhflhuKNzdm1T50+1Ky15MqD1CEBn5ZZZ7AKHffPUVHgpnl3s38cnjKSXRIi9AKWXO2L6giPc/JKb6vJc8jJlXhRNyD6U8Hc69XSvsk67vCFFjeiTVfEVXhcnZfJkBuetSArsICjiRVvTgbaA9ppeC0ZFY9HE0xWcNGpDn6zN30XLKCQ49rRlJ3Xz97SIm0W0QXjTYoMRwMpsfqo6hftszJMkluPtf2fjoYM8l9SUk2pnYlfpmimto4q8UBtLUjaQwMd8QDQsRT1Lsj3y2EWYE5ZNipo3xOHkAQpZtBEoREYrngBo8NaOFOMoFkp9vo9F3DyWPrTCbnTM51A6R8rEelET3hs3Cb0pNcoUwLTa59Ve6ZY446vuXfwJWPKIJEgjogAEFf2pfkXw1nj1aUFjPfEyXx6wvGqCDbDKrAlL7KWTdf1k7y+neHdeH15NtbIupw70EfVGKz1E91IZRSC7lorOonjF0PNwrmbCkFUcxzpvN1Gk78XSHnsHNb96nB5zOvVvvALcdjcMOwLpSNBf6F1pR8OZWen8jey/BfKieBZVJdSUq+sVYZE1Dt7nOTq7SL5NT+BJILWFuVboi0YdSbZaZFyuvSvZ7vWrDholqIzM60TZ+VMG/Ey1FQa6V1/LH0Z9ZKB0pWFyvE/+WnIzDUzzhAGWvHPs9t7nC1Y2/mbtlvhF1jQEVEaBL9I+wOpZzcQ18wWJQB8Z6p30Dmw9kKL1YEsDWW/WdMZV17iT+bBRI0d5B04OLzvsudOuJEyAEC+f2aXbCCb4GzEjGVNIIGa90NHZvl2Pj8pWbw1hS2LcUS5O2Ki6apVVaWYDlI9FMMUE05W+BsgtAxncwweWkiJJq/MG1KtEnr0QwSF2rflcmlcx9esaiF4MXe2SYD2Au7XLxo4nN3uGdpWpVoIojKmyQ09GNufHzCNvsBt5qMlkJDitGUqTJipjKrdVbHPa8DzSKcQ4l9Yu8xTFHNCr3dmGZNrJKQprrUqpKmECONHhBE/142LnmrFje1OgK+z6ZCcXij3bygbO0w+EY/gJIhCUlpGpVCoiQMefMwT8HHbHU6Yx49ekNcb+Pd/sqOcaIEXKRWrWG08oYx4aUWjfMn8UcR7PjjtIFCPS9szogrVRD4s2hs7EwQbJtOHOAciOGbXCp/mmnK7PATA4dGmPiorFlZmzYbwkX+QtmLtlTVWLoZz0fHgJbW0RyPrEWuqib7pjTjguRlZFL1+/cdPSQ6TV9aE5lMWftOIlRi+7NJncbqCebpnNt0IIbLumTWmS5HkNswObaL9g+IomKG3THhO3Cq8J+RSy9GNIwzwSTy+xAKjS9LECM6AFiFUMaAc1mKzU4vKk2V4iqYSDaqB8p1yrsKU5BuPbpM4OUZlGFCeT8KqSv2rDFcbG2uiKjp90BAUNlvX7EtIbWoWLKaynpeLWhNiyWYPpIL3audgWdTWPhar4qNw3w5CBTU6qTAwEwPgYzFyS07WrrEmB5MvdS/J4On3lcBPdEis52nrbRJE4gZ60/Rjhn2syuE0MdSQOQbNgHPf1JPoicU/fTIOa5JVD20XOcpkQhR0v94DQf3Ig+84bd4vszhrBmRBLOjtsHw2a5q2mw6HlPI7dGOmE1gXzQQGqJcw8MzUvcgRMSGXNt1X0cLVQbkIN6pwh5KnalwUEwOKwY2LG+YDv2m0dxwK6w07SbnxUXUjav9BpXim7FmD00gjEyNUp2h4fMY6LkhiBmimhViK7EeI0J3DnaCdImhfbtTTHp0so/q55PEPgNntR6EuAHM6QIriPcpFCMu17bJGUmxAhRKpvBuqAJ5+parWl0jjfvA5pFhxB3N5XappouohaWStswgJIIjTAJpsS6OzpLTvFjpQYLg02rGqlcyT3ITVyUhOj6JK5YlA7b1179AvNe1Q8iR3VyXtdSykS1n1Ohsd74mBRqW+DuHazARtCxLjOhHI7YLoEJgG70bqyNMWYBP6XeWCqsL7g0L/N3uTJLMFaDv5wHFeYJY/+VLu8hkrcFaPz1pfPuMOErorexi4r0XHFJrYgY1Ohx3ISK6fVBJeJNSXFm2SWz6vLZohhLEM3OnuLOe6jR8vMeXLTnTNQX9hXQ2qoXWskZaZIBmA4RBPS5xIxbTA41Y1ctq+4kyTbZCDDujjqf9HAY6lNi42q24xppmN/IlLFhdGWzxIJn4/Dsf4x1rYdXu6+yXO5rtXmTV3ZNH+tONb10lJg22gWxsiXMZzTJnM0t429H86eay8XafNc9l3njhoWi6BEueux3khnQPTSVISv46FluGIRnomTqc9Un3f4JcEt2UbibRAoEcwJMMOja9eUJNjsLoloXDtU20BTvTKwUeAQl3I78tYJdr7uSG1o3FSXte+SUS+wRgJjA1pSJg611MgB9EJ1E0vDs9+VYdoVIVC8iw7GIg9rvk6wYbccOEp4l76OYiTGGtHA7jw8fLOL+8hlAjxuZ6RbwXTht/fZlg83TaYAOsdI3pPArEkRSgqXMoSnS0YH5H6FVNVHES/xJZ8W+2OenTDJYcxUl6KvVuhkttdeDDKkyZWxmA8DXso1+6lqFU2SeG4aC/B2speRqrfYw5RAd3dk7Xfi9nHmfgHFiOAiInCpIkv32FyjajXUig04Z+nODLQjUtCFayidFhwcdl1TQSDNtUVgG1GMPuZULbkfpZOBmyIdCrlyDHZcmoHSY0YSyqIfJ3qjEtB1kMSO1jRIbzaUBYMWhqiU0BH8PsZ0oUi4Y+A9gHQcw+Sdx2eLR5mXMrrwrzSkJPDQyhqujqyLopeF7tYyOQZQ6CmxCzX7KivPQc/ggvbe57ORSyzQkLpqb2lAH8swORrQ7goaJPqWHQLVCF1eGXq4DbBWl8F0m8AjjUjVFe0EigYRMuuvbwhw2XrnTZK4B5v0xXODAWVEi/bJlNhzqvRhmjH6sbNjvWtXJkUk1DJMGOY8OxtBv6xL3XUjfiz9MdDTHkSzTVZEvFJlublEv6sZYCqqIvJTq1MGfiaXHVgHid+GbJ4b02A96YuQKIYn7h0591hL7jVMdLzrn7BqYB92oZ3OHxlj7VoWUVQCQrBkRL1qMIlJgdjdN9SzA41IsRARSYWVwY7X9nVf1bIm+lVgWiR5oaEvluaoZ3LcZoY8jc1VzQYZpFQKWOi7xXqkaaurPW31tkRxI+bzRgM9zh3TPfsoU+iN13hET2wU2VIOCvOEuXpqZcjXmu3iKap4OSd7FceQOPue2869O0JBHbyDXLHoAxRU0yBDRC8JVgtlcdjI52tTOvkRKfCHHli2cJyhg4MN38tfZMsFBk9hYxtkHy4xUj25Aq3QgscUYT0iHRsY6tT6o+Qb2UKLrWcZiORx1NvBd5CbSzgM0o4K4VWMNYbZQC8X8WiKD/QLtUQxM6WPtZ3vNhwdu8A37Kt3yFq7bp+B44gJPZjqhnsObyjo4jSN04al+NvLak06C2vRK3HzRfRi/udG6VZU+2b1VWsqdGVfyYFCAxUZ+pKikiGHR5s7VYZrV1zMXwDAn1S0NvaAr1hP6mX1Mbcu0/0UgXJqPIs2ZbQuQVpPMg81Eyr71CvSo4BcAXk6kplUVpG9TYJZhChYNTmC5gY9af96GlBXa9iRZn7ecnAGb8rwMCTyaySzhl5e2uXpQkfKgTuZGL6eZJocpCLTL6tWHiOWAfhSsTj0qaXFHbnvz4c98PtuJGG0CPwwsEFGc/EiKPbECFciVbaBZQkqVS9kAct6qdSWaYqgaDJwoGYS1sG8uZnVYQIt/bxQpF5V2orLeq2d0QeznjmGZiTfQ5NmbdDHxWkqEneccEAfv4627dXXDwl8g0xEnKF07mag4qeauLoDv1nFu0YRTMdlYywkTua1mynRn7eRn+mBVgvYGMnuxqhp5XBeV+Z8NFpXhFd3JptjAeThrB7NV6i0m5aHAVoKpuNysFm2JuW9h/MGkLZYJehHA/i6NoX93auuIKZLABDj/gxVn+VkRuvq02JNmQOKCLg3HW1NRvqdHY8m/Q87AiKOkW77Ig7G54t6PK9ULwEtVsQIz9Xdyd9/5dIzBxsE/t3PD197/3C+8spoWm/1CAMBFOALl6b/8NUnxkVq5f/8J7fvnCxVgFJIFrIU+QcvX3x6f2NF/rt3jr5/82QO26Ur3Z2900n55o2db93Ynk5Gs0X9p9+/c7pK0xiHgb46E6W0hq2qKjOqOYs3NG6D9xpxgLIn6nAzURMmmG/D+ztfvPjt5/fL+jOU/n++ZFXrn35w/G9/9uBsFWnRWawIpuPy65/fe+HytM1mfvelCwD+5MOj86WFk1qUrNCtM+ZdBdwYybjISix8kUhTKQKOBJMihRiJz8qkFNkcoZRua8bxvIrIxkjGUr5ydfrm3ZmucpiSCM6qQ1ebUOlDfQhYgHZV8Hala3NsIgzWA2xi6pf6lL6zgzREGRVsjMuouFh/g+7zn7/5NABFyqi06WS68d0ArBT51eu7X7+xW0RWJIhJkd9+8cKq1j+7eXK28DQCQPY25MbBxmQ8quR7n81mS7Zo0P+6ZNaIgw5abEuUpkPBhenoVz+3vTORIm5eOdgUzYtFvnlj9+rOJA+EwMm8vn777OH5ysMw6ItxLzOc614RuJ0+jnO1VWNvhkh6ca25qErNXWHcpsNKLFdrXCy9xkVGIgAquFjlgO3eLCtXlcOj5vEvXp5+54ULWxulkm/fPV8RL1yeTiflN5+/sKz8wc2TpW2bEPDK7sbvvXTxwnS0qPwXP7z36dG8S9c+wTQ9NPuEKyYh9jfK15/eurwzLlljUKlEcH1vcn2vM1Il7pwu33k4f3S+ctWt3S3sPC2RT81PItJyklpHbZMTPo1l6n75XLowg+edgHeP53/09qPbh/N+56mG3GRcvvPSwbNPTAV46/bZ9947mi2r7ZUUQ2O2DScPz5bzZUvU8RgQEbl+YfJ3v3RwsDUieetw8YfvH947Wf53X7704pXphenoN76wf7rgjz89W65qM8CoyN5m2Z+OFiuOtAKeVNx2xQgL9EbmdltdBFORAin2dJQluawYgaVIA45K1FUQKhEZ2UMEK1krqlYBNVEkKhZ2kcaIYw+qf0FQxgFuKa8nS4ieSFBEqmd+13xni7N5ff+z2Qd3zwgp7fEmynMIKdOR/DcvX2qWf/vu2Vt3zmarlgacswlICzDnksowiuBgWn73pYOnL2yIyPFs9ecfn/z8zvliVf/3N+7/j9+4dmVnfHVn8lvP7x+eLd9/MK9pIMZXhOlez3gR04k8d2nzYGtUShkJdzZKw4bPX9jgdcyW9XC2unm0+KMPTqYjQMo3b2xf3ZmI4OPD+Zt3zuYrQDACbhxs/srVKYF7p4sffno+W/JssXp0tiQrpEgSJveubpjJjp1HcOwcF3YbAghpy53FQ842Z+ftxo2XVOanunjojoq8/NT2qOR6Ivemk2t7ExGsiK1J+eLVrUTJxZPqe5+dH50tU6VXM9/u5ug7Lx68eGVrVGS54lt3zv7Tu48WBIn7p6t//md3/8k3ru5PRzcONr/zxYN/9eMH90/m4VDwbjqu5U62Px1985ndF65MRzrPFhEUkZevbf3y1emy4t3Pzn/6+v0//+SkGW9S8NvP74+LnC/50zuz2ycLAhtFDqZjAJX86d3Zn948OZuvzC2kPdNR/Fk8iX7Z7TuaQAzANJ6NgovmmcTEjeOFUQfWj1EPhg2R6aT8469fG/VP5SmCURERjEX+ixcPasX6a1n5z39w+63zlW1zaVU62dsov/Hc/q/d2J2MpVa+/9n5//Wzh8q5RWqtd08W//qnD37/yxcPpuMXL0//zgv7/+YnD86XXbmTjwkiA4QmIdosoJvgFZEilLb/rQjIUuTn92ffeQ4ALk5HF7fK3TMhsDGWzx9M2ihuHS9qZRkVkBVYmdJtqp0Th1DSLZfKX9xOHFtwdDiW1meMySdmCwC0PSwtVvPYqSE9Hsl4lDJh/xqJjEaP09cSxScBJsz2RL713P63nt3b2iiV+ORw9n+8+eD+yYLQhwASslzxJ784vbI9/s0XLkzH5T+7vvPgfPnH7x4OpwV1jdaQgCxWvHuy2JqUVmt4+sJkVATEg7Pl4awuK++fLp/en9y4sIGWeET1vj8dvXJt6+LWiJS96eja7gTAcsWndsfT8TYrV8Cto/kHj5aZ7lsO8ydoxGKeGcCRBGPkPJaMEZOlnloZOjmACnL8weNXg3BVefPB7N7JUqlT78p+8YWt0fWDzc1JaU2qy1RKkelYfvP5C9/+wv7OxgjALx7N/+CnDz49nBdPvibevOL1T06u7U1+5XM7o4Jv3Nh945PTYY+yVgokIDiarV67efIXt05HIgfb4//+lYsjkUq+efvsjTvns2UF8dKV6W89t+/Y0YBxo8irn9v+lSe3YcUkEWxvlF9/Zrf1M1/xex8dv//gMPi3ZYXM1YZaTJExToL261FIF9IU4XdL0Pge1qBQiYIKslzxL26evH7zuK8QeRJq8tWXrm1f/OXJ5riYg9h3xMZYfvX67vbGSACSy8ovXdt68crUZkNdpLQkeDhb7m2O/uTD46P5amezC9g1wFPYma9w+2gBYCS4ujcprQ5V8XBWbz6any/q5rj88lVsjGLDD2wRo4hkXG9cbiR2QwIxirpaolueKPr8ZLGl81yIjNMZHmuEDBmBj9FJV+L5A7h7TNm9DRltdqo4RtFHw0rs33ABUn8n5/Xfv/XgH7x6uX3/1P7Gk3sTDD0vzv/k0fyHH58enS9/8PHJYlm5233bie7H4sZNVMhXn5wWgQClyFeuTX98+3S2rLEYTNw9Xfz07nmt8BkSCBS/3RYAxkW+9tT29sQ3cscj01M+Ia2RXsdeHhaSY6PemS8YREYGM8v5ZEaDyeNsfdyqjY1J+a9fufS7L19c02f3GomMignrBRURAEvyL2+dXts73BjL5/Y3XriyJSK1Mu8xFUBEShESo4I3bh1/9HChoxmkoMGkoWnPbqgq4MF09NylaSlKH565sPl7L174lz/6TNTRUMlPjlb/9q1HiwoBntgePffE9Pr+xsVp+V//6rPFStny5ri8dHm6NS66Ia2lj6ih0C1suShXhiRtBGjszpZ+xC3kk7lWbJVk7GY0u8u/7SNds1F4uQBjkdFo3el7RWXYco81NnM+X/2bnzx46sLG7798qbG+B2fLd++d+8ZvKXJtd/JLFze1AbGZ41pHwydq0JahRQQokK89tT2ydCdAKXj52tbf/dLB//vOo/myHs5WJM7my6rLDXz24ubvvbC/PSkr4tlLmz+/N6sVKKi1nizq5nw1X3K+cgrNbjprBSe1kqNf6EUEGMOJt+ekEgvAjadZecKTU08TROxpRZnk6p9K3D6cPzpbdsR27bW7ObqyO5mMHZoVgdsiP0lWrvTeUJD4+MH8X75+v5pvieDbz+49c7BpOc5yogyoynBLrA1SP+xtjb7y5FZJDlnJIvKN69v3T5cfH86/+94RyQdnq+l4tKqElAdny8/OVjsboxHw1WtbHz1cNE2MBN+/eTwdlxVx63hpdU0voDjtCoNoymqhZfUqKnEweIwnNdlVxsfE7ORg2JlqNNKHdqyq3sGorkEslvX7Hxz95c1jbdCMGlUGAMAXr23/V186uDia2GlBRpvEPR1jBSu50rvQWMTqO/DSqRKYAZFbz6Ctidbll69tXd3Z8GcLkLh9tLi0Pd4o5Rs3dv7oA16cjgBc2ho/f3na2tkcy9ZYPfCLl6e/vYoHmNN0PVvyI5Elk0s8Zus3YZUhSzOqr8zuzE1TzbRLzxFGRG0sW9P9xkiRZbHicpWmjAIAq1Vd1PR8MvjzpwOhB+XUvl9o6WiQSwK003XIcCFr4IaUtNU8BFBrKXKwNX752vZ0LGeLuqzc3xxV8q/vzZ6/xCf3JrcOF/sb5Vu/tDuAAy9PANjfHH3zmZ31CfNffXr2xp2z1coCV2J8HRNLkieEwzhWU9ANIJUlTGlwbmxkwypRWxO9arGqyxXT6ZiMy29+8eLfenZ/KHjIAgG2NsqF6VhZqe65SQZgQF/SuFVxjblI+kovz6uf0Wd6UbfTFMHLT27fuDApIj+/d3plZ7K/OSJxNF/92ccn3/783v/zzuEXn9gsSQax5xxXe2ZAOyx56S6SkZdQGjLphCbmmpqI04qF2WlsxjQLeaHCTSX+aBu/DTuBqQjAnU2dPsyWdbaKqARQBBe3xxe2R2vqGdorZ4K0fNBYpQmzNjMV7SUBooiWkh5TA0oOF/IDwFN7k689vb27UQi+9sHx3/vli37Fj35x9sHDxZ3jxc5EvvfRSQvrAj7/xPTJnQmBT48WHx0uZssVOooVPvjJ4XylNrA00GwjXhsXmIKaAajUVIQYh3l1ru8VPjNoY/Iw84h49mr9lZHsTUfNcLMlZ4va8vbxbNUqdT1bwea4TEZCYFV5vqhu9zai5YrLStvepabS5Jh0CmIyKpd3J3sbZUlC5JWndrSN9ftnH2sqk7+N6PLu5OrOuBI3H80/erRY+aSocr7kR5+dU+Sd++fvfjYDhECmBgAAHx9JREFUIEVE8D+8+sS1nQnJn907/8P3j04XVbOiu7HuRZcKJ5tdjFFN4bAkIWGaGY3NGGa1hG9iT9qK+IP9YIY/uUdkOi66wYE4X9TZslIwW/Jf/9W9yahsjOR8aQvKRTYn5dWnd56/skXw9uH8u28/clTbmoxmy7pc8fbRgv6zHDlRZdULxiP58pNbv/3Sge6uECmCVcVsyeWqepl5MM/G0Hw6/NtHi1uH8+sXNv/0w+OObKRbLazUBRBjkYvbmtG3x/L03kSDRbKiZb7ix4fzYTbNGbfaEkZ/IRJdG8OkjiqPaUY911c7sg+mg3ubpalpvqpH56tlJYDlqv7gg6PPX9r86vXde/eX7909PZ6T4N50/PSFjeevbJF4eLZ67Z1DEWyMyzOXNr/y1Mbbd+c/+/RsWWsUrhxW2SMVMV/WO8eLk3k92BoBILkiThf1vfvnj86XoY1+zjswkW2OlPuny/fuz2bL+va9s0Zg/QzkwnStAGQkl7bGl5TV4ZUnt168PF0PXQL3T5f/yw/vmcZi5qfSqG26IEqyaiPjYTXIGUQTVCKnWXaWAFaICLXSBZwv6uH5krWKFBRsjMpvvHjwtWf2Xjmev/Hx5h+8+dn5Eqz0p1eQJDkZla8+vf0bL1y4fjB98cr0s+PFrcO5MRtbplf87gZSiV8czt+4dfL0weaoiJBny/rOvfPXPz45nTOPiGSlviwkh/qcLfHW3bOf358dnq9Q1p/mQ7p+RUi8/OTWpLSkIluT0Va3aB7RP1vVUGxDP78PPKd2JILh+dVAcZwjDzREbfHjBYucDZm3eYDE9YvTdv7prD48WbZlF6G8emPnK0/tjItc2pnMV42w+eM+bLTAiqyQSzuTyUiePtj8+69e/mevfXq2ZHqeleuV3aBY7x0t/u+/frAxahtDpJJn87o3Hf2XL+w/OF2+dW92tlh9drr8j+8cbm6M6ooPG/L2FLz5Iis/fLhoS92T/tlAzV9dGwXYmZRfe2qnFAHx6Hz52ekqc/0iuLQ1vjAdsWK2dIc2ePJVO0uHKoPt7evWAy0nmSSReowYqIGUKiQ7G/USjoo8fbDZKqVHs+Xd44WAI+Bga/z3Xrk8nRQAtw8Xb9w6nfvukA5JsKr82S9Of3R5+q0v7I+LPHd563dfvvh//uizqqPyTMvBUhArluSj0xVk5RhdRG5cHH/t+u7l3cnxbPm//eX9t+/P/vj948Z5V+phXZpqZJLAfEWQpeAxPFSMEwgE+NvP7F7aHhfgZLH6w/ePXvvwONEz2Rzh97548PUbOwROF/GsXdNviie4JhOfRW8nsOicnPHIByUWdDZFeiTFDEEDYn9rcu3CpIisKh6eLh+eLSHY3hz/w29c25uOROR8Ub//3uGtB7Nul66/IVhxdL587d1H7947W5GjkfzaM3uvPrOrQ2qPzospRac4kW7W0v7sTUe7m2U6lgvTsRRhrcvlqpFGuz+xi8ckU3Uu2b1oT/YkR+BLV6ffeGZ3YySV/MXh4id3zmcrnq84W9bZss6XlW06QRA8PF+BSDfyCHQjYHaXNV7hEwoBlDg4pvkAoirhrQjQV1JJCJ59YnNvcySC+ap+cP98sax7G+V3Xr70hStboyKLFd+8dfLjT46Xtf3qDsdFxmVNFODjh/PX3j18YmdyaWeytzn61rN7Hz+Y3T6a1xoV92yd/eno0vZYwUQAKy1ubYyevbi5uzkSEaI+PF2UUoraWUCUgu1Jv6wfBc8+Sei37WYFtsnDsxc3fuv5/YtbIwDH8/rnt07v+gZYC6adiexu6L3Nd0+XUvwxAFbogRW0YwtRTx0YAgswps2ZEhHyfeGZU7ohlTAAGIk8d2W6Ox2LyGxR37lztjUp33juwt/6/N50Ukh8ejj/T+88un+6fOnJrd3N0YrY3ShPXdhoetcnroGkrCpf//jk809Mv/38hXGRGxenX/+l3X//1qPj2UrDnrE8UQpuXNz8/a888dBZnOpTDqaj569sbYxKJU5m9XBW9zbKl65OtzZGixUrOBmVL13dakxnVTVJNiksQ4DZI9oSHrC/OfrKta1f//zeU/uTIrKs/NGtk9c/OankuMj1g83tsVSRSZFfOph8bm+jXfrho4UAYKXdkh7kizaPQprnuGckkcbIuyFp6K8YLE3KVAygTb4gwOak7E3HAllV3j6cf/JgVgRn83q2qDtLnsxX3/3rB2/fOSPx5c9tv3pjtxQZiexOdVJ1svDf6wGJ+bL+x7cfPX9l63MXNs4Xq5O5LRjZKu3pfHV4vloRBdgYla9e32GXpFpEoRije+f+7HxRd3bGrzy986Wr2yuytmvHIoJVxYPT1fliFUkd5o0dm2bLAL/29PZ//uzexe0JgWXlDz85+Q/vHunOwIK/fX3nC5c2AYyK7G6UzXEhcO90cetwTn/k1uAmDvFI7QIIRdLPcxGSls9tbcj4ezZsM0qKqJbZZov6vXcPr+1vfO5g44cfHs6WhOCHHx4+OF38zstPvH7z6C8+PFqsWMA7h4vpZLS9oUl5VTlf1Z98cpx4IkDeO5z/wZv3f+fLl/7DWw9/+unZ2WJllIUATub1zU9Pv3B5enl3oqA8rCWb65OPzpZ/9O4jkiezev9kOSoyShl1VTFb1h98dHy+qFq9DROJ5Wg6UxHy3ulqY1xAzFf1BzdPvvve4YPTZVPxfMmzRT3YGk20HSExW9Y/fv94ttSfD9ERSsfncp82o7EA8hmIsTsxm3T8vFXtmjpa0nca2qJ2VfnO7dN/8dov/ttXr/zwg2OwEuVsVv/6F6cf3J/Nl3VRFe4/uH/+8HS5XLUbTvjobPm9dw//6uOTdJ+HAFgBP/7k5L2756dLWpkCYrOBVeUbn5zcPly8cGV6sDMxtAyJW1V9vuLd48WHD2b3T5esOFus3rt//uT+hs99Knk8X7356fnP7pzNq+4V8NsxBGDl2ZJH55XgbIVKVMg798///ObJK09uf/e9o9dvnZzOjXaTArx1f/alq9PNcWkLgzcPl29+evrJ0aKLdSnI9+F4ALjJUtYyZAQA+Uf/7E17Cys7WXjqFMx3n7g6CPiWLm2qiNRe43kFsgjGpe1p1apdrey23YkBQkmoa7vRbIGHgEgRseK2woekyYeoqQD/RU7RjSL9WDpUEyRDo4CjUSlFCHDFFXTDx950tDOWOyfLlenArmAR6Op9a9mfx5Zq1l1fg99gavpUPAx7tNfY1BF5KwLGBhH92fdB7FVTqD5RjbwVJeFKLGp6VKQNMkZK41Z5YGZ1S5JoCYp5JoHwVRW7xk8z6SIo8+9wiz352nVWfSbWaG0luCL8SUkaXTg8Xx25KsTtZA5RGQetkGR5ogc3GHLF7Mr6clhLSD5WFtE7VOLftrNSXJlWtszpTu9qst2zUWqK/lw2s49STw1/NY+pJfVoPhLW1WhwKBHfZJgqW3GCrTu55zkGxFooguMRLLaBtJ3svmJzR3t0gLsPhF3hKLSu4+yZlw3YnMxs28YnIrrMryYs2caJKSjMpK/CYX3scQEtTWk3wT4ayyTTYzwtv4UrAWkxV2DPT/AZwfAlWSPeAKMsC8RjTB0kvDXqf93sq403Sa7/1oGCzDxDH9IHkPYz7ggr7dRRJC9sInE8ArYPyl26ZA8NydqgHVzCeDQtRRaJ77TSkR9LYs98tVBLA1NrS8214XRO3EfdC9CsYZ7i7WjBkQYMgd/epzcYx5vAIMGquOf+3R7JktWHoUulhqxOX1XCNByBFnehEtoAXVtwMSzTMrlT6fWcZG9pts+tFik070F3ZdhADRM5ZxB2cBAiAfoqOPt2OjV7YUsTIddPQQCvDTvMLEgImeShb73x9v1za6RmwQQwko60gCLxmJRhUs/EQQYMAuZZrdUeHOxN0XZpC1oMF04ZCuHPKQhUBKYm41l2PrBQFu0+UdWAIow8Dl3hURXG6DiF69cynvqsX26AmP2jE2zdN5OjDIAlcxnaw9Z7UEr5xqwZvICwpyIO7xgIeKQ6hDmHWJCUVGgwrdk7WhBzKLqjPIPkK+WD0ROJIchQ/+YTkpRilur/WMxYkTLIQuhQ3UKdOGnMe1dRQaaHTUcCE5e5zzT+bdOQpEMNlVJiNP24RPGufxJrpJbs40qGxffWpHCFP8fB/1ab7ubAzHvxfEriw2kIUMNxqLFv63XJLwUOBvF4pU74Vsb3DtKTWIKFEQSKLUMm8wTZaKcVa1p04T8A3OlqhGzUqmOrQmua3SqUnm2DVV3RL1D+NiQ3Wb5owuXztz1pJ+2hhDRk7Ah0AtOALH+ajvRyu08Juk489iPaAoEiJ+fxJ40EEZD+o6vKQpxdn+1/VvZWGTKhiD9pvtie35YeYNFk7bfTxG9TB+xl1dH/I6iKStlLxW1GzuUG4zChfADNG0NPSkIkzq1ZozpSVXOIodvOTML49fHu5cNJ+NZ/7Zrsv4wLHQvdwo03tuTE9T713JwG1G2FATWPkzb3EtBrmpT+OHolZUqV9JMG2riPaB5JWSlnVueBJZ5EIwOOn9AzgpFJgMeppRXB2E+JkKg/3QEdtl1T5tUNKt1qkp20wW0fVYacQ25kEU+bfye/ZzCmIABsTTEpKNvBp50Rzf69KybrpLU3zFshgy1QWDkl6Zht5ATs5+I8zugA3Y2zHanmQsnaOQA8CVmbTReevy0DhVMrjjs69Ips/9QQAGgJK0S0073WyYj89FNUTEPySoRjiPQdxpv8jCadwdC3mweFcXjMidoGKyo0/XiSnIlnBMC6ACZ2aWXR5NHxL2PQiUq69AOfYUrj7OkAANvCF7ihDbTi6ADc3KfROzXQPemu8b1A13D+Lieakn2SHxkITWB67dk9KQqM6ZFwmkpIc0dQC5KmEEtT2YqM/4eGD6HTIlMab+u7eIneZFdd6JU6N3T4iulCjy7BfFX+jnZqkpTkAY67Hq+Sd0GYX7Vl/M4N8wMj27WMCwb5OaciU2sqHTXRMjGL4xHTfQ5QC9vP4yFl/nAo232QI0P5VBqRur5o0EiEhIFws2jeYMZkjBSVfsSTowVNr5VQrmWgvDOKQPuZof7XGXyQZnWrPriVJKycRXLA6z/GWR7NEZpI7VtDAmc9ZhrGVS5n2LzDI6GRrdAhmr/13YboCWjoV3jYEvYjmG578Z+Ls6Ttc6uu3XVCHCf4c1oBEL5GRAqYrCQpjWmP4l0rMoS/gRW1+kpDp3u63i2mM+fvz7UvXO9J+GpNpUhJNCodz7TFf/uz6Xc9uPMlAxdnjD35HFFrh88OUuYYJRpNUzYDLEfV3KrDi/kF2WvSZlGReJCUGiNnZj4SWcJHDiSf6JwbcQ+agoWhQ8L0eD5NVws2PxZblk+uQz8z/wAS6dJTwnpWvBBj9H6FStoX8wGklRQ/WXKR0whIf2GJ63UBfi1UGnCYToOF0KBTOS7hlRsXwmZdsGBOJnF7Bilvl4Rnu7UkK46CfubRQDP7vilRWut0c8LFAjvUDtRNO/Tt/GzM3uXND4doawL0B3J4hfPFG3PFQVyWuEQiCiVrKnm0IKm8p2TdTZzh1UEs863VcJZkH71BV1AIuq6D7hHK6a8jiWXQsEjghHmyl6pNYTZFDdsNzNKn3zR4kzQBeKeiVOrtbL+WSbWZlLwAXaqIvlL1IsNuDo5mDh+s4YMtJjkD6LrpjtN3coWa9IBdRMdM7RMOFPoEv254DvR27072JNe4phYXie5HMvj9MjOuuKr9HRHOZmfqmwiALoBMpP58yzo2A/GsDyuyRyOlzxR0RahIjkemL+vLnWvt54tTf6EpdleFIvIFDkpJHOSvfBgiSdktTlOIcJCE7FUf03hk2zg31TcNP7pXl2s9p8LSQX96+u3hbt024actgOUBtSqX+r0+P68bMDMGJE8JGQmCA++DUhpd2xh+GYiRdxfDbvRbE0B/Nil8wjHEhJFgSWaSAaEaQJOvjBjKJvUFWoLtDnrCNJ49qxMzRlXjm5rU54FrIDNswn4PYVj3SWpn+glTR7MsNTwlJB13Igt6T7NyZ7e6B0cAacMQzxzSLbdYI+mqNs0zHhUyOKFrA6cRJxHXFHyvYZjamWfqssMAxk8UI+nLXYcJjsMdJb4yBG8VpC50BMgTDxgANIKamY8ksmNGEkT5K2nc0EjAIZuU1JB7Tgypra1p7za96DQi6X8Dqow8xuhcme6g7EfubdpPjMOsqljf+yYhOtdOgqg3tG+DelgXMXBJoqacPMQNdZz0MKEgsjZnH4IocpiowAqs9hwpgwLmArRf0qYB8hjt0BJfIrhOCJuWJFEGm4dBfVC/YtdG6F0wMJWdZIs0eZbdDTe8Ok0bwoSud8+W7V8BxKsd4lgBWzNN+x2QpMpqMaSz/9NaUHSayt7M7mvVfC8+Aeh+DLgpIPtpDJ5KRAaZ32dzzcQpeSMqdS6R+bU4k2fXSwsSc+SIWWOtGRUZRkNmk73k4WUJAyx2JUG1BYotOFAn1h43TSh9hGtYSFXc/Zqvia3jFrIXzE/KuccAVN/XTvii8puP981gra1UEmZ3CrK3tlFI1kA7mNYdco7xcdlVsdgRbpshy2xgA+NjknzXtq2tGvDGbWFAhIJZwmhVIFV7U5Pkeci2WzLs2j4llfb6NGUG35N8UrvYhe8LrDBRXD7Nix03UCYRNNfRs+/FpfHQCcOExF1xqF2Y1oHiZCkJDe1c/2UjdOEY4daTmmTXIQ/MQ9aLO3fsciEBii2iJ+tYDs7gRlVplj37hKmq7x1I/EkLrOaivf2bgXzybsDdsIKwvd0OETbHZDjLAIEcodI2xBh30iw1DbCTTZLtGejql6VkG3rOdKaPSLRfp8Fa1YcmAAavqOmlp5tK0vYa0YehVM4UtYbSUvwN4sE5ewFaTvHRpYmc2J2I7SKxjEIdXreW00VSjmLCOLyvB/tZ2XphgKybVrwJL5NkQ4UqbTtjrgV2DiQSWtwOkp1Zlu0kdQcOmBZjib6ax5hQOzWwc1RXzmuCh6AzXixEGcnq3JS6H9jgLuevpELSi5AmjXM4/7nGLoxhkah2UTrhHMr853EVATpGu8tYlKdOGKklf58JTva0GItrw13CKDv80EAZEuNT/IAg47xGZw9RVDLsXzioUI0Xw09+sc4IfBnW5knWXU+xnaLYOHWUwQhCOekzwy0TtdFT7YYFpAlWaLmvExPhIoOXPmKn38SR2/E+GVBk7pmAJRzYx5GOM1UiK+NZh1qebddk9qke0/bs9RjQ/pI+n4VZSOiwbv/YtyR0nsRkZOQfPk866Q6xU37AcoyUpsqk4z7eu/Y9EVovOt4olqQFj6RE0ZJZtJnEjFgPL42fRaVLFQOwkGJPzByfbOoAfwhDbss/WtmU+XrzXtG1pyabhEuHVl1ilcF/UMS/hnp6afcOaognPAx9+9/k8ZIO63tv1MQy1DUlhZEFienFuDGYkHb8KAJdHCr1C81ngVHpAj+S4EZCvBhniB5ukULOU23/2FcB9Dfz6CcahsSnMF6Sx1b+/KrSOzRd/aoLe4MWFa21gLiAsgwMWZuhltZePEfV2oeplRlIk1hdoOS9pUkAFTX/6EGHk8xXpVKFKpfQ+/qcweSmO6fqFIV0Nv3mMj9M84Eu0LtxMY7TDTeI4nTrC207mYRDqWZbb/Ez04wxN31Yes3a9DPSO3aDbTxi/RcraBP+3I9hsrdGG2cCSAlF0HlwfggP46qhEzMEtWRiKS0k0UgPuAsS0U0HmEItZh7phKSd2FDGdIwhma0nhTKlm3mRrUxgoIA25ohaanZt1/o9OvYKm6SdVPkcY4Ie/MnMzgoiKLK+oukEhW3R1j3dIU0HZxnJuvBBdCp8zENBs0ai4Qw48EV5l8o6HXA3H0kzefc4lGoitH8ryXbrSzYtu4qn7bUYYIdKk4YWuBV8S5J2mgtqTNaBohsC9ZpyDbT7xb2TGE/am5VMXk3sHHEtnOg13fQSu/chl2cEnTQxjes1EVGLgXoS/Afb7hbS0lW6JcaDz/HG+EsJe+R+OiEGi286tt7XBnUqxlDSrIIG0qHTGBb8tLCbaibZCWZjdqZBft6A+miyn/4jjRp0Xp3wzyhZmrObElsZ2eKyuzCPwx1a46MaYgraCNYeI0uQaMy+q2vbPySQN0eurVDoQb84tpIMl3vt6nVHsaA0rtnUZD7FZAwXyeztqJtn4/Bdg+wR1CIxszgXJViCxXYHyQkGmBYkETON5F0MZFOBPHUpanfw0amofZ/W/pso4Y79SzQblJT6EuJ4FHtOSYknxm0r3ExPTlDIi7G4gDbObik2pmhNX3QxMs2h66XlgM4SpI/QNerW8M+SWNZavSiUIvBHarFrjelYaLFjtVY8tAxCx54a6qXjE5J/uDL8FziSqUuiBN4E47IQ34MlFTM8XcWs0xVlRqZdgZx5miF9Ap9smVvJ3dvihSSbRObvRxUjimnKQOlrKdABV/1SOhcRwfD8pCIFAOQtJZ7i9IPbz6InwVK/u3sQKtL23dFSortAXnODwUhiRik2hVYKTErNib7d2mgOJc52iCRpQsWcmXXzV3BrHZVJkHFcJIimih/3AHR+N4zvtccRtAXObJeeR8R7t6UAtXtGiPul7TIEPNsZTwglk+nZpx1LAzGWtL9hOGxXRIs2p+AQ8aeCgfCdeM2DPDfkzC5WiUgOSLuLynsLh4hGkPZd0vSi3xKUar+AorcrsOU8iZNTh5F+bDpIF0vMa+h5PMDRkLABcmwZz6EsUbUzvZltnLNl7qHxAWltIlaYySwbChs19igxKI0MS1soi8SX9kw7ulcLYUm0QsKwnWN6BnJ0zl+Z+wNWz3b8oWEekDTSz5GDRHWgNlx7RksA4t8IkDfMtAep0b0zYpTwhUoJ7zS/QVpvtZ5p6Rbp5AEYhOYBEOnnoYqnRPV0hHLpD3PvsN7Sn6eogOZkG2ciSYhoq0eMCG8yb2HUDppPDxC1WT2vUQCOIebXkVY020XGjd0ceqN8zIKAYVf9i54CE1T4oLw45CPSaxK3MSiEdR1+D8PDZOb1B2C7XD0v9C5prXdIFUU/tfn67FTNOnAxVU88quUxKZq9O5t2akoc6hPpqihi5Ze5nYvNfsoVftZrY8CPDfdswPnMmLQ8RoJczn/MH/NsB1oC7OdJsUgRcBdhGBomO+EMfzsHNLOFKzWMzuQ5NQBHHu/GNk+JFbL8Uz+zSV0MFOtRy1hQthP7YHGIHjKXJGF3eX+8+yDhjz4Wc/oU8LB9r4Eb0XAKU+pCsnqK0Bc2Ik9q4909izEtSO1LMB1fWk6wYK21pTMZagl2mwrhPMeaJhjFwt6rjStqR95s5h3ZEk2B3kK2IoD+LqPOSqavzlOhg+1PdraA+JgoOBPzSfGi8NvRamuzJLdyyBL9RSDpd54aEUx5vY+n7kFJEMAXVLTxFnOWLYZ7FlNKM6WJ6ZrWa1peJBobsfY9CTHSsZsp8oS2wDgroE2qzheyl2VTSaYJIVUOsq6e5DzADjVsXw/W0Bs0ScUlxZSu5F1M/v7pFWIXt2F4u4TNk8wFnGYJDZ3djTqhciJF9wbpjn//2LurfQpylfYsMpc6QlA1JBKmqeWq+0Hbn2Rs2EMzUe1sDCT66hjDmpKCFS9C1J4NYvA+9JAvLInAUQMwl5KSk2UL2Hc5Q9q2hkhsBk661WtAgAcfoxNj2GEK+lxJ7yX0NDOEI7si+Hr36nKSyYyE5M4IEAZIgWDCCPSuEkYf9E3CEYVNT7opIUVVN8EienCCKs0emYIx/fG6zUaUDjp9qdiuRfwkSR9nutCeThC9AkWh1hlczorRef+tAl+OnGicgW69HejZLbTvbufjYu7PwjARf0ug9siSVBYK8dLCOLmGr27gTie5hU42H+sAhEXQ9jh4IvDHS7kS2zzY+7emoxIQlkiekJJjGl7PtMOMfpqhZwjtmm8mTmEdYeLVMDuBEVBmYFeT3giUsMLTsA3e1GqZJhk4i53GEZisceM7G3J8NOSnq6YDkqicW10Dpi2ARcemYIaYhhll7bfWwwwVoZbAwMlxlsxGJookNMtY4g2vXn8Nd3inEDSWxug0ZXLzsu6P2SNpL0p0mUDC91xqfvbl/ExwHO1cRbbN3+cf0TkHg3CrawalqouDpEV/8DaAvPBmrpl2z7g9FLeIzBUkiUJ7/hQMbknThkriC77pnDUrtRaqypGOx7cmVd4mIf4t8zWJcCIbLRZHCCQVOD4Nq1Z6VWuzBxlnoSpDPBrGJGTDK4eZQCzVs4awnwBCYPvukOI6+AAtC5l/hJ2T1rp7Zr1cLYPRwRXgYSTGiNpf+q0O6ZKobbu/pVxNBLXzOPCRZ+h3n0G0pK5BK7aKZlWKxKCM+GWOpBpoyBbqdrEMSolcG1Td0uKMMcdiwlUbU/TlG1F8Qp64ngll04ZGmVJKtJ6S+gz7DK0DF8IgBjjVtu2rCDaj6mKgqSPEBJCq+nqOAYzE1b5MZ7xGv+oKWj4doU4NzR70+5NUfd1dlAkhjNP6wVQtU21mzEhegm4ra3AciRVUfRXEZ2bKEH/Ya829zwMl9W22U0Dvacywje5Q2HntBm7XKCI5R7NZY+ZIkZFUGwnkB/GtJ3o1Urppf8SNKeExountrg10Ql2eTXP3NZDZrJuIT+3U7YL+f93GTu0duUlsAAAAAElFTkSuQmCC"

/***/ }),
/* 40 */
/*!*****************************************************************************!*\
  !*** D:/HBuilderX/HBProject/NeteaseMusic/NeteaseMusic-uni/static/xinge.png ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 41 */
/*!***************************************************************************!*\
  !*** D:/HBuilderX/HBProject/NeteaseMusic/NeteaseMusic-uni/static/ACG.png ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 42 */,
/* 43 */,
/* 44 */
/*!**************************************************************************!*\
  !*** D:/HBuilderX/HBProject/NeteaseMusic/NeteaseMusic-uni/common/api.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSongList = getSongList;
exports.getUserFollow = getUserFollow;
exports.timestampToTime = timestampToTime;
var _config = __webpack_require__(/*! ./config.js */ 45);
function timestampToTime(timestamp) {
  /* 时间戳转换为时间 */{
    timestamp = timestamp ? timestamp : null;
    var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
  }
}
function getSongList(songId) {
  return new Promise(function (resolve, reject) {
    uni.request({
      url: "".concat(_config.baseUrl, "/playlist/detail?id=").concat(songId),
      method: 'GET',
      data: {},
      success: function success(res) {
        resolve(res);
      }
    });
  });
}
function getUserFollow(userId) {
  return new Promise(function (resolve, reject) {
    uni.request({
      url: "".concat(_config.baseUrl, "/user/follows?uid=").concat(userId),
      method: 'GET',
      data: {},
      success: function success(res) {
        resolve(res);
      }
    });
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 45 */
/*!*****************************************************************************!*\
  !*** D:/HBuilderX/HBProject/NeteaseMusic/NeteaseMusic-uni/common/config.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.baseUrl = void 0;
var baseUrl = 'http://localhost:3000';
exports.baseUrl = baseUrl;

/***/ }),
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */
/*!*******************************************************************************!*\
  !*** D:/HBuilderX/HBProject/NeteaseMusic/NeteaseMusic-uni/static/VIPlogo.png ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAATCAIAAAAIzCorAAAACXBIWXMAABJ0AAASdAHeZh94AAAAEXRFWHRTb2Z0d2FyZQBTbmlwYXN0ZV0Xzt0AAALQSURBVDiNtZQ7b1xVFIW/ve/c1zzjwY49wQ9sQyYomCRCcRAIhEBygUgRCVGjtPkDNJS0tOnoUoSGghTQBBEhFBDGcmGjgG0piY0wHpP4lRnfmXs2xYyDHzFNnFWes/Y6a7+OJEnCs0EGkLUVWZi2lUXSp31G/MgGX7bnT5IrSZIkevOa3PmJ5vZReMXigr31oZ16PQPId9ds4rI78w5xgbRFGCP6H3f7EertxBl+QKtJ2sK5zqEq6pHxUU8e/CXffiG3v96RXqu5ngEx5NaX3J1xH31CroQIgEv1xlWC0EbOyfwUcd69cUlnfpBfvqG+2da1fJcNnebsu9Y9YKXjkitJbRFQAHOoZ1GWckXmp2Xpd5IGQKspq3/Kb7ctiPFDaos8/BuXsl6jvmHV8/bmJbtwkcqIzk3Kjas0thAQwRztNnbgR9YzKIUu+WOSvmELY5KGzE+hKpVRC7OkLdIWZuacBJENn7HhMUAerVuQ1VvX5eGyBUOP9XbVVJV8yV54Re7NsPEPZpLUufOzdQ9Y+QTeLhOAePghQUSYtWxRimUxI2m0/R6QBovyVMdZvisPlklb1DdlYZqRMSs+t38OWomsrcjqktTu69yvzP5ohTLlCp7/mLLXSxC70XOeH3F/Vo4PyL1ZaWy56jjZIuure5gri/rV5+YFqBLlrXfIXbxi2SKqh0irEuWsOs7SnPQMMjdpQ6cp9uyvBlDucxc+sMooqngZsgXLl/fRDsR4GU6Ny/fXbeqmNDZs7G0Los4g7kaUs75hG3l1zwbsxYELVeuvkgl0YYr6pr10Hj84LPj/oQCiuLTTXFE71mv9Jy0uWHe/nXiRTNDJJowJYtQTP7QgekKVAOcwa6ciSZJ4n75vE5fd2fcodHUY23XSJuoR5XZiUpoJQBDSauJSMsFB9fai09hyH3/2jL8ne22Crt4j/lTbBTkCq0/CoaPz9PgXuewqmsDr4kgAAAAASUVORK5CYII="

/***/ }),
/* 53 */
/*!******************************************************************************!*\
  !*** D:/HBuilderX/HBProject/NeteaseMusic/NeteaseMusic-uni/static/SQlogo.png ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAdCAIAAABNF1mqAAAACXBIWXMAABJ0AAASdAHeZh94AAAAEXRFWHRTb2Z0d2FyZQBTbmlwYXN0ZV0Xzt0AAALBSURBVEiJ7dZLTxNRFADgc+/cmc5MOwU6fSC1JeGhgEoU0YiJjwR054Loko3GhTt3JvwGV678AZL42KBhK4mkLlCQBDWhhqKmSCyvFvpimN6510WRltKCEUJi5O4mc3K/OXPOPTOIcw4HtfCBSYfYP4mR4ouF1ezk98VYPGNa1l42lQSh1mXvaPDqmlIRG/4YHY/ETMr2eB4QQhLByax5s6u5IvY8FL57vf1Sq9+hSCa1TGoBAGy6CDBCikSIgBnnlsWNHGWcbwQgwAjZRIEIOJU1Q1Nzz0LhnbDllBH0aJoqxRKZwdHp15PRdVp4nwhA15T+W+dbj+pZIzfxdWFgZCqWSFPGAYBg5HaqfVdaO5tqNVUKerR4yijJeAvGOMcIYYTm4unxyPz9Gx2aImGENgNEggO6BgA/E5nB0enLJ/zH6lyigAGAWiwSWxkam6mtsbcFdIwQ21YLAuWWYdK0kTvb6LPbRIzR9oDUmjm7lHrQe85TpZLfWL3X+epdJJEuTWgXTJaIQxY/zMwXZ4YR0p2yx6naRMFi3KSsxiHnJQAgAtY1hVrMYhWbqzzmdzk6m3yPhiaKayYJuKPRd7v7ZMCtVdpu51Ue81Xb7/Sc6rvaBrDRjYzz5ZTR/yS0lFzbZ0zASJGIIhXucg6SKJjUooz9nQR/Pq44cFZUDAEjieBE2qBWqU1ZxbKVzyyZNaNLyRwtbMQ4X8msV6k2WSQAoClSwK0Nf4putj4AWIyv56zwj3iL37U7lj8cjPNv86sPX47Fi5oYAcgSuXa63lulAsCRGnvvheaBkakXb7/QrXm8+Tzrq7Y311UXH9AymK7J0cVUvdvZFtQf3+spjKK8BmAjgkQEAFBlset43ZkG75aYfCBCRo6+n465NLkEQ8Uz92kovI+D+GKLf6fZ2N0edDuVffzElD7E4d/VIfZ/Yr8Ar8EuiC9h2A8AAAAASUVORK5CYII="

/***/ }),
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */
/*!****************************************************************************************************************!*\
  !*** D:/HBuilderX/HBProject/NeteaseMusic/NeteaseMusic-uni/uni_modules/uni-icons/components/uni-icons/icons.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  "id": "2852637",
  "name": "uniui图标库",
  "font_family": "uniicons",
  "css_prefix_text": "uniui-",
  "description": "",
  "glyphs": [{
    "icon_id": "25027049",
    "name": "yanse",
    "font_class": "color",
    "unicode": "e6cf",
    "unicode_decimal": 59087
  }, {
    "icon_id": "25027048",
    "name": "wallet",
    "font_class": "wallet",
    "unicode": "e6b1",
    "unicode_decimal": 59057
  }, {
    "icon_id": "25015720",
    "name": "settings-filled",
    "font_class": "settings-filled",
    "unicode": "e6ce",
    "unicode_decimal": 59086
  }, {
    "icon_id": "25015434",
    "name": "shimingrenzheng-filled",
    "font_class": "auth-filled",
    "unicode": "e6cc",
    "unicode_decimal": 59084
  }, {
    "icon_id": "24934246",
    "name": "shop-filled",
    "font_class": "shop-filled",
    "unicode": "e6cd",
    "unicode_decimal": 59085
  }, {
    "icon_id": "24934159",
    "name": "staff-filled-01",
    "font_class": "staff-filled",
    "unicode": "e6cb",
    "unicode_decimal": 59083
  }, {
    "icon_id": "24932461",
    "name": "VIP-filled",
    "font_class": "vip-filled",
    "unicode": "e6c6",
    "unicode_decimal": 59078
  }, {
    "icon_id": "24932462",
    "name": "plus_circle_fill",
    "font_class": "plus-filled",
    "unicode": "e6c7",
    "unicode_decimal": 59079
  }, {
    "icon_id": "24932463",
    "name": "folder_add-filled",
    "font_class": "folder-add-filled",
    "unicode": "e6c8",
    "unicode_decimal": 59080
  }, {
    "icon_id": "24932464",
    "name": "yanse-filled",
    "font_class": "color-filled",
    "unicode": "e6c9",
    "unicode_decimal": 59081
  }, {
    "icon_id": "24932465",
    "name": "tune-filled",
    "font_class": "tune-filled",
    "unicode": "e6ca",
    "unicode_decimal": 59082
  }, {
    "icon_id": "24932455",
    "name": "a-rilidaka-filled",
    "font_class": "calendar-filled",
    "unicode": "e6c0",
    "unicode_decimal": 59072
  }, {
    "icon_id": "24932456",
    "name": "notification-filled",
    "font_class": "notification-filled",
    "unicode": "e6c1",
    "unicode_decimal": 59073
  }, {
    "icon_id": "24932457",
    "name": "wallet-filled",
    "font_class": "wallet-filled",
    "unicode": "e6c2",
    "unicode_decimal": 59074
  }, {
    "icon_id": "24932458",
    "name": "paihangbang-filled",
    "font_class": "medal-filled",
    "unicode": "e6c3",
    "unicode_decimal": 59075
  }, {
    "icon_id": "24932459",
    "name": "gift-filled",
    "font_class": "gift-filled",
    "unicode": "e6c4",
    "unicode_decimal": 59076
  }, {
    "icon_id": "24932460",
    "name": "fire-filled",
    "font_class": "fire-filled",
    "unicode": "e6c5",
    "unicode_decimal": 59077
  }, {
    "icon_id": "24928001",
    "name": "refreshempty",
    "font_class": "refreshempty",
    "unicode": "e6bf",
    "unicode_decimal": 59071
  }, {
    "icon_id": "24926853",
    "name": "location-ellipse",
    "font_class": "location-filled",
    "unicode": "e6af",
    "unicode_decimal": 59055
  }, {
    "icon_id": "24926735",
    "name": "person-filled",
    "font_class": "person-filled",
    "unicode": "e69d",
    "unicode_decimal": 59037
  }, {
    "icon_id": "24926703",
    "name": "personadd-filled",
    "font_class": "personadd-filled",
    "unicode": "e698",
    "unicode_decimal": 59032
  }, {
    "icon_id": "24923351",
    "name": "back",
    "font_class": "back",
    "unicode": "e6b9",
    "unicode_decimal": 59065
  }, {
    "icon_id": "24923352",
    "name": "forward",
    "font_class": "forward",
    "unicode": "e6ba",
    "unicode_decimal": 59066
  }, {
    "icon_id": "24923353",
    "name": "arrowthinright",
    "font_class": "arrow-right",
    "unicode": "e6bb",
    "unicode_decimal": 59067
  }, {
    "icon_id": "24923353",
    "name": "arrowthinright",
    "font_class": "arrowthinright",
    "unicode": "e6bb",
    "unicode_decimal": 59067
  }, {
    "icon_id": "24923354",
    "name": "arrowthinleft",
    "font_class": "arrow-left",
    "unicode": "e6bc",
    "unicode_decimal": 59068
  }, {
    "icon_id": "24923354",
    "name": "arrowthinleft",
    "font_class": "arrowthinleft",
    "unicode": "e6bc",
    "unicode_decimal": 59068
  }, {
    "icon_id": "24923355",
    "name": "arrowthinup",
    "font_class": "arrow-up",
    "unicode": "e6bd",
    "unicode_decimal": 59069
  }, {
    "icon_id": "24923355",
    "name": "arrowthinup",
    "font_class": "arrowthinup",
    "unicode": "e6bd",
    "unicode_decimal": 59069
  }, {
    "icon_id": "24923356",
    "name": "arrowthindown",
    "font_class": "arrow-down",
    "unicode": "e6be",
    "unicode_decimal": 59070
  }, {
    "icon_id": "24923356",
    "name": "arrowthindown",
    "font_class": "arrowthindown",
    "unicode": "e6be",
    "unicode_decimal": 59070
  }, {
    "icon_id": "24923349",
    "name": "arrowdown",
    "font_class": "bottom",
    "unicode": "e6b8",
    "unicode_decimal": 59064
  }, {
    "icon_id": "24923349",
    "name": "arrowdown",
    "font_class": "arrowdown",
    "unicode": "e6b8",
    "unicode_decimal": 59064
  }, {
    "icon_id": "24923346",
    "name": "arrowright",
    "font_class": "right",
    "unicode": "e6b5",
    "unicode_decimal": 59061
  }, {
    "icon_id": "24923346",
    "name": "arrowright",
    "font_class": "arrowright",
    "unicode": "e6b5",
    "unicode_decimal": 59061
  }, {
    "icon_id": "24923347",
    "name": "arrowup",
    "font_class": "top",
    "unicode": "e6b6",
    "unicode_decimal": 59062
  }, {
    "icon_id": "24923347",
    "name": "arrowup",
    "font_class": "arrowup",
    "unicode": "e6b6",
    "unicode_decimal": 59062
  }, {
    "icon_id": "24923348",
    "name": "arrowleft",
    "font_class": "left",
    "unicode": "e6b7",
    "unicode_decimal": 59063
  }, {
    "icon_id": "24923348",
    "name": "arrowleft",
    "font_class": "arrowleft",
    "unicode": "e6b7",
    "unicode_decimal": 59063
  }, {
    "icon_id": "24923334",
    "name": "eye",
    "font_class": "eye",
    "unicode": "e651",
    "unicode_decimal": 58961
  }, {
    "icon_id": "24923335",
    "name": "eye-filled",
    "font_class": "eye-filled",
    "unicode": "e66a",
    "unicode_decimal": 58986
  }, {
    "icon_id": "24923336",
    "name": "eye-slash",
    "font_class": "eye-slash",
    "unicode": "e6b3",
    "unicode_decimal": 59059
  }, {
    "icon_id": "24923337",
    "name": "eye-slash-filled",
    "font_class": "eye-slash-filled",
    "unicode": "e6b4",
    "unicode_decimal": 59060
  }, {
    "icon_id": "24923305",
    "name": "info-filled",
    "font_class": "info-filled",
    "unicode": "e649",
    "unicode_decimal": 58953
  }, {
    "icon_id": "24923299",
    "name": "reload-01",
    "font_class": "reload",
    "unicode": "e6b2",
    "unicode_decimal": 59058
  }, {
    "icon_id": "24923195",
    "name": "mic_slash_fill",
    "font_class": "micoff-filled",
    "unicode": "e6b0",
    "unicode_decimal": 59056
  }, {
    "icon_id": "24923165",
    "name": "map-pin-ellipse",
    "font_class": "map-pin-ellipse",
    "unicode": "e6ac",
    "unicode_decimal": 59052
  }, {
    "icon_id": "24923166",
    "name": "map-pin",
    "font_class": "map-pin",
    "unicode": "e6ad",
    "unicode_decimal": 59053
  }, {
    "icon_id": "24923167",
    "name": "location",
    "font_class": "location",
    "unicode": "e6ae",
    "unicode_decimal": 59054
  }, {
    "icon_id": "24923064",
    "name": "starhalf",
    "font_class": "starhalf",
    "unicode": "e683",
    "unicode_decimal": 59011
  }, {
    "icon_id": "24923065",
    "name": "star",
    "font_class": "star",
    "unicode": "e688",
    "unicode_decimal": 59016
  }, {
    "icon_id": "24923066",
    "name": "star-filled",
    "font_class": "star-filled",
    "unicode": "e68f",
    "unicode_decimal": 59023
  }, {
    "icon_id": "24899646",
    "name": "a-rilidaka",
    "font_class": "calendar",
    "unicode": "e6a0",
    "unicode_decimal": 59040
  }, {
    "icon_id": "24899647",
    "name": "fire",
    "font_class": "fire",
    "unicode": "e6a1",
    "unicode_decimal": 59041
  }, {
    "icon_id": "24899648",
    "name": "paihangbang",
    "font_class": "medal",
    "unicode": "e6a2",
    "unicode_decimal": 59042
  }, {
    "icon_id": "24899649",
    "name": "font",
    "font_class": "font",
    "unicode": "e6a3",
    "unicode_decimal": 59043
  }, {
    "icon_id": "24899650",
    "name": "gift",
    "font_class": "gift",
    "unicode": "e6a4",
    "unicode_decimal": 59044
  }, {
    "icon_id": "24899651",
    "name": "link",
    "font_class": "link",
    "unicode": "e6a5",
    "unicode_decimal": 59045
  }, {
    "icon_id": "24899652",
    "name": "notification",
    "font_class": "notification",
    "unicode": "e6a6",
    "unicode_decimal": 59046
  }, {
    "icon_id": "24899653",
    "name": "staff",
    "font_class": "staff",
    "unicode": "e6a7",
    "unicode_decimal": 59047
  }, {
    "icon_id": "24899654",
    "name": "VIP",
    "font_class": "vip",
    "unicode": "e6a8",
    "unicode_decimal": 59048
  }, {
    "icon_id": "24899655",
    "name": "folder_add",
    "font_class": "folder-add",
    "unicode": "e6a9",
    "unicode_decimal": 59049
  }, {
    "icon_id": "24899656",
    "name": "tune",
    "font_class": "tune",
    "unicode": "e6aa",
    "unicode_decimal": 59050
  }, {
    "icon_id": "24899657",
    "name": "shimingrenzheng",
    "font_class": "auth",
    "unicode": "e6ab",
    "unicode_decimal": 59051
  }, {
    "icon_id": "24899565",
    "name": "person",
    "font_class": "person",
    "unicode": "e699",
    "unicode_decimal": 59033
  }, {
    "icon_id": "24899566",
    "name": "email-filled",
    "font_class": "email-filled",
    "unicode": "e69a",
    "unicode_decimal": 59034
  }, {
    "icon_id": "24899567",
    "name": "phone-filled",
    "font_class": "phone-filled",
    "unicode": "e69b",
    "unicode_decimal": 59035
  }, {
    "icon_id": "24899568",
    "name": "phone",
    "font_class": "phone",
    "unicode": "e69c",
    "unicode_decimal": 59036
  }, {
    "icon_id": "24899570",
    "name": "email",
    "font_class": "email",
    "unicode": "e69e",
    "unicode_decimal": 59038
  }, {
    "icon_id": "24899571",
    "name": "personadd",
    "font_class": "personadd",
    "unicode": "e69f",
    "unicode_decimal": 59039
  }, {
    "icon_id": "24899558",
    "name": "chatboxes-filled",
    "font_class": "chatboxes-filled",
    "unicode": "e692",
    "unicode_decimal": 59026
  }, {
    "icon_id": "24899559",
    "name": "contact",
    "font_class": "contact",
    "unicode": "e693",
    "unicode_decimal": 59027
  }, {
    "icon_id": "24899560",
    "name": "chatbubble-filled",
    "font_class": "chatbubble-filled",
    "unicode": "e694",
    "unicode_decimal": 59028
  }, {
    "icon_id": "24899561",
    "name": "contact-filled",
    "font_class": "contact-filled",
    "unicode": "e695",
    "unicode_decimal": 59029
  }, {
    "icon_id": "24899562",
    "name": "chatboxes",
    "font_class": "chatboxes",
    "unicode": "e696",
    "unicode_decimal": 59030
  }, {
    "icon_id": "24899563",
    "name": "chatbubble",
    "font_class": "chatbubble",
    "unicode": "e697",
    "unicode_decimal": 59031
  }, {
    "icon_id": "24881290",
    "name": "upload-filled",
    "font_class": "upload-filled",
    "unicode": "e68e",
    "unicode_decimal": 59022
  }, {
    "icon_id": "24881292",
    "name": "upload",
    "font_class": "upload",
    "unicode": "e690",
    "unicode_decimal": 59024
  }, {
    "icon_id": "24881293",
    "name": "weixin",
    "font_class": "weixin",
    "unicode": "e691",
    "unicode_decimal": 59025
  }, {
    "icon_id": "24881274",
    "name": "compose",
    "font_class": "compose",
    "unicode": "e67f",
    "unicode_decimal": 59007
  }, {
    "icon_id": "24881275",
    "name": "qq",
    "font_class": "qq",
    "unicode": "e680",
    "unicode_decimal": 59008
  }, {
    "icon_id": "24881276",
    "name": "download-filled",
    "font_class": "download-filled",
    "unicode": "e681",
    "unicode_decimal": 59009
  }, {
    "icon_id": "24881277",
    "name": "pengyouquan",
    "font_class": "pyq",
    "unicode": "e682",
    "unicode_decimal": 59010
  }, {
    "icon_id": "24881279",
    "name": "sound",
    "font_class": "sound",
    "unicode": "e684",
    "unicode_decimal": 59012
  }, {
    "icon_id": "24881280",
    "name": "trash-filled",
    "font_class": "trash-filled",
    "unicode": "e685",
    "unicode_decimal": 59013
  }, {
    "icon_id": "24881281",
    "name": "sound-filled",
    "font_class": "sound-filled",
    "unicode": "e686",
    "unicode_decimal": 59014
  }, {
    "icon_id": "24881282",
    "name": "trash",
    "font_class": "trash",
    "unicode": "e687",
    "unicode_decimal": 59015
  }, {
    "icon_id": "24881284",
    "name": "videocam-filled",
    "font_class": "videocam-filled",
    "unicode": "e689",
    "unicode_decimal": 59017
  }, {
    "icon_id": "24881285",
    "name": "spinner-cycle",
    "font_class": "spinner-cycle",
    "unicode": "e68a",
    "unicode_decimal": 59018
  }, {
    "icon_id": "24881286",
    "name": "weibo",
    "font_class": "weibo",
    "unicode": "e68b",
    "unicode_decimal": 59019
  }, {
    "icon_id": "24881288",
    "name": "videocam",
    "font_class": "videocam",
    "unicode": "e68c",
    "unicode_decimal": 59020
  }, {
    "icon_id": "24881289",
    "name": "download",
    "font_class": "download",
    "unicode": "e68d",
    "unicode_decimal": 59021
  }, {
    "icon_id": "24879601",
    "name": "help",
    "font_class": "help",
    "unicode": "e679",
    "unicode_decimal": 59001
  }, {
    "icon_id": "24879602",
    "name": "navigate-filled",
    "font_class": "navigate-filled",
    "unicode": "e67a",
    "unicode_decimal": 59002
  }, {
    "icon_id": "24879603",
    "name": "plusempty",
    "font_class": "plusempty",
    "unicode": "e67b",
    "unicode_decimal": 59003
  }, {
    "icon_id": "24879604",
    "name": "smallcircle",
    "font_class": "smallcircle",
    "unicode": "e67c",
    "unicode_decimal": 59004
  }, {
    "icon_id": "24879605",
    "name": "minus-filled",
    "font_class": "minus-filled",
    "unicode": "e67d",
    "unicode_decimal": 59005
  }, {
    "icon_id": "24879606",
    "name": "micoff",
    "font_class": "micoff",
    "unicode": "e67e",
    "unicode_decimal": 59006
  }, {
    "icon_id": "24879588",
    "name": "closeempty",
    "font_class": "closeempty",
    "unicode": "e66c",
    "unicode_decimal": 58988
  }, {
    "icon_id": "24879589",
    "name": "clear",
    "font_class": "clear",
    "unicode": "e66d",
    "unicode_decimal": 58989
  }, {
    "icon_id": "24879590",
    "name": "navigate",
    "font_class": "navigate",
    "unicode": "e66e",
    "unicode_decimal": 58990
  }, {
    "icon_id": "24879591",
    "name": "minus",
    "font_class": "minus",
    "unicode": "e66f",
    "unicode_decimal": 58991
  }, {
    "icon_id": "24879592",
    "name": "image",
    "font_class": "image",
    "unicode": "e670",
    "unicode_decimal": 58992
  }, {
    "icon_id": "24879593",
    "name": "mic",
    "font_class": "mic",
    "unicode": "e671",
    "unicode_decimal": 58993
  }, {
    "icon_id": "24879594",
    "name": "paperplane",
    "font_class": "paperplane",
    "unicode": "e672",
    "unicode_decimal": 58994
  }, {
    "icon_id": "24879595",
    "name": "close",
    "font_class": "close",
    "unicode": "e673",
    "unicode_decimal": 58995
  }, {
    "icon_id": "24879596",
    "name": "help-filled",
    "font_class": "help-filled",
    "unicode": "e674",
    "unicode_decimal": 58996
  }, {
    "icon_id": "24879597",
    "name": "plus-filled",
    "font_class": "paperplane-filled",
    "unicode": "e675",
    "unicode_decimal": 58997
  }, {
    "icon_id": "24879598",
    "name": "plus",
    "font_class": "plus",
    "unicode": "e676",
    "unicode_decimal": 58998
  }, {
    "icon_id": "24879599",
    "name": "mic-filled",
    "font_class": "mic-filled",
    "unicode": "e677",
    "unicode_decimal": 58999
  }, {
    "icon_id": "24879600",
    "name": "image-filled",
    "font_class": "image-filled",
    "unicode": "e678",
    "unicode_decimal": 59000
  }, {
    "icon_id": "24855900",
    "name": "locked-filled",
    "font_class": "locked-filled",
    "unicode": "e668",
    "unicode_decimal": 58984
  }, {
    "icon_id": "24855901",
    "name": "info",
    "font_class": "info",
    "unicode": "e669",
    "unicode_decimal": 58985
  }, {
    "icon_id": "24855903",
    "name": "locked",
    "font_class": "locked",
    "unicode": "e66b",
    "unicode_decimal": 58987
  }, {
    "icon_id": "24855884",
    "name": "camera-filled",
    "font_class": "camera-filled",
    "unicode": "e658",
    "unicode_decimal": 58968
  }, {
    "icon_id": "24855885",
    "name": "chat-filled",
    "font_class": "chat-filled",
    "unicode": "e659",
    "unicode_decimal": 58969
  }, {
    "icon_id": "24855886",
    "name": "camera",
    "font_class": "camera",
    "unicode": "e65a",
    "unicode_decimal": 58970
  }, {
    "icon_id": "24855887",
    "name": "circle",
    "font_class": "circle",
    "unicode": "e65b",
    "unicode_decimal": 58971
  }, {
    "icon_id": "24855888",
    "name": "checkmarkempty",
    "font_class": "checkmarkempty",
    "unicode": "e65c",
    "unicode_decimal": 58972
  }, {
    "icon_id": "24855889",
    "name": "chat",
    "font_class": "chat",
    "unicode": "e65d",
    "unicode_decimal": 58973
  }, {
    "icon_id": "24855890",
    "name": "circle-filled",
    "font_class": "circle-filled",
    "unicode": "e65e",
    "unicode_decimal": 58974
  }, {
    "icon_id": "24855891",
    "name": "flag",
    "font_class": "flag",
    "unicode": "e65f",
    "unicode_decimal": 58975
  }, {
    "icon_id": "24855892",
    "name": "flag-filled",
    "font_class": "flag-filled",
    "unicode": "e660",
    "unicode_decimal": 58976
  }, {
    "icon_id": "24855893",
    "name": "gear-filled",
    "font_class": "gear-filled",
    "unicode": "e661",
    "unicode_decimal": 58977
  }, {
    "icon_id": "24855894",
    "name": "home",
    "font_class": "home",
    "unicode": "e662",
    "unicode_decimal": 58978
  }, {
    "icon_id": "24855895",
    "name": "home-filled",
    "font_class": "home-filled",
    "unicode": "e663",
    "unicode_decimal": 58979
  }, {
    "icon_id": "24855896",
    "name": "gear",
    "font_class": "gear",
    "unicode": "e664",
    "unicode_decimal": 58980
  }, {
    "icon_id": "24855897",
    "name": "smallcircle-filled",
    "font_class": "smallcircle-filled",
    "unicode": "e665",
    "unicode_decimal": 58981
  }, {
    "icon_id": "24855898",
    "name": "map-filled",
    "font_class": "map-filled",
    "unicode": "e666",
    "unicode_decimal": 58982
  }, {
    "icon_id": "24855899",
    "name": "map",
    "font_class": "map",
    "unicode": "e667",
    "unicode_decimal": 58983
  }, {
    "icon_id": "24855825",
    "name": "refresh-filled",
    "font_class": "refresh-filled",
    "unicode": "e656",
    "unicode_decimal": 58966
  }, {
    "icon_id": "24855826",
    "name": "refresh",
    "font_class": "refresh",
    "unicode": "e657",
    "unicode_decimal": 58967
  }, {
    "icon_id": "24855808",
    "name": "cloud-upload",
    "font_class": "cloud-upload",
    "unicode": "e645",
    "unicode_decimal": 58949
  }, {
    "icon_id": "24855809",
    "name": "cloud-download-filled",
    "font_class": "cloud-download-filled",
    "unicode": "e646",
    "unicode_decimal": 58950
  }, {
    "icon_id": "24855810",
    "name": "cloud-download",
    "font_class": "cloud-download",
    "unicode": "e647",
    "unicode_decimal": 58951
  }, {
    "icon_id": "24855811",
    "name": "cloud-upload-filled",
    "font_class": "cloud-upload-filled",
    "unicode": "e648",
    "unicode_decimal": 58952
  }, {
    "icon_id": "24855813",
    "name": "redo",
    "font_class": "redo",
    "unicode": "e64a",
    "unicode_decimal": 58954
  }, {
    "icon_id": "24855814",
    "name": "images-filled",
    "font_class": "images-filled",
    "unicode": "e64b",
    "unicode_decimal": 58955
  }, {
    "icon_id": "24855815",
    "name": "undo-filled",
    "font_class": "undo-filled",
    "unicode": "e64c",
    "unicode_decimal": 58956
  }, {
    "icon_id": "24855816",
    "name": "more",
    "font_class": "more",
    "unicode": "e64d",
    "unicode_decimal": 58957
  }, {
    "icon_id": "24855817",
    "name": "more-filled",
    "font_class": "more-filled",
    "unicode": "e64e",
    "unicode_decimal": 58958
  }, {
    "icon_id": "24855818",
    "name": "undo",
    "font_class": "undo",
    "unicode": "e64f",
    "unicode_decimal": 58959
  }, {
    "icon_id": "24855819",
    "name": "images",
    "font_class": "images",
    "unicode": "e650",
    "unicode_decimal": 58960
  }, {
    "icon_id": "24855821",
    "name": "paperclip",
    "font_class": "paperclip",
    "unicode": "e652",
    "unicode_decimal": 58962
  }, {
    "icon_id": "24855822",
    "name": "settings",
    "font_class": "settings",
    "unicode": "e653",
    "unicode_decimal": 58963
  }, {
    "icon_id": "24855823",
    "name": "search",
    "font_class": "search",
    "unicode": "e654",
    "unicode_decimal": 58964
  }, {
    "icon_id": "24855824",
    "name": "redo-filled",
    "font_class": "redo-filled",
    "unicode": "e655",
    "unicode_decimal": 58965
  }, {
    "icon_id": "24841702",
    "name": "list",
    "font_class": "list",
    "unicode": "e644",
    "unicode_decimal": 58948
  }, {
    "icon_id": "24841489",
    "name": "mail-open-filled",
    "font_class": "mail-open-filled",
    "unicode": "e63a",
    "unicode_decimal": 58938
  }, {
    "icon_id": "24841491",
    "name": "hand-thumbsdown-filled",
    "font_class": "hand-down-filled",
    "unicode": "e63c",
    "unicode_decimal": 58940
  }, {
    "icon_id": "24841492",
    "name": "hand-thumbsdown",
    "font_class": "hand-down",
    "unicode": "e63d",
    "unicode_decimal": 58941
  }, {
    "icon_id": "24841493",
    "name": "hand-thumbsup-filled",
    "font_class": "hand-up-filled",
    "unicode": "e63e",
    "unicode_decimal": 58942
  }, {
    "icon_id": "24841494",
    "name": "hand-thumbsup",
    "font_class": "hand-up",
    "unicode": "e63f",
    "unicode_decimal": 58943
  }, {
    "icon_id": "24841496",
    "name": "heart-filled",
    "font_class": "heart-filled",
    "unicode": "e641",
    "unicode_decimal": 58945
  }, {
    "icon_id": "24841498",
    "name": "mail-open",
    "font_class": "mail-open",
    "unicode": "e643",
    "unicode_decimal": 58947
  }, {
    "icon_id": "24841488",
    "name": "heart",
    "font_class": "heart",
    "unicode": "e639",
    "unicode_decimal": 58937
  }, {
    "icon_id": "24839963",
    "name": "loop",
    "font_class": "loop",
    "unicode": "e633",
    "unicode_decimal": 58931
  }, {
    "icon_id": "24839866",
    "name": "pulldown",
    "font_class": "pulldown",
    "unicode": "e632",
    "unicode_decimal": 58930
  }, {
    "icon_id": "24813798",
    "name": "scan",
    "font_class": "scan",
    "unicode": "e62a",
    "unicode_decimal": 58922
  }, {
    "icon_id": "24813786",
    "name": "bars",
    "font_class": "bars",
    "unicode": "e627",
    "unicode_decimal": 58919
  }, {
    "icon_id": "24813788",
    "name": "cart-filled",
    "font_class": "cart-filled",
    "unicode": "e629",
    "unicode_decimal": 58921
  }, {
    "icon_id": "24813790",
    "name": "checkbox",
    "font_class": "checkbox",
    "unicode": "e62b",
    "unicode_decimal": 58923
  }, {
    "icon_id": "24813791",
    "name": "checkbox-filled",
    "font_class": "checkbox-filled",
    "unicode": "e62c",
    "unicode_decimal": 58924
  }, {
    "icon_id": "24813794",
    "name": "shop",
    "font_class": "shop",
    "unicode": "e62f",
    "unicode_decimal": 58927
  }, {
    "icon_id": "24813795",
    "name": "headphones",
    "font_class": "headphones",
    "unicode": "e630",
    "unicode_decimal": 58928
  }, {
    "icon_id": "24813796",
    "name": "cart",
    "font_class": "cart",
    "unicode": "e631",
    "unicode_decimal": 58929
  }]
};
exports.default = _default;

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map