package com.example.powiki.api2db.service;

import com.example.powiki.api2db.mapper.DataIngestionMapper;
import com.example.powiki.api2db.model.*;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import java.net.http.HttpClient;

@Service
@Slf4j
@RequiredArgsConstructor
public class DataIngestionServiceImpl implements DataIngestionService {


    private final DataIngestionMapper dataIngestionMapper;

    // SSL 무시용 HttpClient 생성기
    private final RestClient restClient = RestClient.builder()
            .requestFactory(new JdkClientHttpRequestFactory(createUnsafeHttpClient()))
            .build();
    private static HttpClient createUnsafeHttpClient() {
        try {
            SSLContext sslContext = SSLContext.getInstance("TLS");
            sslContext.init(null, new TrustManager[]{new X509TrustManager() {
                public void checkClientTrusted(java.security.cert.X509Certificate[] c, String a) {}
                public void checkServerTrusted(java.security.cert.X509Certificate[] c, String a) {}
                public java.security.cert.X509Certificate[] getAcceptedIssuers() { return null; }
            }}, new java.security.SecureRandom());

            return HttpClient.newBuilder().sslContext(sslContext).build();
        } catch (Exception e) {
            throw new RuntimeException("SSL 설정 실패", e);
        }
    }

    /**
     * 버전 데이터 수집
     */
    @Override
    public void processVersionIngestion() {

        JsonNode root = restClient.get()
                .uri("https://pokeapi.co/api/v2/version")
                .retrieve()
                .body(JsonNode.class);

        int count = root.get("count").asInt();

        for(int i = 1; i <= count; i++) {
            JsonNode data = restClient.get()
                    .uri("https://pokeapi.co/api/v2/version/" + i)
                    .retrieve()
                    .body(JsonNode.class);

            // id 가져오기
            Integer id = data.get("id").asInt();

            // 버전 이름 가져오기
            String name = null;
            JsonNode names = data.get("names");
            for(JsonNode n : names) {
                if("ko".equals(n.get("language").get("name").asText())) {
                    name = n.get("name").asText();
                }
            }

            // 세대 가져오기
            JsonNode versionGroup = restClient.get()
                    .uri(data.get("version_group").get("url").asText())
                    .retrieve()
                    .body(JsonNode.class);
            String groupUrl = versionGroup.get("generation").get("url").asText();
            String[] parts = groupUrl.split("/");
            Integer generation = Integer.parseInt(parts[parts.length - 1]);

            // 지역 가져오기
            String region = null;
            JsonNode regions = versionGroup.get("regions");
            if (regions != null  && !regions.isEmpty()) {

                String regionUrl = regions.get(0).get("url").asText();
                JsonNode regionApi = restClient.get()
                        .uri(regionUrl)
                        .retrieve()
                        .body(JsonNode.class);

                JsonNode regionNames = regionApi.get("names");
                for (JsonNode r : regionNames) {
                    if ("ko".equals(r.get("language").get("name").asText())) {
                        region = r.get("name").asText();
                        break;
                    }
                }
            }

            VersionApiDTO versionApi = VersionApiDTO.builder().id(id).name(name).region(region).generation(generation).build();
            log.debug("### versionApi : {}", versionApi);
            dataIngestionMapper.insertVersion(versionApi);
        }
    }

    /**
     *  타입 데이터 수집
     */
    @Override
    public void processTypeIngestion() {

        JsonNode countResponse = restClient.get()
                .uri("https://pokeapi.co/api/v2/type")
                .retrieve()
                .body(JsonNode.class);

        int count = countResponse.get("count").asInt();
        JsonNode totalResponse = restClient.get()
                .uri("https://pokeapi.co/api/v2/type?limit=" + count)
                .retrieve()
                .body(JsonNode.class);

        for(JsonNode type : totalResponse.get("results")) {
            JsonNode response = restClient.get()
                    .uri(type.get("url").asText())
                    .retrieve()
                    .body(JsonNode.class);

            // id
            Integer id = response.get("id").asInt();

            //generation
            String[] generationUrl = response.get("generation").get("url").asText().split("/");
            Integer generation = Integer.parseInt(generationUrl[generationUrl.length - 1]);

            // name
            String name = null;

            JsonNode typeNames = response.get("names");
            for(JsonNode typeName : typeNames) {
                if("ko".equals(typeName.get("language").get("name").asText())) {
                    name = typeName.get("name").asText();
                    break;
                }
            }

            // sprite
            String sprite = response.get("sprites").get("generation-ix").get("scarlet-violet").get("symbol_icon").asText();

            // 타입 저장
            TypeApiDTO typeApi = TypeApiDTO.builder().generation(generation).id(id).name(name).sprite(sprite).build();
            log.debug("### typeApi: {}", typeApi);
            dataIngestionMapper.insertType(typeApi);

            // 타입 상성 저장
            JsonNode damageRelations = response.get("damage_relations");

            processTypeEfficacy(id, damageRelations.get("double_damage_from"), 2.0, true);
            processTypeEfficacy(id, damageRelations.get("double_damage_to"), 2.0, false);
            processTypeEfficacy(id, damageRelations.get("half_damage_from"), 0.5, true);
            processTypeEfficacy(id, damageRelations.get("half_damage_to"), 0.5, false);
            processTypeEfficacy(id, damageRelations.get("no_damage_from"), 0, true);
            processTypeEfficacy(id, damageRelations.get("no_damage_to"), 0, false);

        }
    }

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

