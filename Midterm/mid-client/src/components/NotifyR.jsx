import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class NotifyR extends React.Component {
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
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>小叮嚀</ModalHeader>
          <ModalBody>
              好像會下雨呢，提醒你的家人吧！
          </ModalBody>
          <ModalFooter>
            <Button color="warning" onClick={this.toggle}>好的，我知道了！</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default NotifyR;
