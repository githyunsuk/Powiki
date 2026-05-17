package com.example.powiki.global.common.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum StatType {

    HP("hp"),
    SPEED("speed"),
    ATTACK("attack"),
    DEFENSE("defense"),
    SPECIAL_ATTACK("special-attack"),
    SPECIAL_DEFENSE("special-defense"),
    ACCURACY("accuracy"),
    EVASION("evasion");

    private final String value;

    public static StatType fromValue(String value) {
        for (StatType type : StatType.values()) {
            if (type.getValue().equals(value)) {
                return type;
            }
       }

        throw new IllegalArgumentException("Unknown stat type value: " + value);
    }
}