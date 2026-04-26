import { BotoesForm } from "../../Botoes"
import { CampoTexto } from "../../CampoTexto"
import style from './ConteudoAnotacoes.module.css'

const ConteudoAnotacao = () => {
    return (
        <div className={style.corpo}>

            <div className={style.Esquerda}>
                <div className={style.BarraLateral}> {/*Barra Lateral*/}
                    <div className={style.HeaderLateral}> {/*Header da Barra Lateral*/}
                        <BotoesForm
                            texto="+ Nova Nota"
                            className={style.BotaoNovaNota}
                        />
                        {/* Campo de Pesquisa */}
                            <CampoTexto placeholder="Pesquisar" className={style.Pesquisa}   />
                    </div> {/*Header*/}
                    <div className={style.ItensAnotacoes}>
                        <p>Anotação 1</p>
                        {/* <p>Item 2</p>
                        <p>Item 3</p>
                        <p>Item 4</p>
                        <p>Item 5</p>
                        <p>Item 6</p> */}
                    </div> {/*Anotaçoes/botoes*/}
                    {/* Anotações Salvas do Usuario acho q vou ter q fazer outro componente uma lista*/}
                </div>
            </div>

            <div className={style.Direita}>
                <div className={style.BlocoCima}> {/*bloco cima*/}
                    <h1>Titulo da Aula</h1>
                    <BotoesForm
                        texto="Editar"
                        className={style.BotaoEditar}
                    />
                    <div className={style.BlocoInfos}>
                        <h5>Criado em: </h5>
                        <h5>Editado em: </h5>
                    </div>
                </div>

                <div className={style.BlocodeNotas}> {/*Campo de escrrever*/}
                    <textarea
                        className={style.textArea}
                        placeholder="Digite suas anotações..."
                    />
                </div>
            </div>
        </div>

    )
}

export { ConteudoAnotacao }