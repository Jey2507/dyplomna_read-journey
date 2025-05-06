export const initialStateConstant = {
    name: null,
    token: localStorage.getItem('token') || null,
    isLoggedIn: false,
    isRefreshing: false,
    error: null,
}