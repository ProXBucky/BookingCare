import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages, CRUD_METHOD } from "../../../utils"
import * as actions from '../../../store/actions'
import './ManageDoctor.scss'
import { getDetailDoctorByIdService } from "../../../services/userService"

import Select from 'react-select';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt



class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorSelected: '',
            priceSelected: '',
            paymentSelected: '',
            provinceSelected: '',
            contentHTML: '',
            contentMarkdown: '',
            description: '',
            clinicName: '',
            clinicAddress: '',
            note: '',
            doctorArr: [],
            hasOldData: false,
            action: '',
            priceArr: [],
            paymentArr: [],
            provinceArr: [],
        }
    }


    componentDidMount() {
        this.props.getAllDoctor();
        this.props.getAllcodePrice();
        this.props.getAllcodePayment();
        this.props.getAllcodeProvince();
    }

    handleSetDoctorOptions = (input) => {
        let allDoctor = []
        input && input.length > 0
            && input.map((item, index) => {
                let nameVi = `${item.firstName} ${item.lastName}`;
                let nameEn = `${item.lastName} ${item.firstName}`;
                let objDoctor = {}
                objDoctor.value = item.id
                objDoctor.label = languages.VI === this.props.language ? nameVi : nameEn
                allDoctor.push(objDoctor)
            })

        return allDoctor;
    }

    setAllcodeOptions = (input) => {
        let allCode = []
        if (input[0].type === 'PRICE') {
            if (input && input.length > 0) {
                input.map((item, index) => {
                    let objDoctor = {}
                    objDoctor.value = item.keyMap
                    objDoctor.label = languages.VI === this.props.language ? item.valueVi : item.valueEn
                    allCode.push(objDoctor)
                })
            }
        }
        if (input[0].type === 'PAYMENT') {
            if (input && input.length > 0) {
                input.map((item, index) => {
                    let objDoctor = {}
                    objDoctor.value = item.keyMap
                    objDoctor.label = languages.VI === this.props.language ? item.valueVi : item.valueEn
                    allCode.push(objDoctor)
                })
            }
        }
        if (input[0].type === 'PROVINCE') {
            if (input && input.length > 0) {
                input.map((item, index) => {
                    let objDoctor = {}
                    objDoctor.value = item.keyMap
                    objDoctor.label = languages.VI === this.props.language ? item.valueVi : item.valueEn
                    allCode.push(objDoctor)
                })
            }
        }
        return allCode;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // this.handleSetDoctorOptions(this.props.paymentArr)
        if (prevProps.doctors !== this.props.doctors) {
            let listDoctor = this.handleSetDoctorOptions(this.props.doctors)
            this.setState({
                doctorArr: listDoctor
            })
        }
        if (prevProps.priceArr !== this.props.priceArr) {
            let priceArr = this.setAllcodeOptions(this.props.priceArr)
            this.setState({
                priceArr: priceArr
            })
        }
        if (prevProps.paymentArr !== this.props.paymentArr) {
            let paymentArr = this.setAllcodeOptions(this.props.paymentArr)
            this.setState({
                paymentArr: paymentArr
            })
        }
        if (prevProps.provinceArr !== this.props.provinceArr) {
            let provinceArr = this.setAllcodeOptions(this.props.provinceArr)
            this.setState({
                provinceArr: provinceArr
            })
        }
        if (prevProps.language !== this.props.language) {
            let listDoctor = this.handleSetDoctorOptions(this.props.doctors)
            let priceArr = this.setAllcodeOptions(this.props.priceArr)
            let paymentArr = this.setAllcodeOptions(this.props.paymentArr)
            let provinceArr = this.setAllcodeOptions(this.props.provinceArr)
            this.setState({
                doctorArr: listDoctor,
                priceArr: priceArr,
                paymentArr: paymentArr,
                provinceArr: provinceArr
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text
        })
    }

    handleChangeMarkdown = async (selectedOption, name) => {
        let copyState = { ...this.state }
        copyState[name.name] = selectedOption;
        await this.setState({
            ...copyState
        })
        if (name.name === 'doctorSelected') {
            let res = await getDetailDoctorByIdService(this.state.doctorSelected.value)
            if (res && res.errCode === 0 && res.data && res.data.Markdown && res.data.Markdown.description) {
                let markdown = res.data.Markdown
                this.setState({
                    description: markdown.description,
                    contentHTML: markdown.contentHTML,
                    contentMarkdown: markdown.contentMarkdown,
                    hasOldData: true,
                })
            }
            else {
                this.setState({
                    description: '',
                    contentHTML: '',
                    contentMarkdown: '',
                    hasOldData: false,
                })
            }

            let resTmp = await getDetailDoctorByIdService(this.state.doctorSelected.value)
            if (resTmp && resTmp.errCode === 0 && resTmp.data && resTmp.data.Doctor_Info && resTmp.data.Doctor_Info.provinceId) {
                let doctorInfo = resTmp.data.Doctor_Info
                let obj1 = {}
                obj1.value = doctorInfo.provinceData.keyMap;
                obj1.label = this.props.language === languages.VI ? doctorInfo.provinceData.valueVi : doctorInfo.provinceData.valueEn
                let obj2 = {}
                obj2.value = doctorInfo.paymentData.keyMap;
                obj2.label = this.props.language === languages.VI ? doctorInfo.paymentData.valueVi : doctorInfo.paymentData.valueEn
                let obj3 = {}
                obj3.value = doctorInfo.priceData.keyMap;
                obj3.label = this.props.language === languages.VI ? doctorInfo.priceData.valueVi : doctorInfo.priceData.valueEn
                this.setState({
                    priceSelected: obj3,
                    paymentSelected: obj2,
                    provinceSelected: obj1,
                    clinicName: doctorInfo.nameClinic,
                    clinicAddress: doctorInfo.addressClinic,
                    note: doctorInfo.note
                })
            }
            else {
                this.setState({
                    priceSelected: '',
                    paymentSelected: '',
                    provinceSelected: '',
                    clinicName: '',
                    clinicAddress: '',
                    note: ''
                })
            }
        }


    };

    handleChangeDescription = (e, input) => {
        let copyState = { ...this.state }
        copyState[input] = e.target.value
        this.setState({ ...copyState })
    }

    handleSaveInfoDoctor = () => {
        this.props.postInfoDoctor({
            doctorId: this.state.doctorSelected.value,
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            action: this.state.hasOldData === true ? CRUD_METHOD.EDIT : CRUD_METHOD.CREATE,
            price: this.state.priceSelected,
            payment: this.state.paymentSelected,
            province: this.state.provinceSelected,
            clinicName: this.state.clinicName,
            clinicAddress: this.state.clinicAddress,
            note: this.state.note,

        })
        this.setState({
            hasOldData: false,
            doctorSelected: '',
            contentHTML: '',
            contentMarkdown: '',
            description: '',
            priceSelected: '',
            paymentSelected: '',
            provinceSelected: '',
            clinicName: '',
            clinicAddress: '',
            note: '',
        })

    }

    render() {
        console.log(this.state)
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'><b><FormattedMessage id="doctor-information.title"></FormattedMessage></b></div>
                <div className='manage-doctor-body'>
                    <div className='input-body form-group'>
                        <div className='body-left'>
                            <label><FormattedMessage id="doctor-information.choose-doctor"></FormattedMessage></label>
                            <Select
                                value={this.state.doctorSelected}
                                onChange={this.handleChangeMarkdown}
                                options={this.state.doctorArr}
                                placeholder={<FormattedMessage id="doctor-information.choose-doctor"></FormattedMessage>}
                                name="doctorSelected"
                            />
                        </div>
                        <div className='body-right'>
                            <label><FormattedMessage id="doctor-information.extra-information"></FormattedMessage></label>
                            <textarea className='form-control' name="description" value={this.state.description} rows="4" onChange={(e) => this.handleChangeDescription(e, 'description')}>
                            </textarea>
                        </div>
                    </div>

                    <div className='input-body form-group my-2'>
                        <div className='body-left'>
                            <label><FormattedMessage id="doctor-information.price"></FormattedMessage></label>
                            <Select
                                value={this.state.priceSelected}
                                onChange={this.handleChangeMarkdown}
                                options={this.state.priceArr}
                                name="priceSelected"
                                placeholder={<FormattedMessage id="doctor-information.price"></FormattedMessage>}
                            />
                        </div>
                        <div className='body-left'>
                            <label><FormattedMessage id="doctor-information.payment"></FormattedMessage></label>
                            <Select
                                value={this.state.paymentSelected}
                                onChange={this.handleChangeMarkdown}
                                options={this.state.paymentArr}
                                name="paymentSelected"
                                placeholder={<FormattedMessage id="doctor-information.payment"></FormattedMessage>}
                            />
                        </div>
                        <div className='body-left'>
                            <label><FormattedMessage id="doctor-information.province"></FormattedMessage></label>
                            <Select
                                value={this.state.provinceSelected}
                                onChange={this.handleChangeMarkdown}
                                options={this.state.provinceArr}
                                name="provinceSelected"
                                placeholder={<FormattedMessage id="doctor-information.province"></FormattedMessage>}
                            />
                        </div>
                    </div>

                    <div className='input-body form-group'>
                        <div className='body-left'>
                            <label><FormattedMessage id="doctor-information.clinic-name"></FormattedMessage></label>
                            <input className='form-control' value={this.state.clinicName} type='text' onChange={(e) => this.handleChangeDescription(e, 'clinicName')} />
                        </div>
                        <div className='body-left'>
                            <label><FormattedMessage id="doctor-information.clinic-address"></FormattedMessage></label>
                            <input className='form-control' value={this.state.clinicAddress} type='text' onChange={(e) => this.handleChangeDescription(e, 'clinicAddress')} />
                        </div>
                        <div className='body-left'>
                            <label><FormattedMessage id="doctor-information.note"></FormattedMessage></label>
                            <input className='form-control' value={this.state.note} type='text' onChange={(e) => this.handleChangeDescription(e, 'note')} />
                        </div>
                    </div>


                    <div className='markdown'>
                        <MdEditor style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown}
                        />
                    </div>
                    <button className={this.state.hasOldData === true ? 'button-edit-info-doctor' : 'button-save-info-doctor'} onClick={() => this.handleSaveInfoDoctor()}>{this.state.hasOldData === true ? 'Sửa thông tin' : 'Lưu thông tin'}</button>
                </div>


            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        doctors: state.admin.doctors,
        priceArr: state.admin.priceArr,
        paymentArr: state.admin.paymentArr,
        provinceArr: state.admin.provinceArr,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        getAllcodePrice: () => dispatch(actions.getAllcodePrice()),
        getAllcodePayment: () => dispatch(actions.getAllcodePayment()),
        getAllcodeProvince: () => dispatch(actions.getAllcodeProvince()),
        postInfoDoctor: (data) => dispatch(actions.postInfoDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
