import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import React, { Component } from "react";
import NewsList from "./NewsList";


class NewsModal extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false
    };
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
        <div className='suggestion more-news-button' onClick={this.handleShow}>
          More News
        </div>
        <ButtonToolbar>
          <Modal
            show={this.state.show}
            onHide={this.handleHide}
            dialogClassName="custom-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-lg">
                Suggested News
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <NewsList newsObj={this.props.newsObj} sliceLimit={this.props.sliceLimit} />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        </ ButtonToolbar>
      </div>
    )
  }
}

export default NewsModal;
