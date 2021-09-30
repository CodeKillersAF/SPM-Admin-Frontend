import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../../Image/logo.jpg';

import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import './rate.css';

export default function PdfRate({ rateVal, pdfExportComponent }) {

    return (
        <div>
               <PDFExport ref={pdfExportComponent} paperSize="A4">
            
            <div className="imgReport">
              <img src={logo} alt="image" width="80px" height="80px" />
            </div>
              <div className="reportTitle">Your Popularity Report</div>
              <div className="reportAddress">No.3, Baththaramulla Road,</div>
              <div className="reportAddress">Colombo</div> <br/>
              <table className="rateTable">
                <tr>
                  <th>Customer Name</th>
                  <th>About Food</th>
                  <th>Star Rate</th>
                </tr>

                {rateVal.map((al) => (
                <tr>
                  <td>{al.customerName}</td>
                  <td>{al.aboutFood}</td>
                  <td>{al.starRate} / 5</td>
                </tr>
                ))}

              </table>
      </PDFExport>
        </div>
    )
}
