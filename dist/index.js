"use strict";
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
var myRedux;
(function (myRedux) {
    function createStore(reducer, initState) {
        var store = initState;
        var subscribers = [];
        function getState() {
            return store;
        }
        function subscribe(fn) {
            subscribers.push(fn);
        }
        function dispatch(action) {
            store = reducer(store, action);
            subscribers.forEach(function (fn) { return fn(); });
        }
        return {
            getState: getState,
            subscribe: subscribe,
            dispatch: dispatch
        };
    }
    myRedux.createStore = createStore;
})(myRedux || (myRedux = {}));
var data = {
    name: 'aa',
    age: 18
};
function reducer(state, action) {
    var type = action.type, data = action.data;
    switch (type) {
        case 'a':
            return __assign(__assign({}, state), data);
        default:
            return state;
    }
}
var store = myRedux.createStore(reducer, data);
console.log(store.getState());
store.subscribe(function () {
    console.log(555);
    return {};
});
store.dispatch({
    type: 'a',
    data: {
        age: 19,
        sex: 'man'
    }
});
console.log(store.getState());
