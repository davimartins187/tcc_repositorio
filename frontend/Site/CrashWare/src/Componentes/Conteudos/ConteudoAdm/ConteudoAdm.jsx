import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Style from './ConteudoAdm.module.css'
import perfilModoClaro from "../../../fotos/claro/login_icon_claro.svg";
import perfilModoEscuro from "../../../fotos/escuro/login_icon.svg";

import sairContaModoClaro from "../../../fotos/claro/sairConta.svg";
import sairContaModoEscuro from "../../../fotos/escuro/sairConta.svg";

import desativarConta from "../../../fotos/desativarConta.svg";
import excluirConta from "../../../fotos/excluirConta.svg";

import sobreModoClaro from "../../../fotos/claro/Sobre.svg";
import sobreModoEscuro from "../../../fotos/escuro/Sobre.svg";

import termosModoClaro from "../../../fotos/claro/termos.svg";
import termosModoEscuro from "../../../fotos/escuro/termos.svg";
import { CampoTexto } from '../../CampoTexto';
import { BotoesForm } from '../../Botoes';
import { Adm } from '../../../../funcoes/adm';

//Pego o POPUP
import { PopUp } from "../../pop-up";

const ItemBarraLateral = ({ descricao, img, onClick }) => {
    return (
        <div className={Style.itemBarraLateral} onClick={onClick}>
            <img src={img} alt={descricao} />
            <span>{descricao}</span>
        </div>
    );
};

