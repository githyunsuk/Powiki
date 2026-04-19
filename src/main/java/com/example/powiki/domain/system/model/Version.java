package com.example.powiki.domain.system.model;

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
public class Version {

    private Integer id;
    private String name;
    private String region;
    private Integer generation;

    private char isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