            dataIngestionMapper.insertEggGroup(id, name);
        }
    }

    /**
     *  특성 데이터 수집
     */
    @Override
    public void processAbilityIngestion() {

        JsonNode countResponse = restClient.get()
                .uri("https://pokeapi.co/api/v2/ability")
                .retrieve()
                .body(JsonNode.class);
        int count = countResponse.get("count").asInt();

        JsonNode totalResponse = restClient.get()
                .uri("https://pokeapi.co/api/v2/ability?limit=" + count)
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

            String description = null;
            JsonNode textsNode = response.get("flavor_text_entries");
            for(JsonNode textNode : textsNode) {
                if("sword-shield".equals(textNode.get("version_group").get("name").asText()) && "ko".equals(textNode.get("language").get("name").asText())) {
                    description = textNode.get("flavor_text").asText();
                }
            }

            String[] generationUrl = response.get("generation").get("url").asText().split("/");
            Integer generation = Integer.parseInt(generationUrl[generationUrl.length - 1]);

            char isMainSeries = 'Y';
            if(!response.get("is_main_series").asBoolean()) {
                isMainSeries = 'N';
            }

            AbilityApiDTO ability = AbilityApiDTO.builder().id(id).description(description).name(name).generation(generation).isMainSeries(isMainSeries).build();
            dataIngestionMapper.ingestAbility(ability);

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

            dataIngestionMapper.insertPokemonSprite(pokemonSprite);


            // Pokemon Ability 저장
            for(JsonNode node : pokemonResponse.get("abilities")) {
                char isHidden = node.get("is_hidden").asBoolean() ? 'Y' : 'N';
                Integer slot = node.get("slot").asInt();
                String[] urlParts = node.get("ability").get("url").asText().split("/");
                Integer abilityId = Integer.parseInt(urlParts[urlParts.length - 1]);

                PokemonAbilityMapDTO pokemonAbility = PokemonAbilityMapDTO.builder()
                        .abilityId(abilityId).slot(slot).pokemonId(id).isHidden(isHidden).build();

                dataIngestionMapper.insertPokemonAbility(pokemonAbility);
            }

            // Pokemon Type 저장
            for(JsonNode node : pokemonResponse.get("types")) {
                Integer slot = node.get("slot").asInt();
                String[] urlParts = node.get("type").get("url").asText().split("/");
                Integer typeId = Integer.parseInt(urlParts[urlParts.length - 1]);

                PokemonTypeMapDTO pokemonType = PokemonTypeMapDTO.builder().pokemonId(id).typeId(typeId).slot(slot).build();
                dataIngestionMapper.insertPokemonType(pokemonType);
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

            dataIngestionMapper.insertPokemonSpecies(pokemonSpecies);

            // Poekemon Description 저장
            for(JsonNode descriptionNode : speciesResponse.get("flavor_text_entries")) {
                if("ko".equals(descriptionNode.get("language").get("name").asText())) {
                    String description = descriptionNode.get("flavor_text").asText();
                    String[] versionParts = descriptionNode.get("version").get("url").asText().split("/");
                    Integer versionId = Integer.parseInt(versionParts[versionParts.length - 1]);

                    PokemonDescriptionDTO pokemonDescription = PokemonDescriptionDTO.builder()
                            .versionId(versionId).description(description).pokemonSpeciesId(speciesId).build();

                    dataIngestionMapper.insertPokemonDescription(pokemonDescription);
                }
            }

            // Pokemon Egg group 저장
            for(JsonNode eggNode : speciesResponse.get("egg_groups")) {
                String[] eggParts = eggNode.get("url").asText().split("/");
                Integer eggGroupId = Integer.parseInt(eggParts[eggParts.length - 1]);

                SpeciesEggMap eggGroup = SpeciesEggMap.builder().eggGroupId(eggGroupId).pokemonSpeciesId(speciesId).build();
                dataIngestionMapper.insertPokemonEggGroup(eggGroup);

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

            dataIngestionMapper.insertPokemon(pokemon);
        }
    }

    /**
     * 타입 상성 저장
     */
    private void processTypeEfficacy(Integer typeId, JsonNode relationsNode, double damageFactor, boolean isFrom) {

        for(JsonNode node : relationsNode) {
            String[] urlParts = node.get("url").asText().split("/");
            Integer otherTypeId = Integer.parseInt(urlParts[urlParts.length-1]);

            TypeEfficacyDTO typeEfficacy;
            if(isFrom) {
                typeEfficacy = TypeEfficacyDTO.builder().targetTypeId(typeId).damageTypeId(otherTypeId).damageFactor(damageFactor).build();
            } else {
                typeEfficacy = TypeEfficacyDTO.builder().targetTypeId(otherTypeId).damageTypeId(typeId).damageFactor(damageFactor).build();
            }

            dataIngestionMapper.insertTypeEfficacy(typeEfficacy);
        }
    }
}
