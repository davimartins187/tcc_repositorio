import Style from "./ConteudoInicio.module.css";
import { useState, useEffect } from 'react';

import perfilModoClaro from "../../../../../fotos/img_configuracoes/modoClaro/perfil.svg";
import perfilModoEscuro from "../../../../../fotos/img_configuracoes/modoEscuro/perfil.svg";
import pessoasModoClaro from "../../../../../fotos/img_configuracoes/modoClaro/contas_icon.svg";
import pessoasModoEscuro from "../../../../../fotos/img_configuracoes/modoEscuro/contas_icon.svg";
import privacidadeModoClaro from "../../../../../fotos/img_configuracoes/modoClaro/privacidade_icon.svg";
import privacidadeModoEscuro from "../../../../../fotos/img_configuracoes/modoEscuro/privacidade_icon.svg";
import ajudaModoClaro from "../../../../../fotos/img_configuracoes/modoClaro/ajuda_icon.svg";
import ajudaModoEscuro from "../../../../../fotos/img_configuracoes/modoEscuro/Ajuda_icon.svg";

// Imports das telas
// import { TelaInformacoes } from './Telas/TelaInformacoes';
// import { TelaContas } from './Telas/TelaContas';
// import { TelaPrivacidade } from './Telas/TelaPrivacidade';
// import { TelaSuporte } from './Telas/TelaSuporte';

const renderizarTela = (tela) => {
    switch (tela) {
        case "Informacoes": return <TelaInformacoes />;
        case "Contas":      return <TelaContas />;
        case "Privacidade": return <TelaPrivacidade />;
        case "Suporte":     return <TelaSuporte />;
        default:            return null;
    }
};

const ItemInicio = ({ img, texto, onClick }) => {
    return (
        <div className={Style.itensInicio} onClick={onClick}>
            <img src={img} alt={texto} />
            <p>{texto}</p>
        </div>
    );
};

const ConteudoInicio = () => {
    const [tema, setTema] = useState(localStorage.getItem('TemaSelecionado') || 'Claro');
    const [telaSelecionada, setTelaSelecionada] = useState(null);

    useEffect(() => {
        const checarTema = (e) => setTema(e.detail);
        window.addEventListener('temaAtualizado', checarTema);
        return () => window.removeEventListener('temaAtualizado', checarTema);
    }, []);

    const isClaro = tema === 'Claro';

    // const nome = localStorage.getItem('usuarioNome');
    // const email = localStorage.getItem('usuarioEmail');

    const informacoesOpcoes = [
        { id: 1, img: isClaro ? perfilModoClaro    : perfilModoEscuro,      texto: "Suas Informações",   tela: "Informacoes" },
        { id: 2, img: isClaro ? pessoasModoClaro   : pessoasModoEscuro,     texto: "Suas Contas",        tela: "Contas"      },
        { id: 3, img: isClaro ? privacidadeModoClaro : privacidadeModoEscuro, texto: "Privacidade de Conta", tela: "Privacidade" },
        { id: 4, img: isClaro ? ajudaModoClaro     : ajudaModoEscuro,       texto: "Suporte e Ajuda",    tela: "Suporte"     },
    ];

    if (telaSelecionada) {
        return renderizarTela(telaSelecionada);
    }

    return (
        <div className={Style.main}>
            <h1>Contas</h1>

            <div className={Style.perfil}>
                <img
                    src={isClaro ? perfilModoClaro : perfilModoEscuro}
                    alt="imagem de perfil"
                    className={Style.imgPerfil}
                />
                <div className={Style.informacoesPerfil}>
                    <p><strong>Davidson</strong></p><br />
                    <p>davidson@gmail.com</p>
                </div>
            </div>

            <div className={Style.ConfiguracoesConta}>
                <h2>Configurações de Conta</h2>

                {informacoesOpcoes.map((opcao) => (
                    <ItemInicio
                        key={opcao.id}
                        img={opcao.img}
                        texto={opcao.texto}
                        onClick={() => setTelaSelecionada(opcao.tela)}
                    />
                ))}
            </div>
        </div>
    );
};

export { ConteudoInicio };