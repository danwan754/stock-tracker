import React, { Component } from "react";
import './watch-list-styles.css';
import WatchListMainEdit from './WatchListMainEdit';


import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';

class WatchListEditModal extends Component {

  constructor() {
    super();
    this.state = {
      show: false
    }
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }


  handleShow() {
    this.setState({ show: true });
  }

  handleHide() {
    this.setState({ show: false });
  }

  render() {
    return (
      <div>
        <Button id={this.props.watchList} onClick={this.handleShow}><i className="fa fa-ellipsis-v"></i></Button>
        <ButtonToolbar>
          <Modal
            show={this.state.show}
            onHide={this.handleHide}
            dialogClassName="custom-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-lg">
                Edit
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <WatchListMainEdit watchListName={this.props.watchListName} watchListObj={this.props.watchListObj} handleRemove={this.props.handleRemove} />
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal>
        </ ButtonToolbar>
      </div>
    )
  }

}

export default WatchListEditModal;
