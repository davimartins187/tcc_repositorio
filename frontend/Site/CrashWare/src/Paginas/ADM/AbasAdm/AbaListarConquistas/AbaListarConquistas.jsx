import { BotoesForm, CampoTexto } from "../../../../Componentes"
import { useState } from "react"
import Style from "./AbaListarConquistas.module.css"

const AbaListarConquistas = () => {

    const CONQUISTAS_MOCK = [
        { id: 1, titulo: 'Conquista de Software', descricao: 'Descrição super divertida sobre a aula concluída para adquirir a conquista.', tipo: 'software' },
        { id: 2, titulo: 'Conquista de Hardware', descricao: 'Descrição super divertida sobre a aula concluída para adquirir a conquista.', tipo: 'hardware' },
        { id: 3, titulo: 'Conquista de Hardware', descricao: 'Descrição super divertida sobre a aula concluída para adquirir a conquista.', tipo: 'hardware' },
        { id: 4, titulo: 'Conquista de Software', descricao: 'Descrição super divertida sobre a aula concluída para adquirir a conquista.', tipo: 'software' },
        { id: 5, titulo: 'Conquista de Hardware', descricao: 'Descrição super divertida sobre a aula concluída para adquirir a conquista.', tipo: 'hardware' },
        { id: 6, titulo: 'Conquista de Hardware', descricao: 'Descrição super divertida sobre a aula concluída para adquirir a conquista.', tipo: 'hardware' },
    ]

    const [conquistas, setConquistas] = useState(CONQUISTAS_MOCK);
    const [buscar, setBuscar] = useState("");
    return (
        <div className={Style.separarConteudos}>
            <div className={Style.Conteudos}>
                {/* EU ODEIO MEDIA SLA OQ */}
                <h1>Conquistas</h1>
                <div className={Style.Buscar}>
                    <CampoTexto
                        placeholder="Buscar conquistas..."
                        onChange={(e) => setBuscar(e.target.value)}
                    />
                    <BotoesForm
                        className={Style.botaoBuscar}
                        texto="Buscar"
                    />
                </div>

                <div className={Style.Lista}>
                    <div>
                        {conquistas.map((c) => (
                            <div className={Style.ListaConquistas}
                                key={c.id}
                            >

                                <div>
                                    <h6>{c.titulo}</h6>
                                    <p>{c.descricao}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export { AbaListarConquistas }