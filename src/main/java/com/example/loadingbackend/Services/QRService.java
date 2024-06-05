package com.example.loadingbackend.Services;

import com.example.loadingbackend.QRcodeGenerator;
import com.google.zxing.WriterException;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.InetAddress;

@Service
public class QRService {

    public byte[] generateVoteQRCode() {

        String text = null;
        try {
            text = getIpAddress();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        int width = 300;
        int height = 300;
        BufferedImage qrCode = null;
        try {
            qrCode = QRcodeGenerator.generateQRCode(text, width, height);
            ByteArrayOutputStream byteStream = new ByteArrayOutputStream();
            ImageIO.write(qrCode, "png", byteStream);
            return byteStream.toByteArray();
        } catch (WriterException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public String getIpAddress() throws IOException {
        InetAddress ip = InetAddress.getLocalHost();
        String ipAddress = ip.getHostAddress();
        ipAddress = "http://" + ipAddress + ":5173" + "/introduction"; // Target route
        return ipAddress;
    }

}
