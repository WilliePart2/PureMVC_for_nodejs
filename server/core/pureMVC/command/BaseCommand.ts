import {Command} from "./Command";
import {Facade} from "../facade/Facade";
import {INotifier} from "../interfaces/INotifier";

export class BaseCommand extends Command {
    // @TODO: implement typed notifications!!!
    async sendNotficationToModule (moduleName: string, notificationName: string, notificationBody?: any, notificationType?: string) {
        if (Facade.hasCore(moduleName)) {
            return await (Facade.getInstance(moduleName) as INotifier).sendNotification(notificationName, notificationBody, notificationType);
        }
    }

    // @TODO: implement typed notifications!!!
    async sendNotificationToModules (modulesNames: string[], notificationName: string, notificationBody: any, notificationType: string) {
        let executionPromises = modulesNames.map((moduleName: string) => {
            return this.sendNotficationToModule(moduleName, notificationName, notificationBody, notificationType);
        });

        return await Promise.all(executionPromises);
    }

    // @TODO: implement typed notifications!!!
    async sendNotificationToAll (notificationName: string, notificationBody: any, notificationType: string) {
        let facadeKeys: string [] = [];
        for (let key in Facade.instancesMap) {
            facadeKeys.push(key);
        }

        return await this.sendNotificationToModules(facadeKeys, notificationName, notificationBody, notificationType);
    }
}
