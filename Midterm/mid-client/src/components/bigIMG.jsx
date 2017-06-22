import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import './bigIMG.css'

class BigIMG extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    this.props.close();
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalBody className='IMG'>
              <img src={this.props.url}/>
          </ModalBody>
          <ModalFooter>
            <Button color="warning" onClick={this.toggle}>關閉</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default BigIMG;
