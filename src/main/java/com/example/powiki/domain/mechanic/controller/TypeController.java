package com.example.powiki.domain.mechanic.controller;

import com.example.powiki.domain.mechanic.model.response.TypeSummaryResponse;
import com.example.powiki.global.response.ApiResponse;
import com.example.powiki.domain.mechanic.service.TypeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
public class TypeController {

    private final TypeService typeService;

    /**
     * 모든 타입 조회
     */
    @GetMapping("/api/types")
    public ResponseEntity<ApiResponse<List<TypeSummaryResponse>>> retrieveAllTypes() {

        List<TypeSummaryResponse> result = typeService.selectAllTypes();

        return ApiResponse.success(result);
    }
}
