package com.example.powiki.domain.pokemon.mapper;

import com.example.powiki.domain.pokemon.model.entity.PokemonDescription;
import com.example.powiki.domain.pokemon.model.entity.PokemonSpecies;
import com.example.powiki.domain.pokemon.model.entity.SpeciesEggMap;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SpeciesMapper {

    void insertEggGroup(@Param("id") Integer id, @Param("name") String name);

    void insertPokemonSpecies(PokemonSpecies pokemonSpecies);

    void insertPokemonDescription(PokemonDescription pokemonDescription);

    void insertPokemonEggGroup(SpeciesEggMap speciesEgg);

    List<String> selectPokemonEggGroupNames(Long pokemonSpeciesId);

    String selectPokemonDescriptionInfo(Long pokemonId);
}
