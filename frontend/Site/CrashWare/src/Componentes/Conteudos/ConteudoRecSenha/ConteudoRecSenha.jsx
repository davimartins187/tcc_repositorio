import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BotoesForm } from "../../Botoes";
import { CampoTexto } from "../../CampoTexto"
import style from './ConteudoRecSenha.module.css'
const ConteudoRecSenha = () => {

    //Variavel do email
    const [email, setEmail] = useState("");

    //Navegação
    const location = useLocation();
    const Navegacao = useNavigate();

    //Validador De Destinos
    const rec_senha = localStorage.getItemItem("rec_senha")


    //Proteção de URL
    useEffect(() => {
        const VeiodoLogin = location.state?.origem === "/login";
        if (!VeiodoLogin) {
            Navegacao('/login');
        }
    }, []);

    // ✅ VALIDAÇÃO DIRETA
    const validarCampos = () => {

        if (!email.trim()) {
            return "Preencha o e-mail";
        }

        if (!email.includes("@") || !email.includes(".")) {
            return "E-mail inválido";
        }


        return null;
    };

    //Enviar para verificação de Email
    const EnviarVerific = async () => {

        const erro = validarCampos()

        if (erro)
        {
            setPopup({
                tipo: 'aviso',
                titulo: 'Erro no login',
                mensagem: erro
            });
            return;
        }else
        {
            setPopup({
                tipo: 'sucesso',
                titulo: 'Verificação',
                mensagem: 'Verificando Email..'
            });

            //Envio os dados para a API(na rota de login)
            try {
                const response = await fetch("https://api-crashware.onrender.com/auth/verificar_email", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email.replace(/\s/g, "").toLowerCase(),
                    })
            });//Parâmetros

                // Caso email não tiver autenticado
                if (!response.ok)
                {
                    const erro = await response.json()

                    setPopup({
                    tipo: 'erro',
                    titulo: erro.detail
                    });

                }
                else{
                    // Sobrescreve valor no localStorage para controle de navegação
                    localStorage.setItem("rec_senha", true)

                    //Levo para a tela de verificar codigo
                    Navegacao("/verificacao-email", {
                    state: {
                        
                        email: email.replace(/\s/g, "").toLowerCase(),
                        origem: "/recuperar-senha" //origem da rota
                    } //State
                    } // 
                    )  //Navegação
                }
        } catch (error) 
            {
                //Precisa colocar esse erro no lugar certo davison.
                console.log(error);
                return;
            }
    }//Função

}
    return (
        <div className={style.corpo}>
            <div className={style.container}>
                <h1>Esqueci Minha Senha</h1>
                <h2>Digite seu Email para enviarmos um código de verifiação</h2>
                <CampoTexto type="email" maxLength={120} placeholder="E-mail"
                    className={style.inputClasse}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <BotoesForm texto="Enviar" className={style.btnEnviar}
                onClick={EnviarVerific} //Ativa a função
                />
            </div>
        </div>
    )
}

export { ConteudoRecSenha }