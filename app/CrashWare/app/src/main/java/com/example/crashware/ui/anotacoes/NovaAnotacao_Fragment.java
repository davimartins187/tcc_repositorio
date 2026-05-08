package com.example.crashware.ui.anotacoes;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;

import com.example.crashware.R;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link NovaAnotacao_Fragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class NovaAnotacao_Fragment extends Fragment {

    ImageView imgVoltarNovaAnotacao;

    EditText txtNovaAnotacao, txtTituloNovaAnotacao;

    Button btnSalvarNovaAnotacao;

    String txtNovaAnotacaoSalva, txtTituloNovaAnotacaoSalvo;

    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public NovaAnotacao_Fragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment NovaAnotacao_Fragment.
     */
    // TODO: Rename and change types and number of parameters
    public static NovaAnotacao_Fragment newInstance(String param1, String param2) {
        NovaAnotacao_Fragment fragment = new NovaAnotacao_Fragment();
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
        View view = inflater.inflate(R.layout.fragment_nova_anotacao, container, false);

        imgVoltarNovaAnotacao = view.findViewById(R.id.imgVoltarNovaAnotacao);
        btnSalvarNovaAnotacao = view.findViewById(R.id.btnSalvarNovaAnotacao);
        txtNovaAnotacao       = view.findViewById(R.id.txtNovaAnotacao      );
        txtTituloNovaAnotacao = view.findViewById(R.id.txtTituloNovaAnotacao);






        btnSalvarNovaAnotacao.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v)
            {
                txtNovaAnotacaoSalva = txtNovaAnotacao.getText().toString();
                txtTituloNovaAnotacaoSalvo = txtTituloNovaAnotacao.getText().toString();


                Fragment novoFragmento = new Anotacoes_fragment();

                getParentFragmentManager()
                        .beginTransaction()
                        .replace(R.id.fragment_container, novoFragmento)
                        .addToBackStack(null)
                        .commit();




            }
        });//Interação com botão de salvar nova anotação, levando para a tela geral de anotações e transcrevendo os textos dos EditText para strings a serem salvas no banco

        imgVoltarNovaAnotacao.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v)
            {
                requireActivity()//puxa o fragemnt atual
                        .getSupportFragmentManager()//acessa o gerenciador das fragments
                        .popBackStack();//simula o botão "voltar" do celular

            }
        });//interação de click com a imagem de voltar retornando para a tela de anotações













        return view;
    }
}