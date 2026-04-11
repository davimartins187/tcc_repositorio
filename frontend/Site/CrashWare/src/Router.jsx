import { Routes, Route } from "react-router-dom"
import { PgInicial, PgCadastro, SobreNos, PgLogin, PgErro, PgRecuperarSenha } from "./Paginas"
import { LayoutPadrao, LayoutCadLogin } from "./Layouts"

const Router = () =>
{
    return (
        <Routes>
            <Route path="/" element={<LayoutPadrao />}>
                <Route index element={<PgInicial />}/>
                <Route path="sobre-nos" element={<SobreNos />}/>
                <Route path="*" element={<PgErro />} />
            </Route>
            
            <Route path="/" element={<LayoutCadLogin />}>
                <Route path="cadastro" element={<PgCadastro />}/>
                <Route path="login" element={<PgLogin/>} />
                <Route path="recuperar-senha" element={<PgRecuperarSenha />} />
            </Route>
        </Routes>
    )
}

export { Router }