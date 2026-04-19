package com.example.powiki.domain.mechanic.service;

import com.example.powiki.domain.mechanic.mapper.TypeMapper;
import com.example.powiki.domain.mechanic.model.response.TypeSummaryResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class TypeServiceImpl implements TypeService{

    private final TypeMapper typeMapper;

    /**
     * 모든 타입 조회
     */
    @Override
    public List<TypeSummaryResponse> selectAllTypes() {

        return typeMapper.retrieveAllType();
    }
}
