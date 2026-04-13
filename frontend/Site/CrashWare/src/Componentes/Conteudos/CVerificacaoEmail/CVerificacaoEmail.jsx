import { useState } from "react";
import { Link } from "react-router-dom";
import { CampoTexto } from "../../CampoTexto";
import { BotoesForm } from "../../Botoes";
import style from './CVerificacaoEmail.module.css'

const CVerificacaoEmail = () =>
{
    //useState que guardará a o codigo
    const [codigo, setCodigo] = useState("")

    //Verifica´ra se pode liberar o botao
    // const PodeMostarBotao = email != " ";

    return(
        <>
            <div className={style.corpo}>
                <div className={style.container}>
                    <h1>Digite o Código enviado no Email</h1>

                    <CampoTexto type="text" maxLength={10} placeholder="Código" 
                        className={style.inputClasse} 
                        value={codigo} 
                        onChange={(e) => setCodigo(e.target.value)}
                    />

                    <Link  to="/login">
                        <BotoesForm texto="Verificar" className={style.btnEnviar}
                        //disabled={!PodeMostarBotao}
                        />
                    </Link>
                </div>
            </div>
        </>
    )
}

//exportação da função
export { CVerificacaoEmail }