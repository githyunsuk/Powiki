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
public class PokemonAbilityMap {

    private Long id;
    private Long pokemonId;
    private Long abilityId;
    
    private String pokemonName;
    private String abilityName;
    private Integer slot;
    private char isHidden;

    private char isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
