package com.example.powiki.domain.pokemon.model.entity;

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
public class PokemonDescription {

    private Long id;
    private Long versionId;
    private Long pokemonSpeciesId;

    private String versionName;
    private String pokemonSpeciesName;
    private String description;

    private char isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
