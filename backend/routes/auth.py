from fastapi import APIRouter, Depends,HTTPException


#Importando tabelas:
from models.usuarios import Usuarios
from models.usuarios_oauth import UsuariosOauth
from models.patentes import Patente


#Instânciando roteador
auth = APIRouter(prefix="/auth",tags=["autenticação"])

#Importando dependencias
from dependences import pegar_sessao,  pegar_token

#Importando a CRIPTOGRAFIA
from security import criptografia

#Importando SHCEMAS:
from schemas.UsuarioSchema import CadastroSchema, VerificarEmailSchema , EmailSchema , UsuarioLoginSchema



#Biblioteca que gera números aletórios:
from random import randint

#Biblioteca de tempo
from datetime import datetime ,timedelta , timezone


#Funcionalidas para enviar codigo para o email
import smtplib
import email.message

#Importando criptografia para tokens
from jose import jwt,JWTError

#dotenv
import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
PASSWORD_EMAIL = os.getenv("PASSWORD_EMAIL")
ALGORITIMO = os.getenv("ALGORITIMO")

#Funções
def gerar_codigo():
    codigo = str(randint(100000,999999))
    expira_em = datetime.now(timezone.utc) + timedelta(minutes=10)

    return codigo , expira_em
######


def enviar_email(codigo, destinario):
    #Aqui vou colocar a mensagem que eu quero enviar.(A MENSAGEM TEM QUE ESTAR EM HTML)
    corpo_email =  f"""
    <p>Olá,</p>
    <p>Nós da CrashWare recebemos uma solicitação para verificar o seu e-mail em nossa plataforma.</p>
    <p>Para continuar, utilize o código de verificação abaixo:</p>
    <h1>Código: {codigo} </h1>
    <p>Este código é válido por 10 minutos.</p>
    <p>Se você não fez essa solicitação, ignore este e-mail.</p>
    <p>Atenciosamente,</p>
    <p>Equipe CrashWare</p>
    """


    msg = email.message.Message()
    msg['Subject'] = "Verificação de e-mail - CrashWare"  # Assunto/Titulo do email
    msg['From'] = 'plataformacrashware@gmail.com'  #email que vai enviar a mensagem
    msg['To'] = f'{destinario}'  # Email que vai receber a mensagem
    password = f'{PASSWORD_EMAIL}'  # Senha do remetente.
    msg.add_header('Content-Type', 'text/html')
    msg.set_payload(corpo_email)

    s = smtplib.SMTP('smtp.gmail.com: 587')
    s.starttls()
    # Login Credentials for sending the mail
    s.login(msg['From'], password)
    s.sendmail(msg['From'], [msg['To']], msg.as_string().encode('utf-8'))
    print('Email enviado')

#################

def gerar_token(id_usuario, validade = timedelta(minutes = 30)):
    data_expiracao = datetime.now(timezone.utc) + validade
    informacoes = {"sub" : str(id_usuario) , "exp" : data_expiracao.timestamp()}
    token = jwt.encode(informacoes, SECRET_KEY, ALGORITIMO)
    return  token



#ROTAS:
@auth.post("/cadastro")
async def cadastro(dados : CadastroSchema,session = Depends(pegar_sessao)):
    email_usuario = session.query(Usuarios).filter(Usuarios.email == dados.email).first()
    if email_usuario is not None:
        raise HTTPException(status_code=400,detail="Esse email já foi autenticado")
    else:
        codigo , expira = gerar_codigo()
        try:
            #Salvo no Banco
            senha_criptografada = criptografia.hash(dados.senha)
            usuario_novo = Usuarios(nome_usuario=dados.nome_usuario.title(), email=dados.email,senha_hash=senha_criptografada, codigo=codigo, codigo_expirado_em=expira)
            session.add(usuario_novo)
            session.commit()
            #Resposta da API
            return{
                "mensagem" : "Cadastro realizado com sucesso!"
            }
        except Exception as exception:
            session.rollback()
            raise  exception

#############

