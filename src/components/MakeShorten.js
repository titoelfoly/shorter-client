import React, { Fragment, useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Typography, Button, TextField, FormControl } from "@material-ui/core";
import styles from "./styles";
import { addLinks, setSlug, addLink } from "../actions/shorterActions";

const parseURL = (str, sl) => {
  return str.slice(0, -2) + sl;
};
const MakeShorten = (props) => {
  const [singleOrMulti, setSingleOrMulti] = useState(true);
  const [links, setLinks] = useState({
    web_link: "",
    android_link: "",
    ios_link: "",
    user: "",
  });
  const [redirectLink, setRedirectLink] = useState(null);
  const [slug, setSlug] = useState(null);

  const textAreaCopyRef = useRef(null);
  const [copy, setCopy] = useState("");

  const classes = styles();
  const onClickSingle = () => {
    console.log("single");
    setSingleOrMulti(true);
    props.setSlug();
  };
  const onClickMulti = () => {
    console.log("multi");
    setSingleOrMulti(false);
    props.setSlug();
  };
  const onSubmitMulti = (e) => {
    e.preventDefault();
    props.addLinks(links);
    setSlug(props.slug);
  };
  const onSubmitSingle = (e) => {
    e.preventDefault();
    props.addLink(links);
    console.log(links);
    setSlug(props.slug);
  };
  function copyToClipboard(e) {
    // Go Inside the textField get the first element then the first child
    // select the whole text execCommand Copy
    const text = textAreaCopyRef.current.firstElementChild.firstChild;
    text.select();
    document.execCommand("copy");
    setCopy("Copied");
  }
  useEffect(() => {
    setSlug(props.slug, "effect");
    setRedirectLink(`http://3.18.213.237:5000/${props.slug}`);
  }, [singleOrMulti, links, props.slug, redirectLink]);
  return (
    <Fragment>
      {!props.slug && (
        <div className={classes.frag}>
          {/* {props.isOpen && <AddForm></AddForm>} */}

          {/* {!props.isOpen && <div className={classes.container}></div>} */}
          {singleOrMulti && (
            <div className={classes.containerSingle}>
              <div className={classes.multiOrSingleContainer}>
                <div onClick={onClickSingle} className={classes.singleOrMulti}>
                  Single URL
                </div>
                <div onClick={onClickMulti} className={classes.singleOrMulti}>
                  Multiplatform URLS
                </div>
              </div>

              <Typography className={classes.title}>Add Single URL</Typography>
              <FormControl className={classes.formShorter}>
                <div className={classes.formShorter}>
                  <Typography className={classes.title}>URL</Typography>
                  <TextField
                    onChange={(e) => {
                      setLinks({
                        ...links,
                        user: props.user,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    className={classes.textAddField}
                    name="web_link"
                    variant="outlined"
                    label="Enter you URL"
                  ></TextField>
                </div>
                <Button
                  type="submit"
                  onClick={onSubmitSingle}
                  className={classes.shorterBtn}
                >
                  Shorten
                </Button>
              </FormControl>
            </div>
          )}
          {!singleOrMulti && (
            <div className={classes.containerMulti}>
              <div className={classes.multiOrSingleContainer}>
                <div onClick={onClickSingle} className={classes.singleOrMulti}>
                  Single URL
                </div>
                <div onClick={onClickMulti} className={classes.singleOrMulti}>
                  Multiplatform URLS
                </div>
              </div>

              <Typography className={classes.title}>Add Single URL</Typography>
              <FormControl className={classes.shorterForm}>
                <div className={classes.shorterForm}>
                  <div className={classes.multiContainers}>
                    <Typography className={classes.titleMulti}>
                      Web Url
                    </Typography>
                    <TextField
                      onChange={(e) => {
                        setLinks({
                          ...links,
                          [e.target.name]: e.target.value,
                          user: props.user,
                        });
                      }}
                      className={classes.textAddFieldMulti}
                      name="web_link"
                      variant="outlined"
                      label="Enter you WebURL"
                    ></TextField>
                  </div>
                  <div className={classes.multiContainers}>
                    <Typography className={classes.titleMulti}>
                      Android Url
                    </Typography>
                    <TextField
                      onChange={(e) => {
                        setLinks({
                          ...links,

                          user: props.user,
                          [e.target.name]: e.target.value,
                        });
                      }}
                      className={classes.textAddFieldMulti}
                      name="android_link"
                      variant="outlined"
                      label="Enter you AndoidURL"
                    ></TextField>
                  </div>
                  <div className={classes.multiContainers}>
                    <Typography className={classes.titleMulti}>
                      IOS Url
                    </Typography>
                    <TextField
                      onChange={(e) => {
                        setLinks({
                          ...links,
                          user: props.user,
                          [e.target.name]: e.target.value,
                        });
                      }}
                      className={classes.textAddFieldMulti}
                      name="ios_link"
                      variant="outlined"
                      label="Enter you IOSURL"
                    ></TextField>
                  </div>
                </div>
                <Button
                  type="submit"
                  onClick={onSubmitMulti}
                  className={classes.shorterBtn}
                >
                  Shorten
                </Button>
              </FormControl>
            </div>
          )}
        </div>
      )}
      {props.slug && (
        <div className={classes.frag}>
          <div className={classes.containerSingle}>
            <div className={classes.multiOrSingleContainer}>
              <div onClick={onClickSingle} className={classes.singleOrMulti}>
                Create Another Single URL
              </div>
              <div onClick={onClickMulti} className={classes.singleOrMulti}>
                Create Another Multiplatform URLS
              </div>
            </div>

            <Typography className={classes.title}>Add Single URL</Typography>
            <FormControl className={classes.formShorter}>
              <div className={classes.formShorter}>
                <Typography className={classes.title}>URL</Typography>
                <TextField
                  ref={textAreaCopyRef}
                  value={redirectLink}
                  className={classes.textAddField}
                  name="name"
                  variant="outlined"
                ></TextField>
              </div>
              <Button onClick={copyToClipboard} className={classes.shorterBtn}>
                {copy === "" ? "COPY URL" : "Copied"}
              </Button>
            </FormControl>
          </div>
        </div>
      )}
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  links: state.shorter.links,
  slug: state.shorter.slug,
  user: state.auth.user,
});
export default connect(mapStateToProps, { addLinks, setSlug, addLink })(
  MakeShorten
);
