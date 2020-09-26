import React,{Component} from "react";
import {Row,Col,Container} from 'react-bootstrap';
import NavBar from "./Navbar";
import visa from '../assets/images/visa.png';
import master from '../assets/images/Master.png';
import css from '../assets/css/topup.css';
import axios from 'axios';
import Footer from "./footer"



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
                    textAlign: 'center'}}> <h1 style={{fontFamily:'monospace'}}>Past Journeys</h1></Row>

                <Container className='mt-5 ' style={{width:'50em'}}>

                    <Row style ={{backgroundColor:'white'}}>
                        <Col xs style ={{marginLeft:'1em',marginBottom:'5em'}}>
                            <form className='form-inline mt-5'>
                                <Col style={{ marginLeft: '3em'}}><h5>Starting Point</h5></Col>
                                <Col  style={{ marginLeft: '3em'}}><h5>Ending point</h5></Col>
                                <Col style={{ marginLeft: '3.5em'}}><h5>Fare</h5></Col>
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
                <Footer/>

            </div>
        );
    }
}

export default PastJourneys;
