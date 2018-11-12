import {INotification} from "../interfaces/INotification";
import {IObserverMap} from "../interfaces/IInstancesMap";

export class Observer<T> {
    static observersMap: IObserverMap = {} as IObserverMap;
    multitonKey: string;
    private notificationContext: T;
    private notificationMethod: any;

    getInstance<T>(key: string) {
        if (!Observer.observersMap[key]) {
            Observer.observersMap[key] = new this<T>(key);
        }
        return Observer.observersMap[key];
    }

    constructor (key: string) {
        this.multitonKey = key;
    }

    private setNotificationContext (ctx: T) {
        this.notificationContext = ctx
    }

    private setNotificationMethod (method: any) {
        this.notificationMethod = method;
    }

    async notifyObserver (notification: INotification): Promise<any> {
        return await this.notificationMethod.call(this.notificationContext, notification);
    }
}
