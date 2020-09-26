import React,{Component} from "react";
import {Row,Col,Container} from 'react-bootstrap';
import NavBar from "./Navbar";
import visa from '../assets/images/visa.png';
import master from '../assets/images/Master.png';
import css from '../assets/css/topup.css';
import axios from 'axios';
import Footer from "./footer"



class TopUp extends Component{

    constructor(props) {
        super(props);
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
                if(response.data[x]._id === "5f6754a91cc10b4a5c380ba7"){
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

            axios.post("/user/updateCredit/5f6754a91cc10b4a5c380ba7", credits)
                .then(res => console.log(res.data));

            alert("Account successfully updated with Rs." +this.state.amount);

        }

    }

    render() {
        return (
            <div style={{backgroundColor:'lightgrey' , height:'62em'}}>
                <NavBar/>
                <Row style ={{backgroundColor:'white', display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'center'}}> <h1 style={{fontFamily:'monospace'}}>Top up account</h1></Row>

                <Container className='mt-5'>
                    <Row><Col><h5>Recharge wallet</h5></Col><Col><h5>Current Wallet</h5></Col></Row>
                <Row style ={{backgroundColor:'white'}}>
                <Col  >

                    <form className='form-inline mt-5'>
                        <label>Add Amount</label>
                        <input type='number' style={{borderRadius:'0.4em'}} className='ml-5' placeholder='0.00' onChange={this.onAmountChange}
                               value={this.state.amount} required/>
                    </form>
                    <form className='form-inline mt-5'>
                        <label>Select Card type</label>
                        <input type="radio" name="test"  value="visa" id="inlineRadio" className="form-check-input"  checked={this.state.selectedRadio ==="visa"} />
                                <img src={visa} style={{width:'3em'}} className="form-check-label ml-4" value="visa" onClick={()=>this.onRadioChange('visa')} />

                        <input type="radio" name="test" value="master" id="inlineRadio"  className='ml-4' checked={this.state.selectedRadio ==="master"} />
                                <img src={master} style={{width:'3em',height:'3em'}}  id="inlineRadio" className='ml-4'  onClick={()=>this.onRadioChange('master')}  value="master"/>

                    </form>
                    <form className='form-inline mt-5'>
                        <label>Card Details</label>
                        <input type='text' style={{borderRadius:'0.4em'}} className='ml-5' placeholder='Name on card' onChange={this.onChangeName}  value={this.state.name}/>
                    </form>
                    <br/>
                    <input type='text' style={{borderRadius:'0.4em',marginLeft:'8.2em'}} placeholder='Card Number' required/>

                    <form className='form-inline mt-3'>
                        <input type='text' style={{borderRadius:'0.4em',marginLeft:'8.2em',width:'3em'}} placeholder='CSV' onChange={this.onChangeCSV} value={this.state.csv}/>
                        <input type='text' style={{borderRadius:'0.4em',marginLeft:'1.7em',width:'3em'}} placeholder='MM' onChange={this.onChangeMM} value={this.state.mm}/>
                        <input type='text' style={{borderRadius:'0.4em',marginLeft:'1.7em',width:'3em'}} placeholder='YY' onChange={this.onChangeYY} value={this.state.yy}/>
                    </form>
                    <br/>
                    <button style={{marginLeft:'18em',
                        borderRadius:'2em',padding:'0.4em',width:'5em',marginBottom:'5em', backgroundImage:'linear-gradient(RGBA(182,82,80), RGBA(115,71,108))'}}
                        type='submit'
                            onClick={this.onPay}
                    >
                        Pay
                    </button>
                </Col>
                    <div style={{borderLeft: '2px solid darkgrey',
                        height: '500px',
                        position: 'absolute',
                        left: '50%',
                        marginLeft: '-3px',
                        marginTop:'15.8em',
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
                <br/><br/><br/><br/>
                <Footer/>


            </div>

        );

    }
}

export default TopUp;
