
const studentInput = document.querySelector(".inputField input[id='Student']");
const emailInput = document.querySelector(".inputField input[id='Email']");
const addBtn = document.querySelector(".inputField button");
const clearAllBtn = document.querySelector(".footer clear");
baseURL = 'https://robert.dbsprojects.ie:8080/'





let show=()=>{
  removeTable();
  let tab=document.getElementById('tab1');
  let rows=tab1.getElementsByClassName('tabRow');
  fetch('https://robert.dbsprojects.ie:8080/')
    .then(response => response.json())
    .then(data => data.Results.forEach(
    x=> {let rowid = document.getElementById('tab1').attributes['rowid'];
      document.getElementById('tab1').attributes['rowid'] = rowid + 1;
      let newRow=rows[0].cloneNode(true);
      let divs=newRow.getElementsByTagName('td');
      newRow.attributes['rowid'] = rowid;
      divs[0].innerHTML=x['ID'];
      divs[1].innerHTML=x['Name'];
      divs[2].innerHTML=x['Email'];
      tab1.appendChild(newRow);
    }
  )
  ); 
}

let removeTable =()=>{var rowCount = document.getElementById('tab1').rows.length; 
            while(--rowCount) document.getElementById('tab1').deleteRow(rowCount)}
    

function buttonActive(){ 
  let userEnteredStudent=studentInput.value 
  let userEnteredEmail=emailInput.value
  
  if(userEnteredStudent.trim() != 0  && userEnteredEmail != 0){
    addBtn.classList.add("active"); //active the add button
  } 
  else {
    addBtn.classList.remove("active"); //unactive the add button
  }
 };


studentInput.addEventListener("input", buttonActive)
emailInput.addEventListener("input", buttonActive)



let addStudent=()=>{
  let name=document.getElementById('Student').value;
  let email=document.getElementById('Email').value;

  fetch(baseURL+'add?name='+name+'&email='+email).then((resp)=>{alert("Student Added")});
 show();




}

let deleteStudent=()=>{
  let id=document.getElementById('ID').value;
  let x = 
  fetch(baseURL+'delete?id='+id).then((resp)=>{alert("Student Deleted")})
};


let updateStudent=()=>{
  let name=document.getElementById('name').value;
  let email=document.getElementById('email').value;
  let id=document.getElementById('id').value;

  fetch(baseURL+'update?id='+id+'&name='+name+'&email='+email).then((resp)=>{alert("Student Updated")});
}