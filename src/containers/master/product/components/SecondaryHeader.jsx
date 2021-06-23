import React from 'react';
import { Modal } from 'reactstrap';
import ModalUploadCsv from '@components/modal/ModalUploadCsv';

class SecondaryHeader extends React.Component {
  state = {
    isOpen: false
  };

  toggleModal = () => this.setState(state => ({ isOpen: !state.isOpen }));

  render() {
    const { isOpen } = this.state;
    const { dataSecondary, listAttributeProduct } = this.props;
    const customClassName = {
      style: {
        width: 'fit-content'
      }
    };
    return (
      <React.Fragment>
        <div className="form-group m-0 pl-5 drop-header">
          <div className="input-group input-group-valet">
            <button
              className="btn btn-link text-green border-light-green text-decoration-none"
              onClick={this.toggleModal}
            >
              Upload CSV
            </button>
          </div>
        </div>
        <Modal
          size="md"
          isOpen={isOpen}
          toggle={this.toggleModal}
          {...customClassName}
        >
          <ModalUploadCsv
            path="secondary_product"
            toggle={this.toggleModal}
            code={dataSecondary && dataSecondary.code}
            listAttributeProduct={listAttributeProduct}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

export default SecondaryHeader;
