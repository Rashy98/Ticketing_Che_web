import React,{Component} from "react";
import {Row,Col,Container} from 'react-bootstrap';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Form} from 'react-bootstrap';
import axios from 'axios';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./footer"
import NavBar from "./Navbar";
import footer from "../assets/images/footer.png";
import login1 from "../assets/images/login.png";



class login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            password:"",
            errors:{},
            qrcode: ""
        }

    }
    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/");
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/"); // push user to dashboard when they login
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(user);
        console.log(user);
    };


// async componentDidMount() {
//     let users = (await axios.get('/user/')).data
//     console.log(users)
//     let user = await users.filter(obj => obj.nic === 6666666666666)
//     console.log(user)

    // this.setState({qrcode:user[0].generatedQR})


// }


    render() {
        const { errors } = this.state;
        return (
            <div style={{backgroundColor:'linear-gradient(RGBA(182,82,80))' , height:'50vh'}}>
                <Navbar style={{backgroundImage:'linear-gradient(RGBA(182,82,80), RGBA(115,71,108))',height:'8em'}} expand="lg" >
                    <Navbar.Brand >
                        <Link to='/'>
                            <p className="menu__logo navbar-brand " style={{fontSize:'2.5em',marginLeft:'2em',fontWeight:'bold',color:'white'}}>Destino</p>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav"  >
                        <Nav className="ml-auto"  >
                            <Nav.Link>
                                <Link className=" nav-link "  to="/Login" style={{color:'white',fontSize:'1.2em'}}>
                                    Log in
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link className=" nav-link "  to="/SignUp" style={{color:'white',fontSize:'1.2em'}}>
                                    Register
                                </Link>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Row style ={{backgroundColor:'white', display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'center'}}> <h3 style={{fontFamily:'Fira Sans'}}>Log In</h3></Row>
                {/*<div className="footer">*/}
                {/*    <img src={this.state.qrcode} alt="Logo" />;*/}
                {/*</div>*/}
                <Container className='mt-5 mb-3 ' style={{width:'40em',height:'36em',backgroundColor:"White",borderRadius:'20px'}}>
                    <form noValidate onSubmit={this.onSubmit}>
                        <br/>
                        <div className=" ">
                            <img src={login1} alt="Logo" style={{height:"150px",marginLeft:"30%"}}/>;
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control" placeholder="Email"
                                   onChange={this.onChange}
                                   value={this.state.email}
                                   error={errors.email}
                                   id="email"
                                   type="email"
                                   className={classnames("", {
                                       invalid: errors.email || errors.emailnotfound
                                   })}
                            />
                            <span className="red-text">
                                {errors.email}
                                {errors.emailnotfound}
                            </span>
                        </div>


                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password"
                                   onChange={this.onChange}
                                   value={this.state.password}
                                   error={errors.password}
                                   id="password"
                                   type="password"
                                   className={classnames("", {
                                       invalid: errors.password || errors.passwordincorrect
                                   })}
                            />
                            <span className="red-text">
                                  {errors.password}
                                  {errors.passwordincorrect}
                            </span>
                        </div>
                        <br/><br/>

                        <button type="submit" className="btn btn-primary btn-block">Log In</button>
                        <p className="forgot-password text-right">
                            Haven't Registered <a href="/Signup">Register?</a>
                        </p>
                    </form>

                </Container>
          <br/><br/><br/><br/><br/>
                <Footer/>

            </div>
        );
    }

}
login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { loginUser }
)(login );
