import { ModeloBase } from "../../modelo base";

const MotivacaoMentalidade = () => (
    <ModeloBase 
        tituloAula={"Motivação e Mentalidade"}
        xpGanho={"50"}

        numeroPergunta={"1"}

        descPergunta={
            "Qual é a mentalidade mais importante para evoluir na área de hardware?"
        }

        respostaCorreta={
            "Ter constância nos estudos e aprender os fundamentos"
        }

        opcao1={"Aprender apenas montagem rápida"}
        opcao2={"Ter constância nos estudos e aprender os fundamentos"}
        opcao3={"Memorizar nomes de peças"}
        opcao4={"Trocar peças sem entender o problema"}

        children={
            <>
                <h2>Por que aprender hardware?</h2>

                <p>
                    A área de hardware vai muito além de montar computadores.
                    Entender hardware significa compreender como a tecnologia
                    funciona fisicamente. Cada peça possui uma função específica,
                    e aprender isso permite que você desenvolva raciocínio técnico,
                    lógica e capacidade de resolver problemas reais.
                </p>

                <h2>A importância da mentalidade certa</h2>

                <p>
                    Muitas pessoas desistem cedo porque acreditam que precisam
                    aprender tudo rapidamente. Mas hardware é uma área construída
                    com prática, repetição e entendimento gradual. Você não precisa
                    saber tudo agora. O mais importante é manter consistência e
                    continuar aprendendo um pouco todos os dias.
                </p>

                <h2>Erro faz parte do aprendizado</h2>

                <p>
                    Durante sua evolução, você vai cometer erros, esquecer conceitos
                    e enfrentar dificuldades. Isso faz parte do processo. Até técnicos
                    experientes continuam aprendendo constantemente. O diferencial
                    não é nunca errar, mas continuar estudando e buscando entender
                    o motivo dos problemas.
                </p>

                <h2>Construindo uma base sólida</h2>

                <p>
                    Antes de avançar para manutenção complexa ou diagnósticos
                    avançados, é necessário construir uma base forte. Entender
                    conceitos básicos como memória RAM, processador, armazenamento
                    e placa-mãe vai facilitar tudo no futuro. Quem domina os
                    fundamentos aprende qualquer tecnologia nova com muito mais
                    facilidade.
                </p>

                <h2>Sua evolução começa agora</h2>

                <p>
                    Este curso foi criado para ajudar você a evoluir passo a passo.
                    Com dedicação e prática, você desenvolverá conhecimento técnico
                    suficiente para compreender computadores de verdade, resolver
                    problemas e crescer na área de tecnologia.
                </p>
            </>
        }
    />
);

export { MotivacaoMentalidade };