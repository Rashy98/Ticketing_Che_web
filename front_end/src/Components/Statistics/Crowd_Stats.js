import React, {Component} from "react";
import {Nav, Navbar, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import Footer from "../Common/footer";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
const Session = props =>(
    <tr>
        <td style={{justifyContent: 'center', textAlign: 'center',color: 'white',fontSize: '15px'}}>{props.Crow.station}</td>
        <td style={{justifyContent: 'center', textAlign: 'center',color: 'white',fontSize: '15px'}}>{props.Crow.count}</td>
    </tr>
)
const EndSt = props =>(
    <tr>
        <td style={{justifyContent: 'center', textAlign: 'center',color: 'white',fontSize: '15px'}}>{props.Crow.station}</td>
        <td style={{justifyContent: 'center', textAlign: 'center',color: 'white',fontSize: '15px'}}>{props.Crow.count}</td>
    </tr>
)

class Crowd_Stats extends Component{
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    constructor(props) {
        super(props);

        this.state = {
            Crowd:[],
            EndCrowd:[],
            loading: true,
        };

        this.StationList = this.StationList.bind(this);
        this.EndStationList = this.EndStationList.bind(this);

    }

    componentDidMount() {
        axios.get('/reports/getUsers')
            .then(res => {
                console.log(res.data);
                this.setState({
                    Crowd:res.data.startStations,
                    EndCrowd: res.data.endStations,
                    loading:false
                })
            });
    }

    StationList() {
        return this.state.Crowd.map(Cr => {
            return <Session Crow={Cr} key={Cr._id}/>;
        })
    }
    EndStationList() {
        return this.state.EndCrowd.map(Cr => {
            return <EndSt Crow={Cr} key={Cr._id}/>;
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
                    flexDirection: 'column'}}> <h4>Overcrowding Details</h4>
                </Row>
                <Row style ={{marginLeft:'5em', display: 'flex',justifyContent: 'center',
                    textAlign: 'center',
                    flexDirection: 'column'}}> <h5 style={{color: 'white'}}>Start Station Details</h5>
                </Row>
                <div id="page-container" className='main mb-4'>
                    <Container>
                        <Table responsive className='bg-secondary text-center'>
                            <thead>
                            {this.state.loading ? <center><Spinner animation="border" /></center> :
                                <tr>
                                    <th style={{fontSize: '15px'}}>Start Station</th>
                                    <th style={{fontSize: '15px'}}>No of Passengers</th>
                                </tr>
                            }
                            </thead>
                            <tbody>
                            {this.StationList()}
                            </tbody>
                        </Table>
                    </Container>
                </div>
                <Row style ={{marginLeft:'5em', display: 'flex',justifyContent: 'center',
                    textAlign: 'center',
                    flexDirection: 'column'}}> <h5 style={{color: 'white'}}>End Station Details</h5>
                </Row>
                <div id="page-container" className='main mb-4'>
                    <Container>
                        <Table responsive className='bg-secondary text-center'>
                            <thead>
                            {this.state.loading ? <center><Spinner animation="border" /></center> :
                                <tr>
                                    <th style={{fontSize: '15px'}}>End Station</th>
                                    <th style={{fontSize: '15px'}}>No of Passengers</th>
                                </tr>
                            }
                            </thead>
                            <tbody>
                            {this.EndStationList()}
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
// export default Crowd_Stats;
Crowd_Stats.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(Crowd_Stats);
