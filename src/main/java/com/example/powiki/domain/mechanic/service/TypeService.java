package com.example.powiki.domain.mechanic.service;

import com.example.powiki.domain.mechanic.model.response.TypeSummaryResponse;

import java.util.List;

public interface TypeService {

    public List<TypeSummaryResponse> selectAllTypes();
}
