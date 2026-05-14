import Style from "./conteudoSoftware.module.css";

import softwareIcon from "../../../fotos/software.svg";
import certoIcon from "../../../fotos/certo.svg";
import playIcon from "../../../fotos/play.svg";
import htmlIcon from "../../../fotos/html.svg";
import cssIcon from "../../../fotos/css.svg";

import { useState } from "react";
import { Link } from "react-router-dom";

const conteudoSoftware_Introducao = [
    { descricao: "Introdução à Tecnologia", to: "" },
    { descricao: "Como vai funcionar esse curso?", to: "" },
];

const conteudoSoftware_LogicaProgramacao = [
    { descricao: "O que é Lógica de Programação", to: "" },
    { descricao: "Algoritmos e Fluxo de Execução", to: "" },
    { descricao: "Variáveis e Tipos de Dados", to: "" },
    { descricao: "Operadores (Aritméticos e Lógicos)", to: "" },
    { descricao: "Estruturas Condicionais", to: "" },
    { descricao: "Estruturas de Repetição", to: "" },
    { descricao: "Funções", to: "" },
    { descricao: "Abstração de Problemas", to: "" },
];

const conteudoSoftware_WebDev = [
    { descricao: "Introdução ao HTML e CSS", to: "" },
    { descricao: "Estilização de páginas web", to: "" },
    { descricao: "JavaScript básico", to: "" },
    { descricao: "Manipulação do DOM", to: "" },
    { descricao: "Introdução ao React", to: "" },
];

const Item_ConteudoSoftware = ({ descricao, to }) => {

    const [jaFez, setJaFez] = useState(false);

    function alternarStatus() {
        setJaFez(!jaFez);
    }

    return (
        <div className={Style.item}>
            <img
                onClick={alternarStatus}
                src={jaFez ? certoIcon : playIcon}
                alt="você já fez?"
            />
            <Link to={to}>
                <p>{descricao}</p>
            </Link>
        </div>
    );
};

const ConteudoSoftware = () => {
    return (
        <>
            <main className={Style.corpo}>

                <section className={Style.apresentacao}>

                    <div className={Style.parte1}>
                        <div className={Style.titulo}>
                            <img src={softwareIcon} alt="Icone de software" />
                            <div>
                                <h1>SOFTWARE</h1>
                                <h2>Aprenda e domine as linguagens da era digital</h2>
                            </div>
                        </div>

                        <p>
                            Este percurso apresenta os
                            <span> fundamentos do software e do desenvolvimento de sistemas.</span>

                            Durante os módulos, você aprenderá sobre lógica de programação, algoritmos, estruturas de dados e desenvolvimento web.

                            Ao longo do curso, entenderá como os programas funcionam, como escrever código limpo e os conceitos essenciais da engenharia de software.
                        </p>
                    </div>

                    <div className={Style.parte2}>
                        
                        <div className={Style.html_css}>
                            <img src={htmlIcon} alt="HTML logo" />
                            <img src={cssIcon} alt="CSS logo" />
                        </div>

                        <hr />

                        <p>
                            Novos conteúdos de HTML, CSS e JavaScript estão chegando. Neles, você aprenderá a criar interfaces web modernas e a desenvolver aplicações interativas do zero.
                        </p>
                    </div>

                </section>

                <section className={Style.conteudos}>

                    <div className={Style.introducao}>
                        <h1>1 - Introdução</h1>
                        <hr />
                        {conteudoSoftware_Introducao.map((item, index) => (
                            <Item_ConteudoSoftware
                                key={index}
                                descricao={item.descricao}
                                to={item.to}
                            />
                        ))}
                    </div>

                    <div className={Style.fundamentos}>
                        <h1>2 - Lógica de Programação</h1>
                        <hr />
                        {conteudoSoftware_LogicaProgramacao.map((item, index) => (
                            <Item_ConteudoSoftware
                                key={index}
                                descricao={item.descricao}
                                to={item.to}
                            />
                        ))}
                    </div>

                    {/* <div className={Style.componentes}>
                        <h1>3 - Desenvolvimento Web</h1>
                        <hr />
                        {conteudoSoftware_WebDev.map((item, index) => (
                            <Item_ConteudoSoftware
                                key={index}
                                descricao={item.descricao}
                                to={item.to}
                            />
                        ))}
                    </div> */}

                </section>

            </main>
        </>
    );
};

export { ConteudoSoftware };