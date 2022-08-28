let numberOfColumns = 2;
let numberOfRows    = 2;
function solver(){
	let indepVarData = getIndepVarData();
	console.log("test");
	console.log(indepVarData);
	let dependentVarData = getDependentVarData();
	console.log(dependentVarData);
	
	
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
		element.innerHTML = element.innerHTML.replace(" + ","");
	}
}
function addPlusSign2ndToLastColumn(){
	let secondToLastCol = document.getElementsByClassName("col"+(numberOfColumns-2))
	for (element of secondToLastCol){
		element.innerHTML =  element.innerHTML.replace(/(x[0-9]+)/g,"$1 + ");
	}
	
}