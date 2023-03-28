
import db from "../models";

let getTopDoctorService = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!limit) { limit = 10 }
            let data = await db.User.findAll({
                limit: limit,
                attributes: { exclude: ['password'] },
                order: [['createdAt', 'DESC']],
                where: { roleId: 'R2' },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                ],
                raw: 'true',
                nest: 'true', //Chuyển data từ Allcode theo object
            })
            resolve({
                errCode: 0,
                data: data
            });
        } catch (e) {
            reject(e);
        }
    })
}

let getAllDoctorService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: { exclude: ['password', 'image'] },
                order: [['createdAt', 'DESC']],
            })
            resolve({
                errCode: 0,
                data: data,
            });
        } catch (e) {
            console.log(e);
            reject(e);
        }
    })
}

let postInfoDoctorService = (doctor) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctor.doctorId || !doctor.contentHTML || !doctor.contentMarkdown || !doctor.description || !doctor.action) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter"
                })
            } else {
                if (doctor.action === 'CREATE') {
                    await db.Markdown.create({
                        doctorId: doctor.doctorId,
                        contentHTML: doctor.contentHTML,
                        contentMarkdown: doctor.contentMarkdown,
                        description: doctor.description
                    })
                } else if (doctor.action === 'EDIT') {
                    await db.Markdown.update(
                        {
                            doctorId: doctor.doctorId,
                            contentHTML: doctor.contentHTML,
                            contentMarkdown: doctor.contentMarkdown,
                            description: doctor.description,
                        },
                        { where: { doctorId: doctor.doctorId } }
                    )
                }
            }
            resolve({
                errCode: 0,
                errMessage: "Add information doctor success"
            })
        } catch (e) {
            console.log(e);
            reject(e);
        }
    })
}

let getDetailDoctor = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let data = await db.User.findOne({
                    attributes: { exclude: ['password'] },
                    where: { id: id },
                    include: [
                        { model: db.Markdown, attributes: ['description', 'contentHTML', 'contentMarkdown'] },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    ],
                    raw: 'true',
                    nest: 'true',
                })
                if (data) {
                    let imageBase64 = ''
                    if (data.image) {
                        imageBase64 = new Buffer(data.image, 'base64').toString('Binary');    //decode image avatar from buffer to base64
                    }
                    data.image = imageBase64
                }
                resolve({
                    errCode: 0,
                    data: data
                })

            }
        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    getTopDoctorService: getTopDoctorService,
    getAllDoctorService: getAllDoctorService,
    postInfoDoctorService: postInfoDoctorService,
    getDetailDoctor: getDetailDoctor,
}