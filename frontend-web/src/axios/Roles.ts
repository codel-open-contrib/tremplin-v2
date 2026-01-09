import axios from "axios";
import app from "./Api";
import { Annonce, Catalogue } from "./Publication";

export class Utilisateur {
    private utilisateur = app.url + 'utilisateur';
    private catalogue = new Catalogue();
    private annonce = new Annonce();
    
    public creerCompte(data: any) {
        const init = axios.post(this.utilisateur, data);
        return init;
    }
    public obtenirListeUtilisateur() {
        const init = axios.get(this.utilisateur);
        return init;
    }
    public obtenirUtilisateur(uid: number) {
        const init = axios.get(this.utilisateur + "/" + uid);
        return init;
    }
    public existe(email: string) {
        const init = axios.get(this.utilisateur + "/check/" + email);
        return init;
    }
    public supprimerUtilisateur(uid: number) {
        const init = axios.delete(this.utilisateur + "/" + uid);
        return init;
    }
    public modifierUtilisateur(uid: number, data: any) {
        const init = axios.put(this.utilisateur + "/" + uid, data);
        return init;
    }
    public seConnecter(data: any) {
        const init = axios.post(this.utilisateur + "/login", data);
        return init;
    }
    public publierCatalogue(uid:number, data: any) {
        return this.catalogue.creerPublication(uid, data);
    }
    public obtenirListeCatalogue() {
        return this.catalogue.obtenirListePublication();
    }
    public obtenirCatalogue(ref: number) {
        return this.catalogue.obtenirPublication(ref);
    }
    public modifierCatalogue(ref: number, data: any) {
        return this.catalogue.modifierPublication(ref, data);
    }
    public supprimerCatalogue(ref: number) {
        return this.catalogue.supprimerPublication(ref);
    }
    public creerAnnonce(uid:number, data: any) {
        return this.annonce.creerPublication(uid, data);
    }
    public obtenirListeAnnonce() {
        return this.annonce.obtenirListePublication();
    }
    public obtenirAnnonce(ref: number) {
        return this.annonce.obtenirPublication(ref);
    }
    public modifierAnnonce(ref: number, data: any) {
        return this.annonce.modifierPublication(ref, data);
    }
    public supprimerAnnonce(ref: number) {
        return this.annonce.supprimerPublication(ref);
    }
}