import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import {Header, AppRouter} from './components';

function App() {
    return (
        <Router>
            <div className="wrapper">
                <Header/>
                <AppRouter/>
            </div>
        </Router>
    );
}

export default App;
