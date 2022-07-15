import React, {useRef, useImperativeHandle} from "react";
import styles from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
    const inputRef = useRef();
    const activate = () => {
        inputRef.current.focus();
    };

    useImperativeHandle( ref,
        // функция возвращающая объект доступный для активации снаружи
        ()=>{
            return {
                doFocus: activate
            }
        })

    return <div
        className={`${styles.control} ${props.isValid === false ? styles.invalid : ""}`}
    >
        <label htmlFor={props.id}>{props.label}</label>
        <input
            ref={inputRef}
            type={props.type}
            id={props.id}
            value={props.value}
            onChange={props.onChangeHandler}
            onBlur={props.onBlurHandler}
        />
    </div>;
})

export default Input;