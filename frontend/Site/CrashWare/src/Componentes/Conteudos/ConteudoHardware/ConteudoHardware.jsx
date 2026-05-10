import Style from "./conteudoHardware.module.css";

import hardwareIcon from "../../../fotos/hardware.svg";
import certoIcon from "../../../fotos/certo.png";
import playIcon from "../../../fotos/play.svg";


const conteudoHardware_Introducao = [
    { descricao: "Motivação e mentalidade", to: ""},
    { descricao: "Como vai funcionar esse curso?", to: ""}
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

const Item_ConteudoHardware = ({ }) => {
    return(
        <div>
            
        </div>
    );
};


const ConteudoHardware = () => {
    return (
        <>
            <main className={Style.corpo}>
                
                <section className={Style.apresentacao}>

                    <div className={Style.parte1}>

                    </div>

                    <div className={Style.parte2}>

                    </div>

                </section>

                <section className={Style.conteudos}>

                    <div className={Style.introducao}>

                    </div>

                    <div className={Style.Fundamentos}>

                    </div>

                    <div className={Style.Componentes}>

                    </div>

                </section>

            </main>
        </>
    );
};

export { ConteudoHardware };