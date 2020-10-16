import React, {Component} from "react";
import {Nav, Navbar, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import Passenger from "../../assets/images/Passenger.png";
import Money from "../../assets/images/Money.png";
import Inspection from "../../assets/images/inspection.png";
import Crowd from "../../assets/images/crowd.png";
import Footer from "../footer";
class Stat_Main extends Component{
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
                <Row style ={{backgroundColor:'white', display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'center'}}> <h1 style={{fontFamily:'monospace'}}>Generate Reports</h1>
                </Row>
                <div style={{backgroundColor: 'lightgray', marginTop: '-2em'}}>
                    <Row style ={{marginLeft:'5em', display: 'flex',
                        flexDirection: 'column'}}> <h4>Report Categories</h4>
                    </Row>
                        <div>
                            <Row>
                            <Col>
                                <Row>
                                    <Col>
                                        <button style={{marginLeft:'10em',padding:'2em', border: "none",width:'12em'}}>
                                            <img src={Inspection} style={{width:'8em', height:'8em'}} className="form-check-label" value="Inspection" />
                                        </button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label><Link to ={'/ViewInspectors'} style={{marginLeft:'12em', color:'black', fontSize:'15px'}}>Inspection Stats</Link></label>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Col>
                                        <button style={{marginLeft:'7em',padding:'2em', border: "none",width:'12em'}}>
                                            <img src={Passenger} style={{width:'8em', height:'8em'}} className="form-check-label" value="Passenger" />
                                        </button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label><Link Link to ={'/ViewPassengers'}  style={{marginLeft:'10em', color:'black', fontSize:'15px'}}>Passenger Stats</Link></label>
                                    </Col>
                                </Row>
                            </Col>
                                <Col>
                                <Row>
                                    <Col>
                                        <button style={{marginLeft:'5em',padding:'2em', border: "none",width:'12em'}}>
                                            <img src={Money} style={{width:'8em', height:'8em'}} className="form-check-label" value="Money" />
                                        </button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label><Link Link to ={'/ViewFare'}  style={{marginLeft:'9em', color:'black', fontSize:'15px'}}>Fare Stats</Link></label>
                                    </Col>
                                </Row>
                            </Col>
                                <Col>
                                <Row>
                                    <Col>
                                        <button style={{marginLeft:'4em',padding:'2em', border: "none",width:'12em'}}>
                                            <img src={Crowd} style={{width:'8em', height:'8em'}} className="form-check-label" value="Crowd" />
                                        </button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label><Link Link to ={'/ViewCrowd'}  style={{marginLeft:'6em', color:'black', fontSize:'15px'}}>Overcrowding Stats</Link></label>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    <Col></Col>
                    <Col>
                        <Row>
                            <button style={{marginLeft:'75em',
                                borderRadius:'2em', border: "none", padding:'0.4em',width:'12em', color: 'white', backgroundImage:'linear-gradient(RGBA(182,82,80), RGBA(115,71,108))'}}
                                    type='submit'
                                    onClick={this.onPay}
                                    className="float-right mr-2"
                            >
                                Printing Options
                            </button>
                        </Row>
                        <Row>
                            <button style={{marginLeft:'75em',
                                borderRadius:'2em', border: "none", padding:'0.4em',width:'12em',marginBottom:'5em', color: 'white',  backgroundImage:'linear-gradient(RGBA(182,82,80), RGBA(115,71,108))'}}
                                    type='submit'
                                    onClick={this.onPay}
                                    className="float-right mr-2"
                            >
                                More >>
                            </button>
                        </Row>
                    </Col>
                </div>
                <Footer>
                </Footer>
            </div>
        )
    }
}
export default Stat_Main;