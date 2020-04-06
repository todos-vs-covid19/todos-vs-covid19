import React from "react";
import LoginIcon from '../../../img/heart.png'
import Form, {
    ButtonItem,
    GroupItem,
    SimpleItem,
    RequiredRule,
    NumericRule,
    StringLengthRule
} from 'devextreme-react/form';
import {useHistory} from "react-router-dom";
import {db} from "../../../firebase/Firebase";
import notify from "devextreme/ui/notify";
import {inject, observer} from "mobx-react";

const login = {'cedula': '', 'password': '',};

function LoginForm(props) {

    const {CovidStore} = props;

    let history = useHistory();

    const buttonOption = {
        text: 'Iniciar',
        elementAttr: {id: 'bt-session'},
        width: 305,
        useSubmitBehavior: true,
    };

    const goRegister = () => {
        return (
            history.push('/registro')
        );
    };

    const users = db.collection('users');

    const onSubmit = (e) => {
        e.preventDefault();

        users.doc(login.cedula).get()
            .then(function (doc) {
                if (doc.exists) {
                    const password = doc.data().account.password;
                    if (password === login.password) {
                        CovidStore.getIdUser(login.cedula);
                        CovidStore.getStateSession(true);
                        history.push('/home');
                        notify({message: "Bienvenido", width: 300,}, "success", 1000);
                    } else {
                        notify({message: "Password incorrecto", width: 300,}, "error", 1000);
                    }
                } else {
                    notify({message: "No existe una cuenta con este numero de cedula", width: 300,}, "error", 1500);
                }
            })
    };

    return (
        <div style={styles.formContainer}>
            <div style={styles.imgSpanContainer}>
                <img src={LoginIcon} alt="" style={{width: 64, height: 64}}/>
                <span style={{fontWeight: 'bold', fontSize: 30}}>Bienvenido</span>
            </div>
            <div>
                <form action="" onSubmit={onSubmit}>
                    <Form width={512}
                          formData={login}
                          showColonAfterLabel={true}
                          showValidationSummary={true}
                          validationGroup="login"
                    >
                        <GroupItem caption={'Iniciar session'}>
                            <SimpleItem dataField={'cedula'} editorType="dxTextBox"
                                        label={{text: 'Numero de cedula/Pasaporte'}}>
                                <RequiredRule message="Ingrese su cedula/pasaporte"/>
                                <NumericRule message="Ingrese solo numeros"/>
                                <StringLengthRule message="El numero de cedula debe tener 10 digitos"
                                                  min={10}/>
                            </SimpleItem>
                            <GroupItem>

                            </GroupItem>
                            <SimpleItem dataField={'password'} editorType="dxTextBox"
                                        editorOptions={{mode: 'password'}} label={{text: 'Contraseña'}}>
                                <RequiredRule message="Ingrese su contraseña"/>
                            </SimpleItem>
                            <GroupItem>
                                <div style={styles.recoverContainer}>
                                    <span style={{cursor: 'pointer', fontSize: 12, color: "#575A89"}}>
                                        Olvido su contraseña ?
                                    </span>
                                </div>
                            </GroupItem>
                        </GroupItem>
                        <ButtonItem horizontalAlignment={'right'} buttonOptions={buttonOption} itemType={'button'}/>
                    </Form>
                </form>
            </div>
            <div style={styles.createAccountContainer}>
                <span style={{color: 'gray', fontSize: 12, marginLeft: 50,}}>Aun no tienes una cuenta ?
                <span style={styles.spanCreateAccount} onClick={goRegister}>Crear</span>
                </span>
            </div>
        </div>
    )
}

export default (inject('CovidStore'))(observer(LoginForm))

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
    },

    recoverContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: 7,
    },

    createAccountContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 75
    },

    spanCreateAccount: {
        cursor: 'pointer',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 5,
        color: "#E50058",
    }
}
