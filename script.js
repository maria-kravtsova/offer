/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/packs/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1520);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1520:
/*!***************************************!*\
  !*** ./app/javascript/packs/embed.js ***!
  \***************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

  (function () {
    var data = {};

    var appendElements = function appendElements(elements) {
      elements.forEach(function (element) {
        return element.parent.appendChild(element.child);
      });
    };

    var closeWidget = function closeWidget(embeddedQ) {
      embeddedQ.classList.add('embeddedQuikly__container--closing');

      embeddedQ.addEventListener('animationend', function (e) {
        e.target.remove();
      });
    };

    var buildElements = function buildElements(elements) {
      return elements.map(function (element) {
        var createdElement = document.createElement(element.elementType);

        element.classNames.forEach(function (className) {
          createdElement.classList.add(className);
        });

        return createdElement;
      });
    };

    var setupWidget = function setupWidget() {
      var elements = buildElements([{
        elementType: 'div',
        classNames: ['embeddedQuikly__container'],
        pos: 0
      }, {
        elementType: 'iframe',
        classNames: ['embeddedQuikly__iframe'],
        pos: 1
      }, {
        elementType: 'div',
        classNames: ['embeddedQuikly__exitButton'],
        pos: 2
      }, {
        elementType: 'i',
        classNames: ['material-icons', 'embeddedQuikly__exitIcon'],
        pos: 3
      }, {
        elementType: 'div',
        classNames: ['embeddedQuikly__header'],
        pos: 4
      }]);

      var embeddedQ = elements[0];
      var iframe = elements[1];
      var closeButton = elements[2];
      var closeIcon = elements[3];
      var header = elements[4];

      closeButton.addEventListener('click', function () {
        closeWidget(embeddedQ);
      });

      var text = document.createTextNode('clear');

      appendElements([{ parent: embeddedQ, child: header }, { parent: closeIcon, child: text }, { parent: closeButton, child: closeIcon }, { parent: embeddedQ, child: iframe }, { parent: embeddedQ, child: closeButton }, { parent: header, child: closeButton }]);

      iframe.setAttribute('src', data.iframeSrc);
      iframe.setAttribute('sandbox', 'allow-forms allow-popups allow-pointer-lock allow-same-origin allow-scripts');

      return embeddedQ;
    };

    var launchEmbeddedQ = function launchEmbeddedQ() {
      if (document.getElementsByClassName('embeddedQuikly__container').length > 0) {
        return;
      }

      var embeddedQ = setupWidget();
      document.body.appendChild(embeddedQ);
    };

    var buildPromoUrl = function buildPromoUrl(quiklyParams) {
      var baseURL = data.iframeSrc;

      if (quiklyParams['token']) {
        baseURL = baseURL + '/t/' + quiklyParams['token'];
        delete quiklyParams['token'];
      }

      baseURL += '?embedded=true';

      if (Object.keys(quiklyParams).length > 0) {
        data.launchOnPageLoad = true;
        for (key in quiklyParams) {
          baseURL += '&' + key + '=' + quiklyParams[key];
        }
      }

      data.iframeSrc = baseURL;

      if (baseURL !== data.iframeSrc) {
        data.launchOnPageLoad = true;
      }
    };

    var parseQuiklyParams = function parseQuiklyParams(urlParams) {
      quiklyParams = {};
      paramKeys = ['utm_campaign', 'utm_source', 'utm_medium', 'utm_content', 'utm_term', 'token'];
      Object.keys(urlParams).forEach(function (param) {
        if (paramKeys.includes(param)) {
          quiklyParams[param] = urlParams[param];
        }
      });

      buildPromoUrl(quiklyParams);
    };

    var getUrlParams = function getUrlParams() {
      var params = {};
      var search = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 1));
      var definitions = search.split('&');

      definitions.forEach(function (val) {
        var parts = val.split('=', 2);
        params[parts[0]] = parts[1];
      });

      params.length > 0 && parseQuiklyParams(params);
    };

    var attachListeners = function attachListeners() {
      var quiklyCtaButtons = Array.from(parent.document.querySelectorAll('[data-quikly-id]'));

      quiklyCtaButtons.forEach(function (button) {
        return button.addEventListener('click', function () {
          launchEmbeddedQ();
        });
      });

      return quiklyCtaButtons;
    };

    var exposePublicMethods = function exposePublicMethods() {
      var methods = [attachListeners];
      var qkly = {};

      methods.forEach(function (method) {
        var name = method.name;
        qkly[name] = method;
      });

      window.qkly = qkly;
    };

    var init = function init() {
      attachListeners();
      exposePublicMethods();

      var quiklyCtaButtons = attachListeners();

      data.dealId = quiklyCtaButtons[0].dataset.quiklyId || '';
      data.iframeSrc = 'https://www.quiklydemo.com//' + data.dealId;


      getUrlParams();
    };

    init();
  })();

  /***/ })

  /******/ });
  //# sourceMappingURL=embed-ef3b4808a3fee10feac1.js.map