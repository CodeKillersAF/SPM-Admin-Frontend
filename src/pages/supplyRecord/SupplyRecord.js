import React, { useEffect, useState } from "react";
import axios from 'axios';
import ViewDetailsBody from "../../components/viewDetailsBody/ViewDetailsBody";
// import DeleteIcon from "@material-ui/icons/Delete";
// import { Edit } from "@material-ui/icons";
// import Button from "@material-ui/core/Button";
import Popup from "../../components/popup/Popup";
import SupplyRecordForm from "../../components/supplyRecordForm/SupplyRecordForm";
import SnackbarFeddback from '../../components/snackbarFeedback/SnackbarFeedback';

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../Image/logo.jpg';

import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import './supplyrecord.css';


export default function SupplyRecord() {

    const pdfExportComponent = React.useRef(null);

    const exportPDFWithMethod = () => {
      let element = document.querySelector(".k-grid") || document.body;
      savePDF(element, {
        paperSize: "A4",
      });
    };

    const exportPDFWithComponent = () => {
      if (pdfExportComponent.current) {
        pdfExportComponent.current.save();
      }
    };

    const [offer, setoffer] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    const [reload, setReload] = useState();

    const [addedCreateSuccess, setaddedCreateSuccess] = useState(false);

    const handleAlertCreate = () => {
        setaddedCreateSuccess(true);
      }
  
      const handleCreateClose = () => {
        setaddedCreateSuccess(false);
      }


    const getAllSupplyRecords = () => {
        axios.get("/supply-record").then((res) => {
            setoffer(res.data.data);
            setFilterOffers(res.data.data);
            // setReload(res.data.data);
            // console.log(res.data.data);
            
        });
    };

    useEffect(() => {
        getAllSupplyRecords();
    }, []);


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
            editable: false,
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
            field: "supply_item",
            headerName: "Name",
            width: 150,
            editable: false,
        },
        {
            field: "unit_price",
            headerName: "Unit Price",
            width: 150,
            editable: false,
        },
        {
            field: "qty",
            headerName: "Quantity",
            width: 150,
            editable: false,
        },
        {
            field: "total_price",
            headerName: "Bill Amount",
            width: 150,
            editable: false,
        },
        {
            field: "supplier_name",
            headerName: "Supplier Name",
            width: 150,
            editable: false,
        },
        
    ];

    const [search, setSearch] = useState('');
    const [filterOffers, setFilterOffers] = useState([]);

    const onSearchChange = (e) => {
        setSearch(e.target.value);
        // console.log(e.target.value);
        const filterValue = offer.filter((offers) => {
            if(e.target.value ==''){
                return offers;
            }
            else if(offers.supply_item.toLowerCase().includes(e.target.value.toLowerCase())){
            return offers;
                
            }
            else{
                console.log("No Found")
            }
        
                
          });

          setFilterOffers(filterValue);
    }

    return (
        <div>

            <div className="rateandPdf">
                <button className="generateRate" onClick={exportPDFWithComponent}> Generate Report </button>
            </div>

            <input type="text" placeholder="Search..."
                value={search}
                onChange={onSearchChange}
            />

            <div className="viewTable">
                <ViewDetailsBody columns={columns} rows={filterOffers}
                    onClickCreate={onClickCreate}
                />
                <Popup
                    openPopup={openPopup}
                    title="Add new Supplier Record"
                    form={<SupplyRecordForm title="Add Promotion"
                        openPopupClick={openPopupClick}
                        handleAlertCreate={handleAlertCreate}
                    />}
                />

                <SnackbarFeddback
                    open={addedCreateSuccess}
                    message="Record successfully added!"
                    onClose={handleCreateClose}
                />


 <PDFExport ref={pdfExportComponent} paperSize="A4">
            
            <div className="imgReport">
                <img src={logo} alt="image" width="80px" height="80px" />
            </div>

              <div className="reportTitle">Your Popularity Report</div>
              <div className="reportAddress">No.3, Baththaramulla Road,</div>
              <div className="reportAddress">Colombo</div> <br/>
              <table className="rateTable">
                <tr>
                  <th>Supply Item</th>
                  <th>Unit Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Supplier Name</th>
                </tr>

                {offer.map((al) => (
                <tr>
                    <td>{al.supply_item}</td>
                    <td>{al.unit_price}</td>
                    <td>{al.qty}</td>
                    <td>{al.total_price}</td>
                    <td>{al.supplier_name}</td>
                </tr>
                ))}

              </table>
      </PDFExport>

            </div>

        </div>
    )


}