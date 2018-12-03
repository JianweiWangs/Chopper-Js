function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

var callbackMap = {}

var chopperNative = window.webkit.messageHandlers.chopperNative

var chopperNativeCallback = window.webkit.messageHandlers.chopperNativeCallback

window.chopperWebCallback = {}

// chooper web
window.chopperWebCallback.callback = function (isSuccess, p) {
  var callback = callbackMap[p.callbackID]
  if (callback) {
    callback(isSuccess, p.params)
    delete callbackMap[p.callbackID]
  }
}

function dispatch(module, action, params, callback) {
  var UUID = uuidv4()
  var message = {
    'module': module,
    'action': action,
    'params': params,
    'callbackID': UUID
  }
  chopperNative.postMessage(message)
  callbackMap[UUID] = callback
}






