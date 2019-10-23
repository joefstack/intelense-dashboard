import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";

const dashboardLoaded = user => {
  if (user) {
    console.log("Welcome " + user.name);
  } else {
    console.log("Dashboard loading...");
  }
};

const Dashboard = ({ auth: { user } }) => {
  useEffect(() => {
    dashboardLoaded(user);
  });

  return user ? (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
    </Fragment>
  ) : (
    <Spinner />
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(Dashboard);
