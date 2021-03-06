import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.scss'
import { Dialog, NormalDropdown } from "../../../components/common";
import { MODAL, EXIST_LOCAL_STORAGE } from "../../../service/constants";
import { history } from "../../../helpers";
import { UserEdit } from '../../../components/pages'
export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alertModel: {
                isShow: false,
                type: '',
                title: '',
                id: '',
                index: -1,
                okBtn: ''
            },
            isUserEditModal: false,
            currentUser: {},
            isShowMobileMenu:false
        };
    }

    componentDidMount() {
        let userObj = localStorage.getItem(EXIST_LOCAL_STORAGE.CURRENT_USER);
        this.setState({ currentUser: JSON.parse(userObj) })

    }


    //handleLogOut function call start
    handleMoreOpp = (event) => {
        if (event.target.value === 'Sign out') {
            let { alertModel } = this.state;
            alertModel.isShow = true;
            alertModel.type = MODAL.TYPE.WARNING;
            alertModel.okBtn = 'yes, Log Out'
            alertModel.title = 'Are you sure you want to Log Out';
            this.setState({ alertModel });
        } else {
            this.setState({ isUserEditModal: true })
        }
    }

    //handleAlert 
    handleAlertModal = (value) => {
        let { alertModel } = this.state;
        if (value) {
            alertModel.isShow = false;

            history.push(`/auth/login`);
        } else {
            alertModel.isShow = false;
        }
        this.setState({ alertModel })
    }
    render() {
        let { alertModel, isUserEditModal, currentUser,isShowMobileMenu } = this.state;
        let optionsList = [
            {
                icon: "bi bi-person",
                label: "Profile"
            },
            {
                icon: "bi bi-box-arrow-left",
                label: "Sign out"
            },

        ]
        return (
            //             <header>
            //   <!-- Fixed navbar -->
            //   <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            //     <div class="container-fluid">
            //       <a class="navbar-brand" href="#">Fixed navbar</a>
            //       <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            //         <span class="navbar-toggler-icon"></span>
            //       </button>
            //       <div class="collapse navbar-collapse" id="navbarCollapse">
            //         <ul class="navbar-nav me-auto mb-2 mb-md-0">
            //           <li class="nav-item">
            //             <a class="nav-link active" aria-current="page" href="#">Home</a>
            //           </li>
            //           <li class="nav-item">
            //             <a class="nav-link" href="#">Link</a>
            //           </li>
            //           <li class="nav-item">
            //             <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            //           </li>
            //         </ul>
            //         <form class="d-flex">
            //           <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            //           <button class="btn btn-outline-success" type="submit">Search</button>
            //         </form>
            //       </div>
            //     </div>
            //   </nav>
            // </header>
            <header className="">
                <nav class="navbar navbar-expand-md navbar-dark shadow fixed-top border-bottom app-header">
                    <div className="container">
                        <a class="navbar-brand" href="#">
                            <svg id="bootstrap" viewBox="0 0 118 94" className="bi me-2" width="40" height="32">
                                <title>Bootstrap</title>
                                <path fillRule="evenodd" clipRule="evenodd" d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z"></path>
                            </svg>
                        </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" onClick={()=>this.setState({isShowMobileMenu:!isShowMobileMenu})}>
                            <span class="bi bi-justify"></span>
                        </button>
                        <div class={`collapse navbar-collapse ${isShowMobileMenu?'mobile-show':''}`}>
                            <ul class={`nav   nav-pills me-auto mb-2 mb-md-0 ${isShowMobileMenu?'navbar-nav':''}`}>
                                <li className="nav-item"><NavLink to="/allProduct" className="nav-link px-2">Products</NavLink ></li>
                                <li className="nav-item"><NavLink to="/supplier" className="nav-link px-2">supplier</NavLink ></li>
                                <li className="nav-item"><NavLink to="/users" className="nav-link px-2">Users</NavLink ></li>
                            </ul>
                            <div class="d-flex">
                                <div className="dropdown text-end d-flex" >
                                    <a className="d-block link-light text-decoration-none dropdown-toggle">
                                        <img src="./images/profile.svg" alt="mdo" width="32" height="32" className="rounded-circle" />
                                    </a>

                                    <NormalDropdown
                                        optionsList={optionsList}
                                        // direction="left"
                                        // caret={false}
                                        className="bg-transparent p-0 header-drop"
                                        labelIcon="icon-show-more"
                                        label={currentUser.fName + " " + currentUser.lName}
                                        onClick={this.handleMoreOpp}
                                    />
                                </div>
                            </div>
                        </div>
                     
                    </div>
                </nav>
                <Dialog show={alertModel.isShow} sucessBtn={alertModel.okBtn} onToggle={this.handleAlertModal} type={alertModel.type} title={alertModel.title} />
                {isUserEditModal ?
                    <UserEdit isShow={isUserEditModal} userObjForm={currentUser} toggle={() => this.setState({ isUserEditModal: false })} /> : ""}
            </header>
        );
    }
}
