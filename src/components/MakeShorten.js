import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Typography, Button } from "@material-ui/core";
import styles from "./layout/styles";
const MakeShorten = (props) => {
  const classes = styles();
  return (
    <Fragment>
      {props && (
        <div className={classes.frag}>
          {/* {props.isOpen && <AddForm></AddForm>} */}
          {/* {!props.isOpen && <div className={classes.container}></div>} */}
          <div className={classes.container}></div>
        </div>
      )}
    </Fragment>
  );
};

export default MakeShorten;
