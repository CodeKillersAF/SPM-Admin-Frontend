import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./viewDetailsBody.css";

export default function ViewDetailsBody({columns,rows,onClickCreate}) {
  return (
    <div>
      <div className="viewTable-header">
        <button onClick={(e)=>onClickCreate(e)} className="btn btn-primary">Create</button>
      </div>

      <div style={{ height: "600px", width: "100%" }}>
      {rows.length>0 && (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          getRowId={(row) => row._id}
          autoHeight={true}
          autoPageSize={true}
        />
      )}
      </div>
    </div>
  );
}
