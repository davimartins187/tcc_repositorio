import { Routes, Route } from "react-router-dom"
import { PgInicial, PgCadastro, SobreNos, PgLogin, PgErro, PgRecuperarSenha, PgVerificacaoEmail, PgPerfil, PgAnotacoes, PgConfiguracoes, PgHome, PgTermos, PgAdm, AbaConquistas } from "./Paginas"
import { LayoutPadrao, LayoutCadLogin, LayoutLogado, LalyoutADM } from "./Layouts"
import { PgAlterarSenha } from "./Paginas/AlterarSenha"
import { AuthProvider, RotaPrivada } from "./VerificacaoToken"



const Router = () => {
    return (
        //Todas as rotas e Caminhos
        <Routes>
            {/* Layout Padrao */}
            <Route path="/" element={<LayoutPadrao />}>
                <Route index element={
                    <AuthProvider>
                        <PgInicial />
                    </AuthProvider>
                } />

                <Route path="sobre-nos" element={<SobreNos />} />
                <Route path="*" element={<PgErro />} />

            </Route> {/* Layout Padrao */}

            {/* Layout de Cadastro e Login sem footer */}
            <Route path="/" element={<LayoutCadLogin />}>
                <Route path="cadastro" element={
                    <AuthProvider>
                        <PgCadastro />
                    </AuthProvider>
                } />

                <Route path="login" element={
                    <AuthProvider>
                        <PgLogin />
                    </AuthProvider>
                } />

                <Route path="recuperar-senha" element={<PgRecuperarSenha />} />
                <Route path="verificacao-email" element={<PgVerificacaoEmail />} />
                <Route path="alterar-senha" element={<PgAlterarSenha />} />

            </Route>  {/* Layout de Cadastro e Login sem footer */}

            {/* Layout Logado */}
            <Route path="/" element={<LayoutLogado />}>
                <Route path="perfil" element={
                    <RotaPrivada>
                        <PgPerfil />
                    </RotaPrivada>
                } />

                <Route path="configuracoes" element={
                    <RotaPrivada>
                        <PgConfiguracoes />
                    </RotaPrivada>
                } />

                <Route path="anotacoes" element={
                    <RotaPrivada>
                        <PgAnotacoes />
                    </RotaPrivada>
                } />

                <Route path="home" element={
                    <RotaPrivada>
                        <PgHome />
                    </RotaPrivada>
                } />

                <Route path="termos" element={
                    <RotaPrivada>
                        <PgTermos />
                    </RotaPrivada>
                } />


            </Route> {/* Layout Logado */}

            <Route path="/" element={<LalyoutADM />}> {/* LayoutADM */}
                
                <Route path="adm" element={
                    <RotaPrivada>
                        <PgAdm />
                    </RotaPrivada>
                } />

                <Route path="criar-conquista" element={
                    <RotaPrivada>
                        <AbaConquistas />
                    </RotaPrivada>
                } />
            </Route>
        </Routes>
    )
}

export { Router }