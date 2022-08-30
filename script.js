let numberOfColumns = 2;
let numberOfRows    = 2;
function solver(){
	
	A = getIndepVarData();
	rref(A);
	
}
function addInputCell(rowElement, columnNumber){
	let newSpan             = document.createElement("span");
	let newInput 			= document.createElement("input");
	newInput.type 			= "number";
	newInput.value 	= 0;
	newInput.className      = "independentVariable";
	newSpan.className	 	= "col"+columnNumber;
	newSpan.appendChild(newInput);
	let childSpan           = document.createElement("span");
	childSpan.innerHTML     = "x"+columnNumber+" + "
	newSpan.appendChild(childSpan);
	let equalsSign			= rowElement.getElementsByClassName("equalsSign");
	rowElement.insertBefore(newSpan, equalsSign[0])
}
function addDependentVariableCell(rowElement){
	let newInput 			= document.createElement("input");
	newInput.type 			= "number";
	newInput.value 	= 0;
	newInput.className	 	= "dependentVariable";
	let span 				= document.createElement("span");
	span.innerHTML          = " = ";
	span.className          = "equalsSign";
	rowElement.appendChild(span)
	rowElement.appendChild(newInput)
}
function addRow(){
	let form   	= container.getElementsByTagName("form")[0];
	let newRow 	= document.createElement("div");
	newRow.id	= "row"+ numberOfRows;
	newRow.className = "row";
	numberOfRows++;
	form.appendChild(newRow);
	for (let i = 0; i < numberOfColumns; i++){
		addInputCell(newRow, i);
	}
	addDependentVariableCell(newRow);
	removePlusSignFromLastColumn();
}

function rref(matrix){
	
	let i = 0
	let j = 0
	while ((i<numberOfRows)&(j<numberOfColumns)){
		for (;j<numberOfColumns;j++){
			rowOfNextPivot = get1stRowWithNonZeroPivotBelowOrAtCurrentPosition(matrix, i, j)
			if (rowOfNextPivot != -1){
				rowExchange(matrix,i,rowOfNextPivot)
				break
			}
		}
		pivot = matrix[i][j]
		matrix[i] = scalarMultiplication(1/pivot,matrix[i])
		subtractRowFromOtherRows(matrix,i,j)
		console.log(matrix);
		i += 1
		j += 1
	}
	
	
}

function subtractRowFromOtherRows(matrix, rowNum, colNum){
	for (let i = 0; i < matrix.length; i++){
		if(i != rowNum){
			leadingNum = matrix[i][colNum]
			matrix[i]=vectorAddition(matrix[i],scalarMultiplication(-1*leadingNum,matrix[rowNum]))	
		}
	}	
}

function get1stRowWithNonZeroPivotBelowOrAtCurrentPosition(matrix, rowNum, colNum){
	
	
	for ( let i = rowNum; i < matrix.length;i++){
		if (matrix[i][colNum] != 0){
			return i
		}
	}	
	return -1
	
}

function rowExchange(matrix,row1index,row2index){
	if (row1index == row2index){return}
	temp = []
	for( let i = 0 ; i<numberOfColumns;i++){
		temp[i]              = matrix[row1index][i]
		matrix[row1index][i] = matrix[row2index][i]
	}
	matrix[row2index] = temp
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

function addColumn(){
	let rows   	= container.getElementsByClassName("row");
	for (row of rows){
		addInputCell(row, numberOfColumns);
	}
	numberOfColumns++;
	addPlusSign2ndToLastColumn();
	removePlusSignFromLastColumn();
}
function removeColumn(){
	if(numberOfColumns>0){
		let colToRemove   = "col"+(numberOfColumns-1);
		let elementsToRemove = document.getElementsByClassName(colToRemove);
		//https://stackoverflow.com/questions/4777077/removing-elements-by-class-name
		while (elementsToRemove.length > 0){
			//console.log(elementNo);
			elementsToRemove[0].remove();
			
		}
		
		numberOfColumns--;
		removePlusSignFromLastColumn();
	}	
}
function removeRow(){
	if(numberOfRows>0){
		let rowIdToRemove = "row"+(numberOfRows-1)
		let rowToRemove   = document.getElementById(rowIdToRemove);
		rowToRemove.remove();
		numberOfRows--;
	}
}
function getIndepVarData(){
	let indepVarElements = document.getElementsByClassName("independentVariable");
	let counter      = 0;
	let indepVarData = [];
	let newRow       = [];

	for(element of indepVarElements){
		if(counter%numberOfColumns==0){
			newRow=[];
			indepVarData.push(newRow);
		}
		newRow.push(Number(element.value));//newRow will point to previous row
		counter++;
	}
	
	return indepVarData;
}
function getDependentVarData(){
	let dependentVarElements = document.getElementsByClassName("dependentVariable");
	let dependentVarData     = [];
	for(let element of dependentVarElements){
		dependentVarData.push(Number(element.value));
	}
	return dependentVarData;
}
function removePlusSignFromLastColumn(){
	let lastCol = document.getElementsByClassName("col"+(numberOfColumns-1))
	for (element of lastCol){
		spanText = element.getElementsByTagName("span")[0].innerHTML;
		element.getElementsByTagName("span")[0].innerHTML = spanText.replace(" + ","");
	}
}
function addPlusSign2ndToLastColumn(){
	let secondToLastCol = document.getElementsByClassName("col"+(numberOfColumns-2))
	for (element of secondToLastCol){
		element.innerHTML =  element.innerHTML.replace(/(x[0-9]+)/g,"$1 + ");
	}
	
}