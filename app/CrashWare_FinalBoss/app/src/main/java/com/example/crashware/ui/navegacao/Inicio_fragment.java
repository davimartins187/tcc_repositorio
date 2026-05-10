package com.example.crashware.ui.navegacao;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.fragment.app.Fragment;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.example.crashware.R;
import com.example.crashware.ui.api.Auth;
import com.example.crashware.ui.api.User;

import com.example.crashware.ui.aulas.ModuloHardware;
import com.example.crashware.ui.aulas.ModuloSoftware;
import com.google.android.material.imageview.ShapeableImageView;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import android.widget.ImageView;
import android.widget.Toast;

public class Inicio_fragment extends Fragment {

    private TextView txtNomeInicio, txtAulasConcluidas, txtOfensiva, txtNivelInicio, txtXpInicio;
    private ShapeableImageView imgfotoInicio;

    private ActivityResultLauncher<String[]> escolherImagem;

    private FirebaseAuth auth;
    private DatabaseReference db;

    private ValueEventListener nomeListener;

    ProgressBar BarraProgressoNivel;

    ConstraintLayout btnRetomarS, btnRetomarH;

    //Memória do app
    SharedPreferences prefs;

    Button btnRetomar;

    int XpParaBarra = 350;

    int nivel = 1;




    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);

        prefs = requireContext().getSharedPreferences("CrashWare", Context.MODE_PRIVATE);

        //Coleto as informações do usuário
        Perfil();



        //Verificando Token
        Verificar_Token();



        auth = FirebaseAuth.getInstance();
        db = FirebaseDatabase.getInstance().getReference("usuarios");
        //Carrega a imagem sempre que for para essa tela

    }



//        escolherImagem = registerForActivityResult(
//                new ActivityResultContracts.OpenDocument(),
//                uri -> {
//                    if (uri == null || !isAdded()) return;
//
//                    requireContext().getContentResolver().takePersistableUriPermission(
//                            uri,
//                            Intent.FLAG_GRANT_READ_URI_PERMISSION
//                    );
//
////                    setImage(uri);
//                }
//        );//função que salva a imagem escolhida para a variavel "uri"



    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container,
                             Bundle savedInstanceState) {



        //variável que torna possivel utilizar elementos do design no código
        View view = inflater.inflate(R.layout.fragment_inicio, container, false);

        //iniciando os elementos através do view
        txtNomeInicio       = view.findViewById(R.id.txtNomeInicio           );
        imgfotoInicio       = view.findViewById(R.id.imgFotoInicio           );
        txtAulasConcluidas  = view.findViewById(R.id.txtNumeroAulasConcluidas);
        txtOfensiva         = view.findViewById(R.id.txtDiasConsecutivos     );
        btnRetomarH         = view.findViewById(R.id.btnRetomarH             );
        btnRetomarS         = view.findViewById(R.id.btnRetomarS             );
        txtNivelInicio      = view.findViewById(R.id.txtNivelInicio          );
        BarraProgressoNivel = view.findViewById(R.id.BarraProgressoNivel     );
        btnRetomar          = view.findViewById(R.id.btnRetomar              );
        txtXpInicio         = view.findViewById(R.id.txtXPInicio             );



        //funções que vão ser utilizadas
        carregarNomeFirebase();
        //Carrego a imagem
        carregarImagem();


        btnRetomar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view)
            {
                BarraXp();

            }
        });



//        txtOfensiva.setText(Ofensiva);
//        txtAulasConcluidas.setText(AulasConcluidas);


