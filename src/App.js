import React, {useEffect, useState} from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

const isLoggedInKey = 'isLoggedIn';
const loggedInTrue = '1';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storeLoginInfo = localStorage.getItem(isLoggedInKey);
        if (storeLoginInfo === loggedInTrue) {
            setIsLoggedIn(true);
        }
    }, [])

    const loginHandler = (email, password) => {
        localStorage.setItem(isLoggedInKey, loggedInTrue);
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        localStorage.removeItem(isLoggedInKey);
        setIsLoggedIn(false);
    };

    return (
        <React.Fragment>
            <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler}/>
            <main>
                {!isLoggedIn && <Login onLogin={loginHandler}/>}
                {isLoggedIn && <Home onLogout={logoutHandler}/>}
            </main>
        </React.Fragment>
    );
}

export default App;
