import React from "react";
import Toolbar, {Item} from 'devextreme-react/toolbar';
import logo from '../../../img/heart.png'
import {inject, observer} from "mobx-react";
import {Button} from 'devextreme-react/button'
import {useHistory} from "react-router-dom";


function Header(props) {

    const {CovidStore} = props;

    let history = useHistory();

    const open_drawer = CovidStore.open_drawer;

    const openDrawer = () => {
        CovidStore.getStateOpenDrawer(!open_drawer)
    };

    const menuButton = {
        icon: 'menu',
        onClick: () => openDrawer()
    };

    const renderLogo = () => {
        return (
            <div style={styles.logoContainer}>
                <span style={{fontWeight: 'bold', fontSize: 12, color: 'white'}}>Bienvenido Julio</span>
            </div>
        )
    };

    const renderButton = () => {
        return (
            <i className="fas fa-sign-out-alt" style={{fontSize: 18, color: '#FF415B'}}/>
        );
    };

    const logOutSystem = () => {
        CovidStore.getStateSession(false);
        history.push("/")
    };

    const logOut = () => {
        return (
            <Button
                style={styles.styleButtons}
                onClick={logOutSystem}
                render={renderButton}
            />
        )
    };

    const renderTitle = () => {
        return (
            <div style={styles.titleContainer}>
                <img src={logo} alt="" style={{width: 24, height: 24}}/>
                <span style={{
                    fontSize: 14,
                    marginLeft: 7,
                    fontWeight: 700,
                    color: 'white'
                }}>TODOS VS COVID-19 SYSTEM</span>
            </div>
        )
    };

    return (
        <header>
            <div className={"dx-swatch-dark"}>
                <Toolbar style={styles.toolbarStyles}>
                    <Item widget={'dxButton'} location={'before'} options={menuButton}/>
                    <Item location={'before'} render={renderLogo}/>
                    <Item location={'before'} render={renderTitle}/>
                    <Item location={'after'} render={logOut}/>
                </Toolbar>
            </div>
        </header>
    )
}

export default (inject('CovidStore'))(observer(Header))

const styles = {
    toolbarStyles: {
        height: 50,
        padding: '7px 10px',
        background: 'black'
    },
    logoContainer: {
        borderRight: 'solid 1px #42393E',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 180
    },
    titleContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },

    styleButtons: {
        background: 'black',
        borderWidth: 0
    }
};
