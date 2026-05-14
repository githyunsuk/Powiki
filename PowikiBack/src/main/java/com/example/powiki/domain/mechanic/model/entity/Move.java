package com.example.powiki.domain.mechanic.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Move {

    private Long id;
    private Long typeId;
    private Long targetId;
    private Long classId;
    private Long categoryId;
    private Long ailmentId;

    private String name;
    private String description;
    private Integer power;
    private Integer pp;
    private Integer accuracy;
    private Integer priority;
    private Integer effectChance;
    private Integer ailmentChance;
    private Integer critRate;
    private Integer drain;
    private Integer flinchChance;
    private Integer healing;
    private Integer maxHits;
    private Integer minHits;
    private Integer maxTurns;
    private Integer minTurns;
    private Integer stateChance;
    private Integer generation;

    private char isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
