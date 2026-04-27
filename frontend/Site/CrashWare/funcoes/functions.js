//Pego o token:
const token = localStorage.getItem("token")
const token_boolean = localStorage.getItem("token_boolean")

/*Sleep*/
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Sair da conta
export function SairDaConta(Navegacao){

     //Deleto o token do LocalStorage
    localStorage.removeItem("token");

    //Deleto o refresh_token do LocalStorage
    localStorage.removeItem("refresh_token");


    //Deleto o ID do LocalStorage
    localStorage.removeItem("id");

    //Removo a validação do token
    localStorage.removeItem("token_boolean","false");

    //Levo para a tela inicial
    Navegacao("/")

}
       


//Verifico qual tela a pessoa vai ir, ao clicar no "CRASHWARE" do HEADER
export function handleRedirect(Navegacao)
{
    if(!token || token_boolean == "false")
    {
        Navegacao("/")
    }else
    {
        Navegacao("/perfil")
    }
}


//Classe API
export class Api
{
    constructor(nome = null , email = null, senha = null, popup = null, navegacao = null)
    {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.popup = popup;
        this.navegacao = navegacao;
    }

    async cadastro(nome,email,senha,confirmarSenha,navegacao,popup)
    {
        const validarCampos = () => 
        {

            if (!nome.trim()) {
                return "Preencha o nome";
            }

            if (/\d/.test(nome)) {
                return "Nome não pode conter números";
            }

            if (nome.length < 5) {
                return "Nome deve ter pelo menos 5 caracteres";
            }

            if (!email.trim()) {
                return "Preencha o e-mail";
            }

            if (!email.includes("@") || !email.includes(".")) {
                return "E-mail inválido";
            }

            if (senha.length < 8) {
                return "Senha deve ter pelo menos 8 caracteres";
            }

            if (senha.includes(" ")) {
                return "Senha não pode conter espaços";
            }

            if (senha !== confirmarSenha) {
                return "As senhas não coincidem";
            }

            return null;
        };

        const erro = validarCampos();

        if (erro) {
            setPopup({
                tipo: 'aviso',
                titulo: 'Erro no formulário',
                mensagem: erro
            });
            return;
        }

        setPopup({
            tipo: 'sucesso',
            titulo: 'Verificando informações...',
            mensagem: 'Estamos verificando seus dados'
        });

        await sleep(2000) /*-> Faz que espere 2 segundos*/

        try {
            const response = await fetch("https://api-crashware.onrender.com/auth/cadastro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome_usuario: nome.trim(),
                    email: email.replace(/\s/g, "").toLowerCase(),
                    senha: senha
                })
            });

            if (!response.ok) {
                const erro = await response.json();

                setPopup({
                    tipo: 'aviso',
                    titulo: 'Email',
                    mensagem: erro.detail 
                });

                return;
            }

            const dados = await response.json();

            Navegacao("/verificacao-email", {
                state: {
                    mensagem: dados.mensagem,
                    nome: nome.toUpperCase(),
                    email: email.replace(/\s/g, "").toLowerCase(),
                    origem: "/cadastro"
                }
            });

            } catch (error) {
                    console.log("Erro:", error);

                    setPopup({
                        tipo: 'erro',
                        titulo: 'Sem conexão',
                        mensagem: 'Não foi possível conectar ao servidor.'
                    });
            }//catch

    }//método cadastro
}//classe

//Métodos:

//Cadastro(navegacao,popup,nome,email,senha)

//  VALIDAÇÃO DIRETA (retorna só 1 erro)




       

//



// //Verificar-Email(email,popup,navegacao)
// // ✅ VALIDAÇÃO DIRETA
// const validarCampos = () => {

// if (!email.trim()) {
//     return "Preencha o e-mail";
// }

// if (!email.includes("@") || !email.includes(".")) {
//     return "E-mail inválido";
// }


// return null;
// };
// const erro = validarCampos()

// if (erro)
// {
//     setPopup({
//         tipo: 'aviso',
//         titulo: 'Erro no login',
//         mensagem: erro
//     });
//     return;
// }else
// {
//     setPopup({
//         tipo: 'sucesso',
//         titulo: 'Verificação',
//         mensagem: 'Verificando Email..'
//     });

