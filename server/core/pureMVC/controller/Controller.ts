import {INotifier} from "../interfaces/INotifier";
import {INotification} from "../interfaces/INotification";
import {ICommandMap} from "../interfaces/IInstancesMap";
import {Command} from "../command/Command";
import {Observer} from "../observer/Observer";

export class Controller implements INotifier {
    facadeKey: string;
    commandsMap: ICommandMap = {} as ICommandMap;

    constructor (facadeKey: string) {
        this.facadeKey = facadeKey;
    }

    async sendNotification(notification: INotification);
    async sendNotification(name: string, body: any, type: string);
    async sendNotification(notification: INotification | string, body?: any, type?: string) {
        let nName: string = (notification as INotification).getName();

        if (this.commandsMap[nName]) {
            let command: typeof Command = this.commandsMap[nName];
            let commandInstance: Command = new command(this.facadeKey);
            return await commandInstance.execute(notification as INotification);
        }
    }

    registerCommand (key: string, command: Command): void {
        this.commandsMap[key] = command;
    }
}
