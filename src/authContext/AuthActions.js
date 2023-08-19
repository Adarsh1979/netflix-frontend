export const loginStart = () => ({
    type: "LOGIN_START"
});

export const loginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user
});

export const loginFailure = () => ({
    type: "LOGIN_FAILURE"
});


// LOGOUT   // yet to be implemented

export const logout = () => ({
    type: "LOGOUT"
});