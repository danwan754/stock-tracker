import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import React, { Component } from "react";
import NewsList from "./NewsList";


class NewsCompanyModal extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
      currentCompanyNewsObj: {}
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }

  handleShow(event) {

    let company = event.target.id;

    // // remove the highlighting of current company
    // if (Object.keys(this.state.currentCompanyNewsObj).length > 0) {
    //   document.getElementById(this.state.currentCompanyNewsObj.rss.channel.description).style.backgroundColor = "";
    // }

    this.props.newsObjArr.map(newsObj => {
      // console.log("newsoBj: " + newsObj.rss.channel.description);
      if (newsObj.rss.channel.description == company) {
        this.setState( {
          currentCompanyNewsObj: newsObj,
          show: true
        });
        return;
      }
    })
  }


  handleHide() {
    this.setState({ show: false });
  }

  render() {
    return (
      <div>
        <table>
        <tbody>
          {this.props.newsObjArr.length > 0? this.props.newsObjArr.map(newsObj => { return (
            <tr key={newsObj.rss.channel.description.toUpperCase()}>
              <td>
                <Button bsStyle="primary" id={newsObj.rss.channel.description.toUpperCase()} onClick={this.handleShow}>
                  {newsObj.rss.channel.description.toUpperCase()}
                </Button>
              </td>
              <td>
                <NewsList newsObj={newsObj} sliceLimit={1} />
              </td>
            </tr>
          )}) : false}
        </tbody>
        </table>
        <Modal
          show={this.state.show}
          onHide={this.handleHide}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">
              {Object.keys(this.state.currentCompanyNewsObj).length > 0? this.state.currentCompanyNewsObj.rss.channel.description.toUpperCase() : 'No company selected'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {Object.keys(this.state.currentCompanyNewsObj).length > 0? <NewsList newsObj={this.state.currentCompanyNewsObj} sliceLimit={this.props.sliceLimit} /> : 'No company selected'}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default NewsCompanyModal;

// <div className='suggestion more-news-button' id={newsObj.rss.channel.description.toUpperCase()} onClick={this.handleShow}>
