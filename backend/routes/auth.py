from fastapi import APIRouter, Depends,HTTPException
#Importando tabelas:
from models.usuarios import Usuarios
from models.usuarios_oauth import  UsuariosOauth
from models.patentes import Patente


#Instânciando roteador
auth = APIRouter(prefix="/auth",tags=["autenticação"])

#Importando session
from dependences import pegar_sessao

#Importando a CRIPTOGRAFIA
from security import criptografia

#Importando SHCEMAS:
from schemas.UsuarioSchema import UsuarioSchema

#Biblioteca que gera números aletórios:
from random import randint

#Biblioteca de tempo
from datetime import datetime ,timedelta , timezone


#Funcionalidas para enviar codigo para o email
import smtplib
import email.message


#Funções
def gerar_codigo():
    codigo = str(randint(100000,999999))
    expira_em = datetime.now(timezone.utc) + timedelta(minutes=10)


    return codigo , expira_em


def enviar_email(codigo, email):

    codigo = codigo
    email = email

	#Aqui vou colocar a mensagem que eu quero enviar.(A MENSAGEM TEM QUE ESTAR EM HTML)

	corpo_email = f"""
	<p>Olá,<p>
	<p>Nós da CrashWare recebemos uma solicitação para verificar o seu e-mail em nossa plataforma.</p>
	<p>Para continuar, utilize o código de verificação abaixo:<p>
	<h1>Código: {codigo} <h1>
	<p>Este código é válido por 10 minutos.<p>
	<p>Se você não fez essa solicitação, ignore este e-mail.<p>
	<p>Atenciosamente,<p>
    <p>Equipe CrashWare<p>
	"""

    #Enviando código para o email
    msg = email.message.Message()
    msg['Subject'] = "Verificação de e-mail - CrashWare"  # Assunto/Titulo do email
    msg['From'] = 'plataformacrashware@gmail.com'  #que vai enviar a mensagem
    msg['To'] = f'{email}'  # Email que vai receber a mensagem
    password = 'senha'  # Senha do remetente.
    msg.add_header('Content=Type', 'text/html')
    msg.set_payload(corpo_email)

    s = smtplib.SMTP('smtp.gmail.com: 587')
    s.starttls()
    # Login Credentials for sending the mail
    s.login(msg['From'], password)
    s.sendmail(msg['From'], [msg['To']], msg.as_string().encode('utf-8'))




#ROTAS:
@auth.post("/cadastro")
async def cadastro(dados : UsuarioSchema,session = Depends(pegar_sessao)):
    email_usuario = session.query(Usuarios).filter(Usuarios.email == dados.email).first()
    if email_usuario is not None:
        raise HTTPException(status_code=400,detail="Esse email já foi cadastrado")
    else:
        codigo , expira = gerar_codigo()
        try:
            senha_criptografada = criptografia.hash(dados.senha)
            usuario_novo = Usuarios(nome_usuario =dados.nome_usuario.title(), email= dados.email , senha_hash= senha_criptografada,codigo = codigo, codigo_expirado_em = expira)
            session.add(usuario_novo)
            session.commit()

            #Enviando codigo para o email
            enviar_email(codigo, dados.email)

            #Resposta da API
            return{
                "mensagem" : "Usuário cadastrado com sucesso!"
            }

        except Exception as exception:
            session.rollback()
            raise  exception


        
    