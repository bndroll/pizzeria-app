package com.bounderoll.file_system.service;

import com.bounderoll.file_system.response.UploadFileResponse;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    UploadFileResponse save(MultipartFile file, String title);

    Resource load(String fileUrl);
}
