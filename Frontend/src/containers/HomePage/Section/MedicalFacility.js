import React, { Component } from 'react';
import { connect } from 'react-redux';
// import "./MedicalFacility.scss"

import Slider from "react-slick"

class MedicalFacility extends Component {

    render() {
        return (
            <div className='section-container medical-facility-content'>
                <div className='content-section'>
                    <div className='section-title'>
                        <span>Cơ sở y tế nổi bật</span>
                        <button>Tìm kiếm</button>
                    </div>
                    <div className='section-slider'>
                        <Slider {...this.props.settings}>
                            <div className='slider'>
                                <div className='image'></div>
                                <span className='title-slider'>Bệnh viện Việt Đức 1</span>
                            </div>
                            <div className='slider'>
                                <div className='image'></div>
                                <span className='title-slider'>Bệnh viện Việt Đức 2</span>
                            </div>
                            <div className='slider'>
                                <div className='image'></div>
                                <span className='title-slider'>Bệnh viện Việt Đức 3</span>
                            </div>
                            <div className='slider'>
                                <div className='image'></div>
                                <span className='title-slider'>Bệnh viện Việt Đức 4</span>
                            </div>
                            <div className='slider'>
                                <div className='image'></div>
                                <span className='title-slider'>Bệnh viện Việt Đức 5</span>
                            </div>
                            <div className='slider'>
                                <div className='image'></div>
                                <span className='title-slider'>Bệnh viện Việt Đức 6</span>
                            </div>
                            <div className='slider'>
                                <div className='image'></div>
                                <span className='title-slider'>Bệnh viện Việt Đức 7</span>
                            </div>
                            <div className='slider'>
                                <div className='image'></div>
                                <span className='title-slider'>Bệnh viện Việt Đức 8</span>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
