
function getHouseholder(){
	try{
		let aInput = document.getElementById("startvec").value;
		let rInput = document.getElementById("endvec").value;
		let a = aInput.split(" ");
		let r = rInput.split(" ");
		if (a.length != r.length){
			throw "THe starting and ending vectors are of different dimensions"
		}
		else{
			a = a.map(function (x){return parseFloat(x)})
			r = r.map(function (x){return parseFloat(x)})
			let negativeR = scalarMultiplication(-1,r)
			let v         = vectorAddition(a,negativeR)
			let vnorm     = dotProduct(v,v);
			let u         = scalarMultiplication(1/(vnorm**0.5),v);
			let projector = outerProduct(u,u)
			console.log(projector)
			let i_minus_p = matrixAddition(identity(a.length),projector,subtract=true)
			let reflector = matrixAddition(i_minus_p,projector,subtract=true)
			let output    = document.getElementById("householder_output");
			output.value  = printMatrix(reflector);
			console.log('test');
		}
	}
	catch(e){
			alert(e)
	}
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

function printMatrix(matrix){
	return matrix.map(function(row) {return ('['+row.toString()+']\n')}).toString()
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