img = "";
status = "";
objects = [];

function preload()
{
    baby_alert = loadSound("Alert_Audio_Clip.mp3");
}

function setup()
{
canvas = createCanvas(380,380);
canvas.center();
video = createCapture(VIDEO);
video.size(380,380);
video.hide();
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "status: detcting objects";
}

function modelLoaded()
{
    console.log("model loaded successfully!!!");
    status = true;
}

function gotResult(error,results)
{
if (error)
{
    console.log(error);
}
    console.log(results);
    objects = results;
}

function stop()
{
    baby_alert.stop();
}

function draw()
{
    image(video,0,0,380,380);
    if (status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
    for (i = 0; i< objects.length; i++)
    {
        if(objects[i].label = "person")
        {
            document.getElementById("baby_status").innerHTML = "baby status: found";
            baby_alert.stop();
        }
        else
        {
            document.getElementById("baby_status").innerHTML = "baby status: missing";
            baby_alert.play();
        }
        document.getElementById("status").innerHTML = "status: object detected";
        fill(r,g,b);
        percent = floor(objects[i].confidence* 100);
        text(objects[i].label + " " + percent + "%", objects[i].x +15, objects[i].y+15 );
        noFill();
        stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
    if (objects[i].length < 0)
    {
        document.getElementById("baby_status").innerHTML = "baby status: missing";
        baby_alert.play();
    }
    }
}