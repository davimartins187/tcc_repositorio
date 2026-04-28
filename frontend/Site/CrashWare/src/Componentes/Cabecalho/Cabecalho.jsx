import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../Logo/logo_sem_fundo.png';
import { Sidebar } from '../Cabecalho/barraLateral/sideBar';
import Style from './Cabecalho.module.css';

//Functions
import { handleRedirect } from '../../../funcoes/functions';




const Cabecalho = ({ children }) => {
  const [aberto, setAberto] = useState(false);

  //Permite eu navegar entre paginas
  const Navegacao = useNavigate();

  return (
    <>
      <header className={Style.Cabecalho}>
   
          <div className={Style.infoCabecalho}>
            <img className={Style.logo_legal} src={Logo} alt="Logo do CrashWare" />
            <h5>CRASHWARE</h5>
          </div>
       

        {/* <button className={Style.hamburger} onClick={() => setAberto(!aberto)}>
          {aberto ? <p>✕</p> : <p>☰</p>}
        </button> */}
      </header>

      {/* <Sidebar aberto={aberto} onFechar={() => setAberto(false)} /> */}
    </>
  );
};

export { Cabecalho };