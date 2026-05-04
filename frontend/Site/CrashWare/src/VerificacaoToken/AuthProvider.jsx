import { createContext, useState, useEffect } from "react";
import { Api } from "../../funcoes/functions";
import { useNavigate } from "react-router-dom";

//Cria uma Rota Global
const AuthContext = createContext();




const AuthProvider = ({ children }) => {

    //Navegação --> Permite eu levar o usuario para outras telas
    const Navegacao = useNavigate();

    //Uso useState para o react renderizar as informações
    //const [id_state, setId] = useState(() => localStorage.getItem("id"));
    const [token_state, setToken] = useState(() => localStorage.getItem("token"));
    const [refresh_token_state, setRefresh] = useState(() => localStorage.getItem("refresh_token"));

    //Lista que contém todos os usestate
    const set = [setToken,setRefresh];

    //Verifico se o usuario tem token
    const VerificarToken = async () => 
    {
        //Pego os tokens dentro do escopo privado.
        const token = localStorage.getItem("token")
        const refresh_token = localStorage.getItem("refresh_token")


        //Verifico o token
        const usuario = new Api();
        const token_vencido = await usuario.Verificar_Token(token,Navegacao)


    }

    //Sempre que a rota for chamada, eu verifico o token
    useEffect(() => {
            VerificarToken();
        }, []);


    return (
        <AuthContext.Provider value={{ id_state, token_state, refresh_token_state, setId, setToken, setRefresh }}>
            {children}
        </AuthContext.Provider>
    );
};




export { AuthProvider, AuthContext }