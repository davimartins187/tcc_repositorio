import { ModeloBase } from "../../modelo base";

const ComoFunciona = () => (
    <ModeloBase 
        tituloAula={"Como vai funcionar esse curso ?"}
        xpGanho={"50"}

        numeroPergunta={"1"}
        descPergunta={"Qual é o objetivo principal do curso apresentado no MyCourse?"}
        respostaCorreta={"Ensinar os fundamentos de hardware de forma clara e proggressiva"}
        opcao1={"Ensinar apenas a montar computadores"}
        opcao2={"Ensinar apenas programação"}
        opcao3={"Ensinar os fundamentos de hardware de forma clara e proggressiva"}
        opcao4={"Ensinar somente manunteção avançada"}

        children={
            <>
                <h2>Introdução</h2>

                    <p>
                        O MyCourse é um projeto educacional criado para ensinar de forma clara e progressiva. Este curso foi desenvolvido para levar você do nível iniciante até uma compreensão sólida sobre o funcionamento dos computadores e dispositivos eletrônicos. Nesta unidade inicial, o objetivo não é apenas apresentar peças, mas construir entendimento. Antes de aprender a montar ou diagnosticar problemas, é essencial compreender como os componentes funcionam individualmente e como trabalham juntos dentro de um sistema.
                    </p>

                <h2>O que você aprenderá neste curso?</h2>

                    <p>
                        O MyCourse não é um conteúdo para memorização rápida, mas um processo de construção gradual de conhecimento. Cada conceito serve de base para o próximo, desenvolvendo não apenas o “como fazer”, mas principalmente o “por que fazer”. O aprendizado técnico acontece com prática e revisão. Com o tempo, os conceitos passam a fazer sentido de forma mais natural e conectada.
                    </p>

                <h2>Evolução e base profissional</h2>

                    <p>
                        Mesmo que as tecnologias mudem, os fundamentos permanecem. Ao dominar essa base, você estará preparado para aprender novas ferramentas, compreender especificações técnicas e evoluir na área. Este curso é o alicerce da sua formação. Mais do que montar máquinas, você aprenderá a entender a lógica física que permite que elas funcionem.
                    </p>
            </>
        }
    />
);

export { ComoFunciona };