var psExperiment_defines_defmethod = (function() {
  /* --- import symbols --- */

  /* --- define objects --- */
  function dispatchItem() {
      this.typeList = null;
      this.func = null;
      return this;
  };
  function makeDispatchItem() {
      var _js1687 = arguments.length;
      for (var n1686 = 0; n1686 < _js1687; n1686 += 2) {
          switch (arguments[n1686]) {
          case 'type-list':
              typeList = arguments[n1686 + 1];
              break;
          case 'func':
              func = arguments[n1686 + 1];
          };
      };
      var typeList;
      var func;
      var result = new dispatchItem();
      result.typeList = typeList;
      result.func = func;
      __PS_MV_REG = [];
      return result;
  };
  function dispatchItemP(obj) {
      return (obj instanceof dispatchItem);
  };
  if ('undefined' === typeof DISPATCHLISTTABLE) {
      var DISPATCHLISTTABLE = {  };
  };
  function instanceDispatchP(testInstance, targetType) {
      return targetType == null || (testInstance instanceof targetType);
  };
  /** Note: Used for dispatching in execution time */
  function instanceListDispatchP(testInstanceList, targetTypeList) {
      if (testInstanceList.length !== targetTypeList.length) {
          throw 'Message: ' + 'Failed assertion: ~A' + '; Args: ' + (testInstanceList.length === targetTypeList.length);
      };
      var _js1689 = testInstanceList.length;
      var _js1691 = targetTypeList.length;
      var FIRST1692 = true;
      for (var _js1688 = 0; _js1688 < _js1689; _js1688 += 1) {
          var testInstance = testInstanceList[_js1688];
          var _js1690 = FIRST1692 ? 0 : _js1690 + 1;
          if (_js1690 >= _js1691) {
              break;
          };
          var targetType = targetTypeList[_js1690];
          if (!instanceDispatchP(testInstance, targetType)) {
              __PS_MV_REG = [];
              return null;
          };
          FIRST1692 = null;
      };
      __PS_MV_REG = [];
      return true;
  };
  function typeDispatchP(testType, targetType) {
      __PS_MV_REG = [];
      return testType == null && targetType == null || testType != null && instanceDispatchP(new testType(), targetType);
  };
  /** Note: Used for definition */
  function typeListDispatchP(testTypeList, targetTypeList) {
      if (testTypeList.length !== targetTypeList.length) {
          throw 'Message: ' + 'Failed assertion: ~A' + '; Args: ' + (testTypeList.length === targetTypeList.length);
      };
      var _js1694 = testTypeList.length;
      var _js1696 = targetTypeList.length;
      var FIRST1697 = true;
      for (var _js1693 = 0; _js1693 < _js1694; _js1693 += 1) {
          var testType = testTypeList[_js1693];
          var _js1695 = FIRST1697 ? 0 : _js1695 + 1;
          if (_js1695 >= _js1696) {
              break;
          };
          var targetType = targetTypeList[_js1695];
          if (!typeDispatchP(testType, targetType)) {
              __PS_MV_REG = [];
              return null;
          };
          FIRST1697 = null;
      };
      __PS_MV_REG = [];
      return true;
  };
  function typePriorP(testType, targetType) {
      __PS_MV_REG = [];
      return testType !== targetType && typeDispatchP(testType, targetType);
  };
  function compareDispatchPrior(typeListA, typeListB) {
      if (typeListA.length !== typeListB.length) {
          throw 'Message: ' + 'Failed assertion: ~A' + '; Args: ' + (typeListA.length === typeListB.length);
      };
      for (var i = 0; i < typeListA.length; i += 1) {
          var typeA = typeListA[i];
          var typeB = typeListB[i];
          if (typePriorP(typeA, typeB)) {
              __PS_MV_REG = [];
              return -1;
          } else if (typePriorP(typeB, typeA)) {
              __PS_MV_REG = [];
              return 1;
          };
      };
      __PS_MV_REG = [];
      return 0;
  };
  function sortDispatchItemList(list) {
      __PS_MV_REG = [];
      return list.sort(function (a, b) {
          __PS_MV_REG = [];
          return compareDispatchPrior(a.typeList, b.typeList);
      });
  };
  function findDispatchFuncIndex(functionName, instanceList) {
      var _js1699 = arguments.length;
      for (var n1698 = 2; n1698 < _js1699; n1698 += 2) {
          switch (arguments[n1698]) {
          case 'from':
              from = arguments[n1698 + 1];
              break;
          case 'if-does-not-exist':
              ifDoesNotExist = arguments[n1698 + 1];
          };
      };
      var from = 'undefined' === typeof from ? 0 : from;
      var ifDoesNotExist = 'undefined' === typeof ifDoesNotExist ? 'error' : ifDoesNotExist;
      var dispatchItemList = DISPATCHLISTTABLE[functionName];
      if (!dispatchItemList) {
          throw 'Message: ' + 'There is no generic function \"~A\"' + '; Args: ' + functionName;
      };
      var _js1700 = dispatchItemList.length;
      for (var i = from; i < _js1700; i += 1) {
          var item = dispatchItemList[i];
          if (instanceListDispatchP(instanceList, item.typeList)) {
              __PS_MV_REG = [];
              return i;
          };
      };
      switch (ifDoesNotExist) {
      case 'error':
          throw 'Message: ' + 'Can\'t find a function for ~A' + '; Args: ' + instanceList;
      default:
          __PS_MV_REG = [];
          return null;
      };
  };
  function getDispatchFunc(functionName, index) {
      return DISPATCHLISTTABLE[functionName][index].func;
  };
  function sameTypeListP(typeListA, typeListB) {
      if (typeListA.length !== typeListB.length) {
          return null;
      };
      for (var i = 0; i < typeListA.length; i += 1) {
          if (typeListA[i] !== typeListB[i]) {
              return null;
          };
      };
      return true;
  };
  function pushDispatchFunc(functionName, typeList, func) {
      DISPATCHLISTTABLE[functionName] = DISPATCHLISTTABLE[functionName].filter(function (item) {
          __PS_MV_REG = [];
          return !sameTypeListP(item.typeList, typeList);
      });
      DISPATCHLISTTABLE[functionName].unshift(makeDispatchItem('type-list', typeList, 'func', func));
      DISPATCHLISTTABLE[functionName];
      __PS_MV_REG = [];
      return sortDispatchItemList(DISPATCHLISTTABLE[functionName]);
  };
  /* --- extern symbols --- */
  return {
    '_internal': {
      'dispatchItem': dispatchItem,
      'makeDispatchItem': makeDispatchItem,
      'dispatchItemP': dispatchItemP,
      'DISPATCHLISTTABLE': DISPATCHLISTTABLE,
      'instanceDispatchP': instanceDispatchP,
      'instanceListDispatchP': instanceListDispatchP,
      'typeDispatchP': typeDispatchP,
      'typeListDispatchP': typeListDispatchP,
      'typePriorP': typePriorP,
      'compareDispatchPrior': compareDispatchPrior,
      'sortDispatchItemList': sortDispatchItemList,
      'findDispatchFuncIndex': findDispatchFuncIndex,
      'getDispatchFunc': getDispatchFunc,
      'sameTypeListP': sameTypeListP,
      'pushDispatchFunc': pushDispatchFunc,
    }
  };
})();

var clWeb2dGame_utils_domManager = (function() {
  /* --- import symbols --- */

  /* --- define objects --- */
  if ('undefined' === typeof DOMSTORE) {
      var DOMSTORE = {  };
  };
  /* --- extern symbols --- */
  return {
    '_internal': {
      'DOMSTORE': DOMSTORE,
    }
  };
})();

var clWeb2dGame_utils_storage = (function() {
  /* --- import symbols --- */

  /* --- define objects --- */
  if ('undefined' === typeof STORAGEPREFIX) {
      var STORAGEPREFIX = '';
  };
  function setKvsPrefix(prefix) {
      return STORAGEPREFIX = prefix;
  };
  function addPrefix(key) {
      return STORAGEPREFIX + key;
  };
  function storeKvs(key, value) {
      __PS_MV_REG = [];
      return localStorage.setItem(addPrefix(key), value);
  };
  function readKvs(key) {
      __PS_MV_REG = [];
      return localStorage.getItem(addPrefix(key));
  };
  function removeKvs(key) {
      __PS_MV_REG = [];
      return localStorage.removeItem(addPrefix(key));
  };
  function clearKvsAll() {
      __PS_MV_REG = [];
      return localStorage.clear();
  };
  /* --- extern symbols --- */
  return {
    'setKvsPrefix': setKvsPrefix,
    'storeKvs': storeKvs,
    'readKvs': readKvs,
    'removeKvs': removeKvs,
    'clearKvsAll': clearKvsAll,
    '_internal': {
      'STORAGEPREFIX': STORAGEPREFIX,
      'addPrefix': addPrefix,
    }
  };
})();

var clWeb2dGame_utils_stageGenerator = (function() {
  /* --- import symbols --- */

  /* --- define objects --- */
  function element() {
      this.time = 0;
      this.func = function () {
          return null;
      };
      return this;
  };
  function makeElement() {
      var _js1702 = arguments.length;
      for (var n1701 = 0; n1701 < _js1702; n1701 += 2) {
          switch (arguments[n1701]) {
          case 'time':
              time = arguments[n1701 + 1];
              break;
          case 'func':
              func = arguments[n1701 + 1];
          };
      };
      var time = 'undefined' === typeof time ? 0 : time;
      var func = 'undefined' === typeof func ? function () {
          return null;
      } : func;
      var result = new element();
      result.time = time;
      result.func = func;
      __PS_MV_REG = [];
      return result;
  };
  function elementP(obj) {
      return (obj instanceof element);
  };
  function interpreter() {
      this.func = null;
      this.includeList = null;
      return this;
  };
  function makeInterpreter() {
      var _js1704 = arguments.length;
      for (var n1703 = 0; n1703 < _js1704; n1703 += 2) {
          switch (arguments[n1703]) {
          case 'func':
              func = arguments[n1703 + 1];
              break;
          case 'include-list':
              includeList = arguments[n1703 + 1];
          };
      };
      var func;
      var includeList;
      var result = new interpreter();
      result.func = func;
      result.includeList = includeList;
      __PS_MV_REG = [];
      return result;
  };
  function interpreterP(obj) {
      return (obj instanceof interpreter);
  };
  function stage() {
      this.currentTime = 0;
      this.elementList = [];
      return this;
  };
  function makeStage() {
      var _js1706 = arguments.length;
      for (var n1705 = 0; n1705 < _js1706; n1705 += 2) {
          switch (arguments[n1705]) {
          case 'current-time':
              currentTime = arguments[n1705 + 1];
              break;
          case 'element-list':
              elementList = arguments[n1705 + 1];
          };
      };
      var currentTime = 'undefined' === typeof currentTime ? 0 : currentTime;
      var elementList = 'undefined' === typeof elementList ? [] : elementList;
      var result = new stage();
      result.currentTime = currentTime;
      result.elementList = elementList;
      __PS_MV_REG = [];
      return result;
  };
  function stageP(obj) {
      return (obj instanceof stage);
  };
  function processStage(stage) {
      var deleteExpired = function () {
          if (stage.elementList.length > 0 && stage.currentTime > stage.elementList[0].time) {
              stage.elementList = stage.elementList.slice(1);
              __PS_MV_REG = [];
              return deleteExpired();
          };
      };
      deleteExpired();
      var processCurrent = function () {
          if (stage.elementList.length > 0 && stage.currentTime === stage.elementList[0].time) {
              stage.elementList[0].func();
              stage.elementList = stage.elementList.slice(1);
              __PS_MV_REG = [];
              return processCurrent();
          };
      };
      processCurrent();
      __PS_MV_REG = [];
      return ++stage.currentTime;
  };
  function addElementToStage(stage, time, func) {
      var gSequence1707;
      var gKey1708;
      stage.elementList.unshift(makeElement('time', time, 'func', func));
      stage.elementList;
      __PS_MV_REG = [];
      return stage.elementList = (gSequence1707 = stage.elementList, gKey1708 = null, (gSequence1707.sort(function (a, b) {
          var keyA = a;
          var keyB = b;
          return (function (a, b) {
              return a.time < b.time;
          })(keyA, keyB) ? -1 : 1;
      }), gSequence1707));
  };
  if ('undefined' === typeof STAGEELEMENTINTERPRETERTABLE) {
      var STAGEELEMENTINTERPRETERTABLE = {  };
  };
  function getStageElementInterpreterTable() {
      return STAGEELEMENTINTERPRETERTABLE;
  };
  function registerStageElementInterpreter(name, func, includeList) {
      __PS_MV_REG = [];
      return getStageElementInterpreterTable()[name] = makeInterpreter('func', func, 'include-list', includeList);
  };
  function interpretElementpercentpercent(stage, kind, args, immediateP) {
      var interpreter = getStageElementInterpreterTable()[kind];
      __PS_MV_REG = [];
      return interpreter.func(stage, args, immediateP);
  };
  function generateStagepercent(resultStage, defList) {
      __PS_MV_REG = [];
      return defList.map(function (def) {
          __PS_MV_REG = [];
          return keywordp(def[0]) ? interpretElementpercent(resultStage, def[0], def.slice(1)) : quasiquote(null);
      });
  };
  registerStageElementInterpreter('general', function (stage0, args1, immediateP2) {
      return (function () {
          var _js1710 = arguments.length;
          for (var n1709 = 0; n1709 < _js1710; n1709 += 2) {
              switch (arguments[n1709]) {
              case 'time':
                  time = arguments[n1709 + 1];
                  break;
              case 'func':
                  func = arguments[n1709 + 1];
              };
          };
          var time;
          var func;
          __PS_MV_REG = [];
          return immediateP2 ? func() : addElementToStage(stage0, time, function () {
              return func();
          });
      }).apply(this, args1);
  }, []);
  /* --- extern symbols --- */
  return {
    'stage': stage,
    'processStage': processStage,
    '_internal': {
      'element': element,
      'makeElement': makeElement,
      'elementP': elementP,
      'interpreter': interpreter,
      'makeInterpreter': makeInterpreter,
      'interpreterP': interpreterP,
      'makeStage': makeStage,
      'stageP': stageP,
      'addElementToStage': addElementToStage,
      'STAGEELEMENTINTERPRETERTABLE': STAGEELEMENTINTERPRETERTABLE,
      'getStageElementInterpreterTable': getStageElementInterpreterTable,
      'registerStageElementInterpreter': registerStageElementInterpreter,
      'interpretElementpercentpercent': interpretElementpercentpercent,
      'generateStagepercent': generateStagepercent,
    }
  };
})();

var clPsEcs_utils = (function() {
  /* --- import symbols --- */

  /* --- define objects --- */
  function includesAllComponentTypes(targetComponentTypes, components) {
      __PS_MV_REG = [];
      return targetComponentTypes.every(function (type) {
          __PS_MV_REG = [];
          return components.some(function (comp) {
              __PS_MV_REG = [];
              return (comp instanceof (typeof type === 'string' ? eval(type) : type));
          });
      });
  };
  function callEcsHooks(object, type, isAdded, hooks) {
      if (!((object instanceof (typeof type === 'string' ? eval(type) : type)))) {
          throw '\'TYPE-ERROR: (EXPECTED-TYPE TYPE DATUM OBJECT)';
      };
      for (var callback = null, _js_idx1711 = 0; _js_idx1711 < hooks.length; _js_idx1711 += 1) {
          callback = hooks[_js_idx1711];
          callback(object, isAdded);
      };
  };
  /* --- extern symbols --- */
  return {
    'includesAllComponentTypes': includesAllComponentTypes,
    'callEcsHooks': callEcsHooks,
    '_internal': {
    }
  };
})();

var clPsEcs_basicProcess = (function() {
  /* --- import symbols --- */

  /* --- define objects --- */
  function funcWithPred() {
      this.func = null;
      this.pred = null;
      this.restTimeoutFrame = null;
      this.name = null;
      return this;
  };
  function makeFuncWithPred() {
      var _js1713 = arguments.length;
      for (var n1712 = 0; n1712 < _js1713; n1712 += 2) {
          switch (arguments[n1712]) {
          case 'func':
              func = arguments[n1712 + 1];
              break;
          case 'pred':
              pred = arguments[n1712 + 1];
              break;
          case 'rest-timeout-frame':
              restTimeoutFrame = arguments[n1712 + 1];
              break;
          case 'name':
              name = arguments[n1712 + 1];
          };
      };
      var func;
      var pred;
      var restTimeoutFrame;
      var name;
      var result = new funcWithPred();
      result.func = func;
      result.pred = pred;
      result.restTimeoutFrame = restTimeoutFrame;
      result.name = name;
      __PS_MV_REG = [];
      return result;
  };
  function funcWithPredP(obj) {
      return (obj instanceof funcWithPred);
  };
  if ('undefined' === typeof FUNCWITHPREDLIST) {
      var FUNCWITHPREDLIST = [];
  };
  function executeAllRegisteredFuncsWithPred() {
      var copy1716;
      var copy1719;
      var executedList = [];
      for (var funcWithPred = null, _js_arrvar1715 = (copy1716 = FUNCWITHPREDLIST.concat(), copy1716.reverse()), _js_idx1714 = 0; _js_idx1714 < _js_arrvar1715.length; _js_idx1714 += 1) {
          funcWithPred = _js_arrvar1715[_js_idx1714];
          if (funcWithPred.pred()) {
              funcWithPred.func();
              executedList.unshift(funcWithPred);
              executedList;
          } else {
              if (funcWithPred.restTimeoutFrame > 0) {
                  --funcWithPred.restTimeoutFrame;
                  if (funcWithPred.restTimeoutFrame === 0) {
                      throw 'Message: ' + 'The function with predication \"~A\" ends with timeout' + '; Args: ' + funcWithPred.name;
                  };
              };
          };
      };
      for (var executed = null, _js_idx1717 = 0; _js_idx1717 < executedList.length; _js_idx1717 += 1) {
          executed = executedList[_js_idx1717];
          FUNCWITHPREDLIST = (copy1719 = FUNCWITHPREDLIST, copy1719.filter(function (x) {
              return !(function (target1718) {
                  return executed === target1718;
              })(x);
          }));
      };
  };
  /**
   * Register a function that will be executed when the predication function return true in first of a frame.
   * The name is not used in the process but it is useful for debug.
   */
  function registerFuncWithPred(func, pred) {
      var _js1719 = arguments.length;
      for (var n1718 = 2; n1718 < _js1719; n1718 += 2) {
          switch (arguments[n1718]) {
          case 'timeout-frame':
              timeoutFrame = arguments[n1718 + 1];
              break;
          case 'name':
              name = arguments[n1718 + 1];
          };
      };
      var timeoutFrame = 'undefined' === typeof timeoutFrame ? -1 : timeoutFrame;
      var name = 'undefined' === typeof name ? '' : name;
      FUNCWITHPREDLIST.unshift(makeFuncWithPred('func', func, 'pred', pred, 'rest-timeout-frame', timeoutFrame, 'name', name));
      __PS_MV_REG = [];
      return FUNCWITHPREDLIST;
  };
  /**
   * Register a function with no argument that is executed N frames after.
   * Ex. If delayed-frames is 1, it will be executed in its next frame. If 2, executed in its next after next frame.
   */
  function registerNframesAfterFunc(func, delayedFrames) {
      var restTime = delayedFrames;
      __PS_MV_REG = [];
      return registerFuncWithPred(func, function () {
          --restTime;
          return restTime <= 0;
      });
  };
  /**
   * Register a function with no argument that is executed in first of next frame.
   * Note: Some functions (Ex. add or delete resource) can cause troublesome problems if it is executed in frame. Use this wrapper when executing such functions.
   */
  function registerNextFrameFunc(func) {
      __PS_MV_REG = [];
      return registerNframesAfterFunc(func, 0);
  };
  function executeEcsBasicProcess() {
      __PS_MV_REG = [];
      return executeAllRegisteredFuncsWithPred();
  };
  function cleanEcsBasicProcess() {
      return FUNCWITHPREDLIST = [];
  };
  /* --- extern symbols --- */
  return {
    'registerFuncWithPred': registerFuncWithPred,
    'registerNframesAfterFunc': registerNframesAfterFunc,
    'registerNextFrameFunc': registerNextFrameFunc,
    'executeEcsBasicProcess': executeEcsBasicProcess,
    'cleanEcsBasicProcess': cleanEcsBasicProcess,
    '_internal': {
      'funcWithPred': funcWithPred,
      'makeFuncWithPred': makeFuncWithPred,
      'funcWithPredP': funcWithPredP,
      'FUNCWITHPREDLIST': FUNCWITHPREDLIST,
      'executeAllRegisteredFuncsWithPred': executeAllRegisteredFuncsWithPred,
    }
  };
})();

var clPsEcs_framePromise = (function() {
  /* --- import symbols --- */
  var registerNframesAfterFunc = clPsEcs_basicProcess.registerNframesAfterFunc;
  var registerFuncWithPred = clPsEcs_basicProcess.registerFuncWithPred;
  var cleanEcsBasicProcess = clPsEcs_basicProcess.cleanEcsBasicProcess;
  var registerNextFrameFunc = clPsEcs_basicProcess.registerNextFrameFunc;
  var executeEcsBasicProcess = clPsEcs_basicProcess.executeEcsBasicProcess;
  /* --- define objects --- */
  function framePromise() {
      this.result = null;
      this.resolvedP = null;
      return this;
  };
  function makeFramePromise() {
      var _js1721 = arguments.length;
      for (var n1720 = 0; n1720 < _js1721; n1720 += 2) {
          switch (arguments[n1720]) {
          case 'result':
              result = arguments[n1720 + 1];
              break;
          case 'resolved-p':
              resolvedP = arguments[n1720 + 1];
          };
      };
      var result;
      var resolvedP;
      var result = new framePromise();
      result.result = result;
      result.resolvedP = resolvedP;
      __PS_MV_REG = [];
      return result;
  };
  function framePromiseP(obj) {
      return (obj instanceof framePromise);
  };
  function framePromiseResolve(promise, resultValue) {
      promise.result = resultValue;
      return promise.resolvedP = true;
  };
  /** Initialize a frame-promise. The callback accepts a function "resolve". It should be called after the process is done with its return value. */
  function initFramePromise(callback) {
      var promise = makeFramePromise();
      callback(function (value) {
          __PS_MV_REG = [];
          return framePromiseResolve(promise, value);
      });
      __PS_MV_REG = [];
      return promise;
  };
  /** Register the callback as a following promise of the promise. The callback is invoked after the promise is resolved. Then, it accepts a return value of the promise. */
  function framePromiseThen(promise, callback) {
      var _js1723 = arguments.length;
      for (var n1722 = 2; n1722 < _js1723; n1722 += 2) {
          switch (arguments[n1722]) {
          case 'timeout-frame':
              timeoutFrame = arguments[n1722 + 1];
          };
      };
      var timeoutFrame = 'undefined' === typeof timeoutFrame ? -1 : timeoutFrame;
      var promiseNew = makeFramePromise();
      registerFuncWithPred(function () {
          __PS_MV_REG = [];
          return framePromiseResolve(promiseNew, callback(promise.result));
      }, function () {
          return promise.resolvedP;
      }, 'timeout-frame', timeoutFrame);
      __PS_MV_REG = [];
      return promiseNew;
  };
  /** Register the callback as a following promise of the promise list. The callback is invoked after all of the promise are resolved. Then, it accepts a return value list of the promises. */
  function framePromiseAll(promiseList, callback) {
      var _js1725 = arguments.length;
      for (var n1724 = 2; n1724 < _js1725; n1724 += 2) {
          switch (arguments[n1724]) {
          case 'timeout-frame':
              timeoutFrame = arguments[n1724 + 1];
          };
      };
      var timeoutFrame = 'undefined' === typeof timeoutFrame ? -1 : timeoutFrame;
      var promiseNew = makeFramePromise();
      registerFuncWithPred(function () {
          __PS_MV_REG = [];
          return framePromiseResolve(promiseNew, callback(promiseList.map(function (promise) {
              return promise.result;
          })));
      }, function () {
          __PS_MV_REG = [];
          return promiseList.every(function (promise) {
              return promise.resolvedP != null;
          });
      }, 'timeout-frame', timeoutFrame);
      __PS_MV_REG = [];
      return promiseNew;
  };
  /* --- extern symbols --- */
  return {
    'framePromise': framePromise,
    'framePromiseP': framePromiseP,
    'initFramePromise': initFramePromise,
    'framePromiseThen': framePromiseThen,
    'framePromiseAll': framePromiseAll,
    '_internal': {
      'makeFramePromise': makeFramePromise,
      'framePromiseResolve': framePromiseResolve,
    }
  };
})();

var clPsEcs_flatTree = (function() {
  /* --- import symbols --- */

  /* --- define objects --- */
  function flatTreeNode() {
      this.parent = null;
      this.children = [];
      this.registerp = null;
      return this;
  };
  function makeFlatTreeNode() {
      var _js1727 = arguments.length;
      for (var n1726 = 0; n1726 < _js1727; n1726 += 2) {
          switch (arguments[n1726]) {
          case 'parent':
              parent = arguments[n1726 + 1];
              break;
          case 'children':
              children = arguments[n1726 + 1];
              break;
          case 'registerp':
              registerp = arguments[n1726 + 1];
          };
      };
      var parent;
      var children = 'undefined' === typeof children ? [] : children;
      var registerp;
      var result = new flatTreeNode();
      result.parent = parent;
      result.children = children;
      result.registerp = registerp;
      __PS_MV_REG = [];
      return result;
  };
  function flatTreeNodeP(obj) {
      return (obj instanceof flatTreeNode);
  };
  /**
   * Add a flat-tree node to the lst.
   * Because this function can destruct the lst, caller should overwrite lst by new returned list.
   */
  function addFlatTreeNode(node, lst, parent) {
      if (!((node instanceof (typeof flatTreeNode === 'string' ? eval(flatTreeNode) : flatTreeNode)))) {
          throw '\'TYPE-ERROR: (The place is \'NODE\'. The expected type is \'FLAT-TREE-NODE\')';
      };
      if (node.registerp) {
          throw 'The node is already registered.';
      };
      if (parent) {
          if (!((parent instanceof (typeof flatTreeNode === 'string' ? eval(flatTreeNode) : flatTreeNode)))) {
              throw '\'TYPE-ERROR: (The place is \'PARENT\'. The expected type is \'FLAT-TREE-NODE\')';
          };
          if (!parent.registerp) {
              throw 'The parent is not registered';
          };
      };
      if (parent) {
          node.parent = parent;
          parent.children.unshift(node);
          parent.children;
      };
      var rec = function (oneNode) {
          if (!oneNode.registerp) {
              lst.unshift(oneNode);
              lst;
              oneNode.registerp = true;
              for (var child = null, _js_arrvar1729 = oneNode.children, _js_idx1728 = 0; _js_idx1728 < _js_arrvar1729.length; _js_idx1728 += 1) {
                  child = _js_arrvar1729[_js_idx1728];
                  rec(child);
              };
          };
      };
      rec(node);
      __PS_MV_REG = [];
      return lst;
  };
  function execNothing() {
      var _ = Array.prototype.slice.call(arguments, 0);
  };
  /**
   * Delete a flat-tree node from the place-lst.
   * Because this function destruct the place-lst, caller should overwrite place-lst by new returned list.
   */
  function deleteFlatTreeNode(node, placeLst, callback) {
      var copy1731;
      if (callback === undefined) {
          callback = execNothing;
      };
      if (!((node instanceof (typeof flatTreeNode === 'string' ? eval(flatTreeNode) : flatTreeNode)))) {
          throw '\'TYPE-ERROR: (The place is \'NODE\'. The expected type is \'FLAT-TREE-NODE\')';
      };
      if (!node.registerp) {
          throw 'Can\'t delete a not-registered flat-node';
      };
      if (node.parent) {
          node.parent.children = (copy1731 = node.parent.children, copy1731.filter(function (x) {
              return !(function (target1730) {
                  return node === target1730;
              })(x);
          }));
          node.parent = null;
      };
      var rec = function (oneNode, lst) {
          var copy1733;
          if (oneNode.registerp) {
              var removedLst = (copy1733 = lst, copy1733.filter(function (x) {
                  return !(function (target1732) {
                      return oneNode === target1732;
                  })(x);
              }));
              callback(oneNode);
              oneNode.registerp = null;
              for (var child = null, _js_arrvar1735 = oneNode.children, _js_idx1734 = 0; _js_idx1734 < _js_arrvar1735.length; _js_idx1734 += 1) {
                  child = _js_arrvar1735[_js_idx1734];
                  removedLst = rec(child, removedLst);
              };
              __PS_MV_REG = [];
              return removedLst;
          } else {
              __PS_MV_REG = [];
              return lst;
          };
      };
      __PS_MV_REG = [];
      return rec(node, placeLst);
  };
  /**
   * Delete a flat-tree node that becomes true in the predicate from the place-lst.
   * Because this function destruct the place-lst, caller should overwrite place-lst by new returned list.
   * Note: When parent and child are deleted at the same time, it is not guaranteed that their relationship is kept or not.
   */
  function deleteFlatTreeNodeIf(predicate, placeLst, callback) {
      if (callback === undefined) {
          callback = execNothing;
      };
      var deleteLst = [];
      for (var node = null, _js_idx1736 = 0; _js_idx1736 < placeLst.length; _js_idx1736 += 1) {
          node = placeLst[_js_idx1736];
          if (predicate(node)) {
              deleteLst.unshift(node);
              deleteLst;
          };
      };
      for (var node = null, _js_idx1737 = 0; _js_idx1737 < deleteLst.length; _js_idx1737 += 1) {
          node = deleteLst[_js_idx1737];
          if (node.registerp) {
              placeLst = deleteFlatTreeNode(node, placeLst, callback);
          };
      };
      __PS_MV_REG = [];
      return placeLst;
  };
  /** Move a flat-tree node under a new-parent. */
  function moveFlatTreeNode(node, newParent) {
      var copy1741;
      if (!((node instanceof (typeof flatTreeNode === 'string' ? eval(flatTreeNode) : flatTreeNode)))) {
          throw '\'TYPE-ERROR: (The place is \'NODE\'. The expected type is \'FLAT-TREE-NODE\')';
      };
      if (newParent) {
          if (!((newParent instanceof (typeof flatTreeNode === 'string' ? eval(flatTreeNode) : flatTreeNode)))) {
              throw '\'TYPE-ERROR: (The place is \'NEW-PARENT\'. The expected type is \'FLAT-TREE-NODE\')';
          };
      };
      var oldParent = node.parent;
      node.parent = newParent;
      if (newParent) {
          newParent.children.unshift(node);
          newParent.children;
      };
      if (oldParent) {
          __PS_MV_REG = [];
          return oldParent.children = (copy1741 = oldParent.children, copy1741.filter(function (x) {
              return !(function (target1740) {
                  return node === target1740;
              })(x);
          }));
      };
  };
  /* --- extern symbols --- */
  return {
    'flatTreeNode': flatTreeNode,
    'makeFlatTreeNode': makeFlatTreeNode,
    'flatTreeNodeP': flatTreeNodeP,
    'deleteFlatTreeNode': deleteFlatTreeNode,
    'deleteFlatTreeNodeIf': deleteFlatTreeNodeIf,
    'moveFlatTreeNode': moveFlatTreeNode,
    '_internal': {
      'addFlatTreeNode': addFlatTreeNode,
      'execNothing': execNothing,
    }
  };
})();

var clPsEcs_ecs = (function() {
  /* --- import symbols --- */
  var moveFlatTreeNode = clPsEcs_flatTree.moveFlatTreeNode;
  var flatTreeNodeP = clPsEcs_flatTree.flatTreeNodeP;
  var deleteFlatTreeNodeIf = clPsEcs_flatTree.deleteFlatTreeNodeIf;
  var makeFlatTreeNode = clPsEcs_flatTree.makeFlatTreeNode;
  var deleteFlatTreeNode = clPsEcs_flatTree.deleteFlatTreeNode;
  var flatTreeNode = clPsEcs_flatTree.flatTreeNode;
  var registerNframesAfterFunc = clPsEcs_basicProcess.registerNframesAfterFunc;
  var registerFuncWithPred = clPsEcs_basicProcess.registerFuncWithPred;
  var cleanEcsBasicProcess = clPsEcs_basicProcess.cleanEcsBasicProcess;
  var registerNextFrameFunc = clPsEcs_basicProcess.registerNextFrameFunc;
  var executeEcsBasicProcess = clPsEcs_basicProcess.executeEcsBasicProcess;
  var callEcsHooks = clPsEcs_utils.callEcsHooks;
  var includesAllComponentTypes = clPsEcs_utils.includesAllComponentTypes;
  var includesAllComponentTypes = clPsEcs_utils.includesAllComponentTypes;
  /* --- define objects --- */
  function ecsComponent() {
      this.parent = null;
      this.children = [];
      this.registerp = null;
      return this;
  };
  function makeEcsComponent() {
      var _js1743 = arguments.length;
      for (var n1742 = 0; n1742 < _js1743; n1742 += 2) {
          switch (arguments[n1742]) {
          case 'parent':
              parent = arguments[n1742 + 1];
              break;
          case 'children':
              children = arguments[n1742 + 1];
              break;
          case 'registerp':
              registerp = arguments[n1742 + 1];
          };
      };
      var parent;
      var children = 'undefined' === typeof children ? [] : children;
      var registerp;
      var result = new ecsComponent();
      result.parent = parent;
      result.children = children;
      result.registerp = registerp;
      __PS_MV_REG = [];
      return result;
  };
  function ecsComponentP(obj) {
      return (obj instanceof ecsComponent);
  };
  (function () {
      var tempCtor = function () {
          return null;
      };
      tempCtor.prototype = flatTreeNode.prototype;
      ecsComponent.superClass_ = flatTreeNode.prototype;
      ecsComponent.prototype = new tempCtor();
      __PS_MV_REG = [];
      return ecsComponent.prototype.constructor = ecsComponent;
  })();
  /** Find a component from top-component and its descendant by predicate */
  function findAComponent(predicate, topComponent) {
      try {
          if (!((topComponent instanceof (typeof ecsComponent === 'string' ? eval(ecsComponent) : ecsComponent)))) {
              throw '\'TYPE-ERROR: (The place is \'TOP-COMPONENT\'. The expected type is \'ECS-COMPONENT\')';
          };
          if (!((topComponent instanceof (typeof flatTreeNode === 'string' ? eval(flatTreeNode) : flatTreeNode)))) {
              throw '\'TYPE-ERROR: (The place is \'TOP-COMPONENT\'. The expected type is \'FLAT-TREE-NODE\')';
          };
          var rec1108 = function (comp) {
              if (predicate(comp)) {
                  __PS_MV_REG = [];
                  throw { '__ps_block_tag' : 'findAComponent', '__ps_value' : comp };
              };
              for (var child = null, _js_arrvar1745 = comp.children, _js_idx1744 = 0; _js_idx1744 < _js_arrvar1745.length; _js_idx1744 += 1) {
                  child = _js_arrvar1745[_js_idx1744];
                  rec1108(child);
              };
          };
          rec1108(topComponent);
          __PS_MV_REG = [];
          return null;
      } catch (_ps_err1746) {
          if (_ps_err1746 && 'findAComponent' === _ps_err1746['__ps_block_tag']) {
              return _ps_err1746['__ps_value'];
          } else {
              throw _ps_err1746;
          };
      };
  };
  if ('undefined' === typeof ENTITYIDCOUNTER) {
      var ENTITYIDCOUNTER = 0;
  };
  function ecsEntity() {
      this.parent = null;
      this.children = [];
      this.registerp = null;
      this.id = ++ENTITYIDCOUNTER;
      this.tags = {  };
      this.components = [];
      return this;
  };
  function makeEcsEntity() {
      var _js1748 = arguments.length;
      for (var n1747 = 0; n1747 < _js1748; n1747 += 2) {
          switch (arguments[n1747]) {
          case 'parent':
              parent = arguments[n1747 + 1];
              break;
          case 'children':
              children = arguments[n1747 + 1];
              break;
          case 'registerp':
              registerp = arguments[n1747 + 1];
              break;
          case 'id':
              id = arguments[n1747 + 1];
              break;
          case 'tags':
              tags = arguments[n1747 + 1];
              break;
          case 'components':
              components = arguments[n1747 + 1];
          };
      };
      var parent;
      var children = 'undefined' === typeof children ? [] : children;
      var registerp;
      var id = 'undefined' === typeof id ? ++ENTITYIDCOUNTER : id;
      var tags = 'undefined' === typeof tags ? {  } : tags;
      var components = 'undefined' === typeof components ? [] : components;
      var result = new ecsEntity();
      result.parent = parent;
      result.children = children;
      result.registerp = registerp;
      result.id = id;
      result.tags = tags;
      result.components = components;
      __PS_MV_REG = [];
      return result;
  };
  function ecsEntityP(obj) {
      return (obj instanceof ecsEntity);
  };
  (function () {
      var tempCtor = function () {
          return null;
      };
      tempCtor.prototype = flatTreeNode.prototype;
      ecsEntity.superClass_ = flatTreeNode.prototype;
      ecsEntity.prototype = new tempCtor();
      __PS_MV_REG = [];
      return ecsEntity.prototype.constructor = ecsEntity;
  })();
  if ('undefined' === typeof ENTITYLIST) {
      var ENTITYLIST = [];
  };
  function getEntityList() {
      return ENTITYLIST;
  };
  function cleanEcsEntities() {
      for (var entity = null, _js_arrvar1750 = getEntityList(), _js_idx1749 = 0; _js_idx1749 < _js_arrvar1750.length; _js_idx1749 += 1) {
          entity = _js_arrvar1750[_js_idx1749];
          entity.registerp = null;
      };
      __PS_MV_REG = [];
      return ENTITYLIST = [];
  };
  /** Get a component from entity by component-type */
  function getEcsComponent(componentType, entity) {
      for (var x1751 = null, _js_arrvar1753 = entity.components, _js_idx1752 = 0; _js_idx1752 < _js_arrvar1753.length; _js_idx1752 += 1) {
          x1751 = _js_arrvar1753[_js_idx1752];
          if ((function (component) {
              __PS_MV_REG = [];
              return (component instanceof (typeof componentType === 'string' ? eval(componentType) : componentType));
          })(x1751)) {
              return x1751;
          };
      };
  };
  /** Find a registered entity by predicate */
  function findAEntity(predicate) {
      for (var entity = null, _js_arrvar1755 = getEntityList(), _js_idx1754 = 0; _js_idx1754 < _js_arrvar1755.length; _js_idx1754 += 1) {
          entity = _js_arrvar1755[_js_idx1754];
          if (predicate(entity)) {
              __PS_MV_REG = [];
              return entity;
          };
      };
      __PS_MV_REG = [];
      return null;
  };
  /** Find a registered entity by comparing the address */
  function findTheEntity(entity) {
      return entity.registerp ? entity : null;
  };
  function checkTagType(tag) {
      if (typeof tag !== 'string') {
          throw '\'TYPE-ERROR: (The place is \'TAG\'. The expected type is \'STRING\')';
      };
  };
  function addEntityTag(entity) {
      var tags = Array.prototype.slice.call(arguments, 1);
      if (!((entity instanceof (typeof ecsEntity === 'string' ? eval(ecsEntity) : ecsEntity)))) {
          throw '\'TYPE-ERROR: (The place is \'ENTITY\'. The expected type is \'ECS-ENTITY\')';
      };
      for (var tag = null, _js_idx1756 = 0; _js_idx1756 < tags.length; _js_idx1756 += 1) {
          tag = tags[_js_idx1756];
          checkTagType(tag);
          entity.tags[tag] = true;
      };
  };
  function deleteEntityTag(entity, tag) {
      if (!((entity instanceof (typeof ecsEntity === 'string' ? eval(ecsEntity) : ecsEntity)))) {
          throw '\'TYPE-ERROR: (The place is \'ENTITY\'. The expected type is \'ECS-ENTITY\')';
      };
      checkTagType(tag);
      var result = tag in entity.tags;
      delete entity.tags[tag];
      __PS_MV_REG = [];
      return result;
  };
  function hasEntityTag(entity, tag) {
      if (!((entity instanceof (typeof ecsEntity === 'string' ? eval(ecsEntity) : ecsEntity)))) {
          throw '\'TYPE-ERROR: (The place is \'ENTITY\'. The expected type is \'ECS-ENTITY\')';
      };
      checkTagType(tag);
      __PS_MV_REG = [];
      return entity.tags[tag];
  };
  function checkEntityTags(entity) {
      var tags = Array.prototype.slice.call(arguments, 1);
      for (var tag = null, _js_idx1757 = 0; _js_idx1757 < tags.length; _js_idx1757 += 1) {
          tag = tags[_js_idx1757];
          if (!hasEntityTag(entity, tag)) {
              throw 'Message: ' + 'The entity has not a tag \'~A\'.' + '; Args: ' + tag;
          };
      };
      __PS_MV_REG = [];
      return true;
  };
  function findAEntityByTag(tag) {
      checkTagType(tag);
      __PS_MV_REG = [];
      return findAEntity(function (entity) {
          __PS_MV_REG = [];
          return hasEntityTag(entity, tag);
      });
  };
  if ('undefined' === typeof ECSSYSTEMLIST) {
      var ECSSYSTEMLIST = [];
  };
  function getEcsSystemList() {
      return ECSSYSTEMLIST;
  };
  function cleanEcsSystems() {
      return ECSSYSTEMLIST = [];
  };
  function ecsSystem() {
      this.enable = true;
      this.targetEntities = [];
      this.targetComponentTypes = [];
      this.process = function (entity) {
          return entity;
      };
      this.processAll = function (system) {
          return system;
      };
      this.addEntityHook = function (entity) {
          return entity;
      };
      this.deleteEntityHook = function (entity) {
          return entity;
      };
      return this;
  };
  function makeEcsSystem() {
      var _js1759 = arguments.length;
      for (var n1758 = 0; n1758 < _js1759; n1758 += 2) {
          switch (arguments[n1758]) {
          case 'enable':
              enable = arguments[n1758 + 1];
              break;
          case 'target-entities':
              targetEntities = arguments[n1758 + 1];
              break;
          case 'target-component-types':
              targetComponentTypes = arguments[n1758 + 1];
              break;
          case 'process':
              process = arguments[n1758 + 1];
              break;
          case 'process-all':
              processAll = arguments[n1758 + 1];
              break;
          case 'add-entity-hook':
              addEntityHook = arguments[n1758 + 1];
              break;
          case 'delete-entity-hook':
              deleteEntityHook = arguments[n1758 + 1];
          };
      };
      var enable = 'undefined' === typeof enable ? true : enable;
      var targetEntities = 'undefined' === typeof targetEntities ? [] : targetEntities;
      var targetComponentTypes = 'undefined' === typeof targetComponentTypes ? [] : targetComponentTypes;
      var process = 'undefined' === typeof process ? function (entity) {
          return entity;
      } : process;
      var processAll = 'undefined' === typeof processAll ? function (system) {
          return system;
      } : processAll;
      var addEntityHook = 'undefined' === typeof addEntityHook ? function (entity) {
          return entity;
      } : addEntityHook;
      var deleteEntityHook = 'undefined' === typeof deleteEntityHook ? function (entity) {
          return entity;
      } : deleteEntityHook;
      var result = new ecsSystem();
      result.enable = enable;
      result.targetEntities = targetEntities;
      result.targetComponentTypes = targetComponentTypes;
      result.process = process;
      result.processAll = processAll;
      result.addEntityHook = addEntityHook;
      result.deleteEntityHook = deleteEntityHook;
      __PS_MV_REG = [];
      return result;
  };
  function ecsSystemP(obj) {
      return (obj instanceof ecsSystem);
  };
  function ecsMain() {
      executeEcsBasicProcess();
      for (var pair1109 = null, _js_arrvar1761 = getEcsSystemList(), _js_idx1760 = 0; _js_idx1760 < _js_arrvar1761.length; _js_idx1760 += 1) {
          pair1109 = _js_arrvar1761[_js_idx1760];
          var system = pair1109[1];
          if (system.enable) {
              system.processAll(system);
              for (var entity = null, _js_arrvar1763 = system.targetEntities, _js_idx1762 = 0; _js_idx1762 < _js_arrvar1763.length; _js_idx1762 += 1) {
                  entity = _js_arrvar1763[_js_idx1762];
                  system.process(entity);
              };
          };
      };
  };
  function isRegisteredEntity(entity, system) {
      for (var x1763 = null, _js_arrvar1765 = system.targetEntities, _js_idx1764 = 0; _js_idx1764 < _js_arrvar1765.length; _js_idx1764 += 1) {
          x1763 = _js_arrvar1765[_js_idx1764];
          if ((function (target1762) {
              return entity === target1762;
          })(x1763)) {
              return x1763;
          };
      };
  };
  function isTargetEntity(entity, system) {
      __PS_MV_REG = [];
      return includesAllComponentTypes(system.targetComponentTypes, entity.components);
  };
  function cleanEcsEnv() {
      cleanEcsBasicProcess();
      cleanEcsEntities();
      cleanEcsSystems();
      __PS_MV_REG = [];
      return DELETECOMPONENTHOOKS = [];
  };
  function pushEntityToSystemIfNeeded(entity, system) {
      if (isTargetEntity(entity, system)) {
          system.addEntityHook(entity);
          if (!(function () {
              for (var x1766 = null, _js_arrvar1768 = system.targetEntities, _js_idx1767 = 0; _js_idx1767 < _js_arrvar1768.length; _js_idx1767 += 1) {
                  x1766 = _js_arrvar1768[_js_idx1767];
                  if ((function (elem) {
                      return entity === elem;
                  })(x1766)) {
                      return x1766;
                  };
              };
          })()) {
              system.targetEntities.unshift(entity);
              system.targetEntities;
          };
          __PS_MV_REG = [];
          return system.targetEntities;
      };
  };
  function pushEntityToAllTargetSystem(entity) {
      for (var pair1110 = null, _js_arrvar1770 = getEcsSystemList(), _js_idx1769 = 0; _js_idx1769 < _js_arrvar1770.length; _js_idx1769 += 1) {
          pair1110 = _js_arrvar1770[_js_idx1769];
          var system = pair1110[1];
          pushEntityToSystemIfNeeded(entity, system);
      };
  };
  function deleteEntityFromSystemIfRegistered(entity, system) {
      var copy1772;
      if (isRegisteredEntity(entity, system)) {
          system.deleteEntityHook(entity);
          __PS_MV_REG = [];
          return system.targetEntities = (copy1772 = system.targetEntities, copy1772.filter(function (x) {
              return !(function (target1771) {
                  return entity === target1771;
              })(x);
          }));
      };
  };
  function deleteEntityFromAllSystems(entity) {
      for (var pair1111 = null, _js_arrvar1774 = getEcsSystemList(), _js_idx1773 = 0; _js_idx1773 < _js_arrvar1774.length; _js_idx1773 += 1) {
          pair1111 = _js_arrvar1774[_js_idx1773];
          var system = pair1111[1];
          deleteEntityFromSystemIfRegistered(entity, system);
      };
  };
  function deleteEntityFromNoLongerBelongSystems(entity) {
      for (var pair1112 = null, _js_arrvar1776 = getEcsSystemList(), _js_idx1775 = 0; _js_idx1775 < _js_arrvar1776.length; _js_idx1775 += 1) {
          pair1112 = _js_arrvar1776[_js_idx1775];
          var system = pair1112[1];
          if (!isTargetEntity(entity, system)) {
              deleteEntityFromSystemIfRegistered(entity, system);
          };
      };
  };
  if ('undefined' === typeof DEFAULTECSENTITYPARENTSTACK) {
      var DEFAULTECSENTITYPARENTSTACK = [];
  };
  function getDefaultEcsEntityParent() {
      return DEFAULTECSENTITYPARENTSTACK[0];
  };
  function stackDefaultEcsEntityParent(newParent) {
      var oldParent = getDefaultEcsEntityParent();
      if (findTheEntity(newParent)) {
          moveEcsEntity(newParent, oldParent);
      } else {
          addEcsEntity(newParent);
      };
      DEFAULTECSENTITYPARENTSTACK.unshift(newParent);
      __PS_MV_REG = [];
      return DEFAULTECSENTITYPARENTSTACK;
  };
  function popDefaultEcsEntityParent() {
      var parent = getDefaultEcsEntityParent();
      DEFAULTECSENTITYPARENTSTACK = DEFAULTECSENTITYPARENTSTACK.slice(1);
      __PS_MV_REG = [];
      return parent;
  };
  /** Add the entity to the global list. Then push it and its descendatns to the system if they have target components. */
  function addEcsEntity(entity, parent) {
      if (parent === undefined) {
          parent = getDefaultEcsEntityParent();
      };
      if (!((entity instanceof (typeof ecsEntity === 'string' ? eval(ecsEntity) : ecsEntity)))) {
          throw '\'TYPE-ERROR: (The place is \'ENTITY\'. The expected type is \'ECS-ENTITY\')';
      };
      if (parent) {
          if (!((parent instanceof (typeof ecsEntity === 'string' ? eval(ecsEntity) : ecsEntity)))) {
              throw '\'TYPE-ERROR: (The place is \'PARENT\'. The expected type is \'ECS-ENTITY\')';
          };
      };
      ENTITYLIST = clPsEcs_flatTree._internal.addFlatTreeNode(entity, ENTITYLIST, parent);
      if (!((entity instanceof (typeof flatTreeNode === 'string' ? eval(flatTreeNode) : flatTreeNode)))) {
          throw '\'TYPE-ERROR: (The place is \'ENTITY\'. The expected type is \'FLAT-TREE-NODE\')';
      };
      var rec1113 = function (target) {
          pushEntityToAllTargetSystem(target);
          for (var child = null, _js_arrvar1778 = target.children, _js_idx1777 = 0; _js_idx1777 < _js_arrvar1778.length; _js_idx1777 += 1) {
              child = _js_arrvar1778[_js_idx1777];
              rec1113(child);
          };
      };
      rec1113(entity);
      __PS_MV_REG = [];
      return entity;
  };
  /** Add the entity to the buffer of the global list. They are added in the loop, ecs-main. This is useful for adding entities in do-ecs-entities loop. */
  function addEcsEntityToBuffer(entity, parent) {
      if (parent === undefined) {
          parent = getDefaultEcsEntityParent();
      };
      __PS_MV_REG = [];
      return registerNextFrameFunc(function () {
          __PS_MV_REG = [];
          return addEcsEntity(entity, parent);
      });
  };
  /** Remove an entity from global *entity-list* with its descendants. */
  function deleteEcsEntity(entity) {
      if (!((entity instanceof (typeof ecsEntity === 'string' ? eval(ecsEntity) : ecsEntity)))) {
          throw '\'TYPE-ERROR: (The place is \'ENTITY\'. The expected type is \'ECS-ENTITY\')';
      };
      ENTITYLIST = deleteFlatTreeNode(entity, ENTITYLIST);
      if (!((entity instanceof (typeof flatTreeNode === 'string' ? eval(flatTreeNode) : flatTreeNode)))) {
          throw '\'TYPE-ERROR: (The place is \'ENTITY\'. The expected type is \'FLAT-TREE-NODE\')';
      };
      var rec1114 = function (target) {
          deleteEntityFromAllSystems(target);
          for (var child = null, _js_arrvar1780 = target.children, _js_idx1779 = 0; _js_idx1779 < _js_arrvar1780.length; _js_idx1779 += 1) {
              child = _js_arrvar1780[_js_idx1779];
              rec1114(child);
          };
      };
      __PS_MV_REG = [];
      return rec1114(entity);
  };
  /** Move an entity under a new-parent. */
  function moveEcsEntity(entity, newParent) {
      if (!((entity instanceof (typeof ecsEntity === 'string' ? eval(ecsEntity) : ecsEntity)))) {
          throw '\'TYPE-ERROR: (The place is \'ENTITY\'. The expected type is \'ECS-ENTITY\')';
      };
      if (newParent) {
          if (!((newParent instanceof (typeof ecsEntity === 'string' ? eval(ecsEntity) : ecsEntity)))) {
              throw '\'TYPE-ERROR: (The place is \'NEW-PARENT\'. The expected type is \'ECS-ENTITY\')';
          };
      };
      __PS_MV_REG = [];
      return moveFlatTreeNode(entity, newParent);
  };
  function registerEcsSystem(name, system) {
      if (!((system instanceof (typeof ecsSystem === 'string' ? eval(ecsSystem) : ecsSystem)))) {
          throw '\'TYPE-ERROR: (The place is \'SYSTEM\'. The expected type is \'ECS-SYSTEM\')';
      };
      var found = (function () {
          for (var x1781 = null, _js_idx1782 = 0; _js_idx1782 < ECSSYSTEMLIST.length; _js_idx1782 += 1) {
              x1781 = ECSSYSTEMLIST[_js_idx1782];
              if ((function (pair) {
                  return pair[0] === name;
              })(x1781)) {
                  return x1781;
              };
          };
      })();
      if (found) {
          found[1] = system;
      } else {
          ECSSYSTEMLIST = ECSSYSTEMLIST.concat([[name, system]]);
      };
      system.targetEntities = [];
      for (var entity = null, _js_arrvar1784 = getEntityList(), _js_idx1783 = 0; _js_idx1783 < _js_arrvar1784.length; _js_idx1783 += 1) {
          entity = _js_arrvar1784[_js_idx1783];
          pushEntityToSystemIfNeeded(entity, system);
      };
      __PS_MV_REG = [];
      return system;
  };
  function checkComponentUniqueness(component, entity) {
      if ((function () {
          for (var x1790 = null, _js_arrvar1792 = entity.components, _js_idx1791 = 0; _js_idx1791 < _js_arrvar1792.length; _js_idx1791 += 1) {
              x1790 = _js_arrvar1792[_js_idx1791];
              if ((function (target1789) {
                  return component === target1789;
              })(x1790)) {
                  return x1790;
              };
          };
      })()) {
          throw 'The component is already added to the entity.';
      };
  };
  /** Add components to an entity. If the entity is added to the environment,  */
  function addEcsComponentListImpl(entity, parentComponent, componentList) {
      if (!((entity instanceof (typeof ecsEntity === 'string' ? eval(ecsEntity) : ecsEntity)))) {
          throw '\'TYPE-ERROR: (The place is \'ENTITY\'. The expected type is \'ECS-ENTITY\')';
      };
      if (parentComponent) {
          if (!((parentComponent instanceof (typeof ecsComponent === 'string' ? eval(ecsComponent) : ecsComponent)))) {
              throw '\'TYPE-ERROR: (The place is \'PARENT-COMPONENT\'. The expected type is \'ECS-COMPONENT\')';
          };
      };
      for (var component = null, _js_idx1793 = 0; _js_idx1793 < componentList.length; _js_idx1793 += 1) {
          component = componentList[_js_idx1793];
          if (!((component instanceof (typeof ecsComponent === 'string' ? eval(ecsComponent) : ecsComponent)))) {
              throw '\'TYPE-ERROR: (The place is \'COMPONENT\'. The expected type is \'ECS-COMPONENT\')';
          };
          checkComponentUniqueness(component, entity);
          entity.components = clPsEcs_flatTree._internal.addFlatTreeNode(component, entity.components, parentComponent);
      };
      __PS_MV_REG = [];
      return findTheEntity(entity) ? pushEntityToAllTargetSystem(entity) : null;
  };
  /** Add components to an entity. If the entity is added to the environment,  */
  function addEcsComponentList(entity) {
      var componentList = Array.prototype.slice.call(arguments, 1);
      __PS_MV_REG = [];
      return addEcsComponentListImpl(entity, null, componentList);
  };
  /** Add a component to an entity. If the entity is added to the environment,  */
  function addEcsComponent(component, entity, parentComponent) {
      __PS_MV_REG = [];
      return addEcsComponentListImpl(entity, parentComponent, [component]);
  };
  if ('undefined' === typeof DELETECOMPONENTHOOKS) {
      var DELETECOMPONENTHOOKS = [];
  };
  function addDeleteComponentHook(callback) {
      if (!(function () {
          for (var x1794 = null, _js_idx1795 = 0; _js_idx1795 < DELETECOMPONENTHOOKS.length; _js_idx1795 += 1) {
              x1794 = DELETECOMPONENTHOOKS[_js_idx1795];
              if ((function (elem) {
                  return callback === elem;
              })(x1794)) {
                  return x1794;
              };
          };
      })()) {
          DELETECOMPONENTHOOKS.unshift(callback);
          DELETECOMPONENTHOOKS;
      };
      __PS_MV_REG = [];
      return DELETECOMPONENTHOOKS;
  };
  function deleteDeleteComponentHook(callback) {
      var copy1797;
      var preLength = DELETECOMPONENTHOOKS.length;
      DELETECOMPONENTHOOKS = (copy1797 = DELETECOMPONENTHOOKS, copy1797.filter(function (x) {
          return !(function (target1796) {
              return callback === target1796;
          })(x);
      }));
      if (preLength === DELETECOMPONENTHOOKS.length) {
          throw 'The delete-component hook has not been added.';
      };
  };
  function deleteEcsComponentImpl(predicate, entity, allowNoDeletion) {
      if (!((entity instanceof (typeof ecsEntity === 'string' ? eval(ecsEntity) : ecsEntity)))) {
          throw '\'TYPE-ERROR: (The place is \'ENTITY\'. The expected type is \'ECS-ENTITY\')';
      };
      var preLength = entity.components.length;
      entity.components = deleteFlatTreeNodeIf(predicate, entity.components, function (component) {
          for (var hook = null, _js_idx1798 = 0; _js_idx1798 < DELETECOMPONENTHOOKS.length; _js_idx1798 += 1) {
              hook = DELETECOMPONENTHOOKS[_js_idx1798];
              hook(component);
          };
      });
      if (!allowNoDeletion && preLength === entity.components.length) {
          throw 'The component has not been added.';
      };
      __PS_MV_REG = [];
      return deleteEntityFromNoLongerBelongSystems(entity);
  };
  function deleteEcsComponent(component, entity) {
      __PS_MV_REG = [];
      return deleteEcsComponentImpl(function (targetComponent) {
          return targetComponent === component;
      }, entity, null);
  };
  /** Delete a component whose type is component-type */
  function deleteEcsComponentType(componentType, entity) {
      __PS_MV_REG = [];
      return deleteEcsComponentImpl(function (targetComponent) {
          __PS_MV_REG = [];
          return (targetComponent instanceof (typeof componentType === 'string' ? eval(componentType) : componentType));
      }, entity, true);
  };
  /* --- extern symbols --- */
  return {
    'ecsComponent': ecsComponent,
    'findAComponent': findAComponent,
    'ecsEntity': ecsEntity,
    'makeEcsEntity': makeEcsEntity,
    'ecsEntityP': ecsEntityP,
    'getEcsComponent': getEcsComponent,
    'findAEntity': findAEntity,
    'findTheEntity': findTheEntity,
    'addEntityTag': addEntityTag,
    'deleteEntityTag': deleteEntityTag,
    'hasEntityTag': hasEntityTag,
    'checkEntityTags': checkEntityTags,
    'findAEntityByTag': findAEntityByTag,
    'ecsSystem': ecsSystem,
    'ecsMain': ecsMain,
    'cleanEcsEnv': cleanEcsEnv,
    'getDefaultEcsEntityParent': getDefaultEcsEntityParent,
    'stackDefaultEcsEntityParent': stackDefaultEcsEntityParent,
    'popDefaultEcsEntityParent': popDefaultEcsEntityParent,
    'addEcsEntity': addEcsEntity,
    'addEcsEntityToBuffer': addEcsEntityToBuffer,
    'deleteEcsEntity': deleteEcsEntity,
    'moveEcsEntity': moveEcsEntity,
    'registerEcsSystem': registerEcsSystem,
    'addEcsComponentList': addEcsComponentList,
    'addEcsComponent': addEcsComponent,
    'addDeleteComponentHook': addDeleteComponentHook,
    'deleteDeleteComponentHook': deleteDeleteComponentHook,
    'deleteEcsComponent': deleteEcsComponent,
    'deleteEcsComponentType': deleteEcsComponentType,
    '_internal': {
      'makeEcsComponent': makeEcsComponent,
      'ecsComponentP': ecsComponentP,
      'ENTITYIDCOUNTER': ENTITYIDCOUNTER,
      'ENTITYLIST': ENTITYLIST,
      'getEntityList': getEntityList,
      'cleanEcsEntities': cleanEcsEntities,
      'checkTagType': checkTagType,
      'ECSSYSTEMLIST': ECSSYSTEMLIST,
      'getEcsSystemList': getEcsSystemList,
      'cleanEcsSystems': cleanEcsSystems,
      'makeEcsSystem': makeEcsSystem,
      'ecsSystemP': ecsSystemP,
      'isRegisteredEntity': isRegisteredEntity,
      'isTargetEntity': isTargetEntity,
      'pushEntityToSystemIfNeeded': pushEntityToSystemIfNeeded,
      'pushEntityToAllTargetSystem': pushEntityToAllTargetSystem,
      'deleteEntityFromSystemIfRegistered': deleteEntityFromSystemIfRegistered,
      'deleteEntityFromAllSystems': deleteEntityFromAllSystems,
      'deleteEntityFromNoLongerBelongSystems': deleteEntityFromNoLongerBelongSystems,
      'DEFAULTECSENTITYPARENTSTACK': DEFAULTECSENTITYPARENTSTACK,
      'checkComponentUniqueness': checkComponentUniqueness,
      'addEcsComponentListImpl': addEcsComponentListImpl,
      'DELETECOMPONENTHOOKS': DELETECOMPONENTHOOKS,
      'deleteEcsComponentImpl': deleteEcsComponentImpl,
    }
  };
})();

var clWeb2dGame_core_gameState = (function() {
  /* --- import symbols --- */

  /* --- define objects --- */
  function gameState() {
      this.startProcess = function (_this) {
          return true;
      };
      this.process = function (_this) {
          return null;
      };
      this.endProcess = function (_this) {
          return true;
      };
      return this;
  };
  function makeGameState() {
      var _js1800 = arguments.length;
      for (var n1799 = 0; n1799 < _js1800; n1799 += 2) {
          switch (arguments[n1799]) {
          case 'start-process':
              startProcess = arguments[n1799 + 1];
              break;
          case 'process':
              process = arguments[n1799 + 1];
              break;
          case 'end-process':
              endProcess = arguments[n1799 + 1];
          };
      };
      var startProcess = 'undefined' === typeof startProcess ? function (_this) {
          return true;
      } : startProcess;
      var process = 'undefined' === typeof process ? function (_this) {
          return null;
      } : process;
      var endProcess = 'undefined' === typeof endProcess ? function (_this) {
          return true;
      } : endProcess;
      var result = new gameState();
      result.startProcess = startProcess;
      result.process = process;
      result.endProcess = endProcess;
      __PS_MV_REG = [];
      return result;
  };
  function gameStateP(obj) {
      return (obj instanceof gameState);
  };
  function gameStateManager() {
      this.currentState = makeEmptyGameState();
      this.nextState = null;
      this.subState = 'before-start';
      __PS_MV_REG = [];
      return this;
  };
  function makeGameStateManager() {
      var _js1802 = arguments.length;
      for (var n1801 = 0; n1801 < _js1802; n1801 += 2) {
          switch (arguments[n1801]) {
          case 'current-state':
              currentState = arguments[n1801 + 1];
              break;
          case 'next-state':
              nextState = arguments[n1801 + 1];
              break;
          case 'sub-state':
              subState = arguments[n1801 + 1];
          };
      };
      var currentState = 'undefined' === typeof currentState ? makeEmptyGameState() : currentState;
      var nextState;
      var subState = 'undefined' === typeof subState ? 'before-start' : subState;
      var result = new gameStateManager();
      result.currentState = currentState;
      result.nextState = nextState;
      result.subState = subState;
      __PS_MV_REG = [];
      return result;
  };
  function gameStateManagerP(obj) {
      return (obj instanceof gameStateManager);
  };
  function initGameStateManager(initialState) {
      if (!((initialState instanceof (typeof gameState === 'string' ? eval(gameState) : gameState)))) {
          throw '\'TYPE-ERROR: (The place is \'INITIAL-STATE\'. The expected type is \'GAME-STATE\')';
      };
      __PS_MV_REG = [];
      return makeGameStateManager('current-state', initialState);
  };
  function makeEmptyGameState() {
      __PS_MV_REG = [];
      return makeGameState();
  };
  if ('undefined' === typeof GLOBALGAMESTATEMANAGER) {
      var GLOBALGAMESTATEMANAGER = makeGameStateManager();
  };
  function interruptGameState(nextState, manager) {
      if (manager === undefined) {
          manager = GLOBALGAMESTATEMANAGER;
      };
      if (!((nextState instanceof (typeof gameState === 'string' ? eval(gameState) : gameState)))) {
          throw '\'TYPE-ERROR: (The place is \'NEXT-STATE\'. The expected type is \'GAME-STATE\')';
      };
      __PS_MV_REG = [];
      return manager.nextState = nextState;
  };
  function processGameState(manager) {
      if (manager === undefined) {
          manager = GLOBALGAMESTATEMANAGER;
      };
      if (manager.subState === 'before-start' && manager.nextState) {
          manager.currentState = manager.nextState;
          manager.nextState = null;
      };
      switch (manager.subState) {
      case 'before-start':
      case 'start':
          if (manager.subState === 'before-start') {
              manager.subState = 'start';
          };
          return manager.currentState.startProcess(manager.currentState) ? (manager.subState = 'run') : null;
      case 'run':
          var result = manager.currentState.process(manager.currentState);
          if (manager.nextState) {
              return manager.subState = 'end';
          } else if (result) {
              if (!((result instanceof (typeof gameState === 'string' ? eval(gameState) : gameState)))) {
                  throw '\'TYPE-ERROR: (The place is \'RESULT\'. The expected type is \'GAME-STATE\')';
              };
              manager.subState = 'end';
              __PS_MV_REG = [];
              return manager.nextState = result;
          } else {
              __PS_MV_REG = [];
              return null;
          };
      case 'end':
          if (manager.currentState.endProcess(manager.currentState)) {
              if (!manager.nextState) {
                  throw 'Message: ' + 'Failed assertion: ~A' + '; Args: ' + manager.nextState;
              };
              manager.currentState = manager.nextState;
              manager.nextState = null;
              __PS_MV_REG = [];
              return manager.subState = 'before-start';
          } else {
              __PS_MV_REG = [];
              return null;
          };
      default:
          throw 'Message: ' + 'The value ~A is not of the expected type (MEMBER ~A)' + '; Args: ' + manager.subState + ', ' + [['before-start', 'start'], 'run', 'end'];
      };
  };
  function initGameState(state, manager) {
      if (manager === undefined) {
          manager = GLOBALGAMESTATEMANAGER;
      };
      if (!((state instanceof (typeof gameState === 'string' ? eval(gameState) : gameState)))) {
          throw '\'TYPE-ERROR: (The place is \'STATE\'. The expected type is \'GAME-STATE\')';
      };
      manager.currentState = state;
      manager.nextState = null;
      __PS_MV_REG = [];
      return manager.subState = 'before-start';
  };
  if ('undefined' === typeof STATEMAKERTABLE) {
      var STATEMAKERTABLE = {  };
  };
  /**
   * Make game state instance.
   * Please see also the document of the def-game-state for detail.
   */
  function makeState(kind) {
      var keys = Array.prototype.slice.call(arguments, 1);
      __PS_MV_REG = [];
      return STATEMAKERTABLE[kind].apply(this, keys);
  };
  function registerStateMaker(kind, func) {
      return STATEMAKERTABLE[kind] = func;
  };
  /* --- extern symbols --- */
  return {
    'gameState': gameState,
    'gameStateManager': gameStateManager,
    'initGameStateManager': initGameStateManager,
    'interruptGameState': interruptGameState,
    'processGameState': processGameState,
    'initGameState': initGameState,
    'makeState': makeState,
    '_internal': {
      'makeGameState': makeGameState,
      'gameStateP': gameStateP,
      'makeGameStateManager': makeGameStateManager,
      'gameStateManagerP': gameStateManagerP,
      'makeEmptyGameState': makeEmptyGameState,
      'GLOBALGAMESTATEMANAGER': GLOBALGAMESTATEMANAGER,
      'STATEMAKERTABLE': STATEMAKERTABLE,
      'registerStateMaker': registerStateMaker,
    }
  };
})();

var clWeb2dGame_core_camera = (function() {
  /* --- import symbols --- */
  var deleteDeleteComponentHook = clPsEcs_ecs.deleteDeleteComponentHook;
  var makeEcsEntity = clPsEcs_ecs.makeEcsEntity;
  var addEcsComponent = clPsEcs_ecs.addEcsComponent;
  var ecsEntity = clPsEcs_ecs.ecsEntity;
  var deleteEcsComponentType = clPsEcs_ecs.deleteEcsComponentType;
  var framePromise = clPsEcs_framePromise.framePromise;
  var deleteEntityTag = clPsEcs_ecs.deleteEntityTag;
  var deleteEcsEntity = clPsEcs_ecs.deleteEcsEntity;
  var cleanEcsEnv = clPsEcs_ecs.cleanEcsEnv;
  var addDeleteComponentHook = clPsEcs_ecs.addDeleteComponentHook;
  var ecsMain = clPsEcs_ecs.ecsMain;
  var includesAllComponentTypes = clPsEcs_utils.includesAllComponentTypes;
  var findAComponent = clPsEcs_ecs.findAComponent;
  var registerNframesAfterFunc = clPsEcs_basicProcess.registerNframesAfterFunc;
  var moveEcsEntity = clPsEcs_ecs.moveEcsEntity;
  var ecsComponent = clPsEcs_ecs.ecsComponent;
  var popDefaultEcsEntityParent = clPsEcs_ecs.popDefaultEcsEntityParent;
  var framePromiseP = clPsEcs_framePromise.framePromiseP;
  var getEcsComponent = clPsEcs_ecs.getEcsComponent;
  var ecsSystem = clPsEcs_ecs.ecsSystem;
  var addEntityTag = clPsEcs_ecs.addEntityTag;
  var ecsEntityP = clPsEcs_ecs.ecsEntityP;
  var registerEcsSystem = clPsEcs_ecs.registerEcsSystem;
  var registerFuncWithPred = clPsEcs_basicProcess.registerFuncWithPred;
  var addEcsEntityToBuffer = clPsEcs_ecs.addEcsEntityToBuffer;
  var checkEntityTags = clPsEcs_ecs.checkEntityTags;
  var initFramePromise = clPsEcs_framePromise.initFramePromise;
  var framePromiseThen = clPsEcs_framePromise.framePromiseThen;
  var addEcsEntity = clPsEcs_ecs.addEcsEntity;
  var registerNextFrameFunc = clPsEcs_basicProcess.registerNextFrameFunc;
  var findAEntityByTag = clPsEcs_ecs.findAEntityByTag;
  var stackDefaultEcsEntityParent = clPsEcs_ecs.stackDefaultEcsEntityParent;
  var addEcsComponentList = clPsEcs_ecs.addEcsComponentList;
  var framePromiseAll = clPsEcs_framePromise.framePromiseAll;
  var findTheEntity = clPsEcs_ecs.findTheEntity;
  var findAEntity = clPsEcs_ecs.findAEntity;
  var hasEntityTag = clPsEcs_ecs.hasEntityTag;
  var deleteEcsComponent = clPsEcs_ecs.deleteEcsComponent;
  var getDefaultEcsEntityParent = clPsEcs_ecs.getDefaultEcsEntityParent;
  /* --- define objects --- */
  if ('undefined' === typeof CAMERAOFFSETX) {
      var CAMERAOFFSETX = 0;
  };
  if ('undefined' === typeof CAMERAOFFSETY) {
      var CAMERAOFFSETY = 0;
  };
  if ('undefined' === typeof SCREENWIDTH) {
      var SCREENWIDTH = 0;
  };
  if ('undefined' === typeof SCREENHEIGHT) {
      var SCREENHEIGHT = 0;
  };
  function getCameraOffsetX() {
      return CAMERAOFFSETX;
  };
  function getCameraOffsetY() {
      return CAMERAOFFSETY;
  };
  function getScreenWidth() {
      return SCREENWIDTH;
  };
  function getScreenHeight() {
      return SCREENHEIGHT;
  };
  function initCamera(offsetX, offsetY, width, height) {
      var x = offsetX;
      var y = offsetY;
      var z = 1000;
      var camera = new THREE.OrthographicCamera(x * -1, width - x, height - y, y * -1, 0, z * 2);
      CAMERAOFFSETX = offsetX;
      CAMERAOFFSETY = offsetY;
      SCREENWIDTH = width;
      SCREENHEIGHT = height;
      camera.position.set(0, 0, z);
      __PS_MV_REG = [];
      return camera;
  };
  /* --- extern symbols --- */
  return {
    'getCameraOffsetX': getCameraOffsetX,
    'getCameraOffsetY': getCameraOffsetY,
    'getScreenWidth': getScreenWidth,
    'getScreenHeight': getScreenHeight,
    'initCamera': initCamera,
    '_internal': {
      'CAMERAOFFSETX': CAMERAOFFSETX,
      'CAMERAOFFSETY': CAMERAOFFSETY,
      'SCREENWIDTH': SCREENWIDTH,
      'SCREENHEIGHT': SCREENHEIGHT,
    }
  };
})();

var clWeb2dGame_utils_debug_performance = (function() {
  /* --- import symbols --- */
  var deleteDeleteComponentHook = clPsEcs_ecs.deleteDeleteComponentHook;
  var makeEcsEntity = clPsEcs_ecs.makeEcsEntity;
  var addEcsComponent = clPsEcs_ecs.addEcsComponent;
  var ecsEntity = clPsEcs_ecs.ecsEntity;
  var deleteEcsComponentType = clPsEcs_ecs.deleteEcsComponentType;
  var framePromise = clPsEcs_framePromise.framePromise;
  var deleteEntityTag = clPsEcs_ecs.deleteEntityTag;
  var deleteEcsEntity = clPsEcs_ecs.deleteEcsEntity;
  var cleanEcsEnv = clPsEcs_ecs.cleanEcsEnv;
  var addDeleteComponentHook = clPsEcs_ecs.addDeleteComponentHook;
  var ecsMain = clPsEcs_ecs.ecsMain;
  var includesAllComponentTypes = clPsEcs_utils.includesAllComponentTypes;
  var findAComponent = clPsEcs_ecs.findAComponent;
  var registerNframesAfterFunc = clPsEcs_basicProcess.registerNframesAfterFunc;
  var moveEcsEntity = clPsEcs_ecs.moveEcsEntity;
  var ecsComponent = clPsEcs_ecs.ecsComponent;
  var popDefaultEcsEntityParent = clPsEcs_ecs.popDefaultEcsEntityParent;
  var framePromiseP = clPsEcs_framePromise.framePromiseP;
  var getEcsComponent = clPsEcs_ecs.getEcsComponent;
  var ecsSystem = clPsEcs_ecs.ecsSystem;
  var addEntityTag = clPsEcs_ecs.addEntityTag;
  var ecsEntityP = clPsEcs_ecs.ecsEntityP;
  var registerEcsSystem = clPsEcs_ecs.registerEcsSystem;
  var registerFuncWithPred = clPsEcs_basicProcess.registerFuncWithPred;
  var addEcsEntityToBuffer = clPsEcs_ecs.addEcsEntityToBuffer;
  var checkEntityTags = clPsEcs_ecs.checkEntityTags;
  var initFramePromise = clPsEcs_framePromise.initFramePromise;
  var framePromiseThen = clPsEcs_framePromise.framePromiseThen;
  var addEcsEntity = clPsEcs_ecs.addEcsEntity;
  var registerNextFrameFunc = clPsEcs_basicProcess.registerNextFrameFunc;
  var findAEntityByTag = clPsEcs_ecs.findAEntityByTag;
  var stackDefaultEcsEntityParent = clPsEcs_ecs.stackDefaultEcsEntityParent;
  var addEcsComponentList = clPsEcs_ecs.addEcsComponentList;
  var framePromiseAll = clPsEcs_framePromise.framePromiseAll;
  var findTheEntity = clPsEcs_ecs.findTheEntity;
  var findAEntity = clPsEcs_ecs.findAEntity;
  var hasEntityTag = clPsEcs_ecs.hasEntityTag;
  var deleteEcsComponent = clPsEcs_ecs.deleteEcsComponent;
  var getDefaultEcsEntityParent = clPsEcs_ecs.getDefaultEcsEntityParent;
  /* --- define objects --- */
  function performanceTimerManager() {
      this.tree = null;
      this.currentNode = null;
      this.targetFps = 60;
      return this;
  };
  function makePerformanceTimerManager() {
      var _js1804 = arguments.length;
      for (var n1803 = 0; n1803 < _js1804; n1803 += 2) {
          switch (arguments[n1803]) {
          case 'tree':
              tree = arguments[n1803 + 1];
              break;
          case 'current-node':
              currentNode = arguments[n1803 + 1];
              break;
          case 'target-fps':
              targetFps = arguments[n1803 + 1];
          };
      };
      var tree;
      var currentNode;
      var targetFps = 'undefined' === typeof targetFps ? 60 : targetFps;
      var result = new performanceTimerManager();
      result.tree = tree;
      result.currentNode = currentNode;
      result.targetFps = targetFps;
      __PS_MV_REG = [];
      return result;
  };
  function performanceTimerManagerP(obj) {
      return (obj instanceof performanceTimerManager);
  };
  function performanceTimerElement() {
      this.name = '';
      this.results = initRingBuffer(30);
      this.count = 0;
      this.color = 0;
      __PS_MV_REG = [];
      return this;
  };
  function makePerformanceTimerElement() {
      var _js1806 = arguments.length;
      for (var n1805 = 0; n1805 < _js1806; n1805 += 2) {
          switch (arguments[n1805]) {
          case 'name':
              name = arguments[n1805 + 1];
              break;
          case 'results':
              results = arguments[n1805 + 1];
              break;
          case 'count':
              count = arguments[n1805 + 1];
              break;
          case 'color':
              color = arguments[n1805 + 1];
          };
      };
      var name = 'undefined' === typeof name ? '' : name;
      var results = 'undefined' === typeof results ? initRingBuffer(30) : results;
      var count = 'undefined' === typeof count ? 0 : count;
      var color = 'undefined' === typeof color ? 0 : color;
      var result = new performanceTimerElement();
      result.name = name;
      result.results = results;
      result.count = count;
      result.color = color;
      __PS_MV_REG = [];
      return result;
  };
  function performanceTimerElementP(obj) {
      return (obj instanceof performanceTimerElement);
  };
  function performanceTimerNode() {
      this.element = null;
      this.children = [];
      return this;
  };
  function makePerformanceTimerNode() {
      var _js1808 = arguments.length;
      for (var n1807 = 0; n1807 < _js1808; n1807 += 2) {
          switch (arguments[n1807]) {
          case 'element':
              element = arguments[n1807 + 1];
              break;
          case 'children':
              children = arguments[n1807 + 1];
          };
      };
      var element;
      var children = 'undefined' === typeof children ? [] : children;
      var result = new performanceTimerNode();
      result.element = element;
      result.children = children;
      __PS_MV_REG = [];
      return result;
  };
  function performanceTimerNodeP(obj) {
      return (obj instanceof performanceTimerNode);
  };
  function ringBuffer() {
      this.array = null;
      this.count = 0;
      this.next = 0;
      return this;
  };
  function makeRingBuffer() {
      var _js1810 = arguments.length;
      for (var n1809 = 0; n1809 < _js1810; n1809 += 2) {
          switch (arguments[n1809]) {
          case 'array':
              array = arguments[n1809 + 1];
              break;
          case 'count':
              count = arguments[n1809 + 1];
              break;
          case 'next':
              next = arguments[n1809 + 1];
          };
      };
      var array;
      var count = 'undefined' === typeof count ? 0 : count;
      var next = 'undefined' === typeof next ? 0 : next;
      var result = new ringBuffer();
      result.array = array;
      result.count = count;
      result.next = next;
      __PS_MV_REG = [];
      return result;
  };
  function ringBufferP(obj) {
      return (obj instanceof ringBuffer);
  };
  function initRingBuffer(size) {
      __PS_MV_REG = [];
      return makeRingBuffer('array', new Array(size));
  };
  function pushToRingBuffer(value, buffer) {
      buffer.array[buffer.next] = value;
      ++buffer.count;
      return buffer.next = buffer.next + 1 < buffer.array.length ? buffer.next + 1 : 0;
  };
  function ringBufferAverage(buffer) {
      if (buffer.count > 0) {
          var validLength = Math.min(buffer.count, buffer.array.length);
          __PS_MV_REG = [];
          return (function () {
              var sum1811 = 0;
              for (var i = 0; i < validLength; i += 1) {
                  sum1811 += buffer.array[i];
              };
              return sum1811;
          })() / validLength;
      } else {
          __PS_MV_REG = [];
          return 0;
      };
  };
  if ('undefined' === typeof PERFORMANCETIMER) {
      var PERFORMANCETIMER = makePerformanceTimerManager();
  };
  function pickPerformanceTimerElement(name, color, manager) {
      if (manager === undefined) {
          manager = PERFORMANCETIMER;
      };
      if (!((manager instanceof (typeof performanceTimerManager === 'string' ? eval(performanceTimerManager) : performanceTimerManager)))) {
          throw '\'TYPE-ERROR: (The place is \'MANAGER\'. The expected type is \'PERFORMANCE-TIMER-MANAGER\')';
      };
      var foundNode = manager.currentNode != null ? (function () {
          for (var x1812 = null, _js_arrvar1814 = manager.currentNode.children, _js_idx1813 = 0; _js_idx1813 < _js_arrvar1814.length; _js_idx1813 += 1) {
              x1812 = _js_arrvar1814[_js_idx1813];
              if ((function (node) {
                  return node.element.name === name;
              })(x1812)) {
                  return x1812;
              };
          };
      })() : manager.tree;
      if (foundNode != null) {
          manager.currentNode = foundNode;
          __PS_MV_REG = [];
          return foundNode.element;
      } else {
          var newElem = makePerformanceTimerElement('name', name, 'color', color);
          var newNode = makePerformanceTimerNode('element', newElem);
          if (manager.tree == null) {
              manager.tree = newNode;
          } else {
              manager.currentNode.children.unshift(newNode);
              manager.currentNode.children;
          };
          manager.currentNode = newNode;
          __PS_MV_REG = [];
          return newElem;
      };
  };
  function dumpPerformanceCounter() {
      var _js1816 = arguments.length;
      for (var n1815 = 0; n1815 < _js1816; n1815 += 2) {
          switch (arguments[n1815]) {
          case 'timer':
              timer = arguments[n1815 + 1];
          };
      };
      var timer = 'undefined' === typeof timer ? PERFORMANCETIMER : timer;
      var formatNumber = function (num, upperDigit, lowerDigit) {
          var temp = num.toFixed(lowerDigit);
          var minLength = upperDigit + lowerDigit + 1;
          while (temp.length < minLength) {
              temp = '0' + temp;
          };
          __PS_MV_REG = [];
          return temp;
      };
      var rec = function (result, node) {
          var element1817 = node.element;
          var children1818 = node.children;
          var timeMs = ringBufferAverage(element1817.results);
          result = result + '(' + element1817.name + ':' + formatNumber(timeMs, 2, 2);
          if (children1818.length) {
              result += ' ';
              for (var child = null, _js_idx1819 = 0; _js_idx1819 < children1818.length; _js_idx1819 += 1) {
                  child = children1818[_js_idx1819];
                  result = rec(result, child);
              };
          };
          result += ')';
          __PS_MV_REG = [];
          return result;
      };
      __PS_MV_REG = [];
      return rec('', timer.tree);
  };
  /* --- extern symbols --- */
  return {
    'dumpPerformanceCounter': dumpPerformanceCounter,
    '_internal': {
      'performanceTimerManager': performanceTimerManager,
      'makePerformanceTimerManager': makePerformanceTimerManager,
      'performanceTimerManagerP': performanceTimerManagerP,
      'performanceTimerElement': performanceTimerElement,
      'makePerformanceTimerElement': makePerformanceTimerElement,
      'performanceTimerElementP': performanceTimerElementP,
      'performanceTimerNode': performanceTimerNode,
      'makePerformanceTimerNode': makePerformanceTimerNode,
      'performanceTimerNodeP': performanceTimerNodeP,
      'ringBuffer': ringBuffer,
      'makeRingBuffer': makeRingBuffer,
      'ringBufferP': ringBufferP,
      'initRingBuffer': initRingBuffer,
      'pushToRingBuffer': pushToRingBuffer,
      'ringBufferAverage': ringBufferAverage,
      'PERFORMANCETIMER': PERFORMANCETIMER,
      'pickPerformanceTimerElement': pickPerformanceTimerElement,
    }
  };
})();

var clWeb2dGame_inputs_gui = (function() {
  /* --- import symbols --- */
  var deleteDeleteComponentHook = clPsEcs_ecs.deleteDeleteComponentHook;
  var makeEcsEntity = clPsEcs_ecs.makeEcsEntity;
  var addEcsComponent = clPsEcs_ecs.addEcsComponent;
  var ecsEntity = clPsEcs_ecs.ecsEntity;
  var deleteEcsComponentType = clPsEcs_ecs.deleteEcsComponentType;
  var framePromise = clPsEcs_framePromise.framePromise;
  var deleteEntityTag = clPsEcs_ecs.deleteEntityTag;
  var deleteEcsEntity = clPsEcs_ecs.deleteEcsEntity;
  var cleanEcsEnv = clPsEcs_ecs.cleanEcsEnv;
  var addDeleteComponentHook = clPsEcs_ecs.addDeleteComponentHook;
  var ecsMain = clPsEcs_ecs.ecsMain;
  var includesAllComponentTypes = clPsEcs_utils.includesAllComponentTypes;
  var findAComponent = clPsEcs_ecs.findAComponent;
  var registerNframesAfterFunc = clPsEcs_basicProcess.registerNframesAfterFunc;
  var moveEcsEntity = clPsEcs_ecs.moveEcsEntity;
  var ecsComponent = clPsEcs_ecs.ecsComponent;
  var popDefaultEcsEntityParent = clPsEcs_ecs.popDefaultEcsEntityParent;
  var framePromiseP = clPsEcs_framePromise.framePromiseP;
  var getEcsComponent = clPsEcs_ecs.getEcsComponent;
  var ecsSystem = clPsEcs_ecs.ecsSystem;
  var addEntityTag = clPsEcs_ecs.addEntityTag;
  var ecsEntityP = clPsEcs_ecs.ecsEntityP;
  var registerEcsSystem = clPsEcs_ecs.registerEcsSystem;
  var registerFuncWithPred = clPsEcs_basicProcess.registerFuncWithPred;
  var addEcsEntityToBuffer = clPsEcs_ecs.addEcsEntityToBuffer;
  var checkEntityTags = clPsEcs_ecs.checkEntityTags;
  var initFramePromise = clPsEcs_framePromise.initFramePromise;
  var framePromiseThen = clPsEcs_framePromise.framePromiseThen;
  var addEcsEntity = clPsEcs_ecs.addEcsEntity;
  var registerNextFrameFunc = clPsEcs_basicProcess.registerNextFrameFunc;
  var findAEntityByTag = clPsEcs_ecs.findAEntityByTag;
  var stackDefaultEcsEntityParent = clPsEcs_ecs.stackDefaultEcsEntityParent;
  var addEcsComponentList = clPsEcs_ecs.addEcsComponentList;
  var framePromiseAll = clPsEcs_framePromise.framePromiseAll;
  var findTheEntity = clPsEcs_ecs.findTheEntity;
  var findAEntity = clPsEcs_ecs.findAEntity;
  var hasEntityTag = clPsEcs_ecs.hasEntityTag;
  var deleteEcsComponent = clPsEcs_ecs.deleteEcsComponent;
  var getDefaultEcsEntityParent = clPsEcs_ecs.getDefaultEcsEntityParent;
  /* --- define objects --- */
  if ('undefined' === typeof GUIPANEL) {
      var GUIPANEL = null;
  };
  if ('undefined' === typeof GUIPANELPARAMS) {
      var GUIPANELPARAMS = null;
  };
  if ('undefined' === typeof GUIDEFAULTFOLDER) {
      var GUIDEFAULTFOLDER = null;
  };
  function getGuiDefaultFolder() {
      return GUIDEFAULTFOLDER;
  };
  function setfGuiDefaultFolder(folder) {
      return GUIDEFAULTFOLDER = folder;
  };
  function initGui() {
      GUIPANEL = new dat.GUI();
      __PS_MV_REG = [];
      return GUIPANELPARAMS = {  };
  };
  function clearGuiPanel() {
      GUIPANEL.destroy();
      __PS_MV_REG = [];
      return initGui();
  };
  function addPanelFolder(name) {
      var _js1821 = arguments.length;
      for (var n1820 = 1; n1820 < _js1821; n1820 += 2) {
          switch (arguments[n1820]) {
          case 'open-p':
              openP = arguments[n1820 + 1];
          };
      };
      var openP = 'undefined' === typeof openP ? true : openP;
      var folder = GUIPANEL.addFolder(name);
      if (openP) {
          folder.open();
      };
      __PS_MV_REG = [];
      return folder;
  };
  function addPanelBool(name, initValue) {
      var _js1823 = arguments.length;
      for (var n1822 = 2; n1822 < _js1823; n1822 += 2) {
          switch (arguments[n1822]) {
          case 'on-change':
              onChange = arguments[n1822 + 1];
              break;
          case 'folder':
              folder = arguments[n1822 + 1];
          };
      };
      var onChange;
      var folder = 'undefined' === typeof folder ? getGuiDefaultFolder() : folder;
      GUIPANELPARAMS[name] = initValue ? true : false;
      __PS_MV_REG = [];
      return (folder ? folder : GUIPANEL).add(GUIPANELPARAMS, name).onChange(onChange);
  };
  function addPanelNumber(name, initValue) {
      var _js1825 = arguments.length;
      for (var n1824 = 2; n1824 < _js1825; n1824 += 2) {
          switch (arguments[n1824]) {
          case 'on-change':
              onChange = arguments[n1824 + 1];
              break;
          case 'folder':
              folder = arguments[n1824 + 1];
              break;
          case 'min':
              min = arguments[n1824 + 1];
              break;
          case 'max':
              max = arguments[n1824 + 1];
              break;
          case 'step':
              step = arguments[n1824 + 1];
          };
      };
      var onChange;
      var folder = 'undefined' === typeof folder ? getGuiDefaultFolder() : folder;
      var min = 'undefined' === typeof min ? -100 : min;
      var max = 'undefined' === typeof max ? -100 : max;
      var step = 'undefined' === typeof step ? 0.1 : step;
      GUIPANELPARAMS[name] = initValue;
      __PS_MV_REG = [];
      return (folder ? folder : GUIPANEL).add(GUIPANELPARAMS, name, min, max, step).onChange(onChange);
  };
  function addPanelButton(name) {
      var _js1827 = arguments.length;
      for (var n1826 = 1; n1826 < _js1827; n1826 += 2) {
          switch (arguments[n1826]) {
          case 'on-change':
              onChange = arguments[n1826 + 1];
              break;
          case 'folder':
              folder = arguments[n1826 + 1];
          };
      };
      var onChange;
      var folder = 'undefined' === typeof folder ? getGuiDefaultFolder() : folder;
      GUIPANELPARAMS[name] = onChange;
      __PS_MV_REG = [];
      return (folder ? folder : GUIPANEL).add(GUIPANELPARAMS, name, null);
  };
  /* --- extern symbols --- */
  return {
    'initGui': initGui,
    'clearGuiPanel': clearGuiPanel,
    'addPanelFolder': addPanelFolder,
    'addPanelBool': addPanelBool,
    'addPanelNumber': addPanelNumber,
    'addPanelButton': addPanelButton,
    '_internal': {
      'GUIPANEL': GUIPANEL,
      'GUIPANELPARAMS': GUIPANELPARAMS,
      'GUIDEFAULTFOLDER': GUIDEFAULTFOLDER,
      'getGuiDefaultFolder': getGuiDefaultFolder,
      'setfGuiDefaultFolder': setfGuiDefaultFolder,
    }
  };
})();

var clWeb2dGame_graphics_font = (function() {
  /* --- import symbols --- */
  var deleteDeleteComponentHook = clPsEcs_ecs.deleteDeleteComponentHook;
  var makeEcsEntity = clPsEcs_ecs.makeEcsEntity;
  var addEcsComponent = clPsEcs_ecs.addEcsComponent;
  var ecsEntity = clPsEcs_ecs.ecsEntity;
  var deleteEcsComponentType = clPsEcs_ecs.deleteEcsComponentType;
  var framePromise = clPsEcs_framePromise.framePromise;
  var deleteEntityTag = clPsEcs_ecs.deleteEntityTag;
  var deleteEcsEntity = clPsEcs_ecs.deleteEcsEntity;
  var cleanEcsEnv = clPsEcs_ecs.cleanEcsEnv;
  var addDeleteComponentHook = clPsEcs_ecs.addDeleteComponentHook;
  var ecsMain = clPsEcs_ecs.ecsMain;
  var includesAllComponentTypes = clPsEcs_utils.includesAllComponentTypes;
  var findAComponent = clPsEcs_ecs.findAComponent;
  var registerNframesAfterFunc = clPsEcs_basicProcess.registerNframesAfterFunc;
  var moveEcsEntity = clPsEcs_ecs.moveEcsEntity;
  var ecsComponent = clPsEcs_ecs.ecsComponent;
  var popDefaultEcsEntityParent = clPsEcs_ecs.popDefaultEcsEntityParent;
  var framePromiseP = clPsEcs_framePromise.framePromiseP;
  var getEcsComponent = clPsEcs_ecs.getEcsComponent;
  var ecsSystem = clPsEcs_ecs.ecsSystem;
  var addEntityTag = clPsEcs_ecs.addEntityTag;
  var ecsEntityP = clPsEcs_ecs.ecsEntityP;
  var registerEcsSystem = clPsEcs_ecs.registerEcsSystem;
  var registerFuncWithPred = clPsEcs_basicProcess.registerFuncWithPred;
  var addEcsEntityToBuffer = clPsEcs_ecs.addEcsEntityToBuffer;
  var checkEntityTags = clPsEcs_ecs.checkEntityTags;
  var initFramePromise = clPsEcs_framePromise.initFramePromise;
  var framePromiseThen = clPsEcs_framePromise.framePromiseThen;
  var addEcsEntity = clPsEcs_ecs.addEcsEntity;
  var registerNextFrameFunc = clPsEcs_basicProcess.registerNextFrameFunc;
  var findAEntityByTag = clPsEcs_ecs.findAEntityByTag;
  var stackDefaultEcsEntityParent = clPsEcs_ecs.stackDefaultEcsEntityParent;
  var addEcsComponentList = clPsEcs_ecs.addEcsComponentList;
  var framePromiseAll = clPsEcs_framePromise.framePromiseAll;
  var findTheEntity = clPsEcs_ecs.findTheEntity;
  var findAEntity = clPsEcs_ecs.findAEntity;
  var hasEntityTag = clPsEcs_ecs.hasEntityTag;
  var deleteEcsComponent = clPsEcs_ecs.deleteEcsComponent;
  var getDefaultEcsEntityParent = clPsEcs_ecs.getDefaultEcsEntityParent;
  /* --- define objects --- */
  if ('undefined' === typeof FONTNAMETOPROMISETABLE) {
      var FONTNAMETOPROMISETABLE = {  };
  };
  function makeFontName(name, weight) {
      return name + '_' + weight;
  };
  /**
   * Load and register texture.
   * After that you can get it by get-font-promise with the name and the weight
   */
  function loadFont(relativePath) {
      var _js1829 = arguments.length;
      for (var n1828 = 1; n1828 < _js1829; n1828 += 2) {
          switch (arguments[n1828]) {
          case 'name':
              name = arguments[n1828 + 1];
              break;
          case 'weight':
              weight = arguments[n1828 + 1];
          };
      };
      var name = 'undefined' === typeof name ? 'helvetiker' : name;
      var weight = 'undefined' === typeof weight ? 'regular' : weight;
      var loader = new THREE.FontLoader();
      var path = relativePath + name + '_' + weight + '.typeface.json';
      __PS_MV_REG = [];
      return FONTNAMETOPROMISETABLE[makeFontName(name, weight)] = initFramePromise(function (resolve) {
          __PS_MV_REG = [];
          return loader.load(path, function (response) {
              __PS_MV_REG = [];
              return resolve(response);
          });
      });
  };
  function getFontPromise(name, weight) {
      var result = FONTNAMETOPROMISETABLE[makeFontName(name, weight)];
      if (!result) {
          throw 'The font (name = ~A and weight = ~A) has not been loaded.' + '; ' + name + '; ' + weight;
      };
      __PS_MV_REG = [];
      return result;
  };
  /* --- extern symbols --- */
  return {
    'loadFont': loadFont,
    'getFontPromise': getFontPromise,
    '_internal': {
      'FONTNAMETOPROMISETABLE': FONTNAMETOPROMISETABLE,
      'makeFontName': makeFontName,
    }
  };
})();

var clWeb2dGame_utils_debug_logger = (function() {
  /* --- import symbols --- */
  var deleteDeleteComponentHook = clPsEcs_ecs.deleteDeleteComponentHook;
  var makeEcsEntity = clPsEcs_ecs.makeEcsEntity;
  var addEcsComponent = clPsEcs_ecs.addEcsComponent;
  var ecsEntity = clPsEcs_ecs.ecsEntity;
  var deleteEcsComponentType = clPsEcs_ecs.deleteEcsComponentType;
  var framePromise = clPsEcs_framePromise.framePromise;
  var deleteEntityTag = clPsEcs_ecs.deleteEntityTag;
  var deleteEcsEntity = clPsEcs_ecs.deleteEcsEntity;
  var cleanEcsEnv = clPsEcs_ecs.cleanEcsEnv;
  var addDeleteComponentHook = clPsEcs_ecs.addDeleteComponentHook;
  var ecsMain = clPsEcs_ecs.ecsMain;
  var includesAllComponentTypes = clPsEcs_utils.includesAllComponentTypes;
  var findAComponent = clPsEcs_ecs.findAComponent;
  var registerNframesAfterFunc = clPsEcs_basicProcess.registerNframesAfterFunc;
  var moveEcsEntity = clPsEcs_ecs.moveEcsEntity;
  var ecsComponent = clPsEcs_ecs.ecsComponent;
  var popDefaultEcsEntityParent = clPsEcs_ecs.popDefaultEcsEntityParent;
  var framePromiseP = clPsEcs_framePromise.framePromiseP;
  var getEcsComponent = clPsEcs_ecs.getEcsComponent;
  var ecsSystem = clPsEcs_ecs.ecsSystem;
  var addEntityTag = clPsEcs_ecs.addEntityTag;
  var ecsEntityP = clPsEcs_ecs.ecsEntityP;
  var registerEcsSystem = clPsEcs_ecs.registerEcsSystem;
  var registerFuncWithPred = clPsEcs_basicProcess.registerFuncWithPred;
  var addEcsEntityToBuffer = clPsEcs_ecs.addEcsEntityToBuffer;
  var checkEntityTags = clPsEcs_ecs.checkEntityTags;
  var initFramePromise = clPsEcs_framePromise.initFramePromise;
  var framePromiseThen = clPsEcs_framePromise.framePromiseThen;
  var addEcsEntity = clPsEcs_ecs.addEcsEntity;
  var registerNextFrameFunc = clPsEcs_basicProcess.registerNextFrameFunc;
  var findAEntityByTag = clPsEcs_ecs.findAEntityByTag;
  var stackDefaultEcsEntityParent = clPsEcs_ecs.stackDefaultEcsEntityParent;
  var addEcsComponentList = clPsEcs_ecs.addEcsComponentList;
  var framePromiseAll = clPsEcs_framePromise.framePromiseAll;
  var findTheEntity = clPsEcs_ecs.findTheEntity;
  var findAEntity = clPsEcs_ecs.findAEntity;
  var hasEntityTag = clPsEcs_ecs.hasEntityTag;
  var deleteEcsComponent = clPsEcs_ecs.deleteEcsComponent;
  var getDefaultEcsEntityParent = clPsEcs_ecs.getDefaultEcsEntityParent;
  /* --- define objects --- */
  if ('undefined' === typeof MONITORINGLOGAREA) {
      var MONITORINGLOGAREA = null;
  };
  function initMonitoringLog(dom) {
      return MONITORINGLOGAREA = dom;
  };
  function clearMonitoringLog() {
      return MONITORINGLOGAREA ? (MONITORINGLOGAREA.innerHTML = 'Monitoring Log: ') : null;
  };
  function addToMonitoringLog(text) {
      return MONITORINGLOGAREA ? (MONITORINGLOGAREA.innerHTML += text + '<br>') : null;
  };
  if ('undefined' === typeof EVENTLOGAREA) {
      var EVENTLOGAREA = null;
  };
  if ('undefined' === typeof EVENTLOGTEXTLIST) {
      var EVENTLOGTEXTLIST = [];
  };
  if ('undefined' === typeof MAXEVENTLOGCOUNT) {
      var MAXEVENTLOGCOUNT = 5;
  };
  function initEventLogArea(dom) {
      return EVENTLOGAREA = dom;
  };
  function addToEventLog(text) {
      if (EVENTLOGAREA) {
          EVENTLOGTEXTLIST.unshift(text);
          EVENTLOGTEXTLIST;
          if (EVENTLOGTEXTLIST.length > MAXEVENTLOGCOUNT) {
              EVENTLOGTEXTLIST = EVENTLOGTEXTLIST.slice(0, MAXEVENTLOGCOUNT);
          };
          var log = '';
          for (var oneLine = null, _js_idx1830 = 0; _js_idx1830 < EVENTLOGTEXTLIST.length; _js_idx1830 += 1) {
              oneLine = EVENTLOGTEXTLIST[_js_idx1830];
              log = log + oneLine + '<br>';
          };
          __PS_MV_REG = [];
          return EVENTLOGAREA.innerHTML = log;
      };
  };
  if ('undefined' === typeof CONSOLELOGFUNCTION) {
      var CONSOLELOGFUNCTION = function (logKind, logLevel, controlString) {
          var args = Array.prototype.slice.call(arguments, 3);
          __PS_MV_REG = [];
          return console.log(logKind + ': ' + logLevel + ': ' + controlString + ' (args = ' + args + ')');
      };
  };
  if ('undefined' === typeof CONSOLELOGLEVELDEBUG) {
      var CONSOLELOGLEVELDEBUG = 10;
  };
  if ('undefined' === typeof CONSOLELOGLEVELWARNING) {
      var CONSOLELOGLEVELWARNING = 20;
  };
  if ('undefined' === typeof CONSOLELOGLEVELERROR) {
      var CONSOLELOGLEVELERROR = 30;
  };
  if ('undefined' === typeof CURRENTCONSOLELOGLEVEL) {
      var CURRENTCONSOLELOGLEVEL = CONSOLELOGLEVELERROR;
  };
  function getConsoleLogLevel() {
      return CURRENTCONSOLELOGLEVEL;
  };
  function convertToConsoleLogLevelSymbol(logLevelKeyward) {
      switch (logLevelKeyward) {
      case 'debug':
          return 'CONSOLELOGLEVELDEBUG';
      case 'warning':
          return 'CONSOLELOGLEVELWARNING';
      case 'error':
          return 'CONSOLELOGLEVELERROR';
      default:
          throw 'Message: ' + 'The console level ~D is not recognized' + '; Args: ' + logLevelKeyward;
      };
  };
  function setConsoleLogLevel(logLevel) {
      __PS_MV_REG = [];
      return CURRENTCONSOLELOGLEVEL = eval(convertToConsoleLogLevelSymbol(logLevel));
  };
  /* --- extern symbols --- */
  return {
    'initMonitoringLog': initMonitoringLog,
    'clearMonitoringLog': clearMonitoringLog,
    'addToMonitoringLog': addToMonitoringLog,
    'MAXEVENTLOGCOUNT': MAXEVENTLOGCOUNT,
    'initEventLogArea': initEventLogArea,
    'addToEventLog': addToEventLog,
    'CONSOLELOGFUNCTION': CONSOLELOGFUNCTION,
    'setConsoleLogLevel': setConsoleLogLevel,
    '_internal': {
      'MONITORINGLOGAREA': MONITORINGLOGAREA,
      'EVENTLOGAREA': EVENTLOGAREA,
      'EVENTLOGTEXTLIST': EVENTLOGTEXTLIST,
      'CONSOLELOGLEVELDEBUG': CONSOLELOGLEVELDEBUG,
      'CONSOLELOGLEVELWARNING': CONSOLELOGLEVELWARNING,
      'CONSOLELOGLEVELERROR': CONSOLELOGLEVELERROR,
      'CURRENTCONSOLELOGLEVEL': CURRENTCONSOLELOGLEVEL,
      'getConsoleLogLevel': getConsoleLogLevel,
      'convertToConsoleLogLevelSymbol': convertToConsoleLogLevelSymbol,
    }
  };
})();

var clWeb2dGame_core_basicComponents = (function() {
  /* --- import symbols --- */
  var deleteDeleteComponentHook = clPsEcs_ecs.deleteDeleteComponentHook;
  var makeEcsEntity = clPsEcs_ecs.makeEcsEntity;
  var addEcsComponent = clPsEcs_ecs.addEcsComponent;
  var ecsEntity = clPsEcs_ecs.ecsEntity;
  var deleteEcsComponentType = clPsEcs_ecs.deleteEcsComponentType;
  var framePromise = clPsEcs_framePromise.framePromise;
  var deleteEntityTag = clPsEcs_ecs.deleteEntityTag;
  var deleteEcsEntity = clPsEcs_ecs.deleteEcsEntity;
  var cleanEcsEnv = clPsEcs_ecs.cleanEcsEnv;
  var addDeleteComponentHook = clPsEcs_ecs.addDeleteComponentHook;
  var ecsMain = clPsEcs_ecs.ecsMain;
  var includesAllComponentTypes = clPsEcs_utils.includesAllComponentTypes;
  var findAComponent = clPsEcs_ecs.findAComponent;
  var registerNframesAfterFunc = clPsEcs_basicProcess.registerNframesAfterFunc;
  var moveEcsEntity = clPsEcs_ecs.moveEcsEntity;
  var ecsComponent = clPsEcs_ecs.ecsComponent;
  var popDefaultEcsEntityParent = clPsEcs_ecs.popDefaultEcsEntityParent;
  var framePromiseP = clPsEcs_framePromise.framePromiseP;
  var getEcsComponent = clPsEcs_ecs.getEcsComponent;
  var ecsSystem = clPsEcs_ecs.ecsSystem;
  var addEntityTag = clPsEcs_ecs.addEntityTag;
  var ecsEntityP = clPsEcs_ecs.ecsEntityP;
  var registerEcsSystem = clPsEcs_ecs.registerEcsSystem;
  var registerFuncWithPred = clPsEcs_basicProcess.registerFuncWithPred;
  var addEcsEntityToBuffer = clPsEcs_ecs.addEcsEntityToBuffer;
  var checkEntityTags = clPsEcs_ecs.checkEntityTags;
  var initFramePromise = clPsEcs_framePromise.initFramePromise;
  var framePromiseThen = clPsEcs_framePromise.framePromiseThen;
  var addEcsEntity = clPsEcs_ecs.addEcsEntity;
  var registerNextFrameFunc = clPsEcs_basicProcess.registerNextFrameFunc;
  var findAEntityByTag = clPsEcs_ecs.findAEntityByTag;
  var stackDefaultEcsEntityParent = clPsEcs_ecs.stackDefaultEcsEntityParent;
  var addEcsComponentList = clPsEcs_ecs.addEcsComponentList;
  var framePromiseAll = clPsEcs_framePromise.framePromiseAll;
  var findTheEntity = clPsEcs_ecs.findTheEntity;
  var findAEntity = clPsEcs_ecs.findAEntity;
  var hasEntityTag = clPsEcs_ecs.hasEntityTag;
  var deleteEcsComponent = clPsEcs_ecs.deleteEcsComponent;
  var getDefaultEcsEntityParent = clPsEcs_ecs.getDefaultEcsEntityParent;
  /* --- define objects --- */
  function vector2d() {
      this.parent = null;
      this.children = [];
      this.registerp = null;
      this.x = 0;
      this.y = 0;
      return this;
  };
  function makeVector2d() {
      var _js1832 = arguments.length;
      for (var n1831 = 0; n1831 < _js1832; n1831 += 2) {
          switch (arguments[n1831]) {
          case 'parent':
              parent = arguments[n1831 + 1];
              break;
          case 'children':
              children = arguments[n1831 + 1];
              break;
          case 'registerp':
              registerp = arguments[n1831 + 1];
              break;
          case 'x':
              x = arguments[n1831 + 1];
              break;
          case 'y':
              y = arguments[n1831 + 1];
          };
      };
      var parent;
      var children = 'undefined' === typeof children ? [] : children;
      var registerp;
      var x = 'undefined' === typeof x ? 0 : x;
      var y = 'undefined' === typeof y ? 0 : y;
      var result = new vector2d();
      result.parent = parent;
      result.children = children;
      result.registerp = registerp;
      result.x = x;
      result.y = y;
      __PS_MV_REG = [];
      return result;
  };
  function vector2dP(obj) {
      return (obj instanceof vector2d);
  };
  (function () {
      var tempCtor = function () {
          return null;
      };
      tempCtor.prototype = ecsComponent.prototype;
      vector2d.superClass_ = ecsComponent.prototype;
      vector2d.prototype = new tempCtor();
      __PS_MV_REG = [];
      return vector2d.prototype.constructor = vector2d;
  })();
  function point2d() {
      this.parent = null;
      this.children = [];
      this.registerp = null;
      this.x = 0;
      this.y = 0;
      this.angle = 0;
      return this;
  };
  function makePoint2d() {
      var _js1834 = arguments.length;
      for (var n1833 = 0; n1833 < _js1834; n1833 += 2) {
          switch (arguments[n1833]) {
          case 'parent':
              parent = arguments[n1833 + 1];
              break;
          case 'children':
              children = arguments[n1833 + 1];
              break;
          case 'registerp':
              registerp = arguments[n1833 + 1];
              break;
          case 'x':
              x = arguments[n1833 + 1];
              break;
          case 'y':
              y = arguments[n1833 + 1];
              break;
          case 'angle':
              angle = arguments[n1833 + 1];
          };
      };
      var parent;
      var children = 'undefined' === typeof children ? [] : children;
      var registerp;
      var x = 'undefined' === typeof x ? 0 : x;
      var y = 'undefined' === typeof y ? 0 : y;
      var angle = 'undefined' === typeof angle ? 0 : angle;
      var result = new point2d();
      result.parent = parent;
      result.children = children;
      result.registerp = registerp;
      result.x = x;
      result.y = y;
      result.angle = angle;
      __PS_MV_REG = [];
      return result;
  };
  function point2dP(obj) {
      return (obj instanceof point2d);
  };
  (function () {
      var tempCtor = function () {
          return null;
      };
      tempCtor.prototype = vector2d.prototype;
      point2d.superClass_ = vector2d.prototype;
      point2d.prototype = new tempCtor();
      __PS_MV_REG = [];
      return point2d.prototype.constructor = point2d;
  })();
  function speed2d() {
      this.parent = null;
      this.children = [];
      this.registerp = null;
      this.x = 0;
      this.y = 0;
      return this;
  };
  function makeSpeed2d() {
      var _js1836 = arguments.length;
      for (var n1835 = 0; n1835 < _js1836; n1835 += 2) {
          switch (arguments[n1835]) {
          case 'parent':
              parent = arguments[n1835 + 1];
              break;
          case 'children':
              children = arguments[n1835 + 1];
              break;
          case 'registerp':
              registerp = arguments[n1835 + 1];
              break;
          case 'x':
              x = arguments[n1835 + 1];
              break;
          case 'y':
              y = arguments[n1835 + 1];
          };
      };
      var parent;
      var children = 'undefined' === typeof children ? [] : children;
      var registerp;
      var x = 'undefined' === typeof x ? 0 : x;
      var y = 'undefined' === typeof y ? 0 : y;
      var result = new speed2d();
      result.parent = parent;
      result.children = children;
      result.registerp = registerp;
      result.x = x;
      result.y = y;
      __PS_MV_REG = [];
      return result;
  };
  function speed2dP(obj) {
      return (obj instanceof speed2d);
  };
  (function () {
      var tempCtor = function () {
          return null;
      };
      tempCtor.prototype = vector2d.prototype;
      speed2d.superClass_ = vector2d.prototype;
      speed2d.prototype = new tempCtor();
      __PS_MV_REG = [];
      return speed2d.prototype.constructor = speed2d;
  })();
  function rect2d() {
      this.parent = null;
      this.children = [];
      this.registerp = null;
      this.x = 0;
      this.y = 0;
      this.width = 0;
      this.height = 0;
      return this;
  };
  function makeRect2d() {
      var _js1838 = arguments.length;
      for (var n1837 = 0; n1837 < _js1838; n1837 += 2) {
          switch (arguments[n1837]) {
          case 'parent':
              parent = arguments[n1837 + 1];
              break;
          case 'children':
              children = arguments[n1837 + 1];
              break;
          case 'registerp':
              registerp = arguments[n1837 + 1];
              break;
          case 'x':
              x = arguments[n1837 + 1];
              break;
          case 'y':
              y = arguments[n1837 + 1];
              break;
          case 'width':
              width = arguments[n1837 + 1];
              break;
          case 'height':
              height = arguments[n1837 + 1];
          };
      };
      var parent;
      var children = 'undefined' === typeof children ? [] : children;
      var registerp;
      var x = 'undefined' === typeof x ? 0 : x;
      var y = 'undefined' === typeof y ? 0 : y;
      var width = 'undefined' === typeof width ? 0 : width;
      var height = 'undefined' === typeof height ? 0 : height;
      var result = new rect2d();
      result.parent = parent;
      result.children = children;
      result.registerp = registerp;
      result.x = x;
      result.y = y;
      result.width = width;
      result.height = height;
      __PS_MV_REG = [];
      return result;
  };
  function rect2dP(obj) {
      return (obj instanceof rect2d);
  };
  (function () {
      var tempCtor = function () {
          return null;
      };
      tempCtor.prototype = ecsComponent.prototype;
      rect2d.superClass_ = ecsComponent.prototype;
      rect2d.prototype = new tempCtor();
      __PS_MV_REG = [];
      return rect2d.prototype.constructor = rect2d;
  })();
  function rotate2d() {
      this.parent = null;
      this.children = [];
      this.registerp = null;
      this.speed = 0;
      this.angle = 0;
      this.radious = 0;
      return this;
  };
  function makeRotate2d() {
      var _js1840 = arguments.length;
      for (var n1839 = 0; n1839 < _js1840; n1839 += 2) {
          switch (arguments[n1839]) {
          case 'parent':
              parent = arguments[n1839 + 1];
              break;
          case 'children':
              children = arguments[n1839 + 1];
              break;
          case 'registerp':
              registerp = arguments[n1839 + 1];
              break;
          case 'speed':
              speed = arguments[n1839 + 1];
              break;
          case 'angle':
              angle = arguments[n1839 + 1];
              break;
          case 'radious':
              radious = arguments[n1839 + 1];
          };
      };
      var parent;
      var children = 'undefined' === typeof children ? [] : children;
      var registerp;
      var speed = 'undefined' === typeof speed ? 0 : speed;
      var angle = 'undefined' === typeof angle ? 0 : angle;
      var radious = 'undefined' === typeof radious ? 0 : radious;
      var result = new rotate2d();
      result.parent = parent;
      result.children = children;
      result.registerp = registerp;
      result.speed = speed;
      result.angle = angle;
      result.radious = radious;
      __PS_MV_REG = [];
      return result;
  };
  function rotate2dP(obj) {
      return (obj instanceof rotate2d);
  };
  (function () {
      var tempCtor = function () {
          return null;
      };
      tempCtor.prototype = ecsComponent.prototype;
      rotate2d.superClass_ = ecsComponent.prototype;
      rotate2d.prototype = new tempCtor();
      __PS_MV_REG = [];
      return rotate2d.prototype.constructor = rotate2d;
  })();
  function params() {
      this.parent = null;
      this.children = [];
      this.registerp = null;
      this.table = {  };
      return this;
  };
  function makeParams() {
      var _js1842 = arguments.length;
      for (var n1841 = 0; n1841 < _js1842; n1841 += 2) {
          switch (arguments[n1841]) {
          case 'parent':
              parent = arguments[n1841 + 1];
              break;
          case 'children':
              children = arguments[n1841 + 1];
              break;
          case 'registerp':
              registerp = arguments[n1841 + 1];
              break;
          case 'table':
              table = arguments[n1841 + 1];
          };
      };
      var parent;
      var children = 'undefined' === typeof children ? [] : children;
      var registerp;
      var table = 'undefined' === typeof table ? {  } : table;
      var result = new params();
      result.parent = parent;
      result.children = children;
      result.registerp = registerp;
      result.table = table;
      __PS_MV_REG = [];
      return result;
  };
  function paramsP(obj) {
      return (obj instanceof params);
  };
  (function () {
      var tempCtor = function () {
          return null;
      };
      tempCtor.prototype = ecsComponent.prototype;
      params.superClass_ = ecsComponent.prototype;
      params.prototype = new tempCtor();
      __PS_MV_REG = [];
      return params.prototype.constructor = params;
  })();
  function script2d() {
      this.parent = null;
      this.children = [];
      this.registerp = null;
      this.func = function (entity) {
          return entity;
      };
      return this;
  };
  function makeScript2d() {
      var _js1844 = arguments.length;
      for (var n1843 = 0; n1843 < _js1844; n1843 += 2) {
          switch (arguments[n1843]) {
          case 'parent':
              parent = arguments[n1843 + 1];
              break;
          case 'children':
              children = arguments[n1843 + 1];
              break;
          case 'registerp':
              registerp = arguments[n1843 + 1];
              break;
          case 'func':
              func = arguments[n1843 + 1];
          };
      };
      var parent;
      var children = 'undefined' === typeof children ? [] : children;
      var registerp;
      var func = 'undefined' === typeof func ? function (entity) {
          return entity;
      } : func;
      var result = new script2d();
      result.parent = parent;
      result.children = children;
      result.registerp = registerp;
      result.func = func;
      __PS_MV_REG = [];
      return result;
  };
  function script2dP(obj) {
      return (obj instanceof script2d);
  };
  (function () {
      var tempCtor = function () {
          return null;
      };
      tempCtor.prototype = ecsComponent.prototype;
      script2d.superClass_ = ecsComponent.prototype;
      script2d.prototype = new tempCtor();
      __PS_MV_REG = [];
      return script2d.prototype.constructor = script2d;
  })();
  function copyVector2dTo(dstVector, srcVector) {
      dstVector.x = srcVector.x;
      dstVector.y = srcVector.y;
      return dstVector;
  };
  function cloneVector2d(vector) {
      __PS_MV_REG = [];
      return makeVector2d('x', vector.x, 'y', vector.y);
  };
  function copyPoint2dTo(dstPoint, srcPoint) {
      dstPoint.x = srcPoint.x;
      dstPoint.y = srcPoint.y;
      dstPoint.angle = srcPoint.angle;
      return dstPoint;
  };
  function clonePoint2d(point) {
      __PS_MV_REG = [];
      return makePoint2d('x', point.x, 'y', point.y, 'angle', point.angle);
  };
  function getEntityParam(entity, key) {
      var params1845 = (found = getEcsComponent(params, entity), found ? found : (function () {
          throw 'PARAMS is not included in the entity';
      })());
      __PS_MV_REG = [];
      return params1845.table[key];
  };
  function setEntityParam(entity) {
      var keyValuePair = Array.prototype.slice.call(arguments, 1);
      var params1846 = getEcsComponent(params, entity);
      var len = keyValuePair.length;
      if ((len % 2 + 2) % 2 !== 0) {
          throw 'Message: ' + 'Failed assertion: ~A' + '; Args: ' + ((len % 2 + 2) % 2 === 0);
      };
      if (!params1846) {
          params1846 = makeParams();
          addEcsComponent(params1846, entity);
      };
      var _js1847 = len / 2;
      for (var i = 0; i < _js1847; i += 1) {
          var key = keyValuePair[i * 2];
          var value = keyValuePair[i * 2 + 1];
          params1846.table[key] = value;
      };
      __PS_MV_REG = [];
      return keyValuePair[len - 1];
  };
  function initEntityParams() {
      var keyValuePairs = Array.prototype.slice.call(arguments, 0);
      if (keyValuePairs.length % 2) {
          throw 'odd number of args to INIT-ENTITY-PARAMS';
      };
      var table = {  };
      var rec = function (restPairs) {
          if (restPairs.length > 0) {
              table[restPairs[0]] = restPairs[1];
              __PS_MV_REG = [];
              return rec(restPairs.slice(1).slice(1));
          };
      };
      rec(keyValuePairs);
      __PS_MV_REG = [];
      return makeParams('table', table);
  };
  /* --- extern symbols --- */
  return {
    'vector2d': vector2d,
    'makeVector2d': makeVector2d,
    'vector2dP': vector2dP,
    'point2d': point2d,
    'makePoint2d': makePoint2d,
    'point2dP': point2dP,
    'speed2d': speed2d,
    'makeSpeed2d': makeSpeed2d,
    'speed2dP': speed2dP,
    'rect2d': rect2d,
    'makeRect2d': makeRect2d,
    'rect2dP': rect2dP,
    'rotate2d': rotate2d,
    'makeRotate2d': makeRotate2d,
    'rotate2dP': rotate2dP,
    'params': params,
    'script2d': script2d,
    'makeScript2d': makeScript2d,
    'copyVector2dTo': copyVector2dTo,
    'cloneVector2d': cloneVector2d,
    'copyPoint2dTo': copyPoint2dTo,
    'clonePoint2d': clonePoint2d,
    'getEntityParam': getEntityParam,
    'setEntityParam': setEntityParam,
    'initEntityParams': initEntityParams,
    '_internal': {
      'makeParams': makeParams,
      'paramsP': paramsP,
      'script2dP': script2dP,
    }
  };
})();

var clWeb2dGame_inputs_input = (function() {
  /* --- import symbols --- */
  var getScreenHeight = clWeb2dGame_core_camera.getScreenHeight;
  var initCamera = clWeb2dGame_core_camera.initCamera;
  var getCameraOffsetX = clWeb2dGame_core_camera.getCameraOffsetX;
  var getCameraOffsetY = clWeb2dGame_core_camera.getCameraOffsetY;
  var getScreenWidth = clWeb2dGame_core_camera.getScreenWidth;
  var deleteDeleteComponentHook = clPsEcs_ecs.deleteDeleteComponentHook;
  var makeEcsEntity = clPsEcs_ecs.makeEcsEntity;
  var addEcsComponent = clPsEcs_ecs.addEcsComponent;
  var ecsEntity = clPsEcs_ecs.ecsEntity;
  var deleteEcsComponentType = clPsEcs_ecs.deleteEcsComponentType;
  var framePromise = clPsEcs_framePromise.framePromise;
  var deleteEntityTag = clPsEcs_ecs.deleteEntityTag;
  var deleteEcsEntity = clPsEcs_ecs.deleteEcsEntity;
  var cleanEcsEnv = clPsEcs_ecs.cleanEcsEnv;
  var addDeleteComponentHook = clPsEcs_ecs.addDeleteComponentHook;
  var ecsMain = clPsEcs_ecs.ecsMain;
  var includesAllComponentTypes = clPsEcs_utils.includesAllComponentTypes;
  var findAComponent = clPsEcs_ecs.findAComponent;
  var registerNframesAfterFunc = clPsEcs_basicProcess.registerNframesAfterFunc;
  var moveEcsEntity = clPsEcs_ecs.moveEcsEntity;
  var ecsComponent = clPsEcs_ecs.ecsComponent;
  var popDefaultEcsEntityParent = clPsEcs_ecs.popDefaultEcsEntityParent;
  var framePromiseP = clPsEcs_framePromise.framePromiseP;
  var getEcsComponent = clPsEcs_ecs.getEcsComponent;
  var ecsSystem = clPsEcs_ecs.ecsSystem;
  var addEntityTag = clPsEcs_ecs.addEntityTag;
  var ecsEntityP = clPsEcs_ecs.ecsEntityP;
  var registerEcsSystem = clPsEcs_ecs.registerEcsSystem;
  var registerFuncWithPred = clPsEcs_basicProcess.registerFuncWithPred;
  var addEcsEntityToBuffer = clPsEcs_ecs.addEcsEntityToBuffer;
  var checkEntityTags = clPsEcs_ecs.checkEntityTags;
  var initFramePromise = clPsEcs_framePromise.initFramePromise;
  var framePromiseThen = clPsEcs_framePromise.framePromiseThen;
  var addEcsEntity = clPsEcs_ecs.addEcsEntity;
  var registerNextFrameFunc = clPsEcs_basicProcess.registerNextFrameFunc;
  var findAEntityByTag = clPsEcs_ecs.findAEntityByTag;
  var stackDefaultEcsEntityParent = clPsEcs_ecs.stackDefaultEcsEntityParent;
  var addEcsComponentList = clPsEcs_ecs.addEcsComponentList;
  var framePromiseAll = clPsEcs_framePromise.framePromiseAll;
  var findTheEntity = clPsEcs_ecs.findTheEntity;
  var findAEntity = clPsEcs_ecs.findAEntity;
  var hasEntityTag = clPsEcs_ecs.hasEntityTag;
  var deleteEcsComponent = clPsEcs_ecs.deleteEcsComponent;
  var getDefaultEcsEntityParent = clPsEcs_ecs.getDefaultEcsEntityParent;
  var makeVector2d = clWeb2dGame_core_basicComponents.makeVector2d;
  /* --- define objects --- */
  function processInput() {
      processKeyboardInput();
      processMouseInput();
      __PS_MV_REG = [];
      return processTouchInput();
  };
  function calcNextInputCount(current, deviceState) {
      if (deviceState) {
          return current >= 0 ? current + 1 : 1;
      } else {
          return current <= 0 ? current - 1 : -1;
      };
  };
  function calcStateFromCount(count) {
      if (count === 1) {
          return 'down-now';
      } else if (count > 1) {
          return 'down';
      } else if (count === -1) {
          return 'up-now';
      } else if (count < -1) {
          return 'up';
      } else if (count === 0) {
          return 'up';
      };
  };
  function inputOnNowP(current) {
      return current === 1;
  };
  function inputOnP(current) {
      return current > 0;
  };
  function inputOffNowP(current) {
      return current === -1;
  };
  function inputOffP(current) {
      return current < 0;
  };
  function inputOnCount(current) {
      __PS_MV_REG = [];
      return inputOnP(current) ? current : 0;
  };
  function inputOffCount(current) {
      __PS_MV_REG = [];
      return inputOffP(current) ? -1 * current : 0;
  };
  if ('undefined' === typeof KEYBOARD) {
      var KEYBOARD = new THREEx.KeyboardState();
  };
  if ('undefined' === typeof BUTTONTOKEYBOARD) {
      var BUTTONTOKEYBOARD = {  };
  };
  if ('undefined' === typeof KEYSTATUS) {
      var KEYSTATUS = {  };
  };
  /** Start monitoring the key "physical-key-name". It will be accessed by is-key-down or etc with "virutal-ke-name". */
  function startKeyMonitoring(virtualKeyName, physicalKeyName) {
      BUTTONTOKEYBOARD[virtualKeyName] = physicalKeyName;
      return KEYSTATUS[virtualKeyName] = 0;
  };
  function initKeyboard() {
      __PS_MV_REG = [];
      return [['a', 'z'], ['b', 'x'], ['c', 'c'], ['left', 'left'], ['right', 'right'], ['up', 'up'], ['down', 'down']].map(function (pair) {
          __PS_MV_REG = [];
          return startKeyMonitoring(pair[0], pair[1]);
      });
  };
  function getPhysicalKeyName(virtualKeyName) {
      return BUTTONTOKEYBOARD[virtualKeyName];
  };
  /** Return if the button is down */
  function keyDownP(button) {
      __PS_MV_REG = [];
      return inputOnP(KEYSTATUS[button]);
  };
  /** Return if the button is down just in this frame */
  function keyDownNowP(button) {
      __PS_MV_REG = [];
      return inputOnNowP(KEYSTATUS[button]);
  };
  /** Return if the button is up */
  function keyUpP(button) {
      __PS_MV_REG = [];
      return inputOffP(KEYSTATUS[button]);
  };
  /** Return if the button is up just in this frame */
  function keyUpNowP(button) {
      __PS_MV_REG = [];
      return inputOffNowP(KEYSTATUS[button]);
  };
  function keyDownCount(button) {
      __PS_MV_REG = [];
      return inputOnCount(KEYSTATUS[button]);
  };
  function keyUpCount(button) {
      __PS_MV_REG = [];
      return inputOffCount(KEYSTATUS[button]);
  };
  function processKeyboardInput() {
      var hashTable1848 = BUTTONTOKEYBOARD;
      for (var key = null, _js_arrvar1850 = Object.keys(hashTable1848), _js_idx1849 = 0; _js_idx1849 < _js_arrvar1850.length; _js_idx1849 += 1) {
          key = _js_arrvar1850[_js_idx1849];
          (function (button, key) {
              __PS_MV_REG = [];
              return KEYSTATUS[button] = calcNextInputCount(KEYSTATUS[button], KEYBOARD.pressed(key));
          })(key, hashTable1848[key]);
      };
  };
  if ('undefined' === typeof _mouseX) {
      var _mouseX = -100;
  };
  if ('undefined' === typeof _mouseY) {
      var _mouseY = -100;
  };
  if ('undefined' === typeof MOUSELEFTCOUNT) {
      var MOUSELEFTCOUNT = 0;
  };
  if ('undefined' === typeof MOUSERIGHTCOUNT) {
      var MOUSERIGHTCOUNT = 0;
  };
  if ('undefined' === typeof MOUSEXBUFFER) {
      var MOUSEXBUFFER = -100;
  };
  if ('undefined' === typeof MOUSEYBUFFER) {
      var MOUSEYBUFFER = -100;
  };
  if ('undefined' === typeof MOUSELEFTBUFFER) {
      var MOUSELEFTBUFFER = null;
  };
  if ('undefined' === typeof MOUSERIGHTBUFFER) {
      var MOUSERIGHTBUFFER = null;
  };
  if ('undefined' === typeof MOUSELEFTBUTTONID) {
      var MOUSELEFTBUTTONID = 1;
  };
  if ('undefined' === typeof MOUSERIGHTBUTTONID) {
      var MOUSERIGHTBUTTONID = 3;
  };
  if ('undefined' === typeof MOUSEWHEELDELTAYBUFFER) {
      var MOUSEWHEELDELTAYBUFFER = 0;
  };
  if ('undefined' === typeof MOUSEWHEELDELTAY) {
      var MOUSEWHEELDELTAY = 0;
  };
  function processMouseInput() {
      _mouseX = MOUSEXBUFFER;
      _mouseY = MOUSEYBUFFER;
      MOUSELEFTCOUNT = calcNextInputCount(MOUSELEFTCOUNT, MOUSELEFTBUFFER);
      MOUSERIGHTCOUNT = calcNextInputCount(MOUSERIGHTCOUNT, MOUSERIGHTBUFFER);
      MOUSEWHEELDELTAY = MOUSEWHEELDELTAYBUFFER;
      __PS_MV_REG = [];
      return MOUSEWHEELDELTAYBUFFER = 0;
  };
  function getMouseX() {
      return _mouseX;
  };
  function getMouseY() {
      return _mouseY;
  };
  function getLeftMouseState() {
      __PS_MV_REG = [];
      return calcStateFromCount(MOUSELEFTCOUNT);
  };
  function getRightMouseState() {
      __PS_MV_REG = [];
      return calcStateFromCount(MOUSERIGHTCOUNT);
  };
  function getMouseWheelDeltaY() {
      return MOUSEWHEELDELTAY;
  };
  /** Get mouse state. "which" means :left or :right. */
  function getMouseState(which) {
      switch (which) {
      case 'left':
          __PS_MV_REG = [];
          return getLeftMouseState();
      case 'right':
          __PS_MV_REG = [];
          return getRightMouseState();
      default:
          throw 'Message: ' + 'The value ~A is not of the expected type (MEMBER ~A)' + '; Args: ' + which + ', ' + ['left', 'right'];
      };
  };
  function getMouseDownCount(which) {
      __PS_MV_REG = [];
      return inputOnCount((function () {
          switch (which) {
          case 'left':
              return MOUSELEFTCOUNT;
          case 'right':
              return MOUSERIGHTBUFFER;
          default:
              throw 'Message: ' + 'The value ~A is not of the expected type (MEMBER ~A)' + '; Args: ' + which + ', ' + ['left', 'right'];
          };
      })());
  };
  function getMouseUpCount(which) {
      __PS_MV_REG = [];
      return inputOffCount((function () {
          switch (which) {
          case 'left':
              return MOUSELEFTCOUNT;
          case 'right':
              return MOUSERIGHTBUFFER;
          default:
              throw 'Message: ' + 'The value ~A is not of the expected type (MEMBER ~A)' + '; Args: ' + which + ', ' + ['left', 'right'];
          };
      })());
  };
  function makeAdjustedInputPoint(x, y) {
      var renderer = clWeb2dGame_utils_domManager._internal.DOMSTORE['render'];
      var canvas = renderer.querySelector('canvas');
      var scale = (1.0 * renderer.clientHeight) / getScreenHeight();
      __PS_MV_REG = [];
      return makeVector2d('x', (x - renderer.offsetLeft) / scale - getCameraOffsetX(), 'y', ((canvas.height - y) + renderer.offsetTop) / scale - getCameraOffsetY());
  };
  function setMousePoint(x, y) {
      var adjusted = makeAdjustedInputPoint(x, y);
      MOUSEXBUFFER = adjusted.x;
      __PS_MV_REG = [];
      return MOUSEYBUFFER = adjusted.y;
  };
  if ('undefined' === typeof MOUSEDOWNCALLBACKS) {
      var MOUSEDOWNCALLBACKS = [];
  };
  function addMouseDownCallback(callback) {
      MOUSEDOWNCALLBACKS.unshift(callback);
      __PS_MV_REG = [];
      return MOUSEDOWNCALLBACKS;
  };
  function callMouseDownCallbacks(e) {
      for (var i = 0; i < MOUSEDOWNCALLBACKS.length; i += 1) {
          MOUSEDOWNCALLBACKS[i](e);
      };
  };
  if ('undefined' === typeof MOUSEUPCALLBACKS) {
      var MOUSEUPCALLBACKS = [];
  };
  function addMouseUpCallback(callback) {
      MOUSEUPCALLBACKS.unshift(callback);
      __PS_MV_REG = [];
      return MOUSEUPCALLBACKS;
  };
  function callMouseUpCallbacks(e) {
      for (var i = 0; i < MOUSEUPCALLBACKS.length; i += 1) {
          MOUSEUPCALLBACKS[i](e);
      };
  };
  if ('undefined' === typeof MOUSEMOVECALLBACKS) {
      var MOUSEMOVECALLBACKS = [];
  };
  function addMouseMoveCallback(callback) {
      MOUSEMOVECALLBACKS.unshift(callback);
      __PS_MV_REG = [];
      return MOUSEMOVECALLBACKS;
  };
  function callMouseMoveCallbacks(e) {
      for (var i = 0; i < MOUSEMOVECALLBACKS.length; i += 1) {
          MOUSEMOVECALLBACKS[i](e);
      };
  };
  if ('undefined' === typeof MOUSEWHEELCALLBACKS) {
      var MOUSEWHEELCALLBACKS = [];
  };
  function addMouseWheelCallback(callback) {
      MOUSEWHEELCALLBACKS.unshift(callback);
      __PS_MV_REG = [];
      return MOUSEWHEELCALLBACKS;
  };
  function callMouseWheelCallbacks(e) {
      for (var i = 0; i < MOUSEWHEELCALLBACKS.length; i += 1) {
          MOUSEWHEELCALLBACKS[i](e);
      };
  };
  if ('undefined' === typeof TOUCHSTARTCALLBACKS) {
      var TOUCHSTARTCALLBACKS = [];
  };
  function addTouchStartCallback(callback) {
      TOUCHSTARTCALLBACKS.unshift(callback);
      __PS_MV_REG = [];
      return TOUCHSTARTCALLBACKS;
  };
  function callTouchStartCallbacks(e) {
      for (var i = 0; i < TOUCHSTARTCALLBACKS.length; i += 1) {
          TOUCHSTARTCALLBACKS[i](e);
      };
  };
  if ('undefined' === typeof TOUCHENDCALLBACKS) {
      var TOUCHENDCALLBACKS = [];
  };
  function addTouchEndCallback(callback) {
      TOUCHENDCALLBACKS.unshift(callback);
      __PS_MV_REG = [];
      return TOUCHENDCALLBACKS;
  };
  function callTouchEndCallbacks(e) {
      for (var i = 0; i < TOUCHENDCALLBACKS.length; i += 1) {
          TOUCHENDCALLBACKS[i](e);
      };
  };
  if ('undefined' === typeof TOUCHMOVECALLBACKS) {
      var TOUCHMOVECALLBACKS = [];
  };
  function addTouchMoveCallback(callback) {
      TOUCHMOVECALLBACKS.unshift(callback);
      __PS_MV_REG = [];
      return TOUCHMOVECALLBACKS;
  };
  function callTouchMoveCallbacks(e) {
      for (var i = 0; i < TOUCHMOVECALLBACKS.length; i += 1) {
          TOUCHMOVECALLBACKS[i](e);
      };
  };
  function mouseEvent() {
      this.x = null;
      this.y = null;
      return this;
  };
  function makeMouseEvent() {
      var _js1852 = arguments.length;
      for (var n1851 = 0; n1851 < _js1852; n1851 += 2) {
          switch (arguments[n1851]) {
          case 'x':
              x = arguments[n1851 + 1];
              break;
          case 'y':
              y = arguments[n1851 + 1];
          };
      };
      var x;
      var y;
      var result = new mouseEvent();
      result.x = x;
      result.y = y;
      __PS_MV_REG = [];
      return result;
  };
  function mouseEventP(obj) {
      return (obj instanceof mouseEvent);
  };
  function initMouseEvent(e) {
      __PS_MV_REG = [];
      return makeMouseEvent('x', e.clientX, 'y', e.clientY);
  };
  function onMouseMoveEvent(e) {
      setMousePoint(e.clientX, e.clientY);
      __PS_MV_REG = [];
      return callMouseMoveCallbacks(initMouseEvent(e));
  };
  function onMouseDownEvent(e) {
      if (e.which === MOUSELEFTBUTTONID) {
          MOUSELEFTBUFFER = true;
      };
      if (e.which === MOUSERIGHTBUTTONID) {
          MOUSERIGHTBUFFER = true;
      };
      __PS_MV_REG = [];
      return callMouseDownCallbacks(initMouseEvent(e));
  };
  function onMouseUpEvent(e) {
      if (e.which === MOUSELEFTBUTTONID) {
          MOUSELEFTBUFFER = null;
      };
      if (e.which === MOUSERIGHTBUTTONID) {
          MOUSERIGHTBUFFER = null;
      };
      __PS_MV_REG = [];
      return callMouseUpCallbacks(initMouseEvent(e));
  };
  function onWheelEvent(e) {
      MOUSEWHEELDELTAYBUFFER = e.deltaY;
      __PS_MV_REG = [];
      return callMouseWheelCallbacks(e);
  };
  function touchEventElement() {
      this.x = null;
      this.y = null;
      this.id = null;
      this.count = 0;
      return this;
  };
  function makeTouchEventElement() {
      var _js1854 = arguments.length;
      for (var n1853 = 0; n1853 < _js1854; n1853 += 2) {
          switch (arguments[n1853]) {
          case 'x':
              x = arguments[n1853 + 1];
              break;
          case 'y':
              y = arguments[n1853 + 1];
              break;
          case 'id':
              id = arguments[n1853 + 1];
              break;
          case 'count':
              count = arguments[n1853 + 1];
          };
      };
      var x;
      var y;
      var id;
      var count = 'undefined' === typeof count ? 0 : count;
      var result = new touchEventElement();
      result.x = x;
      result.y = y;
      result.id = id;
      result.count = count;
      __PS_MV_REG = [];
      return result;
  };
  function touchEventElementP(obj) {
      return (obj instanceof touchEventElement);
  };
  function touchEvent() {
      this.touches = null;
      return this;
  };
  function makeTouchEvent() {
      var _js1856 = arguments.length;
      for (var n1855 = 0; n1855 < _js1856; n1855 += 2) {
          switch (arguments[n1855]) {
          case 'touches':
              touches = arguments[n1855 + 1];
          };
      };
      var touches;
      var result = new touchEvent();
      result.touches = touches;
      __PS_MV_REG = [];
      return result;
  };
  function touchEventP(obj) {
      return (obj instanceof touchEvent);
  };
  if ('undefined' === typeof TOUCHSTATEHASH) {
      var TOUCHSTATEHASH = {  };
  };
  function getTouchStateHash() {
      return TOUCHSTATEHASH;
  };
  function getTouchState(id) {
      var elem = TOUCHSTATEHASH[id];
      if (!elem) {
          return 'up';
      };
      var count1857 = elem.count;
      if (count1857 === 0) {
          return 'up';
      } else if (count1857 === 1) {
          return 'down-now';
      } else if (count1857 > 1) {
          return 'down';
      } else if (count1857 === -1) {
          return 'down';
      } else if (count1857 === -2) {
          return 'up-now';
      } else {
          return 'up';
      };
  };
  function getTotalTouchState() {
      var count = 0;
      var result = null;
      var hashTable1858 = getTouchStateHash();
      for (var key = null, _js_arrvar1860 = Object.keys(hashTable1858), _js_idx1859 = 0; _js_idx1859 < _js_arrvar1860.length; _js_idx1859 += 1) {
          key = _js_arrvar1860[_js_idx1859];
          (function (id, hashValue1115) {
              return hashValue1115.count !== 0 ? ++count : null;
          })(key, hashTable1858[key]);
      };
      switch (count) {
      case 0:
          result = 'up';
          break;
      case 1:
          var hashTable1861 = getTouchStateHash();
          for (var key = null, _js_arrvar1863 = Object.keys(hashTable1861), _js_idx1862 = 0; _js_idx1862 < _js_arrvar1863.length; _js_idx1862 += 1) {
              key = _js_arrvar1863[_js_idx1862];
              (function (id, hashValue1116) {
                  __PS_MV_REG = [];
                  return hashValue1116.count !== 0 ? (result = getTouchState(id)) : null;
              })(key, hashTable1861[key]);
          };
          break;
      default:
          var calcPriority = function (state) {
              switch (state) {
              case 'down':
                  return 4;
              case 'down-now':
                  return 3;
              case 'up-now':
                  return 2;
              case 'up':
                  return 1;
              default:
                  throw 'Message: ' + 'The value ~A is not of the expected type (MEMBER ~A)' + '; Args: ' + state + ', ' + ['down', 'down-now', 'up-now', 'up'];
              };
          };
          var priorP = function (newState, oldState) {
              __PS_MV_REG = [];
              return calcPriority(newState) > calcPriority(oldState);
          };
          var hashTable1864 = getTouchStateHash();
          for (var key = null, _js_arrvar1866 = Object.keys(hashTable1864), _js_idx1865 = 0; _js_idx1865 < _js_arrvar1866.length; _js_idx1865 += 1) {
              key = _js_arrvar1866[_js_idx1865];
              (function (id, hashValue1117) {
                  if (hashValue1117.count !== 0) {
                      var state = getTouchState(id);
                      __PS_MV_REG = [];
                      return result == null || priorP(state, result) ? (result = state) : null;
                  } else {
                      __PS_MV_REG = [];
                      return null;
                  };
              })(key, hashTable1864[key]);
          };
      };
      if (!result) {
          throw 'Message: ' + 'Failed assertion: ~A' + '; Args: ' + result;
      };
      __PS_MV_REG = [];
      return result;
  };
  function getTouchX(id) {
      var elem = TOUCHSTATEHASH[id];
      if (!(elem && elem.count > 0)) {
          throw 'Message: ' + 'Failed assertion: ~A' + '; Args: ' + (elem && elem.count > 0);
      };
      return elem.x;
  };
  function getTotalTouchAverage(fn, defaultValue) {
      var sum = 0;
      var count = 0;
      var hashTable1867 = getTouchStateHash();
      for (var key = null, _js_arrvar1869 = Object.keys(hashTable1867), _js_idx1868 = 0; _js_idx1868 < _js_arrvar1869.length; _js_idx1868 += 1) {
          key = _js_arrvar1869[_js_idx1868];
          (function (id, hashValue1118) {
              if (hashValue1118.count !== 0) {
                  sum += fn(id);
                  return ++count;
              };
          })(key, hashTable1867[key]);
      };
      __PS_MV_REG = [];
      return count > 0 ? sum / count : defaultValue;
  };
  function getTotalTouchX() {
      __PS_MV_REG = [];
      return getTotalTouchAverage(getTouchX, 0);
  };
  function getTouchY(id) {
      var elem = TOUCHSTATEHASH[id];
      if (!(elem && elem.count > 0)) {
          throw 'Message: ' + 'Failed assertion: ~A' + '; Args: ' + (elem && elem.count > 0);
      };
      return elem.y;
  };
  function getTotalTouchY() {
      __PS_MV_REG = [];
      return getTotalTouchAverage(getTouchY, 0);
  };
  function processTouchInput() {
      var hashTable1870 = TOUCHSTATEHASH;
      for (var key = null, _js_arrvar1872 = Object.keys(hashTable1870), _js_idx1871 = 0; _js_idx1871 < _js_arrvar1872.length; _js_idx1871 += 1) {
          key = _js_arrvar1872[_js_idx1871];
          (function (id, state) {
              if (state.count >= 0) {
                  return ++state.count;
              } else {
                  --state.count;
                  if (state.count < -2) {
                      __PS_MV_REG = [];
                      return registerNextFrameFunc(function () {
                          var result = id in TOUCHSTATEHASH;
                          delete TOUCHSTATEHASH[id];
                          return result;
                      });
                  };
              };
          })(key, hashTable1870[key]);
      };
  };
  function setXyOfTouchEventElement(elem, rawTouchEvent) {
      var adjusted = makeAdjustedInputPoint(rawTouchEvent.clientX, rawTouchEvent.clientY);
      elem.x = adjusted.x;
      __PS_MV_REG = [];
      return elem.y = adjusted.y;
  };
  function updateTouchStateByEvent(id, touchEvent) {
      var target = TOUCHSTATEHASH[id];
      if (!target) {
          throw 'Message: ' + 'Failed assertion: ~A' + '; Args: ' + target;
      };
      __PS_MV_REG = [];
      return setXyOfTouchEventElement(target, touchEvent);
  };
  function initTouchEvent(e) {
      var result = makeTouchEvent('touches', new Array(e.touches.length));
      var touches1873 = result.touches;
      for (var i = 0; i < e.changedTouches.length; i += 1) {
          var touch = e.changedTouches[i];
          var elem = makeTouchEventElement('id', touch.identifier);
          setXyOfTouchEventElement(elem, touch);
          touches1873[i] = elem;
      };
      __PS_MV_REG = [];
      return result;
  };
  function onTouchStart(e) {
      var event = initTouchEvent(e);
      for (var eventElem = null, _js_arrvar1875 = event.touches, _js_idx1874 = 0; _js_idx1874 < _js_arrvar1875.length; _js_idx1874 += 1) {
          eventElem = _js_arrvar1875[_js_idx1874];
          TOUCHSTATEHASH[eventElem.id] = eventElem;
      };
      __PS_MV_REG = [];
      return callTouchStartCallbacks(event);
  };
  function onTouchEnd(e) {
      if (e.touches.length === 0) {
      };
      for (var touch = null, _js_arrvar1877 = e.changedTouches, _js_idx1876 = 0; _js_idx1876 < _js_arrvar1877.length; _js_idx1876 += 1) {
          touch = _js_arrvar1877[_js_idx1876];
          var eventElem = TOUCHSTATEHASH[touch.identifier];
          if (!eventElem) {
              throw 'Message: ' + 'Failed assertion: ~A' + '; Args: ' + eventElem;
          };
          eventElem.count = -1;
      };
      __PS_MV_REG = [];
      return callTouchEndCallbacks(initTouchEvent(e));
  };
  function onTouchMoveEvent(e) {
      for (var touch = null, _js_arrvar1879 = e.changedTouches, _js_idx1878 = 0; _js_idx1878 < _js_arrvar1879.length; _js_idx1878 += 1) {
          touch = _js_arrvar1879[_js_idx1878];
          var eventElem = TOUCHSTATEHASH[touch.identifier];
          if (!eventElem) {
              throw 'Message: ' + 'Failed assertion: ~A' + '; Args: ' + eventElem;
          };
          updateTouchStateByEvent(eventElem.id, touch);
      };
      __PS_MV_REG = [];
      return callTouchMoveCallbacks(initTouchEvent(e));
  };
  function initInput() {
      initKeyboard();
      window.addEventListener('contextmenu', function (e) {
          __PS_MV_REG = [];
          return e.preventDefault();
      });
      window.addEventListener('mousemove', onMouseMoveEvent);
      window.addEventListener('mousedown', onMouseDownEvent);
      window.addEventListener('mouseup', onMouseUpEvent);
      window.addEventListener('wheel', onWheelEvent);
      window.addEventListener('touchstart', onTouchStart);
      window.addEventListener('touchend', onTouchEnd);
      window.addEventListener('touchmove', onTouchMoveEvent);
      __PS_MV_REG = [];
      return window.addEventListener('keydown', function (e) {
          __PS_MV_REG = [];
          return e.preventDefault();
      });
  };
  /* --- extern symbols --- */
  return {
    'processInput': processInput,
    'startKeyMonitoring': startKeyMonitoring,
    'getPhysicalKeyName': getPhysicalKeyName,
    'keyDownP': keyDownP,
    'keyDownNowP': keyDownNowP,
    'keyUpP': keyUpP,
    'keyUpNowP': keyUpNowP,
    'keyDownCount': keyDownCount,
    'keyUpCount': keyUpCount,
    'getMouseX': getMouseX,
    'getMouseY': getMouseY,
    'getLeftMouseState': getLeftMouseState,
    'getRightMouseState': getRightMouseState,
    'getMouseWheelDeltaY': getMouseWheelDeltaY,
    'getMouseState': getMouseState,
    'getMouseDownCount': getMouseDownCount,
    'getMouseUpCount': getMouseUpCount,
    'addMouseDownCallback': addMouseDownCallback,
    'addMouseUpCallback': addMouseUpCallback,
    'addMouseMoveCallback': addMouseMoveCallback,
    'addMouseWheelCallback': addMouseWheelCallback,
    'addTouchStartCallback': addTouchStartCallback,
    'addTouchEndCallback': addTouchEndCallback,
    'addTouchMoveCallback': addTouchMoveCallback,
    'getTouchState': getTouchState,
    'getTotalTouchState': getTotalTouchState,
    'getTouchX': getTouchX,
    'getTotalTouchX': getTotalTouchX,
    'getTouchY': getTouchY,
    'getTotalTouchY': getTotalTouchY,
    'initInput': initInput,
    '_internal': {
      'calcNextInputCount': calcNextInputCount,
      'calcStateFromCount': calcStateFromCount,
      'inputOnNowP': inputOnNowP,
      'inputOnP': inputOnP,
      'inputOffNowP': inputOffNowP,
      'inputOffP': inputOffP,
      'inputOnCount': inputOnCount,
      'inputOffCount': inputOffCount,
      'KEYBOARD': KEYBOARD,
      'BUTTONTOKEYBOARD': BUTTONTOKEYBOARD,
      'KEYSTATUS': KEYSTATUS,
      'initKeyboard': initKeyboard,
      'processKeyboardInput': processKeyboardInput,
      '_mouseX': _mouseX,
      '_mouseY': _mouseY,
      'MOUSELEFTCOUNT': MOUSELEFTCOUNT,
      'MOUSERIGHTCOUNT': MOUSERIGHTCOUNT,
      'MOUSEXBUFFER': MOUSEXBUFFER,
      'MOUSEYBUFFER': MOUSEYBUFFER,
      'MOUSELEFTBUFFER': MOUSELEFTBUFFER,
      'MOUSERIGHTBUFFER': MOUSERIGHTBUFFER,
      'MOUSELEFTBUTTONID': MOUSELEFTBUTTONID,
      'MOUSERIGHTBUTTONID': MOUSERIGHTBUTTONID,
      'MOUSEWHEELDELTAYBUFFER': MOUSEWHEELDELTAYBUFFER,
      'MOUSEWHEELDELTAY': MOUSEWHEELDELTAY,
      'processMouseInput': processMouseInput,
      'makeAdjustedInputPoint': makeAdjustedInputPoint,
      'setMousePoint': setMousePoint,
      'MOUSEDOWNCALLBACKS': MOUSEDOWNCALLBACKS,
      'callMouseDownCallbacks': callMouseDownCallbacks,
      'MOUSEUPCALLBACKS': MOUSEUPCALLBACKS,
      'callMouseUpCallbacks': callMouseUpCallbacks,
      'MOUSEMOVECALLBACKS': MOUSEMOVECALLBACKS,
      'callMouseMoveCallbacks': callMouseMoveCallbacks,
      'MOUSEWHEELCALLBACKS': MOUSEWHEELCALLBACKS,
      'callMouseWheelCallbacks': callMouseWheelCallbacks,
      'TOUCHSTARTCALLBACKS': TOUCHSTARTCALLBACKS,
      'callTouchStartCallbacks': callTouchStartCallbacks,
      'TOUCHENDCALLBACKS': TOUCHENDCALLBACKS,
      'callTouchEndCallbacks': callTouchEndCallbacks,
      'TOUCHMOVECALLBACKS': TOUCHMOVECALLBACKS,
      'callTouchMoveCallbacks': callTouchMoveCallbacks,
      'mouseEvent': mouseEvent,
      'makeMouseEvent': makeMouseEvent,
      'mouseEventP': mouseEventP,
      'initMouseEvent': initMouseEvent,
      'onMouseMoveEvent': onMouseMoveEvent,
      'onMouseDownEvent': onMouseDownEvent,
      'onMouseUpEvent': onMouseUpEvent,
      'onWheelEvent': onWheelEvent,
      'touchEventElement': touchEventElement,
      'makeTouchEventElement': makeTouchEventElement,
      'touchEventElementP': touchEventElementP,
      'touchEvent': touchEvent,
      'makeTouchEvent': makeTouchEvent,
      'touchEventP': touchEventP,
      'TOUCHSTATEHASH': TOUCHSTATEHASH,
      'getTouchStateHash': getTouchStateHash,
      'getTotalTouchAverage': getTotalTouchAverage,
      'processTouchInput': processTouchInput,
      'setXyOfTouchEventElement': setXyOfTouchEventElement,
      'updateTouchStateByEvent': updateTouchStateByEvent,
      'initTouchEvent': initTouchEvent,
      'onTouchStart': onTouchStart,
      'onTouchEnd': onTouchEnd,
      'onTouchMoveEvent': onTouchMoveEvent,
    }
  };
})();

var clWeb2dGame_utils_basicGenerator = (function() {
  /* --- import symbols --- */
  var makeSpeed2d = clWeb2dGame_core_basicComponents.makeSpeed2d;
  var makePoint2d = clWeb2dGame_core_basicComponents.makePoint2d;
  /* --- define objects --- */
  clWeb2dGame_utils_stageGenerator._internal.registerStageElementInterpreter('point', function (stage0, args1, immediateP2) {
      return (function () {
          var _js1881 = arguments.length;
          for (var n1880 = 0; n1880 < _js1881; n1880 += 2) {
              switch (arguments[n1880]) {
              case 'time':
                  time = arguments[n1880 + 1];
                  break;
              case 'x':
                  x = arguments[n1880 + 1];
                  break;
              case 'y':
                  y = arguments[n1880 + 1];
                  break;
              case 'angle':
                  angle = arguments[n1880 + 1];
              };
          };
          var time;
          var x;
          var y;
          var angle;
          __PS_MV_REG = [];
          return immediateP2 ? makePoint2d('x', x, 'y', y, 'angle', angle) : clWeb2dGame_utils_stageGenerator._internal.addElementToStage(stage0, time, function () {
              __PS_MV_REG = [];
              return makePoint2d('x', x, 'y', y, 'angle', angle);
          });
      }).apply(this, args1);
  }, []);
  clWeb2dGame_utils_stageGenerator._internal.registerStageElementInterpreter('speed', function (stage0, args1, immediateP2) {
      return (function () {
          var _js1883 = arguments.length;
          for (var n1882 = 0; n1882 < _js1883; n1882 += 2) {
              switch (arguments[n1882]) {
              case 'time':
                  time = arguments[n1882 + 1];
                  break;
              case 'x':
                  x = arguments[n1882 + 1];
                  break;
              case 'y':
                  y = arguments[n1882 + 1];
              };
          };
          var time;
          var x;
          var y;
          __PS_MV_REG = [];
          return immediateP2 ? makeSpeed2d('x', x, 'y', y) : clWeb2dGame_utils_stageGenerator._internal.addElementToStage(stage0, time, function () {
              __PS_MV_REG = [];
              return makeSpeed2d('x', x, 'y', y);
          });
      }).apply(this, args1);
  }, []);
  /* --- extern symbols --- */
  return {
    '_internal': {
    }
  };
})();

var clWeb2dGame_graphics_texture = (function() {
  /* --- import symbols --- */
  var addToMonitoringLog = clWeb2dGame_utils_debug_logger.addToMonitoringLog;
  var initEventLogArea = clWeb2dGame_utils_debug_logger.initEventLogArea;
  var initMonitoringLog = clWeb2dGame_utils_debug_logger.initMonitoringLog;
  var MAXEVENTLOGCOUNT = clWeb2dGame_utils_debug_logger.MAXEVENTLOGCOUNT;
  var addToEventLog = clWeb2dGame_utils_debug_logger.addToEventLog;
  var clearMonitoringLog = clWeb2dGame_utils_debug_logger.clearMonitoringLog;
  var setConsoleLogLevel = clWeb2dGame_utils_debug_logger.setConsoleLogLevel;
  var CONSOLELOGFUNCTION = clWeb2dGame_utils_debug_logger.CONSOLELOGFUNCTION;
  var rotate2d = clWeb2dGame_core_basicComponents.rotate2d;
  var rect2dP = clWeb2dGame_core_basicComponents.rect2dP;
  var speed2dP = clWeb2dGame_core_basicComponents.speed2dP;
  var point2d = clWeb2dGame_core_basicComponents.point2d;
  var makePoint2d = clWeb2dGame_core_basicComponents.makePoint2d;
  var makeVector2d = clWeb2dGame_core_basicComponents.makeVector2d;
  var setEntityParam = clWeb2dGame_core_basicComponents.setEntityParam;
  var copyPoint2dTo = clWeb2dGame_core_basicComponents.copyPoint2dTo;
  var getEntityParam = clWeb2dGame_core_basicComponents.getEntityParam;
  var initEntityParams = clWeb2dGame_core_basicComponents.initEntityParams;
  var copyVector2dTo = clWeb2dGame_core_basicComponents.copyVector2dTo;
  var speed2d = clWeb2dGame_core_basicComponents.speed2d;
  var rect2d = clWeb2dGame_core_basicComponents.rect2d;
  var cloneVector2d = clWeb2dGame_core_basicComponents.cloneVector2d;
  var params = clWeb2dGame_core_basicComponents.params;
  var makeRect2d = clWeb2dGame_core_basicComponents.makeRect2d;
  var makeScript2d = clWeb2dGame_core_basicComponents.makeScript2d;
  var makeSpeed2d = clWeb2dGame_core_basicComponents.makeSpeed2d;
  var clonePoint2d = clWeb2dGame_core_basicComponents.clonePoint2d;
  var point2dP = clWeb2dGame_core_basicComponents.point2dP;
  var vector2d = clWeb2dGame_core_basicComponents.vector2d;
  var vector2dP = clWeb2dGame_core_basicComponents.vector2dP;
  var rotate2dP = clWeb2dGame_core_basicComponents.rotate2dP;
  var script2d = clWeb2dGame_core_basicComponents.script2d;
  var makeRotate2d = clWeb2dGame_core_basicComponents.makeRotate2d;
  var deleteDeleteComponentHook = clPsEcs_ecs.deleteDeleteComponentHook;
  var makeEcsEntity = clPsEcs_ecs.makeEcsEntity;
  var addEcsComponent = clPsEcs_ecs.addEcsComponent;
  var ecsEntity = clPsEcs_ecs.ecsEntity;
  var deleteEcsComponentType = clPsEcs_ecs.deleteEcsComponentType;
  var framePromise = clPsEcs_framePromise.framePromise;
  var deleteEntityTag = clPsEcs_ecs.deleteEntityTag;
  var deleteEcsEntity = clPsEcs_ecs.deleteEcsEntity;
  var cleanEcsEnv = clPsEcs_ecs.cleanEcsEnv;
  var addDeleteComponentHook = clPsEcs_ecs.addDeleteComponentHook;
  var ecsMain = clPsEcs_ecs.ecsMain;
  var includesAllComponentTypes = clPsEcs_utils.includesAllComponentTypes;
  var findAComponent = clPsEcs_ecs.findAComponent;
  var registerNframesAfterFunc = clPsEcs_basicProcess.registerNframesAfterFunc;
  var moveEcsEntity = clPsEcs_ecs.moveEcsEntity;
  var ecsComponent = clPsEcs_ecs.ecsComponent;
  var popDefaultEcsEntityParent = clPsEcs_ecs.popDefaultEcsEntityParent;
  var framePromiseP = clPsEcs_framePromise.framePromiseP;
  var getEcsComponent = clPsEcs_ecs.getEcsComponent;
  var ecsSystem = clPsEcs_ecs.ecsSystem;
  var addEntityTag = clPsEcs_ecs.addEntityTag;
  var ecsEntityP = clPsEcs_ecs.ecsEntityP;
  var registerEcsSystem = clPsEcs_ecs.registerEcsSystem;
  var registerFuncWithPred = clPsEcs_basicProcess.registerFuncWithPred;
  var addEcsEntityToBuffer = clPsEcs_ecs.addEcsEntityToBuffer;
  var checkEntityTags = clPsEcs_ecs.checkEntityTags;
  var initFramePromise = clPsEcs_framePromise.initFramePromise;
  var framePromiseThen = clPsEcs_framePromise.framePromiseThen;
  var addEcsEntity = clPsEcs_ecs.addEcsEntity;
  var registerNextFrameFunc = clPsEcs_basicProcess.registerNextFrameFunc;
  var findAEntityByTag = clPsEcs_ecs.findAEntityByTag;
  var stackDefaultEcsEntityParent = clPsEcs_ecs.stackDefaultEcsEntityParent;
  var addEcsComponentList = clPsEcs_ecs.addEcsComponentList;
  var framePromiseAll = clPsEcs_framePromise.framePromiseAll;
  var findTheEntity = clPsEcs_ecs.findTheEntity;
  var findAEntity = clPsEcs_ecs.findAEntity;
  var hasEntityTag = clPsEcs_ecs.hasEntityTag;
  var deleteEcsComponent = clPsEcs_ecs.deleteEcsComponent;
  var getDefaultEcsEntityParent = clPsEcs_ecs.getDefaultEcsEntityParent;
  /* --- define objects --- */
  function texture2d() {
      this.pathList = [];
      this.material = null;
      this.rectUv = makeRect2d();
      __PS_MV_REG = [];
      return this;
  };
  function makeTexture2d() {
      var _js1885 = arguments.length;
      for (var n1884 = 0; n1884 < _js1885; n1884 += 2) {
          switch (arguments[n1884]) {
          case 'path-list':
              pathList = arguments[n1884 + 1];
              break;
          case 'material':
              material = arguments[n1884 + 1];
              break;
          case 'rect-uv':
              rectUv = arguments[n1884 + 1];
          };
      };
      var pathList = 'undefined' === typeof pathList ? [] : pathList;
      var material;
      var rectUv = 'undefined' === typeof rectUv ? makeRect2d() : rectUv;
      var result = new texture2d();
      result.pathList = pathList;
      result.material = material;
      result.rectUv = rectUv;
      __PS_MV_REG = [];
      return result;
  };
  function texture2dP(obj) {
      return (obj instanceof texture2d);
  };
  function rawImageBitmap() {
      this.promise = null;
      this.refCount = 0;
      return this;
  };
  function makeRawImageBitmap() {
      var _js1887 = arguments.length;
      for (var n1886 = 0; n1886 < _js1887; n1886 += 2) {
          switch (arguments[n1886]) {
          case 'promise':
              promise = arguments[n1886 + 1];
              break;
          case 'ref-count':
              refCount = arguments[n1886 + 1];
          };
      };
      var promise;
      var refCount = 'undefined' === typeof refCount ? 0 : refCount;
      var result = new rawImageBitmap();
      result.promise = promise;
      result.refCount = refCount;
      __PS_MV_REG = [];
      return result;
  };
  function rawImageBitmapP(obj) {
      return (obj instanceof rawImageBitmap);
  };
  if ('undefined' === typeof TEXTUREPROMISETABLE) {
      var TEXTUREPROMISETABLE = {  };
  };
  if ('undefined' === typeof RAWIMAGEBITMAPTABLE) {
      var RAWIMAGEBITMAPTABLE = {  };
  };
  function findRawImageBitmap(path) {
      return RAWIMAGEBITMAPTABLE[path];
  };
  function removeRawImageBitmap(path, material) {
      if (clWeb2dGame_utils_debug_logger._internal.getConsoleLogLevel() <= clWeb2dGame_utils_debug_logger._internal.CONSOLELOGLEVELDEBUG) {
          CONSOLELOGFUNCTION('loader', 'debug', 'Remove raw-image-bitmap (path = ~A)', path);
      };
      material.map.dispose();
      __PS_MV_REG = [];
      return RAWIMAGEBITMAPTABLE[path] = null;
  };
  function findTexturePromise(name) {
      return TEXTUREPROMISETABLE[name];
  };
  function getLoadTexturePromise() {
      var _js1889 = arguments.length;
      for (var n1888 = 0; n1888 < _js1889; n1888 += 2) {
          switch (arguments[n1888]) {
          case 'path':
              path = arguments[n1888 + 1];
              break;
          case 'loader':
              loader = arguments[n1888 + 1];
          };
      };
      var path;
      var loader;
      var raw = findRawImageBitmap(path);
      if (raw) {
          ++raw.refCount;
          if (clWeb2dGame_utils_debug_logger._internal.getConsoleLogLevel() <= clWeb2dGame_utils_debug_logger._internal.CONSOLELOGLEVELDEBUG) {
              CONSOLELOGFUNCTION('loader', 'debug', 'Skip loading ~A (Increase ref-count to ~D)', path, raw.refCount);
          };
          __PS_MV_REG = [];
          return raw.promise;
      } else {
          if (path) {
              if (clWeb2dGame_utils_debug_logger._internal.getConsoleLogLevel() <= clWeb2dGame_utils_debug_logger._internal.CONSOLELOGLEVELDEBUG) {
                  CONSOLELOGFUNCTION('loader', 'debug', 'Start loading ~A', path);
              };
          };
          startTime = performance.now();
          var promise = initFramePromise(function (resolve) {
              if (path) {
                  __PS_MV_REG = [];
                  return loader.load(path.startsWith('/') ? '.' + path : path, function (imageBitmap) {
                      if (clWeb2dGame_utils_debug_logger._internal.getConsoleLogLevel() <= clWeb2dGame_utils_debug_logger._internal.CONSOLELOGLEVELDEBUG) {
                          CONSOLELOGFUNCTION('loader', 'debug', 'Time to load texture ~A: ~F ms', path, performance.now() - startTime);
                      };
                      __PS_MV_REG = [];
                      return resolve(imageBitmap);
                  });
              } else {
                  __PS_MV_REG = [];
                  return resolve(null);
              };
          });
          RAWIMAGEBITMAPTABLE[path] = makeRawImageBitmap('promise', promise, 'ref-count', 1);
          __PS_MV_REG = [];
          return promise;
      };
  };
  if ('undefined' === typeof LOADTEXTURETIMEOUTFRAMES) {
      var LOADTEXTURETIMEOUTFRAMES = 120;
  };
  /** Asynchronously Load texture by path and register it by name */
  function loadTexture() {
      var _js1891 = arguments.length;
      for (var n1890 = 0; n1890 < _js1891; n1890 += 2) {
          switch (arguments[n1890]) {
          case 'path':
              path = arguments[n1890 + 1];
              break;
          case 'name':
              name = arguments[n1890 + 1];
              break;
          case 'alpha-path':
              alphaPath = arguments[n1890 + 1];
              break;
          case 'x':
              x = arguments[n1890 + 1];
              break;
          case 'y':
              y = arguments[n1890 + 1];
              break;
          case 'width':
              width = arguments[n1890 + 1];
              break;
          case 'height':
              height = arguments[n1890 + 1];
          };
      };
      var path;
      var name;
      var alphaPath;
      var x = 'undefined' === typeof x ? 0 : x;
      var y = 'undefined' === typeof y ? 0 : y;
      var width = 'undefined' === typeof width ? 1.0 : width;
      var height = 'undefined' === typeof height ? 1.0 : height;
      var loader = new THREE.TextureLoader();
      var promiseMain = getLoadTexturePromise('path', path, 'loader', loader);
      var promiseAlpha = getLoadTexturePromise('path', alphaPath, 'loader', loader);
      var tex = makeTexture2d('name', name, 'path-list', alphaPath ? [path, alphaPath] : [path], 'material', null, 'rect-uv', makeRect2d('x', x, 'y', y, 'width', width, 'height', height));
      __PS_MV_REG = [];
      return TEXTUREPROMISETABLE[name] = framePromiseAll([promiseMain, promiseAlpha], function (values) {
          var imageBitmap = values[0];
          var alphaBitmap = values[1];
          tex.material = new THREE.MeshBasicMaterial({ map : imageBitmap,
                                                    alphaMap : alphaBitmap,
                                                    transparent : alphaBitmap ? true : false,
                                                    color : 16777215
                                                  });
          __PS_MV_REG = [];
          return tex;
      }, 'timeout-frame', LOADTEXTURETIMEOUTFRAMES);
  };
  function unloadTexture(name) {
      var texPromise = findTexturePromise(name);
      if (!texPromise) {
          throw 'Message: ' + 'The texture \"~A\" is not loaded.' + '; Args: ' + name;
      };
      __PS_MV_REG = [];
      return framePromiseThen(texPromise, function (tex) {
          var copy1895;
          TEXTUREPROMISETABLE = (copy1895 = TEXTUREPROMISETABLE, copy1895.filter(function (x) {
              return !(function (target1894) {
                  return texPromise === target1894;
              })(x);
          }));
          for (var path = null, _js_arrvar1893 = tex.pathList, _js_idx1892 = 0; _js_idx1892 < _js_arrvar1893.length; _js_idx1892 += 1) {
              path = _js_arrvar1893[_js_idx1892];
              var raw = findRawImageBitmap(path);
              if (!raw) {
                  throw 'Message: ' + 'The path \"~A\" is not loaded.' + '; Args: ' + path;
              };
              if (raw.refCount === 1) {
                  removeRawImageBitmap(path, tex.material);
              } else {
                  --raw.refCount;
                  if (clWeb2dGame_utils_debug_logger._internal.getConsoleLogLevel() <= clWeb2dGame_utils_debug_logger._internal.CONSOLELOGLEVELDEBUG) {
                      CONSOLELOGFUNCTION('loader', 'debug', 'Decrease the ref-count of ~A to ~D', path, raw.refCount);
                  };
              };
          };
      });
  };
  function getTexturePromise(name) {
      var texPromise = findTexturePromise(name);
      if (!texPromise) {
          throw 'Message: ' + 'The texture \"~A\" is not loaded.' + '; Args: ' + name;
      };
      __PS_MV_REG = [];
      return texPromise;
  };
  function getTexture2dWidth(texture2d) {
      return texture2d.material.map.image.width * texture2d.rectUv.width;
  };
  function getTexture2dHeight(texture2d) {
      return texture2d.material.map.image.height * texture2d.rectUv.height;
  };
  /* --- extern symbols --- */
  return {
    'texture2d': texture2d,
    'texture2dP': texture2dP,
    'loadTexture': loadTexture,
    'unloadTexture': unloadTexture,
    'getTexturePromise': getTexturePromise,
    'getTexture2dWidth': getTexture2dWidth,
    'getTexture2dHeight': getTexture2dHeight,
    '_internal': {
      'makeTexture2d': makeTexture2d,
      'rawImageBitmap': rawImageBitmap,
      'makeRawImageBitmap': makeRawImageBitmap,
      'rawImageBitmapP': rawImageBitmapP,
      'TEXTUREPROMISETABLE': TEXTUREPROMISETABLE,
      'RAWIMAGEBITMAPTABLE': RAWIMAGEBITMAPTABLE,
      'findRawImageBitmap': findRawImageBitmap,
      'removeRawImageBitmap': removeRawImageBitmap,
      'findTexturePromise': findTexturePromise,
      'getLoadTexturePromise': getLoadTexturePromise,
      'LOADTEXTURETIMEOUTFRAMES': LOADTEXTURETIMEOUTFRAMES,
    }
  };
})();

var clWeb2dGame_graphics_2dGeometry = (function() {
  /* --- import symbols --- */
  var texture2dP = clWeb2dGame_graphics_texture.texture2dP;
  var getTexturePromise = clWeb2dGame_graphics_texture.getTexturePromise;
  var texture2d = clWeb2dGame_graphics_texture.texture2d;
  var getTexture2dWidth = clWeb2dGame_graphics_texture.getTexture2dWidth;
  var loadTexture = clWeb2dGame_graphics_texture.loadTexture;
  var unloadTexture = clWeb2dGame_graphics_texture.unloadTexture;
  var getTexture2dHeight = clWeb2dGame_graphics_texture.getTexture2dHeight;
  var loadFont = clWeb2dGame_graphics_font.loadFont;
  var getFontPromise = clWeb2dGame_graphics_font.getFontPromise;
  var rotate2d = clWeb2dGame_core_basicComponents.rotate2d;
  var rect2dP = clWeb2dGame_core_basicComponents.rect2dP;
  var speed2dP = clWeb2dGame_core_basicComponents.speed2dP;
  var point2d = clWeb2dGame_core_basicComponents.point2d;
  var makePoint2d = clWeb2dGame_core_basicComponents.makePoint2d;
  var makeVector2d = clWeb2dGame_core_basicComponents.makeVector2d;
  var setEntityParam = clWeb2dGame_core_basicComponents.setEntityParam;
  var copyPoint2dTo = clWeb2dGame_core_basicComponents.copyPoint2dTo;
  var getEntityParam = clWeb2dGame_core_basicComponents.getEntityParam;
  var initEntityParams = clWeb2dGame_core_basicComponents.initEntityParams;
  var copyVector2dTo = clWeb2dGame_core_basicComponents.copyVector2dTo;
  var speed2d = clWeb2dGame_core_basicComponents.speed2d;
  var rect2d = clWeb2dGame_core_basicComponents.rect2d;
  var cloneVector2d = clWeb2dGame_core_basicComponents.cloneVector2d;
  var params = clWeb2dGame_core_basicComponents.params;
  var makeRect2d = clWeb2dGame_core_basicComponents.makeRect2d;
  var makeScript2d = clWeb2dGame_core_basicComponents.makeScript2d;
  var makeSpeed2d = clWeb2dGame_core_basicComponents.makeSpeed2d;
  var clonePoint2d = clWeb2dGame_core_basicComponents.clonePoint2d;
  var point2dP = clWeb2dGame_core_basicComponents.point2dP;
  var vector2d = clWeb2dGame_core_basicComponents.vector2d;
  var vector2dP = clWeb2dGame_core_basicComponents.vector2dP;
  var rotate2dP = clWeb2dGame_core_basicComponents.rotate2dP;
  var script2d = clWeb2dGame_core_basicComponents.script2d;
  var makeRotate2d = clWeb2dGame_core_basicComponents.makeRotate2d;
  var deleteDeleteComponentHook = clPsEcs_ecs.deleteDeleteComponentHook;
  var makeEcsEntity = clPsEcs_ecs.makeEcsEntity;
  var addEcsComponent = clPsEcs_ecs.addEcsComponent;
  var ecsEntity = clPsEcs_ecs.ecsEntity;
  var deleteEcsComponentType = clPsEcs_ecs.deleteEcsComponentType;
  var framePromise = clPsEcs_framePromise.framePromise;
  var deleteEntityTag = clPsEcs_ecs.deleteEntityTag;
  var deleteEcsEntity = clPsEcs_ecs.deleteEcsEntity;
  var cleanEcsEnv = clPsEcs_ecs.cleanEcsEnv;
  var addDeleteComponentHook = clPsEcs_ecs.addDeleteComponentHook;
  var ecsMain = clPsEcs_ecs.ecsMain;
  var includesAllComponentTypes = clPsEcs_utils.includesAllComponentTypes;
  var findAComponent = clPsEcs_ecs.findAComponent;
  var registerNframesAfterFunc = clPsEcs_basicProcess.registerNframesAfterFunc;
  var moveEcsEntity = clPsEcs_ecs.moveEcsEntity;
  var ecsComponent = clPsEcs_ecs.ecsComponent;
  var popDefaultEcsEntityParent = clPsEcs_ecs.popDefaultEcsEntityParent;
  var framePromiseP = clPsEcs_framePromise.framePromiseP;
  var getEcsComponent = clPsEcs_ecs.getEcsComponent;
  var ecsSystem = clPsEcs_ecs.ecsSystem;
  var addEntityTag = clPsEcs_ecs.addEntityTag;
  var ecsEntityP = clPsEcs_ecs.ecsEntityP;
  var registerEcsSystem = clPsEcs_ecs.registerEcsSystem;
  var registerFuncWithPred = clPsEcs_basicProcess.registerFuncWithPred;
  var addEcsEntityToBuffer = clPsEcs_ecs.addEcsEntityToBuffer;
  var checkEntityTags = clPsEcs_ecs.checkEntityTags;
  var initFramePromise = clPsEcs_framePromise.initFramePromise;
  var framePromiseThen = clPsEcs_framePromise.framePromiseThen;
  var addEcsEntity = clPsEcs_ecs.addEcsEntity;
  var registerNextFrameFunc = clPsEcs_basicProcess.registerNextFrameFunc;
  var findAEntityByTag = clPsEcs_ecs.findAEntityByTag;
  var stackDefaultEcsEntityParent = clPsEcs_ecs.stackDefaultEcsEntityParent;
  var addEcsComponentList = clPsEcs_ecs.addEcsComponentList;
  var framePromiseAll = clPsEcs_framePromise.framePromiseAll;
  var findTheEntity = clPsEcs_ecs.findTheEntity;
  var findAEntity = clPsEcs_ecs.findAEntity;
  var hasEntityTag = clPsEcs_ecs.hasEntityTag;
  var deleteEcsComponent = clPsEcs_ecs.deleteEcsComponent;
  var getDefaultEcsEntityParent = clPsEcs_ecs.getDefaultEcsEntityParent;
  /* --- define objects --- */
  function pushVerticesTo(geometry, rawVertexLst) {
      for (var vertexAsLst = null, _js_idx1896 = 0; _js_idx1896 < rawVertexLst.length; _js_idx1896 += 1) {
          vertexAsLst = rawVertexLst[_js_idx1896];
          geometry.vertices.push(new THREE.Vector3(vertexAsLst[0], vertexAsLst[1], 0));
      };
  };
  function pushFacesTo(geometry, rawFaceLst) {
      for (var faceAsLst = null, _js_idx1897 = 0; _js_idx1897 < rawFaceLst.length; _js_idx1897 += 1) {
          faceAsLst = rawFaceLst[_js_idx1897];
          geometry.faces.push(new THREE.Face3(faceAsLst[0], faceAsLst[1], faceAsLst[2]));
      };
  };
  function toRad(degree) {
      return (degree * Math.PI) / 180;
  };
  function makeLineModel(geometry, color) {
      var material = new THREE.LineBasicMaterial({ 'color' : color });
      __PS_MV_REG = [];
      return new THREE.Line(geometry, material);
  };
  function makeSolidModel(geometry, color) {
      var material = new THREE.MeshBasicMaterial({ 'color' : color });
      __PS_MV_REG = [];
      return new THREE.Mesh(geometry, material);
  };
  function getMeshWidth(mesh) {
      return mesh.geometry.boundingBox.max.x - mesh.geometry.boundingBox.min.x;
  };
  function getMeshHeight(mesh) {
      return mesh.geometry.boundingBox.max.y - mesh.geometry.boundingBox.min.y;
  };
  function getMeshSize(mesh) {
      __PS_MV_REG = [];
      return ['width', getMeshWidth(mesh), 'height', getMeshHeight(mesh)];
  };
  function makeLine() {
      var _js1899 = arguments.length;
      for (var n1898 = 0; n1898 < _js1899; n1898 += 2) {
          switch (arguments[n1898]) {
          case 'pos-a':
              posA = arguments[n1898 + 1];
              break;
          case 'pos-b':
              posB = arguments[n1898 + 1];
              break;
          case 'color':
              color = arguments[n1898 + 1];
          };
      };
      var posA;
      var posB;
      var color;
      var geometry1 = new THREE.Geometry();
      var pushVertices = function () {
          var rest = Array.prototype.slice.call(arguments, 0);
          __PS_MV_REG = [];
          return pushVerticesTo(geometry1, rest);
      };
      pushVertices([posA[0], posA[1]], [posB[0], posB[1]]);
      __PS_MV_REG = [];
      return makeLineModel(geometry1, color);
  };
  function makeLines() {
      var _js1901 = arguments.length;
      for (var n1900 = 0; n1900 < _js1901; n1900 += 2) {
          switch (arguments[n1900]) {
          case 'pnt-list':
              pntList = arguments[n1900 + 1];
              break;
          case 'color':
              color = arguments[n1900 + 1];
          };
      };
      var pntList;
      var color;
      var geometry2 = new THREE.Geometry();
      var pushVertices = function () {
          var rest = Array.prototype.slice.call(arguments, 0);
          __PS_MV_REG = [];
          return pushVerticesTo(geometry2, rest);
      };
      for (var pnt = null, _js_idx1902 = 0; _js_idx1902 < pntList.length; _js_idx1902 += 1) {
          pnt = pntList[_js_idx1902];
          pushVertices([pnt[0], pnt[1]]);
      };
      __PS_MV_REG = [];
      return makeLineModel(geometry2, color);
  };
  function makeSolidRect() {
      var _js1904 = arguments.length;
      for (var n1903 = 0; n1903 < _js1904; n1903 += 2) {
          switch (arguments[n1903]) {
          case 'width':
              width = arguments[n1903 + 1];
              break;
          case 'height':
              height = arguments[n1903 + 1];
              break;
          case 'color':
              color = arguments[n1903 + 1];
          };
      };
      var width;
      var height;
      var color;
      var geometry3 = new THREE.Geometry();
      var pushVertices = function () {
          var rest = Array.prototype.slice.call(arguments, 0);
          __PS_MV_REG = [];
          return pushVerticesTo(geometry3, rest);
      };
      var pushFaces = function () {
          var rest = Array.prototype.slice.call(arguments, 0);
          __PS_MV_REG = [];
          return pushFacesTo(geometry3, rest);
      };
      pushVertices([0, 0], [width, 0], [width, height], [0, height]);
      pushFaces([0, 1, 2], [2, 3, 0]);
      __PS_MV_REG = [];
      return makeSolidModel(geometry3, color);
  };
  function makeWiredRect() {
      var _js1906 = arguments.length;
      for (var n1905 = 0; n1905 < _js1906; n1905 += 2) {
          switch (arguments[n1905]) {
          case 'width':
              width = arguments[n1905 + 1];
              break;
          case 'height':
              height = arguments[n1905 + 1];
              break;
          case 'color':
              color = arguments[n1905 + 1];
          };
      };
      var width;
      var height;
      var color;
      var geometry4 = new THREE.Geometry();
      var pushVertices = function () {
          var rest = Array.prototype.slice.call(arguments, 0);
          __PS_MV_REG = [];
          return pushVerticesTo(geometry4, rest);
      };
      pushVertices([0, 0], [width, 0], [width, height], [0, height], [0, 0]);
      __PS_MV_REG = [];
      return makeLineModel(geometry4, color);
  };
  function makeRectUvs(x, y, width, height) {
      var newUv = function (u, v) {
          __PS_MV_REG = [];
          return new THREE.Vector2(u, v);
      };
      __PS_MV_REG = [];
      return [[newUv(x, y), newUv(x + width, y), newUv(x + width, y + height)], [newUv(x + width, y + height), newUv(x, y + height), newUv(x, y)]];
  };
  function changeGeometryUvs(texture, geometry, x, y, width, height) {
      if (!((texture instanceof (typeof texture2d === 'string' ? eval(texture2d) : texture2d)))) {
          throw '\'TYPE-ERROR: (The place is \'TEXTURE\'. The expected type is \'TEXTURE-2D\')';
      };
      var object1907 = texture.rectUv;
      var uvs = geometry.faceVertexUvs[0];
      var countOuter = 0;
      for (var uv = null, _js_arrvar1909 = makeRectUvs(object1907.x + object1907.width * x, object1907.y + object1907.height * y, object1907.width * width, object1907.height * height), _js_idx1908 = 0; _js_idx1908 < _js_arrvar1909.length; _js_idx1908 += 1) {
          uv = _js_arrvar1909[_js_idx1908];
          if (countOuter >= uvs.length) {
              uvs.push(uv);
          } else {
              var countInner = 0;
              for (var vector = null, _js_idx1910 = 0; _js_idx1910 < uv.length; _js_idx1910 += 1) {
                  vector = uv[_js_idx1910];
                  uvs[countOuter][countInner].x = vector.x;
                  uvs[countOuter][countInner].y = vector.y;
                  ++countInner;
              };
          };
          ++countOuter;
      };
      __PS_MV_REG = [];
      return geometry.uvsNeedUpdate = true;
  };
  function calcTextureSize(width, height, sizeType, texture) {
      var textureWidth = getTexture2dWidth(texture);
      var textureHeight = getTexture2dHeight(texture);
      var calcScale = function (target, baseLen) {
          switch (sizeType) {
          case 'absolute':
              return target ? target / baseLen : null;
          case 'relative':
              return target;
          default:
              throw 'Message: ' + 'The value ~A is not of the expected type (MEMBER ~A)' + '; Args: ' + sizeType + ', ' + ['absolute', 'relative'];
          };
      };
      var widthScale = calcScale(width, textureWidth);
      var heightScale = calcScale(height, textureHeight);
      if (!widthScale && !heightScale) {
          widthScale = 1;
          heightScale = 1;
      } else if (!widthScale) {
          widthScale = heightScale;
      } else if (!heightScale) {
          heightScale = widthScale;
      };
      if (!(widthScale && heightScale)) {
          throw 'Message: ' + 'Failed assertion: ~A' + '; Args: ' + (widthScale && heightScale);
      };
      __PS_MV_REG = [];
      return [textureWidth * widthScale, textureHeight * heightScale];
  };
  function makeTextureModel() {
      var _js1911 = arguments.length;
      for (var n1910 = 0; n1910 < _js1911; n1910 += 2) {
          switch (arguments[n1910]) {
          case 'width':
              width = arguments[n1910 + 1];
              break;
          case 'height':
              height = arguments[n1910 + 1];
              break;
          case 'size-type':
              sizeType = arguments[n1910 + 1];
              break;
          case 'texture':
              texture = arguments[n1910 + 1];
          };
      };
      var width;
      var height;
      var sizeType = 'undefined' === typeof sizeType ? 'absolute' : sizeType;
      var texture;
      if (!((texture instanceof (typeof texture2d === 'string' ? eval(texture2d) : texture2d)))) {
          throw '\'TYPE-ERROR: (The place is \'TEXTURE\'. The expected type is \'TEXTURE-2D\')';
      };
      var geometry = new THREE.Geometry();
      var textureSize = calcTextureSize(width, height, sizeType, texture);
      var w = textureSize[0];
      var h = textureSize[1];
      pushVerticesTo(geometry, [[0, 0], [w, 0], [w, h], [0, h]]);
      pushFacesTo(geometry, [[0, 1, 2], [2, 3, 0]]);
      changeGeometryUvs(texture, geometry, 0, 0, 1, 1);
      geometry.computeFaceNormals();
      geometry.computeVertexNormals();
      __PS_MV_REG = [];
      return new THREE.Mesh(geometry, texture.material);
  };
  /**
   * Return a frame-promise that passes mesh that has specified texture as its material.
   * If size-type is :absolute, the passed width and height are used as-is.
   * If size-type is :relative, the passed width and height means how scale up the texture.
   * If only either width or height is passed, the image keeps its aspect ratio.
   * If neither width nor height is passed, the image keeps its size
   *  (This is equals to (:width 1 :height 1 :size-type :relative).
   */
  function makeTextureModelPromise() {
      var _js1913 = arguments.length;
      for (var n1912 = 0; n1912 < _js1913; n1912 += 2) {
          switch (arguments[n1912]) {
          case 'width':
              width = arguments[n1912 + 1];
              break;
          case 'height':
              height = arguments[n1912 + 1];
              break;
          case 'size-type':
              sizeType = arguments[n1912 + 1];
              break;
          case 'texture-name':
              textureName = arguments[n1912 + 1];
          };
      };
      var width;
      var height;
      var sizeType = 'undefined' === typeof sizeType ? 'absolute' : sizeType;
      var textureName;
      __PS_MV_REG = [];
      return framePromiseThen(getTexturePromise(textureName), function (texture) {
          __PS_MV_REG = [];
          return makeTextureModel('width', width, 'height', height, 'size-type', sizeType, 'texture', texture);
      });
  };
  function makeSolidRegularPolygon() {
      var _js1915 = arguments.length;
      for (var n1914 = 0; n1914 < _js1915; n1914 += 2) {
          switch (arguments[n1914]) {
          case 'r':
              r = arguments[n1914 + 1];
              break;
          case 'n':
              n = arguments[n1914 + 1];
              break;
          case 'start-angle':
              startAngle = arguments[n1914 + 1];
              break;
          case 'color':
              color = arguments[n1914 + 1];
          };
      };
      var r;
      var n;
      var startAngle = 'undefined' === typeof startAngle ? 0 : startAngle;
      var color;
      var geometry5 = new THREE.Geometry();
      var pushVertices = function () {
          var rest = Array.prototype.slice.call(arguments, 0);
          __PS_MV_REG = [];
          return pushVerticesTo(geometry5, rest);
      };
      var pushFaces = function () {
          var rest = Array.prototype.slice.call(arguments, 0);
          __PS_MV_REG = [];
          return pushFacesTo(geometry5, rest);
      };
      for (var i = 0; i < n; i += 1) {
          var angle = toRad((360 * i) / n + startAngle);
          pushVertices([r * Math.cos(angle), r * Math.sin(angle)]);
      };
      pushVertices([0, 0]);
      for (var i = 0; i < n; i += 1) {
          pushFaces([n, i, (i + 1) % n]);
      };
      __PS_MV_REG = [];
      return makeSolidModel(geometry5, color);
  };
  function makeWiredRegularPolygon() {
      var _js1917 = arguments.length;
      for (var n1916 = 0; n1916 < _js1917; n1916 += 2) {
          switch (arguments[n1916]) {
          case 'r':
              r = arguments[n1916 + 1];
              break;
          case 'n':
              n = arguments[n1916 + 1];
              break;
          case 'start-angle':
              startAngle = arguments[n1916 + 1];
              break;
          case 'color':
              color = arguments[n1916 + 1];
          };
      };
      var r;
      var n;
      var startAngle = 'undefined' === typeof startAngle ? 0 : startAngle;
      var color;
      var geometry6 = new THREE.Geometry();
      var pushVertices = function () {
          var rest = Array.prototype.slice.call(arguments, 0);
          __PS_MV_REG = [];
          return pushVerticesTo(geometry6, rest);
      };
      for (var i = 0; i < n + 1; i += 1) {
          var angle = toRad((360 * i) / n + startAngle);
          pushVertices([r * Math.cos(angle), r * Math.sin(angle)]);
      };
      __PS_MV_REG = [];
      return makeLineModel(geometry6, color);
  };
  function makeSolidCircle() {
      var _js1919 = arguments.length;
      for (var n1918 = 0; n1918 < _js1919; n1918 += 2) {
          switch (arguments[n1918]) {
          case 'r':
              r = arguments[n1918 + 1];
              break;
          case 'color':
              color = arguments[n1918 + 1];
          };
      };
      var r;
      var color;
      __PS_MV_REG = [];
      return makeSolidRegularPolygon('r', r, 'n', 60, 'color', color);
  };
  function makeWiredCircle() {
      var _js1921 = arguments.length;
      for (var n1920 = 0; n1920 < _js1921; n1920 += 2) {
          switch (arguments[n1920]) {
          case 'r':
              r = arguments[n1920 + 1];
              break;
          case 'color':
              color = arguments[n1920 + 1];
          };
      };
      var r;
      var color;
      __PS_MV_REG = [];
      return makeWiredRegularPolygon('r', r, 'n', 60, 'color', color);
  };
  function makeWiredPolygon() {
      var _js1923 = arguments.length;
      for (var n1922 = 0; n1922 < _js1923; n1922 += 2) {
          switch (arguments[n1922]) {
          case 'pnt-list':
              pntList = arguments[n1922 + 1];
              break;
          case 'color':
              color = arguments[n1922 + 1];
          };
      };
      var pntList;
      var color;
      var geometry7 = new THREE.Geometry();
      var pushVertices = function () {
          var rest = Array.prototype.slice.call(arguments, 0);
          __PS_MV_REG = [];
          return pushVerticesTo(geometry7, rest);
      };
      for (var pnt = null, _js_idx1924 = 0; _js_idx1924 < pntList.length; _js_idx1924 += 1) {
          pnt = pntList[_js_idx1924];
          pushVertices(pnt);
      };
      pushVertices(pntList[0]);
      __PS_MV_REG = [];
      return makeLineModel(geometry7, color);
  };
  function makeSolidPolygon() {
      var _js1926 = arguments.length;
      for (var n1925 = 0; n1925 < _js1926; n1925 += 2) {
          switch (arguments[n1925]) {
          case 'pnt-list':
              pntList = arguments[n1925 + 1];
              break;
          case 'color':
              color = arguments[n1925 + 1];
          };
      };
      var pntList;
      var color;
      var geometry8 = new THREE.Geometry();
      var pushVertices = function () {
          var rest = Array.prototype.slice.call(arguments, 0);
          __PS_MV_REG = [];
          return pushVerticesTo(geometry8, rest);
      };
      var pushFaces = function () {
          var rest = Array.prototype.slice.call(arguments, 0);
          __PS_MV_REG = [];
          return pushFacesTo(geometry8, rest);
      };
      for (var pnt = null, _js_idx1927 = 0; _js_idx1927 < pntList.length; _js_idx1927 += 1) {
          pnt = pntList[_js_idx1927];
          pushVertices(pnt);
      };
      var len = pntList.length;
      for (var i = 0; i < len - 1; i += 1) {
          pushFaces([0, i + 1, (i + 2) % len]);
      };
      __PS_MV_REG = [];
      return makeSolidModel(geometry8, color);
  };
  function changeModelColor(model2d, newColorRgb) {
      model2d.model.material.color = new THREE.Color(newColorRgb);
      model2d.model.material.needsUpdate = true;
      __PS_MV_REG = [];
      return model2d;
  };
  function makeTextModelPromise(text) {
      var _js1929 = arguments.length;
      for (var n1928 = 1; n1928 < _js1929; n1928 += 2) {
          switch (arguments[n1928]) {
          case 'size':
              size = arguments[n1928 + 1];
              break;
          case 'color':
              color = arguments[n1928 + 1];
              break;
          case 'curve-segments':
              curveSegments = arguments[n1928 + 1];
              break;
          case 'font-name':
              fontName = arguments[n1928 + 1];
          };
      };
      var size;
      var color;
      var curveSegments = 'undefined' === typeof curveSegments ? 3 : curveSegments;
      var fontName = 'undefined' === typeof fontName ? 'helvetiker' : fontName;
      __PS_MV_REG = [];
      return framePromiseThen(getFontPromise(fontName, 'regular'), function (font) {
          var geometry = new THREE.TextGeometry(text, { 'size' : size,
                                                        'height' : 0,
                                                        'curveSegments' : curveSegments,
                                                        'font' : font
                                                      });
          var material = new THREE.MeshBasicMaterial({ 'color' : color });
          geometry.computeBoundingBox();
          geometry.computeVertexNormals();
          geometry.computeFaceNormals();
          var mesh = new THREE.Mesh(geometry, material);
          __PS_MV_REG = [];
          return mesh;
      });
  };
  /* --- extern symbols --- */
  return {
    'getMeshWidth': getMeshWidth,
    'getMeshHeight': getMeshHeight,
    'getMeshSize': getMeshSize,
    'makeLine': makeLine,
    'makeLines': makeLines,
    'makeSolidRect': makeSolidRect,
    'makeWiredRect': makeWiredRect,
    'changeGeometryUvs': changeGeometryUvs,
    'makeTextureModel': makeTextureModel,
    'makeTextureModelPromise': makeTextureModelPromise,
    'makeSolidRegularPolygon': makeSolidRegularPolygon,
    'makeWiredRegularPolygon': makeWiredRegularPolygon,
    'makeSolidCircle': makeSolidCircle,
    'makeWiredCircle': makeWiredCircle,
    'makeWiredPolygon': makeWiredPolygon,
    'makeSolidPolygon': makeSolidPolygon,
    'changeModelColor': changeModelColor,
    'makeTextModelPromise': makeTextModelPromise,
    '_internal': {
      'pushVerticesTo': pushVerticesTo,
      'pushFacesTo': pushFacesTo,
      'toRad': toRad,
      'makeLineModel': makeLineModel,
      'makeSolidModel': makeSolidModel,
      'makeRectUvs': makeRectUvs,
      'calcTextureSize': calcTextureSize,
    }
  };
})();

var clWeb2dGame_utils_calc = (function() {
  /* --- import symbols --- */
  var rotate2d = clWeb2dGame_core_basicComponents.rotate2d;
  var rect2dP = clWeb2dGame_core_basicComponents.rect2dP;
  var speed2dP = clWeb2dGame_core_basicComponents.speed2dP;
  var point2d = clWeb2dGame_core_basicComponents.point2d;
  var makePoint2d = clWeb2dGame_core_basicComponents.makePoint2d;
  var makeVector2d = clWeb2dGame_core_basicComponents.makeVector2d;
  var setEntityParam = clWeb2dGame_core_basicComponents.setEntityParam;
  var copyPoint2dTo = clWeb2dGame_core_basicComponents.copyPoint2dTo;
  var getEntityParam = clWeb2dGame_core_basicComponents.getEntityParam;
  var initEntityParams = clWeb2dGame_core_basicComponents.initEntityParams;
  var copyVector2dTo = clWeb2dGame_core_basicComponents.copyVector2dTo;
  var speed2d = clWeb2dGame_core_basicComponents.speed2d;
  var rect2d = clWeb2dGame_core_basicComponents.rect2d;
  var cloneVector2d = clWeb2dGame_core_basicComponents.cloneVector2d;
  var params = clWeb2dGame_core_basicComponents.params;
  var makeRect2d = clWeb2dGame_core_basicComponents.makeRect2d;
  var makeScript2d = clWeb2dGame_core_basicComponents.makeScript2d;
  var makeSpeed2d = clWeb2dGame_core_basicComponents.makeSpeed2d;
  var clonePoint2d = clWeb2dGame_core_basicComponents.clonePoint2d;
  var point2dP = clWeb2dGame_core_basicComponents.point2dP;
  var vector2d = clWeb2dGame_core_basicComponents.vector2d;
  var vector2dP = clWeb2dGame_core_basicComponents.vector2dP;
  var rotate2dP = clWeb2dGame_core_basicComponents.rotate2dP;
  var script2d = clWeb2dGame_core_basicComponents.script2d;
  var makeRotate2d = clWeb2dGame_core_basicComponents.makeRotate2d;
  var deleteDeleteComponentHook = clPsEcs_ecs.deleteDeleteComponentHook;
  var makeEcsEntity = clPsEcs_ecs.makeEcsEntity;
  var addEcsComponent = clPsEcs_ecs.addEcsComponent;
  var ecsEntity = clPsEcs_ecs.ecsEntity;
  var deleteEcsComponentType = clPsEcs_ecs.deleteEcsComponentType;
  var framePromise = clPsEcs_framePromise.framePromise;
  var deleteEntityTag = clPsEcs_ecs.deleteEntityTag;
  var deleteEcsEntity = clPsEcs_ecs.deleteEcsEntity;
  var cleanEcsEnv = clPsEcs_ecs.cleanEcsEnv;
  var addDeleteComponentHook = clPsEcs_ecs.addDeleteComponentHook;
  var ecsMain = clPsEcs_ecs.ecsMain;
  var includesAllComponentTypes = clPsEcs_utils.includesAllComponentTypes;
  var findAComponent = clPsEcs_ecs.findAComponent;
  var registerNframesAfterFunc = clPsEcs_basicProcess.registerNframesAfterFunc;
  var moveEcsEntity = clPsEcs_ecs.moveEcsEntity;
  var ecsComponent = clPsEcs_ecs.ecsComponent;
  var popDefaultEcsEntityParent = clPsEcs_ecs.popDefaultEcsEntityParent;
  var framePromiseP = clPsEcs_framePromise.framePromiseP;
  var getEcsComponent = clPsEcs_ecs.getEcsComponent;
  var ecsSystem = clPsEcs_ecs.ecsSystem;
  var addEntityTag = clPsEcs_ecs.addEntityTag;
  var ecsEntityP = clPsEcs_ecs.ecsEntityP;
  var registerEcsSystem = clPsEcs_ecs.registerEcsSystem;
  var registerFuncWithPred = clPsEcs_basicProcess.registerFuncWithPred;
  var addEcsEntityToBuffer = clPsEcs_ecs.addEcsEntityToBuffer;
  var checkEntityTags = clPsEcs_ecs.checkEntityTags;
  var initFramePromise = clPsEcs_framePromise.initFramePromise;
  var framePromiseThen = clPsEcs_framePromise.framePromiseThen;
  var addEcsEntity = clPsEcs_ecs.addEcsEntity;
  var registerNextFrameFunc = clPsEcs_basicProcess.registerNextFrameFunc;
  var findAEntityByTag = clPsEcs_ecs.findAEntityByTag;
  var stackDefaultEcsEntityParent = clPsEcs_ecs.stackDefaultEcsEntityParent;
  var addEcsComponentList = clPsEcs_ecs.addEcsComponentList;
  var framePromiseAll = clPsEcs_framePromise.framePromiseAll;
  var findTheEntity = clPsEcs_ecs.findTheEntity;
  var findAEntity = clPsEcs_ecs.findAEntity;
  var hasEntityTag = clPsEcs_ecs.hasEntityTag;
  var deleteEcsComponent = clPsEcs_ecs.deleteEcsComponent;
  var getDefaultEcsEntityParent = clPsEcs_ecs.getDefaultEcsEntityParent;
  /* --- define objects --- */
  function vector2dAbs(vector) {
      __PS_MV_REG = [];
      return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
  };
  /**
   * Return the angle of the vector. The range is (-PI, PI].
   * The angle of the vector (1, 0) is 0 and the rotation is counterclockwize.
   */
  function vector2dAngle(vector) {
      if (vector.x === 0) {
          return (Math.PI / 2) * (vector.y < 0 ? -1 : 1);
      } else {
          __PS_MV_REG = [];
          return Math.atan(vector.y / vector.x) + (vector.x < 0 ? Math.PI * (vector.y < 0 ? -1 : 1) : 0);
      };
  };
  function setfVector2dAbsAngle(vector, abs, angle) {
      vector.x = abs * Math.cos(angle);
      vector.y = abs * Math.sin(angle);
      __PS_MV_REG = [];
      return vector;
  };
  /** Set the absolute length of the vector keeping its angle. */
  function setfVector2dAbs(vector, abs) {
      __PS_MV_REG = [];
      return setfVector2dAbsAngle(vector, abs, vector2dAngle(vector));
  };
  /** Set the angle of the vector keeping its length. */
  function setfVector2dAngle(vector, angle) {
      __PS_MV_REG = [];
      return setfVector2dAbsAngle(vector, vector2dAbs(vector), angle);
  };
  /** Destructively increase vector */
  function incfVector2d(targetVec, diffVec) {
      targetVec.x += diffVec.x;
      targetVec.y += diffVec.y;
      return targetVec;
  };
  function addVector2d() {
      var vectors = Array.prototype.slice.call(arguments, 0);
      if (vectors.length === 0) {
          __PS_MV_REG = [];
          return makeVector2d();
      } else {
          var result = cloneVector2d(vectors[0]);
          for (var vec = null, _js_arrvar1931 = vectors.slice(1), _js_idx1930 = 0; _js_idx1930 < _js_arrvar1931.length; _js_idx1930 += 1) {
              vec = _js_arrvar1931[_js_idx1930];
              incfVector2d(result, vec);
          };
          __PS_MV_REG = [];
          return result;
      };
  };
  /** Destructively decrease vector */
  function decfVector2d(targetVec, diffVec) {
      targetVec.x -= diffVec.x;
      targetVec.y -= diffVec.y;
      return targetVec;
  };
  function subVector2d() {
      var vectors = Array.prototype.slice.call(arguments, 0);
      if (vectors.length === 0) {
          __PS_MV_REG = [];
          return makeVector2d();
      } else {
          var result = cloneVector2d(vectors[0]);
          for (var vec = null, _js_arrvar1933 = vectors.slice(1), _js_idx1932 = 0; _js_idx1932 < _js_arrvar1933.length; _js_idx1932 += 1) {
              vec = _js_arrvar1933[_js_idx1932];
              decfVector2d(result, vec);
          };
          __PS_MV_REG = [];
          return result;
      };
  };
  function calcInnerProduct(vec1, vec2) {
      return vec1.x * vec2.x + vec1.y * vec2.y;
  };
  /**
   * Calculate z component of outer-product.
   * It is useful to judge which side a point is from a vector.
   */
  function calcOuterProductZ(vec1, vec2) {
      return vec1.x * vec2.y - vec1.y * vec2.x;
  };
  /**
   * Rotate the target-vector.
   * The vector is rotated from 'now-angle' to '(+ now-angle diff-angle)'
   * on the circle whose radious is represented by the 'radious'.
   */
  function incfRotateDiff(targetVector, radious, nowAngle, diffAngle) {
      var r = radious;
      var cosNow = Math.cos(nowAngle);
      var sinNow = Math.sin(nowAngle);
      var cosDiff = Math.cos(diffAngle);
      var sinDiff = Math.sin(diffAngle);
      targetVector.x += r * cosNow * cosDiff - r * sinNow * sinDiff - r * cosNow;
      __PS_MV_REG = [];
      return targetVector.y += (r * sinNow * cosDiff + r * cosNow * sinDiff) - r * sinNow;
  };
  function decfRotateDiff(vector, radious, nowAngle, diffAngle) {
      __PS_MV_REG = [];
      return incfRotateDiff(vector, radious, nowAngle, -1 * diffAngle);
  };
  /** Rotate point-2d using rotate-2d structure. */
  function rotatefPointBy(point2d, rotate2d) {
      var speed1934 = rotate2d.speed;
      incfRotateDiff(point2d, rotate2d.radious, rotate2d.angle, speed1934);
      point2d.angle += speed1934;
      __PS_MV_REG = [];
      return rotate2d.angle += speed1934;
  };
  /**
   * Move the vector to a point of cirle parameterized by
   * radious and angle assuming that it is at the center of the
   * rotation.
   */
  function movefVectorToCircle(vector, radious, angle) {
      vector.x += radious;
      incfRotateDiff(vector, radious, 0, angle);
      if ((vector instanceof (typeof point2d === 'string' ? eval(point2d) : point2d))) {
          __PS_MV_REG = [];
          return vector.angle += angle;
      };
  };
  /** Transform the 'target' point to the coordinate represented by the 'base' */
  function transformfPoint(target, base) {
      target.angle += base.angle;
      var cosValue = Math.cos(base.angle);
      var sinValue = Math.sin(base.angle);
      var beforeX = target.x;
      var beforeY = target.y;
      target.x = base.x + (beforeX * cosValue - beforeY * sinValue);
      target.y = base.y + (beforeX * sinValue + beforeY * cosValue);
      __PS_MV_REG = [];
      return target;
  };
  /** Reverse the transform of the "transformf-point". */
  function transformfPointInverse(target, base) {
      target.angle -= base.angle;
      var cosValue = Math.cos(-1 * base.angle);
      var sinValue = Math.sin(-1 * base.angle);
      var beforeX = target.x;
      var beforeY = target.y;
      target.x = (beforeX - base.x) * cosValue - (beforeY - base.y) * sinValue;
      target.y = (beforeX - base.x) * sinValue + (beforeY - base.y) * cosValue;
      __PS_MV_REG = [];
      return target;
  };
  function transformfPointRec(basePnt, parent) {
      if (parent) {
          var pos = getEcsComponent(point2d, parent);
          if (pos) {
              transformfPoint(basePnt, pos);
          };
          __PS_MV_REG = [];
          return transformfPointRec(basePnt, parent.parent);
      } else {
          __PS_MV_REG = [];
          return basePnt;
      };
  };
  /**
   * Return global position and roration of the entity (type: point-2d).
   * Note that an entity has only local position and rotation on coordinate of its parent.
   * The 'offset' is useful if you want to calculate global position and rotation on
   * coordinate of the 'entity'
   */
  function calcGlobalPoint(entity, offset) {
      if (!getEcsComponent(point2d, entity)) {
          throw 'Message: ' + 'The entity ~A doesn\'t have point-2d' + '; Args: ' + entity;
      };
      __PS_MV_REG = [];
      return transformfPointRec(offset ? clonePoint2d(offset) : makePoint2d('x', 0, 'y', 0, 'angle', 0), entity);
  };
  /**
   * Return global position and roration of the parent of the entity (type: point-2d).
   * The 'offset' is useful if you want to calculate global position and rotation on
   * coordinate of the 'entity'
   */
  function calcParentGlobalPoint(entity, offset) {
      __PS_MV_REG = [];
      return transformfPointRec(offset ? clonePoint2d(offset) : makePoint2d('x', 0, 'y', 0, 'angle', 0), entity.parent);
  };
  /** Calculate local position and rotation of the entity from a global point. */
  function calcLocalPoint(entity, globalPnt) {
      if (!getEcsComponent(point2d, entity)) {
          throw 'Message: ' + 'The entity ~A doesn\'t have point-2d' + '; Args: ' + entity;
      };
      var basePnt = transformfPointRec(makePoint2d('x', 0, 'y', 0, 'angle', 0), entity.parent);
      var result = clonePoint2d(globalPnt);
      transformfPointInverse(result, basePnt);
      __PS_MV_REG = [];
      return result;
  };
  function calcfVecScalar(vector, scalar, func) {
      vector.x = func(vector.x, scalar);
      vector.y = func(vector.y, scalar);
      return vector;
  };
  /** Destructively multiply each component of vector by scalar */
  function multfVecScalar(vector, scalar) {
      __PS_MV_REG = [];
      return calcfVecScalar(vector, scalar, function (a, b) {
          return a * b;
      });
  };
  /** Multiply each component of vector by scalar */
  function vecScalar(vector, scalar) {
      __PS_MV_REG = [];
      return multfVecScalar(cloneVector2d(vector), scalar);
  };
  /** Destructively divide each component of vector by scalar */
  function divfVecScalar(vector, scalar) {
      __PS_MV_REG = [];
      return calcfVecScalar(vector, scalar, function (a, b) {
          return a / b;
      });
  };
  /** Divide each component of vector by scalar */
  function slashVecScalar(vector, scalar) {
      __PS_MV_REG = [];
      return divfVecScalar(cloneVector2d(vector), scalar);
  };
  /** Destructively truncate vector length to max-length or less */
  function truncatefVector2d(vec, maxLength) {
      if (vector2dAbs(vec) > maxLength) {
          setfVector2dAbs(vec, maxLength);
      };
      __PS_MV_REG = [];
      return vec;
  };
  /** Truncate vector length to max-length or less */
  function truncateVector2d(vec, maxLength) {
      __PS_MV_REG = [];
      return truncatefVector2d(cloneVector2d(vec), maxLength);
  };
  /** -PI < result <= PI */
  function diffAngle(angle1, angle2) {
      var rawDiff = angle1 - angle2;
      while (rawDiff <= -1 * Math.PI) {
          rawDiff += 2 * Math.PI;
      };
      while (rawDiff > Math.PI) {
          rawDiff -= 2 * Math.PI;
      };
      return rawDiff;
  };
  /** Calculate distance from pnt1 to pnt2. */
  function calcDist(pnt1, pnt2) {
      __PS_MV_REG = [];
      return Math.sqrt(calcDistP2(pnt1, pnt2));
  };
  /**
   * Calculate square of distance from pnt1 to pnt2.
   * Because this doesn't use 'sqrt' that is heavy calculation, you should use this
   * instead of 'calc-dist' if possible.
   */
  function calcDistP2(pnt1, pnt2) {
      __PS_MV_REG = [];
      return Math.pow(pnt2.x - pnt1.x, 2) + Math.pow(pnt2.y - pnt1.y, 2);
  };
  /** Calculate distance from a target-point to a line passin through line-pnt1 and line-pnt2. */
  function calcDistToLine(targetPnt, linePnt1, linePnt2) {
      var slope;
      var offset;
      __PS_MV_REG = [];
      return Math.abs(linePnt1.x === linePnt2.x ? targetPnt.x - linePnt1.x : (slope = (linePnt2.y - linePnt1.y) / (linePnt2.x - linePnt1.x), (offset = linePnt1.y - slope * linePnt1.x, (targetPnt.y - slope * targetPnt.x - offset) / Math.sqrt(1 + Math.pow(slope, 2)))));
  };
  if ('undefined' === typeof ORIGINPNT) {
      var ORIGINPNT = makeVector2d('x', 0, 'y', 0);
  };
  /**
   * Calculate distance from a target-point to a line segment whose endponits are
   * line-pnt1 and line-pnt2.
   */
  function calcDistToLineSeg(targetPnt, linePnt1, linePnt2) {
      var movedLinePnt2 = cloneVector2d(linePnt2);
      var movedTargetPnt = cloneVector2d(targetPnt);
      decfVector2d(movedLinePnt2, linePnt1);
      decfVector2d(movedTargetPnt, linePnt1);
      var anglePnt2 = vector2dAngle(movedLinePnt2);
      var rotatePnt = function (nowPnt) {
          __PS_MV_REG = [];
          return decfRotateDiff(nowPnt, vector2dAbs(nowPnt), vector2dAngle(nowPnt), anglePnt2);
      };
      rotatePnt(movedLinePnt2);
      rotatePnt(movedTargetPnt);
      var leftX = Math.min(0, movedLinePnt2.x);
      var rightX = Math.max(0, movedLinePnt2.x);
      if (leftX <= movedTargetPnt.x && movedTargetPnt.x <= rightX) {
          __PS_MV_REG = [];
          return movedTargetPnt.y;
      } else {
          __PS_MV_REG = [];
          return Math.min(calcDist(movedTargetPnt, movedLinePnt2), calcDist(movedTargetPnt, ORIGINPNT)) * (movedTargetPnt.y > 0 ? 1 : -1);
      };
  };
  /** Move now-value closer to taret-value. But the max difference from now-value is limited by max-diff. */
  function adjustToTarget(nowValue, targetValue, maxDiff) {
      if (maxDiff <= 0) {
          throw 'The \'max-diff\' parameter should be a positive number.';
      };
      var diff = targetValue - nowValue;
      if (Math.abs(diff) < maxDiff) {
          __PS_MV_REG = [];
          return targetValue;
      } else {
          __PS_MV_REG = [];
          return diff > 0 ? nowValue + maxDiff : nowValue - maxDiff;
      };
  };
  /** Rotate now-angle closer to taret-angle. But the max difference from now-angle is limited by max-diff. */
  function rotateToTargetAngle(nowAngle, targetAngle, maxDiff) {
      if (maxDiff <= 0) {
          throw 'The \'max-diff\' parameter should be a positive number.';
      };
      var diff = diffAngle(nowAngle, targetAngle);
      if (Math.abs(diff) <= maxDiff) {
          __PS_MV_REG = [];
          return targetAngle;
      } else if (diff > 0) {
          __PS_MV_REG = [];
          return nowAngle -= maxDiff;
      } else {
          __PS_MV_REG = [];
          return nowAngle += maxDiff;
      };
  };
  /** Linear interpolation function for scalars. alpha = 0 -> min-value, alpha = 1 -> max-value */
  function lerpScalar(minValue, maxValue, alpha) {
      return minValue + alpha * (maxValue - minValue);
  };
  /** Linear interpolation function for vector-2d. alpha = 0 -> min-value, alpha = 1 -> max-value */
  function lerpVector2d(minVector, maxVector, alpha, place) {
      if (place === undefined) {
          place = makeVector2d();
      };
      place.x = lerpScalar(minVector.x, maxVector.x, alpha);
      place.y = lerpScalar(minVector.y, maxVector.y, alpha);
      __PS_MV_REG = [];
      return place;
  };
  /* --- extern symbols --- */
  return {
    'vector2dAbs': vector2dAbs,
    'vector2dAngle': vector2dAngle,
    'setfVector2dAbs': setfVector2dAbs,
    'setfVector2dAngle': setfVector2dAngle,
    'incfVector2d': incfVector2d,
    'addVector2d': addVector2d,
    'decfVector2d': decfVector2d,
    'subVector2d': subVector2d,
    'calcInnerProduct': calcInnerProduct,
    'calcOuterProductZ': calcOuterProductZ,
    'incfRotateDiff': incfRotateDiff,
    'decfRotateDiff': decfRotateDiff,
    'rotatefPointBy': rotatefPointBy,
    'movefVectorToCircle': movefVectorToCircle,
    'transformfPoint': transformfPoint,
    'transformfPointInverse': transformfPointInverse,
    'calcGlobalPoint': calcGlobalPoint,
    'calcParentGlobalPoint': calcParentGlobalPoint,
    'calcLocalPoint': calcLocalPoint,
    'multfVecScalar': multfVecScalar,
    'vecScalar': vecScalar,
    'divfVecScalar': divfVecScalar,
    'slashVecScalar': slashVecScalar,
    'truncatefVector2d': truncatefVector2d,
    'truncateVector2d': truncateVector2d,
    'diffAngle': diffAngle,
    'calcDist': calcDist,
    'calcDistP2': calcDistP2,
    'calcDistToLine': calcDistToLine,
    'calcDistToLineSeg': calcDistToLineSeg,
    'adjustToTarget': adjustToTarget,
    'rotateToTargetAngle': rotateToTargetAngle,
    'lerpScalar': lerpScalar,
    'lerpVector2d': lerpVector2d,
    '_internal': {
      'setfVector2dAbsAngle': setfVector2dAbsAngle,
      'transformfPointRec': transformfPointRec,
      'calcfVecScalar': calcfVecScalar,
      'ORIGINPNT': ORIGINPNT,
    }
  };
})();

var clWeb2dGame_physics_collision = (function() {
  /* --- import symbols --- */
  var lerpScalar = clWeb2dGame_utils_calc.lerpScalar;
  var calcDist = clWeb2dGame_utils_calc.calcDist;
  var calcOuterProductZ = clWeb2dGame_utils_calc.calcOuterProductZ;
  var calcDistToLine = clWeb2dGame_utils_calc.calcDistToLine;
  var calcLocalPoint = clWeb2dGame_utils_calc.calcLocalPoint;
  var truncateVector2d = clWeb2dGame_utils_calc.truncateVector2d;
  var movefVectorToCircle = clWeb2dGame_utils_calc.movefVectorToCircle;
  var multfVecScalar = clWeb2dGame_utils_calc.multfVecScalar;
  var decfRotateDiff = clWeb2dGame_utils_calc.decfRotateDiff;
  var divfVecScalar = clWeb2dGame_utils_calc.divfVecScalar;
  var vecScalar = clWeb2dGame_utils_calc.vecScalar;
  var vector2dAngle = clWeb2dGame_utils_calc.vector2dAngle;
  var slashVecScalar = clWeb2dGame_utils_calc.slashVecScalar;
  var rotatefPointBy = clWeb2dGame_utils_calc.rotatefPointBy;
  var subVector2d = clWeb2dGame_utils_calc.subVector2d;
  var lerpVector2d = clWeb2dGame_utils_calc.lerpVector2d;
  var calcParentGlobalPoint = clWeb2dGame_utils_calc.calcParentGlobalPoint;
  var addVector2d = clWeb2dGame_utils_calc.addVector2d;
  var setfVector2dAngle = clWeb2dGame_utils_calc.setfVector2dAngle;
  var diffAngle = clWeb2dGame_utils_calc.diffAngle;
  var adjustToTarget = clWeb2dGame_utils_calc.adjustToTarget;
  var rotateToTargetAngle = clWeb2dGame_utils_calc.rotateToTargetAngle;
  var incfRotateDiff = clWeb2dGame_utils_calc.incfRotateDiff;
  var incfVector2d = clWeb2dGame_utils_calc.incfVector2d;
  var calcGlobalPoint = clWeb2dGame_utils_calc.calcGlobalPoint;
  var setfVector2dAbs = clWeb2dGame_utils_calc.setfVector2dAbs;
  var vector2dAbs = clWeb2dGame_utils_calc.vector2dAbs;
  var decfVector2d = clWeb2dGame_utils_calc.decfVector2d;
  var transformfPointInverse = clWeb2dGame_utils_calc.transformfPointInverse;
  var transformfPoint = clWeb2dGame_utils_calc.transformfPoint;
  var truncatefVector2d = clWeb2dGame_utils_calc.truncatefVector2d;
  var calcDistP2 = clWeb2dGame_utils_calc.calcDistP2;
  var calcDistToLineSeg = clWeb2dGame_utils_calc.calcDistToLineSeg;
  var calcInnerProduct = clWeb2dGame_utils_calc.calcInnerProduct;
  var rotate2d = clWeb2dGame_core_basicComponents.rotate2d;
  var rect2dP = clWeb2dGame_core_basicComponents.rect2dP;
  var speed2dP = clWeb2dGame_core_basicComponents.speed2dP;
  var point2d = clWeb2dGame_core_basicComponents.point2d;
  var makePoint2d = clWeb2dGame_core_basicComponents.makePoint2d;
  var makeVector2d = clWeb2dGame_core_basicComponents.makeVector2d;
  var setEntityParam = clWeb2dGame_core_basicComponents.setEntityParam;
  var copyPoint2dTo = clWeb2dGame_core_basicComponents.copyPoint2dTo;
  var getEntityParam = clWeb2dGame_core_basicComponents.getEntityParam;
  var initEntityParams = clWeb2dGame_core_basicComponents.initEntityParams;
  var copyVector2dTo = clWeb2dGame_core_basicComponents.copyVector2dTo;
  var speed2d = clWeb2dGame_core_basicComponents.speed2d;
  var rect2d = clWeb2dGame_core_basicComponents.rect2d;
  var cloneVector2d = clWeb2dGame_core_basicComponents.cloneVector2d;
  var params = clWeb2dGame_core_basicComponents.params;
  var makeRect2d = clWeb2dGame_core_basicComponents.makeRect2d;
  var makeScript2d = clWeb2dGame_core_basicComponents.makeScript2d;
  var makeSpeed2d = clWeb2dGame_core_basicComponents.makeSpeed2d;
  var clonePoint2d = clWeb2dGame_core_basicComponents.clonePoint2d;
  var point2dP = clWeb2dGame_core_basicComponents.point2dP;
  var vector2d = clWeb2dGame_core_basicComponents.vector2d;
  var vector2dP = clWeb2dGame_core_basicComponents.vector2dP;
  var rotate2dP = clWeb2dGame_core_basicComponents.rotate2dP;
  var script2d = clWeb2dGame_core_basicComponents.script2d;
  var makeRotate2d = clWeb2dGame_core_basicComponents.makeRotate2d;
  var deleteDeleteComponentHook = clPsEcs_ecs.deleteDeleteComponentHook;
  var makeEcsEntity = clPsEcs_ecs.makeEcsEntity;
  var addEcsComponent = clPsEcs_ecs.addEcsComponent;
  var ecsEntity = clPsEcs_ecs.ecsEntity;
  var deleteEcsComponentType = clPsEcs_ecs.deleteEcsComponentType;
  var framePromise = clPsEcs_framePromise.framePromise;
  var deleteEntityTag = clPsEcs_ecs.deleteEntityTag;
  var deleteEcsEntity = clPsEcs_ecs.deleteEcsEntity;
  var cleanEcsEnv = clPsEcs_ecs.cleanEcsEnv;
  var addDeleteComponentHook = clPsEcs_ecs.addDeleteComponentHook;
  var ecsMain = clPsEcs_ecs.ecsMain;
  var includesAllComponentTypes = clPsEcs_utils.includesAllComponentTypes;
  var findAComponent = clPsEcs_ecs.findAComponent;
  var registerNframesAfterFunc = clPsEcs_basicProcess.registerNframesAfterFunc;
  var moveEcsEntity = clPsEcs_ecs.moveEcsEntity;
  var ecsComponent = clPsEcs_ecs.ecsComponent;
  var popDefaultEcsEntityParent = clPsEcs_ecs.popDefaultEcsEntityParent;
  var framePromiseP = clPsEcs_framePromise.framePromiseP;
  var getEcsComponent = clPsEcs_ecs.getEcsComponent;
  var ecsSystem = clPsEcs_ecs.ecsSystem;
  var addEntityTag = clPsEcs_ecs.addEntityTag;
  var ecsEntityP = clPsEcs_ecs.ecsEntityP;
  var registerEcsSystem = clPsEcs_ecs.registerEcsSystem;
  var registerFuncWithPred = clPsEcs_basicProcess.registerFuncWithPred;
  var addEcsEntityToBuffer = clPsEcs_ecs.addEcsEntityToBuffer;
  var checkEntityTags = clPsEcs_ecs.checkEntityTags;
  var initFramePromise = clPsEcs_framePromise.initFramePromise;
  var framePromiseThen = clPsEcs_framePromise.framePromiseThen;
  var addEcsEntity = clPsEcs_ecs.addEcsEntity;
  var registerNextFrameFunc = clPsEcs_basicProcess.registerNextFrameFunc;
  var findAEntityByTag = clPsEcs_ecs.findAEntityByTag;
  var stackDefaultEcsEntityParent = clPsEcs_ecs.stackDefaultEcsEntityParent;
  var addEcsComponentList = clPsEcs_ecs.addEcsComponentList;
  var framePromiseAll = clPsEcs_framePromise.framePromiseAll;
  var findTheEntity = clPsEcs_ecs.findTheEntity;
  var findAEntity = clPsEcs_ecs.findAEntity;
  var hasEntityTag = clPsEcs_ecs.hasEntityTag;
  var deleteEcsComponent = clPsEcs_ecs.deleteEcsComponent;
  var getDefaultEcsEntityParent = clPsEcs_ecs.getDefaultEcsEntityParent;
  /* --- define objects --- */
  function boundingBox2d() {
      this.left = -100000;
      this.right = 100000;
      this.bottom = -100000;
      this.top = 100000;
      return this;
  };
  function makeBoundingBox2d() {
      var _js1936 = arguments.length;
      for (var n1935 = 0; n1935 < _js1936; n1935 += 2) {
          switch (arguments[n1935]) {
          case 'left':
              left = arguments[n1935 + 1];
              break;
          case 'right':
              right = arguments[n1935 + 1];
              break;
          case 'bottom':
              bottom = arguments[n1935 + 1];
              break;
          case 'top':
              top = arguments[n1935 + 1];
          };
      };
      var left = 'undefined' === typeof left ? -100000 : left;
      var right = 'undefined' === typeof right ? 100000 : right;
      var bottom = 'undefined' === typeof bottom ? -100000 : bottom;
      var top = 'undefined' === typeof top ? 100000 : top;
      var result = new boundingBox2d();
      result.left = left;
      result.right = right;
      result.bottom = bottom;
      result.top = top;
      __PS_MV_REG = [];
      return result;
  };
  function boundingBox2dP(obj) {
      return (obj instanceof boundingBox2d);
  };
  function physic2d() {
      this.parent = null;
      this.children = [];
      this.registerp = null;
      this.kind = null;
      this.offset = makePoint2d();
      this.targetTags = [];
      this.boundingBox = makeBoundingBox2d();
      this.onCollision = function (mine, target) {
          return null;
      };
      __PS_MV_REG = [];
      return this;
  };
  function makePhysic2d() {
      var _js1938 = arguments.length;
      for (var n1937 = 0; n1937 < _js1938; n1937 += 2) {
          switch (arguments[n1937]) {
          case 'parent':
              parent = arguments[n1937 + 1];
              break;
          case 'children':
              children = arguments[n1937 + 1];
              break;
          case 'registerp':
              registerp = arguments[n1937 + 1];
              break;
          case 'kind':
              kind = arguments[n1937 + 1];
              break;
          case 'offset':
              offset = arguments[n1937 + 1];
              break;
          case 'target-tags':
              targetTags = arguments[n1937 + 1];
              break;
          case 'bounding-box':
              boundingBox = arguments[n1937 + 1];
              break;
          case 'on-collision':
              onCollision = arguments[n1937 + 1];
          };
      };
      var parent;
      var children = 'undefined' === typeof children ? [] : children;
      var registerp;
      var kind;
      var offset = 'undefined' === typeof offset ? makePoint2d() : offset;
      var targetTags = 'undefined' === typeof targetTags ? [] : targetTags;
      var boundingBox = 'undefined' === typeof boundingBox ? makeBoundingBox2d() : boundingBox;
      var onCollision = 'undefined' === typeof onCollision ? function (mine, target) {
          return null;
      } : onCollision;
      var result = new physic2d();
      result.parent = parent;
      result.children = children;
      result.registerp = registerp;
      result.kind = kind;
      result.offset = offset;
      result.targetTags = targetTags;
      result.boundingBox = boundingBox;
      result.onCollision = onCollision;
      __PS_MV_REG = [];
      return result;
  };
  function physic2dP(obj) {
      return (obj instanceof physic2d);
  };
  (function () {
      var tempCtor = function () {
          return null;
      };
      tempCtor.prototype = ecsComponent.prototype;
      physic2d.superClass_ = ecsComponent.prototype;
      physic2d.prototype = new tempCtor();
      __PS_MV_REG = [];
      return physic2d.prototype.constructor = physic2d;
  })();
  function physicCircle() {
      this.parent = null;
      this.children = [];
      this.registerp = null;
      this.kind = 'circle';
      this.offset = makePoint2d();
      this.targetTags = [];
      this.boundingBox = makeBoundingBox2d();
      this.onCollision = function (mine, target) {
          return null;
      };
      this.r = 0;
      __PS_MV_REG = [];
      return this;
  };
  function makePhysicCircle() {
      var _js1940 = arguments.length;
      for (var n1939 = 0; n1939 < _js1940; n1939 += 2) {
          switch (arguments[n1939]) {
          case 'parent':
              parent = arguments[n1939 + 1];
              break;
          case 'children':
              children = arguments[n1939 + 1];
              break;
          case 'registerp':
              registerp = arguments[n1939 + 1];
              break;
          case 'kind':
              kind = arguments[n1939 + 1];
              break;
          case 'offset':
              offset = arguments[n1939 + 1];
              break;
          case 'target-tags':
              targetTags = arguments[n1939 + 1];
              break;
          case 'bounding-box':
              boundingBox = arguments[n1939 + 1];
              break;
          case 'on-collision':
              onCollision = arguments[n1939 + 1];
              break;
          case 'r':
              r = arguments[n1939 + 1];
          };
      };
      var parent;
      var children = 'undefined' === typeof children ? [] : children;
      var registerp;
      var kind = 'undefined' === typeof kind ? 'circle' : kind;
      var offset = 'undefined' === typeof offset ? makePoint2d() : offset;
      var targetTags = 'undefined' === typeof targetTags ? [] : targetTags;
      var boundingBox = 'undefined' === typeof boundingBox ? makeBoundingBox2d() : boundingBox;
      var onCollision = 'undefined' === typeof onCollision ? function (mine, target) {
          return null;
      } : onCollision;
      var r = 'undefined' === typeof r ? 0 : r;
      var result = new physicCircle();
      result.parent = parent;
      result.children = children;
      result.registerp = registerp;
      result.kind = kind;
      result.offset = offset;
      result.targetTags = targetTags;
      result.boundingBox = boundingBox;
      result.onCollision = onCollision;
      result.r = r;
      __PS_MV_REG = [];
      return result;
  };
  function physicCircleP(obj) {
      return (obj instanceof physicCircle);
  };
  (function () {
      var tempCtor = function () {
          return null;
      };
      tempCtor.prototype = physic2d.prototype;
      physicCircle.superClass_ = physic2d.prototype;
      physicCircle.prototype = new tempCtor();
      __PS_MV_REG = [];
      return physicCircle.prototype.constructor = physicCircle;
  })();
  function physicPolygon() {
      this.parent = null;
      this.children = [];
      this.registerp = null;
      this.kind = 'polygon';
      this.offset = makePoint2d();
      this.targetTags = [];
      this.boundingBox = makeBoundingBox2d();
      this.onCollision = function (mine, target) {
          return null;
      };
      this.pntList = [];
      __PS_MV_REG = [];
      return this;
  };
  function makePhysicPolygon() {
      var _js1942 = arguments.length;
      for (var n1941 = 0; n1941 < _js1942; n1941 += 2) {
          switch (arguments[n1941]) {
          case 'parent':
              parent = arguments[n1941 + 1];
              break;
          case 'children':
              children = arguments[n1941 + 1];
              break;
          case 'registerp':
              registerp = arguments[n1941 + 1];
              break;
          case 'kind':
              kind = arguments[n1941 + 1];
              break;
          case 'offset':
              offset = arguments[n1941 + 1];
              break;
          case 'target-tags':
              targetTags = arguments[n1941 + 1];
              break;
          case 'bounding-box':
              boundingBox = arguments[n1941 + 1];
              break;
          case 'on-collision':
              onCollision = arguments[n1941 + 1];
              break;
          case 'pnt-list':
              pntList = arguments[n1941 + 1];
          };
      };
      var parent;
      var children = 'undefined' === typeof children ? [] : children;
      var registerp;
      var kind = 'undefined' === typeof kind ? 'polygon' : kind;
      var offset = 'undefined' === typeof offset ? makePoint2d() : offset;
      var targetTags = 'undefined' === typeof targetTags ? [] : targetTags;
      var boundingBox = 'undefined' === typeof boundingBox ? makeBoundingBox2d() : boundingBox;
      var onCollision = 'undefined' === typeof onCollision ? function (mine, target) {
          return null;
      } : onCollision;
      var pntList = 'undefined' === typeof pntList ? [] : pntList;
      var result = new physicPolygon();
      result.parent = parent;
      result.children = children;
      result.registerp = registerp;
      result.kind = kind;
      result.offset = offset;
      result.targetTags = targetTags;
      result.boundingBox = boundingBox;
      result.onCollision = onCollision;
      result.pntList = pntList;
      __PS_MV_REG = [];
      return result;
  };
  function physicPolygonP(obj) {
      return (obj instanceof physicPolygon);
  };
  (function () {
      var tempCtor = function () {
          return null;
      };
      tempCtor.prototype = physic2d.prototype;
      physicPolygon.superClass_ = physic2d.prototype;
      physicPolygon.prototype = new tempCtor();
      __PS_MV_REG = [];
      return physicPolygon.prototype.constructor = physicPolygon;
  })();
  function makePhysicRect() {
      var process;
      var _js1944 = arguments.length;
      for (var n1943 = 0; n1943 < _js1944; n1943 += 2) {
          switch (arguments[n1943]) {
          case 'x':
              x = arguments[n1943 + 1];
              break;
          case 'y':
              y = arguments[n1943 + 1];
              break;
          case 'width':
              width = arguments[n1943 + 1];
              break;
          case 'height':
              height = arguments[n1943 + 1];
          };
      };
      var x = 'undefined' === typeof x ? 0 : x;
      var y = 'undefined' === typeof y ? 0 : y;
      var width = 'undefined' === typeof width ? 0 : width;
      var height = 'undefined' === typeof height ? 0 : height;
      var rest = Array.prototype.slice.call(arguments, 0);
      for (var key = null, _js_arrvar1946 = ['x', 'y', 'width', 'height'], _js_idx1945 = 0; _js_idx1945 < _js_arrvar1946.length; _js_idx1945 += 1) {
          key = _js_arrvar1946[_js_idx1945];
          if (rest.length % 2 !== 0) {
              throw 'Message: ' + 'Invalid plist: ~A' + '; Args: ' + rest;
          };
          var keyIndex = (process = function () {
              for (var i = 0; i < rest.length / 2; i += 1) {
                  if (rest[i * 2] === key) {
                      return i * 2;
                  };
              };
          }, process());
          if (keyIndex != null) {
              rest.splice(keyIndex, 2);
              true;
          };
      };
      var pntList = [makePoint2d('x', x, 'y', y), makePoint2d('x', x + width, 'y', y), makePoint2d('x', x + width, 'y', y + height), makePoint2d('x', x, 'y', y + height)];
      __PS_MV_REG = [];
      return makePhysicPolygon.apply(this, ['pnt-list', pntList].concat(rest));
  };
  function colCc(x1, y1, r1, x2, y2, r2) {
      __PS_MV_REG = [];
      return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) <= Math.pow(r1 + r2, 2);
  };
  function colCcVec(point1, offset1, r1, point2, offset2, r2) {
      __PS_MV_REG = [];
      return colCc(point1.x + offset1.x, point1.y + offset1.x, r1, point2.x + offset2.x, point2.y + offset2.y, r2);
  };
  function colCcPhysic(circle1, point1, circle2, point2) {
      if (!((circle1 instanceof (typeof physicCircle === 'string' ? eval(physicCircle) : physicCircle)))) {
          throw '\'TYPE-ERROR: (The place is \'CIRCLE1\'. The expected type is \'PHYSIC-CIRCLE\')';
      };
      if (!((circle2 instanceof (typeof physicCircle === 'string' ? eval(physicCircle) : physicCircle)))) {
          throw '\'TYPE-ERROR: (The place is \'CIRCLE2\'. The expected type is \'PHYSIC-CIRCLE\')';
      };
      __PS_MV_REG = [];
      return colCcVec(point1, circle1.offset, circle1.r, point2, circle2.offset, circle2.r);
  };
  /**
   * Do collision between a circle and a convec polygon. (The cx cy cr are circle parameters. The point-list-po is a polygon parameters (A list of vector-2d)
   * Algorighm: A circle and a polygon collisions under following conditions
   *   1. The center of the circle is in the polygon. <OR>
   *   2. A line of the polygon intersects to the circle.
   *      (This contains the case where the circle includes the line.)
   * Note: The second condition can't check only the case where
   *       any point of the circle is in the polygon. The first
   *       condition can check such case.
   */
  function colCp(cx, cy, cr, pointListPo) {
      var numPnts = pointListPo.length;
      if (numPnts === 0) {
          throw 'Can\'t do collision with an empty poligon.';
      };
      if (numPnts < 3) {
          throw 'Can\'t do collision with an point (length 1) or a line (length 2).';
      };
      if (isPntInPolygon(cx, cy, pointListPo)) {
          __PS_MV_REG = [];
          return true;
      };
      for (var i = 0; i < numPnts; i += 1) {
          if (intersectsLineAndCircle(cx, cy, cr, pointListPo[i].x, pointListPo[i].y, pointListPo[((i + 1) % numPnts + numPnts) % numPnts].x, pointListPo[((i + 1) % numPnts + numPnts) % numPnts].y)) {
              __PS_MV_REG = [];
              return true;
          };
      };
      __PS_MV_REG = [];
      return null;
  };
  function colCpVec(pointC, offsetC, rc, pointPo, offsetPo, vecListPo) {
      var globalPointC = clonePoint2d(offsetC);
      var globalPointListPo = makeGlobalPointList(pointPo, offsetPo, vecListPo);
      transformfPoint(globalPointC, pointC);
      __PS_MV_REG = [];
      return colCp(globalPointC.x, globalPointC.y, rc, globalPointListPo);
  };
  function colCpPhysic(circle, pointC, polygon, pointPo) {
      if (!((circle instanceof (typeof physicCircle === 'string' ? eval(physicCircle) : physicCircle)))) {
          throw '\'TYPE-ERROR: (The place is \'CIRCLE\'. The expected type is \'PHYSIC-CIRCLE\')';
      };
      if (!((polygon instanceof (typeof physicPolygon === 'string' ? eval(physicPolygon) : physicPolygon)))) {
          throw '\'TYPE-ERROR: (The place is \'POLYGON\'. The expected type is \'PHYSIC-POLYGON\')';
      };
      __PS_MV_REG = [];
      return colCpVec(pointC, circle.offset, circle.r, pointPo, polygon.offset, polygon.pntList);
  };
  /** Do collision between two convec polygons. */
  function colPp(pointList1, pointList2) {
      var len1 = pointList1.length;
      var len2 = pointList2.length;
      for (var i = 0; i < len1; i += 1) {
          var pnt11 = pointList1[i];
          var pnt12 = pointList1[((i + 1) % len1 + len1) % len1];
          for (var j = 0; j < len2; j += 1) {
              var pnt21 = pointList2[j];
              var pnt22 = pointList2[((j + 1) % len2 + len2) % len2];
              if (intersectsTwoLines(pnt11.x, pnt11.y, pnt12.x, pnt12.y, pnt21.x, pnt21.y, pnt22.x, pnt22.y)) {
                  __PS_MV_REG = [];
                  return true;
              };
          };
      };
      var pnt1 = pointList1[0];
      var pnt2 = pointList2[0];
      __PS_MV_REG = [];
      return isPntInPolygon(pnt1.x, pnt1.y, pointList2) || isPntInPolygon(pnt2.x, pnt2.y, pointList1);
  };
  function colPpVec(point1, offset1, pointList1, point2, offset2, pointList2) {
      __PS_MV_REG = [];
      return colPp(makeGlobalPointList(point1, offset1, pointList1), makeGlobalPointList(point2, offset2, pointList2));
  };
  function colPpPhysic(polygon1, point1, polygon2, point2) {
      if (!((polygon1 instanceof (typeof physicPolygon === 'string' ? eval(physicPolygon) : physicPolygon)))) {
          throw '\'TYPE-ERROR: (The place is \'POLYGON1\'. The expected type is \'PHYSIC-POLYGON\')';
      };
      if (!((polygon2 instanceof (typeof physicPolygon === 'string' ? eval(physicPolygon) : physicPolygon)))) {
          throw '\'TYPE-ERROR: (The place is \'POLYGON2\'. The expected type is \'PHYSIC-POLYGON\')';
      };
      __PS_MV_REG = [];
      return colPpVec(point1, polygon1.offset, polygon1.pntList, point2, polygon2.offset, polygon2.pntList);
  };
  function intersectsLineAndCircle(cx, cy, cr, lx1, ly1, lx2, ly2) {
      __PS_MV_REG = [];
      return cr > Math.abs(calcDistToLineSeg(makeVector2d('x', cx, 'y', cy), makeVector2d('x', lx1, 'y', ly1), makeVector2d('x', lx2, 'y', ly2)));
  };
  function intersectsTwoLines(l1x1, l1y1, l1x2, l1y2, l2x1, l2y1, l2x2, l2y2) {
      var calcToLine1 = function (x, y) {
          return (l1y2 - l1y1) * (x - l1x1) - (l1x2 - l1x1) * (y - l1y1);
      };
      var calcToLine2 = function (x, y) {
          return (l2y2 - l2y1) * (x - l2x1) - (l2x2 - l2x1) * (y - l2y1);
      };
      __PS_MV_REG = [];
      return 0 > calcToLine1(l2x1, l2y1) * calcToLine1(l2x2, l2y2) && 0 > calcToLine2(l1x1, l1y1) * calcToLine2(l1x2, l1y2);
  };
  /** Judge if a target point is in triangle or not by calculating vector product */
  function isPntInTriangle(targetX, targetY, x1, y1, x2, y2, x3, y3) {
      var calcVectorProduct = function (x1, y1, x2, y2) {
          return x1 * y2 - x2 * y1;
      };
      var isSameSign = function (a, b, c) {
          return a <= 0 && b <= 0 && c <= 0 || a >= 0 && b >= 0 && c >= 0;
      };
      __PS_MV_REG = [];
      return isSameSign(calcVectorProduct(x2 - x1, y2 - y1, targetX - x1, targetY - y1), calcVectorProduct(x3 - x2, y3 - y2, targetX - x2, targetY - y2), calcVectorProduct(x1 - x3, y1 - y3, targetX - x3, targetY - y3));
  };
  function isPntInPolygon(targetX, targetY, pointListPo) {
      for (var i = 0; i < pointListPo.length - 2; i += 1) {
          if (isPntInTriangle(targetX, targetY, pointListPo[0].x, pointListPo[0].y, pointListPo[i + 1].x, pointListPo[i + 1].y, pointListPo[i + 2].x, pointListPo[i + 2].y)) {
              __PS_MV_REG = [];
              return true;
          };
      };
  };
  function makeGlobalPointList(coordinate, offset, vecList) {
      var globalPointList = [];
      for (var vec = null, _js_idx1947 = 0; _js_idx1947 < vecList.length; _js_idx1947 += 1) {
          vec = vecList[_js_idx1947];
          var point = clonePoint2d(offset);
          incfVector2d(point, vec);
          transformfPoint(point, coordinate);
          globalPointList.unshift(point);
          globalPointList;
      };
      __PS_MV_REG = [];
      return globalPointList;
  };
  /** Update bounding box in the physic in global coordinate */
  function updateBoundingBox(physic, globalCoordinate) {
      var object1948 = physic.boundingBox;
      var globalPoint = clonePoint2d(physic.offset);
      transformfPoint(globalPoint, globalCoordinate);
      var gKeyform1949 = physic;
      if ((gKeyform1949 instanceof (typeof physicCircle === 'string' ? eval(physicCircle) : physicCircle))) {
          object1948.left = globalPoint.x - physic.r;
          object1948.right = globalPoint.x + physic.r;
          object1948.bottom = globalPoint.y - physic.r;
          object1948.top = globalPoint.y + physic.r;
      } else if ((gKeyform1949 instanceof (typeof physicPolygon === 'string' ? eval(physicPolygon) : physicPolygon))) {
          var bufferPnt = makePoint2d();
          var initializedP = null;
          for (var pnt = null, _js_arrvar1951 = physic.pntList, _js_idx1950 = 0; _js_idx1950 < _js_arrvar1951.length; _js_idx1950 += 1) {
              pnt = _js_arrvar1951[_js_idx1950];
              copyPoint2dTo(bufferPnt, pnt);
              transformfPoint(bufferPnt, globalPoint);
              if (!initializedP || bufferPnt.x < object1948.left) {
                  object1948.left = bufferPnt.x;
              };
              if (!initializedP || bufferPnt.x > object1948.right) {
                  object1948.right = bufferPnt.x;
              };
              if (!initializedP || bufferPnt.y < object1948.bottom) {
                  object1948.bottom = bufferPnt.y;
              };
              if (!initializedP || bufferPnt.y > object1948.top) {
                  object1948.top = bufferPnt.y;
              };
              initializedP = true;
          };
      } else {
          throw '\'TYPE-ERROR: (The place is \'PHYSIC\'. The expected type is \'(OR PHYSIC-CIRCLE PHYSIC-POLYGON)\')';
      };
      __PS_MV_REG = [];
      return physic.boundingBox;
  };
  function colTwoBoundingBoxP(box1, box2) {
      return !(box1.left > box2.right || box2.left > box1.right || box1.bottom > box2.top || box2.bottom > box1.top);
  };
  function collidePhysicsP(ph1, pnt1, ph2, pnt2) {
      if (!colTwoBoundingBoxP(ph1.boundingBox, ph2.boundingBox)) {
          __PS_MV_REG = [];
          return null;
      };
      var isKindPair = function (physic1, physic2, kind1, kind2) {
          return physic1.kind === kind1 && physic2.kind === kind2;
      };
      if (isKindPair(ph1, ph2, 'circle', 'circle')) {
          __PS_MV_REG = [];
          return colCcPhysic(ph1, pnt1, ph2, pnt2);
      } else if (isKindPair(ph1, ph2, 'circle', 'polygon')) {
          __PS_MV_REG = [];
          return colCpPhysic(ph1, pnt1, ph2, pnt2);
      } else if (isKindPair(ph1, ph2, 'polygon', 'circle')) {
          __PS_MV_REG = [];
          return colCpPhysic(ph2, pnt2, ph1, pnt1);
      } else if (isKindPair(ph1, ph2, 'polygon', 'polygon')) {
          __PS_MV_REG = [];
          return colPpPhysic(ph1, pnt1, ph2, pnt2);
      } else {
          throw 'not recognized physical type';
      };
  };
  function collideEntitiesWithPhysicsP(entity1, ph1, entity2, ph2) {
      var pnt1 = calcGlobalPoint(entity1);
      var pnt2 = calcGlobalPoint(entity2);
      __PS_MV_REG = [];
      return collidePhysicsP(ph1, pnt1, ph2, pnt2);
  };
  function collideEntitiesP(entity1, entity2) {
      var ph1 = (found = getEcsComponent(physic2d, entity1), found ? found : (function () {
          throw 'PHYSIC-2D is not included in the entity';
      })());
      var ph2 = (found1952 = getEcsComponent(physic2d, entity2), found1952 ? found1952 : (function () {
          throw 'PHYSIC-2D is not included in the entity';
      })());
      __PS_MV_REG = [];
      return collideEntitiesWithPhysicsP(entity1, ph1, entity2, ph2);
  };
  /** The collision should be done in the following cases: 1. Both physics has no target. 2. One of each physics has a targeted tag, it should be  */
  function judgeCollisionTargetTags(entity1, ph1, entity2, ph2) {
      if (!((ph1 instanceof (typeof physic2d === 'string' ? eval(physic2d) : physic2d)))) {
          throw '\'TYPE-ERROR: (The place is \'PH1\'. The expected type is \'PHYSIC-2D\')';
      };
      if (!((ph2 instanceof (typeof physic2d === 'string' ? eval(physic2d) : physic2d)))) {
          throw '\'TYPE-ERROR: (The place is \'PH2\'. The expected type is \'PHYSIC-2D\')';
      };
      if (ph1.targetTags.length === 0 && ph2.targetTags.length === 0) {
          __PS_MV_REG = [];
          return true;
      };
      for (var tag = null, _js_arrvar1954 = ph1.targetTags, _js_idx1953 = 0; _js_idx1953 < _js_arrvar1954.length; _js_idx1953 += 1) {
          tag = _js_arrvar1954[_js_idx1953];
          if (hasEntityTag(entity2, tag)) {
              __PS_MV_REG = [];
              return true;
          };
      };
      for (var tag = null, _js_arrvar1956 = ph2.targetTags, _js_idx1955 = 0; _js_idx1955 < _js_arrvar1956.length; _js_idx1955 += 1) {
          tag = _js_arrvar1956[_js_idx1955];
          if (hasEntityTag(entity1, tag)) {
              __PS_MV_REG = [];
              return true;
          };
      };
      __PS_MV_REG = [];
      return null;
  };
  /* --- extern symbols --- */
  return {
    'boundingBox2d': boundingBox2d,
    'makeBoundingBox2d': makeBoundingBox2d,
    'physic2d': physic2d,
    'makePhysic2d': makePhysic2d,
    'physicCircle': physicCircle,
    'makePhysicCircle': makePhysicCircle,
    'physicPolygon': physicPolygon,
    'makePhysicPolygon': makePhysicPolygon,
    'makePhysicRect': makePhysicRect,
    'updateBoundingBox': updateBoundingBox,
    'colTwoBoundingBoxP': colTwoBoundingBoxP,
    'collidePhysicsP': collidePhysicsP,
    'collideEntitiesP': collideEntitiesP,
    'judgeCollisionTargetTags': judgeCollisionTargetTags,
    '_internal': {
      'boundingBox2dP': boundingBox2dP,
      'physic2dP': physic2dP,
      'physicCircleP': physicCircleP,
      'physicPolygonP': physicPolygonP,
      'colCc': colCc,
      'colCcVec': colCcVec,
      'colCcPhysic': colCcPhysic,
      'colCp': colCp,
      'colCpVec': colCpVec,
      'colCpPhysic': colCpPhysic,
      'colPp': colPp,
      'colPpVec': colPpVec,
      'colPpPhysic': colPpPhysic,
      'intersectsLineAndCircle': intersectsLineAndCircle,
      'intersectsTwoLines': intersectsTwoLines,
      'isPntInTriangle': isPntInTriangle,
      'isPntInPolygon': isPntInPolygon,
      'makeGlobalPointList': makeGlobalPointList,
      'collideEntitiesWithPhysicsP': collideEntitiesWithPhysicsP,
    }
  };
})();

var clWeb2dGame_inputs_ui = (function() {
  /* --- import symbols --- */
  var physicPolygon = clWeb2dGame_physics_collision.physicPolygon;
  var makePhysicCircle = clWeb2dGame_physics_collision.makePhysicCircle;
  var updateBoundingBox = clWeb2dGame_physics_collision.updateBoundingBox;
  var physicCircle = clWeb2dGame_physics_collision.physicCircle;
  var colTwoBoundingBoxP = clWeb2dGame_physics_collision.colTwoBoundingBoxP;
  var collidePhysicsP = clWeb2dGame_physics_collision.collidePhysicsP;
  var makePhysicRect = clWeb2dGame_physics_collision.makePhysicRect;
  var physic2d = clWeb2dGame_physics_collision.physic2d;
  var boundingBox2d = clWeb2dGame_physics_collision.boundingBox2d;
  var makePhysicPolygon = clWeb2dGame_physics_collision.makePhysicPolygon;
  var makeBoundingBox2d = clWeb2dGame_physics_collision.makeBoundingBox2d;
  var makePhysic2d = clWeb2dGame_physics_collision.makePhysic2d;
  var judgeCollisionTargetTags = clWeb2dGame_physics_collision.judgeCollisionTargetTags;
  var collideEntitiesP = clWeb2dGame_physics_collision.collideEntitiesP;
  var keyDownCount = clWeb2dGame_inputs_input.keyDownCount;
  var getTouchX = clWeb2dGame_inputs_input.getTouchX;
  var addMouseMoveCallback = clWeb2dGame_inputs_input.addMouseMoveCallback;
  var getTotalTouchState = clWeb2dGame_inputs_input.getTotalTouchState;
  var addMouseWheelCallback = clWeb2dGame_inputs_input.addMouseWheelCallback;
  var getMouseUpCount = clWeb2dGame_inputs_input.getMouseUpCount;
  var getMouseX = clWeb2dGame_inputs_input.getMouseX;
  var getMouseState = clWeb2dGame_inputs_input.getMouseState;
  var processInput = clWeb2dGame_inputs_input.processInput;
  var getLeftMouseState = clWeb2dGame_inputs_input.getLeftMouseState;
  var initInput = clWeb2dGame_inputs_input.initInput;
  var getMouseY = clWeb2dGame_inputs_input.getMouseY;
  var keyUpP = clWeb2dGame_inputs_input.keyUpP;
  var keyUpNowP = clWeb2dGame_inputs_input.keyUpNowP;
  var getTouchState = clWeb2dGame_inputs_input.getTouchState;
  var addMouseDownCallback = clWeb2dGame_inputs_input.addMouseDownCallback;
  var keyDownP = clWeb2dGame_inputs_input.keyDownP;
  var getTotalTouchY = clWeb2dGame_inputs_input.getTotalTouchY;
  var getTouchY = clWeb2dGame_inputs_input.getTouchY;
  var getTotalTouchX = clWeb2dGame_inputs_input.getTotalTouchX;
  var addTouchEndCallback = clWeb2dGame_inputs_input.addTouchEndCallback;
  var addMouseUpCallback = clWeb2dGame_inputs_input.addMouseUpCallback;
  var addTouchStartCallback = clWeb2dGame_inputs_input.addTouchStartCallback;
  var startKeyMonitoring = clWeb2dGame_inputs_input.startKeyMonitoring;
  var getMouseDownCount = clWeb2dGame_inputs_input.getMouseDownCount;
  var keyUpCount = clWeb2dGame_inputs_input.keyUpCount;
  var getRightMouseState = clWeb2dGame_inputs_input.getRightMouseState;
  var getMouseWheelDeltaY = clWeb2dGame_inputs_input.getMouseWheelDeltaY;
  var addTouchMoveCallback = clWeb2dGame_inputs_input.addTouchMoveCallback;
  var keyDownNowP = clWeb2dGame_inputs_input.keyDownNowP;
  var getPhysicalKeyName = clWeb2dGame_inputs_input.getPhysicalKeyName;
  var rotate2d = clWeb2dGame_core_basicComponents.rotate2d;
  var rect2dP = clWeb2dGame_core_basicComponents.rect2dP;
  var speed2dP = clWeb2dGame_core_basicComponents.speed2dP;
  var point2d = clWeb2dGame_core_basicComponents.point2d;
  var makePoint2d = clWeb2dGame_core_basicComponents.makePoint2d;
  var makeVector2d = clWeb2dGame_core_basicComponents.makeVector2d;
  var setEntityParam = clWeb2dGame_core_basicComponents.setEntityParam;
  var copyPoint2dTo = clWeb2dGame_core_basicComponents.copyPoint2dTo;
  var getEntityParam = clWeb2dGame_core_basicComponents.getEntityParam;
  var initEntityParams = clWeb2dGame_core_basicComponents.initEntityParams;
  var copyVector2dTo = clWeb2dGame_core_basicComponents.copyVector2dTo;
  var speed2d = clWeb2dGame_core_basicComponents.speed2d;
  var rect2d = clWeb2dGame_core_basicComponents.rect2d;
  var cloneVector2d = clWeb2dGame_core_basicComponents.cloneVector2d;
  var params = clWeb2dGame_core_basicComponents.params;
  var makeRect2d = clWeb2dGame_core_basicComponents.makeRect2d;
  var makeScript2d = clWeb2dGame_core_basicComponents.makeScript2d;
  var makeSpeed2d = clWeb2dGame_core_basicComponents.makeSpeed2d;
  var clonePoint2d = clWeb2dGame_core_basicComponents.clonePoint2d;
  var point2dP = clWeb2dGame_core_basicComponents.point2dP;
  var vector2d = clWeb2dGame_core_basicComponents.vector2d;
  var vector2dP = clWeb2dGame_core_basicComponents.vector2dP;
  var rotate2dP = clWeb2dGame_core_basicComponents.rotate2dP;
  var script2d = clWeb2dGame_core_basicComponents.script2d;
  var makeRotate2d = clWeb2dGame_core_basicComponents.makeRotate2d;
  var deleteDeleteComponentHook = clPsEcs_ecs.deleteDeleteComponentHook;
  var makeEcsEntity = clPsEcs_ecs.makeEcsEntity;
  var addEcsComponent = clPsEcs_ecs.addEcsComponent;
  var ecsEntity = clPsEcs_ecs.ecsEntity;
  var deleteEcsComponentType = clPsEcs_ecs.deleteEcsComponentType;
  var framePromise = clPsEcs_framePromise.framePromise;
  var deleteEntityTag = clPsEcs_ecs.deleteEntityTag;
  var deleteEcsEntity = clPsEcs_ecs.deleteEcsEntity;
  var cleanEcsEnv = clPsEcs_ecs.cleanEcsEnv;
  var addDeleteComponentHook = clPsEcs_ecs.addDeleteComponentHook;
  var ecsMain = clPsEcs_ecs.ecsMain;
  var includesAllComponentTypes = clPsEcs_utils.includesAllComponentTypes;
  var findAComponent = clPsEcs_ecs.findAComponent;
  var registerNframesAfterFunc = clPsEcs_basicProcess.registerNframesAfterFunc;
  var moveEcsEntity = clPsEcs_ecs.moveEcsEntity;
  var ecsComponent = clPsEcs_ecs.ecsComponent;
  var popDefaultEcsEntityParent = clPsEcs_ecs.popDefaultEcsEntityParent;
  var framePromiseP = clPsEcs_framePromise.framePromiseP;
  var getEcsComponent = clPsEcs_ecs.getEcsComponent;
  var ecsSystem = clPsEcs_ecs.ecsSystem;
  var addEntityTag = clPsEcs_ecs.addEntityTag;
  var ecsEntityP = clPsEcs_ecs.ecsEntityP;
  var registerEcsSystem = clPsEcs_ecs.registerEcsSystem;
  var registerFuncWithPred = clPsEcs_basicProcess.registerFuncWithPred;
  var addEcsEntityToBuffer = clPsEcs_ecs.addEcsEntityToBuffer;
  var checkEntityTags = clPsEcs_ecs.checkEntityTags;
  var initFramePromise = clPsEcs_framePromise.initFramePromise;
  var framePromiseThen = clPsEcs_framePromise.framePromiseThen;
  var addEcsEntity = clPsEcs_ecs.addEcsEntity;
  var registerNextFrameFunc = clPsEcs_basicProcess.registerNextFrameFunc;
  var findAEntityByTag = clPsEcs_ecs.findAEntityByTag;
  var stackDefaultEcsEntityParent = clPsEcs_ecs.stackDefaultEcsEntityParent;
  var addEcsComponentList = clPsEcs_ecs.addEcsComponentList;
  var framePromiseAll = clPsEcs_framePromise.framePromiseAll;
  var findTheEntity = clPsEcs_ecs.findTheEntity;
  var findAEntity = clPsEcs_ecs.findAEntity;
  var hasEntityTag = clPsEcs_ecs.hasEntityTag;
  var deleteEcsComponent = clPsEcs_ecs.deleteEcsComponent;
  var getDefaultEcsEntityParent = clPsEcs_ecs.getDefaultEcsEntityParent;
  var calcGlobalPoint = clWeb2dGame_utils_calc.calcGlobalPoint;
  /* --- define objects --- */
  function uiComponent() {
      this.parent = null;
      this.children = [];
      this.registerp = null;
      this.onClickDown = null;
      this.onClickUp = null;
      this.onMouseEnter = null;
      this.onMouseLeave = null;
      this.onMouseHover = null;
      this.onMouseNotHover = null;
      this.mouseHoverP = null;
      return this;
  };
  function makeUiComponent() {
      var _js1958 = arguments.length;
      for (var n1957 = 0; n1957 < _js1958; n1957 += 2) {
          switch (arguments[n1957]) {
          case 'parent':
              parent = arguments[n1957 + 1];
              break;
          case 'children':
              children = arguments[n1957 + 1];
              break;
          case 'registerp':
              registerp = arguments[n1957 + 1];
              break;
          case 'on-click-down':
              onClickDown = arguments[n1957 + 1];
              break;
          case 'on-click-up':
              onClickUp = arguments[n1957 + 1];
              break;
          case 'on-mouse-enter':
              onMouseEnter = arguments[n1957 + 1];
              break;
          case 'on-mouse-leave':
              onMouseLeave = arguments[n1957 + 1];
              break;
          case 'on-mouse-hover':
              onMouseHover = arguments[n1957 + 1];
              break;
          case 'on-mouse-not-hover':
              onMouseNotHover = arguments[n1957 + 1];
              break;
          case 'mouse-hover-p':
              mouseHoverP = arguments[n1957 + 1];
          };
      };
      var parent;
      var children = 'undefined' === typeof children ? [] : children;
      var registerp;
      var onClickDown;
      var onClickUp;
      var onMouseEnter;
      var onMouseLeave;
      var onMouseHover;
      var onMouseNotHover;
      var mouseHoverP;
      var result = new uiComponent();
      result.parent = parent;
      result.children = children;
      result.registerp = registerp;
      result.onClickDown = onClickDown;
      result.onClickUp = onClickUp;
      result.onMouseEnter = onMouseEnter;
      result.onMouseLeave = onMouseLeave;
      result.onMouseHover = onMouseHover;
      result.onMouseNotHover = onMouseNotHover;
      result.mouseHoverP = mouseHoverP;
      __PS_MV_REG = [];
      return result;
  };
  function uiComponentP(obj) {
      return (obj instanceof uiComponent);
  };
  (function () {
      var tempCtor = function () {
          return null;
      };
      tempCtor.prototype = ecsComponent.prototype;
      uiComponent.superClass_ = ecsComponent.prototype;
      uiComponent.prototype = new tempCtor();
      __PS_MV_REG = [];
      return uiComponent.prototype.constructor = uiComponent;
  })();
  if ('undefined' === typeof CURRENTTARGET) {
      var CURRENTTARGET = null;
  };
  function uiSystem() {
      this.enable = true;
      this.targetEntities = [];
      this.targetComponentTypes = [point2d, uiComponent, physic2d];
      this.process = function (entity) {
          var physic2d1959 = (found = getEcsComponent(physic2d, entity), found ? found : (function () {
              throw 'PHYSIC-2D is not included in the entity';
          })());
          var uiComponent1960 = (found1961 = getEcsComponent(uiComponent, entity), found1961 ? found1961 : (function () {
              throw 'UI-COMPONENT is not included in the entity';
          })());
          var mousePnt = makePoint2d('x', getMouseX(), 'y', getMouseY());
          var mousePhysic = makePhysicCircle('r', 0);
          var collideP = collidePhysicsP(physic2d1959, calcGlobalPoint(entity), mousePhysic, mousePnt);
          if (collideP) {
              if (uiComponent1960.onMouseHover) {
                  uiComponent1960.onMouseHover();
              };
              if (uiComponent1960.onMouseEnter && !uiComponent1960.mouseHoverP) {
                  uiComponent1960.onMouseEnter();
              };
              uiComponent1960.mouseHoverP = true;
          } else {
              if (uiComponent1960.onMouseNotHover) {
                  uiComponent1960.onMouseNotHover();
              };
              if (uiComponent1960.onMouseLeave && uiComponent1960.mouseHoverP) {
                  uiComponent1960.onMouseLeave();
              };
              uiComponent1960.mouseHoverP = null;
          };
          switch (getLeftMouseState()) {
          case 'down-now':
              if (collideP) {
                  CURRENTTARGET = entity;
                  __PS_MV_REG = [];
                  return uiComponent1960.onClickDown ? uiComponent1960.onClickDown() : null;
              } else {
                  __PS_MV_REG = [];
                  return null;
              };
          case 'up-now':
              if (collideP && CURRENTTARGET === entity && findTheEntity(entity)) {
                  __PS_MV_REG = [];
                  return uiComponent1960.onClickUp ? uiComponent1960.onClickUp() : null;
              } else {
                  __PS_MV_REG = [];
                  return null;
              };
          };
      };
      this.processAll = function (system) {
          return system;
      };
      this.addEntityHook = function (entity) {
          return entity;
      };
      this.deleteEntityHook = function (entity) {
          return entity;
      };
      return this;
  };
  function makeUiSystem() {
      var _js1963 = arguments.length;
      for (var n1962 = 0; n1962 < _js1963; n1962 += 2) {
          switch (arguments[n1962]) {
          case 'enable':
              enable = arguments[n1962 + 1];
              break;
          case 'target-entities':
              targetEntities = arguments[n1962 + 1];
              break;
          case 'target-component-types':
              targetComponentTypes = arguments[n1962 + 1];
              break;
          case 'process':
              process = arguments[n1962 + 1];
              break;
          case 'process-all':
              processAll = arguments[n1962 + 1];
              break;
          case 'add-entity-hook':
              addEntityHook = arguments[n1962 + 1];
              break;
          case 'delete-entity-hook':
              deleteEntityHook = arguments[n1962 + 1];
          };
      };
      var enable = 'undefined' === typeof enable ? true : enable;
      var targetEntities = 'undefined' === typeof targetEntities ? [] : targetEntities;
      var targetComponentTypes = 'undefined' === typeof targetComponentTypes ? [point2d, uiComponent, physic2d] : targetComponentTypes;
      var process = 'undefined' === typeof process ? function (entity) {
          var physic2d1964 = (found = getEcsComponent(physic2d, entity), found ? found : (function () {
              throw 'PHYSIC-2D is not included in the entity';
          })());
          var uiComponent1965 = (found1966 = getEcsComponent(uiComponent, entity), found1966 ? found1966 : (function () {
              throw 'UI-COMPONENT is not included in the entity';
          })());
          var mousePnt = makePoint2d('x', getMouseX(), 'y', getMouseY());
          var mousePhysic = makePhysicCircle('r', 0);
          var collideP = collidePhysicsP(physic2d1964, calcGlobalPoint(entity), mousePhysic, mousePnt);
          if (collideP) {
              if (uiComponent1965.onMouseHover) {
                  uiComponent1965.onMouseHover();
              };
              if (uiComponent1965.onMouseEnter && !uiComponent1965.mouseHoverP) {
                  uiComponent1965.onMouseEnter();
              };
              uiComponent1965.mouseHoverP = true;
          } else {
              if (uiComponent1965.onMouseNotHover) {
                  uiComponent1965.onMouseNotHover();
              };
              if (uiComponent1965.onMouseLeave && uiComponent1965.mouseHoverP) {
                  uiComponent1965.onMouseLeave();
              };
              uiComponent1965.mouseHoverP = null;
          };
          switch (getLeftMouseState()) {
          case 'down-now':
              if (collideP) {
                  CURRENTTARGET = entity;
                  __PS_MV_REG = [];
                  return uiComponent1965.onClickDown ? uiComponent1965.onClickDown() : null;
              } else {
                  __PS_MV_REG = [];
                  return null;
              };
          case 'up-now':
              if (collideP && CURRENTTARGET === entity && findTheEntity(entity)) {
                  __PS_MV_REG = [];
                  return uiComponent1965.onClickUp ? uiComponent1965.onClickUp() : null;
              } else {
                  __PS_MV_REG = [];
                  return null;
              };
          };
      } : process;
      var processAll = 'undefined' === typeof processAll ? function (system) {
          return system;
      } : processAll;
      var addEntityHook = 'undefined' === typeof addEntityHook ? function (entity) {
          return entity;
      } : addEntityHook;
      var deleteEntityHook = 'undefined' === typeof deleteEntityHook ? function (entity) {
          return entity;
      } : deleteEntityHook;
      var result = new uiSystem();
      result.enable = enable;
      result.targetEntities = targetEntities;
      result.targetComponentTypes = targetComponentTypes;
      result.process = process;
      result.processAll = processAll;
      result.addEntityHook = addEntityHook;
      result.deleteEntityHook = deleteEntityHook;
      __PS_MV_REG = [];
      return result;
  };
  function uiSystemP(obj) {
      return (obj instanceof uiSystem);
  };
  (function () {
      var tempCtor = function () {
          return null;
      };
      tempCtor.prototype = ecsSystem.prototype;
      uiSystem.superClass_ = ecsSystem.prototype;
      uiSystem.prototype = new tempCtor();
      __PS_MV_REG = [];
      return uiSystem.prototype.constructor = uiSystem;
  })();
  function initUiSystem() {
      __PS_MV_REG = [];
      return makeUiSystem();
  };
  /* --- extern symbols --- */
  return {
    'uiComponent': uiComponent,
    'makeUiComponent': makeUiComponent,
    'initUiSystem': initUiSystem,
    '_internal': {
      'uiComponentP': uiComponentP,
      'CURRENTTARGET': CURRENTTARGET,
      'uiSystem': uiSystem,
      'makeUiSystem': makeUiSystem,
      'uiSystemP': uiSystemP,
    }
  };
})();

var clWeb2dGame_graphics_drawModelSystem = (function() {
  /* --- import symbols --- */
  var lerpScalar = clWeb2dGame_utils_calc.lerpScalar;
  var calcDist = clWeb2dGame_utils_calc.calcDist;
  var calcOuterProductZ = clWeb2dGame_utils_calc.calcOuterProductZ;
  var calcDistToLine = clWeb2dGame_utils_calc.calcDistToLine;
  var calcLocalPoint = clWeb2dGame_utils_calc.calcLocalPoint;
  var truncateVector2d = clWeb2dGame_utils_calc.truncateVector2d;
  var movefVectorToCircle = clWeb2dGame_utils_calc.movefVectorToCircle;
  var multfVecScalar = clWeb2dGame_utils_calc.multfVecScalar;
  var decfRotateDiff = clWeb2dGame_utils_calc.decfRotateDiff;
  var divfVecScalar = clWeb2dGame_utils_calc.divfVecScalar;
  var vecScalar = clWeb2dGame_utils_calc.vecScalar;
  var vector2dAngle = clWeb2dGame_utils_calc.vector2dAngle;
  var slashVecScalar = clWeb2dGame_utils_calc.slashVecScalar;
  var rotatefPointBy = clWeb2dGame_utils_calc.rotatefPointBy;
  var subVector2d = clWeb2dGame_utils_calc.subVector2d;
  var lerpVector2d = clWeb2dGame_utils_calc.lerpVector2d;
  var calcParentGlobalPoint = clWeb2dGame_utils_calc.calcParentGlobalPoint;
  var addVector2d = clWeb2dGame_utils_calc.addVector2d;
  var setfVector2dAngle = clWeb2dGame_utils_calc.setfVector2dAngle;
  var diffAngle = clWeb2dGame_utils_calc.diffAngle;
  var adjustToTarget = clWeb2dGame_utils_calc.adjustToTarget;
  var rotateToTargetAngle = clWeb2dGame_utils_calc.rotateToTargetAngle;
  var incfRotateDiff = clWeb2dGame_utils_calc.incfRotateDiff;
  var incfVector2d = clWeb2dGame_utils_calc.incfVector2d;
  var calcGlobalPoint = clWeb2dGame_utils_calc.calcGlobalPoint;
  var setfVector2dAbs = clWeb2dGame_utils_calc.setfVector2dAbs;
  var vector2dAbs = clWeb2dGame_utils_calc.vector2dAbs;
  var decfVector2d = clWeb2dGame_utils_calc.decfVector2d;
  var transformfPointInverse = clWeb2dGame_utils_calc.transformfPointInverse;
  var transformfPoint = clWeb2dGame_utils_calc.transformfPoint;
  var truncatefVector2d = clWeb2dGame_utils_calc.truncatefVector2d;
  var calcDistP2 = clWeb2dGame_utils_calc.calcDistP2;
  var calcDistToLineSeg = clWeb2dGame_utils_calc.calcDistToLineSeg;
  var calcInnerProduct = clWeb2dGame_utils_calc.calcInnerProduct;
  var deleteDeleteComponentHook = clPsEcs_ecs.deleteDeleteComponentHook;
  var makeEcsEntity = clPsEcs_ecs.makeEcsEntity;
  var addEcsComponent = clPsEcs_ecs.addEcsComponent;
  var ecsEntity = clPsEcs_ecs.ecsEntity;
  var deleteEcsComponentType = clPsEcs_ecs.deleteEcsComponentType;
  var framePromise = clPsEcs_framePromise.framePromise;
  var deleteEntityTag = clPsEcs_ecs.deleteEntityTag;
  var deleteEcsEntity = clPsEcs_ecs.deleteEcsEntity;
  var cleanEcsEnv = clPsEcs_ecs.cleanEcsEnv;
  var addDeleteComponentHook = clPsEcs_ecs.addDeleteComponentHook;
  var ecsMain = clPsEcs_ecs.ecsMain;
  var includesAllComponentTypes = clPsEcs_utils.includesAllComponentTypes;
  var findAComponent = clPsEcs_ecs.findAComponent;
  var registerNframesAfterFunc = clPsEcs_basicProcess.registerNframesAfterFunc;
  var moveEcsEntity = clPsEcs_ecs.moveEcsEntity;
  var ecsComponent = clPsEcs_ecs.ecsComponent;
  var popDefaultEcsEntityParent = clPsEcs_ecs.popDefaultEcsEntityParent;
  var framePromiseP = clPsEcs_framePromise.framePromiseP;
  var getEcsComponent = clPsEcs_ecs.getEcsComponent;
  var ecsSystem = clPsEcs_ecs.ecsSystem;
  var addEntityTag = clPsEcs_ecs.addEntityTag;
  var ecsEntityP = clPsEcs_ecs.ecsEntityP;
  var registerEcsSystem = clPsEcs_ecs.registerEcsSystem;
  var registerFuncWithPred = clPsEcs_basicProcess.registerFuncWithPred;
  var addEcsEntityToBuffer = clPsEcs_ecs.addEcsEntityToBuffer;
  var checkEntityTags = clPsEcs_ecs.checkEntityTags;
  var initFramePromise = clPsEcs_framePromise.initFramePromise;
  var framePromiseThen = clPsEcs_framePromise.framePromiseThen;
  var addEcsEntity = clPsEcs_ecs.addEcsEntity;
  var registerNextFrameFunc = clPsEcs_basicProcess.registerNextFrameFunc;
  var findAEntityByTag = clPsEcs_ecs.findAEntityByTag;
  var stackDefaultEcsEntityParent = clPsEcs_ecs.stackDefaultEcsEntityParent;
  var addEcsComponentList = clPsEcs_ecs.addEcsComponentList;
  var framePromiseAll = clPsEcs_framePromise.framePromiseAll;
  var findTheEntity = clPsEcs_ecs.findTheEntity;
  var findAEntity = clPsEcs_ecs.findAEntity;
  var hasEntityTag = clPsEcs_ecs.hasEntityTag;
  var deleteEcsComponent = clPsEcs_ecs.deleteEcsComponent;
  var getDefaultEcsEntityParent = clPsEcs_ecs.getDefaultEcsEntityParent;
  var point2d = clWeb2dGame_core_basicComponents.point2d;
  var makePoint2d = clWeb2dGame_core_basicComponents.makePoint2d;
  /* --- define objects --- */
  function model2d() {
      this.parent = null;
      this.children = [];
      this.registerp = null;
      this.model = null;
      this.depth = 0;
      this.offset = makePoint2d();
      this.state = 'invalid';
      this.label = null;
      __PS_MV_REG = [];
      return this;
  };
  function makeModel2d() {
      var _js1968 = arguments.length;
      for (var n1967 = 0; n1967 < _js1968; n1967 += 2) {
          switch (arguments[n1967]) {
          case 'parent':
              parent = arguments[n1967 + 1];
              break;
          case 'children':
              children = arguments[n1967 + 1];
              break;
          case 'registerp':
              registerp = arguments[n1967 + 1];
              break;
          case 'model':
              model = arguments[n1967 + 1];
              break;
          case 'depth':
              depth = arguments[n1967 + 1];
              break;
          case 'offset':
              offset = arguments[n1967 + 1];
              break;
          case 'state':
              state = arguments[n1967 + 1];
              break;
          case 'label':
              label = arguments[n1967 + 1];
          };
      };
      var parent;
      var children = 'undefined' === typeof children ? [] : children;
      var registerp;
      var model;
      var depth = 'undefined' === typeof depth ? 0 : depth;
      var offset = 'undefined' === typeof offset ? makePoint2d() : offset;
      var state = 'undefined' === typeof state ? 'invalid' : state;
      var label;
      var result = new model2d();
      result.parent = parent;
      result.children = children;
      result.registerp = registerp;
      result.model = model;
      result.depth = depth;
      result.offset = offset;
      result.state = state;
      result.label = label;
      __PS_MV_REG = [];
      return result;
  };
  function model2dP(obj) {
      return (obj instanceof model2d);
  };
  (function () {
      var tempCtor = function () {
          return null;
      };
      tempCtor.prototype = ecsComponent.prototype;
      model2d.superClass_ = ecsComponent.prototype;
      model2d.prototype = new tempCtor();
      __PS_MV_REG = [];
      return model2d.prototype.constructor = model2d;
  })();
  function drawModelSystem() {
      this.enable = true;
      this.targetEntities = [];
      this.targetComponentTypes = [point2d, model2d];
      this.process = function (entity) {
          var point2d1969 = (found = getEcsComponent(point2d, entity), found ? found : (function () {
              throw 'POINT-2D is not included in the entity';
          })());
          for (var modelc = null, _js_arrvar1971 = entity.components, _js_idx1970 = 0; _js_idx1970 < _js_arrvar1971.length; _js_idx1970 += 1) {
              modelc = _js_arrvar1971[_js_idx1970];
              if ((modelc instanceof (typeof model2d === 'string' ? eval(model2d) : model2d))) {
                  var newPos = calcGlobalPoint(entity, modelc.offset);
                  modelc.model.position.set(newPos.x, newPos.y, modelc.depth);
                  modelc.model.rotation.z = newPos.angle;
              };
          };
      };
      this.processAll = function (system) {
          return system;
      };
      this.addEntityHook = function (entity) {
          return entity;
      };
      this.deleteEntityHook = function (entity) {
          return entity;
      };
      return this;
  };
  function makeDrawModelSystem() {
      var _js1973 = arguments.length;
      for (var n1972 = 0; n1972 < _js1973; n1972 += 2) {
          switch (arguments[n1972]) {
          case 'enable':
              enable = arguments[n1972 + 1];
              break;
          case 'target-entities':
              targetEntities = arguments[n1972 + 1];
              break;
          case 'target-component-types':
              targetComponentTypes = arguments[n1972 + 1];
              break;
          case 'process':
              process = arguments[n1972 + 1];
              break;
          case 'process-all':
              processAll = arguments[n1972 + 1];
              break;
          case 'add-entity-hook':
              addEntityHook = arguments[n1972 + 1];
              break;
          case 'delete-entity-hook':
              deleteEntityHook = arguments[n1972 + 1];
          };
      };
      var enable = 'undefined' === typeof enable ? true : enable;
      var targetEntities = 'undefined' === typeof targetEntities ? [] : targetEntities;
      var targetComponentTypes = 'undefined' === typeof targetComponentTypes ? [point2d, model2d] : targetComponentTypes;
      var process = 'undefined' === typeof process ? function (entity) {
          var point2d1974 = (found = getEcsComponent(point2d, entity), found ? found : (function () {
              throw 'POINT-2D is not included in the entity';
          })());
          for (var modelc = null, _js_arrvar1976 = entity.components, _js_idx1975 = 0; _js_idx1975 < _js_arrvar1976.length; _js_idx1975 += 1) {
              modelc = _js_arrvar1976[_js_idx1975];
              if ((modelc instanceof (typeof model2d === 'string' ? eval(model2d) : model2d))) {
                  var newPos = calcGlobalPoint(entity, modelc.offset);
                  modelc.model.position.set(newPos.x, newPos.y, modelc.depth);
                  modelc.model.rotation.z = newPos.angle;
              };
          };
      } : process;
      var processAll = 'undefined' === typeof processAll ? function (system) {
          return system;
      } : processAll;
      var addEntityHook = 'undefined' === typeof addEntityHook ? function (entity) {
          return entity;
      } : addEntityHook;
      var deleteEntityHook = 'undefined' === typeof deleteEntityHook ? function (entity) {
          return entity;
      } : deleteEntityHook;
      var result = new drawModelSystem();
      result.enable = enable;
      result.targetEntities = targetEntities;
      result.targetComponentTypes = targetComponentTypes;
      result.process = process;
      result.processAll = processAll;
      result.addEntityHook = addEntityHook;
      result.deleteEntityHook = deleteEntityHook;
      __PS_MV_REG = [];
      return result;
  };
  function drawModelSystemP(obj) {
      return (obj instanceof drawModelSystem);
  };
  (function () {
      var tempCtor = function () {
          return null;
      };
      tempCtor.prototype = ecsSystem.prototype;
      drawModelSystem.superClass_ = ecsSystem.prototype;
      drawModelSystem.prototype = new tempCtor();
      __PS_MV_REG = [];
      return drawModelSystem.prototype.constructor = drawModelSystem;
  })();
  if ('undefined' === typeof SCENEFORDRAWSYSTEM) {
      var SCENEFORDRAWSYSTEM = null;
  };
  function enableModel2dIfState(entity, targetState) {
      var _js1978 = arguments.length;
      for (var n1977 = 2; n1977 < _js1978; n1977 += 2) {
          switch (arguments[n1977]) {
          case 'target-model-2d':
              targetModel2d = arguments[n1977 + 1];
          };
      };
      var targetModel2d;
      if (!SCENEFORDRAWSYSTEM) {
          throw 'The scene for the draw system is not initialized';
      };
      var enable = function (target) {
          if (target.state === targetState) {
              SCENEFORDRAWSYSTEM.add(target.model);
              __PS_MV_REG = [];
              return target.state = 'enable';
          };
      };
      if (targetModel2d) {
          __PS_MV_REG = [];
          return enable(targetModel2d);
      } else {
          for (var modelc = null, _js_arrvar1982 = entity.components, _js_idx1981 = 0; _js_idx1981 < _js_arrvar1982.length; _js_idx1981 += 1) {
              modelc = _js_arrvar1982[_js_idx1981];
              if ((modelc instanceof (typeof model2d === 'string' ? eval(model2d) : model2d))) {
                  enable(modelc);
              };
          };
      };
  };
  function enableModel2d(entity) {
      var _js1984 = arguments.length;
      for (var n1983 = 1; n1983 < _js1984; n1983 += 2) {
          switch (arguments[n1983]) {
          case 'target-model-2d':
              targetModel2d = arguments[n1983 + 1];
          };
      };
      var targetModel2d;
      __PS_MV_REG = [];
      return enableModel2dIfState(entity, 'disable', 'target-model-2d', targetModel2d);
  };
  function enableInvalidatedModel2d(entity) {
      var _js1986 = arguments.length;
      for (var n1985 = 1; n1985 < _js1986; n1985 += 2) {
          switch (arguments[n1985]) {
          case 'target-model-2d':
              targetModel2d = arguments[n1985 + 1];
          };
      };
      var targetModel2d;
      __PS_MV_REG = [];
      return enableModel2dIfState(entity, 'invalid', 'target-model-2d', targetModel2d);
  };
  function disableModel2dIfRequired(targetModel2d) {
      if (targetModel2d.state === 'enable') {
          SCENEFORDRAWSYSTEM.remove(targetModel2d.model);
          __PS_MV_REG = [];
          return targetModel2d.state = 'disable';
      };
  };
  function invalidateModel2d(targetModel2d) {
      disableModel2dIfRequired(targetModel2d);
      __PS_MV_REG = [];
      return targetModel2d.state = 'invalid';
  };
  function invalidateAllModel2d(entity) {
      for (var model = null, _js_arrvar1988 = entity.components, _js_idx1987 = 0; _js_idx1987 < _js_arrvar1988.length; _js_idx1987 += 1) {
          model = _js_arrvar1988[_js_idx1987];
          if ((model instanceof (typeof model2d === 'string' ? eval(model2d) : model2d))) {
              invalidateModel2d(model);
          };
      };
  };
  function disableModel2d(entity) {
      var _js1990 = arguments.length;
      for (var n1989 = 1; n1989 < _js1990; n1989 += 2) {
          switch (arguments[n1989]) {
          case 'target-model-2d':
              targetModel2d = arguments[n1989 + 1];
          };
      };
      var targetModel2d;
      if (!SCENEFORDRAWSYSTEM) {
          throw 'The scene for the draw system is not initialized';
      };
      if (targetModel2d) {
          __PS_MV_REG = [];
          return disableModel2dIfRequired(targetModel2d);
      } else {
          for (var modelc = null, _js_arrvar1994 = entity.components, _js_idx1993 = 0; _js_idx1993 < _js_arrvar1994.length; _js_idx1993 += 1) {
              modelc = _js_arrvar1994[_js_idx1993];
              if ((modelc instanceof (typeof model2d === 'string' ? eval(model2d) : model2d))) {
                  disableModel2dIfRequired(modelc);
              };
          };
      };
  };
  /** Update old-model by new-model. */
  function updateModel2d(entity, oldModel, newModel) {
      deleteEcsComponent(oldModel, entity);
      __PS_MV_REG = [];
      return addEcsComponent(newModel, entity);
  };
  function findModel2dByLabel(entity, label) {
      for (var model = null, _js_arrvar1996 = entity.components, _js_idx1995 = 0; _js_idx1995 < _js_arrvar1996.length; _js_idx1995 += 1) {
          model = _js_arrvar1996[_js_idx1995];
          if ((model instanceof (typeof model2d === 'string' ? eval(model2d) : model2d))) {
              if (model.label === label) {
                  __PS_MV_REG = [];
                  return model;
              };
          };
      };
      throw 'Message: ' + 'Can\'t find the label: ~A' + '; Args: ' + label;
  };
  function initDrawModelSystem(scene) {
      SCENEFORDRAWSYSTEM = scene;
      addDeleteComponentHook(function (target) {
          __PS_MV_REG = [];
          return invalidateModel2d(target);
      });
      __PS_MV_REG = [];
      return makeDrawModelSystem('add-entity-hook', enableInvalidatedModel2d, 'delete-entity-hook', invalidateAllModel2d);
  };
  /* --- extern symbols --- */
  return {
    'model2d': model2d,
    'makeModel2d': makeModel2d,
    'model2dP': model2dP,
    'enableModel2d': enableModel2d,
    'disableModel2d': disableModel2d,
    'updateModel2d': updateModel2d,
    'findModel2dByLabel': findModel2dByLabel,
    'initDrawModelSystem': initDrawModelSystem,
    '_internal': {
      'drawModelSystem': drawModelSystem,
      'makeDrawModelSystem': makeDrawModelSystem,
      'drawModelSystemP': drawModelSystemP,
      'SCENEFORDRAWSYSTEM': SCENEFORDRAWSYSTEM,
      'enableModel2dIfState': enableModel2dIfState,
      'enableInvalidatedModel2d': enableInvalidatedModel2d,
      'disableModel2dIfRequired': disableModel2dIfRequired,
      'invalidateModel2d': invalidateModel2d,
      'invalidateAllModel2d': invalidateAllModel2d,
    }
  };
})();

var clWeb2dGame_graphics_textArea = (function() {
  /* --- import symbols --- */
  var initDrawModelSystem = clWeb2dGame_graphics_drawModelSystem.initDrawModelSystem;
  var model2dP = clWeb2dGame_graphics_drawModelSystem.model2dP;
  var makeModel2d = clWeb2dGame_graphics_drawModelSystem.makeModel2d;
  var updateModel2d = clWeb2dGame_graphics_drawModelSystem.updateModel2d;
  var findModel2dByLabel = clWeb2dGame_graphics_drawModelSystem.findModel2dByLabel;
  var disableModel2d = clWeb2dGame_graphics_drawModelSystem.disableModel2d;
  var enableModel2d = clWeb2dGame_graphics_drawModelSystem.enableModel2d;
  var model2d = clWeb2dGame_graphics_drawModelSystem.model2d;
  var makeWiredCircle = clWeb2dGame_graphics_2dGeometry.makeWiredCircle;
  var changeGeometryUvs = clWeb2dGame_graphics_2dGeometry.changeGeometryUvs;
  var makeTextModelPromise = clWeb2dGame_graphics_2dGeometry.makeTextModelPromise;
  var makeTextureModel = clWeb2dGame_graphics_2dGeometry.makeTextureModel;
  var makeSolidCircle = clWeb2dGame_graphics_2dGeometry.makeSolidCircle;
  var makeWiredRect = clWeb2dGame_graphics_2dGeometry.makeWiredRect;
  var makeWiredPolygon = clWeb2dGame_graphics_2dGeometry.makeWiredPolygon;
  var makeSolidPolygon = clWeb2dGame_graphics_2dGeometry.makeSolidPolygon;
  var makeLines = clWeb2dGame_graphics_2dGeometry.makeLines;
  var makeTextureModelPromise = clWeb2dGame_graphics_2dGeometry.makeTextureModelPromise;
  var changeModelColor = clWeb2dGame_graphics_2dGeometry.changeModelColor;
  var makeLine = clWeb2dGame_graphics_2dGeometry.makeLine;
  var getMeshSize = clWeb2dGame_graphics_2dGeometry.getMeshSize;
  var makeSolidRect = clWeb2dGame_graphics_2dGeometry.makeSolidRect;
  var makeWiredRegularPolygon = clWeb2dGame_graphics_2dGeometry.makeWiredRegularPolygon;
  var getMeshHeight = clWeb2dGame_graphics_2dGeometry.getMeshHeight;
  var getMeshWidth = clWeb2dGame_graphics_2dGeometry.getMeshWidth;
  var makeSolidRegularPolygon = clWeb2dGame_graphics_2dGeometry.makeSolidRegularPolygon;
  var loadFont = clWeb2dGame_graphics_font.loadFont;
  var getFontPromise = clWeb2dGame_graphics_font.getFontPromise;
  var rotate2d = clWeb2dGame_core_basicComponents.rotate2d;
  var rect2dP = clWeb2dGame_core_basicComponents.rect2dP;
  var speed2dP = clWeb2dGame_core_basicComponents.speed2dP;
  var point2d = clWeb2dGame_core_basicComponents.point2d;
  var makePoint2d = clWeb2dGame_core_basicComponents.makePoint2d;
  var makeVector2d = clWeb2dGame_core_basicComponents.makeVector2d;
  var setEntityParam = clWeb2dGame_core_basicComponents.setEntityParam;
  var copyPoint2dTo = clWeb2dGame_core_basicComponents.copyPoint2dTo;
  var getEntityParam = clWeb2dGame_core_basicComponents.getEntityParam;
  var initEntityParams = clWeb2dGame_core_basicComponents.initEntityParams;
  var copyVector2dTo = clWeb2dGame_core_basicComponents.copyVector2dTo;
  var speed2d = clWeb2dGame_core_basicComponents.speed2d;
  var rect2d = clWeb2dGame_core_basicComponents.rect2d;
  var cloneVector2d = clWeb2dGame_core_basicComponents.cloneVector2d;
  var params = clWeb2dGame_core_basicComponents.params;
  var makeRect2d = clWeb2dGame_core_basicComponents.makeRect2d;
  var makeScript2d = clWeb2dGame_core_basicComponents.makeScript2d;
  var makeSpeed2d = clWeb2dGame_core_basicComponents.makeSpeed2d;
  var clonePoint2d = clWeb2dGame_core_basicComponents.clonePoint2d;
  var point2dP = clWeb2dGame_core_basicComponents.point2dP;
  var vector2d = clWeb2dGame_core_basicComponents.vector2d;
  var vector2dP = clWeb2dGame_core_basicComponents.vector2dP;
  var rotate2dP = clWeb2dGame_core_basicComponents.rotate2dP;
  var script2d = clWeb2dGame_core_basicComponents.script2d;
  var makeRotate2d = clWeb2dGame_core_basicComponents.makeRotate2d;
  var deleteDeleteComponentHook = clPsEcs_ecs.deleteDeleteComponentHook;
  var makeEcsEntity = clPsEcs_ecs.makeEcsEntity;
  var addEcsComponent = clPsEcs_ecs.addEcsComponent;
  var ecsEntity = clPsEcs_ecs.ecsEntity;
  var deleteEcsComponentType = clPsEcs_ecs.deleteEcsComponentType;
  var framePromise = clPsEcs_framePromise.framePromise;
  var deleteEntityTag = clPsEcs_ecs.deleteEntityTag;
  var deleteEcsEntity = clPsEcs_ecs.deleteEcsEntity;
  var cleanEcsEnv = clPsEcs_ecs.cleanEcsEnv;
  var addDeleteComponentHook = clPsEcs_ecs.addDeleteComponentHook;
  var ecsMain = clPsEcs_ecs.ecsMain;
  var includesAllComponentTypes = clPsEcs_utils.includesAllComponentTypes;
  var findAComponent = clPsEcs_ecs.findAComponent;
  var registerNframesAfterFunc = clPsEcs_basicProcess.registerNframesAfterFunc;
  var moveEcsEntity = clPsEcs_ecs.moveEcsEntity;
  var ecsComponent = clPsEcs_ecs.ecsComponent;
  var popDefaultEcsEntityParent = clPsEcs_ecs.popDefaultEcsEntityParent;
  var framePromiseP = clPsEcs_framePromise.framePromiseP;
  var getEcsComponent = clPsEcs_ecs.getEcsComponent;
  var ecsSystem = clPsEcs_ecs.ecsSystem;
  var addEntityTag = clPsEcs_ecs.addEntityTag;
  var ecsEntityP = clPsEcs_ecs.ecsEntityP;
  var registerEcsSystem = clPsEcs_ecs.registerEcsSystem;
  var registerFuncWithPred = clPsEcs_basicProcess.registerFuncWithPred;
  var addEcsEntityToBuffer = clPsEcs_ecs.addEcsEntityToBuffer;
  var checkEntityTags = clPsEcs_ecs.checkEntityTags;
  var initFramePromise = clPsEcs_framePromise.initFramePromise;
  var framePromiseThen = clPsEcs_framePromise.framePromiseThen;
  var addEcsEntity = clPsEcs_ecs.addEcsEntity;
  var registerNextFrameFunc = clPsEcs_basicProcess.registerNextFrameFunc;
  var findAEntityByTag = clPsEcs_ecs.findAEntityByTag;
  var stackDefaultEcsEntityParent = clPsEcs_ecs.stackDefaultEcsEntityParent;
  var addEcsComponentList = clPsEcs_ecs.addEcsComponentList;
  var framePromiseAll = clPsEcs_framePromise.framePromiseAll;
  var findTheEntity = clPsEcs_ecs.findTheEntity;
  var findAEntity = clPsEcs_ecs.findAEntity;
  var hasEntityTag = clPsEcs_ecs.hasEntityTag;
  var deleteEcsComponent = clPsEcs_ecs.deleteEcsComponent;
  var getDefaultEcsEntityParent = clPsEcs_ecs.getDefaultEcsEntityParent;
  /* --- define objects --- */
  function textAreaComponent() {
      this.parent = null;
      this.children = [];
      this.registerp = null;
      this.fontSize = null;
      this.textAlign = null;
      this.margin = null;
      this.textModelList = [];
      this.depth = null;
      return this;
  };
  function makeTextAreaComponent() {
      var _js1998 = arguments.length;
      for (var n1997 = 0; n1997 < _js1998; n1997 += 2) {
          switch (arguments[n1997]) {
          case 'parent':
              parent = arguments[n1997 + 1];
              break;
          case 'children':
              children = arguments[n1997 + 1];
              break;
          case 'registerp':
              registerp = arguments[n1997 + 1];
              break;
          case 'font-size':
              fontSize = arguments[n1997 + 1];
              break;
          case 'text-align':
              textAlign = arguments[n1997 + 1];
              break;
          case 'margin':
              margin = arguments[n1997 + 1];
              break;
          case 'text-model-list':
              textModelList = arguments[n1997 + 1];
              break;
          case 'depth':
              depth = arguments[n1997 + 1];
          };
      };
      var parent;
      var children = 'undefined' === typeof children ? [] : children;
      var registerp;
      var fontSize;
      var textAlign;
      var margin;
      var textModelList = 'undefined' === typeof textModelList ? [] : textModelList;
      var depth;
      var result = new textAreaComponent();
      result.parent = parent;
      result.children = children;
      result.registerp = registerp;
      result.fontSize = fontSize;
      result.textAlign = textAlign;
      result.margin = margin;
      result.textModelList = textModelList;
      result.depth = depth;
      __PS_MV_REG = [];
      return result;
  };
  function textAreaComponentP(obj) {
      return (obj instanceof textAreaComponent);
  };
  (function () {
      var tempCtor = function () {
          return null;
      };
      tempCtor.prototype = ecsComponent.prototype;
      textAreaComponent.superClass_ = ecsComponent.prototype;
      textAreaComponent.prototype = new tempCtor();
      __PS_MV_REG = [];
      return textAreaComponent.prototype.constructor = textAreaComponent;
  })();
  /**
   * Make an empty text area as an ECS entity.
   * Note: "y" is top of the text. "x" depends on "text-align"
   */
  function makeTextArea() {
      var _js2000 = arguments.length;
      for (var n1999 = 0; n1999 < _js2000; n1999 += 2) {
          switch (arguments[n1999]) {
          case 'font-size':
              fontSize = arguments[n1999 + 1];
              break;
          case 'text-align':
              textAlign = arguments[n1999 + 1];
              break;
          case 'margin':
              margin = arguments[n1999 + 1];
              break;
          case 'x':
              x = arguments[n1999 + 1];
              break;
          case 'y':
              y = arguments[n1999 + 1];
              break;
          case 'angle':
              angle = arguments[n1999 + 1];
              break;
          case 'depth':
              depth = arguments[n1999 + 1];
          };
      };
      var fontSize;
      var textAlign = 'undefined' === typeof textAlign ? 'left' : textAlign;
      var margin = 'undefined' === typeof margin ? 0 : margin;
      var x;
      var y;
      var angle = 'undefined' === typeof angle ? 0 : angle;
      var depth = 'undefined' === typeof depth ? 0 : depth;
      var textAlignList = ['left', 'right', 'center'];
      if (!(function () {
          for (var x2002 = null, _js_idx2003 = 0; _js_idx2003 < textAlignList.length; _js_idx2003 += 1) {
              x2002 = textAlignList[_js_idx2003];
              if ((function (target2001) {
                  return textAlign === target2001;
              })(x2002)) {
                  return x2002;
              };
          };
      })()) {
          throw 'Message: ' + 'The allowed kinds of text-align: ~A' + '; Args: ' + textAlignList;
      };
      var area = makeEcsEntity();
      addEcsComponentList(area, makePoint2d('x', x, 'y', y, 'angle', angle), makeTextAreaComponent('font-size', fontSize, 'text-align', textAlign, 'margin', margin, 'depth', depth));
      __PS_MV_REG = [];
      return area;
  };
  /** Get area size as such plist as (:width xxx :height yyy). */
  function getTextAreaSize(areaEntity) {
      var area = (found = getEcsComponent(textAreaComponent, areaEntity), found ? found : (function () {
          throw 'TEXT-AREA-COMPONENT is not included in the entity';
      })());
      var maxWidth = 0;
      for (var model = null, _js_idx2004 = 0; _js_idx2004 < area.textModelList.length; _js_idx2004 += 1) {
          model = area.textModelList[_js_idx2004];
          var width = getMeshWidth(model.model);
          if (width > maxWidth) {
              maxWidth = width;
          };
      };
      __PS_MV_REG = [];
      return ['width', maxWidth + 2 * area.margin, 'height', area.margin + (area.fontSize + area.margin) * area.textModelList.length];
  };
  function calcAlignedOffsetX(textMesh, align, margin) {
      switch (align) {
      case 'left':
          return -1 * margin;
      case 'right':
          __PS_MV_REG = [];
          return -1 * (getMeshWidth(textMesh) + margin);
      case 'center':
          __PS_MV_REG = [];
          return -1 * (getMeshWidth(textMesh) / 2);
      default:
          throw 'Message: ' + 'The value ~A is not of the expected type (MEMBER ~A)' + '; Args: ' + align + ', ' + ['left', 'right', 'center'];
      };
  };
  /** Add a new text to the area. The text is attached to bottom of the previous one. */
  function addTextToArea(areaEntity) {
      var _js2006 = arguments.length;
      for (var n2005 = 1; n2005 < _js2006; n2005 += 2) {
          switch (arguments[n2005]) {
          case 'text':
              text = arguments[n2005 + 1];
              break;
          case 'color':
              color = arguments[n2005 + 1];
          };
      };
      var text;
      var color;
      var area = (found = getEcsComponent(textAreaComponent, areaEntity), found ? found : (function () {
          throw 'TEXT-AREA-COMPONENT is not included in the entity';
      })());
      __PS_MV_REG = [];
      return framePromiseThen(makeTextModelPromise(text, 'size', area.fontSize, 'color', color), function (mesh) {
          var model = makeModel2d('model', mesh, 'depth', area.depth, 'offset', makePoint2d('x', calcAlignedOffsetX(mesh, area.textAlign, area.margin), 'y', (area.margin + (area.fontSize + area.margin) * (area.textModelList.length + 1)) * -1));
          addEcsComponentList(areaEntity, model);
          area.textModelList.unshift(model);
          area.textModelList;
          __PS_MV_REG = [];
          return areaEntity;
      });
  };
  function clearTextArea(areaEntity) {
      var area = (found = getEcsComponent(textAreaComponent, areaEntity), found ? found : (function () {
          throw 'TEXT-AREA-COMPONENT is not included in the entity';
      })());
      for (var model = null, _js_idx2007 = 0; _js_idx2007 < area.textModelList.length; _js_idx2007 += 1) {
          model = area.textModelList[_js_idx2007];
          registerNextFrameFunc(function () {
              __PS_MV_REG = [];
              return deleteEcsComponent(model, areaEntity);
          });
      };
      __PS_MV_REG = [];
      return area.textModelList = [];
  };
  /* --- extern symbols --- */
  return {
    'textAreaComponent': textAreaComponent,
    'makeTextAreaComponent': makeTextAreaComponent,
    'makeTextArea': makeTextArea,
    'getTextAreaSize': getTextAreaSize,
    'addTextToArea': addTextToArea,
    'clearTextArea': clearTextArea,
    '_internal': {
      'textAreaComponentP': textAreaComponentP,
      'calcAlignedOffsetX': calcAlignedOffsetX,
    }
  };
})();

var clWeb2dGame_physics_collisionSystem = (function() {
  /* --- import symbols --- */
  var dumpPerformanceCounter = clWeb2dGame_utils_debug_performance.dumpPerformanceCounter;
  var lerpScalar = clWeb2dGame_utils_calc.lerpScalar;
  var calcDist = clWeb2dGame_utils_calc.calcDist;
  var calcOuterProductZ = clWeb2dGame_utils_calc.calcOuterProductZ;
  var calcDistToLine = clWeb2dGame_utils_calc.calcDistToLine;
  var calcLocalPoint = clWeb2dGame_utils_calc.calcLocalPoint;
  var truncateVector2d = clWeb2dGame_utils_calc.truncateVector2d;
  var movefVectorToCircle = clWeb2dGame_utils_calc.movefVectorToCircle;
  var multfVecScalar = clWeb2dGame_utils_calc.multfVecScalar;
  var decfRotateDiff = clWeb2dGame_utils_calc.decfRotateDiff;
  var divfVecScalar = clWeb2dGame_utils_calc.divfVecScalar;
  var vecScalar = clWeb2dGame_utils_calc.vecScalar;
  var vector2dAngle = clWeb2dGame_utils_calc.vector2dAngle;
  var slashVecScalar = clWeb2dGame_utils_calc.slashVecScalar;
  var rotatefPointBy = clWeb2dGame_utils_calc.rotatefPointBy;
  var subVector2d = clWeb2dGame_utils_calc.subVector2d;
  var lerpVector2d = clWeb2dGame_utils_calc.lerpVector2d;
  var calcParentGlobalPoint = clWeb2dGame_utils_calc.calcParentGlobalPoint;
  var addVector2d = clWeb2dGame_utils_calc.addVector2d;
  var setfVector2dAngle = clWeb2dGame_utils_calc.setfVector2dAngle;
  var diffAngle = clWeb2dGame_utils_calc.diffAngle;
  var adjustToTarget = clWeb2dGame_utils_calc.adjustToTarget;
  var rotateToTargetAngle = clWeb2dGame_utils_calc.rotateToTargetAngle;
  var incfRotateDiff = clWeb2dGame_utils_calc.incfRotateDiff;
  var incfVector2d = clWeb2dGame_utils_calc.incfVector2d;
  var calcGlobalPoint = clWeb2dGame_utils_calc.calcGlobalPoint;
  var setfVector2dAbs = clWeb2dGame_utils_calc.setfVector2dAbs;
  var vector2dAbs = clWeb2dGame_utils_calc.vector2dAbs;
  var decfVector2d = clWeb2dGame_utils_calc.decfVector2d;
  var transformfPointInverse = clWeb2dGame_utils_calc.transformfPointInverse;
  var transformfPoint = clWeb2dGame_utils_calc.transformfPoint;
  var truncatefVector2d = clWeb2dGame_utils_calc.truncatefVector2d;
  var calcDistP2 = clWeb2dGame_utils_calc.calcDistP2;
  var calcDistToLineSeg = clWeb2dGame_utils_calc.calcDistToLineSeg;
  var calcInnerProduct = clWeb2dGame_utils_calc.calcInnerProduct;
  var initDrawModelSystem = clWeb2dGame_graphics_drawModelSystem.initDrawModelSystem;
  var model2dP = clWeb2dGame_graphics_drawModelSystem.model2dP;
  var makeModel2d = clWeb2dGame_graphics_drawModelSystem.makeModel2d;
  var updateModel2d = clWeb2dGame_graphics_drawModelSystem.updateModel2d;
  var findModel2dByLabel = clWeb2dGame_graphics_drawModelSystem.findModel2dByLabel;
  var disableModel2d = clWeb2dGame_graphics_drawModelSystem.disableModel2d;
  var enableModel2d = clWeb2dGame_graphics_drawModelSystem.enableModel2d;
  var model2d = clWeb2dGame_graphics_drawModelSystem.model2d;
  var makeWiredCircle = clWeb2dGame_graphics_2dGeometry.makeWiredCircle;
  var changeGeometryUvs = clWeb2dGame_graphics_2dGeometry.changeGeometryUvs;
  var makeTextModelPromise = clWeb2dGame_graphics_2dGeometry.makeTextModelPromise;
  var makeTextureModel = clWeb2dGame_graphics_2dGeometry.makeTextureModel;
  var makeSolidCircle = clWeb2dGame_graphics_2dGeometry.makeSolidCircle;
  var makeWiredRect = clWeb2dGame_graphics_2dGeometry.makeWiredRect;
  var makeWiredPolygon = clWeb2dGame_graphics_2dGeometry.makeWiredPolygon;
  var makeSolidPolygon = clWeb2dGame_graphics_2dGeometry.makeSolidPolygon;
  var makeLines = clWeb2dGame_graphics_2dGeometry.makeLines;
  var makeTextureModelPromise = clWeb2dGame_graphics_2dGeometry.makeTextureModelPromise;
  var changeModelColor = clWeb2dGame_graphics_2dGeometry.changeModelColor;
  var makeLine = clWeb2dGame_graphics_2dGeometry.makeLine;
  var getMeshSize = clWeb2dGame_graphics_2dGeometry.getMeshSize;
  var makeSolidRect = clWeb2dGame_graphics_2dGeometry.makeSolidRect;
  var makeWiredRegularPolygon = clWeb2dGame_graphics_2dGeometry.makeWiredRegularPolygon;
  var getMeshHeight = clWeb2dGame_graphics_2dGeometry.getMeshHeight;
  var getMeshWidth = clWeb2dGame_graphics_2dGeometry.getMeshWidth;
  var makeSolidRegularPolygon = clWeb2dGame_graphics_2dGeometry.makeSolidRegularPolygon;
  var rotate2d = clWeb2dGame_core_basicComponents.rotate2d;
  var rect2dP = clWeb2dGame_core_basicComponents.rect2dP;
  var speed2dP = clWeb2dGame_core_basicComponents.speed2dP;
  var point2d = clWeb2dGame_core_basicComponents.point2d;
  var makePoint2d = clWeb2dGame_core_basicComponents.makePoint2d;
  var makeVector2d = clWeb2dGame_core_basicComponents.makeVector2d;
  var setEntityParam = clWeb2dGame_core_basicComponents.setEntityParam;
  var copyPoint2dTo = clWeb2dGame_core_basicComponents.copyPoint2dTo;
  var getEntityParam = clWeb2dGame_core_basicComponents.getEntityParam;
  var initEntityParams = clWeb2dGame_core_basicComponents.initEntityParams;
  var copyVector2dTo = clWeb2dGame_core_basicComponents.copyVector2dTo;
  var speed2d = clWeb2dGame_core_basicComponents.speed2d;
  var rect2d = clWeb2dGame_core_basicComponents.rect2d;
  var cloneVector2d = clWeb2dGame_core_basicComponents.cloneVector2d;
  var params = clWeb2dGame_core_basicComponents.params;
  var makeRect2d = clWeb2dGame_core_basicComponents.makeRect2d;
  var makeScript2d = clWeb2dGame_core_basicComponents.makeScript2d;
  var makeSpeed2d = clWeb2dGame_core_basicComponents.makeSpeed2d;
  var clonePoint2d = clWeb2dGame_core_basicComponents.clonePoint2d;
  var point2dP = clWeb2dGame_core_basicComponents.point2dP;
  var vector2d = clWeb2dGame_core_basicComponents.vector2d;
  var vector2dP = clWeb2dGame_core_basicComponents.vector2dP;
  var rotate2dP = clWeb2dGame_core_basicComponents.rotate2dP;
  var script2d = clWeb2dGame_core_basicComponents.script2d;
  var makeRotate2d = clWeb2dGame_core_basicComponents.makeRotate2d;
  var physicPolygon = clWeb2dGame_physics_collision.physicPolygon;
  var makePhysicCircle = clWeb2dGame_physics_collision.makePhysicCircle;
  var updateBoundingBox = clWeb2dGame_physics_collision.updateBoundingBox;
  var physicCircle = clWeb2dGame_physics_collision.physicCircle;
  var colTwoBoundingBoxP = clWeb2dGame_physics_collision.colTwoBoundingBoxP;
  var collidePhysicsP = clWeb2dGame_physics_collision.collidePhysicsP;
  var makePhysicRect = clWeb2dGame_physics_collision.makePhysicRect;
  var physic2d = clWeb2dGame_physics_collision.physic2d;
  var boundingBox2d = clWeb2dGame_physics_collision.boundingBox2d;
  var makePhysicPolygon = clWeb2dGame_physics_collision.makePhysicPolygon;
  var makeBoundingBox2d = clWeb2dGame_physics_collision.makeBoundingBox2d;
  var makePhysic2d = clWeb2dGame_physics_collision.makePhysic2d;
  var judgeCollisionTargetTags = clWeb2dGame_physics_collision.judgeCollisionTargetTags;
  var collideEntitiesP = clWeb2dGame_physics_collision.collideEntitiesP;
  var deleteDeleteComponentHook = clPsEcs_ecs.deleteDeleteComponentHook;
  var makeEcsEntity = clPsEcs_ecs.makeEcsEntity;
  var addEcsComponent = clPsEcs_ecs.addEcsComponent;
  var ecsEntity = clPsEcs_ecs.ecsEntity;
  var deleteEcsComponentType = clPsEcs_ecs.deleteEcsComponentType;
  var framePromise = clPsEcs_framePromise.framePromise;
  var deleteEntityTag = clPsEcs_ecs.deleteEntityTag;
  var deleteEcsEntity = clPsEcs_ecs.deleteEcsEntity;
  var cleanEcsEnv = clPsEcs_ecs.cleanEcsEnv;
  var addDeleteComponentHook = clPsEcs_ecs.addDeleteComponentHook;
  var ecsMain = clPsEcs_ecs.ecsMain;
  var includesAllComponentTypes = clPsEcs_utils.includesAllComponentTypes;
  var findAComponent = clPsEcs_ecs.findAComponent;
  var registerNframesAfterFunc = clPsEcs_basicProcess.registerNframesAfterFunc;
  var moveEcsEntity = clPsEcs_ecs.moveEcsEntity;
  var ecsComponent = clPsEcs_ecs.ecsComponent;
  var popDefaultEcsEntityParent = clPsEcs_ecs.popDefaultEcsEntityParent;
  var framePromiseP = clPsEcs_framePromise.framePromiseP;
  var getEcsComponent = clPsEcs_ecs.getEcsComponent;
  var ecsSystem = clPsEcs_ecs.ecsSystem;
  var addEntityTag = clPsEcs_ecs.addEntityTag;
  var ecsEntityP = clPsEcs_ecs.ecsEntityP;
  var registerEcsSystem = clPsEcs_ecs.registerEcsSystem;
  var registerFuncWithPred = clPsEcs_basicProcess.registerFuncWithPred;
  var addEcsEntityToBuffer = clPsEcs_ecs.addEcsEntityToBuffer;
  var checkEntityTags = clPsEcs_ecs.checkEntityTags;
  var initFramePromise = clPsEcs_framePromise.initFramePromise;
  var framePromiseThen = clPsEcs_framePromise.framePromiseThen;
  var addEcsEntity = clPsEcs_ecs.addEcsEntity;
  var registerNextFrameFunc = clPsEcs_basicProcess.registerNextFrameFunc;
  var findAEntityByTag = clPsEcs_ecs.findAEntityByTag;
  var stackDefaultEcsEntityParent = clPsEcs_ecs.stackDefaultEcsEntityParent;
  var addEcsComponentList = clPsEcs_ecs.addEcsComponentList;
  var framePromiseAll = clPsEcs_framePromise.framePromiseAll;
  var findTheEntity = clPsEcs_ecs.findTheEntity;
  var findAEntity = clPsEcs_ecs.findAEntity;
  var hasEntityTag = clPsEcs_ecs.hasEntityTag;
  var deleteEcsComponent = clPsEcs_ecs.deleteEcsComponent;
  var getDefaultEcsEntityParent = clPsEcs_ecs.getDefaultEcsEntityParent;
  /* --- define objects --- */
  if ('undefined' === typeof COLLIDERMODELCOLOR) {
      var COLLIDERMODELCOLOR = 65280;
  };
  if ('undefined' === typeof COLLIDERMODELDEPTH) {
      var COLLIDERMODELDEPTH = 10;
  };
  if ('undefined' === typeof COLLIDERMODELENABLE) {
      var COLLIDERMODELENABLE = true;
  };
  function generateColliderModel(physic2d) {
      var makeAModel = function (fnMakeGeometry) {
          __PS_MV_REG = [];
          return makeModel2d('model', fnMakeGeometry(COLLIDERMODELCOLOR), 'depth', COLLIDERMODELDEPTH, 'offset', clonePoint2d(physic2d.offset));
      };
      var gKeyform2008 = physic2d;
      if ((gKeyform2008 instanceof (typeof physicCircle === 'string' ? eval(physicCircle) : physicCircle))) {
          __PS_MV_REG = [];
          return makeAModel(function (color) {
              __PS_MV_REG = [];
              return makeWiredCircle('color', color, 'r', physic2d.r);
          });
      } else if ((gKeyform2008 instanceof (typeof physicPolygon === 'string' ? eval(physicPolygon) : physicPolygon))) {
          __PS_MV_REG = [];
          return makeAModel(function (color) {
              __PS_MV_REG = [];
              return makeWiredPolygon('color', color, 'pnt-list', physic2d.pntList.map(function (pnt) {
                  return [pnt.x, pnt.y];
              }));
          });
      } else {
          throw '\'TYPE-ERROR: (The place is \'PHYSIC-2D\'. The expected type is \'(OR PHYSIC-CIRCLE\n                                                 PHYSIC-POLYGON)\')';
      };
  };
  function addColliderModel(entity) {
      __PS_MV_REG = [];
      return registerNextFrameFunc(function () {
          var physic2d2009 = (found = getEcsComponent(physic2d, entity), found ? found : (function () {
              throw 'PHYSIC-2D is not included in the entity';
          })());
          __PS_MV_REG = [];
          return !findColliderModel(physic2d2009) ? addEcsComponent(generateColliderModel(physic2d2009), entity, physic2d2009) : null;
      });
  };
  /** Find collider model that should be added as a child of physic */
  function findColliderModel(physic) {
      __PS_MV_REG = [];
      return findAComponent(function (target) {
          __PS_MV_REG = [];
          return (target instanceof (typeof model2d === 'string' ? eval(model2d) : model2d));
      }, physic);
  };
  function setfColliderModelEnable(value) {
      if (value !== COLLIDERMODELENABLE) {
          COLLIDERMODELENABLE = value;
          for (var entity = null, _js_arrvar2011 = clPsEcs_ecs._internal.getEntityList(), _js_idx2010 = 0; _js_idx2010 < _js_arrvar2011.length; _js_idx2010 += 1) {
              entity = _js_arrvar2011[_js_idx2010];
              for (var physic = null, _js_arrvar2013 = entity.components, _js_idx2012 = 0; _js_idx2012 < _js_arrvar2013.length; _js_idx2012 += 1) {
                  physic = _js_arrvar2013[_js_idx2012];
                  if ((physic instanceof (typeof physic2d === 'string' ? eval(physic2d) : physic2d))) {
                      var model = findColliderModel(physic);
                      if (model) {
                          if (value) {
                              enableModel2d(entity, 'target-model-2d', model);
                          } else {
                              disableModel2d(entity, 'target-model-2d', model);
                          };
                      } else {
                          if (value) {
                              addColliderModel(entity);
                          };
                      };
                  };
              };
          };
          __PS_MV_REG = [];
          return true;
      };
  };
  function setfColliderModelDepth(value) {
      return COLLIDERMODELDEPTH = value;
  };
  function setfColliderModelColor(value) {
      return COLLIDERMODELCOLOR = value;
  };
  function collisionEntityInfo() {
      this.entity = null;
      this.globalPoint = null;
      this.physic = null;
      this.targetEntityList = null;
      return this;
  };
  function makeCollisionEntityInfo() {
      var _js2013 = arguments.length;
      for (var n2012 = 0; n2012 < _js2013; n2012 += 2) {
          switch (arguments[n2012]) {
          case 'entity':
              entity = arguments[n2012 + 1];
              break;
          case 'global-point':
              globalPoint = arguments[n2012 + 1];
              break;
          case 'physic':
              physic = arguments[n2012 + 1];
              break;
          case 'target-entity-list':
              targetEntityList = arguments[n2012 + 1];
          };
      };
      var entity;
      var globalPoint;
      var physic;
      var targetEntityList;
      var result = new collisionEntityInfo();
      result.entity = entity;
      result.globalPoint = globalPoint;
      result.physic = physic;
      result.targetEntityList = targetEntityList;
      __PS_MV_REG = [];
      return result;
  };
  function collisionEntityInfoP(obj) {
      return (obj instanceof collisionEntityInfo);
  };
  function processCollision(entity1, ph1, pnt1, entity2, ph2, pnt2) {
      if (entity1 === entity2) {
          return;
      };
      if (!judgeCollisionTargetTags(entity1, ph1, entity2, ph2)) {
          __PS_MV_REG = [];
          return;
      };
      __PS_MV_REG = [];
      return collidePhysicsP(ph1, pnt1, ph2, pnt2) ? (ph1.onCollision(entity1, entity2), ph2.onCollision(entity2, entity1)) : null;
  };
  function collisionTargetCache() {
      this.cache = [];
      return this;
  };
  function makeCollisionTargetCache() {
      var _js2015 = arguments.length;
      for (var n2014 = 0; n2014 < _js2015; n2014 += 2) {
          switch (arguments[n2014]) {
          case 'cache':
              cache = arguments[n2014 + 1];
          };
      };
      var cache = 'undefined' === typeof cache ? [] : cache;
      var result = new collisionTargetCache();
      result.cache = cache;
      __PS_MV_REG = [];
      return result;
  };
  function collisionTargetCacheP(obj) {
      return (obj instanceof collisionTargetCache);
  };
  function sameTagListP(tagList1, tagList2) {
      var len1 = tagList1.length;
      if (len1 !== tagList2.length) {
          return null;
      };
      for (var i = 0; i < len1; i += 1) {
          if (tagList1[i] !== tagList2[i]) {
              return null;
          };
      };
      return true;
  };
  function addPairToCache(tagList, targetEntityList, cache) {
      cache.cache.unshift([tagList, targetEntityList]);
      __PS_MV_REG = [];
      return cache.cache;
  };
  function findTargetPair(tagList, cache) {
      for (var x2016 = null, _js_arrvar2018 = cache.cache, _js_idx2017 = 0; _js_idx2017 < _js_arrvar2018.length; _js_idx2017 += 1) {
          x2016 = _js_arrvar2018[_js_idx2017];
          if ((function (pair) {
              __PS_MV_REG = [];
              return sameTagListP(tagList, pair[0]);
          })(x2016)) {
              return x2016;
          };
      };
  };
  function getTargetEntityInfoList(entityInfo, allEntityInfo, cache) {
      var tagList = entityInfo.physic.targetTags;
      var pair = findTargetPair(tagList, cache);
      if (pair) {
          __PS_MV_REG = [];
          return pair[1];
      };
      var result = [];
      for (var info = null, _js_idx2019 = 0; _js_idx2019 < allEntityInfo.length; _js_idx2019 += 1) {
          info = allEntityInfo[_js_idx2019];
          if (judgeCollisionTargetTags(entityInfo.entity, entityInfo.physic, info.entity, info.physic)) {
              result.unshift(info);
              result;
          };
      };
      addPairToCache(tagList, result, cache);
      __PS_MV_REG = [];
      return result;
  };
  function initTargetListOfInfoList(infoList) {
      var cache = makeCollisionTargetCache();
      var rec = function (info, rest) {
          if (rest.length > 0) {
              info.targetEntityList = getTargetEntityInfoList(info, rest, cache);
              __PS_MV_REG = [];
              return rec(rest[0], rest.slice(1));
          };
      };
      __PS_MV_REG = [];
      return rec(infoList[0], infoList.slice(1));
  };
  function collisionSystem() {
      this.enable = true;
      this.targetEntities = [];
      this.targetComponentTypes = [point2d, physic2d];
      this.process = function (entity) {
          return entity;
      };
      this.processAll = function (system) {
          var prevNode1119 = clWeb2dGame_utils_debug_performance._internal.PERFORMANCETIMER.currentNode;
          try {
              var before1120 = performance.now();
              var element1121 = clWeb2dGame_utils_debug_performance._internal.pickPerformanceTimerElement('collision', 0);
              var infoList = [];
              for (var entity = null, _js_idx2020 = 0; _js_idx2020 < system.targetEntities.length; _js_idx2020 += 1) {
                  entity = system.targetEntities[_js_idx2020];
                  var physic = getEcsComponent(physic2d, entity);
                  var globalPoint = calcGlobalPoint(entity);
                  updateBoundingBox(physic, globalPoint);
                  infoList.unshift(makeCollisionEntityInfo('entity', entity, 'global-point', globalPoint, 'physic', physic));
                  infoList;
              };
              initTargetListOfInfoList(infoList);
              var length2021 = infoList.length;
              var _js2022 = length2021 - 1;
              for (var outerIdx = 0; outerIdx < _js2022; outerIdx += 1) {
                  var object2023 = infoList[outerIdx];
                  for (var info2 = null, _js_idx2024 = 0; _js_idx2024 < object2023.targetEntityList.length; _js_idx2024 += 1) {
                      info2 = object2023.targetEntityList[_js_idx2024];
                      processCollision(object2023.entity, object2023.physic, object2023.globalPoint, info2.entity, info2.physic, info2.globalPoint);
                  };
              };
              __PS_MV_REG = [];
              return clWeb2dGame_utils_debug_performance._internal.pushToRingBuffer(performance.now() - before1120, element1121.results);
          } finally {
              clWeb2dGame_utils_debug_performance._internal.PERFORMANCETIMER.currentNode = prevNode1119;
          };
      };
      this.addEntityHook = function (entity) {
          __PS_MV_REG = [];
          return COLLIDERMODELENABLE ? addColliderModel(entity) : null;
      };
      this.deleteEntityHook = function (entity) {
          return entity;
      };
      return this;
  };
  function makeCollisionSystem() {
      var _js2024 = arguments.length;
      for (var n2023 = 0; n2023 < _js2024; n2023 += 2) {
          switch (arguments[n2023]) {
          case 'enable':
              enable = arguments[n2023 + 1];
              break;
          case 'target-entities':
              targetEntities = arguments[n2023 + 1];
              break;
          case 'target-component-types':
              targetComponentTypes = arguments[n2023 + 1];
              break;
          case 'process':
              process = arguments[n2023 + 1];
              break;
          case 'process-all':
              processAll = arguments[n2023 + 1];
              break;
          case 'add-entity-hook':
              addEntityHook = arguments[n2023 + 1];
              break;
          case 'delete-entity-hook':
              deleteEntityHook = arguments[n2023 + 1];
          };
      };
      var enable = 'undefined' === typeof enable ? true : enable;
      var targetEntities = 'undefined' === typeof targetEntities ? [] : targetEntities;
      var targetComponentTypes = 'undefined' === typeof targetComponentTypes ? [point2d, physic2d] : targetComponentTypes;
      var process = 'undefined' === typeof process ? function (entity) {
          return entity;
      } : process;
      var processAll = 'undefined' === typeof processAll ? function (system) {
          var prevNode1122 = clWeb2dGame_utils_debug_performance._internal.PERFORMANCETIMER.currentNode;
          try {
              var before1123 = performance.now();
              var element1124 = clWeb2dGame_utils_debug_performance._internal.pickPerformanceTimerElement('collision', 0);
              var infoList = [];
              for (var entity = null, _js_idx2025 = 0; _js_idx2025 < system.targetEntities.length; _js_idx2025 += 1) {
                  entity = system.targetEntities[_js_idx2025];
                  var physic = getEcsComponent(physic2d, entity);
                  var globalPoint = calcGlobalPoint(entity);
                  updateBoundingBox(physic, globalPoint);
                  infoList.unshift(makeCollisionEntityInfo('entity', entity, 'global-point', globalPoint, 'physic', physic));
                  infoList;
              };
              initTargetListOfInfoList(infoList);
              var length2026 = infoList.length;
              var _js2027 = length2026 - 1;
              for (var outerIdx = 0; outerIdx < _js2027; outerIdx += 1) {
                  var object2028 = infoList[outerIdx];
                  for (var info2 = null, _js_idx2029 = 0; _js_idx2029 < object2028.targetEntityList.length; _js_idx2029 += 1) {
                      info2 = object2028.targetEntityList[_js_idx2029];
                      processCollision(object2028.entity, object2028.physic, object2028.globalPoint, info2.entity, info2.physic, info2.globalPoint);
                  };
              };
              __PS_MV_REG = [];
              return clWeb2dGame_utils_debug_performance._internal.pushToRingBuffer(performance.now() - before1123, element1124.results);
          } finally {
              clWeb2dGame_utils_debug_performance._internal.PERFORMANCETIMER.currentNode = prevNode1122;
          };
      } : processAll;
      var addEntityHook = 'undefined' === typeof addEntityHook ? function (entity) {
          __PS_MV_REG = [];
          return COLLIDERMODELENABLE ? addColliderModel(entity) : null;
      } : addEntityHook;
      var deleteEntityHook = 'undefined' === typeof deleteEntityHook ? function (entity) {
          return entity;
      } : deleteEntityHook;
      var result = new collisionSystem();
      result.enable = enable;
      result.targetEntities = targetEntities;
      result.targetComponentTypes = targetComponentTypes;
      result.process = process;
      result.processAll = processAll;
      result.addEntityHook = addEntityHook;
      result.deleteEntityHook = deleteEntityHook;
      __PS_MV_REG = [];
      return result;
  };
  function collisionSystemP(obj) {
      return (obj instanceof collisionSystem);
  };
  (function () {
      var tempCtor = function () {
          return null;
      };
      tempCtor.prototype = ecsSystem.prototype;
      collisionSystem.superClass_ = ecsSystem.prototype;
      collisionSystem.prototype = new tempCtor();
      __PS_MV_REG = [];
      return collisionSystem.prototype.constructor = collisionSystem;
  })();
  /* --- extern symbols --- */
  return {
    'setfColliderModelEnable': setfColliderModelEnable,
    'setfColliderModelDepth': setfColliderModelDepth,
    'setfColliderModelColor': setfColliderModelColor,
    'collisionSystem': collisionSystem,
    'makeCollisionSystem': makeCollisionSystem,
    '_internal': {
      'COLLIDERMODELCOLOR': COLLIDERMODELCOLOR,
      'COLLIDERMODELDEPTH': COLLIDERMODELDEPTH,
      'COLLIDERMODELENABLE': COLLIDERMODELENABLE,
      'generateColliderModel': generateColliderModel,
      'addColliderModel': addColliderModel,
      'findColliderModel': findColliderModel,
      'collisionEntityInfo': collisionEntityInfo,
      'makeCollisionEntityInfo': makeCollisionEntityInfo,
      'collisionEntityInfoP': collisionEntityInfoP,
      'processCollision': processCollision,
      'collisionTargetCache': collisionTargetCache,
      'makeCollisionTargetCache': makeCollisionTargetCache,
      'collisionTargetCacheP': collisionTargetCacheP,
      'sameTagListP': sameTagListP,
      'addPairToCache': addPairToCache,
      'findTargetPair': findTargetPair,
      'getTargetEntityInfoList': getTargetEntityInfoList,
      'initTargetListOfInfoList': initTargetListOfInfoList,
      'collisionSystemP': collisionSystemP,
    }
  };
})();

var clWeb2dGame_graphics_animation = (function() {
  /* --- import symbols --- */
  var addToMonitoringLog = clWeb2dGame_utils_debug_logger.addToMonitoringLog;
  var initEventLogArea = clWeb2dGame_utils_debug_logger.initEventLogArea;
  var initMonitoringLog = clWeb2dGame_utils_debug_logger.initMonitoringLog;
  var MAXEVENTLOGCOUNT = clWeb2dGame_utils_debug_logger.MAXEVENTLOGCOUNT;
  var addToEventLog = clWeb2dGame_utils_debug_logger.addToEventLog;
  var clearMonitoringLog = clWeb2dGame_utils_debug_logger.clearMonitoringLog;
  var setConsoleLogLevel = clWeb2dGame_utils_debug_logger.setConsoleLogLevel;
  var CONSOLELOGFUNCTION = clWeb2dGame_utils_debug_logger.CONSOLELOGFUNCTION;
  var initDrawModelSystem = clWeb2dGame_graphics_drawModelSystem.initDrawModelSystem;
  var model2dP = clWeb2dGame_graphics_drawModelSystem.model2dP;
  var makeModel2d = clWeb2dGame_graphics_drawModelSystem.makeModel2d;
  var updateModel2d = clWeb2dGame_graphics_drawModelSystem.updateModel2d;
  var findModel2dByLabel = clWeb2dGame_graphics_drawModelSystem.findModel2dByLabel;
  var disableModel2d = clWeb2dGame_graphics_drawModelSystem.disableModel2d;
  var enableModel2d = clWeb2dGame_graphics_drawModelSystem.enableModel2d;
  var model2d = clWeb2dGame_graphics_drawModelSystem.model2d;
  var texture2dP = clWeb2dGame_graphics_texture.texture2dP;
  var getTexturePromise = clWeb2dGame_graphics_texture.getTexturePromise;
  var texture2d = clWeb2dGame_graphics_texture.texture2d;
  var getTexture2dWidth = clWeb2dGame_graphics_texture.getTexture2dWidth;
  var loadTexture = clWeb2dGame_graphics_texture.loadTexture;
  var unloadTexture = clWeb2dGame_graphics_texture.unloadTexture;
  var getTexture2dHeight = clWeb2dGame_graphics_texture.getTexture2dHeight;
  var makeWiredCircle = clWeb2dGame_graphics_2dGeometry.makeWiredCircle;
  var changeGeometryUvs = clWeb2dGame_graphics_2dGeometry.changeGeometryUvs;
  var makeTextModelPromise = clWeb2dGame_graphics_2dGeometry.makeTextModelPromise;
  var makeTextureModel = clWeb2dGame_graphics_2dGeometry.makeTextureModel;
  var makeSolidCircle = clWeb2dGame_graphics_2dGeometry.makeSolidCircle;
  var makeWiredRect = clWeb2dGame_graphics_2dGeometry.makeWiredRect;
  var makeWiredPolygon = clWeb2dGame_graphics_2dGeometry.makeWiredPolygon;
  var makeSolidPolygon = clWeb2dGame_graphics_2dGeometry.makeSolidPolygon;
  var makeLines = clWeb2dGame_graphics_2dGeometry.makeLines;
  var makeTextureModelPromise = clWeb2dGame_graphics_2dGeometry.makeTextureModelPromise;
  var changeModelColor = clWeb2dGame_graphics_2dGeometry.changeModelColor;
  var makeLine = clWeb2dGame_graphics_2dGeometry.makeLine;
  var getMeshSize = clWeb2dGame_graphics_2dGeometry.getMeshSize;
  var makeSolidRect = clWeb2dGame_graphics_2dGeometry.makeSolidRect;
  var makeWiredRegularPolygon = clWeb2dGame_graphics_2dGeometry.makeWiredRegularPolygon;
  var getMeshHeight = clWeb2dGame_graphics_2dGeometry.getMeshHeight;
  var getMeshWidth = clWeb2dGame_graphics_2dGeometry.getMeshWidth;
  var makeSolidRegularPolygon = clWeb2dGame_graphics_2dGeometry.makeSolidRegularPolygon;
  var rotate2d = clWeb2dGame_core_basicComponents.rotate2d;
  var rect2dP = clWeb2dGame_core_basicComponents.rect2dP;
  var speed2dP = clWeb2dGame_core_basicComponents.speed2dP;
  var point2d = clWeb2dGame_core_basicComponents.point2d;
  var makePoint2d = clWeb2dGame_core_basicComponents.makePoint2d;
  var makeVector2d = clWeb2dGame_core_basicComponents.makeVector2d;
  var setEntityParam = clWeb2dGame_core_basicComponents.setEntityParam;
  var copyPoint2dTo = clWeb2dGame_core_basicComponents.copyPoint2dTo;
  var getEntityParam = clWeb2dGame_core_basicComponents.getEntityParam;
  var initEntityParams = clWeb2dGame_core_basicComponents.initEntityParams;
  var copyVector2dTo = clWeb2dGame_core_basicComponents.copyVector2dTo;
  var speed2d = clWeb2dGame_core_basicComponents.speed2d;
  var rect2d = clWeb2dGame_core_basicComponents.rect2d;
  var cloneVector2d = clWeb2dGame_core_basicComponents.cloneVector2d;
  var params = clWeb2dGame_core_basicComponents.params;
  var makeRect2d = clWeb2dGame_core_basicComponents.makeRect2d;
  var makeScript2d = clWeb2dGame_core_basicComponents.makeScript2d;
  var makeSpeed2d = clWeb2dGame_core_basicComponents.makeSpeed2d;
  var clonePoint2d = clWeb2dGame_core_basicComponents.clonePoint2d;
  var point2dP = clWeb2dGame_core_basicComponents.point2dP;
  var vector2d = clWeb2dGame_core_basicComponents.vector2d;
  var vector2dP = clWeb2dGame_core_basicComponents.vector2dP;
  var rotate2dP = clWeb2dGame_core_basicComponents.rotate2dP;
  var script2d = clWeb2dGame_core_basicComponents.script2d;
  var makeRotate2d = clWeb2dGame_core_basicComponents.makeRotate2d;
  var deleteDeleteComponentHook = clPsEcs_ecs.deleteDeleteComponentHook;
  var makeEcsEntity = clPsEcs_ecs.makeEcsEntity;
  var addEcsComponent = clPsEcs_ecs.addEcsComponent;
  var ecsEntity = clPsEcs_ecs.ecsEntity;
  var deleteEcsComponentType = clPsEcs_ecs.deleteEcsComponentType;
  var framePromise = clPsEcs_framePromise.framePromise;
  var deleteEntityTag = clPsEcs_ecs.deleteEntityTag;
  var deleteEcsEntity = clPsEcs_ecs.deleteEcsEntity;
  var cleanEcsEnv = clPsEcs_ecs.cleanEcsEnv;
  var addDeleteComponentHook = clPsEcs_ecs.addDeleteComponentHook;
  var ecsMain = clPsEcs_ecs.ecsMain;
  var includesAllComponentTypes = clPsEcs_utils.includesAllComponentTypes;
  var findAComponent = clPsEcs_ecs.findAComponent;
  var registerNframesAfterFunc = clPsEcs_basicProcess.registerNframesAfterFunc;
  var moveEcsEntity = clPsEcs_ecs.moveEcsEntity;
  var ecsComponent = clPsEcs_ecs.ecsComponent;
  var popDefaultEcsEntityParent = clPsEcs_ecs.popDefaultEcsEntityParent;
  var framePromiseP = clPsEcs_framePromise.framePromiseP;
  var getEcsComponent = clPsEcs_ecs.getEcsComponent;
  var ecsSystem = clPsEcs_ecs.ecsSystem;
  var addEntityTag = clPsEcs_ecs.addEntityTag;
  var ecsEntityP = clPsEcs_ecs.ecsEntityP;
  var registerEcsSystem = clPsEcs_ecs.registerEcsSystem;
  var registerFuncWithPred = clPsEcs_basicProcess.registerFuncWithPred;
  var addEcsEntityToBuffer = clPsEcs_ecs.addEcsEntityToBuffer;
  var checkEntityTags = clPsEcs_ecs.checkEntityTags;
  var initFramePromise = clPsEcs_framePromise.initFramePromise;
  var framePromiseThen = clPsEcs_framePromise.framePromiseThen;
  var addEcsEntity = clPsEcs_ecs.addEcsEntity;
  var registerNextFrameFunc = clPsEcs_basicProcess.registerNextFrameFunc;
  var findAEntityByTag = clPsEcs_ecs.findAEntityByTag;
  var stackDefaultEcsEntityParent = clPsEcs_ecs.stackDefaultEcsEntityParent;
  var addEcsComponentList = clPsEcs_ecs.addEcsComponentList;
  var framePromiseAll = clPsEcs_framePromise.framePromiseAll;
  var findTheEntity = clPsEcs_ecs.findTheEntity;
  var findAEntity = clPsEcs_ecs.findAEntity;
  var hasEntityTag = clPsEcs_ecs.hasEntityTag;
  var deleteEcsComponent = clPsEcs_ecs.deleteEcsComponent;
  var getDefaultEcsEntityParent = clPsEcs_ecs.getDefaultEcsEntityParent;
  /* --- define objects --- */
  function animation2d() {
      this.parent = null;
      this.children = [];
      this.registerp = null;
      this.interval = null;
      this.horizCount = 1;
      this.vertCount = 1;
      this.model = null;
      this.texture = null;
      this.animationEndCallback = null;
      this.goesToForward = true;
      this.runsAnimation = null;
      this.intervalCounter = 0;
      this.imageCounter = 0;
      return this;
  };
  function makeAnimation2d() {
      var _js2029 = arguments.length;
      for (var n2028 = 0; n2028 < _js2029; n2028 += 2) {
          switch (arguments[n2028]) {
          case 'parent':
              parent = arguments[n2028 + 1];
              break;
          case 'children':
              children = arguments[n2028 + 1];
              break;
          case 'registerp':
              registerp = arguments[n2028 + 1];
              break;
          case 'interval':
              interval = arguments[n2028 + 1];
              break;
          case 'horiz-count':
              horizCount = arguments[n2028 + 1];
              break;
          case 'vert-count':
              vertCount = arguments[n2028 + 1];
              break;
          case 'model':
              model = arguments[n2028 + 1];
              break;
          case 'texture':
              texture = arguments[n2028 + 1];
              break;
          case 'animation-end-callback':
              animationEndCallback = arguments[n2028 + 1];
              break;
          case 'goes-to-forward':
              goesToForward = arguments[n2028 + 1];
              break;
          case 'runs-animation':
              runsAnimation = arguments[n2028 + 1];
              break;
          case 'interval-counter':
              intervalCounter = arguments[n2028 + 1];
              break;
          case 'image-counter':
              imageCounter = arguments[n2028 + 1];
          };
      };
      var parent;
      var children = 'undefined' === typeof children ? [] : children;
      var registerp;
      var interval;
      var horizCount = 'undefined' === typeof horizCount ? 1 : horizCount;
      var vertCount = 'undefined' === typeof vertCount ? 1 : vertCount;
      var model;
      var texture;
      var animationEndCallback;
      var goesToForward = 'undefined' === typeof goesToForward ? true : goesToForward;
      var runsAnimation;
      var intervalCounter = 'undefined' === typeof intervalCounter ? 0 : intervalCounter;
      var imageCounter = 'undefined' === typeof imageCounter ? 0 : imageCounter;
      var result = new animation2d();
      result.parent = parent;
      result.children = children;
      result.registerp = registerp;
      result.interval = interval;
      result.horizCount = horizCount;
      result.vertCount = vertCount;
      result.model = model;
      result.texture = texture;
      result.animationEndCallback = animationEndCallback;
      result.goesToForward = goesToForward;
      result.runsAnimation = runsAnimation;
      result.intervalCounter = intervalCounter;
      result.imageCounter = imageCounter;
      __PS_MV_REG = [];
      return result;
  };
  function animation2dP(obj) {
      return (obj instanceof animation2d);
  };
  (function () {
      var tempCtor = function () {
          return null;
      };
      tempCtor.prototype = ecsComponent.prototype;
      animation2d.superClass_ = ecsComponent.prototype;
      animation2d.prototype = new tempCtor();
      __PS_MV_REG = [];
      return animation2d.prototype.constructor = animation2d;
  })();
  function initAnimation2d() {
      var _js2031 = arguments.length;
      for (var n2030 = 0; n2030 < _js2031; n2030 += 2) {
          switch (arguments[n2030]) {
          case 'interval':
              interval = arguments[n2030 + 1];
              break;
          case 'horiz-count':
              horizCount = arguments[n2030 + 1];
              break;
          case 'vert-count':
              vertCount = arguments[n2030 + 1];
              break;
          case 'model':
              model = arguments[n2030 + 1];
              break;
          case 'texture':
              texture = arguments[n2030 + 1];
              break;
          case 'animation-end-callback':
              animationEndCallback = arguments[n2030 + 1];
          };
      };
      var interval;
      var horizCount = 'undefined' === typeof horizCount ? 1 : horizCount;
      var vertCount = 'undefined' === typeof vertCount ? 1 : vertCount;
      var model;
      var texture;
      var animationEndCallback = 'undefined' === typeof animationEndCallback ? function (anime) {
          return null;
      } : animationEndCallback;
      if (!((model instanceof (typeof model2d === 'string' ? eval(model2d) : model2d)))) {
          throw '\'TYPE-ERROR: (The place is \'MODEL\'. The expected type is \'MODEL-2D\')';
      };
      if (!((texture instanceof (typeof texture2d === 'string' ? eval(texture2d) : texture2d)))) {
          throw '\'TYPE-ERROR: (The place is \'TEXTURE\'. The expected type is \'TEXTURE-2D\')';
      };
      var anime = makeAnimation2d('interval', interval, 'horiz-count', horizCount, 'vert-count', vertCount, 'model', model, 'texture', texture, 'animation-end-callback', animationEndCallback);
      switchAnimationImage(anime, 0);
      __PS_MV_REG = [];
      return anime;
  };
  /** Enable drawing the model */
  function enableAnimation(entity, anime2d) {
      if (!((entity instanceof (typeof ecsEntity === 'string' ? eval(ecsEntity) : ecsEntity)))) {
          throw '\'TYPE-ERROR: (The place is \'ENTITY\'. The expected type is \'ECS-ENTITY\')';
      };
      if (!((anime2d instanceof (typeof animation2d === 'string' ? eval(animation2d) : animation2d)))) {
          throw '\'TYPE-ERROR: (The place is \'ANIME-2D\'. The expected type is \'ANIMATION-2D\')';
      };
      __PS_MV_REG = [];
      return enableModel2d(entity, 'target-model-2d', anime2d.model);
  };
  /** Stop the animation and disable drawing the model */
  function disableAnimation(entity, anime2d) {
      if (!((entity instanceof (typeof ecsEntity === 'string' ? eval(ecsEntity) : ecsEntity)))) {
          throw '\'TYPE-ERROR: (The place is \'ENTITY\'. The expected type is \'ECS-ENTITY\')';
      };
      if (!((anime2d instanceof (typeof animation2d === 'string' ? eval(animation2d) : animation2d)))) {
          throw '\'TYPE-ERROR: (The place is \'ANIME-2D\'. The expected type is \'ANIMATION-2D\')';
      };
      stopAnimation(anime2d);
      __PS_MV_REG = [];
      return disableModel2d(entity, 'target-model-2d', anime2d.model);
  };
  function startAnimation(anime) {
      if (!anime.goesToForward) {
          anime.intervalCounter = anime.interval - anime.intervalCounter - 1;
      };
      anime.runsAnimation = true;
      return anime.goesToForward = true;
  };
  function startReversedAnimation(anime) {
      if (anime.goesToForward) {
          anime.intervalCounter = anime.interval - anime.intervalCounter - 1;
      };
      anime.runsAnimation = true;
      return anime.goesToForward = null;
  };
  function reverseAnimation(anime) {
      __PS_MV_REG = [];
      return anime.goesToForward ? startReversedAnimation(anime) : startAnimation(anime);
  };
  function resetAnimation(anime) {
      var _js2033 = arguments.length;
      for (var n2032 = 1; n2032 < _js2033; n2032 += 2) {
          switch (arguments[n2032]) {
          case 'stop-p':
              stopP = arguments[n2032 + 1];
              break;
          case 'forward-p':
              forwardP = arguments[n2032 + 1];
          };
      };
      var stopP = 'undefined' === typeof stopP ? true : stopP;
      var forwardP = 'undefined' === typeof forwardP ? 'asis' : forwardP;
      if (forwardP === 'asis') {
          forwardP = anime.goesToForward;
      };
      anime.intervalCounter = 0;
      switchAnimationImage(anime, forwardP ? 0 : anime.horizCount * anime.vertCount - 1);
      anime.runsAnimation = !stopP;
      __PS_MV_REG = [];
      return anime.goesToForward = forwardP;
  };
  function stopAnimation(anime) {
      return anime.runsAnimation = null;
  };
  function switchAnimationImage(anime, nextCounter) {
      var maxCount = anime.horizCount * anime.vertCount;
      if (nextCounter < 0 || nextCounter >= maxCount) {
          throw 'Message: ' + 'The target animation counter is invalid (Max: ~D, Got: ~D)' + '; Args: ' + maxCount + ', ' + nextCounter;
      };
      anime.imageCounter = nextCounter;
      var xCount = (n2034 = anime.vertCount, (nextCounter % n2034 + n2034) % n2034);
      var yCount = anime.horizCount - Math.floor(nextCounter / anime.vertCount) - 1;
      var width = 1.0 / anime.vertCount;
      var height = 1.0 / anime.horizCount;
      __PS_MV_REG = [];
      return changeGeometryUvs(anime.texture, (!((anime.model instanceof (typeof model2d === 'string' ? eval(model2d) : model2d))) ? (function () {
          throw '\'TYPE-ERROR: (The place is \'MODEL\'. The expected type is \'MODEL-2D\')';
      })() : null, anime.model.model.geometry), width * xCount, height * yCount, width, height);
  };
  function runAnimationProcess(anime) {
      if (anime.runsAnimation) {
          if (anime.intervalCounter + 1 < anime.interval) {
              return ++anime.intervalCounter;
          } else {
              if (anime.goesToForward && anime.imageCounter + 1 < anime.horizCount * anime.vertCount || !anime.goesToForward && anime.imageCounter > 0) {
                  anime.intervalCounter = 0;
                  __PS_MV_REG = [];
                  return switchAnimationImage(anime, anime.goesToForward ? anime.imageCounter + 1 : anime.imageCounter - 1);
              } else {
                  anime.runsAnimation = null;
                  __PS_MV_REG = [];
                  return anime.animationEndCallback(anime);
              };
          };
      };
  };
  /* --- extern symbols --- */
  return {
    'animation2d': animation2d,
    'initAnimation2d': initAnimation2d,
    'enableAnimation': enableAnimation,
    'disableAnimation': disableAnimation,
    'startAnimation': startAnimation,
    'startReversedAnimation': startReversedAnimation,
    'reverseAnimation': reverseAnimation,
    'resetAnimation': resetAnimation,
    'stopAnimation': stopAnimation,
    'runAnimationProcess': runAnimationProcess,
    '_internal': {
      'makeAnimation2d': makeAnimation2d,
      'animation2dP': animation2dP,
      'switchAnimationImage': switchAnimationImage,
    }
  };
})();

var clWeb2dGame_graphics_animationManager = (function() {
  /* --- import symbols --- */
  var addToMonitoringLog = clWeb2dGame_utils_debug_logger.addToMonitoringLog;
  var initEventLogArea = clWeb2dGame_utils_debug_logger.initEventLogArea;
  var initMonitoringLog = clWeb2dGame_utils_debug_logger.initMonitoringLog;
  var MAXEVENTLOGCOUNT = clWeb2dGame_utils_debug_logger.MAXEVENTLOGCOUNT;
  var addToEventLog = clWeb2dGame_utils_debug_logger.addToEventLog;
  var clearMonitoringLog = clWeb2dGame_utils_debug_logger.clearMonitoringLog;
  var setConsoleLogLevel = clWeb2dGame_utils_debug_logger.setConsoleLogLevel;
  var CONSOLELOGFUNCTION = clWeb2dGame_utils_debug_logger.CONSOLELOGFUNCTION;
  var initDrawModelSystem = clWeb2dGame_graphics_drawModelSystem.initDrawModelSystem;
  var model2dP = clWeb2dGame_graphics_drawModelSystem.model2dP;
  var makeModel2d = clWeb2dGame_graphics_drawModelSystem.makeModel2d;
  var updateModel2d = clWeb2dGame_graphics_drawModelSystem.updateModel2d;
  var findModel2dByLabel = clWeb2dGame_graphics_drawModelSystem.findModel2dByLabel;
  var disableModel2d = clWeb2dGame_graphics_drawModelSystem.disableModel2d;
  var enableModel2d = clWeb2dGame_graphics_drawModelSystem.enableModel2d;
  var model2d = clWeb2dGame_graphics_drawModelSystem.model2d;
  var texture2dP = clWeb2dGame_graphics_texture.texture2dP;
  var getTexturePromise = clWeb2dGame_graphics_texture.getTexturePromise;
  var texture2d = clWeb2dGame_graphics_texture.texture2d;
  var getTexture2dWidth = clWeb2dGame_graphics_texture.getTexture2dWidth;
  var loadTexture = clWeb2dGame_graphics_texture.loadTexture;
  var unloadTexture = clWeb2dGame_graphics_texture.unloadTexture;
  var getTexture2dHeight = clWeb2dGame_graphics_texture.getTexture2dHeight;
  var startReversedAnimation = clWeb2dGame_graphics_animation.startReversedAnimation;
  var disableAnimation = clWeb2dGame_graphics_animation.disableAnimation;
  var initAnimation2d = clWeb2dGame_graphics_animation.initAnimation2d;
  var runAnimationProcess = clWeb2dGame_graphics_animation.runAnimationProcess;
  var resetAnimation = clWeb2dGame_graphics_animation.resetAnimation;
  var reverseAnimation = clWeb2dGame_graphics_animation.reverseAnimation;
  var enableAnimation = clWeb2dGame_graphics_animation.enableAnimation;
  var startAnimation = clWeb2dGame_graphics_animation.startAnimation;
  var stopAnimation = clWeb2dGame_graphics_animation.stopAnimation;
  var animation2d = clWeb2dGame_graphics_animation.animation2d;
  var makeWiredCircle = clWeb2dGame_graphics_2dGeometry.makeWiredCircle;
  var changeGeometryUvs = clWeb2dGame_graphics_2dGeometry.changeGeometryUvs;
  var makeTextModelPromise = clWeb2dGame_graphics_2dGeometry.makeTextModelPromise;
  var makeTextureModel = clWeb2dGame_graphics_2dGeometry.makeTextureModel;
  var makeSolidCircle = clWeb2dGame_graphics_2dGeometry.makeSolidCircle;
  var makeWiredRect = clWeb2dGame_graphics_2dGeometry.makeWiredRect;
  var makeWiredPolygon = clWeb2dGame_graphics_2dGeometry.makeWiredPolygon;
  var makeSolidPolygon = clWeb2dGame_graphics_2dGeometry.makeSolidPolygon;
  var makeLines = clWeb2dGame_graphics_2dGeometry.makeLines;
  var makeTextureModelPromise = clWeb2dGame_graphics_2dGeometry.makeTextureModelPromise;
  var changeModelColor = clWeb2dGame_graphics_2dGeometry.changeModelColor;
  var makeLine = clWeb2dGame_graphics_2dGeometry.makeLine;
  var getMeshSize = clWeb2dGame_graphics_2dGeometry.getMeshSize;
  var makeSolidRect = clWeb2dGame_graphics_2dGeometry.makeSolidRect;
  var makeWiredRegularPolygon = clWeb2dGame_graphics_2dGeometry.makeWiredRegularPolygon;
  var getMeshHeight = clWeb2dGame_graphics_2dGeometry.getMeshHeight;
  var getMeshWidth = clWeb2dGame_graphics_2dGeometry.getMeshWidth;
  var makeSolidRegularPolygon = clWeb2dGame_graphics_2dGeometry.makeSolidRegularPolygon;
  var deleteDeleteComponentHook = clPsEcs_ecs.deleteDeleteComponentHook;
  var makeEcsEntity = clPsEcs_ecs.makeEcsEntity;
  var addEcsComponent = clPsEcs_ecs.addEcsComponent;
  var ecsEntity = clPsEcs_ecs.ecsEntity;
  var deleteEcsComponentType = clPsEcs_ecs.deleteEcsComponentType;
  var framePromise = clPsEcs_framePromise.framePromise;
  var deleteEntityTag = clPsEcs_ecs.deleteEntityTag;
  var deleteEcsEntity = clPsEcs_ecs.deleteEcsEntity;
  var cleanEcsEnv = clPsEcs_ecs.cleanEcsEnv;
  var addDeleteComponentHook = clPsEcs_ecs.addDeleteComponentHook;
  var ecsMain = clPsEcs_ecs.ecsMain;
  var includesAllComponentTypes = clPsEcs_utils.includesAllComponentTypes;
  var findAComponent = clPsEcs_ecs.findAComponent;
  var registerNframesAfterFunc = clPsEcs_basicProcess.registerNframesAfterFunc;
  var moveEcsEntity = clPsEcs_ecs.moveEcsEntity;
  var ecsComponent = clPsEcs_ecs.ecsComponent;
  var popDefaultEcsEntityParent = clPsEcs_ecs.popDefaultEcsEntityParent;
  var framePromiseP = clPsEcs_framePromise.framePromiseP;
  var getEcsComponent = clPsEcs_ecs.getEcsComponent;
  var ecsSystem = clPsEcs_ecs.ecsSystem;
  var addEntityTag = clPsEcs_ecs.addEntityTag;
  var ecsEntityP = clPsEcs_ecs.ecsEntityP;
  var registerEcsSystem = clPsEcs_ecs.registerEcsSystem;
  var registerFuncWithPred = clPsEcs_basicProcess.registerFuncWithPred;
  var addEcsEntityToBuffer = clPsEcs_ecs.addEcsEntityToBuffer;
  var checkEntityTags = clPsEcs_ecs.checkEntityTags;
  var initFramePromise = clPsEcs_framePromise.initFramePromise;
  var framePromiseThen = clPsEcs_framePromise.framePromiseThen;
  var addEcsEntity = clPsEcs_ecs.addEcsEntity;
  var registerNextFrameFunc = clPsEcs_basicProcess.registerNextFrameFunc;
  var findAEntityByTag = clPsEcs_ecs.findAEntityByTag;
  var stackDefaultEcsEntityParent = clPsEcs_ecs.stackDefaultEcsEntityParent;
  var addEcsComponentList = clPsEcs_ecs.addEcsComponentList;
  var framePromiseAll = clPsEcs_framePromise.framePromiseAll;
  var findTheEntity = clPsEcs_ecs.findTheEntity;
  var findAEntity = clPsEcs_ecs.findAEntity;
  var hasEntityTag = clPsEcs_ecs.hasEntityTag;
  var deleteEcsComponent = clPsEcs_ecs.deleteEcsComponent;
  var getDefaultEcsEntityParent = clPsEcs_ecs.getDefaultEcsEntityParent;
  /* --- define objects --- */
  function animationManager() {
      this.entity = null;
      this.animationTable = {  };
      this.current = null;
      return this;
  };
  function makeAnimationManager() {
      var _js2036 = arguments.length;
      for (var n2035 = 0; n2035 < _js2036; n2035 += 2) {
          switch (arguments[n2035]) {
          case 'entity':
              entity = arguments[n2035 + 1];
              break;
          case 'animation-table':
              animationTable = arguments[n2035 + 1];
              break;
          case 'current':
              current = arguments[n2035 + 1];
          };
      };
      var entity;
      var animationTable = 'undefined' === typeof animationTable ? {  } : animationTable;
      var current;
      var result = new animationManager();
      result.entity = entity;
      result.animationTable = animationTable;
      result.current = current;
      __PS_MV_REG = [];
      return result;
  };
  function animationManagerP(obj) {
      return (obj instanceof animationManager);
  };
  function initAnimationManager(entity) {
      if (!((entity instanceof (typeof ecsEntity === 'string' ? eval(ecsEntity) : ecsEntity)))) {
          throw '\'TYPE-ERROR: (The place is \'ENTITY\'. The expected type is \'ECS-ENTITY\')';
      };
      __PS_MV_REG = [];
      return makeAnimationManager('entity', entity);
  };
  function switchCurrentAnimation(manager, name) {
      var _js2038 = arguments.length;
      for (var n2037 = 2; n2037 < _js2038; n2037 += 2) {
          switch (arguments[n2037]) {
          case 'forward-p':
              forwardP = arguments[n2037 + 1];
          };
      };
      var forwardP = 'undefined' === typeof forwardP ? true : forwardP;
      if (!((manager instanceof (typeof animationManager === 'string' ? eval(animationManager) : animationManager)))) {
          throw '\'TYPE-ERROR: (The place is \'MANAGER\'. The expected type is \'ANIMATION-MANAGER\')';
      };
      var next = findAnimationInManager(manager, name);
      if (!next) {
          throw 'Message: ' + 'The animation \"~A\" is not registered' + '; Args: ' + name;
      };
      if (manager.current) {
          resetAnimation(manager.current, 'stop-p', true, 'forward-p', true);
          disableAnimation(manager.entity, manager.current);
      };
      manager.current = next;
      resetAnimation(manager.current, 'stop-p', null, 'forward-p', forwardP);
      __PS_MV_REG = [];
      return enableAnimation(manager.entity, manager.current);
  };
  function reverseCurrentAnimation(manager) {
      if (!((manager instanceof (typeof animationManager === 'string' ? eval(animationManager) : animationManager)))) {
          throw '\'TYPE-ERROR: (The place is \'MANAGER\'. The expected type is \'ANIMATION-MANAGER\')';
      };
      if (!manager.current) {
          throw 'No animation is set as current.';
      };
      __PS_MV_REG = [];
      return reverseAnimation(manager.current);
  };
  function findAnimationInManager(manager, name) {
      return manager.animationTable[name];
  };
  function registerAnimation(manager, name, anime2d) {
      if (!((manager instanceof (typeof animationManager === 'string' ? eval(animationManager) : animationManager)))) {
          throw '\'TYPE-ERROR: (The place is \'MANAGER\'. The expected type is \'ANIMATION-MANAGER\')';
      };
      if (!((anime2d instanceof (typeof animation2d === 'string' ? eval(animation2d) : animation2d)))) {
          throw '\'TYPE-ERROR: (The place is \'ANIME-2D\'. The expected type is \'ANIMATION-2D\')';
      };
      disableAnimation(manager.entity, anime2d);
      __PS_MV_REG = [];
      return manager.animationTable[name] = anime2d;
  };
  /* --- extern symbols --- */
  return {
    'animationManager': animationManager,
    'initAnimationManager': initAnimationManager,
    'switchCurrentAnimation': switchCurrentAnimation,
    'reverseCurrentAnimation': reverseCurrentAnimation,
    'registerAnimation': registerAnimation,
    '_internal': {
      'makeAnimationManager': makeAnimationManager,
      'animationManagerP': animationManagerP,
      'findAnimationInManager': findAnimationInManager,
    }
  };
})();

var clWeb2dGame_core_basicSystems = (function() {
  /* --- import symbols --- */
  var dumpPerformanceCounter = clWeb2dGame_utils_debug_performance.dumpPerformanceCounter;
  var physicPolygon = clWeb2dGame_physics_collision.physicPolygon;
  var makePhysicCircle = clWeb2dGame_physics_collision.makePhysicCircle;
  var updateBoundingBox = clWeb2dGame_physics_collision.updateBoundingBox;
  var physicCircle = clWeb2dGame_physics_collision.physicCircle;
  var colTwoBoundingBoxP = clWeb2dGame_physics_collision.colTwoBoundingBoxP;
  var collidePhysicsP = clWeb2dGame_physics_collision.collidePhysicsP;
  var makePhysicRect = clWeb2dGame_physics_collision.makePhysicRect;
  var physic2d = clWeb2dGame_physics_collision.physic2d;
  var boundingBox2d = clWeb2dGame_physics_collision.boundingBox2d;
  var makePhysicPolygon = clWeb2dGame_physics_collision.makePhysicPolygon;
  var makeBoundingBox2d = clWeb2dGame_physics_collision.makeBoundingBox2d;
  var makePhysic2d = clWeb2dGame_physics_collision.makePhysic2d;
  var judgeCollisionTargetTags = clWeb2dGame_physics_collision.judgeCollisionTargetTags;
  var collideEntitiesP = clWeb2dGame_physics_collision.collideEntitiesP;
  var startReversedAnimation = clWeb2dGame_graphics_animation.startReversedAnimation;
  var disableAnimation = clWeb2dGame_graphics_animation.disableAnimation;
  var initAnimation2d = clWeb2dGame_graphics_animation.initAnimation2d;
  var runAnimationProcess = clWeb2dGame_graphics_animation.runAnimationProcess;
  var resetAnimation = clWeb2dGame_graphics_animation.resetAnimation;
  var reverseAnimation = clWeb2dGame_graphics_animation.reverseAnimation;
  var enableAnimation = clWeb2dGame_graphics_animation.enableAnimation;
  var startAnimation = clWeb2dGame_graphics_animation.startAnimation;
  var stopAnimation = clWeb2dGame_graphics_animation.stopAnimation;
  var animation2d = clWeb2dGame_graphics_animation.animation2d;
  var rotate2d = clWeb2dGame_core_basicComponents.rotate2d;
  var rect2dP = clWeb2dGame_core_basicComponents.rect2dP;
  var speed2dP = clWeb2dGame_core_basicComponents.speed2dP;
  var point2d = clWeb2dGame_core_basicComponents.point2d;
  var makePoint2d = clWeb2dGame_core_basicComponents.makePoint2d;
  var makeVector2d = clWeb2dGame_core_basicComponents.makeVector2d;
  var setEntityParam = clWeb2dGame_core_basicComponents.setEntityParam;
  var copyPoint2dTo = clWeb2dGame_core_basicComponents.copyPoint2dTo;
  var getEntityParam = clWeb2dGame_core_basicComponents.getEntityParam;
  var initEntityParams = clWeb2dGame_core_basicComponents.initEntityParams;
  var copyVector2dTo = clWeb2dGame_core_basicComponents.copyVector2dTo;
  var speed2d = clWeb2dGame_core_basicComponents.speed2d;
  var rect2d = clWeb2dGame_core_basicComponents.rect2d;
  var cloneVector2d = clWeb2dGame_core_basicComponents.cloneVector2d;
  var params = clWeb2dGame_core_basicComponents.params;
  var makeRect2d = clWeb2dGame_core_basicComponents.makeRect2d;
  var makeScript2d = clWeb2dGame_core_basicComponents.makeScript2d;
  var makeSpeed2d = clWeb2dGame_core_basicComponents.makeSpeed2d;
  var clonePoint2d = clWeb2dGame_core_basicComponents.clonePoint2d;
  var point2dP = clWeb2dGame_core_basicComponents.point2dP;
  var vector2d = clWeb2dGame_core_basicComponents.vector2d;
  var vector2dP = clWeb2dGame_core_basicComponents.vector2dP;
  var rotate2dP = clWeb2dGame_core_basicComponents.rotate2dP;
  var script2d = clWeb2dGame_core_basicComponents.script2d;
  var makeRotate2d = clWeb2dGame_core_basicComponents.makeRotate2d;
  var deleteDeleteComponentHook = clPsEcs_ecs.deleteDeleteComponentHook;
  var makeEcsEntity = clPsEcs_ecs.makeEcsEntity;
  var addEcsComponent = clPsEcs_ecs.addEcsComponent;
  var ecsEntity = clPsEcs_ecs.ecsEntity;
  var deleteEcsComponentType = clPsEcs_ecs.deleteEcsComponentType;
  var framePromise = clPsEcs_framePromise.framePromise;
  var deleteEntityTag = clPsEcs_ecs.deleteEntityTag;
  var deleteEcsEntity = clPsEcs_ecs.deleteEcsEntity;
  var cleanEcsEnv = clPsEcs_ecs.cleanEcsEnv;
  var addDeleteComponentHook = clPsEcs_ecs.addDeleteComponentHook;
  var ecsMain = clPsEcs_ecs.ecsMain;
  var includesAllComponentTypes = clPsEcs_utils.includesAllComponentTypes;
  var findAComponent = clPsEcs_ecs.findAComponent;
  var registerNframesAfterFunc = clPsEcs_basicProcess.registerNframesAfterFunc;
  var moveEcsEntity = clPsEcs_ecs.moveEcsEntity;
  var ecsComponent = clPsEcs_ecs.ecsComponent;
  var popDefaultEcsEntityParent = clPsEcs_ecs.popDefaultEcsEntityParent;
  var framePromiseP = clPsEcs_framePromise.framePromiseP;
  var getEcsComponent = clPsEcs_ecs.getEcsComponent;
  var ecsSystem = clPsEcs_ecs.ecsSystem;
  var addEntityTag = clPsEcs_ecs.addEntityTag;
  var ecsEntityP = clPsEcs_ecs.ecsEntityP;
  var registerEcsSystem = clPsEcs_ecs.registerEcsSystem;
  var registerFuncWithPred = clPsEcs_basicProcess.registerFuncWithPred;
  var addEcsEntityToBuffer = clPsEcs_ecs.addEcsEntityToBuffer;
  var checkEntityTags = clPsEcs_ecs.checkEntityTags;
  var initFramePromise = clPsEcs_framePromise.initFramePromise;
  var framePromiseThen = clPsEcs_framePromise.framePromiseThen;
  var addEcsEntity = clPsEcs_ecs.addEcsEntity;
  var registerNextFrameFunc = clPsEcs_basicProcess.registerNextFrameFunc;
  var findAEntityByTag = clPsEcs_ecs.findAEntityByTag;
  var stackDefaultEcsEntityParent = clPsEcs_ecs.stackDefaultEcsEntityParent;
  var addEcsComponentList = clPsEcs_ecs.addEcsComponentList;
  var framePromiseAll = clPsEcs_framePromise.framePromiseAll;
  var findTheEntity = clPsEcs_ecs.findTheEntity;
  var findAEntity = clPsEcs_ecs.findAEntity;
  var hasEntityTag = clPsEcs_ecs.hasEntityTag;
  var deleteEcsComponent = clPsEcs_ecs.deleteEcsComponent;
  var getDefaultEcsEntityParent = clPsEcs_ecs.getDefaultEcsEntityParent;
  var incfVector2d = clWeb2dGame_utils_calc.incfVector2d;
  /* --- define objects --- */
  function scriptSystem() {
      this.enable = true;
      this.targetEntities = [];
      this.targetComponentTypes = [script2d];
      this.process = function (entity) {
          for (var script = null, _js_arrvar2040 = entity.components, _js_idx2039 = 0; _js_idx2039 < _js_arrvar2040.length; _js_idx2039 += 1) {
              script = _js_arrvar2040[_js_idx2039];
              if ((script instanceof (typeof script2d === 'string' ? eval(script2d) : script2d))) {
                  script.func(entity);
              };
          };
      };
      this.processAll = function (system) {
          return system;
      };
      this.addEntityHook = function (entity) {
          return entity;
      };
      this.deleteEntityHook = function (entity) {
          return entity;
      };
      return this;
  };
  function makeScriptSystem() {
      var _js2042 = arguments.length;
      for (var n2041 = 0; n2041 < _js2042; n2041 += 2) {
          switch (arguments[n2041]) {
          case 'enable':
              enable = arguments[n2041 + 1];
              break;
          case 'target-entities':
              targetEntities = arguments[n2041 + 1];
              break;
          case 'target-component-types':
              targetComponentTypes = arguments[n2041 + 1];
              break;
          case 'process':
              process = arguments[n2041 + 1];
              break;
          case 'process-all':
              processAll = arguments[n2041 + 1];
              break;
          case 'add-entity-hook':
              addEntityHook = arguments[n2041 + 1];
              break;
          case 'delete-entity-hook':
              deleteEntityHook = arguments[n2041 + 1];
          };
      };
      var enable = 'undefined' === typeof enable ? true : enable;
      var targetEntities = 'undefined' === typeof targetEntities ? [] : targetEntities;
      var targetComponentTypes = 'undefined' === typeof targetComponentTypes ? [script2d] : targetComponentTypes;
      var process = 'undefined' === typeof process ? function (entity) {
          for (var script = null, _js_arrvar2044 = entity.components, _js_idx2043 = 0; _js_idx2043 < _js_arrvar2044.length; _js_idx2043 += 1) {
              script = _js_arrvar2044[_js_idx2043];
              if ((script instanceof (typeof script2d === 'string' ? eval(script2d) : script2d))) {
                  script.func(entity);
              };
          };
      } : process;
      var processAll = 'undefined' === typeof processAll ? function (system) {
          return system;
      } : processAll;
      var addEntityHook = 'undefined' === typeof addEntityHook ? function (entity) {
          return entity;
      } : addEntityHook;
      var deleteEntityHook = 'undefined' === typeof deleteEntityHook ? function (entity) {
          return entity;
      } : deleteEntityHook;
      var result = new scriptSystem();
      result.enable = enable;
      result.targetEntities = targetEntities;
      result.targetComponentTypes = targetComponentTypes;
      result.process = process;
      result.processAll = processAll;
      result.addEntityHook = addEntityHook;
      result.deleteEntityHook = deleteEntityHook;
      __PS_MV_REG = [];
      return result;
  };
  function scriptSystemP(obj) {
      return (obj instanceof scriptSystem);
  };
  (function () {
      var tempCtor = function () {
          return null;
      };
      tempCtor.prototype = ecsSystem.prototype;
      scriptSystem.superClass_ = ecsSystem.prototype;
      scriptSystem.prototype = new tempCtor();
      __PS_MV_REG = [];
      return scriptSystem.prototype.constructor = scriptSystem;
  })();
  function animationSystem() {
      this.enable = true;
      this.targetEntities = [];
      this.targetComponentTypes = [animation2d];
      this.process = function (entity) {
          for (var anime = null, _js_arrvar2046 = entity.components, _js_idx2045 = 0; _js_idx2045 < _js_arrvar2046.length; _js_idx2045 += 1) {
              anime = _js_arrvar2046[_js_idx2045];
              if ((anime instanceof (typeof animation2d === 'string' ? eval(animation2d) : animation2d))) {
                  runAnimationProcess(anime);
              };
          };
      };
      this.processAll = function (system) {
          return system;
      };
      this.addEntityHook = function (entity) {
          return entity;
      };
      this.deleteEntityHook = function (entity) {
          return entity;
      };
      return this;
  };
  function makeAnimationSystem() {
      var _js2048 = arguments.length;
      for (var n2047 = 0; n2047 < _js2048; n2047 += 2) {
          switch (arguments[n2047]) {
          case 'enable':
              enable = arguments[n2047 + 1];
              break;
          case 'target-entities':
              targetEntities = arguments[n2047 + 1];
              break;
          case 'target-component-types':
              targetComponentTypes = arguments[n2047 + 1];
              break;
          case 'process':
              process = arguments[n2047 + 1];
              break;
          case 'process-all':
              processAll = arguments[n2047 + 1];
              break;
          case 'add-entity-hook':
              addEntityHook = arguments[n2047 + 1];
              break;
          case 'delete-entity-hook':
              deleteEntityHook = arguments[n2047 + 1];
          };
      };
      var enable = 'undefined' === typeof enable ? true : enable;
      var targetEntities = 'undefined' === typeof targetEntities ? [] : targetEntities;
      var targetComponentTypes = 'undefined' === typeof targetComponentTypes ? [animation2d] : targetComponentTypes;
      var process = 'undefined' === typeof process ? function (entity) {
          for (var anime = null, _js_arrvar2050 = entity.components, _js_idx2049 = 0; _js_idx2049 < _js_arrvar2050.length; _js_idx2049 += 1) {
              anime = _js_arrvar2050[_js_idx2049];
              if ((anime instanceof (typeof animation2d === 'string' ? eval(animation2d) : animation2d))) {
                  runAnimationProcess(anime);
              };
          };
      } : process;
      var processAll = 'undefined' === typeof processAll ? function (system) {
          return system;
      } : processAll;
      var addEntityHook = 'undefined' === typeof addEntityHook ? function (entity) {
          return entity;
      } : addEntityHook;
      var deleteEntityHook = 'undefined' === typeof deleteEntityHook ? function (entity) {
          return entity;
      } : deleteEntityHook;
      var result = new animationSystem();
      result.enable = enable;
      result.targetEntities = targetEntities;
      result.targetComponentTypes = targetComponentTypes;
      result.process = process;
      result.processAll = processAll;
      result.addEntityHook = addEntityHook;
      result.deleteEntityHook = deleteEntityHook;
      __PS_MV_REG = [];
      return result;
  };
  function animationSystemP(obj) {
      return (obj instanceof animationSystem);
  };
  (function () {
      var tempCtor = function () {
          return null;
      };
      tempCtor.prototype = ecsSystem.prototype;
      animationSystem.superClass_ = ecsSystem.prototype;
      animationSystem.prototype = new tempCtor();
      __PS_MV_REG = [];
      return animationSystem.prototype.constructor = animationSystem;
  })();
  function simpleMoveSystem() {
      this.enable = true;
      this.targetEntities = [];
      this.targetComponentTypes = [point2d, speed2d];
      this.process = function (entity) {
          var point2d2051 = (found = getEcsComponent(point2d, entity), found ? found : (function () {
              throw 'POINT-2D is not included in the entity';
          })());
          var speed2d2052 = (found2053 = getEcsComponent(speed2d, entity), found2053 ? found2053 : (function () {
              throw 'SPEED-2D is not included in the entity';
          })());
          __PS_MV_REG = [];
          return incfVector2d(point2d2051, speed2d2052);
      };
      this.processAll = function (system) {
          return system;
      };
      this.addEntityHook = function (entity) {
          return entity;
      };
      this.deleteEntityHook = function (entity) {
          return entity;
      };
      return this;
  };
  function makeSimpleMoveSystem() {
      var _js2055 = arguments.length;
      for (var n2054 = 0; n2054 < _js2055; n2054 += 2) {
          switch (arguments[n2054]) {
          case 'enable':
              enable = arguments[n2054 + 1];
              break;
          case 'target-entities':
              targetEntities = arguments[n2054 + 1];
              break;
          case 'target-component-types':
              targetComponentTypes = arguments[n2054 + 1];
              break;
          case 'process':
              process = arguments[n2054 + 1];
              break;
          case 'process-all':
              processAll = arguments[n2054 + 1];
              break;
          case 'add-entity-hook':
              addEntityHook = arguments[n2054 + 1];
              break;
          case 'delete-entity-hook':
              deleteEntityHook = arguments[n2054 + 1];
          };
      };
      var enable = 'undefined' === typeof enable ? true : enable;
      var targetEntities = 'undefined' === typeof targetEntities ? [] : targetEntities;
      var targetComponentTypes = 'undefined' === typeof targetComponentTypes ? [point2d, speed2d] : targetComponentTypes;
      var process = 'undefined' === typeof process ? function (entity) {
          var point2d2056 = (found = getEcsComponent(point2d, entity), found ? found : (function () {
              throw 'POINT-2D is not included in the entity';
          })());
          var speed2d2057 = (found2058 = getEcsComponent(speed2d, entity), found2058 ? found2058 : (function () {
              throw 'SPEED-2D is not included in the entity';
          })());
          __PS_MV_REG = [];
          return incfVector2d(point2d2056, speed2d2057);
      } : process;
      var processAll = 'undefined' === typeof processAll ? function (system) {
          return system;
      } : processAll;
      var addEntityHook = 'undefined' === typeof addEntityHook ? function (entity) {
          return entity;
      } : addEntityHook;
      var deleteEntityHook = 'undefined' === typeof deleteEntityHook ? function (entity) {
          return entity;
      } : deleteEntityHook;
      var result = new simpleMoveSystem();
      result.enable = enable;
      result.targetEntities = targetEntities;
      result.targetComponentTypes = targetComponentTypes;
      result.process = process;
      result.processAll = processAll;
      result.addEntityHook = addEntityHook;
      result.deleteEntityHook = deleteEntityHook;
      __PS_MV_REG = [];
      return result;
  };
  function simpleMoveSystemP(obj) {
      return (obj instanceof simpleMoveSystem);
  };
  (function () {
      var tempCtor = function () {
          return null;
      };
      tempCtor.prototype = ecsSystem.prototype;
      simpleMoveSystem.superClass_ = ecsSystem.prototype;
      simpleMoveSystem.prototype = new tempCtor();
      __PS_MV_REG = [];
      return simpleMoveSystem.prototype.constructor = simpleMoveSystem;
  })();
  /* --- extern symbols --- */
  return {
    'scriptSystem': scriptSystem,
    'makeScriptSystem': makeScriptSystem,
    'animationSystem': animationSystem,
    'makeAnimationSystem': makeAnimationSystem,
    'makeSimpleMoveSystem': makeSimpleMoveSystem,
    '_internal': {
      'scriptSystemP': scriptSystemP,
      'animationSystemP': animationSystemP,
      'simpleMoveSystem': simpleMoveSystem,
      'simpleMoveSystemP': simpleMoveSystemP,
    }
  };
})();

var clWeb2dGame_core_initializer = (function() {
  /* --- import symbols --- */
  var dumpPerformanceCounter = clWeb2dGame_utils_debug_performance.dumpPerformanceCounter;
  var addToMonitoringLog = clWeb2dGame_utils_debug_logger.addToMonitoringLog;
  var initEventLogArea = clWeb2dGame_utils_debug_logger.initEventLogArea;
  var initMonitoringLog = clWeb2dGame_utils_debug_logger.initMonitoringLog;
  var MAXEVENTLOGCOUNT = clWeb2dGame_utils_debug_logger.MAXEVENTLOGCOUNT;
  var addToEventLog = clWeb2dGame_utils_debug_logger.addToEventLog;
  var clearMonitoringLog = clWeb2dGame_utils_debug_logger.clearMonitoringLog;
  var setConsoleLogLevel = clWeb2dGame_utils_debug_logger.setConsoleLogLevel;
  var CONSOLELOGFUNCTION = clWeb2dGame_utils_debug_logger.CONSOLELOGFUNCTION;
  var keyDownCount = clWeb2dGame_inputs_input.keyDownCount;
  var getTouchX = clWeb2dGame_inputs_input.getTouchX;
  var addMouseMoveCallback = clWeb2dGame_inputs_input.addMouseMoveCallback;
  var getTotalTouchState = clWeb2dGame_inputs_input.getTotalTouchState;
  var addMouseWheelCallback = clWeb2dGame_inputs_input.addMouseWheelCallback;
  var getMouseUpCount = clWeb2dGame_inputs_input.getMouseUpCount;
  var getMouseX = clWeb2dGame_inputs_input.getMouseX;
  var getMouseState = clWeb2dGame_inputs_input.getMouseState;
  var processInput = clWeb2dGame_inputs_input.processInput;
  var getLeftMouseState = clWeb2dGame_inputs_input.getLeftMouseState;
  var initInput = clWeb2dGame_inputs_input.initInput;
  var getMouseY = clWeb2dGame_inputs_input.getMouseY;
  var keyUpP = clWeb2dGame_inputs_input.keyUpP;
  var keyUpNowP = clWeb2dGame_inputs_input.keyUpNowP;
  var getTouchState = clWeb2dGame_inputs_input.getTouchState;
  var addMouseDownCallback = clWeb2dGame_inputs_input.addMouseDownCallback;
  var keyDownP = clWeb2dGame_inputs_input.keyDownP;
  var getTotalTouchY = clWeb2dGame_inputs_input.getTotalTouchY;
  var getTouchY = clWeb2dGame_inputs_input.getTouchY;
  var getTotalTouchX = clWeb2dGame_inputs_input.getTotalTouchX;
  var addTouchEndCallback = clWeb2dGame_inputs_input.addTouchEndCallback;
  var addMouseUpCallback = clWeb2dGame_inputs_input.addMouseUpCallback;
  var addTouchStartCallback = clWeb2dGame_inputs_input.addTouchStartCallback;
  var startKeyMonitoring = clWeb2dGame_inputs_input.startKeyMonitoring;
  var getMouseDownCount = clWeb2dGame_inputs_input.getMouseDownCount;
  var keyUpCount = clWeb2dGame_inputs_input.keyUpCount;
  var getRightMouseState = clWeb2dGame_inputs_input.getRightMouseState;
  var getMouseWheelDeltaY = clWeb2dGame_inputs_input.getMouseWheelDeltaY;
  var addTouchMoveCallback = clWeb2dGame_inputs_input.addTouchMoveCallback;
  var keyDownNowP = clWeb2dGame_inputs_input.keyDownNowP;
  var getPhysicalKeyName = clWeb2dGame_inputs_input.getPhysicalKeyName;
  var makeCollisionSystem = clWeb2dGame_physics_collisionSystem.makeCollisionSystem;
  var setfColliderModelColor = clWeb2dGame_physics_collisionSystem.setfColliderModelColor;
  var setfColliderModelDepth = clWeb2dGame_physics_collisionSystem.setfColliderModelDepth;
  var collisionSystem = clWeb2dGame_physics_collisionSystem.collisionSystem;
  var setfColliderModelEnable = clWeb2dGame_physics_collisionSystem.setfColliderModelEnable;
  var physicPolygon = clWeb2dGame_physics_collision.physicPolygon;
  var makePhysicCircle = clWeb2dGame_physics_collision.makePhysicCircle;
  var updateBoundingBox = clWeb2dGame_physics_collision.updateBoundingBox;
  var physicCircle = clWeb2dGame_physics_collision.physicCircle;
  var colTwoBoundingBoxP = clWeb2dGame_physics_collision.colTwoBoundingBoxP;
  var collidePhysicsP = clWeb2dGame_physics_collision.collidePhysicsP;
  var makePhysicRect = clWeb2dGame_physics_collision.makePhysicRect;
  var physic2d = clWeb2dGame_physics_collision.physic2d;
  var boundingBox2d = clWeb2dGame_physics_collision.boundingBox2d;
  var makePhysicPolygon = clWeb2dGame_physics_collision.makePhysicPolygon;
  var makeBoundingBox2d = clWeb2dGame_physics_collision.makeBoundingBox2d;
  var makePhysic2d = clWeb2dGame_physics_collision.makePhysic2d;
  var judgeCollisionTargetTags = clWeb2dGame_physics_collision.judgeCollisionTargetTags;
  var collideEntitiesP = clWeb2dGame_physics_collision.collideEntitiesP;
  var initDrawModelSystem = clWeb2dGame_graphics_drawModelSystem.initDrawModelSystem;
  var model2dP = clWeb2dGame_graphics_drawModelSystem.model2dP;
  var makeModel2d = clWeb2dGame_graphics_drawModelSystem.makeModel2d;
  var updateModel2d = clWeb2dGame_graphics_drawModelSystem.updateModel2d;
  var findModel2dByLabel = clWeb2dGame_graphics_drawModelSystem.findModel2dByLabel;
  var disableModel2d = clWeb2dGame_graphics_drawModelSystem.disableModel2d;
  var enableModel2d = clWeb2dGame_graphics_drawModelSystem.enableModel2d;
  var model2d = clWeb2dGame_graphics_drawModelSystem.model2d;
  var animationSystem = clWeb2dGame_core_basicSystems.animationSystem;
  var scriptSystem = clWeb2dGame_core_basicSystems.scriptSystem;
  var makeScriptSystem = clWeb2dGame_core_basicSystems.makeScriptSystem;
  var makeSimpleMoveSystem = clWeb2dGame_core_basicSystems.makeSimpleMoveSystem;
  var makeAnimationSystem = clWeb2dGame_core_basicSystems.makeAnimationSystem;
  var rotate2d = clWeb2dGame_core_basicComponents.rotate2d;
  var rect2dP = clWeb2dGame_core_basicComponents.rect2dP;
  var speed2dP = clWeb2dGame_core_basicComponents.speed2dP;
  var point2d = clWeb2dGame_core_basicComponents.point2d;
  var makePoint2d = clWeb2dGame_core_basicComponents.makePoint2d;
  var makeVector2d = clWeb2dGame_core_basicComponents.makeVector2d;
  var setEntityParam = clWeb2dGame_core_basicComponents.setEntityParam;
  var copyPoint2dTo = clWeb2dGame_core_basicComponents.copyPoint2dTo;
  var getEntityParam = clWeb2dGame_core_basicComponents.getEntityParam;
  var initEntityParams = clWeb2dGame_core_basicComponents.initEntityParams;
  var copyVector2dTo = clWeb2dGame_core_basicComponents.copyVector2dTo;
  var speed2d = clWeb2dGame_core_basicComponents.speed2d;
  var rect2d = clWeb2dGame_core_basicComponents.rect2d;
  var cloneVector2d = clWeb2dGame_core_basicComponents.cloneVector2d;
  var params = clWeb2dGame_core_basicComponents.params;
  var makeRect2d = clWeb2dGame_core_basicComponents.makeRect2d;
  var makeScript2d = clWeb2dGame_core_basicComponents.makeScript2d;
  var makeSpeed2d = clWeb2dGame_core_basicComponents.makeSpeed2d;
  var clonePoint2d = clWeb2dGame_core_basicComponents.clonePoint2d;
  var point2dP = clWeb2dGame_core_basicComponents.point2dP;
  var vector2d = clWeb2dGame_core_basicComponents.vector2d;
  var vector2dP = clWeb2dGame_core_basicComponents.vector2dP;
  var rotate2dP = clWeb2dGame_core_basicComponents.rotate2dP;
  var script2d = clWeb2dGame_core_basicComponents.script2d;
  var makeRotate2d = clWeb2dGame_core_basicComponents.makeRotate2d;
  var deleteDeleteComponentHook = clPsEcs_ecs.deleteDeleteComponentHook;
  var makeEcsEntity = clPsEcs_ecs.makeEcsEntity;
  var addEcsComponent = clPsEcs_ecs.addEcsComponent;
  var ecsEntity = clPsEcs_ecs.ecsEntity;
  var deleteEcsComponentType = clPsEcs_ecs.deleteEcsComponentType;
  var framePromise = clPsEcs_framePromise.framePromise;
  var deleteEntityTag = clPsEcs_ecs.deleteEntityTag;
  var deleteEcsEntity = clPsEcs_ecs.deleteEcsEntity;
  var cleanEcsEnv = clPsEcs_ecs.cleanEcsEnv;
  var addDeleteComponentHook = clPsEcs_ecs.addDeleteComponentHook;
  var ecsMain = clPsEcs_ecs.ecsMain;
  var includesAllComponentTypes = clPsEcs_utils.includesAllComponentTypes;
  var findAComponent = clPsEcs_ecs.findAComponent;
  var registerNframesAfterFunc = clPsEcs_basicProcess.registerNframesAfterFunc;
  var moveEcsEntity = clPsEcs_ecs.moveEcsEntity;
  var ecsComponent = clPsEcs_ecs.ecsComponent;
  var popDefaultEcsEntityParent = clPsEcs_ecs.popDefaultEcsEntityParent;
  var framePromiseP = clPsEcs_framePromise.framePromiseP;
  var getEcsComponent = clPsEcs_ecs.getEcsComponent;
  var ecsSystem = clPsEcs_ecs.ecsSystem;
  var addEntityTag = clPsEcs_ecs.addEntityTag;
  var ecsEntityP = clPsEcs_ecs.ecsEntityP;
  var registerEcsSystem = clPsEcs_ecs.registerEcsSystem;
  var registerFuncWithPred = clPsEcs_basicProcess.registerFuncWithPred;
  var addEcsEntityToBuffer = clPsEcs_ecs.addEcsEntityToBuffer;
  var checkEntityTags = clPsEcs_ecs.checkEntityTags;
  var initFramePromise = clPsEcs_framePromise.initFramePromise;
  var framePromiseThen = clPsEcs_framePromise.framePromiseThen;
  var addEcsEntity = clPsEcs_ecs.addEcsEntity;
  var registerNextFrameFunc = clPsEcs_basicProcess.registerNextFrameFunc;
  var findAEntityByTag = clPsEcs_ecs.findAEntityByTag;
  var stackDefaultEcsEntityParent = clPsEcs_ecs.stackDefaultEcsEntityParent;
  var addEcsComponentList = clPsEcs_ecs.addEcsComponentList;
  var framePromiseAll = clPsEcs_framePromise.framePromiseAll;
  var findTheEntity = clPsEcs_ecs.findTheEntity;
  var findAEntity = clPsEcs_ecs.findAEntity;
  var hasEntityTag = clPsEcs_ecs.hasEntityTag;
  var deleteEcsComponent = clPsEcs_ecs.deleteEcsComponent;
  var getDefaultEcsEntityParent = clPsEcs_ecs.getDefaultEcsEntityParent;
  var initUiSystem = clWeb2dGame_inputs_ui.initUiSystem;
  /* --- define objects --- */
  if ('undefined' === typeof STATS) {
      var STATS = null;
  };
  function initStats(statsDom) {
      STATS = new Stats();
      var stats = STATS;
      stats.setMode(0);
      var object2059 = stats.domElement.style;
      object2059.position = 'absolute';
      object2059.left = '0px';
      object2059.top = '0px';
      document.getElementById('stats-output').appendChild(stats.domElement);
      __PS_MV_REG = [];
      return stats;
  };
  function updateStats() {
      __PS_MV_REG = [];
      return STATS ? STATS.update() : null;
  };
  function initDefaultSystems() {
      var _js2061 = arguments.length;
      for (var n2060 = 0; n2060 < _js2061; n2060 += 2) {
          switch (arguments[n2060]) {
          case 'scene':
              scene = arguments[n2060 + 1];
              break;
          case 'script-system':
              scriptSystem = arguments[n2060 + 1];
              break;
          case 'draw-system':
              drawSystem = arguments[n2060 + 1];
              break;
          case 'animation-system':
              animationSystem = arguments[n2060 + 1];
              break;
          case 'collision-system':
              collisionSystem = arguments[n2060 + 1];
              break;
          case 'simple-move-system':
              simpleMoveSystem = arguments[n2060 + 1];
              break;
          case 'ui-system':
              uiSystem = arguments[n2060 + 1];
          };
      };
      var scene;
      var scriptSystem = 'undefined' === typeof scriptSystem ? true : scriptSystem;
      var drawSystem = 'undefined' === typeof drawSystem ? true : drawSystem;
      var animationSystem = 'undefined' === typeof animationSystem ? true : animationSystem;
      var collisionSystem = 'undefined' === typeof collisionSystem ? true : collisionSystem;
      var simpleMoveSystem = 'undefined' === typeof simpleMoveSystem ? true : simpleMoveSystem;
      var uiSystem = 'undefined' === typeof uiSystem ? true : uiSystem;
      if (scriptSystem) {
          registerEcsSystem('script2d', makeScriptSystem());
      };
      if (collisionSystem) {
          registerEcsSystem('collision', makeCollisionSystem());
      };
      if (animationSystem) {
          registerEcsSystem('animation', makeAnimationSystem());
      };
      if (drawSystem) {
          registerEcsSystem('draw2d', initDrawModelSystem(scene));
      };
      if (simpleMoveSystem) {
          registerEcsSystem('simple-move', makeSimpleMoveSystem());
      };
      __PS_MV_REG = [];
      return uiSystem ? registerEcsSystem('ui', initUiSystem()) : null;
  };
  if ('undefined' === typeof RESIZETOSCREENP) {
      var RESIZETOSCREENP = null;
  };
  if ('undefined' === typeof WINDOWHEIGHTADJUST) {
      var WINDOWHEIGHTADJUST = 14;
  };
  function initializeScreenSize(renderedDom, renderer, screenWidth, screenHeight, resizeToScreenP) {
      RESIZETOSCREENP = resizeToScreenP;
      var calcScale = function () {
          __PS_MV_REG = [];
          return Math.min(window.innerWidth / screenWidth, (window.innerHeight - WINDOWHEIGHTADJUST) / screenHeight);
      };
      var setPositionBySize = function (width, height) {
          renderedDom.style.position = 'absolute';
          renderedDom.style.left = (window.innerWidth - width) / 2 + 'px';
          return renderedDom.style.top = (window.innerHeight - height) / 2 + 'px';
      };
      var setSize = function (width, height) {
          renderer.setSize(width, height);
          __PS_MV_REG = [];
          return setPositionBySize(width, height);
      };
      var resize = function () {
          var scale = RESIZETOSCREENP ? calcScale() : 1;
          __PS_MV_REG = [];
          return setSize(screenWidth * scale, screenHeight * scale);
      };
      resize();
      var resizeTimer = null;
      __PS_MV_REG = [];
      return window.addEventListener('resize', function (e) {
          if (resizeTimer) {
              clearTimeout(resizeTimer);
          };
          __PS_MV_REG = [];
          return resizeTimer = setTimeout(function () {
              __PS_MV_REG = [];
              return resize();
          }, 100);
      });
  };
  /**
   * Entry point for starting game.
   * We assume that the camera is initalized using cl-web-2d-game[.camera]:init-camera.
   */
  function start2dGame() {
      var _js2063 = arguments.length;
      for (var n2062 = 0; n2062 < _js2063; n2062 += 2) {
          switch (arguments[n2062]) {
          case 'screen-width':
              screenWidth = arguments[n2062 + 1];
              break;
          case 'screen-height':
              screenHeight = arguments[n2062 + 1];
              break;
          case 'camera':
              camera = arguments[n2062 + 1];
              break;
          case 'rendered-dom':
              renderedDom = arguments[n2062 + 1];
              break;
          case 'stats-dom':
              statsDom = arguments[n2062 + 1];
              break;
          case 'monitoring-log-dom':
              monitoringLogDom = arguments[n2062 + 1];
              break;
          case 'event-log-dom':
              eventLogDom = arguments[n2062 + 1];
              break;
          case 'resize-to-screen-p':
              resizeToScreenP = arguments[n2062 + 1];
              break;
          case 'init-function':
              initFunction = arguments[n2062 + 1];
              break;
          case 'update-function':
              updateFunction = arguments[n2062 + 1];
          };
      };
      var screenWidth;
      var screenHeight;
      var camera;
      var renderedDom;
      var statsDom;
      var monitoringLogDom;
      var eventLogDom;
      var resizeToScreenP;
      var initFunction = 'undefined' === typeof initFunction ? function (scene) {
          return null;
      } : initFunction;
      var updateFunction = 'undefined' === typeof updateFunction ? function () {
          return null;
      } : updateFunction;
      var scene = new THREE.Scene();
      var renderer = new THREE.WebGLRenderer;
      clWeb2dGame_utils_domManager._internal.DOMSTORE['render'] = renderedDom;
      if (statsDom) {
          initStats(statsDom);
      };
      initMonitoringLog(monitoringLogDom);
      initEventLogArea(eventLogDom);
      initializeScreenSize(renderedDom, renderer, screenWidth, screenHeight, resizeToScreenP);
      renderedDom.appendChild(renderer.domElement);
      var light = new THREE.DirectionalLight(0xffffff);
      light.position.set(0, 0.7, 0.7);
      scene.add(light);
      initFunction(scene);
      var renderLoop = function () {
          requestAnimationFrame(renderLoop);
          var prevNode1125 = clWeb2dGame_utils_debug_performance._internal.PERFORMANCETIMER.currentNode;
          try {
              var before1126 = performance.now();
              var element1127 = clWeb2dGame_utils_debug_performance._internal.pickPerformanceTimerElement('loop-top', 0);
              var prevNode1128 = clWeb2dGame_utils_debug_performance._internal.PERFORMANCETIMER.currentNode;
              try {
                  var before1129 = performance.now();
                  var element1130 = clWeb2dGame_utils_debug_performance._internal.pickPerformanceTimerElement('render', 0);
                  var scope = WTF.trace.enterScope('render');
                  renderer.render(scene, camera);
                  WTF.trace.leaveScope(scope, 'render');
                  clWeb2dGame_utils_debug_performance._internal.pushToRingBuffer(performance.now() - before1129, element1130.results);
              } finally {
                  clWeb2dGame_utils_debug_performance._internal.PERFORMANCETIMER.currentNode = prevNode1128;
              };
              updateStats();
              var prevNode1131 = clWeb2dGame_utils_debug_performance._internal.PERFORMANCETIMER.currentNode;
              try {
                  var before1132 = performance.now();
                  var element1133 = clWeb2dGame_utils_debug_performance._internal.pickPerformanceTimerElement('update', 0);
                  var scope2064 = WTF.trace.enterScope('update');
                  clearMonitoringLog();
                  processInput();
                  ecsMain();
                  updateFunction();
                  WTF.trace.leaveScope(scope2064, 'update');
                  clWeb2dGame_utils_debug_performance._internal.pushToRingBuffer(performance.now() - before1132, element1133.results);
              } finally {
                  clWeb2dGame_utils_debug_performance._internal.PERFORMANCETIMER.currentNode = prevNode1131;
              };
              clWeb2dGame_utils_debug_performance._internal.pushToRingBuffer(performance.now() - before1126, element1127.results);
          } finally {
              clWeb2dGame_utils_debug_performance._internal.PERFORMANCETIMER.currentNode = prevNode1125;
          };
          __PS_MV_REG = [];
          return addToMonitoringLog(dumpPerformanceCounter());
      };
      __PS_MV_REG = [];
      return renderLoop();
  };
  /* --- extern symbols --- */
  return {
    'initDefaultSystems': initDefaultSystems,
    'start2dGame': start2dGame,
    '_internal': {
      'STATS': STATS,
      'initStats': initStats,
      'updateStats': updateStats,
      'RESIZETOSCREENP': RESIZETOSCREENP,
      'WINDOWHEIGHTADJUST': WINDOWHEIGHTADJUST,
      'initializeScreenSize': initializeScreenSize,
    }
  };
})();

var clWeb2dGame_utils_debug_debugDrawer = (function() {
  /* --- import symbols --- */
  var initDrawModelSystem = clWeb2dGame_graphics_drawModelSystem.initDrawModelSystem;
  var model2dP = clWeb2dGame_graphics_drawModelSystem.model2dP;
  var makeModel2d = clWeb2dGame_graphics_drawModelSystem.makeModel2d;
  var updateModel2d = clWeb2dGame_graphics_drawModelSystem.updateModel2d;
  var findModel2dByLabel = clWeb2dGame_graphics_drawModelSystem.findModel2dByLabel;
  var disableModel2d = clWeb2dGame_graphics_drawModelSystem.disableModel2d;
  var enableModel2d = clWeb2dGame_graphics_drawModelSystem.enableModel2d;
  var model2d = clWeb2dGame_graphics_drawModelSystem.model2d;
  var makeWiredCircle = clWeb2dGame_graphics_2dGeometry.makeWiredCircle;
  var changeGeometryUvs = clWeb2dGame_graphics_2dGeometry.changeGeometryUvs;
  var makeTextModelPromise = clWeb2dGame_graphics_2dGeometry.makeTextModelPromise;
  var makeTextureModel = clWeb2dGame_graphics_2dGeometry.makeTextureModel;
  var makeSolidCircle = clWeb2dGame_graphics_2dGeometry.makeSolidCircle;
  var makeWiredRect = clWeb2dGame_graphics_2dGeometry.makeWiredRect;
  var makeWiredPolygon = clWeb2dGame_graphics_2dGeometry.makeWiredPolygon;
  var makeSolidPolygon = clWeb2dGame_graphics_2dGeometry.makeSolidPolygon;
  var makeLines = clWeb2dGame_graphics_2dGeometry.makeLines;
  var makeTextureModelPromise = clWeb2dGame_graphics_2dGeometry.makeTextureModelPromise;
  var changeModelColor = clWeb2dGame_graphics_2dGeometry.changeModelColor;
  var makeLine = clWeb2dGame_graphics_2dGeometry.makeLine;
  var getMeshSize = clWeb2dGame_graphics_2dGeometry.getMeshSize;
  var makeSolidRect = clWeb2dGame_graphics_2dGeometry.makeSolidRect;
  var makeWiredRegularPolygon = clWeb2dGame_graphics_2dGeometry.makeWiredRegularPolygon;
  var getMeshHeight = clWeb2dGame_graphics_2dGeometry.getMeshHeight;
  var getMeshWidth = clWeb2dGame_graphics_2dGeometry.getMeshWidth;
  var makeSolidRegularPolygon = clWeb2dGame_graphics_2dGeometry.makeSolidRegularPolygon;
  var rotate2d = clWeb2dGame_core_basicComponents.rotate2d;
  var rect2dP = clWeb2dGame_core_basicComponents.rect2dP;
  var speed2dP = clWeb2dGame_core_basicComponents.speed2dP;
  var point2d = clWeb2dGame_core_basicComponents.point2d;
  var makePoint2d = clWeb2dGame_core_basicComponents.makePoint2d;
  var makeVector2d = clWeb2dGame_core_basicComponents.makeVector2d;
  var setEntityParam = clWeb2dGame_core_basicComponents.setEntityParam;
  var copyPoint2dTo = clWeb2dGame_core_basicComponents.copyPoint2dTo;
  var getEntityParam = clWeb2dGame_core_basicComponents.getEntityParam;
  var initEntityParams = clWeb2dGame_core_basicComponents.initEntityParams;
  var copyVector2dTo = clWeb2dGame_core_basicComponents.copyVector2dTo;
  var speed2d = clWeb2dGame_core_basicComponents.speed2d;
  var rect2d = clWeb2dGame_core_basicComponents.rect2d;
  var cloneVector2d = clWeb2dGame_core_basicComponents.cloneVector2d;
  var params = clWeb2dGame_core_basicComponents.params;
  var makeRect2d = clWeb2dGame_core_basicComponents.makeRect2d;
  var makeScript2d = clWeb2dGame_core_basicComponents.makeScript2d;
  var makeSpeed2d = clWeb2dGame_core_basicComponents.makeSpeed2d;
  var clonePoint2d = clWeb2dGame_core_basicComponents.clonePoint2d;
  var point2dP = clWeb2dGame_core_basicComponents.point2dP;
  var vector2d = clWeb2dGame_core_basicComponents.vector2d;
  var vector2dP = clWeb2dGame_core_basicComponents.vector2dP;
  var rotate2dP = clWeb2dGame_core_basicComponents.rotate2dP;
  var script2d = clWeb2dGame_core_basicComponents.script2d;
  var makeRotate2d = clWeb2dGame_core_basicComponents.makeRotate2d;
  var deleteDeleteComponentHook = clPsEcs_ecs.deleteDeleteComponentHook;
  var makeEcsEntity = clPsEcs_ecs.makeEcsEntity;
  var addEcsComponent = clPsEcs_ecs.addEcsComponent;
  var ecsEntity = clPsEcs_ecs.ecsEntity;
  var deleteEcsComponentType = clPsEcs_ecs.deleteEcsComponentType;
  var framePromise = clPsEcs_framePromise.framePromise;
  var deleteEntityTag = clPsEcs_ecs.deleteEntityTag;
  var deleteEcsEntity = clPsEcs_ecs.deleteEcsEntity;
  var cleanEcsEnv = clPsEcs_ecs.cleanEcsEnv;
  var addDeleteComponentHook = clPsEcs_ecs.addDeleteComponentHook;
  var ecsMain = clPsEcs_ecs.ecsMain;
  var includesAllComponentTypes = clPsEcs_utils.includesAllComponentTypes;
  var findAComponent = clPsEcs_ecs.findAComponent;
  var registerNframesAfterFunc = clPsEcs_basicProcess.registerNframesAfterFunc;
  var moveEcsEntity = clPsEcs_ecs.moveEcsEntity;
  var ecsComponent = clPsEcs_ecs.ecsComponent;
  var popDefaultEcsEntityParent = clPsEcs_ecs.popDefaultEcsEntityParent;
  var framePromiseP = clPsEcs_framePromise.framePromiseP;
  var getEcsComponent = clPsEcs_ecs.getEcsComponent;
  var ecsSystem = clPsEcs_ecs.ecsSystem;
  var addEntityTag = clPsEcs_ecs.addEntityTag;
  var ecsEntityP = clPsEcs_ecs.ecsEntityP;
  var registerEcsSystem = clPsEcs_ecs.registerEcsSystem;
  var registerFuncWithPred = clPsEcs_basicProcess.registerFuncWithPred;
  var addEcsEntityToBuffer = clPsEcs_ecs.addEcsEntityToBuffer;
  var checkEntityTags = clPsEcs_ecs.checkEntityTags;
  var initFramePromise = clPsEcs_framePromise.initFramePromise;
  var framePromiseThen = clPsEcs_framePromise.framePromiseThen;
  var addEcsEntity = clPsEcs_ecs.addEcsEntity;
  var registerNextFrameFunc = clPsEcs_basicProcess.registerNextFrameFunc;
  var findAEntityByTag = clPsEcs_ecs.findAEntityByTag;
  var stackDefaultEcsEntityParent = clPsEcs_ecs.stackDefaultEcsEntityParent;
  var addEcsComponentList = clPsEcs_ecs.addEcsComponentList;
  var framePromiseAll = clPsEcs_framePromise.framePromiseAll;
  var findTheEntity = clPsEcs_ecs.findTheEntity;
  var findAEntity = clPsEcs_ecs.findAEntity;
  var hasEntityTag = clPsEcs_ecs.hasEntityTag;
  var deleteEcsComponent = clPsEcs_ecs.deleteEcsComponent;
  var getDefaultEcsEntityParent = clPsEcs_ecs.getDefaultEcsEntityParent;
  /* --- define objects --- */
  function drawDebugModel() {
      var _js2066 = arguments.length;
      for (var n2065 = 0; n2065 < _js2066; n2065 += 2) {
          switch (arguments[n2065]) {
          case 'model':
              model = arguments[n2065 + 1];
              break;
          case 'point':
              point = arguments[n2065 + 1];
              break;
          case 'tag-list':
              tagList = arguments[n2065 + 1];
              break;
          case 'parent':
              parent = arguments[n2065 + 1];
              break;
          case 'fn-delete-condition':
              fnDeleteCondition = arguments[n2065 + 1];
          };
      };
      var model;
      var point;
      var tagList = 'undefined' === typeof tagList ? [] : tagList;
      var parent;
      var fnDeleteCondition;
      if (!((model instanceof (typeof model2d === 'string' ? eval(model2d) : model2d)))) {
          throw '\'TYPE-ERROR: (The place is \'MODEL\'. The expected type is \'MODEL-2D\')';
      };
      if (!((point instanceof (typeof vector2d === 'string' ? eval(vector2d) : vector2d)))) {
          throw '\'TYPE-ERROR: (The place is \'POINT\'. The expected type is \'VECTOR-2D\')';
      };
      if (parent) {
          if (!((parent instanceof (typeof ecsEntity === 'string' ? eval(ecsEntity) : ecsEntity)))) {
              throw '\'TYPE-ERROR: (The place is \'PARENT\'. The expected type is \'ECS-ENTITY\')';
          };
      };
      var entity = makeEcsEntity();
      var truePoint = (point instanceof (typeof point2d === 'string' ? eval(point2d) : point2d)) ? point : makePoint2d('x', point.x, 'y', point.y);
      for (var tag = null, _js_idx2067 = 0; _js_idx2067 < tagList.length; _js_idx2067 += 1) {
          tag = tagList[_js_idx2067];
          addEntityTag(entity, tag);
      };
      addEcsComponentList(entity, truePoint, model, makeScript2d('func', function (entity) {
          __PS_MV_REG = [];
          return fnDeleteCondition(entity) ? registerNextFrameFunc(function () {
              __PS_MV_REG = [];
              return deleteEcsEntity(entity);
          }) : null;
      }));
      __PS_MV_REG = [];
      return registerNextFrameFunc(function () {
          __PS_MV_REG = [];
          return addEcsEntity(entity, parent);
      });
  };
  if ('undefined' === typeof STANDARDDEBUGCOLOR) {
      var STANDARDDEBUGCOLOR = 16711680;
  };
  if ('undefined' === typeof STANDARDDEBUGDEPTH) {
      var STANDARDDEBUGDEPTH = 100;
  };
  if ('undefined' === typeof STANDARDDEBUGPOINTR) {
      var STANDARDDEBUGPOINTR = 4;
  };
  function drawDebugPoint() {
      var _js2069 = arguments.length;
      for (var n2068 = 0; n2068 < _js2069; n2068 += 2) {
          switch (arguments[n2068]) {
          case 'point':
              point = arguments[n2068 + 1];
              break;
          case 'tag-list':
              tagList = arguments[n2068 + 1];
              break;
          case 'parent':
              parent = arguments[n2068 + 1];
              break;
          case 'r':
              r = arguments[n2068 + 1];
              break;
          case 'fn-delete-condition':
              fnDeleteCondition = arguments[n2068 + 1];
          };
      };
      var point;
      var tagList = 'undefined' === typeof tagList ? [] : tagList;
      var parent;
      var r = 'undefined' === typeof r ? STANDARDDEBUGPOINTR : r;
      var fnDeleteCondition;
      __PS_MV_REG = [];
      return drawDebugModel('model', makeModel2d('model', makeWiredRegularPolygon('n', 60, 'r', r, 'color', STANDARDDEBUGCOLOR), 'depth', STANDARDDEBUGDEPTH), 'point', point, 'tag-list', tagList, 'parent', parent, 'fn-delete-condition', fnDeleteCondition);
  };
  function drawDebugPointByTime() {
      var _js2071 = arguments.length;
      for (var n2070 = 0; n2070 < _js2071; n2070 += 2) {
          switch (arguments[n2070]) {
          case 'point':
              point = arguments[n2070 + 1];
              break;
          case 'tag-list':
              tagList = arguments[n2070 + 1];
              break;
          case 'parent':
              parent = arguments[n2070 + 1];
              break;
          case 'r':
              r = arguments[n2070 + 1];
              break;
          case 'time':
              time = arguments[n2070 + 1];
          };
      };
      var point;
      var tagList = 'undefined' === typeof tagList ? [] : tagList;
      var parent;
      var r = 'undefined' === typeof r ? STANDARDDEBUGPOINTR : r;
      var time = 'undefined' === typeof time ? 60 : time;
      __PS_MV_REG = [];
      return drawDebugPoint('point', point, 'tag-list', tagList, 'parent', parent, 'r', r, 'fn-delete-condition', makeFnTimerCondition(time));
  };
  function drawDebugLine() {
      var _js2073 = arguments.length;
      for (var n2072 = 0; n2072 < _js2073; n2072 += 2) {
          switch (arguments[n2072]) {
          case 'point1':
              point1 = arguments[n2072 + 1];
              break;
          case 'point2':
              point2 = arguments[n2072 + 1];
              break;
          case 'tag-list':
              tagList = arguments[n2072 + 1];
              break;
          case 'parent':
              parent = arguments[n2072 + 1];
              break;
          case 'fn-delete-condition':
              fnDeleteCondition = arguments[n2072 + 1];
          };
      };
      var point1;
      var point2;
      var tagList = 'undefined' === typeof tagList ? [] : tagList;
      var parent;
      var fnDeleteCondition;
      __PS_MV_REG = [];
      return drawDebugModel('model', makeModel2d('model', makeLine('pos-a', [point1.x, point1.y], 'pos-b', [point2.x, point2.y], 'color', STANDARDDEBUGCOLOR), 'depth', STANDARDDEBUGDEPTH), 'point', makePoint2d(), 'tag-list', tagList, 'parent', parent, 'fn-delete-condition', fnDeleteCondition);
  };
  function drawDebugLineByTime() {
      var _js2075 = arguments.length;
      for (var n2074 = 0; n2074 < _js2075; n2074 += 2) {
          switch (arguments[n2074]) {
          case 'point1':
              point1 = arguments[n2074 + 1];
              break;
          case 'point2':
              point2 = arguments[n2074 + 1];
              break;
          case 'tag-list':
              tagList = arguments[n2074 + 1];
              break;
          case 'parent':
              parent = arguments[n2074 + 1];
              break;
          case 'time':
              time = arguments[n2074 + 1];
          };
      };
      var point1;
      var point2;
      var tagList = 'undefined' === typeof tagList ? [] : tagList;
      var parent;
      var time = 'undefined' === typeof time ? 60 : time;
      __PS_MV_REG = [];
      return drawDebugLine('point1', point1, 'point2', point2, 'tag-list', tagList, 'parent', parent, 'fn-delete-condition', makeFnTimerCondition(time));
  };
  function makeFnTimerCondition(time) {
      return function (entity) {
          --time;
          return time <= 0;
      };
  };
  /* --- extern symbols --- */
  return {
    'STANDARDDEBUGCOLOR': STANDARDDEBUGCOLOR,
    'STANDARDDEBUGDEPTH': STANDARDDEBUGDEPTH,
    'STANDARDDEBUGPOINTR': STANDARDDEBUGPOINTR,
    'drawDebugPoint': drawDebugPoint,
    'drawDebugPointByTime': drawDebugPointByTime,
    'drawDebugLine': drawDebugLine,
    'drawDebugLineByTime': drawDebugLineByTime,
    '_internal': {
      'drawDebugModel': drawDebugModel,
      'makeFnTimerCondition': makeFnTimerCondition,
    }
  };
})();

var mogewebzou_game_state_globalInit = (function() {
  /* --- import symbols --- */
  var setfColliderModelDepth = clWeb2dGame_physics_collisionSystem.setfColliderModelDepth;
  var calcDistToLineSeg = clWeb2dGame_utils_calc.calcDistToLineSeg;
  var transformfPoint = clWeb2dGame_utils_calc.transformfPoint;
  var animation2d = clWeb2dGame_graphics_animation.animation2d;
  var makeLine = clWeb2dGame_graphics_2dGeometry.makeLine;
  var makeScriptSystem = clWeb2dGame_core_basicSystems.makeScriptSystem;
  var startReversedAnimation = clWeb2dGame_graphics_animation.startReversedAnimation;
  var getCameraOffsetY = clWeb2dGame_core_camera.getCameraOffsetY;
  var makeSolidCircle = clWeb2dGame_graphics_2dGeometry.makeSolidCircle;
  var keyUpP = clWeb2dGame_inputs_input.keyUpP;
  var getTouchX = clWeb2dGame_inputs_input.getTouchX;
  var boundingBox2d = clWeb2dGame_physics_collision.boundingBox2d;
  var enableAnimation = clWeb2dGame_graphics_animation.enableAnimation;
  var script2d = clWeb2dGame_core_basicComponents.script2d;
  var getTextAreaSize = clWeb2dGame_graphics_textArea.getTextAreaSize;
  var makeWiredCircle = clWeb2dGame_graphics_2dGeometry.makeWiredCircle;
  var rect2dP = clWeb2dGame_core_basicComponents.rect2dP;
  var changeGeometryUvs = clWeb2dGame_graphics_2dGeometry.changeGeometryUvs;
  var animationSystem = clWeb2dGame_core_basicSystems.animationSystem;
  var addToMonitoringLog = clWeb2dGame_utils_debug_logger.addToMonitoringLog;
  var addToEventLog = clWeb2dGame_utils_debug_logger.addToEventLog;
  var clonePoint2d = clWeb2dGame_core_basicComponents.clonePoint2d;
  var multfVecScalar = clWeb2dGame_utils_calc.multfVecScalar;
  var vector2d = clWeb2dGame_core_basicComponents.vector2d;
  var keyDownP = clWeb2dGame_inputs_input.keyDownP;
  var initDrawModelSystem = clWeb2dGame_graphics_drawModelSystem.initDrawModelSystem;
  var makeSolidRegularPolygon = clWeb2dGame_graphics_2dGeometry.makeSolidRegularPolygon;
  var initAnimationManager = clWeb2dGame_graphics_animationManager.initAnimationManager;
  var getScreenHeight = clWeb2dGame_core_camera.getScreenHeight;
  var makeSolidRect = clWeb2dGame_graphics_2dGeometry.makeSolidRect;
  var makeState = clWeb2dGame_core_gameState.makeState;
  var model2dP = clWeb2dGame_graphics_drawModelSystem.model2dP;
  var initGui = clWeb2dGame_inputs_gui.initGui;
  var makePoint2d = clWeb2dGame_core_basicComponents.makePoint2d;
  var drawDebugLineByTime = clWeb2dGame_utils_debug_debugDrawer.drawDebugLineByTime;
  var calcOuterProductZ = clWeb2dGame_utils_calc.calcOuterProductZ;
  var textAreaComponent = clWeb2dGame_graphics_textArea.textAreaComponent;
  var rotate2dP = clWeb2dGame_core_basicComponents.rotate2dP;
  var initAnimation2d = clWeb2dGame_graphics_animation.initAnimation2d;
  var texture2dP = clWeb2dGame_graphics_texture.texture2dP;
  var makeUiComponent = clWeb2dGame_inputs_ui.makeUiComponent;
  var divfVecScalar = clWeb2dGame_utils_calc.divfVecScalar;
  var truncateVector2d = clWeb2dGame_utils_calc.truncateVector2d;
  var vector2dAngle = clWeb2dGame_utils_calc.vector2dAngle;
  var getLeftMouseState = clWeb2dGame_inputs_input.getLeftMouseState;
  var runAnimationProcess = clWeb2dGame_graphics_animation.runAnimationProcess;
  var getMouseUpCount = clWeb2dGame_inputs_input.getMouseUpCount;
  var STANDARDDEBUGDEPTH = clWeb2dGame_utils_debug_debugDrawer.STANDARDDEBUGDEPTH;
  var calcDist = clWeb2dGame_utils_calc.calcDist;
  var makeSolidPolygon = clWeb2dGame_graphics_2dGeometry.makeSolidPolygon;
  var addPanelButton = clWeb2dGame_inputs_gui.addPanelButton;
  var startAnimation = clWeb2dGame_graphics_animation.startAnimation;
  var reverseAnimation = clWeb2dGame_graphics_animation.reverseAnimation;
  var truncatefVector2d = clWeb2dGame_utils_calc.truncatefVector2d;
  var gameStateManager = clWeb2dGame_core_gameState.gameStateManager;
  var STANDARDDEBUGPOINTR = clWeb2dGame_utils_debug_debugDrawer.STANDARDDEBUGPOINTR;
  var makePhysicCircle = clWeb2dGame_physics_collision.makePhysicCircle;
  var keyUpNowP = clWeb2dGame_inputs_input.keyUpNowP;
  var unloadTexture = clWeb2dGame_graphics_texture.unloadTexture;
  var reverseCurrentAnimation = clWeb2dGame_graphics_animationManager.reverseCurrentAnimation;
  var getMouseDownCount = clWeb2dGame_inputs_input.getMouseDownCount;
  var addPanelFolder = clWeb2dGame_inputs_gui.addPanelFolder;
  var rotateToTargetAngle = clWeb2dGame_utils_calc.rotateToTargetAngle;
  var stage = clWeb2dGame_utils_stageGenerator.stage;
  var addTextToArea = clWeb2dGame_graphics_textArea.addTextToArea;
  var makeBoundingBox2d = clWeb2dGame_physics_collision.makeBoundingBox2d;
  var disableAnimation = clWeb2dGame_graphics_animation.disableAnimation;
  var addMouseDownCallback = clWeb2dGame_inputs_input.addMouseDownCallback;
  var addTouchEndCallback = clWeb2dGame_inputs_input.addTouchEndCallback;
  var getRightMouseState = clWeb2dGame_inputs_input.getRightMouseState;
  var updateModel2d = clWeb2dGame_graphics_drawModelSystem.updateModel2d;
  var physic2d = clWeb2dGame_physics_collision.physic2d;
  var updateBoundingBox = clWeb2dGame_physics_collision.updateBoundingBox;
  var addPanelNumber = clWeb2dGame_inputs_gui.addPanelNumber;
  var texture2d = clWeb2dGame_graphics_texture.texture2d;
  var addMouseUpCallback = clWeb2dGame_inputs_input.addMouseUpCallback;
  var getFontPromise = clWeb2dGame_graphics_font.getFontPromise;
  var initEventLogArea = clWeb2dGame_utils_debug_logger.initEventLogArea;
  var disableModel2d = clWeb2dGame_graphics_drawModelSystem.disableModel2d;
  var setfVector2dAbs = clWeb2dGame_utils_calc.setfVector2dAbs;
  var gameState = clWeb2dGame_core_gameState.gameState;
  var physicPolygon = clWeb2dGame_physics_collision.physicPolygon;
  var processStage = clWeb2dGame_utils_stageGenerator.processStage;
  var getMouseX = clWeb2dGame_inputs_input.getMouseX;
  var drawDebugLine = clWeb2dGame_utils_debug_debugDrawer.drawDebugLine;
  var makeScript2d = clWeb2dGame_core_basicComponents.makeScript2d;
  var calcInnerProduct = clWeb2dGame_utils_calc.calcInnerProduct;
  var start2dGame = clWeb2dGame_core_initializer.start2dGame;
  var makeTextAreaComponent = clWeb2dGame_graphics_textArea.makeTextAreaComponent;
  var clearGuiPanel = clWeb2dGame_inputs_gui.clearGuiPanel;
  var animationManager = clWeb2dGame_graphics_animationManager.animationManager;
  var subVector2d = clWeb2dGame_utils_calc.subVector2d;
  var getMouseState = clWeb2dGame_inputs_input.getMouseState;
  var calcLocalPoint = clWeb2dGame_utils_calc.calcLocalPoint;
  var keyDownNowP = clWeb2dGame_inputs_input.keyDownNowP;
  var clearKvsAll = clWeb2dGame_utils_storage.clearKvsAll;
  var incfRotateDiff = clWeb2dGame_utils_calc.incfRotateDiff;
  var makeWiredRect = clWeb2dGame_graphics_2dGeometry.makeWiredRect;
  var processGameState = clWeb2dGame_core_gameState.processGameState;
  var lerpScalar = clWeb2dGame_utils_calc.lerpScalar;
  var removeKvs = clWeb2dGame_utils_storage.removeKvs;
  var setfColliderModelColor = clWeb2dGame_physics_collisionSystem.setfColliderModelColor;
  var point2d = clWeb2dGame_core_basicComponents.point2d;
  var vector2dP = clWeb2dGame_core_basicComponents.vector2dP;
  var startKeyMonitoring = clWeb2dGame_inputs_input.startKeyMonitoring;
  var makeCollisionSystem = clWeb2dGame_physics_collisionSystem.makeCollisionSystem;
  var speed2d = clWeb2dGame_core_basicComponents.speed2d;
  var initMonitoringLog = clWeb2dGame_utils_debug_logger.initMonitoringLog;
  var getTotalTouchState = clWeb2dGame_inputs_input.getTotalTouchState;
  var initGameState = clWeb2dGame_core_gameState.initGameState;
  var rotate2d = clWeb2dGame_core_basicComponents.rotate2d;
  var rect2d = clWeb2dGame_core_basicComponents.rect2d;
  var getMouseWheelDeltaY = clWeb2dGame_inputs_input.getMouseWheelDeltaY;
  var colTwoBoundingBoxP = clWeb2dGame_physics_collision.colTwoBoundingBoxP;
  var drawDebugPointByTime = clWeb2dGame_utils_debug_debugDrawer.drawDebugPointByTime;
  var vecScalar = clWeb2dGame_utils_calc.vecScalar;
  var movefVectorToCircle = clWeb2dGame_utils_calc.movefVectorToCircle;
  var makeLines = clWeb2dGame_graphics_2dGeometry.makeLines;
  var getMeshHeight = clWeb2dGame_graphics_2dGeometry.getMeshHeight;
  var STANDARDDEBUGCOLOR = clWeb2dGame_utils_debug_debugDrawer.STANDARDDEBUGCOLOR;
  var getTexture2dWidth = clWeb2dGame_graphics_texture.getTexture2dWidth;
  var addTouchMoveCallback = clWeb2dGame_inputs_input.addTouchMoveCallback;
  var stopAnimation = clWeb2dGame_graphics_animation.stopAnimation;
  var makePhysic2d = clWeb2dGame_physics_collision.makePhysic2d;
  var clearMonitoringLog = clWeb2dGame_utils_debug_logger.clearMonitoringLog;
  var initGameStateManager = clWeb2dGame_core_gameState.initGameStateManager;
  var setKvsPrefix = clWeb2dGame_utils_storage.setKvsPrefix;
  var addVector2d = clWeb2dGame_utils_calc.addVector2d;
  var changeModelColor = clWeb2dGame_graphics_2dGeometry.changeModelColor;
  var vector2dAbs = clWeb2dGame_utils_calc.vector2dAbs;
  var drawDebugPoint = clWeb2dGame_utils_debug_debugDrawer.drawDebugPoint;
  var incfVector2d = clWeb2dGame_utils_calc.incfVector2d;
  var getTouchY = clWeb2dGame_inputs_input.getTouchY;
  var getTexturePromise = clWeb2dGame_graphics_texture.getTexturePromise;
  var judgeCollisionTargetTags = clWeb2dGame_physics_collision.judgeCollisionTargetTags;
  var speed2dP = clWeb2dGame_core_basicComponents.speed2dP;
  var setEntityParam = clWeb2dGame_core_basicComponents.setEntityParam;
  var makeSimpleMoveSystem = clWeb2dGame_core_basicSystems.makeSimpleMoveSystem;
  var makeModel2d = clWeb2dGame_graphics_drawModelSystem.makeModel2d;
  var scriptSystem = clWeb2dGame_core_basicSystems.scriptSystem;
  var interruptGameState = clWeb2dGame_core_gameState.interruptGameState;
  var makeTextureModel = clWeb2dGame_graphics_2dGeometry.makeTextureModel;
  var addPanelBool = clWeb2dGame_inputs_gui.addPanelBool;
  var collidePhysicsP = clWeb2dGame_physics_collision.collidePhysicsP;
  var addMouseMoveCallback = clWeb2dGame_inputs_input.addMouseMoveCallback;
  var copyVector2dTo = clWeb2dGame_core_basicComponents.copyVector2dTo;
  var getMouseY = clWeb2dGame_inputs_input.getMouseY;
  var storeKvs = clWeb2dGame_utils_storage.storeKvs;
  var makeAnimationSystem = clWeb2dGame_core_basicSystems.makeAnimationSystem;
  var getTexture2dHeight = clWeb2dGame_graphics_texture.getTexture2dHeight;
  var getTotalTouchY = clWeb2dGame_inputs_input.getTotalTouchY;
  var calcDistP2 = clWeb2dGame_utils_calc.calcDistP2;
  var dumpPerformanceCounter = clWeb2dGame_utils_debug_performance.dumpPerformanceCounter;
  var MAXEVENTLOGCOUNT = clWeb2dGame_utils_debug_logger.MAXEVENTLOGCOUNT;
  var rotatefPointBy = clWeb2dGame_utils_calc.rotatefPointBy;
  var calcParentGlobalPoint = clWeb2dGame_utils_calc.calcParentGlobalPoint;
  var model2d = clWeb2dGame_graphics_drawModelSystem.model2d;
  var setfVector2dAngle = clWeb2dGame_utils_calc.setfVector2dAngle;
  var initEntityParams = clWeb2dGame_core_basicComponents.initEntityParams;
  var makeWiredPolygon = clWeb2dGame_graphics_2dGeometry.makeWiredPolygon;
  var loadTexture = clWeb2dGame_graphics_texture.loadTexture;
  var adjustToTarget = clWeb2dGame_utils_calc.adjustToTarget;
  var cloneVector2d = clWeb2dGame_core_basicComponents.cloneVector2d;
  var getScreenWidth = clWeb2dGame_core_camera.getScreenWidth;
  var getEntityParam = clWeb2dGame_core_basicComponents.getEntityParam;
  var collideEntitiesP = clWeb2dGame_physics_collision.collideEntitiesP;
  var copyPoint2dTo = clWeb2dGame_core_basicComponents.copyPoint2dTo;
  var decfVector2d = clWeb2dGame_utils_calc.decfVector2d;
  var processInput = clWeb2dGame_inputs_input.processInput;
  var transformfPointInverse = clWeb2dGame_utils_calc.transformfPointInverse;
  var getMeshSize = clWeb2dGame_graphics_2dGeometry.getMeshSize;
  var readKvs = clWeb2dGame_utils_storage.readKvs;
  var initCamera = clWeb2dGame_core_camera.initCamera;
  var calcDistToLine = clWeb2dGame_utils_calc.calcDistToLine;
  var makeRect2d = clWeb2dGame_core_basicComponents.makeRect2d;
  var point2dP = clWeb2dGame_core_basicComponents.point2dP;
  var setConsoleLogLevel = clWeb2dGame_utils_debug_logger.setConsoleLogLevel;
  var getPhysicalKeyName = clWeb2dGame_inputs_input.getPhysicalKeyName;
  var addMouseWheelCallback = clWeb2dGame_inputs_input.addMouseWheelCallback;
  var getCameraOffsetX = clWeb2dGame_core_camera.getCameraOffsetX;
  var keyDownCount = clWeb2dGame_inputs_input.keyDownCount;
  var makeSpeed2d = clWeb2dGame_core_basicComponents.makeSpeed2d;
  var makeWiredRegularPolygon = clWeb2dGame_graphics_2dGeometry.makeWiredRegularPolygon;
  var loadFont = clWeb2dGame_graphics_font.loadFont;
  var getMeshWidth = clWeb2dGame_graphics_2dGeometry.getMeshWidth;
  var findModel2dByLabel = clWeb2dGame_graphics_drawModelSystem.findModel2dByLabel;
  var clearTextArea = clWeb2dGame_graphics_textArea.clearTextArea;
  var initInput = clWeb2dGame_inputs_input.initInput;
  var slashVecScalar = clWeb2dGame_utils_calc.slashVecScalar;
  var resetAnimation = clWeb2dGame_graphics_animation.resetAnimation;
  var lerpVector2d = clWeb2dGame_utils_calc.lerpVector2d;
  var decfRotateDiff = clWeb2dGame_utils_calc.decfRotateDiff;
  var initDefaultSystems = clWeb2dGame_core_initializer.initDefaultSystems;
  var setfColliderModelEnable = clWeb2dGame_physics_collisionSystem.setfColliderModelEnable;
  var makeTextureModelPromise = clWeb2dGame_graphics_2dGeometry.makeTextureModelPromise;
  var registerAnimation = clWeb2dGame_graphics_animationManager.registerAnimation;
  var initUiSystem = clWeb2dGame_inputs_ui.initUiSystem;
  var addTouchStartCallback = clWeb2dGame_inputs_input.addTouchStartCallback;
  var makeTextModelPromise = clWeb2dGame_graphics_2dGeometry.makeTextModelPromise;
  var params = clWeb2dGame_core_basicComponents.params;
  var physicCircle = clWeb2dGame_physics_collision.physicCircle;
  var CONSOLELOGFUNCTION = clWeb2dGame_utils_debug_logger.CONSOLELOGFUNCTION;
  var keyUpCount = clWeb2dGame_inputs_input.keyUpCount;
  var enableModel2d = clWeb2dGame_graphics_drawModelSystem.enableModel2d;
  var makeVector2d = clWeb2dGame_core_basicComponents.makeVector2d;
  var makePhysicPolygon = clWeb2dGame_physics_collision.makePhysicPolygon;
  var makeTextArea = clWeb2dGame_graphics_textArea.makeTextArea;
  var diffAngle = clWeb2dGame_utils_calc.diffAngle;
  var collisionSystem = clWeb2dGame_physics_collisionSystem.collisionSystem;
  var uiComponent = clWeb2dGame_inputs_ui.uiComponent;
  var makePhysicRect = clWeb2dGame_physics_collision.makePhysicRect;
  var calcGlobalPoint = clWeb2dGame_utils_calc.calcGlobalPoint;
  var makeRotate2d = clWeb2dGame_core_basicComponents.makeRotate2d;
  var getTouchState = clWeb2dGame_inputs_input.getTouchState;
  var getTotalTouchX = clWeb2dGame_inputs_input.getTotalTouchX;
  var switchCurrentAnimation = clWeb2dGame_graphics_animationManager.switchCurrentAnimation;
  var deleteDeleteComponentHook = clPsEcs_ecs.deleteDeleteComponentHook;
  var makeEcsEntity = clPsEcs_ecs.makeEcsEntity;
  var addEcsComponent = clPsEcs_ecs.addEcsComponent;
  var ecsEntity = clPsEcs_ecs.ecsEntity;
  var deleteEcsComponentType = clPsEcs_ecs.deleteEcsComponentType;
  var framePromise = clPsEcs_framePromise.framePromise;
  var deleteEntityTag = clPsEcs_ecs.deleteEntityTag;
  var deleteEcsEntity = clPsEcs_ecs.deleteEcsEntity;
  var cleanEcsEnv = clPsEcs_ecs.cleanEcsEnv;
  var addDeleteComponentHook = clPsEcs_ecs.addDeleteComponentHook;
  var ecsMain = clPsEcs_ecs.ecsMain;
  var includesAllComponentTypes = clPsEcs_utils.includesAllComponentTypes;
  var findAComponent = clPsEcs_ecs.findAComponent;
  var registerNframesAfterFunc = clPsEcs_basicProcess.registerNframesAfterFunc;
  var moveEcsEntity = clPsEcs_ecs.moveEcsEntity;
  var ecsComponent = clPsEcs_ecs.ecsComponent;
  var popDefaultEcsEntityParent = clPsEcs_ecs.popDefaultEcsEntityParent;
  var framePromiseP = clPsEcs_framePromise.framePromiseP;
  var getEcsComponent = clPsEcs_ecs.getEcsComponent;
  var ecsSystem = clPsEcs_ecs.ecsSystem;
  var addEntityTag = clPsEcs_ecs.addEntityTag;
  var ecsEntityP = clPsEcs_ecs.ecsEntityP;
  var registerEcsSystem = clPsEcs_ecs.registerEcsSystem;
  var registerFuncWithPred = clPsEcs_basicProcess.registerFuncWithPred;
  var addEcsEntityToBuffer = clPsEcs_ecs.addEcsEntityToBuffer;
  var checkEntityTags = clPsEcs_ecs.checkEntityTags;
  var initFramePromise = clPsEcs_framePromise.initFramePromise;
  var framePromiseThen = clPsEcs_framePromise.framePromiseThen;
  var addEcsEntity = clPsEcs_ecs.addEcsEntity;
  var registerNextFrameFunc = clPsEcs_basicProcess.registerNextFrameFunc;
  var findAEntityByTag = clPsEcs_ecs.findAEntityByTag;
  var stackDefaultEcsEntityParent = clPsEcs_ecs.stackDefaultEcsEntityParent;
  var addEcsComponentList = clPsEcs_ecs.addEcsComponentList;
  var framePromiseAll = clPsEcs_framePromise.framePromiseAll;
  var findTheEntity = clPsEcs_ecs.findTheEntity;
  var findAEntity = clPsEcs_ecs.findAEntity;
  var hasEntityTag = clPsEcs_ecs.hasEntityTag;
  var deleteEcsComponent = clPsEcs_ecs.deleteEcsComponent;
  var getDefaultEcsEntityParent = clPsEcs_ecs.getDefaultEcsEntityParent;
  /* --- define objects --- */
  function gameGlobalInitState() {
      this.startProcess = function (state1134) {
          loadFont('js/');
          loadTexture('path', '/images/test.png', 'name', 'test');
          __PS_MV_REG = [];
          return true;
      };
      this.process = function (state1135) {
          addToEventLog('global');
          __PS_MV_REG = [];
          return makeState('menu');
      };
      this.endProcess = function (state1136) {
          return true;
      };
      return this;
  };
  function makeGameGlobalInitState() {
      var _js2077 = arguments.length;
      for (var n2076 = 0; n2076 < _js2077; n2076 += 2) {
          switch (arguments[n2076]) {
          case 'start-process':
              startProcess = arguments[n2076 + 1];
              break;
          case 'process':
              process = arguments[n2076 + 1];
              break;
          case 'end-process':
              endProcess = arguments[n2076 + 1];
          };
      };
      var startProcess = 'undefined' === typeof startProcess ? function (state1137) {
          loadFont('js/');
          loadTexture('path', '/images/test.png', 'name', 'test');
          __PS_MV_REG = [];
          return true;
      } : startProcess;
      var process = 'undefined' === typeof process ? function (state1138) {
          addToEventLog('global');
          __PS_MV_REG = [];
          return makeState('menu');
      } : process;
      var endProcess = 'undefined' === typeof endProcess ? function (state1139) {
          return true;
      } : endProcess;
      var result = new gameGlobalInitState();
      result.startProcess = startProcess;
      result.process = process;
      result.endProcess = endProcess;
      __PS_MV_REG = [];
      return result;
  };
  function gameGlobalInitStateP(obj) {
      return (obj instanceof gameGlobalInitState);
  };
  (function () {
      var tempCtor = function () {
          return null;
      };
      tempCtor.prototype = gameState.prototype;
      gameGlobalInitState.superClass_ = gameState.prototype;
      gameGlobalInitState.prototype = new tempCtor();
      __PS_MV_REG = [];
      return gameGlobalInitState.prototype.constructor = gameGlobalInitState;
  })();
  clWeb2dGame_core_gameState._internal.registerStateMaker('global-init', makeGameGlobalInitState);
  /* --- extern symbols --- */
  return {
    'makeGameGlobalInitState': makeGameGlobalInitState,
    '_internal': {
      'gameGlobalInitState': gameGlobalInitState,
      'gameGlobalInitStateP': gameGlobalInitStateP,
    }
  };
})();

var mogewebzou_game_controller = (function() {
  /* --- import symbols --- */
  var setfColliderModelDepth = clWeb2dGame_physics_collisionSystem.setfColliderModelDepth;
  var calcDistToLineSeg = clWeb2dGame_utils_calc.calcDistToLineSeg;
  var transformfPoint = clWeb2dGame_utils_calc.transformfPoint;
  var animation2d = clWeb2dGame_graphics_animation.animation2d;
  var makeLine = clWeb2dGame_graphics_2dGeometry.makeLine;
  var makeScriptSystem = clWeb2dGame_core_basicSystems.makeScriptSystem;
  var startReversedAnimation = clWeb2dGame_graphics_animation.startReversedAnimation;
  var getCameraOffsetY = clWeb2dGame_core_camera.getCameraOffsetY;
  var makeSolidCircle = clWeb2dGame_graphics_2dGeometry.makeSolidCircle;
  var keyUpP = clWeb2dGame_inputs_input.keyUpP;
  var getTouchX = clWeb2dGame_inputs_input.getTouchX;
  var boundingBox2d = clWeb2dGame_physics_collision.boundingBox2d;
  var enableAnimation = clWeb2dGame_graphics_animation.enableAnimation;
  var script2d = clWeb2dGame_core_basicComponents.script2d;
  var getTextAreaSize = clWeb2dGame_graphics_textArea.getTextAreaSize;
  var makeWiredCircle = clWeb2dGame_graphics_2dGeometry.makeWiredCircle;
  var rect2dP = clWeb2dGame_core_basicComponents.rect2dP;
  var changeGeometryUvs = clWeb2dGame_graphics_2dGeometry.changeGeometryUvs;
  var animationSystem = clWeb2dGame_core_basicSystems.animationSystem;
  var addToMonitoringLog = clWeb2dGame_utils_debug_logger.addToMonitoringLog;
  var addToEventLog = clWeb2dGame_utils_debug_logger.addToEventLog;
  var clonePoint2d = clWeb2dGame_core_basicComponents.clonePoint2d;
  var multfVecScalar = clWeb2dGame_utils_calc.multfVecScalar;
  var vector2d = clWeb2dGame_core_basicComponents.vector2d;
  var keyDownP = clWeb2dGame_inputs_input.keyDownP;
  var initDrawModelSystem = clWeb2dGame_graphics_drawModelSystem.initDrawModelSystem;
  var makeSolidRegularPolygon = clWeb2dGame_graphics_2dGeometry.makeSolidRegularPolygon;
  var initAnimationManager = clWeb2dGame_graphics_animationManager.initAnimationManager;
  var getScreenHeight = clWeb2dGame_core_camera.getScreenHeight;
  var makeSolidRect = clWeb2dGame_graphics_2dGeometry.makeSolidRect;
  var makeState = clWeb2dGame_core_gameState.makeState;
  var model2dP = clWeb2dGame_graphics_drawModelSystem.model2dP;
  var initGui = clWeb2dGame_inputs_gui.initGui;
  var makePoint2d = clWeb2dGame_core_basicComponents.makePoint2d;
  var drawDebugLineByTime = clWeb2dGame_utils_debug_debugDrawer.drawDebugLineByTime;
  var calcOuterProductZ = clWeb2dGame_utils_calc.calcOuterProductZ;
  var textAreaComponent = clWeb2dGame_graphics_textArea.textAreaComponent;
  var rotate2dP = clWeb2dGame_core_basicComponents.rotate2dP;
  var initAnimation2d = clWeb2dGame_graphics_animation.initAnimation2d;
  var texture2dP = clWeb2dGame_graphics_texture.texture2dP;
  var makeUiComponent = clWeb2dGame_inputs_ui.makeUiComponent;
  var divfVecScalar = clWeb2dGame_utils_calc.divfVecScalar;
  var truncateVector2d = clWeb2dGame_utils_calc.truncateVector2d;
  var vector2dAngle = clWeb2dGame_utils_calc.vector2dAngle;
  var getLeftMouseState = clWeb2dGame_inputs_input.getLeftMouseState;
  var runAnimationProcess = clWeb2dGame_graphics_animation.runAnimationProcess;
  var getMouseUpCount = clWeb2dGame_inputs_input.getMouseUpCount;
  var STANDARDDEBUGDEPTH = clWeb2dGame_utils_debug_debugDrawer.STANDARDDEBUGDEPTH;
  var calcDist = clWeb2dGame_utils_calc.calcDist;
  var makeSolidPolygon = clWeb2dGame_graphics_2dGeometry.makeSolidPolygon;
  var addPanelButton = clWeb2dGame_inputs_gui.addPanelButton;
  var startAnimation = clWeb2dGame_graphics_animation.startAnimation;
  var reverseAnimation = clWeb2dGame_graphics_animation.reverseAnimation;
  var truncatefVector2d = clWeb2dGame_utils_calc.truncatefVector2d;
  var gameStateManager = clWeb2dGame_core_gameState.gameStateManager;
  var STANDARDDEBUGPOINTR = clWeb2dGame_utils_debug_debugDrawer.STANDARDDEBUGPOINTR;
  var makePhysicCircle = clWeb2dGame_physics_collision.makePhysicCircle;
  var keyUpNowP = clWeb2dGame_inputs_input.keyUpNowP;
  var unloadTexture = clWeb2dGame_graphics_texture.unloadTexture;
  var reverseCurrentAnimation = clWeb2dGame_graphics_animationManager.reverseCurrentAnimation;
  var getMouseDownCount = clWeb2dGame_inputs_input.getMouseDownCount;
  var addPanelFolder = clWeb2dGame_inputs_gui.addPanelFolder;
  var rotateToTargetAngle = clWeb2dGame_utils_calc.rotateToTargetAngle;
  var stage = clWeb2dGame_utils_stageGenerator.stage;
  var addTextToArea = clWeb2dGame_graphics_textArea.addTextToArea;
  var makeBoundingBox2d = clWeb2dGame_physics_collision.makeBoundingBox2d;
  var disableAnimation = clWeb2dGame_graphics_animation.disableAnimation;
  var addMouseDownCallback = clWeb2dGame_inputs_input.addMouseDownCallback;
  var addTouchEndCallback = clWeb2dGame_inputs_input.addTouchEndCallback;
  var getRightMouseState = clWeb2dGame_inputs_input.getRightMouseState;
  var updateModel2d = clWeb2dGame_graphics_drawModelSystem.updateModel2d;
  var physic2d = clWeb2dGame_physics_collision.physic2d;
  var updateBoundingBox = clWeb2dGame_physics_collision.updateBoundingBox;
  var addPanelNumber = clWeb2dGame_inputs_gui.addPanelNumber;
  var texture2d = clWeb2dGame_graphics_texture.texture2d;
  var addMouseUpCallback = clWeb2dGame_inputs_input.addMouseUpCallback;
  var getFontPromise = clWeb2dGame_graphics_font.getFontPromise;
  var initEventLogArea = clWeb2dGame_utils_debug_logger.initEventLogArea;
  var disableModel2d = clWeb2dGame_graphics_drawModelSystem.disableModel2d;
  var setfVector2dAbs = clWeb2dGame_utils_calc.setfVector2dAbs;
  var gameState = clWeb2dGame_core_gameState.gameState;
  var physicPolygon = clWeb2dGame_physics_collision.physicPolygon;
  var processStage = clWeb2dGame_utils_stageGenerator.processStage;
  var getMouseX = clWeb2dGame_inputs_input.getMouseX;
  var drawDebugLine = clWeb2dGame_utils_debug_debugDrawer.drawDebugLine;
  var makeScript2d = clWeb2dGame_core_basicComponents.makeScript2d;
  var calcInnerProduct = clWeb2dGame_utils_calc.calcInnerProduct;
  var start2dGame = clWeb2dGame_core_initializer.start2dGame;
  var makeTextAreaComponent = clWeb2dGame_graphics_textArea.makeTextAreaComponent;
  var clearGuiPanel = clWeb2dGame_inputs_gui.clearGuiPanel;
  var animationManager = clWeb2dGame_graphics_animationManager.animationManager;
  var subVector2d = clWeb2dGame_utils_calc.subVector2d;
  var getMouseState = clWeb2dGame_inputs_input.getMouseState;
  var calcLocalPoint = clWeb2dGame_utils_calc.calcLocalPoint;
  var keyDownNowP = clWeb2dGame_inputs_input.keyDownNowP;
  var clearKvsAll = clWeb2dGame_utils_storage.clearKvsAll;
  var incfRotateDiff = clWeb2dGame_utils_calc.incfRotateDiff;
  var makeWiredRect = clWeb2dGame_graphics_2dGeometry.makeWiredRect;
  var processGameState = clWeb2dGame_core_gameState.processGameState;
  var lerpScalar = clWeb2dGame_utils_calc.lerpScalar;
  var removeKvs = clWeb2dGame_utils_storage.removeKvs;
  var setfColliderModelColor = clWeb2dGame_physics_collisionSystem.setfColliderModelColor;
  var point2d = clWeb2dGame_core_basicComponents.point2d;
  var vector2dP = clWeb2dGame_core_basicComponents.vector2dP;
  var startKeyMonitoring = clWeb2dGame_inputs_input.startKeyMonitoring;
  var makeCollisionSystem = clWeb2dGame_physics_collisionSystem.makeCollisionSystem;
  var speed2d = clWeb2dGame_core_basicComponents.speed2d;
  var initMonitoringLog = clWeb2dGame_utils_debug_logger.initMonitoringLog;
  var getTotalTouchState = clWeb2dGame_inputs_input.getTotalTouchState;
  var initGameState = clWeb2dGame_core_gameState.initGameState;
  var rotate2d = clWeb2dGame_core_basicComponents.rotate2d;
  var rect2d = clWeb2dGame_core_basicComponents.rect2d;
  var getMouseWheelDeltaY = clWeb2dGame_inputs_input.getMouseWheelDeltaY;
  var colTwoBoundingBoxP = clWeb2dGame_physics_collision.colTwoBoundingBoxP;
  var drawDebugPointByTime = clWeb2dGame_utils_debug_debugDrawer.drawDebugPointByTime;
  var vecScalar = clWeb2dGame_utils_calc.vecScalar;
  var movefVectorToCircle = clWeb2dGame_utils_calc.movefVectorToCircle;
  var makeLines = clWeb2dGame_graphics_2dGeometry.makeLines;
  var getMeshHeight = clWeb2dGame_graphics_2dGeometry.getMeshHeight;
  var STANDARDDEBUGCOLOR = clWeb2dGame_utils_debug_debugDrawer.STANDARDDEBUGCOLOR;
  var getTexture2dWidth = clWeb2dGame_graphics_texture.getTexture2dWidth;
  var addTouchMoveCallback = clWeb2dGame_inputs_input.addTouchMoveCallback;
  var stopAnimation = clWeb2dGame_graphics_animation.stopAnimation;
  var makePhysic2d = clWeb2dGame_physics_collision.makePhysic2d;
  var clearMonitoringLog = clWeb2dGame_utils_debug_logger.clearMonitoringLog;
  var initGameStateManager = clWeb2dGame_core_gameState.initGameStateManager;
  var setKvsPrefix = clWeb2dGame_utils_storage.setKvsPrefix;
  var addVector2d = clWeb2dGame_utils_calc.addVector2d;
  var changeModelColor = clWeb2dGame_graphics_2dGeometry.changeModelColor;
  var vector2dAbs = clWeb2dGame_utils_calc.vector2dAbs;
  var drawDebugPoint = clWeb2dGame_utils_debug_debugDrawer.drawDebugPoint;
  var incfVector2d = clWeb2dGame_utils_calc.incfVector2d;
  var getTouchY = clWeb2dGame_inputs_input.getTouchY;
  var getTexturePromise = clWeb2dGame_graphics_texture.getTexturePromise;
  var judgeCollisionTargetTags = clWeb2dGame_physics_collision.judgeCollisionTargetTags;
  var speed2dP = clWeb2dGame_core_basicComponents.speed2dP;
  var setEntityParam = clWeb2dGame_core_basicComponents.setEntityParam;
  var makeSimpleMoveSystem = clWeb2dGame_core_basicSystems.makeSimpleMoveSystem;
  var makeModel2d = clWeb2dGame_graphics_drawModelSystem.makeModel2d;
  var scriptSystem = clWeb2dGame_core_basicSystems.scriptSystem;
  var interruptGameState = clWeb2dGame_core_gameState.interruptGameState;
  var makeTextureModel = clWeb2dGame_graphics_2dGeometry.makeTextureModel;
  var addPanelBool = clWeb2dGame_inputs_gui.addPanelBool;
  var collidePhysicsP = clWeb2dGame_physics_collision.collidePhysicsP;
  var addMouseMoveCallback = clWeb2dGame_inputs_input.addMouseMoveCallback;
  var copyVector2dTo = clWeb2dGame_core_basicComponents.copyVector2dTo;
  var getMouseY = clWeb2dGame_inputs_input.getMouseY;
  var storeKvs = clWeb2dGame_utils_storage.storeKvs;
  var makeAnimationSystem = clWeb2dGame_core_basicSystems.makeAnimationSystem;
  var getTexture2dHeight = clWeb2dGame_graphics_texture.getTexture2dHeight;
  var getTotalTouchY = clWeb2dGame_inputs_input.getTotalTouchY;
  var calcDistP2 = clWeb2dGame_utils_calc.calcDistP2;
  var dumpPerformanceCounter = clWeb2dGame_utils_debug_performance.dumpPerformanceCounter;
  var MAXEVENTLOGCOUNT = clWeb2dGame_utils_debug_logger.MAXEVENTLOGCOUNT;
  var rotatefPointBy = clWeb2dGame_utils_calc.rotatefPointBy;
  var calcParentGlobalPoint = clWeb2dGame_utils_calc.calcParentGlobalPoint;
  var model2d = clWeb2dGame_graphics_drawModelSystem.model2d;
  var setfVector2dAngle = clWeb2dGame_utils_calc.setfVector2dAngle;
  var initEntityParams = clWeb2dGame_core_basicComponents.initEntityParams;
  var makeWiredPolygon = clWeb2dGame_graphics_2dGeometry.makeWiredPolygon;
  var loadTexture = clWeb2dGame_graphics_texture.loadTexture;
  var adjustToTarget = clWeb2dGame_utils_calc.adjustToTarget;
  var cloneVector2d = clWeb2dGame_core_basicComponents.cloneVector2d;
  var getScreenWidth = clWeb2dGame_core_camera.getScreenWidth;
  var getEntityParam = clWeb2dGame_core_basicComponents.getEntityParam;
  var collideEntitiesP = clWeb2dGame_physics_collision.collideEntitiesP;
  var copyPoint2dTo = clWeb2dGame_core_basicComponents.copyPoint2dTo;
  var decfVector2d = clWeb2dGame_utils_calc.decfVector2d;
  var processInput = clWeb2dGame_inputs_input.processInput;
  var transformfPointInverse = clWeb2dGame_utils_calc.transformfPointInverse;
  var getMeshSize = clWeb2dGame_graphics_2dGeometry.getMeshSize;
  var readKvs = clWeb2dGame_utils_storage.readKvs;
  var initCamera = clWeb2dGame_core_camera.initCamera;
  var calcDistToLine = clWeb2dGame_utils_calc.calcDistToLine;
  var makeRect2d = clWeb2dGame_core_basicComponents.makeRect2d;
  var point2dP = clWeb2dGame_core_basicComponents.point2dP;
  var setConsoleLogLevel = clWeb2dGame_utils_debug_logger.setConsoleLogLevel;
  var getPhysicalKeyName = clWeb2dGame_inputs_input.getPhysicalKeyName;
  var addMouseWheelCallback = clWeb2dGame_inputs_input.addMouseWheelCallback;
  var getCameraOffsetX = clWeb2dGame_core_camera.getCameraOffsetX;
  var keyDownCount = clWeb2dGame_inputs_input.keyDownCount;
  var makeSpeed2d = clWeb2dGame_core_basicComponents.makeSpeed2d;
  var makeWiredRegularPolygon = clWeb2dGame_graphics_2dGeometry.makeWiredRegularPolygon;
  var loadFont = clWeb2dGame_graphics_font.loadFont;
  var getMeshWidth = clWeb2dGame_graphics_2dGeometry.getMeshWidth;
  var findModel2dByLabel = clWeb2dGame_graphics_drawModelSystem.findModel2dByLabel;
  var clearTextArea = clWeb2dGame_graphics_textArea.clearTextArea;
  var initInput = clWeb2dGame_inputs_input.initInput;
  var slashVecScalar = clWeb2dGame_utils_calc.slashVecScalar;
  var resetAnimation = clWeb2dGame_graphics_animation.resetAnimation;
  var lerpVector2d = clWeb2dGame_utils_calc.lerpVector2d;
  var decfRotateDiff = clWeb2dGame_utils_calc.decfRotateDiff;
  var initDefaultSystems = clWeb2dGame_core_initializer.initDefaultSystems;
  var setfColliderModelEnable = clWeb2dGame_physics_collisionSystem.setfColliderModelEnable;
  var makeTextureModelPromise = clWeb2dGame_graphics_2dGeometry.makeTextureModelPromise;
  var registerAnimation = clWeb2dGame_graphics_animationManager.registerAnimation;
  var initUiSystem = clWeb2dGame_inputs_ui.initUiSystem;
  var addTouchStartCallback = clWeb2dGame_inputs_input.addTouchStartCallback;
  var makeTextModelPromise = clWeb2dGame_graphics_2dGeometry.makeTextModelPromise;
  var params = clWeb2dGame_core_basicComponents.params;
  var physicCircle = clWeb2dGame_physics_collision.physicCircle;
  var CONSOLELOGFUNCTION = clWeb2dGame_utils_debug_logger.CONSOLELOGFUNCTION;
  var keyUpCount = clWeb2dGame_inputs_input.keyUpCount;
  var enableModel2d = clWeb2dGame_graphics_drawModelSystem.enableModel2d;
  var makeVector2d = clWeb2dGame_core_basicComponents.makeVector2d;
  var makePhysicPolygon = clWeb2dGame_physics_collision.makePhysicPolygon;
  var makeTextArea = clWeb2dGame_graphics_textArea.makeTextArea;
  var diffAngle = clWeb2dGame_utils_calc.diffAngle;
  var collisionSystem = clWeb2dGame_physics_collisionSystem.collisionSystem;
  var uiComponent = clWeb2dGame_inputs_ui.uiComponent;
  var makePhysicRect = clWeb2dGame_physics_collision.makePhysicRect;
  var calcGlobalPoint = clWeb2dGame_utils_calc.calcGlobalPoint;
  var makeRotate2d = clWeb2dGame_core_basicComponents.makeRotate2d;
  var getTouchState = clWeb2dGame_inputs_input.getTouchState;
  var getTotalTouchX = clWeb2dGame_inputs_input.getTotalTouchX;
  var switchCurrentAnimation = clWeb2dGame_graphics_animationManager.switchCurrentAnimation;
  var deleteDeleteComponentHook = clPsEcs_ecs.deleteDeleteComponentHook;
  var makeEcsEntity = clPsEcs_ecs.makeEcsEntity;
  var addEcsComponent = clPsEcs_ecs.addEcsComponent;
  var ecsEntity = clPsEcs_ecs.ecsEntity;
  var deleteEcsComponentType = clPsEcs_ecs.deleteEcsComponentType;
  var framePromise = clPsEcs_framePromise.framePromise;
  var deleteEntityTag = clPsEcs_ecs.deleteEntityTag;
  var deleteEcsEntity = clPsEcs_ecs.deleteEcsEntity;
  var cleanEcsEnv = clPsEcs_ecs.cleanEcsEnv;
  var addDeleteComponentHook = clPsEcs_ecs.addDeleteComponentHook;
  var ecsMain = clPsEcs_ecs.ecsMain;
  var includesAllComponentTypes = clPsEcs_utils.includesAllComponentTypes;
  var findAComponent = clPsEcs_ecs.findAComponent;
  var registerNframesAfterFunc = clPsEcs_basicProcess.registerNframesAfterFunc;
  var moveEcsEntity = clPsEcs_ecs.moveEcsEntity;
  var ecsComponent = clPsEcs_ecs.ecsComponent;
  var popDefaultEcsEntityParent = clPsEcs_ecs.popDefaultEcsEntityParent;
  var framePromiseP = clPsEcs_framePromise.framePromiseP;
  var getEcsComponent = clPsEcs_ecs.getEcsComponent;
  var ecsSystem = clPsEcs_ecs.ecsSystem;
  var addEntityTag = clPsEcs_ecs.addEntityTag;
  var ecsEntityP = clPsEcs_ecs.ecsEntityP;
  var registerEcsSystem = clPsEcs_ecs.registerEcsSystem;
  var registerFuncWithPred = clPsEcs_basicProcess.registerFuncWithPred;
  var addEcsEntityToBuffer = clPsEcs_ecs.addEcsEntityToBuffer;
  var checkEntityTags = clPsEcs_ecs.checkEntityTags;
  var initFramePromise = clPsEcs_framePromise.initFramePromise;
  var framePromiseThen = clPsEcs_framePromise.framePromiseThen;
  var addEcsEntity = clPsEcs_ecs.addEcsEntity;
  var registerNextFrameFunc = clPsEcs_basicProcess.registerNextFrameFunc;
  var findAEntityByTag = clPsEcs_ecs.findAEntityByTag;
  var stackDefaultEcsEntityParent = clPsEcs_ecs.stackDefaultEcsEntityParent;
  var addEcsComponentList = clPsEcs_ecs.addEcsComponentList;
  var framePromiseAll = clPsEcs_framePromise.framePromiseAll;
  var findTheEntity = clPsEcs_ecs.findTheEntity;
  var findAEntity = clPsEcs_ecs.findAEntity;
  var hasEntityTag = clPsEcs_ecs.hasEntityTag;
  var deleteEcsComponent = clPsEcs_ecs.deleteEcsComponent;
  var getDefaultEcsEntityParent = clPsEcs_ecs.getDefaultEcsEntityParent;
  /* --- define objects --- */
  function processController(entity) {
      var point2d2078 = (found = getEcsComponent(point2d, entity), found ? found : (function () {
          throw 'POINT-2D is not included in the entity';
      })());
      point2d2078.x = getMouseX();
      __PS_MV_REG = [];
      return point2d2078.y = getMouseY();
  };
  function initTest() {
      var rect = makeEcsEntity();
      addEcsComponentList(rect, makePoint2d('x', 100, 'y', 100), makeScript2d('func', function (entity) {
          __PS_MV_REG = [];
          return processController(entity);
      }), makeModel2d('model', makeWiredRect('width', 32, 'height', 32, 'color', 65280), 'depth', 100));
      __PS_MV_REG = [];
      return framePromiseThen(makeTextureModelPromise('width', 32, 'height', 32, 'texture-name', 'test'), function (model) {
          addToEventLog('moge' + ' has been loaded');
          addEcsComponentList(rect, makeModel2d('model', model, 'depth', 100));
          __PS_MV_REG = [];
          return addEcsEntity(rect);
      });
  };
  function initController() {
      __PS_MV_REG = [];
      return framePromiseThen(makeTextureModelPromise('width', 32, 'height', 32, 'texture-name', 'test'), function (model) {
          var logo = makeEcsEntity();
          __PS_MV_REG = [];
          return addEcsComponentList(logo, makePoint2d('x', 100, 'y', 100), makeModel2d('model', model), makeScript2d('func', function (entity) {
              __PS_MV_REG = [];
              return processController(entity);
          }), addEcsEntity(logo));
      });
  };
  /* --- extern symbols --- */
  return {
    'initTest': initTest,
    'initController': initController,
    '_internal': {
      'processController': processController,
    }
  };
})();

var mogewebzou_game_state_menu = (function() {
  /* --- import symbols --- */
  var setfColliderModelDepth = clWeb2dGame_physics_collisionSystem.setfColliderModelDepth;
  var calcDistToLineSeg = clWeb2dGame_utils_calc.calcDistToLineSeg;
  var transformfPoint = clWeb2dGame_utils_calc.transformfPoint;
  var animation2d = clWeb2dGame_graphics_animation.animation2d;
  var makeLine = clWeb2dGame_graphics_2dGeometry.makeLine;
  var makeScriptSystem = clWeb2dGame_core_basicSystems.makeScriptSystem;
  var startReversedAnimation = clWeb2dGame_graphics_animation.startReversedAnimation;
  var getCameraOffsetY = clWeb2dGame_core_camera.getCameraOffsetY;
  var makeSolidCircle = clWeb2dGame_graphics_2dGeometry.makeSolidCircle;
  var keyUpP = clWeb2dGame_inputs_input.keyUpP;
  var getTouchX = clWeb2dGame_inputs_input.getTouchX;
  var boundingBox2d = clWeb2dGame_physics_collision.boundingBox2d;
  var enableAnimation = clWeb2dGame_graphics_animation.enableAnimation;
  var script2d = clWeb2dGame_core_basicComponents.script2d;
  var getTextAreaSize = clWeb2dGame_graphics_textArea.getTextAreaSize;
  var makeWiredCircle = clWeb2dGame_graphics_2dGeometry.makeWiredCircle;
  var rect2dP = clWeb2dGame_core_basicComponents.rect2dP;
  var changeGeometryUvs = clWeb2dGame_graphics_2dGeometry.changeGeometryUvs;
  var animationSystem = clWeb2dGame_core_basicSystems.animationSystem;
  var addToMonitoringLog = clWeb2dGame_utils_debug_logger.addToMonitoringLog;
  var addToEventLog = clWeb2dGame_utils_debug_logger.addToEventLog;
  var clonePoint2d = clWeb2dGame_core_basicComponents.clonePoint2d;
  var multfVecScalar = clWeb2dGame_utils_calc.multfVecScalar;
  var vector2d = clWeb2dGame_core_basicComponents.vector2d;
  var keyDownP = clWeb2dGame_inputs_input.keyDownP;
  var initDrawModelSystem = clWeb2dGame_graphics_drawModelSystem.initDrawModelSystem;
  var makeSolidRegularPolygon = clWeb2dGame_graphics_2dGeometry.makeSolidRegularPolygon;
  var initAnimationManager = clWeb2dGame_graphics_animationManager.initAnimationManager;
  var getScreenHeight = clWeb2dGame_core_camera.getScreenHeight;
  var makeSolidRect = clWeb2dGame_graphics_2dGeometry.makeSolidRect;
  var makeState = clWeb2dGame_core_gameState.makeState;
  var model2dP = clWeb2dGame_graphics_drawModelSystem.model2dP;
  var initGui = clWeb2dGame_inputs_gui.initGui;
  var makePoint2d = clWeb2dGame_core_basicComponents.makePoint2d;
  var drawDebugLineByTime = clWeb2dGame_utils_debug_debugDrawer.drawDebugLineByTime;
  var calcOuterProductZ = clWeb2dGame_utils_calc.calcOuterProductZ;
  var textAreaComponent = clWeb2dGame_graphics_textArea.textAreaComponent;
  var rotate2dP = clWeb2dGame_core_basicComponents.rotate2dP;
  var initAnimation2d = clWeb2dGame_graphics_animation.initAnimation2d;
  var texture2dP = clWeb2dGame_graphics_texture.texture2dP;
  var makeUiComponent = clWeb2dGame_inputs_ui.makeUiComponent;
  var divfVecScalar = clWeb2dGame_utils_calc.divfVecScalar;
  var truncateVector2d = clWeb2dGame_utils_calc.truncateVector2d;
  var vector2dAngle = clWeb2dGame_utils_calc.vector2dAngle;
  var getLeftMouseState = clWeb2dGame_inputs_input.getLeftMouseState;
  var runAnimationProcess = clWeb2dGame_graphics_animation.runAnimationProcess;
  var getMouseUpCount = clWeb2dGame_inputs_input.getMouseUpCount;
  var STANDARDDEBUGDEPTH = clWeb2dGame_utils_debug_debugDrawer.STANDARDDEBUGDEPTH;
  var calcDist = clWeb2dGame_utils_calc.calcDist;
  var makeSolidPolygon = clWeb2dGame_graphics_2dGeometry.makeSolidPolygon;
  var addPanelButton = clWeb2dGame_inputs_gui.addPanelButton;
  var startAnimation = clWeb2dGame_graphics_animation.startAnimation;
  var reverseAnimation = clWeb2dGame_graphics_animation.reverseAnimation;
  var truncatefVector2d = clWeb2dGame_utils_calc.truncatefVector2d;
  var gameStateManager = clWeb2dGame_core_gameState.gameStateManager;
  var STANDARDDEBUGPOINTR = clWeb2dGame_utils_debug_debugDrawer.STANDARDDEBUGPOINTR;
  var makePhysicCircle = clWeb2dGame_physics_collision.makePhysicCircle;
  var keyUpNowP = clWeb2dGame_inputs_input.keyUpNowP;
  var unloadTexture = clWeb2dGame_graphics_texture.unloadTexture;
  var reverseCurrentAnimation = clWeb2dGame_graphics_animationManager.reverseCurrentAnimation;
  var getMouseDownCount = clWeb2dGame_inputs_input.getMouseDownCount;
  var addPanelFolder = clWeb2dGame_inputs_gui.addPanelFolder;
  var rotateToTargetAngle = clWeb2dGame_utils_calc.rotateToTargetAngle;
  var stage = clWeb2dGame_utils_stageGenerator.stage;
  var addTextToArea = clWeb2dGame_graphics_textArea.addTextToArea;
  var makeBoundingBox2d = clWeb2dGame_physics_collision.makeBoundingBox2d;
  var disableAnimation = clWeb2dGame_graphics_animation.disableAnimation;
  var addMouseDownCallback = clWeb2dGame_inputs_input.addMouseDownCallback;
  var addTouchEndCallback = clWeb2dGame_inputs_input.addTouchEndCallback;
  var getRightMouseState = clWeb2dGame_inputs_input.getRightMouseState;
  var updateModel2d = clWeb2dGame_graphics_drawModelSystem.updateModel2d;
  var physic2d = clWeb2dGame_physics_collision.physic2d;
  var updateBoundingBox = clWeb2dGame_physics_collision.updateBoundingBox;
  var addPanelNumber = clWeb2dGame_inputs_gui.addPanelNumber;
  var texture2d = clWeb2dGame_graphics_texture.texture2d;
  var addMouseUpCallback = clWeb2dGame_inputs_input.addMouseUpCallback;
  var getFontPromise = clWeb2dGame_graphics_font.getFontPromise;
  var initEventLogArea = clWeb2dGame_utils_debug_logger.initEventLogArea;
  var disableModel2d = clWeb2dGame_graphics_drawModelSystem.disableModel2d;
  var setfVector2dAbs = clWeb2dGame_utils_calc.setfVector2dAbs;
  var gameState = clWeb2dGame_core_gameState.gameState;
  var physicPolygon = clWeb2dGame_physics_collision.physicPolygon;
  var processStage = clWeb2dGame_utils_stageGenerator.processStage;
  var getMouseX = clWeb2dGame_inputs_input.getMouseX;
  var drawDebugLine = clWeb2dGame_utils_debug_debugDrawer.drawDebugLine;
  var makeScript2d = clWeb2dGame_core_basicComponents.makeScript2d;
  var calcInnerProduct = clWeb2dGame_utils_calc.calcInnerProduct;
  var start2dGame = clWeb2dGame_core_initializer.start2dGame;
  var makeTextAreaComponent = clWeb2dGame_graphics_textArea.makeTextAreaComponent;
  var clearGuiPanel = clWeb2dGame_inputs_gui.clearGuiPanel;
  var animationManager = clWeb2dGame_graphics_animationManager.animationManager;
  var subVector2d = clWeb2dGame_utils_calc.subVector2d;
  var getMouseState = clWeb2dGame_inputs_input.getMouseState;
  var calcLocalPoint = clWeb2dGame_utils_calc.calcLocalPoint;
  var keyDownNowP = clWeb2dGame_inputs_input.keyDownNowP;
  var clearKvsAll = clWeb2dGame_utils_storage.clearKvsAll;
  var incfRotateDiff = clWeb2dGame_utils_calc.incfRotateDiff;
  var makeWiredRect = clWeb2dGame_graphics_2dGeometry.makeWiredRect;
  var processGameState = clWeb2dGame_core_gameState.processGameState;
  var lerpScalar = clWeb2dGame_utils_calc.lerpScalar;
  var removeKvs = clWeb2dGame_utils_storage.removeKvs;
  var setfColliderModelColor = clWeb2dGame_physics_collisionSystem.setfColliderModelColor;
  var point2d = clWeb2dGame_core_basicComponents.point2d;
  var vector2dP = clWeb2dGame_core_basicComponents.vector2dP;
  var startKeyMonitoring = clWeb2dGame_inputs_input.startKeyMonitoring;
  var makeCollisionSystem = clWeb2dGame_physics_collisionSystem.makeCollisionSystem;
  var speed2d = clWeb2dGame_core_basicComponents.speed2d;
  var initMonitoringLog = clWeb2dGame_utils_debug_logger.initMonitoringLog;
  var getTotalTouchState = clWeb2dGame_inputs_input.getTotalTouchState;
  var initGameState = clWeb2dGame_core_gameState.initGameState;
  var rotate2d = clWeb2dGame_core_basicComponents.rotate2d;
  var rect2d = clWeb2dGame_core_basicComponents.rect2d;
  var getMouseWheelDeltaY = clWeb2dGame_inputs_input.getMouseWheelDeltaY;
  var colTwoBoundingBoxP = clWeb2dGame_physics_collision.colTwoBoundingBoxP;
  var drawDebugPointByTime = clWeb2dGame_utils_debug_debugDrawer.drawDebugPointByTime;
  var vecScalar = clWeb2dGame_utils_calc.vecScalar;
  var movefVectorToCircle = clWeb2dGame_utils_calc.movefVectorToCircle;
  var makeLines = clWeb2dGame_graphics_2dGeometry.makeLines;
  var getMeshHeight = clWeb2dGame_graphics_2dGeometry.getMeshHeight;
  var STANDARDDEBUGCOLOR = clWeb2dGame_utils_debug_debugDrawer.STANDARDDEBUGCOLOR;
  var getTexture2dWidth = clWeb2dGame_graphics_texture.getTexture2dWidth;
  var addTouchMoveCallback = clWeb2dGame_inputs_input.addTouchMoveCallback;
  var stopAnimation = clWeb2dGame_graphics_animation.stopAnimation;
  var makePhysic2d = clWeb2dGame_physics_collision.makePhysic2d;
  var clearMonitoringLog = clWeb2dGame_utils_debug_logger.clearMonitoringLog;
  var initGameStateManager = clWeb2dGame_core_gameState.initGameStateManager;
  var setKvsPrefix = clWeb2dGame_utils_storage.setKvsPrefix;
  var addVector2d = clWeb2dGame_utils_calc.addVector2d;
  var changeModelColor = clWeb2dGame_graphics_2dGeometry.changeModelColor;
  var vector2dAbs = clWeb2dGame_utils_calc.vector2dAbs;
  var drawDebugPoint = clWeb2dGame_utils_debug_debugDrawer.drawDebugPoint;
  var incfVector2d = clWeb2dGame_utils_calc.incfVector2d;
  var getTouchY = clWeb2dGame_inputs_input.getTouchY;
  var getTexturePromise = clWeb2dGame_graphics_texture.getTexturePromise;
  var judgeCollisionTargetTags = clWeb2dGame_physics_collision.judgeCollisionTargetTags;
  var speed2dP = clWeb2dGame_core_basicComponents.speed2dP;
  var setEntityParam = clWeb2dGame_core_basicComponents.setEntityParam;
  var makeSimpleMoveSystem = clWeb2dGame_core_basicSystems.makeSimpleMoveSystem;
  var makeModel2d = clWeb2dGame_graphics_drawModelSystem.makeModel2d;
  var scriptSystem = clWeb2dGame_core_basicSystems.scriptSystem;
  var interruptGameState = clWeb2dGame_core_gameState.interruptGameState;
  var makeTextureModel = clWeb2dGame_graphics_2dGeometry.makeTextureModel;
  var addPanelBool = clWeb2dGame_inputs_gui.addPanelBool;
  var collidePhysicsP = clWeb2dGame_physics_collision.collidePhysicsP;
  var addMouseMoveCallback = clWeb2dGame_inputs_input.addMouseMoveCallback;
  var copyVector2dTo = clWeb2dGame_core_basicComponents.copyVector2dTo;
  var getMouseY = clWeb2dGame_inputs_input.getMouseY;
  var storeKvs = clWeb2dGame_utils_storage.storeKvs;
  var makeAnimationSystem = clWeb2dGame_core_basicSystems.makeAnimationSystem;
  var getTexture2dHeight = clWeb2dGame_graphics_texture.getTexture2dHeight;
  var getTotalTouchY = clWeb2dGame_inputs_input.getTotalTouchY;
  var calcDistP2 = clWeb2dGame_utils_calc.calcDistP2;
  var dumpPerformanceCounter = clWeb2dGame_utils_debug_performance.dumpPerformanceCounter;
  var MAXEVENTLOGCOUNT = clWeb2dGame_utils_debug_logger.MAXEVENTLOGCOUNT;
  var rotatefPointBy = clWeb2dGame_utils_calc.rotatefPointBy;
  var calcParentGlobalPoint = clWeb2dGame_utils_calc.calcParentGlobalPoint;
  var model2d = clWeb2dGame_graphics_drawModelSystem.model2d;
  var setfVector2dAngle = clWeb2dGame_utils_calc.setfVector2dAngle;
  var initEntityParams = clWeb2dGame_core_basicComponents.initEntityParams;
  var makeWiredPolygon = clWeb2dGame_graphics_2dGeometry.makeWiredPolygon;
  var loadTexture = clWeb2dGame_graphics_texture.loadTexture;
  var adjustToTarget = clWeb2dGame_utils_calc.adjustToTarget;
  var cloneVector2d = clWeb2dGame_core_basicComponents.cloneVector2d;
  var getScreenWidth = clWeb2dGame_core_camera.getScreenWidth;
  var getEntityParam = clWeb2dGame_core_basicComponents.getEntityParam;
  var collideEntitiesP = clWeb2dGame_physics_collision.collideEntitiesP;
  var copyPoint2dTo = clWeb2dGame_core_basicComponents.copyPoint2dTo;
  var decfVector2d = clWeb2dGame_utils_calc.decfVector2d;
  var processInput = clWeb2dGame_inputs_input.processInput;
  var transformfPointInverse = clWeb2dGame_utils_calc.transformfPointInverse;
  var getMeshSize = clWeb2dGame_graphics_2dGeometry.getMeshSize;
  var readKvs = clWeb2dGame_utils_storage.readKvs;
  var initCamera = clWeb2dGame_core_camera.initCamera;
  var calcDistToLine = clWeb2dGame_utils_calc.calcDistToLine;
  var makeRect2d = clWeb2dGame_core_basicComponents.makeRect2d;
  var point2dP = clWeb2dGame_core_basicComponents.point2dP;
  var setConsoleLogLevel = clWeb2dGame_utils_debug_logger.setConsoleLogLevel;
  var getPhysicalKeyName = clWeb2dGame_inputs_input.getPhysicalKeyName;
  var addMouseWheelCallback = clWeb2dGame_inputs_input.addMouseWheelCallback;
  var getCameraOffsetX = clWeb2dGame_core_camera.getCameraOffsetX;
  var keyDownCount = clWeb2dGame_inputs_input.keyDownCount;
  var makeSpeed2d = clWeb2dGame_core_basicComponents.makeSpeed2d;
  var makeWiredRegularPolygon = clWeb2dGame_graphics_2dGeometry.makeWiredRegularPolygon;
  var loadFont = clWeb2dGame_graphics_font.loadFont;
  var getMeshWidth = clWeb2dGame_graphics_2dGeometry.getMeshWidth;
  var findModel2dByLabel = clWeb2dGame_graphics_drawModelSystem.findModel2dByLabel;
  var clearTextArea = clWeb2dGame_graphics_textArea.clearTextArea;
  var initInput = clWeb2dGame_inputs_input.initInput;
  var slashVecScalar = clWeb2dGame_utils_calc.slashVecScalar;
  var resetAnimation = clWeb2dGame_graphics_animation.resetAnimation;
  var lerpVector2d = clWeb2dGame_utils_calc.lerpVector2d;
  var decfRotateDiff = clWeb2dGame_utils_calc.decfRotateDiff;
  var initDefaultSystems = clWeb2dGame_core_initializer.initDefaultSystems;
  var setfColliderModelEnable = clWeb2dGame_physics_collisionSystem.setfColliderModelEnable;
  var makeTextureModelPromise = clWeb2dGame_graphics_2dGeometry.makeTextureModelPromise;
  var registerAnimation = clWeb2dGame_graphics_animationManager.registerAnimation;
  var initUiSystem = clWeb2dGame_inputs_ui.initUiSystem;
  var addTouchStartCallback = clWeb2dGame_inputs_input.addTouchStartCallback;
  var makeTextModelPromise = clWeb2dGame_graphics_2dGeometry.makeTextModelPromise;
  var params = clWeb2dGame_core_basicComponents.params;
  var physicCircle = clWeb2dGame_physics_collision.physicCircle;
  var CONSOLELOGFUNCTION = clWeb2dGame_utils_debug_logger.CONSOLELOGFUNCTION;
  var keyUpCount = clWeb2dGame_inputs_input.keyUpCount;
  var enableModel2d = clWeb2dGame_graphics_drawModelSystem.enableModel2d;
  var makeVector2d = clWeb2dGame_core_basicComponents.makeVector2d;
  var makePhysicPolygon = clWeb2dGame_physics_collision.makePhysicPolygon;
  var makeTextArea = clWeb2dGame_graphics_textArea.makeTextArea;
  var diffAngle = clWeb2dGame_utils_calc.diffAngle;
  var collisionSystem = clWeb2dGame_physics_collisionSystem.collisionSystem;
  var uiComponent = clWeb2dGame_inputs_ui.uiComponent;
  var makePhysicRect = clWeb2dGame_physics_collision.makePhysicRect;
  var calcGlobalPoint = clWeb2dGame_utils_calc.calcGlobalPoint;
  var makeRotate2d = clWeb2dGame_core_basicComponents.makeRotate2d;
  var getTouchState = clWeb2dGame_inputs_input.getTouchState;
  var getTotalTouchX = clWeb2dGame_inputs_input.getTotalTouchX;
  var switchCurrentAnimation = clWeb2dGame_graphics_animationManager.switchCurrentAnimation;
  var deleteDeleteComponentHook = clPsEcs_ecs.deleteDeleteComponentHook;
  var makeEcsEntity = clPsEcs_ecs.makeEcsEntity;
  var addEcsComponent = clPsEcs_ecs.addEcsComponent;
  var ecsEntity = clPsEcs_ecs.ecsEntity;
  var deleteEcsComponentType = clPsEcs_ecs.deleteEcsComponentType;
  var framePromise = clPsEcs_framePromise.framePromise;
  var deleteEntityTag = clPsEcs_ecs.deleteEntityTag;
  var deleteEcsEntity = clPsEcs_ecs.deleteEcsEntity;
  var cleanEcsEnv = clPsEcs_ecs.cleanEcsEnv;
  var addDeleteComponentHook = clPsEcs_ecs.addDeleteComponentHook;
  var ecsMain = clPsEcs_ecs.ecsMain;
  var includesAllComponentTypes = clPsEcs_utils.includesAllComponentTypes;
  var findAComponent = clPsEcs_ecs.findAComponent;
  var registerNframesAfterFunc = clPsEcs_basicProcess.registerNframesAfterFunc;
  var moveEcsEntity = clPsEcs_ecs.moveEcsEntity;
  var ecsComponent = clPsEcs_ecs.ecsComponent;
  var popDefaultEcsEntityParent = clPsEcs_ecs.popDefaultEcsEntityParent;
  var framePromiseP = clPsEcs_framePromise.framePromiseP;
  var getEcsComponent = clPsEcs_ecs.getEcsComponent;
  var ecsSystem = clPsEcs_ecs.ecsSystem;
  var addEntityTag = clPsEcs_ecs.addEntityTag;
  var ecsEntityP = clPsEcs_ecs.ecsEntityP;
  var registerEcsSystem = clPsEcs_ecs.registerEcsSystem;
  var registerFuncWithPred = clPsEcs_basicProcess.registerFuncWithPred;
  var addEcsEntityToBuffer = clPsEcs_ecs.addEcsEntityToBuffer;
  var checkEntityTags = clPsEcs_ecs.checkEntityTags;
  var initFramePromise = clPsEcs_framePromise.initFramePromise;
  var framePromiseThen = clPsEcs_framePromise.framePromiseThen;
  var addEcsEntity = clPsEcs_ecs.addEcsEntity;
  var registerNextFrameFunc = clPsEcs_basicProcess.registerNextFrameFunc;
  var findAEntityByTag = clPsEcs_ecs.findAEntityByTag;
  var stackDefaultEcsEntityParent = clPsEcs_ecs.stackDefaultEcsEntityParent;
  var addEcsComponentList = clPsEcs_ecs.addEcsComponentList;
  var framePromiseAll = clPsEcs_framePromise.framePromiseAll;
  var findTheEntity = clPsEcs_ecs.findTheEntity;
  var findAEntity = clPsEcs_ecs.findAEntity;
  var hasEntityTag = clPsEcs_ecs.hasEntityTag;
  var deleteEcsComponent = clPsEcs_ecs.deleteEcsComponent;
  var getDefaultEcsEntityParent = clPsEcs_ecs.getDefaultEcsEntityParent;
  /* --- define objects --- */
  function addImage() {
      __PS_MV_REG = [];
      return framePromiseThen(makeTextureModelPromise('width', 32, 'height', 32, 'texture-name', 'test'), function (model) {
          var logo = makeEcsEntity();
          addEcsComponentList(logo, makePoint2d('x', 100, 'y', 100), makeModel2d('model', model));
          __PS_MV_REG = [];
          return addEcsEntity(logo);
      });
  };
  function startGameP() {
      __PS_MV_REG = [];
      return keyDownNowP('a') || getLeftMouseState() === 'down-now' || getTotalTouchState() === 'down-now';
  };
  function gameMenuState() {
      this.startProcess = function (state1140) {
          var newParent1141 = state1140.parent;
          try {
              stackDefaultEcsEntityParent(newParent1141);
              var area = makeTextArea('font-size', 50, 'text-align', 'center');
              addTextToArea(area, 'text', 'Press Z key start HOGE', 'color', 16777215);
              addEcsComponentList(area, makePoint2d('x', 300, 'y', 300));
              addEcsEntity(area);
              addImage();
          } finally {
              popDefaultEcsEntityParent();
          };
          __PS_MV_REG = [];
          return true;
      };
      this.process = function (state1142) {
          if (startGameP()) {
              addToEventLog('menu');
              __PS_MV_REG = [];
              return makeState('main');
          };
      };
      this.endProcess = function (state1143) {
          registerNextFrameFunc(function () {
              __PS_MV_REG = [];
              return deleteEcsEntity(state1143.parent);
          });
          __PS_MV_REG = [];
          return true;
      };
      this.parent = makeEcsEntity();
      __PS_MV_REG = [];
      return this;
  };
  function makeGameMenuState() {
      var _js2080 = arguments.length;
      for (var n2079 = 0; n2079 < _js2080; n2079 += 2) {
          switch (arguments[n2079]) {
          case 'start-process':
              startProcess = arguments[n2079 + 1];
              break;
          case 'process':
              process = arguments[n2079 + 1];
              break;
          case 'end-process':
              endProcess = arguments[n2079 + 1];
              break;
          case 'parent':
              parent = arguments[n2079 + 1];
          };
      };
      var startProcess = 'undefined' === typeof startProcess ? function (state1144) {
          var newParent1145 = state1144.parent;
          try {
              stackDefaultEcsEntityParent(newParent1145);
              var area = makeTextArea('font-size', 50, 'text-align', 'center');
              addTextToArea(area, 'text', 'Press Z key start HOGE', 'color', 16777215);
              addEcsComponentList(area, makePoint2d('x', 300, 'y', 300));
              addEcsEntity(area);
              addImage();
          } finally {
              popDefaultEcsEntityParent();
          };
          __PS_MV_REG = [];
          return true;
      } : startProcess;
      var process = 'undefined' === typeof process ? function (state1146) {
          if (startGameP()) {
              addToEventLog('menu');
              __PS_MV_REG = [];
              return makeState('main');
          };
      } : process;
      var endProcess = 'undefined' === typeof endProcess ? function (state1147) {
          registerNextFrameFunc(function () {
              __PS_MV_REG = [];
              return deleteEcsEntity(state1147.parent);
          });
          __PS_MV_REG = [];
          return true;
      } : endProcess;
      var parent = 'undefined' === typeof parent ? makeEcsEntity() : parent;
      var result = new gameMenuState();
      result.startProcess = startProcess;
      result.process = process;
      result.endProcess = endProcess;
      result.parent = parent;
      __PS_MV_REG = [];
      return result;
  };
  function gameMenuStateP(obj) {
      return (obj instanceof gameMenuState);
  };
  (function () {
      var tempCtor = function () {
          return null;
      };
      tempCtor.prototype = gameState.prototype;
      gameMenuState.superClass_ = gameState.prototype;
      gameMenuState.prototype = new tempCtor();
      __PS_MV_REG = [];
      return gameMenuState.prototype.constructor = gameMenuState;
  })();
  clWeb2dGame_core_gameState._internal.registerStateMaker('menu', makeGameMenuState);
  /* --- extern symbols --- */
  return {
    'addImage': addImage,
    'makeGameMenuState': makeGameMenuState,
    '_internal': {
      'startGameP': startGameP,
      'gameMenuState': gameMenuState,
      'gameMenuStateP': gameMenuStateP,
    }
  };
})();

var mogewebzou_game_state_main = (function() {
  /* --- import symbols --- */
  var deleteDeleteComponentHook = clPsEcs_ecs.deleteDeleteComponentHook;
  var makeEcsEntity = clPsEcs_ecs.makeEcsEntity;
  var addEcsComponent = clPsEcs_ecs.addEcsComponent;
  var ecsEntity = clPsEcs_ecs.ecsEntity;
  var deleteEcsComponentType = clPsEcs_ecs.deleteEcsComponentType;
  var framePromise = clPsEcs_framePromise.framePromise;
  var deleteEntityTag = clPsEcs_ecs.deleteEntityTag;
  var deleteEcsEntity = clPsEcs_ecs.deleteEcsEntity;
  var cleanEcsEnv = clPsEcs_ecs.cleanEcsEnv;
  var addDeleteComponentHook = clPsEcs_ecs.addDeleteComponentHook;
  var ecsMain = clPsEcs_ecs.ecsMain;
  var includesAllComponentTypes = clPsEcs_utils.includesAllComponentTypes;
  var findAComponent = clPsEcs_ecs.findAComponent;
  var registerNframesAfterFunc = clPsEcs_basicProcess.registerNframesAfterFunc;
  var moveEcsEntity = clPsEcs_ecs.moveEcsEntity;
  var ecsComponent = clPsEcs_ecs.ecsComponent;
  var popDefaultEcsEntityParent = clPsEcs_ecs.popDefaultEcsEntityParent;
  var framePromiseP = clPsEcs_framePromise.framePromiseP;
  var getEcsComponent = clPsEcs_ecs.getEcsComponent;
  var ecsSystem = clPsEcs_ecs.ecsSystem;
  var addEntityTag = clPsEcs_ecs.addEntityTag;
  var ecsEntityP = clPsEcs_ecs.ecsEntityP;
  var registerEcsSystem = clPsEcs_ecs.registerEcsSystem;
  var registerFuncWithPred = clPsEcs_basicProcess.registerFuncWithPred;
  var addEcsEntityToBuffer = clPsEcs_ecs.addEcsEntityToBuffer;
  var checkEntityTags = clPsEcs_ecs.checkEntityTags;
  var initFramePromise = clPsEcs_framePromise.initFramePromise;
  var framePromiseThen = clPsEcs_framePromise.framePromiseThen;
  var addEcsEntity = clPsEcs_ecs.addEcsEntity;
  var registerNextFrameFunc = clPsEcs_basicProcess.registerNextFrameFunc;
  var findAEntityByTag = clPsEcs_ecs.findAEntityByTag;
  var stackDefaultEcsEntityParent = clPsEcs_ecs.stackDefaultEcsEntityParent;
  var addEcsComponentList = clPsEcs_ecs.addEcsComponentList;
  var framePromiseAll = clPsEcs_framePromise.framePromiseAll;
  var findTheEntity = clPsEcs_ecs.findTheEntity;
  var findAEntity = clPsEcs_ecs.findAEntity;
  var hasEntityTag = clPsEcs_ecs.hasEntityTag;
  var deleteEcsComponent = clPsEcs_ecs.deleteEcsComponent;
  var getDefaultEcsEntityParent = clPsEcs_ecs.getDefaultEcsEntityParent;
  var setfColliderModelDepth = clWeb2dGame_physics_collisionSystem.setfColliderModelDepth;
  var calcDistToLineSeg = clWeb2dGame_utils_calc.calcDistToLineSeg;
  var transformfPoint = clWeb2dGame_utils_calc.transformfPoint;
  var animation2d = clWeb2dGame_graphics_animation.animation2d;
  var makeLine = clWeb2dGame_graphics_2dGeometry.makeLine;
  var makeScriptSystem = clWeb2dGame_core_basicSystems.makeScriptSystem;
  var startReversedAnimation = clWeb2dGame_graphics_animation.startReversedAnimation;
  var getCameraOffsetY = clWeb2dGame_core_camera.getCameraOffsetY;
  var makeSolidCircle = clWeb2dGame_graphics_2dGeometry.makeSolidCircle;
  var keyUpP = clWeb2dGame_inputs_input.keyUpP;
  var getTouchX = clWeb2dGame_inputs_input.getTouchX;
  var boundingBox2d = clWeb2dGame_physics_collision.boundingBox2d;
  var enableAnimation = clWeb2dGame_graphics_animation.enableAnimation;
  var script2d = clWeb2dGame_core_basicComponents.script2d;
  var getTextAreaSize = clWeb2dGame_graphics_textArea.getTextAreaSize;
  var makeWiredCircle = clWeb2dGame_graphics_2dGeometry.makeWiredCircle;
  var rect2dP = clWeb2dGame_core_basicComponents.rect2dP;
  var changeGeometryUvs = clWeb2dGame_graphics_2dGeometry.changeGeometryUvs;
  var animationSystem = clWeb2dGame_core_basicSystems.animationSystem;
  var addToMonitoringLog = clWeb2dGame_utils_debug_logger.addToMonitoringLog;
  var addToEventLog = clWeb2dGame_utils_debug_logger.addToEventLog;
  var clonePoint2d = clWeb2dGame_core_basicComponents.clonePoint2d;
  var multfVecScalar = clWeb2dGame_utils_calc.multfVecScalar;
  var vector2d = clWeb2dGame_core_basicComponents.vector2d;
  var keyDownP = clWeb2dGame_inputs_input.keyDownP;
  var initDrawModelSystem = clWeb2dGame_graphics_drawModelSystem.initDrawModelSystem;
  var makeSolidRegularPolygon = clWeb2dGame_graphics_2dGeometry.makeSolidRegularPolygon;
  var initAnimationManager = clWeb2dGame_graphics_animationManager.initAnimationManager;
  var getScreenHeight = clWeb2dGame_core_camera.getScreenHeight;
  var makeSolidRect = clWeb2dGame_graphics_2dGeometry.makeSolidRect;
  var makeState = clWeb2dGame_core_gameState.makeState;
  var model2dP = clWeb2dGame_graphics_drawModelSystem.model2dP;
  var initGui = clWeb2dGame_inputs_gui.initGui;
  var makePoint2d = clWeb2dGame_core_basicComponents.makePoint2d;
  var drawDebugLineByTime = clWeb2dGame_utils_debug_debugDrawer.drawDebugLineByTime;
  var calcOuterProductZ = clWeb2dGame_utils_calc.calcOuterProductZ;
  var textAreaComponent = clWeb2dGame_graphics_textArea.textAreaComponent;
  var rotate2dP = clWeb2dGame_core_basicComponents.rotate2dP;
  var initAnimation2d = clWeb2dGame_graphics_animation.initAnimation2d;
  var texture2dP = clWeb2dGame_graphics_texture.texture2dP;
  var makeUiComponent = clWeb2dGame_inputs_ui.makeUiComponent;
  var divfVecScalar = clWeb2dGame_utils_calc.divfVecScalar;
  var truncateVector2d = clWeb2dGame_utils_calc.truncateVector2d;
  var vector2dAngle = clWeb2dGame_utils_calc.vector2dAngle;
  var getLeftMouseState = clWeb2dGame_inputs_input.getLeftMouseState;
  var runAnimationProcess = clWeb2dGame_graphics_animation.runAnimationProcess;
  var getMouseUpCount = clWeb2dGame_inputs_input.getMouseUpCount;
  var STANDARDDEBUGDEPTH = clWeb2dGame_utils_debug_debugDrawer.STANDARDDEBUGDEPTH;
  var calcDist = clWeb2dGame_utils_calc.calcDist;
  var makeSolidPolygon = clWeb2dGame_graphics_2dGeometry.makeSolidPolygon;
  var addPanelButton = clWeb2dGame_inputs_gui.addPanelButton;
  var startAnimation = clWeb2dGame_graphics_animation.startAnimation;
  var reverseAnimation = clWeb2dGame_graphics_animation.reverseAnimation;
  var truncatefVector2d = clWeb2dGame_utils_calc.truncatefVector2d;
  var gameStateManager = clWeb2dGame_core_gameState.gameStateManager;
  var STANDARDDEBUGPOINTR = clWeb2dGame_utils_debug_debugDrawer.STANDARDDEBUGPOINTR;
  var makePhysicCircle = clWeb2dGame_physics_collision.makePhysicCircle;
  var keyUpNowP = clWeb2dGame_inputs_input.keyUpNowP;
  var unloadTexture = clWeb2dGame_graphics_texture.unloadTexture;
  var reverseCurrentAnimation = clWeb2dGame_graphics_animationManager.reverseCurrentAnimation;
  var getMouseDownCount = clWeb2dGame_inputs_input.getMouseDownCount;
  var addPanelFolder = clWeb2dGame_inputs_gui.addPanelFolder;
  var rotateToTargetAngle = clWeb2dGame_utils_calc.rotateToTargetAngle;
  var stage = clWeb2dGame_utils_stageGenerator.stage;
  var addTextToArea = clWeb2dGame_graphics_textArea.addTextToArea;
  var makeBoundingBox2d = clWeb2dGame_physics_collision.makeBoundingBox2d;
  var disableAnimation = clWeb2dGame_graphics_animation.disableAnimation;
  var addMouseDownCallback = clWeb2dGame_inputs_input.addMouseDownCallback;
  var addTouchEndCallback = clWeb2dGame_inputs_input.addTouchEndCallback;
  var getRightMouseState = clWeb2dGame_inputs_input.getRightMouseState;
  var updateModel2d = clWeb2dGame_graphics_drawModelSystem.updateModel2d;
  var physic2d = clWeb2dGame_physics_collision.physic2d;
  var updateBoundingBox = clWeb2dGame_physics_collision.updateBoundingBox;
  var addPanelNumber = clWeb2dGame_inputs_gui.addPanelNumber;
  var texture2d = clWeb2dGame_graphics_texture.texture2d;
  var addMouseUpCallback = clWeb2dGame_inputs_input.addMouseUpCallback;
  var getFontPromise = clWeb2dGame_graphics_font.getFontPromise;
  var initEventLogArea = clWeb2dGame_utils_debug_logger.initEventLogArea;
  var disableModel2d = clWeb2dGame_graphics_drawModelSystem.disableModel2d;
  var setfVector2dAbs = clWeb2dGame_utils_calc.setfVector2dAbs;
  var gameState = clWeb2dGame_core_gameState.gameState;
  var physicPolygon = clWeb2dGame_physics_collision.physicPolygon;
  var processStage = clWeb2dGame_utils_stageGenerator.processStage;
  var getMouseX = clWeb2dGame_inputs_input.getMouseX;
  var drawDebugLine = clWeb2dGame_utils_debug_debugDrawer.drawDebugLine;
  var makeScript2d = clWeb2dGame_core_basicComponents.makeScript2d;
  var calcInnerProduct = clWeb2dGame_utils_calc.calcInnerProduct;
  var start2dGame = clWeb2dGame_core_initializer.start2dGame;
  var makeTextAreaComponent = clWeb2dGame_graphics_textArea.makeTextAreaComponent;
  var clearGuiPanel = clWeb2dGame_inputs_gui.clearGuiPanel;
  var animationManager = clWeb2dGame_graphics_animationManager.animationManager;
  var subVector2d = clWeb2dGame_utils_calc.subVector2d;
  var getMouseState = clWeb2dGame_inputs_input.getMouseState;
  var calcLocalPoint = clWeb2dGame_utils_calc.calcLocalPoint;
  var keyDownNowP = clWeb2dGame_inputs_input.keyDownNowP;
  var clearKvsAll = clWeb2dGame_utils_storage.clearKvsAll;
  var incfRotateDiff = clWeb2dGame_utils_calc.incfRotateDiff;
  var makeWiredRect = clWeb2dGame_graphics_2dGeometry.makeWiredRect;
  var processGameState = clWeb2dGame_core_gameState.processGameState;
  var lerpScalar = clWeb2dGame_utils_calc.lerpScalar;
  var removeKvs = clWeb2dGame_utils_storage.removeKvs;
  var setfColliderModelColor = clWeb2dGame_physics_collisionSystem.setfColliderModelColor;
  var point2d = clWeb2dGame_core_basicComponents.point2d;
  var vector2dP = clWeb2dGame_core_basicComponents.vector2dP;
  var startKeyMonitoring = clWeb2dGame_inputs_input.startKeyMonitoring;
  var makeCollisionSystem = clWeb2dGame_physics_collisionSystem.makeCollisionSystem;
  var speed2d = clWeb2dGame_core_basicComponents.speed2d;
  var initMonitoringLog = clWeb2dGame_utils_debug_logger.initMonitoringLog;
  var getTotalTouchState = clWeb2dGame_inputs_input.getTotalTouchState;
  var initGameState = clWeb2dGame_core_gameState.initGameState;
  var rotate2d = clWeb2dGame_core_basicComponents.rotate2d;
  var rect2d = clWeb2dGame_core_basicComponents.rect2d;
  var getMouseWheelDeltaY = clWeb2dGame_inputs_input.getMouseWheelDeltaY;
  var colTwoBoundingBoxP = clWeb2dGame_physics_collision.colTwoBoundingBoxP;
  var drawDebugPointByTime = clWeb2dGame_utils_debug_debugDrawer.drawDebugPointByTime;
  var vecScalar = clWeb2dGame_utils_calc.vecScalar;
  var movefVectorToCircle = clWeb2dGame_utils_calc.movefVectorToCircle;
  var makeLines = clWeb2dGame_graphics_2dGeometry.makeLines;
  var getMeshHeight = clWeb2dGame_graphics_2dGeometry.getMeshHeight;
  var STANDARDDEBUGCOLOR = clWeb2dGame_utils_debug_debugDrawer.STANDARDDEBUGCOLOR;
  var getTexture2dWidth = clWeb2dGame_graphics_texture.getTexture2dWidth;
  var addTouchMoveCallback = clWeb2dGame_inputs_input.addTouchMoveCallback;
  var stopAnimation = clWeb2dGame_graphics_animation.stopAnimation;
  var makePhysic2d = clWeb2dGame_physics_collision.makePhysic2d;
  var clearMonitoringLog = clWeb2dGame_utils_debug_logger.clearMonitoringLog;
  var initGameStateManager = clWeb2dGame_core_gameState.initGameStateManager;
  var setKvsPrefix = clWeb2dGame_utils_storage.setKvsPrefix;
  var addVector2d = clWeb2dGame_utils_calc.addVector2d;
  var changeModelColor = clWeb2dGame_graphics_2dGeometry.changeModelColor;
  var vector2dAbs = clWeb2dGame_utils_calc.vector2dAbs;
  var drawDebugPoint = clWeb2dGame_utils_debug_debugDrawer.drawDebugPoint;
  var incfVector2d = clWeb2dGame_utils_calc.incfVector2d;
  var getTouchY = clWeb2dGame_inputs_input.getTouchY;
  var getTexturePromise = clWeb2dGame_graphics_texture.getTexturePromise;
  var judgeCollisionTargetTags = clWeb2dGame_physics_collision.judgeCollisionTargetTags;
  var speed2dP = clWeb2dGame_core_basicComponents.speed2dP;
  var setEntityParam = clWeb2dGame_core_basicComponents.setEntityParam;
  var makeSimpleMoveSystem = clWeb2dGame_core_basicSystems.makeSimpleMoveSystem;
  var makeModel2d = clWeb2dGame_graphics_drawModelSystem.makeModel2d;
  var scriptSystem = clWeb2dGame_core_basicSystems.scriptSystem;
  var interruptGameState = clWeb2dGame_core_gameState.interruptGameState;
  var makeTextureModel = clWeb2dGame_graphics_2dGeometry.makeTextureModel;
  var addPanelBool = clWeb2dGame_inputs_gui.addPanelBool;
  var collidePhysicsP = clWeb2dGame_physics_collision.collidePhysicsP;
  var addMouseMoveCallback = clWeb2dGame_inputs_input.addMouseMoveCallback;
  var copyVector2dTo = clWeb2dGame_core_basicComponents.copyVector2dTo;
  var getMouseY = clWeb2dGame_inputs_input.getMouseY;
  var storeKvs = clWeb2dGame_utils_storage.storeKvs;
  var makeAnimationSystem = clWeb2dGame_core_basicSystems.makeAnimationSystem;
  var getTexture2dHeight = clWeb2dGame_graphics_texture.getTexture2dHeight;
  var getTotalTouchY = clWeb2dGame_inputs_input.getTotalTouchY;
  var calcDistP2 = clWeb2dGame_utils_calc.calcDistP2;
  var dumpPerformanceCounter = clWeb2dGame_utils_debug_performance.dumpPerformanceCounter;
  var MAXEVENTLOGCOUNT = clWeb2dGame_utils_debug_logger.MAXEVENTLOGCOUNT;
  var rotatefPointBy = clWeb2dGame_utils_calc.rotatefPointBy;
  var calcParentGlobalPoint = clWeb2dGame_utils_calc.calcParentGlobalPoint;
  var model2d = clWeb2dGame_graphics_drawModelSystem.model2d;
  var setfVector2dAngle = clWeb2dGame_utils_calc.setfVector2dAngle;
  var initEntityParams = clWeb2dGame_core_basicComponents.initEntityParams;
  var makeWiredPolygon = clWeb2dGame_graphics_2dGeometry.makeWiredPolygon;
  var loadTexture = clWeb2dGame_graphics_texture.loadTexture;
  var adjustToTarget = clWeb2dGame_utils_calc.adjustToTarget;
  var cloneVector2d = clWeb2dGame_core_basicComponents.cloneVector2d;
  var getScreenWidth = clWeb2dGame_core_camera.getScreenWidth;
  var getEntityParam = clWeb2dGame_core_basicComponents.getEntityParam;
  var collideEntitiesP = clWeb2dGame_physics_collision.collideEntitiesP;
  var copyPoint2dTo = clWeb2dGame_core_basicComponents.copyPoint2dTo;
  var decfVector2d = clWeb2dGame_utils_calc.decfVector2d;
  var processInput = clWeb2dGame_inputs_input.processInput;
  var transformfPointInverse = clWeb2dGame_utils_calc.transformfPointInverse;
  var getMeshSize = clWeb2dGame_graphics_2dGeometry.getMeshSize;
  var readKvs = clWeb2dGame_utils_storage.readKvs;
  var initCamera = clWeb2dGame_core_camera.initCamera;
  var calcDistToLine = clWeb2dGame_utils_calc.calcDistToLine;
  var makeRect2d = clWeb2dGame_core_basicComponents.makeRect2d;
  var point2dP = clWeb2dGame_core_basicComponents.point2dP;
  var setConsoleLogLevel = clWeb2dGame_utils_debug_logger.setConsoleLogLevel;
  var getPhysicalKeyName = clWeb2dGame_inputs_input.getPhysicalKeyName;
  var addMouseWheelCallback = clWeb2dGame_inputs_input.addMouseWheelCallback;
  var getCameraOffsetX = clWeb2dGame_core_camera.getCameraOffsetX;
  var keyDownCount = clWeb2dGame_inputs_input.keyDownCount;
  var makeSpeed2d = clWeb2dGame_core_basicComponents.makeSpeed2d;
  var makeWiredRegularPolygon = clWeb2dGame_graphics_2dGeometry.makeWiredRegularPolygon;
  var loadFont = clWeb2dGame_graphics_font.loadFont;
  var getMeshWidth = clWeb2dGame_graphics_2dGeometry.getMeshWidth;
  var findModel2dByLabel = clWeb2dGame_graphics_drawModelSystem.findModel2dByLabel;
  var clearTextArea = clWeb2dGame_graphics_textArea.clearTextArea;
  var initInput = clWeb2dGame_inputs_input.initInput;
  var slashVecScalar = clWeb2dGame_utils_calc.slashVecScalar;
  var resetAnimation = clWeb2dGame_graphics_animation.resetAnimation;
  var lerpVector2d = clWeb2dGame_utils_calc.lerpVector2d;
  var decfRotateDiff = clWeb2dGame_utils_calc.decfRotateDiff;
  var initDefaultSystems = clWeb2dGame_core_initializer.initDefaultSystems;
  var setfColliderModelEnable = clWeb2dGame_physics_collisionSystem.setfColliderModelEnable;
  var makeTextureModelPromise = clWeb2dGame_graphics_2dGeometry.makeTextureModelPromise;
  var registerAnimation = clWeb2dGame_graphics_animationManager.registerAnimation;
  var initUiSystem = clWeb2dGame_inputs_ui.initUiSystem;
  var addTouchStartCallback = clWeb2dGame_inputs_input.addTouchStartCallback;
  var makeTextModelPromise = clWeb2dGame_graphics_2dGeometry.makeTextModelPromise;
  var params = clWeb2dGame_core_basicComponents.params;
  var physicCircle = clWeb2dGame_physics_collision.physicCircle;
  var CONSOLELOGFUNCTION = clWeb2dGame_utils_debug_logger.CONSOLELOGFUNCTION;
  var keyUpCount = clWeb2dGame_inputs_input.keyUpCount;
  var enableModel2d = clWeb2dGame_graphics_drawModelSystem.enableModel2d;
  var makeVector2d = clWeb2dGame_core_basicComponents.makeVector2d;
  var makePhysicPolygon = clWeb2dGame_physics_collision.makePhysicPolygon;
  var makeTextArea = clWeb2dGame_graphics_textArea.makeTextArea;
  var diffAngle = clWeb2dGame_utils_calc.diffAngle;
  var collisionSystem = clWeb2dGame_physics_collisionSystem.collisionSystem;
  var uiComponent = clWeb2dGame_inputs_ui.uiComponent;
  var makePhysicRect = clWeb2dGame_physics_collision.makePhysicRect;
  var calcGlobalPoint = clWeb2dGame_utils_calc.calcGlobalPoint;
  var makeRotate2d = clWeb2dGame_core_basicComponents.makeRotate2d;
  var getTouchState = clWeb2dGame_inputs_input.getTouchState;
  var getTotalTouchX = clWeb2dGame_inputs_input.getTotalTouchX;
  var switchCurrentAnimation = clWeb2dGame_graphics_animationManager.switchCurrentAnimation;
  var initController = mogewebzou_game_controller.initController;
  var addImage = mogewebzou_game_state_menu.addImage;
  var initTest = mogewebzou_game_controller.initTest;
  /* --- define objects --- */
  function gameMainState() {
      this.startProcess = function (state1148) {
          addToEventLog('hoge');
          var newParent1149 = state1148.parent;
          try {
              stackDefaultEcsEntityParent(newParent1149);
              var background = makeEcsEntity();
              addEcsComponentList(background, makePoint2d('x', 0, 'y', 0), makeModel2d('model', makeSolidRect('width', 300, 'height', 300, 'color', 15658734), 'depth', 100));
              addEcsEntity(background);
              initTest();
          } finally {
              popDefaultEcsEntityParent();
          };
          __PS_MV_REG = [];
          return true;
      };
      this.process = function (state1150) {
          if (keyUpNowP('escape')) {
              addToEventLog('main');
              makeState('menu');
          };
          __PS_MV_REG = [];
          return null;
      };
      this.endProcess = function (state1151) {
          registerNextFrameFunc(function () {
              __PS_MV_REG = [];
              return deleteEcsEntity(state1151.parent);
          });
          __PS_MV_REG = [];
          return true;
      };
      this.parent = makeEcsEntity();
      __PS_MV_REG = [];
      return this;
  };
  function makeGameMainState() {
      var _js2082 = arguments.length;
      for (var n2081 = 0; n2081 < _js2082; n2081 += 2) {
          switch (arguments[n2081]) {
          case 'start-process':
              startProcess = arguments[n2081 + 1];
              break;
          case 'process':
              process = arguments[n2081 + 1];
              break;
          case 'end-process':
              endProcess = arguments[n2081 + 1];
              break;
          case 'parent':
              parent = arguments[n2081 + 1];
          };
      };
      var startProcess = 'undefined' === typeof startProcess ? function (state1152) {
          addToEventLog('hoge');
          var newParent1153 = state1152.parent;
          try {
              stackDefaultEcsEntityParent(newParent1153);
              var background = makeEcsEntity();
              addEcsComponentList(background, makePoint2d('x', 0, 'y', 0), makeModel2d('model', makeSolidRect('width', 300, 'height', 300, 'color', 15658734), 'depth', 100));
              addEcsEntity(background);
              initTest();
          } finally {
              popDefaultEcsEntityParent();
          };
          __PS_MV_REG = [];
          return true;
      } : startProcess;
      var process = 'undefined' === typeof process ? function (state1154) {
          if (keyUpNowP('escape')) {
              addToEventLog('main');
              makeState('menu');
          };
          __PS_MV_REG = [];
          return null;
      } : process;
      var endProcess = 'undefined' === typeof endProcess ? function (state1155) {
          registerNextFrameFunc(function () {
              __PS_MV_REG = [];
              return deleteEcsEntity(state1155.parent);
          });
          __PS_MV_REG = [];
          return true;
      } : endProcess;
      var parent = 'undefined' === typeof parent ? makeEcsEntity() : parent;
      var result = new gameMainState();
      result.startProcess = startProcess;
      result.process = process;
      result.endProcess = endProcess;
      result.parent = parent;
      __PS_MV_REG = [];
      return result;
  };
  function gameMainStateP(obj) {
      return (obj instanceof gameMainState);
  };
  (function () {
      var tempCtor = function () {
          return null;
      };
      tempCtor.prototype = gameState.prototype;
      gameMainState.superClass_ = gameState.prototype;
      gameMainState.prototype = new tempCtor();
      __PS_MV_REG = [];
      return gameMainState.prototype.constructor = gameMainState;
  })();
  clWeb2dGame_core_gameState._internal.registerStateMaker('main', makeGameMainState);
  /* --- extern symbols --- */
  return {
    'makeGameMainState': makeGameMainState,
    '_internal': {
      'gameMainState': gameMainState,
      'gameMainStateP': gameMainStateP,
    }
  };
})();

var mogewebzou_game_state_package = (function() {
  /* --- import symbols --- */
  var makeGameMainState = mogewebzou_game_state_main.makeGameMainState;
  var makeGameMenuState = mogewebzou_game_state_menu.makeGameMenuState;
  var addImage = mogewebzou_game_state_menu.addImage;
  var makeGameGlobalInitState = mogewebzou_game_state_globalInit.makeGameGlobalInitState;
  var makeState = clWeb2dGame_core_gameState.makeState;
  var initGameState = clWeb2dGame_core_gameState.initGameState;
  /* --- define objects --- */
  function initWebzouGameState() {
      __PS_MV_REG = [];
      return initGameState(makeState('global-init'));
  };
  /* --- extern symbols --- */
  return {
    'initWebzouGameState': initWebzouGameState,
    '_internal': {
    }
  };
})();

var mogewebzou_game_game = (function() {
  /* --- import symbols --- */
  var setfColliderModelDepth = clWeb2dGame_physics_collisionSystem.setfColliderModelDepth;
  var calcDistToLineSeg = clWeb2dGame_utils_calc.calcDistToLineSeg;
  var transformfPoint = clWeb2dGame_utils_calc.transformfPoint;
  var animation2d = clWeb2dGame_graphics_animation.animation2d;
  var makeLine = clWeb2dGame_graphics_2dGeometry.makeLine;
  var makeScriptSystem = clWeb2dGame_core_basicSystems.makeScriptSystem;
  var startReversedAnimation = clWeb2dGame_graphics_animation.startReversedAnimation;
  var getCameraOffsetY = clWeb2dGame_core_camera.getCameraOffsetY;
  var makeSolidCircle = clWeb2dGame_graphics_2dGeometry.makeSolidCircle;
  var keyUpP = clWeb2dGame_inputs_input.keyUpP;
  var getTouchX = clWeb2dGame_inputs_input.getTouchX;
  var boundingBox2d = clWeb2dGame_physics_collision.boundingBox2d;
  var enableAnimation = clWeb2dGame_graphics_animation.enableAnimation;
  var script2d = clWeb2dGame_core_basicComponents.script2d;
  var getTextAreaSize = clWeb2dGame_graphics_textArea.getTextAreaSize;
  var makeWiredCircle = clWeb2dGame_graphics_2dGeometry.makeWiredCircle;
  var rect2dP = clWeb2dGame_core_basicComponents.rect2dP;
  var changeGeometryUvs = clWeb2dGame_graphics_2dGeometry.changeGeometryUvs;
  var animationSystem = clWeb2dGame_core_basicSystems.animationSystem;
  var addToMonitoringLog = clWeb2dGame_utils_debug_logger.addToMonitoringLog;
  var addToEventLog = clWeb2dGame_utils_debug_logger.addToEventLog;
  var clonePoint2d = clWeb2dGame_core_basicComponents.clonePoint2d;
  var multfVecScalar = clWeb2dGame_utils_calc.multfVecScalar;
  var vector2d = clWeb2dGame_core_basicComponents.vector2d;
  var keyDownP = clWeb2dGame_inputs_input.keyDownP;
  var initDrawModelSystem = clWeb2dGame_graphics_drawModelSystem.initDrawModelSystem;
  var makeSolidRegularPolygon = clWeb2dGame_graphics_2dGeometry.makeSolidRegularPolygon;
  var initAnimationManager = clWeb2dGame_graphics_animationManager.initAnimationManager;
  var getScreenHeight = clWeb2dGame_core_camera.getScreenHeight;
  var makeSolidRect = clWeb2dGame_graphics_2dGeometry.makeSolidRect;
  var makeState = clWeb2dGame_core_gameState.makeState;
  var model2dP = clWeb2dGame_graphics_drawModelSystem.model2dP;
  var initGui = clWeb2dGame_inputs_gui.initGui;
  var makePoint2d = clWeb2dGame_core_basicComponents.makePoint2d;
  var drawDebugLineByTime = clWeb2dGame_utils_debug_debugDrawer.drawDebugLineByTime;
  var calcOuterProductZ = clWeb2dGame_utils_calc.calcOuterProductZ;
  var textAreaComponent = clWeb2dGame_graphics_textArea.textAreaComponent;
  var rotate2dP = clWeb2dGame_core_basicComponents.rotate2dP;
  var initAnimation2d = clWeb2dGame_graphics_animation.initAnimation2d;
  var texture2dP = clWeb2dGame_graphics_texture.texture2dP;
  var makeUiComponent = clWeb2dGame_inputs_ui.makeUiComponent;
  var divfVecScalar = clWeb2dGame_utils_calc.divfVecScalar;
  var truncateVector2d = clWeb2dGame_utils_calc.truncateVector2d;
  var vector2dAngle = clWeb2dGame_utils_calc.vector2dAngle;
  var getLeftMouseState = clWeb2dGame_inputs_input.getLeftMouseState;
  var runAnimationProcess = clWeb2dGame_graphics_animation.runAnimationProcess;
  var getMouseUpCount = clWeb2dGame_inputs_input.getMouseUpCount;
  var STANDARDDEBUGDEPTH = clWeb2dGame_utils_debug_debugDrawer.STANDARDDEBUGDEPTH;
  var calcDist = clWeb2dGame_utils_calc.calcDist;
  var makeSolidPolygon = clWeb2dGame_graphics_2dGeometry.makeSolidPolygon;
  var addPanelButton = clWeb2dGame_inputs_gui.addPanelButton;
  var startAnimation = clWeb2dGame_graphics_animation.startAnimation;
  var reverseAnimation = clWeb2dGame_graphics_animation.reverseAnimation;
  var truncatefVector2d = clWeb2dGame_utils_calc.truncatefVector2d;
  var gameStateManager = clWeb2dGame_core_gameState.gameStateManager;
  var STANDARDDEBUGPOINTR = clWeb2dGame_utils_debug_debugDrawer.STANDARDDEBUGPOINTR;
  var makePhysicCircle = clWeb2dGame_physics_collision.makePhysicCircle;
  var keyUpNowP = clWeb2dGame_inputs_input.keyUpNowP;
  var unloadTexture = clWeb2dGame_graphics_texture.unloadTexture;
  var reverseCurrentAnimation = clWeb2dGame_graphics_animationManager.reverseCurrentAnimation;
  var getMouseDownCount = clWeb2dGame_inputs_input.getMouseDownCount;
  var addPanelFolder = clWeb2dGame_inputs_gui.addPanelFolder;
  var rotateToTargetAngle = clWeb2dGame_utils_calc.rotateToTargetAngle;
  var stage = clWeb2dGame_utils_stageGenerator.stage;
  var addTextToArea = clWeb2dGame_graphics_textArea.addTextToArea;
  var makeBoundingBox2d = clWeb2dGame_physics_collision.makeBoundingBox2d;
  var disableAnimation = clWeb2dGame_graphics_animation.disableAnimation;
  var addMouseDownCallback = clWeb2dGame_inputs_input.addMouseDownCallback;
  var addTouchEndCallback = clWeb2dGame_inputs_input.addTouchEndCallback;
  var getRightMouseState = clWeb2dGame_inputs_input.getRightMouseState;
  var updateModel2d = clWeb2dGame_graphics_drawModelSystem.updateModel2d;
  var physic2d = clWeb2dGame_physics_collision.physic2d;
  var updateBoundingBox = clWeb2dGame_physics_collision.updateBoundingBox;
  var addPanelNumber = clWeb2dGame_inputs_gui.addPanelNumber;
  var texture2d = clWeb2dGame_graphics_texture.texture2d;
  var addMouseUpCallback = clWeb2dGame_inputs_input.addMouseUpCallback;
  var getFontPromise = clWeb2dGame_graphics_font.getFontPromise;
  var initEventLogArea = clWeb2dGame_utils_debug_logger.initEventLogArea;
  var disableModel2d = clWeb2dGame_graphics_drawModelSystem.disableModel2d;
  var setfVector2dAbs = clWeb2dGame_utils_calc.setfVector2dAbs;
  var gameState = clWeb2dGame_core_gameState.gameState;
  var physicPolygon = clWeb2dGame_physics_collision.physicPolygon;
  var processStage = clWeb2dGame_utils_stageGenerator.processStage;
  var getMouseX = clWeb2dGame_inputs_input.getMouseX;
  var drawDebugLine = clWeb2dGame_utils_debug_debugDrawer.drawDebugLine;
  var makeScript2d = clWeb2dGame_core_basicComponents.makeScript2d;
  var calcInnerProduct = clWeb2dGame_utils_calc.calcInnerProduct;
  var start2dGame = clWeb2dGame_core_initializer.start2dGame;
  var makeTextAreaComponent = clWeb2dGame_graphics_textArea.makeTextAreaComponent;
  var clearGuiPanel = clWeb2dGame_inputs_gui.clearGuiPanel;
  var animationManager = clWeb2dGame_graphics_animationManager.animationManager;
  var subVector2d = clWeb2dGame_utils_calc.subVector2d;
  var getMouseState = clWeb2dGame_inputs_input.getMouseState;
  var calcLocalPoint = clWeb2dGame_utils_calc.calcLocalPoint;
  var keyDownNowP = clWeb2dGame_inputs_input.keyDownNowP;
  var clearKvsAll = clWeb2dGame_utils_storage.clearKvsAll;
  var incfRotateDiff = clWeb2dGame_utils_calc.incfRotateDiff;
  var makeWiredRect = clWeb2dGame_graphics_2dGeometry.makeWiredRect;
  var processGameState = clWeb2dGame_core_gameState.processGameState;
  var lerpScalar = clWeb2dGame_utils_calc.lerpScalar;
  var removeKvs = clWeb2dGame_utils_storage.removeKvs;
  var setfColliderModelColor = clWeb2dGame_physics_collisionSystem.setfColliderModelColor;
  var point2d = clWeb2dGame_core_basicComponents.point2d;
  var vector2dP = clWeb2dGame_core_basicComponents.vector2dP;
  var startKeyMonitoring = clWeb2dGame_inputs_input.startKeyMonitoring;
  var makeCollisionSystem = clWeb2dGame_physics_collisionSystem.makeCollisionSystem;
  var speed2d = clWeb2dGame_core_basicComponents.speed2d;
  var initMonitoringLog = clWeb2dGame_utils_debug_logger.initMonitoringLog;
  var getTotalTouchState = clWeb2dGame_inputs_input.getTotalTouchState;
  var initGameState = clWeb2dGame_core_gameState.initGameState;
  var rotate2d = clWeb2dGame_core_basicComponents.rotate2d;
  var rect2d = clWeb2dGame_core_basicComponents.rect2d;
  var getMouseWheelDeltaY = clWeb2dGame_inputs_input.getMouseWheelDeltaY;
  var colTwoBoundingBoxP = clWeb2dGame_physics_collision.colTwoBoundingBoxP;
  var drawDebugPointByTime = clWeb2dGame_utils_debug_debugDrawer.drawDebugPointByTime;
  var vecScalar = clWeb2dGame_utils_calc.vecScalar;
  var movefVectorToCircle = clWeb2dGame_utils_calc.movefVectorToCircle;
  var makeLines = clWeb2dGame_graphics_2dGeometry.makeLines;
  var getMeshHeight = clWeb2dGame_graphics_2dGeometry.getMeshHeight;
  var STANDARDDEBUGCOLOR = clWeb2dGame_utils_debug_debugDrawer.STANDARDDEBUGCOLOR;
  var getTexture2dWidth = clWeb2dGame_graphics_texture.getTexture2dWidth;
  var addTouchMoveCallback = clWeb2dGame_inputs_input.addTouchMoveCallback;
  var stopAnimation = clWeb2dGame_graphics_animation.stopAnimation;
  var makePhysic2d = clWeb2dGame_physics_collision.makePhysic2d;
  var clearMonitoringLog = clWeb2dGame_utils_debug_logger.clearMonitoringLog;
  var initGameStateManager = clWeb2dGame_core_gameState.initGameStateManager;
  var setKvsPrefix = clWeb2dGame_utils_storage.setKvsPrefix;
  var addVector2d = clWeb2dGame_utils_calc.addVector2d;
  var changeModelColor = clWeb2dGame_graphics_2dGeometry.changeModelColor;
  var vector2dAbs = clWeb2dGame_utils_calc.vector2dAbs;
  var drawDebugPoint = clWeb2dGame_utils_debug_debugDrawer.drawDebugPoint;
  var incfVector2d = clWeb2dGame_utils_calc.incfVector2d;
  var getTouchY = clWeb2dGame_inputs_input.getTouchY;
  var getTexturePromise = clWeb2dGame_graphics_texture.getTexturePromise;
  var judgeCollisionTargetTags = clWeb2dGame_physics_collision.judgeCollisionTargetTags;
  var speed2dP = clWeb2dGame_core_basicComponents.speed2dP;
  var setEntityParam = clWeb2dGame_core_basicComponents.setEntityParam;
  var makeSimpleMoveSystem = clWeb2dGame_core_basicSystems.makeSimpleMoveSystem;
  var makeModel2d = clWeb2dGame_graphics_drawModelSystem.makeModel2d;
  var scriptSystem = clWeb2dGame_core_basicSystems.scriptSystem;
  var interruptGameState = clWeb2dGame_core_gameState.interruptGameState;
  var makeTextureModel = clWeb2dGame_graphics_2dGeometry.makeTextureModel;
  var addPanelBool = clWeb2dGame_inputs_gui.addPanelBool;
  var collidePhysicsP = clWeb2dGame_physics_collision.collidePhysicsP;
  var addMouseMoveCallback = clWeb2dGame_inputs_input.addMouseMoveCallback;
  var copyVector2dTo = clWeb2dGame_core_basicComponents.copyVector2dTo;
  var getMouseY = clWeb2dGame_inputs_input.getMouseY;
  var storeKvs = clWeb2dGame_utils_storage.storeKvs;
  var makeAnimationSystem = clWeb2dGame_core_basicSystems.makeAnimationSystem;
  var getTexture2dHeight = clWeb2dGame_graphics_texture.getTexture2dHeight;
  var getTotalTouchY = clWeb2dGame_inputs_input.getTotalTouchY;
  var calcDistP2 = clWeb2dGame_utils_calc.calcDistP2;
  var dumpPerformanceCounter = clWeb2dGame_utils_debug_performance.dumpPerformanceCounter;
  var MAXEVENTLOGCOUNT = clWeb2dGame_utils_debug_logger.MAXEVENTLOGCOUNT;
  var rotatefPointBy = clWeb2dGame_utils_calc.rotatefPointBy;
  var calcParentGlobalPoint = clWeb2dGame_utils_calc.calcParentGlobalPoint;
  var model2d = clWeb2dGame_graphics_drawModelSystem.model2d;
  var setfVector2dAngle = clWeb2dGame_utils_calc.setfVector2dAngle;
  var initEntityParams = clWeb2dGame_core_basicComponents.initEntityParams;
  var makeWiredPolygon = clWeb2dGame_graphics_2dGeometry.makeWiredPolygon;
  var loadTexture = clWeb2dGame_graphics_texture.loadTexture;
  var adjustToTarget = clWeb2dGame_utils_calc.adjustToTarget;
  var cloneVector2d = clWeb2dGame_core_basicComponents.cloneVector2d;
  var getScreenWidth = clWeb2dGame_core_camera.getScreenWidth;
  var getEntityParam = clWeb2dGame_core_basicComponents.getEntityParam;
  var collideEntitiesP = clWeb2dGame_physics_collision.collideEntitiesP;
  var copyPoint2dTo = clWeb2dGame_core_basicComponents.copyPoint2dTo;
  var decfVector2d = clWeb2dGame_utils_calc.decfVector2d;
  var processInput = clWeb2dGame_inputs_input.processInput;
  var transformfPointInverse = clWeb2dGame_utils_calc.transformfPointInverse;
  var getMeshSize = clWeb2dGame_graphics_2dGeometry.getMeshSize;
  var readKvs = clWeb2dGame_utils_storage.readKvs;
  var initCamera = clWeb2dGame_core_camera.initCamera;
  var calcDistToLine = clWeb2dGame_utils_calc.calcDistToLine;
  var makeRect2d = clWeb2dGame_core_basicComponents.makeRect2d;
  var point2dP = clWeb2dGame_core_basicComponents.point2dP;
  var setConsoleLogLevel = clWeb2dGame_utils_debug_logger.setConsoleLogLevel;
  var getPhysicalKeyName = clWeb2dGame_inputs_input.getPhysicalKeyName;
  var addMouseWheelCallback = clWeb2dGame_inputs_input.addMouseWheelCallback;
  var getCameraOffsetX = clWeb2dGame_core_camera.getCameraOffsetX;
  var keyDownCount = clWeb2dGame_inputs_input.keyDownCount;
  var makeSpeed2d = clWeb2dGame_core_basicComponents.makeSpeed2d;
  var makeWiredRegularPolygon = clWeb2dGame_graphics_2dGeometry.makeWiredRegularPolygon;
  var loadFont = clWeb2dGame_graphics_font.loadFont;
  var getMeshWidth = clWeb2dGame_graphics_2dGeometry.getMeshWidth;
  var findModel2dByLabel = clWeb2dGame_graphics_drawModelSystem.findModel2dByLabel;
  var clearTextArea = clWeb2dGame_graphics_textArea.clearTextArea;
  var initInput = clWeb2dGame_inputs_input.initInput;
  var slashVecScalar = clWeb2dGame_utils_calc.slashVecScalar;
  var resetAnimation = clWeb2dGame_graphics_animation.resetAnimation;
  var lerpVector2d = clWeb2dGame_utils_calc.lerpVector2d;
  var decfRotateDiff = clWeb2dGame_utils_calc.decfRotateDiff;
  var initDefaultSystems = clWeb2dGame_core_initializer.initDefaultSystems;
  var setfColliderModelEnable = clWeb2dGame_physics_collisionSystem.setfColliderModelEnable;
  var makeTextureModelPromise = clWeb2dGame_graphics_2dGeometry.makeTextureModelPromise;
  var registerAnimation = clWeb2dGame_graphics_animationManager.registerAnimation;
  var initUiSystem = clWeb2dGame_inputs_ui.initUiSystem;
  var addTouchStartCallback = clWeb2dGame_inputs_input.addTouchStartCallback;
  var makeTextModelPromise = clWeb2dGame_graphics_2dGeometry.makeTextModelPromise;
  var params = clWeb2dGame_core_basicComponents.params;
  var physicCircle = clWeb2dGame_physics_collision.physicCircle;
  var CONSOLELOGFUNCTION = clWeb2dGame_utils_debug_logger.CONSOLELOGFUNCTION;
  var keyUpCount = clWeb2dGame_inputs_input.keyUpCount;
  var enableModel2d = clWeb2dGame_graphics_drawModelSystem.enableModel2d;
  var makeVector2d = clWeb2dGame_core_basicComponents.makeVector2d;
  var makePhysicPolygon = clWeb2dGame_physics_collision.makePhysicPolygon;
  var makeTextArea = clWeb2dGame_graphics_textArea.makeTextArea;
  var diffAngle = clWeb2dGame_utils_calc.diffAngle;
  var collisionSystem = clWeb2dGame_physics_collisionSystem.collisionSystem;
  var uiComponent = clWeb2dGame_inputs_ui.uiComponent;
  var makePhysicRect = clWeb2dGame_physics_collision.makePhysicRect;
  var calcGlobalPoint = clWeb2dGame_utils_calc.calcGlobalPoint;
  var makeRotate2d = clWeb2dGame_core_basicComponents.makeRotate2d;
  var getTouchState = clWeb2dGame_inputs_input.getTouchState;
  var getTotalTouchX = clWeb2dGame_inputs_input.getTotalTouchX;
  var switchCurrentAnimation = clWeb2dGame_graphics_animationManager.switchCurrentAnimation;
  var deleteDeleteComponentHook = clPsEcs_ecs.deleteDeleteComponentHook;
  var makeEcsEntity = clPsEcs_ecs.makeEcsEntity;
  var addEcsComponent = clPsEcs_ecs.addEcsComponent;
  var ecsEntity = clPsEcs_ecs.ecsEntity;
  var deleteEcsComponentType = clPsEcs_ecs.deleteEcsComponentType;
  var framePromise = clPsEcs_framePromise.framePromise;
  var deleteEntityTag = clPsEcs_ecs.deleteEntityTag;
  var deleteEcsEntity = clPsEcs_ecs.deleteEcsEntity;
  var cleanEcsEnv = clPsEcs_ecs.cleanEcsEnv;
  var addDeleteComponentHook = clPsEcs_ecs.addDeleteComponentHook;
  var ecsMain = clPsEcs_ecs.ecsMain;
  var includesAllComponentTypes = clPsEcs_utils.includesAllComponentTypes;
  var findAComponent = clPsEcs_ecs.findAComponent;
  var registerNframesAfterFunc = clPsEcs_basicProcess.registerNframesAfterFunc;
  var moveEcsEntity = clPsEcs_ecs.moveEcsEntity;
  var ecsComponent = clPsEcs_ecs.ecsComponent;
  var popDefaultEcsEntityParent = clPsEcs_ecs.popDefaultEcsEntityParent;
  var framePromiseP = clPsEcs_framePromise.framePromiseP;
  var getEcsComponent = clPsEcs_ecs.getEcsComponent;
  var ecsSystem = clPsEcs_ecs.ecsSystem;
  var addEntityTag = clPsEcs_ecs.addEntityTag;
  var ecsEntityP = clPsEcs_ecs.ecsEntityP;
  var registerEcsSystem = clPsEcs_ecs.registerEcsSystem;
  var registerFuncWithPred = clPsEcs_basicProcess.registerFuncWithPred;
  var addEcsEntityToBuffer = clPsEcs_ecs.addEcsEntityToBuffer;
  var checkEntityTags = clPsEcs_ecs.checkEntityTags;
  var initFramePromise = clPsEcs_framePromise.initFramePromise;
  var framePromiseThen = clPsEcs_framePromise.framePromiseThen;
  var addEcsEntity = clPsEcs_ecs.addEcsEntity;
  var registerNextFrameFunc = clPsEcs_basicProcess.registerNextFrameFunc;
  var findAEntityByTag = clPsEcs_ecs.findAEntityByTag;
  var stackDefaultEcsEntityParent = clPsEcs_ecs.stackDefaultEcsEntityParent;
  var addEcsComponentList = clPsEcs_ecs.addEcsComponentList;
  var framePromiseAll = clPsEcs_framePromise.framePromiseAll;
  var findTheEntity = clPsEcs_ecs.findTheEntity;
  var findAEntity = clPsEcs_ecs.findAEntity;
  var hasEntityTag = clPsEcs_ecs.hasEntityTag;
  var deleteEcsComponent = clPsEcs_ecs.deleteEcsComponent;
  var getDefaultEcsEntityParent = clPsEcs_ecs.getDefaultEcsEntityParent;
  var initWebzouGameState = mogewebzou_game_state_package.initWebzouGameState;
  /* --- define objects --- */
  function initFunc(scene) {
      initWebzouGameState();
      initDefaultSystems('scene', scene);
      __PS_MV_REG = [];
      return initInput();
  };
  function updateFunc() {
      __PS_MV_REG = [];
      return processGameState();
  };
  /* --- extern symbols --- */
  return {
    'initFunc': initFunc,
    'updateFunc': updateFunc,
    '_internal': {
    }
  };
})();

var mogewebzou_server = (function() {
  /* --- import symbols --- */
  var setfColliderModelDepth = clWeb2dGame_physics_collisionSystem.setfColliderModelDepth;
  var calcDistToLineSeg = clWeb2dGame_utils_calc.calcDistToLineSeg;
  var transformfPoint = clWeb2dGame_utils_calc.transformfPoint;
  var animation2d = clWeb2dGame_graphics_animation.animation2d;
  var makeLine = clWeb2dGame_graphics_2dGeometry.makeLine;
  var makeScriptSystem = clWeb2dGame_core_basicSystems.makeScriptSystem;
  var startReversedAnimation = clWeb2dGame_graphics_animation.startReversedAnimation;
  var getCameraOffsetY = clWeb2dGame_core_camera.getCameraOffsetY;
  var makeSolidCircle = clWeb2dGame_graphics_2dGeometry.makeSolidCircle;
  var keyUpP = clWeb2dGame_inputs_input.keyUpP;
  var getTouchX = clWeb2dGame_inputs_input.getTouchX;
  var boundingBox2d = clWeb2dGame_physics_collision.boundingBox2d;
  var enableAnimation = clWeb2dGame_graphics_animation.enableAnimation;
  var script2d = clWeb2dGame_core_basicComponents.script2d;
  var getTextAreaSize = clWeb2dGame_graphics_textArea.getTextAreaSize;
  var makeWiredCircle = clWeb2dGame_graphics_2dGeometry.makeWiredCircle;
  var rect2dP = clWeb2dGame_core_basicComponents.rect2dP;
  var changeGeometryUvs = clWeb2dGame_graphics_2dGeometry.changeGeometryUvs;
  var animationSystem = clWeb2dGame_core_basicSystems.animationSystem;
  var addToMonitoringLog = clWeb2dGame_utils_debug_logger.addToMonitoringLog;
  var addToEventLog = clWeb2dGame_utils_debug_logger.addToEventLog;
  var clonePoint2d = clWeb2dGame_core_basicComponents.clonePoint2d;
  var multfVecScalar = clWeb2dGame_utils_calc.multfVecScalar;
  var vector2d = clWeb2dGame_core_basicComponents.vector2d;
  var keyDownP = clWeb2dGame_inputs_input.keyDownP;
  var initDrawModelSystem = clWeb2dGame_graphics_drawModelSystem.initDrawModelSystem;
  var makeSolidRegularPolygon = clWeb2dGame_graphics_2dGeometry.makeSolidRegularPolygon;
  var initAnimationManager = clWeb2dGame_graphics_animationManager.initAnimationManager;
  var getScreenHeight = clWeb2dGame_core_camera.getScreenHeight;
  var makeSolidRect = clWeb2dGame_graphics_2dGeometry.makeSolidRect;
  var makeState = clWeb2dGame_core_gameState.makeState;
  var model2dP = clWeb2dGame_graphics_drawModelSystem.model2dP;
  var initGui = clWeb2dGame_inputs_gui.initGui;
  var makePoint2d = clWeb2dGame_core_basicComponents.makePoint2d;
  var drawDebugLineByTime = clWeb2dGame_utils_debug_debugDrawer.drawDebugLineByTime;
  var calcOuterProductZ = clWeb2dGame_utils_calc.calcOuterProductZ;
  var textAreaComponent = clWeb2dGame_graphics_textArea.textAreaComponent;
  var rotate2dP = clWeb2dGame_core_basicComponents.rotate2dP;
  var initAnimation2d = clWeb2dGame_graphics_animation.initAnimation2d;
  var texture2dP = clWeb2dGame_graphics_texture.texture2dP;
  var makeUiComponent = clWeb2dGame_inputs_ui.makeUiComponent;
  var divfVecScalar = clWeb2dGame_utils_calc.divfVecScalar;
  var truncateVector2d = clWeb2dGame_utils_calc.truncateVector2d;
  var vector2dAngle = clWeb2dGame_utils_calc.vector2dAngle;
  var getLeftMouseState = clWeb2dGame_inputs_input.getLeftMouseState;
  var runAnimationProcess = clWeb2dGame_graphics_animation.runAnimationProcess;
  var getMouseUpCount = clWeb2dGame_inputs_input.getMouseUpCount;
  var STANDARDDEBUGDEPTH = clWeb2dGame_utils_debug_debugDrawer.STANDARDDEBUGDEPTH;
  var calcDist = clWeb2dGame_utils_calc.calcDist;
  var makeSolidPolygon = clWeb2dGame_graphics_2dGeometry.makeSolidPolygon;
  var addPanelButton = clWeb2dGame_inputs_gui.addPanelButton;
  var startAnimation = clWeb2dGame_graphics_animation.startAnimation;
  var reverseAnimation = clWeb2dGame_graphics_animation.reverseAnimation;
  var truncatefVector2d = clWeb2dGame_utils_calc.truncatefVector2d;
  var gameStateManager = clWeb2dGame_core_gameState.gameStateManager;
  var STANDARDDEBUGPOINTR = clWeb2dGame_utils_debug_debugDrawer.STANDARDDEBUGPOINTR;
  var makePhysicCircle = clWeb2dGame_physics_collision.makePhysicCircle;
  var keyUpNowP = clWeb2dGame_inputs_input.keyUpNowP;
  var unloadTexture = clWeb2dGame_graphics_texture.unloadTexture;
  var reverseCurrentAnimation = clWeb2dGame_graphics_animationManager.reverseCurrentAnimation;
  var getMouseDownCount = clWeb2dGame_inputs_input.getMouseDownCount;
  var addPanelFolder = clWeb2dGame_inputs_gui.addPanelFolder;
  var rotateToTargetAngle = clWeb2dGame_utils_calc.rotateToTargetAngle;
  var stage = clWeb2dGame_utils_stageGenerator.stage;
  var addTextToArea = clWeb2dGame_graphics_textArea.addTextToArea;
  var makeBoundingBox2d = clWeb2dGame_physics_collision.makeBoundingBox2d;
  var disableAnimation = clWeb2dGame_graphics_animation.disableAnimation;
  var addMouseDownCallback = clWeb2dGame_inputs_input.addMouseDownCallback;
  var addTouchEndCallback = clWeb2dGame_inputs_input.addTouchEndCallback;
  var getRightMouseState = clWeb2dGame_inputs_input.getRightMouseState;
  var updateModel2d = clWeb2dGame_graphics_drawModelSystem.updateModel2d;
  var physic2d = clWeb2dGame_physics_collision.physic2d;
  var updateBoundingBox = clWeb2dGame_physics_collision.updateBoundingBox;
  var addPanelNumber = clWeb2dGame_inputs_gui.addPanelNumber;
  var texture2d = clWeb2dGame_graphics_texture.texture2d;
  var addMouseUpCallback = clWeb2dGame_inputs_input.addMouseUpCallback;
  var getFontPromise = clWeb2dGame_graphics_font.getFontPromise;
  var initEventLogArea = clWeb2dGame_utils_debug_logger.initEventLogArea;
  var disableModel2d = clWeb2dGame_graphics_drawModelSystem.disableModel2d;
  var setfVector2dAbs = clWeb2dGame_utils_calc.setfVector2dAbs;
  var gameState = clWeb2dGame_core_gameState.gameState;
  var physicPolygon = clWeb2dGame_physics_collision.physicPolygon;
  var processStage = clWeb2dGame_utils_stageGenerator.processStage;
  var getMouseX = clWeb2dGame_inputs_input.getMouseX;
  var drawDebugLine = clWeb2dGame_utils_debug_debugDrawer.drawDebugLine;
  var makeScript2d = clWeb2dGame_core_basicComponents.makeScript2d;
  var calcInnerProduct = clWeb2dGame_utils_calc.calcInnerProduct;
  var start2dGame = clWeb2dGame_core_initializer.start2dGame;
  var makeTextAreaComponent = clWeb2dGame_graphics_textArea.makeTextAreaComponent;
  var clearGuiPanel = clWeb2dGame_inputs_gui.clearGuiPanel;
  var animationManager = clWeb2dGame_graphics_animationManager.animationManager;
  var subVector2d = clWeb2dGame_utils_calc.subVector2d;
  var getMouseState = clWeb2dGame_inputs_input.getMouseState;
  var calcLocalPoint = clWeb2dGame_utils_calc.calcLocalPoint;
  var keyDownNowP = clWeb2dGame_inputs_input.keyDownNowP;
  var clearKvsAll = clWeb2dGame_utils_storage.clearKvsAll;
  var incfRotateDiff = clWeb2dGame_utils_calc.incfRotateDiff;
  var makeWiredRect = clWeb2dGame_graphics_2dGeometry.makeWiredRect;
  var processGameState = clWeb2dGame_core_gameState.processGameState;
  var lerpScalar = clWeb2dGame_utils_calc.lerpScalar;
  var removeKvs = clWeb2dGame_utils_storage.removeKvs;
  var setfColliderModelColor = clWeb2dGame_physics_collisionSystem.setfColliderModelColor;
  var point2d = clWeb2dGame_core_basicComponents.point2d;
  var vector2dP = clWeb2dGame_core_basicComponents.vector2dP;
  var startKeyMonitoring = clWeb2dGame_inputs_input.startKeyMonitoring;
  var makeCollisionSystem = clWeb2dGame_physics_collisionSystem.makeCollisionSystem;
  var speed2d = clWeb2dGame_core_basicComponents.speed2d;
  var initMonitoringLog = clWeb2dGame_utils_debug_logger.initMonitoringLog;
  var getTotalTouchState = clWeb2dGame_inputs_input.getTotalTouchState;
  var initGameState = clWeb2dGame_core_gameState.initGameState;
  var rotate2d = clWeb2dGame_core_basicComponents.rotate2d;
  var rect2d = clWeb2dGame_core_basicComponents.rect2d;
  var getMouseWheelDeltaY = clWeb2dGame_inputs_input.getMouseWheelDeltaY;
  var colTwoBoundingBoxP = clWeb2dGame_physics_collision.colTwoBoundingBoxP;
  var drawDebugPointByTime = clWeb2dGame_utils_debug_debugDrawer.drawDebugPointByTime;
  var vecScalar = clWeb2dGame_utils_calc.vecScalar;
  var movefVectorToCircle = clWeb2dGame_utils_calc.movefVectorToCircle;
  var makeLines = clWeb2dGame_graphics_2dGeometry.makeLines;
  var getMeshHeight = clWeb2dGame_graphics_2dGeometry.getMeshHeight;
  var STANDARDDEBUGCOLOR = clWeb2dGame_utils_debug_debugDrawer.STANDARDDEBUGCOLOR;
  var getTexture2dWidth = clWeb2dGame_graphics_texture.getTexture2dWidth;
  var addTouchMoveCallback = clWeb2dGame_inputs_input.addTouchMoveCallback;
  var stopAnimation = clWeb2dGame_graphics_animation.stopAnimation;
  var makePhysic2d = clWeb2dGame_physics_collision.makePhysic2d;
  var clearMonitoringLog = clWeb2dGame_utils_debug_logger.clearMonitoringLog;
  var initGameStateManager = clWeb2dGame_core_gameState.initGameStateManager;
  var setKvsPrefix = clWeb2dGame_utils_storage.setKvsPrefix;
  var addVector2d = clWeb2dGame_utils_calc.addVector2d;
  var changeModelColor = clWeb2dGame_graphics_2dGeometry.changeModelColor;
  var vector2dAbs = clWeb2dGame_utils_calc.vector2dAbs;
  var drawDebugPoint = clWeb2dGame_utils_debug_debugDrawer.drawDebugPoint;
  var incfVector2d = clWeb2dGame_utils_calc.incfVector2d;
  var getTouchY = clWeb2dGame_inputs_input.getTouchY;
  var getTexturePromise = clWeb2dGame_graphics_texture.getTexturePromise;
  var judgeCollisionTargetTags = clWeb2dGame_physics_collision.judgeCollisionTargetTags;
  var speed2dP = clWeb2dGame_core_basicComponents.speed2dP;
  var setEntityParam = clWeb2dGame_core_basicComponents.setEntityParam;
  var makeSimpleMoveSystem = clWeb2dGame_core_basicSystems.makeSimpleMoveSystem;
  var makeModel2d = clWeb2dGame_graphics_drawModelSystem.makeModel2d;
  var scriptSystem = clWeb2dGame_core_basicSystems.scriptSystem;
  var interruptGameState = clWeb2dGame_core_gameState.interruptGameState;
  var makeTextureModel = clWeb2dGame_graphics_2dGeometry.makeTextureModel;
  var addPanelBool = clWeb2dGame_inputs_gui.addPanelBool;
  var collidePhysicsP = clWeb2dGame_physics_collision.collidePhysicsP;
  var addMouseMoveCallback = clWeb2dGame_inputs_input.addMouseMoveCallback;
  var copyVector2dTo = clWeb2dGame_core_basicComponents.copyVector2dTo;
  var getMouseY = clWeb2dGame_inputs_input.getMouseY;
  var storeKvs = clWeb2dGame_utils_storage.storeKvs;
  var makeAnimationSystem = clWeb2dGame_core_basicSystems.makeAnimationSystem;
  var getTexture2dHeight = clWeb2dGame_graphics_texture.getTexture2dHeight;
  var getTotalTouchY = clWeb2dGame_inputs_input.getTotalTouchY;
  var calcDistP2 = clWeb2dGame_utils_calc.calcDistP2;
  var dumpPerformanceCounter = clWeb2dGame_utils_debug_performance.dumpPerformanceCounter;
  var MAXEVENTLOGCOUNT = clWeb2dGame_utils_debug_logger.MAXEVENTLOGCOUNT;
  var rotatefPointBy = clWeb2dGame_utils_calc.rotatefPointBy;
  var calcParentGlobalPoint = clWeb2dGame_utils_calc.calcParentGlobalPoint;
  var model2d = clWeb2dGame_graphics_drawModelSystem.model2d;
  var setfVector2dAngle = clWeb2dGame_utils_calc.setfVector2dAngle;
  var initEntityParams = clWeb2dGame_core_basicComponents.initEntityParams;
  var makeWiredPolygon = clWeb2dGame_graphics_2dGeometry.makeWiredPolygon;
  var loadTexture = clWeb2dGame_graphics_texture.loadTexture;
  var adjustToTarget = clWeb2dGame_utils_calc.adjustToTarget;
  var cloneVector2d = clWeb2dGame_core_basicComponents.cloneVector2d;
  var getScreenWidth = clWeb2dGame_core_camera.getScreenWidth;
  var getEntityParam = clWeb2dGame_core_basicComponents.getEntityParam;
  var collideEntitiesP = clWeb2dGame_physics_collision.collideEntitiesP;
  var copyPoint2dTo = clWeb2dGame_core_basicComponents.copyPoint2dTo;
  var decfVector2d = clWeb2dGame_utils_calc.decfVector2d;
  var processInput = clWeb2dGame_inputs_input.processInput;
  var transformfPointInverse = clWeb2dGame_utils_calc.transformfPointInverse;
  var getMeshSize = clWeb2dGame_graphics_2dGeometry.getMeshSize;
  var readKvs = clWeb2dGame_utils_storage.readKvs;
  var initCamera = clWeb2dGame_core_camera.initCamera;
  var calcDistToLine = clWeb2dGame_utils_calc.calcDistToLine;
  var makeRect2d = clWeb2dGame_core_basicComponents.makeRect2d;
  var point2dP = clWeb2dGame_core_basicComponents.point2dP;
  var setConsoleLogLevel = clWeb2dGame_utils_debug_logger.setConsoleLogLevel;
  var getPhysicalKeyName = clWeb2dGame_inputs_input.getPhysicalKeyName;
  var addMouseWheelCallback = clWeb2dGame_inputs_input.addMouseWheelCallback;
  var getCameraOffsetX = clWeb2dGame_core_camera.getCameraOffsetX;
  var keyDownCount = clWeb2dGame_inputs_input.keyDownCount;
  var makeSpeed2d = clWeb2dGame_core_basicComponents.makeSpeed2d;
  var makeWiredRegularPolygon = clWeb2dGame_graphics_2dGeometry.makeWiredRegularPolygon;
  var loadFont = clWeb2dGame_graphics_font.loadFont;
  var getMeshWidth = clWeb2dGame_graphics_2dGeometry.getMeshWidth;
  var findModel2dByLabel = clWeb2dGame_graphics_drawModelSystem.findModel2dByLabel;
  var clearTextArea = clWeb2dGame_graphics_textArea.clearTextArea;
  var initInput = clWeb2dGame_inputs_input.initInput;
  var slashVecScalar = clWeb2dGame_utils_calc.slashVecScalar;
  var resetAnimation = clWeb2dGame_graphics_animation.resetAnimation;
  var lerpVector2d = clWeb2dGame_utils_calc.lerpVector2d;
  var decfRotateDiff = clWeb2dGame_utils_calc.decfRotateDiff;
  var initDefaultSystems = clWeb2dGame_core_initializer.initDefaultSystems;
  var setfColliderModelEnable = clWeb2dGame_physics_collisionSystem.setfColliderModelEnable;
  var makeTextureModelPromise = clWeb2dGame_graphics_2dGeometry.makeTextureModelPromise;
  var registerAnimation = clWeb2dGame_graphics_animationManager.registerAnimation;
  var initUiSystem = clWeb2dGame_inputs_ui.initUiSystem;
  var addTouchStartCallback = clWeb2dGame_inputs_input.addTouchStartCallback;
  var makeTextModelPromise = clWeb2dGame_graphics_2dGeometry.makeTextModelPromise;
  var params = clWeb2dGame_core_basicComponents.params;
  var physicCircle = clWeb2dGame_physics_collision.physicCircle;
  var CONSOLELOGFUNCTION = clWeb2dGame_utils_debug_logger.CONSOLELOGFUNCTION;
  var keyUpCount = clWeb2dGame_inputs_input.keyUpCount;
  var enableModel2d = clWeb2dGame_graphics_drawModelSystem.enableModel2d;
  var makeVector2d = clWeb2dGame_core_basicComponents.makeVector2d;
  var makePhysicPolygon = clWeb2dGame_physics_collision.makePhysicPolygon;
  var makeTextArea = clWeb2dGame_graphics_textArea.makeTextArea;
  var diffAngle = clWeb2dGame_utils_calc.diffAngle;
  var collisionSystem = clWeb2dGame_physics_collisionSystem.collisionSystem;
  var uiComponent = clWeb2dGame_inputs_ui.uiComponent;
  var makePhysicRect = clWeb2dGame_physics_collision.makePhysicRect;
  var calcGlobalPoint = clWeb2dGame_utils_calc.calcGlobalPoint;
  var makeRotate2d = clWeb2dGame_core_basicComponents.makeRotate2d;
  var getTouchState = clWeb2dGame_inputs_input.getTouchState;
  var getTotalTouchX = clWeb2dGame_inputs_input.getTotalTouchX;
  var switchCurrentAnimation = clWeb2dGame_graphics_animationManager.switchCurrentAnimation;
  var initFunc = mogewebzou_game_game.initFunc;
  var updateFunc = mogewebzou_game_game.updateFunc;
  /* --- define objects --- */
  function __psMainFunc__() {
      var width = 800;
      var height = 600;
      __PS_MV_REG = [];
      return start2dGame('screen-width', width, 'screen-height', height, 'resize-to-screen-p', true, 'camera', initCamera(0, 0, width, height), 'rendered-dom', document.querySelector('#renderer'), 'stats-dom', document.querySelector('#stats-output'), 'monitoring-log-dom', document.querySelector('#monitor'), 'event-log-dom', document.querySelector('#eventlog'), 'init-function', initFunc, 'update-function', updateFunc);
  };
  /* --- extern symbols --- */
  return {
    '_internal': {
      '__psMainFunc__': __psMainFunc__,
    }
  };
})();

mogewebzou_server._internal.__psMainFunc__();