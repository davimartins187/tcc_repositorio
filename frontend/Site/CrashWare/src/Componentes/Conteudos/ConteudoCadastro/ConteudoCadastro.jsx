import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { BotoesForm, TIPO_BOTAO } from '../../Botoes';
import { CampoTexto } from '../../CampoTexto';
import { PopUp } from '../../pop-up';

import verSenha_claro from '../../../fotos/claro/pode_ver_senha.svg';

import gitIconModoEscuro from "../../../fotos/GitHub.svg";
import gitIconModoClaro from "../../../fotos/GitHub copy.svg";

import googloIcon from "../../../fotos/google.png";

import style from './ConteudoCadastro.module.css';

//Importando sleep
import { sleep } from "../../../../funcoes/functions"

//Importando classe api
import { Api } from "../../../../funcoes/functions"

const ConteudoCadstro = () => {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [mostrar, setMostrar] = useState(false);
    const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
    const [tema, setTema] = useState(localStorage.getItem('TemaSelecionado') || 'Claro');
    const [popup, setPopup] = useState(null);

    //Levará para a verificacao de email
    const Navegacao = useNavigate();


    useEffect(() => {


        //Tema claro e escuro (não faço ideia oq faz pq ninguem comenta) isso muda o tema, ué
        const checarTema = (e) => setTema(e.detail);
        window.addEventListener('temaAtualizado', checarTema);


        //
        return () => window.removeEventListener('temaAtualizado', checarTema);
    }, []);

    const inputRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    }, []);

    const handleCadastro = async () => {
        //Instâncio o objeto 
        const usuario = new Api(nome, email, senha, setPopup, Navegacao);

        //Chamo o método
        usuario.cadastrar(nome, email, senha, confirmarSenha, setPopup, Navegacao);
    }


    return (
        <>
            {popup && (
                <PopUp
                    tipo={popup.tipo}
                    titulo={popup.titulo}
                    mensagem={popup.mensagem}
                    onFechar={() => setPopup(null)}
                />
            )}

            <div className={`${style.corpo} ${tema}`}>
                <div className={style.container}>

                    <h1>Cadastre-se</h1>

                    <p>Nome</p>
                    <CampoTexto
                        type="text"
                        maxLength={100}
                        ref={inputRef}
                        placeholder="Nome*"
                        className={style.inputClasse}
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        autoComplete='name'
                    />

                    <p>Email</p>
                    <CampoTexto
                        type="email"
                        maxLength={200}
                        placeholder="E-mail*"
                        className={style.inputClasse}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete='email'
                    />

                    <p>Senha</p>
                    <div className={style.senhaWrapper}>
                        <CampoTexto
                            type={mostrar ? "text" : "password"}
                            className={style.inputClasse}
                            placeholder="Senha*"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            maxLength={30}
                        />
                        <img
                            src={verSenha_claro}
                            alt="ver senha"
                            className={style.imgSenha}
                        />
                    </div>

                    <p>Confirme a Senha</p>
                    <div className={style.senhaWrapper}>
                        <CampoTexto
                            type={mostrarConfirmar ? "text" : "password"}
                            className={style.inputClasse}
                            placeholder="Confirme sua Senha*"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            maxLength={30}
                        />
                        <img
                            src={verSenha_claro}
                            alt="ver senha"
                            className={style.imgSenha}
                        />
                    </div>

                    <BotoesForm
                        texto="Cadastrar"
                        tipo={TIPO_BOTAO.CADASTRO}
                        className={style.btnCriarConta}
                        onClick={handleCadastro}
                    />

                    <div className={style.termos}>
                        <p>Ao criar uma conta, você concorda com nossos</p>
                        <Link to="/termos">
                            <span>
                                Termos de Uso
                            </span>
                        </Link>
                    </div>

                </div>

                <p className={style.Logar}>
                    Já tem uma conta? <Link to="/login">Entre</Link>
                </p>

                <div className={style.outrasFormasCadastro}>
                    <img src={tema === "Claro"? gitIconModoClaro : gitIconModoEscuro} alt="Icone Github" />
                    <img src={googloIcon} alt="Icone google" />
                </div>
            </div>
        </>
    );
};

export { ConteudoCadstro };