//     //Envio os dados para a API(na rota de login)
//     try {
//         const response = await fetch("https://api-crashware.onrender.com/auth/verificar_email", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 email: email.replace(/\s/g, "").toLowerCase()
//             })
//     });//Parâmetros

//         // Caso email não tiver autenticado
//         if (!response.ok)
//         {
//             const erro = await response.json()

//             setPopup({
//             tipo: 'erro',
//             titulo: erro.detail
//             });

//         }
//         else{
//             // Sobrescreve valor no localStorage para controle de navegação
//             localStorage.setItem("rec_senha", true)

//             //Levo para a tela de verificar codigo
//             Navegacao("/verificacao-email", {
//             state: {
//                 email: email.replace(/\s/g, "").toLowerCase(),
//                 origem: "/recuperar-senha" //origem da rota
//             } //State
//             } // 
//             )  //Navegação
//         }
// } catch (error) 
//     {
//         //Precisa colocar esse erro no lugar certo davison.
//         console.log(error);
//         return;
//     }
// }


// //Verificar-codigo(popup,email,codigo,navegacao):

// //  exibi um popup de aviso
// setPopup({
//     tipo: 'aviso',
//     titulo: 'Verificação de código',
//     mensagem: 'Estamos verificando o código...'
// });

// await sleep(3000)  /*-> Faz com que espere 3 segundos*/

// //Requsição
//     try {
//         const response = await fetch(
//             "https://api-crashware.onrender.com/auth/verificar_codigo",
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     email: email,
//                     codigo: codigo.toString()
//                 })
//             }
//         );

//         if (response.ok === false) {

//             const erroCodigo = await response.json()
//             setPopup({
//                 tipo: 'aviso',
//                 titulo: '⚠️',
//                 mensagem: erroCodigo.detail
//             });

//         } else {

//             setPopup({
//                 tipo: 'sucesso',
//                 titulo: 'Emal Verificado!',
//                 mensagem: 'Estamos te redirecionando...'
//             });

//             await sleep(3000)  /*-> Faz que espere 3 segundos*/

//             if(rec_senha == "false"){
//                 setPodeNavegar(true)
//                 Navegacao("/login")
//                 // , { replace: true }
//             }else
//             {
//                 //Leva para a pag de rec_senha
//                 setPodeNavegar(true)
//                 Navegacao("/alterar-senha",
//                 {
//                 state:{
//                     email: email.replace(/\s/g, "").toLowerCase()
//                 }//state
//                 })
//             }

//         }

//     } catch (error) {
//         console.log("Erro de conexão:", error);

//         setPopup({
//             tipo: 'erro',
//             titulo: 'Sem conexão',
//             mensagem: 'Não foi possível conectar ao servidor.'
//         });
// }


// //ENVIAR_CODIGO(loading,timer,email,popup)
// if (loading || timer > 0) return;
// setLoading(true);

// try {
//     const response = await fetch(
//         "https://api-crashware.onrender.com/auth/reenviar_codigo",
//         {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 email: email
//             })
//         }
//     );

//     if (!response.ok) {
//         const erro = await response.json();
        
//         //  exibi um popup de erro
//         setPopup({
//             tipo: 'aviso',
//             titulo: '404',
//             mensagem: erro.detail
//         });
//     } else {
//         setTimer(60);
//         //Exibi um popup de sucesso
//             setPopup({
//             tipo: 'sucesso',
//             titulo: 'Código Enviado',
//             mensagem: 'Enviamos para seu email um código novo...'
//         });

//     }

// } catch (error) {
//     console.log(error)
//     setPopup({
//         tipo: 'erro',
//         titulo: 'Sem conexão',
//         mensagem: 'Não foi possível conectar ao servidor.'
//     });
    
// } finally {
//     setLoading(false);
// }

// //Login(email,senha,popup,navegacao,state(react))

// const validarCampos = () => {

//     if (!email.trim()) {
//         return "Preencha o e-mail";
//     }

//     if (!email.includes("@") || !email.includes(".")) {
//         return "E-mail inválido";
//     }

//     if (!senha) {
//         return "Preencha a senha";
//     }

//     if (senha.length < 8) {
//         return "Senha deve conter pelo menos 8 caracteres";
//     }

//     return null;
// };

// const erro = validarCampos();

