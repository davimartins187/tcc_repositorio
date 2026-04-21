import { CampoTexto } from '../../CampoTexto'
import { BotoesForm } from '../../Botoes/'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

import esconderSenha_claro from '../../../fotos/claro/nao_pode_ver_senha.svg';
import verSenha_claro from '../../../fotos/claro/pode_ver_senha.svg';
import esconderSenha_escuro from '../../../fotos/escuro/nao_pode_ver_senha_claro.svg';
import verSenha_escuro from '../../../fotos/escuro/pode_ver_senha_claro.svg';


import style from './ConteudoAlterarSenha.module.css'

const ConteudoAlterarSenha = () => {
    const [senha, setSenha] = useState();
    const [confirmaSenha, setConfirmaSenha] = useState();
    const [tema, setTema] = useState(localStorage.getItem('TemaSelecionado') || 'Claro');
    const [mostrar, setMostrar] = useState(false);
    const [mostrarConfimar, setMostrarConfimar] = useState(false);

    //Navegação
    const Navegacao = useNavigate();
    const location = useLocation();

    //Recebendo os dados da navegação
    const email = location.state?.email;

    //Troca de Tema
    useEffect(() => {
        const checarTema = (e) => setTema(e.detail);
        window.addEventListener('temaAtualizado', checarTema);
        return () => window.removeEventListener('temaAtualizado', checarTema);

        //Quando a pag for acessada
        localStorage.setItem("rec_senha", false)

    }, []);

    //Mudar tema
    const isClaro = tema === 'Claro';

    const iconeSenha = mostrar
        ? (isClaro ? verSenha_claro : verSenha_escuro)
        : (isClaro ? esconderSenha_claro : esconderSenha_escuro);

    const iconeConfirmaSenha = mostrarConfimar
        ? (isClaro ? verSenha_claro : verSenha_escuro)
        : (isClaro ? esconderSenha_claro : esconderSenha_escuro);



    const validarCampos = () => 
        {
            if (senha.length < 8) {
                return "Senha deve ter pelo menos 8 caracteres";
            }

            if (senha.includes(" ")) {
                return "Senha não pode conter espaços";
            }

            if (senha !== confirmaSenha) {
                return "As senhas não coincidem";
            }

            return null;
        }

    const MudarSenha = async () =>{

        const erro = validarCampos();

        if (erro) {
                setPopup({
                    tipo: 'aviso',
                    titulo: 'Erro no formulário',
                    mensagem: erro
                });
                return;
            }

        setPopup({
                tipo: 'sucesso',
                titulo: 'Atualizando Senha...'
        });

        try 
        {
            const response = await fetch("https://api-crashware.onrender.com/auth/alterar_senha",
            {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        senha: senha
                    })
            })//Parâmetros

            if (!response.ok)
            {
                const erro = await response.json()

                setPopup({
                    tipo: 'erro',
                    titulo: 'Email não autenticado',
                });

            }else
            {
                setPopup({
                    tipo: 'sucesso',
                    titulo: 'Senha atualizada com sucesso',
                });

                Navegacao("/login");

            }

        }catch (error) 
        {   //Erro na requisição
            setPopup({
                tipo: 'erro',
                titulo: error
            });

            console.log(error)
        }

        
    }

    return (
        <div className={`${style.corpo} ${tema}`}>
            <div className={style.container}>
                <h1>Digite sua nova senha</h1>

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
                        src={iconeSenha}
                        alt="ver senha"
                        className={style.imgSenha}
                        onClick={() => setMostrar(!mostrar)}
                    />
                </div>

                <h2>Confirme sua nova senha</h2>

                <div className={style.senhaWrapper}>
                    <CampoTexto
                        type={mostrarConfimar ? "text" : "password"}
                        className={style.inputClasse}
                        placeholder="Confirme sua Senha*"
                        value={confirmaSenha}
                        onChange={(e) => setConfirmaSenha(e.target.value)}
                        maxLength={30}
                    />
                    <img
                        src={iconeConfirmaSenha}
                        alt="ver senha"
                        className={style.imgSenha}
                        onClick={() => setMostrarConfimar(!mostrarConfimar)}
                    />
                </div>

                <BotoesForm
                    className={style.btnEnviar}
                    texto="Confirmar" 
                    onclick = {MudarSenha}  
                />
            </div>
        </div>
    )
}

export { ConteudoAlterarSenha }