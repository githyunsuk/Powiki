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
public class PokemonSpeciesDTO {

    private Integer id;
    private String name;
    private Integer sortOrder;
    private Integer genderRate;
    private char isBaby;
    private char isLegendary;
    private char isMythical;
    private String category;
    private Integer generation;

    private char isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
