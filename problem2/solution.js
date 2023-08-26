


// Problem 1  Easy=======================================>
// Am I Perfect?

function Perfect(num) {
    let factor = []
    for (let i = 1; i < num; i++) {
        if (num % i === 0) {
            factor.push(i)
        }
    }
    return factor

}

function PerfectNumber(num) {
    let factors = Perfect(num)
    let sum = 0;
    for (let i = 0; i < factors.length; i++) {
        sum += factors[i];
    }
    if (sum === num) {
        return "Perfect"
    } else if (sum > num) {
        return "Abundant"
    } else {
        return "Deficient"
    }
}

console.log(PerfectNumber(6))
console.log(PerfectNumber(12))
console.log(PerfectNumber(8))



//StepToReach
function numOfSteps(x){
    let steps =0;

  while(x!== 1){
    if(x%2 === 0){
        x/=2
    }else{
        x= 3*x+1
    }
    steps++
  }
  return steps
}
var step = numOfSteps(12)
console.log("Number of Steps :",step)






//Problem 2 =======================================>
// MEDIUM: Greater than and less than in a matrix
function FindValues(mat){
    let val = []
    
    for(let i= 0; i<mat.length; i++){
        for(let j =0; j<mat[i].length; j++){
            let curr = mat[i][j]
            let flage = true;

            for(let k =0; k<mat[i].length; k++){
                if(curr< mat[i][k]){
                    flage = false ;
                    break;
                }
            }
            for(let k =0; k<mat.length; k++){
                if(curr > mat[k][j]){
                    flage = false ;
                    break;
                }
            }
            if(flage){
                val.push(curr)
            }

        }
    }
 return val ;
}
const mat = [
               [7,8,7],
               [5,4,2],
               [8,6,7]
            ]
            
var value = FindValues(mat)    
console.log("Value :", value)







// Problem 3==========================================>
//Catch the fish
function fishCatch(k,l,m,n,t){
    let count = 0;
    for(let i= 0; i<t; i++){
        if(i%k === 0 || i%l === 0 || i%m === 0 || i%n === 0 ){
            count++;
        }
    }
    return count

}

var fish = fishCatch(1,2,3,4,12)
// var fishes = fishCatch(2,3,4,5,24)
console.log( "Fish :" ,fish)
// console.log(fishes)