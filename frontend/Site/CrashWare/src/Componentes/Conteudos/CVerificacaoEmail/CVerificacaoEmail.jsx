import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CampoTexto } from "../../CampoTexto";
import { BotoesForm } from "../../Botoes";
import style from './CVerificacaoEmail.module.css'

const CVerificacaoEmail = () => {

    //Timer de reenviar o código
    const [timer, setTimer] = useState(60);

    //Mensagem de loading
    const [loading, setLoading] = useState(false);

    //Verificador Automatico7
    const [verificando, setVerificando] = useState(false);

    //useState que guardará a o codigo
    const [codigo, setCodigo] = useState("");

    //Erro Código
    const [erro, setErro] = useState("");

    //Receberá as informações da página anterior
    const location = useLocation();

    //Navegcao de páginas
    const Navegacao = useNavigate();

    //Pega os dados
    const mensagem = location.state?.mensagem;
    const email = location.state?.email;
    const nome = location.state?.nome;

    //Proteção da url
    useEffect(() => {
        if (!mensagem && !email) {
            Navegacao('/cadastro');
        }
    }, []);

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
                        email
                    })
                }
            );

            if (!response.ok) {
                alert("Erro ao reenviar");
            } else {
                setTimer(60);

            }

        } catch (error) {
            console.log(error);
            alert("Erro ao reenviar código");
        } finally {
            setLoading(false);
        }


    }

    const handleVericarEmail = async () => {
        try {
            const response = await fetch(
                "https://api-crashware.onrender.com/auth/verificar_email",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        codigo: codigo.toString(),
                        email: email
                    })
                }
            );

            if (response.ok === false) {

                const erroCodigo = await response.json()
                setErro(erroCodigo.detail)
            } else {
                setErro("");
                Navegacao("/login")
            }

        } catch (error) {
            console.log("Erro de conexão:", error);
        }
    };


    //Verificara se pode liberar o botao
    // const PodeMostarBotao = email != " ";

    return (
        <>
            <div className={style.corpo}>
                <div className={style.container}>
                    <h1>Bem-Vindo {nome}!!!</h1>
                    <p className={style.texto}>Verifique o Código enviado para o email: {email} </p>

                    <CampoTexto type="number" placeholder="Código"
                        className={style.inputClasse}
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                        max={6}
                    />

                    {erro && <p className={style.erro}>{erro}</p>}
                    

                    {/* <Link  to=""> */}
                    <BotoesForm texto="Verificar" className={style.btnEnviar}
                        onClick={handleVericarEmail}
                    //disabled={!PodeMostarBotao}
                    />
                    {/* </Link> */}

                    <BotoesForm
                        texto={loading ? "Espere..." : timer > 0 ? `Reenviar em ${timer}s` : "Reenviar Email"} className={style.btnEnviar}
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