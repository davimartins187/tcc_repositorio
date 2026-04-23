import { useState, useEffect } from 'react';
import Style from "./ConteudoConfiguracoes.module.css";

import casinhaModoEscuro from "../../../fotos/img_configuracoes/modoEscuro/casinha.svg";
import casinhaModoClaro from "../../../fotos/img_configuracoes/modoClaro/casinha.svg";
import escudoModoEscuro from "../../../fotos/img_configuracoes/modoEscuro/escudo.svg";
import escudoModoClaro from "../../../fotos/img_configuracoes/modoClaro/escudo.svg";
import pessoaModoEscuro from "../../../fotos/img_configuracoes/modoEscuro/pessoa.svg";
import pessoaModoClaro from "../../../fotos/img_configuracoes/modoClaro/pessoa.svg";
import idiomaModoEscuro from "../../../fotos/img_configuracoes/modoEscuro/linguas.svg";
import idiomaModoClaro from "../../../fotos/img_configuracoes/modoClaro/linguas.svg";

import setaSairEscuro from "../../../fotos/img_configuracoes/modoEscuro/sair_outro_lado.svg";
import setaSairClaro from "../../../fotos/img_configuracoes/modoClaro/sair_outro_lado.svg";

// Componente para cada item da barra lateral
const ItemBarraLateral = ({ descricao, img }) => {
    return (
        <div className={Style.itemBarraLateral}>
            <img src={img} alt={descricao} />
            <span>{descricao}</span>
        </div>
    );
};

const ConteudoConfiguracoes = () => {
    const [tema, setTema] = useState(localStorage.getItem('TemaSelecionado') || 'Claro');

    useEffect(() => {
        const checarTema = (e) => setTema(e.detail);
        window.addEventListener('temaAtualizado', checarTema);
        return () => window.removeEventListener('temaAtualizado', checarTema);
    }, []);

    const isClaro = tema === 'Claro';

    const conteudosBarraLateral = [
        { id: 1, descricao: "Inicio", img: isClaro ? casinhaModoClaro : casinhaModoEscuro },
        { id: 2, descricao: "Privacidade", img: isClaro ? escudoModoClaro : escudoModoEscuro },
        { id: 3, descricao: "Acessibilidade", img: isClaro ? pessoaModoClaro : pessoaModoEscuro },
        { id: 4, descricao: "Idioma", img: isClaro ? idiomaModoClaro : idiomaModoEscuro },
    ];

    return (
        <>
            <div className={Style.body}>
                <div className={Style.main}>
                    <div className={Style.barraLateral}>

                        <div className={Style.sairConfiguracoes}>
                            <img src={isClaro ? setaSairClaro : setaSairEscuro} alt="setaParaSair" />
                            <p>Configuracoes</p>
                        </div>

                        <div className={Style.itensBarraLateral}>
                            {conteudosBarraLateral.map((item) => (
                                <ItemBarraLateral
                                    key={item.id}
                                    descricao={item.descricao}
                                    img={item.img}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className={Style.nada}>
                    <div className={Style.ConteudoConfiguracoes}>

                    </div>
                </div>
            </div>
        </>
    );
};

export { ConteudoConfiguracoes };