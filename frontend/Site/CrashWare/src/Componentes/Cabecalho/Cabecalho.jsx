import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../fotos/escuro/logo_sem_fundo.svg';
import Style from './Cabecalho.module.css';

//Functions
import { handleRedirect } from '../../../funcoes/functions';
import { Tema } from '../Tema';




const Cabecalho = ({ children }) => {

  //Permite eu navegar entre paginas
  const Navegacao = useNavigate();

  return (
    <>
        <header className={Style.Cabecalho}>

          <div className={Style.infoCabecalho}>
            <Link to="#" onClick={(e) => {
              e.preventDefault()
              handleRedirect(Navegacao)
            }}>
              <img className={Style.logo_legal} src={Logo} alt="Logo do CrashWare" />
              <h5>CRASHWARE</h5>
            </Link>
          </div>

          {children}

        </header>

    </>
  );
};

export { Cabecalho };