import { useEffect, useRef, useState } from 'react'
import FotoPadrao from '../../../fotos/FotoPerfilPadrao.jpeg'
import iconConquistas from '../../../fotos/Conquistas.svg'
import iconBolsa from '../../../fotos/Compras.svg'
import iconGema from '../../../fotos/Gemas.svg'
import iconTema from '../../../fotos/Item_tema.svg'

import style from './ConteudoPerfil.module.css'
import { useNavigate } from "react-router-dom"

import { SairDaConta } from '../../../../funcoes/functions'
import { BotoesForm } from '../../Botoes/BotaoForm/BotaoForm'
import { Usuario } from '../../../../funcoes/user'

import { PopUp } from '../../pop-up'

// Dados de exemplo para as conquistas — substitua pelos dados reais da API
const CONQUISTAS_MOCK = [
    { id: 1, titulo: 'Conquista de Software', descricao: 'Descrição super divertida sobre a aula concluída para adquirir a conquista.', tipo: 'software' },
    { id: 2, titulo: 'Conquista de Hardware', descricao: 'Descrição super divertida sobre a aula concluída para adquirir a conquista.', tipo: 'hardware' },
    { id: 3, titulo: 'Conquista de Hardware', descricao: 'Descrição super divertida sobre a aula concluída para adquirir a conquista.', tipo: 'hardware' },
    { id: 4, titulo: 'Conquista de Software', descricao: 'Descrição super divertida sobre a aula concluída para adquirir a conquista.', tipo: 'software' },
    { id: 5, titulo: 'Conquista de Hardware', descricao: 'Descrição super divertida sobre a aula concluída para adquirir a conquista.', tipo: 'hardware' },
    { id: 6, titulo: 'Conquista de Hardware', descricao: 'Descrição super divertida sobre a aula concluída para adquirir a conquista.', tipo: 'hardware' },
]

