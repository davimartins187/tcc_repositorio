import { sleep } from "./functions";

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


    async deletar_conta(setToken,setRefresh,setDados,setPopup)
    {

        setPopup({
                tipo: 'aviso',
                titulo: 'Conta',
                mensagem: 'Deletando conta...'
            });

        await sleep(2000)

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
                
                setPopup({
                tipo: 'erro',
                titulo: 'Erro em deletar',
                mensagem: erro.detail
            });

            }
       
        }catch (error) 
        {
            
            setPopup({
                tipo: 'erro',
                titulo: 'Sem conexão',
                mensagem: 'Não foi possível conectar ao servidor.'
            });
        }

    }//deletar_conta



    async adicionar_foto(conteudo,setFoto,setDados,setPopup)
    {
        //Pego o token
        const token = localStorage.getItem("token")

        setPopup({
                tipo: 'aviso',
                titulo: 'Foto',
                mensagem: 'Enviando informações...'
            });

        await sleep(2000)
        
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


                //Atualiza o setFoto
                setFoto(resposta.foto)

                //Atualizo no LocalStorage
                //Pega os dados atuais
                const dados = JSON.parse(localStorage.getItem("dados"));

                //Atualiza apenas a foto
                dados.foto = resposta.foto;

                //Salva novamente
                localStorage.setItem("dados", JSON.stringify(dados));

                //Atualiza a tela
                setDados(dados)

                
                setPopup({
                tipo: 'sucesso',
                titulo: 'Sucesso',
                mensagem: 'Foto adicionada com Sucesso...'
                });

                

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



    async alterar_foto(conteudo,setFoto,setDados,setPopup,setVersaoFoto)
    {
        //Pego o token
        const token = localStorage.getItem("token")

         setPopup({
                tipo: 'aviso',
                titulo: 'Foto',
                mensagem: 'Enviando informações...'
            });

        await sleep(2000)

        try
        {
             const response = await fetch("https://api-crashware.onrender.com/user/alterar_foto",
                {
                    method: "PUT",
                    headers:
                    {
                        "Authorization": `Bearer ${token}`
                    },
                    body: conteudo
                });

                if(response.ok)
                {
                    const resposta = await response.json();

                    //Atualizo o setFoto
                    setFoto(resposta.foto)

                    //Atualizo no LocalStorage:

                    //Pega os dados atuais
                    const dados = JSON.parse(localStorage.getItem("dados"));

                    //Atualiza apenas a foto
                    dados.foto = resposta.foto;

                    //Salva novamente
                    localStorage.setItem("dados", JSON.stringify(dados));

                    //Atualiza a tela
                    setDados(dados)

                    //Atualizo a versão nova da img para o site reconhecer
                    setVersaoFoto(Date.now())

                    
                    setPopup({
                        tipo: 'sucesso',
                        titulo: 'Sucesso',
                        mensagem: 'Foto alterada com Sucesso...'
                    });

                }else
                {
                    const erro = await response.json();

                    setPopup({
                        tipo: 'erro',
                        titulo: 'Erro',
                        mensagem: erro.detail
                    });
                }



        }catch (error) 
        {
            console.log("Erro na requisição:", error);
        }
       

    }//Alterar Foto


    async remover_foto(setDados,setFoto,setPopup)
    {
        //Pego o token
        const token = localStorage.getItem("token")

         setPopup({
                tipo: 'aviso',
                titulo: 'Foto',
                mensagem: 'Removendo foto...'
            });

        await sleep(2000)
        try
        {
            const response = await fetch("https://api-crashware.onrender.com/user/remover_foto",
                {
                    method: "DELETE",
                    headers:
                    {
                        "Authorization": `Bearer ${token}`
                    }
                });

            if(response.ok)
            {
                const  resposta = await response.json();

                setFoto(resposta.foto)

                //Atualizo no LocalStorage:

                //Pega os dados atuais
                const dados = JSON.parse(localStorage.getItem("dados"));

                //Atualiza apenas a foto
                dados.foto = resposta.foto;

                //Salva novamente
                localStorage.setItem("dados", JSON.stringify(dados));

                //Atualiza a tela
                setDados(dados)

                 setPopup({
                    tipo: 'sucesso',
                    titulo: 'Foto',
                    mensagem: resposta.mensagem
                });

            }else
            {
                const erro = await response.json();

                 setPopup({
                    tipo: 'erro',
                    titulo: 'Foto',
                    mensagem: erro.detail
                });

            }
        } catch (error) 
        {
            console.log("Erro na requisição:", error);

            setPopup({
                tipo: 'erro',
                titulo: 'Sem conexão',
                mensagem: 'Não foi possível conectar ao servidor.'
            });
        }
        

    }
}//classe