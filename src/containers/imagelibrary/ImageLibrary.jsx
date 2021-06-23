import React from 'react';
import { from } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { connect } from 'react-redux';
import { fetchData, deleteData } from '@actions/file.action';
import { Modal } from 'reactstrap';
import PaginationComponent from 'react-reactstrap-pagination';
import SearchTable from '@components/hoc/table/SearchTable';
import { debounce } from 'lodash';
import { truncate } from '@helpers/textConfig';
import ListItem from './components/ListWrapper';
import ModalImage from './components/ModalImage';

class ImageLibrary extends React.Component {
  constructor(props){
    super(props);
    this.subscription = null;
    this.state = {
      page: 1,
      limit: 21,
      checked: false,
      modalOpen: false,
      selected: [],
      isUpload: false,
      search: null
    };
    this.delayedCallback = debounce(this.searchCall, 1000);
  }

  componentDidMount() {
    const { page, limit } = this.state;
    const { fetchData } = this.props;
    fetchData({ limit, page });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  unsubscribe = () => {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
    }
  };

  searchCall = event => {
    const { value } = event.target;
    const { fetchData } = this.props;
    const { limit } = this.state;
    const params = {
      page: 1,
      limit,
      name: value
    };

    fetchData(params);

    this.setState({
      search: value,
      page: 1
    });
  };

  handleSearch = e => {
    e.persist();
    this.delayedCallback(e);
  };

  handleClick = () => {
    const { limit, page, selected, search } = this.state;
    const { fetchData, deleteData } = this.props;

    const observable$ = from(selected).pipe(concatMap(id => deleteData(id)));

    this.subscription = observable$.subscribe(
      () => {},
      () => {},
      () => {
        this.setState({ selected: [] });
        fetchData({ limit, page, name: search });
      }
    );
  };

  toggleCheck = id => {
    const { selected } = this.state;

    const newSelected = selected;

    if (!selected.includes(id)) {
      newSelected.push(id);
      this.setState({ selected: newSelected });
    } else {
      const index = newSelected.indexOf(id);

      if (index !== -1) newSelected.splice(index, 1);
      this.setState({ selected: newSelected });
    }
  };

  toggleUpload = isTrue => this.setState({ isUpload: isTrue });

  toggleModal = () => this.setState(state => ({ modalOpen: !state.modalOpen }));

  onPageChange = toPage => {
    const { limit, search } = this.state;
    const { fetchData } = this.props;

    fetchData({
      page: toPage,
      limit,
      name: search
    });
    this.setState({ page: toPage });
  };

  render() {
    const { page, limit, checked, modalOpen, selected, isUpload } = this.state;
    const {
      file: { list }
    } = this.props;
    // console.log('list', list);
    // console.log('selected', selected);
    return (
      <div className="content-wrapper">
        <div className="row my-4">
          <div className="col-md-4">
            <h4 className="font-weight-bold">IMAGE LIBRARY</h4>
          </div>
          <div className="col-md-8 d-flex justify-content-end">
            <SearchTable
              route={this.props.route}
              handleSearch={this.handleSearch}
            />
            <div className="mr-2">
              {selected.length > 0 && (
                <button
                  onClick={this.handleClick}
                  className="btn btn-red-light text-white text-capitalize"
                >
                  <i className="fa fa-trash fa-sm" />
                  Delete Images
                </button>
              )}
            </div>
            <div className="mr-2">
              <button
                className="btn btn-green-dark text-white text-capitalize"
                onClick={this.toggleModal}
                disabled={checked || isUpload}
              >
                <i className="fa fa-plus fa-sm" />
                Add Multiple Images
              </button>
            </div>
          </div>
          <div className="col-md-12">
            <ul className="list-group list-group-horizontal flex-wrap mt-3">
              {list.data &&
                list.data.map(picture => (
                  <ListItem
                    id={picture.id}
                    key={picture.id}
                    path={picture.path}
                    name={truncate(picture.name, 16)}
                    toggle={this.toggleCheck}
                  />
                ))}
            </ul>
          </div>
        </div>
        <div className="float-right">
          {list.pagination && (
            <PaginationComponent
              totalItems={list.pagination.count}
              pageSize={list.pagination.record_per_page}
              onSelect={this.onPageChange}
              previousPageText="Prev"
            />
          )}
        </div>
        {/* <QueueUpload
          toggleUpload={this.toggleUpload}
          page={page}
          limit={limit}
        /> */}
        <Modal size="md" isOpen={modalOpen} toggle={this.toggleModal}>
          <ModalImage toggle={this.toggleModal} />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  file: state.file
});

export default connect(mapStateToProps, { fetchData, deleteData })(
  ImageLibrary
);
