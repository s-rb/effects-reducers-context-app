import React, {useReducer, useState, useEffect, useContext, useRef} from "react";

import Card from "../UI/Card/Card";
import styles from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

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
    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmailState] = useReducer(
        emailReducer,
        {value: '', isValid: undefined} // Начальное состояние для emailState
    );
    const [passwordState, dispatchPasswordState] = useReducer(passwordReducer, {value: '', isValid: undefined})

    // Деструктуризация объекта и алиас - извлекается свойство объекта isValid и помещается в переменную с алиасом emailIsValid
    const {isValid: emailIsValid} = emailState;
    const {isValid: passwordIsValid} = passwordState;

    const ctx = useContext(AuthContext);

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    // Использование useEffect с задержкой, чтобы не на каждое нажатие была реакция, далее чтобы они все не срабатывали
    // сразу, предварительно вызывается функция очистки, в которой здесь удаляется таймер предыдущей итерации
    useEffect(() => {
            const timer = setTimeout(() => {
                setFormIsValid(emailIsValid && passwordIsValid);
            }, 1000);
            // Возвращает функцию очистки, которая запускается перед useEffect
            return () => {
                clearTimeout(timer);
            };
        },
        // Т.к. если зависимость полностью от объекта emailState вызывает слишком частый запуск хука, а нужно только свойство isValid
        // Переделываем на использование свойства emailIsValid
        [emailIsValid, passwordIsValid]) // Запускается хук когда меняются эти данные. В них будет гарантированно последнее состояние

    const emailChangeHandler = (event) => {
        dispatchEmailState({type: 'USER_INPUT', value: event.target.value}); // вызов этой функции запустит emailReducer

        // setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
    };

    const passwordChangeHandler = (event) => {
        dispatchPasswordState({type: 'USER_INPUT', value: event.target.value})

        // setFormIsValid(event.target.value.trim().length > 7 && emailState.isValid);
    };

    const validateEmailHandler = () => {
        dispatchEmailState({type: 'INPUT_BLUR'});
    };

    const validatePasswordHandler = () => {
        dispatchPasswordState({type: 'INPUT_BLUR'});
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (formIsValid) {
            ctx.onLogin(emailState.value, passwordState.value);
        } else if (!emailIsValid) {
            emailInputRef.current.doFocus();
        } else {
            passwordInputRef.current.doFocus();
        }
    };

    return (
        <Card className={styles.login}>
            <form onSubmit={submitHandler}>
                <Input
                    ref={emailInputRef}
                    isValid={emailIsValid}
                    label={"Email"}
                    type={"email"}
                    id={"email"}
                    value={emailState.value}
                    onChangeHandler={emailChangeHandler}
                    onBlurHandler={validateEmailHandler}
                />
                <Input
                    ref={passwordInputRef}
                    isValid={passwordIsValid}
                    label={"Пароль"}
                    type={"password"}
                    id={"password"}
                    value={passwordState.value}
                    onChangeHandler={passwordChangeHandler}
                    onBlurHandler={validatePasswordHandler}
                />
                <div className={styles.actions}>
                    <Button type="submit" className={styles.btn}>
                        Вход
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
