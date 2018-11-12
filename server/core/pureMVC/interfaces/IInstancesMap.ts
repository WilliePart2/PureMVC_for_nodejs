import {Observer} from "../observer/Observer";
import {Facade} from "../facade/Facade";
import {Command} from "../command/Command";
import {Mediator} from "../mediator/Mediator";
import {Proxy} from "../Proxy";

export interface IInstancesMap<T> {
    instanceMap: {[key: string]: T};
}

export interface IObserverMap extends IInstancesMap<Observer> {}
export interface IFacadeMap extends IInstancesMap<Facade> {}
export interface ICommandMap extends IInstancesMap<Command> {}
export interface IMediatorMap extends IInstancesMap<Mediator> {}
export interface IClientProxiesMap extends IInstancesMap<Proxy> {}
export interface IProxyMap extends IInstancesMap<Proxy> {}
