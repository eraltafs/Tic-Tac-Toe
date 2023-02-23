arr = ["", "", "", "", "", "", "", "", ""];

count = 0;
let a = document.getElementById("a");
let b = document.getElementById("b");
let c = document.getElementById("c");
let d = document.getElementById("d");
let e = document.getElementById("e");
let f = document.getElementById("f");
let g = document.getElementById("g");
let h = document.getElementById("h");
let i = document.getElementById("i");
let result = document.getElementById("resulttext")
a.onclick = () => {
  if (arr[0] == "" && count % 2 == 0) {
    arr[0] = "X";
    count++;
    show();
  } else if (arr[0] == "" && count % 2 == 1) {
    arr[0] = "O";
    count++;
    show();
  }
};

b.onclick = () => {
  if (arr[1] == "" && count % 2 == 0) {
    arr[1] = "X";
    count++;
    show();
  } else if (arr[1] == "" && count % 2 == 1) {
    arr[1] = "O";
    count++;
    show();
  }
};

c.onclick = () => {
  if (arr[2] == "" && count % 2 == 0) {
    arr[2] = "X";
    count++;
    show();
  } else if (arr[2] == "" && count % 2 == 1) {
    arr[2] = "O";
    count++;
    show();
  }
};
d.onclick = () => {
  if (arr[3] == "" && count % 2 == 0) {
    arr[3] = "X";
    count++;
    show();
  } else if (arr[3] == "" && count % 2 == 1) {
    arr[3] = "O";
    count++;
    show();
  }
};

e.onclick = () => {
  if (arr[4] == "" && count % 2 == 0) {
    arr[4] = "X";
    count++;
    show();
  } else if (arr[4] == "" && count % 2 == 1) {
    arr[4] = "O";
    count++;
    show();
  }
};

f.onclick = () => {
  if (arr[5] == "" && count % 2 == 0) {
    arr[5] = "X";
    count++;
    show();
  } else if (arr[5] == "" && count % 2 == 1) {
    arr[5] = "O";
    count++;
    show();
  }
};

g.onclick = () => {
  if (arr[6] == "" && count % 2 == 0) {
    arr[6] = "X";
    count++;
    show();
  } else if (arr[6] == "" && count % 2 == 1) {
    arr[6] = "O";
    count++;
    show();
  }
};

h.onclick = () => {
  if (arr[7] == "" && count % 2 == 0) {
    arr[7] = "X";
    count++;
    show();
  } else if (arr[7] == "" && count % 2 == 1) {
    arr[7] = "O";
    count++;
    show();
  }
};

i.onclick = () => {
  if (arr[8] == "" && count % 2 == 0) {
    arr[8] = "X";
    count++;
    show();
  } else if (arr[8] == "" && count % 2 == 1) {
    arr[8] = "O";
    count++;
    show();
  }
};

let show = () => {
  console.log(count);
  console.log(arr);
  a.textContent = arr[0];
  b.textContent = arr[1];
  c.textContent = arr[2];
  d.textContent = arr[3];
  e.textContent = arr[4];
  f.textContent = arr[5];
  g.textContent = arr[6];
  h.textContent = arr[7];
  i.textContent = arr[8];
  if(arr[0]=="X"&&arr[1]=="X"&&arr[2]=="X"){
    result.innerText = "first player win"
  }else if(arr[0]=="O"&&arr[1]=="O"&&arr[2]=="O"){
    result.innerText = "second player win"
  }
  if(arr[3]=="X"&&arr[4]=="X"&&arr[5]=="X"){
    result.innerText = "first player win"
  }else if(arr[3]=="O"&&arr[4]=="O"&&arr[5]=="O"){
    result.innerText = "second player win"
  }
  if(arr[6]=="X"&&arr[7]=="X"&&arr[8]=="X"){
    result.innerText = "first player win"
  }else if(arr[6]=="O"&&arr[7]=="O"&&arr[8]=="O"){
    result.innerText = "second player win"
  }

  if(arr[0]=="X"&&arr[4]=="X"&&arr[8]=="X"){
    result.innerText = "first player win"
  }else if(arr[0]=="O"&&arr[4]=="O"&&arr[8]=="O"){
    result.innerText = "second player win"
  }
  if(arr[2]=="X"&&arr[4]=="X"&&arr[6]=="X"){
    result.innerText = "first player win"
  }else if(arr[2]=="O"&&arr[4]=="O"&&arr[6]=="O"){
    result.innerText = "second player win"
  }
  if(arr[0]=="X"&&arr[3]=="X"&&arr[6]=="X"){
    result.innerText = "first player win"
  }else if(arr[0]=="O"&&arr[3]=="O"&&arr[6]=="O"){
    result.innerText = "second player win"
  }
  if(arr[1]=="X"&&arr[4]=="X"&&arr[7]=="X"){
    result.innerText = "first player win"
  }else if(arr[1]=="O"&&arr[4]=="O"&&arr[7]=="O"){
    result.innerText = "second player win"
  }
  if(arr[2]=="X"&&arr[5]=="X"&&arr[8]=="X"){
    result.innerText = "first player win"
  }else if(arr[2]=="O"&&arr[5]=="O"&&arr[8]=="O"){
    result.innerText = "second player win"
  }


 
  valchk = 0
  for(let j=0;j<arr.length;j++){
    if(arr[j]!=""){
        valchk++
    }
  }
  if(valchk==9&&result.innerText==""){
    result.innerText = "TIE or draw"
  }

};
