import { useState } from 'react';
import { CampoTexto, BotoesForm, PopUp } from '../../../../Componentes';


import Style from './AbaCriarMateria.module.css';

const AbaCriarMateria = () => {

    const [popup, setPopup] = useState(null);
    const [video, setVideo] = useState(null);

    function PegarVideo(e) {
        const arquivo = e.target.files[0];

        if (arquivo) {
            setVideo(arquivo);
        }
    }

    return (
        <>
            {/*Popup Padrão]*/}
            {
                popup && (
                    <PopUp
                        tipo={popup.tipo}
                        titulo={popup.titulo}
                        mensagem={popup.mensagem}
                        onFechar={() => setPopup(null)}
                    />
                )}

            <div className={Style.separarConteudos}>
                <div className={Style.Conteudos}>
                    <h1>Crie um Exercicio</h1>

                    <div className={Style.campoForm}>

                        <label htmlFor="NomeMateria" className={Style.Margincima}>Nome da Materia</label>
                        <CampoTexto
                            placeholder="Nome da Matéria"
                            maxlenght={100}
                        // onChange={(e) => setNomeConquista(e.target.value)}
                        />
                        <p>Máx 100 caracteres</p>
                    </div>

                    <div className={Style.Video}>
                        <CampoTexto type="file" accept="video/*"
                            onChange={PegarVideo}
                        />
                    </div>

                    <div className={Style.CampoArtigo}>
                        <textarea name="" id=""></textarea>
                    </div>
                </div>
            </div>
        </>
    )
}

export { AbaCriarMateria }