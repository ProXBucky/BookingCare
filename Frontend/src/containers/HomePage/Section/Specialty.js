import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Specialty.scss"
import { FormattedMessage } from 'react-intl'

import Slider from "react-slick"

class Specialty extends Component {

    render() {
        return (
            <div className='section-container specialty-content'>
                <div className='content-section'>
                    <div className='section-title'>
                        <span><FormattedMessage id={"section.popular-specialty"} /></span>
                        <button><FormattedMessage id={"section.see-more"} /></button>
                    </div>
                    <div className='section-slider'>
                        <Slider {...this.props.settings}>
                            <div className='slider'>
                                <div className='image'></div>
                                <span className='title-slider'>Cơ xương khớp</span>
                            </div>
                            <div className='slider'>
                                <div className='image'></div>
                                <span className='title-slider'>Thần kinh</span>
                            </div>
                            <div className='slider'>
                                <div className='image'></div>
                                <span className='title-slider'>Tiêu hóa</span>
                            </div>
                            <div className='slider'>
                                <div className='image'></div>
                                <span className='title-slider'>Tim mạch</span>
                            </div>
                            <div className='slider'>
                                <div className='image'></div>
                                <span className='title-slider'>Tai mũi họng</span>
                            </div>
                            <div className='slider'>
                                <div className='image'></div>
                                <span className='title-slider'>Cột sống</span>
                            </div>
                            <div className='slider'>
                                <div className='image'></div>
                                <span className='title-slider'>Y học cổ truyền</span>
                            </div>
                            <div className='slider'>
                                <div className='image'></div>
                                <span className='title-slider'>Châm cứu</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
