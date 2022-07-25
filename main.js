status="";
video="";
objects=[];

function preload(){
    video=createVideo("video.mp4");
    video.hide();
}

function setup(){
    canvas=createCanvas(800, 480);
    canvas.center();
}

function start(){
    object_detector=ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML="Status - Detecting Objects";
}

function modelloaded(){
    console.log("Model is loaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}



function gotresults(error, results){
if(error){
    console.log(error);
}
console.log(results);
objects=results;
}

function draw(){
    image(video, 0, 0, 800, 480);
    if(status != ""){
        objectDetector.detect(video, gotresults);

        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Detected the objects";
            document.getElementById("number_obj").innerHTML="The number of objects detected are:"+objects.length;
            fill("#FF0000");
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label+ " " + percent + " %", objects[i].x, objects[i].y );
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }


}