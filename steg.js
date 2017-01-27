var message;
var packageOrig;
var packagedup;

function retrieve(){
    if(packagedup==null || message==null)
        return;
    clear();
    var dims = getDimension();
    var width = dims[0];
    var height = dims[1];
    var img = new SimpleImage(width,height);
    var pix;
   for(var pixel of img.values()){
        pix = packagedup.getPixel(pixel.getX(),pixel.getY()+1);
        pix = changeBack(pix);
        img.setPixel(pixel.getX(),pixel.getY(),pix);
    }
    var can = document.getElementById("canvas3");
    img.drawTo(can);

}

function getDimension(){
    var pixel = packagedup.getPixel(0,0);
    var d = (pixel.getRed()%16);
    var w = 0;
    var i = 0;
    while(d<10){
        w = w+d*(Math.pow(10,i));
        i =i+1;
        pixel = packagedup.getPixel(i,0);
        d = (pixel.getRed()%16);
    }
    i = i+1;
    var j = 0;
    var h =0;
    pixel = packagedup.getPixel(i,0);
    d = (pixel.getRed()%16);    
     while(d<10){
        h = h+d*(Math.pow(10,j));
        i =i+1; j=j+1;
        pixel = packagedup.getPixel(i,0);
        d = (pixel.getRed()%16);
    }
    var dims = [w,h];
    return dims;
}

function changeBack(pixel){
    var r = (pixel.getRed()%16)*16*2;
    var g = (pixel.getGreen()%16)*16*2;
    var b = (pixel.getBlue()%16)*16*2;
    pixel.setRed(r);
    pixel.setGreen(g);
    pixel.setBlue(b);
    return pixel;
}


function callSteganography(){
    //var inp = document.getElementById("steg");
    if(message==null || packageOrig==null)
        return;
    if(message.width<=packageOrig.width && message.height<packageOrig.height){
          var w = message.width;
          var h = message.height;
        
          //modify the packagedup
         packagedup = firstStage(packagedup);
         //hide the width and height of message
         hideDimensions(w,h);
         //hide message
         packagedup = hide(message, packagedup);
         
         var can = document.getElementById("canvas3");
         packagedup.drawTo(can);
    }
    else{
        return;
    }
}

function hideDimensions(w,h){
    var i = 0, j=0, d;
    var pixel;
    //hide width
    while(w>10){
        d = w%10;
        w = Math.floor(w/10);
        pixel = packagedup.getPixel(i,j);
        pixel.setRed(pixel.getRed()+d);
        pixel.setGreen(pixel.getGreen()+d);
        pixel.setBlue(pixel.getBlue()+d);
        packagedup.setPixel(i,j,pixel);
        i = i+1; 
    }
    pixel = packagedup.getPixel(i,j);
    pixel.setRed(pixel.getRed()+w);
    pixel.setGreen(pixel.getGreen()+w);
    pixel.setBlue(pixel.getBlue()+w);
    packagedup.setPixel(i,j,pixel);
    i = i+1;
    //breakpoint
    pixel = packagedup.getPixel(i,j);
    pixel.setRed(pixel.getRed()+15);
    i =  i+1;
    //hide height
    while(h>10){
        d = h%10;
        h = Math.floor(h/10);
        pixel = packagedup.getPixel(i,j);
        pixel.setRed(pixel.getRed()+d);
        pixel.setGreen(pixel.getGreen()+d);
        pixel.setBlue(pixel.getBlue()+d);
        packagedup.setPixel(i,j,pixel);
        i = i+1; 
    }
    
    pixel = packagedup.getPixel(i,j);
    pixel.setRed(pixel.getRed()+h);
    pixel.setGreen(pixel.getGreen()+h);
    pixel.setBlue(pixel.getBlue()+h);
    packagedup.setPixel(i,j,pixel);
    i = i+1; 
    //breakpoint
    pixel = packagedup.getPixel(i,j);
    pixel.setRed(pixel.getRed()+15);
}

function hide(mimage, pimage){
    var pix, diff;
    for(var pixel of mimage.values()){
        var y = pixel.getY()+1;
        pix = packagedup.getPixel(pixel.getX(),y);
        diff = getSignificant(pixel.getRed())/2;
        pix.setRed(pix.getRed()+diff);
        diff = getSignificant(pixel.getGreen())/2;
        pix.setGreen(pix.getGreen()+diff);
        diff = getSignificant(pixel.getBlue())/2;
        pix.setBlue(pix.getBlue()+diff);
        packagedup.setPixel(pixel.getX(),y, pix);
    }
    return packagedup;
}

function getSignificant(r){
    var sig = Math.floor(r/16);
    return sig;

}
function firstStage(img){
    if(img==null)
        return;
    for(var pixel of img.values()){
        var pix = modifyPixel(pixel);
        img.setPixel(pixel.getX(),pixel.getY(),pix);
    }
    return img;
}

function modifyPixel(pixel){
  //  var e1 = pixel.getRed();
 //   var e2 = pixel.getGreen();
 //   var e3 = pixel.getBlue();
    if(pixel==null)
        return;
    var r = Math.floor(pixel.getRed()/16)*16;
    var g = Math.floor(pixel.getGreen()/16)*16;
    var b = Math.floor(pixel.getBlue()/16)*16;
    pixel.setRed(r);
    pixel.setGreen(g);
    pixel.setBlue(b);
    return pixel;
        
}

function uploadMess(){
    var inp = document.getElementById("messg");
    if(inp==null)
        return;
    message = new SimpleImage(inp);
    
    var can = document.getElementById("canvas1");
    message.drawTo(can);
}

function uploadPack(){
    var inp = document.getElementById("carrier");
    if(inp==null)
        return;
    packageOrig = new SimpleImage(inp);
    packagedup = new SimpleImage(inp);
    
    var can = document.getElementById("canvas2");
    packageOrig.drawTo(can);
}

function clear(){
    var can = document.getElementById("canvas3");
    var cnt = can.getContext("2d");
    cnt.fillStyle = "white";
    cnt.fillRect(0,0,cnt.width,cnt.height);
}