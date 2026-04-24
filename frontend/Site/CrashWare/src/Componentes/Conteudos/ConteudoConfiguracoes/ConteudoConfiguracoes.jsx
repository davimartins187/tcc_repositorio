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

import { ConteudoInicio } from "./Conteudos/ConteudoInicio/ConteudoInicio";
import { ConteudoPrivacidade } from "./Conteudos/ConteudoPrivacidade/ConteudoPrivacidade";
import { ConteudoAcessibilidade } from "./Conteudos/ConteudoAcessibilidade/ConteudoAcessibilidade";
import { ConteudoIdioma } from "./Conteudos/ConteudoIdioma/ConteudoIdioma";

const renderizarConteudo = (tela) => {
    switch (tela) {
        case "ConteudoInicial":        return <ConteudoInicio />;
        case "ConteudoPrivacidade":    return <ConteudoPrivacidade />;
        case "ConteudoAcessibilidade": return <ConteudoAcessibilidade />;
        case "ConteudoIdioma":         return <ConteudoIdioma />;
        default:                       return <ConteudoInicio />;
    }
};

const ItemBarraLateral = ({ descricao, img, onClick }) => {
    return (
        <div className={Style.itemBarraLateral} onClick={onClick}>
            <img src={img} alt={descricao} />
            <span>{descricao}</span>
        </div>
    );
};

const ConteudoConfiguracoes = () => {
    const [tema, setTema] = useState(localStorage.getItem('TemaSelecionado') || 'Claro');
    const [telaSelecionada, setTelaSelecionada] = useState("ConteudoInicial");

    useEffect(() => {
        const checarTema = (e) => setTema(e.detail);
        window.addEventListener('temaAtualizado', checarTema);
        return () => window.removeEventListener('temaAtualizado', checarTema);
    }, []);

    const isClaro = tema === 'Claro';

    const conteudosBarraLateral = [
        { id: 1, descricao: "Inicio",         img: isClaro ? casinhaModoClaro : casinhaModoEscuro,  carregar: "ConteudoInicial"        },
        { id: 2, descricao: "Privacidade",    img: isClaro ? escudoModoClaro  : escudoModoEscuro,   carregar: "ConteudoPrivacidade"    },
        { id: 3, descricao: "Acessibilidade", img: isClaro ? pessoaModoClaro  : pessoaModoEscuro,   carregar: "ConteudoAcessibilidade" },
        { id: 4, descricao: "Idioma",         img: isClaro ? idiomaModoClaro  : idiomaModoEscuro,   carregar: "ConteudoIdioma"         },
    ];

    return (
        <main className={Style.main}>
            <div className={Style.barraLateral}>
                <div className={Style.itensBarraLateral}>
                    {conteudosBarraLateral.map((item) => (
                        <ItemBarraLateral
                            key={item.id}
                            descricao={item.descricao}
                            img={item.img}
                            onClick={() => setTelaSelecionada(item.carregar)}
                        />
                    ))}
                </div>
            </div>

            <div className={Style.Conteudos}>
                {renderizarConteudo(telaSelecionada)}
            </div>
        </main>
    );
};

export { ConteudoConfiguracoes };