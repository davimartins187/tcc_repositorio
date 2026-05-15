import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Usuario } from "../../../../funcoes/user";
import style from "./ConteudoHome.module.css";


import hardwareIcon from "../../../fotos/hardware.svg";
import softwareIcon from "../../../fotos/software.svg";
import iconOfensiva from "../../../fotos/Ofensiva.svg";

// felipe depois tenque substituir pelos dados da API
const anotacaoItens = [
    { id: 1, titulo: "Metas para os estudos", data: "01/04/2026" },
    { id: 2, titulo: "Introdução ao Hardware", data: "10/04/2026" },
    { id: 3, titulo: "Introdução ao Software", data: "20/04/2026" },
];

const ConteudoHome = () => {
    const [dados, setDados] = useState(
        () => JSON.parse(localStorage.getItem("dados")) || null
    );

    useEffect(() => {
        const onVisible = () => {
            if (!document.hidden) {
                const cliente = new Usuario();
                cliente.perfil(setDados);
            }
        };
        document.addEventListener("visibilitychange", onVisible);
        return () => document.removeEventListener("visibilitychange", onVisible);
    }, []);

    const usuario = JSON.parse(localStorage.getItem("dados"));

    const XpMax = 500;
    const xp = usuario?.xp || 350;
    const Nivel = usuario?.nivel || 8;
    const xpAtual = xp % XpMax;
    const porcentagem = (xpAtual / XpMax) * 100;
    const nome = usuario?.nome || "Davidson";

    const ofensiva = usuario?.ofensiva || 58;

    const ultimaAula = {
        trilha: "Hardware",
        numero: "Aula 2",
        titulo: "Como vai funcionar esse curso?",
        proximoModulo: "Introdução ao Hardware",
    };

    if (!usuario) {
        return (
            <div className={style.corpo} style={{ justifyContent: "center" }}>
                <span style={{ color: "#8b90a0", letterSpacing: "0.1em", fontSize: "13px" }}>
                    CARREGANDO...
                </span>
            </div>
        );
    }

    return (
        <div className={style.corpo}>

            <div className={style.header}>

                <div className={style.headerUsuario}>
                    <img
                        className={style.foto}
                        src={`https://yegrosiecwjebeetlwwg.supabase.co/storage/v1/object/public/FOTOS/${usuario?.foto}`}
                        alt="Foto de perfil"
                    />

                    <div className={style.headerTexto}>
                        <p className={style.bemVindo}>BEM-VINDO DE VOLTA,</p>
                        <h2 className={style.nomeUsuario}>{nome}</h2>

                        <div className={style.Nivel}>
                            <div className={style.NivelTopo}>
                                <span>Nível {Nivel}</span>
                                <span>{xpAtual}/{XpMax} XP</span>
                            </div>
                            <div className={style.Barra}>
                                <div
                                    className={style.Progresso}
                                    style={{ width: `${porcentagem}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={style.ofensiva}>
                    <img src={iconOfensiva} alt="Ofensiva" className={style.ofensivaIcon} />
                    <span className={style.ofensivaDias}>{ofensiva} dias</span>
                    <p className={style.ofensivaLabel}>Consecutivos<br />de ofensiva</p>
                </div>

            </div>


            <div className={style.grade}>

                <div className={style.aulaAtual}>
                    <p className={style.aulaTag}>{ultimaAula.trilha} | {ultimaAula.numero}</p>
                    <h3 className={style.aulaTitulo}>{ultimaAula.titulo}</h3>

                    <Link to="/aula">
                        <button className={style.btnRetomar}>Retomar</button>
                    </Link>

                    <div className={style.proximoModulo}>
                        <span className={style.proximoLabel}>Próximo Módulo</span>
                        <div className={style.proximoItem}>
                            <div className={style.proximoDot} />
                            <p>{ultimaAula.proximoModulo}</p>
                        </div>
                    </div>
                </div>

                <div className={style.anotacoes}>
                    <h4 className={style.secaoTitulo}>ÚLTIMAS ANOTAÇÕES</h4>

                    <div className={style.listaAnotacoes}>
                        {anotacaoItens.map((a) => (
                            <div key={a.id} className={style.itemAnotacao}>
                                <p className={style.anotacaoTitulo}>{a.titulo}</p>
                                <span className={style.anotacaoData}>{a.data}</span>
                            </div>
                        ))}
                    </div>

                    <Link to="/anotacoes">
                        <button className={style.verTodas}>Ver todas as anotações</button>
                    </Link>
                </div>

            </div>

            <div className={style.trilhasContainer}>
                <h4 className={style.secaoTitulo}>TRILHAS</h4>

                <div className={style.trilhas}>

                    <div className={style.trilhaHardware}>
                        <img src={hardwareIcon} alt="Hardware" />
                        <div>
                            <h3>Hardware</h3>
                            <p>Desvende a arquitetura das máquinas de forma acessível</p>
                        </div>
                        <Link to="/hardware">
                            <button className={style.btnExplorar}>EXPLORAR &gt;</button>
                        </Link>
                    </div>

                    <div className={style.trilhaSoftware}>
                        <img src={softwareIcon} alt="Software" />
                        <div>
                            <h3>Software</h3>
                            <p>Decifre a linguagem dos sistemas de forma intuitiva</p>
                        </div>
                        <Link to="/software">
                            <button className={style.btnExplorar}>EXPLORAR &gt;</button>
                        </Link>
                    </div>

                </div>
            </div>

        </div>
    );
};

export { ConteudoHome };