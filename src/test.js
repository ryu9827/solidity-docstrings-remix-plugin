const string = `
pragma solidity 0.5.7;

  contract test {
      

      constructor(uint256 abc, address addr){
          test= abc;
      }
      
      uint256 test = 0x0;

      function test2(address calldata add, 
      uint8 memory number) public view returns(uint256){
          require(test == 0x0);
          return 1;
      }
      
      function test3(uint256[8] _array) public view{
          uint8 r;
          for(uint256 i =0; i < _array.length;i++){
              if
          }
      }

      function () public {
          
      }
  }
  
  contract test3 {
      
      constructor(uint256 abc, address addr){
          test= abc;
      }
      
      uint256 test = 0x0;

      function test2(address calldata add, 
      uint8 memory number) public view returns(uint256){
          require(test == 0x0);
          return 1;
      }
      
      function test3(uint256[8] _array) public view{
          uint8 r;
          for(uint256 i =0; i < _array.length;i++){
              if
          }
      }

      function () public {
          
      }
}`;

const FunctionDocstings = ["/**", " *@dev: ", " */"];
const ConstantDocstrings = new Map([
  [
    "pragma solidity",
    ["/**", " *Created on: ", " *@Summary: ", " *@Author: ", " */"]
  ],
  ["contract ", ["/**", " *@title:", " */"]],
  ["function ()", ["/**", " *@dev: fallback function. ", " */"]]
]);

function addDocstringToAll(fileString) {
  let contentArray = addConstantDocstrings(fileString, "pragma solidity");
  contentArray = addConstantDocstrings(contentArray, "contract ");
  contentArray = addConstantDocstrings(contentArray, "function ()");
  contentArray = addVaryingDocstrings(contentArray, "function ");
  return addVaryingDocstrings(contentArray, "constructor");
}

// @dev this is a function for adding docstring to 'pragma solidity', 'contract ', and 'function ()’
// @param string, the file content
// @param keyword, it can be one of them in ['pragma solidity', 'contract ', 'function ()’]
// @param docstrings, the docstrings will be added to the content
function addConstantDocstrings(fileString, keyword) {
  const originalArray = fileString.split("\n");
  let array = originalArray;

  let index = -1; //the keyword index in the array, default to -1 means not find any keyword without docstrings
  for (let i = 0; i < array.length; i++) {
    const element = array[i];

    if (element.includes(keyword) && !hasDocstrings(array, i)) {
      index = i;
      const indent = countSpaceIndent(element);
      array = [
        ...array.slice(0, index),
        ...ConstantDocstrings.get(keyword).map(
          item => " ".repeat(indent) + item
        ), //adding indents to each line of docstrings
        ...array.slice(index)
      ];
    }
  }
  if (index === -1) {
    return arrayToContent(originalArray); //if index === -1, it means the keyword is not included in the file content
  }
  return arrayToContent(array);
}

// @dev this is a function for adding docstring to 'constructor' and 'function '
// @param array, the file content
// @param keyword, it can be one of them in ['constructor', 'function ']
function addVaryingDocstrings(fileString, keyword) {
  const originalArray = fileString.split("\n");
  let array = originalArray;

  let index = -1;
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    //varying docstrings only adds to function, not Fallback function, that's why we need to check !element.includes('function ()')
    if (
      element.includes(keyword) &&
      !element.includes("function ()") &&
      !hasDocstrings(array, i)
    ) {
      index = i;
      const indent = countSpaceIndent(element);
      // get param names and store in an array
      let string = array[index];
      for (let i = index; i < array.length; i++) {
        if (string.includes("(") && string.includes(")")) {
          break;
        } else {
          string += array[i + 1];
        }
      }
      const paramStart = string.indexOf("(");
      const paramEnd = string.indexOf(")");
      paramArray = string
        .substring(paramStart + 1, paramEnd)
        .split(",")
        .map(item => " *@param " + item.trim() + ": ");

      // insert param names array into docstrings
      let docstrings = [
        FunctionDocstings[0],
        FunctionDocstings[1],
        ...paramArray,
        FunctionDocstings[2]
      ];

      // whether 'returns' keyword exist in this function
      let functionDeclaration = array[index];
      for (let i = index; i < array.length; i++) {
        if (functionDeclaration.includes("{")) {
          break;
        } else {
          functionDeclaration += array[i + 1];
        }
      }

      const returnsIndex = functionDeclaration.indexOf("returns");
      functionDeclaration = functionDeclaration.substring(returnsIndex);
      const returnsStart = functionDeclaration.indexOf("(");
      const returnsEnd = functionDeclaration.indexOf(")");
      const returnsArray = functionDeclaration
        .substring(returnsStart + 1, returnsEnd)
        .split(",")
        .map(item => " *@return " + item.trim() + ": ");

      // insert returns to docstrings
      const length = docstrings.length;
      if (functionDeclaration.includes("returns")) {
        docstrings = [
          ...docstrings.slice(0, length - 1),
          ...returnsArray,
          docstrings[docstrings.length - 1]
        ];
      }

      // insert docstrings into array and go to next loop
      array = [
        ...array.slice(0, index),
        ...docstrings.map(item => " ".repeat(indent) + item), //adding indents to each line of docstrings,
        ...array.slice(index)
      ];
    }
  }
  if (index === -1) {
    return arrayToContent(originalArray); //if index === -1, it means the keyword is not included in the file content
  }

  return arrayToContent(array);
}

//------------ utils ---------------//
//@dev this function is to use to check if an element at index in the array already has docstrings in front.
function hasDocstrings(arr, index) {
  if (index === 0) return false; //avoid under border exception.
  if (arr[index - 1].includes("*/")) return true;
  return false;
}

function arrayToContent(array) {
  return array.reduce((a, b) => a + "\n" + b);
}

function countSpaceIndent(string) {
  let counter = 0;
  while (string.charAt(0) === " ") {
    counter += 1;
    string = string.substring(1);
  }
  return counter;
}
//@dev utils function to deal with each line in the file content. So that we can see if this line includes keyword.
// function removeSpaceBetweenWords(string) {
//   return string
//     .split(" ")
//     .map(elem => elem.trim())
//     .reduce((a, b) => a + b);
// }

//------------ Operation -------------//
const result = addDocstringToAll(string, "contract ");
console.log(result);