const ConteudoPerfil = () => {

    const [dados, setDados] = useState(() =>
        JSON.parse(localStorage.getItem("dados")) || null
    );


    const informacoes = localStorage.getItem("info")

    if (informacoes == "false") {
        //Faço a requisição no banco
        const cliente = new Usuario();
        cliente.perfil(setDados);

    }
    //Pego as informações do usuario
    const usuario = JSON.parse(localStorage.getItem("dados"));


    //Trata a data do mês
    const DataCadastro = usuario?.criado_em;

    const formatarData = (DataCadastro) => {
        const [dia, mes, ano] = DataCadastro.split('/');
        const date = new Date(`${ano}-${mes}-${dia}`);

        const mesNome = date.toLocaleString('pt-BR', { month: 'long' });

        return `Membro desde ${mesNome} de ${ano}`;
    };

    //NAO MEXE AQUI GABRIEL
    //Retorna o valor do adm
    //usuario.admin
    // let admin = null
    // if(usuario.adm == true)
    // {
    //   admin = "ADMIN"
    // }


    //Navegação --> Permite eu levar o usuario para outras telas
    const Navegacao = useNavigate();

    // muda a foto
    const [foto, setFoto] = useState(usuario?.foto);
    const [banner, setBanner] = useState(usuario?.banner);
    const [MudarFoto, setMudarFoto] = useState(false);
    const [MudarBanner, setMudarBanner] = useState(false);
    const [aberto, setAberto] = useState(false);

    //Cache da foto
    const [versaoFoto, setVersaoFoto] = useState(Date.now());
    const [versaoBanner, setVersaoBanner] = useState(Date.now());

    const inputRef = useRef();

    const [ofensiva, setOfensiva] = useState(0);
    const [xp, setXp] = useState(usuario?.xp || 0);
    const [conquistas, setConquistas] = useState(CONQUISTAS_MOCK);
    const [totalCompras, setTotalCompras] = useState(0);
    const [totalGemas, setTotalGemas] = useState(0);
    const [popup, setPopup] = useState(null);

    const XpMax = 500;
    const Nivel = usuario?.nivel || 0;
    const nome = usuario?.nome || "Usuário";

    const xpAtual = xp % XpMax;
    const porcentagem = (xp / XpMax) * 100;


    //  QUERO SABER QUEM FOI
    useEffect(() => {
        const informacoes = localStorage.getItem("info");
        if (informacoes === "false") {
            const user = new Usuario();
            user.perfil(setDados);
        }
    }, []);

    if (!usuario) {
        return (
            <div className={style.corpo} style={{ justifyContent: 'center' }}>
                <span style={{ color: '#8b90a0', letterSpacing: '0.1em', fontSize: '13px' }}>
                    CARREGANDO...
                </span>
            </div>
        );
    }

    const Davi = `https://yegrosiecwjebeetlwwg.supabase.co/storage/v1/object/public/banner/${usuario?.banner}?v=${versaoFoto}`;


    return (
        <>
            {/*Popup Padrão]*/}
            {popup && (
                <PopUp
                    tipo={popup.tipo}
                    titulo={popup.titulo}
                    mensagem={popup.mensagem}
                    onFechar={() => setPopup(null)}
                />
            )}


            <div className={style.corpo}>

                {/* ── Banner ─────────────────────────────────────── */}
                <div className={style.banner}
                // style={{
                //     "--banner-img": `url(${Davi})`
                // }}

                >
                    <img
                        src={`https://yegrosiecwjebeetlwwg.supabase.co/storage/v1/object/public/banner/default_banner.png`} alt=""
                        onClick={() => setMudarBanner(!MudarBanner)}
                    />

                </div>

                <div className={style.container}>
                    {MudarBanner && (

                        <div className={MudarBanner ? style.Aberto_Banner : style.Fechado}>
                            <BotoesForm
                                texto="Mudar Banner"
                                onClick={() => inputRef.current.click()}
                            />
                            <BotoesForm
                                texto="Remover Banner"
                                onClick={() => {
                                    if (foto == 'default.png') {
                                        setPopup({
                                            tipo: 'erro',
                                            titulo: 'Foto',
                                            mensagem: 'Você precisa adicionar uma foto , para realizar essa ação'
                                        });
                                    } else {
                                        const foto_usuario = new Usuario();
                                        foto_usuario.remover_foto(setDados, setFoto, setPopup);
                                    }

                                }}
                            />
                        </div>
                    )}


                    {/* ── Foto ─────────────────────────────────────── */}
                    <div className={style.apresentacao}>
                        <img
                            className={style.foto}
                            src={`https://yegrosiecwjebeetlwwg.supabase.co/storage/v1/object/public/FOTOS/${usuario?.foto}?v=${versaoFoto}`}
                            alt="Foto de perfil"
                            onClick={() => setMudarFoto(!MudarFoto)}
                        />

                        {MudarFoto && (
                            <div className={MudarFoto ? style.Aberto : style.Fechado}>
                                <BotoesForm
                                    texto="Mudar Foto"
                                    onClick={() => inputRef.current.click()}
                                />
                                <BotoesForm
                                    texto="Remover Foto"
                                    onClick={() => {
                                        if (foto == 'default.png') {
                                            setPopup({
                                                tipo: 'erro',
                                                titulo: 'Foto',
                                                mensagem: 'Você precisa adicionar uma foto , para realizar essa ação'
                                            });
                                        } else {
                                            const foto_usuario = new Usuario();
                                            foto_usuario.remover_foto(setDados, setFoto, setPopup);
                                        }

                                    }}
                                />
                            </div>
                        )}

                        <input
                            type="file"
                            className={style.escondido}
                            ref={inputRef}
                            accept='image/*'
                            onChange={(e) => {
                                const arquivo = e.target.files[0];
                                if (arquivo) {
                                    //Salva por enqaunto a imagem no navegador
                                    // const novaFoto = URL.createObjectURL(arquivo);
                                    // setFoto(novaFoto);


                                    //Salvo como arquivo
                                    const conteudo = new FormData();
                                    conteudo.append("foto", arquivo);

                                    if (foto == 'default.png') {
                                        //Adiciono a foto
                                        const foto_usuario = new Usuario();
                                        foto_usuario.adicionar_foto(conteudo, setFoto, setDados, setPopup);

                                    } else {
                                        //Altero a foto
                                        const foto_usuario = new Usuario();
                                        foto_usuario.alterar_foto(conteudo, setFoto, setDados, setPopup, setVersaoFoto);

                                    }
                                }
                            }}
                        />

                        <div className={style.texto}>
                            <h3>{nome}</h3>

                            <div className={style.status}>
                                <span className={style.bolinha}></span>
                                <p>{formatarData(DataCadastro)}</p>
                            </div>

                            <div className={style.Nivel}>
                                <div className={style.NivelTopo}>
                                    <p>Nível {Nivel}</p>
                                    <span>{xpAtual}/{XpMax} XP</span>
                                </div>

                                <div className={style.Barra}>
                                    <div
                                        className={style.Progresso}
                                        style={{ width: `${porcentagem}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* ── Cards de Stats ─────────────────────────── */}
                    <div className={style.blocos}>

                        <div className={style.Conquistas}>
                            <img src={iconConquistas} alt="Conquistas" />
                            <div>
                                {conquistas.length}
                                <p>Conquistas</p>
                            </div>
                        </div>

                        <div className={style.Compras}>
                            <img src={iconBolsa} alt="Compras" />
                            <div>
                                {totalCompras}
                                <p>Compras</p>
                            </div>
                        </div>

                        <div className={style.Gemas}>
                            <img src={iconGema} alt="Gemas" />
                            <div>
                                {totalGemas}
                                <p>Gemas</p>
                            </div>
                        </div>

                    </div>

                    {/* ── Última Compra ──────────────────────────── */}
                    <div className={style.Historico_Compras}>
                        <h1>Última Compra</h1>

                        <div className={style.CompraRecente}>
                            <img src={iconTema} alt="Item" />

                            <div className={style.DescricaoCompra}>
                                <h5>Meia-Noite</h5>
                                <p>Para quando o modo escuro não for suficiente</p>
                            </div>
                        </div>
                    </div>

                    {/* ── Painel Direito: Conquistas ─────────────── */}
                    <div className={style.Direita}>
                        <div className={style.ConquistasBloco}>
                            <h4>Conquistas</h4>

                            <div className={style.listaConquistas}>
                                {conquistas.map((c) => (
                                    <div
                                        key={c.id}
                                        className={`${style.ItemConquista} ${style[c.tipo]}`}
                                    >
                                        <img src={FotoPadrao} alt={c.titulo} />

                                        <div>
                                            <h6>{c.titulo}</h6>
                                            <p>{c.descricao}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className={style.verTodas}>
                                <p>Ver todas as conquistas</p>
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
};

export { ConteudoPerfil }