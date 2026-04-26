package com.example.powiki.domain.pokemon.mapper;

import com.example.powiki.domain.pokemon.model.PokemonAbilityInfoDTO;
import com.example.powiki.domain.pokemon.model.PokemonBasicInfoDTO;
import com.example.powiki.domain.pokemon.model.PokemonNavInfoDTO;
import com.example.powiki.domain.pokemon.model.PokemonTypeInfoDTO;
import com.example.powiki.domain.pokemon.model.entity.PokemonAbilityMap;
import com.example.powiki.domain.pokemon.model.entity.Pokemon;
import com.example.powiki.domain.pokemon.model.entity.PokemonSprite;
import com.example.powiki.domain.pokemon.model.entity.PokemonTypeMap;
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

    PokemonBasicInfoDTO selectPokemonBasicInfo(Long id);

    List<PokemonTypeInfoDTO> selectPokemonTypeInfo(Long id);

    List<PokemonAbilityInfoDTO> selectPokemonAbilityInfo(Long id);

    PokemonNavInfoDTO selectPrevPokemon(Long currentId);

    PokemonNavInfoDTO selectNextPokemon(Long currentId);
}
