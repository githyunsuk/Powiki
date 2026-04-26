package com.example.powiki.domain.pokemon.service;

import com.example.powiki.domain.pokemon.model.response.PokemonDetailResponse;
import com.example.powiki.domain.pokemon.model.response.PokemonListResponse;

import java.util.List;

public interface PokemonService {

    public List<PokemonListResponse> retrievePokemonList();

    public PokemonDetailResponse retrievePokemonDetail(Long pokemonId);
}
