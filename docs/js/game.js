var psExperiment_defines_defmethod = (function() {
  /* --- import symbols --- */

  /* --- define objects --- */
  function dispatchItem() {
      this.typeList = null;
      this.func = null;
      return this;
  };
  function makeDispatchItem() {
      var _js2119 = arguments.length;
      for (var n2118 = 0; n2118 < _js2119; n2118 += 2) {
          switch (arguments[n2118]) {
          case 'type-list':
              typeList = arguments[n2118 + 1];
              break;
          case 'func':
              func = arguments[n2118 + 1];
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
      var _js2121 = testInstanceList.length;
      var _js2123 = targetTypeList.length;
      var FIRST2124 = true;
      for (var _js2120 = 0; _js2120 < _js2121; _js2120 += 1) {
          var testInstance = testInstanceList[_js2120];
          var _js2122 = FIRST2124 ? 0 : _js2122 + 1;
          if (_js2122 >= _js2123) {
              break;
          };
          var targetType = targetTypeList[_js2122];
          if (!instanceDispatchP(testInstance, targetType)) {
              __PS_MV_REG = [];
              return null;
          };
          FIRST2124 = null;
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
      var _js2126 = testTypeList.length;
      var _js2128 = targetTypeList.length;
      var FIRST2129 = true;
      for (var _js2125 = 0; _js2125 < _js2126; _js2125 += 1) {
          var testType = testTypeList[_js2125];
          var _js2127 = FIRST2129 ? 0 : _js2127 + 1;
          if (_js2127 >= _js2128) {
              break;
          };
          var targetType = targetTypeList[_js2127];
          if (!typeDispatchP(testType, targetType)) {
              __PS_MV_REG = [];
              return null;
          };
          FIRST2129 = null;
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
      var _js2131 = arguments.length;
      for (var n2130 = 2; n2130 < _js2131; n2130 += 2) {
          switch (arguments[n2130]) {
          case 'from':
              from = arguments[n2130 + 1];
              break;
          case 'if-does-not-exist':
              ifDoesNotExist = arguments[n2130 + 1];
          };
      };
      var from = 'undefined' === typeof from ? 0 : from;
      var ifDoesNotExist = 'undefined' === typeof ifDoesNotExist ? 'error' : ifDoesNotExist;
      var dispatchItemList = DISPATCHLISTTABLE[functionName];
      if (!dispatchItemList) {
          throw 'Message: ' + 'There is no generic function \"~A\"' + '; Args: ' + functionName;
      };
      var _js2132 = dispatchItemList.length;
      for (var i = from; i < _js2132; i += 1) {
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
      var _js2134 = arguments.length;
      for (var n2133 = 0; n2133 < _js2134; n2133 += 2) {
          switch (arguments[n2133]) {
          case 'time':
              time = arguments[n2133 + 1];
              break;
          case 'func':
              func = arguments[n2133 + 1];
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
      var _js2136 = arguments.length;
      for (var n2135 = 0; n2135 < _js2136; n2135 += 2) {
          switch (arguments[n2135]) {
          case 'func':
              func = arguments[n2135 + 1];
              break;
          case 'include-list':
              includeList = arguments[n2135 + 1];
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
      var _js2138 = arguments.length;
      for (var n2137 = 0; n2137 < _js2138; n2137 += 2) {
          switch (arguments[n2137]) {
          case 'current-time':
              currentTime = arguments[n2137 + 1];
              break;
          case 'element-list':
              elementList = arguments[n2137 + 1];
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
      var gSequence2139;
      var gKey2140;
      stage.elementList.unshift(makeElement('time', time, 'func', func));
      stage.elementList;
      __PS_MV_REG = [];
      return stage.elementList = (gSequence2139 = stage.elementList, gKey2140 = null, (gSequence2139.sort(function (a, b) {
          var keyA = a;
          var keyB = b;
          return (function (a, b) {
              return a.time < b.time;
          })(keyA, keyB) ? -1 : 1;
      }), gSequence2139));
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
          var _js2142 = arguments.length;
          for (var n2141 = 0; n2141 < _js2142; n2141 += 2) {
              switch (arguments[n2141]) {
              case 'time':
                  time = arguments[n2141 + 1];
                  break;
              case 'func':
                  func = arguments[n2141 + 1];
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
      for (var callback = null, _js_idx2143 = 0; _js_idx2143 < hooks.length; _js_idx2143 += 1) {
          callback = hooks[_js_idx2143];
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
      var _js2145 = arguments.length;
      for (var n2144 = 0; n2144 < _js2145; n2144 += 2) {
          switch (arguments[n2144]) {
          case 'func':
              func = arguments[n2144 + 1];
              break;
          case 'pred':
              pred = arguments[n2144 + 1];
              break;
          case 'rest-timeout-frame':
              restTimeoutFrame = arguments[n2144 + 1];
              break;
          case 'name':
              name = arguments[n2144 + 1];
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
      var copy2148;
      var copy2151;
      var executedList = [];
      for (var funcWithPred = null, _js_arrvar2147 = (copy2148 = FUNCWITHPREDLIST.concat(), copy2148.reverse()), _js_idx2146 = 0; _js_idx2146 < _js_arrvar2147.length; _js_idx2146 += 1) {
          funcWithPred = _js_arrvar2147[_js_idx2146];
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
      for (var executed = null, _js_idx2149 = 0; _js_idx2149 < executedList.length; _js_idx2149 += 1) {
          executed = executedList[_js_idx2149];
          FUNCWITHPREDLIST = (copy2151 = FUNCWITHPREDLIST, copy2151.filter(function (x) {
              return !(function (target2150) {
                  return executed === target2150;
              })(x);
          }));
      };
  };
  /**
   * Register a function that will be executed when the predication function return true in first of a frame.
   * The name is not used in the process but it is useful for debug.
   */
  function registerFuncWithPred(func, pred) {
      var _js2151 = arguments.length;
      for (var n2150 = 2; n2150 < _js2151; n2150 += 2) {
          switch (arguments[n2150]) {
          case 'timeout-frame':
              timeoutFrame = arguments[n2150 + 1];
              break;
          case 'name':
              name = arguments[n2150 + 1];
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
      var _js2153 = arguments.length;
      for (var n2152 = 0; n2152 < _js2153; n2152 += 2) {
          switch (arguments[n2152]) {
          case 'result':
              result = arguments[n2152 + 1];
              break;
          case 'resolved-p':
              resolvedP = arguments[n2152 + 1];
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
      var _js2155 = arguments.length;
      for (var n2154 = 2; n2154 < _js2155; n2154 += 2) {
          switch (arguments[n2154]) {
          case 'timeout-frame':
              timeoutFrame = arguments[n2154 + 1];
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
      var _js2157 = arguments.length;
      for (var n2156 = 2; n2156 < _js2157; n2156 += 2) {
          switch (arguments[n2156]) {
          case 'timeout-frame':
              timeoutFrame = arguments[n2156 + 1];
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
      var _js2159 = arguments.length;
      for (var n2158 = 0; n2158 < _js2159; n2158 += 2) {
          switch (arguments[n2158]) {
          case 'parent':
              parent = arguments[n2158 + 1];
              break;
          case 'children':
              children = arguments[n2158 + 1];
              break;
          case 'registerp':
              registerp = arguments[n2158 + 1];
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
              for (var child = null, _js_arrvar2161 = oneNode.children, _js_idx2160 = 0; _js_idx2160 < _js_arrvar2161.length; _js_idx2160 += 1) {
                  child = _js_arrvar2161[_js_idx2160];
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
      var copy2163;
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
          node.parent.children = (copy2163 = node.parent.children, copy2163.filter(function (x) {
              return !(function (target2162) {
                  return node === target2162;
              })(x);
          }));
          node.parent = null;
      };
      var rec = function (oneNode, lst) {
          var copy2165;
          if (oneNode.registerp) {
              var removedLst = (copy2165 = lst, copy2165.filter(function (x) {
                  return !(function (target2164) {
                      return oneNode === target2164;
                  })(x);
              }));
              callback(oneNode);
              oneNode.registerp = null;
              for (var child = null, _js_arrvar2167 = oneNode.children, _js_idx2166 = 0; _js_idx2166 < _js_arrvar2167.length; _js_idx2166 += 1) {
                  child = _js_arrvar2167[_js_idx2166];
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
      for (var node = null, _js_idx2168 = 0; _js_idx2168 < placeLst.length; _js_idx2168 += 1) {
          node = placeLst[_js_idx2168];
          if (predicate(node)) {
              deleteLst.unshift(node);
              deleteLst;
          };
      };
      for (var node = null, _js_idx2169 = 0; _js_idx2169 < deleteLst.length; _js_idx2169 += 1) {
          node = deleteLst[_js_idx2169];
          if (node.registerp) {
              placeLst = deleteFlatTreeNode(node, placeLst, callback);
          };
      };
      __PS_MV_REG = [];
      return placeLst;
  };
  /** Move a flat-tree node under a new-parent. */
  function moveFlatTreeNode(node, newParent) {
      var copy2173;
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
          return oldParent.children = (copy2173 = oldParent.children, copy2173.filter(function (x) {
              return !(function (target2172) {
                  return node === target2172;
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
      var _js2175 = arguments.length;
      for (var n2174 = 0; n2174 < _js2175; n2174 += 2) {
          switch (arguments[n2174]) {
          case 'parent':
              parent = arguments[n2174 + 1];
              break;
          case 'children':
              children = arguments[n2174 + 1];
              break;
          case 'registerp':
              registerp = arguments[n2174 + 1];
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
          var rec1158 = function (comp) {
              if (predicate(comp)) {
                  __PS_MV_REG = [];
                  throw { '__ps_block_tag' : 'findAComponent', '__ps_value' : comp };
              };
              for (var child = null, _js_arrvar2177 = comp.children, _js_idx2176 = 0; _js_idx2176 < _js_arrvar2177.length; _js_idx2176 += 1) {
                  child = _js_arrvar2177[_js_idx2176];
                  rec1158(child);
              };
          };
          rec1158(topComponent);
          __PS_MV_REG = [];
          return null;
      } catch (_ps_err2178) {
          if (_ps_err2178 && 'findAComponent' === _ps_err2178['__ps_block_tag']) {
              return _ps_err2178['__ps_value'];
          } else {
              throw _ps_err2178;
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
      var _js2180 = arguments.length;
      for (var n2179 = 0; n2179 < _js2180; n2179 += 2) {
          switch (arguments[n2179]) {
          case 'parent':
              parent = arguments[n2179 + 1];
              break;
          case 'children':
              children = arguments[n2179 + 1];
              break;
          case 'registerp':
              registerp = arguments[n2179 + 1];
              break;
          case 'id':
              id = arguments[n2179 + 1];
              break;
          case 'tags':
              tags = arguments[n2179 + 1];
              break;
          case 'components':
              components = arguments[n2179 + 1];
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
      for (var entity = null, _js_arrvar2182 = getEntityList(), _js_idx2181 = 0; _js_idx2181 < _js_arrvar2182.length; _js_idx2181 += 1) {
          entity = _js_arrvar2182[_js_idx2181];
          entity.registerp = null;
      };
      __PS_MV_REG = [];
      return ENTITYLIST = [];
  };
  /** Get a component from entity by component-type */
  function getEcsComponent(componentType, entity) {
      for (var x2183 = null, _js_arrvar2185 = entity.components, _js_idx2184 = 0; _js_idx2184 < _js_arrvar2185.length; _js_idx2184 += 1) {
          x2183 = _js_arrvar2185[_js_idx2184];
          if ((function (component) {
              __PS_MV_REG = [];
              return (component instanceof (typeof componentType === 'string' ? eval(componentType) : componentType));
          })(x2183)) {
              return x2183;
          };
      };
  };
  /** Find a registered entity by predicate */
  function findAEntity(predicate) {
      for (var entity = null, _js_arrvar2187 = getEntityList(), _js_idx2186 = 0; _js_idx2186 < _js_arrvar2187.length; _js_idx2186 += 1) {
          entity = _js_arrvar2187[_js_idx2186];
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
      for (var tag = null, _js_idx2188 = 0; _js_idx2188 < tags.length; _js_idx2188 += 1) {
          tag = tags[_js_idx2188];
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
      for (var tag = null, _js_idx2189 = 0; _js_idx2189 < tags.length; _js_idx2189 += 1) {
          tag = tags[_js_idx2189];
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
      var _js2191 = arguments.length;
      for (var n2190 = 0; n2190 < _js2191; n2190 += 2) {
          switch (arguments[n2190]) {
          case 'enable':
              enable = arguments[n2190 + 1];
              break;
          case 'target-entities':
              targetEntities = arguments[n2190 + 1];
              break;
          case 'target-component-types':
              targetComponentTypes = arguments[n2190 + 1];
              break;
          case 'process':
              process = arguments[n2190 + 1];
              break;
          case 'process-all':
              processAll = arguments[n2190 + 1];
              break;
          case 'add-entity-hook':
              addEntityHook = arguments[n2190 + 1];
              break;
          case 'delete-entity-hook':
              deleteEntityHook = arguments[n2190 + 1];
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
      for (var pair1159 = null, _js_arrvar2193 = getEcsSystemList(), _js_idx2192 = 0; _js_idx2192 < _js_arrvar2193.length; _js_idx2192 += 1) {
          pair1159 = _js_arrvar2193[_js_idx2192];
          var system = pair1159[1];
          if (system.enable) {
              system.processAll(system);
              for (var entity = null, _js_arrvar2195 = system.targetEntities, _js_idx2194 = 0; _js_idx2194 < _js_arrvar2195.length; _js_idx2194 += 1) {
                  entity = _js_arrvar2195[_js_idx2194];
                  system.process(entity);
              };
          };
      };
  };
  function isRegisteredEntity(entity, system) {
      for (var x2195 = null, _js_arrvar2197 = system.targetEntities, _js_idx2196 = 0; _js_idx2196 < _js_arrvar2197.length; _js_idx2196 += 1) {
          x2195 = _js_arrvar2197[_js_idx2196];
          if ((function (target2194) {
              return entity === target2194;
          })(x2195)) {
              return x2195;
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
              for (var x2198 = null, _js_arrvar2200 = system.targetEntities, _js_idx2199 = 0; _js_idx2199 < _js_arrvar2200.length; _js_idx2199 += 1) {
                  x2198 = _js_arrvar2200[_js_idx2199];
                  if ((function (elem) {
                      return entity === elem;
                  })(x2198)) {
                      return x2198;
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
      for (var pair1160 = null, _js_arrvar2202 = getEcsSystemList(), _js_idx2201 = 0; _js_idx2201 < _js_arrvar2202.length; _js_idx2201 += 1) {
          pair1160 = _js_arrvar2202[_js_idx2201];
          var system = pair1160[1];
          pushEntityToSystemIfNeeded(entity, system);
      };
  };
  function deleteEntityFromSystemIfRegistered(entity, system) {
      var copy2204;
      if (isRegisteredEntity(entity, system)) {
          system.deleteEntityHook(entity);
          __PS_MV_REG = [];
          return system.targetEntities = (copy2204 = system.targetEntities, copy2204.filter(function (x) {
              return !(function (target2203) {
                  return entity === target2203;
              })(x);
          }));
      };
  };
  function deleteEntityFromAllSystems(entity) {
      for (var pair1161 = null, _js_arrvar2206 = getEcsSystemList(), _js_idx2205 = 0; _js_idx2205 < _js_arrvar2206.length; _js_idx2205 += 1) {
          pair1161 = _js_arrvar2206[_js_idx2205];
          var system = pair1161[1];
          deleteEntityFromSystemIfRegistered(entity, system);
      };
  };
  function deleteEntityFromNoLongerBelongSystems(entity) {
      for (var pair1162 = null, _js_arrvar2208 = getEcsSystemList(), _js_idx2207 = 0; _js_idx2207 < _js_arrvar2208.length; _js_idx2207 += 1) {
          pair1162 = _js_arrvar2208[_js_idx2207];
          var system = pair1162[1];
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
      var rec1163 = function (target) {
          pushEntityToAllTargetSystem(target);
          for (var child = null, _js_arrvar2210 = target.children, _js_idx2209 = 0; _js_idx2209 < _js_arrvar2210.length; _js_idx2209 += 1) {
              child = _js_arrvar2210[_js_idx2209];
              rec1163(child);
          };
      };
      rec1163(entity);
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
      var rec1164 = function (target) {
          deleteEntityFromAllSystems(target);
          for (var child = null, _js_arrvar2212 = target.children, _js_idx2211 = 0; _js_idx2211 < _js_arrvar2212.length; _js_idx2211 += 1) {
              child = _js_arrvar2212[_js_idx2211];
              rec1164(child);
          };
      };
      __PS_MV_REG = [];
      return rec1164(entity);
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
          for (var x2213 = null, _js_idx2214 = 0; _js_idx2214 < ECSSYSTEMLIST.length; _js_idx2214 += 1) {
              x2213 = ECSSYSTEMLIST[_js_idx2214];
              if ((function (pair) {
                  return pair[0] === name;
              })(x2213)) {
                  return x2213;
              };
          };
      })();
      if (found) {
          found[1] = system;
      } else {
          ECSSYSTEMLIST = ECSSYSTEMLIST.concat([[name, system]]);
      };
      system.targetEntities = [];
      for (var entity = null, _js_arrvar2216 = getEntityList(), _js_idx2215 = 0; _js_idx2215 < _js_arrvar2216.length; _js_idx2215 += 1) {
          entity = _js_arrvar2216[_js_idx2215];
          pushEntityToSystemIfNeeded(entity, system);
      };
      __PS_MV_REG = [];
      return system;
  };
  function checkComponentUniqueness(component, entity) {
      if ((function () {
          for (var x2222 = null, _js_arrvar2224 = entity.components, _js_idx2223 = 0; _js_idx2223 < _js_arrvar2224.length; _js_idx2223 += 1) {
              x2222 = _js_arrvar2224[_js_idx2223];
              if ((function (target2221) {
                  return component === target2221;
              })(x2222)) {
                  return x2222;
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
      for (var component = null, _js_idx2225 = 0; _js_idx2225 < componentList.length; _js_idx2225 += 1) {
          component = componentList[_js_idx2225];
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
          for (var x2226 = null, _js_idx2227 = 0; _js_idx2227 < DELETECOMPONENTHOOKS.length; _js_idx2227 += 1) {
              x2226 = DELETECOMPONENTHOOKS[_js_idx2227];
              if ((function (elem) {
                  return callback === elem;
              })(x2226)) {
                  return x2226;
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
      var copy2229;
      var preLength = DELETECOMPONENTHOOKS.length;
      DELETECOMPONENTHOOKS = (copy2229 = DELETECOMPONENTHOOKS, copy2229.filter(function (x) {
          return !(function (target2228) {
              return callback === target2228;
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
          for (var hook = null, _js_idx2230 = 0; _js_idx2230 < DELETECOMPONENTHOOKS.length; _js_idx2230 += 1) {
              hook = DELETECOMPONENTHOOKS[_js_idx2230];
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
      var _js2232 = arguments.length;
      for (var n2231 = 0; n2231 < _js2232; n2231 += 2) {
          switch (arguments[n2231]) {
          case 'start-process':
              startProcess = arguments[n2231 + 1];
              break;
          case 'process':
              process = arguments[n2231 + 1];
              break;
          case 'end-process':
              endProcess = arguments[n2231 + 1];
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
      var _js2234 = arguments.length;
      for (var n2233 = 0; n2233 < _js2234; n2233 += 2) {
          switch (arguments[n2233]) {
          case 'current-state':
              currentState = arguments[n2233 + 1];
              break;
          case 'next-state':
              nextState = arguments[n2233 + 1];
              break;
          case 'sub-state':
              subState = arguments[n2233 + 1];
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
      var _js2236 = arguments.length;
      for (var n2235 = 0; n2235 < _js2236; n2235 += 2) {
          switch (arguments[n2235]) {
          case 'tree':
              tree = arguments[n2235 + 1];
              break;
          case 'current-node':
              currentNode = arguments[n2235 + 1];
              break;
          case 'target-fps':
              targetFps = arguments[n2235 + 1];
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
      var _js2238 = arguments.length;
      for (var n2237 = 0; n2237 < _js2238; n2237 += 2) {
          switch (arguments[n2237]) {
          case 'name':
              name = arguments[n2237 + 1];
              break;
          case 'results':
              results = arguments[n2237 + 1];
              break;
          case 'count':
              count = arguments[n2237 + 1];
              break;
          case 'color':
              color = arguments[n2237 + 1];
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
      var _js2240 = arguments.length;
      for (var n2239 = 0; n2239 < _js2240; n2239 += 2) {
          switch (arguments[n2239]) {
          case 'element':
              element = arguments[n2239 + 1];
              break;
          case 'children':
              children = arguments[n2239 + 1];
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
      var _js2242 = arguments.length;
      for (var n2241 = 0; n2241 < _js2242; n2241 += 2) {
          switch (arguments[n2241]) {
          case 'array':
              array = arguments[n2241 + 1];
              break;
          case 'count':
              count = arguments[n2241 + 1];
              break;
          case 'next':
              next = arguments[n2241 + 1];
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
              var sum2243 = 0;
              for (var i = 0; i < validLength; i += 1) {
                  sum2243 += buffer.array[i];
              };
              return sum2243;
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
          for (var x2244 = null, _js_arrvar2246 = manager.currentNode.children, _js_idx2245 = 0; _js_idx2245 < _js_arrvar2246.length; _js_idx2245 += 1) {
              x2244 = _js_arrvar2246[_js_idx2245];
              if ((function (node) {
                  return node.element.name === name;
              })(x2244)) {
                  return x2244;
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
      var _js2248 = arguments.length;
      for (var n2247 = 0; n2247 < _js2248; n2247 += 2) {
          switch (arguments[n2247]) {
          case 'timer':
              timer = arguments[n2247 + 1];
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
          var element2249 = node.element;
          var children2250 = node.children;
          var timeMs = ringBufferAverage(element2249.results);
          result = result + '(' + element2249.name + ':' + formatNumber(timeMs, 2, 2);
          if (children2250.length) {
              result += ' ';
              for (var child = null, _js_idx2251 = 0; _js_idx2251 < children2250.length; _js_idx2251 += 1) {
                  child = children2250[_js_idx2251];
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
      var _js2253 = arguments.length;
      for (var n2252 = 1; n2252 < _js2253; n2252 += 2) {
          switch (arguments[n2252]) {
          case 'open-p':
              openP = arguments[n2252 + 1];
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
      var _js2255 = arguments.length;
      for (var n2254 = 2; n2254 < _js2255; n2254 += 2) {
          switch (arguments[n2254]) {
          case 'on-change':
              onChange = arguments[n2254 + 1];
              break;
          case 'folder':
              folder = arguments[n2254 + 1];
          };
      };
      var onChange;
      var folder = 'undefined' === typeof folder ? getGuiDefaultFolder() : folder;
      GUIPANELPARAMS[name] = initValue ? true : false;
      __PS_MV_REG = [];
      return (folder ? folder : GUIPANEL).add(GUIPANELPARAMS, name).onChange(onChange);
  };
  function addPanelNumber(name, initValue) {
      var _js2257 = arguments.length;
      for (var n2256 = 2; n2256 < _js2257; n2256 += 2) {
          switch (arguments[n2256]) {
          case 'on-change':
              onChange = arguments[n2256 + 1];
              break;
          case 'folder':
              folder = arguments[n2256 + 1];
              break;
          case 'min':
              min = arguments[n2256 + 1];
              break;
          case 'max':
              max = arguments[n2256 + 1];
              break;
          case 'step':
              step = arguments[n2256 + 1];
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
      var _js2259 = arguments.length;
      for (var n2258 = 1; n2258 < _js2259; n2258 += 2) {
          switch (arguments[n2258]) {
          case 'on-change':
              onChange = arguments[n2258 + 1];
              break;
          case 'folder':
              folder = arguments[n2258 + 1];
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
      var _js2261 = arguments.length;
      for (var n2260 = 1; n2260 < _js2261; n2260 += 2) {
          switch (arguments[n2260]) {
          case 'name':
              name = arguments[n2260 + 1];
              break;
          case 'weight':
              weight = arguments[n2260 + 1];
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
          for (var oneLine = null, _js_idx2262 = 0; _js_idx2262 < EVENTLOGTEXTLIST.length; _js_idx2262 += 1) {
              oneLine = EVENTLOGTEXTLIST[_js_idx2262];
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
      var _js2264 = arguments.length;
      for (var n2263 = 0; n2263 < _js2264; n2263 += 2) {
          switch (arguments[n2263]) {
          case 'parent':
              parent = arguments[n2263 + 1];
              break;
          case 'children':
              children = arguments[n2263 + 1];
              break;
          case 'registerp':
              registerp = arguments[n2263 + 1];
              break;
          case 'x':
              x = arguments[n2263 + 1];
              break;
          case 'y':
              y = arguments[n2263 + 1];
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
      var _js2266 = arguments.length;
      for (var n2265 = 0; n2265 < _js2266; n2265 += 2) {
          switch (arguments[n2265]) {
          case 'parent':
              parent = arguments[n2265 + 1];
              break;
          case 'children':
              children = arguments[n2265 + 1];
              break;
          case 'registerp':
              registerp = arguments[n2265 + 1];
              break;
          case 'x':
              x = arguments[n2265 + 1];
              break;
          case 'y':
              y = arguments[n2265 + 1];
              break;
          case 'angle':
              angle = arguments[n2265 + 1];
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
      var _js2268 = arguments.length;
      for (var n2267 = 0; n2267 < _js2268; n2267 += 2) {
          switch (arguments[n2267]) {
          case 'parent':
              parent = arguments[n2267 + 1];
              break;
          case 'children':
              children = arguments[n2267 + 1];
              break;
          case 'registerp':
              registerp = arguments[n2267 + 1];
              break;
          case 'x':
              x = arguments[n2267 + 1];
              break;
          case 'y':
              y = arguments[n2267 + 1];
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
      var _js2270 = arguments.length;
      for (var n2269 = 0; n2269 < _js2270; n2269 += 2) {
          switch (arguments[n2269]) {
          case 'parent':
              parent = arguments[n2269 + 1];
              break;
          case 'children':
              children = arguments[n2269 + 1];
              break;
          case 'registerp':
              registerp = arguments[n2269 + 1];
              break;
          case 'x':
              x = arguments[n2269 + 1];
              break;
          case 'y':
              y = arguments[n2269 + 1];
              break;
          case 'width':
              width = arguments[n2269 + 1];
              break;
          case 'height':
              height = arguments[n2269 + 1];
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
      var _js2272 = arguments.length;
      for (var n2271 = 0; n2271 < _js2272; n2271 += 2) {
          switch (arguments[n2271]) {
          case 'parent':
              parent = arguments[n2271 + 1];
              break;
          case 'children':
              children = arguments[n2271 + 1];
              break;
          case 'registerp':
              registerp = arguments[n2271 + 1];
              break;
          case 'speed':
              speed = arguments[n2271 + 1];
              break;
          case 'angle':
              angle = arguments[n2271 + 1];
              break;
          case 'radious':
              radious = arguments[n2271 + 1];
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
      var _js2274 = arguments.length;
      for (var n2273 = 0; n2273 < _js2274; n2273 += 2) {
          switch (arguments[n2273]) {
          case 'parent':
              parent = arguments[n2273 + 1];
              break;
          case 'children':
              children = arguments[n2273 + 1];
              break;
          case 'registerp':
              registerp = arguments[n2273 + 1];
              break;
          case 'table':
              table = arguments[n2273 + 1];
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
      var _js2276 = arguments.length;
      for (var n2275 = 0; n2275 < _js2276; n2275 += 2) {
          switch (arguments[n2275]) {
          case 'parent':
              parent = arguments[n2275 + 1];
              break;
          case 'children':
              children = arguments[n2275 + 1];
              break;
          case 'registerp':
              registerp = arguments[n2275 + 1];
              break;
          case 'func':
              func = arguments[n2275 + 1];
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
      var params2277 = (found = getEcsComponent(params, entity), found ? found : (function () {
          throw 'PARAMS is not included in the entity';
      })());
      __PS_MV_REG = [];
      return params2277.table[key];
  };
  function setEntityParam(entity) {
      var keyValuePair = Array.prototype.slice.call(arguments, 1);
      var params2278 = getEcsComponent(params, entity);
      var len = keyValuePair.length;
      if ((len % 2 + 2) % 2 !== 0) {
          throw 'Message: ' + 'Failed assertion: ~A' + '; Args: ' + ((len % 2 + 2) % 2 === 0);
      };
      if (!params2278) {
          params2278 = makeParams();
          addEcsComponent(params2278, entity);
      };
      var _js2279 = len / 2;
      for (var i = 0; i < _js2279; i += 1) {
          var key = keyValuePair[i * 2];
          var value = keyValuePair[i * 2 + 1];
          params2278.table[key] = value;
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
      var hashTable2280 = BUTTONTOKEYBOARD;
      for (var key = null, _js_arrvar2282 = Object.keys(hashTable2280), _js_idx2281 = 0; _js_idx2281 < _js_arrvar2282.length; _js_idx2281 += 1) {
          key = _js_arrvar2282[_js_idx2281];
          (function (button, key) {
              __PS_MV_REG = [];
              return KEYSTATUS[button] = calcNextInputCount(KEYSTATUS[button], KEYBOARD.pressed(key));
          })(key, hashTable2280[key]);
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
      var _js2284 = arguments.length;
      for (var n2283 = 0; n2283 < _js2284; n2283 += 2) {
          switch (arguments[n2283]) {
          case 'x':
              x = arguments[n2283 + 1];
              break;
          case 'y':
              y = arguments[n2283 + 1];
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
      var _js2286 = arguments.length;
      for (var n2285 = 0; n2285 < _js2286; n2285 += 2) {
          switch (arguments[n2285]) {
          case 'x':
              x = arguments[n2285 + 1];
              break;
          case 'y':
              y = arguments[n2285 + 1];
              break;
          case 'id':
              id = arguments[n2285 + 1];
              break;
          case 'count':
              count = arguments[n2285 + 1];
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
      var _js2288 = arguments.length;
      for (var n2287 = 0; n2287 < _js2288; n2287 += 2) {
          switch (arguments[n2287]) {
          case 'touches':
              touches = arguments[n2287 + 1];
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
      var count2289 = elem.count;
      if (count2289 === 0) {
          return 'up';
      } else if (count2289 === 1) {
          return 'down-now';
      } else if (count2289 > 1) {
          return 'down';
      } else if (count2289 === -1) {
          return 'down';
      } else if (count2289 === -2) {
          return 'up-now';
      } else {
          return 'up';
      };
  };
  function getTotalTouchState() {
      var count = 0;
      var result = null;
      var hashTable2290 = getTouchStateHash();
      for (var key = null, _js_arrvar2292 = Object.keys(hashTable2290), _js_idx2291 = 0; _js_idx2291 < _js_arrvar2292.length; _js_idx2291 += 1) {
          key = _js_arrvar2292[_js_idx2291];
          (function (id, hashValue1165) {
              return hashValue1165.count !== 0 ? ++count : null;
          })(key, hashTable2290[key]);
      };
      switch (count) {
      case 0:
          result = 'up';
          break;
      case 1:
          var hashTable2293 = getTouchStateHash();
          for (var key = null, _js_arrvar2295 = Object.keys(hashTable2293), _js_idx2294 = 0; _js_idx2294 < _js_arrvar2295.length; _js_idx2294 += 1) {
              key = _js_arrvar2295[_js_idx2294];
              (function (id, hashValue1166) {
                  __PS_MV_REG = [];
                  return hashValue1166.count !== 0 ? (result = getTouchState(id)) : null;
              })(key, hashTable2293[key]);
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
          var hashTable2296 = getTouchStateHash();
          for (var key = null, _js_arrvar2298 = Object.keys(hashTable2296), _js_idx2297 = 0; _js_idx2297 < _js_arrvar2298.length; _js_idx2297 += 1) {
              key = _js_arrvar2298[_js_idx2297];
              (function (id, hashValue1167) {
                  if (hashValue1167.count !== 0) {
                      var state = getTouchState(id);
                      __PS_MV_REG = [];
                      return result == null || priorP(state, result) ? (result = state) : null;
                  } else {
                      __PS_MV_REG = [];
                      return null;
                  };
              })(key, hashTable2296[key]);
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
      var hashTable2299 = getTouchStateHash();
      for (var key = null, _js_arrvar2301 = Object.keys(hashTable2299), _js_idx2300 = 0; _js_idx2300 < _js_arrvar2301.length; _js_idx2300 += 1) {
          key = _js_arrvar2301[_js_idx2300];
          (function (id, hashValue1168) {
              if (hashValue1168.count !== 0) {
                  sum += fn(id);
                  return ++count;
              };
          })(key, hashTable2299[key]);
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
      var hashTable2302 = TOUCHSTATEHASH;
      for (var key = null, _js_arrvar2304 = Object.keys(hashTable2302), _js_idx2303 = 0; _js_idx2303 < _js_arrvar2304.length; _js_idx2303 += 1) {
          key = _js_arrvar2304[_js_idx2303];
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
          })(key, hashTable2302[key]);
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
      var touches2305 = result.touches;
      for (var i = 0; i < e.changedTouches.length; i += 1) {
          var touch = e.changedTouches[i];
          var elem = makeTouchEventElement('id', touch.identifier);
          setXyOfTouchEventElement(elem, touch);
          touches2305[i] = elem;
      };
      __PS_MV_REG = [];
      return result;
  };
  function onTouchStart(e) {
      var event = initTouchEvent(e);
      for (var eventElem = null, _js_arrvar2307 = event.touches, _js_idx2306 = 0; _js_idx2306 < _js_arrvar2307.length; _js_idx2306 += 1) {
          eventElem = _js_arrvar2307[_js_idx2306];
          TOUCHSTATEHASH[eventElem.id] = eventElem;
      };
      __PS_MV_REG = [];
      return callTouchStartCallbacks(event);
  };
  function onTouchEnd(e) {
      if (e.touches.length === 0) {
      };
      for (var touch = null, _js_arrvar2309 = e.changedTouches, _js_idx2308 = 0; _js_idx2308 < _js_arrvar2309.length; _js_idx2308 += 1) {
          touch = _js_arrvar2309[_js_idx2308];
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
      for (var touch = null, _js_arrvar2311 = e.changedTouches, _js_idx2310 = 0; _js_idx2310 < _js_arrvar2311.length; _js_idx2310 += 1) {
          touch = _js_arrvar2311[_js_idx2310];
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
          var _js2313 = arguments.length;
          for (var n2312 = 0; n2312 < _js2313; n2312 += 2) {
              switch (arguments[n2312]) {
              case 'time':
                  time = arguments[n2312 + 1];
                  break;
              case 'x':
                  x = arguments[n2312 + 1];
                  break;
              case 'y':
                  y = arguments[n2312 + 1];
                  break;
              case 'angle':
                  angle = arguments[n2312 + 1];
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
          var _js2315 = arguments.length;
          for (var n2314 = 0; n2314 < _js2315; n2314 += 2) {
              switch (arguments[n2314]) {
              case 'time':
                  time = arguments[n2314 + 1];
                  break;
              case 'x':
                  x = arguments[n2314 + 1];
                  break;
              case 'y':
                  y = arguments[n2314 + 1];
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
      var _js2317 = arguments.length;
      for (var n2316 = 0; n2316 < _js2317; n2316 += 2) {
          switch (arguments[n2316]) {
          case 'path-list':
              pathList = arguments[n2316 + 1];
              break;
          case 'material':
              material = arguments[n2316 + 1];
              break;
          case 'rect-uv':
              rectUv = arguments[n2316 + 1];
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
      var _js2319 = arguments.length;
      for (var n2318 = 0; n2318 < _js2319; n2318 += 2) {
          switch (arguments[n2318]) {
          case 'promise':
              promise = arguments[n2318 + 1];
              break;
          case 'ref-count':
              refCount = arguments[n2318 + 1];
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
      var _js2321 = arguments.length;
      for (var n2320 = 0; n2320 < _js2321; n2320 += 2) {
          switch (arguments[n2320]) {
          case 'path':
              path = arguments[n2320 + 1];
              break;
          case 'loader':
              loader = arguments[n2320 + 1];
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
      var _js2323 = arguments.length;
      for (var n2322 = 0; n2322 < _js2323; n2322 += 2) {
          switch (arguments[n2322]) {
          case 'path':
              path = arguments[n2322 + 1];
              break;
          case 'name':
              name = arguments[n2322 + 1];
              break;
          case 'alpha-path':
              alphaPath = arguments[n2322 + 1];
              break;
          case 'x':
              x = arguments[n2322 + 1];
              break;
          case 'y':
              y = arguments[n2322 + 1];
              break;
          case 'width':
              width = arguments[n2322 + 1];
              break;
          case 'height':
              height = arguments[n2322 + 1];
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
          var copy2327;
          TEXTUREPROMISETABLE = (copy2327 = TEXTUREPROMISETABLE, copy2327.filter(function (x) {
              return !(function (target2326) {
                  return texPromise === target2326;
              })(x);
          }));
          for (var path = null, _js_arrvar2325 = tex.pathList, _js_idx2324 = 0; _js_idx2324 < _js_arrvar2325.length; _js_idx2324 += 1) {
              path = _js_arrvar2325[_js_idx2324];
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
      for (var vertexAsLst = null, _js_idx2328 = 0; _js_idx2328 < rawVertexLst.length; _js_idx2328 += 1) {
          vertexAsLst = rawVertexLst[_js_idx2328];
          geometry.vertices.push(new THREE.Vector3(vertexAsLst[0], vertexAsLst[1], 0));
      };
  };
  function pushFacesTo(geometry, rawFaceLst) {
      for (var faceAsLst = null, _js_idx2329 = 0; _js_idx2329 < rawFaceLst.length; _js_idx2329 += 1) {
          faceAsLst = rawFaceLst[_js_idx2329];
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
      var _js2331 = arguments.length;
      for (var n2330 = 0; n2330 < _js2331; n2330 += 2) {
          switch (arguments[n2330]) {
          case 'pos-a':
              posA = arguments[n2330 + 1];
              break;
          case 'pos-b':
              posB = arguments[n2330 + 1];
              break;
          case 'color':
              color = arguments[n2330 + 1];
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
      var _js2333 = arguments.length;
      for (var n2332 = 0; n2332 < _js2333; n2332 += 2) {
          switch (arguments[n2332]) {
          case 'pnt-list':
              pntList = arguments[n2332 + 1];
              break;
          case 'color':
              color = arguments[n2332 + 1];
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
      for (var pnt = null, _js_idx2334 = 0; _js_idx2334 < pntList.length; _js_idx2334 += 1) {
          pnt = pntList[_js_idx2334];
          pushVertices([pnt[0], pnt[1]]);
      };
      __PS_MV_REG = [];
      return makeLineModel(geometry2, color);
  };
  function makeSolidRect() {
      var _js2336 = arguments.length;
      for (var n2335 = 0; n2335 < _js2336; n2335 += 2) {
          switch (arguments[n2335]) {
          case 'width':
              width = arguments[n2335 + 1];
              break;
          case 'height':
              height = arguments[n2335 + 1];
              break;
          case 'color':
              color = arguments[n2335 + 1];
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
      var _js2338 = arguments.length;
      for (var n2337 = 0; n2337 < _js2338; n2337 += 2) {
          switch (arguments[n2337]) {
          case 'width':
              width = arguments[n2337 + 1];
              break;
          case 'height':
              height = arguments[n2337 + 1];
              break;
          case 'color':
              color = arguments[n2337 + 1];
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
      var object2339 = texture.rectUv;
      var uvs = geometry.faceVertexUvs[0];
      var countOuter = 0;
      for (var uv = null, _js_arrvar2341 = makeRectUvs(object2339.x + object2339.width * x, object2339.y + object2339.height * y, object2339.width * width, object2339.height * height), _js_idx2340 = 0; _js_idx2340 < _js_arrvar2341.length; _js_idx2340 += 1) {
          uv = _js_arrvar2341[_js_idx2340];
          if (countOuter >= uvs.length) {
              uvs.push(uv);
          } else {
              var countInner = 0;
              for (var vector = null, _js_idx2342 = 0; _js_idx2342 < uv.length; _js_idx2342 += 1) {
                  vector = uv[_js_idx2342];
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
      var _js2343 = arguments.length;
      for (var n2342 = 0; n2342 < _js2343; n2342 += 2) {
          switch (arguments[n2342]) {
          case 'width':
              width = arguments[n2342 + 1];
              break;
          case 'height':
              height = arguments[n2342 + 1];
              break;
          case 'size-type':
              sizeType = arguments[n2342 + 1];
              break;
          case 'texture':
              texture = arguments[n2342 + 1];
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
      var _js2345 = arguments.length;
      for (var n2344 = 0; n2344 < _js2345; n2344 += 2) {
          switch (arguments[n2344]) {
          case 'width':
              width = arguments[n2344 + 1];
              break;
          case 'height':
              height = arguments[n2344 + 1];
              break;
          case 'size-type':
              sizeType = arguments[n2344 + 1];
              break;
          case 'texture-name':
              textureName = arguments[n2344 + 1];
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
      var _js2347 = arguments.length;
      for (var n2346 = 0; n2346 < _js2347; n2346 += 2) {
          switch (arguments[n2346]) {
          case 'r':
              r = arguments[n2346 + 1];
              break;
          case 'n':
              n = arguments[n2346 + 1];
              break;
          case 'start-angle':
              startAngle = arguments[n2346 + 1];
              break;
          case 'color':
              color = arguments[n2346 + 1];
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
      var _js2349 = arguments.length;
      for (var n2348 = 0; n2348 < _js2349; n2348 += 2) {
          switch (arguments[n2348]) {
          case 'r':
              r = arguments[n2348 + 1];
              break;
          case 'n':
              n = arguments[n2348 + 1];
              break;
          case 'start-angle':
              startAngle = arguments[n2348 + 1];
              break;
          case 'color':
              color = arguments[n2348 + 1];
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
      var _js2351 = arguments.length;
      for (var n2350 = 0; n2350 < _js2351; n2350 += 2) {
          switch (arguments[n2350]) {
          case 'r':
              r = arguments[n2350 + 1];
              break;
          case 'color':
              color = arguments[n2350 + 1];
          };
      };
      var r;
      var color;
      __PS_MV_REG = [];
      return makeSolidRegularPolygon('r', r, 'n', 60, 'color', color);
  };
  function makeWiredCircle() {
      var _js2353 = arguments.length;
      for (var n2352 = 0; n2352 < _js2353; n2352 += 2) {
          switch (arguments[n2352]) {
          case 'r':
              r = arguments[n2352 + 1];
              break;
          case 'color':
              color = arguments[n2352 + 1];
          };
      };
      var r;
      var color;
      __PS_MV_REG = [];
      return makeWiredRegularPolygon('r', r, 'n', 60, 'color', color);
  };
  function makeWiredPolygon() {
      var _js2355 = arguments.length;
      for (var n2354 = 0; n2354 < _js2355; n2354 += 2) {
          switch (arguments[n2354]) {
          case 'pnt-list':
              pntList = arguments[n2354 + 1];
              break;
          case 'color':
              color = arguments[n2354 + 1];
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
      for (var pnt = null, _js_idx2356 = 0; _js_idx2356 < pntList.length; _js_idx2356 += 1) {
          pnt = pntList[_js_idx2356];
          pushVertices(pnt);
      };
      pushVertices(pntList[0]);
      __PS_MV_REG = [];
      return makeLineModel(geometry7, color);
  };
  function makeSolidPolygon() {
      var _js2358 = arguments.length;
      for (var n2357 = 0; n2357 < _js2358; n2357 += 2) {
          switch (arguments[n2357]) {
          case 'pnt-list':
              pntList = arguments[n2357 + 1];
              break;
          case 'color':
              color = arguments[n2357 + 1];
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
      for (var pnt = null, _js_idx2359 = 0; _js_idx2359 < pntList.length; _js_idx2359 += 1) {
          pnt = pntList[_js_idx2359];
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
      var _js2361 = arguments.length;
      for (var n2360 = 1; n2360 < _js2361; n2360 += 2) {
          switch (arguments[n2360]) {
          case 'size':
              size = arguments[n2360 + 1];
              break;
          case 'color':
              color = arguments[n2360 + 1];
              break;
          case 'curve-segments':
              curveSegments = arguments[n2360 + 1];
              break;
          case 'font-name':
              fontName = arguments[n2360 + 1];
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
          for (var vec = null, _js_arrvar2363 = vectors.slice(1), _js_idx2362 = 0; _js_idx2362 < _js_arrvar2363.length; _js_idx2362 += 1) {
              vec = _js_arrvar2363[_js_idx2362];
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
          for (var vec = null, _js_arrvar2365 = vectors.slice(1), _js_idx2364 = 0; _js_idx2364 < _js_arrvar2365.length; _js_idx2364 += 1) {
              vec = _js_arrvar2365[_js_idx2364];
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
      var speed2366 = rotate2d.speed;
      incfRotateDiff(point2d, rotate2d.radious, rotate2d.angle, speed2366);
      point2d.angle += speed2366;
      __PS_MV_REG = [];
      return rotate2d.angle += speed2366;
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
      var _js2368 = arguments.length;
      for (var n2367 = 0; n2367 < _js2368; n2367 += 2) {
          switch (arguments[n2367]) {
          case 'left':
              left = arguments[n2367 + 1];
              break;
          case 'right':
              right = arguments[n2367 + 1];
              break;
          case 'bottom':
              bottom = arguments[n2367 + 1];
              break;
          case 'top':
              top = arguments[n2367 + 1];
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
      var _js2370 = arguments.length;
      for (var n2369 = 0; n2369 < _js2370; n2369 += 2) {
          switch (arguments[n2369]) {
          case 'parent':
              parent = arguments[n2369 + 1];
              break;
          case 'children':
              children = arguments[n2369 + 1];
              break;
          case 'registerp':
              registerp = arguments[n2369 + 1];
              break;
          case 'kind':
              kind = arguments[n2369 + 1];
              break;
          case 'offset':
              offset = arguments[n2369 + 1];
              break;
          case 'target-tags':
              targetTags = arguments[n2369 + 1];
              break;
          case 'bounding-box':
              boundingBox = arguments[n2369 + 1];
              break;
          case 'on-collision':
              onCollision = arguments[n2369 + 1];
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
      var _js2372 = arguments.length;
      for (var n2371 = 0; n2371 < _js2372; n2371 += 2) {
          switch (arguments[n2371]) {
          case 'parent':
              parent = arguments[n2371 + 1];
              break;
          case 'children':
              children = arguments[n2371 + 1];
              break;
          case 'registerp':
              registerp = arguments[n2371 + 1];
              break;
          case 'kind':
              kind = arguments[n2371 + 1];
              break;
          case 'offset':
              offset = arguments[n2371 + 1];
              break;
          case 'target-tags':
              targetTags = arguments[n2371 + 1];
              break;
          case 'bounding-box':
              boundingBox = arguments[n2371 + 1];
              break;
          case 'on-collision':
              onCollision = arguments[n2371 + 1];
              break;
          case 'r':
              r = arguments[n2371 + 1];
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
      var _js2374 = arguments.length;
      for (var n2373 = 0; n2373 < _js2374; n2373 += 2) {
          switch (arguments[n2373]) {
          case 'parent':
              parent = arguments[n2373 + 1];
              break;
          case 'children':
              children = arguments[n2373 + 1];
              break;
          case 'registerp':
              registerp = arguments[n2373 + 1];
              break;
          case 'kind':
              kind = arguments[n2373 + 1];
              break;
          case 'offset':
              offset = arguments[n2373 + 1];
              break;
          case 'target-tags':
              targetTags = arguments[n2373 + 1];
              break;
          case 'bounding-box':
              boundingBox = arguments[n2373 + 1];
              break;
          case 'on-collision':
              onCollision = arguments[n2373 + 1];
              break;
          case 'pnt-list':
              pntList = arguments[n2373 + 1];
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
      var _js2376 = arguments.length;
      for (var n2375 = 0; n2375 < _js2376; n2375 += 2) {
          switch (arguments[n2375]) {
          case 'x':
              x = arguments[n2375 + 1];
              break;
          case 'y':
              y = arguments[n2375 + 1];
              break;
          case 'width':
              width = arguments[n2375 + 1];
              break;
          case 'height':
              height = arguments[n2375 + 1];
          };
      };
      var x = 'undefined' === typeof x ? 0 : x;
      var y = 'undefined' === typeof y ? 0 : y;
      var width = 'undefined' === typeof width ? 0 : width;
      var height = 'undefined' === typeof height ? 0 : height;
      var rest = Array.prototype.slice.call(arguments, 0);
      for (var key = null, _js_arrvar2378 = ['x', 'y', 'width', 'height'], _js_idx2377 = 0; _js_idx2377 < _js_arrvar2378.length; _js_idx2377 += 1) {
          key = _js_arrvar2378[_js_idx2377];
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
      for (var vec = null, _js_idx2379 = 0; _js_idx2379 < vecList.length; _js_idx2379 += 1) {
          vec = vecList[_js_idx2379];
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
      var object2380 = physic.boundingBox;
      var globalPoint = clonePoint2d(physic.offset);
      transformfPoint(globalPoint, globalCoordinate);
      var gKeyform2381 = physic;
      if ((gKeyform2381 instanceof (typeof physicCircle === 'string' ? eval(physicCircle) : physicCircle))) {
          object2380.left = globalPoint.x - physic.r;
          object2380.right = globalPoint.x + physic.r;
          object2380.bottom = globalPoint.y - physic.r;
          object2380.top = globalPoint.y + physic.r;
      } else if ((gKeyform2381 instanceof (typeof physicPolygon === 'string' ? eval(physicPolygon) : physicPolygon))) {
          var bufferPnt = makePoint2d();
          var initializedP = null;
          for (var pnt = null, _js_arrvar2383 = physic.pntList, _js_idx2382 = 0; _js_idx2382 < _js_arrvar2383.length; _js_idx2382 += 1) {
              pnt = _js_arrvar2383[_js_idx2382];
              copyPoint2dTo(bufferPnt, pnt);
              transformfPoint(bufferPnt, globalPoint);
              if (!initializedP || bufferPnt.x < object2380.left) {
                  object2380.left = bufferPnt.x;
              };
              if (!initializedP || bufferPnt.x > object2380.right) {
                  object2380.right = bufferPnt.x;
              };
              if (!initializedP || bufferPnt.y < object2380.bottom) {
                  object2380.bottom = bufferPnt.y;
              };
              if (!initializedP || bufferPnt.y > object2380.top) {
                  object2380.top = bufferPnt.y;
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
      var ph2 = (found2384 = getEcsComponent(physic2d, entity2), found2384 ? found2384 : (function () {
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
      for (var tag = null, _js_arrvar2386 = ph1.targetTags, _js_idx2385 = 0; _js_idx2385 < _js_arrvar2386.length; _js_idx2385 += 1) {
          tag = _js_arrvar2386[_js_idx2385];
          if (hasEntityTag(entity2, tag)) {
              __PS_MV_REG = [];
              return true;
          };
      };
      for (var tag = null, _js_arrvar2388 = ph2.targetTags, _js_idx2387 = 0; _js_idx2387 < _js_arrvar2388.length; _js_idx2387 += 1) {
          tag = _js_arrvar2388[_js_idx2387];
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
      var _js2390 = arguments.length;
      for (var n2389 = 0; n2389 < _js2390; n2389 += 2) {
          switch (arguments[n2389]) {
          case 'parent':
              parent = arguments[n2389 + 1];
              break;
          case 'children':
              children = arguments[n2389 + 1];
              break;
          case 'registerp':
              registerp = arguments[n2389 + 1];
              break;
          case 'on-click-down':
              onClickDown = arguments[n2389 + 1];
              break;
          case 'on-click-up':
              onClickUp = arguments[n2389 + 1];
              break;
          case 'on-mouse-enter':
              onMouseEnter = arguments[n2389 + 1];
              break;
          case 'on-mouse-leave':
              onMouseLeave = arguments[n2389 + 1];
              break;
          case 'on-mouse-hover':
              onMouseHover = arguments[n2389 + 1];
              break;
          case 'on-mouse-not-hover':
              onMouseNotHover = arguments[n2389 + 1];
              break;
          case 'mouse-hover-p':
              mouseHoverP = arguments[n2389 + 1];
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
          var physic2d2391 = (found = getEcsComponent(physic2d, entity), found ? found : (function () {
              throw 'PHYSIC-2D is not included in the entity';
          })());
          var uiComponent2392 = (found2393 = getEcsComponent(uiComponent, entity), found2393 ? found2393 : (function () {
              throw 'UI-COMPONENT is not included in the entity';
          })());
          var mousePnt = makePoint2d('x', getMouseX(), 'y', getMouseY());
          var mousePhysic = makePhysicCircle('r', 0);
          var collideP = collidePhysicsP(physic2d2391, calcGlobalPoint(entity), mousePhysic, mousePnt);
          if (collideP) {
              if (uiComponent2392.onMouseHover) {
                  uiComponent2392.onMouseHover();
              };
              if (uiComponent2392.onMouseEnter && !uiComponent2392.mouseHoverP) {
                  uiComponent2392.onMouseEnter();
              };
              uiComponent2392.mouseHoverP = true;
          } else {
              if (uiComponent2392.onMouseNotHover) {
                  uiComponent2392.onMouseNotHover();
              };
              if (uiComponent2392.onMouseLeave && uiComponent2392.mouseHoverP) {
                  uiComponent2392.onMouseLeave();
              };
              uiComponent2392.mouseHoverP = null;
          };
          switch (getLeftMouseState()) {
          case 'down-now':
              if (collideP) {
                  CURRENTTARGET = entity;
                  __PS_MV_REG = [];
                  return uiComponent2392.onClickDown ? uiComponent2392.onClickDown() : null;
              } else {
                  __PS_MV_REG = [];
                  return null;
              };
          case 'up-now':
              if (collideP && CURRENTTARGET === entity && findTheEntity(entity)) {
                  __PS_MV_REG = [];
                  return uiComponent2392.onClickUp ? uiComponent2392.onClickUp() : null;
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
      var _js2395 = arguments.length;
      for (var n2394 = 0; n2394 < _js2395; n2394 += 2) {
          switch (arguments[n2394]) {
          case 'enable':
              enable = arguments[n2394 + 1];
              break;
          case 'target-entities':
              targetEntities = arguments[n2394 + 1];
              break;
          case 'target-component-types':
              targetComponentTypes = arguments[n2394 + 1];
              break;
          case 'process':
              process = arguments[n2394 + 1];
              break;
          case 'process-all':
              processAll = arguments[n2394 + 1];
              break;
          case 'add-entity-hook':
              addEntityHook = arguments[n2394 + 1];
              break;
          case 'delete-entity-hook':
              deleteEntityHook = arguments[n2394 + 1];
          };
      };
      var enable = 'undefined' === typeof enable ? true : enable;
      var targetEntities = 'undefined' === typeof targetEntities ? [] : targetEntities;
      var targetComponentTypes = 'undefined' === typeof targetComponentTypes ? [point2d, uiComponent, physic2d] : targetComponentTypes;
      var process = 'undefined' === typeof process ? function (entity) {
          var physic2d2396 = (found = getEcsComponent(physic2d, entity), found ? found : (function () {
              throw 'PHYSIC-2D is not included in the entity';
          })());
          var uiComponent2397 = (found2398 = getEcsComponent(uiComponent, entity), found2398 ? found2398 : (function () {
              throw 'UI-COMPONENT is not included in the entity';
          })());
          var mousePnt = makePoint2d('x', getMouseX(), 'y', getMouseY());
          var mousePhysic = makePhysicCircle('r', 0);
          var collideP = collidePhysicsP(physic2d2396, calcGlobalPoint(entity), mousePhysic, mousePnt);
          if (collideP) {
              if (uiComponent2397.onMouseHover) {
                  uiComponent2397.onMouseHover();
              };
              if (uiComponent2397.onMouseEnter && !uiComponent2397.mouseHoverP) {
                  uiComponent2397.onMouseEnter();
              };
              uiComponent2397.mouseHoverP = true;
          } else {
              if (uiComponent2397.onMouseNotHover) {
                  uiComponent2397.onMouseNotHover();
              };
              if (uiComponent2397.onMouseLeave && uiComponent2397.mouseHoverP) {
                  uiComponent2397.onMouseLeave();
              };
              uiComponent2397.mouseHoverP = null;
          };
          switch (getLeftMouseState()) {
          case 'down-now':
              if (collideP) {
                  CURRENTTARGET = entity;
                  __PS_MV_REG = [];
                  return uiComponent2397.onClickDown ? uiComponent2397.onClickDown() : null;
              } else {
                  __PS_MV_REG = [];
                  return null;
              };
          case 'up-now':
              if (collideP && CURRENTTARGET === entity && findTheEntity(entity)) {
                  __PS_MV_REG = [];
                  return uiComponent2397.onClickUp ? uiComponent2397.onClickUp() : null;
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
      var _js2400 = arguments.length;
      for (var n2399 = 0; n2399 < _js2400; n2399 += 2) {
          switch (arguments[n2399]) {
          case 'parent':
              parent = arguments[n2399 + 1];
              break;
          case 'children':
              children = arguments[n2399 + 1];
              break;
          case 'registerp':
              registerp = arguments[n2399 + 1];
              break;
          case 'model':
              model = arguments[n2399 + 1];
              break;
          case 'depth':
              depth = arguments[n2399 + 1];
              break;
          case 'offset':
              offset = arguments[n2399 + 1];
              break;
          case 'state':
              state = arguments[n2399 + 1];
              break;
          case 'label':
              label = arguments[n2399 + 1];
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
          var point2d2401 = (found = getEcsComponent(point2d, entity), found ? found : (function () {
              throw 'POINT-2D is not included in the entity';
          })());
          for (var modelc = null, _js_arrvar2403 = entity.components, _js_idx2402 = 0; _js_idx2402 < _js_arrvar2403.length; _js_idx2402 += 1) {
              modelc = _js_arrvar2403[_js_idx2402];
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
      var _js2405 = arguments.length;
      for (var n2404 = 0; n2404 < _js2405; n2404 += 2) {
          switch (arguments[n2404]) {
          case 'enable':
              enable = arguments[n2404 + 1];
              break;
          case 'target-entities':
              targetEntities = arguments[n2404 + 1];
              break;
          case 'target-component-types':
              targetComponentTypes = arguments[n2404 + 1];
              break;
          case 'process':
              process = arguments[n2404 + 1];
              break;
          case 'process-all':
              processAll = arguments[n2404 + 1];
              break;
          case 'add-entity-hook':
              addEntityHook = arguments[n2404 + 1];
              break;
          case 'delete-entity-hook':
              deleteEntityHook = arguments[n2404 + 1];
          };
      };
      var enable = 'undefined' === typeof enable ? true : enable;
      var targetEntities = 'undefined' === typeof targetEntities ? [] : targetEntities;
      var targetComponentTypes = 'undefined' === typeof targetComponentTypes ? [point2d, model2d] : targetComponentTypes;
      var process = 'undefined' === typeof process ? function (entity) {
          var point2d2406 = (found = getEcsComponent(point2d, entity), found ? found : (function () {
              throw 'POINT-2D is not included in the entity';
          })());
          for (var modelc = null, _js_arrvar2408 = entity.components, _js_idx2407 = 0; _js_idx2407 < _js_arrvar2408.length; _js_idx2407 += 1) {
              modelc = _js_arrvar2408[_js_idx2407];
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
      var _js2410 = arguments.length;
      for (var n2409 = 2; n2409 < _js2410; n2409 += 2) {
          switch (arguments[n2409]) {
          case 'target-model-2d':
              targetModel2d = arguments[n2409 + 1];
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
          for (var modelc = null, _js_arrvar2414 = entity.components, _js_idx2413 = 0; _js_idx2413 < _js_arrvar2414.length; _js_idx2413 += 1) {
              modelc = _js_arrvar2414[_js_idx2413];
              if ((modelc instanceof (typeof model2d === 'string' ? eval(model2d) : model2d))) {
                  enable(modelc);
              };
          };
      };
  };
  function enableModel2d(entity) {
      var _js2416 = arguments.length;
      for (var n2415 = 1; n2415 < _js2416; n2415 += 2) {
          switch (arguments[n2415]) {
          case 'target-model-2d':
              targetModel2d = arguments[n2415 + 1];
          };
      };
      var targetModel2d;
      __PS_MV_REG = [];
      return enableModel2dIfState(entity, 'disable', 'target-model-2d', targetModel2d);
  };
  function enableInvalidatedModel2d(entity) {
      var _js2418 = arguments.length;
      for (var n2417 = 1; n2417 < _js2418; n2417 += 2) {
          switch (arguments[n2417]) {
          case 'target-model-2d':
              targetModel2d = arguments[n2417 + 1];
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
      for (var model = null, _js_arrvar2420 = entity.components, _js_idx2419 = 0; _js_idx2419 < _js_arrvar2420.length; _js_idx2419 += 1) {
          model = _js_arrvar2420[_js_idx2419];
          if ((model instanceof (typeof model2d === 'string' ? eval(model2d) : model2d))) {
              invalidateModel2d(model);
          };
      };
  };
  function disableModel2d(entity) {
      var _js2422 = arguments.length;
      for (var n2421 = 1; n2421 < _js2422; n2421 += 2) {
          switch (arguments[n2421]) {
          case 'target-model-2d':
              targetModel2d = arguments[n2421 + 1];
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
          for (var modelc = null, _js_arrvar2426 = entity.components, _js_idx2425 = 0; _js_idx2425 < _js_arrvar2426.length; _js_idx2425 += 1) {
              modelc = _js_arrvar2426[_js_idx2425];
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
      for (var model = null, _js_arrvar2428 = entity.components, _js_idx2427 = 0; _js_idx2427 < _js_arrvar2428.length; _js_idx2427 += 1) {
          model = _js_arrvar2428[_js_idx2427];
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
      var _js2430 = arguments.length;
      for (var n2429 = 0; n2429 < _js2430; n2429 += 2) {
          switch (arguments[n2429]) {
          case 'parent':
              parent = arguments[n2429 + 1];
              break;
          case 'children':
              children = arguments[n2429 + 1];
              break;
          case 'registerp':
              registerp = arguments[n2429 + 1];
              break;
          case 'font-size':
              fontSize = arguments[n2429 + 1];
              break;
          case 'text-align':
              textAlign = arguments[n2429 + 1];
              break;
          case 'margin':
              margin = arguments[n2429 + 1];
              break;
          case 'text-model-list':
              textModelList = arguments[n2429 + 1];
              break;
          case 'depth':
              depth = arguments[n2429 + 1];
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
      var _js2432 = arguments.length;
      for (var n2431 = 0; n2431 < _js2432; n2431 += 2) {
          switch (arguments[n2431]) {
          case 'font-size':
              fontSize = arguments[n2431 + 1];
              break;
          case 'text-align':
              textAlign = arguments[n2431 + 1];
              break;
          case 'margin':
              margin = arguments[n2431 + 1];
              break;
          case 'x':
              x = arguments[n2431 + 1];
              break;
          case 'y':
              y = arguments[n2431 + 1];
              break;
          case 'angle':
              angle = arguments[n2431 + 1];
              break;
          case 'depth':
              depth = arguments[n2431 + 1];
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
          for (var x2434 = null, _js_idx2435 = 0; _js_idx2435 < textAlignList.length; _js_idx2435 += 1) {
              x2434 = textAlignList[_js_idx2435];
              if ((function (target2433) {
                  return textAlign === target2433;
              })(x2434)) {
                  return x2434;
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
      for (var model = null, _js_idx2436 = 0; _js_idx2436 < area.textModelList.length; _js_idx2436 += 1) {
          model = area.textModelList[_js_idx2436];
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
      var _js2438 = arguments.length;
      for (var n2437 = 1; n2437 < _js2438; n2437 += 2) {
          switch (arguments[n2437]) {
          case 'text':
              text = arguments[n2437 + 1];
              break;
          case 'color':
              color = arguments[n2437 + 1];
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
      for (var model = null, _js_idx2439 = 0; _js_idx2439 < area.textModelList.length; _js_idx2439 += 1) {
          model = area.textModelList[_js_idx2439];
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
      var gKeyform2440 = physic2d;
      if ((gKeyform2440 instanceof (typeof physicCircle === 'string' ? eval(physicCircle) : physicCircle))) {
          __PS_MV_REG = [];
          return makeAModel(function (color) {
              __PS_MV_REG = [];
              return makeWiredCircle('color', color, 'r', physic2d.r);
          });
      } else if ((gKeyform2440 instanceof (typeof physicPolygon === 'string' ? eval(physicPolygon) : physicPolygon))) {
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
          var physic2d2441 = (found = getEcsComponent(physic2d, entity), found ? found : (function () {
              throw 'PHYSIC-2D is not included in the entity';
          })());
          __PS_MV_REG = [];
          return !findColliderModel(physic2d2441) ? addEcsComponent(generateColliderModel(physic2d2441), entity, physic2d2441) : null;
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
          for (var entity = null, _js_arrvar2443 = clPsEcs_ecs._internal.getEntityList(), _js_idx2442 = 0; _js_idx2442 < _js_arrvar2443.length; _js_idx2442 += 1) {
              entity = _js_arrvar2443[_js_idx2442];
              for (var physic = null, _js_arrvar2445 = entity.components, _js_idx2444 = 0; _js_idx2444 < _js_arrvar2445.length; _js_idx2444 += 1) {
                  physic = _js_arrvar2445[_js_idx2444];
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
      var _js2445 = arguments.length;
      for (var n2444 = 0; n2444 < _js2445; n2444 += 2) {
          switch (arguments[n2444]) {
          case 'entity':
              entity = arguments[n2444 + 1];
              break;
          case 'global-point':
              globalPoint = arguments[n2444 + 1];
              break;
          case 'physic':
              physic = arguments[n2444 + 1];
              break;
          case 'target-entity-list':
              targetEntityList = arguments[n2444 + 1];
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
      var _js2447 = arguments.length;
      for (var n2446 = 0; n2446 < _js2447; n2446 += 2) {
          switch (arguments[n2446]) {
          case 'cache':
              cache = arguments[n2446 + 1];
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
      for (var x2448 = null, _js_arrvar2450 = cache.cache, _js_idx2449 = 0; _js_idx2449 < _js_arrvar2450.length; _js_idx2449 += 1) {
          x2448 = _js_arrvar2450[_js_idx2449];
          if ((function (pair) {
              __PS_MV_REG = [];
              return sameTagListP(tagList, pair[0]);
          })(x2448)) {
              return x2448;
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
      for (var info = null, _js_idx2451 = 0; _js_idx2451 < allEntityInfo.length; _js_idx2451 += 1) {
          info = allEntityInfo[_js_idx2451];
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
          var prevNode1169 = clWeb2dGame_utils_debug_performance._internal.PERFORMANCETIMER.currentNode;
          try {
              var before1170 = performance.now();
              var element1171 = clWeb2dGame_utils_debug_performance._internal.pickPerformanceTimerElement('collision', 0);
              var infoList = [];
              for (var entity = null, _js_idx2452 = 0; _js_idx2452 < system.targetEntities.length; _js_idx2452 += 1) {
                  entity = system.targetEntities[_js_idx2452];
                  var physic = getEcsComponent(physic2d, entity);
                  var globalPoint = calcGlobalPoint(entity);
                  updateBoundingBox(physic, globalPoint);
                  infoList.unshift(makeCollisionEntityInfo('entity', entity, 'global-point', globalPoint, 'physic', physic));
                  infoList;
              };
              initTargetListOfInfoList(infoList);
              var length2453 = infoList.length;
              var _js2454 = length2453 - 1;
              for (var outerIdx = 0; outerIdx < _js2454; outerIdx += 1) {
                  var object2455 = infoList[outerIdx];
                  for (var info2 = null, _js_idx2456 = 0; _js_idx2456 < object2455.targetEntityList.length; _js_idx2456 += 1) {
                      info2 = object2455.targetEntityList[_js_idx2456];
                      processCollision(object2455.entity, object2455.physic, object2455.globalPoint, info2.entity, info2.physic, info2.globalPoint);
                  };
              };
              __PS_MV_REG = [];
              return clWeb2dGame_utils_debug_performance._internal.pushToRingBuffer(performance.now() - before1170, element1171.results);
          } finally {
              clWeb2dGame_utils_debug_performance._internal.PERFORMANCETIMER.currentNode = prevNode1169;
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
      var _js2456 = arguments.length;
      for (var n2455 = 0; n2455 < _js2456; n2455 += 2) {
          switch (arguments[n2455]) {
          case 'enable':
              enable = arguments[n2455 + 1];
              break;
          case 'target-entities':
              targetEntities = arguments[n2455 + 1];
              break;
          case 'target-component-types':
              targetComponentTypes = arguments[n2455 + 1];
              break;
          case 'process':
              process = arguments[n2455 + 1];
              break;
          case 'process-all':
              processAll = arguments[n2455 + 1];
              break;
          case 'add-entity-hook':
              addEntityHook = arguments[n2455 + 1];
              break;
          case 'delete-entity-hook':
              deleteEntityHook = arguments[n2455 + 1];
          };
      };
      var enable = 'undefined' === typeof enable ? true : enable;
      var targetEntities = 'undefined' === typeof targetEntities ? [] : targetEntities;
      var targetComponentTypes = 'undefined' === typeof targetComponentTypes ? [point2d, physic2d] : targetComponentTypes;
      var process = 'undefined' === typeof process ? function (entity) {
          return entity;
      } : process;
      var processAll = 'undefined' === typeof processAll ? function (system) {
          var prevNode1172 = clWeb2dGame_utils_debug_performance._internal.PERFORMANCETIMER.currentNode;
          try {
              var before1173 = performance.now();
              var element1174 = clWeb2dGame_utils_debug_performance._internal.pickPerformanceTimerElement('collision', 0);
              var infoList = [];
              for (var entity = null, _js_idx2457 = 0; _js_idx2457 < system.targetEntities.length; _js_idx2457 += 1) {
                  entity = system.targetEntities[_js_idx2457];
                  var physic = getEcsComponent(physic2d, entity);
                  var globalPoint = calcGlobalPoint(entity);
                  updateBoundingBox(physic, globalPoint);
                  infoList.unshift(makeCollisionEntityInfo('entity', entity, 'global-point', globalPoint, 'physic', physic));
                  infoList;
              };
              initTargetListOfInfoList(infoList);
              var length2458 = infoList.length;
              var _js2459 = length2458 - 1;
              for (var outerIdx = 0; outerIdx < _js2459; outerIdx += 1) {
                  var object2460 = infoList[outerIdx];
                  for (var info2 = null, _js_idx2461 = 0; _js_idx2461 < object2460.targetEntityList.length; _js_idx2461 += 1) {
                      info2 = object2460.targetEntityList[_js_idx2461];
                      processCollision(object2460.entity, object2460.physic, object2460.globalPoint, info2.entity, info2.physic, info2.globalPoint);
                  };
              };
              __PS_MV_REG = [];
              return clWeb2dGame_utils_debug_performance._internal.pushToRingBuffer(performance.now() - before1173, element1174.results);
          } finally {
              clWeb2dGame_utils_debug_performance._internal.PERFORMANCETIMER.currentNode = prevNode1172;
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
      var _js2461 = arguments.length;
      for (var n2460 = 0; n2460 < _js2461; n2460 += 2) {
          switch (arguments[n2460]) {
          case 'parent':
              parent = arguments[n2460 + 1];
              break;
          case 'children':
              children = arguments[n2460 + 1];
              break;
          case 'registerp':
              registerp = arguments[n2460 + 1];
              break;
          case 'interval':
              interval = arguments[n2460 + 1];
              break;
          case 'horiz-count':
              horizCount = arguments[n2460 + 1];
              break;
          case 'vert-count':
              vertCount = arguments[n2460 + 1];
              break;
          case 'model':
              model = arguments[n2460 + 1];
              break;
          case 'texture':
              texture = arguments[n2460 + 1];
              break;
          case 'animation-end-callback':
              animationEndCallback = arguments[n2460 + 1];
              break;
          case 'goes-to-forward':
              goesToForward = arguments[n2460 + 1];
              break;
          case 'runs-animation':
              runsAnimation = arguments[n2460 + 1];
              break;
          case 'interval-counter':
              intervalCounter = arguments[n2460 + 1];
              break;
          case 'image-counter':
              imageCounter = arguments[n2460 + 1];
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
      var _js2463 = arguments.length;
      for (var n2462 = 0; n2462 < _js2463; n2462 += 2) {
          switch (arguments[n2462]) {
          case 'interval':
              interval = arguments[n2462 + 1];
              break;
          case 'horiz-count':
              horizCount = arguments[n2462 + 1];
              break;
          case 'vert-count':
              vertCount = arguments[n2462 + 1];
              break;
          case 'model':
              model = arguments[n2462 + 1];
              break;
          case 'texture':
              texture = arguments[n2462 + 1];
              break;
          case 'animation-end-callback':
              animationEndCallback = arguments[n2462 + 1];
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
      var _js2465 = arguments.length;
      for (var n2464 = 1; n2464 < _js2465; n2464 += 2) {
          switch (arguments[n2464]) {
          case 'stop-p':
              stopP = arguments[n2464 + 1];
              break;
          case 'forward-p':
              forwardP = arguments[n2464 + 1];
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
      var xCount = (n2466 = anime.vertCount, (nextCounter % n2466 + n2466) % n2466);
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
      var _js2468 = arguments.length;
      for (var n2467 = 0; n2467 < _js2468; n2467 += 2) {
          switch (arguments[n2467]) {
          case 'entity':
              entity = arguments[n2467 + 1];
              break;
          case 'animation-table':
              animationTable = arguments[n2467 + 1];
              break;
          case 'current':
              current = arguments[n2467 + 1];
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
      var _js2470 = arguments.length;
      for (var n2469 = 2; n2469 < _js2470; n2469 += 2) {
          switch (arguments[n2469]) {
          case 'forward-p':
              forwardP = arguments[n2469 + 1];
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
          for (var script = null, _js_arrvar2472 = entity.components, _js_idx2471 = 0; _js_idx2471 < _js_arrvar2472.length; _js_idx2471 += 1) {
              script = _js_arrvar2472[_js_idx2471];
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
      var _js2474 = arguments.length;
      for (var n2473 = 0; n2473 < _js2474; n2473 += 2) {
          switch (arguments[n2473]) {
          case 'enable':
              enable = arguments[n2473 + 1];
              break;
          case 'target-entities':
              targetEntities = arguments[n2473 + 1];
              break;
          case 'target-component-types':
              targetComponentTypes = arguments[n2473 + 1];
              break;
          case 'process':
              process = arguments[n2473 + 1];
              break;
          case 'process-all':
              processAll = arguments[n2473 + 1];
              break;
          case 'add-entity-hook':
              addEntityHook = arguments[n2473 + 1];
              break;
          case 'delete-entity-hook':
              deleteEntityHook = arguments[n2473 + 1];
          };
      };
      var enable = 'undefined' === typeof enable ? true : enable;
      var targetEntities = 'undefined' === typeof targetEntities ? [] : targetEntities;
      var targetComponentTypes = 'undefined' === typeof targetComponentTypes ? [script2d] : targetComponentTypes;
      var process = 'undefined' === typeof process ? function (entity) {
          for (var script = null, _js_arrvar2476 = entity.components, _js_idx2475 = 0; _js_idx2475 < _js_arrvar2476.length; _js_idx2475 += 1) {
              script = _js_arrvar2476[_js_idx2475];
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
          for (var anime = null, _js_arrvar2478 = entity.components, _js_idx2477 = 0; _js_idx2477 < _js_arrvar2478.length; _js_idx2477 += 1) {
              anime = _js_arrvar2478[_js_idx2477];
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
      var _js2480 = arguments.length;
      for (var n2479 = 0; n2479 < _js2480; n2479 += 2) {
          switch (arguments[n2479]) {
          case 'enable':
              enable = arguments[n2479 + 1];
              break;
          case 'target-entities':
              targetEntities = arguments[n2479 + 1];
              break;
          case 'target-component-types':
              targetComponentTypes = arguments[n2479 + 1];
              break;
          case 'process':
              process = arguments[n2479 + 1];
              break;
          case 'process-all':
              processAll = arguments[n2479 + 1];
              break;
          case 'add-entity-hook':
              addEntityHook = arguments[n2479 + 1];
              break;
          case 'delete-entity-hook':
              deleteEntityHook = arguments[n2479 + 1];
          };
      };
      var enable = 'undefined' === typeof enable ? true : enable;
      var targetEntities = 'undefined' === typeof targetEntities ? [] : targetEntities;
      var targetComponentTypes = 'undefined' === typeof targetComponentTypes ? [animation2d] : targetComponentTypes;
      var process = 'undefined' === typeof process ? function (entity) {
          for (var anime = null, _js_arrvar2482 = entity.components, _js_idx2481 = 0; _js_idx2481 < _js_arrvar2482.length; _js_idx2481 += 1) {
              anime = _js_arrvar2482[_js_idx2481];
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
          var point2d2483 = (found = getEcsComponent(point2d, entity), found ? found : (function () {
              throw 'POINT-2D is not included in the entity';
          })());
          var speed2d2484 = (found2485 = getEcsComponent(speed2d, entity), found2485 ? found2485 : (function () {
              throw 'SPEED-2D is not included in the entity';
          })());
          __PS_MV_REG = [];
          return incfVector2d(point2d2483, speed2d2484);
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
      var _js2487 = arguments.length;
      for (var n2486 = 0; n2486 < _js2487; n2486 += 2) {
          switch (arguments[n2486]) {
          case 'enable':
              enable = arguments[n2486 + 1];
              break;
          case 'target-entities':
              targetEntities = arguments[n2486 + 1];
              break;
          case 'target-component-types':
              targetComponentTypes = arguments[n2486 + 1];
              break;
          case 'process':
              process = arguments[n2486 + 1];
              break;
          case 'process-all':
              processAll = arguments[n2486 + 1];
              break;
          case 'add-entity-hook':
              addEntityHook = arguments[n2486 + 1];
              break;
          case 'delete-entity-hook':
              deleteEntityHook = arguments[n2486 + 1];
          };
      };
      var enable = 'undefined' === typeof enable ? true : enable;
      var targetEntities = 'undefined' === typeof targetEntities ? [] : targetEntities;
      var targetComponentTypes = 'undefined' === typeof targetComponentTypes ? [point2d, speed2d] : targetComponentTypes;
      var process = 'undefined' === typeof process ? function (entity) {
          var point2d2488 = (found = getEcsComponent(point2d, entity), found ? found : (function () {
              throw 'POINT-2D is not included in the entity';
          })());
          var speed2d2489 = (found2490 = getEcsComponent(speed2d, entity), found2490 ? found2490 : (function () {
              throw 'SPEED-2D is not included in the entity';
          })());
          __PS_MV_REG = [];
          return incfVector2d(point2d2488, speed2d2489);
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
      var object2491 = stats.domElement.style;
      object2491.position = 'absolute';
      object2491.left = '0px';
      object2491.top = '0px';
      document.getElementById('stats-output').appendChild(stats.domElement);
      __PS_MV_REG = [];
      return stats;
  };
  function updateStats() {
      __PS_MV_REG = [];
      return STATS ? STATS.update() : null;
  };
  function initDefaultSystems() {
      var _js2493 = arguments.length;
      for (var n2492 = 0; n2492 < _js2493; n2492 += 2) {
          switch (arguments[n2492]) {
          case 'scene':
              scene = arguments[n2492 + 1];
              break;
          case 'script-system':
              scriptSystem = arguments[n2492 + 1];
              break;
          case 'draw-system':
              drawSystem = arguments[n2492 + 1];
              break;
          case 'animation-system':
              animationSystem = arguments[n2492 + 1];
              break;
          case 'collision-system':
              collisionSystem = arguments[n2492 + 1];
              break;
          case 'simple-move-system':
              simpleMoveSystem = arguments[n2492 + 1];
              break;
          case 'ui-system':
              uiSystem = arguments[n2492 + 1];
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
      var _js2495 = arguments.length;
      for (var n2494 = 0; n2494 < _js2495; n2494 += 2) {
          switch (arguments[n2494]) {
          case 'screen-width':
              screenWidth = arguments[n2494 + 1];
              break;
          case 'screen-height':
              screenHeight = arguments[n2494 + 1];
              break;
          case 'camera':
              camera = arguments[n2494 + 1];
              break;
          case 'rendered-dom':
              renderedDom = arguments[n2494 + 1];
              break;
          case 'stats-dom':
              statsDom = arguments[n2494 + 1];
              break;
          case 'monitoring-log-dom':
              monitoringLogDom = arguments[n2494 + 1];
              break;
          case 'event-log-dom':
              eventLogDom = arguments[n2494 + 1];
              break;
          case 'resize-to-screen-p':
              resizeToScreenP = arguments[n2494 + 1];
              break;
          case 'init-function':
              initFunction = arguments[n2494 + 1];
              break;
          case 'update-function':
              updateFunction = arguments[n2494 + 1];
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
          var prevNode1175 = clWeb2dGame_utils_debug_performance._internal.PERFORMANCETIMER.currentNode;
          try {
              var before1176 = performance.now();
              var element1177 = clWeb2dGame_utils_debug_performance._internal.pickPerformanceTimerElement('loop-top', 0);
              var prevNode1178 = clWeb2dGame_utils_debug_performance._internal.PERFORMANCETIMER.currentNode;
              try {
                  var before1179 = performance.now();
                  var element1180 = clWeb2dGame_utils_debug_performance._internal.pickPerformanceTimerElement('render', 0);
                  var scope = WTF.trace.enterScope('render');
                  renderer.render(scene, camera);
                  WTF.trace.leaveScope(scope, 'render');
                  clWeb2dGame_utils_debug_performance._internal.pushToRingBuffer(performance.now() - before1179, element1180.results);
              } finally {
                  clWeb2dGame_utils_debug_performance._internal.PERFORMANCETIMER.currentNode = prevNode1178;
              };
              updateStats();
              var prevNode1181 = clWeb2dGame_utils_debug_performance._internal.PERFORMANCETIMER.currentNode;
              try {
                  var before1182 = performance.now();
                  var element1183 = clWeb2dGame_utils_debug_performance._internal.pickPerformanceTimerElement('update', 0);
                  var scope2496 = WTF.trace.enterScope('update');
                  clearMonitoringLog();
                  processInput();
                  ecsMain();
                  updateFunction();
                  WTF.trace.leaveScope(scope2496, 'update');
                  clWeb2dGame_utils_debug_performance._internal.pushToRingBuffer(performance.now() - before1182, element1183.results);
              } finally {
                  clWeb2dGame_utils_debug_performance._internal.PERFORMANCETIMER.currentNode = prevNode1181;
              };
              clWeb2dGame_utils_debug_performance._internal.pushToRingBuffer(performance.now() - before1176, element1177.results);
          } finally {
              clWeb2dGame_utils_debug_performance._internal.PERFORMANCETIMER.currentNode = prevNode1175;
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
      var _js2498 = arguments.length;
      for (var n2497 = 0; n2497 < _js2498; n2497 += 2) {
          switch (arguments[n2497]) {
          case 'model':
              model = arguments[n2497 + 1];
              break;
          case 'point':
              point = arguments[n2497 + 1];
              break;
          case 'tag-list':
              tagList = arguments[n2497 + 1];
              break;
          case 'parent':
              parent = arguments[n2497 + 1];
              break;
          case 'fn-delete-condition':
              fnDeleteCondition = arguments[n2497 + 1];
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
      for (var tag = null, _js_idx2499 = 0; _js_idx2499 < tagList.length; _js_idx2499 += 1) {
          tag = tagList[_js_idx2499];
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
      var _js2501 = arguments.length;
      for (var n2500 = 0; n2500 < _js2501; n2500 += 2) {
          switch (arguments[n2500]) {
          case 'point':
              point = arguments[n2500 + 1];
              break;
          case 'tag-list':
              tagList = arguments[n2500 + 1];
              break;
          case 'parent':
              parent = arguments[n2500 + 1];
              break;
          case 'r':
              r = arguments[n2500 + 1];
              break;
          case 'fn-delete-condition':
              fnDeleteCondition = arguments[n2500 + 1];
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
      var _js2503 = arguments.length;
      for (var n2502 = 0; n2502 < _js2503; n2502 += 2) {
          switch (arguments[n2502]) {
          case 'point':
              point = arguments[n2502 + 1];
              break;
          case 'tag-list':
              tagList = arguments[n2502 + 1];
              break;
          case 'parent':
              parent = arguments[n2502 + 1];
              break;
          case 'r':
              r = arguments[n2502 + 1];
              break;
          case 'time':
              time = arguments[n2502 + 1];
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
      var _js2505 = arguments.length;
      for (var n2504 = 0; n2504 < _js2505; n2504 += 2) {
          switch (arguments[n2504]) {
          case 'point1':
              point1 = arguments[n2504 + 1];
              break;
          case 'point2':
              point2 = arguments[n2504 + 1];
              break;
          case 'tag-list':
              tagList = arguments[n2504 + 1];
              break;
          case 'parent':
              parent = arguments[n2504 + 1];
              break;
          case 'fn-delete-condition':
              fnDeleteCondition = arguments[n2504 + 1];
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
      var _js2507 = arguments.length;
      for (var n2506 = 0; n2506 < _js2507; n2506 += 2) {
          switch (arguments[n2506]) {
          case 'point1':
              point1 = arguments[n2506 + 1];
              break;
          case 'point2':
              point2 = arguments[n2506 + 1];
              break;
          case 'tag-list':
              tagList = arguments[n2506 + 1];
              break;
          case 'parent':
              parent = arguments[n2506 + 1];
              break;
          case 'time':
              time = arguments[n2506 + 1];
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
      this.startProcess = function (state1184) {
          loadFont('js/');
          loadTexture('path', '/images/test.png', 'name', 'test');
          loadTexture('path', '/images/test2.png', 'name', 'test2', 'x', 0 / 3, 'width', 1 / 3);
          loadTexture('path', '/images/obj32.png', 'name', 'dokan-top-l', 'x', 0 / 5, 'y', 2 / 3, 'width', 1 / 5, 'height', 1 / 3);
          loadTexture('path', '/images/obj32.png', 'name', 'dokan-top-r', 'x', 1 / 5, 'y', 2 / 3, 'width', 1 / 5, 'height', 1 / 3);
          loadTexture('path', '/images/obj32.png', 'name', 'dokan-mid-l', 'x', 0 / 5, 'y', 1 / 3, 'width', 1 / 5, 'height', 1 / 3);
          loadTexture('path', '/images/obj32.png', 'name', 'dokan-mid-r', 'x', 1 / 5, 'y', 1 / 3, 'width', 1 / 5, 'height', 1 / 3);
          loadTexture('path', '/images/obj32.png', 'name', 'dokan-bot-l', 'x', 0 / 5, 'y', 0 / 3, 'width', 1 / 5, 'height', 1 / 3);
          loadTexture('path', '/images/obj32.png', 'name', 'dokan-bot-r', 'x', 1 / 5, 'y', 0 / 3, 'width', 1 / 5, 'height', 1 / 3);
          loadTexture('path', '/images/obj32.png', 'name', 'flower', 'x', 2 / 5, 'y', 2 / 3, 'width', 1 / 5, 'height', 1 / 3);
          loadTexture('path', '/images/obj32.png', 'name', 'hatena', 'x', 3 / 5, 'y', 2 / 3, 'width', 1 / 5, 'height', 1 / 3);
          loadTexture('path', '/images/obj32.png', 'name', 'soft-blk', 'x', 4 / 5, 'y', 2 / 3, 'width', 1 / 5, 'height', 1 / 3);
          loadTexture('path', '/images/obj32.png', 'name', 'yuka-blk', 'x', 2 / 5, 'y', 1 / 3, 'width', 1 / 5, 'height', 1 / 3);
          loadTexture('path', '/images/obj32.png', 'name', 'kara-blk', 'x', 3 / 5, 'y', 1 / 3, 'width', 1 / 5, 'height', 1 / 3);
          loadTexture('path', '/images/obj32.png', 'name', 'star', 'x', 4 / 5, 'y', 1 / 3, 'width', 1 / 5, 'height', 1 / 3);
          loadTexture('path', '/images/obj32.png', 'name', 'hard-blk', 'x', 2 / 5, 'y', 0 / 3, 'width', 1 / 5, 'height', 1 / 3);
          loadTexture('path', '/images/obj32.png', 'name', 'kinoko', 'x', 3 / 5, 'y', 0 / 3, 'width', 1 / 5, 'height', 1 / 3);
          loadTexture('path', '/images/obj32.png', 'name', '1up', 'x', 4 / 5, 'y', 0 / 3, 'width', 1 / 5, 'height', 1 / 3);
          loadTexture('path', '/images/softblock.png', 'width', 1.0, 'x', 0, 'name', 's-block');
          __PS_MV_REG = [];
          return true;
      };
      this.process = function (state1185) {
          addToEventLog('global');
          __PS_MV_REG = [];
          return makeState('menu');
      };
      this.endProcess = function (state1186) {
          return true;
      };
      return this;
  };
  function makeGameGlobalInitState() {
      var _js2509 = arguments.length;
      for (var n2508 = 0; n2508 < _js2509; n2508 += 2) {
          switch (arguments[n2508]) {
          case 'start-process':
              startProcess = arguments[n2508 + 1];
              break;
          case 'process':
              process = arguments[n2508 + 1];
              break;
          case 'end-process':
              endProcess = arguments[n2508 + 1];
          };
      };
      var startProcess = 'undefined' === typeof startProcess ? function (state1187) {
          loadFont('js/');
          loadTexture('path', '/images/test.png', 'name', 'test');
          loadTexture('path', '/images/test2.png', 'name', 'test2', 'x', 0 / 3, 'width', 1 / 3);
          loadTexture('path', '/images/obj32.png', 'name', 'dokan-top-l', 'x', 0 / 5, 'y', 2 / 3, 'width', 1 / 5, 'height', 1 / 3);
          loadTexture('path', '/images/obj32.png', 'name', 'dokan-top-r', 'x', 1 / 5, 'y', 2 / 3, 'width', 1 / 5, 'height', 1 / 3);
          loadTexture('path', '/images/obj32.png', 'name', 'dokan-mid-l', 'x', 0 / 5, 'y', 1 / 3, 'width', 1 / 5, 'height', 1 / 3);
          loadTexture('path', '/images/obj32.png', 'name', 'dokan-mid-r', 'x', 1 / 5, 'y', 1 / 3, 'width', 1 / 5, 'height', 1 / 3);
          loadTexture('path', '/images/obj32.png', 'name', 'dokan-bot-l', 'x', 0 / 5, 'y', 0 / 3, 'width', 1 / 5, 'height', 1 / 3);
          loadTexture('path', '/images/obj32.png', 'name', 'dokan-bot-r', 'x', 1 / 5, 'y', 0 / 3, 'width', 1 / 5, 'height', 1 / 3);
          loadTexture('path', '/images/obj32.png', 'name', 'flower', 'x', 2 / 5, 'y', 2 / 3, 'width', 1 / 5, 'height', 1 / 3);
          loadTexture('path', '/images/obj32.png', 'name', 'hatena', 'x', 3 / 5, 'y', 2 / 3, 'width', 1 / 5, 'height', 1 / 3);
          loadTexture('path', '/images/obj32.png', 'name', 'soft-blk', 'x', 4 / 5, 'y', 2 / 3, 'width', 1 / 5, 'height', 1 / 3);
          loadTexture('path', '/images/obj32.png', 'name', 'yuka-blk', 'x', 2 / 5, 'y', 1 / 3, 'width', 1 / 5, 'height', 1 / 3);
          loadTexture('path', '/images/obj32.png', 'name', 'kara-blk', 'x', 3 / 5, 'y', 1 / 3, 'width', 1 / 5, 'height', 1 / 3);
          loadTexture('path', '/images/obj32.png', 'name', 'star', 'x', 4 / 5, 'y', 1 / 3, 'width', 1 / 5, 'height', 1 / 3);
          loadTexture('path', '/images/obj32.png', 'name', 'hard-blk', 'x', 2 / 5, 'y', 0 / 3, 'width', 1 / 5, 'height', 1 / 3);
          loadTexture('path', '/images/obj32.png', 'name', 'kinoko', 'x', 3 / 5, 'y', 0 / 3, 'width', 1 / 5, 'height', 1 / 3);
          loadTexture('path', '/images/obj32.png', 'name', '1up', 'x', 4 / 5, 'y', 0 / 3, 'width', 1 / 5, 'height', 1 / 3);
          loadTexture('path', '/images/softblock.png', 'width', 1.0, 'x', 0, 'name', 's-block');
          __PS_MV_REG = [];
          return true;
      } : startProcess;
      var process = 'undefined' === typeof process ? function (state1188) {
          addToEventLog('global');
          __PS_MV_REG = [];
          return makeState('menu');
      } : process;
      var endProcess = 'undefined' === typeof endProcess ? function (state1189) {
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

var mogewebzou_game_state_gacha = (function() {
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
  function gameGachaState() {
      this.startProcess = function (state1190) {
          var newParent1191 = parent;
          try {
              stackDefaultEcsEntityParent(newParent1191);
              var background = makeEcsEntity();
              addEcsComponentList(background, makePoint2d('x', 0, 'y', 0), makeModel2d('model', makeSolidRect('width', 300, 'height', 300, 'color', 15597568), 'depth', 1));
              addEcsEntity(background);
              __PS_MV_REG = [];
              return true;
          } finally {
              popDefaultEcsEntityParent();
          };
      };
      this.process = function (state1192) {
          return null;
      };
      this.endProcess = function (state1193) {
          return true;
      };
      this.parent = makeEcsEntity();
      __PS_MV_REG = [];
      return this;
  };
  function makeGameGachaState() {
      var _js2511 = arguments.length;
      for (var n2510 = 0; n2510 < _js2511; n2510 += 2) {
          switch (arguments[n2510]) {
          case 'start-process':
              startProcess = arguments[n2510 + 1];
              break;
          case 'process':
              process = arguments[n2510 + 1];
              break;
          case 'end-process':
              endProcess = arguments[n2510 + 1];
              break;
          case 'parent':
              parent = arguments[n2510 + 1];
          };
      };
      var startProcess = 'undefined' === typeof startProcess ? function (state1194) {
          var newParent1195 = parent;
          try {
              stackDefaultEcsEntityParent(newParent1195);
              var background = makeEcsEntity();
              addEcsComponentList(background, makePoint2d('x', 0, 'y', 0), makeModel2d('model', makeSolidRect('width', 300, 'height', 300, 'color', 15597568), 'depth', 1));
              addEcsEntity(background);
              __PS_MV_REG = [];
              return true;
          } finally {
              popDefaultEcsEntityParent();
          };
      } : startProcess;
      var process = 'undefined' === typeof process ? function (state1196) {
          return null;
      } : process;
      var endProcess = 'undefined' === typeof endProcess ? function (state1197) {
          return true;
      } : endProcess;
      var parent = 'undefined' === typeof parent ? makeEcsEntity() : parent;
      var result = new gameGachaState();
      result.startProcess = startProcess;
      result.process = process;
      result.endProcess = endProcess;
      result.parent = parent;
      __PS_MV_REG = [];
      return result;
  };
  function gameGachaStateP(obj) {
      return (obj instanceof gameGachaState);
  };
  (function () {
      var tempCtor = function () {
          return null;
      };
      tempCtor.prototype = gameState.prototype;
      gameGachaState.superClass_ = gameState.prototype;
      gameGachaState.prototype = new tempCtor();
      __PS_MV_REG = [];
      return gameGachaState.prototype.constructor = gameGachaState;
  })();
  clWeb2dGame_core_gameState._internal.registerStateMaker('gacha', makeGameGachaState);
  /* --- extern symbols --- */
  return {
    'makeGameGachaState': makeGameGachaState,
    '_internal': {
      'gameGachaState': gameGachaState,
      'gameGachaStateP': gameGachaStateP,
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
      this.startProcess = function (state1198) {
          var newParent1199 = state1198.parent;
          try {
              stackDefaultEcsEntityParent(newParent1199);
              var area = makeTextArea('font-size', 50, 'text-align', 'center');
              addTextToArea(area, 'text', 'Press Z key start HOGE', 'color', 16777215);
              addEcsComponentList(area, makePoint2d('x', 300, 'y', 300));
              addEcsEntity(area);
          } finally {
              popDefaultEcsEntityParent();
          };
          __PS_MV_REG = [];
          return true;
      };
      this.process = function (state1200) {
          if (startGameP()) {
              addToEventLog('menu');
              __PS_MV_REG = [];
              return makeState('main');
          };
      };
      this.endProcess = function (state1201) {
          registerNextFrameFunc(function () {
              __PS_MV_REG = [];
              return deleteEcsEntity(state1201.parent);
          });
          __PS_MV_REG = [];
          return true;
      };
      this.parent = makeEcsEntity();
      __PS_MV_REG = [];
      return this;
  };
  function makeGameMenuState() {
      var _js2513 = arguments.length;
      for (var n2512 = 0; n2512 < _js2513; n2512 += 2) {
          switch (arguments[n2512]) {
          case 'start-process':
              startProcess = arguments[n2512 + 1];
              break;
          case 'process':
              process = arguments[n2512 + 1];
              break;
          case 'end-process':
              endProcess = arguments[n2512 + 1];
              break;
          case 'parent':
              parent = arguments[n2512 + 1];
          };
      };
      var startProcess = 'undefined' === typeof startProcess ? function (state1202) {
          var newParent1203 = state1202.parent;
          try {
              stackDefaultEcsEntityParent(newParent1203);
              var area = makeTextArea('font-size', 50, 'text-align', 'center');
              addTextToArea(area, 'text', 'Press Z key start HOGE', 'color', 16777215);
              addEcsComponentList(area, makePoint2d('x', 300, 'y', 300));
              addEcsEntity(area);
          } finally {
              popDefaultEcsEntityParent();
          };
          __PS_MV_REG = [];
          return true;
      } : startProcess;
      var process = 'undefined' === typeof process ? function (state1204) {
          if (startGameP()) {
              addToEventLog('menu');
              __PS_MV_REG = [];
              return makeState('main');
          };
      } : process;
      var endProcess = 'undefined' === typeof endProcess ? function (state1205) {
          registerNextFrameFunc(function () {
              __PS_MV_REG = [];
              return deleteEcsEntity(state1205.parent);
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

var mogewebzou_game_parameter = (function() {
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
  /* --- define objects --- */
  if ('undefined' === typeof fieldHeight) {
      var fieldHeight = 600;
  };
  if ('undefined' === typeof fieldWidth) {
      var fieldWidth = (fieldHeight * 4.0) / 3;
  };
  function calcAbsoluteLength(relativeLength, baseLength) {
      return relativeLength * baseLength * 0.001;
  };
  if ('undefined' === typeof PARAMS) {
      var PARAMS = (function () {
          var result2514;
          var result2515;
          var result2516;
          var result2517;
          var result2518;
          var result2519;
          var result2520;
          var result2521;
          var result2522;
          var result2523;
          var result = {  };
          result['field'] = (result2514 = {  }, (result2514['x'] = 0, result2514['y'] = 0, result2514['width'] = fieldWidth, result2514['height'] = fieldHeight, result2514['depth'] = 0, result2514));
          result['obj'] = (result2515 = {  }, (result2515['depth'] = 50, result2515));
          result['ball'] = (result2516 = {  }, (result2516['r'] = function () {
              __PS_MV_REG = [];
              return calcAbsoluteLength(10, fieldWidth);
          }, result2516['color'] = 16755370, result2516['depth'] = 10, result2516['speed'] = (result2517 = {  }, (result2517['base'] = (result2518 = {  }, (result2518['min'] = function () {
              __PS_MV_REG = [];
              return calcAbsoluteLength(5, fieldHeight);
          }, result2518['max'] = function () {
              __PS_MV_REG = [];
              return calcAbsoluteLength(10, fieldHeight);
          }, result2518)), result2517['accell-scale'] = (result2519 = {  }, (result2519['per-block'] = 0.008, result2519['max'] = 1.5, result2519)), result2517)), result2516['angle'] = (result2520 = {  }, (result2520['min'] = function () {
              return Math.PI / 7;
          }, result2520['max-accele'] = function () {
              return Math.PI / 8;
          }, result2520)), result2516['dist-from-paddle'] = function () {
              __PS_MV_REG = [];
              return calcAbsoluteLength(10, fieldHeight);
          }, result2516));
          result['paddle'] = (result2521 = {  }, (result2521['width'] = (result2522 = {  }, (result2522['min'] = function () {
              __PS_MV_REG = [];
              return calcAbsoluteLength(130, fieldWidth);
          }, result2522['max'] = function () {
              __PS_MV_REG = [];
              return calcAbsoluteLength(55, fieldWidth);
          }, result2522)), result2521['height'] = function () {
              __PS_MV_REG = [];
              return calcAbsoluteLength(10, fieldHeight);
          }, result2521['depth'] = 8, result2521['base-line-height'] = function () {
              __PS_MV_REG = [];
              return calcAbsoluteLength(80, fieldHeight);
          }, result2521['lane-space'] = function () {
              __PS_MV_REG = [];
              return calcAbsoluteLength(30, fieldHeight);
          }, result2521['lane-count'] = 4, result2521));
          result['gravity'] = (result2523 = {  }, (result2523['value'] = function () {
              __PS_MV_REG = [];
              return calcAbsoluteLength(1, fieldHeight);
          }, result2523['range'] = function () {
              __PS_MV_REG = [];
              return calcAbsoluteLength(200, fieldHeight);
          }, result2523));
          return result;
      })();
  };
  /* --- extern symbols --- */
  return {
    '_internal': {
      'fieldHeight': fieldHeight,
      'fieldWidth': fieldWidth,
      'calcAbsoluteLength': calcAbsoluteLength,
      'PARAMS': PARAMS,
    }
  };
})();

var mogewebzou_game_stage_stage = (function() {
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
  if ('undefined' === typeof STAGE11) {
      var STAGE11 = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'y', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'y', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'a', 0, 'a', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'y', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 2, 4, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 'y', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 'y', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 'y', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 'y', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 5, 2, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'x', 'u', 0, 0, 0, 0, 0, 0, 0, 0, 0, 'x', 'u', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 5, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 2, 6, 0, 0, 0, 0, 4, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 'y', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'x', 'u', 0, 0, 0, 0, 0, 0, 'w', 's', 0, 0, 0, 0, 0, 0, 0, 0, 0, 'w', 's', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 'y', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'x', 'u', 0, 0, 0, 0, 0, 0, 0, 0, 'w', 's', 0, 0, 0, 0, 0, 0, 'v', 'r', 0, 0, 0, 0, 0, 0, 0, 0, 0, 'v', 'r', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 'x', 'u', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'x', 'u', 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 'y', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ['p', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'a', 0, 0, 0, 0, 0, 0, 0, 'w', 's', 0, 0, 0, 0, 0, 0, 0, 0, 'v', 'r', 'a', 0, 0, 0, 0, 0, 'v', 'r', 0, 0, 'a', 0, 'a', 0, 0, 0, 0, 'v', 'r', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'a', 0, 'a', 0, 0, 0, 0, 0, 0, 'b', 0, 0, 0, 0, 0, 0, 0, 0, 'a', 0, 'a', 0, 0, 0, 0, 0, 0, 0, 0, 'a', 0, 'a', 0, 0, 0, 'a', 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 'w', 's', 0, 0, 0, 0, 0, 0, 0, 0, 0, 'a', 0, 'a', 0, 0, 'w', 's', 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
  };
  if ('undefined' === typeof TESTSTAGE) {
      var TESTSTAGE = (function () {
          var arr2524 = new Array([10, 10]);
          var init2525 = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
          for (var i2527 = 0; i2527 < Math.min(arr2524.length, init2525.length); i2527 += 1) {
              arr2524[i2527] = init2525[i2527];
          };
          __PS_MV_REG = [];
          return arr2524;
      })();
  };
  /* --- extern symbols --- */
  return {
    'STAGE11': STAGE11,
    'TESTSTAGE': TESTSTAGE,
    '_internal': {
    }
  };
})();

var mogewebzou_game_field = (function() {
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
  var STAGE11 = mogewebzou_game_stage_stage.STAGE11;
  /* --- define objects --- */
  if ('undefined' === typeof FIELD) {
      var FIELD = null;
  };
  function getField() {
      return FIELD;
  };
  function fieldWidth(field) {
      __PS_MV_REG = [];
      return getEntityParam(field, 'width');
  };
  function fieldHeight(field) {
      __PS_MV_REG = [];
      return getEntityParam(field, 'height');
  };
  function makeObjUsingInfo(x, y, name) {
      var width = 32;
      var height = 32;
      var result = makeRectBlock(width * x, height * y, width, height);
      framePromiseThen(makeTextureModelPromise('width', width, 'height', height, 'texture-name', name), function (model) {
          __PS_MV_REG = [];
          return addEcsComponentList(result, makeModel2d('model', model, 'depth', 30, 'offset', makePoint2d('x', width / -2, 'y', height / -2)));
      });
      __PS_MV_REG = [];
      return result;
  };
  function getObjType(obj) {
      switch (obj) {
      case 1:
          return 'yuka-blk';
      case 2:
          return 'soft-blk';
      case 'a':
          return 'soft-blk';
      case 'b':
          return 'soft-blk';
      case 'p':
          return 'soft-blk';
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
          return 'hatena';
      case 'x':
          return 'dokan-top-l';
      case 'w':
          return 'dokan-mid-l';
      case 'v':
          return 'dokan-bot-l';
      case 'u':
          return 'dokan-top-r';
      case 'r':
          return 'dokan-bot-r';
      case 's':
          return 'dokan-mid-r';
      default:
          return 'yuka-blk';
      };
  };
  function generateMogeStage(field) {
      var value;
      var width = (value = mogewebzou_game_parameter._internal.PARAMS['field']['width'], typeof value === 'function' ? value() : value);
      var ymax = STAGE11.length;
      var xmax = Math.floor(width / 32) + 1;
      setEntityParam(field, 'objxmax', xmax);
      for (var y = 0; y < ymax; y += 1) {
          for (var x = 0; x < xmax; x += 1) {
              var obj = STAGE11[y][x];
              if (obj !== 0) {
                  addEcsEntity(makeObjUsingInfo(x, ymax - 1 - y, getObjType(obj)), field);
              };
          };
      };
  };
  function addObj(xmax, field) {
      var ymax = STAGE11.length;
      for (var y = 0; y < ymax; y += 1) {
          var obj = STAGE11[y][xmax];
          if (obj !== 0) {
              addEcsEntity(makeObjUsingInfo(xmax, ymax - 1 - y, getObjType(obj)), field);
          };
      };
  };
  function initField() {
      var value;
      var value2528;
      var value2529;
      var value2530;
      var value2531;
      var field = makeEcsEntity();
      var width = (value = mogewebzou_game_parameter._internal.PARAMS['field']['width'], typeof value === 'function' ? value() : value);
      var height = (value2528 = mogewebzou_game_parameter._internal.PARAMS['field']['height'], typeof value2528 === 'function' ? value2528() : value2528);
      addEntityTag(field, 'field');
      addEcsComponentList(field, makePoint2d('x', (value2529 = mogewebzou_game_parameter._internal.PARAMS['field']['x'], typeof value2529 === 'function' ? value2529() : value2529), 'y', (value2530 = mogewebzou_game_parameter._internal.PARAMS['field']['y'], typeof value2530 === 'function' ? value2530() : value2530)), makeModel2d('model', makeSolidRect('width', width, 'height', height), 'depth', (value2531 = mogewebzou_game_parameter._internal.PARAMS['field']['depth'], typeof value2531 === 'function' ? value2531() : value2531)), makeScript2d('func', function (entity) {
          __PS_MV_REG = [];
          return updateField(entity);
      }), initEntityParams('width', width, 'height', height, 'objxmax', 0, 'objxmin', 0));
      addEcsEntity(field);
      __PS_MV_REG = [];
      return FIELD = field;
  };
  function makeRectBlock(x, y, width, height) {
      var blk = makeEcsEntity();
      var hWidth = width / 2;
      var hHeight = height / 2;
      var point = makePoint2d('x', x + hWidth, 'y', y + hHeight);
      addEntityTag(blk, 'block');
      addEcsComponentList(blk, point, makeScript2d('func', function (entity) {
          var field = getField();
          var point2d2532 = (found = getEcsComponent(point2d, field), found ? found : (function () {
              throw 'POINT-2D is not included in the entity';
          })());
          __PS_MV_REG = [];
          return -point2d2532.x - 100 > point.x ? registerNextFrameFunc(function () {
              __PS_MV_REG = [];
              return deleteEcsEntity(entity);
          }) : null;
      }), makePhysicPolygon('target-tags', ['ball', 'mouse'], 'pnt-list', [makePoint2d('x', -1 * hWidth, 'y', -1 * hHeight), makePoint2d('x', hWidth, 'y', -1 * hHeight), makePoint2d('x', hWidth, 'y', hHeight), makePoint2d('x', -1 * hWidth, 'y', hHeight)], 'on-collision', function (mine, target) {
          __PS_MV_REG = [];
          return hasEntityTag(target, 'ball') ? registerNextFrameFunc(function () {
              __PS_MV_REG = [];
              return deleteEcsEntity(mine);
          }) : null;
      }), initEntityParams('width', width, 'height', height));
      __PS_MV_REG = [];
      return blk;
  };
  function updateField(field) {
      var moge = findAEntityByTag('moge');
      var point = getEcsComponent(point2d, moge);
      var fieldW = (value = mogewebzou_game_parameter._internal.PARAMS['field']['width'], typeof value === 'function' ? value() : value);
      if (keyDownP('right')) {
          if (point.x >= (value2533 = mogewebzou_game_parameter._internal.PARAMS['field']['width'], typeof value2533 === 'function' ? value2533() : value2533) / 2) {
              var point2d2534 = (found = getEcsComponent(point2d, field), found ? found : (function () {
                  throw 'POINT-2D is not included in the entity';
              })());
              point2d2534.x -= 2;
              var newObjXmax = Math.floor((fieldW + -point2d2534.x) / 32);
              var oldObjXmax = getEntityParam(field, 'objxmax');
              var newObjXmin = Math.floor(-point2d2534.x / 32);
              var oldObjXmin = getEntityParam(field, 'objxmin');
              if (newObjXmin > oldObjXmin) {
                  setEntityParam(field, 'objxmin', newObjXmin);
              };
              if (newObjXmax > oldObjXmax) {
                  setEntityParam(field, 'objxmax', newObjXmax);
                  addObj(newObjXmax, field);
              };
          };
      };
      if (keyDownP('left')) {
          var point2d2535 = (found2536 = getEcsComponent(point2d, field), found2536 ? found2536 : (function () {
              throw 'POINT-2D is not included in the entity';
          })());
          if (point2d2535.x < 0) {
              point2d2535.x += 2;
              var newObjXmin2537 = Math.floor(-point2d2535.x / 32);
              var oldObjXmin2538 = getEntityParam(field, 'objxmin');
              if (newObjXmin2537 < oldObjXmin2538) {
                  setEntityParam(field, 'objxmin', newObjXmin2537);
                  __PS_MV_REG = [];
                  return addObj(newObjXmin2537, field);
              };
          };
      };
  };
  /* --- extern symbols --- */
  return {
    'getField': getField,
    'generateMogeStage': generateMogeStage,
    'initField': initField,
    '_internal': {
      'FIELD': FIELD,
      'fieldWidth': fieldWidth,
      'fieldHeight': fieldHeight,
      'makeObjUsingInfo': makeObjUsingInfo,
      'getObjType': getObjType,
      'addObj': addObj,
      'makeRectBlock': makeRectBlock,
      'updateField': updateField,
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
  var getField = mogewebzou_game_field.getField;
  /* --- define objects --- */
  function controlByKeyboard(entity) {
      var value;
      var field = findAEntityByTag('field');
      var point = getEcsComponent(point2d, field);
      var point2d2539 = (found = getEcsComponent(point2d, entity), found ? found : (function () {
          throw 'POINT-2D is not included in the entity';
      })());
      if (keyDownP('left') && point.x >= 0) {
          point2d2539.x -= 2;
      };
      if (keyDownP('right') && (value = mogewebzou_game_parameter._internal.PARAMS['field']['width'], typeof value === 'function' ? value() : value) / 2 > point2d2539.x) {
          point2d2539.x += 2;
      };
      if (keyDownP('up')) {
          point2d2539.y += 2;
      };
      __PS_MV_REG = [];
      return keyDownP('down') ? (point2d2539.y -= 2) : null;
  };
  function processController(entity) {
      __PS_MV_REG = [];
      return controlByKeyboard(entity);
  };
  function initTest() {
      var rect = makeEcsEntity();
      addEntityTag(rect, 'moge');
      addEcsComponentList(rect, makePoint2d('x', 100, 'y', 100), makeScript2d('func', function (entity) {
          __PS_MV_REG = [];
          return processController(entity);
      }), makeModel2d('model', makeWiredRect('width', 32, 'height', 32, 'color', 65280), 'depth', 10));
      __PS_MV_REG = [];
      return framePromiseThen(makeTextureModelPromise('width', 32, 'height', 32, 'texture-name', 'test2'), function (model) {
          addEcsComponentList(rect, makeModel2d('model', model, 'depth', 50));
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
      'controlByKeyboard': controlByKeyboard,
      'processController': processController,
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
  var initTest = mogewebzou_game_controller.initTest;
  var TESTSTAGE = mogewebzou_game_stage_stage.TESTSTAGE;
  var initController = mogewebzou_game_controller.initController;
  var initField = mogewebzou_game_field.initField;
  var getField = mogewebzou_game_field.getField;
  var addImage = mogewebzou_game_state_menu.addImage;
  var generateMogeStage = mogewebzou_game_field.generateMogeStage;
  /* --- define objects --- */
  function addGachaBtn(parent) {
      var fontSize = 25;
      var margin = 20;
      var centerX = getScreenWidth() / 2;
      var topY = getScreenHeight() / 2 + (fontSize * 2 + margin);
      var area = makeTextArea('font-size', fontSize, 'text-align', 'center', 'margin', margin, 'x', centerX, 'y', topY);
      addEntityTag(area, 'gacha-btn');
      __PS_MV_REG = [];
      return framePromiseThen(addTextToArea(area, 'text', 'Click here to start', 'color', 65535), function (area) {
          var process;
          var areaSize = getTextAreaSize(area);
          var hWidth = ((areaSize.length % 2 !== 0 ? (function () {
              throw 'Message: ' + 'Invalid plist: ~A' + '; Args: ' + areaSize;
          })() : null, keyIndex = (process = function () {
              for (var i = 0; i < areaSize.length / 2; i += 1) {
                  if (areaSize[i * 2] === 'width') {
                      return i * 2;
                  };
              };
          }, process())), keyIndex != null ? areaSize[keyIndex + 1] : null) / 2;
          var height = ((areaSize.length % 2 !== 0 ? (function () {
              throw 'Message: ' + 'Invalid plist: ~A' + '; Args: ' + areaSize;
          })() : null, keyIndex2540 = (process = function () {
              for (var i = 0; i < areaSize.length / 2; i += 1) {
                  if (areaSize[i * 2] === 'height') {
                      return i * 2;
                  };
              };
          }, process())), keyIndex2540 != null ? areaSize[keyIndex2540 + 1] : null);
          var hoverModel = makeModel2d('model', makeWiredRect('width', 2 * hWidth, 'height', height, 'color', 16746496), 'offset', makePoint2d('x', -1 * hWidth, 'y', -1 * height - margin), 'depth', 100);
          addEcsComponentList(area, initEntityParams('next-state', null), makeUiComponent('on-click-up', function () {
              addToEventLog('popo');
              __PS_MV_REG = [];
              return setEntityParam(area, 'next-state', 'gacha');
          }, 'on-mouse-hover', function () {
              __PS_MV_REG = [];
              return enableModel2d(area, 'target-model-2d', hoverModel);
          }, 'on-mouse-not-hover', function () {
              __PS_MV_REG = [];
              return disableModel2d(area, 'target-model-2d', hoverModel);
          }), makePhysicPolygon('pnt-list', [makeVector2d('x', -1 * hWidth, 'y', -1 * height - margin), makeVector2d('x', hWidth, 'y', -1 * height - margin), makeVector2d('x', hWidth, 'y', margin * -1), makeVector2d('x', -1 * hWidth, 'y', margin * -1)]), hoverModel);
          addEcsEntity(area, parent);
          __PS_MV_REG = [];
          return disableModel2d(area, 'target-model-2d', hoverModel);
      });
  };
  function nextStateP() {
      var btn = findAEntityByTag('gacha-btn');
      if (btn) {
          var state = getEntityParam(btn, 'next-state');
          __PS_MV_REG = [];
          return makeState(state);
      } else {
          __PS_MV_REG = [];
          return addToEventLog('dame');
      };
  };
  function gameMainState() {
      this.startProcess = function (state1206) {
          addToEventLog('hoge');
          var newParent1207 = state1206.parent;
          try {
              stackDefaultEcsEntityParent(newParent1207);
              initField();
              addToEventLog('ini');
              var field = getField();
              addToEventLog('gene1');
              generateMogeStage(field);
              addToEventLog('gene');
              initTest();
          } finally {
              popDefaultEcsEntityParent();
          };
          __PS_MV_REG = [];
          return true;
      };
      this.process = function (state1208) {
          __PS_MV_REG = [];
          return keyUpNowP('escape') ? makeState('menu') : null;
      };
      this.endProcess = function (state1209) {
          registerNextFrameFunc(function () {
              __PS_MV_REG = [];
              return deleteEcsEntity(state1209.parent);
          });
          __PS_MV_REG = [];
          return true;
      };
      this.parent = makeEcsEntity();
      __PS_MV_REG = [];
      return this;
  };
  function makeGameMainState() {
      var _js2542 = arguments.length;
      for (var n2541 = 0; n2541 < _js2542; n2541 += 2) {
          switch (arguments[n2541]) {
          case 'start-process':
              startProcess = arguments[n2541 + 1];
              break;
          case 'process':
              process = arguments[n2541 + 1];
              break;
          case 'end-process':
              endProcess = arguments[n2541 + 1];
              break;
          case 'parent':
              parent = arguments[n2541 + 1];
          };
      };
      var startProcess = 'undefined' === typeof startProcess ? function (state1210) {
          addToEventLog('hoge');
          var newParent1211 = state1210.parent;
          try {
              stackDefaultEcsEntityParent(newParent1211);
              initField();
              addToEventLog('ini');
              var field = getField();
              addToEventLog('gene1');
              generateMogeStage(field);
              addToEventLog('gene');
              initTest();
          } finally {
              popDefaultEcsEntityParent();
          };
          __PS_MV_REG = [];
          return true;
      } : startProcess;
      var process = 'undefined' === typeof process ? function (state1212) {
          __PS_MV_REG = [];
          return keyUpNowP('escape') ? makeState('menu') : null;
      } : process;
      var endProcess = 'undefined' === typeof endProcess ? function (state1213) {
          registerNextFrameFunc(function () {
              __PS_MV_REG = [];
              return deleteEcsEntity(state1213.parent);
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
      'addGachaBtn': addGachaBtn,
      'nextStateP': nextStateP,
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
  var makeGameGachaState = mogewebzou_game_state_gacha.makeGameGachaState;
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