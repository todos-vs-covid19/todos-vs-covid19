import React from 'react';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.carmine.css';
import {Provider} from 'mobx-react';
import IndexMain from "./routes/IndexMain";
import CovidStore from "./store/CovidStore";
import SymptomsStore from "./store/SymptomsStore";

function App() {
    return (
        <Provider CovidStore={CovidStore} SymptomsStore={SymptomsStore}>
            <IndexMain/>
        </Provider>
    );
}

export default App;
