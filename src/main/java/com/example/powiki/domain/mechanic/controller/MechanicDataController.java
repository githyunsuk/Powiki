package com.example.powiki.domain.mechanic.controller;

import com.example.powiki.common.response.ApiResponse;
import com.example.powiki.domain.mechanic.service.MechanicDataService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class MechanicDataController {

    private final MechanicDataService mechanicDataService;

    /**
     *  특성 데이터 수집
     */
    @GetMapping("/api/ability/ingestion")
    public ResponseEntity<ApiResponse<Object>> ingestAbility() {
        log.info("### 특성 데이터 수집 시작");

        try {
            mechanicDataService.processAbilityIngestion();

            return ApiResponse.success();
        } catch (Exception e) {
            log.error("### 에러", e);

            return ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     *  타입 데이터 수집
     */
    @GetMapping("/api/type/ingestion")
    public ResponseEntity<ApiResponse<Object>> ingestTypeData() {
        log.info("### 타입 데이터 수집 시작");

        try {
            mechanicDataService.processTypeIngestion();

            return ApiResponse.success();
        } catch (Exception e) {
            log.error("### 에러", e);

            return ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
