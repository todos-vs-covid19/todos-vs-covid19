import React from "react";
import login from '../../../img/login.png'
import '../session_styles.css'
import LoginForm from "./LoginForm";


function Login() {
    return (
        <div className={'main_container'}>
            <div>
                <img src={login} alt={''} style={styles.imgStyles}/>
            </div>
            <div style={styles.formContainer}>
                <LoginForm/>
            </div>
        </div>
    )
}

export default Login

const styles = {
    imgStyles: {
        width: '100%',
        height: '100%'
    },
    formContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
};
