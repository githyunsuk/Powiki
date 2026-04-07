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
public class PokemonTypeMapDTO {

    private Integer id;
    private Integer pokemonId;
    private Integer typeId;
    private String pokemonName;
    private String typeName;
    private Integer slot;

    private char isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
