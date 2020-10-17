import React,{Component} from "react";
import {Row, Col, Container, Navbar, Nav} from 'react-bootstrap';
import NavBar from "../Common/Navbar";
import visa from '../../assets/images/visa.png';
import master from '../../assets/images/Master.png';
import css from '../../assets/css/topup.css';
import axios from 'axios';
import Footer from "../Common/footer"
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "./../../actions/authActions";



class PastJourneys extends Component{

    constructor(props) {
        super(props);
        this.state={
            users:[],
            history:[],

        }

        this.onRadioChange = this.onRadioChange.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCSV = this.onChangeCSV.bind(this);
        this.onChangeMM = this.onChangeMM.bind(this);
        this.onChangeYY = this.onChangeYY.bind(this);
        this.onPay = this.onPay.bind(this);

    }

    //Handle radio buttons
    onRadioChange = type => {
        console.log(type);
        this.setState({
            selectedRadio:type
        })

    }

    onAmountChange(e){
        this.setState({
            amount:e.target.value
        })
        console.log(this.state.earlierCred)
    }

    onChangeName(e){
        this.setState({
            name:e.target.value
        })
    }
    onChangeCSV(e){
        this.setState({
            csv:e.target.value
        })
    }
    onChangeMM(e){
        this.setState({
            mm:e.target.value
        })
    }
    onChangeYY(e){
        this.setState({
            yy:e.target.value
        })
    }

    componentDidMount() {
        axios.get("/user/").then(response => {
            console.log(response.data);
            for(let x = 0 ; x < response.data.length; x++){
                if(response.data[x]._id === this.props.auth.user.id){
                    this.setState({
                            earlierCred : response.data[x].Credits,
                            history : response.data[x].history
                        }
                    )
                }
            }

            this.setState({
                users: response.data,
            })
        })

    }

    Validation(){
        let valid = true;

        if(this.state.amount ==="" || this.state.name ==="" || this.state.csv ==="" || this.state.mm ==="" || this.state.yy ===""){
            valid = false;
            alert("All fields should be filled");
        }
        return valid;
    }

    onPay(e){



        if(this.Validation()) {
            console.log(this.state.earlierCred)

            let newCredit = this.state.earlierCred + parseInt(this.state.amount);
            console.log(newCredit);
            const credits = {
                Credits: newCredit
            }

            axios.post("/user/updateCredit/"+this.props.auth.user.id, credits)
                .then(res => console.log(res.data));

            alert("Account successfully updated with Rs." +this.state.amount);

        }

    }
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const {user} = this.props.auth
        console.log(user)
        return (
            <div style={{backgroundColor:'lightgrey' , minHeight:'30em',width:'101%'}}>
                <Navbar style={{
                    backgroundImage: 'linear-gradient(RGBA(182,82,80), RGBA(115,71,108))',
                    height: '8em',
                    width: "100%"
                }} expand="lg">
                    <Navbar.Brand>
                        <Link to='/'>
                            <p className="menu__logo navbar-brand "
                               style={{
                                   fontSize: '2.5em',
                                   marginLeft: '2em',
                                   fontWeight: 'bold',
                                   color: 'white'
                               }}>Destino</p>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link>
                                <Link className=" nav-link " to="/" style={{color: 'white', fontSize: '1.2em'}}>
                                    Top Up account
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link className=" nav-link " to="/History" style={{color: 'white', fontSize: '1.2em'}}>
                                    View Past Journeys
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link className=" nav-link " to="" style={{color: 'white', fontSize: '1.2em'}}>
                                    Help
                                </Link>
                            </Nav.Link>

                            {/*<Nav>*/}
                            {/*    <Nav.Link><a className=" nav-link mr-sm-2" style={{color: 'white', fontSize: '1.2em'}}>*/}
                            {/*        Logout*/}
                            {/*    </a>*/}
                            {/*    </Nav.Link>*/}
                            {/*</Nav>*/}
                        </Nav>
                        <button
                            style={{
                                width: "120px",
                                borderRadius: "20px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem",
                                marginRight:"2rem",
                                color:"black",
                                backgroundColor:'white'
                            }}
                            onClick={this.onLogoutClick}
                            className="btn btn-medium "
                        >
                            Logout
                        </button>
                    </Navbar.Collapse>
                </Navbar>
                <Row style ={{backgroundColor:'white', display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'center'}}> <h1 style={{fontFamily:'monospace'}}>Past Journeys</h1></Row>

                <Container className='mt-5 ' style={{width:'75em',minHeight:'40em'}} >

                    <Row style ={{backgroundColor:'white'}}>
                        <Col xs style ={{marginLeft:'1em',marginBottom:'5em'}}>
                            <form className='form-inline mt-5'>
                                <Col style={{ marginLeft: '3em'}}><h5>Starting Point</h5></Col>
                                <Col  style={{ marginLeft: '3em'}}><h5>Ending point</h5></Col>
                                <Col style={{ marginLeft: '3.5em'}}><h5>Fare</h5></Col>
                                <Col style={{ marginLeft: '3em'}}><h5>Distance</h5></Col>
                                <Col style={{ marginLeft: '3em'}}><h5>Date</h5></Col>
                            </form>
                            {

                                this.state.history.map(his => {
                                    if (his != null) {
                                        console.log(his['Start']);
                                        return (
                                            <div>
                                                <Row>
                                                    <Col>
                                                        <label style={{borderRadius: '0.4em', marginLeft: '4.5em',fontSize:'18px',}}>{his['Start']}</label>
                                                    </Col>
                                                    <Col>
                                                        <label style={{borderRadius: '0.4em', marginLeft: '4em',fontSize:'18px'}}>{his['End']}</label>
                                                    </Col>
                                                    <Col>
                                                        <label type='text' style={{marginLeft:'2.5em',fontSize:'18px'}}
                                                               >Rs. {his['Fare']}</label>
                                                    </Col>
                                                    <Col>
                                                        <label style={{borderRadius: '0.4em', marginLeft: '3em',fontSize:'18px'}}>{his['Distance']} Km</label>
                                                    </Col>
                                                    <Col>
                                                        <label style={{borderRadius: '0.4em', marginLeft: '1.5em',fontSize:'18px'}}>{his['date']}</label>
                                                    </Col>
                                                </Row>

                                            </div>
                                        )
                                    }
                                })
                            }


                        </Col>
                    </Row>
                </Container>
                <br/><br/>
                <Footer/>

            </div>
        );
    }
}
PastJourneys.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(PastJourneys);


