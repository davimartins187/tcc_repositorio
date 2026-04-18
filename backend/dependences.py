from fastapi import Header, Depends , HTTPException


#Pego a sessão
from database.session import Session

#Importando criptografia para tokens
from jose import jwt,JWTError

#dotenv
import os
from dotenv import load_dotenv

#Importando tabelas
from models.usuarios import Usuarios

#Biblioteca de tempo
from datetime import datetime , timezone

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITIMO = os.getenv("ALGORITIMO")

#Função de pegar a sessão com segurança.
def pegar_sessao():
    try:
        session = Session()
        yield session
    finally:
        session.close()

#Função que pega o token do header
async def pegar_token(authorization: str = Header(None)):
    if authorization is None:
        raise HTTPException(status_code=401 , detail="Token não enviado")
    else:
        token =  authorization.replace("Bearer ", "")
        return token

#Função que verifica se o token é valido
async def verificar_token (token = Depends(pegar_token), session = Depends(pegar_sessao)):
    try:
        info = jwt.encode(token , SECRET_KEY, algorithm=ALGORITIMO)
        id_usuario = int(info["sub"])
        validade = datetime.fromtimestamp(info["exp"], tz=timezone.utc)
    except JWTError as ERRO:
        print(ERRO)
        raise HTTPException(status_code=401, detail="Acesso Negado!")
    ####
    usuario = session.query(Usuarios).filter(Usuarios.id == id_usuario).first()
    if validade < datetime.now(timezone.utc):
        raise HTTPException(status_code=401, detail="Token expirado")
    elif not usuario:
        raise HTTPException(status_code=401, detail="Acesso inválido")
    return usuario

