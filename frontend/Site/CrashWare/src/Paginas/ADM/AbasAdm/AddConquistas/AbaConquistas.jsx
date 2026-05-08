import { useState } from "react"
import { CampoTexto } from '../../../../Componentes';
import { BotoesForm } from '../../../../Componentes';
import ImgSoftware from "../../../../fotos/imgSoftware.png"
import ImgHardware from "../../../../fotos/imgHardware.png"
import Style from "./AbaConquistas.module.css"

const AbaConquistas = () => {

    const [nomeConquista, setNomeConquista] = useState("");
    const [descricaoConquista, setDescricaoConquista] = useState("");
    const [condicao, setCondicao] = useState("");
    const [moedas, setMoedas] = useState();
    const [xp, setXP] = useState();
    const [opcao, setOpcao] = useState("");
    const [popup, setPopup] = useState(null);

    const botaoliberado =
        nomeConquista &&
        descricaoConquista &&
        moedas &&
        xp &&
        condicao &&
        opcao;

    const handleAdicionarConquista = () => {
        //Instâncio o objeto
        const conquista = new Adm;

        //Chamo o método
        conquista.adicionar_conquista(nomeConquista, opcao, descricaoConquista, moedas, xp, condicao);

    }

    return (

        <div className={Style.Conteudos}>
            <div className={Style.ConquistaInputs}>
                <div className={Style.campoForm}>

                    <label htmlFor="NomeConsquista" className={Style.Margincima}>Nome da Conquista</label>
                    <CampoTexto
                        placeholder="Nome da Conquista"
                        maxlenght={100}
                        onChange={(e) => setNomeConquista(e.target.value)}
                    />
                    <p>Máx 100 caracteres</p>
                </div>

                {/* <div className={Style.ConquistaInputs}> */}
                <div className={Style.campoForm}>
                    <label htmlFor="Descricao">Descricao</label>
                    <textarea
                        name="" id="" className={Style.Descricao}
                        placeholder="Insira uma breve descrição aqui"
                        maxLength={300}
                        onChange={(e) => setDescricaoConquista(e.target.value)}
                    ></textarea>
                    <p>Máx 300 caracteres</p>
                </div>

                <div className={Style.campoForm}>
                    <label htmlFor="Condicao">Condição</label>
                    <textarea
                        name="" id="" className={Style.Descricao}
                        placeholder="Coloque aqui as condições para desbloquear a conquista"
                        maxLength={300}
                        onChange={(e) => setCondicao(e.target.value)}
                    ></textarea>
                    <p>Máx 300 caracteres</p>
                </div>
            </div>


            {/* <div className={Style.ConquistaAtributos}> */}
            <div className={Style.campoFormAtribustos}>
                <h3>Tipo</h3>
                <label className={Style.RadioTipo}>
                    <CampoTexto name="opcao" value="Software" type="radio"
                        onChange={(e) => setOpcao(e.target.value)}
                    />
                    <img src={ImgSoftware} alt="Software" /> Software
                </label>

                <label className={Style.RadioTipo}>
                    <CampoTexto name="opcao" value="Hardware" type="radio"
                        onChange={(e) => setOpcao(e.target.value)}
                    />
                    <img src={ImgHardware} alt="Hardware" /> Hardware
                </label>
                <label className={Style.RadioTipo}>
                    <CampoTexto name="opcao" value="Outro" type="radio"
                        onChange={(e) => setOpcao(e.target.value)}
                    />
                    Outro
                </label>
                <div className={Style.Recompensas}>
                    <h3>Recompensas</h3>

                    <label htmlFor="moedas">Qntd de Moedas</label>
                    <CampoTexto
                        className={Style.Atributos}
                        placeholder="Quantidade de Moedas"
                        type="number"
                        onChange={(e) => setMoedas(e.target.value)}
                    />

                    <label htmlFor="xp">Quantidade de XP</label>
                    <CampoTexto
                        className={Style.Atributos}
                        placeholder="Quantidade de XP"
                        type="number"
                        onChange={(e) => setXP(e.target.value)}
                    />
                </div>
                <BotoesForm
                    className={Style.botaoAdicionar}
                    texto="Adicionar"
                    disabled={!botaoliberado}
                    onClick={handleAdicionarConquista}
                />
            </div>
            {/* </div> */}

        </div>
    )
}

export { AbaConquistas }