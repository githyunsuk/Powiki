package com.example.powiki.domain.pokemon.service;

import com.example.powiki.domain.mechanic.mapper.TypeMapper;
import com.example.powiki.domain.mechanic.model.TypeDefenseEfficacyDTO;
import com.example.powiki.domain.pokemon.mapper.PokemonMapper;
import com.example.powiki.domain.pokemon.mapper.SpeciesMapper;
import com.example.powiki.domain.pokemon.model.PokemonAbilityInfoDTO;
import com.example.powiki.domain.pokemon.model.PokemonBasicInfoDTO;
import com.example.powiki.domain.pokemon.model.PokemonFormInfoDTO;
import com.example.powiki.domain.pokemon.model.PokemonNavInfoDTO;
import com.example.powiki.domain.pokemon.model.PokemonSpeciesInfoDTO;
import com.example.powiki.domain.pokemon.model.PokemonTypeInfoDTO;
import com.example.powiki.domain.pokemon.model.response.PokemonDetailListResponse;
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

    @Override
    public PokemonDetailListResponse retrievePokemonDetail(Long speciesId) {

        // 해당 종 정보 가져오기
        PokemonSpeciesInfoDTO speciesInfo = speciesMapper.selectPokemonSpeciesInfo(speciesId);

        // 알 그룹 정보 가져오기
        List<String> eggGroups = speciesMapper.selectPokemonEggGroupNames(speciesId);

        // 이전, 다음 포켓몬 정보
        PokemonNavInfoDTO prev = pokemonMapper.selectPrevPokemon(speciesId);
        PokemonNavInfoDTO next = pokemonMapper.selectNextPokemon(speciesId);

        // 해당 종의 모든 폼 정보 가져오기
        List<PokemonFormInfoDTO> forms = new ArrayList<>();
        List<Long> pokemonIdList = pokemonMapper.selectIdBySpeciesId(speciesId);
        for(Long pokemonId : pokemonIdList) {

            // 기본 & 특성 & 타입 & 도감 정보
            PokemonBasicInfoDTO basicInfo = pokemonMapper.selectPokemonBasicInfo(pokemonId);
            List<PokemonAbilityInfoDTO> abilities = pokemonMapper.selectPokemonAbilityInfo(pokemonId);
            List<PokemonTypeInfoDTO> types = pokemonMapper.selectPokemonTypeInfo(pokemonId);
            String description = speciesMapper.selectPokemonDescriptionInfo(pokemonId);

            // 타입 상성 가공
            List<Long> typeIds = new ArrayList<>();
            for (PokemonTypeInfoDTO type : types) {
                typeIds.add(type.getId());
            }

            List<TypeDefenseEfficacyDTO> typeEfficacy = typeMapper.selectTypeDefenseEfficacy(typeIds);
            Map<Long, TypeDefenseEfficacyDTO> combinedMap = new HashMap<>();
            for(TypeDefenseEfficacyDTO current : typeEfficacy) {
                Long typeId = current.getId();

                if(combinedMap.containsKey(typeId)) {
                    TypeDefenseEfficacyDTO existing = combinedMap.get(typeId);
                    existing.setFactor(existing.getFactor() * current.getFactor());
                } else {
                    combinedMap.put(typeId, current);
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

            PokemonFormInfoDTO pokemonFormInfoDTO = PokemonFormInfoDTO.builder().id(basicInfo.getId()).name(basicInfo.getName())
                    .formGroup(basicInfo.getFormGroup()).formType(basicInfo.getFormType()).formName(basicInfo.getFormName()).height(basicInfo.getHeight())
                    .weight(basicInfo.getWeight()).stats(new PokemonFormInfoDTO.Stats(basicInfo)).description(description).types(types).abilities(abilities)
                    .typeEfficacy(groupedEfficacy).build();

            forms.add(pokemonFormInfoDTO);
        }

        PokemonDetailListResponse result = PokemonDetailListResponse.builder().speciesId(speciesInfo.getSpeciesId()).name(speciesInfo.getName())
                .gender(new PokemonDetailListResponse.Gender(speciesInfo.getGenderRate())).category(speciesInfo.getCategory()).eggGroups(eggGroups)
                .prev(prev).next(next).forms(forms).build();

        return result;
    }


    /**
     *  특정 포켓몬 상세 정보 조회
     */
//    @Override
//    public PokemonDetailResponse retrievePokemonDetail(Long pokemonId) {
//
//        // 기본 정보
//        PokemonBasicInfoDTO basic = pokemonMapper.selectPokemonBasicInfo(pokemonId);
//
//        // 특성 정보
//        List<PokemonAbilityInfoDTO> abilities = pokemonMapper.selectPokemonAbilityInfo(pokemonId);
//
//        // 타입 및 타입 상성 정보
//        List<PokemonTypeInfoDTO> types = pokemonMapper.selectPokemonTypeInfo(pokemonId);
//
//        List<Long> typeIds = new ArrayList<>();
//        for (PokemonTypeInfoDTO type : types) {
//            typeIds.add(type.getId());
//        }
//
//        // 타입 상성 가공
//        List<TypeDefenseEfficacyDTO> typeEfficacy = typeMapper.selectTypeDefenseEfficacy(typeIds);
//        Map<String, TypeDefenseEfficacyDTO> combinedMap = new HashMap<>();
//        for(TypeDefenseEfficacyDTO current : typeEfficacy) {
//            String typeName = current.getName();
//
//            if(combinedMap.containsKey(typeName)) {
//                TypeDefenseEfficacyDTO existing = combinedMap.get(typeName);
//                existing.setFactor(existing.getFactor() * current.getFactor());
//            } else {
//                combinedMap.put(typeName, current);
//            }
//        }
//        List<TypeDefenseEfficacyDTO> finalEfficacy = new ArrayList<>(combinedMap.values());
//        Map<Double, List<TypeDefenseEfficacyDTO>> groupedEfficacy = new HashMap<>();
//
//        for (TypeDefenseEfficacyDTO dto : finalEfficacy) {
//            Double factor = dto.getFactor();
//
//            if (!groupedEfficacy.containsKey(factor)) {
//                groupedEfficacy.put(factor, new ArrayList<>());
//            }
//            groupedEfficacy.get(factor).add(dto);
//        }
//
//        // 알 그룹 및 도감 정보
//        Long speciesId = basic.getPokemonSpeciesId();
//        List<String> eggGroups = speciesMapper.selectPokemonEggGroupNames(speciesId);
//        String description = speciesMapper.selectPokemonDescriptionInfo(pokemonId);
//
//        // 이전, 다음 포켓몬 정보
//        PokemonNavInfoDTO prev = pokemonMapper.selectPrevPokemon(speciesId);
//        PokemonNavInfoDTO next = pokemonMapper.selectNextPokemon(speciesId);
//
//        // 응답 객체 조립
//        PokemonDetailResponse result = PokemonDetailResponse.builder().
//                id(basic.getId()).pokemonSpeciesId(speciesId).name(basic.getName())
//                        .height(basic.getHeight()).weight(basic.getWeight()).category(basic.getCategory())
//                        .description(description).eggGroups(eggGroups).types(types).abilities(abilities)
//                        .typeEfficacy(groupedEfficacy).stats(new PokemonDetailResponse.Stats(basic))
//                .gender(new PokemonDetailResponse.Gender(basic.getGenderRate())).next(next).prev(prev).build();
//
//        return result;
//    }
}
