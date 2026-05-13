package com.example.crashware.ui.sistemas;

import android.content.Context;
import android.content.SharedPreferences;

import java.util.Calendar;

public class Ofensiva_Manager {

    private final SharedPreferences prefs;

    // =========================
    // CHAVES
    // =========================

    private static final String KEY_OFENSIVA       = "ofensiva";
    private static final String KEY_ULTIMO_DIA     = "ultimo_dia";
    private static final String KEY_CONGELAMENTOS  = "congelamentos";

    public Ofensiva_Manager(Context context) {

        prefs = context.getSharedPreferences(
                "CrashWare",
                Context.MODE_PRIVATE
        );
    }

    // =========================
    // VERIFICAR OFENSIVA
    // =========================

    public int verificarOfensiva() {

        int ofensivaAtual = prefs.getInt(KEY_OFENSIVA, 0);

        long ultimoDiaSalvo = prefs.getLong(KEY_ULTIMO_DIA, -1);

        Calendar hoje = Calendar.getInstance();

        // Remove horas/minutos/segundos
        hoje.set(Calendar.HOUR_OF_DAY, 0);
        hoje.set(Calendar.MINUTE, 0);
        hoje.set(Calendar.SECOND, 0);
        hoje.set(Calendar.MILLISECOND, 0);

        long hojeMillis = hoje.getTimeInMillis();

        // Primeiro acesso
        if (ultimoDiaSalvo == -1) {

            ofensivaAtual = 1;

            prefs.edit()
                    .putInt(KEY_OFENSIVA, ofensivaAtual)
                    .putLong(KEY_ULTIMO_DIA, hojeMillis)
                    .apply();

            return ofensivaAtual;
        }

        long diferenca = hojeMillis - ultimoDiaSalvo;

        long UM_DIA = 24 * 60 * 60 * 1000L;

        long dias = diferenca / UM_DIA;

        // =========================
        // ENTROU NO DIA SEGUINTE
        // =========================

        if (dias == 1) {

            ofensivaAtual++;

            prefs.edit()
                    .putInt(KEY_OFENSIVA, ofensivaAtual)
                    .putLong(KEY_ULTIMO_DIA, hojeMillis)
                    .apply();
        }

        // =========================
        // PERDEU 1 DIA
        // (usa congelamento)
        // =========================

        else if (dias == 2) {

            int congelamentos = prefs.getInt(KEY_CONGELAMENTOS, 0);

            // Usa congelamento
            if (congelamentos > 0) {

                congelamentos--;

                prefs.edit()
                        .putInt(KEY_CONGELAMENTOS, congelamentos)
                        .putLong(KEY_ULTIMO_DIA, hojeMillis)
                        .apply();
            }

            // Sem congelamento = perde ofensiva
            else {

                ofensivaAtual = 1;

                prefs.edit()
                        .putInt(KEY_OFENSIVA, ofensivaAtual)
                        .putLong(KEY_ULTIMO_DIA, hojeMillis)
                        .apply();
            }
        }

        // =========================
        // PERDEU MAIS DE 1 DIA
        // =========================

        else if (dias > 2) {

            ofensivaAtual = 1;

            prefs.edit()
                    .putInt(KEY_OFENSIVA, ofensivaAtual)
                    .putLong(KEY_ULTIMO_DIA, hojeMillis)
                    .apply();
        }

        return ofensivaAtual;
    }

    // =========================
    // COMPRAR CONGELAMENTO
    // =========================

    public void adicionarCongelamento() {

        int congelamentos = prefs.getInt(KEY_CONGELAMENTOS, 0);

        prefs.edit()
                .putInt(KEY_CONGELAMENTOS, congelamentos + 1)
                .apply();
    }

    // =========================
    // REMOVER CONGELAMENTO
    // =========================

    public void removerCongelamento() {

        int congelamentos = prefs.getInt(KEY_CONGELAMENTOS, 0);

        if (congelamentos > 0) {

            prefs.edit()
                    .putInt(KEY_CONGELAMENTOS, congelamentos - 1)
                    .apply();
        }
    }

    // =========================
    // PEGAR OFENSIVA
    // =========================

    public int getOfensiva() {

        return prefs.getInt(KEY_OFENSIVA, 1);
    }

    // =========================
    // PEGAR CONGELAMENTOS
    // =========================

    public int getCongelamentos() {

        return prefs.getInt(KEY_CONGELAMENTOS, 0);
    }

    // =========================
    // RESETAR OFENSIVA
    // =========================

    public void resetarOfensiva() {

        prefs.edit()
                .putInt(KEY_OFENSIVA, 1)
                .apply();
    }
}


//COLOCAR DEPOIS NO INICIO_FRAGMENT- ONCREATEVIEW

//Chamar função Ofensiva
//Ofensiva_Manager ofensivaManager =
//        new Ofensiva_Manager(requireContext());
//
//int ofensiva = ofensivaManager.verificarOfensiva();
//
//        txtOfensiva.setText(ofensiva + " dias");
