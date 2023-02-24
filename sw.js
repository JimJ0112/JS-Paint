self.addEventListener("fetch", function(event) {
    console.log(`start server worker`);
  
}); 

  
self.addEventListener("install", function(event) {
    console.log(`service worker has been installed`);
  
  
    evt.waitUntil(    
      caches.open('JSPAINTCache').then(cache => {
      console.log("caching assets");
      //cache.addAll(['/','index.html','Images/512.png','Design.css'])
        cache.addAll(['/']);
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






