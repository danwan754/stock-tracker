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
    this.numNewsArticles =  1
  }

  handleShow(event) {
    let company = event.target.id;
    this.props.newsObjArr.map(newsObj => {
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
    if (this.props.newsObjArr.length == 0) {
      return (
        <div>To see company news, add stocks to your watch list. (Currently only able to add to watchlist from Quote section)</div>
      )
    }
    return (
      <div>
        <table className="news-table">
          <tbody>
            {this.props.newsObjArr.length > 0? this.props.newsObjArr.map(newsObj => { return (
              <tr key={newsObj.rss.channel.description.toUpperCase()}>
                <td>
                  <Button bsStyle="primary" className="company-select-button" id={newsObj.rss.channel.description.toUpperCase()} onClick={this.handleShow}>
                    {newsObj.rss.channel.description.toUpperCase()}
                  </Button>
                </td>
                <td>
                  <NewsList newsObj={newsObj} sliceLimit={this.numNewsArticles} />
                </td>
              </tr>
            )}) : false }
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
