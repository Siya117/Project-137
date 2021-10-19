status = "";

function setup()
{
    canvas = createCanvas(480, 450);
    canvas.center();
    music = createCapture(VIDEO);
    music.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
}

function draw()
{
    image(music, 0, 0, 480, 450);

    if(status != "")
    {
        objectDetector.detect(music, gotresult);

        for(i=0; i<objects.length; i++){
            document.getElementById("status").innereHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected: "+objects.length;

            fill("blue");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"% ", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("blue");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}