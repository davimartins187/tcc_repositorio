export class Usuario
{

    //Parâmetros do método construtor
     constructor(setDados = null,setPopup = null, Navegacao = null,)
    {
        this.setPopup = setPopup;
        this.Navegacao = Navegacao;
        this.setDados = setDados;
    }

    async perfil(setDados)
    {
        //Pego o token
        const token = localStorage.getItem("token")
        try
        {
            const response = await fetch("https://api-crashware.onrender.com/user/",
                {
                    method: "GET",
                    headers:
                    {
                        "Authorization": `Bearer ${token}`
                    }
                })

            if(response.ok)
            {
                //Caso a requisiçaõ deu certo


                //Pego as informaçoes do usuario
                const dados = await response.json();

                //Aviso para o site, que essa requisição não será necessaria fazer mais de uma vez
                localStorage.setItem("info",true);

                //Guardo as informações do usuario no localstorage
                localStorage.setItem("dados", JSON.stringify(dados));

                setDados(dados)
            }
            else
            {
                const erro = await response.json()

                console.log(erro.detail)
            }
            
        }catch (error) 
        {
            console.log("Erro:", error);
            
            // this.setPopup({
            //     tipo: 'erro',
            //     titulo: 'Sem conexão',
            //     mensagem: 'Não foi possível conectar ao servidor.'
            // });

        }   
    }//Perfil


    async deletar_conta(setToken,setRefresh,setDados)
    {
        //Pego o token
        const token = localStorage.getItem("token")
        try
        {
            const response = await fetch("https://api-crashware.onrender.com/user/deletar_conta",
                {
                    method: "DELETE",
                    headers:
                    {
                        "Authorization": `Bearer ${token}`
                    }
                });

            if(response.ok)
            {

                //Chamo um poput de sucesso



                //Deleto o token do LocalStorage
                await localStorage.removeItem("token");

                //Deleto o refresh_token do LocalStorage
                await localStorage.removeItem("refresh_token");

                //Deleto as informações do usuario do localStorage
                await localStorage.removeItem("dados");

                //Faço com que o site entenda que precisara buscar as informações denovo
                localStorage.setItem("info",false)


                //Faço com que o react renderize as informações
                setToken(null);
                setRefresh(null);
                setDados(null);
                

                //Levo para a tela inicial
                window.location.href = '/'
            }else
            {
                const erro = await response.json();
                

                console.log(erro.detail)
            }
       
        }catch (error) 
        {
            console.log("Erro na requisição:", error);
        }

    }//deletar_conta



    async adicionar_foto(conteudo)
    {
        //Pego o token
        const token = localStorage.getItem("token")

        try{
            const response = await fetch("https://api-crashware.onrender.com/user/adicionar_foto",
                {
                    method: "POST",
                    headers:
                    {
                        "Authorization": `Bearer ${token}`
                    },
                    body: conteudo
                });
            
            if(response.ok)
            {
                const resposta = await response.json();

                alert(resposta.mensagem)

                

            }else{
                const erro = await response.json();

                console.log(erro.detail)

                alert("Erro na API ")

                
            }
        }catch (error) 
        {
            console.log("Erro na requisição:", error);
        }
    }//Adicionar_Foto
}//classe