package com.example.powiki.domain.pokemon.service;

import com.example.powiki.domain.pokemon.mapper.PokemonMapper;
import com.example.powiki.domain.pokemon.mapper.SpeciesMapper;
import com.example.powiki.domain.pokemon.model.PokemonAbilityMapDTO;
import com.example.powiki.domain.pokemon.model.PokemonDTO;
import com.example.powiki.domain.pokemon.model.PokemonDescriptionDTO;
import com.example.powiki.domain.pokemon.model.PokemonSpeciesDTO;
import com.example.powiki.domain.pokemon.model.PokemonSpriteDTO;
import com.example.powiki.domain.pokemon.model.PokemonTypeMapDTO;
import com.example.powiki.domain.pokemon.model.SpeciesEggMap;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
@Slf4j
@RequiredArgsConstructor
public class PokemonDataServiceImpl implements PokemonDataService {

    private final RestClient restClient;

    private final PokemonMapper pokemonMapper;
    private final SpeciesMapper speciesMapper;

    /**
     *  알 그룹 데이터 수집
     */
    @Override
    public void processEggGroupIngestion() {

        JsonNode totalResponse = restClient.get()
                .uri("https://pokeapi.co/api/v2/egg-group")
                .retrieve()
                .body(JsonNode.class);

        for(JsonNode node : totalResponse.get("results")) {
            JsonNode response = restClient.get()
                    .uri(node.get("url").asText())
                    .retrieve()
                    .body(JsonNode.class);

            Integer id = response.get("id").asInt();

            String name = null;
            JsonNode names = response.get("names");
            for(JsonNode n : names) {
                if("ko".equals(n.get("language").get("name").asText())) {
                    name = n.get("name").asText();
                    break;
                }
            }

            speciesMapper.insertEggGroup(id, name);
        }
    }

