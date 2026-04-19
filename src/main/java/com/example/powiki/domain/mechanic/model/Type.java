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
public class Type {

    private Integer id;
    private Integer generation;
    private String name;
    private String sprite;

    private String isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
