package com.example.crashware.ui.api;

import android.content.Context;
import android.content.SharedPreferences;
import android.widget.Toast;

import com.example.crashware.ui.login.Cadastro;
import com.example.crashware.ui.login.Login;

import org.json.JSONObject;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;

public class User {


    // Armazena a resposta da API:
    public static class PerfilResponse {
        public String nome;
        public String email;
        public String foto;
        public String banner;
        public Integer moedas;
        public Float xp;
        public Boolean ativo;
        public String patente;
        public Integer nivel;
        public Boolean adm;
        public String criado_em;
    }

    // INTERFACE da API:
    public static interface perfil {
        @GET("/user/")
        Call<PerfilResponse> buscar(
                @Header("Authorization") String token
        );
    }

    //Faz com que retorne o objeto
    public interface PerfilCallback {
        void sucesso(PerfilResponse usuario);
    }

    public static void Perfil(Context context, SharedPreferences prefs,PerfilCallback callback) {

        //Pego o valor do token
        String token = prefs.getString("token", null);

        //Preparo ele para enviar para o header da requisição
        token = "Bearer " + token;

        // Criando a API
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("https://api-crashware.onrender.com/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        //

        // Fazendo que a interface da API seja utilizavel:
        perfil api = retrofit.create(perfil.class);

        // Monto a chamada da API:
        Call<PerfilResponse> requisicao = api.buscar(token);

        requisicao.enqueue(new Callback<PerfilResponse>() {
            @Override
            public void onResponse(
                    Call<PerfilResponse> requisicao,
                    retrofit2.Response<PerfilResponse> resposta
            ) {
                //Caso a requisição retornou resposta
                if (resposta.isSuccessful()) {
                    //Se a requisição der certo

                    PerfilResponse usuario = resposta.body();
                    //Faço retornar para qualquer chamda de função o objeto "usuario"
                    callback.sucesso(usuario);

                } else {
                    //Retorna erro caso  a reqsição estiver errado

                    String erro = "Erro ao obter dados";

                    try {
                        String detail = resposta.errorBody().string();

                        JSONObject json = new JSONObject(detail);


                        if (detail != null) {
                            erro = json.getString("detail");

                        }
                    } catch (Exception e) {
                        // ignora, mantém mensagem padrão
                    }

                    //Aqui retorna o ERRO
                    Toast.makeText(context, erro, Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<PerfilResponse> call, Throwable t) {
                // Caso deu erro na requisição
                // erro de conexão (internet, URL, servidor fora)
                Toast.makeText(
                        context,
                        "Erro de conexão: " + t.getMessage(),
                        Toast.LENGTH_LONG
                ).show();
            }
        });
    }
}