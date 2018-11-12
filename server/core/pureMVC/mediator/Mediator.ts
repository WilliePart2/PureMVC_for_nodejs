import {FacadeMember} from "../core/FacadeMember";
import {IClientProxiesMap} from "../interfaces/IInstancesMap";
import {Proxy} from "../Proxy";
import {INotifier} from "../interfaces/INotifier";

export class Mediator extends FacadeMember {
    clientProxiesMap: IClientProxiesMap = new Map() as IClientProxiesMap;

    registerClientProxy (key: string, proxyInstance: Proxy) {
        this.clientProxiesMap[key] = proxyInstance;
    }

    retrieveClientProxy (key: string) {
        return this.clientProxiesMap[key];
    }

    async sendNotification (name: string, body?: any, type?: string) {
        return await (this.facade() as INotifier).sendNotification(name, body, type);
    }
}
