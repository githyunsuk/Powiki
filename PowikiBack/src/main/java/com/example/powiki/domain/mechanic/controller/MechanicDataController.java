package com.example.powiki.domain.mechanic.controller;

import com.example.powiki.global.response.ApiResponse;
import com.example.powiki.domain.mechanic.service.MechanicDataService;
import com.example.powiki.global.response.ApiStatus;
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

        mechanicDataService.processAbilityIngestion();

        return ApiResponse.success(ApiStatus.OK);
    }

    /**
     *  타입 데이터 수집
     */
    @GetMapping("/api/type/ingestion")
    public ResponseEntity<ApiResponse<Object>> ingestTypeData() {
        log.info("### 타입 데이터 수집 시작");

        mechanicDataService.processTypeIngestion();

        return ApiResponse.success(ApiStatus.OK);
    }

    /**
     * 기술 부가 데이터 수집
     */
    @GetMapping("/api/move-type/ingestion")
    public ResponseEntity<ApiResponse<Object>> ingestMoveTypeData() {
        log.info("### 기술 부가 데이터 수집 시작");

        mechanicDataService.processMoveTypeIngestion();

        return ApiResponse.success(ApiStatus.OK);
    }
}
