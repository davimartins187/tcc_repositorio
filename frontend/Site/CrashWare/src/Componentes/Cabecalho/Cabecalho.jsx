import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../Logo/logo_sem_fundo.png';
import { Sidebar } from '../Cabecalho/barraLateral/sideBar';
import Style from './Cabecalho.module.css';

const Cabecalho = ({ children }) => {
  const [aberto, setAberto] = useState(false);

  return (
    <>
      <header className={Style.Cabecalho}>
        <Link to="/">
          <div className={Style.infoCabecalho}>
            <img className={Style.logo_legal} src={Logo} alt="" />
            <h5>CRASHWARE</h5>
          </div>
        </Link>

        <button className={Style.hamburger} onClick={() => setAberto(true)}>
          ☰
        </button>
      </header>

      <Sidebar aberto={aberto} onFechar={() => setAberto(false)} />
    </>
  );
};

export { Cabecalho };