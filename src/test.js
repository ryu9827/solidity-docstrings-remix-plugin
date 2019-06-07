const contract = [
  "pragma solidity 0.5.7;",
  "",
  "contract test {",
  "    ",
  "    uint256 test = 0x0;",
  "    function test2() public view returns(uint256){",
  "        require(test == 0x0);",
  "        return 1;",
  "    }",
  "    ",
  "    function test3(uint256[8] _array) public view{",
  "        uint8 r;",
  "        for(uint256 i =0; i < _array.length;i++){",
  "            if",
  "        }",
  "    }",
  "    ",
  "}"
];

const PragmaDocstings = [
  "/**",
  "*Created on:",
  "*@Summary:",
  "*@Author:",
  "*/"
];

const ContractDocstings = ["/**", "*@title:", "*/"];
const ConstructorDocstings = ["/**", "*@dev:", "*@param ", "*/"];
const FunctionDocstings = ["/**", "*@dev:", "*@param ", "*@return ", "*/"];
const FallbackDocstings = ["/**", "*@dev: fallback function. ", "*/"];

// @dev this is a function for adding docstring to 'pragma solidity', 'contract ', and 'function ()’
// @param array, the file content
// @param keyword, it can be one of them in ['pragma solidity', 'contract ', 'function ()’]
// @param array, the docstrings will be added to the content
function addConstantDocstrings(array, keyword, docstrings) {
  let index; //the keyword index in the arrayToStrings
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (element.includes(keyword) && !hasDocstrings(array, i)) {
      index = i;
      break;
    }
  }
  return [...array.slice(0, index), ...docstrings, ...array.slice(index)];
}

// @dev this is a function for adding docstring to 'constructor', 'function', and 'function ()’
// @param array, the file content
// @param keyword, it can be one of them in ['pragma solidity', 'contract ', 'function ()’]
// @param array, the docstrings will be added to the content
function addVaryingDocstrings(array, keyword) {}

function addForConstructor(array) {}
function addForFunction() {}

//@dev this function is to use to check if an element at index in the array already has docstrings in front.
function hasDocstrings(arr, index) {
  if (index == 0) return false; //avoid under border exception.
  if (arr[index - 1].includes("*/")) return true;
  return false;
}

//@dev utils function to deal with each line in the file content. So that we can see if this line includes keyword.
function removeSpaceBetweenWords(string) {
  return string
    .split(" ")
    .map(elem => elem.trim())
    .reduce((a, b) => a + b);
}

//@dev take in array and return the array element concated, to set file content
//@params array: array being insert docstrings and wait to be set to the file content.
function arrayToStrings(array) {
  return array.reduce((a, b) => a + b);
}

//------------Operation---------------//
const result = addConstant(contract, "contract ", ConstructorDocstings);
console.log(result);
// console.log(arrayToStrings(result));
