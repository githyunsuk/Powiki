package com.example.powiki.domain.system.mapper;

import com.example.powiki.domain.system.model.Version;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface VersionMapper {

    void insertVersion(Version version);
}
