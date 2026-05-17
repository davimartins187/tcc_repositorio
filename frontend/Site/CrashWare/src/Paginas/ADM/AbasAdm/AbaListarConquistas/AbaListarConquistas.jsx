import { BotoesForm, CampoTexto } from "../../../../Componentes"
import { useEffect, useState } from "react"
import Style from "./AbaListarConquistas.module.css"
import { Adm } from "../../../../../funcoes/adm";
import { PopUp } from '../../../../Componentes/pop-up';

const AbaListarConquistas = () => {
     //Popup
    const [popup, setPopup] = useState(null);

    //Buscas
    const [buscar, setBuscar] = useState("");

    let [conquistasInterface, setConquistas] = useState([]);

    useEffect( () => {  
        carregarConquistas();

    }, []);

    async function carregarConquistas() 
        {
            //Listo conquistas no banco de dados
            const adm = new Adm;
            await adm.listar_conquista(setPopup);

            //Pego as conquistar em uma array
            const conquistas = JSON.parse(localStorage.getItem("conquistas")) || [];

            //Interace das conquistas
            const CONQUISTAS_MOCK = []

            //Pego a quantidade de consquistas
            let quantidade_conquistas = conquistas.length

            //Adiciono as conquistas na interface

            for (let n = 0; n < quantidade_conquistas; n++ )
            {
                CONQUISTAS_MOCK.push({titulo: conquistas[n].nome_conquista, descricao: conquistas[n].descricao, tipo: conquistas[n].tipo_conquista , condicao : conquistas[n].condicao_conquista})
                
            }
                

            setConquistas(CONQUISTAS_MOCK);

            console.log("conquistas:", conquistas);
            console.log("conquistasMock:", conquistasMock);
        }
    

    return (
         <>
            {popup && (
                <PopUp
                    tipo={popup.tipo}
                    titulo={popup.titulo}
                    mensagem={popup.mensagem}
                    onFechar={() => setPopup(null)}
                />
            )}
        <div className={Style.separarConteudos}>
            <div className={Style.Conteudos}>
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
                        {conquistasInterface.map((c) => (
                            <div className={Style.ListaConquistas}
                                key={c.id}
                            >

                                <div>
                                    <h6>{c.titulo}</h6>
                                    <p>{c.descricao}</p>
                                    <p>{c.tipo}</p>
                                    <p>{c.condicao}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> 
            </div> {/* Conteudos */}
        </div> 
        </>
    )
}

export { AbaListarConquistas }