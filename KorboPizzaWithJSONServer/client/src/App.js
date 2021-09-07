import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import {Header, AppRouter} from './components';
import {setUser, setIsAuth} from "./redux/actions/authorize";

function App() {
    const {isAuth} = useSelector(({authorize}) => authorize);
    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(setUser(localStorage.getItem('user') ?? null));
            dispatch(setIsAuth(true));
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
