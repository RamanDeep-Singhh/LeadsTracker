let myLeads=[];
const inputEl=document.getElementById("input-el");
const inputBtn=document.getElementById("btn-el");
const ulEl=document.getElementById("ul-el");
const deleteBtn=document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads"));
const tabBtn=document.getElementById("tab-btn");

if(leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage;
    render(myLeads);
}

//TAB BUTTON
tabBtn.addEventListener("click",function(){

    chrome.tabs.query({active: true, currentWindow: true},function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads",JSON.stringify(myLeads));
        render(myLeads);
    });

});

//Rendering the leads which are inputted by the user as the list 
function render(leads){
    let listItems="";
    for(let i=0;i<leads.length;i++){
        // listItems+="<li><a target='_blank' href=' "+ myleads[i] +"'>"+myleads[i]+"</a></li>";
        listItems+=`
        <li>
            <a target='_blank' href='${leads[i]}'>
                ${leads[i]}
            </a>
        </li>
        `;
    }
    ulEl.innerHTML=listItems;
}



//saving the data entered by clicking the button
inputBtn.addEventListener("click",function(){
    // console.log("button clicked");
   myLeads.push(inputEl.value);
   inputEl.value="";
   localStorage.setItem("myLeads",JSON.stringify(myLeads));
   render(myLeads);
//    console.log(localStorage.getItem("myLeads"));

});

//Deleting the data by double clicking the delete button
deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear();
    myLeads=[];
    render(myLeads);
});




