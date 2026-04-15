import { useRef, useState } from 'react'
import FotoPadrao from '../../../fotos/FotoPerfilPadrao.jpeg'
import style from './ConteudoPerfil.module.css'

const ConteudoPerfil = () => {

    // muda a foto
    const [foto, setFoto] = useState(FotoPadrao);

    //referencia o input
    const inputRef = useRef();

    //Carrega a foto salva q pus
    // useEffect(() => {
    // const fotoSalva = localStorage.getItem("fotoPerfil")
    // if (fotoSalva) {
    //     setFoto(fotoSalva)
    // }
    // }, [])

    return (
        <div className={style.corpo}>
            <div className={style.container}>
                {/* Foto */}
                <img className={style.foto}
                    src={foto} alt="Foto" 
                    onClick={() => inputRef.current.click()}
                />

                {/* Input escondido pra trocar foto */}
                <input type="file" className={style.escondido}
                    ref={inputRef}
                    accept='image/*'
                    onChange={(e) => {
                        const arquivo = e.target.files[0];

                        if(arquivo){
                            const url = URL.createObjectURL(arquivo)
                            setFoto(url);
                        }
                    }}
                />

                {/* Nome */}
                <h3>. . . . . </h3>

                {/* Status */}
                <p>Online</p>

                {/* Informações de Ofenciva e afins */}
                <div className={style.infos}>

                </div>

                {/* Conquistas */}
                <div className={style.conquista}>
                    
                </div>
            </div>
        </div>
    )
}

export { ConteudoPerfil }