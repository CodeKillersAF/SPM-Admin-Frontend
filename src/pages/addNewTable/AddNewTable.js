import React from "react";
import "./addNewTable.css";

export default function AddNewTable() {
  return (
    <div className="addNewTable">
      <div className="addNewTable-wrapper">
        <h1>Add Table</h1>
        <form className="addTableForm">
          <div className="addTableItem">
            <label>Table Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Table Name"
            />
          </div>
          <div className="addTableItem">
            <label>Description</label>
            <input
              type="text"
              className="form-control"
              placeholder="Description"
            />
          </div>
          <div className="addTableItem">
            <label>Chairs</label>
            <input type="number" className="" placeholder="Chairs" />
          </div>
          <div className="addTableItem">
            <label>Price</label>
            <input type="number" className="" placeholder="Price" />
          </div>
          <div className="addTableItem">
            <label>Width</label>
            <input type="number" className="" placeholder="Width" />
          </div>
          <div className="addTableItem">
            <label>Height</label>
            <input type="number" className="" placeholder="Height" />
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
