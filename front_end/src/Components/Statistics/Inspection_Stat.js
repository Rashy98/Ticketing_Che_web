import React, {Component} from "react";
import {Nav, Navbar, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import Footer from "../footer";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

const Session = props =>(
    <tr>
        <td style={{justifyContent: 'center', textAlign: 'center',color: 'white',fontSize: '15px'}}>{props.Inspects.inspectorId}</td>
        <td style={{justifyContent: 'center', textAlign: 'center',color: 'white',fontSize: '15px'}}>{props.Inspects.inspectorName}</td>
        <td style={{justifyContent: 'center', textAlign: 'center',color: 'white',fontSize: '15px'}}>{props.Inspects.vehicleId}</td>
        <td style={{justifyContent: 'center', textAlign: 'center',color: 'white',fontSize: '15px'}}>{props.Inspects.start}</td>
        <td style={{justifyContent: 'center', textAlign: 'center',color: 'white',fontSize: '15px'}}>{props.Inspects.end}</td>
        <td style={{justifyContent: 'center', textAlign: 'center',color: 'white',fontSize: '15px'}}>{props.Inspects.validTicketCount}</td>
        <td style={{justifyContent: 'center', textAlign: 'center',color: 'white',fontSize: '15px'}}>{props.Inspects.invalidTicketCount}</td>
        <td style={{justifyContent: 'center', textAlign: 'center',color: 'white',fontSize: '15px'}}>{props.Inspects.totalPassengerCount}</td>
    </tr>
)

class Inspection_Stat extends Component{

    constructor(props) {
        super(props);

        this.state = {
            Inspections:[],
            loading: true,
        };

        this.InspectionList = this.InspectionList.bind(this);

    }

    componentDidMount() {
        axios.get('/reports/getInspections')
            .then(res => {
                console.log(res.data);
                this.setState({
                    Inspections:res.data.result,
                    loading:false
                })
            });
    }

    InspectionList() {
        return this.state.Inspections.map(Inspect => {
            return <Session Inspects={Inspect} key={Inspect._id}/>;
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
                <Row style ={{marginLeft:'5em', display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                    flexDirection: 'column'}}> <h4>Inspection Details</h4>
                </Row>
                <div id="page-container" className='main mb-4'>
                    <Container>
                        <Table responsive className='bg-secondary text-center'>
                            <thead>
                            {this.state.loading ? <center><Spinner animation="border" /></center> :
                                <tr>
                                    <th style={{fontSize: '15px'}}>Inspector Id</th>
                                    <th style={{fontSize: '15px'}}>Inspector Name</th>
                                    <th style={{fontSize: '15px'}}>Vehicle Id</th>
                                    <th style={{fontSize: '15px'}}>Start</th>
                                    <th style={{fontSize: '15px'}}>End</th>
                                    <th style={{fontSize: '15px'}}>Valid Ticket Count</th>
                                    <th style={{fontSize: '15px'}}>Invalid Ticket Count</th>
                                    <th style={{fontSize: '15px'}}>Total Passenger Count</th>
                                </tr>
                            }
                            </thead>
                            <tbody>
                            {this.InspectionList()}
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
export default Inspection_Stat;