import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BotoesForm } from "../../Botoes";
import { CampoTexto } from "../../CampoTexto"
import { PopUp } from "../../pop-up";



import style from './ConteudoRecSenha.module.css'
import { Api } from "../../../../funcoes/functions";
const ConteudoRecSenha = () => {

    //Variavel do email
    const [email, setEmail] = useState("");

    //Navegação
    const location = useLocation();
    const Navegacao = useNavigate();

    //Controle de Navegação
    const rec_senha = localStorage.getItem("rec_senha")

    //Popup
    const [popup, setPopup] = useState(null);

    //Opção de recuperação
    const [opcao, setOpcao] = useState("");


    //Proteção de URL
    useEffect(() => {
        const VeiodoLogin = location.state?.origem === "/login";
        if (!VeiodoLogin) {
            Navegacao('/login');
        }
    }, []);


    //Enviar para verificação de Email
    const VerificarEmail = async () => {
        //Instâncio o objeto 
        const usuario = new Api(email, setPopup, Navegacao);

        //Chamo o método
        usuario.Verificar_Email(email, setPopup, Navegacao)

    }//Função


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


            <div className={style.corpo}>
                <div className={style.container}>
                    <h1>Esqueci Minha Senha</h1>

                    <div className={style.opcoes}>
                        <label>
                            <CampoTexto name="opcao" value="Email" type="radio" className={style.radio}
                                checked={opcao === "Email"}
                                onChange={(e) => setOpcao(e.target.value)} onFocus
                            />
                            Receber o código por email
                        </label>
                        <label>
                            <CampoTexto name="opcao" value="Telefone" type="radio" className={style.radio}
                                checked={opcao === "Telefone"}
                                onChange={(e) => setOpcao(e.target.value)}
                            />
                            Receber o código por sms
                        </label>
                    </div>

                    <p>Digite o {opcao}</p>
                    <CampoTexto type="email" maxLength={120} placeholder={opcao === "Email" ? "Email" : "Telefone"}
                        className={style.inputClasse}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <BotoesForm texto="Enviar" className={style.btnEnviar}
                        onClick={VerificarEmail} //Ativa a função
                    />
                </div>
            </div>
        </>
    )
}

export { ConteudoRecSenha }