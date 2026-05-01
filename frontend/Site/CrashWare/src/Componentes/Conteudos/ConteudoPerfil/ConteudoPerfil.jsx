import { useEffect, useRef, useState } from 'react'
import FotoPadrao from '../../../fotos/FotoPerfilPadrao.jpeg'
import BackFundo from "../../../fotos/Banner.jpeg"
import iconRanking from '../../../fotos/ranking.svg'
import iconOfensiva from '../../../fotos/ofensiva.svg'
import iconXp from '../../../fotos/xp.svg'
import style from './ConteudoPerfil.module.css'
import { Link , useNavigate } from "react-router-dom";

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
    const [id, setId] = useState(() => localStorage.getItem("id"));
    const [token_state, setToken] = useState(() => localStorage.getItem("token"));
    const [refresh_token_state, setRefresh] = useState(() => localStorage.getItem("refresh_token"));

    //Lista que contém todos os usestate
    const set = [setId,setToken,setRefresh];


    
    useEffect(() => {
        //Quando a pag for carregada:


        //Verifico se o usuario tem token
            const VerificarToken = async () => 
            {
                //Pego os tokens dentro do escopo privado.
                const token = localStorage.getItem("token")
                const refresh_token = localStorage.getItem("refresh_token")
    
    
                //Vaerifico o token
                const usuario = new Api();
                const token_vencido = await usuario.Verificar_Token(token,Navegacao,null,setToken,setRefresh,true)
    
    
                //Verifico o Refresh Token
                if (token_vencido == true)
                {
                    usuario.Verificar_Token(refresh_token,Navegacao,null,setRefresh,true,refresh=true,set)
                }
            }
            VerificarToken()
          
    })

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
                            Online </p>
                    </div> {/*Tetxos */}
                </div> {/*info*/}


                {/* Informações de Ofenciva e afins */}
                <div className={style.blocos}>

                    {/* Ranking */}
                    <div className={style.Ranking}>
                        <img src={iconRanking} alt="" />
                        <div className={style.Ranking_Coluna}>
                            <h6>Beta</h6>
                            <   p>Ranking</p>
                        </div>
                    </div> {/*Ranking*/}

                    {/* Ofensiva */}
                    <div className={style.Ofensiva}>
                        <img src={iconOfensiva} alt="" />
                        <div className={style.Ofensiva_Coluna}>
                            {ofensiva}
                            <p>Ofensiva</p>
                        </div>
                    </div>{/*Ofensiva*/}

                    {/* XP */}
                    <div className={style.xp}>
                        <img src={iconXp} alt="" />
                        <div className={style.xp_Coluna}>
                            {xp}
                            <p>Total de XP</p>
                        </div>

                    </div> {/* XP */}


                    {/* Sair da conta , depois vc troca isso gabriel ou davison */}
                    <BotoesForm
                        onClick={() => SairDaConta(setId,setToken,setRefresh)}
                        texto="Sair da conta"
                    />

                </div>

                {/* Atividades */}
                <div className={style.Atividades}>
                    <h4>Atividade Recentes</h4>
                    <h6>Bla Bla</h6>
                    <h6>Bla Bla</h6>
                    <h6>Bla Bla</h6>
                </div> {/* Atividades */}
                
                {/* Conquistas */}
                <div className={style.Conquistas}>
                    <h4>Atividade Recentes</h4>
                    <h6>...</h6>
                    <h6>...</h6>
                </div>
            </div>
        </div>
    )
}

export { ConteudoPerfil }