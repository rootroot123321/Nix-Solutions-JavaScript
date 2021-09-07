import React, {useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

import {Header, AppRouter} from './components';
import {check} from "./http/userAPI";
import {setUser, setIsAuth} from "./redux/actions/authorize";

function App() {
    const {isAuth} = useSelector(({authorize}) => authorize);
    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            check().then(() => {
                dispatch(setUser(localStorage.getItem('user') ?? null));
                dispatch(setIsAuth(true));
            });
        }
    }, []);
    return (
        <Router>
            <div className="wrapper">
                <Header isAuth={isAuth}/>
                <AppRouter isAuth={isAuth}/>
            </div>
        </Router>
    );
}

export default App;
