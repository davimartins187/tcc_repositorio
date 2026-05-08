import { BotoesForm, CampoTexto } from "../../../../Componentes"
import { useState } from "react"
import Style from "./AbaListarConquistas.module.css"

const AbaListarConquistas = () => {

    const [buscar, setBuscar] = useState("")
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
            </div>
        </div>
    )
}

export { AbaListarConquistas }