import React, {useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

import {Header, AppRouter} from './components';
import {check} from "./http/userAPI";
import {setUser, setIsAuth} from "./redux/actions/authorize";

function App() {
    const {user, isAuth} = useSelector(({authorize}) => authorize);
    const dispatch = useDispatch();
    useEffect(() => {
        check().then(() => {
            dispatch(setUser(user));
            dispatch(setIsAuth(true));
        });
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