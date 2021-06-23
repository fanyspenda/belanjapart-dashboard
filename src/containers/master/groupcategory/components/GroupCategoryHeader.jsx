import React from 'react';
import { Modal } from 'reactstrap';
import ModalUploadCsv from '@components/modal/ModalUploadCsv';
import { connect } from 'react-redux';
import { exportCsv } from '@actions/file.action';
import { Icon, message, Spin } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 20 }} spin />;

class GroupCategoryHeader extends React.Component {
  state = {
    isOpen: false
  };

  componentWillReceiveProps(nextProps) {
    const { dataFile } = this.props;

    if (nextProps.dataFile.csv !== dataFile.csv) {
      if (!nextProps.dataFile.csv.data) {
        message.warning('Link Export CSV group category does not valid');
      } else {
        window.open(nextProps.dataFile.csv.data, '_blank');
      }
    }
  }

  handleExportCSV = () => {
    this.props.exportCsv('group');
  };

  toggleModal = () => this.setState(state => ({ isOpen: !state.isOpen }));

  render() {
    const { isOpen } = this.state;
    const { data, dataFile } = this.props;
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
        <div className="form-group m-0 pl-1 drop-header">
          <div className="input-group input-group-valet">
            <button
              className="btn btn-link text-green border-light-green text-decoration-none"
              onClick={() => this.handleExportCSV()}
            >
              {dataFile.isLoadingCsv ? (
                <Spin indicator={antIcon} />
              ) : (
                'Export CSV'
              )}
            </button>
          </div>
        </div>
        <Modal size="md" isOpen={isOpen} toggle={this.toggleModal}>
          <ModalUploadCsv
            path="group"
            toggle={this.toggleModal}
            pagination={data.pagination}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  data: state.groupcategory,
  dataFile: state.file
});

export default connect(mapStateToProps, { exportCsv })(GroupCategoryHeader);
