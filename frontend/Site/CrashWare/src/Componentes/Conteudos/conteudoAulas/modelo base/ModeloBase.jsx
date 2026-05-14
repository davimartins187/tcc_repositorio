import Style from "./modeloBase.module.css";
import { Link } from "react-router-dom";

import playIcon from "../../../../fotos/play.svg";
import { useState } from "react";

const ArtigoModelo = ({Children}) => {

    return (    
        <div className={Style.parteLado}>
            <h1>Artigo</h1>
                <hr />

            {Children}
        </div>
    );
};

const ModeloExecicios = ({ descPergunta , opcao1, opcao2, opcao3, opcao4, numeroPergunta }) => {

    return (
        <div className={Style.exercicio}>
            <p>
                {numeroPergunta}
                {descPergunta}
            </p>
        </div>
    );
};

const modeloBase = (
    
    {tituloAula,
    xpGanho,
    srcVideo, 
    posterVideon,   
    tipoMidia, 
    proximaAula, 
    aulaPassada,
}) => {

    const [conteudo, setConteudo] = useState("artigo")

        function trocarConteudo (){

            setConteudo((prev) =>
                prev === "artigo" ? "exercicio" : "artigo"
            );
        };



    return (
        <>
            <div className={Style.parteCima}>
                <img src={playIcon} alt="Icone de play" />

                <h1>{tituloAula}</h1>
                <p>+{xpGanho} XP ao concluir</p>

            </div>

            <div className={Style.parteBaixo}>

                <div className={Style.Video}>
                    <video
                        controls
                        poster={posterVideon}
                    >
                        <source src={srcVideo} type={tipoMidia} />
                    </video>
                </div>

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

            <div>
                {conteudo === "artigo" ? (
                    <ArtigoModelo />
                ) : (
                    <ModeloExecicios />
                )}
            </div>

          <button onClick={trocarConteudo}>
                {Conteudo === "artigo" ?
                        <p>exercicios</p> :
                        <p>artigo</p>
                }
          </button>
        </>
    );
};

export { ModeloBase };