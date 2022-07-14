import React, {useReducer, useState} from "react";

import Card from "../UI/Card/Card";
import styles from "./Login.module.css";
import Button from "../UI/Button/Button";

// prevState - последнее состояние. action - результат (параметр) с которым вызывается функция редъюсера (dispathEmailState)
const emailReducer = (prevState, action) => {
    if (action.type === 'USER_INPUT') {
        return {
            value: action.value,
            isValid: action.value?.includes('@')
        }
    } else if (action.type === 'INPUT_BLUR') {
        return {
            value: prevState.value,
            isValid: prevState.value.includes('@')
        }
    }
    return {
        value: "",
        isValid: false
    }
};

const passwordReducer = (prevState, action) => {
    if (action.type === 'USER_INPUT') {
        return {
            value: action.value,
            isValid: action.value?.trim().length > 7
        }
    } else if (action.type === 'INPUT_BLUR') {
        return {
            value: prevState.value,
            isValid: prevState.value.trim().length > 7
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
    // const [inputPassword, setInputPassword] = useState("");
    // const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmailState] = useReducer(
        emailReducer,
        {value: '', isValid: undefined} // Начальное состояние для emailState
    );
    const [passwordState, dispatchPasswordState] = useReducer(passwordReducer, {value: '', isValid: undefined})

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
            event.target.value.includes("@") && passwordState.isValid
        );
    };

    const passwordChangeHandler = (event) => {
        dispatchPasswordState({type: 'USER_INPUT', value: event.target.value})
        setFormIsValid(event.target.value.trim().length > 7 && emailState.isValid
        );
    };

    const validateEmailHandler = () => {
        dispatchEmailState({type: 'INPUT_BLUR'});
    };

    const validatePasswordHandler = () => {
        dispatchPasswordState({type: 'INPUT_BLUR'});
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(emailState.value, passwordState.value);
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
                        passwordState.isValid === false ? styles.invalid : ""
                    }`}
                >
                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        value={passwordState.value}
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
