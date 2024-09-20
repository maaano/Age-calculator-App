const birthdate = document.querySelector(".birthdate");

const submit=document.querySelector("input[type='submit']")
const round =document.querySelector(".round");

    
let dayBirth = document.getElementById("day-of-birth");
let monthBirth = document.getElementById("month-of-birth");
let yearBirth = document.getElementById("year-of-birth");
let dayLabel = document.querySelector(".label-day");
let monthLabel = document.querySelector(".label-month");
let yearLabel = document.querySelector(".label-year");
let dayP = document.querySelector(".day-of-birth-p");
let monthP = document.querySelector(".month-of-birth-p");
let yearP = document.querySelector(".year-of-birth-p");

let oneOne=document.querySelector(".one-one");
let oneTwo=document.querySelector(".one-two");
let twoOne=document.querySelector(".two-one");
let twoTwo=document.querySelector(".two-two");
let threeOne=document.querySelector(".three-one");
let threeTwo=document.querySelector(".three-two");
let ageYear=document.querySelector(".age-year");
let ageMonth=document.querySelector(".age-month");
let ageDay=document.querySelector(".age-day");
let ageYearP=document.querySelector(".age-year-p");
let ageMonthP=document.querySelector(".age-month-p");
let ageDayP=document.querySelector(".age-day-p");


let nonBisextileYear=[31,28,31,30,31,30,31,31,30,31,30,31];
let BisextileYear=[31,29,31,30,31,30,31,31,30,31,30,31];


