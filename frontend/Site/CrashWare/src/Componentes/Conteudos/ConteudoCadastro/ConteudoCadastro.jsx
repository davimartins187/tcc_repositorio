import { Link } from 'react-router-dom'
import { useState } from 'react'
import { BotoesCadLogin, BotoesForm, TIPO_BOTAO } from '../../Botoes'
import style from './ConteudoCadastro.module.css'
import { CampoTexto } from '../../CampoTexto'

const ConteudoCadstro = () =>
{
        const [email, setEmail] = useState("")
        const [telefone, setTelefone] = useState("")
        const [senha, setSenha] = useState('')
        const [confirmarSenha, setConfirmarSenha] = useState('')
        const [erro, setErro] = useState('')
        const PodeMostarBotao = senha != "" && senha === confirmarSenha;


        const CriarConta = () => {
            if(senha != confirmarSenha){
                setErro('As senhas não são iguais!')
                return
                }
                setErro('')
        }


    return (
        <div className={style.corpo}>
            <Link to="/login">
                <BotoesForm texto='Entre' tipo={TIPO_BOTAO.LOGIN} className={style.btncadastro}/>
            </Link>

            <div className={style.container}>
                <h1>Cadastre-se</h1>

                <CampoTexto type="email" maxLength={120} placeholder="E-mail" className={style.inputClasse} value={email} onChange={(e) => setEmail(e.target.value)}/>

                <CampoTexto type="number" className={style.inputClasse} placeholder="N° de Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} maxLength={11}/>

                <CampoTexto type="password" className={style.inputClasse} placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} maxLength={14}/>
                <CampoTexto type="password" className={style.inputClasse} placeholder="Confirme sua Senha" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} maxLength={14}/>

                { erro && <p className={style.erro}>{erro}</p> }

                <p className = {style.TermosUso}>Ao entrar no <span>CrashWare</span>, você concorda com os nossos termos e politicas de privacidade.</p>

                <BotoesCadLogin texto="Cadastrar" tipo={TIPO_BOTAO.CADASTRO} className={style.btnCriarConta} onClick={CriarConta}  disabled={!PodeMostarBotao}/>

                
            </div>

        </div>
    )
}

export { ConteudoCadstro }