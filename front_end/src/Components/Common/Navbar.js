import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, NavItem, NavDropdown, MenuItem, Form} from 'react-bootstrap';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";




class Navbar extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        // const {user} = this.props.auth;


        return (

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
                        <Nav.Link>
                            <Link className=" nav-link " to="/SignUp" style={{color: 'white', fontSize: '1.2em'}}>
                                Register
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
                            width: "150px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem"
                        }}
                        onClick={this.onLogoutClick}
                        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                    >
                        Logout
                    </button>
                </Navbar.Collapse>
            </Navbar>


        );
    };
}
    Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
    const mapStateToProps = state => ({
    auth: state.auth
});
    export default connect(
    mapStateToProps,
    { logoutUser }
)(Navbar);


