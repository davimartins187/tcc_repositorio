import Style from "./modeloBase.module.css";
import { Link } from "react-router-dom";

import playIcon from "../../../../fotos/play.svg";
import { useState } from "react";

const ArtigoModelo = ({children}) => {

    return (    
        <>
            <h1>Artigo</h1>
                <hr />

            {children}
        </>
    );
};

const ModeloExecicios = ({
    descPergunta,
    opcao1,
    opcao2,
    opcao3,
    opcao4,
    numeroPergunta,
    respostaCorreta
}) => {

    const [respostaSelecionada, setRespostaSelecionada] = useState("");
    const [resultado, setResultado] = useState("");
    const [respondido, setRespondido] = useState(false);

    function verificarResposta() {

        setRespondido(true);

        if (respostaSelecionada === respostaCorreta) {
            setResultado("Resposta correta!");
        } else {
            setResultado("Resposta errada!");
        }
    }

    function estiloBotao(opcao) {

        if (!respondido) {

            return respostaSelecionada === opcao
                ? Style.selecionado
                : "";
        }

        if (opcao === respostaCorreta) {
            return Style.correta;
        }

        if (
            opcao === respostaSelecionada &&
            opcao !== respostaCorreta
        ) {
            return Style.errada;
        }

        return "";
    }

    return (
        <div className={Style.exercicio}>

            <p>
                {numeroPergunta} - {descPergunta}
            </p>

            <button
                className={estiloBotao(opcao1)}
                onClick={() => setRespostaSelecionada(opcao1)}
                disabled={respondido}
            >
                {opcao1}
            </button>

            <button
                className={estiloBotao(opcao2)}
                onClick={() => setRespostaSelecionada(opcao2)}
                disabled={respondido}
            >
                {opcao2}
            </button>

            <button
                className={estiloBotao(opcao3)}
                onClick={() => setRespostaSelecionada(opcao3)}
                disabled={respondido}
            >
                {opcao3}
            </button>

            <button
                className={estiloBotao(opcao4)}
                onClick={() => setRespostaSelecionada(opcao4)}
                disabled={respondido}
            >
                {opcao4}
            </button>

            {!respondido && (
                <button
                    onClick={verificarResposta}
                    disabled={!respostaSelecionada}
                    className={Style.verificarRespostabtn}
                >
                    Verificar resposta
                </button>
            )}

            {resultado && (
                <h2>{resultado}</h2>
            )}

        </div>
    );
};

const ModeloBase = (
    
    {
    
    //Propriedades do modelo base em sí

    tituloAula,
    xpGanho,
    srcVideo, 
    posterVideo,   
    tipoMidia, 
    proximaAula, 
    aulaPassada,

    //Propriedades da parte de exercicios

    numeroPergunta,
    descPergunta,
    respostaCorreta,
    opcao1,
    opcao2,
    opcao3,
    opcao4,

    //propriedades da parte de artigo

    children
}) => {

    const [conteudo, setConteudo] = useState("artigo")

        function trocarConteudo (){

            setConteudo((prev) =>
                prev === "artigo" ? "exercicio" : "artigo"
            );
        };



    return (
        <>
            <div className={Style.corpo}>

                    <div className={Style.separarConteudos}>
                        <div className={Style.parteCima}>
                            <h1>{tituloAula}</h1>
                            <p>+{xpGanho} XP ao concluir</p>
                        </div>
                        <div className={Style.parteBaixo}>
                            <div className={Style.containerVideo}>
                                <video
                                    controls
                                    poster={posterVideo}
                                    className={Style.Video}
                                >
                                    <source src={srcVideo} type={tipoMidia} />
                                </video>
                            </div>
                            <div className={Style.trocarAula}>
                                <Link
                                    to={aulaPassada}
                                >
                                    <p>aula anterior</p>
                                </Link>
                                <Link
                                    to={proximaAula}
                                >
                                    <p>proxima aula</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={Style.parteLado}>
                        {conteudo === "artigo" ? (
                            <ArtigoModelo>
                                {children}
                            </ArtigoModelo>
                        ) : (
                            <ModeloExecicios
                                numeroPergunta={numeroPergunta}
                                descPergunta={descPergunta}
                                respostaCorreta={respostaCorreta}
                                opcao1={opcao1}
                                opcao2={opcao2}
                                opcao3={opcao3}
                                opcao4={opcao4}
                            />
                        )}
                        <div className={Style.butaozinho}>
                            <button onClick={trocarConteudo}>
                                {conteudo === "artigo" ?
                                        <p>exercicios</p> :
                                        <p>artigo</p>
                                }
                            </button>
                        </div>
                    </div>
                </div>
        </>
    );
};

export { ModeloBase };