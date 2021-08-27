import React from "react";
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
              <a href="" className="active">
                {" "}
                <span className="las la-igloo"></span>
                <span>Dashboard</span>
              </a>
            </li>

            <li>
              <a>
                {" "}
                <span className="las la-users"></span>
                <span>Orders</span>
              </a>
            </li>

            <li>
              <a href="">
                {" "}
                <span className="las la-clipboard-list"></span>
                <span>Foods</span>
              </a>
            </li>
            <li>
              <a href="">
                {" "}
                <span className="las la-shopping-bag"></span>
                <span>Orders</span>
              </a>
            </li>
            <li>
              <Link to="/table">
                <a href="">
                  {" "}
                  <span className="las la-receipt"></span>
                  <span>Tables</span>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/tableCategory">
                <a>
                  {" "}
                  <span className="las la-user-circle"></span>
                  <span>Table Categories</span>
                </a>
              </Link>
            </li>
            <li>
              <a href="">
                {" "}
                <span className="las la-clipboard-list"></span>
                <span>Tasks</span>
              </a>
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
              src="data:image/jpeg;base64,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"
              width="40px"
              height="40px"
            />
            <div className="">
              <h4>Tharusha</h4>
              <small>Admin</small>
            </div>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
