package com.example.powiki.domain.pokemon.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class PokemonDescriptionDTO {

    private Integer id;
    private Integer versionId;
    private String versionName;
    private Integer pokemonSpeciesId;
    private String pokemonSpeciesName;
    private String description;

    private char isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
