import { Outlet } from "react-router-dom";
import { Cabecalho } from "../../Componentes";

const LayoutCadLogin = () =>
{
    return(
        <>
            <Cabecalho />
            <Outlet />
        </>
    );
};

export { LayoutCadLogin };