birthdate.addEventListener("submit",(e)=>{
    e.preventDefault();

    let dayAge;
    let monthAge;
    let yearAge;

    
    let monthNow=1;
    let dayNow;
    let yearNow=1970;
    let firstJanuary=3;
    let twentyThreeMarch;
    let twentyThreeOctober;
    let sundayOfLastWeekEndOfMarch;
    let sundayOfLastWeekEndOfOctober;
    let index0fMonth=0;
    let time;

    let Tyear;
    let Tmonth;
    let Tday;

    let helpB=nonBisextileYear;
    let helpBB=nonBisextileYear;



    time=Date.now()/(10**3*60*60)+1;//heure

    //calcul de l' année actuel

    while(time>=366*24){
        if((yearNow%4==0 && yearNow%100!=0)||(yearNow%400==0)){
            yearNow+=1;
            time-=366*24;
        }else{
            time-=365*24;
            yearNow+=1;
        }
    }

    // cas ou il reste 365 jour et qu' on n' est pas dans une année bisextile

    if((time>=365*24)&&((yearNow%4!=0 || yearNow%100==0)&&(yearNow%400!=0))){
        time-=365*24;
        yearNow+=1;
    }


    console.log(yearNow);

    //------------------------------------ON CHERCHE A PRENDRE EN COMPTE DANS NOTRE CALCUL LE CHANGEMENT D HORAIRE AFIN QUE L APP SOIT PRECISE---------
    //determine le jour du premier janvier avec 0=lundi,1=mardi,...

    for(let i=1971;i<=yearNow;i+=1){
        if(((i-1)%4==0 && (i-1)%100!=0)||((i-1)%400==0)){
            firstJanuary=(firstJanuary+366)%7;
        }else{
            firstJanuary=(firstJanuary+365)%7;
        }
    }

    //détermine le jour du 23 mars et du 23 octobre

    if((yearNow%4==0 && yearNow%100!=0)||(yearNow%400==0)){
        twentyThreeMarch=(firstJanuary+82)%7;
        twentyThreeOctober=(firstJanuary+296)%7;

    }else{
        twentyThreeMarch=(firstJanuary+81)%7;
        twentyThreeOctober=(firstJanuary+295)%7;
    }

    //determine le dimanche du dernier week-end de mars

    for(let i=0;i<7;i+=1){
        let a;
        a=(twentyThreeMarch+i)%7;
        if(a==5){
            sundayOfLastWeekEndOfMarch=23+i+1;
            break
        }
    }

    //determine le dimanche du dernier week-end d octobre

    for(let i=0;i<7;i+=1){
        let a;
        a=(twentyThreeOctober+i)%7;
        if(a==5){
            sundayOfLastWeekEndOfOctober=23+i+1;
            break
        }
    }
    
    //determine le mois

    if((yearNow%4==0 && yearNow%100!=0)||(yearNow%400==0)){
        for(let i=0;i<12;i+=1){
            if(i==2 || i==9){
                if(time>=BisextileYear[index0fMonth]*24+1){
                    time-=BisextileYear[index0fMonth]*24+1;
                    monthNow+=1;
                    index0fMonth+=1;
                }else{
                    break
                }
            }else{
                if(time>=BisextileYear[index0fMonth]*24){
                    time-=BisextileYear[index0fMonth]*24;
                    monthNow+=1;
                    index0fMonth+=1;
                }else{
                    break
                }
            }
        }
    }else{
        for(let i=0;i<12;i+=1){
            if(i==2 || i==9){
                if(time>=nonBisextileYearBisextileYear[index0fMonth]*24+1){
                    time-=nonBisextileYear[index0fMonth]*24+1;
                    monthNow+=1;
                    index0fMonth+=1;
                }else{
                    break
                }
            }else{
                if(time>=nonBisextileYear[index0fMonth]*24){
                    time-=nonBisextileYear[index0fMonth]*24;
                    monthNow+=1;
                    index0fMonth+=1;
                }else{
                    break
                }
            }
        }

    }
    console.log(monthNow);
 
    //determiner le jour

    if(monthNow==3){
        if(time<(sundayOfLastWeekEndOfMarch-1)*24+2){
            dayNow=Math.floor(time/24+1);
            time-=(dayNow-1)*24
        }else{
            dayNow=Math.floor((time+1)/24+1);
            time-=(dayNow-1)*24;
        }
    }else if(monthNow==10){
        if(time<(sundayOfLastWeekEndOfOctober-1)*24+3){
            dayNow=Math.floor((time+1)/24+1);
            time-=(dayNow-1)*24;
        }else{
            dayNow=Math.floor(time/24+1);
            time-=(dayNow-1)*24;
        }
    }else if ((monthNow<3 && monthNow>=1)||(monthNow>10 && monthNow<=12)){
        dayNow=Math.floor(time/24+1);
        time-=(dayNow-1)*24;
    }else{
        dayNow=Math.floor((time+1)/24+1);
        time-=(dayNow-1)*24;
    }

    console.log(dayNow);


    //desormais on passe à la partie interessante:voir si les informations entrés par l' utilisateur sont fiables et si oui lui renvoyer son age

    // si l année est bisextile

    if((yearNow%4==0 && yearNow%100!=0)||(yearNow%400==0)){
        helpBB=BisextileYear;
        if((yearBirth.value%4==0 && yearBirth.value%100!=0)||(yearBirth.value%400==0)){
            helpB=BisextileYear;
        }
            if((yearBirth.value>yearNow)||(monthBirth.value>12||monthBirth.value<=0)||(dayBirth.value<=0||dayBirth.value>helpB[monthBirth.value - 1])){
                if(yearBirth.value>yearNow){
                    yearLabel.style.color="var(--Light-red)";
                    yearBirth.style.borderColor="var(--Light-red)";
                    yearP.style.visibility="visible";
                }else{
                    yearLabel.style.color="var(--Smokey-grey))";
                    yearBirth.style.borderColor="var(--Off-white)";
                    yearP.style.visibility="hidden"; 
                }
                if(monthBirth.value>12||monthBirth.value<0){
                    monthLabel.style.color="var(--Light-red)";
                    monthBirth.style.borderColor="var(--Light-red)";
                    monthP.style.visibility="visible";
                }else{
                    monthLabel.style.color="var(--Smokey-grey)";
                    monthBirth.style.borderColor="var(--Off-white)";
                    monthP.style.visibility="hidden";
                }
                if(dayBirth.value<0||dayBirth.value>helpB[monthBirth.value-1]||dayBirth.value>31){
                    dayLabel.style.color="var(--Light-red)";
                    dayBirth.style.borderColor="var(--Light-red)";
                    dayP.style.visibility="visible";
                }else{
                    dayLabel.style.color="var(--Smokey-grey)";
                    dayBirth.style.borderColor="var(--Off-white)";
                    dayP.style.visibility="hidden";
                }

                oneOne.classList.add("a");
                oneTwo.classList.add("a");
                twoOne.classList.add("a");
                twoTwo.classList.add("a");
                threeOne.classList.add("a");
                threeTwo.classList.add("a");
                oneOne.classList.remove("numberstyle");
                oneTwo.classList.remove("numberstyle");
                twoOne.classList.remove("numberstyle");
                twoTwo.classList.remove("numberstyle");
                threeOne.classList.remove("numberstyle");
                threeTwo.classList.remove("numberstyle");
                oneOne.textContent="";
                oneTwo.textContent="";
                twoOne.textContent="";
                twoTwo.textContent="";
                threeOne.textContent="";
                threeTwo.textContent="";
                ageYear.style.gap="20px";
                ageMonth.style.gap="20px";
                ageDay.style.gap="20px";

                ageYearP.textContent="years";
                ageDayP.textContent="days";
                ageMonthP.textContent="months";

            }else{
                //yearAge calcul-----------------
            
                if (monthBirth.value<monthNow){
                    yearAge=yearNow-yearBirth.value;
                }else if (monthBirth.value==monthNow){
                    if (dayBirth.value<=dayNow){
                        yearAge=yearNow-yearBirth.value;
                    }else{
                        yearAge=yearNow-yearBirth.value-1;
                    }
                }else{
                    yearAge=yearNow-yearBirth.value-1
                }
                

                console.log(yearAge);

            
            
            
                // monthAge calcul----------------

                if(yearAge<yearNow-yearBirth.value){
                    monthAge=(12-monthBirth.value)+monthNow-1;
                    if(dayBirth.value<=dayNow){
                        monthAge+=1;
                }
                }else{
                    monthAge=monthNow-1-monthBirth.value-1+1
                    if(dayBirth.value<=dayNow){
                        monthAge+=1;
                }
                }   


                //dayAge calcul---------

                console.log(monthAge);

                if((Number(monthBirth.value) + monthAge)%12<monthNow){
                    dayAge=helpBB[(Number(monthBirth.value) + monthAge)%12-1]-Number(dayBirth.value)+dayNow;
                }else{
                    dayAge=dayNow-Number(dayBirth.value);
                }

                console.log(dayAge);


                dayLabel.style.color="var(--Smokey-grey)";
                dayBirth.style.borderColor="var(--Off-white)";
                dayP.style.visibility="hidden";

                monthLabel.style.color="var(--Smokey-grey)";
                monthBirth.style.borderColor="var(--Off-white)";
                monthP.style.visibility="hidden";

                yearLabel.style.color="var(--Smokey-grey)";
                yearBirth.style.borderColor="var(--Off-white)";
                yearP.style.visibility="hidden";
            }
        

        }   

    //---------------------------------------------------------------------------------------

    Tyear=yearAge.toString();
    Tmonth=monthAge.toString();
    Tday=dayAge.toString();

    console.log(Tyear,Tmonth,Tday);

    console.log(Tmonth.length);
    
    if (Tyear.length==2){
        oneOne.textContent=Tyear[0];
        oneTwo.textContent=Tyear[1];
        oneOne.classList.remove("a");
        oneOne.classList.add("numberstyle");
        oneTwo.classList.remove("a");
        oneTwo.classList.add("numberstyle");
        ageYear.style.gap="10px";
        
    }else if (Tyear.length==1){
        oneOne.textContent=Tyear[0];
        oneTwo.textContent="";
        oneOne.classList.remove("a");
        oneOne.classList.add("numberstyle");
        oneTwo.classList.remove("a");
        oneTwo.classList.remove("numberstyle");
        ageYear.style.gap="10px";
    }

    if (Tmonth.length==2){
        twoOne.textContent=Tmonth[0];
        twoTwo.textContent=Tmonth[1];
        twoOne.classList.remove("a");
        twoOne.classList.add("numberstyle");
        twoTwo.classList.remove("a");
        twoTwo.classList.add("numberstyle");
        ageMonth.style.gap="10px"
    }else {
        twoOne.textContent=Tmonth[0];
        twoTwo.textContent="";
        twoOne.classList.remove("a");
        twoOne.classList.add("numberstyle");
        twoTwo.classList.remove("a");
        twoTwo.classList.remove("numberstyle")
        twoTwo.textContent="";
        ageMonth.style.gap="10px";
        
    }

    if (Tday.length==2){
        threeOne.textContent=Tday[0];
        threeTwo.textContent=Tday[1];
        threeOne.classList.remove("a");
        threeOne.classList.add("numberstyle");
        threeTwo.classList.remove("a");
        threeTwo.classList.add("numberstyle");
        ageDay.style.gap="10px";
    }else {
        threeOne.textContent=Tday[0];
        threeTwo.textContent="";
        threeOne.classList.remove("a");
        threeOne.classList.add("numberstyle");
        threeTwo.classList.remove("a");
        threeTwo.classList.remove("numberstyle");
        ageDay.style.gap="10px";
    }

    if(Tyear=="1"||Tyear=="0"){
        ageYearP.textContent="year";
    }else{
        ageYearP.textContent="years";
    }

    if(Tmonth=="1"||Tmonth=="0"){
        ageMonthP.textContent="month";
    }else{
        ageMonthP.textContent="months";
    }

    if(Tday=="1"||Tday=="0"){
        ageDayP.textContent="day";
    }else{
        ageDayP.textContent="days";
    }



    

})

//-----------------------------------------input---------------------

submit.addEventListener("mouseover",()=>{
    round.style.background="var(--Off-black)";
})


submit.addEventListener("mouseout",()=>{
    round.style.background="var(--Purple)";
})





