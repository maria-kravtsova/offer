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
        embeddedQ.classList.remove('embeddedQuikly__container--closing');
        embeddedQ.classList.add('embeddedQuikly__container--hidden');
        // e.target.remove();
        data.urlOnClose = document.getElementsByClassName('embeddedQuikly__iframe')[0].contentWindow.document.URL;
      });
    };

    var buildElements = function buildElements(elements) {
      return elements.map(function (element) {
        var createdElement = element.elementType === 'path' || element.elementType === 'svg' ? document.createElementNS('http://www.w3.org/2000/svg', element.elementType) : document.createElement(element.elementType);

        element.classNames && element.classNames.forEach(function (className) {
          createdElement.classList.add(className);
        });

        element.attributes && element.attributes.forEach(function (attr) {
          createdElement.setAttribute(attr.name, attr.value);
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
        elementType: 'svg',
        attributes: [{ name: 'width', value: '24' }, { name: 'height', value: '24' }, { name: 'viewBox', value: '0 0 24 24' }, { name: 'fill', value: '#83899e' }],
        pos: 3
      }, {
        elementType: 'div',
        classNames: ['embeddedQuikly__header'],
        pos: 4
      }, {
        elementType: 'path',
        attributes: [{
          name: 'd',
          value: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'
        }],
        pos: 5
      }, {
        elementType: 'path',
        attributes: [{
          name: 'd',
          value: 'M0 0h24v24H0z'
        }, {
          name: 'fill',
          value: 'none'
        }],
        pos: 6
      }]);

      var embeddedQ = elements[0];
      var iframe = elements[1];
      var closeButton = elements[2];
      var closeIcon = elements[3];
      var header = elements[4];
      var path = elements[5];
      var path2 = elements[6];

      closeButton.addEventListener('click', function () {
        closeWidget(embeddedQ);
      });

      appendElements([{ parent: embeddedQ, child: header }, { parent: closeIcon, child: path }, { parent: closeIcon, child: path2 }, { parent: closeButton, child: closeIcon }, { parent: embeddedQ, child: iframe }, { parent: embeddedQ, child: closeButton }, { parent: header, child: closeButton }]);

      iframe.setAttribute('src', data.urlOnClose ? data.urlOnClose : data.iframeSrc);
      iframe.setAttribute('sandbox', 'allow-forms allow-popups allow-pointer-lock allow-same-origin allow-scripts');

      return embeddedQ;
    };

    var launchEmbeddedQ = function launchEmbeddedQ() {
      if (document.getElementsByClassName('embeddedQuikly__container').length > 0) {
        return;
      }

      var embeddedQ = setupWidget();
      if (document.querySelectorAll('meta[name="viewport"]').length === 0) {
        var viewportTag = buildElements([{
          elementType: 'meta',
          attributes: [{ name: 'name', value: 'viewport' }, { name: 'id', value: 'quiklyViewport' }, {
            name: 'content',
            value: 'shrink-to-fit=no, width=device-width, initial-scale=1, maximum-scale=1'
          }]
        }])[0];
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(viewportTag);
      }

      document.body.appendChild(embeddedQ);
    };

    var buildPromoUrl = function buildPromoUrl(quiklyParams) {
      var baseURL = data.iframeSrc;

      if (quiklyParams['token']) {
        data.launchOnPageLoad = true;
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

      if (data.launchOnPageLoad) {
        launchEmbeddedQ();
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

      Object.keys(params).length > 0 && parseQuiklyParams(params);
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
      data.iframeSrc = 'http://www.quikly.com//' + data.dealId;

      getUrlParams();
    };

    init();
  })();

  /***/ })

  /******/ });
  //# sourceMappingURL=embed-20d9f42d876e187ff543.js.map