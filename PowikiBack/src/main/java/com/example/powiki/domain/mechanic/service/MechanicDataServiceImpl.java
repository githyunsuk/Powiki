package com.example.powiki.domain.mechanic.service;


import com.example.powiki.domain.mechanic.mapper.AbilityMapper;
import com.example.powiki.domain.mechanic.mapper.MoveMapper;
import com.example.powiki.domain.mechanic.mapper.TypeMapper;
import com.example.powiki.domain.mechanic.model.entity.*;
import com.example.powiki.global.common.constant.StatType;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClient;

@Service
@Slf4j
@RequiredArgsConstructor
public class MechanicDataServiceImpl implements MechanicDataService {

    private final RestClient restClient;

    private final AbilityMapper abilityMapper;
    private final TypeMapper typeMapper;
    private final MoveMapper moveMapper;

    /**
     *  특성 데이터 수집
     */
    @Override
    @Transactional(timeout = 600)
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

            Long id = response.get("id").asLong();

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

            Ability ability = Ability.builder().id(id).description(description).name(name).generation(generation).isMainSeries(isMainSeries).build();
            abilityMapper.ingestAbility(ability);

        }
    }

    /**
     *  기술 부가 데이터 수집
     */
    @Override
    @Transactional(timeout = 600)
    public void processMoveTypeIngestion() {

        // 기술 상태이상
        JsonNode ailmentResponse = restClient.get()
                .uri("https://pokeapi.co/api/v2/move-ailment")
                .retrieve()
                .body(JsonNode.class);

        for(JsonNode ailment : ailmentResponse.get("results")) {
            JsonNode response = restClient.get()
                    .uri(ailment.get("url").asText())
                    .retrieve().body(JsonNode.class);

            Long id = response.get("id").asLong();
            String code = response.get("name").asText();

            MoveAilment moveAilment = MoveAilment.builder().id(id).code(code).build();
            moveMapper.insertMoveAilment(moveAilment);

        }

        // 기술 카테고리
        JsonNode categoryResponse = restClient.get()
                .uri("https://pokeapi.co/api/v2/move-category")
                .retrieve().body(JsonNode.class);

        for(JsonNode category : categoryResponse.get("results")) {
            JsonNode response = restClient.get()
                    .uri(category.get("url").asText())
                    .retrieve().body(JsonNode.class);

            Long id = response.get("id").asLong();
            String code = response.get("name").asText();

            MoveCategory moveCategory = MoveCategory.builder().id(id).code(code).build();
            moveMapper.insertMoveCategory(moveCategory);
        }

        // 기술 타겟
        JsonNode targetResponse = restClient.get()
                .uri("https://pokeapi.co/api/v2/move-target")
                .retrieve().body(JsonNode.class);

        for(JsonNode target : targetResponse.get("results")) {
            JsonNode response = restClient.get()
                    .uri(target.get("url").asText())
                    .retrieve().body(JsonNode.class);

            Long id = response.get("id").asLong();
            String code = response.get("name").asText();

            MoveTarget moveTarget = MoveTarget.builder().id(id).code(code).build();
            moveMapper.insertMoveTarget(moveTarget);
        }
    }

    /**
     *  기술 데이터 수집
     */
    @Override
    @Transactional(timeout = 600)
    public void processMoveIngestion() {

        JsonNode countResponse = restClient.get()
                .uri("https://pokeapi.co/api/v2/move")
                .retrieve().body(JsonNode.class);

        int count = countResponse.get("count").asInt();
        JsonNode totalResponse = restClient.get()
                .uri("https://pokeapi.co/api/v2/move?limit=" + count)
                .retrieve().body(JsonNode.class);

        for(JsonNode move : totalResponse.get("results")) {
            JsonNode response = restClient.get()
                    .uri(move.get("url").asText())
                    .retrieve().body(JsonNode.class);

            // accuracy
            Integer accuracy = response.get("accuracy").asInt();

            // class
            String[] classUrl = response.get("damage_class").get("url").asText().split("/");
            Long classId = Long.parseLong(classUrl[classUrl.length - 1]);

            // effect chance
            Integer effectChance = response.get("effect_chance").asInt();

            // description
            String description = null;
            JsonNode textsNode = response.get("flavor_text_entries");
            for(JsonNode textNode : textsNode) {
                if("sword-shield".equals(textNode.get("version_group").get("name").asText()) && "ko".equals(textNode.get("language").get("name").asText())) {
                    description = textNode.get("flavor_text").asText();
                }
            }

            // id
            Long moveId = response.get("id").asLong();

            // generation
            String[] generationUrl = response.get("generation").get("url").asText().split("/");
            Integer generation = Integer.parseInt(generationUrl[generationUrl.length - 1]);

            // meta
            JsonNode metaNode = response.get("meta");

            Long ailmentId = null;
            Integer ailmentChance = null;
            Long categoryId = null;
            Integer critRate = null;
            Integer drain = null;
            Integer flinchChance = null;
            Integer healing = null;
            Integer maxHits = null;
            Integer minHits = null;
            Integer maxTurns = null;
            Integer minTurns = null;
            Integer statChance = null;

            if(metaNode != null && !metaNode.isNull()) {
                String[] ailmentUrl = metaNode.get("ailment").get("url").asText().split("/");
                ailmentId = Long.parseLong(ailmentUrl[ailmentUrl.length - 1]);

                ailmentChance = metaNode.get("ailment_chance").asInt();

                String[] categoryUrl = metaNode.get("category").get("url").asText().split("/");
                categoryId = Long.parseLong(categoryUrl[categoryUrl.length - 1]);

                critRate = metaNode.get("crit_rate").asInt();
                drain = metaNode.get("drain").asInt();
                flinchChance = metaNode.get("flinch_chance").asInt();
                healing = metaNode.get("healing").asInt();
                maxHits = metaNode.get("max_hits").asInt();
                minHits = metaNode.get("min_hits").asInt();
                maxTurns = metaNode.get("max_turns").asInt();
                minTurns = metaNode.get("min_turns").asInt();
                statChance = metaNode.get("stat_chance").asInt();
            }

            // name
            String name = null;
            JsonNode moveNames = response.get("names");
            for(JsonNode moveName : moveNames) {
                if("ko".equals(moveName.get("language").get("name").asText())) {
                    name = moveName.get("name").asText();
                    break;
                }
            }

            Integer power = response.get("power").asInt();
            Integer pp = response.get("pp").asInt();
            Integer priority = response.get("priority").asInt();

            String[] targetUrl = response.get("target").get("url").asText().split("/");
            Long targetId = Long.parseLong(targetUrl[targetUrl.length - 1]);

            String[] typeUrl = response.get("type").get("url").asText().split("/");
            Long typeId = Long.parseLong(typeUrl[typeUrl.length - 1]);

            Move moveEntity = Move.builder()
                    .id(moveId).typeId(typeId).targetId(targetId).classId(classId).categoryId(categoryId).ailmentId(ailmentId)
                    .name(name).description(description).power(power).pp(pp).accuracy(accuracy).priority(priority).effectChance(effectChance).ailmentChance(ailmentChance)
                    .critRate(critRate).drain(drain).flinchChance(flinchChance).healing(healing).maxHits(maxHits).minHits(minHits)
                    .maxTurns(maxTurns).minTurns(minTurns).statChance(statChance).generation(generation)
                    .build();

            moveMapper.insertMove(moveEntity);

            // stat changes
            JsonNode statChangesNode = response.get("stat_changes");

            if(statChangesNode != null && statChangesNode.isArray() && !statChangesNode.isEmpty()) {
                for(JsonNode statChange : statChangesNode) {
                    StatType stat = StatType.fromValue(statChange.get("stat").get("name").asText());
                    Integer change = statChange.get("change").asInt();

                    MoveStatChange moveStatChange = MoveStatChange.builder().
                            moveId(moveId).stat(stat).change(change).build();

                    moveMapper.insertMoveStatChange(moveStatChange);
                }
            }
        }
    }

    /**
     *  타입 데이터 수집
     */
    @Override
    @Transactional(timeout = 600)
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
            Long id = response.get("id").asLong();

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
            Type typeApi = Type.builder().generation(generation).id(id).name(name).sprite(sprite).build();
            log.debug("### typeApi: {}", typeApi);
//            typeMapper.insertType(typeApi);

            // 타입 상성 저장
            JsonNode damageRelations = response.get("damage_relations");

            processTypeEfficacy(id, damageRelations.get("double_damage_from"), 2.0, true);
            processTypeEfficacy(id, damageRelations.get("half_damage_from"), 0.5, true);
            processTypeEfficacy(id, damageRelations.get("no_damage_from"), 0, true);

        }
    }

    /**
     * 타입 상성 저장
     */
    private void processTypeEfficacy(Long typeId, JsonNode relationsNode, double damageFactor, boolean isFrom) {

        for(JsonNode node : relationsNode) {
            String[] urlParts = node.get("url").asText().split("/");
            Long otherTypeId = Long.parseLong(urlParts[urlParts.length-1]);

            TypeEfficacy typeEfficacy;
            if(isFrom) {
                typeEfficacy = TypeEfficacy.builder().targetTypeId(typeId).damageTypeId(otherTypeId).damageFactor(damageFactor).build();
            } else {
                typeEfficacy = TypeEfficacy.builder().targetTypeId(otherTypeId).damageTypeId(typeId).damageFactor(damageFactor).build();
            }

            typeMapper.insertTypeEfficacy(typeEfficacy);
        }
    }
}
