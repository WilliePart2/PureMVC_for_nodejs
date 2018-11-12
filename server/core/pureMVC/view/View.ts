import {INotifier} from "../interfaces/INotifier";
import {INotification} from "../interfaces/INotification";
import {Mediator} from "../mediator/Mediator";
import {IMediatorMap} from "../interfaces/IInstancesMap";

export class View {
    facadeKey: string;
    mediatorsMap: IMediatorMap = new Map() as IMediatorMap;

    constructor (key: string) {
        this.facadeKey = key;
    }

    registerMediator (key: string, instance: Mediator) {
        mediator.facadeKey = this.facadeKey;
        this.mediatorsMap[key] = instance;
    }

    retrieveMediator (key: string) {
        return this.mediatorsMap[key];
    }
}
