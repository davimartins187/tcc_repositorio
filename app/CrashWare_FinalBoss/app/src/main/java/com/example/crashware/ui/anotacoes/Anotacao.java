package com.example.crashware.ui.anotacoes;

public class Anotacao
{
    private String titulo;
    private String conteudo;

    // CONSTRUTOR
    public Anotacao(String titulo, String conteudo)
    {
        this.titulo = titulo;
        this.conteudo = conteudo;
    }

    // GETTERS
    public String getTitulo()
    {
        return titulo;
    }

    public String getConteudo()
    {
        return conteudo;
    }
}
