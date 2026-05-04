from fastapi import APIRouter, Depends,HTTPException


#Importando tabelas:
from models.usuarios import Usuarios
from models.usuarios_oauth import UsuariosOauth
from models.patentes import Patente


#Instânciando roteador
user = APIRouter(prefix="/user",tags=["usuario"])

#Importando dependencias
from dependences import pegar_sessao


#Funcionalidas para enviar codigo para o email
import smtplib
import email.message

#dotenv
import os
from dotenv import load_dotenv

#ROTAS:


