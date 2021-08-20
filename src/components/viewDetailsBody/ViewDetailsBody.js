import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./viewDetailsBody.css";

export default function ViewDetailsBody({columns,rows}) {
  return (
    <div>
      <div className="viewTable-header">
        <button className="btn btn-primary">Create</button>
      </div>

      <div style={{ height: "600px", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          getRowId={(row) => row._id}
        />
      </div>
    </div>
  );
}
