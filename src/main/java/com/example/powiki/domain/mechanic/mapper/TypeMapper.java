package com.example.powiki.domain.mechanic.mapper;

import com.example.powiki.domain.mechanic.model.Type;
import com.example.powiki.domain.mechanic.model.TypeEfficacy;
import com.example.powiki.domain.mechanic.model.response.TypeSummaryResponse;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TypeMapper {

    void insertType(Type type);

    void insertTypeEfficacy(TypeEfficacy typeEfficacy);

    List<TypeSummaryResponse> retrieveAllType();
}
