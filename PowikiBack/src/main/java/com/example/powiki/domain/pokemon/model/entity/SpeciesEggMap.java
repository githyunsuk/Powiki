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
public class SpeciesEggMap {

    private Long id;
    private Long eggGroupId;
    private Long pokemonSpeciesId;

    private String eggGroupName;
    private String pokemonSpeciesName;

    private char isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
