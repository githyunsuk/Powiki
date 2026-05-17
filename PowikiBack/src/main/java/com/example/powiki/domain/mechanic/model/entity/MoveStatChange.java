package com.example.powiki.domain.mechanic.model.entity;

import com.example.powiki.global.common.constant.StatType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MoveStatChange {

    private Long id;
    private Long moveId;

    private StatType stat;
    private Integer change;

    private char isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
