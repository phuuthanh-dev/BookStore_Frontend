import React from "react";

function Banner() {
  return (
    <div style={{backgroundColor: "#27292D"}}>
      <div className="container-fluid py-5 text-white d-flex justify-content-center align-items-center">
        <div>
            <h3 className="display-5 fw-bold mb-4">
                Welcome to the Book Store Project!
            </h3>
            <span className="">Phùng Hữu Thành</span>
            <button className="btn btn-primary text-white float-end">Go shopping!</button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
