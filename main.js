var canvas=null;
var newObjectDetector=null;
var statusDiv=document.querySelector('.status');
var statusBoolean=false;
var babyDetectedDiv=document.querySelector('.baby_detected');
var detectedObjectArray=[];
var video=null;
var alarm=null;

function preload(){
    alarm=loadSound('sounds/alarm.wav');
}

function gotResult(results, error){
    if(error){
        console.log(error);
    }else{
        console.log(results);
        detectedObjectArray=results;
    }
}

function onModelLoaded(){
    console.log('Model Loaded!');
}

function setup(){
    canvas=createCanvas(380, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    newObjectDetector=ml5.objectDetector('cocossd', onModelLoaded);
    statusBoolean=true;
}    

function draw(){
    image(video, 0, 0, 380, 380);
    if(statusBoolean){
        statusDiv.innerText='Status: Detecting Object(s)';
        newObjectDetector.detect(video, gotResult);

        var personDetectedBoolean=false;
        var objectDetectedBoolean=false;
        for(i=0; i<detectedObjectArray.length; i++){
            statusDiv.innerText='Status: Object(s) Detected';
            objectDetectedBoolean=true;
            if(detectedObjectArray[i].label=='Person'){
                personDetectedBoolean=true;
            }
        }

        if(!(objectDetectedBoolean)){
            babyDetectedDiv.innerText='Baby Not Detected';
            statusDiv.innerText='Status: Object(s) Not Detected';
            alarm.play();
        }else if(personDetectedBoolean){
            babyDetectedDiv.innerText='Baby Detected';
            statusDiv.innerText='Status: Object(s) Detected';
        }else{
            babyDetectedDiv.innerText='Baby Not Detected';
            statusDiv.innerText='Status: Object(s) Detected';
            alarm.play();
        }
    }
}