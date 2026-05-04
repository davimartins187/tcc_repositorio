import style from './Carrossel.module.css'
import { useState } from 'react';

const Carrossel = () => {

    const CadsCarrossel = [
        { id: 1, Titulo: "Gamificação", Texto: "Mantenha sua ofensiva, desbloqueie conquistas e troque seus pontos por cosméticos exclusivos." },
        { id: 2, Titulo: "Aprendizagem Contínua", Texto: "Metas diárias, ofensiva e XP para evoluir a cada dia." },
        { id: 3, Titulo: "Aulas e Exercícios", Texto: "Conteúdos concisos e exercícios práticos para fixar o aprendizado." },
    ];

    const [index, setIndex] = useState(0);

    const proximo = () => {
        setIndex((prev) =>
            prev === CadsCarrossel.length - 1 ? 0 : prev + 1
        );
    };

    const anterior = () => {
        setIndex((prev) =>
            prev === 0 ? CadsCarrossel.length - 1 : prev - 1
        );
    };

    return (
        <div className={style.container}>
            <div className={style.viewport}>
                <div
                    className={style.lista}
                    style={{ transform: `translateX(-${index * 100}%)` }}
                >
                    {CadsCarrossel.map((card) => (
                        <div key={card.id} className={style.card}>
                            <h3>{card.Titulo}</h3>
                            <p>{card.Texto}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className={style.rodape}>
                <button className={style.btn} onClick={anterior}>◀</button>

                <div className={style.dots}>
                    {CadsCarrossel.map((_, i) => (
                        <span
                            key={i}
                            className={`${style.dot} ${i === index ? style.dotAtivo : ''}`}
                            onClick={() => setIndex(i)}
                        />
                    ))}
                </div>

                <button className={style.btn} onClick={proximo}>▶</button>
            </div>
        </div>
    );
};

export { Carrossel };