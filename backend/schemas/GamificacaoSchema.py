from pydantic import BaseModel #Responsável para criar Schema
from typing import Optional #Adiciona tipos primitivos para o Schema


#Recursos Schema
class RecursoSchema(BaseModel):
    xp : float
    moedas : int

    class Config:
        from_attributes = True

