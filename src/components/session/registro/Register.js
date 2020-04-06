import React from "react";
import register from '../../../img/register.png'
import '../session_styles.css'
import RegisterForm from "./RegisterForm";

function Register() {
    return (
        <div className={'main_container'}>
            <div>
                <img src={register} alt={'todos vs covid-19'} style={styles.imgStyles}/>
            </div>
            <div style={styles.formContainer}>
              <RegisterForm/>
            </div>
        </div>
    )
}

export default Register

const styles = {
    imgStyles: {
        width: '100%',
        height: '100%'
    },
    formContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
};
