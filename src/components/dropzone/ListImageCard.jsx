/* eslint-disable no-restricted-properties */
import React, { Component } from 'react';
import filter from 'lodash/filter';

class ListImage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { file, input } = this.props;
    return (
      <div className="card">
        <span
          className="pull-right clickable close-icon"
          onKeyDown={this.handleKeyDown}
          role="button"
          tabIndex="0"
          onClick={() => {
            const y = input.value;
            const remainingFiles = filter(y, o => o.name !== file.name);
            input.onChange(remainingFiles);
          }}
        >
          <i className="fas fa-times" />
        </span>
        <a
          href={file.preview}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center"
        >
          <img href={file.preview} src={file.preview} height="100" alt="Card" />
        </a>
        {/* <div className="card-body p-0 mt-3">
          <p className="card-text">
            {file.name}
            <br />
            <small style={{ fontSize: 11 }}>
              {Math.round(file.size / Math.pow(2, 10)).toLocaleString()}
              KB
            </small>
          </p>
        </div> */}
      </div>
    );
  }
}

export default ListImage;
