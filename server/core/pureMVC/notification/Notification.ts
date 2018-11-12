import {INotification} from "../interfaces/INotification";

export class Notification implements INotification {
    private name: string;
    public body: any;
    private type: string;

    constructor (name: string, body: any, type: string) {
        this.name = name;
        this.body = body;
        this.type = type;
    }

    getBody(): any {
        return this.body;
    }

    getName(): string {
        return this.name;
    }

    getType(): string {
        return this.type;
    }
}
