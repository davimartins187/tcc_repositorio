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
