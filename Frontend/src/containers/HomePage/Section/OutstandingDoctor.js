import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from "react-slick"

class OutstandingDoctor extends Component {

    render() {
        return (
            <div className='section-container outstanding-doctor-content'>
                <div className='content-section'>
                    <div className='section-title'>
                        <span>Bác sĩ nổi bật tuần qua</span>
                        <button>Tìm kiếm</button>
                    </div>
                    <div className='section-slider'>
                        <Slider {...this.props.settings}>
                            <div className='slider'>
                                <div className='outer'>
                                    <div className='image'></div>
                                    <div className='title-slider text-center'>
                                        <div className=''>Bucky Nguyen</div>
                                        <div className=''>Khoa chữa bệnh ngu</div>
                                    </div>
                                </div>
                            </div>

                            <div className='slider'>
                                <div className='outer'>
                                    <div className='image'></div>
                                    <div className='title-slider text-center'>
                                        <div className=''>Bucky Nguyen</div>
                                        <div className=''>Khoa chữa bệnh ngu</div>
                                    </div>
                                </div>
                            </div>
                            <div className='slider'>
                                <div className='outer'>
                                    <div className='image'></div>
                                    <div className='title-slider text-center'>
                                        <div className=''>Bucky Nguyen</div>
                                        <div className=''>Khoa chữa bệnh ngu</div>
                                    </div>
                                </div>
                            </div>

                            <div className='slider'>
                                <div className='outer'>
                                    <div className='image'></div>
                                    <div className='title-slider text-center'>
                                        <div className=''>Bucky Nguyen</div>
                                        <div className=''>Khoa chữa bệnh ngu</div>
                                    </div>
                                </div>
                            </div>

                            <div className='slider'>
                                <div className='outer'>
                                    <div className='image'></div>
                                    <div className='title-slider text-center'>
                                        <div className=''>Bucky Nguyen</div>
                                        <div className=''>Khoa chữa bệnh ngu</div>
                                    </div>
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
