
let inputs = document.getElementsByClassName("input");
for(let i=0; i<2;i++){
    document.getElementsByClassName("inputs")[i].textContent = "0";
}

for(let i=0; i<2;i++){
    let inputElement = document.getElementsByClassName("inputs");
    inputs[i].addEventListener("click",function(){
        if(inputElement[i].textContent != 0){
            inputElement[i].textContent = "";
        }
        inputElement[i].setAttribute("contenteditable","true");
        inputElement[i].focus();
        inputs[i].style.border = "1px solid rgb(17, 82, 90)";
        if(inputElement[i].textContent == 0){
            inputElement[i].textContent = "";
        }
        inputElement[i].classList.add("bold");
        
    })
    inputElement[i].addEventListener("blur",function(){
        inputs[i].style.border = "1px solid rgba(181, 200, 255, 0.267)";
        if(inputElement[i].textContent == ""){
            inputElement[i].textContent = "0";
            inputElement[i].classList.remove("bold");
        }
        if(document.getElementById("bill").textContent != ""){
            document.getElementById("berror-msg").textContent = "";
        }
        if(document.getElementById("people").textContent != ""){
            document.getElementById("perror-msg").textContent = "";
        }
        
        
        
    })
}


let custom = document.getElementById("custom");

custom.addEventListener("click",function(){
    custom.textContent = "";
    custom.style.border = "1px solid turquoise";
})
custom.addEventListener("blur",function(){
    if(custom.textContent == ""){
        custom.textContent = "Custom";

    }else{
        if(activePerc){
            activePerc.classList.remove("active-perc");
            activePerc = null;
        }
        if(validateInput()){
            let tipPerc = parseInt(custom.textContent)/100;
            calcTip(tipPerc)
        }
        else{
            custom.textContent = "Custom";  

        }
    }
    custom.style.border = "none";
})

let activePerc;

let tips = document.getElementsByClassName("tip");
console.log(tips);

for(let i=0 ;i<5;i++){
    tips[i].addEventListener("click",function(){
        if(custom.textContent != ""){
            custom.textContent = "Custom";  
        }
        if(activePerc == tips[i]){
            activePerc.classList.remove("active-perc");
            activePerc = null;
        }else{
            if(activePerc){
                activePerc.classList.remove("active-perc");
            }
            tips[i].classList.add("active-perc");
            activePerc = tips[i];
        }

        if(validateInput()){
            let tipPerc = parseInt(tips[i].textContent.split("%")[0])/100;
            calcTip(tipPerc);
        }
        
        
    })
}

function validateInput(){
    let bill = parseInt(document.getElementById("bill").textContent);
    let people = parseInt(document.getElementById("people").textContent);
    if(bill == 0){
        let billErrorMsg = document.getElementById("berror-msg");
        billErrorMsg.textContent = "Can't be zero";
        billErrorMsg.style.color = "red";
        document.getElementById("bill-input").style.border = "1px solid red";
        return 0;
    }else if(people == 0){
        let peopleErrorMsg = document.getElementById("perror-msg");
        peopleErrorMsg.textContent = "Can't be zero";
        peopleErrorMsg.style.color = "red";
        document.getElementById("people-input").style.border = "1px solid red";
        return 0;
    }
    return 1;
}

function calcTip(tipPerc){
    let bill = parseInt(document.getElementById("bill").textContent);
    let people = parseInt(document.getElementById("people").textContent);
    let tipAmount = tipPerc * bill;
    let total = bill + (tipAmount);
    let perPerson = total/people;
    console.log(tipAmount,total,perPerson);
    document.getElementById("total").textContent = "$"+ perPerson.toFixed(2);
    document.getElementById("tipAmount").textContent =   "$"+(tipAmount/people).toFixed(2);
}

document.getElementById("reset").addEventListener("click",resetFunc);

function resetFunc(){
    document.getElementById("bill").textContent = "0";
    document.getElementById("people").textContent = "0";
    document.getElementById("tipAmount").textContent = "$0.00";
    document.getElementById("total").textContent = "$0.00";
    if(activePerc != null){
    activePerc.classList.remove("active-perc");
    }
    if(document.getElementById("berror-msg").textContent == "Can't be zero" || document.getElementById("perror-msg").textContent == "Can't be zero"){
        document.getElementById("berror-msg").textContent = "";
        document.getElementById("bill-input").style.border = "1px solid rgba(181, 200, 255, 0.267)";
        
    
        document.getElementById("perror-msg").textContent = "";
        document.getElementById("perror-msg").style.color = "red";
        document.getElementById("people-input").style.border = "1px solid rgba(181, 200, 255, 0.267)";
    }

}

