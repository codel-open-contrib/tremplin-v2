import axios from "axios";
import app from "./Api";

export class Publication {
    protected url: string;
    public constructor(entity: string) {
        this.url = app.url + entity;
    }
    public creerPublication(uid:number, data: any) {
        const init = axios.post(this.url + "/" + uid, data);
        return init;
    }
    public obtenirListePublication() {
        const init = axios.get(this.url);
        return init;
    }
    public obtenirPublication(ref: number) {
        const init = axios.get(this.url + "/" + ref);
        return init;
    }
    public modifierPublication(ref: number, data: any) {
        const init = axios.put(this.url + "/" + ref, data);
        return init;
    }
    public supprimerPublication(ref: number) {
        const init = axios.delete(this.url + "/" + ref);
        return init;
    }
}

export class Catalogue extends Publication {
    public constructor() {
        super("catalogue");
    }
}

export class Annonce extends Publication {
    public constructor() {
        super("annonce");
    }
}