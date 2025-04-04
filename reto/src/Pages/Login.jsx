import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/logo.css'; 

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://pathfinder-back-hnoj.onrender.com/employees/login', {
        email,
        pass,
      });
      const { token } = response.data; // Asegúrate de que el token se recibe en la respuesta
      localStorage.setItem('authToken', token); // Guarda el token en localStorage
      console.log('Login exitoso:', response.data);
      navigate('/profile');
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setError('Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="d-flex vh-100">
      <div className="w-50 d-flex flex-column justify-content-center align-items-center bg-white">
        <h1 className="fw-bold d-flex align-items-center">
          <span className="d-flex align-items-center gap-2">
            <img 
              src="Img/logo.png"
              style={{ height: "140px" }}   
              alt="Logo"
            />
          </span>
        </h1>
        <div className="mt-1 w-50">
          <input
            type="email"
            placeholder="Mail"
            className="form-control mb-3 shadow-sm bg-light input-purple-focus"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="input-group mb-3 shadow-sm bg-light">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="form-control input-purple-focus"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Ocultar' : 'Ver'}
            </button>
          </div>
          <button className="btn btn-dark w-100" onClick={handleLogin}>
            Log in
          </button>
          {error && <p className="text-danger text-center mt-3">{error}</p>}
        </div>
      </div>
      <div
        className="w-50 bg-cover bg-center"
        style={{ background: 'url("Img/login_img.png") no-repeat center/cover' }}
      ></div>
    </div>
  );
}
