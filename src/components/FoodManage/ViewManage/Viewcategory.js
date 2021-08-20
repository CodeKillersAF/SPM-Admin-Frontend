import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function Viewcategory() {

    const history = useHistory();

    const [open, setOpen] = React.useState(false);

    const [reload, setReload] = useState(false);

    const [categoryid, setCategoryid] = useState('');

    const [viewCategory, setViewCategory] = useState([]);

    //delete handle functions
    const handleClickOpen = (e,categoryId) => {
      setCategoryid(categoryId);
      setOpen(true);
    }

    const handleClose = () => {
      setOpen(false);
    }

    const getAllCategories = async () => {
        try {
            const details = await axios.get("/category/all-category");

            console.log(details.data.data);
            setViewCategory(details.data.data);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllCategories();
    }, [reload]);


    const updateCategory = (id) => {
        let path =`/didula/update-category/${id}`;
        history.push(path);
    }


    const deleteCategory = () => {
        try {
          setOpen(false);
            axios.delete(`/category/delete-category/${categoryid}`)
              .then((response) => {
                console.log('Deleted Successfully');
                setReload(!reload);
              })
              .catch((error) => {
                console.log(error);
              })

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will delete Category permanently..!
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteCategory} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>



      <table className="table">
        <thead>
          <tr>
            <th scope="col">Category Name</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
            {viewCategory.map((cate) => (
                <tr key={cate._id}>
                    <td>{cate.categoryName}</td>
                    <td><button onClick={() => updateCategory(cate._id)}>Update</button></td>
                    <td><button onClick={(e) => handleClickOpen(e, cate._id)}>Delete</button></td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
    )
}

export default Viewcategory
