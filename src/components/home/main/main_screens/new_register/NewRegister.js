import React, { useEffect, useState } from "react";
import Form, {
    ButtonItem,
    GroupItem,
    NumericRule,
    RequiredRule,
    SimpleItem,
    StringLengthRule
} from "devextreme-react/form";
import { inject, observer } from "mobx-react";
import { db } from '../../../../../firebase/Firebase'
import notify from "devextreme/ui/notify";
import { covid_symptoms_another_patient_init } from './SymptomsItems'
import Map from '../mapUSER/Map'

function NewRegister(props) {

    const { CovidStore, SymptomsStore } = props;
    const [symptoms, setSymptoms] = useState({});

    const id_user = CovidStore.id_user;
    const covid_symptoms_another_patient = SymptomsStore.covid_symptoms_another_patient;

    const buttonOption = {
        text: 'Registrar paciente',
        width: 200,
        useSubmitBehavior: true,
        elementAttr: { id: 'bt-register' },
    };

    let marker = null;

    // Detect for initial market, not requiered move market in map
    navigator.geolocation.getCurrentPosition(position => {

        const { latitude, longitude } = position.coords;
        marker = { latitude, longitude };

    },
        error => console.log('error position: ' + error.message)
    );

    const setPosition = (pos) => {
        marker = pos;
    }

    useEffect(() => {
        const array = [];
        const obj = Object.entries(covid_symptoms_another_patient)
        obj.forEach(items => {
            const value = (items[1]);
            if ((typeof (value) === "boolean")) {
                array.push(items)
            }
        });
        const objt = Object.fromEntries(array);
        setSymptoms({ ...objt })
    }, []);

    // Creacion de coleccion
    const patient_register = db.collection('patient_register');

    // Guardar paciente
    const onSubmit = e => {
        e.preventDefault();
        const newPatient = { ...covid_symptoms_another_patient };
        newPatient.id_user = id_user;


        if (covid_symptoms_another_patient.fiebre || covid_symptoms_another_patient.congestión_nasal) {
            marker.tipo = 0;
        } else if (covid_symptoms_another_patient.diarrea || covid_symptoms_another_patient.tos_seca) {
            marker.tipo = 1;
        } else if (covid_symptoms_another_patient.dificultad_para_respirar_ahogo || covid_symptoms_another_patient.escalofríos) {
            marker.tipo = 2;
        } else if (covid_symptoms_another_patient.cansancio_malestar_general || covid_symptoms_another_patient.dolores_musculares) {
            marker.tipo = 3;
        } else {
            marker.tipo = 4;
        }

        newPatient.marker = marker;

        //  console.log(new_patient)
        patient_register.doc(covid_symptoms_another_patient.cedula).get()
            .then(function (doc) {
                if (doc.exists) {
                    notify({ message: " Este paciente ya a sido registrado", width: 300, }, "error", 1000);
                } else {
                    patient_register.doc(covid_symptoms_another_patient.cedula).set({ data: newPatient })
                        .then(function () {
                            SymptomsStore.getCovidSymptomsAnotherPatient(covid_symptoms_another_patient_init);
                            notify({ message: "Paciente registrado", width: 300, }, "success", 1500);
                        })
                }
            }).catch(function () {
                notify({ message: "Error", width: 300, }, "error", 700);
            })
    };

    return (
        <div>
            <div style={styles.formContainer}>
                <form action="" onSubmit={onSubmit}>
                    <Form width={'100%'}
                        formData={covid_symptoms_another_patient}
                        validationGroup="Register"
                        showColonAfterLabel={true}
                        showValidationSummary={true}
                    >
                        <GroupItem caption={'Registrar otro paciente'} colCount={2}>
                            <GroupItem>
                                <GroupItem colCount={3} caption={'Sintomas'}>
                                    {Object.entries(symptoms).map(items => {
                                        return (
                                            <SimpleItem key={items} dataField={items[0]} editorType="dxCheckBox" />
                                        )
                                    })}
                                </GroupItem>
                                <GroupItem caption={'Datos'}>
                                    <SimpleItem dataField={'cedula'} editorType="dxTextBox"
                                        label={{ text: 'Cédula/Pasaporte' }}>
                                        <RequiredRule message="Ingrese la cédula/pasaporte" />
                                        <NumericRule message="Ingrese solo número" />
                                        <StringLengthRule message="El número de cédula debe tener 10 dígitos"
                                            min={10} />
                                    </SimpleItem>

                                    <SimpleItem dataField={'nombres'} editorType="dxTextBox">
                                        <RequiredRule message="Ingrese los nombres" />
                                        <StringLengthRule message="El nombre debe tener mínimo tres letras"
                                            min={3} />
                                    </SimpleItem>

                                    <SimpleItem dataField={'apellidos'} editorType="dxTextBox">
                                        <RequiredRule message="Ingrese los apellidos" />
                                        <StringLengthRule message="El apellido debe tener mínimo tres letras"
                                            min={3} />
                                    </SimpleItem>

                                    <GroupItem colCount={2}>
                                        <SimpleItem dataField={'edad'} editorType="dxTextBox">
                                            <RequiredRule message="Ingrese la edad" />
                                            <NumericRule message="Ingrese solo números" />
                                            <StringLengthRule message="Es necesario registrar la edad"
                                                min={0} />
                                        </SimpleItem>

                                        <SimpleItem dataField={'telefono'} editorType="dxTextBox">
                                            <RequiredRule message="Ingrese lel numero de telefono" />
                                            <NumericRule message="Ingrese solo números" />
                                        </SimpleItem>
                                    </GroupItem>
                                    <SimpleItem dataField={'direccion'} editorType="dxTextBox">
                                        <RequiredRule message="Ingrese su dirección" />
                                    </SimpleItem>
                                </GroupItem>
                            </GroupItem>
                            <GroupItem caption={'Mapa'}>

                                <Map
                                    setPosition={setPosition}
                                />

                            </GroupItem>

                            <ButtonItem horizontalAlignment={'center'} buttonOptions={buttonOption}
                                itemType={'button'} />
                        </GroupItem>
                    </Form>
                </form>
            </div>
        </div>
    )
}

export default (inject('CovidStore', 'SymptomsStore'))(observer(NewRegister))

const styles = {
    formContainer: {
        width: '70%',
        margin: '10px',
        padding: 15
    }
};
