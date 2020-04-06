import React from 'react';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.carmine.css';
import {Provider} from 'mobx-react';
import IndexMain from "./routes/IndexMain";
import CovidStore from "./store/CovidStore";

function App() {
    return (
        <Provider CovidStore={CovidStore}>
            <IndexMain/>
        </Provider>
    );
}

export default App;
