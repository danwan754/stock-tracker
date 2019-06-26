import React, { Component } from "react";

class Contact extends Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  // post form
  onSubmit() {

  }

  render() {
    return (
      <div>
        <h2>Contact</h2>
        <br/>
        <p>Have suggestions on how to improve the site? Leave some feedback below.</p>
        <br/><br/>
        <form action="/feedback" method="post">
          Name (optional):<br/>
          <input type="text" placeholder="" name="name"/>
          <br/><br/>
          Email (optional):<br/>
          <input type="text" placeholder="" name="email"/>
          <br/><br/>
          Comment:<br/>
          <textarea rows="10" cols="50" name="body">
          </textarea>
          <br/><br/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Contact;
