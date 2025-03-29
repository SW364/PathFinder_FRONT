import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../styles/logo.css'; 

export default function LoginPage() {
    return (
      <div className="d-flex vh-100">
        
        <div className="w-50 d-flex flex-column justify-content-center align-items-center bg-white">
          <h1 className="fw-bold d-flex align-items-center">
          <span className="d-flex align-items-center gap-2">
            <img 
                src="Img/logo.png"
                style={{ height: "140px" }}   
            />
            </span>
          </h1>
          <div className="mt-1 w-50">
            <input
                type="email"
                placeholder="Mail"
                className="form-control mb-3 shadow-sm bg-light input-purple-focus"
            />
            <input
                type="password"
                placeholder="Password"
                className="form-control mb-3 shadow-sm bg-light input-purple-focus"
            />
            <button className="btn btn-dark w-100">
              Log in
            </button>
            <p className="text-center mt-3">
                <a href="#" className="text-dark text-decoration-underline">Recover password</a>
            </p>
          </div>
        </div>
        
        <div
          className="w-50 bg-cover bg-center"
          style={{ background: 'url("Img/login_img.png") no-repeat center/cover' }}
        ></div>
      </div>
    );
}
  