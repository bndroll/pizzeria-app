package com.bounderoll.file_system.service;

import com.bounderoll.file_system.common.FileStorage;
import com.bounderoll.file_system.response.UploadFileResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;

@Service
public class FileStorageServiceImpl implements FileStorageService {
    @Autowired
    FileStorage fileStorage;

    @Override
    public UploadFileResponse save(final MultipartFile file, String title) {
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(title));
        String[] fileSplit = Objects.requireNonNull(file.getOriginalFilename()).split("\\.");
        Path filePath = Paths.get(fileStorage.getPath() + "\\" + fileName + "." + fileSplit[1]);
        String fileUrl = "/file/" + title + "." + fileSplit[1];

        try {
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException("Could not store the file", e);
        }

        return new UploadFileResponse(fileUrl, title);
    }

    @Override
    public Resource load(final String fileUrl) {
        Path path = Paths.get(fileStorage.getLocation()).toAbsolutePath().resolve(fileUrl);

        try {
            Resource resource = new UrlResource(path.toUri());

            if (resource.exists() && resource.isReadable())
                return resource;
            else
                throw new RuntimeException("File doesn't exist or not readable");

        } catch (MalformedURLException e) {
            throw new RuntimeException("Could not read the file", e);
        }
    }
}
