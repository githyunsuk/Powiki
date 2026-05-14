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
public class MoveClass {

    private Long id;

    private String code;
    private String name;
    private String description;

    private char isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
