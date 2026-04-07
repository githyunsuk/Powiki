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
public class SpeciesEggMap {

    private Integer id;
    private Integer eggGroupId;
    private Integer pokemonSpeciesId;
    private String eggGroupName;
    private String pokemonSpeciesName;

    private char isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
