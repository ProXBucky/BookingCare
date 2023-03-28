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
            selectedOption: '',
            contentHTML: '',
            contentMarkdown: '',
            description: '',
            doctorArr: [],
            hasOldData: false,
            action: '',
        }
    }


    componentDidMount() {
        this.props.getAllDoctor()
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctors !== this.props.doctors) {
            let listDoctor = this.handleSetDoctorOptions(this.props.doctors)
            this.setState({
                doctorArr: listDoctor
            })
        }
        if (prevProps.language !== this.props.language) {
            let listDoctor = this.handleSetDoctorOptions(this.props.doctors)
            this.setState({
                doctorArr: listDoctor
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text
        })
    }

    handleChangeMarkdown = async (selectedOption) => {
        this.setState({ selectedOption })
        let res = await getDetailDoctorByIdService(selectedOption.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown && res.data.Markdown.description) {
            console.log('case1')
            let markdown = res.data.Markdown
            this.setState({
                description: markdown.description,
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                hasOldData: true,
            })
        }
        else {
            console.log('case2')
            this.setState({
                description: '',
                contentHTML: '',
                contentMarkdown: '',
                hasOldData: false
            })
        }
    };

    handleChangeDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    handleSaveInfoDoctor = () => {
        this.props.postInfoDoctor({
            doctorId: this.state.selectedOption.value,
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            action: this.state.hasOldData === true ? CRUD_METHOD.EDIT : CRUD_METHOD.CREATE,
        })
        this.setState({
            hasOldData: false,
            selectedOption: '',
            contentHTML: '',
            contentMarkdown: '',
            description: '',
        })

    }

    render() {
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>Tạo thêm thông tin bác sỹ</div>
                <div className='manage-doctor-body'>
                    <div className='input-body form-group'>
                        <div className='body-left'>
                            <label>Chọn bác sỹ</label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChangeMarkdown}
                                options={this.state.doctorArr}
                            />
                        </div>
                        <div className='body-right'>
                            <label>Thông tin giới thiệu</label>
                            <textarea className='form-control' value={this.state.description} rows="4" onChange={(e) => this.handleChangeDescription(e)}></textarea>
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        postInfoDoctor: (data) => dispatch(actions.postInfoDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
