import React from "react";
import {Switch, Route} from "react-router-dom";
import Login from "../components/session/login/Login";
import Register from "../components/session/registro/Register";
import Home from "../components/home/Home";
import {inject, observer} from "mobx-react";

function IndexMain(props) {

    const {CovidStore} = props;

    const session = CovidStore.session;

    return (
        <Switch>
            <Route exact path={"/"} component={Login}/>
            <Route path={"/registro"} component={Register}/>
            <Route path={"/home"} component={Home}/> :
            {/*{session ?
                <Route path={"/home"} component={Home}/> :
                <div>Debe iniciar session para ingresar el sistema </div>
            }*/}
        </Switch>
    )
}

export default inject('CovidStore')(observer(IndexMain))
