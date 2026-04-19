package com.example.powiki.domain.mechanic.model;

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

    private Integer damageTypeId;
    private Integer targetTypeId;
    private double damageFactor;

    private char isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
