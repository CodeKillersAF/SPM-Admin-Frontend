import React, { useState, useEffect } from "react";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import "./tableBookingPDF.css";
import logo from "../../Image/logo.jpg";
import axios from "axios";

export default function TableBookingPDF({ tableBooking, pdfExportComponent }) {

  return (
    <div>
      <PDFExport ref={pdfExportComponent} paperSize="A3">
        <div className="imgReport">
          <img src={logo} alt="image" width="80px" height="80px" />
        </div>
        <div className="reportTitle">Table Booking Report</div>
        <div className="reportAddress">No.3, Baththaramulla Road,</div>
        <div className="reportAddress">Colombo</div> <br />
        
        <p style={{marginLeft:"20px" , marginBottom:"20px"}}>Total Bookings : {tableBooking.length}</p>
        <table className="rateTable">
          <tr>
            <th>Customer Name</th>
            <th>Table</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date</th>
          </tr>

          {tableBooking.map((value) => (
            <tr>
              <td>{value.customerName}</td>
              <td>{value.tableId.name}</td>
              <td>{value.email}</td>
              <td>{value.phone}</td>
              <td>{value.date}</td>
            </tr>
          ))}
        </table>
      </PDFExport>
    </div>
  );
}
