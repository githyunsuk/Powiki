package com.example.powiki.domain.mechanic.mapper;

import com.example.powiki.domain.mechanic.model.entity.*;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MoveMapper {

    void insertMoveAilment(MoveAilment moveAilment);

    void insertMoveCategory(MoveCategory moveCategory);

    void insertMoveTarget(MoveTarget moveTarget);

    void insertMove(Move move);

    void insertMoveStatChange(MoveStatChange moveStatChange);
}
