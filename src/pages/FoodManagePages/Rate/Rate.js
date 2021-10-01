import React, { useState, useEffect } from 'react';
import ViewDetailsBody from "../../../components/viewDetailsBody/ViewDetailsBody";
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import 'jspdf-autotable';


import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import './rate.css';
import PdfRate from './PdfRate';

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

    const [numS, setnumS] = useState(0);

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
          width: 300,
          editable: true,
        },
        {
            field: "aboutFood",
            headerName: "About Food",
            width: 400,
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
        <div>

    <div className="rateandPdf">
        <button className="generateRate" onClick={exportPDFWithComponent}> Generate Report </button>

          <select className="selectFoodRate">
              <option value="select" onClick={() => viewRates()}>Select Food</option>
            {allFood.map((food) => (
            <option value={food._id} onClick={() => getFoodById(food._id)}>{food.foodName}</option>
            ))}
          </select>  
      </div>

          <ViewDetailsBody columns={columns} 
            rows={viewAllRate}
        />
        

            <PdfRate rateVal={viewAllRate} pdfExportComponent={pdfExportComponent} />

        </div>
    )
}

export default Rate
