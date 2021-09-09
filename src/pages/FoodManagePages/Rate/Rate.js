import React, { useState, useEffect } from 'react';
import ViewDetailsBody from "../../../components/viewDetailsBody/ViewDetailsBody";
import axios from 'axios';

import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../../Image/logo.jpg';

import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import './rate.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
}));

function Rate() {

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


    const classes = useStyles();

    const columns = [
        // { field: "_id", headerName: "ID", width: 160 },
        {
          field: "customerName",
          headerName: "Customer Name",
          width: 150,
          editable: true,
        },
        {
            field: "aboutFood",
            headerName: "About Food",
            width: 150,
            editable: true,
          },
          {
            field: "starRate",
            headerName: "Star Rate",
            width: 150,
            editable: true,
            renderCell: (params) => {
                return (
                  <>
                   <div className={classes.root}>
                        <Rating name="size-large" defaultValue={params.row.starRate} size="medium" readOnly />
                    </div>
                  </>
                );
              },
          },
      ];

      const [viewAllRate, setviewAllRate] = useState([]);
      const [allFood, setallFood] = useState([]);

      const viewRates = () => {
          axios.get("/food/all-rate")
            .then((response) => {
                console.log(response.data.data);
                setviewAllRate(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
      }

      const allFoods = () => {
          axios.get("/food/all-food")
            .then((response) => {
                console.log(response.data.data);
                setallFood(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
      }

      useEffect(() => {
          viewRates();
          allFoods();
      }, []);

      const getFoodById = (id) => {
          axios.get(`/food/food-rate/${id}`)
            .then((response) => {
                console.log(response.data.rate);
                setviewAllRate(response.data.rate);
            })
            .catch((error) => {
                console.log(error);
            });
      }

      /**
       * report generate 
       */

    return (
        <div className="viewTable">

        <button onClick={exportPDFWithComponent}> Generate Report </button>

          <select>
              <option value="select">Select Food</option>
            {allFood.map((food) => (
            <option value={food._id} onClick={() => getFoodById(food._id)}>{food.foodName}</option>
            ))}
          </select>  

          <ViewDetailsBody columns={columns} 
            rows={viewAllRate}
        />

      <PDFExport ref={pdfExportComponent} paperSize="A4">
            
            <img src={logo} alt="image" width="80px" height="80px" />
              <table className="rateTable">
                <tr>
                  <th>Customer Name</th>
                  <th>About Food</th>
                  <th>Star Rate</th>
                </tr>

                {viewAllRate.map((al) => (
                <tr>
                  <td>{al.customerName}</td>
                  <td>{al.aboutFood}</td>
                  <td>{al.starRate}</td>
                </tr>
                ))}

              </table>
      </PDFExport>

        </div>
    )
}

export default Rate
