import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages } from "../../../../utils"
import './DetailDoctor.scss'
import HomeHeader from '../../HomeHeader';
import { getDetailDoctorByIdService } from "../../../../services/userService"
import PickScheduleComponent from './PickScheduleComponent';
import ClinicComponent from './ClinicComponent';
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorDetail: {},
            nameVi: '',
            nameEn: '',
            doctorIdFromParent: '',
        }
    }


    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let idDoctor = this.props.match.params.id;
            await this.setState({
                doctorIdFromParent: idDoctor
            })
            let res = await getDetailDoctorByIdService(idDoctor)
            if (res && res.errCode === 0) {
                this.setState({
                    doctorDetail: res.data,
                    nameVi: `${res.data.positionData.valueVi} - ${res.data.firstName} ${res.data.lastName}`,
                    nameEn: `${res.data.positionData.valueEn} - ${res.data.lastName} ${res.data.firstName}`
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        // console.log('check state parent', this.state)
        let { doctorDetail, doctorIdFromParent } = this.state
        return (
            <div className='detail-doctor'>
                <HomeHeader isHideBanner={true} />
                <div className='detail-doctor-container'>
                    <div className='doctor-information'>
                        <div className='image-doctor'>
                            <div className='avatar' style={{ backgroundImage: `url(${doctorDetail.image})` }}>
                            </div>
                        </div>
                        <div className='doctor-intro'>
                            {
                                doctorDetail && <div className='name'>{this.props.language === languages.VI ? this.state.nameVi : this.state.nameEn}</div>
                            }
                            {
                                doctorDetail && doctorDetail.Markdown && doctorDetail.Markdown.description
                                &&
                                <div className='description'>
                                    {doctorDetail.Markdown.description}
                                </div>
                            }
                        </div>
                    </div>
                    <div className='book-calendar my-4'>
                        <div className='schedule'>
                            <PickScheduleComponent doctorId={doctorIdFromParent} />
                        </div>

                        <div className='clinic'>
                            <ClinicComponent doctorId={doctorIdFromParent} />
                        </div>

                    </div>
                    <div className='office'>
                        {
                            doctorDetail && doctorDetail.Markdown && doctorDetail.Markdown.contentHTML
                            &&
                            <div dangerouslySetInnerHTML={{ __html: doctorDetail.Markdown.contentHTML }}>
                            </div>
                        }
                    </div>
                </div>
            </div >
        )
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
