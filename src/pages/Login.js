import React from 'react';

function Login() {
    return (
        <div>
            <header>
                <h1>Makhi - Login</h1>
            </header>
            <form>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
            <p>Placeholder: Firebase Authentication</p>
        </div>
    );
}

export default Login;
