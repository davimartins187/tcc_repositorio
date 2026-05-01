package com.example.crashware.ui.senha;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.crashware.ui.navegacao.Home;
import com.example.crashware.ui.login.Login;
import com.example.crashware.R;

public class RecuperarSenha extends AppCompatActivity {

    Button btnRecSenha;

    RadioButton rdbEmail, rdbTelefone;

    TextView txtEntrarLembrou;

    EditText  txtEmailRec;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.recuperar_senha);


        //Iniciando o layout no código
        btnRecSenha       = findViewById(R.id.btnRecSenha     );
        rdbEmail          = findViewById(R.id.radioEmail      );
        rdbTelefone       = findViewById(R.id.radioTelefone   );
        txtEntrarLembrou  = findViewById(R.id.txtEntrarLembrou);
        txtEmailRec       = findViewById(R.id.txtEmailRec     );


        txtEmailRec.setHint("Escolha a forma de recuperação");

        rdbEmail.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(@NonNull CompoundButton compoundButton, boolean estado)
            {
                if (estado)
                {
                    txtEmailRec.setHint("Digite Email para recuperação");
                    txtEmailRec.setText("");
                }
            }
        });//Se radioButton email estiver selecionado muda o hint para tal e limpa a caixa de texto

        rdbTelefone.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(@NonNull CompoundButton compoundButton, boolean estado)
            {
             if (estado)
             {
                 txtEmailRec.setHint("Digite Telefone para recuperação");
                 txtEmailRec.setText("");
             }

            }
        });//Se radioButton Telefone estiver selecionado muda o hint para tal e limpa a caixa de texto



        btnRecSenha.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v)
            {
                RecSenha();

            }
        });// Interação de clique com o botão de recuperar senha que deverá encaminhar email ou SMS para alteração da senha cadastrada

        txtEntrarLembrou.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view)
            {
                Intent lembrou =
                        new Intent(RecuperarSenha.this, Login.class);
                startActivity(lembrou);

                finish();//fecha esta tela após passar para a próxima

            }
        });









        //
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main3), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
        //
    }

    private void RecTelefone()
    {

    }//Recuperação caso o rdb de Telefone esteja checado

    private void RecEmail()
    {

    }//Recuperação caso o rdb de email esteja marcado

    private void RecSenha()
    {
            String valor = txtEmailRec.getText().toString().trim();

            if (valor.isEmpty())
            {
                txtEmailRec.setError("Preencha o campo");
                return;
            }// se o campo de digitação estiver vazio não avança

            if (rdbEmail.isChecked())
            {

                Intent intent = new Intent(RecuperarSenha.this, EnvioCodigo_Senha.class);
                intent.putExtra("email_usuario", valor);
                startActivity(intent);
                finish();//fecha esta tela após passar para a próxima

            }// se o email estiver escolhido, trata como Email e avança de tela

            else if (rdbTelefone.isChecked())
            {

                // Aqui futuramente pode mandar para outra tela ou API que envie SMS
                txtEmailRec.setError("Recuperação por telefone ainda não implementada");

            }//se telefone estiver marcado trata com telefone

            else
            {
                txtEmailRec.setError("Escolha uma opção");
            }//se nada funcionar trata como erro de obtenção do valor

    }//De algum modo, programar um envio de email ou sms
}