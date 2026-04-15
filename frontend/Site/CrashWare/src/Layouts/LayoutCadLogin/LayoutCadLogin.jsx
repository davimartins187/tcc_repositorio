import { Outlet } from "react-router-dom";
import { Cabecalho, LinksCabecalho } from "../../Componentes";

const LayoutCadLogin = () =>
{
    return(
        <>
            <Cabecalho>
                <LinksCabecalho textolink="Sobre o TCC"  link="/sobre-nos"/>
                <LinksCabecalho textolink="Termos de Serviço" link="*" />
            </Cabecalho>
            
            <Outlet />
        </>
    );
};

export { LayoutCadLogin };