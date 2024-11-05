import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/LoginStyle.css";

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("https://localhost:7258/login", { username, password });
    
            // Obtén el perfil numérico
            const perfil = response.data.usuario.perfil;
    
            // Mapea el perfil numérico a un tipo de usuario en texto
            let userType;
            if (perfil === 1) {
                userType = "Gerente de tienda";
            } else if (perfil === 2) {
                userType = "Colaborador";
            } else {
                console.warn("Tipo de usuario no reconocido:", perfil);
                return; // Detiene la ejecución si el perfil no es reconocido
            }
    
            // Almacena el tipo de usuario en localStorage
            localStorage.setItem("userType", userType);
    
            // Redirige según el tipo de usuario
            if (userType === "Colaborador") {
                navigate("/colaborador-dashboard");
            } else if (userType === "Gerente de tienda") {
                navigate("/gerente-dashboard");
            }
    
            onLogin(); // Llama a la función de autenticación
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error("Usuario o contraseña incorrectos");
            } else {
                console.error("Error al iniciar sesión:", error);
            }
        }
    };
    

    return (
        <>
        <div className="bodyLogin">

            <form className="my-form" onSubmit={handleSubmit}>
                <div className="login-welcome-row">
                    <a href="#" title="Logo">
                        <img src="/src/assets/logo.png" alt="Logo" className="logo" />
                    </a>
                    <h1>Welcome back &#x1F44F;</h1>
                    <p>Please enter your details!</p>
                </div>
                <div className="input__wrapper">
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="input__field"
                        placeholder="Your Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label htmlFor="username" className="input__label">Username:</label>
                </div>
                <div className="input__wrapper">
                    <input
                        id="password"
                        type="password"
                        className="input__field"
                        placeholder="Your Password"
                        title="Minimum 6 characters at least 1 Alphabet and 1 Number"
                        pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label htmlFor="password" className="input__label">Password</label>
                </div>
                <button type="submit" className="my-form__button">
                    Login
                </button>
            </form>
            </div>
        </>
    );
};

export default Login;
