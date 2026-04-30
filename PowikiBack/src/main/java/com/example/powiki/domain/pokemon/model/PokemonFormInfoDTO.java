package com.example.powiki.domain.pokemon.model;

import com.example.powiki.domain.mechanic.model.TypeDefenseEfficacyDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PokemonFormInfoDTO {

    private Long id;
    private String name;

    private String formGroup;
    private String formType;
    private String formName;

    private Stats stats;
    private Integer height;
    private Integer weight;
    private String description;

    private List<PokemonTypeInfoDTO> types;
    private List<PokemonAbilityInfoDTO> abilities;
    private Map<Double, List<TypeDefenseEfficacyDTO>> typeEfficacy;

    @Getter
    public static class Stats {
        private final Integer hp;
        private final Integer attack;
        private final Integer defense;
        private final Integer specialAttack;
        private final Integer specialDefense;
        private final Integer speed;
        private final Integer total;

        public Stats(PokemonBasicInfoDTO basic) {
            this.hp = basic.getHp();
            this.attack = basic.getAttack();
            this.defense = basic.getDefense();
            this.specialAttack = basic.getSpecialAttack();
            this.specialDefense = basic.getSpecialDefense();
            this.speed = basic.getSpeed();
            this.total = hp + attack + defense + specialAttack + specialDefense + speed;
        }
    }
}
