import {INotification} from "./INotification";

export interface INotifier {
    sendNotification (notification: INotification);
    sendNotification (name: string, body: any, type: string);
}