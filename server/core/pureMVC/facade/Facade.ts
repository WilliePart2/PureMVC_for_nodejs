import {Controller} from "../controller/Controller";
import {Model} from "../model/Model";
import {View} from "../view/View";
import {IExecutable} from "../interfaces/IExecutable";
import {INotifier} from "../interfaces/INotifier";
import {IFacadeMap} from "../interfaces/IInstancesMap";
import {INotification} from "../interfaces/INotification";
import {Notification} from "../notification/Notification";
import {Command} from "../command/Command";
import {Mediator} from "../mediator/Mediator";
import {Proxy} from "../Proxy";

export class Facade implements IExecutable, INotifier {
    static instancesMap: IFacadeMap = new Map<string, Facade>() as IFacadeMap;
    facadeKey: string;
    controller: Controller = null;
    model: Model = null;
    view: View = null;

    static getInstance (facadeKey: string) {
        if (Facade.instancesMap[facadeKey]) {
            return Facade.instancesMap[facadeKey];
        }
        Facade.instancesMap[facadeKey] = new this(facadeKey);
    }

    static hasCore (facadeKey: string) {
        return !!this.instancesMap[facadeKey];
    }

    constructor (key: string) {
        this.facadeKey = key;

        this.initController();
        this.initModel();
        this.initView();
        this.execute();
    }

    protected initController () {
        this.controller = new Controller(this.facadeKey);
    }

    protected initModel () {
        this.model = new Model();
    }

    protected initView () {
        this.view = new View(this.facadeKey);
    }

    /**
     * @abstract
     */
    execute () {

    }

    protected registerCommand (key: string, command: Command) {
        this.controller.registerCommand(key, command);
    }

    async sendNotification(notification: INotification);
    async sendNotification (name: string, body: any, type: string): Promise<any> {
        return await this.controller.sendNotification(this.createNotification(name, body, type));
    }

    protected createNotification (name: string, body: any, type: string): INotification {
        return new Notification(name, body, type);
    }

    protected registerMediator (key: string, mediator: typeof Mediator) {
        this.view.registerMediator(key, new mediator(this.facadeKey));
    }

    retrieveMediator (key: string) {
        return this.view.retrieveMediator(key);
    }

    protected registerProxy (key: string, proxyInstance: Proxy) {
        this.model.registerProxy(key, proxyInstance);
    }

    retrieveProxy (key: string) {
        return this.model.retrieveProxy(key);
    }
}
