package com.example.powiki.domain.pokemon.service;

import com.example.powiki.domain.mechanic.mapper.TypeMapper;
import com.example.powiki.domain.mechanic.model.TypeDefenseEfficacyDTO;
import com.example.powiki.domain.pokemon.mapper.PokemonMapper;
import com.example.powiki.domain.pokemon.mapper.SpeciesMapper;
import com.example.powiki.domain.pokemon.model.PokemonAbilityInfoDTO;
import com.example.powiki.domain.pokemon.model.PokemonBasicInfoDTO;
import com.example.powiki.domain.pokemon.model.PokemonNavInfoDTO;
import com.example.powiki.domain.pokemon.model.PokemonTypeInfoDTO;
import com.example.powiki.domain.pokemon.model.response.PokemonDetailResponse;
import com.example.powiki.domain.pokemon.model.response.PokemonListResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class PokemonServiceImpl implements PokemonService {

    private final PokemonMapper pokemonMapper;
    private final SpeciesMapper speciesMapper;
    private final TypeMapper typeMapper;

    /**
     * 모든 포켓몬 리스트 조회
     */
    @Override
    public List<PokemonListResponse> retrievePokemonList() {

        return pokemonMapper.selectPokemonList();
    }

    /**
     *  특정 포켓몬 상세 정보 조회
     */
    @Override
    public PokemonDetailResponse retrievePokemonDetail(Long pokemonId) {

        // 기본 정보
        PokemonBasicInfoDTO basic = pokemonMapper.selectPokemonBasicInfo(pokemonId);

        // 특성 정보
        List<PokemonAbilityInfoDTO> abilities = pokemonMapper.selectPokemonAbilityInfo(pokemonId);

        // 타입 및 타입 상성 정보
        List<PokemonTypeInfoDTO> types = pokemonMapper.selectPokemonTypeInfo(pokemonId);

        List<Long> typeIds = new ArrayList<>();
        for (PokemonTypeInfoDTO type : types) {
            typeIds.add(type.getId());
        }

        // 타입 상성 가공
        List<TypeDefenseEfficacyDTO> typeEfficacy = typeMapper.selectTypeDefenseEfficacy(typeIds);
        Map<String, TypeDefenseEfficacyDTO> combinedMap = new HashMap<>();
        for(TypeDefenseEfficacyDTO current : typeEfficacy) {
            String typeName = current.getName();

            if(combinedMap.containsKey(typeName)) {
                TypeDefenseEfficacyDTO existing = combinedMap.get(typeName);
                existing.setFactor(existing.getFactor() * current.getFactor());
            } else {
                combinedMap.put(typeName, current);
            }
        }
        List<TypeDefenseEfficacyDTO> finalEfficacy = new ArrayList<>(combinedMap.values());
        Map<Double, List<TypeDefenseEfficacyDTO>> groupedEfficacy = new HashMap<>();

        for (TypeDefenseEfficacyDTO dto : finalEfficacy) {
            Double factor = dto.getFactor();

            if (!groupedEfficacy.containsKey(factor)) {
                groupedEfficacy.put(factor, new ArrayList<>());
            }
            groupedEfficacy.get(factor).add(dto);
        }

        // 알 그룹 및 도감 정보
        Long speciesId = basic.getPokemonSpeciesId();
        List<String> eggGroups = speciesMapper.selectPokemonEggGroupNames(speciesId);
        String description = speciesMapper.selectPokemonDescriptionInfo(pokemonId);

        // 이전, 다음 포켓몬 정보
        PokemonNavInfoDTO prev = pokemonMapper.selectPrevPokemon(speciesId);
        PokemonNavInfoDTO next = pokemonMapper.selectNextPokemon(speciesId);

        // 응답 객체 조립
        PokemonDetailResponse result = PokemonDetailResponse.builder().
                id(basic.getId()).pokemonSpeciesId(speciesId).name(basic.getName())
                        .height(basic.getHeight()).weight(basic.getWeight()).category(basic.getCategory())
                        .description(description).eggGroups(eggGroups).types(types).abilities(abilities)
                        .typeEfficacy(groupedEfficacy).stats(new PokemonDetailResponse.Stats(basic))
                .gender(new PokemonDetailResponse.Gender(basic.getGenderRate())).next(next).prev(prev).build();

        return result;
    }
}
