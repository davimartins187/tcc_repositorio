import { useState } from "react";
import { Sidebar } from '../../Componentes/Cabecalho/barraLateral/sideBar';
import { Outlet, Link } from "react-router-dom"
import { Cabecalho, Rodape } from "../../Componentes"
import Logo from '../../Logo/logo_sem_fundo.png';
import style from "./LayoutLogado.module.css"

const LayoutLogado = () => {
    const DataATual = new Date().getFullYear();
    const [aberto, setAberto] = useState(false);


    return (
        <>
            <Cabecalho>
                <button className={style.hamburger} onClick={() => setAberto(!aberto)}>
                    {aberto ? <p>✕</p> : <p>☰</p>}
                </button>
                <Sidebar aberto={aberto} onFechar={() => setAberto(false)} />

                    
            </Cabecalho>
            <Outlet />
        </>
    )
}

export { LayoutLogado }