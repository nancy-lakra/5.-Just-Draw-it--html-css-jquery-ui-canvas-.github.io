$(function(){

    //VARIABLES DECLARATION
    var paint = false;                              //we are not currently painting
    var paint_erase = "paint";                      //painting or erasing
    var canvas = document.getElementById("paint");  //get the canvas
    var ctx = canvas.getContext("2d");              //get the context
    var container = $("#container");                //get the container
    var mouse = {x:0, y:0};                         //set the mouse pointer

    //LOAD ANY PREVIOUSLY SAVED WORK
    if(localStorage.getItem("imgCanvas")!=null){
        var img = new Image();
        img.onload = function(){
            ctx.drawImage(img,0,0);
        }
        img.src = localStorage.getItem("imgCanvas");
    }

    //SET DRAWING PARAMETERS
    ctx.lineWidth = 1;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    //CLICK INSIDE CANVAS
    container.mousedown(function(e){
        paint = true;
        ctx.beginPath();
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        ctx.moveTo(mouse.x,mouse.y);
    });

    //MOVE THE MOUSE WHILE HOLDING MOUSE KEY
    container.mousemove(function(e){
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        if(paint==true){
            if(paint_erase=="paint"){
                //get color input
                ctx.strokeStyle = $("#paintColor").val();
            }
            else{
                //white color
                ctx.strokeStyle = "white";
            }
            ctx.lineTo(mouse.x,mouse.y);
            ctx.stroke();
        }
    });
    
    //MOUSE UP -> WE AREN'T PAINTING OR ERASING ANYMORE
    container.mouseup(function(){
        paint = false;
    });

    //IF WE LEAVE THE CONTAINER, WE AREN'T PAINTING OR ERASING ANYMORE
    container.mouseleave(function(){
        paint = false;
    });

    //CLICK ON ERASE BUTTON
    $("#erase").click(function(){
        if(paint_erase=="paint")
        {
            paint_erase = "erase";
        }
        else
        {
            paint_erase = "paint";
        }
        $ (this).toggleClass("erasemode");
    });

    //CLICK ON SAVE BUTTON
    $("#save").click(function(){
        if(typeof(localStorage)!=null){
            localStorage.setItem("imgCanvas",canvas.toDataURL());
        }
        else {
            window.alert("Your browser does not support save feature!");
        }
    });

    //CLICK ON RESET BUTTON
    $("#reset").click(function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        paint_erase = "paint";
        $("#erase").removeClass("erasemode");
    });

    //CHANGE COLOR INPUT
    $("#paintColor").change(function(){
        $("#weight").css("background-color",$(this).val());

    });

    //CREATING SLIDER
    $("#slider").slider({
        min: 3,
        max: 20,
        slide: function(event, ui){
            $("#weight").height(ui.value);
            $("#weight").width(6*ui.value);
            $("#weight").css("border-radius","4px");
            ctx.lineWidth = ui.value;
        }
    });

});