let data: number | string
data = "";
data = 10;

interface ICar {
    color:string
    model:string
    speed?: number
}
const car1 = {
    color:'blue',
    wheels:4,
    model:"BMW"
}
const car2: ICar={
    color:"red",
    model:'mercedes',
    speed: 100
}

const multiply = (x,y) =>{
    return x*y;
};

const multiplyTyped = (x:number,y:number): void =>{
     x*y;
};

const multiplyReturn = (x:number,y:number): number =>{
    return x*y;
};