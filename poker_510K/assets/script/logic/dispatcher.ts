
import {EventType} from "./consts"

/**
 * 事件
 */
export default class dispatcher {
    /** 监听数组 */
    private static listeners = {};
 
    /** 
     * 注册事件
     * @param event 事件类型
     * @param callback 回调函数
     * @param context 上下文
     */
    public static add_dispatch(event: EventType, callback: Function, context: any) {
        let observers: observer[] = dispatcher.listeners[event];
        if (!observers) {
            dispatcher.listeners[event] = [];
        }
        dispatcher.listeners[event].push(new observer(callback, context));
    }
 
    /**
     * 移除事件
     * @param event 事件类型
     * @param callback 回调函数
     * @param context 上下文
     */
    public static remove(event: EventType, callback: Function, context: any) {
        let observers: observer[] = dispatcher.listeners[event];
        if (!observers) return;
        let length = observers.length;
        for (let i = 0; i < length; i++) {
            let observer = observers[i];
            if (observer.compar(context)) {
                observers.splice(i, 1);
                break;
            }
        }
        if (observers.length == 0) {
            delete dispatcher.listeners[event];
        }
    }
 
    /**
     * 发送事件
     * @param event 事件名称
     */
    public static dispatch(event: EventType, ...args: any[]) {
        let observers: observer[] = dispatcher.listeners[event];
        if (!observers) return;
        let length = observers.length;
        for (let i = 0; i < length; i++) {
            let observer = observers[i];
            observer.notify(...args);
        }
    }
}
 
/**
 * 观察者
 */
class observer {
    /** 回调函数 */
    private callback: Function = null;
    /** 上下文 */
    private context: any = null;
 
    constructor(callback: Function, context: any) {
        this.callback = callback;
        this.context = context;
    }
 
    /**
     * 发送通知
     * @param args 不定参数
     */
    notify(...args: any[]): void {
        this.callback.call(this.context, ...args);
    }
 
    /**
     * 上下文比较
     * @param context 上下文
     */
    compar(context: any): boolean {
        return context == this.context;
    }
}