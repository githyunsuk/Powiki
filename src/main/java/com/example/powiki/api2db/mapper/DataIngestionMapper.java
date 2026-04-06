package com.example.powiki.api2db.mapper;

import com.example.powiki.api2db.model.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface DataIngestionMapper {

    void insertVersion(VersionApiDTO versionApi);

    void insertType(TypeApiDTO typeApi);

    void insertTypeEfficacy(TypeEfficacyDTO typeEfficacy);

    void insertEggGroup(@Param("id") Integer id, @Param("name") String name);

    void ingestAbility(AbilityApiDTO ability);

    void insertPokemonAbility(PokemonAbilityMapDTO pokemonAbility);

    void insertPokemonSprite(PokemonSpriteDTO pokemonSprite);

    void insertPokemonType(PokemonTypeMapDTO pokemonType);

    void insertPokemonSpecies(PokemonSpeciesDTO pokemonSpecies);

    void insertPokemonDescription(PokemonDescriptionDTO pokemonDescription);

    void insertPokemonEggGroup(SpeciesEggMap speciesEgg);

    void insertPokemon(PokemonDTO pokemon);
}
