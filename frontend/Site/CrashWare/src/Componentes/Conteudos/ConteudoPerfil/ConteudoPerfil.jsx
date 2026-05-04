import { useEffect, useRef, useState } from 'react'
import FotoPadrao from '../../../fotos/FotoPerfilPadrao.jpeg'
import BackFundo from "../../../fotos/Banner.jpeg"
import iconConquistas from '../../../fotos/Conquistas.svg'
import iconBolsa from '../../../fotos/Compras.svg'
import iconGema from '../../../fotos/Gemas.svg'
import iconTema from '../../../fotos/Item_tema.svg'
import style from './ConteudoPerfil.module.css'
import { Link, useNavigate } from "react-router-dom";

//Funcão de Sair da Conta
import { Api, SairDaConta } from '../../../../funcoes/functions'

import { BotoesForm } from '../../Botoes/BotaoForm/BotaoForm'




const ConteudoPerfil = () => {

    //Navegação --> Permite eu levar o usuario para outras telas
    const Navegacao = useNavigate();

    // muda a foto
    const [foto, setFoto] = useState(FotoPadrao);

    //referencia o input
    const inputRef = useRef();

    const [ofensiva, setOfensiva] = useState(0);
    const [xp, setXp] = useState(0);

    //Uso useState para o react renderizar as informações
    //const [id, setId] = useState(() => localStorage.getItem("id"));
    const [token_state, setToken] = useState(() => localStorage.getItem("token"));
    const [refresh_token_state, setRefresh] = useState(() => localStorage.getItem("refresh_token"));


    //Carrega a foto salva q pus
    // useEffect(() => {
    // const fotoSalva = localStorage.getItem("fotoPerfil")
    // if (fotoSalva) {
    //     setFoto(fotoSalva)
    // }
    // }, [])




    return (
        <div className={style.corpo}>
            <div className={style.container}>

                <div className={style.Logofundo}>
                    <img src={BackFundo} alt="Background" />
                </div>
                {/* Lados */}
                <div className={style.Lados}>

                    {/* Esquerda */}
                    <div className={style.Esquerda}>

                        <div className={style.info}>

                            {/* Foto */}
                            <img className={style.foto}
                                src={foto} alt="Foto"
                                onClick={() => inputRef.current.click()}
                            />

                            {/* Input escondido pra trocar foto */}
                            <input type="file" className={style.escondido}
                                ref={inputRef}
                                accept='image/*'
                                onChange={(e) => {
                                    const arquivo = e.target.files[0];

                                    if (arquivo) {
                                        const url = URL.createObjectURL(arquivo)
                                        setFoto(url);
                                    }
                                }}
                            />

                            <div className={style.texto}>

                                {/* Nome */}
                                <h3> Usuário </h3>

                                {/* Status */}
                                <p className={style.status}>
                                    <span className={style.bolinha}></span>
                                    Membro desde .... </p>
                            </div> {/*Tetxos */}

                            {/* Nivel do Usuario */}
                            <div className={style.Nivel}>
                                <p>nivel</p>
                            </div>
                        </div> {/*info*/}




                        {/* Informações de Ofenciva e afins */}
                        <div className={style.blocos}>

                            {/* Conquistas */}
                            <div className={style.Conquistas}>
                                <img src={iconConquistas} alt="" />
                                <div className={style.Conquistas_Coluna}>
                                    <p>Conquistas</p>
                                </div>
                            </div> {/*Conquistas*/}

                            {/* Ofensiva */}
                            <div className={style.Compras}>
                                <img src={iconBolsa} alt="" />
                                <div className={style.Compras_Coluna}>
                                    {ofensiva}
                                    <p>Compras</p>
                                </div>
                            </div> {/*Ofensiva*/}

                            {/* XP */}
                            <div className={style.Gemas}>
                                <img src={iconGema} alt="" />
                                <div className={style.Gemas_Coluna}>
                                    {xp}
                                    <p>Gemas</p>
                                </div>
                            </div> {/* XP */}


                            {/* Sair da conta , depois vc troca isso gabriel ou davison */}
                            <BotoesForm
                                onClick={() => SairDaConta(setToken, setRefresh)}
                                texto="Sair da conta"
                            />

                        </div> {/* Blocos */}

                        <div className={style.Historico_Compras}>
                            <h1>Ultima Compra</h1>
                            <div className={style.CompraRecente}>
                                <img src={iconTema} alt="" />
                                <div className={style.DescricaoCompra}>
                                    <h5>Item</h5>
                                    <p>Descrição Item</p>
                                </div>
                            </div>
                        </div>

                    </div> {/* Esquerda */}

                    <div className={style.Direita}>

                        {/* Conquistas */}
                        <div className={style.ConquistasBloco}>
                            <h4>Conquistas</h4>
                            <div className={style.ItemConquista}>
                                <img src={FotoPadrao} alt="" />
                                <h6>Bla</h6>
                                <p>Lorem ipsum dolor sit amet</p>
                            </div> {/* Conquistas item */}
                        </div>
                    </div> {/* Direita */}
                </div> {/* Lados */}
            </div>  {/* Conateiner */}
        </div> //Corpo
    )
}

export { ConteudoPerfil }