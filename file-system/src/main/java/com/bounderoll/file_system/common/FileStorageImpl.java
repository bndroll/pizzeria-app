package com.bounderoll.file_system.common;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class FileStorageImpl implements FileStorage {
    private final Path fileStoragePath;
    private final String fileStorageLocation;

    public FileStorageImpl(String propertyLocation) {
        fileStorageLocation = propertyLocation;
        fileStoragePath = Paths.get("file-system", "uploads").toAbsolutePath().normalize();
    }

    @Override
    public String getLocation() {
        return fileStorageLocation;
    }

    @Override
    public Path getPath() {
        return fileStoragePath;
    }

    @Override
    public void createDirectory() {
        try {
            Files.createDirectories(fileStoragePath);
        } catch (IOException e) {
            throw new RuntimeException("Could not create the directory");
        }
    }
}
