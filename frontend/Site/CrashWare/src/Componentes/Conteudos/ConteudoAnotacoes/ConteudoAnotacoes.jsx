import { BotoesForm } from "../../Botoes"
import { CampoTexto } from "../../CampoTexto"
import style from './ConteudoAnotacoes.module.css'

const ConteudoAnotacao = () => {
    return (
        <div className={style.corpo}>
            <div className={style.Direita}>
                <div className={style.BlocoCima}> {/*bloco cima*/}
                    <h1>Titulo da Aula</h1>
                    <BotoesForm texto="Editar" />
                    <h5>Criado em </h5>
                    <h5>Editado em </h5>
                </div>

                <div> {/*Campo de escrrever*/}
                    <CampoTexto />
                </div>
            </div>

            <div className={style.Esquerda}>
                <div className={style.BarraLateral}> {/*Barra Lateral*/}
                    <div className={style.HeaderLateral}> {/*Header da Barra Lateral*/}
                        <h2>Anotações</h2>
                        {/* Campo de Pesquisa */}
                        <CampoTexto />
                    </div>
                    {/* Anotações Salvas do Usuario acho q vou ter q fazer outro componente uma lista*/}
                </div>
            </div>
        </div>

    )
}

export { ConteudoAnotacao }