package com.bounderoll.file_system.common;

import java.nio.file.Path;

public interface FileStorage {
    String getLocation();

    Path getPath();

    void createDirectory();
}
