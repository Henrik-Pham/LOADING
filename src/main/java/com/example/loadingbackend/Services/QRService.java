package com.example.loadingbackend.Services;

import com.example.loadingbackend.QRcodeGenerator;
import com.google.zxing.WriterException;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.util.Collections;
import java.util.Enumeration;

@Service
public class QRService {

    public byte[] generateVoteQRCode() {

        String text = null;
        try {
            text = getIpAddress();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        int width = 400;
        int height = 400;
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
        Enumeration<NetworkInterface> nets = NetworkInterface.getNetworkInterfaces();
        for (NetworkInterface netint : Collections.list(nets)) {
            if (!netint.isLoopback() && netint.isUp() && !netint.isVirtual()) {
                Enumeration<InetAddress> inetAddresses = netint.getInetAddresses();
                while (inetAddresses.hasMoreElements()) {
                    InetAddress inetAddress = inetAddresses.nextElement();
                    if (!inetAddress.isLoopbackAddress() && inetAddress.isSiteLocalAddress()) {
                        // Site local address is typically what you want in a local network
                        System.out.println(inetAddress);
                        return "http://" + inetAddress.getHostAddress() + ":5173/"+ "instruction";

                    }
                }
            }
        }
        throw new IOException("No suitable network interface found");
    }

}