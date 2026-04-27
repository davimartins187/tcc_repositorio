import { Routes, Route } from "react-router-dom"
import { PgInicial, PgCadastro, SobreNos, PgLogin, PgErro, PgRecuperarSenha, PgVerificacaoEmail, PgPerfil, PgAnotacoes, PgConfiguracoes } from "./Paginas"
import { LayoutPadrao, LayoutCadLogin } from "./Layouts"
import { PgAlterarSenha } from "./Paginas/AlterarSenha"

const Router = () =>
{
    return (
        <Routes>
            <Route path="/" element={<LayoutPadrao />}>
                <Route index element={<PgInicial />}/>
                <Route path="sobre-nos" element={<SobreNos />}/>
                <Route path="*" element={<PgErro />} />
                <Route path="perfil" element={<PgPerfil/>} />
                <Route path="configuracoes" element={<PgConfiguracoes/>} />
                <Route path="anotacoes" element={<PgAnotacoes />} />
            </Route>

            <Route path="/" element={<LayoutCadLogin />}>
                <Route path="cadastro" element={<PgCadastro />}/>
                <Route path="login" element={<PgLogin/>} />
                <Route path="recuperar-senha" element={<PgRecuperarSenha />} />
                <Route path="verificacao-email" element={<PgVerificacaoEmail />} />
                <Route path="alterar-senha" element={<PgAlterarSenha/>} />
            </Route>
        </Routes>
    )
}

export { Router }