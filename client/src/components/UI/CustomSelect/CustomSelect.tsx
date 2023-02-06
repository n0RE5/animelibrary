import React, { useState } from 'react';
import { options } from '../../../types/Global';
import CustomOption from '../CustomOption/CustomOption';
import classes from './CustomSelect.module.scss'

interface CustomSelectProps {
    technicalName: string,
    optionArray: options[],
    placeholder: string,
    output: string,
    setOutput: (arg0: any) => void
}

const CustomSelect: React.FC<CustomSelectProps> = ({output, setOutput, optionArray, technicalName, placeholder}) => {
    const [dataState, setDataState]= useState<boolean>(false);

    return (
        <div className={classes.form}>
            <div className={classes.__select} data-state={dataState}>
                <div className={classes.__select__title} onClick={() => setDataState((prev) => !prev)}>{output? output : placeholder}</div>
                <div className={classes.__select__content}>
                    <CustomOption setValue={setOutput} setDataState={setDataState} id={technicalName}>{null}</CustomOption>
                    {optionArray?.map((option, index) =>
                        <CustomOption key={index} setValue={setOutput} setDataState={setDataState} id={technicalName+index}>{option.optionName}</CustomOption>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomSelect;