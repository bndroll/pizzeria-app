package com.bounderoll.file_system.config;

import com.bounderoll.file_system.common.FileStorage;
import com.bounderoll.file_system.common.FileStorageImpl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FileStorageConfig {
    @Value("${file.storage.location}")
    private String storageLocation;

    @Bean
    public FileStorage getFileStorage() {
        FileStorage fileStorage = new FileStorageImpl(storageLocation);
        fileStorage.createDirectory();
        return fileStorage;
    }
}
