import React from 'react';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {render} from "react-dom";
import {BrowserRouter as Router} from 'react-router-dom'

render(<Router>
        <App/>
    </Router>,
    document.getElementById("root")
);

serviceWorker.unregister();
