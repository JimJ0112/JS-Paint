self.addEventListener("fetch", function(event) {
    console.log(`fetch event listener active`);

    event.respondWith(fetchAssets(event));

  
}); 

  
self.addEventListener("install", function(event) {
    console.log(`service worker has been installed`);
  
  
    event.waitUntil(    
      caches.open('JSPAINTCache').then(cache => {
      console.log("caching assets");
      cache.addAll(['/','index.html','Images/512.png','Design.css'])
        //cache.addAll(['/']);
      })
    );


  
    
}); 

self.addEventListener('message', function(event) {
    var data = JSON.parse(event.data);

    console.log("SW Received Message:");
    console.log(data);

    

    countDown(newtime,vehicleID,myEmail);
    const swListener = new BroadcastChannel('swListener');
    swListener.postMessage('Your timer has started');
  
});

  
self.addEventListener("activate",function(){
    console.log("activated");
    
});


// uses cache for offline mode
async function fetchAssets(event){
  try {
    const response  = fetch(event.request);
    return response;

  } catch (error) {
   const ass = await caches.open('JSPAINTCache');

   return ass.match(event.request);
    
  }

  sendPushNotification("JS Paint","You're now in offline mode");

  const swListener = new BroadcastChannel('swListener');
  swListener.postMessage("You're now on offline mode");

}


// sends notification
function sendPushNotification(title,notifbody){
  var title = title;
  var notifbody = notifbody;

 // actions.push({ action: "close", title: "Close" });
  

     
        

                  self.registration.showNotification(title,{
                      body: notifbody,
                      data: "",
                      icon: 'Images/512.png',
                      tag: "Notify"
                  });
          
              
   

      
  
}


sendPushNotification("JS Paint","You're now in offline mode");



