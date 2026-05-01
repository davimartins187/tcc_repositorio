package com.example.crashware.ui.anotacoes;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.crashware.R;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link EditarAnotacao_Fragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class EditarAnotacao_Fragment extends Fragment {

    Button btnEditarAnotacao;

    EditText txtAnotacao;

    Boolean EstadoAnotacao;




    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public EditarAnotacao_Fragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment EditarAnotacao_Fragment.
     */
    // TODO: Rename and change types and number of parameters
    public static EditarAnotacao_Fragment newInstance(String param1, String param2) {
        EditarAnotacao_Fragment fragment = new EditarAnotacao_Fragment();
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
        View view = inflater.inflate(R.layout.fragment_editar_anotacao, container, false);

        txtAnotacao = view.findViewById(R.id.txtAnotacao);
        btnEditarAnotacao = view.findViewById(R.id.btnEditarAnotacao);

        EstadoAnotacao = (false);
        txtAnotacao.setEnabled(false);

        btnEditarAnotacao.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view)
            {


                if (!EstadoAnotacao)
                {
                    txtAnotacao.setEnabled(true);
                    txtAnotacao.requestFocus();


                    btnEditarAnotacao.setText("Concluir");
                    EstadoAnotacao = (true);

                    Toast.makeText(getContext(), "Edite sua Anotação", Toast.LENGTH_LONG).show();

                }//Se Clicar no botão enquanto estiver com o texto trancado, torna editavel

                else
                {
                    txtAnotacao.clearFocus();
                    txtAnotacao.setEnabled(false);
                    btnEditarAnotacao.setText("Editar");
                    EstadoAnotacao = (false);

                    Toast.makeText(getContext(), "Edição Salva! ", Toast.LENGTH_LONG).show();
                }//Senão ou se estiver editavel e clicar torna o texto trancado novamente(Emoji de TOP)

            }
        });//Interação com o botão de Editar/Concluir para alteração da anotação





        return view;
        //
    }
}