package com.example.crashware.ui.perfil;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;

import androidx.activity.result.ActivityResultLauncher;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;


import com.example.crashware.R;
import com.example.crashware.ui.navegacao.Inicio_fragment;
import com.google.android.material.imageview.ShapeableImageView;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DatabaseReference;
import androidx.activity.result.contract.ActivityResultContracts;

public class Perfil_Fragment extends Fragment {

    TextView txtQuantDiasSeguidos,txtNomePerfil, txtQuantXP,txtPatente,txtQuantGemas, txtVerTodasConquistas;

    ImageView imgConfigPerfil, imgLayoutLogo, imgMudarFotoBanner,imgMudarFotoPerfil;

    ShapeableImageView imgFotoPerfil, imgBanner;

    private ActivityResultLauncher<String[]> escolherImagem;

    private FirebaseAuth auth;
    private DatabaseReference db;

    private String tipoImagem = ""; // "perfil" ou "banner"




    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public Perfil_Fragment()
    {
        // Required empty public constructor
    }

    // TODO: Rename and change types and number of parameters
    public static Perfil_Fragment newInstance(String param1, String param2) {
        Perfil_Fragment fragment = new Perfil_Fragment();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);


        }

        escolherImagem = registerForActivityResult(
                new ActivityResultContracts.OpenDocument(),
                uri -> {
                    if (uri != null) {
                        setImage(uri);
                    }
                }
        );
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_perfil, container, false);

        txtNomePerfil         = view.findViewById(R.id.txtNomePerfil        );
        txtPatente            = view.findViewById(R.id.txtPatente           );
        txtQuantGemas         = view.findViewById(R.id.txtQuantGemas        );
        txtQuantXP            = view.findViewById(R.id.txtQuantXP           );
        txtQuantDiasSeguidos  = view.findViewById(R.id.txtQuantDiasSeguidos );
        txtVerTodasConquistas = view.findViewById(R.id.txtVerTodasConquistas);
        imgFotoPerfil         = view.findViewById(R.id.imgFotoPerfil        );
        imgConfigPerfil       = view.findViewById(R.id.imgConfigPerfil      );
        imgLayoutLogo         = view.findViewById(R.id.imgLayoutLogo        );
        imgMudarFotoBanner    = view.findViewById(R.id.imgMudarFotoBanner   );
        imgMudarFotoPerfil    = view.findViewById(R.id.imgMudarFotoPerfil   );
        imgBanner             = view.findViewById(R.id.imgBanner            );



//        txtNomePerfil.setText(Nome);
//        txtPatente.setText(Patente);
//        txtQuantDiasSeguidos.setText(Ofensiva);
//        txtQuantXP.setText(XP);
//        txtQuantGemas.setText(Gemas);

        txtVerTodasConquistas.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v)
            {
                Fragment conquistasFragmento = new Conquistas_Fragment();

                getParentFragmentManager()
                        .beginTransaction()
                        .replace(R.id.fragment_container, conquistasFragmento)
                        .addToBackStack(null)
                        .commit();

            }
        });// interação com o texto que leva para a tela com todas as conquistas

        imgConfigPerfil.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v)
            {
                Fragment novoFragmento = new Configuracoes_Fragment();

                getParentFragmentManager()
                        .beginTransaction()
                        .replace(R.id.fragment_container, novoFragmento)
                        .addToBackStack(null)
                        .commit();
            }
        });// interação com a imagem que leva para a tela de configurações

        imgLayoutLogo.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v)
            {
                Fragment novoFragmento = new Inicio_fragment();

                getParentFragmentManager()
                        .beginTransaction()
                        .replace(R.id.fragment_container, novoFragmento)
                        .addToBackStack(null)
                        .commit();
            }
        });// interação com a imagem que leva de volta para a home/tela de inicio



        imgMudarFotoPerfil.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v)
            {
                tipoImagem = "perfil";
                escolherImagem.launch(new String[]{"image/*"});

            }
        });//

        imgMudarFotoBanner.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v)
            {
                tipoImagem = "banner";
                escolherImagem.launch(new String[]{"image/*"});

            }
        });//

        carregarImagemLocal();

        return view;


    }

    private void setImage(Uri uri) {
        if (!isAdded()) return;

        // Permissão persistente
        requireContext().getContentResolver().takePersistableUriPermission(
                uri,
                Intent.FLAG_GRANT_READ_URI_PERMISSION
        );

        if (tipoImagem.equals("perfil")) {

            imgFotoPerfil.setImageURI(uri);

            requireContext()
                    .getSharedPreferences("perfil", 0)
                    .edit()
                    .putString("fotoPerfil", uri.toString())
                    .apply();

        } else if (tipoImagem.equals("banner")) {

            imgBanner.setImageURI(uri);

            requireContext()
                    .getSharedPreferences("perfil", 0)
                    .edit()
                    .putString("fotoBanner", uri.toString())
                    .apply();
        }
    }

    private void carregarImagemLocal() {
        if (!isAdded()) return;

        // FOTO PERFIL
        String uriPerfil = requireContext()
                .getSharedPreferences("perfil", 0)
                .getString("fotoPerfil", null);

        if (uriPerfil != null) {
            try {
                imgFotoPerfil.setImageURI(Uri.parse(uriPerfil));
            } catch (Exception ignored) {}
        }

        // BANNER
        String uriBanner = requireContext()
                .getSharedPreferences("perfil", 0)
                .getString("fotoBanner", null);

        if (uriBanner != null) {
            try {
                imgBanner.setImageURI(Uri.parse(uriBanner));
            } catch (Exception ignored) {}
        }
    }




}