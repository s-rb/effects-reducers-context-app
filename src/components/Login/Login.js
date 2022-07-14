import React, {useEffect, useState, useReducer} from "react";

import Card from "../UI/Card/Card";
import styles from "./Login.module.css";
import Button from "../UI/Button/Button";

// prevState - последнее состояние. action - результат (параметр) с которым вызывается функция редъюсера (dispathEmailState)
const emailReducer = (prevState, action) => {
    if (action.type === 'USER_INPUT') {
        return {
            value: action.value,
            isValid: action.value.includes('@')
        }
    } else if (action.type === 'INPUT_BLUR') {
        return {
            value: prevState.value,
            isValid: prevState.value
        }
    }
    return {
        value: "",
        isValid: false
    }
};

const Login = (props) => {
    // const [inputEmail, setInputEmail] = useState("");
    // const [emailIsValid, setEmailIsValid] = useState();
    const [inputPassword, setInputPassword] = useState("");
    const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmailState] = useReducer(
        emailReducer,
        {value: '', isValid: undefined} // Начальное состояние для emailState
    );

    // Использование useEffect с задержкой, чтобы не на каждое нажатие была реакция, далее чтобы они все не срабатывали
    // сразу, предварительно вызывается функция очистки, в которой здесь удаляется таймер предыдущей итерации
    /* useEffect(() => {
         const timer = setTimeout(() => {
             setFormIsValid(
                 inputEmail.includes("@") && inputPassword.trim().length > 7
             );
         }, 1000);
         // Возвращает функцию очистки, которая запускается перед useEffect
         return () => {
             clearTimeout(timer);
         };
     }, [inputEmail, inputPassword])*/

    const emailChangeHandler = (event) => {
        dispatchEmailState({type: 'USER_INPUT', value: event.target.value}); // вызов этой функции запустит emailReducer
        setFormIsValid(
            emailState.isValid && inputPassword.trim().length > 7
        );
    };

    const passwordChangeHandler = (event) => {
        setInputPassword(event.target.value);
        setFormIsValid(event.target.value.trim().length > 7 && emailState.isValid
        );
    };

    const validateEmailHandler = () => {
        dispatchEmailState({ type: 'INPUT_BLUR' });
    };

    const validatePasswordHandler = () => {
        setPasswordIsValid(inputPassword.trim().length > 6);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(emailState.value, inputPassword);
    };

    return (
        <Card className={styles.login}>
            <form onSubmit={submitHandler}>
                <div
                    className={`${styles.control} ${
                        emailState.isValid === false ? styles.invalid : ""
                    }`}
                >
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={emailState.value}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    />
                </div>
                <div
                    className={`${styles.control} ${
                        passwordIsValid === false ? styles.invalid : ""
                    }`}
                >
                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        value={inputPassword}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div className={styles.actions}>
                    <Button type="submit" className={styles.btn} disabled={!formIsValid}>
                        Вход
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
