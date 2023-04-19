import db from "../models"

let postSpecialtyInformationService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.nameSpecialty || !data.imgSpecialty || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
            else {
                await db.Specialty.create({
                    name: data.nameSpecialty,
                    image: data.imgSpecialty,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Create specialty information success'
                })

            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll();
            resolve({
                errCode: 0,
                data: data ? data : {},
                errMessage: "Get data success"
            })

        } catch (e) {
            reject(e);
        }
    })
}

let getDetailSpecialtyById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let data = await db.Specialty.findOne({
                    where: { id: id },
                    attributes: { include: ['name', 'id', 'descriptionHTML'] },
                })
                resolve({
                    errCode: 0,
                    errMessage: "Get data success",
                    data: data ? data : {},
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getDoctorBySpecialtyId = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let data = await db.Doctor_Info.findAll({
                    where: { specialtyId: id },
                    attributes: ['doctorId'],
                })
                resolve({
                    errCode: 0,
                    errMessage: "Get data success",
                    data: data ? data : {},
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    postSpecialtyInformationService,
    getAllSpecialty,
    getDetailSpecialtyById,
    getDoctorBySpecialtyId
}