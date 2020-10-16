import React, {Component} from "react";
import {Nav, Navbar, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import Passenger from "../../assets/images/Passenger.png";
import Money from "../../assets/images/Money.png";
import Inspection from "../../assets/images/inspection.png";
import Crowd from "../../assets/images/crowd.png";
import Footer from "../Common/footer";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

const Session = props =>(
    <tr>
        <td style={{justifyContent: 'center', textAlign: 'center',color: 'white',fontSize: '15px'}}>{props.Pass.from}</td>
        <td style={{justifyContent: 'center', textAlign: 'center',color: 'white',fontSize: '15px'}}>{props.Pass.to}</td>
        <td style={{justifyContent: 'center', textAlign: 'center',color: 'white',fontSize: '15px'}}>{props.Pass.count}</td>
    </tr>
)
class Passenger_Stats extends Component{
    constructor(props) {
        super(props);

        this.state = {
            Passengers:[],
            loading: true,
        };

        this.PassengerList = this.PassengerList.bind(this);

    }

    componentDidMount() {
        axios.get('/reports/getUsers')
            .then(res => {
                console.log(res.data);
                this.setState({
                    Passengers:res.data.journeys,
                    loading:false
                })
            });
    }

    PassengerList() {
        return this.state.Passengers.map(Passe => {
            return <Session Pass={Passe} key={Passe._id}/>;
        })
    }

    render() {
        return(
            <div>
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
                                    Statistics
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link className=" nav-link " to="/History" style={{color: 'white', fontSize: '1.2em'}}>
                                    Reports
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link className=" nav-link " to="" style={{color: 'white', fontSize: '1.2em'}}>
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
                <Row style ={{marginLeft:'5em', display: 'flex',justifyContent: 'center',
                    textAlign: 'center',
                    flexDirection: 'column'}}> <h4>Passenger Details</h4>
                </Row>
                <div id="page-container" className='main mb-4'>
                    <Container>
                        <Table responsive className='bg-secondary text-center'>
                            <thead>
                            {this.state.loading ? <center><Spinner animation="border" /></center> :
                                <tr>
                                    <th style={{fontSize: '15px'}}>Start Point</th>
                                    <th style={{fontSize: '15px'}}>End Point</th>
                                    <th style={{fontSize: '15px'}}>No of Passengers</th>
                                </tr>
                            }
                            </thead>
                            <tbody>
                            {this.PassengerList()}
                            </tbody>
                        </Table>
                    </Container>
                </div>
                <Col>
                    <Row>
                        <button style={{marginLeft:'75em',
                            borderRadius:'2em', border: "none", padding:'0.4em',width:'12em', color: 'white', backgroundImage:'linear-gradient(RGBA(182,82,80), RGBA(115,71,108))'}}
                                type='submit'
                                onClick={window.print}
                                className="float-right mr-2 mb-4"
                        >
                            Print
                        </button>
                    </Row>
                </Col>
                <Footer>
                </Footer>
            </div>
        )
    }
}
export default Passenger_Stats;
