package com.example.powiki.domain.pokemon.model;

import lombok.Getter;

@Getter
public class PokemonSpeciesInfoDTO {

    private Long speciesId;
    private String name;
    private Integer genderRate;
    private String category;
}
