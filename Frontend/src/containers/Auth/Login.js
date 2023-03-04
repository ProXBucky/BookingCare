import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
// import { FormattedMessage } from 'react-intl';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',

        }
    }

    handleChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handleChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleLogin = () => {
        console.log(this.state.username);
        console.log(this.state.password);
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row ">
                        <div className="col-12 text-center login-title">Login</div>
                        <div className="col-12 form-group">
                            <label>Username: </label>
                            <input
                                type="text"
                                className="form-control login-input"
                                placeholder="Enter your user name"
                                value={this.state.username}
                                onChange={(e) => this.handleChangeUsername(e)}

                            />

                        </div>
                        <div className="col-12 form-group">
                            <label>Password: </label>
                            <div className="login-password">
                                <input
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    className="form-control login-input"
                                    placeholder="Enter your password"
                                    value={this.state.password}
                                    onChange={(e) => this.handleChangePassword(e)}

                                />
                                <span onClick={() => this.handleShowHidePassword()}>
                                    <i className={this.state.isShowPassword ? 'fas fa-eye show-password' : 'fas fa-eye-slash show-password'} ></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12'>{this.state.errMessage}</div>
                        <div className="col-12">
                            <button
                                className="btn-login"
                                onClick={() => this.handleLogin()}
                            >Login</button>
                        </div>
                        <div className="col-12">
                            <span className="forgot-password">Forgot your password?</span>
                        </div>
                        <div className="col-12 text-center login-with mt-3">
                            <span className="">Or login with:</span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-facebook social-icon fb"></i>
                            <i className="fab fa-google-plus social-icon gg"></i>
                        </div>
                    </div>
                </div>
            </div>

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
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);