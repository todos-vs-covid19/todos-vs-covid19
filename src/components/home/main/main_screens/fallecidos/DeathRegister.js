import React from "react";
import Form, {
    GroupItem,
    SimpleItem,
    StringLengthRule,
    RequiredRule,
    NumericRule,
    ButtonItem
} from "devextreme-react/form";
import notify from 'devextreme/ui/notify';
import { inject, observer } from "mobx-react";
import { db } from '../../../../../firebase/Firebase'

function DeathRegister(props) {

    const { CovidStore } = props;

    const id_user = CovidStore.id_user;

    const fallecido = { cedula: '', nombres: '', apellidos: '', edad: '', direccion: '', observacion: '' };

    const buttonOption = {
        text: 'Registrar fallecimiento',
        width: 200,
        useSubmitBehavior: true,
        elementAttr: { id: 'bt-register' },
    };

    // Creacion de coleccion
    const users = db.collection('users');

    // Guardar paciente
    const onSubmit = e => {
        e.preventDefault();

        users.doc(id_user).update({ fallecidos: [fallecido] })
            .then(function () {
                notify({ message: "Gracias por el registro del nuevo paciente", width: 300, }, "success", 1500);
            })
    }

    return (
        <main>
            <div style={styles.formContainer}>
                <h1 style={{ 'textAlign': 'center' }}>Registrar persona fallecida</h1>

                <form action="" onSubmit={onSubmit}>
                    <Form width={500}
                        formData={fallecido}
                        validationGroup="Register"
                    >
                        <GroupItem caption={''}>
                            <SimpleItem dataField={'cedula'} editorType="dxTextBox"
                                label={{ text: 'Cédula/Pasaporte' }}>
                                <RequiredRule message="Ingrese la cédula/pasaporte" />
                                <NumericRule message="Ingrese solo número" />
                                <StringLengthRule message="El número de cédula debe tener 10 dígitos"
                                    min={10} />
                            </SimpleItem>

                            <SimpleItem dataField={'nombres'} editorType="dxTextBox"
                                label={{ text: 'Nombres' }}>
                                <RequiredRule message="Ingrese los nombres" />
                                <StringLengthRule message="El nombre debe tener mínimo tres letras"
                                    min={3} />
                            </SimpleItem>

                            <SimpleItem dataField={'apellidos'} editorType="dxTextBox"
                                label={{ text: 'Apellidos' }}>
                                <RequiredRule message="Ingrese los apellidos" />
                                <StringLengthRule message="El apellido debe tener mínimo tres letras"
                                    min={3} />
                            </SimpleItem>

                            <SimpleItem dataField={'edad'} editorType="dxTextBox"
                                label={{ text: 'Edad' }}>
                                <RequiredRule message="Ingrese la edad" />
                                <NumericRule message="Ingrese solo números" />
                                <StringLengthRule message="Es necesario registrar la edad"
                                    min={0} />
                            </SimpleItem>

                            <SimpleItem dataField={'direccion'} editorType="dxTextBox"
                                label={{ text: 'Dirección' }}>
                                <RequiredRule message="Ingrese su dirección" />
                            </SimpleItem>

                            <SimpleItem dataField={'observacion'} editorType="dxTextBox"
                                label={{ text: 'Observación' }}>
                                <RequiredRule message="Ingrese la observación" />
                            </SimpleItem>

                            <ButtonItem horizontalAlignment={'center'} buttonOptions={buttonOption} itemType={'button'} />
                        </GroupItem>
                    </Form>
                </form>
            </div>
        </main>
    )
}

export default (inject('CovidStore'))(observer(DeathRegister))

const styles = {
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: 500,
        justifyContent: 'space-between',
        margin: 'auto'
    }
};
