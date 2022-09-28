import "./loginPage.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import FrontPageBg from "../icons/frontPage-bg.png";
import netflix_logo from '../icons/netflixLogo.png'

function LoginPage() {
    const [form, setForm] = useState({ login: "", password: "", rememberMe: false });

    const handleForm = (name: string, value: string | boolean) => {
        setForm({ ...form, [name]: value });
    }

    return (
        <div className="login-page-container">
            <img className="bg-image" src={FrontPageBg} />
            <div className="content">
                <div className="logo">
                    <img src={netflix_logo} />
                </div>

                <div className="sign-in-div">

                    <div className="sign-in__login">

                        <h1>Sign in</h1>
                        <input type="text" name="login" placeholder="Email or phone number" onChange={(e) => handleForm(e.target.name, e.target.value)} />
                        <input type="password" name="password" placeholder="Password" onChange={(e) => handleForm(e.target.name, e.target.value)} />

                        <button><Link to="/browse">Sign in</Link></button>
                        <div className="sign-in-options">
                            <div className="remember-me">
                                <input type="checkbox" name="rememberMe" onChange={(e) => handleForm(e.target.name, e.target.checked)}></input>
                                <span>Remember me</span>
                            </div>
                            <a href="#" >Need help?</a>
                        </div>
                    </div>

                    <div className="new-to-netflix-div">

                        <span>New to Netflix? <a href="http://localhost:3000/">Sign up Now.</a></span>
                        <p>This page is protected by Google reCAPTCHA to ensure you're not bot. <a>Learn more.</a></p>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default LoginPage;