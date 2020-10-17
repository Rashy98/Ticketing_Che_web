import React,{Component} from "react";
import {Row, Col, Container, Nav} from 'react-bootstrap';
import {Navbar} from 'react-bootstrap';
import NavBar from "./Common/Navbar";
import visa from '../assets/images/visa.png';
import master from '../assets/images/Master.png';
import '../assets/css/topup.css';
import axios from 'axios';
import Footer from "../Components/Common/footer"
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../actions/authActions";



class TopUp extends Component{

    constructor(props) {
        super(props);

        // variables
        this.state={
            selectedRadio :"visa",
            amount:0.00,
            users:[],
            history:[],
            earlierCred: 0,
            name:"",
            csv:"",
            mm:"",
            yy:"",
        }

        this.onRadioChange = this.onRadioChange.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCSV = this.onChangeCSV.bind(this);
        this.onChangeMM = this.onChangeMM.bind(this);
        this.onChangeYY = this.onChangeYY.bind(this);
        this.onPay = this.onPay.bind(this);

    }

    //
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
            const  id = this.props.auth.user.id;
            axios.post("/user/updateCredit/"+id, credits)
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
        console.log(user.id)
        return (

            <div style={{backgroundColor:'lightgrey' , height:'62em',width:'101%'}}>
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
                                <Link className=" nav-link " to="/" style={{color: 'white', fontSize: '1.2em'}}>
                                    Help
                                </Link>
                            </Nav.Link>
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
                    textAlign: 'center'}}> <h1 style={{fontFamily:'monospace'}}>Top up account</h1></Row>

                <Container className='mt-5'  >
                    <Row><Col><h5>Recharge wallet</h5></Col><Col><h5>Current Wallet</h5></Col></Row>
                <Row style ={{backgroundColor:'white'}}>
                <Col style ={{width:'101%'}} >

                    <form className='form-inline mt-5 ml-5'>
                        <label>Add Amount</label>
                        <input type='number' style={{borderRadius:'0.4em', border:'2px solid grey', width:'10em', height:'1.5em'}} className='ml-5' placeholder='Amount in LKR' onChange={this.onAmountChange}
                               value={this.state.amount} required/>
                    </form>
                    <form className='form-inline mt-5 ml-5'>
                        <label>Select Card type</label>
                        <input type="radio" name="test"  value="visa" id="inlineRadio" className="form-check-input"  checked={this.state.selectedRadio ==="visa"} />
                                <img src={visa} style={{width:'3em'}} className="form-check-label ml-4" value="visa" onClick={()=>this.onRadioChange('visa')} />

                        <input type="radio" name="test" value="master" id="inlineRadio"  className='ml-4' checked={this.state.selectedRadio ==="master"} />
                                <img src={master} style={{width:'3em',height:'3em'}}  id="inlineRadio" className='ml-4'  onClick={()=>this.onRadioChange('master')}  value="master"/>

                    </form>
                    <form className='form-inline mt-5 ml-5'>
                        <label>Card Details</label>
                        <input type='text' style={{borderRadius:'0.4em', border:'2px solid grey', width:'10em', height:'1.5em'}} className='ml-5' placeholder='Name on card' onChange={this.onChangeName}  value={this.state.name}/>
                    </form>
                    <br/>
                    <input type='text' style={{borderRadius:'0.4em', border:'2px solid grey', width:'10em', height:'1.5em', marginLeft:'9.5em'}} placeholder='Card Number' required/>

                    <form className='form-inline mt-3'>
                        <input type='number' style={{borderRadius:'0.4em',marginLeft:'9.5em',width:'3em', border:'2px solid grey', height:'1.5em'}} placeholder='CSV' onChange={this.onChangeCSV} value={this.state.csv}/>
                        <input type='number' style={{borderRadius:'0.4em',marginLeft:'0.3em',width:'3em',border:'2px solid grey', height:'1.5em'}} placeholder='MM' onChange={this.onChangeMM} value={this.state.mm}/>
                        <input type='number' style={{borderRadius:'0.4em',marginLeft:'0.3em',width:'3em',border:'2px solid grey', height:'1.5em'}} placeholder='YY' onChange={this.onChangeYY} value={this.state.yy}/>
                    </form>
                    <br/>
                    <button style={{marginLeft:'18em',
                        borderRadius:'2em',padding:'0.4em',width:'5em',marginBottom:'5em', backgroundImage:'linear-gradient(RGBA(182,82,80), RGBA(115,71,108))',color:'white',border:"none"}}
                        type='submit'
                            onClick={this.onPay}
                    >
                        Pay
                    </button>
                </Col>
                    <div style={{borderLeft: '2px solid darkgrey',
                        height: '498px',
                        position: 'absolute',
                        left: '50%',
                        marginLeft: '-3px',
                        marginTop:'17.7em',
                        top: '0'}} />
                    <Col xs style ={{marginLeft:'1em'}}>
                        <form className='form-inline mt-5'>
                            <label>Current Balance</label>
                            <label type='text' style={{borderRadius:'0.4em'}} className='ml-5'>Rs. {this.state.earlierCred}</label>
                        </form>
                        <form className='form-inline mt-5'>
                            <label>Recent Transactions</label>
                        </form>
                        {

                            this.state.history.map(his => {
                                if (his != null) {
                                    console.log(his['Start']);
                                    return (
                                        <div>
                                            <Row>
                                                <Col>
                                                <label style={{borderRadius: '0.4em', marginLeft: '4.5em'}}>{his['Start']} - {his['End']}</label>
                                                </Col>
                                                <Col>
                                                <label type='text' style={{borderRadius: '0.4em'}}
                                                       className='ml-4'>Rs. {his['Fare']}</label>
                                                </Col>
                                            </Row>

                                        </div>
                                    )
                                }
                            })
                        }

                        {/*<label  style={{borderRadius:'0.4em',marginLeft:'4.5em'}}>Colombo - Rajagiriya</label>*/}

                    </Col>
                </Row>
                </Container>
                <br/><br/>
                <Footer>
                </Footer>


            </div>

        );

    }
}

TopUp.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(TopUp);
