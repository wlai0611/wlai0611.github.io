
function getHouseholder(){
	try{
		let aInput = document.getElementById("startvec").value.trimLeft().trimRight();
		let rInput = document.getElementById("endvec").value.trimLeft().trimRight();
		let a = aInput.split(" ");
		let r = rInput.split(" ");
		if (a.length != r.length){
			throw "THe starting and ending vectors are of different dimensions"
		}
		if (containsNonNumber(a)){
			throw "Starting vector is not in proper format.  Type your vector like this: 1 2 3 4"
		}
		if (containsNonNumber(r)){
			throw "Ending vector is not in proper format.  Type your vector like this: 1 2 3 4"
		}
		
		a = a.map(function (x){return parseFloat(x)})
		r = r.map(function (x){return parseFloat(x)})
		if ( Math.abs(dotProduct(a,a) - dotProduct(r,r)) > 0.00001){
			throw "starting vector and ending vector must have same norm"
		}
		
		let negativeR = scalarMultiplication(-1,r)
		let v         = vectorAddition(a,negativeR)
		let vnorm     = dotProduct(v,v)**0.5;
		if (vnorm != 0){
			vnorm = 1/vnorm;
		}
		let u         = scalarMultiplication(vnorm,v);
		let projector = outerProduct(u,u)
		console.log(projector)
		let i_minus_p = matrixAddition(identity(a.length),projector,subtract=true)
		let reflector = matrixAddition(i_minus_p,projector,subtract=true)
		reflector = roundNumbers(reflector);
		let output    = document.getElementById("householder_output");
		output.value  = printMatrix(reflector);
		console.log('test');
		
	}
	catch(e){
			alert(e)
	}
}

function containsNonNumber(strArray){
	return strArray.map(function (x){return x.match(/\d+/)==null}).reduce(function(x1,x2){return x1+x2}) > 0
}

function Ax(A,x){
  result = []
  for(let i=0;i<A.length;i++){
	  result.push(dotProduct(A[i],x))
  }
  return result
}

function identity(n){
	let result = []
	for (let i = 0;i<n;i++){
		let newRow = []
		
		for (let j = 0;j<n;j++){
			if(i==j){
				newRow.push(1)
			}
			else{
				newRow.push(0)
			}
		}
		result.push(newRow)
	}
	return result
	
}

function matrixAddition(m1,m2,subtract=false){
	let rows = m1.length
	let cols = m1[0].length
	let result = []
	for (let ro = 0; ro<rows;ro++){
		newRow = []
		
		for(let col = 0;col<cols;col++){
			if (subtract){
				newRow.push(m1[ro][col]-m2[ro][col])
			}
			else{
				newRow.push(m1[ro][col]+m2[ro][col])
			}
			
		}
		result.push(newRow)
	}
	return result
}

function outerProduct(v1,v2){
	let result = [];
	for (x of v1){
		result.push(scalarMultiplication(x,v2))
	}
	return result
}

function roundNumbers(matrix){
	return matrix.map(function(row){return row.map(function(x){return Math.round(x*10000)/10000})})
}

function printMatrix(matrix){
	return "[" + matrix.map(function(row) {return ('['+row.toString()+']\n')}).toString() +"]"
}

function parseInputs(){
	let a = document.getElementById("startvec").value;
	let r = document.getElementById("endvec").value;
	
}

function dotProduct(v1,v2){
	if (v1.length != v2.length){
	  throw "Vectors different lengths"
	}
	let dot = 0;
	for (let i = 0;i<v1.length;i++){
		dot = dot + v1[i]*v2[i];
	}
	return dot
}

function vectorAddition(vector1,vector2){
    vectorSum = []
    vectorDimension = vector1.length
    for( let i=0;i<vectorDimension;i++){
        vectorSum.push(vector1[i]+vector2[i])
    }
    return vectorSum
}

function scalarMultiplication(scalar,vector){
    scaledVector = []
    for (num of vector){
        scaledVector.push(scalar*num)
    }
    return scaledVector
}