function setup(){
    canvas = createCanvas(600,450);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

PoseNet = ml5.poseNet(video,modelLoaded);
PoseNet.on("pose", gotPoses);
}

scoreLEFTWRIST = 0;
scoreRIGHTWRIST = 0;

song1 = "";
song2 = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}




function modelLoaded(){
    console.log("PoseNet is ready")
   }





function draw(){
    image(video , 0 , 0 , 600 , 600);

    fill("red");

    stroke("black");

    

    status1 = song1.isPlaying();

    if(scoreLEFTWRIST > 0.2)
    {
     
        circle(leftWristX,leftWristY,30);
        song2.stop();

if( status1 == false){
   song1.isPlaying();
   document.getElementById("h1").innerHTML = "Playing : Harry Potter Song"; 
}
    }




status2 = song2.isPlaying();
    
    if(scoreRIGHTWRIST > 0.2)
    {
     
        circle(rightWristX,rightWristY,30);
        song1.stop();

if(status2 == false){
   song2.isPlaying();
   document.getElementById("h1").innerHTML = "Playing : Peter Pan Song"; 
}
    }


}



function gotPoses(results){
    if(results.length > 0){
        console.log(results);
scoreLEFTWRIST =  results[0].pose.keypoints[9].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        
        scoreRIGHTWRIST =  results[0].pose.keypoints[9].score;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

    }
}