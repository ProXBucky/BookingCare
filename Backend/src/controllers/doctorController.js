import { response } from "express"
import doctorService from "../services/doctorService"
let getTopDoctor = async (req, res) => {
    try {
        let limit = req.query.limit
        let response = await doctorService.getTopDoctorService(+limit)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        })
    }

}

let getAllDoctor = async (req, res) => {
    try {
        let response = await doctorService.getAllDoctorService()
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

let postInfoDoctor = async (req, res) => {
    try {
        let response = await doctorService.postInfoDoctorService(req.body);
        return res.status(200).json(response);

    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

let getDetailDoctorById = async (req, res) => {
    try {
        let response = await doctorService.getDetailDoctor(req.query.id);
        return res.status(200).json(response)

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}


module.exports = {
    getTopDoctor: getTopDoctor,
    getAllDoctor: getAllDoctor,
    postInfoDoctor: postInfoDoctor,
    getDetailDoctorById: getDetailDoctorById,
}