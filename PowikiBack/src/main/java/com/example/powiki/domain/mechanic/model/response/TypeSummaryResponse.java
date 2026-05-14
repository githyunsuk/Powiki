package com.example.powiki.domain.mechanic.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TypeSummaryResponse {

    private Long id;

    private String color;
    private String name;
    private String sprite;
}
