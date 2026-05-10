import { useState } from 'react'
import { CampoTexto } from '../../../../Componentes'
import { BotoesForm } from '../../../../Componentes'

import Style from './AbaUsuarios.module.css'

const AbaUsuarios = () => {

        const CONQUISTAS_MOCK = [
            { id: 1, nome: 'Usuario', adm: 'Sim',deletar: 'Deletar' },
        ]
    
        const [conquistas, setConquistas] = useState(CONQUISTAS_MOCK);
    return (
        <>
            <div className={Style.separarConteudos}>
                <div className={Style.Conteudos}>
                    <h1>Usuários</h1>

                    <div className={Style.Buscar}>
                        <CampoTexto
                            placeholder="Buscar Usuários..."
                            onChange={(e) => setBuscar(e.target.value)}
                        />
                        <BotoesForm
                            className={Style.botaoBuscar}
                            texto="Buscar"
                        />
                    </div>

                    <div className={Style.Lista}>
                        <div className={Style.ListaConquistas}>
                            {conquistas.map((c) => (
                                <div 
                                    key={c.id}
                                >

                                    <div>
                                        <h6>{c.nome}</h6>
                                        <p>Adm? {c.adm}</p>
                                        <BotoesForm
                                            texto="Editar"
                                        />
                                        <BotoesForm
                                            texto={c.deletar}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div> {/* Lista */}
                </div> {/* Conteudos */}
            </div> {/* Separar Conteudos */}
        </>
    )
}

export { AbaUsuarios }