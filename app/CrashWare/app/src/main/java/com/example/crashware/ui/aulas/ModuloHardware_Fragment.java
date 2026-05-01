package com.example.crashware.ui.aulas;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.crashware.R;

public class ModuloHardware_Fragment extends Fragment {

    private ImageView imgLivro1M1,imgLivro2M1,imgLivro1M2,imgLivro2M2,imgLivro3M2,imgLivro4M2,imgLivro5M2,imgLivro6M2,imgLivro7M2,imgLivro8M2;

    TextView txtTituloAula1M1, txtTituloAula2M1,txtTituloAula1M2,txtTituloAula2M2,txtTituloAula3M2,txtTituloAula4M2,
            txtTituloAula1M3H,txtTituloAula2M3H,txtTituloAula3M3H, txtTituloAula4M3H, txtTituloAula5M3H, txtTituloAula6M3H;


    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public ModuloHardware_Fragment() {
        // Required empty public constructor
    }


    // TODO: Rename and change types and number of parameters
    public static ModuloHardware_Fragment newInstance(String param1, String param2) {
        ModuloHardware_Fragment fragment = new ModuloHardware_Fragment();
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
        View view = inflater.inflate(R.layout.fragment_modulo_hardware, container, false);

        txtTituloAula1M1  = view.findViewById(R.id.txtTituloAula1M1H);
        txtTituloAula2M1  = view.findViewById(R.id.txtTituloAula2M1H);
        txtTituloAula1M2  = view.findViewById(R.id.txtTituloAula1M2H);
        txtTituloAula2M2  = view.findViewById(R.id.txtTituloAula2M2H);
        txtTituloAula3M2  = view.findViewById(R.id.txtTituloAula3M2H);
        txtTituloAula4M2  = view.findViewById(R.id.txtTituloAula4M2H);
        txtTituloAula1M3H = view.findViewById(R.id.txtTituloAula1M3H);
        txtTituloAula2M3H = view.findViewById(R.id.txtTituloAula2M3H);
        txtTituloAula3M3H = view.findViewById(R.id.txtTituloAula3M3H);
        txtTituloAula4M3H = view.findViewById(R.id.txtTituloAula4M3H);
        txtTituloAula5M3H = view.findViewById(R.id.txtTituloAula5M3H);
        txtTituloAula6M3H = view.findViewById(R.id.txtTituloAula6M3H);


        return view;
    }
}