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

#Função que Verifica o Token
async def validar_token (token = Depends(pegar_token), session = Depends(pegar_sessao)):
    try:
        info = jwt.decode(token , SECRET_KEY,algorithms = ALGORITIMO,options={"verify_exp": False})
        if info["tipo"] != "access":
            raise HTTPException(status_code=401,detail="Acesso Negado")
        id_usuario = int(info["sub"])
        validade =  datetime.fromtimestamp(info["exp"],tz=timezone.utc)
    except JWTError as ERRO:
        print(ERRO)
        raise HTTPException(status_code=401, detail="Acesso Negado")
    ####
    if(validade < datetime.now(timezone.utc)):
        raise HTTPException(status_code=401,detail="Token expirado")
    usuario = session.query(Usuarios).filter(Usuarios.id_usuario == id_usuario).first()
    if not usuario:
        raise HTTPException(status_code=401, detail="Acesso Negado")
    return usuario


#Função que Verifica o Refresh_Token
async def validar_refresh_token (refresh_token = Depends(pegar_token), session = Depends(pegar_sessao)):
    try:
        info = jwt.decode(refresh_token, SECRET_KEY, algorithms = ALGORITIMO, options={"verify_exp": False})
        if info["tipo"] != "refresh":
            raise HTTPException(status_code=401, detail="Acesso Negado")
        id_usuario = int(info["sub"])
        validade =  datetime.fromtimestamp(info["exp"],tz=timezone.utc)
    except JWTError as ERRO:
        print(ERRO)
        raise HTTPException(status_code=401, detail="Acesso Negado")
    ####
    if(validade < datetime.now(timezone.utc)):
        raise HTTPException(status_code=401,detail="Refresh Token expirado")
    usuario = session.query(Usuarios).filter(Usuarios.id_usuario == id_usuario).first()
    if not usuario:
        raise HTTPException(status_code=401, detail="Acesso Negado")
    return usuario

