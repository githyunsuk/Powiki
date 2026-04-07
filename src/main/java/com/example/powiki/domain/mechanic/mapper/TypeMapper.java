package com.example.powiki.domain.mechanic.mapper;

import com.example.powiki.domain.mechanic.model.TypeDTO;
import com.example.powiki.domain.mechanic.model.TypeEfficacyDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TypeMapper {

    void insertType(TypeDTO type);

    void insertTypeEfficacy(TypeEfficacyDTO typeEfficacy);
}
