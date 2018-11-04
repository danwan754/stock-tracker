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

    // console.log("watchListEditModal component:");
    // console.log(this.props.watchListObj);

    return (
      <div className="watch-list-options">
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
            <div className="watchList">
              <div className="watch-list-left-side">
                <WatchListMainEdit watchListName={this.props.watchListName} watchListObj={this.props.watchListObj} handleRemove={this.props.handleRemove} />
              </div>
            </div>
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
