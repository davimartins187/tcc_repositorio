import { Link } from 'react-router-dom';
import style from './LinksCabecalho.module.css'

//Função que muda os links do Header
const LinksCabecalho = ({textolink, link}) =>
{
    return(
        <div className={style.texto}>
            <Link to={link}>
                <p>{textolink}</p>
            </Link>
        </div>
    )
} 

export { LinksCabecalho }