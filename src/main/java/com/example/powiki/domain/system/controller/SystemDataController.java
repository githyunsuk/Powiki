package com.example.powiki.domain.system.controller;

import com.example.powiki.common.response.ApiResponse;
import com.example.powiki.domain.system.service.SystemDataService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class SystemDataController {

    private final SystemDataService systemDataService;

    /**
     * 버전 데이터 수집
     */
    @GetMapping("/api/version/ingestion")
    public ResponseEntity<ApiResponse<Object>> ingestVersionData() {
        log.info("### 버전 데이터 수집 시작");

        try {
            systemDataService.processVersionIngestion();

            return ApiResponse.success();
        } catch (Exception e) {
            log.error("### 에러", e);

            return ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
