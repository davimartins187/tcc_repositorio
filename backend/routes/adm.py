from fastapi import APIRouter, Depends,HTTPException


#Importando tabelas:
from models.gamificacao import Conquista

#Importando SHCEMAS:
from schemas.admSchema import ConquistaSchema


#Instânciando roteador
adm = APIRouter(prefix="/adm",tags=["admnistração"])

#Importando dependencias
from dependences import pegar_sessao , validar_token



@adm.post('/adicionar_conquista')
async def adicionar_conquista(conquista : ConquistaSchema,session = Depends(pegar_sessao)):
        try:
            ##Adiciono a conquista no banco de dados:
            conquista_nova = Conquista(conquista.nome_conquista, conquista.tipo_conquista, conquista.descricao,conquista.moeda,conquista.xp, conquista.condicao_conquista)
            session.add(conquista_nova)
            session.commit()

            ##Retorno mensagem de sucesso
            return {"mensagem" : "Conquista criada com sucesso!"}

        except Exception as exception:
            ##Se não der certo eu retorno o erro, e dou rollback no banco.
            session.rollback()
            raise HTTPException(status_code=400,detail=str(exception))







