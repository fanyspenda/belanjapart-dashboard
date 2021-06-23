import React, { Component } from 'react';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory({
  forceRefresh: true
});

class ButtonCancel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <button
        type="button"
        onClick={() => {
          history.goBack();
        }}
        className="btn btn-outline-primary mr-2"
      >
        Cancel
      </button>
    );
  }
}

export default ButtonCancel;
