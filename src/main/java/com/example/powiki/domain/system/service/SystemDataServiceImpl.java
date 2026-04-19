package com.example.powiki.domain.system.service;

import com.example.powiki.domain.system.mapper.VersionMapper;
import com.example.powiki.domain.system.model.Version;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
@Slf4j
@RequiredArgsConstructor
public class SystemDataServiceImpl implements SystemDataService {

    private final RestClient restClient;
    private final VersionMapper versionMapper;

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

            Version versionApi = Version.builder().id(id).name(name).region(region).generation(generation).build();
            log.debug("### versionApi : {}", versionApi);
            versionMapper.insertVersion(versionApi);
        }
    }
}
