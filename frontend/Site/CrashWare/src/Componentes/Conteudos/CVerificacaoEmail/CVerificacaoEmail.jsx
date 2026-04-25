import { useState, useEffect, useRef } from "react";
import { Link, useBlocker, useLocation, useNavigate } from "react-router-dom";
import { CampoTexto } from "../../CampoTexto";
import { BotoesForm } from "../../Botoes";
import style from './CVerificacaoEmail.module.css'
import { PopUp } from '../../pop-up';

//Importando sleep
import { sleep } from "../../../../funcoes/functions"

const CVerificacaoEmail = () => {

    //useState/variaveis
    const [timer, setTimer] = useState(0);
    const [loading, setLoading] = useState(false);
    const [verificando, setVerificando] = useState(false);
    const [codigo, setCodigo] = useState("");
    const [erro, setErro] = useState("");
    const [podeNavegar, setPodeNavegar] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);

    //Variavel da popup
    const [popup, setPopup] = useState(null);

    //Navegação e recebimento de dados
    const location = useLocation();
    const Navegacao = useNavigate();

    //Recebe Os dados
    const mensagem = location.state?.mensagem;
    const email = location.state?.email;
    const nome = location.state?.nome;
    const origem = location.state?.origem;

    
    //Nome maiusculo
    const nomeM = nome?.toUpperCase() || "";

    ////Controle de navegação
    const rec_senha = localStorage.getItem("rec_senha")
    
    //Block de navegação
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (!podeNavegar) {
                e.preventDefault();
                e.returnValue = "";
            }
        };
        
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [podeNavegar]);
    
    useEffect(() => {
        const handlePopState = () => {
            if (!podeNavegar) {
                window.history.pushState(null, "", window.location.href);
                setMostrarModal(true);
            }
        };
        
        window.history.pushState(null, "", window.location.href);
        window.addEventListener("popstate", handlePopState);
        
        return () => window.removeEventListener("popstate", handlePopState);
    }, [podeNavegar]);
    
    
    //Proteção da URL Reenviar para cadastro
    useEffect(() => {
        //Origens
        const origemCadastro = origem == "/cadastro";
        const origemRecSenha = origem == "/recuperar-senha"

        if (origemCadastro) {
            if(!email && !mensagem){
                Navegacao('/cadastro');
            }
        }
        else if (origemRecSenha){
            if(!email){
                Navegacao("/login");
            }
        }
        //else{
            //Navegacao("/login")
        //}


    }, [origem, email, Navegacao]);

    //Automação
    useEffect(() => {
        if (codigo.length === 6 && !verificando) {
            handleVericarEmail()
        }
    }, [codigo]);

    //Temporizador
    useEffect(() => {
        if (timer === 0) return;

        const intervalo = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(intervalo);
    }, [timer]);

    //Função de reenviar o código
    const ReenviarCodigo = async () => {
        if (loading || timer > 0) return;
        setLoading(true);

        try {
            const response = await fetch(
                "https://api-crashware.onrender.com/auth/reenviar_codigo",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email
                    })
                }
            );

            if (!response.ok) {
                const erro = await response.json();
                
                //  exibi um popup de erro
                setPopup({
                    tipo: 'aviso',
                    titulo: '404',
                    mensagem: erro.detail
                });
            } else {
                setTimer(60);
                //Exibi um popup de sucesso
                 setPopup({
                    tipo: 'sucesso',
                    titulo: 'Código Enviado',
                    mensagem: 'Enviamos para seu email um código novo...'
                });

            }

        } catch (error) {
            console.log(error)
            setPopup({
                tipo: 'erro',
                titulo: 'Sem conexão',
                mensagem: 'Não foi possível conectar ao servidor.'
            });
            
        } finally {
            setLoading(false);
        }


    }

    const handleVericarEmail = async () => {

        //  exibi um popup de aviso
                setPopup({
                    tipo: 'aviso',
                    titulo: 'Verificação de código',
                    mensagem: 'Estamos verificando o código...'
        });

        await sleep(3000)  /*-> Faz com que espere 3 segundos*/


        try {
            const response = await fetch(
                "https://api-crashware.onrender.com/auth/verificar_codigo",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        codigo: codigo.toString()
                    })
                }
            );

            if (response.ok === false) {

                const erroCodigo = await response.json()
                setPopup({
                    tipo: 'aviso',
                    titulo: '⚠️',
                    mensagem: erroCodigo.detail
                });

            } else {

                setPopup({
                    tipo: 'sucesso',
                    titulo: 'Emal Verificado!',
                    mensagem: 'Estamos te redirecionando...'
                });

                await sleep(3000)  /*-> Faz que espere 3 segundos*/

                if(rec_senha == "false"){
                    setPodeNavegar(true)
                    Navegacao("/login")
                    // , { replace: true }
                }else
                {
                    //Leva para a pag de rec_senha
                    setPodeNavegar(true)
                    Navegacao("/alterar-senha",
                    {
                    state:{
                        email: email.replace(/\s/g, "").toLowerCase()
                    }//state
                    })
                }

            }

        } catch (error) {
            console.log("Erro de conexão:", error);

            setPopup({
                tipo: 'erro',
                titulo: 'Sem conexão',
                mensagem: 'Não foi possível conectar ao servidor.'
            });
        }
    };

    return (
        <>

            {popup && (
                <PopUp
                    tipo={popup.tipo}
                    titulo={popup.titulo}
                    mensagem={popup.mensagem}
                    onFechar={() => setPopup(null)}
                />
            )};

            {mostrarModal && (
                <div className={style.modalOverlay}>
                    <div className={style.modal}>
                        <h4>Tem certeza que deseja sair? O processo pode ser perdido.</h4>
                        <BotoesForm onClick={() => {
                            setMostrarModal(false);
                            setPodeNavegar(true);
                            // blocker.proceed();
                        }}
                            className={style.btnSair}
                            texto="Sair"
                        />
                        <BotoesForm onClick={() => {
                            setMostrarModal(false);
                            // blocker.reset(); 
                        }}
                            className={style.btnFicar}
                            texto="Ficar"
                        />
                    </div>
                </div>
            )}

            <div className={style.corpo}>
                <div className={style.container}>
                    <h1>Bem-Vindo {nomeM}!!!</h1>
                    <p className={style.texto}>Verifique o Código enviado para o email: {email} </p>

                    <CampoTexto type="text" placeholder="Código"
                        className={style.inputClasse}
                        // ref={inputRef}   
                        value={codigo}
                        maxLength={6}
                        onChange={(e) => {
                            const valor = e.target.value.replace(/\D/g, '').slice(0, 6);
                            setCodigo(valor); //Só aceita números.
                        }}
                    />

                    {erro && <p className={style.erro}>{erro}</p>}


                    {/* <Link  to=""> */}
                    {/* <BotoesForm texto="Verificar" className={style.btnEnviar}
                        onClick={handleVericarEmail}
                    //disabled={!PodeMostarBotao}
                    /> */}
                    {/* </Link> */}

                    <BotoesForm
                        texto={loading ? "Espere..." : timer > 0 ? `Reenviar em ${timer}s` : "Enviar Código"} className={style.btnEnviar}
                        onClick={ReenviarCodigo}
                        disabled={timer > 0 || loading}
                    />
                </div>
            </div>
        </>
    )
}

//exportação da função
export { CVerificacaoEmail }