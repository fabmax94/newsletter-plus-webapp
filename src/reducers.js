

const authReducer = (state, { type, auth }) => {
    switch (type) {
        case 'login':
            localStorage["token"] = auth.token;
            localStorage["user"] = auth.username;
            return {
                username: auth.username,
                token: auth.token
            };
        case 'logout':
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            return {
                username: null,
                token: null
            };
        default:
            return state;
    }
};


export { authReducer };