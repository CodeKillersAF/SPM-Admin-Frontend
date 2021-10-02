import React,{ useState } from "react";
import { Link } from "react-router-dom";
import "./layout.css";

export default function Layout({ children }) {

  return (
    <div>
      <input type="checkbox" name="" id="nav-toggle" />
      <div className="sidebar">
        <div className="sidebar-brand">
          <h2>
            <span className="lab la-accusoft"></span> <span>My Resturant</span>
          </h2>
        </div>
        <div className="sidebar-menu">
          <ul>
            <li>
              <Link to="/home">
                {" "}
                <span className="las la-igloo"></span>
                <span>Dashboard</span>
                
              </Link>
            </li>

            <li>
            <Link to="/online-orders">
                {" "}
                <span className="las la-users"></span>
                <span>Orders</span>
              </Link>
            </li>

            <li>
              <Link to="/foodCategory/view-category">
                {" "}
                <span className="las la-clipboard-list"></span>
                <span>Food Category</span>
              </Link>
            </li>
            <li>
              <Link to="/rate">
                {" "}
                <span className="las la-clipboard-list"></span>
                <span>Rate</span>
              </Link>
            </li>
            <li>
              <Link to="/table">
                  {" "}
                  <span className="las la-receipt"></span>
                  <span>Tables</span>
              </Link>
            </li>
            <li>
              <Link to="/tableCategory">
                  {" "}
                  <span className="las la-user-circle"></span>
                  <span>Table Categories</span>
              </Link>
            </li>
            <li>
              <Link to="/tableBooking">
                  {" "}
                  <span className="las la-user-circle"></span>
                  <span>Table Bookings</span>
              </Link>
            </li>
            <li>
            <Link to="/supplier">
                {" "}
                <span class="las la-clipboard-list"></span>
                <span>Suppliers</span>
              </Link>
            </li>
            <li>
            <Link to="/supplyItem">
                {" "}
                <span className="las la-clipboard-list"></span>
                <span>Supply Item</span>
             </Link>
            </li>
            <li>
            <Link to="/supplyRecord">
                {" "}
                <span className="las la-clipboard-list"></span>
                <span>Supplier Record</span>
             </Link>
            </li>
            
          </ul>
        </div>
      </div>
      <div className="main-content">
        <header>
          <h2>
            <label htmlFor="nav-toggle">
              <span className="las la-bars"></span>
            </label>
            Dashboard
          </h2>
          <div className="search-wrapper">
            <span className="las la-search"></span>
            <input type="search" name="" placeholder="Search here" id="" />
          </div>
          <div className="user-wrapper">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/000/513/075/small_2x/36_Admin_Roles.jpg"
              width="40px"
              height="40px"
            />
            <div className="">
              <h4>Admin Name</h4>
              <small>Admin</small>
            </div>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
