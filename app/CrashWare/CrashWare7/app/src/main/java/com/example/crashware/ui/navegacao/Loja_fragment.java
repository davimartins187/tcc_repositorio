package com.example.crashware.ui.navegacao;

import static android.app.ProgressDialog.show;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.example.crashware.R;


public class Loja_fragment extends Fragment {

    TextView txtComprarTemaMeiaNoite, txtComprarGelo, txtComprarBooster,
            txtComprarOfensiva, txtComprarLeitura;

    int gemas;

    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public Loja_fragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment Loja.
     */
    // TODO: Rename and change types and number of parameters
    public static Loja_fragment newInstance(String param1, String param2) {
        Loja_fragment fragment = new Loja_fragment();
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
        View view = inflater.inflate(R.layout.fragment_loja, container, false);

        txtComprarLeitura       = view.findViewById(R.id.txtComprarLeitura  );
        txtComprarBooster       = view.findViewById(R.id.txtComprarBooster  );
        txtComprarOfensiva      = view.findViewById(R.id.txtComprarOfensiva );
        txtComprarGelo          = view.findViewById(R.id.txtComprarGelo     );
        txtComprarTemaMeiaNoite = view.findViewById(R.id.txtComprarMeiaNoite);

        Toast temaAdquirido     = Toast.makeText(getContext(), "Tema Adquirido    ", Toast.LENGTH_LONG);
        Toast SaldoInsuficiente = Toast.makeText(getContext(), "Saldo Insuficiente", Toast.LENGTH_LONG);
        Toast PowerUpAdquirido = Toast.makeText(getContext(), "PowerUp Adquirido  ", Toast.LENGTH_LONG);

        gemas = 5500;


        txtComprarTemaMeiaNoite.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                if (gemas>=1500)
                {
                    gemas= gemas - 1500;
                    temaAdquirido.show();
                    txtComprarTemaMeiaNoite.setText("Adquirido");
                    txtComprarGelo.setEnabled(false);
                }//Se o usuário possuir 1500 ou mais gemas, prossegue com a compra

                else
                {
                    SaldoInsuficiente.show();
                }//Senão retorna saldo insuficiente

            }
        });//

        txtComprarGelo.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                if (gemas>=1500)
                {
                    gemas= gemas - 1500;
                    temaAdquirido.show();
                    txtComprarGelo.setText("Adquirido");
                    txtComprarGelo.setEnabled(false);
                }//Se o usuário possuir 1500 ou mais gemas, prossegue com a compra

                else
                {
                    SaldoInsuficiente.show();
                }//Senão retorna saldo insuficiente

            }
        });//

        txtComprarLeitura.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view)
            {
                if (gemas>=1500)
                {
                    gemas= gemas - 1500;
                    temaAdquirido.show();
                    txtComprarLeitura.setText("Adquirido");
                    txtComprarLeitura.setEnabled(false);
                }//Se o usuário possuir 1500 ou mais gemas, prossegue com a compra

                else
                {
                    SaldoInsuficiente.show();
                }//Senão retorna saldo insuficiente

            }
        });//

        txtComprarBooster.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view)
            {
                if (gemas>=600)
                {
                    gemas= gemas - 600;
                    PowerUpAdquirido.show();
                    //txtComprarBooster.setText("Adquirido");
                }//Se o usuário possuir 400 ou mais gemas, prossegue com a compra

                else
                {
                    SaldoInsuficiente.show();
                }//Senão retorna saldo insuficiente

            }
        });//

        txtComprarOfensiva.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view)
            {
                if (gemas>=600)
                {
                    gemas= gemas - 600;
                    PowerUpAdquirido.show();
                    //txtComprarBooster.setText("Adquirido");
                }//Se o usuário possuir 600 ou mais gemas, prossegue com a compra

                else
                {
                    SaldoInsuficiente.show();
                }//Senão retorna saldo insuficiente


            }
        });//


        return view;
    }
}