import React, { Fragment, useEffect } from "react";
import styles from "./styles";
import { connect } from "react-redux";
import { getLinks } from "../actions/shorterActions";
import { Typography, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const LinkList = (props) => {
  const classes = styles();
  const history = useHistory();
  const onClickMakeShorter = () => {
    props.makeShorter();
    history.push("/");
  };
  useEffect(() => {
    // props.getLinks();
    props.getLinks();
  }, [props.auth.isAuthenticated]);
  return (
    <Fragment>
      <div className={classes.frag}>
        <div className={classes.containerMulti}>
          {props.links &&
            props.links.map((link) => (
              <div className={classes.formShorterlinks}>
                <Typography className={classes.titleLinks}>Web</Typography>
                <TextField
                  value={link.web_link}
                  className={classes.textAddField}
                  name="name"
                  variant="outlined"
                ></TextField>
                <Typography className={classes.titleLinks}>Android</Typography>
                <TextField
                  value={link.android_link}
                  className={classes.textAddField}
                  name="name"
                  variant="outlined"
                ></TextField>
                <Typography className={classes.titleLinks}>IOS</Typography>
                <TextField
                  value={link.ios_link}
                  className={classes.textAddField}
                  name="name"
                  variant="outlined"
                ></TextField>
                <Typography className={classes.titleLinks}>Shorter</Typography>
                <TextField
                  value={props.base.replace("/#", "") + link.slug}
                  className={classes.textAddField}
                  name="name"
                  variant="outlined"
                ></TextField>
              </div>
            ))}
        </div>
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  links: state.shorter.links,
  base: state.shorter.base,
  auth: state.auth,
});
export default connect(mapStateToProps, { getLinks })(LinkList);
