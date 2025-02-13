const BASE_URL =
  "https://currency-rate-exchange-api.onrender.com";
const button=document.querySelector("form button");
const dropdowns=document.querySelectorAll(".dropdown select");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropdowns){
    for(currcode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currcode;
        newOption.value=currcode;
        if(select.name==="from" && currcode==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to" && currcode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
        console.log(evt.target);
    });
}

const updateExchangeRate=async ()=>{
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal===""||amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    console.log(fromCurr.value);
    console.log(toCurr.value);
    let URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}`;
    let response=await fetch(URL);
    let data= await response.json();
    console.log(data);
    let rate=data.rates[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount=amtVal*rate;
    console.log(finalAmount);g
    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

const updateflag=(element)=>{
    let currcode=element.value;
    console.log(currcode);
    let countrycode=countryList[currcode];
    console.log(countrycode);
    let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    console.log(img);
    img.src=newSrc ;
};


button.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load",()=>{
    updateExchangeRate();
})
