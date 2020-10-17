import React,{Component} from "react";
import axios from "axios";
import {Bar,Pie} from 'react-chartjs-2';
import {Nav, Navbar, Row,Card,Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import Footer from "../Common/footer";

class AllStatistics extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            Passengers: [],
            Start: [],
            End: [],
            countsPerPath: [],
            inOut:[],
            endOut:[]

        }
    }

    async componentDidMount() {

        let user = await axios.get('/reports/getUsers')
        console.log(user);
        if (user) {
            this.setState({
                Passengers: user.data.journeys,
                Start: user.data.startStations,
                End: user.data.endStations,
            })
        }
        console.log(user.data.journeys)
        this.CountAccordingToPath(user.data.journeys);
        this.InAndOutFromStation(user.data.startStations, user.data.endStations);
    }


    CountAccordingToPath(userData) {

        let path = [];
        userData.map(mp => {
            path.push(mp.from + "-" + mp.to);
        })
        let count = [];
        userData.map(countD => {
            count.push(countD.count);
        })

        this.setState({
            countsPerPath: {
                labels: path,
                datasets: [{
                    label: 'Passenger count',
                    data: count
                    ,
                    backgroundColor: [
                        '#bc5090',
                        '#ef5675',
                        '#ff764a',
                        '#ffa600',
                        '#003f5c',
                        '#7a5195',
                        '#bc5090',
                        '#ef5675',
                        '#ff764a',
                        '#ffa600',
                        '#003f5c',
                        '#7a5195',
                    ],
                    hoverBackgroundColor: [
                        '#bc5090',
                        '#ef5675',
                        '#ff764a',
                        '#ffa600',
                        '#003f5c',
                        '#7a5195',
                        '#bc5090',
                        '#ef5675',
                        '#ff764a',
                        '#ffa600',
                        '#003f5c',
                        '#7a5195'
                    ]
                }]
            }
        })
    }


    InAndOutFromStation(startData, endData) {

        let Stands = [];
        let Start=[];
        let End=[];
        let Data = [{station: "", stCount: "", endCount: ""}];
        startData.map(mp => {
            Stands.push(mp.station);
        })

        Stands.map(st =>{
            endData.map(end =>{
                if(st === end.station){
                    End.push(end.count);
                }
            })
        })
        let newRooms = Data.map((Nroom, ridx) => {
            endData.map(ed => {
                startData.map(mp => {
                    if (ed.station === mp.station) {
                        Start.push(mp.count);
                        return {...Nroom, station: ed.station, stCount: mp.count, endCount: ed.count};
                    }
                });
                // Data = [{station: ed.station,stCount: mp.count,endCount: ed.count}]
            })
        })

        console.log(newRooms);
        this.setState({
            inOut: {
                labels: Stands,
                datasets: [{
                    label: 'Number of passengers starting at each station',
                    data: Start
                    ,
                    backgroundColor: [
                        '#bc5090',
                        '#ef5675',
                        '#ff764a',
                        '#ffa600',
                        '#003f5c',
                        '#7a5195',
                        '#bc5090',
                        '#ef5675',
                        '#ff764a',
                        '#ffa600',
                        '#003f5c',
                        '#7a5195',
                    ],
                    hoverBackgroundColor: [
                        '#bc5090',
                        '#ef5675',
                        '#ff764a',
                        '#ffa600',
                        '#003f5c',
                        '#7a5195',
                        '#bc5090',
                        '#ef5675',
                        '#ff764a',
                        '#ffa600',
                        '#003f5c',
                        '#7a5195'
                    ]
                }]
            },
            endOut: {
                labels: Stands,
                datasets: [{
                    label: 'Number of passengers ending at each station',
                    data: End
                    ,
                    backgroundColor: [
                        '#bc5090',
                        '#ef5675',
                        '#ff764a',
                        '#ffa600',
                        '#003f5c',
                        '#7a5195',
                        '#bc5090',
                        '#ef5675',
                        '#ff764a',
                        '#ffa600',
                        '#003f5c',
                        '#7a5195',
                    ],
                    hoverBackgroundColor: [
                        '#bc5090',
                        '#ef5675',
                        '#ff764a',
                        '#ffa600',
                        '#003f5c',
                        '#7a5195',
                        '#bc5090',
                        '#ef5675',
                        '#ff764a',
                        '#ffa600',
                        '#003f5c',
                        '#7a5195'
                    ]
                }]
            }
        })
    }



    render() {
        // this.CountAccordingToPath(this.state.Passengers);
        const {user} = this.props.auth
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
                                <Link className=" nav-link " to="/Help" style={{color: 'white', fontSize: '1.2em'}}>
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
                    textAlign: 'center'}}> <h3 style={{fontFamily:'Fira Sans'}}>Statistics</h3></Row>
                <Row>
                    <Col>
                        <Card style={{width:'60em',marginLeft:'2em',heght:'45em',marginTop:'3em'}}>
                            <Bar data={this.state.countsPerPath}
                                 options={{
                                     scales: {
                                         yAxes: [{
                                             ticks: {
                                                 beginAtZero: true
                                             }
                                         }]
                                     }}}
                            />
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{width:'40em',marginLeft:'1em'}}>
                            <Bar data={this.state.inOut}
                                 options={{
                                     scales: {
                                         yAxes: [{
                                             ticks: {
                                                 beginAtZero: true
                                             }
                                         }]
                                     }}}
                            />
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{width:'45em',marginLeft:'64em',marginTop:'-10em'}}>
                            <Bar data={this.state.endOut}
                                 options={{
                                     scales: {
                                         yAxes: [{
                                             ticks: {
                                                 beginAtZero: true
                                             }
                                         }]
                                     }}}
                            />
                        </Card>
                    </Col>
                </Row>

            <Footer/>
            </div>
        );
    }

}

AllStatistics.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(AllStatistics);
