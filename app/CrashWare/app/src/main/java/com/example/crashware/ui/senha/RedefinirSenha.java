package com.example.crashware.ui.senha;

import static android.widget.Toast.LENGTH_LONG;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.crashware.R;
import com.example.crashware.ui.login.Login;

public class RedefinirSenha extends AppCompatActivity {

    Button btnConfirmarNovaSenha;

    EditText txtCampoNovaSenha, txtCampoConfirmarNovaSenha;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.redefinir_senha);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.Redefinir), (v, insets) ->
        {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });



        btnConfirmarNovaSenha      = findViewById(R.id.btnConfirmarNovaSenha     );
        txtCampoNovaSenha          = findViewById(R.id.txtCampoNovaSenha         );
        txtCampoConfirmarNovaSenha = findViewById(R.id.txtCampoConfirmarNovaSenha);


        btnConfirmarNovaSenha.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v)
            {
                if (txtCampoNovaSenha == txtCampoConfirmarNovaSenha)
                {
                    Intent Login;
                    Login = new Intent(RedefinirSenha.this, Login.class);
                    startActivity(Login);


                }// Se nova senha for igual à confirmação, leva de volta para a tela de login com a senha //já alterada no banco//
                else
                {
                    Toast.makeText(RedefinirSenha.this,"Senhas Não Coincidem!",LENGTH_LONG).show();

                }// Senão retorna mensagem de erro


            }
        });// interação com o botão de confirmação ao trocar a senha, verificando se coincidem e alterando a senha no bd

    }
}