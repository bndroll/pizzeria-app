package com.bounderoll.file_system.controller;

import com.bounderoll.file_system.response.UploadFileResponse;
import com.bounderoll.file_system.service.FileStorageService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@RequestMapping("/file")
@CrossOrigin(origins = "*")
public class FilesController {
    private final FileStorageService storageService;

    public FilesController(final FileStorageService storageService) {
        this.storageService = storageService;
    }

    @PostMapping("")
    public ResponseEntity<UploadFileResponse> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title) {

        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(storageService.save(file, title));
        } catch (Exception e) {
            throw new RuntimeException("Could not upload the file: " + file.getOriginalFilename() + "!");
        }
    }

    @GetMapping("{fileUrl}")
    @ResponseBody
    public ResponseEntity<Resource> getFile(@PathVariable String fileUrl, HttpServletRequest request) {
        Resource file = storageService.load(fileUrl);
        String mimetype;

        try {
            mimetype = request.getServletContext().getMimeType(file.getFile().getAbsolutePath());
        } catch (IOException e) {
            mimetype = MediaType.APPLICATION_OCTET_STREAM_VALUE;
        }

        mimetype = mimetype == null ? MediaType.APPLICATION_OCTET_STREAM_VALUE : mimetype;

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(mimetype))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }
}
