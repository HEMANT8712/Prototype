package com.newclient;
import android.os.Build;
import android.os.Bundle;
import com.newclient.CustomClientFactory;  // replace <app-name>
import com.facebook.react.modules.network.OkHttpClientProvider;
import okhttp3.OkHttpClient;
import java.lang.Throwable;
import java.lang.Object;
import com.google.android.gms.common.GooglePlayServicesNotAvailableException;
import com.google.android.gms.common.GooglePlayServicesRepairableException;
import com.google.android.gms.security.ProviderInstaller;

import com.reactnativenavigation.controllers.SplashActivity;

 public class MainActivity extends SplashActivity {
/*
   @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
 
                        OkHttpClientProvider.setOkHttpClientFactory(new CustomClientFactory());
        }
    }
    protected void onCreate( Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        try {
            ProviderInstaller.installIfNeeded(getApplicationContext());
        } catch (GooglePlayServicesRepairableException e) {
            e.printStackTrace();
        } catch (GooglePlayServicesNotAvailableException e) {
            e.printStackTrace();
        }
    }
    */
 }
