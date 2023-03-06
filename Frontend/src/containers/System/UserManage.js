import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./UserManage.scss"
import { getAllUser } from "../../services/userService"
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allUser: [],
        }
    }

    async componentDidMount() {
        let data = await getAllUser('ALL');
        if (data && data.errCode === 0) {
            this.setState({
                allUser: data.user
            })
        }
    }

    render() {
        let allUser = this.state.allUser;
        console.log(allUser)
        return (
            <>
                <div className="text-center display-6 mt-2">Manage users with Bucky</div>
                <div className='user-table mt-3 mx-2'>
                    <table id='customers'>
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        {
                            allUser && allUser.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit'><i class="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete'><i class="fas fa-trash"></i></button>
                                        </td>

                                    </tr>
                                )
                            })
                        }
                    </table>

                </div>

            </>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
