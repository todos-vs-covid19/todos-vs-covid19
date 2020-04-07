import React, {useEffect, useState} from "react";
import Form, {
    ButtonItem,
    GroupItem,
    NumericRule,
    RequiredRule,
    SimpleItem,
    StringLengthRule
} from "devextreme-react/form";
import {inject, observer} from "mobx-react";
import {db} from '../../../../../firebase/Firebase'

function NewRegister(props) {

    const {CovidStore, SymptomsStore} = props;
    const [symptoms, setSymptoms] = useState({});

    const id_user = CovidStore.id_user;
    const covid_symptoms_another_patient = SymptomsStore.covid_symptoms_another_patient;

    const buttonOption = {
        text: 'Registrar paciente',
        width: 200,
        useSubmitBehavior: true,
        elementAttr: {id: 'bt-register'},
    };


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
        setSymptoms({...objt})
    }, []);

    // Creacion de coleccion
    const patient_register = db.collection('patient_register');

    // Guardar paciente
    const onSubmit = e => {
        e.preventDefault();
        const newPatient = {...covid_symptoms_another_patient};
        newPatient.id_user = id_user;

        //  console.log(new_patient)
        patient_register.doc(covid_symptoms_another_patient.cedula).set({data: newPatient})
            .then(function () {
                console.log('registrado')
            })
    };

    return (
        <div>
            <div style={styles.formContainer}>
                <form action="" onSubmit={onSubmit}>
                    <Form width={'100%'}
                          formData={covid_symptoms_another_patient}
                          validationGroup="Register"
                          showValidationSummary={true}
                    >
                        <GroupItem caption={'Registrar otro paciente'}>

                            <GroupItem colCount={3} caption={'Sintomas'}>
                                {Object.entries(symptoms).map(items => {
                                    return (
                                        <SimpleItem key={items} dataField={items[0]} editorType="dxCheckBox"/>
                                    )
                                })}
                            </GroupItem>

                            <GroupItem caption={'Datos'}>
                                <SimpleItem dataField={'cedula'} editorType="dxTextBox"
                                            label={{text: 'Cédula/Pasaporte'}}>
                                    <RequiredRule message="Ingrese la cédula/pasaporte"/>
                                    <NumericRule message="Ingrese solo número"/>
                                    <StringLengthRule message="El número de cédula debe tener 10 dígitos"
                                                      min={10}/>
                                </SimpleItem>

                                <SimpleItem dataField={'nombres'} editorType="dxTextBox">
                                    <RequiredRule message="Ingrese los nombres"/>
                                    <StringLengthRule message="El nombre debe tener mínimo tres letras"
                                                      min={3}/>
                                </SimpleItem>

                                <SimpleItem dataField={'apellidos'} editorType="dxTextBox">
                                    <RequiredRule message="Ingrese los apellidos"/>
                                    <StringLengthRule message="El apellido debe tener mínimo tres letras"
                                                      min={3}/>
                                </SimpleItem>

                                <GroupItem colCount={2}>
                                    <SimpleItem dataField={'edad'} editorType="dxTextBox">
                                        <RequiredRule message="Ingrese la edad"/>
                                        <NumericRule message="Ingrese solo números"/>
                                        <StringLengthRule message="Es necesario registrar la edad"
                                                          min={0}/>
                                    </SimpleItem>

                                    <SimpleItem dataField={'telefono'} editorType="dxTextBox">
                                        <RequiredRule message="Ingrese lel numero de telefono"/>
                                        <NumericRule message="Ingrese solo números"/>
                                    </SimpleItem>
                                </GroupItem>
                                <SimpleItem dataField={'direccion'} editorType="dxTextBox">
                                    <RequiredRule message="Ingrese su dirección"/>
                                </SimpleItem>

                            </GroupItem>

                            <ButtonItem horizontalAlignment={'center'} buttonOptions={buttonOption}
                                        itemType={'button'}/>
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
        margin: 'auto',
        padding: 15
    }
};
