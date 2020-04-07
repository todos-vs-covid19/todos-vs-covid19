import {action, decorate, observable} from 'mobx';
import {symptoms, symptoms_another_patient} from './SymptomsItems'

class SymptomsStore {
    constructor() {
        this.covid_symptoms = symptoms;
        this.covid_symptoms_another_patient = symptoms_another_patient
    }

    getCovidSymptomsDrawer = (symptoms) => {
        this.covid_symptoms = symptoms;
    };

    getCovidSymptomsAnotherPatient = (symptoms) => {
        this.covid_symptoms_another_patient = symptoms
    }
}

decorate(SymptomsStore, {
    covid_symptoms: observable,
    covid_symptoms_another_patient: observable,

    getCovidSymptomsDrawer: action,
    getCovidSymptomsAnotherPatient : action,
});

const symptomsStore = new SymptomsStore();

export default symptomsStore

