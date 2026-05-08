import { useState } from "react"
import FotoPadrao from "../../../fotos/FotoPerfilPadrao.jpeg"
import style from "./ConteudoHome.module.css"


const ConteudoHome = () => {

    const [xp, setXp] = useState(500);
    const XpMax = 500; //xp para mudar de nivel
    const Nivel = Math.floor(xp / XpMax);
    const xpAtual = xp % XpMax;
    const porcentagem = (xpAtual / XpMax) * 100;

    return (
        <div className={style.corpo}>
            <div className={style.container}>

                    <div className={style.imagemDiv}>
                        <img src={FotoPadrao} alt="" />
                    </div>

                <div className={style.InfoUsuario}>
                    <h2>Bem-Vindo De Volta, <span>Usuario</span></h2>

                    <div className={style.Nivel}>
                        <div className={style.NivelTopo}>
                            <span>Nível {Nivel}</span>
                            <span>{xpAtual}/{XpMax} XP</span>
                        </div>

                        <div className={style.Barra}>
                            <div
                                className={style.Progresso}
                                style={{ width: `${porcentagem}%` }}
                            ></div>
                        </div>
                    </div>
                    
                    <div className={style.trilhas}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export { ConteudoHome }