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
public class Ability {

    private Integer id;
    private String name;
    private String description;
    private Integer generation;
    private char isMainSeries;

    private char isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
