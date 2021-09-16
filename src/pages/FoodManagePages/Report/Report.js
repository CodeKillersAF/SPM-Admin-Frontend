import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";

function Report() {

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


    return (
     <div>

        <button onClick={exportPDFWithComponent}>Download</button>

        <PDFExport ref={pdfExportComponent} paperSize="A4">
        <Grid
          style={{
            maxHeight: "400px",
          }}
        >
          <Column field="customerName" title="Customer Name" width="300px" />
          <Column field="aboutFood" title="About Food" width="250px" />
          <Column field="starRate" title="Star Rate" />

        </Grid>
      </PDFExport>
    </div>
    )
}

export default Report
