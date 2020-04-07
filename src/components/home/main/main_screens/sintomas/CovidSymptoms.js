import React from "react";
import {inject, observer} from "mobx-react";
import './symptoms.css'
import SymptomsItems from "./SymptomsItems";

function CovidSymptoms(props) {

    const {SymptomsStore} = props;

    return (
        <div className={'symptoms-container'}>
            <div style={{width: '100%', background:'white'}}>
                <SymptomsItems/>
            </div>

            <div style={{width: '100%', background:'white'}}>Ubicacion</div>
        </div>
    )
}

export default inject('SymptomsStore')(observer(CovidSymptoms))
