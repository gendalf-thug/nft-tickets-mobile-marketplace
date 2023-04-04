package com.nftticketsmobilemarketplace;

import android.net.Uri;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.facebook.react.bridge.Promise;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.mlkit.vision.barcode.Barcode;
import com.google.mlkit.vision.barcode.BarcodeScanner;
import com.google.mlkit.vision.barcode.BarcodeScannerOptions;
import com.google.mlkit.vision.barcode.BarcodeScanning;
import com.google.mlkit.vision.common.InputImage;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

public class QrReader extends ReactContextBaseJavaModule  {

    public QrReader(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "QrReader";
    }

    @ReactMethod
    public void readerQR(String fileUrl, final Promise promise ) {
        try {
            Uri uri = Uri.parse(fileUrl);
            InputImage image = InputImage.fromFilePath(this.getReactApplicationContext(), uri);
            BarcodeScannerOptions options = new BarcodeScannerOptions.Builder()
                    .setBarcodeFormats(
                            Barcode.FORMAT_AZTEC,
                            Barcode.FORMAT_QR_CODE
                    )
                    .build();
            final BarcodeScanner scanner = BarcodeScanning.getClient(options);
            Task<List<Barcode>> result = scanner.process(image)
                    .addOnSuccessListener(new OnSuccessListener<List<Barcode>>() {
                        @Override
                        public void onSuccess(List<Barcode> barcodes) {
                            Log.d("OK", " " +  barcodes.toString());
                            List<String> rawValues = new LinkedList<>();
                            for (Barcode barcode: barcodes) {
                                String rawValue = barcode.getRawValue();
                                rawValues.add(rawValue);
                            }
                            scanner.close();
                            if (!rawValues.isEmpty()){
                                String[] returnArray = new String[rawValues.size()];
                                returnArray = rawValues.toArray(returnArray);

                                WritableArray promiseArray=Arguments.createArray();
                                for(int i=0;i<returnArray.length;i++){
                                    promiseArray.pushString(returnArray[i]);
                                }

                                promise.resolve(promiseArray);
                                
                            } else {
                                promise.reject("NOT_OK", "Invalid or No related QR code");
                            }

                        }
                    })
                    .addOnFailureListener(new OnFailureListener() {
                        @Override
                        public void onFailure(@NonNull Exception e) {
                            Log.d("NOT_OK", "" +  e.getMessage());
                            scanner.close();
                            promise.reject("NOT_OK", e.getMessage());

                        }
                    });
        } catch (IOException e) {
            Log.e("ERROR", "" + e.getMessage());
            e.printStackTrace();
        }
    }
}