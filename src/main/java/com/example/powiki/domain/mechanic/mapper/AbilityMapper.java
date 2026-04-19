package com.example.powiki.domain.mechanic.mapper;

import com.example.powiki.domain.mechanic.model.Ability;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AbilityMapper {

    void ingestAbility(Ability ability);
}