const ConteudoAdm = () => {
    const [tema, setTema] = useState(localStorage.getItem('TemaSelecionado') || 'Claro');
    const [popupAtivo, setPopupAtivo] = useState(null); // null | 'sair' | 'desativar' | 'excluir'

    useEffect(() => {
        const checarTema = (e) => setTema(e.detail);
        window.addEventListener('temaAtualizado', checarTema);
        return () => window.removeEventListener('temaAtualizado', checarTema);
    }, []);

    const isClaro = tema === 'Claro';

    const configsPopup = {
        sair: {
            paragrafo: "Deseja sair da conta?",
            primeiroBotao: "Sair",
            segundoBotao: "Cancelar",
            primeiroClick: () => { setPopupAtivo(null); },
            segundoClick: () => setPopupAtivo(null),
        },
        desativar: {
            paragrafo: "Deseja desativar sua conta?",
            primeiroBotao: "Desativar",
            segundoBotao: "Cancelar",
            primeiroClick: () => { setPopupAtivo(null); },
            segundoClick: () => setPopupAtivo(null),
        },
        excluir: {
            paragrafo: "Deseja excluir sua conta? Essa ação é irreversível.",
            primeiroBotao: "Excluir",
            segundoBotao: "Cancelar",
            primeiroClick: () => { setPopupAtivo(null); },
            segundoClick: () => setPopupAtivo(null),
        },
    };

    const conteudosBarraLateral = [
        { id: 1, descricao: "Usuários", img: perfilModoClaro, acao: null },
        // { id: 2, descricao: "Conteudos", img: sairContaModoClaro, acao: 'sair' },
        { id: 3, descricao: "Conquistas", acao: 'conquistas' },
        // { id: 4, descricao: "Relatórios", acao: 'relatorios' },
        // { id: 5, descricao: "Notificações", acao: 'notificacoes' },
        // { id: 6, descricao: "Cosmeticos", acao: 'cosmeticos' },
        // { id: 7, descricao: "Sair", mg: sairContaModoClaro, acao: 'sair' }
    ];

    const PopUp = ({ paragrafo, primeiroBotao, segundoBotao, primeiroClick, segundoClick }) => {
        return (
            <div className={`${Style.popUp} ${popupAtivo ? Style.popUpVisivel : ''}`}>
                <p>{paragrafo}</p>
                <div className={Style.botoes}>
                    <button onClick={primeiroClick} className={Style.primeiroBotao}>
                        {primeiroBotao}
                    </button>
                    <button onClick={segundoClick} className={Style.segundoBotao}>
                        {segundoBotao}
                    </button>
                </div>
            </div>
        );
    };

    const configAtual = popupAtivo ? configsPopup[popupAtivo] : null;


    //MEXE AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII PRA BAIXO
    
    //Variaveis
    const [nomeConquista, setNomeConquista] = useState("");
    const [descricaoConquista, setDescricaoConquista] = useState("");
    const [moedas, setMoedas] = useState();
    const [xp, setXP] = useState();
    const [condicao, setCondicao] = useState("");
    const [opcao, setOpcao] = useState("");
    const [popup, setPopup] = useState(null);

    const botaoliberado =
        nomeConquista &&
        descricaoConquista &&
        moedas &&
        xp &&
        condicao &&
        opcao;

    const handleAdicionarConquista = () => {
        //Instâncio o objeto
        const conquista = new Adm;

        //Chamo o método
        conquista.adicionar_conquista(nomeConquista,opcao,descricaoConquista,moedas,xp,condicao);

    }


    return (
        <>
            {popupAtivo && (
                <div
                    className={Style.fundoEscurecido}
                    onClick={() => setPopupAtivo(null)}
                />
            )}

            <div className={Style.separarConteudos}>


                {/* <div className={Style.barraLateral}>
                    <h1>Gerenciamento</h1>
                    <hr />

                    <div className={Style.itensBarraLateral}>
                        {conteudosBarraLateral.map((item) => (
                            <ItemBarraLateral
                                key={item.id}
                                descricao={item.descricao}
                                img={item.img}
                                onClick={item.acao ? () => setPopupAtivo(item.acao) : undefined}
                            />
                        ))} */}

                        {/* <div className={Style.destaque}>
                            <ItemBarraLateral
                                descricao="Desativar Conta"
                                img={desativarConta}
                                onClick={() => setPopupAtivo('desativar')}
                            />
                            <ItemBarraLateral
                                descricao="Excluir Conta"
                                img={excluirConta}
                                onClick={() => setPopupAtivo('excluir')}
                            />
                        </div> */}
                    {/* </div>

                    <h1>Privacidade e Segurança</h1>
                    <hr /> */}

                    {/* <ItemBarraLateral
                        descricao={"Sobre"}
                        img={sobreModoClaro}
                    /> */}
                    {/* <Link to="/termos">
                        <ItemBarraLateral
                            descricao={"Termos de Serviço"}
                            img={termosModoClaro}
                        />
                    </Link> */}
                </div>

                <div className={Style.Conteudos}>
                    <p>RELATORIOOOOOOOOOOSSSSSSSS</p>
                    
                    {/* <div className={Style.parteEmail}>
                        <div className={Style.campoForm}>

                            <label htmlFor="NomeConsquista">Nome da Conquista</label>
                            <CampoTexto
                                placeholder="Nome da Conquista"
                                maxlenght={100}
                                onChange={(e) => setNomeConquista(e.target.value)}
                            />
                        </div>
                        <div className={Style.campoForm}>
                            <label>
                                <CampoTexto name="opcao" value="Software" type="radio" className={Style.radio}
                                    onChange={(e) => setOpcao(e.target.value)}
                                />
                                Software
                            </label>

                            <label>
                                <CampoTexto name="opcao" value="Hardware" type="radio" className={Style.radio}
                                    onChange={(e) => setOpcao(e.target.value)}
                                />
                                Hardware
                            </label>
                            <label>
                                <CampoTexto name="opcao" value="Outro" type="radio" className={Style.radio}
                                    onChange={(e) => setOpcao(e.target.value)}
                                />
                                Outro
                            </label>
                        </div>
                    </div>
                    <div className={Style.parteTelefone}>
                        <label htmlFor="Descricao">Descricao</label>
                        <CampoTexto
                            placeholder="Descreva a Conquista"
                            maxlenght={200}
                            onChange={(e) => setDescricaoConquista(e.target.value)}
                        />
                    </div>
                    <div className={Style.parteTelefone}>
                        <label htmlFor="Moedas">Quantas moedas vai ter?</label>
                        <CampoTexto placeholder="00"
                            type="number"
                            maxlength={100}
                            onChange={(e) => setMoedas(e.target.value)}
                        />
                        <label htmlFor="XP">vale quanto de XP</label>
                        <CampoTexto placeholder="00"
                            type="number"
                            maxlenght={100}
                            onChange={(e) => setXP(e.target.value)}
                        />
                    </div>
                    <div className={Style.parteTelefone}>
                        <label htmlFor="Condicao">Condição da Conquista</label>
                        <CampoTexto placeholder="Condição"
                            type="text"
                            maxlenght={100}
                            onChange={(e) => setCondicao(e.target.value)}
                        />
                    </div> */}

                    <BotoesForm
                        texto="Adicionar"
                        disabled={!botaoliberado}
                        onClick={handleAdicionarConquista}
                    />

                </div>
                {configAtual && (
                    <PopUp
                        paragrafo={configAtual.paragrafo}
                        primeiroBotao={configAtual.primeiroBotao}
                        segundoBotao={configAtual.segundoBotao}
                        primeiroClick={configAtual.primeiroClick}
                        segundoClick={configAtual.segundoClick}
                    />
                )}
        </>
    )
}

export { ConteudoAdm }