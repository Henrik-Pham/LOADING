package com.example.loadingbackend.Controllers;
import com.example.loadingbackend.Services.QRService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/qr")
//@CrossOrigin(origins = "http://localhost:8080")
@CrossOrigin(origins = "*")
public class QRController {

    private final QRService qrService;
    @Autowired
    public QRController(QRService qrService){
        this.qrService = qrService;
    }

    @CrossOrigin
    @GetMapping( produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> generateQRCode() {
        byte[] qrCode = qrService.generateVoteQRCode();
        final HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);
        return new ResponseEntity<>(qrCode, headers, HttpStatus.CREATED);
    }
}