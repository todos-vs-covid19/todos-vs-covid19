import {action, decorate, observable} from 'mobx';

class CovidStore {
    constructor() {
        this.open_drawer = true;
        this.id_user = '';
        this.personal_data = {};
        this.session = false;
        this.verifyAccount = false;
    }

    getStateOpenDrawer = (state) => {
        this.open_drawer = state;
    };

    getIdUser = (id) => {
        this.id_user = id
    };

    getPersonalData = (data) => {
        this.personal_data = data
    };

    getStateSession = (state) => {
        this.session = state;
    };


}

decorate(CovidStore, {
    open_drawer: observable,
    id_user: observable,
    personal_data: observable,
    session: observable,

    getStateOpenDrawer: action,
    getIdUser: action,
    getPersonalData: action,
    getStateSession: action,

});

const covidStore = new CovidStore();

export default covidStore

