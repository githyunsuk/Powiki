package com.example.powiki.domain.pokemon.model.response;

import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
public class PokemonListResponse {

    private Long id;
    private Long pokemonSpeciesId;

    private String name;
    private Integer generation;
    private String formType;
    private String formName;
    private boolean isLegendary;
    private boolean isMythical;
    private List<pokemonType> types;

    @Getter
    public static class pokemonType {
        private Long id;
        private Integer slot;
        private String name;
        private String color;
    }

}
