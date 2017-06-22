import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Input,
    Button,
    ButtonGroup
} from 'reactstrap';
import {connect} from 'react-redux';

import About from 'components/About.jsx';
import Today from 'components/Today.jsx';
import Gallery from 'components/Gallery.jsx'
import Signup from 'components/Signup.jsx';
import Login from 'components/Login.jsx';
import {setRole} from 'states/post-actions.js';
import {toggleNavbar} from 'states/main-actions.js';
import {
    toggleModal, loginAccount, logoutAccount, inputSignUpOK
} from 'states/account-actions.js';

import './Main.css';

class Main extends React.Component {
    static propTypes = {
        role: PropTypes.string,
        navbarToggle: PropTypes.bool,
        store: PropTypes.object,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
        console.log("MAIN");
        console.log(this.props);
        console.log("ENDMAIN");

        this.searchEl = null;

        this.handleModaltoggle  = this.handleModaltoggle.bind(this);
        this.handleClearSearch = this.handleClearSearch.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.handleNavbarToggle = this.handleNavbarToggle.bind(this);
        this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
        this.handleClearSearch = this.handleClearSearch.bind(this);

        this.handleSignup = this.handleSignup.bind(this);
    }

    componentDidMount() {
        this.handleRoleChange('parent');
    }

    render() {

        return (
            <Router>
                <div className='main'>
                    <div className='navbar-inverse bg'>
                        <div className='container'>
                            <Navbar color='navbar-inverse bg' light toggleable>
                                <NavbarToggler right onClick={this.handleNavbarToggle}/>
                                <NavbarBrand className='text-white' href="/"><span id="F">F</span><span id="amilia">amilia</span></NavbarBrand>
                                <Collapse isOpen={this.props.navbarToggle} navbar>
                                    <Nav navbar>
                                        <NavItem>
                                            <NavLink tag={Link} to='/'>塗鴉牆</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} to='/gallery'>圖片集</NavLink>
                                        </NavItem>

                                    </Nav>
                                    <Nav navbar className='ml-auto'>
                                        <NavItem>
                                            { !this.props.isLogin && <NavLink tag={Link} to='/login' onClick={this.handleModaltoggle}> 登入 </NavLink>}
                                            {  this.props.isLogin && <NavLink tag={Link} to='/login' onClick={this.handleLogOut}> 登出 </NavLink>}
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} onClick={this.handleSignup} to='/signup'>註冊</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} to='/about'>關於</NavLink>
                                        </NavItem>
                                    </Nav>
                                </Collapse>
                            </Navbar>
                        </div>
                    </div>

                    <Route exact path="/" render={() => (
                        <Today />
                    )}/>
                    <Route exact path="/gallery" render={() => (
                        <Gallery account={this.props.searchUser}/>
                    )}/>
                    <Route exact path="/signup" render={() => (
                        <Signup />
                    )}/>
                    <Route exact path="/login" render={() => (
                        <Login />
                    )}/>
                    <Route exact path="/about" render={() => (
                        <About />
                    )}/>
                    <div className='footer'>
                        Familia
                    </div>
                </div>
            </Router>
        );
    }

    handleSignup() {
        this.props.dispatch(inputSignUpOK(false,false));
    }

    handleNavbarToggle() {
        this.props.dispatch(toggleNavbar());
    }

    handleSearchKeyPress(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13){
            this.props.dispatch(setSearchText(e.target.value));
        }
    }

    handleUpload(){
        console.log('tt');
        var upload = querySelector("#upload-input");
        console.log(upload);
        upload.click();
    }

    handleRoleChange(role) {
        this.props.dispatch(setRole(role));
    }

    handleClearSearch() {
        this.props.dispatch(setSearchText(''));
        this.searchEl.value = '';
    }

    handleModaltoggle() {
      this.props.dispatch(toggleModal());
    }

    handleLogOut(){
        this.props.dispatch(logoutAccount());
    }
}

export default connect(state => ({
    ...state.main,
    role: state.role,
    ...state.loginModalToggle,
    ...state.loginAccount,
    ...state.signUpToggle,
    isLogin: state.loginAccount.isLogin,
    searchUser:state.searchLogin.searchUser
}))(Main);
