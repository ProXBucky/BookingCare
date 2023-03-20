import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages } from "../../../utils"
import * as actions from '../../../store/actions'
import './UserRedux.scss'
import TableManagerUser from './TableManagerUser';
// import { postNewUser } from '../../../store/actions';

//Upload Image
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
            isLoadingData: '',
            imageURL: '',
            isOpen: false,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
        }
    }
    componentDidMount() {
        this.props.getGenderRedux();
        this.props.getRoleRedux();
        this.props.getPositionRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.genders !== prevProps.genders) {
            let genderTemp = this.props.genders
            let genderData = genderTemp && genderTemp.length > 0 ? genderTemp[0].key : '';  // get default value of gender
            this.setState({
                genderArr: this.props.genders,
                gender: genderData
            })
        }
        if (this.props.roles !== prevProps.roles) {
            let roleTemp = this.props.roles
            let roleData = roleTemp && roleTemp.length > 0 ? roleTemp[0].key : '';
            this.setState({
                roleArr: this.props.roles,
                role: roleData

            })
        }
        if (this.props.positions !== prevProps.positions) {
            let positionTemp = this.props.positions
            let positionData = positionTemp && positionTemp.length > 0 ? positionTemp[0].key : '';
            this.setState({
                positionArr: this.props.positions,
                position: positionData
            })
        }
        if (this.props.isLoadingRedux !== prevProps.isLoadingRedux) {
            this.setState({
                isLoadingData: this.props.isLoadingRedux
            })
        }
        //Loading all user after create new user
        if (this.props.users !== prevProps.users) {
            this.setState({
                email: '', password: '',
                firstName: '', lastName: '',
                phoneNumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                avatar: '',
            })
        }
    }

    handleOnChangeImg = (e) => {
        let data = e.target.files;
        let file = data[0];
        let objectUrl = URL.createObjectURL(file)
        this.setState({
            imageURL: objectUrl
        })

    }

    handleOpenPreview = () => {
        if (!this.state.imageURL) return;
        this.setState({
            isOpen: true,
        })
    }

    handleOnChangeInput = (event, input) => {
        let copyState = { ...this.state }
        copyState[input] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let inputArr = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address', 'gender', 'position', 'role'];
        for (let i = 0; i < inputArr.length; i++) {
            if (!this.state[inputArr[i]]) {
                alert('Missing parameter: ' + inputArr[i]);
                isValid = false;
                break;
            }
        }
        return isValid
    }

    handleCreateNewUser = async () => {
        let isValid = await this.checkValidateInput();
        if (isValid === true) {
            this.props.postNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                roleId: this.state.role,
                phonenumber: this.state.phoneNumber,
                positionId: this.state.position,
            })
        }
    }

    render() {
        let { genderArr, roleArr, positionArr, isLoadingData } = this.state;
        let { language } = this.props;
        return (
            <React.Fragment>
                <div>{isLoadingData ? 'Loading data' : ''}</div>
                <div className="text-center my-3"> <h1>Redux with ProXBucky</h1></div>
                <div className='container my-2'>
                    <h3 className='my-3 col-5'><FormattedMessage id="manage-user.title"></FormattedMessage></h3>
                    <div className='row'>
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-user.email"></FormattedMessage></label>
                            <input type="email" className='form-control' value={this.state.email} onChange={(event) => this.handleOnChangeInput(event, 'email')} />
                        </div>
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-user.password"></FormattedMessage></label>
                            <input type="password" className='form-control' value={this.state.password} onChange={(event) => this.handleOnChangeInput(event, 'password')} />
                        </div>
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-user.firstname"></FormattedMessage></label>
                            <input type="text" className='form-control' value={this.state.firstName} onChange={(event) => this.handleOnChangeInput(event, 'firstName')} />
                        </div>
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-user.lastname"></FormattedMessage></label>
                            <input type="text" className='form-control' value={this.state.lastName} onChange={(event) => this.handleOnChangeInput(event, 'lastName')} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-user.phonenumber"></FormattedMessage></label>
                            <input type="text" className='form-control' value={this.state.phoneNumber} onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')} />
                        </div>
                        <div className='col-9'>
                            <label><FormattedMessage id="manage-user.address"></FormattedMessage></label>
                            <input type="text" className='form-control' value={this.state.address} onChange={(event) => this.handleOnChangeInput(event, 'address')} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-user.gender"></FormattedMessage></label>
                            <select className='form-control' value={this.state.gender} onChange={(event) => this.handleOnChangeInput(event, 'gender')}>
                                {genderArr && genderArr.length > 0 &&
                                    genderArr.map((item, index) => {
                                        return (
                                            <option key={index}> {language === languages.VI ? item.valueVi : item.valueEn} </option>
                                        )
                                    })

                                }
                            </select>
                        </div>
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-user.position"></FormattedMessage></label>
                            <select className='form-control' value={this.state.position} onChange={(event) => this.handleOnChangeInput(event, 'position')}>
                                {positionArr && positionArr.length > 0 &&
                                    positionArr.map((item, index) => {
                                        return (
                                            <option key={index}> {language === languages.VI ? item.valueVi : item.valueEn} </option>
                                        )
                                    })

                                }
                            </select>
                        </div>
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-user.roleId"></FormattedMessage></label>
                            <select className='form-control' value={this.state.role} onChange={(event) => this.handleOnChangeInput(event, 'role')}>
                                {roleArr && roleArr.length > 0 &&
                                    roleArr.map((item, index) => {
                                        return (
                                            <option key={index}> {language === languages.VI ? item.valueVi : item.valueEn} </option>
                                        )
                                    })

                                }
                            </select>
                        </div>
                        <div className='col-3 avatar-container'>
                            <label><FormattedMessage id="manage-user.image"></FormattedMessage></label>
                            <div>
                                <input id='upload-Img' type='file' hidden onChange={(e) => this.handleOnChangeImg(e)} />
                                <label className='upload' htmlFor='upload-Img'><FormattedMessage id="manage-user.upload"></FormattedMessage><i className="fas fa-upload"></i></label>
                                <div className='preview-Img col-3 mt-1'
                                    style={{ backgroundImage: `url(${this.state.imageURL})` }}
                                    onClick={() => this.handleOpenPreview()}
                                >
                                    {this.state.isOpen && (
                                        <Lightbox
                                            mainSrc={this.state.imageURL}
                                            onCloseRequest={() => this.setState({ isOpen: false })}
                                        />
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="button"
                        className='my-3 col-2 button-save'
                        color='primary'
                        onClick={() => this.handleCreateNewUser()}>
                        <FormattedMessage id="manage-user.save-btn"></FormattedMessage>
                    </button>
                    <TableManagerUser />
                </div>
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
        roles: state.admin.roles,
        positions: state.admin.positions,
        isLoadingRedux: state.admin.isLoadingRedux,
        users: state.admin.users,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderRedux: () => dispatch(actions.fetchGenderFirst()),
        getRoleRedux: () => dispatch(actions.fetchRoleFirst()),
        getPositionRedux: () => dispatch(actions.fetchPositionFirst()),
        postNewUser: (data) => dispatch(actions.postNewUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
