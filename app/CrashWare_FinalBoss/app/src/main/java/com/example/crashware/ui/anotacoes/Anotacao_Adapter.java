package com.example.crashware.ui.anotacoes;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.crashware.R;

import java.util.ArrayList;

public class Anotacao_Adapter extends RecyclerView.Adapter<Anotacao_Adapter.ViewHolder>
{

    private ArrayList<Anotacao> lista;
    private OnItemClickListener listener;

    public interface OnItemClickListener
    {
        void onClick(Anotacao anotacao, int position);
    }

    public Anotacao_Adapter(ArrayList<Anotacao> lista, OnItemClickListener listener)
    {
        this.lista = lista;
        this.listener = listener;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType)
    {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_anotacao, parent, false);

        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position)
    {
        Anotacao anotacao = lista.get(position);

        holder.txtTitulo.setText(anotacao.getTitulo());
        holder.txtConteudo.setText(anotacao.getConteudo());

        holder.itemView.setOnClickListener(v -> {
            if (listener != null)
            {
                listener.onClick(anotacao, holder.getAdapterPosition());
            }
        });
    }

    @Override
    public int getItemCount()
    {
        return lista.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder
    {
        TextView txtTitulo;
        TextView txtConteudo;

        public ViewHolder(@NonNull View itemView)
        {
            super(itemView);

            txtTitulo = itemView.findViewById(R.id.txtTitulo);
            txtConteudo = itemView.findViewById(R.id.txtConteudo);
        }
    }
}
