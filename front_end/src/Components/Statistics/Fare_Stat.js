import React, {Component} from "react";
import {Nav, Navbar, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import Passenger from "../../assets/images/Passenger.png";
import Money from "../../assets/images/Money.png";
import Inspection from "../../assets/images/inspection.png";
import Crowd from "../../assets/images/crowd.png";
import Footer from "../Common/footer";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
const Fare = props =>(
    //Generate table data
    <tr>
        <td style={{justifyContent: 'center', fontWeight:'bold',textAlign: 'center',color: 'RGBA(182,82,80)',fontSize: '15px'}}>{props.fare.busStand}</td>
        <td style={{justifyContent: 'center',fontWeight:'bold', textAlign: 'center',color: 'RGBA(115,71,108)',fontSize: '15px'}}>{props.fare.DistanceFromCol}</td>
    </tr>
)

class Fare_Stat extends Component{

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    constructor(props) {
        super(props);
        //variable
        this.state = {
            Fares:[],
            loading: true,
        };

        this.FareList = this.FareList.bind(this);

    }

    componentDidMount() {
        axios.get('/reports/getBusStand')
            .then(res => {
                this.setState({
                    Fares:res.data.result,
                    loading:false
                })
            });
    }

    FareList() {
        return this.state.Fares.map(Far => {
            return <Fare fare={Far} key={Far._id}/>;
        })
    }
    render() {
        const {user} = this.props.auth
        console.log(user.id)
        return(
            <div>
                <Navbar style={{
                    backgroundImage: 'linear-gradient(RGBA(182,82,80), RGBA(115,71,108))',
                    height: '8em',
                    width: "100%"
                }} expand="lg">
                    <Navbar.Brand>
                        <Link to='/Help'>
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
                                <Link className=" nav-link " to="/Statistics" style={{color: 'white', fontSize: '1.2em'}}>
                                    Statistics
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link className=" nav-link " to="/Help" style={{color: 'white', fontSize: '1.2em'}}>
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
                    textAlign: 'center'}}> <h3 style={{fontFamily:'Fira Sans'}}>Fare Details</h3></Row>

                <div id="page-container" className='main mb-4' style={{minHeight:'38em'}}>
                    <Container>
                        <Table responsive className='bg-light text-center' style={{width:'60em', marginLeft:'6em',font:'purple'}}>
                            <thead>
                            {this.state.loading ? <center><Spinner animation="border" /></center> :
                                <tr>
                                    <th style={{fontSize: '15px', width: '30em'}}>BusStand Name</th>
                                    <th style={{fontSize: '15px', width: '30em'}}>Fare</th>
                                </tr>
                            }
                            </thead>
                            <tbody>
                            {this.FareList()}
                            </tbody>
                        </Table>
                    </Container>
                </div>
                <Col>
                    <Row>
                        <button style={{marginLeft:'75em',
                            width: "120px",
                            borderRadius: "20px",
                            letterSpacing: "1.5px",
                            marginRight:"2rem",
                            color:"black",
                            border:'none',
                            backgroundColor:'white'}}
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
//export default Fare_Stat ;
Fare_Stat.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(Fare_Stat);
