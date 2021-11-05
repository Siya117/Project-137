status = "";
objects = "";
object_name = "";
function setup()
{
    canvas = createCanvas(480, 400);
    canvas.center();
    music = createCapture(VIDEO);
    music.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object_name = document.getElementById("object_name").value;
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
}

function gotresult(error, result){
    if(error){
        console.log(error);
    }
    else{
        console.log(result);
        objects = result;
    }
}

function draw()
{
    image(music, 0, 0, 480, 400);

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

            if(objects[i].label==object_name)
            {
                music.stop();
                objectDetector.detect(gotresult);
                document.getElementById("status").innerHTML = object_name + "Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name + "Found");
                synth.speak(utterThis);
            }
            else
            {
                document.getElementById("object_name").innerHTML = object_name + " Not Found ";
            }
        }
    }
}