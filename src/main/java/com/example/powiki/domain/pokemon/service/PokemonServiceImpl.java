package com.example.powiki.domain.pokemon.service;

import com.example.powiki.domain.pokemon.mapper.PokemonMapper;
import com.example.powiki.domain.pokemon.model.response.PokemonListResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class PokemonServiceImpl implements PokemonService {

    private final PokemonMapper pokemonMapper;

    @Override
    public List<PokemonListResponse> retrievePokemonList() {

        return pokemonMapper.selectPokemonList();
    }
}
