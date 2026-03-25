import FTema from '../../fotos/lua_icon.svg'
import Style from './Tema.module.css'

const Tema = () =>
{
    return (
        <>
            <img src={FTema} alt="" style={{ width: '50px', height: '50px', marginRight: '20px' }} />    
        </>
    )
}

export { Tema }