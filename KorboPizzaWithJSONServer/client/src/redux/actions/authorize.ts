import axios from 'axios';

export const setIsAuth = (isAuth: boolean) => ({
    type: 'SET_IS_AUTH',
    payload: isAuth
});

export const setUser = (user: string) => ({
    type: 'SET_USER',
    payload: user
});

export const registration = async (email, password) => {
    let data;
    await axios.post('http://localhost:3002/register', {email, password})
        .then(res => data = res.data)
        .catch(e => {
            throw new Error(e.response.data);
        });
    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('user', email);
    return data;
};

export const login = async (email, password) => {
    let data;
    await axios.post('http://localhost:3002/login', {email, password})
        .then(res => data = res.data)
        .catch(e => {
            throw new Error(e.response.data);
        });
    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('user', email);
    return data;
}