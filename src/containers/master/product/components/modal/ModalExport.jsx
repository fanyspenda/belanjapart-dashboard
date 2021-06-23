import SelectType from '@components/select/SelectType';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { exportCsv } from '@actions/file.action';
import { Button, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { message } from 'antd';

class ModalExport extends Component {
  state = {
    optType: [
      { label: 'Product', value: 'product' },
      { label: 'Secondary Product', value: 'secondary_product' }
    ],
    selectedType: null
  };

  handleChangeType = e => {
    this.setState({ selectedType: e });
  };

  handleClick = () => {
    const { selectedType } = this.state;
    const { toggle } = this.props;

    if (!selectedType) {
      return message.warning('Select Type CSV to export first');
    }

    this.props.exportCsv(selectedType);
    toggle();
    this.handleChangeType(null);
  };

  render() {
    const { optType } = this.state;
    return (
      <Fragment>
        <ModalHeader className="modal-head-product">
          <div className="row">
            <div className="col-md-12 pt-2 text-center">
              <p className="mb-0">EXPORT CSV</p>
            </div>
          </div>
        </ModalHeader>
        <ModalBody className="modal-body-product">
          <div className="row">
            {optType && (
              <div className="col-md-12">
                <SelectType
                  opt={optType}
                  onChange={e => this.handleChangeType(e.value)}
                />
              </div>
            )}
          </div>
        </ModalBody>
        <ModalFooter className="modal-foot border border-0">
          <div className="row text-center">
            <div className="col-md-6">
              <Button
                type="button"
                className="btn btn-green-dark text-white"
                onClick={() => this.handleClick()}
              >
                Export CSV
              </Button>
            </div>
          </div>
        </ModalFooter>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  dataFile: state.file
});

export default connect(mapStateToProps, { exportCsv })(ModalExport);
