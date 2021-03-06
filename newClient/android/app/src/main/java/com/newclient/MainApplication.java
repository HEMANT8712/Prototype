package com.newclient;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.rusel.RCTBluetoothSerial.RCTBluetoothSerialPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import com.reactnativenavigation.NavigationApplication;

import com.rusel.RCTBluetoothSerial.* ;

 public class MainApplication extends NavigationApplication //implements ReactApplication
 {

  
  //@Override
  //public void onCreate() {
  //  super.onCreate();
  //  SoLoader.init(this, /* native exopackage */ false);
  //}
  
  @Override
  public boolean isDebug() {
    // Make sure you are using BuildConfig from your own application
    return BuildConfig.DEBUG;
  }

  protected List<ReactPackage> getPackages() {
    // Add additional packages you require here
    // No need to add RnnPackage and MainReactPackage
     return Arrays.<ReactPackage>asList(
       // eg. new VectorIconsPackage()
         new RCTBluetoothSerialPackage()
      );
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
      return getPackages();
  }

  @Override
  public String getJSMainModuleName() {
    return "index";
  }
}
