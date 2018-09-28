"use strict";
cc._RF.push(module, 'a028cxHAlNCIZEiex65c5Q/', 'dispatcher');
// scripts/logic/dispatcher.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 事件
 */
var dispatcher = /** @class */ (function () {
    function dispatcher() {
    }
    /**
     * 注册事件
     * @param event 事件类型
     * @param callback 回调函数
     * @param context 上下文
     */
    dispatcher.add_dispatch = function (event, callback, context) {
        var observers = dispatcher.listeners[event];
        if (!observers) {
            dispatcher.listeners[event] = [];
        }
        dispatcher.listeners[event].push(new observer(callback, context));
    };
    /**
     * 移除事件
     * @param event 事件类型
     * @param callback 回调函数
     * @param context 上下文
     */
    dispatcher.remove = function (event, callback, context) {
        var observers = dispatcher.listeners[event];
        if (!observers)
            return;
        var length = observers.length;
        for (var i = 0; i < length; i++) {
            var observer_1 = observers[i];
            if (observer_1.compar(context)) {
                observers.splice(i, 1);
                break;
            }
        }
        if (observers.length == 0) {
            delete dispatcher.listeners[event];
        }
    };
    /**
     * 发送事件
     * @param event 事件名称
     */
    dispatcher.dispatch = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var observers = dispatcher.listeners[event];
        if (!observers)
            return;
        var length = observers.length;
        for (var i = 0; i < length; i++) {
            var observer_2 = observers[i];
            observer_2.notify.apply(observer_2, args);
        }
    };
    /** 监听数组 */
    dispatcher.listeners = {};
    return dispatcher;
}());
exports.default = dispatcher;
/**
 * 观察者
 */
var observer = /** @class */ (function () {
    function observer(callback, context) {
        /** 回调函数 */
        this.callback = null;
        /** 上下文 */
        this.context = null;
        this.callback = callback;
        this.context = context;
    }
    /**
     * 发送通知
     * @param args 不定参数
     */
    observer.prototype.notify = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this.callback).call.apply(_a, [this.context].concat(args));
        var _a;
    };
    /**
     * 上下文比较
     * @param context 上下文
     */
    observer.prototype.compar = function (context) {
        return context == this.context;
    };
    return observer;
}());

cc._RF.pop();