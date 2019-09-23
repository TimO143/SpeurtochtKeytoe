import React, { Component } from "react";
import { connect } from "react-redux";
import addScore from "../actions";

class User extends Component {
    //comp implementation
}

const mapStateToProps = state => {
    const scores = state.userDataReducer;
    return scores;
}
export default connect(mapStateToProps, { addScore })(Score);