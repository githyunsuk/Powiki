package com.example.powiki.domain.pokemon.mapper;

import com.example.powiki.domain.pokemon.model.PokemonDescription;
import com.example.powiki.domain.pokemon.model.PokemonSpecies;
import com.example.powiki.domain.pokemon.model.SpeciesEggMap;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface SpeciesMapper {

    void insertEggGroup(@Param("id") Integer id, @Param("name") String name);

    void insertPokemonSpecies(PokemonSpecies pokemonSpecies);

    void insertPokemonDescription(PokemonDescription pokemonDescription);

    void insertPokemonEggGroup(SpeciesEggMap speciesEgg);
}
