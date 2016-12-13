"use strict";


if( document.deviceready){
        	document.addEventListener('deviceready', onDeviceReady, false);
		}else{
        	document.addEventListener('DOMContentLoaded', onDeviceReady, false);
		}

document.getElementById("button1").addEventListener("click", refresh);

let pages = [];
let links = []; 

function onDeviceReady() {
   pages = document.querySelectorAll('[data-role="page"]');
   links = document.querySelectorAll('[data-role="nav"] a');
     
    for(let i=0; i<links.length; i++) {
        links[i].addEventListener("click", navigate);
    }

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


    
}

function navigate(ev) {
    ev.preventDefault(); 

    let link = ev.currentTarget; 
    let id = link.href.split("#")[1]; 
    
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
        
        let headers = new Headers();

        headers.append("Content-Type", "text/plain");
        headers.append("Accept", "application/json; charset=utf-8");
//        console.dir("headers: " + headers.get("Content-Type"));
//        console.dir("headers: " + headers.get("Accept"));
        
        let options = {
            method: serverData.httpRequest,
            mode: "cors",
            headers: headers
        };
        
        let request = new Request(serverData.url, options);
           
        fetch(request)
            .then(function (response) {

                return response.json();
            })
            .then(function (data) {
            
        setStorage(data);
        displayData(data);  
            
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

function refresh(){
        localStorage.clear(); 
        serverData.getJSON();
}



function displayData(data) {
    
    var myScoreData = JSON.parse(localStorage.getItem("jurt0001"));

//    console.log(myScoreData);
        
    let ul = document.getElementById("results");
    ul.innerHTML = ""; 

    myScoreData.scores.forEach(function (value) {            
        
        let date = document.createElement("h3");
        date.textContent = value.date;
        date.className = "date";
   
        let homeTeam = null;
        let awayTeam = null;
        let vs = null;
        let matchUp = null;
        let schedule = "";
        
        ul.appendChild(date);
//        console.log(myScoreData.scores.games.length);
        
//    if (value.games.home_score > value.games.away_score){
//        console.log(home_score);
//    }
        
        
    schedule = document.createElement("div");
    schedule.className = "schedule";      
        
    value.games.forEach(function(item) {  
//        let homey = textContent.home_score;
//console.log(homey);
//        
//    if(value.home_score > value.away_score){
//            console.log("home wins");    
//    }
        
        
        function getTeamName(teams, id) {                      
            for (let i = 0; i < teams.length; i++) {
                if (teams[i].id == id) {

//                    console.log("getTeamName is running");
                    
                    return teams[i].name;
                }      
            }
            
        }
        
//        stats.push({"id":teams[i].id, "name":teams[i].name}); 
//        console.log(stats);

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
              
                    });

                               })
}
                               
function standingsData(data) {
   let tbody = document.querySelector("#teamStandings tbody");
  
    var myScoreData = JSON.parse(localStorage.getItem("jurt0001"));
    console.log(myScoreData);
        
    myScoreData.scores.forEach(function (value) {
    
  
        
//         let aT = TeamNames(data.teams, item.away);
//        let hT = TeamNames(data.teams, item.home); 
    
    })
    
//    console.log(aT);
//    console.log(hT);
    
    
    
    let scores = myScoreData.scores; 
    let teams = myScoreData.teams;
    
    let scoresId = scores.games;
    
//    console.log(scoresId);
    
        
//    teams.forEach(function (item){
//        console.log(item.id)
//        
//        if(item.id == id){
//            
//        return item.name;
//        
//    }              
//                      
//                      
//                      })
        
    
    
       
    let stats = [];
    
//      console.log(teams);
    
    teams.forEach(function (value){
           var team = {
            teamId: value.id, 
            teamName: teamNames(teams, value.id),
               wins: 0,
               losses: 0,
               ties: 0,
               pts: 0
               
           }
//           console.log(team); 
           stats.push(team);

       });

    for (let i=0; i < myScoreData.scores.length; i++){
//        console.log("there is this many days");
      
        
    for (let g=0; g < myScoreData.scores[g].games.length; g++){

        let homeScore = myScoreData.scores[i].games[g].home_score;
        let awayScore = myScoreData.scores[i].games[g].away_score;
        let homeTeam = myScoreData.scores[i].games[g].home;
        let awayTeam = myScoreData.scores[i].games[g].away;

//        if(myScoreData.scores[i].games[g].home_score > myScoreData.scores[i].games[g].away_score && homeTeam == stats[i].teamId){
//            
  
        if(homeScore > awayScore) {
            for (var x = 0; x < stats.length; x++){ if (homeTeam == stats[x].teamId){ stats[x].wins++; stats[x].pts += 2; stats[x].losses += 0; stats[x].ties += 0; }}    
        }
        
         if(awayScore > homeScore) {
            for (var x = 0; x < stats.length; x++){ if (awayTeam == stats[x].teamId){ stats[x].wins++; stats[x].pts += 2; stats[x].losses += 0; stats[x].ties += 0; }}    
        }
        
        if(awayScore == homeScore) {
            for (var x = 0; x < stats.length; x++){ if (homeTeam == stats[x].teamId){ stats[x].wins += 0; stats[x].pts += 1; stats[x].losses += 0; stats[x].ties += 1; }}    
        }
        
        if(awayScore == homeScore) {
            for (var x = 0; x < stats.length; x++){ if (awayTeam == stats[x].teamId){ stats[x].wins += 0; stats[x].pts += 1; stats[x].losses += 0; stats[x].ties += 1; }}    
        }
        
         if(homeScore > awayScore) {
            for (var x = 0; x < stats.length; x++){ if (awayTeam == stats[x].teamId){ stats[x].wins += 0; stats[x].pts += 0; stats[x].losses += 1; stats[x].ties += 0; }}    
        }
        
         if(awayScore > homeScore) {
            for (var x = 0; x < stats.length; x++){ if (homeTeam == stats[x].teamId){ stats[x].wins += 0; stats[x].pts += 0; stats[x].losses += 1; stats[x].ties += 0; }}    
        
            }
        }
        
        
    }

    
    
    stats.forEach(function(value){
     
        let tr = document.createElement("tr");
        let tdn = document.createElement("td"); //creating a table cell
        let logo = document.createElement("div"); //creating the icons element inside my table cell
        logo.setAttribute("id", "icons"); //setting the icons element with a class
        let originalSVG = document.querySelector("section.template svg"); //locating my orginal SVG element
        let copySVG = originalSVG.cloneNode(true); //Cloning my SVG
        logo.appendChild(copySVG); //Appending the cloned SVG into the table cell beside all my team names

//    console.log(copySVG);
        
        
        
        let tName = tdn.innerHTML = value.teamName; //printing the team name into the table
        let theTeamName = tName.split(" ").join("_"); //giving team name underscores
        console.log(theTeamName); //making sure i'm getting the right thing.
        let iconDiv = document.getElementById("icons");  //selecting the div where my svg's are stored.
        iconDiv.classList.add(theTeamName);
        console.log(iconDiv);
        

        
        
        let tdw = document.createElement("td");
        
        
        
        tdw.innerHTML = value.wins;
        let tdl = document.createElement("td");
     
        
        tdl.innerHTML = value.losses;
        let tdt = document.createElement("td");
       
        
        tdt.innerHTML = value.ties;
        let tdp = document.createElement("td");
      
        
        tdp.innerHTML = value.pts;
        
  tdn.appendChild(logo);
//  tdw.appendChild(logo);
//  tdl.appendChild(logo);  
//  tdt.appendChild(logo);
//  tdp.appendChild(logo);
          
  
  tr.appendChild(tdn);
  tr.appendChild(tdw);
  tr.appendChild(tdl);
  tr.appendChild(tdt);
  tr.appendChild(tdp);
  tbody.appendChild(tr);     
    });

}


//stats.sort(function (a,b) {
//               return b.points - a.points;
//               })




function teamNames(teams, id) {                      
            for (let i = 0; i < teams.length; i++) {
                if (teams[i].id == id) {
//                    console.log("my team names function is running");
                    
                    return teams[i].name;
                }      
            }
            
        } 

//function sorting(property) {
//    var sortOrder = 1;
//    if(property[0] === "-"){
//        sortOrder = -1;
//        property = property.substr(1);
//    }
//    return function (b,a) {
//        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
//        return result * sortOrder;
//    }
//  
//}




//  let wins = 45;
//  let losses = 34;
//  let ties = 2;
//  let points = 110;
//  let name = "Ottawa Senators";
//
// 
//  let tr = document.createElement("tr");
//  let tdn = document.createElement("td");
//  tdn.textContent = name;
//  let tdw = document.createElement("td");
//  tdw.textContent = wins;
//  let tdl = document.createElement("td");
//  tdl.textContent = losses;
//  let tdt = document.createElement("td");
//  tdt.textContent = ties;
//  let tdp = document.createElement("td");
//  tdp.textContent = points;
//  tr.appendChild(tdn);
//  tr.appendChild(tdw);
//  tr.appendChild(tdl);
//  tr.appendChild(tdt);
//  tr.appendChild(tdp);
//  tbody.appendChild(tr);
