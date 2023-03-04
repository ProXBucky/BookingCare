import db from "../models/index"
import bcrypt from 'bcryptjs';


let handleLoginPage = (emailTemp, passwordTemp) => {
    let userData = {}
    return new Promise(async (resolve, reject) => {
        try {
            let isExist = await checkEmailExist(emailTemp);
            var attributes = ['email', 'password', 'roleId'];
            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: emailTemp },
                    raw: "true",
                    attributes: attributes,
                })
                if (user) {
                    const comparePassword = bcrypt.compareSync(passwordTemp, user.password)
                    if (comparePassword) {
                        userData.errCode = 0;
                        userData.message = `This is OK`;
                        delete user.password;   // delete attribute password
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.message = `Password isn't wrong`;
                    }
                } else {
                    userData.errCode = 2;
                    userData.message = `User's not found`;
                }

            } else {
                userData.errCode = 1;
                userData.message = `Email's not exist, please type different email`;
            }
            resolve(userData)
            console.log(userData);
        }
        catch (e) {
            reject(e);
        }
    })
}

let checkEmailExist = (emailTemp) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userExist = await db.User.findOne({
                where: { email: emailTemp }
            })
            if (userExist) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleLoginPage: handleLoginPage,
}
