package com.example.powiki.domain.pokemon.model.response;

import com.example.powiki.domain.pokemon.model.PokemonFormInfoDTO;
import com.example.powiki.domain.pokemon.model.PokemonNavInfoDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PokemonDetailListResponse {

    private Long speciesId;
    private String name;

    private Gender gender;
    private String category;
    private List<String> eggGroups;

    private PokemonNavInfoDTO prev;
    private PokemonNavInfoDTO next;

    private List<PokemonFormInfoDTO> forms;

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
