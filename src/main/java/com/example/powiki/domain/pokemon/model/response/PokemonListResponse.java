package com.example.powiki.domain.pokemon.model.response;

import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
public class PokemonListResponse {

    private Integer id;
    private Integer pokemonSpeciesId;
    private String name;
    private Integer generation;
    private String formType;
    private boolean isLegendary;
    private boolean isMythical;
    private List<pokemonType> types;

    @Getter
    public static class pokemonType {
        private Integer typeId;
        private Integer slot;
        private String typeName;
        private String typeColor;
    }

}
