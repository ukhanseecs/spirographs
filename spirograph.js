let msPrev = window.performance.now();
const fps = 60;
const msPerFrame = 1000 / fps;

let arr = []; //push points here

document.addEventListener("click", function(e){

    let x = e.clientX;
    let y = e.clientY;
    
    let point = new Vec2d(x,y)
    arr.push(point)
})


let show_lines = false
let start_spiral = false

document.addEventListener("keydown", function(e){
    if(e.key == "Enter"){
        show_lines = !show_lines
    }
    if(e.key == "s"){
        start_spiral = !start_spiral
    }
})


function Loop(){

    animationID = requestAnimationFrame(Loop);
    
         //=======handle timing===================//
        let msNow = window.performance.now();
        let dt = msNow - msPrev;
    
        if(dt < msPerFrame) return
        let excessTime = dt % msPerFrame
        msPrev = msNow - excessTime
        msPrev = msNow;
        dt=dt/1000;
       
       //==========================================//
        
       
        //clear screen
            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.fillRect(0,0,canvas.width ,canvas.height);
            //make_checkerboard();
    

        //====================================================================================================
        

        if(show_lines){
            for (let i=0; i<arr.length; i++){
                DrawLine(arr[i], arr[(i+1)%arr.length], "black")
            }
        }
        
        for (let i = 0; i < arr.length; i++){
            // DrawCircle(arr[i], 5, "red")
            FillCircle(arr[i], 5, "red")
        }

        FillCentroid(arr)
        let centroid = FindCentroid(arr)

        R = GetMaxDistance(arr, centroid) // radius of outer circle
        // R_point = GetMaxDistancePoint(arr, centroid) // point on outer circle
        // DrawLine(centroid, R_point, "orange")


        sum_of_distances = 0
        for (let i = 0; i < arr.length-1; i++){
            sum_of_distances += FindDistance(arr[i], arr[(i+1)%arr.length])
        }

        r = sum_of_distances/(2*arr.length)

        // d = r
        

        points = []
        for (let t = 0; t < 2*Math.PI; t+=0.01) {
            let x = centroid.x + (R-r)*Math.cos(t) + d*Math.cos((R-r)*t/r)
            let y = centroid.y + (R-r)*Math.sin(t) - d*Math.sin((R-r)*t/r)
            points.push(new Vec2d(x,y))
        }

        if (start_spiral){
            for (let i = 0; i < points.length-1; i++) {
                DrawLine(points[i], points[i+1], "blue")
            }
        }
 
        




}
     
    //=======================================================================================     
    
    
    Loop();
    