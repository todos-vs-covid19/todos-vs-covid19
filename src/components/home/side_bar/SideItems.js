import React from 'react';
import TreeView from 'devextreme-react/tree-view';
import {useHistory} from "react-router-dom";
import side_img from '../../../img/side.jpg'
import {items} from './Items'
import './../home.css'

function SideItems() {

    let history = useHistory();

    const onItemClick = (e) => {
        if (e.itemData.text === 'Dashboard') {
          //  history.push("/home/dashboard");
        }
        if (e.itemData.text === "Ingresar datos") {
         //   history.push("/home/datos-hotel");
        }
    };

    const renderTreeViewItem = (item) => {
        return (
            <div style={styles.itemsContainer}>
                <i className={item.icon} style={styles.iconStyles}/>
                <div style={styles.spansContainer}>
                    <span style={styles.spanPricncipal}>{item.text}</span>
                    <span style={styles.spanSecundario}>{item.descripcion}</span>
                </div>
            </div>
        );
    };

    return (
        <div className="list-items" style={styles.containerDiv}>
            <div style={styles.content}>
                <TreeView
                    dataSource={items}
                    hoverStateEnabled={true}
                    onItemClick={onItemClick}
                    itemRender={renderTreeViewItem}
                />
            </div>
        </div>
    )
}

export default SideItems

const styles = {
    containerDiv: {
        width: 232,
        backgroundImage: `url(${side_img})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100%'
    },
    content: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 10
    },

    itemsContainer: {
        height: 50,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottom: 'solid 1px grey',
    },

    spansContainer: {
        height: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    iconStyles: {
        fontSize: 26,
        color: 'white',
        marginRight: 10
    },

    spanPricncipal: {
        color: 'white'
    },

    spanSecundario: {
        color: '#ADA7A9',
        fontSize: 10
    }
};
