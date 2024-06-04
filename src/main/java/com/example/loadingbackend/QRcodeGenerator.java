package com.example.loadingbackend;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;


import java.awt.image.BufferedImage;

public class QRcodeGenerator {

    public static BufferedImage generateQRCode(String url, int width, int height) throws WriterException {

        //Generates a QR code with the given URL, width, and height

        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(url, BarcodeFormat.QR_CODE, width, height);
        return MatrixToImageWriter.toBufferedImage(bitMatrix);
    }

}
