export const setIsAuth = (isAuth: boolean) => ({
    type: 'SET_IS_AUTH',
    payload: isAuth
});

export const setUser = (user: string) => ({
    type: 'SET_USER',
    payload: user
});