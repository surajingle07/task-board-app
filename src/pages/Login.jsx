import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        const validEmail = "intern@demo.com";
        const validPassword = "intern123";

        if (email === validEmail && password === validPassword) {
            localStorage.setItem("auth", "true");
            navigate("/board");
        }
        else {
            setError("Invalid email or password");
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleLogin} style={styles.form}>
                <h2>Login</h2>

                {error && <p style={styles.error}>{error}</p>}

                <input
                    type="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={styles.input}
                />

                <input
                    type="password"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={styles.input}
                />

                <label style={styles.checkbox}>
                    <input
                        type="checkbox"
                        checked={remember}
                        onChange={() => setRemember(!remember)}
                    />
                    Remember Me
                </label>

                <button type="submit" style={styles.button}>
                    Login
                </button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        background: "url('./images/Login_bg.jpg')",
        backgroundSize: "cover",
    },
    form: {
        background: "rgba(255, 255, 255, 0.9)",
        padding: "2rem",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        width: "700px",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    input: {
        fontFamily: "Arial, sans-serif",
        fontSize: "20px",
        width: "100%",
        height: "50px",
        padding: "10px",
        borderRadius: "4px",
        border: "1px solid #ccc",
    },
    button: {
        padding: "10px",
        height: "40px",
        width:"50%",
        borderRadius: "4px",
        border: "none",
        backgroundColor: "#007bff",
        color: "#fff", 
        cursor: "pointer", 
        fontFamily: "Arial, sans-serif",
        fontSize: "18px",
        alignSelf: "center",
    },
    error: {
        color: "red",
        fontSize: "14px",
    },
    checkbox: {
        display: "flex",
        alignItems: "center",
        gap: "5px",
    },
};
