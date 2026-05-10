<<<<<<< HEAD
import { Routes, Route } from "react-router-dom";
=======
import { Routes, Route } from "react-router-dom"
import { PgInicial, PgCadastro, SobreNos, PgLogin, PgErro, PgRecuperarSenha, PgVerificacaoEmail, PgPerfil, PgAnotacoes, PgConfiguracoes, PgHome, PgTermos, PgAdm, AbaConquistas, AbaUsuarios } from "./Paginas"
import { LayoutPadrao, LayoutCadLogin, LayoutLogado, LalyoutADM } from "./Layouts"
import { PgAlterarSenha } from "./Paginas/AlterarSenha"
import { AuthProvider, RotaPrivada } from "./VerificacaoToken"
import { AbaListarConquistas } from "./Paginas/ADM/AbasAdm/AbaListarConquistas"
>>>>>>> 54509a38a8177e9f55f5fb87505df36d36cb253b

import { PgInicial, PgCadastro, SobreNos, PgLogin, PgErro, PgRecuperarSenha, PgVerificacaoEmail, PgPerfil, PgAnotacoes, PgConfiguracoes, PgHome, PgTermos, PgAdm, AbaConquistas, PgConteudoHardware } from "./Paginas"; 
import {
    LayoutPadrao,
    LayoutCadLogin,
    LayoutLogado,
    LalyoutADM
} from "./Layouts";

import { PgAlterarSenha } from "./Paginas/AlterarSenha";

import { AuthProvider, RotaPrivada } from "./VerificacaoToken";

import { AbaListarConquistas } from "./Paginas/ADM/AbasAdm/AbaListarConquistas";

const Router = () => {
    return (
        <Routes>

            {/* Layout Padrão */}
            <Route path="/" element={<LayoutPadrao />}>

                <Route
                    index
                    element={
                        <AuthProvider>
                            <PgInicial />
                        </AuthProvider>
                    }
                />

                <Route path="sobre-nos" element={<SobreNos />} />

                <Route path="hardware" element={<PgConteudoHardware />} />

                <Route path="*" element={<PgErro />} />

            </Route>

            {/* Cadastro/Login */}
            <Route path="/" element={<LayoutCadLogin />}>

                <Route
                    path="cadastro"
                    element={
                        <AuthProvider>
                            <PgCadastro />
                        </AuthProvider>
                    }
                />

                <Route
                    path="login"
                    element={
                        <AuthProvider>
                            <PgLogin />
                        </AuthProvider>
                    }
                />

                <Route path="recuperar-senha" element={<PgRecuperarSenha />} />

                <Route path="verificacao-email" element={<PgVerificacaoEmail />} />

                <Route path="alterar-senha" element={<PgAlterarSenha />} />

            </Route>

            {/* Layout Logado */}
            <Route path="/" element={<LayoutLogado />}>

                <Route
                    path="perfil"
                    element={
                        <RotaPrivada>
                            <PgPerfil />
                        </RotaPrivada>
                    }
                />

                <Route
                    path="configuracoes"
                    element={
                        <RotaPrivada>
                            <PgConfiguracoes />
                        </RotaPrivada>
                    }
                />

                <Route
                    path="anotacoes"
                    element={
                        <RotaPrivada>
                            <PgAnotacoes />
                        </RotaPrivada>
                    }
                />

                <Route
                    path="home"
                    element={
                        <RotaPrivada>
                            <PgHome />
                        </RotaPrivada>
                    }
                />

                <Route
                    path="termos"
                    element={
                        <RotaPrivada>
                            <PgTermos />
                        </RotaPrivada>
                    }
                />

<<<<<<< HEAD
=======
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

                <Route path="listar-conquistas" element={
                    <RotaPrivada>
                        <AbaListarConquistas />
                    </RotaPrivada>
                } />

                <Route path="usuarios" element={
                    <RotaPrivada>
                        <AbaUsuarios />
                    </RotaPrivada>
                }/>
                
>>>>>>> 54509a38a8177e9f55f5fb87505df36d36cb253b
            </Route>

            {/* ADM */}
            <Route path="/" element={<LalyoutADM />}>

                <Route
                    path="adm"
                    element={
                        <RotaPrivada>
                            <PgAdm />
                        </RotaPrivada>
                    }
                />

                <Route
                    path="criar-conquista"
                    element={
                        <RotaPrivada>
                            <AbaConquistas />
                        </RotaPrivada>
                    }
                />

                <Route
                    path="listar-conquistas"
                    element={
                        <RotaPrivada>
                            <AbaListarConquistas />
                        </RotaPrivada>
                    }
                />

            </Route>

        </Routes>
    );
};

export { Router };