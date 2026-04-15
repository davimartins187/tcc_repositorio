package com.example.crashware;

import android.os.Bundle;
import android.widget.Button;
import android.content.SharedPreferences;
import android.net.Uri;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.TextView;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import com.google.android.material.imageview.ShapeableImageView;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link Inicio_fragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class Inicio_fragment extends Fragment {


    private TextView txtNomeInicio;

    private ShapeableImageView imgfotoInicio;
    private Uri imageUri;

    // Abrir galeria
    private ActivityResultLauncher<String> escolherImagem =
            registerForActivityResult(new ActivityResultContracts.GetContent(), uri -> {
                if (uri != null) {
                    imageUri = uri;
                    imgfotoInicio.setImageURI(uri);
                    salvarImagem(uri);
                }
            });

    private void salvarImagem(Uri uri)
    {
        SharedPreferences prefs = requireContext().getSharedPreferences("perfil", getContext().MODE_PRIVATE);
        prefs.edit().putString("fotoPerfil", uri.toString()).apply();
    }//


    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";


    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    private FirebaseAuth auth;
    private DatabaseReference db;

    public Inicio_fragment() {

        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment Inicio.
     */
    // TODO: Rename and change types and number of parameters
    public static Inicio_fragment newInstance(String param1, String param2) {
        Inicio_fragment fragment = new Inicio_fragment();
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
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_inicio, container, false);


        txtNomeInicio = (TextView) view.findViewById(R.id.txtNomeInicio);
        imgfotoInicio = (ShapeableImageView) view.findViewById(R.id.imgFotoInicio);

        auth = FirebaseAuth.getInstance();
        db = FirebaseDatabase.getInstance().getReference("usuarios");

        carregarNomeFirebase();

        imgfotoInicio.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                escolherImagem.launch("image/*");
            }
        });//Função de clique, executando

        //
        SharedPreferences prefs = requireContext().getSharedPreferences("perfil", getContext().MODE_PRIVATE);
        String uriString = prefs.getString("fotoPerfil", null);

        if (uriString != null)
        {
            imgfotoInicio.setImageURI(Uri.parse(uriString));
            //função que seta a imagem como atual atraves do URI
        }



            return view;
        }//

    private void carregarNomeFirebase() {
        if (auth.getCurrentUser() != null) {

            String uid = auth.getCurrentUser().getUid();

            db.child(uid).get().addOnSuccessListener(snapshot -> {
                if (snapshot.exists()) {

                    String nome = snapshot.child("nome").getValue(String.class);

                    if (nome != null) {
                        txtNomeInicio.setText(nome);
                    }
                }
            }).addOnFailureListener(e -> {
                txtNomeInicio.setText("Erro");
            });
        }
    }
    }
