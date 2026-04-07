package com.example.powiki.domain.mechanic.service;


import com.example.powiki.domain.mechanic.mapper.AbilityMapper;
import com.example.powiki.domain.mechanic.mapper.TypeMapper;
import com.example.powiki.domain.mechanic.model.AbilityDTO;
import com.example.powiki.domain.mechanic.model.TypeDTO;
import com.example.powiki.domain.mechanic.model.TypeEfficacyDTO;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
@Slf4j
@RequiredArgsConstructor
public class MechanicDataServiceImpl implements MechanicDataService {

    private final RestClient restClient;

    private final AbilityMapper abilityMapper;
    private final TypeMapper typeMapper;

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

            AbilityDTO ability = AbilityDTO.builder().id(id).description(description).name(name).generation(generation).isMainSeries(isMainSeries).build();
            abilityMapper.ingestAbility(ability);

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
            TypeDTO typeApi = TypeDTO.builder().generation(generation).id(id).name(name).sprite(sprite).build();
            log.debug("### typeApi: {}", typeApi);
            typeMapper.insertType(typeApi);

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

            typeMapper.insertTypeEfficacy(typeEfficacy);
        }
    }
}
