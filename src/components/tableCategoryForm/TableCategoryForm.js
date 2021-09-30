import React, { useEffect, useState } from "react";
import "./tableCategoryForm.css";
import {
  Grid,
  TextField,
  makeStyles,
  Button,
  IconButton,
} from "@material-ui/core";

import Publish from "@material-ui/icons/Publish";
import { storage } from "../../firebase.js";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "90%",
      margin: theme.spacing(2),
    },
  },
}));

export default function TableCategoryForm({
  tableCategory,
  onSubmit,
  buttonTitle,
  formClose
}) {
  const [values, setValues] = useState(tableCategory);
  const [file, setfile] = useState(null);

  const handleInputChnage = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const classes = useStyles();

  async function uploadFile(image) {
    if (!image.name.match(/\.(jpg|jpeg|png|webp)$/)) {
      alert("Select an valid image type");
    } else {
      let bucketName = "tableCategoryImages";
      let uploadTask = storage.ref(`${bucketName}/${image.name}`).put(image);
      await uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
        },
        (err) => {
          console.log(err);
        },
        () => {
          storage
            .ref("tableCategoryImages")
            .child(image.name)
            .getDownloadURL()
            .then((firebaseURl) => {
              console.log(firebaseURl);
              setValues({ ...values, image: firebaseURl });
            });
        }
      );
    }
  }
  function onImageSelect(e) {
    setfile(e.target.files[0]);
    uploadFile(e.target.files[0]);
  }
  return (
    <form className={classes.root} onSubmit={(e) => onSubmit(e, values)}>
      <Grid container>
        <Grid item xs={12}>
          <div className="tc-image-container">
            <div className="tc-preview-image">
              <img
                width="200px"
                height="180px"
                src={
                  values.image
                    ? values.image
                    : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOQAAADdCAMAAACc/C7aAAAAaVBMVEXDw8MAAADGxsaXl5fJycnMzMxSUlKRkZF1dXV5eXnCwsIFBQWlpaV+fn66urqurq5dXV1sbGxMTEyKiopXV1czMzOcnJwaGhqoqKiEhIQlJSUrKysODg5mZmZHR0ezs7M7OzsVFRU5OTmFwHepAAAC+klEQVR4nO3bi1KjMBSAYXIarIbea2uttVXf/yE36Q0qobrITHP0/2Z2Zt2xDP+GQEDMMgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANQ56dCtY+JcZge9zgzsrXvipGc61EtzLO29KbpKLMx9mkPpI83H410XFiblyGFufy7Ph0lHPnSya/aByFuqRv7sSqchUvwV83k4EHFtt6QhcrwOl4GXZdv9VBApq3CdK/w1c9nykNUQ+XK6pG/abin5SFmWy5Z+u6FMP7K6unttt6cKIqflSE4a9tQd/zRtKflI6ZeRw6Y9deFS2ryl5COzUXkzMWoIcZm45bixUkGkfd6PormyyBMZPxkzaVouKIjM7PAwjtPm/XRP4Rse8/hgaoh0djzdbl9XeePJxc7CUBdmHi/REOkPx3Bb2DTlnOwP6L34vNQReZ3szqffRXRa/oJIcetzpJnksS2pj3T5pPrIqmfr6wL9kbZvynWf/8uuPi21Rzrxa4WijCzMW/0j6iKdV/lSZPH5Ges0V3+4flqi+uV77Ql07QmCtkg7GlcumM4uI0/ZC+UjGe67FpVl+qhWGGw/f0pRpIS99aeWjTtV2rdopBleTktNkZkMwvmzMHf20BCaY42FWV3MXFWR2eZY8ezvpY/N8aF8UhuZz84jtV+Iu/d4YfiGu+oHFUX6e43i1LDODs1FfCT9P8+lXN7piZRxNWOS23nTOB7syvsRPZHZ+qKhv2uckMfBLqelmsjLew1/anlpOlbLwT5vSUeks/2rQVG9U5eSyLC0+f+3JE53XToiRT6+OjhjPjRFunz6dVHM9DAtVURG7zW+ZbAfSw2R0mpCHvi1vFMRabctC/1/zdaKisjTTwnaRIYfhCmIdHbQunF/Rl5J8pEizfca37Pxkzr5yNnXHdfNJPGRHNrRvP9D81HqkbnNO5D2W5K//X1XFyK7kuyby3/iHXTp8rcJVmk2/onfCwEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALi1f4DsKck70eEzAAAAAElFTkSuQmCC"
                }
              />
            </div>
            <label for="file-1">Upload Image</label>
            <input
              type="file"
              className="addnewKeynoteuploadButton"
              onChange={onImageSelect}
              id="file-1"
            />
          </div>

          <TextField
            variant="outlined"
            name="name"
            label="Name"
            value={values.name}
            onChange={handleInputChnage}
            required={true}
          />
          <TextField
            id="outlined-textarea"
            label="Description"
            placeholder="Description"
            multiline
            variant="outlined"
            maxRows={5}
            minRows={5}
            name="description"
            value={values.description}
            onChange={handleInputChnage}
            required={true}
          />
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: "20px", marginLeft: "300px" }}
              type="submit"
            >
              {buttonTitle}
            </Button>
            <Button onClick={formClose} variant="contained" color="secondary">
              Cancel
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
}
