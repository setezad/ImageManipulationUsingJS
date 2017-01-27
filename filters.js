var image = null;
var redimg = null;
var grimg = null
var rainimg = null;
var blurimg = null;

function getNearbyPix(img, pixel){
    var min = -5;
    var max = 5;
    var range = max-min+1;
    var delta = Math.random()*range+min;
    var x = pixel.getX();
    x = x+delta;
    delta = Math.random()*range+min;
    var y = pixel.getY();
    y = y+delta;
    if(y<img.height && y>=0 && x>=0 && x<img.width){
        return img.getPixel(x,y);
    }
    else {
        return pixel;
    }
}

function makeblur(){
    if(image==null){
        return;}
    clearAll(image.width,image.height);
    // modify the duplicate image
    for(var pixel of blurimg.values() ){
        var rnd = Math.random();
        if(rnd>0.5){
            var pix = getNearbyPix(blurimg, pixel);
            blurimg.setPixel(pixel.getX(),pixel.getY(),pix);
        }
       
    }
     var can = document.getElementById("canvas");
     blurimg.drawTo(can);
}

function makeRainbow(){
    if(image==null)
        return;
    clearAll(image.width,image.height);
    // modify the duplicate image
    //red, orange, yellow, green, blue, indigo, violet
   // var x = image.width;
    var y = rainimg.height;
    y = y/7;
    for(var pixel of rainimg.values() ){
         var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
        if(pixel.getY()<y){
            if(avg<128){
                pixel.setRed(2*avg);
                pixel.setBlue(0);
                pixel.setGreen(0);
                
            }
            else{
                pixel.setRed(255);
                pixel.setGreen(2*avg-255);
                 pixel.setBlue(2*avg-255);              
            }
            
       }
        else if(pixel.getY()>=y && pixel.getY()<2*y){
            // (255,160,0)
            if(avg<128){
                pixel.setRed(2*avg);
                pixel.setGreen(0.8*avg);
                pixel.setBlue(0);
            }
            else{
                pixel.setRed(255);
                pixel.setGreen(1.2*avg-51);
                 pixel.setBlue(2*avg-255);  
            }
            
        }
        else if(pixel.getY()>=2*y && pixel.getY()<3*y){
            if(avg<128){
                pixel.setRed(2*avg);
                pixel.setGreen(2*avg);
                pixel.setBlue(0);
            }
            else{
                pixel.setRed(255);
                pixel.setGreen(255);
                 pixel.setBlue(2*avg-255); 
            }
           
        }
        else if(pixel.getY()>=3*y && pixel.getY()<4*y){
            if(avg<128){
                pixel.setGreen(2*avg);
                pixel.setBlue(0);
                pixel.setRed(0);
            }
            else{
                pixel.setRed(2*avg-255);
                pixel.setGreen(255);
                 pixel.setBlue(2*avg-255);
            }
            
        }
        else if(pixel.getY()>=4*y && pixel.getY()<5*y){
            if(avg<128){
                pixel.setBlue(2*avg);
                pixel.setRed(0);
                pixel.setGreen(0);
            }
            else{
                pixel.setRed(2*avg-255);
                pixel.setBlue(255);
                 pixel.setGreen(2*avg-255);
            }
            
        }
        else if(pixel.getY()>=5*y && pixel.getY()<6*y){
            if(avg<128){
                pixel.setBlue(2*avg);
                pixel.setRed(0.8*avg);
                pixel.setGreen(0);
            }
            else{
                pixel.setRed(1.2*avg-51);
                pixel.setBlue(255);
                 pixel.setGreen(2*avg-255);
            }
            //(75,0,130)
             
        }
        else{
            //(238,130,238)
            if(avg<128){
                pixel.setBlue(1.6*avg);
                pixel.setRed(1.6*avg);
                pixel.setGreen(0);
            }
            else{
                pixel.setRed(0.4*avg+153);
                pixel.setBlue(0.4*avg+153);
                 pixel.setGreen(2*avg-255);
            }
            
        }
    }
    var can = document.getElementById("canvas");
    rainimg.drawTo(can);
}

function reset(){
    if(image==null)
        return;
     clearAll(image.width,image.height);   
}


function makeRed(){
    if(image==null)
        return;
    clearAll(image.width,image.height);
    // modify the duplicate image
    for(var pixel of redimg.values() ){
        var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
        if(avg<128){
            pixel.setRed(2*avg);
            pixel.setGreen(0);
            pixel.setBlue(0);
            
        }
        else{
            pixel.setRed(255);
            pixel.setGreen(2*avg-255);
            pixel.setBlue(2*avg-255);
        }
        
    }
    var can = document.getElementById("canvas");
    redimg.drawTo(can);
}


function clearAll(x,y){
    if(image===null){ 
        return;}
    var can = document.getElementById("canvas");
    var cnt = can.getContext("2d");
    cnt.fillStyle = "white";
    cnt.fillRect(0,0,x,y);  
}
function makeGray(){
    if(image===null) {
        return;}
    clearAll(image.width,image.height);
    // modify the duplicate image
    for(var pixel of grimg.values() ){
        var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
        pixel.setRed(avg);
        pixel.setBlue(avg);
        pixel.setGreen(avg);
    }
    var can = document.getElementById("canvas");
    grimg.drawTo(can);
}

function upload(){
    var file = document.getElementById("upload");
    if(file==null){
    return;}
    image = new SimpleImage(file);
    redimg = new SimpleImage(file);
    grimg = new SimpleImage(file);
    rainimg = new SimpleImage(file);
    blurimg = new SimpleImage(file);
    var can = document.getElementById("canvas");
    image.drawTo(can);

}