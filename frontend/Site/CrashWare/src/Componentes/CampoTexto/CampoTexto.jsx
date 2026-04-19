import {  forwardRef } from 'react';
import style from './CampoTexto.module.css';

const CampoTexto = forwardRef((props, ref) =>
{
    return (
        <div className={style.CampoTexto}>
            <input {...props}
            ref={ref}/>
        </div>
    );
});

export { CampoTexto };