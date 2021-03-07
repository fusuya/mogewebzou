var psExperiment_defines_defmethod = (function() {
  /* --- import symbols --- */

  /* --- define objects --- */
  function dispatchItem() {
      this.typeList = null;
      this.func = null;
      return this;
  };
  function makeDispatchItem() {
      var _js2 = arguments.length;
      for (var n1 = 0; n1 < _js2; n1 += 2) {
          switch (arguments[n1]) {
          case 'type-list':
              typeList = arguments[n1 + 1];
              break;
          case 'func':
              func = arguments[n1 + 1];
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
      var _js4 = testInstanceList.length;
      var _js6 = targetTypeList.length;
      var FIRST7 = true;
      for (var _js3 = 0; _js3 < _js4; _js3 += 1) {
          var testInstance = testInstanceList[_js3];
          var _js5 = FIRST7 ? 0 : _js5 + 1;
          if (_js5 >= _js6) {
              break;
          };
          var targetType = targetTypeList[_js5];
          if (!instanceDispatchP(testInstance, targetType)) {
              __PS_MV_REG = [];
              return null;
          };
          FIRST7 = null;
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
      var _js9 = testTypeList.length;
      var _js11 = targetTypeList.length;
      var FIRST12 = true;
      for (var _js8 = 0; _js8 < _js9; _js8 += 1) {
          var testType = testTypeList[_js8];
          var _js10 = FIRST12 ? 0 : _js10 + 1;
          if (_js10 >= _js11) {
              break;
          };
          var targetType = targetTypeList[_js10];
          if (!typeDispatchP(testType, targetType)) {
              __PS_MV_REG = [];
              return null;
          };
          FIRST12 = null;
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
      var _js14 = arguments.length;
      for (var n13 = 2; n13 < _js14; n13 += 2) {
          switch (arguments[n13]) {
          case 'from':
              from = arguments[n13 + 1];
              break;
          case 'if-does-not-exist':
              ifDoesNotExist = arguments[n13 + 1];
          };
      };
      var from = 'undefined' === typeof from ? 0 : from;
      var ifDoesNotExist = 'undefined' === typeof ifDoesNotExist ? 'error' : ifDoesNotExist;
      var dispatchItemList = DISPATCHLISTTABLE[functionName];
      if (!dispatchItemList) {
          throw 'Message: ' + 'There is no generic function \"~A\"' + '; Args: ' + functionName;
      };
      var _js15 = dispatchItemList.length;
      for (var i = from; i < _js15; i += 1) {
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
      var _js17 = arguments.length;
      for (var n16 = 0; n16 < _js17; n16 += 2) {
          switch (arguments[n16]) {
          case 'time':
              time = arguments[n16 + 1];
              break;
          case 'func':
              func = arguments[n16 + 1];
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
      var _js19 = arguments.length;
      for (var n18 = 0; n18 < _js19; n18 += 2) {
          switch (arguments[n18]) {
          case 'func':
              func = arguments[n18 + 1];
              break;
          case 'include-list':
              includeList = arguments[n18 + 1];
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
      var _js21 = arguments.length;
      for (var n20 = 0; n20 < _js21; n20 += 2) {
          switch (arguments[n20]) {
          case 'current-time':
              currentTime = arguments[n20 + 1];
              break;
          case 'element-list':
              elementList = arguments[n20 + 1];
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
      var gSequence22;
      var gKey23;
      stage.elementList.unshift(makeElement('time', time, 'func', func));
      stage.elementList;
      __PS_MV_REG = [];
      return stage.elementList = (gSequence22 = stage.elementList, gKey23 = null, (gSequence22.sort(function (a, b) {
          var keyA = a;
          var keyB = b;
          return (function (a, b) {
              return a.time < b.time;
          })(keyA, keyB) ? -1 : 1;
      }), gSequence22));
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
          var _js25 = arguments.length;
          for (var n24 = 0; n24 < _js25; n24 += 2) {
              switch (arguments[n24]) {
              case 'time':
                  time = arguments[n24 + 1];
                  break;
              case 'func':
                  func = arguments[n24 + 1];
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
      var _js27 = arguments.length;
      for (var n26 = 0; n26 < _js27; n26 += 2) {
          switch (arguments[n26]) {
          case 'func':
              func = arguments[n26 + 1];
              break;
          case 'pred':
              pred = arguments[n26 + 1];
              break;
          case 'rest-timeout-frame':
              restTimeoutFrame = arguments[n26 + 1];
              break;
          case 'name':
              name = arguments[n26 + 1];
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
      var copy30;
      var copy33;
      var executedList = [];
      for (var funcWithPred = null, _js_arrvar29 = (copy30 = FUNCWITHPREDLIST.concat(), copy30.reverse()), _js_idx28 = 0; _js_idx28 < _js_arrvar29.length; _js_idx28 += 1) {
          funcWithPred = _js_arrvar29[_js_idx28];
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
      for (var executed = null, _js_idx31 = 0; _js_idx31 < executedList.length; _js_idx31 += 1) {
          executed = executedList[_js_idx31];
          FUNCWITHPREDLIST = (copy33 = FUNCWITHPREDLIST, copy33.filter(function (x) {
              return !(function (target32) {
                  return executed === target32;
              })(x);
          }));
      };
  };
  /**
   * Register a function that will be executed when the predication function return true in first of a frame.
   * The name is not used in the process but it is useful for debug.
   */
  function registerFuncWithPred(func, pred) {
      var _js33 = arguments.length;
      for (var n32 = 2; n32 < _js33; n32 += 2) {
          switch (arguments[n32]) {
          case 'timeout-frame':
              timeoutFrame = arguments[n32 + 1];
              break;
          case 'name':
              name = arguments[n32 + 1];
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
      var _js35 = arguments.length;
      for (var n34 = 0; n34 < _js35; n34 += 2) {
          switch (arguments[n34]) {
          case 'result':
              result = arguments[n34 + 1];
              break;
          case 'resolved-p':
              resolvedP = arguments[n34 + 1];
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
      var _js37 = arguments.length;
      for (var n36 = 2; n36 < _js37; n36 += 2) {
          switch (arguments[n36]) {
          case 'timeout-frame':
              timeoutFrame = arguments[n36 + 1];
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
      var _js39 = arguments.length;
      for (var n38 = 2; n38 < _js39; n38 += 2) {
          switch (arguments[n38]) {
          case 'timeout-frame':
              timeoutFrame = arguments[n38 + 1];
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
      for (var callback = null, _js_idx40 = 0; _js_idx40 < hooks.length; _js_idx40 += 1) {
          callback = hooks[_js_idx40];
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
      var _js42 = arguments.length;
      for (var n41 = 0; n41 < _js42; n41 += 2) {
          switch (arguments[n41]) {
          case 'parent':
              parent = arguments[n41 + 1];
              break;
          case 'children':
              children = arguments[n41 + 1];
              break;
          case 'registerp':
              registerp = arguments[n41 + 1];
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
              for (var child = null, _js_arrvar44 = oneNode.children, _js_idx43 = 0; _js_idx43 < _js_arrvar44.length; _js_idx43 += 1) {
                  child = _js_arrvar44[_js_idx43];
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
      var copy46;
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
          node.parent.children = (copy46 = node.parent.children, copy46.filter(function (x) {
              return !(function (target45) {
                  return node === target45;
              })(x);
          }));
          node.parent = null;
      };
      var rec = function (oneNode, lst) {
          var copy48;
          if (oneNode.registerp) {
              var removedLst = (copy48 = lst, copy48.filter(function (x) {
                  return !(function (target47) {
                      return oneNode === target47;
                  })(x);
              }));
              callback(oneNode);
              oneNode.registerp = null;
              for (var child = null, _js_arrvar50 = oneNode.children, _js_idx49 = 0; _js_idx49 < _js_arrvar50.length; _js_idx49 += 1) {
                  child = _js_arrvar50[_js_idx49];
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
      for (var node = null, _js_idx51 = 0; _js_idx51 < placeLst.length; _js_idx51 += 1) {
          node = placeLst[_js_idx51];
          if (predicate(node)) {
              deleteLst.unshift(node);
              deleteLst;
          };
      };
      for (var node = null, _js_idx52 = 0; _js_idx52 < deleteLst.length; _js_idx52 += 1) {
          node = deleteLst[_js_idx52];
          if (node.registerp) {
              placeLst = deleteFlatTreeNode(node, placeLst, callback);
          };
      };
      __PS_MV_REG = [];
      return placeLst;
  };
  /** Move a flat-tree node under a new-parent. */
  function moveFlatTreeNode(node, newParent) {
      var copy56;
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
          return oldParent.children = (copy56 = oldParent.children, copy56.filter(function (x) {
              return !(function (target55) {
                  return node === target55;
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
      var _js58 = arguments.length;
      for (var n57 = 0; n57 < _js58; n57 += 2) {
          switch (arguments[n57]) {
          case 'parent':
              parent = arguments[n57 + 1];
              break;
          case 'children':
              children = arguments[n57 + 1];
              break;
          case 'registerp':
              registerp = arguments[n57 + 1];
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
          var rec861 = function (comp) {
              if (predicate(comp)) {
                  __PS_MV_REG = [];
                  throw { '__ps_block_tag' : 'findAComponent', '__ps_value' : comp };
              };
              for (var child = null, _js_arrvar60 = comp.children, _js_idx59 = 0; _js_idx59 < _js_arrvar60.length; _js_idx59 += 1) {
                  child = _js_arrvar60[_js_idx59];
                  rec861(child);
              };
          };
          rec861(topComponent);
          __PS_MV_REG = [];
          return null;
      } catch (_ps_err61) {
          if (_ps_err61 && 'findAComponent' === _ps_err61['__ps_block_tag']) {
              return _ps_err61['__ps_value'];
          } else {
              throw _ps_err61;
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
      var _js63 = arguments.length;
      for (var n62 = 0; n62 < _js63; n62 += 2) {
          switch (arguments[n62]) {
          case 'parent':
              parent = arguments[n62 + 1];
              break;
          case 'children':
              children = arguments[n62 + 1];
              break;
          case 'registerp':
              registerp = arguments[n62 + 1];
              break;
          case 'id':
              id = arguments[n62 + 1];
              break;
          case 'tags':
              tags = arguments[n62 + 1];
              break;
          case 'components':
              components = arguments[n62 + 1];
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
      for (var entity = null, _js_arrvar65 = getEntityList(), _js_idx64 = 0; _js_idx64 < _js_arrvar65.length; _js_idx64 += 1) {
          entity = _js_arrvar65[_js_idx64];
          entity.registerp = null;
      };
      __PS_MV_REG = [];
      return ENTITYLIST = [];
  };
  /** Get a component from entity by component-type */
  function getEcsComponent(componentType, entity) {
      for (var x66 = null, _js_arrvar68 = entity.components, _js_idx67 = 0; _js_idx67 < _js_arrvar68.length; _js_idx67 += 1) {
          x66 = _js_arrvar68[_js_idx67];
          if ((function (component) {
              __PS_MV_REG = [];
              return (component instanceof (typeof componentType === 'string' ? eval(componentType) : componentType));
          })(x66)) {
              return x66;
          };
      };
  };
  /** Find a registered entity by predicate */
  function findAEntity(predicate) {
      for (var entity = null, _js_arrvar70 = getEntityList(), _js_idx69 = 0; _js_idx69 < _js_arrvar70.length; _js_idx69 += 1) {
          entity = _js_arrvar70[_js_idx69];
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
      for (var tag = null, _js_idx71 = 0; _js_idx71 < tags.length; _js_idx71 += 1) {
          tag = tags[_js_idx71];
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
      for (var tag = null, _js_idx72 = 0; _js_idx72 < tags.length; _js_idx72 += 1) {
          tag = tags[_js_idx72];
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
      var _js74 = arguments.length;
      for (var n73 = 0; n73 < _js74; n73 += 2) {
          switch (arguments[n73]) {
          case 'enable':
              enable = arguments[n73 + 1];
              break;
          case 'target-entities':
              targetEntities = arguments[n73 + 1];
              break;
          case 'target-component-types':
              targetComponentTypes = arguments[n73 + 1];
              break;
          case 'process':
              process = arguments[n73 + 1];
              break;
          case 'process-all':
              processAll = arguments[n73 + 1];
              break;
          case 'add-entity-hook':
              addEntityHook = arguments[n73 + 1];
              break;
          case 'delete-entity-hook':
              deleteEntityHook = arguments[n73 + 1];
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
      for (var pair862 = null, _js_arrvar76 = getEcsSystemList(), _js_idx75 = 0; _js_idx75 < _js_arrvar76.length; _js_idx75 += 1) {
          pair862 = _js_arrvar76[_js_idx75];
          var system = pair862[1];
          if (system.enable) {
              system.processAll(system);
              for (var entity = null, _js_arrvar78 = system.targetEntities, _js_idx77 = 0; _js_idx77 < _js_arrvar78.length; _js_idx77 += 1) {
                  entity = _js_arrvar78[_js_idx77];
                  system.process(entity);
              };
          };
      };
  };
  function isRegisteredEntity(entity, system) {
      for (var x78 = null, _js_arrvar80 = system.targetEntities, _js_idx79 = 0; _js_idx79 < _js_arrvar80.length; _js_idx79 += 1) {
          x78 = _js_arrvar80[_js_idx79];
          if ((function (target77) {
              return entity === target77;
          })(x78)) {
              return x78;
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
              for (var x81 = null, _js_arrvar83 = system.targetEntities, _js_idx82 = 0; _js_idx82 < _js_arrvar83.length; _js_idx82 += 1) {
                  x81 = _js_arrvar83[_js_idx82];
                  if ((function (elem) {
                      return entity === elem;
                  })(x81)) {
                      return x81;
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
      for (var pair863 = null, _js_arrvar85 = getEcsSystemList(), _js_idx84 = 0; _js_idx84 < _js_arrvar85.length; _js_idx84 += 1) {
          pair863 = _js_arrvar85[_js_idx84];
          var system = pair863[1];
          pushEntityToSystemIfNeeded(entity, system);
      };
  };
  function deleteEntityFromSystemIfRegistered(entity, system) {
      var copy87;
      if (isRegisteredEntity(entity, system)) {
          system.deleteEntityHook(entity);
          __PS_MV_REG = [];
          return system.targetEntities = (copy87 = system.targetEntities, copy87.filter(function (x) {
              return !(function (target86) {
                  return entity === target86;
              })(x);
          }));
      };
  };
  function deleteEntityFromAllSystems(entity) {
      for (var pair864 = null, _js_arrvar89 = getEcsSystemList(), _js_idx88 = 0; _js_idx88 < _js_arrvar89.length; _js_idx88 += 1) {
          pair864 = _js_arrvar89[_js_idx88];
          var system = pair864[1];
          deleteEntityFromSystemIfRegistered(entity, system);
      };
  };
  function deleteEntityFromNoLongerBelongSystems(entity) {
      for (var pair865 = null, _js_arrvar91 = getEcsSystemList(), _js_idx90 = 0; _js_idx90 < _js_arrvar91.length; _js_idx90 += 1) {
          pair865 = _js_arrvar91[_js_idx90];
          var system = pair865[1];
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
      var rec866 = function (target) {
          pushEntityToAllTargetSystem(target);
          for (var child = null, _js_arrvar93 = target.children, _js_idx92 = 0; _js_idx92 < _js_arrvar93.length; _js_idx92 += 1) {
              child = _js_arrvar93[_js_idx92];
              rec866(child);
          };
      };
      rec866(entity);
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
      var rec867 = function (target) {
          deleteEntityFromAllSystems(target);
          for (var child = null, _js_arrvar95 = target.children, _js_idx94 = 0; _js_idx94 < _js_arrvar95.length; _js_idx94 += 1) {
              child = _js_arrvar95[_js_idx94];
              rec867(child);
          };
      };
      __PS_MV_REG = [];
      return rec867(entity);
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
          for (var x96 = null, _js_idx97 = 0; _js_idx97 < ECSSYSTEMLIST.length; _js_idx97 += 1) {
              x96 = ECSSYSTEMLIST[_js_idx97];
              if ((function (pair) {
                  return pair[0] === name;
              })(x96)) {
                  return x96;
              };
          };
      })();
      if (found) {
          found[1] = system;
      } else {
          ECSSYSTEMLIST = ECSSYSTEMLIST.concat([[name, system]]);
      };
      system.targetEntities = [];
      for (var entity = null, _js_arrvar99 = getEntityList(), _js_idx98 = 0; _js_idx98 < _js_arrvar99.length; _js_idx98 += 1) {
          entity = _js_arrvar99[_js_idx98];
          pushEntityToSystemIfNeeded(entity, system);
      };
      __PS_MV_REG = [];
      return system;
  };
  function checkComponentUniqueness(component, entity) {
      if ((function () {
          for (var x105 = null, _js_arrvar107 = entity.components, _js_idx106 = 0; _js_idx106 < _js_arrvar107.length; _js_idx106 += 1) {
              x105 = _js_arrvar107[_js_idx106];
              if ((function (target104) {
                  return component === target104;
              })(x105)) {
                  return x105;
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
      for (var component = null, _js_idx108 = 0; _js_idx108 < componentList.length; _js_idx108 += 1) {
          component = componentList[_js_idx108];
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
          for (var x109 = null, _js_idx110 = 0; _js_idx110 < DELETECOMPONENTHOOKS.length; _js_idx110 += 1) {
              x109 = DELETECOMPONENTHOOKS[_js_idx110];
              if ((function (elem) {
                  return callback === elem;
              })(x109)) {
                  return x109;
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
      var copy112;
      var preLength = DELETECOMPONENTHOOKS.length;
      DELETECOMPONENTHOOKS = (copy112 = DELETECOMPONENTHOOKS, copy112.filter(function (x) {
          return !(function (target111) {
              return callback === target111;
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
          for (var hook = null, _js_idx113 = 0; _js_idx113 < DELETECOMPONENTHOOKS.length; _js_idx113 += 1) {
              hook = DELETECOMPONENTHOOKS[_js_idx113];
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
      var _js115 = arguments.length;
      for (var n114 = 0; n114 < _js115; n114 += 2) {
          switch (arguments[n114]) {
          case 'start-process':
              startProcess = arguments[n114 + 1];
              break;
          case 'process':
              process = arguments[n114 + 1];
              break;
          case 'end-process':
              endProcess = arguments[n114 + 1];
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
      var _js117 = arguments.length;
      for (var n116 = 0; n116 < _js117; n116 += 2) {
          switch (arguments[n116]) {
          case 'current-state':
              currentState = arguments[n116 + 1];
              break;
          case 'next-state':
              nextState = arguments[n116 + 1];
              break;
          case 'sub-state':
              subState = arguments[n116 + 1];
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
      var _js119 = arguments.length;
      for (var n118 = 0; n118 < _js119; n118 += 2) {
          switch (arguments[n118]) {
          case 'tree':
              tree = arguments[n118 + 1];
              break;
          case 'current-node':
              currentNode = arguments[n118 + 1];
              break;
          case 'target-fps':
              targetFps = arguments[n118 + 1];
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
      var _js121 = arguments.length;
      for (var n120 = 0; n120 < _js121; n120 += 2) {
          switch (arguments[n120]) {
          case 'name':
              name = arguments[n120 + 1];
              break;
          case 'results':
              results = arguments[n120 + 1];
              break;
          case 'count':
              count = arguments[n120 + 1];
              break;
          case 'color':
              color = arguments[n120 + 1];
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
      var _js123 = arguments.length;
      for (var n122 = 0; n122 < _js123; n122 += 2) {
          switch (arguments[n122]) {
          case 'element':
              element = arguments[n122 + 1];
              break;
          case 'children':
              children = arguments[n122 + 1];
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
      var _js125 = arguments.length;
      for (var n124 = 0; n124 < _js125; n124 += 2) {
          switch (arguments[n124]) {
          case 'array':
              array = arguments[n124 + 1];
              break;
          case 'count':
              count = arguments[n124 + 1];
              break;
          case 'next':
              next = arguments[n124 + 1];
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
              var sum126 = 0;
              for (var i = 0; i < validLength; i += 1) {
                  sum126 += buffer.array[i];
              };
              return sum126;
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
          for (var x127 = null, _js_arrvar129 = manager.currentNode.children, _js_idx128 = 0; _js_idx128 < _js_arrvar129.length; _js_idx128 += 1) {
              x127 = _js_arrvar129[_js_idx128];
              if ((function (node) {
                  return node.element.name === name;
              })(x127)) {
                  return x127;
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
      var _js131 = arguments.length;
      for (var n130 = 0; n130 < _js131; n130 += 2) {
          switch (arguments[n130]) {
          case 'timer':
              timer = arguments[n130 + 1];
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
          var element132 = node.element;
          var children133 = node.children;
          var timeMs = ringBufferAverage(element132.results);
          result = result + '(' + element132.name + ':' + formatNumber(timeMs, 2, 2);
          if (children133.length) {
              result += ' ';
              for (var child = null, _js_idx134 = 0; _js_idx134 < children133.length; _js_idx134 += 1) {
                  child = children133[_js_idx134];
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
      var _js136 = arguments.length;
      for (var n135 = 1; n135 < _js136; n135 += 2) {
          switch (arguments[n135]) {
          case 'open-p':
              openP = arguments[n135 + 1];
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
      var _js138 = arguments.length;
      for (var n137 = 2; n137 < _js138; n137 += 2) {
          switch (arguments[n137]) {
          case 'on-change':
              onChange = arguments[n137 + 1];
              break;
          case 'folder':
              folder = arguments[n137 + 1];
          };
      };
      var onChange;
      var folder = 'undefined' === typeof folder ? getGuiDefaultFolder() : folder;
      GUIPANELPARAMS[name] = initValue ? true : false;
      __PS_MV_REG = [];
      return (folder ? folder : GUIPANEL).add(GUIPANELPARAMS, name).onChange(onChange);
  };
  function addPanelNumber(name, initValue) {
      var _js140 = arguments.length;
      for (var n139 = 2; n139 < _js140; n139 += 2) {
          switch (arguments[n139]) {
          case 'on-change':
              onChange = arguments[n139 + 1];
              break;
          case 'folder':
              folder = arguments[n139 + 1];
              break;
          case 'min':
              min = arguments[n139 + 1];
              break;
          case 'max':
              max = arguments[n139 + 1];
              break;
          case 'step':
              step = arguments[n139 + 1];
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
      var _js142 = arguments.length;
      for (var n141 = 1; n141 < _js142; n141 += 2) {
          switch (arguments[n141]) {
          case 'on-change':
              onChange = arguments[n141 + 1];
              break;
          case 'folder':
              folder = arguments[n141 + 1];
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
      var _js144 = arguments.length;
      for (var n143 = 1; n143 < _js144; n143 += 2) {
          switch (arguments[n143]) {
          case 'name':
              name = arguments[n143 + 1];
              break;
          case 'weight':
              weight = arguments[n143 + 1];
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
          for (var oneLine = null, _js_idx145 = 0; _js_idx145 < EVENTLOGTEXTLIST.length; _js_idx145 += 1) {
              oneLine = EVENTLOGTEXTLIST[_js_idx145];
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
      var _js147 = arguments.length;
      for (var n146 = 0; n146 < _js147; n146 += 2) {
          switch (arguments[n146]) {
          case 'parent':
              parent = arguments[n146 + 1];
              break;
          case 'children':
              children = arguments[n146 + 1];
              break;
          case 'registerp':
              registerp = arguments[n146 + 1];
              break;
          case 'x':
              x = arguments[n146 + 1];
              break;
          case 'y':
              y = arguments[n146 + 1];
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
      var _js149 = arguments.length;
      for (var n148 = 0; n148 < _js149; n148 += 2) {
          switch (arguments[n148]) {
          case 'parent':
              parent = arguments[n148 + 1];
              break;
          case 'children':
              children = arguments[n148 + 1];
              break;
          case 'registerp':
              registerp = arguments[n148 + 1];
              break;
          case 'x':
              x = arguments[n148 + 1];
              break;
          case 'y':
              y = arguments[n148 + 1];
              break;
          case 'angle':
              angle = arguments[n148 + 1];
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
      var _js151 = arguments.length;
      for (var n150 = 0; n150 < _js151; n150 += 2) {
          switch (arguments[n150]) {
          case 'parent':
              parent = arguments[n150 + 1];
              break;
          case 'children':
              children = arguments[n150 + 1];
              break;
          case 'registerp':
              registerp = arguments[n150 + 1];
              break;
          case 'x':
              x = arguments[n150 + 1];
              break;
          case 'y':
              y = arguments[n150 + 1];
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
      var _js153 = arguments.length;
      for (var n152 = 0; n152 < _js153; n152 += 2) {
          switch (arguments[n152]) {
          case 'parent':
              parent = arguments[n152 + 1];
              break;
          case 'children':
              children = arguments[n152 + 1];
              break;
          case 'registerp':
              registerp = arguments[n152 + 1];
              break;
          case 'x':
              x = arguments[n152 + 1];
              break;
          case 'y':
              y = arguments[n152 + 1];
              break;
          case 'width':
              width = arguments[n152 + 1];
              break;
          case 'height':
              height = arguments[n152 + 1];
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
      var _js155 = arguments.length;
      for (var n154 = 0; n154 < _js155; n154 += 2) {
          switch (arguments[n154]) {
          case 'parent':
              parent = arguments[n154 + 1];
              break;
          case 'children':
              children = arguments[n154 + 1];
              break;
          case 'registerp':
              registerp = arguments[n154 + 1];
              break;
          case 'speed':
              speed = arguments[n154 + 1];
              break;
          case 'angle':
              angle = arguments[n154 + 1];
              break;
          case 'radious':
              radious = arguments[n154 + 1];
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
      var _js157 = arguments.length;
      for (var n156 = 0; n156 < _js157; n156 += 2) {
          switch (arguments[n156]) {
          case 'parent':
              parent = arguments[n156 + 1];
              break;
          case 'children':
              children = arguments[n156 + 1];
              break;
          case 'registerp':
              registerp = arguments[n156 + 1];
              break;
          case 'table':
              table = arguments[n156 + 1];
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
      var _js159 = arguments.length;
      for (var n158 = 0; n158 < _js159; n158 += 2) {
          switch (arguments[n158]) {
          case 'parent':
              parent = arguments[n158 + 1];
              break;
          case 'children':
              children = arguments[n158 + 1];
              break;
          case 'registerp':
              registerp = arguments[n158 + 1];
              break;
          case 'func':
              func = arguments[n158 + 1];
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
      var params160 = (found = getEcsComponent(params, entity), found ? found : (function () {
          throw 'PARAMS is not included in the entity';
      })());
      __PS_MV_REG = [];
      return params160.table[key];
  };
  function setEntityParam(entity) {
      var keyValuePair = Array.prototype.slice.call(arguments, 1);
      var params161 = getEcsComponent(params, entity);
      var len = keyValuePair.length;
      if ((len % 2 + 2) % 2 !== 0) {
          throw 'Message: ' + 'Failed assertion: ~A' + '; Args: ' + ((len % 2 + 2) % 2 === 0);
      };
      if (!params161) {
          params161 = makeParams();
          addEcsComponent(params161, entity);
      };
      var _js162 = len / 2;
      for (var i = 0; i < _js162; i += 1) {
          var key = keyValuePair[i * 2];
          var value = keyValuePair[i * 2 + 1];
          params161.table[key] = value;
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
      var hashTable163 = BUTTONTOKEYBOARD;
      for (var key = null, _js_arrvar165 = Object.keys(hashTable163), _js_idx164 = 0; _js_idx164 < _js_arrvar165.length; _js_idx164 += 1) {
          key = _js_arrvar165[_js_idx164];
          (function (button, key) {
              __PS_MV_REG = [];
              return KEYSTATUS[button] = calcNextInputCount(KEYSTATUS[button], KEYBOARD.pressed(key));
          })(key, hashTable163[key]);
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
      var _js167 = arguments.length;
      for (var n166 = 0; n166 < _js167; n166 += 2) {
          switch (arguments[n166]) {
          case 'x':
              x = arguments[n166 + 1];
              break;
          case 'y':
              y = arguments[n166 + 1];
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
      var _js169 = arguments.length;
      for (var n168 = 0; n168 < _js169; n168 += 2) {
          switch (arguments[n168]) {
          case 'x':
              x = arguments[n168 + 1];
              break;
          case 'y':
              y = arguments[n168 + 1];
              break;
          case 'id':
              id = arguments[n168 + 1];
              break;
          case 'count':
              count = arguments[n168 + 1];
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
      var _js171 = arguments.length;
      for (var n170 = 0; n170 < _js171; n170 += 2) {
          switch (arguments[n170]) {
          case 'touches':
              touches = arguments[n170 + 1];
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
      var count172 = elem.count;
      if (count172 === 0) {
          return 'up';
      } else if (count172 === 1) {
          return 'down-now';
      } else if (count172 > 1) {
          return 'down';
      } else if (count172 === -1) {
          return 'down';
      } else if (count172 === -2) {
          return 'up-now';
      } else {
          return 'up';
      };
  };
  function getTotalTouchState() {
      var count = 0;
      var result = null;
      var hashTable173 = getTouchStateHash();
      for (var key = null, _js_arrvar175 = Object.keys(hashTable173), _js_idx174 = 0; _js_idx174 < _js_arrvar175.length; _js_idx174 += 1) {
          key = _js_arrvar175[_js_idx174];
          (function (id, hashValue868) {
              return hashValue868.count !== 0 ? ++count : null;
          })(key, hashTable173[key]);
      };
      switch (count) {
      case 0:
          result = 'up';
          break;
      case 1:
          var hashTable176 = getTouchStateHash();
          for (var key = null, _js_arrvar178 = Object.keys(hashTable176), _js_idx177 = 0; _js_idx177 < _js_arrvar178.length; _js_idx177 += 1) {
              key = _js_arrvar178[_js_idx177];
              (function (id, hashValue869) {
                  __PS_MV_REG = [];
                  return hashValue869.count !== 0 ? (result = getTouchState(id)) : null;
              })(key, hashTable176[key]);
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
          var hashTable179 = getTouchStateHash();
          for (var key = null, _js_arrvar181 = Object.keys(hashTable179), _js_idx180 = 0; _js_idx180 < _js_arrvar181.length; _js_idx180 += 1) {
              key = _js_arrvar181[_js_idx180];
              (function (id, hashValue870) {
                  if (hashValue870.count !== 0) {
                      var state = getTouchState(id);
                      __PS_MV_REG = [];
                      return result == null || priorP(state, result) ? (result = state) : null;
                  } else {
                      __PS_MV_REG = [];
                      return null;
                  };
              })(key, hashTable179[key]);
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
      var hashTable182 = getTouchStateHash();
      for (var key = null, _js_arrvar184 = Object.keys(hashTable182), _js_idx183 = 0; _js_idx183 < _js_arrvar184.length; _js_idx183 += 1) {
          key = _js_arrvar184[_js_idx183];
          (function (id, hashValue871) {
              if (hashValue871.count !== 0) {
                  sum += fn(id);
                  return ++count;
              };
          })(key, hashTable182[key]);
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
      var hashTable185 = TOUCHSTATEHASH;
      for (var key = null, _js_arrvar187 = Object.keys(hashTable185), _js_idx186 = 0; _js_idx186 < _js_arrvar187.length; _js_idx186 += 1) {
          key = _js_arrvar187[_js_idx186];
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
          })(key, hashTable185[key]);
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
      var touches188 = result.touches;
      for (var i = 0; i < e.changedTouches.length; i += 1) {
          var touch = e.changedTouches[i];
          var elem = makeTouchEventElement('id', touch.identifier);
          setXyOfTouchEventElement(elem, touch);
          touches188[i] = elem;
      };
      __PS_MV_REG = [];
      return result;
  };
  function onTouchStart(e) {
      var event = initTouchEvent(e);
      for (var eventElem = null, _js_arrvar190 = event.touches, _js_idx189 = 0; _js_idx189 < _js_arrvar190.length; _js_idx189 += 1) {
          eventElem = _js_arrvar190[_js_idx189];
          TOUCHSTATEHASH[eventElem.id] = eventElem;
      };
      __PS_MV_REG = [];
      return callTouchStartCallbacks(event);
  };
  function onTouchEnd(e) {
      if (e.touches.length === 0) {
      };
      for (var touch = null, _js_arrvar192 = e.changedTouches, _js_idx191 = 0; _js_idx191 < _js_arrvar192.length; _js_idx191 += 1) {
          touch = _js_arrvar192[_js_idx191];
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
      for (var touch = null, _js_arrvar194 = e.changedTouches, _js_idx193 = 0; _js_idx193 < _js_arrvar194.length; _js_idx193 += 1) {
          touch = _js_arrvar194[_js_idx193];
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
          var _js196 = arguments.length;
          for (var n195 = 0; n195 < _js196; n195 += 2) {
              switch (arguments[n195]) {
              case 'time':
                  time = arguments[n195 + 1];
                  break;
              case 'x':
                  x = arguments[n195 + 1];
                  break;
              case 'y':
                  y = arguments[n195 + 1];
                  break;
              case 'angle':
                  angle = arguments[n195 + 1];
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
          var _js198 = arguments.length;
          for (var n197 = 0; n197 < _js198; n197 += 2) {
              switch (arguments[n197]) {
              case 'time':
                  time = arguments[n197 + 1];
                  break;
              case 'x':
                  x = arguments[n197 + 1];
                  break;
              case 'y':
                  y = arguments[n197 + 1];
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
      var _js200 = arguments.length;
      for (var n199 = 0; n199 < _js200; n199 += 2) {
          switch (arguments[n199]) {
          case 'path-list':
              pathList = arguments[n199 + 1];
              break;
          case 'material':
              material = arguments[n199 + 1];
              break;
          case 'rect-uv':
              rectUv = arguments[n199 + 1];
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
      var _js202 = arguments.length;
      for (var n201 = 0; n201 < _js202; n201 += 2) {
          switch (arguments[n201]) {
          case 'promise':
              promise = arguments[n201 + 1];
              break;
          case 'ref-count':
              refCount = arguments[n201 + 1];
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
      var _js204 = arguments.length;
      for (var n203 = 0; n203 < _js204; n203 += 2) {
          switch (arguments[n203]) {
          case 'path':
              path = arguments[n203 + 1];
              break;
          case 'loader':
              loader = arguments[n203 + 1];
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
      var _js206 = arguments.length;
      for (var n205 = 0; n205 < _js206; n205 += 2) {
          switch (arguments[n205]) {
          case 'path':
              path = arguments[n205 + 1];
              break;
          case 'name':
              name = arguments[n205 + 1];
              break;
          case 'alpha-path':
              alphaPath = arguments[n205 + 1];
              break;
          case 'x':
              x = arguments[n205 + 1];
              break;
          case 'y':
              y = arguments[n205 + 1];
              break;
          case 'width':
              width = arguments[n205 + 1];
              break;
          case 'height':
              height = arguments[n205 + 1];
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
          var copy210;
          TEXTUREPROMISETABLE = (copy210 = TEXTUREPROMISETABLE, copy210.filter(function (x) {
              return !(function (target209) {
                  return texPromise === target209;
              })(x);
          }));
          for (var path = null, _js_arrvar208 = tex.pathList, _js_idx207 = 0; _js_idx207 < _js_arrvar208.length; _js_idx207 += 1) {
              path = _js_arrvar208[_js_idx207];
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
      for (var vertexAsLst = null, _js_idx211 = 0; _js_idx211 < rawVertexLst.length; _js_idx211 += 1) {
          vertexAsLst = rawVertexLst[_js_idx211];
          geometry.vertices.push(new THREE.Vector3(vertexAsLst[0], vertexAsLst[1], 0));
      };
  };
  function pushFacesTo(geometry, rawFaceLst) {
      for (var faceAsLst = null, _js_idx212 = 0; _js_idx212 < rawFaceLst.length; _js_idx212 += 1) {
          faceAsLst = rawFaceLst[_js_idx212];
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
      var _js214 = arguments.length;
      for (var n213 = 0; n213 < _js214; n213 += 2) {
          switch (arguments[n213]) {
          case 'pos-a':
              posA = arguments[n213 + 1];
              break;
          case 'pos-b':
              posB = arguments[n213 + 1];
              break;
          case 'color':
              color = arguments[n213 + 1];
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
      var _js216 = arguments.length;
      for (var n215 = 0; n215 < _js216; n215 += 2) {
          switch (arguments[n215]) {
          case 'pnt-list':
              pntList = arguments[n215 + 1];
              break;
          case 'color':
              color = arguments[n215 + 1];
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
      for (var pnt = null, _js_idx217 = 0; _js_idx217 < pntList.length; _js_idx217 += 1) {
          pnt = pntList[_js_idx217];
          pushVertices([pnt[0], pnt[1]]);
      };
      __PS_MV_REG = [];
      return makeLineModel(geometry2, color);
  };
  function makeSolidRect() {
      var _js219 = arguments.length;
      for (var n218 = 0; n218 < _js219; n218 += 2) {
          switch (arguments[n218]) {
          case 'width':
              width = arguments[n218 + 1];
              break;
          case 'height':
              height = arguments[n218 + 1];
              break;
          case 'color':
              color = arguments[n218 + 1];
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
      var _js221 = arguments.length;
      for (var n220 = 0; n220 < _js221; n220 += 2) {
          switch (arguments[n220]) {
          case 'width':
              width = arguments[n220 + 1];
              break;
          case 'height':
              height = arguments[n220 + 1];
              break;
          case 'color':
              color = arguments[n220 + 1];
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
      var object222 = texture.rectUv;
      var uvs = geometry.faceVertexUvs[0];
      var countOuter = 0;
      for (var uv = null, _js_arrvar224 = makeRectUvs(object222.x + object222.width * x, object222.y + object222.height * y, object222.width * width, object222.height * height), _js_idx223 = 0; _js_idx223 < _js_arrvar224.length; _js_idx223 += 1) {
          uv = _js_arrvar224[_js_idx223];
          if (countOuter >= uvs.length) {
              uvs.push(uv);
          } else {
              var countInner = 0;
              for (var vector = null, _js_idx225 = 0; _js_idx225 < uv.length; _js_idx225 += 1) {
                  vector = uv[_js_idx225];
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
      var _js226 = arguments.length;
      for (var n225 = 0; n225 < _js226; n225 += 2) {
          switch (arguments[n225]) {
          case 'width':
              width = arguments[n225 + 1];
              break;
          case 'height':
              height = arguments[n225 + 1];
              break;
          case 'size-type':
              sizeType = arguments[n225 + 1];
              break;
          case 'texture':
              texture = arguments[n225 + 1];
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
      var _js228 = arguments.length;
      for (var n227 = 0; n227 < _js228; n227 += 2) {
          switch (arguments[n227]) {
          case 'width':
              width = arguments[n227 + 1];
              break;
          case 'height':
              height = arguments[n227 + 1];
              break;
          case 'size-type':
              sizeType = arguments[n227 + 1];
              break;
          case 'texture-name':
              textureName = arguments[n227 + 1];
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
      var _js230 = arguments.length;
      for (var n229 = 0; n229 < _js230; n229 += 2) {
          switch (arguments[n229]) {
          case 'r':
              r = arguments[n229 + 1];
              break;
          case 'n':
              n = arguments[n229 + 1];
              break;
          case 'start-angle':
              startAngle = arguments[n229 + 1];
              break;
          case 'color':
              color = arguments[n229 + 1];
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
      var _js232 = arguments.length;
      for (var n231 = 0; n231 < _js232; n231 += 2) {
          switch (arguments[n231]) {
          case 'r':
              r = arguments[n231 + 1];
              break;
          case 'n':
              n = arguments[n231 + 1];
              break;
          case 'start-angle':
              startAngle = arguments[n231 + 1];
              break;
          case 'color':
              color = arguments[n231 + 1];
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
      var _js234 = arguments.length;
      for (var n233 = 0; n233 < _js234; n233 += 2) {
          switch (arguments[n233]) {
          case 'r':
              r = arguments[n233 + 1];
              break;
          case 'color':
              color = arguments[n233 + 1];
          };
      };
      var r;
      var color;
      __PS_MV_REG = [];
      return makeSolidRegularPolygon('r', r, 'n', 60, 'color', color);
  };
  function makeWiredCircle() {
      var _js236 = arguments.length;
      for (var n235 = 0; n235 < _js236; n235 += 2) {
          switch (arguments[n235]) {
          case 'r':
              r = arguments[n235 + 1];
              break;
          case 'color':
              color = arguments[n235 + 1];
          };
      };
      var r;
      var color;
      __PS_MV_REG = [];
      return makeWiredRegularPolygon('r', r, 'n', 60, 'color', color);
  };
  function makeWiredPolygon() {
      var _js238 = arguments.length;
      for (var n237 = 0; n237 < _js238; n237 += 2) {
          switch (arguments[n237]) {
          case 'pnt-list':
              pntList = arguments[n237 + 1];
              break;
          case 'color':
              color = arguments[n237 + 1];
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
      for (var pnt = null, _js_idx239 = 0; _js_idx239 < pntList.length; _js_idx239 += 1) {
          pnt = pntList[_js_idx239];
          pushVertices(pnt);
      };
      pushVertices(pntList[0]);
      __PS_MV_REG = [];
      return makeLineModel(geometry7, color);
  };
  function makeSolidPolygon() {
      var _js241 = arguments.length;
      for (var n240 = 0; n240 < _js241; n240 += 2) {
          switch (arguments[n240]) {
          case 'pnt-list':
              pntList = arguments[n240 + 1];
              break;
          case 'color':
              color = arguments[n240 + 1];
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
      for (var pnt = null, _js_idx242 = 0; _js_idx242 < pntList.length; _js_idx242 += 1) {
          pnt = pntList[_js_idx242];
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
      var _js244 = arguments.length;
      for (var n243 = 1; n243 < _js244; n243 += 2) {
          switch (arguments[n243]) {
          case 'size':
              size = arguments[n243 + 1];
              break;
          case 'color':
              color = arguments[n243 + 1];
              break;
          case 'curve-segments':
              curveSegments = arguments[n243 + 1];
              break;
          case 'font-name':
              fontName = arguments[n243 + 1];
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
          for (var vec = null, _js_arrvar246 = vectors.slice(1), _js_idx245 = 0; _js_idx245 < _js_arrvar246.length; _js_idx245 += 1) {
              vec = _js_arrvar246[_js_idx245];
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
          for (var vec = null, _js_arrvar248 = vectors.slice(1), _js_idx247 = 0; _js_idx247 < _js_arrvar248.length; _js_idx247 += 1) {
              vec = _js_arrvar248[_js_idx247];
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
      var speed249 = rotate2d.speed;
      incfRotateDiff(point2d, rotate2d.radious, rotate2d.angle, speed249);
      point2d.angle += speed249;
      __PS_MV_REG = [];
      return rotate2d.angle += speed249;
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
      var _js251 = arguments.length;
      for (var n250 = 0; n250 < _js251; n250 += 2) {
          switch (arguments[n250]) {
          case 'left':
              left = arguments[n250 + 1];
              break;
          case 'right':
              right = arguments[n250 + 1];
              break;
          case 'bottom':
              bottom = arguments[n250 + 1];
              break;
          case 'top':
              top = arguments[n250 + 1];
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
      var _js253 = arguments.length;
      for (var n252 = 0; n252 < _js253; n252 += 2) {
          switch (arguments[n252]) {
          case 'parent':
              parent = arguments[n252 + 1];
              break;
          case 'children':
              children = arguments[n252 + 1];
              break;
          case 'registerp':
              registerp = arguments[n252 + 1];
              break;
          case 'kind':
              kind = arguments[n252 + 1];
              break;
          case 'offset':
              offset = arguments[n252 + 1];
              break;
          case 'target-tags':
              targetTags = arguments[n252 + 1];
              break;
          case 'bounding-box':
              boundingBox = arguments[n252 + 1];
              break;
          case 'on-collision':
              onCollision = arguments[n252 + 1];
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
      var _js255 = arguments.length;
      for (var n254 = 0; n254 < _js255; n254 += 2) {
          switch (arguments[n254]) {
          case 'parent':
              parent = arguments[n254 + 1];
              break;
          case 'children':
              children = arguments[n254 + 1];
              break;
          case 'registerp':
              registerp = arguments[n254 + 1];
              break;
          case 'kind':
              kind = arguments[n254 + 1];
              break;
          case 'offset':
              offset = arguments[n254 + 1];
              break;
          case 'target-tags':
              targetTags = arguments[n254 + 1];
              break;
          case 'bounding-box':
              boundingBox = arguments[n254 + 1];
              break;
          case 'on-collision':
              onCollision = arguments[n254 + 1];
              break;
          case 'r':
              r = arguments[n254 + 1];
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
      var _js257 = arguments.length;
      for (var n256 = 0; n256 < _js257; n256 += 2) {
          switch (arguments[n256]) {
          case 'parent':
              parent = arguments[n256 + 1];
              break;
          case 'children':
              children = arguments[n256 + 1];
              break;
          case 'registerp':
              registerp = arguments[n256 + 1];
              break;
          case 'kind':
              kind = arguments[n256 + 1];
              break;
          case 'offset':
              offset = arguments[n256 + 1];
              break;
          case 'target-tags':
              targetTags = arguments[n256 + 1];
              break;
          case 'bounding-box':
              boundingBox = arguments[n256 + 1];
              break;
          case 'on-collision':
              onCollision = arguments[n256 + 1];
              break;
          case 'pnt-list':
              pntList = arguments[n256 + 1];
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
      var _js259 = arguments.length;
      for (var n258 = 0; n258 < _js259; n258 += 2) {
          switch (arguments[n258]) {
          case 'x':
              x = arguments[n258 + 1];
              break;
          case 'y':
              y = arguments[n258 + 1];
              break;
          case 'width':
              width = arguments[n258 + 1];
              break;
          case 'height':
              height = arguments[n258 + 1];
          };
      };
      var x = 'undefined' === typeof x ? 0 : x;
      var y = 'undefined' === typeof y ? 0 : y;
      var width = 'undefined' === typeof width ? 0 : width;
      var height = 'undefined' === typeof height ? 0 : height;
      var rest = Array.prototype.slice.call(arguments, 0);
      for (var key = null, _js_arrvar261 = ['x', 'y', 'width', 'height'], _js_idx260 = 0; _js_idx260 < _js_arrvar261.length; _js_idx260 += 1) {
          key = _js_arrvar261[_js_idx260];
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
      for (var vec = null, _js_idx262 = 0; _js_idx262 < vecList.length; _js_idx262 += 1) {
          vec = vecList[_js_idx262];
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
      var object263 = physic.boundingBox;
      var globalPoint = clonePoint2d(physic.offset);
      transformfPoint(globalPoint, globalCoordinate);
      var gKeyform264 = physic;
      if ((gKeyform264 instanceof (typeof physicCircle === 'string' ? eval(physicCircle) : physicCircle))) {
          object263.left = globalPoint.x - physic.r;
          object263.right = globalPoint.x + physic.r;
          object263.bottom = globalPoint.y - physic.r;
          object263.top = globalPoint.y + physic.r;
      } else if ((gKeyform264 instanceof (typeof physicPolygon === 'string' ? eval(physicPolygon) : physicPolygon))) {
          var bufferPnt = makePoint2d();
          var initializedP = null;
          for (var pnt = null, _js_arrvar266 = physic.pntList, _js_idx265 = 0; _js_idx265 < _js_arrvar266.length; _js_idx265 += 1) {
              pnt = _js_arrvar266[_js_idx265];
              copyPoint2dTo(bufferPnt, pnt);
              transformfPoint(bufferPnt, globalPoint);
              if (!initializedP || bufferPnt.x < object263.left) {
                  object263.left = bufferPnt.x;
              };
              if (!initializedP || bufferPnt.x > object263.right) {
                  object263.right = bufferPnt.x;
              };
              if (!initializedP || bufferPnt.y < object263.bottom) {
                  object263.bottom = bufferPnt.y;
              };
              if (!initializedP || bufferPnt.y > object263.top) {
                  object263.top = bufferPnt.y;
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
      var ph2 = (found267 = getEcsComponent(physic2d, entity2), found267 ? found267 : (function () {
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
      for (var tag = null, _js_arrvar269 = ph1.targetTags, _js_idx268 = 0; _js_idx268 < _js_arrvar269.length; _js_idx268 += 1) {
          tag = _js_arrvar269[_js_idx268];
          if (hasEntityTag(entity2, tag)) {
              __PS_MV_REG = [];
              return true;
          };
      };
      for (var tag = null, _js_arrvar271 = ph2.targetTags, _js_idx270 = 0; _js_idx270 < _js_arrvar271.length; _js_idx270 += 1) {
          tag = _js_arrvar271[_js_idx270];
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
      var _js273 = arguments.length;
      for (var n272 = 0; n272 < _js273; n272 += 2) {
          switch (arguments[n272]) {
          case 'parent':
              parent = arguments[n272 + 1];
              break;
          case 'children':
              children = arguments[n272 + 1];
              break;
          case 'registerp':
              registerp = arguments[n272 + 1];
              break;
          case 'on-click-down':
              onClickDown = arguments[n272 + 1];
              break;
          case 'on-click-up':
              onClickUp = arguments[n272 + 1];
              break;
          case 'on-mouse-enter':
              onMouseEnter = arguments[n272 + 1];
              break;
          case 'on-mouse-leave':
              onMouseLeave = arguments[n272 + 1];
              break;
          case 'on-mouse-hover':
              onMouseHover = arguments[n272 + 1];
              break;
          case 'on-mouse-not-hover':
              onMouseNotHover = arguments[n272 + 1];
              break;
          case 'mouse-hover-p':
              mouseHoverP = arguments[n272 + 1];
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
          var physic2d274 = (found = getEcsComponent(physic2d, entity), found ? found : (function () {
              throw 'PHYSIC-2D is not included in the entity';
          })());
          var uiComponent275 = (found276 = getEcsComponent(uiComponent, entity), found276 ? found276 : (function () {
              throw 'UI-COMPONENT is not included in the entity';
          })());
          var mousePnt = makePoint2d('x', getMouseX(), 'y', getMouseY());
          var mousePhysic = makePhysicCircle('r', 0);
          var collideP = collidePhysicsP(physic2d274, calcGlobalPoint(entity), mousePhysic, mousePnt);
          if (collideP) {
              if (uiComponent275.onMouseHover) {
                  uiComponent275.onMouseHover();
              };
              if (uiComponent275.onMouseEnter && !uiComponent275.mouseHoverP) {
                  uiComponent275.onMouseEnter();
              };
              uiComponent275.mouseHoverP = true;
          } else {
              if (uiComponent275.onMouseNotHover) {
                  uiComponent275.onMouseNotHover();
              };
              if (uiComponent275.onMouseLeave && uiComponent275.mouseHoverP) {
                  uiComponent275.onMouseLeave();
              };
              uiComponent275.mouseHoverP = null;
          };
          switch (getLeftMouseState()) {
          case 'down-now':
              if (collideP) {
                  CURRENTTARGET = entity;
                  __PS_MV_REG = [];
                  return uiComponent275.onClickDown ? uiComponent275.onClickDown() : null;
              } else {
                  __PS_MV_REG = [];
                  return null;
              };
          case 'up-now':
              if (collideP && CURRENTTARGET === entity && findTheEntity(entity)) {
                  __PS_MV_REG = [];
                  return uiComponent275.onClickUp ? uiComponent275.onClickUp() : null;
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
      var _js278 = arguments.length;
      for (var n277 = 0; n277 < _js278; n277 += 2) {
          switch (arguments[n277]) {
          case 'enable':
              enable = arguments[n277 + 1];
              break;
          case 'target-entities':
              targetEntities = arguments[n277 + 1];
              break;
          case 'target-component-types':
              targetComponentTypes = arguments[n277 + 1];
              break;
          case 'process':
              process = arguments[n277 + 1];
              break;
          case 'process-all':
              processAll = arguments[n277 + 1];
              break;
          case 'add-entity-hook':
              addEntityHook = arguments[n277 + 1];
              break;
          case 'delete-entity-hook':
              deleteEntityHook = arguments[n277 + 1];
          };
      };
      var enable = 'undefined' === typeof enable ? true : enable;
      var targetEntities = 'undefined' === typeof targetEntities ? [] : targetEntities;
      var targetComponentTypes = 'undefined' === typeof targetComponentTypes ? [point2d, uiComponent, physic2d] : targetComponentTypes;
      var process = 'undefined' === typeof process ? function (entity) {
          var physic2d279 = (found = getEcsComponent(physic2d, entity), found ? found : (function () {
              throw 'PHYSIC-2D is not included in the entity';
          })());
          var uiComponent280 = (found281 = getEcsComponent(uiComponent, entity), found281 ? found281 : (function () {
              throw 'UI-COMPONENT is not included in the entity';
          })());
          var mousePnt = makePoint2d('x', getMouseX(), 'y', getMouseY());
          var mousePhysic = makePhysicCircle('r', 0);
          var collideP = collidePhysicsP(physic2d279, calcGlobalPoint(entity), mousePhysic, mousePnt);
          if (collideP) {
              if (uiComponent280.onMouseHover) {
                  uiComponent280.onMouseHover();
              };
              if (uiComponent280.onMouseEnter && !uiComponent280.mouseHoverP) {
                  uiComponent280.onMouseEnter();
              };
              uiComponent280.mouseHoverP = true;
          } else {
              if (uiComponent280.onMouseNotHover) {
                  uiComponent280.onMouseNotHover();
              };
              if (uiComponent280.onMouseLeave && uiComponent280.mouseHoverP) {
                  uiComponent280.onMouseLeave();
              };
              uiComponent280.mouseHoverP = null;
          };
          switch (getLeftMouseState()) {
          case 'down-now':
              if (collideP) {
                  CURRENTTARGET = entity;
                  __PS_MV_REG = [];
                  return uiComponent280.onClickDown ? uiComponent280.onClickDown() : null;
              } else {
                  __PS_MV_REG = [];
                  return null;
              };
          case 'up-now':
              if (collideP && CURRENTTARGET === entity && findTheEntity(entity)) {
                  __PS_MV_REG = [];
                  return uiComponent280.onClickUp ? uiComponent280.onClickUp() : null;
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
      var _js283 = arguments.length;
      for (var n282 = 0; n282 < _js283; n282 += 2) {
          switch (arguments[n282]) {
          case 'parent':
              parent = arguments[n282 + 1];
              break;
          case 'children':
              children = arguments[n282 + 1];
              break;
          case 'registerp':
              registerp = arguments[n282 + 1];
              break;
          case 'model':
              model = arguments[n282 + 1];
              break;
          case 'depth':
              depth = arguments[n282 + 1];
              break;
          case 'offset':
              offset = arguments[n282 + 1];
              break;
          case 'state':
              state = arguments[n282 + 1];
              break;
          case 'label':
              label = arguments[n282 + 1];
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
          var point2d284 = (found = getEcsComponent(point2d, entity), found ? found : (function () {
              throw 'POINT-2D is not included in the entity';
          })());
          for (var modelc = null, _js_arrvar286 = entity.components, _js_idx285 = 0; _js_idx285 < _js_arrvar286.length; _js_idx285 += 1) {
              modelc = _js_arrvar286[_js_idx285];
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
      var _js288 = arguments.length;
      for (var n287 = 0; n287 < _js288; n287 += 2) {
          switch (arguments[n287]) {
          case 'enable':
              enable = arguments[n287 + 1];
              break;
          case 'target-entities':
              targetEntities = arguments[n287 + 1];
              break;
          case 'target-component-types':
              targetComponentTypes = arguments[n287 + 1];
              break;
          case 'process':
              process = arguments[n287 + 1];
              break;
          case 'process-all':
              processAll = arguments[n287 + 1];
              break;
          case 'add-entity-hook':
              addEntityHook = arguments[n287 + 1];
              break;
          case 'delete-entity-hook':
              deleteEntityHook = arguments[n287 + 1];
          };
      };
      var enable = 'undefined' === typeof enable ? true : enable;
      var targetEntities = 'undefined' === typeof targetEntities ? [] : targetEntities;
      var targetComponentTypes = 'undefined' === typeof targetComponentTypes ? [point2d, model2d] : targetComponentTypes;
      var process = 'undefined' === typeof process ? function (entity) {
          var point2d289 = (found = getEcsComponent(point2d, entity), found ? found : (function () {
              throw 'POINT-2D is not included in the entity';
          })());
          for (var modelc = null, _js_arrvar291 = entity.components, _js_idx290 = 0; _js_idx290 < _js_arrvar291.length; _js_idx290 += 1) {
              modelc = _js_arrvar291[_js_idx290];
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
      var _js293 = arguments.length;
      for (var n292 = 2; n292 < _js293; n292 += 2) {
          switch (arguments[n292]) {
          case 'target-model-2d':
              targetModel2d = arguments[n292 + 1];
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
          for (var modelc = null, _js_arrvar297 = entity.components, _js_idx296 = 0; _js_idx296 < _js_arrvar297.length; _js_idx296 += 1) {
              modelc = _js_arrvar297[_js_idx296];
              if ((modelc instanceof (typeof model2d === 'string' ? eval(model2d) : model2d))) {
                  enable(modelc);
              };
          };
      };
  };
  function enableModel2d(entity) {
      var _js299 = arguments.length;
      for (var n298 = 1; n298 < _js299; n298 += 2) {
          switch (arguments[n298]) {
          case 'target-model-2d':
              targetModel2d = arguments[n298 + 1];
          };
      };
      var targetModel2d;
      __PS_MV_REG = [];
      return enableModel2dIfState(entity, 'disable', 'target-model-2d', targetModel2d);
  };
  function enableInvalidatedModel2d(entity) {
      var _js301 = arguments.length;
      for (var n300 = 1; n300 < _js301; n300 += 2) {
          switch (arguments[n300]) {
          case 'target-model-2d':
              targetModel2d = arguments[n300 + 1];
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
      for (var model = null, _js_arrvar303 = entity.components, _js_idx302 = 0; _js_idx302 < _js_arrvar303.length; _js_idx302 += 1) {
          model = _js_arrvar303[_js_idx302];
          if ((model instanceof (typeof model2d === 'string' ? eval(model2d) : model2d))) {
              invalidateModel2d(model);
          };
      };
  };
  function disableModel2d(entity) {
      var _js305 = arguments.length;
      for (var n304 = 1; n304 < _js305; n304 += 2) {
          switch (arguments[n304]) {
          case 'target-model-2d':
              targetModel2d = arguments[n304 + 1];
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
          for (var modelc = null, _js_arrvar309 = entity.components, _js_idx308 = 0; _js_idx308 < _js_arrvar309.length; _js_idx308 += 1) {
              modelc = _js_arrvar309[_js_idx308];
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
      for (var model = null, _js_arrvar311 = entity.components, _js_idx310 = 0; _js_idx310 < _js_arrvar311.length; _js_idx310 += 1) {
          model = _js_arrvar311[_js_idx310];
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
      var _js313 = arguments.length;
      for (var n312 = 0; n312 < _js313; n312 += 2) {
          switch (arguments[n312]) {
          case 'parent':
              parent = arguments[n312 + 1];
              break;
          case 'children':
              children = arguments[n312 + 1];
              break;
          case 'registerp':
              registerp = arguments[n312 + 1];
              break;
          case 'font-size':
              fontSize = arguments[n312 + 1];
              break;
          case 'text-align':
              textAlign = arguments[n312 + 1];
              break;
          case 'margin':
              margin = arguments[n312 + 1];
              break;
          case 'text-model-list':
              textModelList = arguments[n312 + 1];
              break;
          case 'depth':
              depth = arguments[n312 + 1];
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
      var _js315 = arguments.length;
      for (var n314 = 0; n314 < _js315; n314 += 2) {
          switch (arguments[n314]) {
          case 'font-size':
              fontSize = arguments[n314 + 1];
              break;
          case 'text-align':
              textAlign = arguments[n314 + 1];
              break;
          case 'margin':
              margin = arguments[n314 + 1];
              break;
          case 'x':
              x = arguments[n314 + 1];
              break;
          case 'y':
              y = arguments[n314 + 1];
              break;
          case 'angle':
              angle = arguments[n314 + 1];
              break;
          case 'depth':
              depth = arguments[n314 + 1];
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
          for (var x317 = null, _js_idx318 = 0; _js_idx318 < textAlignList.length; _js_idx318 += 1) {
              x317 = textAlignList[_js_idx318];
              if ((function (target316) {
                  return textAlign === target316;
              })(x317)) {
                  return x317;
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
      for (var model = null, _js_idx319 = 0; _js_idx319 < area.textModelList.length; _js_idx319 += 1) {
          model = area.textModelList[_js_idx319];
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
      var _js321 = arguments.length;
      for (var n320 = 1; n320 < _js321; n320 += 2) {
          switch (arguments[n320]) {
          case 'text':
              text = arguments[n320 + 1];
              break;
          case 'color':
              color = arguments[n320 + 1];
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
      for (var model = null, _js_idx322 = 0; _js_idx322 < area.textModelList.length; _js_idx322 += 1) {
          model = area.textModelList[_js_idx322];
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
      var gKeyform323 = physic2d;
      if ((gKeyform323 instanceof (typeof physicCircle === 'string' ? eval(physicCircle) : physicCircle))) {
          __PS_MV_REG = [];
          return makeAModel(function (color) {
              __PS_MV_REG = [];
              return makeWiredCircle('color', color, 'r', physic2d.r);
          });
      } else if ((gKeyform323 instanceof (typeof physicPolygon === 'string' ? eval(physicPolygon) : physicPolygon))) {
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
          var physic2d324 = (found = getEcsComponent(physic2d, entity), found ? found : (function () {
              throw 'PHYSIC-2D is not included in the entity';
          })());
          __PS_MV_REG = [];
          return !findColliderModel(physic2d324) ? addEcsComponent(generateColliderModel(physic2d324), entity, physic2d324) : null;
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
          for (var entity = null, _js_arrvar326 = clPsEcs_ecs._internal.getEntityList(), _js_idx325 = 0; _js_idx325 < _js_arrvar326.length; _js_idx325 += 1) {
              entity = _js_arrvar326[_js_idx325];
              for (var physic = null, _js_arrvar328 = entity.components, _js_idx327 = 0; _js_idx327 < _js_arrvar328.length; _js_idx327 += 1) {
                  physic = _js_arrvar328[_js_idx327];
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
      var _js328 = arguments.length;
      for (var n327 = 0; n327 < _js328; n327 += 2) {
          switch (arguments[n327]) {
          case 'entity':
              entity = arguments[n327 + 1];
              break;
          case 'global-point':
              globalPoint = arguments[n327 + 1];
              break;
          case 'physic':
              physic = arguments[n327 + 1];
              break;
          case 'target-entity-list':
              targetEntityList = arguments[n327 + 1];
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
      var _js330 = arguments.length;
      for (var n329 = 0; n329 < _js330; n329 += 2) {
          switch (arguments[n329]) {
          case 'cache':
              cache = arguments[n329 + 1];
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
      for (var x331 = null, _js_arrvar333 = cache.cache, _js_idx332 = 0; _js_idx332 < _js_arrvar333.length; _js_idx332 += 1) {
          x331 = _js_arrvar333[_js_idx332];
          if ((function (pair) {
              __PS_MV_REG = [];
              return sameTagListP(tagList, pair[0]);
          })(x331)) {
              return x331;
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
      for (var info = null, _js_idx334 = 0; _js_idx334 < allEntityInfo.length; _js_idx334 += 1) {
          info = allEntityInfo[_js_idx334];
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
          var prevNode872 = clWeb2dGame_utils_debug_performance._internal.PERFORMANCETIMER.currentNode;
          try {
              var before873 = performance.now();
              var element874 = clWeb2dGame_utils_debug_performance._internal.pickPerformanceTimerElement('collision', 0);
              var infoList = [];
              for (var entity = null, _js_idx335 = 0; _js_idx335 < system.targetEntities.length; _js_idx335 += 1) {
                  entity = system.targetEntities[_js_idx335];
                  var physic = getEcsComponent(physic2d, entity);
                  var globalPoint = calcGlobalPoint(entity);
                  updateBoundingBox(physic, globalPoint);
                  infoList.unshift(makeCollisionEntityInfo('entity', entity, 'global-point', globalPoint, 'physic', physic));
                  infoList;
              };
              initTargetListOfInfoList(infoList);
              var length336 = infoList.length;
              var _js337 = length336 - 1;
              for (var outerIdx = 0; outerIdx < _js337; outerIdx += 1) {
                  var object338 = infoList[outerIdx];
                  for (var info2 = null, _js_idx339 = 0; _js_idx339 < object338.targetEntityList.length; _js_idx339 += 1) {
                      info2 = object338.targetEntityList[_js_idx339];
                      processCollision(object338.entity, object338.physic, object338.globalPoint, info2.entity, info2.physic, info2.globalPoint);
                  };
              };
              __PS_MV_REG = [];
              return clWeb2dGame_utils_debug_performance._internal.pushToRingBuffer(performance.now() - before873, element874.results);
          } finally {
              clWeb2dGame_utils_debug_performance._internal.PERFORMANCETIMER.currentNode = prevNode872;
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
      var _js339 = arguments.length;
      for (var n338 = 0; n338 < _js339; n338 += 2) {
          switch (arguments[n338]) {
          case 'enable':
              enable = arguments[n338 + 1];
              break;
          case 'target-entities':
              targetEntities = arguments[n338 + 1];
              break;
          case 'target-component-types':
              targetComponentTypes = arguments[n338 + 1];
              break;
          case 'process':
              process = arguments[n338 + 1];
              break;
          case 'process-all':
              processAll = arguments[n338 + 1];
              break;
          case 'add-entity-hook':
              addEntityHook = arguments[n338 + 1];
              break;
          case 'delete-entity-hook':
              deleteEntityHook = arguments[n338 + 1];
          };
      };
      var enable = 'undefined' === typeof enable ? true : enable;
      var targetEntities = 'undefined' === typeof targetEntities ? [] : targetEntities;
      var targetComponentTypes = 'undefined' === typeof targetComponentTypes ? [point2d, physic2d] : targetComponentTypes;
      var process = 'undefined' === typeof process ? function (entity) {
          return entity;
      } : process;
      var processAll = 'undefined' === typeof processAll ? function (system) {
          var prevNode875 = clWeb2dGame_utils_debug_performance._internal.PERFORMANCETIMER.currentNode;
          try {
              var before876 = performance.now();
              var element877 = clWeb2dGame_utils_debug_performance._internal.pickPerformanceTimerElement('collision', 0);
              var infoList = [];
              for (var entity = null, _js_idx340 = 0; _js_idx340 < system.targetEntities.length; _js_idx340 += 1) {
                  entity = system.targetEntities[_js_idx340];
                  var physic = getEcsComponent(physic2d, entity);
                  var globalPoint = calcGlobalPoint(entity);
                  updateBoundingBox(physic, globalPoint);
                  infoList.unshift(makeCollisionEntityInfo('entity', entity, 'global-point', globalPoint, 'physic', physic));
                  infoList;
              };
              initTargetListOfInfoList(infoList);
              var length341 = infoList.length;
              var _js342 = length341 - 1;
              for (var outerIdx = 0; outerIdx < _js342; outerIdx += 1) {
                  var object343 = infoList[outerIdx];
                  for (var info2 = null, _js_idx344 = 0; _js_idx344 < object343.targetEntityList.length; _js_idx344 += 1) {
                      info2 = object343.targetEntityList[_js_idx344];
                      processCollision(object343.entity, object343.physic, object343.globalPoint, info2.entity, info2.physic, info2.globalPoint);
                  };
              };
              __PS_MV_REG = [];
              return clWeb2dGame_utils_debug_performance._internal.pushToRingBuffer(performance.now() - before876, element877.results);
          } finally {
              clWeb2dGame_utils_debug_performance._internal.PERFORMANCETIMER.currentNode = prevNode875;
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
      var _js344 = arguments.length;
      for (var n343 = 0; n343 < _js344; n343 += 2) {
          switch (arguments[n343]) {
          case 'parent':
              parent = arguments[n343 + 1];
              break;
          case 'children':
              children = arguments[n343 + 1];
              break;
          case 'registerp':
              registerp = arguments[n343 + 1];
              break;
          case 'interval':
              interval = arguments[n343 + 1];
              break;
          case 'horiz-count':
              horizCount = arguments[n343 + 1];
              break;
          case 'vert-count':
              vertCount = arguments[n343 + 1];
              break;
          case 'model':
              model = arguments[n343 + 1];
              break;
          case 'texture':
              texture = arguments[n343 + 1];
              break;
          case 'animation-end-callback':
              animationEndCallback = arguments[n343 + 1];
              break;
          case 'goes-to-forward':
              goesToForward = arguments[n343 + 1];
              break;
          case 'runs-animation':
              runsAnimation = arguments[n343 + 1];
              break;
          case 'interval-counter':
              intervalCounter = arguments[n343 + 1];
              break;
          case 'image-counter':
              imageCounter = arguments[n343 + 1];
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
      var _js346 = arguments.length;
      for (var n345 = 0; n345 < _js346; n345 += 2) {
          switch (arguments[n345]) {
          case 'interval':
              interval = arguments[n345 + 1];
              break;
          case 'horiz-count':
              horizCount = arguments[n345 + 1];
              break;
          case 'vert-count':
              vertCount = arguments[n345 + 1];
              break;
          case 'model':
              model = arguments[n345 + 1];
              break;
          case 'texture':
              texture = arguments[n345 + 1];
              break;
          case 'animation-end-callback':
              animationEndCallback = arguments[n345 + 1];
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
      var _js348 = arguments.length;
      for (var n347 = 1; n347 < _js348; n347 += 2) {
          switch (arguments[n347]) {
          case 'stop-p':
              stopP = arguments[n347 + 1];
              break;
          case 'forward-p':
              forwardP = arguments[n347 + 1];
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
      var xCount = (n349 = anime.vertCount, (nextCounter % n349 + n349) % n349);
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
      var _js351 = arguments.length;
      for (var n350 = 0; n350 < _js351; n350 += 2) {
          switch (arguments[n350]) {
          case 'entity':
              entity = arguments[n350 + 1];
              break;
          case 'animation-table':
              animationTable = arguments[n350 + 1];
              break;
          case 'current':
              current = arguments[n350 + 1];
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
      var _js353 = arguments.length;
      for (var n352 = 2; n352 < _js353; n352 += 2) {
          switch (arguments[n352]) {
          case 'forward-p':
              forwardP = arguments[n352 + 1];
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
          for (var script = null, _js_arrvar355 = entity.components, _js_idx354 = 0; _js_idx354 < _js_arrvar355.length; _js_idx354 += 1) {
              script = _js_arrvar355[_js_idx354];
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
      var _js357 = arguments.length;
      for (var n356 = 0; n356 < _js357; n356 += 2) {
          switch (arguments[n356]) {
          case 'enable':
              enable = arguments[n356 + 1];
              break;
          case 'target-entities':
              targetEntities = arguments[n356 + 1];
              break;
          case 'target-component-types':
              targetComponentTypes = arguments[n356 + 1];
              break;
          case 'process':
              process = arguments[n356 + 1];
              break;
          case 'process-all':
              processAll = arguments[n356 + 1];
              break;
          case 'add-entity-hook':
              addEntityHook = arguments[n356 + 1];
              break;
          case 'delete-entity-hook':
              deleteEntityHook = arguments[n356 + 1];
          };
      };
      var enable = 'undefined' === typeof enable ? true : enable;
      var targetEntities = 'undefined' === typeof targetEntities ? [] : targetEntities;
      var targetComponentTypes = 'undefined' === typeof targetComponentTypes ? [script2d] : targetComponentTypes;
      var process = 'undefined' === typeof process ? function (entity) {
          for (var script = null, _js_arrvar359 = entity.components, _js_idx358 = 0; _js_idx358 < _js_arrvar359.length; _js_idx358 += 1) {
              script = _js_arrvar359[_js_idx358];
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
          for (var anime = null, _js_arrvar361 = entity.components, _js_idx360 = 0; _js_idx360 < _js_arrvar361.length; _js_idx360 += 1) {
              anime = _js_arrvar361[_js_idx360];
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
      var _js363 = arguments.length;
      for (var n362 = 0; n362 < _js363; n362 += 2) {
          switch (arguments[n362]) {
          case 'enable':
              enable = arguments[n362 + 1];
              break;
          case 'target-entities':
              targetEntities = arguments[n362 + 1];
              break;
          case 'target-component-types':
              targetComponentTypes = arguments[n362 + 1];
              break;
          case 'process':
              process = arguments[n362 + 1];
              break;
          case 'process-all':
              processAll = arguments[n362 + 1];
              break;
          case 'add-entity-hook':
              addEntityHook = arguments[n362 + 1];
              break;
          case 'delete-entity-hook':
              deleteEntityHook = arguments[n362 + 1];
          };
      };
      var enable = 'undefined' === typeof enable ? true : enable;
      var targetEntities = 'undefined' === typeof targetEntities ? [] : targetEntities;
      var targetComponentTypes = 'undefined' === typeof targetComponentTypes ? [animation2d] : targetComponentTypes;
      var process = 'undefined' === typeof process ? function (entity) {
          for (var anime = null, _js_arrvar365 = entity.components, _js_idx364 = 0; _js_idx364 < _js_arrvar365.length; _js_idx364 += 1) {
              anime = _js_arrvar365[_js_idx364];
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
          var point2d366 = (found = getEcsComponent(point2d, entity), found ? found : (function () {
              throw 'POINT-2D is not included in the entity';
          })());
          var speed2d367 = (found368 = getEcsComponent(speed2d, entity), found368 ? found368 : (function () {
              throw 'SPEED-2D is not included in the entity';
          })());
          __PS_MV_REG = [];
          return incfVector2d(point2d366, speed2d367);
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
      var _js370 = arguments.length;
      for (var n369 = 0; n369 < _js370; n369 += 2) {
          switch (arguments[n369]) {
          case 'enable':
              enable = arguments[n369 + 1];
              break;
          case 'target-entities':
              targetEntities = arguments[n369 + 1];
              break;
          case 'target-component-types':
              targetComponentTypes = arguments[n369 + 1];
              break;
          case 'process':
              process = arguments[n369 + 1];
              break;
          case 'process-all':
              processAll = arguments[n369 + 1];
              break;
          case 'add-entity-hook':
              addEntityHook = arguments[n369 + 1];
              break;
          case 'delete-entity-hook':
              deleteEntityHook = arguments[n369 + 1];
          };
      };
      var enable = 'undefined' === typeof enable ? true : enable;
      var targetEntities = 'undefined' === typeof targetEntities ? [] : targetEntities;
      var targetComponentTypes = 'undefined' === typeof targetComponentTypes ? [point2d, speed2d] : targetComponentTypes;
      var process = 'undefined' === typeof process ? function (entity) {
          var point2d371 = (found = getEcsComponent(point2d, entity), found ? found : (function () {
              throw 'POINT-2D is not included in the entity';
          })());
          var speed2d372 = (found373 = getEcsComponent(speed2d, entity), found373 ? found373 : (function () {
              throw 'SPEED-2D is not included in the entity';
          })());
          __PS_MV_REG = [];
          return incfVector2d(point2d371, speed2d372);
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
      var object374 = stats.domElement.style;
      object374.position = 'absolute';
      object374.left = '0px';
      object374.top = '0px';
      document.getElementById('stats-output').appendChild(stats.domElement);
      __PS_MV_REG = [];
      return stats;
  };
  function updateStats() {
      __PS_MV_REG = [];
      return STATS ? STATS.update() : null;
  };
  function initDefaultSystems() {
      var _js376 = arguments.length;
      for (var n375 = 0; n375 < _js376; n375 += 2) {
          switch (arguments[n375]) {
          case 'scene':
              scene = arguments[n375 + 1];
              break;
          case 'script-system':
              scriptSystem = arguments[n375 + 1];
              break;
          case 'draw-system':
              drawSystem = arguments[n375 + 1];
              break;
          case 'animation-system':
              animationSystem = arguments[n375 + 1];
              break;
          case 'collision-system':
              collisionSystem = arguments[n375 + 1];
              break;
          case 'simple-move-system':
              simpleMoveSystem = arguments[n375 + 1];
              break;
          case 'ui-system':
              uiSystem = arguments[n375 + 1];
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
      var _js378 = arguments.length;
      for (var n377 = 0; n377 < _js378; n377 += 2) {
          switch (arguments[n377]) {
          case 'screen-width':
              screenWidth = arguments[n377 + 1];
              break;
          case 'screen-height':
              screenHeight = arguments[n377 + 1];
              break;
          case 'camera':
              camera = arguments[n377 + 1];
              break;
          case 'rendered-dom':
              renderedDom = arguments[n377 + 1];
              break;
          case 'stats-dom':
              statsDom = arguments[n377 + 1];
              break;
          case 'monitoring-log-dom':
              monitoringLogDom = arguments[n377 + 1];
              break;
          case 'event-log-dom':
              eventLogDom = arguments[n377 + 1];
              break;
          case 'resize-to-screen-p':
              resizeToScreenP = arguments[n377 + 1];
              break;
          case 'init-function':
              initFunction = arguments[n377 + 1];
              break;
          case 'update-function':
              updateFunction = arguments[n377 + 1];
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
          var prevNode878 = clWeb2dGame_utils_debug_performance._internal.PERFORMANCETIMER.currentNode;
          try {
              var before879 = performance.now();
              var element880 = clWeb2dGame_utils_debug_performance._internal.pickPerformanceTimerElement('loop-top', 0);
              var prevNode881 = clWeb2dGame_utils_debug_performance._internal.PERFORMANCETIMER.currentNode;
              try {
                  var before882 = performance.now();
                  var element883 = clWeb2dGame_utils_debug_performance._internal.pickPerformanceTimerElement('render', 0);
                  var scope = WTF.trace.enterScope('render');
                  renderer.render(scene, camera);
                  WTF.trace.leaveScope(scope, 'render');
                  clWeb2dGame_utils_debug_performance._internal.pushToRingBuffer(performance.now() - before882, element883.results);
              } finally {
                  clWeb2dGame_utils_debug_performance._internal.PERFORMANCETIMER.currentNode = prevNode881;
              };
              updateStats();
              var prevNode884 = clWeb2dGame_utils_debug_performance._internal.PERFORMANCETIMER.currentNode;
              try {
                  var before885 = performance.now();
                  var element886 = clWeb2dGame_utils_debug_performance._internal.pickPerformanceTimerElement('update', 0);
                  var scope379 = WTF.trace.enterScope('update');
                  clearMonitoringLog();
                  processInput();
                  ecsMain();
                  updateFunction();
                  WTF.trace.leaveScope(scope379, 'update');
                  clWeb2dGame_utils_debug_performance._internal.pushToRingBuffer(performance.now() - before885, element886.results);
              } finally {
                  clWeb2dGame_utils_debug_performance._internal.PERFORMANCETIMER.currentNode = prevNode884;
              };
              clWeb2dGame_utils_debug_performance._internal.pushToRingBuffer(performance.now() - before879, element880.results);
          } finally {
              clWeb2dGame_utils_debug_performance._internal.PERFORMANCETIMER.currentNode = prevNode878;
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
      var _js381 = arguments.length;
      for (var n380 = 0; n380 < _js381; n380 += 2) {
          switch (arguments[n380]) {
          case 'model':
              model = arguments[n380 + 1];
              break;
          case 'point':
              point = arguments[n380 + 1];
              break;
          case 'tag-list':
              tagList = arguments[n380 + 1];
              break;
          case 'parent':
              parent = arguments[n380 + 1];
              break;
          case 'fn-delete-condition':
              fnDeleteCondition = arguments[n380 + 1];
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
      for (var tag = null, _js_idx382 = 0; _js_idx382 < tagList.length; _js_idx382 += 1) {
          tag = tagList[_js_idx382];
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
      var _js384 = arguments.length;
      for (var n383 = 0; n383 < _js384; n383 += 2) {
          switch (arguments[n383]) {
          case 'point':
              point = arguments[n383 + 1];
              break;
          case 'tag-list':
              tagList = arguments[n383 + 1];
              break;
          case 'parent':
              parent = arguments[n383 + 1];
              break;
          case 'r':
              r = arguments[n383 + 1];
              break;
          case 'fn-delete-condition':
              fnDeleteCondition = arguments[n383 + 1];
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
      var _js386 = arguments.length;
      for (var n385 = 0; n385 < _js386; n385 += 2) {
          switch (arguments[n385]) {
          case 'point':
              point = arguments[n385 + 1];
              break;
          case 'tag-list':
              tagList = arguments[n385 + 1];
              break;
          case 'parent':
              parent = arguments[n385 + 1];
              break;
          case 'r':
              r = arguments[n385 + 1];
              break;
          case 'time':
              time = arguments[n385 + 1];
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
      var _js388 = arguments.length;
      for (var n387 = 0; n387 < _js388; n387 += 2) {
          switch (arguments[n387]) {
          case 'point1':
              point1 = arguments[n387 + 1];
              break;
          case 'point2':
              point2 = arguments[n387 + 1];
              break;
          case 'tag-list':
              tagList = arguments[n387 + 1];
              break;
          case 'parent':
              parent = arguments[n387 + 1];
              break;
          case 'fn-delete-condition':
              fnDeleteCondition = arguments[n387 + 1];
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
      var _js390 = arguments.length;
      for (var n389 = 0; n389 < _js390; n389 += 2) {
          switch (arguments[n389]) {
          case 'point1':
              point1 = arguments[n389 + 1];
              break;
          case 'point2':
              point2 = arguments[n389 + 1];
              break;
          case 'tag-list':
              tagList = arguments[n389 + 1];
              break;
          case 'parent':
              parent = arguments[n389 + 1];
              break;
          case 'time':
              time = arguments[n389 + 1];
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

var clwTetris_src_game_basicOperation = (function() {
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
  function field() {
      this.parent = null;
      this.children = [];
      this.registerp = null;
      this.xCount = null;
      this.yCount = null;
      this.blockStateArray = null;
      return this;
  };
  function makeField() {
      var _js392 = arguments.length;
      for (var n391 = 0; n391 < _js392; n391 += 2) {
          switch (arguments[n391]) {
          case 'parent':
              parent = arguments[n391 + 1];
              break;
          case 'children':
              children = arguments[n391 + 1];
              break;
          case 'registerp':
              registerp = arguments[n391 + 1];
              break;
          case 'x-count':
              xCount = arguments[n391 + 1];
              break;
          case 'y-count':
              yCount = arguments[n391 + 1];
              break;
          case 'block-state-array':
              blockStateArray = arguments[n391 + 1];
          };
      };
      var parent;
      var children = 'undefined' === typeof children ? [] : children;
      var registerp;
      var xCount;
      var yCount;
      var blockStateArray;
      var result = new field();
      result.parent = parent;
      result.children = children;
      result.registerp = registerp;
      result.xCount = xCount;
      result.yCount = yCount;
      result.blockStateArray = blockStateArray;
      __PS_MV_REG = [];
      return result;
  };
  function fieldP(obj) {
      return (obj instanceof field);
  };
  (function () {
      var tempCtor = function () {
          return null;
      };
      tempCtor.prototype = ecsComponent.prototype;
      field.superClass_ = ecsComponent.prototype;
      field.prototype = new tempCtor();
      __PS_MV_REG = [];
      return field.prototype.constructor = field;
  })();
  function piece() {
      this.parent = null;
      this.children = [];
      this.registerp = null;
      this.staticShape = null;
      this.x = null;
      this.y = null;
      this.rotateCount = null;
      this.rotatable = null;
      return this;
  };
  function makePiece() {
      var _js394 = arguments.length;
      for (var n393 = 0; n393 < _js394; n393 += 2) {
          switch (arguments[n393]) {
          case 'parent':
              parent = arguments[n393 + 1];
              break;
          case 'children':
              children = arguments[n393 + 1];
              break;
          case 'registerp':
              registerp = arguments[n393 + 1];
              break;
          case 'static-shape':
              staticShape = arguments[n393 + 1];
              break;
          case 'x':
              x = arguments[n393 + 1];
              break;
          case 'y':
              y = arguments[n393 + 1];
              break;
          case 'rotate-count':
              rotateCount = arguments[n393 + 1];
              break;
          case 'rotatable':
              rotatable = arguments[n393 + 1];
          };
      };
      var parent;
      var children = 'undefined' === typeof children ? [] : children;
      var registerp;
      var staticShape;
      var x;
      var y;
      var rotateCount;
      var rotatable;
      var result = new piece();
      result.parent = parent;
      result.children = children;
      result.registerp = registerp;
      result.staticShape = staticShape;
      result.x = x;
      result.y = y;
      result.rotateCount = rotateCount;
      result.rotatable = rotatable;
      __PS_MV_REG = [];
      return result;
  };
  function pieceP(obj) {
      return (obj instanceof piece);
  };
  (function () {
      var tempCtor = function () {
          return null;
      };
      tempCtor.prototype = ecsComponent.prototype;
      piece.superClass_ = ecsComponent.prototype;
      piece.prototype = new tempCtor();
      __PS_MV_REG = [];
      return piece.prototype.constructor = piece;
  })();
  function copyPieceTo(dst, src) {
      dst.staticShape = src.staticShape;
      dst.x = src.x;
      dst.y = src.y;
      return dst.rotateCount = src.rotateCount;
  };
  function clonePiece(piece) {
      __PS_MV_REG = [];
      return makePiece('static-shape', piece.staticShape, 'x', piece.x, 'y', piece.y, 'rotate-count', piece.rotateCount);
  };
  function initTetrisField(xCount, yCount) {
      __PS_MV_REG = [];
      return makeField('x-count', xCount, 'y-count', yCount, 'block-state-array', (arr395 = new Array(xCount * yCount), ((elt397 = null, (function () {
          for (var i398 = 0; i398 < arr395.length; i398 += 1) {
              arr395[i398] = elt397;
          };
      })()), arr395)));
  };
  function checkInFieldP(field, x, y) {
      if (!(x >= 0 && x < field.xCount && y >= 0 && y < field.yCount)) {
          throw 'Message: ' + 'Failed assertion: ~A' + '; Args: ' + (x >= 0 && x < field.xCount && y >= 0 && y < field.yCount);
      };
  };
  function getBlockState(field, x, y) {
      checkInFieldP(field, x, y);
      __PS_MV_REG = [];
      return field.blockStateArray[x + y * field.xCount];
  };
  function setBlockState(field, x, y, state) {
      checkInFieldP(field, x, y);
      __PS_MV_REG = [];
      return field.blockStateArray[x + y * field.xCount] = state;
  };
  function deleteCompletedLines(field) {
      var completedIndexList = (function () {
          var _js399 = field.yCount;
          var collect400 = [];
          for (var y = 0; y < _js399; y += 1) {
              if ((function () {
                  var _js401 = field.xCount;
                  var collect402 = [];
                  for (var x = 0; x < _js401; x += 1) {
                      if (!getBlockState(field, x, y)) {
                          collect402.push(true);
                      };
                  };
                  __PS_MV_REG = [];
                  return collect402;
              })().length === 0) {
                  collect400.push(y);
              };
          };
          __PS_MV_REG = [];
          return collect400;
      })();
      var deleteCount = 0;
      for (var i = null, _js_idx401 = 0; _js_idx401 < completedIndexList.length; _js_idx401 += 1) {
          i = completedIndexList[_js_idx401];
          var _js402 = field.yCount - 1;
          for (var y = i - deleteCount; y < _js402; y += 1) {
              var _js403 = field.xCount;
              for (var x = 0; x < _js403; x += 1) {
                  setBlockState(field, x, y, getBlockState(field, x, y + 1));
              };
          };
          var _js403 = field.xCount;
          for (var x = 0; x < _js403; x += 1) {
              setBlockState(field, x, field.yCount - 1, null);
          };
          ++deleteCount;
      };
      __PS_MV_REG = [];
      return deleteCount;
  };
  function staticShapeParam() {
      this.pointList = null;
      this.rotatable = true;
      return this;
  };
  function makeStaticShapeParam() {
      var _js403 = arguments.length;
      for (var n402 = 0; n402 < _js403; n402 += 2) {
          switch (arguments[n402]) {
          case 'point-list':
              pointList = arguments[n402 + 1];
              break;
          case 'rotatable':
              rotatable = arguments[n402 + 1];
          };
      };
      var pointList;
      var rotatable = 'undefined' === typeof rotatable ? true : rotatable;
      var result = new staticShapeParam();
      result.pointList = pointList;
      result.rotatable = rotatable;
      __PS_MV_REG = [];
      return result;
  };
  function staticShapeParamP(obj) {
      return (obj instanceof staticShapeParam);
  };
  if ('undefined' === typeof STATICSHAPELIST) {
      var STATICSHAPELIST = [makeStaticShapeParam('point-list', [[-1, 0], [0, 0], [1, 0], [2, 0]]), makeStaticShapeParam('point-list', [[-1, 0], [0, 0], [0, 1], [1, 1]]), makeStaticShapeParam('point-list', [[-1, 1], [0, 1], [0, 0], [1, 0]]), makeStaticShapeParam('point-list', [[0, -1], [0, 0], [1, 0], [0, 1]]), makeStaticShapeParam('point-list', [[-2, 0], [-1, 0], [0, 0], [0, 1]]), makeStaticShapeParam('point-list', [[0, 1], [0, 0], [1, 0], [2, 0]]), makeStaticShapeParam('point-list', [[0, 0], [0, 1], [1, 0], [1, 1]], 'rotatable', null)];
  };
  function initPiece(field) {
      var upto404;
      var staticShape = STATICSHAPELIST[upto404 = STATICSHAPELIST.length, upto404 % 1 ? upto404 * Math.random() : Math.floor(upto404 * Math.random())];
      var rotatable405 = staticShape.rotatable;
      var piece = makePiece('x', field.xCount / 2, 'y', 0, 'static-shape', staticShape.pointList, 'rotatable', rotatable405, 'rotate-count', rotatable405 ? (4 % 1 ? 4 * Math.random() : Math.floor(4 * Math.random())) : 0);
      var globalShape = calcGlobalPieceShape(piece);
      var minY = globalShape[0][1];
      var _js406 = globalShape.length;
      for (var i = 1; i < _js406; i += 1) {
          var y = globalShape[i][1];
          if (y < minY) {
              minY = y;
          };
      };
      piece.y = field.yCount - minY - 1;
      __PS_MV_REG = [];
      return piece;
  };
  function rotateStaticShape(shape, rotateCount) {
      __PS_MV_REG = [];
      return shape.map(function (point) {
          var x = point[0];
          var y = point[1];
          switch ((rotateCount % 4 + 4) % 4) {
          case 0:
              return [x, y];
          case 1:
              return [y, -1 * x];
          case 2:
              return [-1 * x, -1 * y];
          case 3:
              return [-1 * y, x];
          default:
              throw 'Message: ' + 'Invalid rotate-count: ~D' + '; Args: ' + rotateCount;
          };
      });
  };
  function calcGlobalPieceShape(piece) {
      var result = rotateStaticShape(piece.staticShape, piece.rotateCount);
      for (var pnt = null, _js_idx407 = 0; _js_idx407 < result.length; _js_idx407 += 1) {
          pnt = result[_js_idx407];
          pnt[0] += piece.x;
          pnt[1] += piece.y;
      };
      __PS_MV_REG = [];
      return result;
  };
  function enableToMovePieceToP(field, piece, direction) {
      var shape = calcGlobalPieceShape(piece);
      for (var point = null, _js_idx408 = 0; _js_idx408 < shape.length; _js_idx408 += 1) {
          point = shape[_js_idx408];
          switch (direction) {
          case 'down':
              --point[1];
              break;
          case 'right':
              ++point[0];
              break;
          case 'left':
              --point[0];
              break;
          case 'there':
              break;
          default:
              throw 'Message: ' + 'The value ~A is not of the expected type (MEMBER ~A)' + '; Args: ' + direction + ', ' + ['down', 'right', 'left', 'there'];
          };
      };
      __PS_MV_REG = [];
      return shape.every(function (point) {
          var x = point[0];
          var y = point[1];
          __PS_MV_REG = [];
          return x >= 0 && x < field.xCount && y >= 0 && (y >= field.yCount || !getBlockState(field, x, y));
      });
  };
  /**
   * Move the piece to the direction if possible.
   * Return t if the piece was moved, otherwize nil
   */
  function movePieceTo(field, piece, direction) {
      if (enableToMovePieceToP(field, piece, direction)) {
          switch (direction) {
          case 'down':
              --piece.y;
              break;
          case 'right':
              ++piece.x;
              break;
          case 'left':
              --piece.x;
              break;
          case 'there':
              break;
          default:
              throw 'Message: ' + 'The value ~A is not of the expected type (MEMBER ~A)' + '; Args: ' + direction + ', ' + ['down', 'right', 'left', 'there'];
          };
          __PS_MV_REG = [];
          return true;
      };
  };
  function intersectPieceToFieldP(field, piece) {
      __PS_MV_REG = [];
      return calcGlobalPieceShape(piece).some(function (point) {
          var x = point[0];
          var y = point[1];
          __PS_MV_REG = [];
          return y < field.yCount ? getBlockState(field, x, y) : null;
      });
  };
  function rotatePiece(field, piece, addedRotateCount) {
      if (!piece.rotatable) {
          return true;
      };
      var clonedPiece = clonePiece(piece);
      clonedPiece.rotateCount = ((clonedPiece.rotateCount + addedRotateCount) % 4 + 4) % 4;
      var adjustX = function (newX, loopCount) {
          if (loopCount >= field.xCount) {
              throw 'Message: ' + 'Failed assertion: ~A' + '; Args: ' + (loopCount < field.xCount);
          };
          clonedPiece.x = newX;
          var shape = calcGlobalPieceShape(clonedPiece);
          if (shape.some(function (point) {
              return point[0] < 0;
          })) {
              adjustX(newX + 1, loopCount + 1);
          };
          __PS_MV_REG = [];
          return shape.some(function (point) {
              return point[0] >= field.xCount;
          }) ? adjustX(newX - 1, loopCount + 1) : null;
      };
      adjustX(clonedPiece.x, 0);
      if (!intersectPieceToFieldP(field, clonedPiece)) {
          piece.rotateCount = clonedPiece.rotateCount;
          piece.x = clonedPiece.x;
          __PS_MV_REG = [];
          return true;
      };
  };
  if ('undefined' === typeof AFTERDELETEDLINESHOOKS) {
      var AFTERDELETEDLINESHOOKS = [];
  };
  function addAfterDeletedLinesHook(callback) {
      if (!(function () {
          for (var x409 = null, _js_idx410 = 0; _js_idx410 < AFTERDELETEDLINESHOOKS.length; _js_idx410 += 1) {
              x409 = AFTERDELETEDLINESHOOKS[_js_idx410];
              if ((function (elem) {
                  return callback === elem;
              })(x409)) {
                  return x409;
              };
          };
      })()) {
          AFTERDELETEDLINESHOOKS.unshift(callback);
          AFTERDELETEDLINESHOOKS;
      };
      __PS_MV_REG = [];
      return AFTERDELETEDLINESHOOKS;
  };
  /**
   * Pin the piece to the field. After pinning, delete completed lines.
   * Return nil if game over situation.
   */
  function pinPieceToField(field, piece) {
      var pinBlockToField = function (field, x, y) {
          if (y < field.yCount) {
              if (getBlockState(field, x, y)) {
                  throw 'Message: ' + 'Failed assertion: ~A' + '; Args: ' + !getBlockState(field, x, y);
              };
              setBlockState(field, x, y, true);
              __PS_MV_REG = [];
              return true;
          };
      };
      var pinAllBlocksToField = function (field, blocks, yOffset) {
          if (yOffset === undefined) {
              yOffset = 0;
          };
          var pendingBlocks = [];
          for (var point = null, _js_idx411 = 0; _js_idx411 < blocks.length; _js_idx411 += 1) {
              point = blocks[_js_idx411];
              var x = point[0];
              var y = point[1] - yOffset;
              if (!pinBlockToField(field, x, y)) {
                  pendingBlocks.unshift(point);
                  pendingBlocks;
              };
          };
          __PS_MV_REG = [];
          return pendingBlocks;
      };
      var pendingBlocks = pinAllBlocksToField(field, calcGlobalPieceShape(piece));
      var countDeleted = deleteCompletedLines(field);
      var restBlocks = pinAllBlocksToField(field, pendingBlocks, countDeleted);
      if (countDeleted > 0) {
          for (var hook = null, _js_idx412 = 0; _js_idx412 < AFTERDELETEDLINESHOOKS.length; _js_idx412 += 1) {
              hook = AFTERDELETEDLINESHOOKS[_js_idx412];
              hook(countDeleted);
          };
      };
      __PS_MV_REG = [];
      return restBlocks.length === 0;
  };
  /* --- extern symbols --- */
  return {
    'field': field,
    'piece': piece,
    'copyPieceTo': copyPieceTo,
    'clonePiece': clonePiece,
    'initTetrisField': initTetrisField,
    'initPiece': initPiece,
    'rotateStaticShape': rotateStaticShape,
    'calcGlobalPieceShape': calcGlobalPieceShape,
    'enableToMovePieceToP': enableToMovePieceToP,
    'movePieceTo': movePieceTo,
    'intersectPieceToFieldP': intersectPieceToFieldP,
    'rotatePiece': rotatePiece,
    'addAfterDeletedLinesHook': addAfterDeletedLinesHook,
    'pinPieceToField': pinPieceToField,
    '_internal': {
      'makeField': makeField,
      'fieldP': fieldP,
      'makePiece': makePiece,
      'pieceP': pieceP,
      'checkInFieldP': checkInFieldP,
      'getBlockState': getBlockState,
      'setBlockState': setBlockState,
      'deleteCompletedLines': deleteCompletedLines,
      'staticShapeParam': staticShapeParam,
      'makeStaticShapeParam': makeStaticShapeParam,
      'staticShapeParamP': staticShapeParamP,
      'STATICSHAPELIST': STATICSHAPELIST,
      'AFTERDELETEDLINESHOOKS': AFTERDELETEDLINESHOOKS,
    }
  };
})();

var clwTetris_src_game_score = (function() {
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
  var addAfterDeletedLinesHook = clwTetris_src_game_basicOperation.addAfterDeletedLinesHook;
  /* --- define objects --- */
  if ('undefined' === typeof MAXSCORE) {
      var MAXSCORE = 99999;
  };
  function getScore(scoreManager) {
      __PS_MV_REG = [];
      return getEntityParam(scoreManager, 'score');
  };
  function updateScoreTextArea(score) {
      var area = findAEntityByTag('score-text-area');
      clearTextArea(area);
      __PS_MV_REG = [];
      return addTextToArea(area, 'text', score, 'color', 16777215);
  };
  function makeScoreTextArea() {
      var area = makeTextArea('font-size', 30, 'text-align', 'right', 'margin', 10, 'x', 800, 'y', 600);
      addEntityTag(area, 'score-text-area');
      __PS_MV_REG = [];
      return area;
  };
  function makeScoreManager() {
      var manager = makeEcsEntity();
      addEntityTag(manager, 'score-manager');
      addEcsComponentList(manager, initEntityParams('score', 0));
      __PS_MV_REG = [];
      return manager;
  };
  function addScoreAfterDeleted(numLines) {
      var manager = findAEntityByTag('score-manager');
      var score = Math.min(MAXSCORE, getScore(manager) + 1000 * Math.pow(2, numLines - 1));
      setEntityParam(manager, 'score', score);
      __PS_MV_REG = [];
      return updateScoreTextArea(score);
  };
  function initScoreManager() {
      var manager = makeScoreManager();
      addAfterDeletedLinesHook(addScoreAfterDeleted);
      addEcsEntity(manager);
      addEcsEntity(makeScoreTextArea(), manager);
      __PS_MV_REG = [];
      return updateScoreTextArea(0);
  };
  /* --- extern symbols --- */
  return {
    'initScoreManager': initScoreManager,
    '_internal': {
      'MAXSCORE': MAXSCORE,
      'getScore': getScore,
      'updateScoreTextArea': updateScoreTextArea,
      'makeScoreTextArea': makeScoreTextArea,
      'makeScoreManager': makeScoreManager,
      'addScoreAfterDeleted': addScoreAfterDeleted,
    }
  };
})();

var clwTetris_src_game_entity = (function() {
  /* --- import symbols --- */
  var initTetrisField = clwTetris_src_game_basicOperation.initTetrisField;
  var enableToMovePieceToP = clwTetris_src_game_basicOperation.enableToMovePieceToP;
  var clonePiece = clwTetris_src_game_basicOperation.clonePiece;
  var field = clwTetris_src_game_basicOperation.field;
  var copyPieceTo = clwTetris_src_game_basicOperation.copyPieceTo;
  var intersectPieceToFieldP = clwTetris_src_game_basicOperation.intersectPieceToFieldP;
  var movePieceTo = clwTetris_src_game_basicOperation.movePieceTo;
  var calcGlobalPieceShape = clwTetris_src_game_basicOperation.calcGlobalPieceShape;
  var rotatePiece = clwTetris_src_game_basicOperation.rotatePiece;
  var piece = clwTetris_src_game_basicOperation.piece;
  var pinPieceToField = clwTetris_src_game_basicOperation.pinPieceToField;
  var rotateStaticShape = clwTetris_src_game_basicOperation.rotateStaticShape;
  var addAfterDeletedLinesHook = clwTetris_src_game_basicOperation.addAfterDeletedLinesHook;
  var initPiece = clwTetris_src_game_basicOperation.initPiece;
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
  if ('undefined' === typeof GLOBALPARAMS) {
      var GLOBALPARAMS = (function () {
          var result413;
          var result414;
          var result415;
          var result416;
          var result = {  };
          result['block'] = (result413 = {  }, (result413['width'] = 30, result413['height'] = 30, result413['margin'] = 2, result413));
          result['field'] = (result414 = {  }, (result414['x-count'] = 10, result414['y-count'] = 15, result414));
          result['next-piece-area'] = (result415 = {  }, (result415['dist-from-field'] = 30, result415));
          result['input'] = (result416 = {  }, (result416['first-intv'] = 15, result416['intv'] = 4, result416));
          return result;
      })();
  };
  function changeFieldEntityToGameover(fieldEntity) {
      __PS_MV_REG = [];
      return setEntityParam(fieldEntity, 'gameover-p', true);
  };
  function gameoverP(fieldEntity) {
      __PS_MV_REG = [];
      return getEntityParam(fieldEntity, 'gameover-p');
  };
  function processWithFieldAndPiece(fieldEntity, fnProcess) {
      var pieceEntity = getEntityParam(fieldEntity, 'current-piece');
      var field417 = (found = getEcsComponent(field, fieldEntity), found ? found : (function () {
          throw 'FIELD is not included in the entity';
      })());
      var piece418 = (found419 = getEcsComponent(piece, pieceEntity), found419 ? found419 : (function () {
          throw 'PIECE is not included in the entity';
      })());
      __PS_MV_REG = [];
      return fnProcess(field417, piece418);
  };
  function resetPieceDownInterval(pieceEntity) {
      __PS_MV_REG = [];
      return setEntityParam(pieceEntity, 'rest-intv', getEntityParam(pieceEntity, 'intv'));
  };
  function warpPieceTo(fieldEntity, newPiece) {
      if (gameoverP(fieldEntity)) {
          __PS_MV_REG = [];
          return;
      };
      if (!((newPiece instanceof (typeof piece === 'string' ? eval(piece) : piece)))) {
          throw '\'TYPE-ERROR: (The place is \'NEW-PIECE\'. The expected type is \'PIECE\')';
      };
      __PS_MV_REG = [];
      return processWithFieldAndPiece(fieldEntity, function (field, currentPiece) {
          var currentY = currentPiece.y;
          var newY = newPiece.y;
          if (newY > currentY) {
              throw 'Message: ' + 'A piece can\'t move to up (before: ~A, after: ~A)' + '; Args: ' + currentY + ', ' + newY;
          };
          if (movePieceTo(field, newPiece, 'there')) {
              if (newY < currentY) {
                  resetPieceDownInterval(getEntityParam(fieldEntity, 'current-piece'));
              };
              __PS_MV_REG = [];
              return copyPieceTo(currentPiece, newPiece);
          };
      });
  };
  function swapPieceToNext(fieldEntity, field) {
      var nextPieceEntity = getEntityParam(fieldEntity, 'next-piece');
      addEcsEntityToBuffer(nextPieceEntity);
      setEntityParam(fieldEntity, 'current-piece', nextPieceEntity);
      setEntityParam(fieldEntity, 'next-piece', makePieceEntity(field));
      var nextPiece = (found = getEcsComponent(piece, nextPieceEntity), found ? found : (function () {
          throw 'PIECE is not included in the entity';
      })());
      __PS_MV_REG = [];
      return intersectPieceToFieldP(field, nextPiece) ? changeFieldEntityToGameover(fieldEntity) : null;
  };
  function downPieceEntity(fieldEntity) {
      checkEntityTags(fieldEntity, 'field');
      var pieceEntity = getEntityParam(fieldEntity, 'current-piece');
      resetPieceDownInterval(pieceEntity);
      __PS_MV_REG = [];
      return processWithFieldAndPiece(fieldEntity, function (field, currentPiece) {
          if (!movePieceTo(field, currentPiece, 'down')) {
              registerNextFrameFunc(function () {
                  __PS_MV_REG = [];
                  return findTheEntity(pieceEntity) ? deleteEcsEntity(pieceEntity) : null;
              });
              __PS_MV_REG = [];
              return pinPieceToField(field, currentPiece) ? swapPieceToNext(fieldEntity, field) : changeFieldEntityToGameover(fieldEntity);
          };
      });
  };
  function movePieceByInput(fieldEntity) {
      var requireMoveP = function (keyName) {
          var value;
          var n420;
          var value421;
          var count = keyDownCount(keyName);
          var firstIntv = (value = GLOBALPARAMS['input']['first-intv'], typeof value === 'function' ? value() : value);
          __PS_MV_REG = [];
          return count === 1 || count > firstIntv + 1 && 0 === (n420 = (value421 = GLOBALPARAMS['input']['intv'], typeof value421 === 'function' ? value421() : value421), ((count - 1 - firstIntv) % n420 + n420) % n420);
      };
      var moveIfRequired = function (keyName, moveDirection) {
          __PS_MV_REG = [];
          return requireMoveP(keyName) ? processWithFieldAndPiece(fieldEntity, function (field, piece) {
              __PS_MV_REG = [];
              return movePieceTo(field, piece, moveDirection);
          }) : null;
      };
      moveIfRequired('left', 'left');
      moveIfRequired('right', 'right');
      __PS_MV_REG = [];
      return requireMoveP('down') ? downPieceEntity(fieldEntity) : null;
  };
  function rotatePieceByInput(fieldEntity) {
      __PS_MV_REG = [];
      return processWithFieldAndPiece(fieldEntity, function (field, piece) {
          if (keyDownNowP('a')) {
              rotatePiece(field, piece, -1);
          };
          __PS_MV_REG = [];
          return keyDownNowP('c') ? rotatePiece(field, piece, 1) : null;
      });
  };
  function processTetrisInput(fieldEntity) {
      movePieceByInput(fieldEntity);
      __PS_MV_REG = [];
      return rotatePieceByInput(fieldEntity);
  };
  function fallInNatural(fieldEntity) {
      var pieceEntity = getEntityParam(fieldEntity, 'current-piece');
      __PS_MV_REG = [];
      return setEntityParam(pieceEntity, 'rest-intv', getEntityParam(pieceEntity, 'rest-intv') - 1) <= 0 ? downPieceEntity(fieldEntity) : null;
  };
  if ('undefined' === typeof NEXTPIECEAREALENGTH) {
      var NEXTPIECEAREALENGTH = 5;
  };
  function calcBlockExistArrayOfNext(entity) {
      checkEntityTags(entity, 'next-area');
      var result = (arr422 = new Array(Math.pow(NEXTPIECEAREALENGTH, 2)), ((elt424 = null, (function () {
          for (var i425 = 0; i425 < arr422.length; i425 += 1) {
              arr422[i425] = elt424;
          };
      })()), arr422));
      var fieldEntity = getEntityParam(entity, 'field-entity');
      var pieceEntity = getEntityParam(fieldEntity, 'next-piece');
      var shape = null;
      var piece426 = (found = getEcsComponent(piece, pieceEntity), found ? found : (function () {
          throw 'PIECE is not included in the entity';
      })());
      shape = rotateStaticShape(piece426.staticShape, piece426.rotateCount);
      for (var point = null, _js_idx427 = 0; _js_idx427 < shape.length; _js_idx427 += 1) {
          point = shape[_js_idx427];
          var x = point[0];
          var y = point[1];
          var index = (x + 2) + NEXTPIECEAREALENGTH * (y + 2);
          result[index] = true;
      };
      __PS_MV_REG = [];
      return result;
  };
  function calcBlockExistArrayOfField(fieldEntity) {
      checkEntityTags(fieldEntity, 'field');
      __PS_MV_REG = [];
      return processWithFieldAndPiece(fieldEntity, function (field, piece) {
          var xCount = field.xCount;
          var yCount = field.yCount;
          var resultArray = (arr428 = new Array(xCount * yCount), ((elt430 = null, (function () {
              for (var i431 = 0; i431 < arr428.length; i431 += 1) {
                  arr428[i431] = elt430;
              };
          })()), arr428));
          if (!field) {
              throw 'Message: ' + 'Failed assertion: ~A' + '; Args: ' + field;
          };
          var _js432 = xCount * yCount;
          for (var i = 0; i < _js432; i += 1) {
              if (field.blockStateArray[i]) {
                  resultArray[i] = true;
              };
          };
          var shape = calcGlobalPieceShape(piece);
          for (var point = null, _js_idx433 = 0; _js_idx433 < shape.length; _js_idx433 += 1) {
              point = shape[_js_idx433];
              var index = point[0] + point[1] * field.xCount;
              if (index < field.xCount * field.yCount) {
                  resultArray[index] = true;
              };
          };
          __PS_MV_REG = [];
          return resultArray;
      });
  };
  function updateFieldDraw(entity, fnCalcBlockExistArray) {
      checkEntityTags(entity, 'piece-display');
      var blockModelArray = getEntityParam(entity, 'block-model-array');
      var blockExistArray = fnCalcBlockExistArray(entity);
      var field434 = getEcsComponent(field, entity);
      if (!field434) {
          throw 'Message: ' + 'Failed assertion: ~A' + '; Args: ' + field434;
      };
      if (blockExistArray.length !== blockModelArray.length) {
          throw 'Message: ' + 'Failed assertion: ~A' + '; Args: ' + (blockExistArray.length === blockModelArray.length);
      };
      for (var i = 0; i < blockExistArray.length; i += 1) {
          if (blockExistArray[i]) {
              enableModel2d(entity, 'target-model-2d', blockModelArray[i]);
          } else {
              disableModel2d(entity, 'target-model-2d', blockModelArray[i]);
          };
      };
  };
  function makePieceEntity(field) {
      var entity = makeEcsEntity();
      addEntityTag(entity, 'piece');
      addEcsComponentList(entity, initPiece(field), initEntityParams('field', field, 'rest-intv', 60, 'intv', 60));
      __PS_MV_REG = [];
      return entity;
  };
  function makeBlockModel(x, y) {
      var value;
      var value435;
      var value436;
      var blockWidth = (value = GLOBALPARAMS['block']['width'], typeof value === 'function' ? value() : value);
      var blockHeight = (value435 = GLOBALPARAMS['block']['height'], typeof value435 === 'function' ? value435() : value435);
      var blockMargin = (value436 = GLOBALPARAMS['block']['margin'], typeof value436 === 'function' ? value436() : value436);
      __PS_MV_REG = [];
      return makeModel2d('model', makeSolidRect('width', blockWidth - blockMargin * 2, 'height', blockHeight - blockMargin * 2, 'color', 15658734), 'offset', makePoint2d('x', x + blockMargin, 'y', y + blockMargin), 'depth', 0);
  };
  function makePieceDisplayEntity() {
      var value;
      var value439;
      var _js438 = arguments.length;
      for (var n437 = 0; n437 < _js438; n437 += 2) {
          switch (arguments[n437]) {
          case 'x-offset':
              xOffset = arguments[n437 + 1];
              break;
          case 'y-offset':
              yOffset = arguments[n437 + 1];
              break;
          case 'x-count':
              xCount = arguments[n437 + 1];
              break;
          case 'y-count':
              yCount = arguments[n437 + 1];
              break;
          case 'fn-script':
              fnScript = arguments[n437 + 1];
          };
      };
      var xOffset;
      var yOffset;
      var xCount;
      var yCount;
      var fnScript;
      var field = initTetrisField(xCount, yCount);
      var blockModelArray = new Array(xCount * yCount);
      var entity = makeEcsEntity();
      var blockWidth = (value = GLOBALPARAMS['block']['width'], typeof value === 'function' ? value() : value);
      var blockHeight = (value439 = GLOBALPARAMS['block']['height'], typeof value439 === 'function' ? value439() : value439);
      addEntityTag(entity, 'piece-display');
      for (var i = 0; i < xCount * yCount; i += 1) {
          var x = (i % xCount + xCount) % xCount;
          var y = Math.floor(i / xCount);
          var model = makeBlockModel(x * blockWidth, y * blockHeight);
          blockModelArray[i] = model;
          addEcsComponent(model, entity);
      };
      addEcsComponentList(entity, field, makePoint2d('x', xOffset, 'y', yOffset), initEntityParams('block-model-array', blockModelArray, 'x-count', xCount, 'y-count', yCount, 'block-width', blockWidth, 'block-height', blockHeight), makeScript2d('func', fnScript), makeModel2d('model', makeSolidRect('width', xCount * blockWidth, 'height', yCount * blockHeight, 'color', 2236962), 'depth', -10));
      __PS_MV_REG = [];
      return entity;
  };
  function updateNextPieceArea(entity) {
      checkEntityTags(entity, 'next-area');
      __PS_MV_REG = [];
      return updateFieldDraw(entity, calcBlockExistArrayOfNext);
  };
  function makeNextPieceAreaEntity(x, y, fieldEntity) {
      checkEntityTags(fieldEntity, 'field');
      var entity = makePieceDisplayEntity('x-count', NEXTPIECEAREALENGTH, 'y-count', NEXTPIECEAREALENGTH, 'x-offset', x, 'y-offset', y, 'fn-script', updateNextPieceArea);
      addEntityTag(entity, 'next-area');
      setEntityParam(entity, 'field-entity', fieldEntity);
      __PS_MV_REG = [];
      return entity;
  };
  function updateField(fieldEntity) {
      checkEntityTags(fieldEntity, 'field');
      if (!gameoverP(fieldEntity)) {
          processTetrisInput(fieldEntity);
          fallInNatural(fieldEntity);
      };
      __PS_MV_REG = [];
      return updateFieldDraw(fieldEntity, calcBlockExistArrayOfField);
  };
  function makeFieldEntity() {
      var _js441 = arguments.length;
      for (var n440 = 0; n440 < _js441; n440 += 2) {
          switch (arguments[n440]) {
          case 'x-count':
              xCount = arguments[n440 + 1];
              break;
          case 'y-count':
              yCount = arguments[n440 + 1];
          };
      };
      var xCount;
      var yCount;
      var entity = makePieceDisplayEntity('x-count', xCount, 'y-count', yCount, 'x-offset', (getScreenWidth() - xCount * (value = GLOBALPARAMS['block']['width'], typeof value === 'function' ? value() : value)) / 2, 'y-offset', (getScreenHeight() - yCount * (value442 = GLOBALPARAMS['block']['height'], typeof value442 === 'function' ? value442() : value442)) / 2, 'fn-script', updateField);
      addEntityTag(entity, 'field');
      var field443 = (found = getEcsComponent(field, entity), found ? found : (function () {
          throw 'FIELD is not included in the entity';
      })());
      setEntityParam(entity, 'current-piece', makePieceEntity(field443));
      setEntityParam(entity, 'next-piece', makePieceEntity(field443));
      setEntityParam(entity, 'gameover-p', null);
      __PS_MV_REG = [];
      return entity;
  };
  function initTetrisEntities() {
      var value;
      var value444;
      var value446;
      var value447;
      var value448;
      var xCount = (value = GLOBALPARAMS['field']['x-count'], typeof value === 'function' ? value() : value);
      var yCount = (value444 = GLOBALPARAMS['field']['y-count'], typeof value444 === 'function' ? value444() : value444);
      var fieldEntity = makeFieldEntity('x-count', xCount, 'y-count', yCount);
      var field445 = getEcsComponent(field, fieldEntity);
      var nextPieceArea = makeNextPieceAreaEntity(xCount * (value446 = GLOBALPARAMS['block']['width'], typeof value446 === 'function' ? value446() : value446) + (value447 = GLOBALPARAMS['next-piece-area']['dist-from-field'], typeof value447 === 'function' ? value447() : value447), (yCount - (NEXTPIECEAREALENGTH + 1)) * (value448 = GLOBALPARAMS['block']['height'], typeof value448 === 'function' ? value448() : value448), fieldEntity);
      if (!field445) {
          throw 'Message: ' + 'Failed assertion: ~A' + '; Args: ' + field445;
      };
      addEcsEntity(fieldEntity);
      addEcsEntity(getEntityParam(fieldEntity, 'current-piece'));
      __PS_MV_REG = [];
      return addEcsEntity(nextPieceArea, fieldEntity);
  };
  /* --- extern symbols --- */
  return {
    'gameoverP': gameoverP,
    'processWithFieldAndPiece': processWithFieldAndPiece,
    'warpPieceTo': warpPieceTo,
    'downPieceEntity': downPieceEntity,
    'initTetrisEntities': initTetrisEntities,
    '_internal': {
      'GLOBALPARAMS': GLOBALPARAMS,
      'changeFieldEntityToGameover': changeFieldEntityToGameover,
      'resetPieceDownInterval': resetPieceDownInterval,
      'swapPieceToNext': swapPieceToNext,
      'movePieceByInput': movePieceByInput,
      'rotatePieceByInput': rotatePieceByInput,
      'processTetrisInput': processTetrisInput,
      'fallInNatural': fallInNatural,
      'NEXTPIECEAREALENGTH': NEXTPIECEAREALENGTH,
      'calcBlockExistArrayOfNext': calcBlockExistArrayOfNext,
      'calcBlockExistArrayOfField': calcBlockExistArrayOfField,
      'updateFieldDraw': updateFieldDraw,
      'makePieceEntity': makePieceEntity,
      'makeBlockModel': makeBlockModel,
      'makePieceDisplayEntity': makePieceDisplayEntity,
      'updateNextPieceArea': updateNextPieceArea,
      'makeNextPieceAreaEntity': makeNextPieceAreaEntity,
      'updateField': updateField,
      'makeFieldEntity': makeFieldEntity,
    }
  };
})();

var clwTetris_src_game_mouse = (function() {
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
  var processWithFieldAndPiece = clwTetris_src_game_entity.processWithFieldAndPiece;
  var gameoverP = clwTetris_src_game_entity.gameoverP;
  var piece = clwTetris_src_game_basicOperation.piece;
  var warpPieceTo = clwTetris_src_game_entity.warpPieceTo;
  var field = clwTetris_src_game_basicOperation.field;
  var enableToMovePieceToP = clwTetris_src_game_basicOperation.enableToMovePieceToP;
  var calcGlobalPieceShape = clwTetris_src_game_basicOperation.calcGlobalPieceShape;
  var rotatePiece = clwTetris_src_game_basicOperation.rotatePiece;
  var downPieceEntity = clwTetris_src_game_entity.downPieceEntity;
  var clonePiece = clwTetris_src_game_basicOperation.clonePiece;
  /* --- define objects --- */
  if ('undefined' === typeof NORMALBLOCKFRAMECOLOR) {
      var NORMALBLOCKFRAMECOLOR = 65535;
  };
  if ('undefined' === typeof NGBLOCKFRAMECOLOR) {
      var NGBLOCKFRAMECOLOR = 16711680;
  };
  if ('undefined' === typeof BLOCKFRAMEDEPTH) {
      var BLOCKFRAMEDEPTH = 20;
  };
  if ('undefined' === typeof MOUSEPOINTERR) {
      var MOUSEPOINTERR = 3;
  };
  if ('undefined' === typeof MOUSEPOINTERCOLOR) {
      var MOUSEPOINTERCOLOR = 15597568;
  };
  if ('undefined' === typeof MOUSEPOINTERDEPTH) {
      var MOUSEPOINTERDEPTH = 30;
  };
  function getFieldEntity() {
      __PS_MV_REG = [];
      return findAEntityByTag('field');
  };
  function getBlockWidth(fieldEntity) {
      __PS_MV_REG = [];
      return getEntityParam(fieldEntity, 'block-width');
  };
  function getBlockHeight(fieldEntity) {
      __PS_MV_REG = [];
      return getEntityParam(fieldEntity, 'block-height');
  };
  function pntOnField() {
      this.x = null;
      this.y = null;
      return this;
  };
  function makePntOnField() {
      var _js450 = arguments.length;
      for (var n449 = 0; n449 < _js450; n449 += 2) {
          switch (arguments[n449]) {
          case 'x':
              x = arguments[n449 + 1];
              break;
          case 'y':
              y = arguments[n449 + 1];
          };
      };
      var x;
      var y;
      var result = new pntOnField();
      result.x = x;
      result.y = y;
      __PS_MV_REG = [];
      return result;
  };
  function pntOnFieldP(obj) {
      return (obj instanceof pntOnField);
  };
  function initPntOnField(field, x, y) {
      var xCount = getEntityParam(field, 'x-count');
      var yCount = getEntityParam(field, 'y-count');
      __PS_MV_REG = [];
      return x >= 0 && x < xCount && y >= 0 && y < yCount ? makePntOnField('x', x, 'y', y) : makePntOnField('x', -99999, 'y', -99999);
  };
  function calcMousePointOnField() {
      var mouseX = getMouseX();
      var mouseY = getMouseY();
      var field = getFieldEntity();
      var blockWidth = getBlockWidth(field);
      var blockHeight = getBlockHeight(field);
      var fieldPnt = (found = getEcsComponent(point2d, field), found ? found : (function () {
          throw 'POINT-2D is not included in the entity';
      })());
      __PS_MV_REG = [];
      return initPntOnField(field, Math.floor((mouseX - fieldPnt.x) / blockWidth), Math.floor((mouseY - fieldPnt.y) / blockHeight));
  };
  function makeBlockFrameModel() {
      var field = getFieldEntity();
      var blockWidth = getBlockWidth(field);
      var blockHeight = getBlockHeight(field);
      __PS_MV_REG = [];
      return makeModel2d('model', makeWiredRect('width', blockWidth, 'height', blockHeight, 'color', NORMALBLOCKFRAMECOLOR), 'offset', makePoint2d('x', -99999, 'y', -99999), 'depth', BLOCKFRAMEDEPTH);
  };
  function enableToWarpPieceTo(fieldEntity, field, piece, currentPiece) {
      __PS_MV_REG = [];
      return !gameoverP(fieldEntity) && enableToMovePieceToP(field, piece, 'there') && piece.y <= currentPiece.y;
  };
  function updateOneBlockModel() {
      var _js452 = arguments.length;
      for (var n451 = 0; n451 < _js452; n451 += 2) {
          switch (arguments[n451]) {
          case 'model':
              model = arguments[n451 + 1];
              break;
          case 'field-entity':
              fieldEntity = arguments[n451 + 1];
              break;
          case 'field-pnt':
              fieldPnt = arguments[n451 + 1];
              break;
          case 'point-in-shape':
              pointInShape = arguments[n451 + 1];
              break;
          case 'enable-warp-p':
              enableWarpP = arguments[n451 + 1];
          };
      };
      var model;
      var fieldEntity;
      var fieldPnt;
      var pointInShape;
      var enableWarpP;
      var modelOffset = model.offset;
      var blockWidth = getBlockWidth(fieldEntity);
      var blockHeight = getBlockHeight(fieldEntity);
      modelOffset.x = pointInShape[0] * blockWidth + fieldPnt.x;
      modelOffset.y = pointInShape[1] * blockHeight + fieldPnt.y;
      __PS_MV_REG = [];
      return changeModelColor(model, enableWarpP ? NORMALBLOCKFRAMECOLOR : NGBLOCKFRAMECOLOR);
  };
  function makePieceFromMousePoint(fieldEntity) {
      var pieceEntity = getEntityParam(fieldEntity, 'current-piece');
      var piece453 = (found = getEcsComponent(piece, pieceEntity), found ? found : (function () {
          throw 'PIECE is not included in the entity';
      })());
      var clonedPiece = clonePiece(piece453);
      var object454 = calcMousePointOnField();
      clonedPiece.x = object454.x;
      clonedPiece.y = object454.y;
      __PS_MV_REG = [];
      return clonedPiece;
  };
  function updateBlockFrame(mouseEntity) {
      var models = getEntityParam(mouseEntity, 'models');
      var fieldEntity = getFieldEntity();
      var pieceEntity = getEntityParam(fieldEntity, 'current-piece');
      var piece455 = (found = getEcsComponent(piece, pieceEntity), found ? found : (function () {
          throw 'PIECE is not included in the entity';
      })());
      var clonedPiece = makePieceFromMousePoint(fieldEntity);
      var shape = calcGlobalPieceShape(clonedPiece);
      var fieldPnt = (found457 = getEcsComponent(point2d, fieldEntity), found457 ? found457 : (function () {
          throw 'POINT-2D is not included in the entity';
      })());
      var field456 = (found458 = getEcsComponent(field, fieldEntity), found458 ? found458 : (function () {
          throw 'FIELD is not included in the entity';
      })());
      var enableWarpP = enableToWarpPieceTo(fieldEntity, field456, clonedPiece, piece455);
      for (var i = 0; i < models.length; i += 1) {
          updateOneBlockModel('model', models[i], 'point-in-shape', shape[i], 'field-entity', fieldEntity, 'field-pnt', fieldPnt, 'enable-warp-p', enableWarpP);
      };
  };
  function makeMousePointerModel() {
      __PS_MV_REG = [];
      return makeModel2d('model', makeSolidCircle('r', MOUSEPOINTERR, 'color', MOUSEPOINTERCOLOR), 'depth', MOUSEPOINTERDEPTH);
  };
  function updateMousePointer(entity) {
      var model = getEntityParam(entity, 'pointer-model');
      var modelOffset = model.offset;
      if (!model) {
          throw 'Message: ' + 'Failed assertion: ~A' + '; Args: ' + model;
      };
      modelOffset.x = getMouseX();
      __PS_MV_REG = [];
      return modelOffset.y = getMouseY();
  };
  function rotatePieceByWheel() {
      __PS_MV_REG = [];
      return processWithFieldAndPiece(getFieldEntity(), function (field, piece) {
          var wheel = getMouseWheelDeltaY();
          if (wheel > 0) {
              __PS_MV_REG = [];
              return rotatePiece(field, piece, 1);
          } else if (wheel < 0) {
              __PS_MV_REG = [];
              return rotatePiece(field, piece, -1);
          };
      });
  };
  function processClickInput() {
      var fieldEntity = getFieldEntity();
      if (getLeftMouseState() === 'down-now') {
          warpPieceTo(fieldEntity, makePieceFromMousePoint(fieldEntity));
      };
      __PS_MV_REG = [];
      return getRightMouseState() === 'down-now' ? downPieceEntity(fieldEntity) : null;
  };
  function initMouseEntity() {
      var entity = makeEcsEntity();
      var models = [];
      var pointerModel = makeMousePointerModel();
      addEcsComponentList(entity, makePoint2d(), pointerModel, makeScript2d('func', function (entity) {
          updateBlockFrame(entity);
          updateMousePointer(entity);
          rotatePieceByWheel();
          __PS_MV_REG = [];
          return processClickInput();
      }), initEntityParams('models', models, 'pointer-model', pointerModel));
      for (var i = 0; i < 4; i += 1) {
          var model = makeBlockFrameModel();
          models.unshift(model);
          models;
          addEcsComponent(model, entity);
      };
      __PS_MV_REG = [];
      return addEcsEntity(entity);
  };
  /* --- extern symbols --- */
  return {
    'initMouseEntity': initMouseEntity,
    '_internal': {
      'NORMALBLOCKFRAMECOLOR': NORMALBLOCKFRAMECOLOR,
      'NGBLOCKFRAMECOLOR': NGBLOCKFRAMECOLOR,
      'BLOCKFRAMEDEPTH': BLOCKFRAMEDEPTH,
      'MOUSEPOINTERR': MOUSEPOINTERR,
      'MOUSEPOINTERCOLOR': MOUSEPOINTERCOLOR,
      'MOUSEPOINTERDEPTH': MOUSEPOINTERDEPTH,
      'getFieldEntity': getFieldEntity,
      'getBlockWidth': getBlockWidth,
      'getBlockHeight': getBlockHeight,
      'pntOnField': pntOnField,
      'makePntOnField': makePntOnField,
      'pntOnFieldP': pntOnFieldP,
      'initPntOnField': initPntOnField,
      'calcMousePointOnField': calcMousePointOnField,
      'makeBlockFrameModel': makeBlockFrameModel,
      'enableToWarpPieceTo': enableToWarpPieceTo,
      'updateOneBlockModel': updateOneBlockModel,
      'makePieceFromMousePoint': makePieceFromMousePoint,
      'updateBlockFrame': updateBlockFrame,
      'makeMousePointerModel': makeMousePointerModel,
      'updateMousePointer': updateMousePointer,
      'rotatePieceByWheel': rotatePieceByWheel,
      'processClickInput': processClickInput,
    }
  };
})();

var clwTetris_src_game_tetrisState = (function() {
  /* --- import symbols --- */
  var processWithFieldAndPiece = clwTetris_src_game_entity.processWithFieldAndPiece;
  var warpPieceTo = clwTetris_src_game_entity.warpPieceTo;
  var initTetrisEntities = clwTetris_src_game_entity.initTetrisEntities;
  var downPieceEntity = clwTetris_src_game_entity.downPieceEntity;
  var gameoverP = clwTetris_src_game_entity.gameoverP;
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
  var initMouseEntity = clwTetris_src_game_mouse.initMouseEntity;
  var initScoreManager = clwTetris_src_game_score.initScoreManager;
  /* --- define objects --- */
  function tetrisMainState() {
      this.startProcess = function (_this) {
          initTetrisEntities();
          initMouseEntity();
          initScoreManager();
          __PS_MV_REG = [];
          return true;
      };
      this.process = function (_this) {
          __PS_MV_REG = [];
          return gameoverP(findAEntityByTag('field')) ? makeTetrisGameoverState() : null;
      };
      this.endProcess = function (_this) {
          return true;
      };
      return this;
  };
  function makeTetrisMainState() {
      var _js460 = arguments.length;
      for (var n459 = 0; n459 < _js460; n459 += 2) {
          switch (arguments[n459]) {
          case 'start-process':
              startProcess = arguments[n459 + 1];
              break;
          case 'process':
              process = arguments[n459 + 1];
              break;
          case 'end-process':
              endProcess = arguments[n459 + 1];
          };
      };
      var startProcess = 'undefined' === typeof startProcess ? function (_this) {
          initTetrisEntities();
          initMouseEntity();
          initScoreManager();
          __PS_MV_REG = [];
          return true;
      } : startProcess;
      var process = 'undefined' === typeof process ? function (_this) {
          __PS_MV_REG = [];
          return gameoverP(findAEntityByTag('field')) ? makeTetrisGameoverState() : null;
      } : process;
      var endProcess = 'undefined' === typeof endProcess ? function (_this) {
          return true;
      } : endProcess;
      var result = new tetrisMainState();
      result.startProcess = startProcess;
      result.process = process;
      result.endProcess = endProcess;
      __PS_MV_REG = [];
      return result;
  };
  function tetrisMainStateP(obj) {
      return (obj instanceof tetrisMainState);
  };
  (function () {
      var tempCtor = function () {
          return null;
      };
      tempCtor.prototype = gameState.prototype;
      tetrisMainState.superClass_ = gameState.prototype;
      tetrisMainState.prototype = new tempCtor();
      __PS_MV_REG = [];
      return tetrisMainState.prototype.constructor = tetrisMainState;
  })();
  function tetrisStartState() {
      this.startProcess = function (_this) {
          loadFont('./');
          var area = makeTextArea('font-size', 25, 'text-align', 'center', 'x', 400, 'y', 300);
          _this.textAreaEntity = area;
          addTextToArea(area, 'text', 'Press z key or Click to start', 'color', 16777215);
          addEcsEntity(area);
          __PS_MV_REG = [];
          return true;
      };
      this.process = function (_this) {
          __PS_MV_REG = [];
          return keyDownNowP('a') || getLeftMouseState() === 'down-now' ? makeTetrisMainState() : null;
      };
      this.endProcess = function (_this) {
          deleteEcsEntity(_this.textAreaEntity);
          __PS_MV_REG = [];
          return true;
      };
      this.textAreaEntity = null;
      return this;
  };
  function makeTetrisStartState() {
      var _js462 = arguments.length;
      for (var n461 = 0; n461 < _js462; n461 += 2) {
          switch (arguments[n461]) {
          case 'start-process':
              startProcess = arguments[n461 + 1];
              break;
          case 'process':
              process = arguments[n461 + 1];
              break;
          case 'end-process':
              endProcess = arguments[n461 + 1];
              break;
          case 'text-area-entity':
              textAreaEntity = arguments[n461 + 1];
          };
      };
      var startProcess = 'undefined' === typeof startProcess ? function (_this) {
          loadFont('./');
          var area = makeTextArea('font-size', 25, 'text-align', 'center', 'x', 400, 'y', 300);
          _this.textAreaEntity = area;
          addTextToArea(area, 'text', 'Press z key or Click to start', 'color', 16777215);
          addEcsEntity(area);
          __PS_MV_REG = [];
          return true;
      } : startProcess;
      var process = 'undefined' === typeof process ? function (_this) {
          __PS_MV_REG = [];
          return keyDownNowP('a') || getLeftMouseState() === 'down-now' ? makeTetrisMainState() : null;
      } : process;
      var endProcess = 'undefined' === typeof endProcess ? function (_this) {
          deleteEcsEntity(_this.textAreaEntity);
          __PS_MV_REG = [];
          return true;
      } : endProcess;
      var textAreaEntity;
      var result = new tetrisStartState();
      result.startProcess = startProcess;
      result.process = process;
      result.endProcess = endProcess;
      result.textAreaEntity = textAreaEntity;
      __PS_MV_REG = [];
      return result;
  };
  function tetrisStartStateP(obj) {
      return (obj instanceof tetrisStartState);
  };
  (function () {
      var tempCtor = function () {
          return null;
      };
      tempCtor.prototype = gameState.prototype;
      tetrisStartState.superClass_ = gameState.prototype;
      tetrisStartState.prototype = new tempCtor();
      __PS_MV_REG = [];
      return tetrisStartState.prototype.constructor = tetrisStartState;
  })();
  function tetrisGameoverState() {
      this.startProcess = function (_this) {
          var fontSize = 35;
          var margin = 20;
          var area = makeTextArea('font-size', fontSize, 'text-align', 'center', 'margin', margin, 'x', getScreenWidth() / 2, 'y', getScreenHeight() / 2 + (fontSize * 2 + margin));
          addTextToArea(area, 'text', 'GAME OVER!!', 'color', 16711680);
          addTextToArea(area, 'text', 'Press z key or Click to restart', 'color', 65535);
          addEcsEntity(area);
          __PS_MV_REG = [];
          return true;
      };
      this.process = function (_this) {
          __PS_MV_REG = [];
          return keyDownNowP('a') || getLeftMouseState() === 'down-now' ? makeTetrisMainState() : null;
      };
      this.endProcess = function (_this) {
          if (_this.firstFrame) {
              for (var entity = null, _js_arrvar466 = clPsEcs_ecs._internal.getEntityList(), _js_idx465 = 0; _js_idx465 < _js_arrvar466.length; _js_idx465 += 1) {
                  entity = _js_arrvar466[_js_idx465];
                  if (!entity.parent) {
                      registerNextFrameFunc(function () {
                          __PS_MV_REG = [];
                          return deleteEcsEntity(entity);
                      });
                  };
              };
              _this.firstFrame = null;
              __PS_MV_REG = [];
              return null;
          } else {
              __PS_MV_REG = [];
              return true;
          };
      };
      this.firstFrame = true;
      return this;
  };
  function makeTetrisGameoverState() {
      var _js468 = arguments.length;
      for (var n467 = 0; n467 < _js468; n467 += 2) {
          switch (arguments[n467]) {
          case 'start-process':
              startProcess = arguments[n467 + 1];
              break;
          case 'process':
              process = arguments[n467 + 1];
              break;
          case 'end-process':
              endProcess = arguments[n467 + 1];
              break;
          case 'first-frame':
              firstFrame = arguments[n467 + 1];
          };
      };
      var startProcess = 'undefined' === typeof startProcess ? function (_this) {
          var fontSize = 35;
          var margin = 20;
          var area = makeTextArea('font-size', fontSize, 'text-align', 'center', 'margin', margin, 'x', getScreenWidth() / 2, 'y', getScreenHeight() / 2 + (fontSize * 2 + margin));
          addTextToArea(area, 'text', 'GAME OVER!!', 'color', 16711680);
          addTextToArea(area, 'text', 'Press z key or Click to restart', 'color', 65535);
          addEcsEntity(area);
          __PS_MV_REG = [];
          return true;
      } : startProcess;
      var process = 'undefined' === typeof process ? function (_this) {
          __PS_MV_REG = [];
          return keyDownNowP('a') || getLeftMouseState() === 'down-now' ? makeTetrisMainState() : null;
      } : process;
      var endProcess = 'undefined' === typeof endProcess ? function (_this) {
          if (_this.firstFrame) {
              for (var entity = null, _js_arrvar472 = clPsEcs_ecs._internal.getEntityList(), _js_idx471 = 0; _js_idx471 < _js_arrvar472.length; _js_idx471 += 1) {
                  entity = _js_arrvar472[_js_idx471];
                  if (!entity.parent) {
                      registerNextFrameFunc(function () {
                          __PS_MV_REG = [];
                          return deleteEcsEntity(entity);
                      });
                  };
              };
              _this.firstFrame = null;
              __PS_MV_REG = [];
              return null;
          } else {
              __PS_MV_REG = [];
              return true;
          };
      } : endProcess;
      var firstFrame = 'undefined' === typeof firstFrame ? true : firstFrame;
      var result = new tetrisGameoverState();
      result.startProcess = startProcess;
      result.process = process;
      result.endProcess = endProcess;
      result.firstFrame = firstFrame;
      __PS_MV_REG = [];
      return result;
  };
  function tetrisGameoverStateP(obj) {
      return (obj instanceof tetrisGameoverState);
  };
  (function () {
      var tempCtor = function () {
          return null;
      };
      tempCtor.prototype = gameState.prototype;
      tetrisGameoverState.superClass_ = gameState.prototype;
      tetrisGameoverState.prototype = new tempCtor();
      __PS_MV_REG = [];
      return tetrisGameoverState.prototype.constructor = tetrisGameoverState;
  })();
  /* --- extern symbols --- */
  return {
    'makeTetrisStartState': makeTetrisStartState,
    '_internal': {
      'tetrisMainState': tetrisMainState,
      'makeTetrisMainState': makeTetrisMainState,
      'tetrisMainStateP': tetrisMainStateP,
      'tetrisStartState': tetrisStartState,
      'tetrisStartStateP': tetrisStartStateP,
      'tetrisGameoverState': tetrisGameoverState,
      'makeTetrisGameoverState': makeTetrisGameoverState,
      'tetrisGameoverStateP': tetrisGameoverStateP,
    }
  };
})();

var clwTetris_src_game_game = (function() {
  /* --- import symbols --- */
  var makeTetrisStartState = clwTetris_src_game_tetrisState.makeTetrisStartState;
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
  function initFunc(scene) {
      initGameState(makeTetrisStartState());
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

var clwTetris_src_server = (function() {
  /* --- import symbols --- */
  var updateFunc = clwTetris_src_game_game.updateFunc;
  var initFunc = clwTetris_src_game_game.initFunc;
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
  function __psMainFunc__() {
      var width = 800;
      var height = 600;
      __PS_MV_REG = [];
      return start2dGame('screen-width', width, 'screen-height', height, 'camera', initCamera(0, 0, width, height), 'rendered-dom', document.querySelector('#renderer'), 'stats-dom', document.querySelector('#stats-output'), 'monitoring-log-dom', document.querySelector('#monitor'), 'event-log-dom', document.querySelector('#eventlog'), 'init-function', initFunc, 'update-function', updateFunc);
  };
  /* --- extern symbols --- */
  return {
    '_internal': {
      '__psMainFunc__': __psMainFunc__,
    }
  };
})();

clwTetris_src_server._internal.__psMainFunc__();
