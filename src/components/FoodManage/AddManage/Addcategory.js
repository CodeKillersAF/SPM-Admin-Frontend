import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import './addcategory.css';
import axios from 'axios';
import Select from 'react-select';

function Addcategory() {

    const history = useHistory();

    const [category, setCategory] = useState('');

    const [food, setFood] = useState([]);


    const getAllData = async() => {
        const data = await axios.get("/food/all-food");
        console.log(data.data.data);

        setFood(data.data.data);
    }

    useEffect(() => {
        getAllData();
    }, []);

    let allFoodsArray = [];
    food.map((f, index) => {
        let allFoods = {
            value: f._id,
            label: f.foodName
        }

    allFoodsArray.push(allFoods);

     //   console.log(value);
        
    })

    const [foodArray, setFoodArray] = useState();

    const selectedFood = (e) => {
        setFoodArray(Array.isArray(e)?e.map(item => item.value) : []);
    }


    async function addCategoryClick (e) {
        e.preventDefault();

        let categoryDetails = {
            categoryName: category,
            foodItems: foodArray,
        }

     //   console.log(categoryDetails);

        await axios.post("/category/add-category", categoryDetails)
            .then((response) => {
                console.log(response.data);
                let path = '/view-c';
                history.push(path);

                console.log(categoryDetails);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (

//  <div className = "addFoodManage" >
//      <div className="FoodcardView">
//             <div class="addFood">
//             <h1>Add Category</h1>
//             <form>
//                 <div class="addFoodBox">
//                 <input type="text"
//                      value={category}
//                      onChange={(e) => setCategory(e.target.value)} 
//                      required />
//                 <span>Category Name</span>
//                 </div>
//                 <div class="addFoodSelect">
//                 <Select
//                     //options={this.state.options}
//                     options={allFoodsArray}
//                     onChange={selectedFood}
//                     className="basic-multi-select"
//                     isMulti
//                 />
//                 {/* <span>Select Food Items</span> */}
//                 </div>
//                 <div class="addFoodBox">
//                 <input type="button" value="Add Category" onClick={addCategoryClick} />
//                 </div>
//             </form>
//             </div>
//         </div>
//      </div>

    <div>
        <div className="addFood-box">
            <h2>Add Category</h2>
            <div className="formDesign">
                <div className="food-box">
                    <input type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)} 
                        required />
                    <label>Category Name</label>
                </div>

                 <Select
                    //options={this.state.options}
                    options={allFoodsArray}
                    onChange={selectedFood}
                    className="basic-multi-select"
                    isMulti
                />

            </div>
        </div>
    </div>

    )
}

export default Addcategory
