import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages } from "../../../../utils"
import './DetailDoctor.scss'
import HomeHeader from '../../HomeHeader';
import { getDetailDoctorByIdService } from "../../../../services/userService"


class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorDetail: {},
            nameVi: '',
            nameEn: '',
        }
    }


    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let idDoctor = this.props.match.params.id;
            let res = await getDetailDoctorByIdService(idDoctor)
            if (res && res.errCode === 0) {
                this.setState({
                    doctorDetail: res.data,
                    nameVi: `${res.data.positionData.valueVi} - ${res.data.firstName} ${res.data.lastName}`,
                    nameEn: `${res.data.positionData.valueEn} - ${res.data.lastName} ${res.data.firstName}`
                })
            } else {
                console.log('error')
            }
            // console.log('check detail by id', res)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { doctorDetail } = this.state
        // console.log(this.state)

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

                    <div className='schedule'>

                    </div>

                    <div className='clinic'>

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
