import { Outlet } from "react-router-dom";
import { Cabecalho, LinksCabecalho, Rodape, Tema } from "../../Componentes";
import style from './LayoutPadrao.module.css'

const LayoutPadrao = () => {
    return (
        <>
            <Cabecalho />
            <Outlet />
            <Rodape />
        </>
    );
};

export { LayoutPadrao };