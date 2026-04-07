package com.example.powiki.domain.pokemon.controller;

import com.example.powiki.common.response.ApiResponse;
import com.example.powiki.domain.pokemon.service.PokemonDataService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class PokemonDataController {

    private final PokemonDataService pokemonDataService;

    /**
     *  알 그룹 데이터 수집
     */
    @GetMapping("api/egg_group/ingestion")
    public ResponseEntity<ApiResponse<Object>> ingestEggGroup() {
        log.info("### 알 그룹 데이터 수집 시작");

        try {
            pokemonDataService.processEggGroupIngestion();

            return ApiResponse.success();
        } catch (Exception e) {
            log.error("### 에러", e);

            return ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     *  포켓몬 데이터 수집
     */
    @GetMapping("/api/pokemon/ingestion")
    public ResponseEntity<ApiResponse<Object>> ingestPokemon() {
        log.info("### 포켓몬 데이터 수집 시작");

        try {
            pokemonDataService.processPokemonIngestion();

            return ApiResponse.success();
        } catch (Exception e) {
            log.error("### 에러", e);

            return ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
