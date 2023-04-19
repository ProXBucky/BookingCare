import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages } from "../../../../utils"
import './DetailSpecialty.scss'
import HomeHeader from '../../HomeHeader';
import { getDetailSpecialty } from "../../../../services/userService"
import PickScheduleComponent from '../Doctor/PickScheduleComponent';
import ClinicComponent from '../Doctor/ClinicComponent';
import DoctorInfo from '../Doctor/DoctorInfo';
import { getDoctorBySpecialtyId } from "../../../../services/userService"
import * as actions from '../../../../store/actions'
import Select from 'react-select';



class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            specialtyIdFromParam: '',
            specialtyDetail: {},
            doctorsBySpecialty: [],
            arrDoctorId: [],
            provinceArr: [],
            provinceSelected: ''
        }
    }

    getDoctorBySpecialtyId = async (id) => {
        let respone = await getDoctorBySpecialtyId(id)
        if (respone && respone.errCode === 0) {
            this.setState({
                arrDoctorId: respone.data
            })
        }
    }

    setAllcodeOptions = (input) => {
        let allCode = []
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

    async componentDidMount() {
        this.props.getAllcodeProvince();
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let idSpecialty = this.props.match.params.id;
            await this.setState({
                specialtyIdFromParam: idSpecialty
            })
            await this.getDoctorBySpecialtyId(idSpecialty)
            if (this.state && this.state.arrDoctorId) {
                let result = []
                this.state.arrDoctorId.map((item) => {
                    result.push(item.doctorId)
                })
                this.setState({
                    doctorsBySpecialty: result
                })
            }
            let res = await getDetailSpecialty(idSpecialty)
            if (res && res.errCode === 0) {
                this.setState({
                    specialtyDetail: res.data,
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.provinceArr !== this.props.provinceArr) {
            let provinceArr = this.setAllcodeOptions(this.props.provinceArr)
            this.setState({
                provinceArr: provinceArr
            })
        }
    }


    handleChangeMarkdown = async (selectedOption, name) => {
        let copyState = { ...this.state }
        copyState[name.name] = selectedOption;
        await this.setState({
            ...copyState
        })
    }

    render() {
        console.log('cehck state', this.state)
        let { specialtyDetail, doctorsBySpecialty } = this.state
        return (
            <div className='detail-specialty'>
                <HomeHeader isHideBanner={true} />
                <div className='detail-specialty-body'>
                    <div className='specialty-description'>
                        <h2 className='specialty-name title'>
                            {specialtyDetail.name}
                        </h2>
                        <div className='specialty-extra-information' dangerouslySetInnerHTML={{ __html: specialtyDetail.descriptionHTML }} >
                        </div>
                    </div>

                    <div className="doctor-filter-by-specialty">
                        <Select
                            className='select-province'
                            value={this.state.provinceSelected}
                            onChange={this.handleChangeMarkdown}
                            options={this.state.provinceArr}
                            name="provinceSelected"
                            placeholder={<FormattedMessage id="doctor-information.province"></FormattedMessage>}
                        />
                        {
                            doctorsBySpecialty && doctorsBySpecialty.length > 0 &&
                            doctorsBySpecialty.map((item, index) => {
                                return (
                                    <div className='container my-4' key={index}>
                                        <div className='content-left'>
                                            <DoctorInfo doctorId={item} isHideDoctorInformation={false} isHideDescription={true} />
                                        </div>
                                        <div className='content-right'>
                                            <div className='up'>
                                                <PickScheduleComponent doctorId={item} />
                                            </div>
                                            <div className='down'>
                                                <ClinicComponent doctorId={item} />
                                            </div>

                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div >
            </div >
        )
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        provinceArr: state.admin.provinceArr,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllcodeProvince: () => dispatch(actions.getAllcodeProvince()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
