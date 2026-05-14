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
public class Pokemon {

    private Long id;
    private Long pokemonSpeciesId;

    private Integer sortOrder;
    private String name;
    private String mainArtworkUrl;
    private String mainSpriteUrl;
    private String cries;
    private Integer height;
    private Integer weight;

    private Integer hp;
    private Integer attack;
    private Integer defense;
    private Integer specialAttack;
    private Integer specialDefense;
    private Integer speed;

    private char isDefault;
    private char isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
