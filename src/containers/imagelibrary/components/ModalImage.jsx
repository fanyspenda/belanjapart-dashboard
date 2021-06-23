import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { nullPicture } from '@actions/file.action';
import FieldDropzoneBulk from '@components/dropzone/FieldDropzoneBulk';
import SelectType from '@components/select/SelectType';
import { reduxForm } from 'redux-form';

class ModalImage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      typeImage: null,
      optType: [
        { label: 'attribute', value: 'attribute' },
        { label: 'category', value: 'category' },
        { label: 'product', value: 'product' }
      ]
    };
  }

  handleChangeType = type => {
    this.setState({ typeImage: type });
  };

  render() {
    const { toggle, nullPicture } = this.props;
    const otherFunction = {
      handleChangeType: this.handleChangeType
    };
    return (
      <Fragment>
        <ModalHeader className="modal-head-product" />
        <ModalBody className="modal-body-product">
          <div className="row">
            <div className="col-md-12">
              <FieldDropzoneBulk
                {...this.props}
                {...this.state}
                {...otherFunction}
              />
            </div>
            <div className="col-md-12">
              <SelectType
                opt={this.state.optType}
                onChange={e => this.handleChangeType(e.value)}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="modal-foot border border-0">
          <div className="row text-center">
            <div className="col-md-6">
              <Button
                type="button"
                className="btn btn-green-dark text-white"
                onClick={() => {
                  toggle();
                  nullPicture();
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </ModalFooter>
      </Fragment>
    );
  }
}

export default reduxForm({ form: 'formImageBulk' })(
  connect(null, { nullPicture })(ModalImage)
);
