import React from "react";import {Drawer} from 'devextreme-react';
import SideItems from "./SideItems";
import {inject, observer} from "mobx-react";

function SideBar(props) {

    const {CovidStore} = props;

    const open_drawer = CovidStore.open_drawer;

    return (
        <div className={'side_bar'}>
            <Drawer opened={open_drawer} openedStateMode={'shrink'} position={"left"} revealMode={"slide"}
                    component={SideItems}>
            </Drawer>
        </div>
    )
}

export default inject('CovidStore')(observer(SideBar));
