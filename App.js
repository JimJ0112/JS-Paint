window.addEventListener("load",MainFunc);



//---------------------------------------------------------------------


// Global Variables
const PaintCanvas = document.getElementById("PaintCanvas");
const ctx_PaintCanvas = PaintCanvas.getContext('2d');
var LocationX;
var LocationY;
let StartLocationX , StartLocationY , EndLocationX,EndLocationY;
let isPainting = false;
var DisplayLocationX = document.getElementById("BottomPanel-XLocation");
var DisplayLocationY = document.getElementById("BottomPanel-YLocation");
 var StackData = new Array();
 var UndoData = new Array();
 var RedoData = new Array();
 var counter = 5;
 var CanvasData;


// Main function
function MainFunc(){
   
    console.log("Js loaded");
    console.log(ctx_PaintCanvas);
    PaintCanvas.width = window.innerWidth;
    PaintCanvas.height = window.innerHeight;
    ctx_PaintCanvas.fillStyle = "white";
   
    let cWidth = PaintCanvas.width;
    let cHeight = PaintCanvas.height;
    ctx_PaintCanvas.fillRect(0,0,cWidth,cHeight);
    /*
    // adding a grid to the canvas
    ctx_PaintCanvas.strokeStyle = "#ddd";
    for(var x = 0.5; x <= cWidth; x+=10){
        ctx_PaintCanvas.moveTo(x, 0);
        ctx_PaintCanvas.lineTo(x, cHeight);
    }

    for(var y = 0.5; y <= cHeight; y+=10){
        ctx_PaintCanvas.moveTo(0, y);
        ctx_PaintCanvas.lineTo(cWidth, y);
    }
    ctx_PaintCanvas.strokeStyle = "#ddd";
    ctx_PaintCanvas.stroke();
   */
   

    // Event listeners

  

PaintCanvas.addEventListener("mousedown",StartLoc);
PaintCanvas.addEventListener("mouseup",FinishLoc);
PaintCanvas.addEventListener("mousemove",Draw);

window.addEventListener("resize",function(){     
    PaintCanvas.width = window.innerWidth;
    PaintCanvas.height = window.innerHeight;
});


    window.addEventListener("keydown",function(){
       
        if(event.code === "KeyZ"){
            console.log(event.code);
            ctx_PaintCanvas.clearRect(0,0,PaintCanvas.width,PaintCanvas.height);
            var img = new Image;
           // img.src = CanvasData;
           img.src = UndoData.pop();
           RedoData.push(img);
            img.onload = function(){
                
                ctx_PaintCanvas.drawImage(img,0,0,PaintCanvas.width,PaintCanvas.height);
            }
        }

        if(this.event.code === "KeyR"){
            
            img.src = RedoData.pop();
            img.onload = function(){
                ctx_PaintCanvas.drawImage(img,0,0,PaintCanvas.width,PaintCanvas.height);
            }
        }

        if(this.event.code === "KeyT"){
            document.getElementById("ToolsPanel").style.display="none";
            document.getElementById("BottomPanel").style.display = "none";
        }

        if(this.event.code ==="KeyY"){
            document.getElementById("ToolsPanel").style.display="grid";
            document.getElementById("BottomPanel").style.display = "grid";
        }

    });

    PaintCanvas.addEventListener("touchstart",StartLoc);
    PaintCanvas.addEventListener("touchend",FinishLoc);
    PaintCanvas.addEventListener("touchmove",DrawInTouch);

}

//functions


function StartLoc(e){
    
    isPainting = true;
    LocationX = e.clientX;
    LocationY = e.clientY;
 
    /*
    StartLocationX = e.clientX;
    StartLocationY = e.clientY;
    */
   
    
  
}

function FinishLoc(e){
    isPainting= false;
   ctx_PaintCanvas.beginPath();
   EndLocationX = e.clientX;
   EndLocationY = e.clientY;
 
   CanvasData = PaintCanvas.toDataURL("image/png");

   
UndoData.push(PaintCanvas.toDataURL("image/png"));

console.log(counter);
  

}

function Draw(e){
   // /*
if(isPainting){
    ctx_PaintCanvas.strokeStyle = "black";
    LocationX = e.clientX;
    LocationY = e.clientY;


    DisplayLocationX.textContent = LocationX;
    DisplayLocationY.textContent = LocationY;
    ctx_PaintCanvas.lineWidth = 1;
    ctx_PaintCanvas.lineCap = "round";

    ctx_PaintCanvas.lineTo(LocationX , LocationY);
    
 
    ctx_PaintCanvas.stroke();
    


} else{//console.log("isPainting? " + isPainting);

}

//*/
// experiment



}

function DrawInTouch(e){
    // /*
 if(isPainting){
     ctx_PaintCanvas.strokeStyle = "black";
     LocationX = e.touches[0].clientX;
     LocationY = e.touches[0].clientY;
 
 
     DisplayLocationX.textContent = LocationX;
     DisplayLocationY.textContent = LocationY;
     ctx_PaintCanvas.lineWidth = 1;
     ctx_PaintCanvas.lineCap = "round";
 
     ctx_PaintCanvas.lineTo(LocationX , LocationY);
     
  
     ctx_PaintCanvas.stroke();
     
 
 
 } else{//console.log("isPainting? " + isPainting);
 
 }
 
 //*/
 // experiment
 
 
 
 }

 


const swListener = new BroadcastChannel('swListener');
swListener.onmessage = function(e) {
  console.log('swListener Received', e.data);
  sendPushNotification("JS Paint",e.data);
  
};
 


function sendPushNotification(title,notifbody){
    var title = title;
    var notifbody = notifbody;
  
   // actions.push({ action: "close", title: "Close" });
    
  
       
          
  
                    new Notification(title,{
                        body: notifbody,
                        data: "",
                        icon: 'Images/512.png',
                        tag: "Notify"
                    });
            
                
     
  
        
    
  }



// detect if in offline mode

window.addEventListener('offline', function(){
    if (navigator.onLine) {
        isReachable(getServerUrl()).then(function(online) {
          if (online) {
            console.log('online');
           sendPushNotification("JS Paint","You are now in online mode")

          } else {
           // console.log('no connectivity');
           sendPushNotification("JS Paint","You are now in offline mode")
          }
        });
      } else {
        // handle offline status
        console.log('offline');
        sendPushNotification("JS Paint","You are now in offline mode")

      }
});


function isReachable(url) {
    /**
     * Note: fetch() still "succeeds" for 404s on subdirectories,
     * which is ok when only testing for domain reachability.
     *
     * Example:
     *   https://google.com/noexist does not throw
     *   https://noexist.com/noexist does throw
     */
    return fetch(url, { method: 'HEAD', mode: 'no-cors' })
      .then(function(resp) {
        return resp && (resp.ok || resp.type === 'opaque');
      })
      .catch(function(err) {
        console.warn('[conn test failure]:', err);
      });
  }
  
  function getServerUrl() {
    return document.getElementById('serverUrl').value || window.location.origin;
  }