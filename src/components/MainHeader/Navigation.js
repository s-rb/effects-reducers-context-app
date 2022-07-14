import React from "react";

import styles from "./Navigation.module.css";
import AuthContext from "../../store/auth-context";

const Navigation = (props) => {
    return (
        <AuthContext.Consumer>
            {(ctx) => {
                return (
                    <nav className={styles.nav}>
                        <ul>
                            {ctx.isLoggedIn && (
                                <li>
                                    <a href="/">Пользователи</a>
                                </li>
                            )}
                            {ctx.isLoggedIn && (
                                <li>
                                    <a href="/">Админ</a>
                                </li>
                            )}
                            {ctx.isLoggedIn && (
                                <li>
                                    <button onClick={props.onLogout}>Выйти</button>
                                </li>
                            )}
                        </ul>
                    </nav>
                )
            }}
        </AuthContext.Consumer>
    );
};

export default Navigation;
