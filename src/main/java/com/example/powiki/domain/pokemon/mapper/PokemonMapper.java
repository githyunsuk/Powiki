package com.example.powiki.domain.pokemon.mapper;

import com.example.powiki.domain.pokemon.model.PokemonAbilityMap;
import com.example.powiki.domain.pokemon.model.Pokemon;
import com.example.powiki.domain.pokemon.model.PokemonSprite;
import com.example.powiki.domain.pokemon.model.PokemonTypeMap;
import com.example.powiki.domain.pokemon.model.response.PokemonListResponse;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PokemonMapper {

    void insertPokemonAbility(PokemonAbilityMap pokemonAbility);

    void insertPokemonSprite(PokemonSprite pokemonSprite);

    void insertPokemonType(PokemonTypeMap pokemonType);

    void insertPokemon(Pokemon pokemon);

    List<PokemonListResponse> selectPokemonList();
}
