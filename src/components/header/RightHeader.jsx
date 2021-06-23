/* eslint-disable class-methods-use-this */
import React, { Fragment } from 'react';
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavLink
} from 'reactstrap';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/auth.action';
import { currentData } from '../../actions/admin.action';

class RightHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const { currentData } = this.props;
    currentData();
  }

  handleClickNotification = (id, idTransaction) => {
    const { readData } = this.props;
    const formData = {
      log_id: id
    };
    readData(formData);
    window.location.href = `/transaction/${idTransaction}`;
  };

  handleEdit = () => {
    const { history, data } = this.props;
    if (data.current) {
      history.push(`/profil/edit/${data.current.id}`);
    }
  };

  logout() {
    const { logoutUser } = this.props;
    swal
      .fire({
        title: 'Are You Sure To Logout ?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Logout'
      })
      .then(result => {
        if (result.value) {
          logoutUser();
        }
      });
  }

  render() {
    const { data, log, history } = this.props;
    const logCount = log.data ? log.data.total : 0;
    let logData = [];
    if (log.data && log.data.log) {
      logData = log.data.log.reduce((acc, val, index) => {
        if (!val.status && index < 10) {
          acc.push(val);
        }
        return acc;
      }, []);
    }
    return (
      <ul className="navbar-nav navbar-nav-right">
        {/* {admin.current !== null && ( */}
        <Fragment>
          <UncontrolledDropdown nav>
            <DropdownToggle className="btn-dropdown-cs">
              <i className="fas fa-bell" />
              <span className="count">{logCount}</span>
            </DropdownToggle>
            <DropdownMenu>
              {logCount === 0 ? (
                <DropdownItem disabled>Empty Notification</DropdownItem>
              ) : (
                <Fragment>
                  {logData.map((val, index) =>
                    !val.status && index < 9 ? (
                      <DropdownItem
                        onClick={() =>
                          this.handleClickNotification(
                            val.id,
                            val.transaction_id
                          )
                        }
                      >
                        <h6 className="font-weight-bold">{val.title}</h6>
                        <p>{val.content}</p>
                      </DropdownItem>
                    ) : (
                      <DropdownItem
                        className="text-center"
                        color="info"
                        onClick={() => history.push('/notification')}
                      >
                        <b style={{ color: '#007bff' }}>See all</b>
                      </DropdownItem>
                    )
                  )}
                </Fragment>
              )}
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav>
            <DropdownToggle
              caret
              color="default"
              // data-toggle="dropdown"
              className="pr-3"
              nav
              onClick={e => e.preventDefault()}
            >
              {/* {admin.current.link === null ? (
                  <img
                    alt="ProfileImage"
                    className="img-xs rounded-circle mr-2"
                    src="/public/images/faces-clipart/pic-1.png"
                  />
                ) : (
                  <img
                    alt="ProfileImage"
                    className="img-xs rounded-circle mr-2"
                    src={admin.current.link}
                    style={{ objectFit: 'cover' }}
                  />
                )} */}
              <img
                alt="ProfileImage"
                className="img-xs rounded-circle mr-2"
                src="/public/images/faces-clipart/pic-1.png"
              />

              {/* <span className="profile-text">{admin.current.name}</span> */}
              <span className="profile-text">
                {data.current && data.current.name}
              </span>
              {/* <p className="d-lg-none">Log out</p> */}
            </DropdownToggle>
            <DropdownMenu className="dropdown-navbar" right tag="ul">
              <NavLink tag="li">
                <DropdownItem onClick={this.handleEdit} className="nav-item">
                  Edit My Profile
                </DropdownItem>
              </NavLink>
              <DropdownItem divider tag="li" />
              <NavLink tag="li">
                <DropdownItem onClick={this.logout} className="nav-item">
                  Log out
                </DropdownItem>
              </NavLink>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Fragment>
        {/* )} */}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  data: state.admin
});

export default connect(mapStateToProps, { currentData, logoutUser })(
  RightHeader
);
