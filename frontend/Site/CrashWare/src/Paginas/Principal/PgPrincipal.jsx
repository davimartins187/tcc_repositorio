import { ConteudoInicial } from "../../Componentes";

//Controle de navegação
localStorage.setItem("rec_senha", false)

const PgInicial = () =>
{
    return (
        <>
            <ConteudoInicial />
        </>
    );
};

export { PgInicial };