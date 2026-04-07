package com.example.powiki.domain.pokemon.mapper;

import com.example.powiki.domain.pokemon.model.PokemonDescriptionDTO;
import com.example.powiki.domain.pokemon.model.PokemonSpeciesDTO;
import com.example.powiki.domain.pokemon.model.SpeciesEggMap;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface SpeciesMapper {

    void insertEggGroup(@Param("id") Integer id, @Param("name") String name);

    void insertPokemonSpecies(PokemonSpeciesDTO pokemonSpecies);

    void insertPokemonDescription(PokemonDescriptionDTO pokemonDescription);

    void insertPokemonEggGroup(SpeciesEggMap speciesEgg);
}
