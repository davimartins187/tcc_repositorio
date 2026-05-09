import { sleep } from "./functions";

export class Adm
{
    constructor(setPopup = null , Navegacao = null)
    {
        this.setPopup = setPopup;
        this.Navegacao = Navegacao;
    }

    async adicionar_conquista(nomeConquista,opcao,descricaoConquista,moedas,xp,condicao,setPopup)
    {
        setPopup({
                    tipo: 'aviso',
                    titulo: 'Conquista',
                    mensagem: 'Enviando Informações...'
                });

        await sleep(2000);

        try
        {
            const response = await fetch("https://api-crashware.onrender.com/adm/adicionar_conquista",
            {   
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                        nome_conquista: nomeConquista,
                        tipo_conquista: opcao,
                        descricao : descricaoConquista,
                        moeda: moedas,
                        xp: xp,
                        condicao_conquista: condicao
                    })
            })

            if (response.ok)
            {
                const resposta = await response.json()
                
                setPopup({
                    tipo: 'sucesso',
                    titulo: 'Conquista',
                    mensagem: resposta.mensagem
                });

            }else
            {
                const erro = await response.json()

                  setPopup({
                    tipo: 'erro',
                    titulo: 'Erro',
                    mensagem: erro.detail
                });
            }   
        
        }catch(error) 
        {
             setPopup({
                    tipo: 'erro',
                    titulo: 'Erro De Conexão',
                    mensagem: 'Tente novamente mais tarde...'
                });
            //Erro de conexão
            console.log("Erro:", error);
            

        }//catch

    }//add_conquista
}//classe