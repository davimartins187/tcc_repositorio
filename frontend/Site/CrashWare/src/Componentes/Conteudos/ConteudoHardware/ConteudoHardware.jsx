import Style from "./conteudoHardware.module.css";

import hardwareIcon from "../../../fotos/hardware.svg";
import certoIcon from "../../../fotos/certo.svg";
import playIcon from "../../../fotos/play.svg";
import arduinoIcon from "../../../fotos/arduino.svg";

import { useState } from "react";
import { Link } from "react-router-dom";

const conteudoHardware_Introducao = [
    { descricao: "Motivação e mentalidade", to: "/MotivacaoMentalidade"},
    { descricao: "Como vai funcionar esse curso?", to: "/comoFunciona"}
];

const conteudoHardware_Fundamentos = [
    { descricao: "Introdução ao Hardware", to: ""},
    { descricao: "Evolução dos Compudores", to: ""},
    { descricao: "Arquitetura Básica (Von Neumann)", to: ""},
    { descricao: "Tipos de computadores", to: ""},
]

const ConteudoHardware_Componentes = [
    { descricao: "Placa-mãe", to: ""},
    { descricao: "Processador (CPU)", to: ""},
    { descricao: "Memória RAM", to: ""},
    { descricao: "Armazenamento (HD e SSD)", to: ""},
    { descricao: "Fonte de alimentação (PSU)", to: ""},
    { descricao: "Placa de vídeo (GPU)", to: ""},
]

const Item_ConteudoHardware = ({descricao, to}) => {

    const [jaFez, setJaFez] = useState(false);

    function alternarStatus() {
        setJaFez(!jaFez);
    }

    return (
        <div 
            className={Style.item}
        >

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


const ConteudoHardware = () => {
    return (
        <>
            <main className={Style.corpo}>
                
                <section className={Style.apresentacao}>

                    <div className={Style.parte1}>

                        <div className={Style.titulo}>
                            <img src={hardwareIcon} alt="Icone de hardware" />
                            <div>
                                <h1>HARDWARE</h1>
                                
                                <h2>Desvende a arquitetura das máquinas de forma acessível</h2>
                            </div>
                        </div>

                        <p>
                            Este percurso apresenta os 
                            <span>fundamentos do hardware e da estrutura dos computadores.</span>

                            Durante os módulos, você aprenderá sobre processador, memória RAM, armazenamento, placa-mãe e outros componentes essenciais.

                            Ao longo do curso, entenderá como as peças se comunicam, como identificar componentes e os conceitos básicos da arquitetura de computadores.
                        </p>
                          
                    </div>

                    <div className={Style.parte2}>
                        <img src={arduinoIcon} alt="Simbolo do arduino" />

                        <hr />
                        
                        <p>
                            Novos conteúdos de Arduino e Eletrônica estão chegando. Neles, você aprenderá a montar circuitos básicos e programar comandos simples para controlar componentes eletrônicos. 
                        </p>
                    </div>

                </section>

                <section className={Style.conteudos}>

                    <div className={Style.introducao}>

                        <h1>1 - Introdução</h1>
                        <hr />

                            {conteudoHardware_Introducao.map((item, index) => (
                                <Item_ConteudoHardware
                                    key={index}
                                    descricao={item.descricao}
                                    to={item.to}
                                />
                            ))}
                    </div>

                    <div className={Style.fundamentos}>

                        <h1>2 - Fundamentos</h1>
                        <hr />

                            {conteudoHardware_Fundamentos.map((item, index) => (
                                <Item_ConteudoHardware
                                    key={index}
                                    descricao={item.descricao}
                                    to={item.to}
                                />
                            ))}
                    </div>

                    <div className={Style.componentes}>

                            <h1>3 - Componentes</h1>
                            <hr />

                                {ConteudoHardware_Componentes.map((item, index) => (
                                    <Item_ConteudoHardware
                                        key={index}
                                        descricao={item.descricao}
                                        to={item.to}
                                    />
                                ))}
                    </div>

                </section>

            </main>
        </>
    );
};

export { ConteudoHardware };