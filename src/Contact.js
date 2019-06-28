import React, { Component } from "react";

class Contact extends Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }


  onSubmit(event) {
    event.preventDefault();
    var contactForm = document.getElementById("feedback-form");
    const formData = new URLSearchParams(new FormData(contactForm));
    fetch('/api/feedback', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(result => {
      var message = result.message;
      contactForm.reset();
      var formMessage = document.getElementById("form-message");
      formMessage.style.display = "block";
      formMessage.innerHTML = message;
    })
  }

  render() {
    return (
      <div>
        <h2>Contact</h2>
        <br/>
        <p>Have suggestions on how to improve the site? Leave some feedback below.</p>
        <div id="form-message"></div>
        <br/><br/>
        <form id="feedback-form" onSubmit={this.onSubmit}>
          Email (optional):<br/>
          <input type="text" placeholder="" name="email"/>
          <br/><br/>
          Subject (optional):<br/>
          <input type="text" placeholder="" name="subject"/>
          <br/><br/>
          Comment:<br/>
          <textarea rows="10" cols="50" name="body">
          </textarea>
          <br/><br/>
          <input type="submit" value="Submit" />
          <br/><br/>
        </form>
      </div>
    );
  }
}

export default Contact;
