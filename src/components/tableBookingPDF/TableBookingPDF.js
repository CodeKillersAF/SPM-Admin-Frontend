import React, { useState, useEffect } from 'react';
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import "./tableBookingPDF.css"
import logo from '../../Image/logo.jpg';


export default function TableBookingPDF({ tableBooking, pdfExportComponent }) {

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
                  <th>Table</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>

                {tableBooking.map((value) => (
                <tr>
                  <td>{value.customerName}</td>
                  <td>{value.tableID}</td>
                  <td>{value.email}</td>
                  <td>{value.phone}</td>
                </tr>
                ))}

              </table>
      </PDFExport>

        </div>
    )
}