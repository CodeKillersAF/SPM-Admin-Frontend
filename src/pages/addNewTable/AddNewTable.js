import React, { useState } from "react";
import "./addNewTable.css";

export default function AddNewTable() {
  const [tableName, setTableName] = useState("");
  const [tableCategory, setTableCategory] = useState("");
  const [tableChairs, setTableChairs] = useState(0);
  const [tableWidth, setTableWidth] = useState(0);
  const [tableHeight, setTableHeight] = useState(0);
  const [tableDescription, setTableDescription] = useState("");
  const [tableImage, setTableImage] = useState("");
  const [tablePrice, setTablePrice] = useState(0);

  return (
    <div className="addNewTable">
      <div className="addNewTable-wrapper">
        <h1>Add New Table</h1>
        <form className="addTableForm">
          <div className="addTableItem">
            <label>Table Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Table Name"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
            />
          </div>
          <div className="addTableItem">
            <label>Description</label>
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={tableDescription}
              onChange={(e) => setTableDescription(e.target.value)}
            />
          </div>
          <div className="addTableItem">
            <label>Chairs</label>
            <input
              type="number"
              className=""
              placeholder="Chairs"
              value={tableChairs}
              onChange={(e) => setTableChairs(e.target.value)}
            />
          </div>
          <div className="addTableItem">
            <label>Price</label>
            <input
              type="number"
              className=""
              placeholder="Price"
              value={tablePrice}
              onChange={(e) => setTablePrice(e.target.value)}
            />
          </div>
          <div className="addTableItem">
            <label>Width</label>
            <input
              type="number"
              className=""
              placeholder="Width"
              value={tableWidth}
              onChange={(e) => setTableWidth(e.target.value)}
            />
          </div>
          <div className="addTableItem">
            <label>Height</label>
            <input
              type="number"
              className=""
              placeholder="Height"
              value={tableHeight}
              onChange={(e) => setTableHeight(e.target.value)}
            />
          </div>
          <div className="addTableItem">
            <label>Category</label>
            <select className="newTableSelect">
              <option>Table</option>
              <option>Dining</option>
              <option>Lounge</option>
              <option>Kitchen</option>
              <option>Dance</option>
              <option>Chairs</option>
            </select>
          </div>
          <div className="addTableItem">
            <label>Image</label>
            <div className="addTableImage">
              <input type="file" className="form-control" placeholder="Image" />
            </div>
          </div>
          <button className="addTableButton" type="submit">
            Add Table
          </button>
        </form>
      </div>
    </div>
  );
}
