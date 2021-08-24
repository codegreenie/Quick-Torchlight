var shareApp, changeStatusBarColor, vibratePhone, checkBatteryLevel, showBottomBannerAd;
// Dom7
var $$ = Dom7;


// Init App
var app = new Framework7({
  name : 'Quick Torchlight',
  id: 'com.codegreenie.torchlightfree',
  root: '#app',
  theme: 'auto',
  language: 'en',
  routes: routes
});

var mainView = app.views.create('.view-main', {
  url : './index.html',
  name : 'main',
  iosSwipeBack : false,
  router : true
});

toastMe = function(toastMessage){

    var toastMe = app.toast.create({
    text: toastMessage,
    position: 'top',
    closeTimeout: 2000,
  });

    toastMe.open();

}




       

document.addEventListener("deviceready", deviceIsReady, false);



function deviceIsReady(){




   var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

  // Set your iOS Settings
  var iosSettings = {};
  iosSettings["kOSSettingsKeyAutoPrompt"] = false;
  iosSettings["kOSSettingsKeyInAppLaunchURL"] = false;

   window.plugins.OneSignal
    .startInit("90f5a0b2-b461-4b7d-bd60-94b95bc843be")
    .handleNotificationOpened(notificationOpenedCallback)
    .iOSSettings(iosSettings)
    .inFocusDisplaying("none")
    .endInit();





                //Google Admob Monetization here :)

                var admobid = {};
                admobid = {
                  banner: 'ca-app-pub-8716485588609849/5271612286'
                };


                showBottomBannerAd = function(){
                    if(window.AdMob) AdMob.createBanner({
                    adId:admobid.banner,  
                    position:AdMob.AD_POSITION.BOTTOM_CENTER,
                    overlap: true,
                    autoShow: true,
                    isTesting : false,
                    success : function(){
                      console.log("Yay! Banner ad is active");
                    },
                    error : function(){
                      console.log("oops! Banner didn't load. retrying");
                      window.setTimeout(function(){
                        showBottomBannerAd();
                      }, 1000);
                    }
                  });
              }




              setTimeout(function(){
                  showBottomBannerAd();
              }, 2000);


  
    window.addEventListener("batterystatus", onBatteryStatus, false);
  
    

    function onBatteryStatus(status) {
        $$("#battery-percent").text(parseInt(status.level));
        if (status.isPlugged == true) {
          $$("#is-charging").text("Charging...");
        }
        else{
          $$("#is-charging").text("");
        }
        
    }



    window.addEventListener("batterylow", onBatteryLow, false);

      function onBatteryLow(status) {
          app.dialog.alert("Battery Low! <br> Please charge your device.");
      }

 


  StatusBar.styleLightContent();
  StatusBar.backgroundColorByHexString("#04081d");

  
      changeStatusBarColor = function(suppliedColor){
        StatusBar.backgroundColorByHexString(suppliedColor);
      }



    var shareMessage, shareUrl;
        if( /(android)/i.test(navigator.userAgent) ) { // for android & amazon-fireos
          
          shareMessage = "Quick Torchlight, Super clean & Lightweight Torchlight for your phone. Download from Google Play Store";
          shareUrl = "https://play.google.com/store/apps/details?id=com.codegreenie.torchlightfree";

        } else{ // for ios
            
            shareMessage = "Torchlight Free, Super clean & Lightweight Torchlight for your phone. Download from App Store";
            shareUrl = "https://play.google.com/store/apps/details?id=com.codegreenie.torchlightfree";

        }



shareApp = function(){

// this is the complete list of currently supported params you can pass to the plugin (all optional)
var options = {

  message: shareMessage, 
  subject: 'Quick Torchlight', // fi. for email
  files: [], // an array of filenames either locally or remotely
  url: shareUrl,
  chooserTitle: 'Share via'
};

var onSuccess = function(result) {
  //console.log("Share was successful");
};

var onError = function(msg) {
  //console.log("Sharing Failed!");
};

window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);

}






    // switch on immediately
    window.plugins.flashlight.switchOn(
      function() {
        console.log("Torchlight successful")
      }, // optional success callback
      function() {
       toastMe("Torchlight not available on this device");
      }, // optional error callback
      {intensity: 1} // optional as well
    );






  
  vibratePhone = function(pattern){
    navigator.vibrate(pattern);
  }

        

  

  document.addEventListener("backbutton", function (){
    window.plugins.flashlight.switchOff();
    navigator.app.exitApp();
}, false);



}

















$$(document).on('page:afterin', '.page[data-name="main"]', function (e){
  
  changeStatusBarColor("#043a7a");

  });
  
$$(document).on('page:init', '.page[data-name="main"]', function (e){

  if (!window.localStorage.getItem("torch_status")) {

    window.localStorage.setItem("torch_status", "on");

  }

  window.localStorage.setItem("torch_status", "on");

  
    $$("#torch-switch").click(function(){

      var checkTorchStatus = window.localStorage.getItem("torch_status");
      
      if (checkTorchStatus == "on") {

     window.plugins.flashlight.switchOff();

        $$("#torch-icon").prop("src", "imgs/torch_off.png");
        // turn OFF torch light here
        window.localStorage.setItem("torch_status", "off");
        vibratePhone(50);
        toastMe("Torchlight is OFF...");
        
      }
      else{

        window.plugins.flashlight.switchOn(
      function() {
        console.log("Torchlight successful")
      }, // optional success callback
      function() {
       toastMe("Unable to turn ON Torchlight");
      }, // optional error callback
      {intensity: 1} // optional as well
    );


        $$("#torch-icon").prop("src", "imgs/torch_on.png");
        // turn ON torch light here
        window.localStorage.setItem("torch_status", "on");
        vibratePhone(50);
        toastMe("Torchlight is ON...");
      }
      
    });



      $$(".share-btn").click(function(){
        shareApp();
      });


      $$("#about-app").click(function(){
        app.dialog.alert("v1.3.5 - by <b>Codegreenie</b> <br><br>More apps by <a href='https://play.google.com/store/apps/dev?id=8403908509363603689' class=external>Codegreenie</a><br>Twitter <a href='https://twitter.com/codegreenie' class=external>@codegreenie</a>");
      });





  }); // end of main page
