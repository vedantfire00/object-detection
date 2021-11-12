img = "";
Status = "";
object= [] ;


function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  Status = true;
}




function draw() 
{
  image(video, 0, 0, 380, 380);
       if(Status != " ")
       {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
         for(i=0;i<object.length;i++)
         {
          document.getElementById("status").innerHTML= "Status : person detected";
          fill(r,g,b);
          percent = floor(object[i].confidence * 100);
          text(object[i].label + " " + percent + "%", object[i].x+15, object[i].y+15);
          noFill();
          stroke(r,g,b);
          rect(object[i].x, object[i].y, object[i].width, object[i].height)
         }

       }
}

function gotResult(error,results) {
  if(error){
    console.error(error);
  }
  console.log(results);
  object = results;
}
