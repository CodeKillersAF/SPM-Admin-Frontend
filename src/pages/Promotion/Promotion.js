import React from "react";

export default function Promotion() {

    const [offer, setoffer] = useState([]);

    const getOffers = () => {
        axios.get("http://localhost:8000/api/admin/offer").then((res) => {
            setoffer(res.data.data);
            console.log(res.data.data);
        });
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
                            onClick={() => handleEditOpen(params.row)}
                        >
                            Edit

                        </Button>
                        <DeleteIcon
                            onClick={() => handleClickOpen(params.row._id)}
                            // onClick={getOneCate}
                            color="secondary" />
                    </>
                );
            },
        },
    ];


}