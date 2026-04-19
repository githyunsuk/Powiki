package com.example.powiki.domain.pokemon.controller;

import com.example.powiki.domain.pokemon.model.response.PokemonListResponse;
import com.example.powiki.domain.pokemon.service.PokemonService;
import com.example.powiki.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class PokemonController {

    private final PokemonService pokemonService;

    /**
     * 모든 포켓몬 리스트 조회
     */
    @GetMapping("/api/pokemons")
    public ResponseEntity<ApiResponse<List<PokemonListResponse>>> retrievePokemonList() {

        log.info("### 포켓몬 리스트 조회 시작");
        List<PokemonListResponse> result = pokemonService.retrievePokemonList();

        return ApiResponse.success(result);
    }
}
