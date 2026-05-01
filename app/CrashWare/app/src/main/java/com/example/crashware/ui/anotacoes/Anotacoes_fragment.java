package com.example.crashware.ui.anotacoes;

import android.os.Bundle;

import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ImageView;

import com.example.crashware.ui.navegacao.Inicio_fragment;
import com.example.crashware.R;


public class Anotacoes_fragment extends Fragment {

    EditText txtbarraPesquisa;

    ConstraintLayout cardAnotacao1,cardAnotacao2,cardAnotacao3;

    ImageView imgAddAnotacoes, imgLayoutLogo;



    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    //
    public Anotacoes_fragment()
    {
        // Required empty public constructor
    }
    //

    // TODO: Rename and change types and number of parameters
    public static Anotacoes_fragment newInstance(String param1, String param2) {
        Anotacoes_fragment fragment = new Anotacoes_fragment();
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
        View view = inflater.inflate(R.layout.fragment_anotacoes, container, false);

        imgAddAnotacoes  = view.findViewById(R.id.imgAddAnotacoes );
        txtbarraPesquisa = view.findViewById(R.id.txtBarraPesquisa);
        cardAnotacao1    = view.findViewById(R.id.cardAnotacao1   );
        cardAnotacao2    = view.findViewById(R.id.cardAnotacao2   );
        cardAnotacao3    = view.findViewById(R.id.cardAnotacao3   );
        imgLayoutLogo    = view.findViewById(R.id.imgLayoutLogo   );

        imgAddAnotacoes.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v)
            {
                Fragment novoFragmento = new NovaAnotacao_Fragment();

                getParentFragmentManager()
                        .beginTransaction()
                        .replace(R.id.fragment_container, novoFragmento)
                        .addToBackStack(null)
                        .commit();
            }
        });//Interação com a imagem, levando a tela de adicionar nova anotação

        cardAnotacao1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v)
            {
                Fragment EditarFragmento = new EditarAnotacao_Fragment();

                getParentFragmentManager()
                        .beginTransaction()
                        .replace(R.id.fragment_container, EditarFragmento)
                        .addToBackStack(null)
                        .commit();
            }
        });//Interação com a imagem, levando a tela de editar anotação

        cardAnotacao2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v)
            {
                Fragment EditarFragmento = new EditarAnotacao_Fragment();

                getParentFragmentManager()
                        .beginTransaction()
                        .replace(R.id.fragment_container, EditarFragmento)
                        .addToBackStack(null)
                        .commit();
            }
        });//Interação com a imagem, levando a tela de editar anotação

        cardAnotacao3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v)
            {
                Fragment EditarFragmento = new EditarAnotacao_Fragment();

                getParentFragmentManager()
                        .beginTransaction()
                        .replace(R.id.fragment_container, EditarFragmento)
                        .addToBackStack(null)
                        .commit();
            }
        });//Interação com a imagem, levando a tela de editar anotação

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
        });//


        return view;

    }



    private FragmentManager getSupportFragmentManager()
    {

        return null;
    }//
}