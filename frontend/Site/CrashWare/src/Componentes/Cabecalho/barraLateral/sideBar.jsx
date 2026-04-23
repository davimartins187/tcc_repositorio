import { Link, useLocation } from 'react-router-dom';
import Style from './Sidebar.module.css';
import { Tema } from '../../Tema';
import { sobreNos } from '../../Conteudos/'

const Sidebar = ({ aberto, onFechar }) => {
  const location = useLocation();

  const links = [
    { label: 'Home', to: '/' },
    { label: 'Sobre', to: '/sobre' },
    { label: 'Contato', to: '/contato' },
    { label: 'Sobre o TCC', to: '/tcc' },
    { label: 'Termos de serviço', to: '/termos' },
  ];

  return (
    <>
      <div
        className={`${Style.overlay} ${aberto ? Style.overlayOpen : ''}`}
        onClick={onFechar}
      />

      <aside className={`${Style.sidebar} ${aberto ? Style.sidebarOpen : ''}`}>
        <button className={Style.closeBtn} onClick={onFechar}>✕</button>

        <nav>
          {links.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`${Style.link} ${location.pathname === to ? Style.active : ''}`}
              onClick={onFechar}
            >
              {label}
            </Link>
          ))}

          <Tema />
        </nav>
      </aside>
    </>
  );
};

export { Sidebar };