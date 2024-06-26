
export class DataManager {
    constructor(keySession) {
            this.keySession = keySession;
            this.dbSession = JSON.parse(localStorage.getItem(keySession)) || [];
    }

    create(objPersona) {
            this.dbSession.push(objPersona);
            localStorage.setItem(this.keySession, JSON.stringify(this.dbSession));
    }

    read() {
            return this.dbSession;
    }
    update(collection) {
            localStorage.setItem(this.keySession, JSON.stringify(collection));
    }

    deleteAll() {
            localStorage.clear(this.keySession);
            this.dbSession = [];
    }

    deletePerson(index) {
            this.dbSession.splice(index, 1);
            //localStorage.removeItem(id);
            // Actualizar la sesión de almacenamiento con la versión actualizada de this.dbSession
            localStorage.setItem(this.keySession, JSON.stringify(this.dbSession));
    }
}   
