import { Outlet } from "react-router-dom";
import { Cabecalho, LinksCabecalho, Rodape } from "../../Componentes";

const LayoutPadrao = () =>
{
    return (
        <>
            <Cabecalho>
                <LinksCabecalho textolink="Sobre o TCC"  link="/sobre-nos"/>
                <LinksCabecalho textolink="Termos de Serviço" link="*" />
            </Cabecalho>
                
            <Outlet/>
            <Rodape />
        </>
    );
};

export { LayoutPadrao };