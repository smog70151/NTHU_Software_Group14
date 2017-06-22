import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Button, Form, FormGroup, Input, InputGroupButton, Label, Col, UncontrolledAlert,
     Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import './About.css';

class About extends React.Component {
    static propTypes = {
        searchUser: PropTypes.string,
        searchPwd: PropTypes.string,
        loginModalToggle: PropTypes.bool,
        dispatch: PropTypes.func
    };

  constructor(props) {
    super(props);

}

  render() {

    return (
      <div className='About'>
          <Col sm={{ size: 6, push: 2, pull: 2, offset: 1 }}>
              <UncontrolledAlert color="danger" >
                This is Famallia Demo...<br/>
                If you find some bugs,<br/>
                Please report them for us, thank you !!!<br/>
                Besides, if you are avaliable,<br/>
                Please click the Famillia Butoon and
                fill out the sheet to help us improve our app.<br/>
                <Form action="https://docs.google.com/forms/d/e/1FAIpQLScKFQ8ushgQ5gZF2sTYXMSd55JmAAt_tyJQVObsYvP9PCh2dA/viewform?c=0&w=1">
                    <InputGroupButton >
                        <Button type='submit' outline v color='danger'>Familia Demo Sheets.</Button>
                    </InputGroupButton>
                </Form>
              </UncontrolledAlert>
          </Col>
          <Col sm={{ size: 6, push: 2, pull: 2, offset: 1 }}>
              <UncontrolledAlert color="warning" >
                 Contact Us :<br/>
                 Johnny - smog70151@gmail.com<br/>
                 Cocoa - a2324309@gmail.com<br/>
                 Terry - terry92516@gmail.com<br/>
                 Jimmy - jimmychiu702@gmail.com
              </UncontrolledAlert>
          </Col>
          <Col sm={{ size: 6, push: 2, pull: 2, offset: 1 }}>
              <UncontrolledAlert color="success" >
                 <br/>
                 Visit our web page :<br/>
                 <br/>
                 <Form action="https://jimmychiu702.github.io/Landingpage/">
                     <InputGroupButton >
                         <Button type='submit' outline block color='success'>Familia Landing Page.</Button>
                     </InputGroupButton>
                 </Form>
              </UncontrolledAlert>
          </Col>
      </div>
    );
  }


}

export default connect(state => ({
}))(About);