// if (erro) {
//     setPopup({
//         tipo: 'aviso',
//         titulo: 'Erro no login',
//         mensagem: erro
//     });
//     return;
// }

// setPopup({
//     tipo: 'sucesso',
//     titulo: 'Verificação',
//     mensagem: 'Verificando dados...'
// });

// await sleep(2000) /*-> Faz que espere 2 segundos*/


// //Envio os dados para a API(na rota de login)
// try {
//     const response = await fetch("https://api-crashware.onrender.com/auth/login", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             email: email.replace(/\s/g, "").toLowerCase(),
//             senha: senha
//         })
//     });//Parâmetros

//     // Erro causado por ação do usuário (dados inválidos, não autorizado, etc)

//     if (response.status === 403) {
//         //Caso o usuario não tenha verificado o email:

//         //Pego o nome
//         const erro = await response.json()
//         const nome = erro.detail.nome

//         setPopup({
//             tipo: 'aviso',
//             titulo: 'Erro de autenticação',
//             mensagem: erro.detail.erro
//         });


//         await sleep(2000) /*Faz com que espere 2 segundos*/

//         //Envio o usuario na pagina de verificar EMAIL
//         Navegacao("/verificacao-email", {
//             state: {
//                 email: email.toLowerCase(),
//                 nome: nome.toUpperCase(),
//                 origem: "/login"

//             }
//         });



//     } else if (!response.ok) {
//         //Caso o usuario erre a senha, ou email não autenticado:

//         //Retorna erro
//         const erro = await response.json()
//         setPopup({
//             tipo: 'aviso',
//             titulo: 'Erro de Autenticação',
//             mensagem: erro.detail
//         });

//         return;

//     }

//     else {
//         // Usuario logou:

//         //Pego o token gerado pela API
//         const dados = await response.json()
//         const token = dados.token
//         const refresh_token = dados.refresh_token

//         //Guardo no localStorage
//         localStorage.setItem("token", token)
//         localStorage.setItem("refresh_token", refresh_token)

//         //Caso eu queira pegar o token
//         //const token = localStorage.getItem("token")
//         //const refresh_token = localStorage.getItem("refresh_token")

//         //Aqui envia para a tela de HOME:
//         Navegacao("/perfil");
//     }

// } catch (error) {
//     console.log("Erro:", error);
    
//     setPopup({
//         tipo: 'erro',
//         titulo: 'Sem conexão',
//         mensagem: 'Não foi possível conectar ao servidor.'
//     });
// }


// //Alterar senha(navegacao,email,senha,popup,navegacao):
// const validarCampos = () => 
//     {
//         if (senha.length < 8) {
//             return "Senha deve ter pelo menos 8 caracteres";
//         }

//         if (senha.includes(" ")) {
//             return "Senha não pode conter espaços";
//         }

//         if (senha !== confirmaSenha) {
//             return "As senhas não coincidem";
//         }

//         return null;
//     }
// //
// const erro = validarCampos();


// if (erro) {
//         setPopup({
//             tipo: 'aviso',
//             titulo: 'Erro no formulário',
//             mensagem: erro
//         });
//         return;
//     }

// setPopup({
//         tipo: 'sucesso',
//         titulo: 'Senha',
//         mensagem: 'Verificando senhas....'
// });


// await sleep(2000)/*Faz com que espere 2 segundos*/

// try 
// {
//     const response = await fetch("https://api-crashware.onrender.com/auth/alterar_senha",
//     {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 email: email,
//                 senha: senha
//             })
//     })//Parâmetros

//     if (!response.ok)
//     {
//         const erro = await response.json()

//         setPopup({
//             tipo: 'aviso',
//             titulo: 'Senha',
//             mensagem: erro.detail
//         });

//     }else
//     {
//         setPopup({
//             tipo: 'sucesso',
//             titulo: 'Senha atualizada com sucesso',
//             mensagem: 'Estamos te redirecionando...'
//         });

//         await sleep(3000) /* Faz com que espere 3 segundos*/

//         Navegacao("/login");

//     }

// }catch (error) 
// {   //Erro na requisição
//     setPopup({
//         tipo: 'erro',
//         titulo: 'erro',
//         mensagem: 'Não foi possível conectar ao servidor.'
//     });

//     console.log(error)
// }





