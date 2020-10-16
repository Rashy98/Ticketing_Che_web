import React,{Component} from "react";
import {Row,Col,Container} from 'react-bootstrap';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Form} from 'react-bootstrap';
import axios from 'axios';
import {Link, withRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./Common/footer"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";
import NavBar from "./Common/Navbar";
import loki from "../assets/images/footer.png"
import footer from "../assets/images/footer.png";


class SignUp extends Component{
    constructor(props) {
        super(props);
        this.state={
            name:"",
            nic:"",
            contactNumber:"",
            TravelAccount:"",
            email:"",
            password:"",
            qrcode:"",
            errors:{}
        }
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeNic = this.onChangeNic.bind(this);
        this.onChangeContactNumber = this.onChangeContactNumber.bind(this);
        this.onChangeAccountType = this.onChangeAccountType.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this)

    }
    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/");
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    onChangeName(e){
        this.setState({
            name:e.target.value
        })

    }
    onChangeNic(e){
        this.setState({
            nic:e.target.value
        })
    }
    onChangeContactNumber(e){
        this.setState({
            contactNumber:e.target.value
        })
    }
    onChangeAccountType(e){
        this.setState({
            TravelAccount:e.target.value
        })
    }
    onChangeEmail(e){
        this.setState({
            email:e.target.value
        })
    }
    onChangePassword(e){
        this.setState({
            password:e.target.value
        })
    }
    handleValidation(){
        let valid = true;
        if(this.state.email !== '') {
            this.state.Users.map(user => {
                if (user.email === this.state.email) {
                    valid = false;
                    alert("Email already exists")
                    // this.setState({
                    //     tagVal: "This Tag already exists",
                    // })

                }
            })
        }
        return valid;
    }
    componentDidMount() {
        axios.get('/user/')
            .then(res => {
                this.setState({
                    Users: res.data,


                })
                console.log(res.data)
            });

    }
    Validation() {
        let valid = true;

        if (this.state.name === "" || this.state.nic === "" || this.state.contactNumber === "" || this.state.email === "" || this.state.password === "") {
            valid = false;
            alert("All fields should be filled");
        }
        return valid;
    }
    onSubmit(e) {
        e.preventDefault();

            const user = {
                name: this.state.name,
                nic: this.state.nic,
                contactNumber: this.state.contactNumber,
                TravelAccount:this.state.TravelAccount,
                email: this.state.email,
                password: this.state.password,
                url:"Name: "+ this.state.name +"\nNIC: "+ this.state.nic +"\nContact Number: "+ this.state.contactNumber +"\nEmail: "+ this.state.email
            }
                this.props.registerUser(user, this.props.history);

            // console.log(user);
            // axios.post("/user/add", user)
            //     .then(res => console.log(res))
            //     .catch(err => console.log(err))
            // alert('User Registered')

            this.setState({
                name: "",
                nic: "",
                contactNumber: "",
                TravelAccount:"",
                email: "",
                password: ""
            })

            // window.location = '/Login';

        }

        // }



    render() {
        const {errors} = this.state;
        return (
            <div style={{backgroundColor: 'linear-gradient(RGBA(182,82,80))', minHeight: '80vh',width:"100%"}}>
                <Navbar style={{backgroundImage: 'linear-gradient(RGBA(182,82,80), RGBA(115,71,108))', height: '8em'}}
                        expand="lg">
                    <Navbar.Brand>
                        <Link to='/'>
                            <p className="menu__logo navbar-brand " style={{
                                fontSize: '2.5em',
                                marginLeft: '2em',
                                fontWeight: 'bold',
                                color: 'white'
                            }}>Destino</p>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link>
                                <Link className=" nav-link " to="/Login" style={{color: 'white', fontSize: '1.2em'}}>
                                    Log in
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link className=" nav-link " to="/SignUp" style={{color: 'white', fontSize: '1.2em'}}>
                                    Register
                                </Link>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Row style={{
                    backgroundColor: 'white', display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'center'
                }}><h3 style={{fontFamily: 'Fira Sans'}}>Sign Up</h3></Row>
                {/*<div className="footer">*/}
                {/*    <img src={this.state.qrcode} alt="Logo" />;*/}
                {/*</div>*/}
                <Container className='mt-2 mb-1 '
                           style={{width: '40em', height: '47em', backgroundColor: "White", borderRadius: '20px'}}>

                    <form noValidate onSubmit={this.onSubmit}>


                        <div className="form-group mt-2">
                            <label className="mt-2 mb-2">Name</label>
                            <input type="text" className="form-control mt-lg-n4 " placeholder="Enter Name..."
                                   onChange={this.onChangeName}
                                   value={this.state.name}
                                   error={errors.name}
                                   className={classnames("", {
                                       invalid: errors.name
                                   })}
                            />
                            <span className="red-text">{errors.name}</span>
                        </div>

                        <div className="form-group mt-n2">
                            <label className="mb-n5">NIC</label>
                            <input type="text" className="form-control" placeholder="Enter NIC..."
                                   onChange={this.onChangeNic}
                                   value={this.state.nic}
                                   error={errors.nic}
                                   className={classnames("", {
                                       invalid: errors.nic
                                   })}
                            />
                            <span className="red-text">{errors.nic}</span>
                        </div>
                        <div className="form-group mt-n2">
                            <label className="mb-n5">Contact Number</label>
                            <input type="text" className="form-control" placeholder="Enter Contact Number..."
                                   onChange={this.onChangeContactNumber}
                                   value={this.state.contactNumber}
                                   error={errors.contactNumber}
                                   className={classnames("", {
                                       invalid: errors.contactNumber
                                   })}
                            />
                            <span className="red-text">{errors.contactNumber}</span>

                        </div>


                        <div className="form-group mt-n2">
                            <label className="mb-n5">Email Address</label>
                            <input type="email" className="form-control" placeholder="Enter Email..."
                                   onChange={this.onChangeEmail}
                                   value={this.state.email}
                                   error={errors.email}
                                   className={classnames("", {
                                       invalid: errors.email
                                   })}
                            />
                            <span className="red-text">{errors.email}</span>
                        </div>

                        <div className="form-group mt-n2">
                            <label className="mb-n5">Password</label>
                            <input type="password" className="form-control" placeholder="Enter Password..."
                                   onChange={this.onChangePassword}
                                   value={this.state.password}
                                   error={errors.password}
                                   className={classnames("", {
                                       invalid: errors.password
                                   })}
                            />
                            <span className="red-text">{errors.password}</span>
                        </div>
                        <div className="form-group mt-n2">
                            <label className="mb-n5">Travel Account Type</label>
                            <select className="form-control " id="ProgInputSelect"
                                    onChange={this.onChangeAccountType}
                                    style={{borderBottom:'1px solid grey', display:'block'}}
                                    error={errors.TravelAccount}
                                    className={classnames("", {
                                        invalid: errors.TravelAccount
                                    })}

                            >
                                <option style={{fontSize:'15px'}} value=" ">Select Account Type...</option>
                                <option value="Pay As You Go">Pay As You Go</option>
                                <option value="Other">Other</option>

                            </select>
                            <span className="red-text">{errors.TravelAccount}</span>
                        </div>



                        <button type="submit" className="btn btn-primary btn-block"
                        >Sign Up</button>
                        <p className="forgot-password text-right">
                            Already registered <a href="/Login">sign in?</a>
                        </p>
                    </form>

                </Container>
                <br/><br/><br/><br/>
                <Footer/>

            </div>
        );
    }


}
SignUp.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(SignUp));
