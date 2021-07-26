import React from "react";
import "./login.scss";
import {
  NormalInput,
  NormalButton,
  NormalCheckbox
} from "../../../components/common";
// import { Link } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';
import { userSignin } from "../../../redux/actions/login";
import { history } from "../../../helpers";
import { EXIST_LOCAL_STORAGE } from "../../../service/constants";
export class Login extends React.Component {
  state = {
    loginForm: {
      username: "",
      password: "",
    },
    passwordType: 'password',
    isFormLoder: false,
    isKeepMe: false,
    keepMeObj: {
      username: "",
      password: "",
    }
  };



  //on lode function start
  componentWillMount() {
    //keep login function start
    let isKeepMe = localStorage.getItem(EXIST_LOCAL_STORAGE.IS_KEEP_ME);
    let keepMeObj = JSON.parse(localStorage.getItem(EXIST_LOCAL_STORAGE.KEEP_ME_OBJ));
    localStorage.clear();
    if (isKeepMe === '1') {
      keepMeObj = Object.assign({}, keepMeObj);
      this.setState({ isKeepMe, loginForm: keepMeObj });
      localStorage.setItem(EXIST_LOCAL_STORAGE.IS_KEEP_ME, isKeepMe);
      localStorage.setItem(EXIST_LOCAL_STORAGE.KEEP_ME_OBJ, JSON.stringify(keepMeObj));
    } else {
      this.setState({ isKeepMe: false });
    }



    //validation set function start
    this.validator = new SimpleReactValidator({
      element: message => <span className="error-message text-danger validNo fs14">{message}</span>,
      autoForceUpdate: this,
    });
  }


  //handle input change function call start
  handleInputChange = e => {
    let { value, name } = e.target;
    this.setState({
      loginForm: {
        ...this.state.loginForm,
        [name]: value
      }
    })
  };


  //login submit API call function  start
  handleSubmit = () => {
    // history.push(`/dashboard`)
    let { loginForm, isKeepMe, keepMeObj } = this.state;
    this.setState({ isResErr: false })
    if (this.validator.allValid()) {
      this.validator.hideMessages();
      this.setState({ isFormLoder: true });
      userSignin(loginForm).then((data) => {
        console.log(isKeepMe)
        if (!!data) {
          localStorage.setItem(EXIST_LOCAL_STORAGE.USER_ID, data);
          if (isKeepMe) {
            keepMeObj.username = loginForm.username;
            keepMeObj.password = loginForm.password;
            this.setState({ keepMeObj });
            localStorage.setItem(EXIST_LOCAL_STORAGE.IS_KEEP_ME, 1);
            localStorage.setItem(EXIST_LOCAL_STORAGE.KEEP_ME_OBJ, JSON.stringify(keepMeObj));
          } else {
            localStorage.setItem(EXIST_LOCAL_STORAGE.IS_KEEP_ME, 0);
            localStorage.setItem(EXIST_LOCAL_STORAGE.KEEP_ME_OBJ, JSON.stringify(keepMeObj));
          }
          history.push(`/dashboard`)
        }
        this.setState({ isFormLoder: false })
      }).catch((error) => {
        this.setState({ isFormLoder: false })
        let err = error ? error.error : '';
        if (err === 'Invalid combination. Have another go.') {
          this.setState({ isResErr: true })
        } else {
        }

      })

    } else {
      this.validator.showMessages();
    }

  }

  // handlekeep me change start
  handleisKeepMeChange = () => {
    let { isKeepMe } = this.state;
    this.setState({ isKeepMe: !isKeepMe });
  }

  render() {
    let { loginForm, isFormLoder, isResErr, isKeepMe, passwordType } = this.state;
    return (

      <>
        <div class="row login-page">
          <div class="col-md-9 col-lg-8 mx-auto">
           
            <div className="row mb-3">
              <div className="col-md-12">
              <img src="/images/kbz-logo.svg"/>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-12">
                <label className="text-sub-title">Sign into your <strong>KBZ Territory Management Console (TMC)</strong> </label>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 mb-3">
              <div class="form-group mb-0">
                  <label>Login</label>
                  <NormalInput
                    placeholder="Email address or phone number"
                    name="username"
                    value={loginForm.username}
                    className="form-control border-left-0"
                    onChange={this.handleInputChange}
                  />
                 
                </div>
                {this.validator.message('User Name', loginForm.username, 'required')}
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div class="form-group mb-0">
                  <label>Password</label>
                  <NormalInput
                    placeholder="Password"
                    name="password"
                    type={passwordType}
                    value={loginForm.password}
                    className="form-control border-left-0  border-right-0"
                    onChange={this.handleInputChange}
                  />
                 
                </div>
                {this.validator.message('Password', loginForm.password, 'required')}
                  {isResErr ?
                    <span className="text-danger validNo fs14">
                      Email ID or Password entered is incorrect.
                  </span> : ''}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <NormalCheckbox
                  name="isKeepMe"
                  checked={isKeepMe}
                  className="mb-3 mt-3"
                  label="Keep me signed in"
                  id="isKeepMe"
                  onChange={this.handleisKeepMeChange}
                />
              </div>
              <div className="col-md-6 text-right">
                <NormalButton
                  onClick={this.handleSubmit}
                  id="cancelProfile"
                  label="sign in"
                  outline={false}
                  loader={isFormLoder}
                  className="mb-2  btn-primary"
                />
              </div>
            </div>


            {/* <div class="text-center">
              <a class="small" href="#">Forgot password?</a></div> */}
          </div>
        </div>



      </>
    );
  }
}
