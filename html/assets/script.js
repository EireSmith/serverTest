
const inputOne = document.querySelector(".inputField input[id='input1']");
const inputTwo = document.querySelector(".inputField input[id='input2']");
const addBtn = document.querySelector(".inputField button");
const clearAllBtn = document.querySelector(".footer clear");
baseURL = 'https://robert.dbsprojects.ie:8080/'


let show = () => {
    fetch(baseURL).then(
        response => {
            response.json().then(
                data => {
                    console.log(data);
                    if(data.Results.length > 0){
                        var temp = "";
                        data.Results.forEach((x) => {
                            
                            temp += "<td>"+x.ID+"</td>";
                            temp += "<td>"+x.Name+"</td>";
                            temp += "<td>"+x.Email+"</td>";
                            temp += "<td id='updBtn'>"+ "<button class='updBtn' onclick='updateStudent("+x.ID+")'><i class='fa fa-pencil-square-o'> </button>" +
                            "</td>"
                            temp += "<td id='delBtn'>"+ "<button class='delBtn' onclick='deleteStudent("+x.ID+")'><i class='fa fa-ban'></i> </button>" +
                            "</td></tr>"
                            
                        })
                    
                        document.getElementById("tab1").innerHTML = temp;
                    
                    }
                }  
            )
        }
    )
} //used with permission from Burak K.




let removeTable =()=>{var rowCount = document.getElementById('tab1').rows.length; 
            while(rowCount) document.getElementById('tab1').remove();
        }; //causes an Uncaught TypeError: Cannot read properties of null (reading 'remove').  
           //However, it works in the desired manner. The commented function below doesn't 
           //delete the first row of the table. 


/*let removeTable =()=>{var rowCount = document.getElementById('tab1').rows.length; 
            while(--rowCount) document.getElementById('tab1').deleteRow(rowCount);}
*/



function buttonActive(){ 

  let userInput1 =input1.value 
  let userInput2 =input2.value

  if(userInput1.trim() != 0  && userInput2 != 0){
    addBtn.classList.add("active"); //active the add button
  } 
  else {
    addBtn.classList.remove("active"); //unactive the add button
  }
 };


input1.addEventListener("input", buttonActive)
input2.addEventListener("input", buttonActive)



let addStudent=()=>{
  let name=document.getElementById('input1').value;
  let email=document.getElementById('input2').value;

  fetch(baseURL+'add?name='+name+'&email='+email).then((resp)=>{console.log("Student Added")});
  clearInput();
  show();


}


let deleteStudent = (id) => { 
    fetch(baseURL+'delete?id='+id)
    .then((resp) => {
        
        console.log('Student Deleted')
        show();
    })
};

let updateStudent = (id) => {
    let updateName = document.getElementById('input1').value;
    let updateEmail = document.getElementById('input2').value;
    fetch(baseURL+'update?id='+id+'&name='+updateName+'&email='+updateEmail)
    .then((resp) => {
        console.log('Student Deleted')
        clearInput();
        show();
    });
}

