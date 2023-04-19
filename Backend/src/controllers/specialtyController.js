import specialtyService from "../services/specialtyService"

let postSpecialtyInformation = async (req, res) => {
    try {
        let respone = await specialtyService.postSpecialtyInformationService(req.body)
        return res.status(200).json(respone)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getAllSpecialty = async (req, res) => {
    try {
        let respone = await specialtyService.getAllSpecialty();
        return res.status(200).json(respone)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

let getDetailSpecialtyById = async (req, res) => {
    try {
        let respone = await specialtyService.getDetailSpecialtyById(req.query.id);
        return res.status(200).json(respone)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

let getDoctorBySpecialtyId = async (req, res) => {
    try {
        let respone = await specialtyService.getDoctorBySpecialtyId(req.query.id);
        return res.status(200).json(respone)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

module.exports = {
    postSpecialtyInformation,
    getAllSpecialty,
    getDetailSpecialtyById,
    getDoctorBySpecialtyId
}