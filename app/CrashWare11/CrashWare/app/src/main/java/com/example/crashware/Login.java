package com.example.crashware;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthInvalidCredentialsException;
import com.google.firebase.auth.FirebaseAuthInvalidUserException;

public class Login extends AppCompatActivity {

    Button btnEntrar, btnCadLogin;
    ImageView imgOlho;

    EditText txtEmailLogin, txtSenhaLogin;
    TextView txtEsqueceu;

    FirebaseAuth auth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.login);

        //  Iniciando layout
        btnEntrar     = (Button)    findViewById(R.id.btnEntrarCad );
        btnCadLogin   = (Button)    findViewById(R.id.btnCadLogin  );
        imgOlho       = (ImageView) findViewById(R.id.imgOlho      );
        txtEsqueceu   = (TextView)  findViewById(R.id.txtEsqueceu  );
        txtEmailLogin = (EditText)  findViewById(R.id.txtEmailLogin);
        txtSenhaLogin = (EditText)  findViewById(R.id.txtSenhaLogin);

        // Iniciando Firebase
        auth = FirebaseAuth.getInstance();

        //  Botão entrar
        btnEntrar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view)
            {
             Logar();
            }
        });


        //  Ir para cadastro
        btnCadLogin.setOnClickListener(v ->
        {
            Intent cadastro =
                    new Intent(Login.this, Cadastro.class);
            startActivity(cadastro);
        });

        //  Esqueceu senha
        txtEsqueceu.setOnClickListener(v ->
        {
            Intent RecSenha =
                    new Intent(Login.this, RecuperarSenha.class);
            startActivity(RecSenha);
        });

        // INSETS (EVITA CORTAR TELA) NÃO SE ATREVA A MEXER, SUJEITO A PAULADA
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });//

        imgOlho.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view)
            {

            }
        });//imagem de mostrar/esconder senha


    }//

    private void Logar()
    {

        //String nome = txtNomeCad.getText().toString().trim();
        String email = txtEmailLogin.getText().toString().trim();
        String senha = txtSenhaLogin.getText().toString();

        if (email.isEmpty() || senha.isEmpty())
        {
            Toast.makeText(this, "Preencha os campos", Toast.LENGTH_LONG).show();
            return;
        }

        auth.signInWithEmailAndPassword(email, senha)
            .addOnSuccessListener(authResult ->
            {
                Toast.makeText(getApplicationContext(), "Login realizado!", Toast.LENGTH_LONG).show();
                Intent i = new Intent(Login.this, Home.class);
                startActivity(i);
                finish();
            })//

            .addOnFailureListener(e ->
            {
                if (e instanceof FirebaseAuthInvalidCredentialsException)
                {
                    Toast.makeText(this, "Senha incorreta", Toast.LENGTH_LONG).show();
                }
                else if (e instanceof FirebaseAuthInvalidUserException)
                {
                    Toast.makeText(this, "Usuário não encontrado", Toast.LENGTH_LONG).show();
                }
                else
                {
                    Toast.makeText(this, "Erro: " + e.getMessage(), Toast.LENGTH_LONG).show();
                }
            });//

    }//

}
