import React from 'react';
import classes from '../CustomSelect/CustomSelect.module.scss'

interface CustomOptionProps {
    setValue: any,
    setDataState: any,
    children: React.ReactNode,
    id: string
}

const CustomOption: React.FC<CustomOptionProps> = ({setValue, setDataState, children, id}) => {
    return (
        <div className={classes.form2}>
            <input id={id} className={classes.__select__input} type="radio" name="singleSelect"/>
            <label htmlFor={id} onClick={() => { setDataState(false); setValue(children)}} className={classes.__select__label}>{children}</label>
         </div>
    );
};

export default CustomOption;