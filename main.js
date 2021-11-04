// Set up canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

function coordmapper(lat, lon) {
    return [height * ( 1 - lat / 90) / 2, width * (lon / 360 + 1/2) ]
}

function Plane(lat, lon){
    this.lat = lat;
    this.lon = lon;
}

Plane.prototype.draw = function()
{
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    let [y,x] = coordmapper(this.lat, this.lon);
    ctx.arc(x,y, 1,0,2 * Math.PI);
    console.log(x,y);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(30,40,10,0,2 * Math.PI);
    ctx.fill();
}
function debugScreen()
{
    console.log("Width", width);
    console.log("Height", height);
    ctx.beginPath();
    ctx.lineTo(0,0);
    ctx.lineTo(width,height);
    
}
let testBall = new Plane(0,0);
debugScreen();

testBall.draw()

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};
var resultin = null;

async function GetData(){
    const response = await fetch("https://api.centurionx.net/plane/frame", requestOptions);
    const result = await response.json();
    return result;
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main(){
    
    do
    {
        const frame = await GetData();

        const planeList = frame.planes;

        console.log(frame.now);

        (planeList).forEach(element => {
           const planeSpot = new Plane(element.lat,element.lon); 
           planeSpot.draw();
        });
        const firstPlaneInfo = planeList[0];

        const plane1 = new Plane(firstPlaneInfo.lat,firstPlaneInfo.lon);

        
        plane1.draw();
        
        await sleep(5000);
    }
    while(true)
}

main();