/* eslint-disable react/no-did-update-set-state */
import React, { Component, useState, useEffect } from 'react';
import { Progress } from 'reactstrap';
import { from } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { connect } from 'react-redux';
import {
  createPictureBulk,
  nullPicture,
  fetchData,
  nullProgress
} from '@actions/file.action';

function QueueItem({ name, isCompleted, progress }) {
  const [status, setStatus] = useState(0);
  const [visible, setVisible] = useState(true);

  /**
   * 0: 'Waiting'
   * 1: 'Uploading'
   * 2: 'Completed
   */
  const STATUS = {
    0: <i className="fa fa-clock fa-sm text-muted" />,
    1: <i className="fa fa-angle-double-up fa-sm text-dark" />,
    2: <i className="fa fa-check fa-sm text-success" />
  };

  const toggle = number => setStatus(number);

  useEffect(() => {
    if (isCompleted) {
      toggle(2);
    }
    if (isCompleted === false) {
      toggle(1);
    }

    if (status === 2) {
      setTimeout(() => setVisible(false), 3000);
    }

    return () => null;
  }, [isCompleted, status, visible]);

  return (
    <div className="p-1">
      {visible && (
        <div className="media shadow-sm rounded bg-white ">
          <span className="px-2 align-self-center">{STATUS[status]}</span>
          <div className="media-body">
            <h5 className="m-0 pt-2 pb-1 px-1 text-wrap">{name}</h5>
            {status === 1 && (
              <Progress
                value={progress}
                color="success"
                className="progress-xs m-1"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

class QueueUpload extends Component {
  subscription = null;

  constructor(props) {
    super(props);
    this.state = {
      isCompleted: null,
      position: null
    };
  }

  componentDidUpdate(prevProps) {
    const {
      file,
      nullPicture,
      nullProgress,
      fetchData,
      page,
      limit,
      toggleUpload
    } = this.props;
    if (prevProps.file.pictures !== file.pictures) {
      const files = [...file.pictures];
      if (files.length > 0) {
        const observable$ = from(this.props.file.pictures).pipe(
          concatMap((file, index) => {
            this.setState({
              position: index,
              isCompleted: false
            });
            toggleUpload(true);
            return this.create(file);
          })
        );
        // const key = 'name';
        // const arrayUniqueByKey = [
        //   ...new Map(files.map(item => [item[key], item])).values()
        // ];
        this.subscription = observable$.subscribe(
          () => nullProgress(),
          () => {},
          () =>
            setTimeout(() => {
              toggleUpload(false);
              nullPicture();
              fetchData({ page, limit });
            }, 3500)
        );
      }
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  unsubscribe = () => {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
    }
  };

  create = file => {
    const { createPictureBulk, page, limit } = this.props;
    const formData = new FormData();

    formData.append('type', 'product');
    formData.append('file', file, file.name);
    // console.log('formdata', [...formData]);
    return createPictureBulk(formData).then(() => {
      this.props.fetchData({ page, limit });
      this.setState({ isCompleted: true });
    });
  };

  render() {
    const { position, isCompleted } = this.state;
    const { file } = this.props;
    // console.log('file.pictures', file.pictures);
    return (
      <div
        className="bg-light rounded"
        style={{
          width: 340,
          height: 'auto',
          maxHeight: 400,
          position: 'fixed',
          bottom: 10,
          right: 10,
          zIndex: 10,
          overflowY: 'auto'
        }}
      >
        {file.pictures &&
          file.pictures.map((item, index) => {
            if (index === position) {
              return (
                <QueueItem
                  key={item.name}
                  name={item.name}
                  isCompleted={isCompleted}
                  progress={file.progress}
                />
              );
            }
            return <QueueItem key={item.name} name={item.name} />;
          })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  file: state.file
});

export default connect(mapStateToProps, {
  createPictureBulk,
  nullPicture,
  nullProgress,
  fetchData
})(QueueUpload);
