package com.example.powiki.domain.mechanic.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class TypeEfficacy {

    private Long damageTypeId;
    private Long targetTypeId;
    private double damageFactor;

    private char isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
