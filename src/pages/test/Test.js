import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import './test.css';

export default function Test() {

    const [allData, setAllData] = useState([]);

    const viewAllCategory = () => {
        axios.get("/category/all-category")
         .then((res) => {
             console.log(res.data.data);
             setAllData(res.data.data);
         })
         .catch((error) => {
             console.log(error);
         })
    }

    useEffect(() => {
        viewAllCategory();
    }, []);

    return (
        <div>
            
            <table>
                <tr>
                    <th>Category Id</th>
                    <th>Category Name</th>
                </tr>

                {allData.map((view) => (
                <tr>
                    <td>{view._id}</td>
                    <td>{view.categoryName}</td>
                </tr>
                ))}

            </table>

        </div>
    )
}
