import Logo from '../../Logo/logo_sem_fundo.png'
import Style from './Rodape.module.css'
import { Link } from 'react-router-dom'
const Rodape = () =>
{
    return (
        <>
            <footer className={Style.Rodape}>
                
                <div className={Style.Marca}>
                    <Link to="/">
                        <img src={Logo} alt="" />
                        <h4>CRASHWARE</h4>
                    </Link>
                </div>


                <div className={Style.links}>
                    <Link to='sobre-nos'>
                        <p>Sobre Nós</p>
                    </Link>
                    <p>Politica de Privacidade</p>
                    <p>Compromisso com a IntegSridade</p>
                    <p>Termos de Uso</p>
                </div>
            </footer>
        </>
    )
}

export { Rodape }