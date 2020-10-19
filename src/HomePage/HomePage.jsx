import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Drawer from "@material-ui/core/Drawer";
import Avatar from "@material-ui/core/Avatar";
import { Button } from "@material-ui/core";
import "./HomePage.css";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import { userActions } from "../_actions";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedValue: {},
    };
  }
  componentDidMount() {
    this.props.getUsers();
  }

  handleDeleteUser(id) {
    return (e) => this.props.deleteUser(id);
  }

  handlePopUpClose = () => {
    this.setState({
      open: false,
    });
  };
  handleModal = (item) => {
      console.log("item>>>>>>>>>>",item);
    this.setState({
      selectedValue: item,
      open: true,
    });
  };

  render() {
    const { user, users } = this.props;
    const { selectedValue } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Hello {user.firstName}!</h2>
        <h3>All registered Students:</h3>
        {users.loading && <em>Loading Students...</em>}
        {users.error && (
          <span className="text-danger">ERROR: {users.error}</span>
        )}
        {users.items && (
          <div>
            {users.items.map((user, index) => (
              <div key={user.id}>
               <h2> {user.firstName + " " + user.lastName}</h2>
                {user.deleting ? (
                  <em> - Deleting...</em>
                ) : user.deleteError ? (
                  <span className="text-danger">
                    {" "}
                    - ERROR: {user.deleteError}
                  </span>
                ) : (
                  <div>
                    <Paper>
                      <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                          <div className="c-box">
                            <Paper className="card">
                              <Avatar className="c-blue" src="">Avatar</Avatar>
                              <div className="u-name">UserName: {user.username}</div>
                              <Button
                                onClick={() => this.handleModal(user)}
                                variant="contained"
                                color="primary"
                              >
                                Wanna see my details! Click Here !
                              </Button>
                            </Paper>
                          </div>
                        </div>
                      </div>
                    </Paper>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleDeleteUser(user.id)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        <Modal
          className="photo-popup"
          open={this.state.open}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="photo-box">
            <div className="head">
              View Details
              <span className="close-btn" onClick={this.handlePopUpClose}>
                <CloseIcon />
              </span>
            </div>
            <div className="photo-content">
              <div className="row">
                <div className="col-img col-sm-5 col-md-5">
                  <img
                    src={selectedValue && selectedValue.image}
                    alt="avatar"
                  />
                </div>
                <div className="col-text col-sm-7 col-md-7">
                  <h4>
                    NAME : {selectedValue && selectedValue.firstName}{" "}
                    {selectedValue && selectedValue.lastName}
                  </h4>
                  <div className="tag-list flex align-items-center">
                    <p>ID : {selectedValue && selectedValue.id}</p>
                  </div>
                  <div className="tag-list flex align-items-center">
                    <p>USERNAME : {selectedValue && selectedValue.username}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <p>
          <Button variant="contained"
                      color="primary" href="/login">Logout</Button>
        </p>
      </div>
    );
  }
}

function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
}

const actionCreators = {
  getUsers: userActions.getAll,
  deleteUser: userActions.delete,
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
