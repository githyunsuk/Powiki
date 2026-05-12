package com.example.powiki.domain.pokemon.model.response;

import com.example.powiki.domain.mechanic.model.TypeDefenseEfficacyDTO;
import com.example.powiki.domain.pokemon.model.PokemonAbilityInfoDTO;
import com.example.powiki.domain.pokemon.model.PokemonBasicInfoDTO;
import com.example.powiki.domain.pokemon.model.PokemonNavInfoDTO;
import com.example.powiki.domain.pokemon.model.PokemonTypeInfoDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PokemonDetailResponse {

    private Long id;
    private Long pokemonSpeciesId;
    private String name;

    private Stats stats;
    private Gender gender;

    private Integer height;
    private Integer weight;
    private String category;
    private String description;

    private PokemonNavInfoDTO prev;
    private PokemonNavInfoDTO next;

    private List<String> eggGroups;
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

    @Getter
    public static class Gender {
        private final double male;
        private final double female;
        private final boolean isGenderless;

        public Gender(Integer rate) {
            this.isGenderless = (rate == null || rate == -1);
            this.female = isGenderless ? 0 : (rate / 8.0) * 100;
            this.male = isGenderless ? 0 : 100 - this.female;
        }
    }
}