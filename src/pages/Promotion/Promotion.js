import React,{useState} from "react";
import AddPromotion from "../../components/promotionForm/AddPromotion";
import axios from 'axios';
import ViewDetailsBody from "../../components/viewDetailsBody/ViewDetailsBody";
import DeleteIcon from "@material-ui/icons/Delete";
import { Edit } from "@material-ui/icons";
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import Button from "@material-ui/core/Button";
import { useHistory } from 'react-router-dom';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Popup from "../../components/popup/Popup";
export default function Promotion() {

    const [offer, setoffer] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);

    const getOffers = () => {
        axios.get("http://localhost:8000/api/admin/offer").then((res) => {
            setoffer(res.data.data);
            console.log(res.data.data);
        });
    };

    const openPopupClick = () => {
        setOpenPopup(false);
    }

    const onClickCreate = (e) => {
        setOpenPopup(true);
    };



    const columns = [
        {
            field: "url",
            headerName: "Image",
            width: 150,
            editable: true,
            renderCell: (params) => {
                return (
                    <img
                        src={params.row.url}
                        alt="image"
                        style={{ width: "80px", height: "40px" }}
                    />
                );
            },
        },
        {
            field: "offerName",
            headerName: "Offer Name",
            width: 150,
            editable: true,
        },
        {
            field: "offerDescription",
            headerName: "Offer Description",
            width: 150,
            editable: true,
        },
        {
            field: "offerPrice",
            headerName: "Offer Price",
            width: 150,
            editable: true,
        },
        {
            field: "action",
            headerName: "Action",
            width: 200,
            editable: true,
            renderCell: (params) => {
                return (
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Edit />}
                            style={{ marginLeft: "20px", marginRight: "30px" }}
                            // onClick={() => handleEditOpen(params.row)}
                        >
                            Edit

                        </Button>
                        <DeleteIcon
                            // onClick={() => handleClickOpen(params.row._id)}
                            // onClick={getOneCate}
                            color="secondary" />
                    </>
                );
            },
        },
    ];

    return (
        <div>

            {/* <Dialog
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
            </Dialog> */}

            <div className="viewTable">
                <ViewDetailsBody columns={columns} rows={offer}
                    onClickCreate={onClickCreate}
                />

                <Popup
                    openPopup={openPopup}
                    title="Add new Promotion"
                    form={<AddPromotion title="Add Promotion"
                        openPopupClick={openPopupClick}
                        // handleAlertCreate={handleAlertCreate}
                    />}
                />
                {/* <Popup
                    openPopup={openEditForm}
                    title="Update Category Name"
                    form={<Updatecategory category={categorySelected} title="Update Food"
                        openEditPopup={openEditPopup}
                        handleAlertUpdate={handleAlertUpdate}
                    />}
                /> */}

                {/* <SnackbarFeddback
                    open={addedCreateSuccess}
                    message="Category list successfully added!"
                    onClose={handleCreateClose}
                /> */}

                {/* <SnackbarFeddback
                    open={addedSuccess}
                    message="Category list successfully updated!"
                    onClose={handleEditClose}
                /> */}
            </div>

        </div>
    )


}