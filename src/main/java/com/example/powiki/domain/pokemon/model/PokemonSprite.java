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
public class PokemonSprite {

    private Integer id;
    private Integer pokemonId;
    private String spriteShinyUrl;
    private String artworkShinyUrl;

    private char isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