//        imgfotoInicio.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view)
//            {
//                escolherImagem.launch(new String[]{"image/*"});
//            }
//        });//interação com a foto de inicio, alterando e executando a foto escolhida como atual

        btnRetomarS.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view)
            {
                Intent Software = new Intent(getActivity(), ModuloSoftware.class);
                startActivity(Software);
            }
        });//

        btnRetomarH.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view)
            {
                Intent Hardware = new Intent(getActivity(), ModuloHardware.class);
                startActivity(Hardware);


            }
        });//



        // retorna váriavel que mostra a tela do fragmento
        return view;
        //


    }

    private void PassarNivel()
    {
        nivel++;

        txtNivelInicio.setText("Nivel " + nivel);

        BarraProgressoNivel.setProgress(0);

        String XpAtual = XpParaBarra + "/" + BarraProgressoNivel.getMax() + "XP";
        txtXpInicio.setText(XpAtual);
    }

    private void BarraXp()
    {


        XpParaBarra += 50;

        while (XpParaBarra >= BarraProgressoNivel.getMax())
        {
            XpParaBarra -= BarraProgressoNivel.getMax();
            PassarNivel();
        }

        BarraProgressoNivel.setProgress(XpParaBarra);

        String XpAtual = XpParaBarra + "/" + BarraProgressoNivel.getMax() + "XP";
        txtXpInicio.setText(XpAtual);

    }

    //Função de verificar token
    private void Verificar_Token(){

        Auth.verificarToken(requireContext(),prefs,true);

    }//verificar token

    private void Perfil(){
        //Coleto os dados no banco de dados do usuario
        User.Perfil(requireContext(), prefs, new User.PerfilCallback() {
            @Override
            public void sucesso(User.PerfilResponse usuario) {

                String nome = usuario.nome;
                // int nivel = usuario.nivel;

                String foto = usuario.foto;

                //Salvo a foto no Shared Preferences
                prefs.edit()
                        .putString("foto", foto)
                        .apply();



                //Atualiza o Nome
                txtNomeInicio.setText(nome);

                //txtNivelInicio.setText(nivel);

            }
        });
    }


    //função que altera foto
//    private void setImage(Uri uri) {
//        if (!isAdded()) return;
//
//
//
//        //Pego a foto do banco
//        String foto = prefs.getString("foto", null);
//
//        //Verifico se vai adicionar ou alterar
//        if("default.png".equals(foto))
//        {
//            //Add a foto
//            Toast.makeText(getContext(), "Adicionando Foto..", Toast.LENGTH_LONG).show();
//            User.Adicionar_Foto(requireContext(),prefs,uri,imgfotoInicio);
//
//        }else
//        {
//            //Altero a foto
//            Toast.makeText(getContext(), "Alterando Foto..", Toast.LENGTH_LONG).show();
//            User.Alterar_Foto(requireContext(),prefs,uri,imgfotoInicio);
//        }



        //imgfotoInicio.setImageURI(uri);

//        // salva apenas enquanto app estiver instalado (persistente do Android)
//        requireContext().getContentResolver().takePersistableUriPermission(
//                uri,
//                Intent.FLAG_GRANT_READ_URI_PERMISSION
//        );



//        getContext()
//                .getSharedPreferences("perfil", 0)
//                .edit()
//                .putString("fotoPerfil", uri.toString())
//                .apply();
//    }

    private void carregarImagem() {
        if (!isAdded()) return;

        //Pego a foto no  sharedPrefrences
        String fotoPerfil = prefs.getString("foto", null);


        //Salvo o link da foto
        String link_foto =  "https://yegrosiecwjebeetlwwg.supabase.co/storage/v1/object/public/FOTOS/"
                + fotoPerfil
                + "?t=" + System.currentTimeMillis();

        //Carrega a foto atual do usuario
        Glide.with(requireContext())
                .load(link_foto)
                .skipMemoryCache(true)
                .diskCacheStrategy(DiskCacheStrategy.NONE)
                .into(imgfotoInicio);

//        String uriString = requireContext()
//                .getSharedPreferences("perfil", 0)
//                .getString("fotoPerfil", null);
//
//        if (uriString != null) {
//            try {
//                imgfotoInicio.setImageURI(Uri.parse(uriString));
//            } catch (Exception ignored) {
//                // se falhar, apenas ignora
//            }
//        }
    }

    // =========================
    // FIREBASE (NOME)
    // =========================

    private void carregarNomeFirebase() {
        if (auth.getCurrentUser() == null) return;

        String uid = auth.getCurrentUser().getUid();

        nomeListener = new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (!isAdded()) return;

                if (snapshot.exists()) {
//                    String nome_firebase = snapshot.child("nome").getValue(String.class);
//                    txtNomeInicio.setText(nome_firebase != null ? nome_firebase : "Sem nome");

                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                if (isAdded()) {
                    txtNomeInicio.setText("Erro");
                }
            }
        };

        db.child(uid).addValueEventListener(nomeListener);
    }

    // =========================
    // CLEANUP
    // =========================

    @Override
    public void onDestroyView() {
        super.onDestroyView();

        if (auth.getCurrentUser() != null && nomeListener != null) {
            db.child(auth.getCurrentUser().getUid())
                    .removeEventListener(nomeListener);
        }

        txtNomeInicio = null;
        imgfotoInicio = null;
    }
}