import React, {useEffect, useState} from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";

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
        <AuthContext.Provider value={{isLoggedIn: isLoggedIn}}>
            <MainHeader onLogout={logoutHandler}/>
            <main>
                {!isLoggedIn && <Login onLogin={loginHandler}/>}
                {isLoggedIn && <Home onLogout={logoutHandler}/>}
            </main>
        </AuthContext.Provider>
    );
}

export default App;
