import React, {useEffect} from "react";
import './step.css'
import {inject, observer} from "mobx-react";

function StepsForm(props) {

    const {DatosHotelStore} = props;

    const height_datos = DatosHotelStore.height_datos;
    const height_services = DatosHotelStore.height_services;
    const height_roomsGallery = DatosHotelStore.height_roomsGallery;
    const complete_datos = DatosHotelStore.complete_datos;
    const completed_services = DatosHotelStore.completed_services;
    const hotel_data = DatosHotelStore.hotel_data;

    useEffect(() => {
        if (hotel_data) {
            DatosHotelStore.getCompleteDatosValue('100%')
        }
    }, [hotel_data]);

    const height = height_datos + height_services ;

    console.log(height)

    return (
        <div style={{height: height}} className={'steps'}>
            <i className="fas fa-circle"/>
            <div className="progress progress-bar-vertical" style={{height: height_datos}}>
                <div className="progress-bar" role="progressbar" style={{height: complete_datos}}/>
            </div>
            {(complete_datos === '100%') ? <i className="fas fa-check-circle"/> : <i className="far fa-circle"/>}

            {(complete_datos === '100%') ?
                <div className={'steps'} style={{height: height_services, background: 'red'}}>
                    <div className="progress progress-bar-vertical" style={{height: height_services}}>
                        <div className="progress-bar" role="progressbar" style={{height: completed_services}}/>
                    </div>
                    {(completed_services === '100%') ? <i className="fas fa-check-circle"/> :
                        <i className="far fa-circle"/>}
                </div> : <div>33%</div>
            }

            {(completed_services === '100%') ?
                <div className={'steps'}>
                    <div className="progress progress-bar-vertical" style={{height: height_roomsGallery}}>
                        <div className="progress-bar" role="progressbar" style={{height: '0%'}}/>
                    </div>
                    {(completed_services === '100%') ? <i className="fas fa-check-circle"/> :
                        <i className="far fa-circle"/>}
                </div> : <div>66%</div>
            }
        </div>

    )
}

export default inject('DatosHotelStore')(observer(StepsForm))
