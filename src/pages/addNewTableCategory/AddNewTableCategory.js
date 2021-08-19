import React from 'react'

export default function AddNewTableCategory() {
    return (
        <div className="addNewTableCategory">
            <h1>Add New Table Category</h1>

            <form>
                <div className="addNewTableCatgoryItem">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Category Name" />
                </div>
                <div className="addNewTableCatgoryItem">
                    <label htmlFor="exampleInputPassword1">Description</label>
                    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Category Description" />
                </div>
                <div className="addNewTableCatgoryItem">
                    <label htmlFor="exampleInputPassword1">Image</label>
                    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Category Image" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            
        </div>
    )
}