@auth.post("/verificar_codigo")
async def verificar_codigo(dados : VerificarEmailSchema , session = Depends(pegar_sessao)):
    usuario = session.query(Usuarios).filter(Usuarios.email == dados.email).first()
    if usuario is  None:
        raise HTTPException(status_code=404,detail="Email não autenticado")
    if usuario.codigo != dados.codigo:
        raise HTTPException(status_code=400, detail="Código invalido!")
    if usuario.codigo_expirado_em < datetime.now(timezone.utc):
        raise HTTPException(status_code=410, detail="Código expirado!")

    usuario.email_verificado = True
    session.commit()
    return {"mensagem": "Código verificado com sucesso!"}

####################

@auth.post("/reenviar_codigo")
async def reenviar_codigo( dados : EmailSchema, session = Depends(pegar_sessao)):
    usuario = session.query(Usuarios).filter(Usuarios.email == dados.email).first()
    if usuario is None:
        raise HTTPException(status_code=404,detail="Email não autenticado")
    #Gero novo código
    codigo , expira = gerar_codigo()

    #Atualizo o banco
    usuario.codigo = codigo
    usuario.codigo_expirado_em = expira
    session.commit()

    #Envio email
    enviar_email(codigo, dados.email)

    return {"mensagem": "Código Reenviado!"}

########################

@auth.post("/login")
async def login(dados : UsuarioLoginSchema , session = Depends(pegar_sessao)):
    usuario = session.query(Usuarios).filter(Usuarios.email == dados.email).first()
    if usuario is None:
        raise HTTPException(status_code=404,detail="Email não autenticado")
    elif criptografia.verify(dados.senha , usuario.senha_hash) == False:
        raise HTTPException(status_code=401,detail="Senha incorreta")
    else:
        if usuario.email_verificado ==  False:
            raise HTTPException(status_code=403,detail={
                "erro" : "Email não verificado!!",
                "nome" : usuario.nome_usuario
            })
        else:
            acess_token = gerar_token(usuario.id_usuario)
            refresh_token = gerar_token(usuario.id_usuario, validade=timedelta(days=7))
            return {
                "token" : acess_token,
                "refresh_token" : refresh_token,
                "token_type": "bearer"
            }

########################
@auth.post("/verificar_email")
async def verificar_email(dados: EmailSchema , session = Depends(pegar_sessao)):
    usuario = session.query(Usuarios).filter(Usuarios.email == dados.email).first()
    if usuario is None:
        raise  HTTPException(status_code=404,detail="Email não autenticado")
    else:
        return {"mensagem": "Email verificado com sucesso!"}

###################

@auth.post("/alterar_senha")
async def alterar_senha(dados: UsuarioLoginSchema, session = Depends(pegar_sessao)):
    usuario = session.query(Usuarios).filter(Usuarios.email == dados.email).first()
    if usuario is None:
        raise HTTPException(status_code=404, detail="Email não autenticado")
    if criptografia.verify(dados.senha, usuario.senha_hash) == True:
        raise HTTPException(status_code=400,detail="Você não pode usar a mesma senha")
    else:
        senha_criptografada = criptografia.hash(dados.senha)
        usuario.senha_hash = senha_criptografada
        session.commit()
        return {"mensagem": "Senha alterada com sucesso!"}

##################

##Rota de verificação de token
@auth.post("/verificar_token")
async def verificar_token (token = Depends(pegar_token), session = Depends(pegar_sessao)):
    try:
        info = jwt.decode(token , SECRET_KEY,algorithms = ALGORITIMO)
        id_usuario = int(info["sub"])
    except JWTError as ERRO:
        print(ERRO)
        raise HTTPException(status_code=401, detail="Acesso Negado, Token expirado!")
    ####
    usuario = session.query(Usuarios).filter(Usuarios.id_usuario == id_usuario).first()
    if not usuario:
        raise HTTPException(status_code=401, detail="Acesso inválido")
    id_user = int(usuario.id_usuario)
    return {
            "id": id_user,
            "usuario" : usuario
    }



############################

##Rota do Refresh_Token
@auth.post("refresh_token")
async def refresh_token(id : int,session = Depends(pegar_sessao)):
    usuario = session.query(Usuarios).filter(Usuarios.id_usuario == id)
    if usuario is None:
        raise HTTPException(status_code=404,detail="Id não encontrado")
    token = gerar_token(id)
    return {
        "token" : token,
        "token_type" : "bearer"
    }

##################

##Rota de Adicionar Telefone


############################

##Rota De alterar Telefone

############################


##Rota de alterar Nome


############################


##Rota de alterar e-mail

############################





        
    