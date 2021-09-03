import React, {useEffect, useRef, useState} from 'react';
import {useFormik} from 'formik';
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as yup from 'yup';

import {REGISTRATION_ROUTE, LOGIN_ROUTE, HOME_ROUTE} from "../utils/constants";
import {login, registration} from "../http/userAPI";
import {setUser, setIsAuth} from "../redux/actions/authorize";

const validationSchema = yup.object({
    email: yup
        .string('Введите свой email')
        .email('Введите действительный email')
        .required('Email обязателен'),
    password: yup
        .string('Введите свой пароль')
        .min(8, 'Пароль должен состоять из 8 символов минимум')
        .required('Пароль обязателен'),
});


const Auth = () => {
    const location = useLocation();
    const history = useHistory();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const formRef = useRef(null);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema
    });

    useEffect( () => {
        handleClick().then(res => console.log(res));
        async function handleClick() {
            if (email !== '' && password !== '') {
                try {
                    let user;
                    if (isLogin) {
                        user = await login(email, password);
                    } else {
                        user = await registration(email, password);
                        console.log(user);
                    }
                    dispatch(setUser(user));
                    dispatch(setIsAuth(true));
                    history.push(HOME_ROUTE);
                } catch (e) {
                    alert(e.response.data.message);
                }
            }
        }
    }, [email, password]);

    const click = async () => {
        const form = formRef.current;
        setEmail(form[0].value);
        setPassword(form[1].value);
    }

    return (
        <div className="content">
            <div className="container">
                <div className="authorization">
                    <h2>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                    <form ref={formRef} onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            type="email"
                            name="email"
                            label="Пароль"
                            placeholder="Введите email..."
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}/>
                        <TextField
                            fullWidth
                            type="password"
                            name="password"
                            label="Пароль"
                            placeholder="Введите пароль..."
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}/>
                        {isLogin
                            ?
                            <span>
                                    Нет аккаунта?
                                    <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь</NavLink>
                                </span>
                            :
                            <span>
                                    Есть аккаунт?
                                    <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
                                </span>
                        }
                        <Button
                            fullWidth
                            color="primary"
                            variant="contained"
                            type="submit"
                            onClick={formik.errors.password ? formik.handleSubmit : click}>
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Auth;