import React from "react";
import register from "../../../img/heart.png";
import Form, {
    GroupItem,
    RequiredRule,
    SimpleItem,
    Label,
    CompareRule,
    ButtonItem,
    NumericRule,
    StringLengthRule
} from "devextreme-react/form";
import notify from 'devextreme/ui/notify';
import '../session_styles.css';
import {db} from '../../../firebase/Firebase';
import {useHistory} from "react-router-dom";

function RegisterForm() {

     let history = useHistory();

    const account = {cedula: '', password: ''};

    const buttonOption = {
        text: 'Crear cuenta',
        width: 345,
        useSubmitBehavior: true,
        elementAttr: {id: 'bt-register'},
    };

    const users = db.collection('users');

    const onSubmit = (e) => {
        e.preventDefault();
        users.doc(account.cedula).get()
            .then(function (doc) {
                if (doc.exists) {
                    notify({message: " Esta cuenta ya a sido creada", width: 300,}, "error", 1000);
                } else {
                    users.doc(account.cedula).set({account})
                        .then(function () {
                            history.push('/');
                            notify({message: " Su cuenta a sido creada", width: 300,}, "success", 1500);
                        }).catch(function () {
                        notify({message: "Error", width: 300,}, "error", 700);
                    })
                }
            }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    };

    const passwordComparison = () => {
        return account.password;
    };

    return (
        <div style={styles.formContainer}>
            <div style={styles.imgSpanContainer}>
                <img src={register} alt="" style={{width: 56, height: 56}}/>
                <span style={{fontWeight: 'bold', fontSize: 30}}>TODOS VS EL COVID-19</span>
            </div>
            <div>
                <form action="" onSubmit={onSubmit}>
                    <Form width={550}
                          formData={account}
                          showColonAfterLabel={true}
                          showValidationSummary={true}
                          validationGroup="register"
                    >
                        <GroupItem caption={'Crear cuenta'}>
                            <SimpleItem dataField={'cedula'} editorType="dxTextBox"
                                        label={{text: 'Numero de cedula/Pasaporte'}}>
                                <RequiredRule message="Ingrese su cedula/pasaporte"/>
                                <NumericRule message="Ingrese solo numeros"/>
                                <StringLengthRule message="El numero de cedula debe tener 10 digitos"
                                                  min={10}/>
                            </SimpleItem>

                            <SimpleItem dataField={'password'} editorType="dxTextBox"
                                        editorOptions={{mode: 'password'}} label={{text: 'Contraseña'}}>
                                <RequiredRule message="Ingrese su contraseña"/>
                                <StringLengthRule message="La contraseña debe tener al menos 6 caracteres" min={6}/>
                            </SimpleItem>

                            <SimpleItem editorType="dxTextBox" editorOptions={{mode: 'password'}}>
                                <Label text="Confirmar contraseña"/>
                                <RequiredRule message="Confirmacion requerida"/>
                                <CompareRule message="Las contraseñas no coinciden"
                                             comparisonTarget={passwordComparison}
                                />
                            </SimpleItem>
                            <ButtonItem horizontalAlignment={'right'} buttonOptions={buttonOption} itemType={'button'}
                            />
                        </GroupItem>
                    </Form>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm

const styles = {
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '60%',
    },
    imgSpanContainer: {
        display: 'flex',
        flexDirection: 'column',
    }
};
