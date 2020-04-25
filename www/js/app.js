var shareApp, changeStatusBarColor, showBottomBannerAd, vibratePhone, checkBatteryLevel;
// Dom7
var $$ = Dom7;


// Init App
var app = new Framework7({
  name : 'Torchlight Free!',
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


  
    window.addEventListener("batterystatus", onBatteryStatus, false);
  
    

    function onBatteryStatus(status) {
        $$("#battery-percent").text(parseInt(status.level));
    }

  

  

  StatusBar.styleLightContent();
  StatusBar.backgroundColorByHexString("#04081d");

  
      changeStatusBarColor = function(suppliedColor){
        StatusBar.backgroundColorByHexString(suppliedColor);
      }



shareApp = function(){

// this is the complete list of currently supported params you can pass to the plugin (all optional)
var options = {

  message: 'Torchlight Free! - Best Torchlight app for your phone! Download Torchlight Free App on Google Play Store', 
  subject: 'Torchlight Free!', // fi. for email
  files: [], // an array of filenames either locally or remotely
  url: 'https://play.google.com/store/apps/details?id=com.codegreenie.torchlightfree',
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






    // switch toggle
    window.plugins.flashlight.toggle(
      function() {
        console.log("Torchlight successful")
      }, // optional success callback
      function() {
       toastMe("Torchlight not available on this device");
      }, // optional error callback
      {intensity: 1} // optional as well
    );







                //Google Admob Monetization here :)

                var admobid = {};
                admobid = {
                  banner: 'ca-app-pub-8716485588609849/9512621535'
                };


            




            


              showBottomBannerAd = function(){
                    if(window.AdMob) AdMob.createBanner({
                    adId:admobid.banner,  
                    position:AdMob.AD_POSITION.BOTTOM_CENTER,
                    overlap: true,
                    autoShow: true,
                    success : function(){
                      console.log("Yay! Banner ad is active");
                    },
                    error : function(){
                      console.log("oops! Banner didn't load. retrying");
                      window.setTimeout(function(){
                        showBottomBannerAd();
                      }, 1500);
                    }
                  });
              }


              
             

              setTimeout(function(){
                  showBottomBannerAd();
              }, 2000);


  
  vibratePhone = function(pattern){
    navigator.vibrate(pattern);
  }

        

  

  document.addEventListener("backbutton", function (){
    window.plugins.flashlight.switchOff();
    navigator.app.exitApp();
}, false);



}




$$(document).on('page:init', function(e){
  var pageName = e.detail.name;
});



$$(document).on('page:beforeout', function (e) {
  // hide before exiting to keep it clean
  AdMob.hideBanner();
});















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
        app.dialog.alert("Created by <b>Abdulazeez Khalid</b> &amp; <b>Turawa Amzat</b> <br><br> <a href='https://facebook.com/itzyhongkashy.horlarmheylheykan' class=external>Khalid - Facebook</a> <br> <a href='https://twitter.com/codegreenie' class=external>Amzat - Twitter</a>");
      })





  }); // end of main page
