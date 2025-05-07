export const initialStateConstant = {
    user: {
        name: null,
        email: null,
    },
    token: localStorage.getItem('token') || null,
    refreshToken: null,
    isLoggedIn: false,
    isRefreshing: false,
    error: null,
}