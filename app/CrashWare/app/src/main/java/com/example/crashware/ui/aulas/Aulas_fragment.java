package com.example.crashware.ui.aulas;

import android.os.Bundle;
import androidx.fragment.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import com.example.crashware.R;
import com.example.crashware.ui.navegacao.Home;

public class Aulas_fragment extends Fragment {

    Button btnExplorarH, btnExplorarS;

    public Aulas_fragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Infla o layout para este fragmento
        View view = inflater.inflate(R.layout.fragment_aulas, container, false);

        btnExplorarH = view.findViewById(R.id.btnExplorarH);
        btnExplorarS = view.findViewById(R.id.btnExplorarS);

        // Ação do botão SOFTWARE
        btnExplorarS.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Verificamos se a Activity é a nossa Home e chamamos o método de lá
                if (getActivity() instanceof Home) {
                    ((Home) getActivity()).irParaTelaExtra(new ModuloSoftware_Fragment());
                }
            }
        });

        // Ação do botão HARDWARE
        btnExplorarH.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Verificamos se a Activity é a nossa Home e chamamos o método de lá
                if (getActivity() instanceof Home) {
                    ((Home) getActivity()).irParaTelaExtra(new ModuloHardware_Fragment());
                }
            }
        });

        return view;
    }
}