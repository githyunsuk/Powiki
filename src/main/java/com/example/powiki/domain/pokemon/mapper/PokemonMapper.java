package com.example.powiki.domain.pokemon.mapper;

import com.example.powiki.domain.pokemon.model.PokemonAbilityMapDTO;
import com.example.powiki.domain.pokemon.model.PokemonDTO;
import com.example.powiki.domain.pokemon.model.PokemonSpriteDTO;
import com.example.powiki.domain.pokemon.model.PokemonTypeMapDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PokemonMapper {

    void insertPokemonAbility(PokemonAbilityMapDTO pokemonAbility);

    void insertPokemonSprite(PokemonSpriteDTO pokemonSprite);

    void insertPokemonType(PokemonTypeMapDTO pokemonType);

    void insertPokemon(PokemonDTO pokemon);
}
