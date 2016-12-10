"use strict";

if( document.deviceready){
        	document.addEventListener('deviceready', onDeviceReady, false);
		}else{
        	document.addEventListener('DOMContentLoaded', onDeviceReady, false);
		}

document.getElementById("button1").addEventListener("click", refresh);



let pages = []; // used to store all our screens/pages
let links = []; // used to store all our navigation links

function onDeviceReady() {
   pages = document.querySelectorAll('[data-role="page"]');

    links = document.querySelectorAll('[data-role="nav"] a');
     
    for(let i=0; i<links.length; i++) {
        links[i].addEventListener("click", navigate);
    }
  // create some fake data so you can see how to use a table
//   let jurt0001 = "jurt0001";
    if(!localStorage.getItem("jurt0001")){
      serverData.getJSON();
        console.log("its running serverData.getJSON");  
    }
    
    else {

        serverData.getJSON();
//        displayData(data);    //LINE THAT DOESN'T WORK.
        standingsData();


        console.log("there is something in there ya dummy");
//        localStorage.clear();
        
        
    }

//    displayData();
    
}

function navigate(ev) {
    ev.preventDefault(); 

    let link = ev.currentTarget; 
  console.log(link);
  // split a string into an array of substrings using # as the seperator
    let id = link.href.split("#")[1]; // get the href page name
  console.log(id);
    //update what is shown in the location bar
    history.replaceState({}, "", link.href);
    
    for(let i=0; i<pages.length; i++) {
        if(pages[i].id == id){
             pages[i].classList.add("active");
        } else {
            pages[i].classList.remove("active");
        }           
    }
}

let serverData = {
    url: "https://griffis.edumedia.ca/mad9014/sports/hockey.php",
    httpRequest: "GET",
    getJSON: function () {
        
        // Add headers and options objects
        // Create an empty Request Headers instance
        let headers = new Headers();

        // Add a header(s)
        // key value pairs sent to the server

        headers.append("Content-Type", "text/plain");
        headers.append("Accept", "application/json; charset=utf-8");
        
        // simply show them in the console
        console.dir("headers: " + headers.get("Content-Type"));
        console.dir("headers: " + headers.get("Accept"));
        
        // Now the best way to get this data all together is to use an options object:
        
         // Create an options object
        let options = {
            method: serverData.httpRequest,
            mode: "cors",
            headers: headers
        };
        
        // Create an request object so everything we need is in one package
        let request = new Request(serverData.url, options);
//        console.log(request);
           
        fetch(request)
            .then(function (response) {

        //       console.log(response.json);
                return response.json();
            })
            .then(function (data) {
        setStorage(data);
        displayData(data);
           
//                console.log(data); // now we have JS data, let's display it
//            var j = JSON.stringify(data);
//            console.log(j);
//            localStorage.setItem("jurt0001", j);

                // Call a function that uses the data we recieved  
//                
            })
            .catch(function (err) {
                alert("Error: " + err.message);
            });
        
        
        
    }
    
    

};

function setStorage(data) {
   let j = JSON.stringify(data);
    localStorage.setItem("jurt0001", j);
    
    console.log("Set Storage is working");
    
}

//function displayStorage(data) {
//    localStorage.getItem("jurt0001");
//    
//    console.log("Set Storage is working");
//    
//}


function refresh(){
        localStorage.clear();
//        onDeviceReady(); 
    serverData.getJSON();
}

function displayData(data) {
//  console.log(data);
  
//  localStorage.setItem("jurt0001",JSON.stringify(data));
    
    var myScoreData = JSON.parse(localStorage.getItem("jurt0001"));
//    console.log("From LS: ")
    console.log("HELLO");
    console.log(myScoreData);
        
    //get our schedule
    let ul = document.getElementById("results");
    ul.innerHTML = ""; //clear exisiting list items

    //Create list items for each match in schedule.

    myScoreData.scores.forEach(function(value) {             // Loop for Date
//        let li = document.createElement("li");
//        li.className = "score";
        
        let date = document.createElement("h3");
        date.textContent = value.date;
        date.className = "date";
   
        let homeTeam = null;
        let awayTeam = null;
        let vs = null;
        let matchUp = null;
        let schedule = "";
        
        ul.appendChild(date);
        
    schedule = document.createElement("div");
    schedule.className = "schedule";        
          value.games.forEach(function(item) {               //loop game scores
        
        function getTeamName(teams, id) {                      //loop for getting team names.
            for (let i = 0; i < teams.length; i++) {
                if (teams[i].id == id) {
//                    let names = teams[i].name;
//                    matchUp.textContent += names;
//                    console.log(teams[i].name);
                    console.log("displayData is running too AHHHH");
                    
                    return teams[i].name;
                    }    
            }
            return "unknown";
        }

        let aT = getTeamName(data.teams, item.away);
        let hT = getTeamName(data.teams, item.home); 
    
        matchUp = document.createElement("div");
        matchUp.className = "matchUp";
              
        awayTeam = document.createElement("p");
        awayTeam.textContent += aT;
              
        vs = document.createElement("p");
        vs.textContent = " VS ";      
              
        homeTeam = document.createElement("p");  
        homeTeam.textContent += hT;
        
        
        ul.appendChild(schedule);
        schedule.appendChild(matchUp);
        matchUp.appendChild(awayTeam);
        matchUp.appendChild(vs);       
        matchUp.appendChild(homeTeam); 
              

//        matchUp.textContent = item.away;
//        matchUp.textContent += " " + "   VS   " + " ";  
//        matchUp.textContent += item.home;    
              
                    });

//        h2.textContent = value.date;
//        var vs = awayTeam + " vs " + homeTeam;

//        ul.appendChild(date);
        
       
//        ul.appendChild(awayScore);
//        ul.appendChild(homeScore);
        
//      matchUp.appendChild(awayTeam); 
//      matchUp.appendChild(homeTeam)

    })
}


















function standingsData() {
   let tbody = document.querySelector("#teamStandings tbody");
  
  let wins = 45;
  let losses = 34;
  let ties = 2;
  let points = 110;
  let name = "Ottawa Senators";

  //Sample Tables stuff here:
  let tr = document.createElement("tr");
  let tdn = document.createElement("td");
  tdn.textContent = name;
  let tdw = document.createElement("td");
  tdw.textContent = wins;
  let tdl = document.createElement("td");
  tdl.textContent = losses;
  let tdt = document.createElement("td");
  tdt.textContent = ties;
  let tdp = document.createElement("td");
  tdp.textContent = points;
  tr.appendChild(tdn);
  tr.appendChild(tdw);
  tr.appendChild(tdl);
  tr.appendChild(tdt);
  tr.appendChild(tdp);
  tbody.appendChild(tr);
}