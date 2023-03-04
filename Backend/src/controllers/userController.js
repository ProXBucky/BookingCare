import userService from "../services/userService"

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Not enough peremeter',
            user: {}
        })
    }
    else {
        let userData = await userService.handleLoginPage(email, password);
        return res.status(200).json({
            errCode: userData.errCode,
            message: userData.message,
            user: userData.user
        })

    }
}

module.exports = {
    handleLogin: handleLogin
}