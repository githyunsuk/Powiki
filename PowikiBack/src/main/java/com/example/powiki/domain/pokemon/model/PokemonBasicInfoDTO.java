package com.example.powiki.domain.pokemon.model;

import lombok.Getter;

@Getter
public class PokemonBasicInfoDTO {

    private Long id;
    private String name;
    private Integer hp;
    private Integer attack;
    private Integer defense;
    private Integer specialAttack;
    private Integer specialDefense;
    private Integer speed;
    private Integer height;
    private Integer weight;

    private String formGroup;
    private String formType;
    private String formName;

}