    /**
     * 포켓몬 데이터 수집
     */
    @Override
    public void processPokemonIngestion() {

        JsonNode countResponse = restClient.get()
                .uri("https://pokeapi.co/api/v2/pokemon")
                .retrieve()
                .body(JsonNode.class);

        int count = countResponse.get("count").asInt();
        JsonNode totalResponse = restClient.get()
                .uri("https://pokeapi.co/api/v2/pokemon?limit=" + count)
                .retrieve()
                .body(JsonNode.class);

        for(JsonNode pokemonNode : totalResponse.get("results")) {

            JsonNode pokemonResponse = restClient.get()
                    .uri(pokemonNode.get("url").asText())
                    .retrieve()
                    .body(JsonNode.class);

            PokemonDTO.PokemonDTOBuilder pokemonBuilder = PokemonDTO.builder();

            // 포켓몬 ID
            Integer id = pokemonResponse.get("id").asInt();

            // Pokemon Sprite 저장
            String spriteShinyUrl = pokemonResponse.get("sprites").get("front_shiny").asText();
            String artWorkShinyUrl = pokemonResponse.get("sprites").get("other").get("official-artwork").get("front_shiny").asText();
            PokemonSpriteDTO pokemonSprite = PokemonSpriteDTO.builder().pokemonId(id).spriteShinyUrl(spriteShinyUrl).artworkShinyUrl(artWorkShinyUrl).build();

            pokemonMapper.insertPokemonSprite(pokemonSprite);


            // Pokemon Ability 저장
            for(JsonNode node : pokemonResponse.get("abilities")) {
                char isHidden = node.get("is_hidden").asBoolean() ? 'Y' : 'N';
                Integer slot = node.get("slot").asInt();
                String[] urlParts = node.get("ability").get("url").asText().split("/");
                Integer abilityId = Integer.parseInt(urlParts[urlParts.length - 1]);

                PokemonAbilityMapDTO pokemonAbility = PokemonAbilityMapDTO.builder()
                        .abilityId(abilityId).slot(slot).pokemonId(id).isHidden(isHidden).build();

                pokemonMapper.insertPokemonAbility(pokemonAbility);
            }

            // Pokemon Type 저장
            for(JsonNode node : pokemonResponse.get("types")) {
                Integer slot = node.get("slot").asInt();
                String[] urlParts = node.get("type").get("url").asText().split("/");
                Integer typeId = Integer.parseInt(urlParts[urlParts.length - 1]);

                PokemonTypeMapDTO pokemonType = PokemonTypeMapDTO.builder().pokemonId(id).typeId(typeId).slot(slot).build();
                pokemonMapper.insertPokemonType(pokemonType);
            }

            // Pokemon Species 저장
            JsonNode speciesResponse = restClient.get()
                    .uri(pokemonResponse.get("species").get("url").asText())
                    .retrieve()
                    .body(JsonNode.class);

            Integer speciesId = speciesResponse.get("id").asInt();
            Integer speciesOrder = speciesResponse.get("order").asInt();
            Integer genderRate = speciesResponse.get("gender_rate").asInt();

            char isBaby = speciesResponse.get("is_baby").asBoolean() ? 'Y' : 'N';
            char isLegendary = speciesResponse.get("is_legendary").asBoolean() ? 'Y' : 'N';
            char isMythical = speciesResponse.get("is_mythical").asBoolean() ? 'Y' : 'N';

            String[] urlParts = speciesResponse.get("generation").get("url").asText().split("/");
            Integer generation = Integer.parseInt(urlParts[urlParts.length - 1]);

            String name = null;
            for(JsonNode nameNode : speciesResponse.get("names")) {
                if("ko".equals(nameNode.get("language").get("name").asText())) {
                    name = nameNode.get("name").asText();
                }
            }

            String category = null;
            for(JsonNode categoryNode : speciesResponse.get("genera")) {
                if("ko".equals(categoryNode.get("language").get("name").asText())) {
                    category = categoryNode.get("genus").asText();
                }
            }

            PokemonSpeciesDTO pokemonSpecies = PokemonSpeciesDTO.builder()
                    .id(speciesId).name(name).sortOrder(speciesOrder).genderRate(genderRate)
                    .isBaby(isBaby).isLegendary(isLegendary).isMythical(isMythical)
                    .category(category).generation(generation).build();

            speciesMapper.insertPokemonSpecies(pokemonSpecies);

            // Poekemon Description 저장
            for(JsonNode descriptionNode : speciesResponse.get("flavor_text_entries")) {
                if("ko".equals(descriptionNode.get("language").get("name").asText())) {
                    String description = descriptionNode.get("flavor_text").asText();
                    String[] versionParts = descriptionNode.get("version").get("url").asText().split("/");
                    Integer versionId = Integer.parseInt(versionParts[versionParts.length - 1]);

                    PokemonDescriptionDTO pokemonDescription = PokemonDescriptionDTO.builder()
                            .versionId(versionId).description(description).pokemonSpeciesId(speciesId).build();

                    speciesMapper.insertPokemonDescription(pokemonDescription);
                }
            }

            // Pokemon Egg group 저장
            for(JsonNode eggNode : speciesResponse.get("egg_groups")) {
                String[] eggParts = eggNode.get("url").asText().split("/");
                Integer eggGroupId = Integer.parseInt(eggParts[eggParts.length - 1]);

                SpeciesEggMap eggGroup = SpeciesEggMap.builder().eggGroupId(eggGroupId).pokemonSpeciesId(speciesId).build();
                speciesMapper.insertPokemonEggGroup(eggGroup);

            }

            // 포켓몬 기본 정보 저장
            String cries = pokemonResponse.get("cries").get("latest").asText();
            Integer height = pokemonResponse.get("height").asInt();
            Integer weight = pokemonResponse.get("weight").asInt();
            char isDefault = pokemonResponse.get("is_default").asBoolean() ? 'Y' : 'N';
            String mainSpriteUrl = pokemonResponse.get("sprites").get("front_default").asText();
            String mainArtWorkUrl = pokemonResponse.get("sprites").get("other").get("official-artwork").get("front_default").asText();
            Integer pokemonOrder = pokemonResponse.get("order").asInt();

            pokemonBuilder.id(id).cries(cries).height(height).weight(weight).isDefault(isDefault)
                    .mainSpriteUrl(mainSpriteUrl).mainArtworkUrl(mainArtWorkUrl).sortOrder(pokemonOrder);

            // 종족값
            for(JsonNode node : pokemonResponse.get("stats")) {
                String statName = node.get("stat").get("name").asText();
                Integer baseStat = node.get("base_stat").asInt();

                switch (statName) {
                    case "hp": pokemonBuilder.hp(baseStat); break;
                    case "attack": pokemonBuilder.attack(baseStat); break;
                    case "defense": pokemonBuilder.defense(baseStat); break;
                    case "special-attack": pokemonBuilder.specialAttack(baseStat); break;
                    case "special-defense": pokemonBuilder.specialDefense(baseStat); break;
                    case "speed": pokemonBuilder.speed(baseStat); break;
                }
            }

            pokemonBuilder.pokemonSpeciesId(speciesId).name(name);
            PokemonDTO pokemon = pokemonBuilder.build();

            pokemonMapper.insertPokemon(pokemon);
        }
    }
}
