import { useState, useEffect } from 'react';
import FTema_claro from '../../fotos/claro/lua_icon_claro.svg';
import FTema_escuro from '../../fotos/sol.svg';
import Style from "./Tema.module.css";

const Tema = () =>
{
    const [tema, setTema] = useState(localStorage.getItem('TemaSelecionado') || 'Claro');

    useEffect(() => {
        document.body.className = tema;
        localStorage.setItem('TemaSelecionado', tema);

        // Avisa os outros componentes na mesma aba
        window.dispatchEvent(new CustomEvent('temaAtualizado', { detail: tema }));
    }, [tema]);

    const TrocarTema = () =>
    {
        setTema(tema === "Claro" ? "Escuro" : "Claro");
    }

    const icone = tema === 'Claro' ? FTema_claro : FTema_escuro;

    return (
        <button onClick={TrocarTema} className={Style.tema}>
            
            <img src={icone} alt="Trocar tema" />
        </button>
    );
};

export { Tema };