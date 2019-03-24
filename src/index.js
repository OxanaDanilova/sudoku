module.exports = function solveSudoku(matrix) {



  console.log(matrix);

  class player {
    constructor (x,y,can,value,active,round) {
      this.x=x;
      this.y=y;
      this.can=can;
      this.value=value;
      this.active=active;
      this.round=round;
    }
  }
 


  function candidate(x,y,arr){

    console.log (x,y);

   
    for (let a=0;a<9;a++) {
      if (arr.includes(matrix[x][a])) {
        arr.splice(arr.indexOf(matrix[x][a]),1)
        console.log('stroka' + arr);
      }
    }

    for (let b=0;b<9;b++) {
      if (arr.includes(matrix[b][y])) {
        arr.splice(arr.indexOf(matrix[b][y]),1)
      }
    }


    console.log('obrezka posle stroki i stolbca  '+ arr);
 
  
     if (arr.length===1) {
        return arr; 
     } else {

      for (let bb=(Math.trunc(x/3))*3;bb<Math.trunc(x/3)*3+3;bb++) {
        for (let aa=(Math.trunc(y/3))*3;aa<Math.trunc(y/3)*3+3;aa++) {

          if (arr.includes(matrix[bb][aa])===true) {
            arr.splice(arr.indexOf(matrix[bb][aa]),1);
          }
        }
      }
      console.log('obrezka posle kvadrata '+ arr);
      return arr;
    }
    } 



    

    const perem=[];


    

    for (let i=0; i<9; i++) {
      for (let k=0;k<9; k++) {
      if (matrix[k][i]===0) {
        const arr=[1,2,3,4,5,6,7,8,9];

        candidate(k,i,arr);
        console.log('posl arr'+ arr);
        if (arr.length===1) {
        matrix[k][i]=arr[0];
        } else {
          perem.push(new player(k,i,arr,matrix[k][i],true,false));
          console.log('perem '+ perem[perem.length-1].can);
        }
      }
    }
  }


  

  for (let i=0; i<9; i++) {
    for (let k=0;k<9; k++) {
    if (matrix[k][i]===0) {
      const arr=[1,2,3,4,5,6,7,8,9];

      candidate(k,i,arr);
      console.log('posl arr'+ arr);
      if (arr.length===1) {
        matrix[k][i]=arr[0];
       puscut(k,i); 
        pusik(k,i,arr,arr[0]);
          } 
      else {
        pusikchange(k,i,arr);
      }
    }
  }
}

function pusikchange(k,i,arr) {
  if (perem.length!==0) {
    for (let z=0; z<perem.length-1;z++) {
      if (perem[z].x===k && perem[z].y===i) {
        perem[z].can=arr;
      }
    }
  }
}



function puscut(k,i) {
  if (perem.length!==0) {
    for (let z=0; z<perem.length-1;z++) {
      if (perem[z].x===k && perem[z].y===i) {
        perem[z].active=false;
      }
    }
  }
}      

       

          function pusik(k,i,arr,value){

            if (perem.length!==0) {
              for (let z=0; z<perem.length-1;z++) {
                if (perem[z].x===k && perem[z].active===true) {
                 /*  candidate(perem[z].x,perem[z].y, perem[z].can); */ 
                 if (perem[z].can.includes(value)){
                 perem[z].can.splice(perem[z].can.indexOf(value),1);
              console.log(perem[z].x, perem[z].y, perem[z].can); 
                  if (perem[z].can.length===1) {
                    let x=perem[z].x;
                    let y=perem[z].y;
                    matrix[x][y]=perem[z].can[0];
                    perem[z].active=false;
                    perem[z].round=true;
                    console.log(matrix);
             
                  }
              
                    
                 
                }
              }
                  
                if (perem[z].y===i && perem[z].active===true) {
               /*  candidate(perem[z].x,perem[z].y, perem[z].can);  */
                  if (perem[z].can.includes(value)){
                    perem[z].can.splice(perem[z].can.indexOf(value),1);
                   console.log(perem[z].x, perem[z].y, perem[z].can);
                    console.log(matrix);

                  if (perem[z].can.length===1) {
                    let x=perem[z].x;
                    let y=perem[z].y;

                    matrix[x][y]=perem[z].can[0];
                    perem[z].active=false;
                    perem[z].round=true;
                                   } 
                } 
              }


                if (perem[z].x>Math.trunc(k/3)*3 && perem[z].x<Math.trunc(k/3)*3+3 && perem[z].y>Math.trunc(i/3)*3 && perem[z].y<Math.trunc(i/3)*3+3 && perem[z].active===true) {
                  /* candidate(perem[z].x,perem[z].y, perem[z].can);  */
                  if (perem[z].can.includes(value)){
                    perem[z].can.splice(perem[z].can.indexOf(value),1);
                    console.log('value'+ value);
                    console.log(perem[z].x, perem[z].y, perem[z].can);
                    console.log(matrix);

                  if (perem[z].can.length===1) {
                    let x=perem[z].x;
                    let y=perem[z].y;

                    matrix[x][y]=perem[z].can[0];
                    perem[z].active=false;
                    perem[z].round=true;
                  }
                    } 
                              
                }
     
            }  
          }  // end func pusik
   

     


          }     
        


      
   



       if (perem.length!==0) {
        for (let z=0; z<perem.length-1;z++) {
          if (perem[z].can.length===1) {
            matrix[perem[z].x][perem[z].y]=perem[z].can[0];
            perem[z].active=false;
            pusik(perem[z].x,perem[z].y,perem[z].can);
            perem[z].round=true;
          }
        }
      } 

      
      for (let z=0; z<perem.length-1;z++) {
        if (perem[z].round=true) {
          pusik(perem[z].x,perem[z].y, perem[z].can,perem[z].value);
          perem[z].round=false;
        }
      }



      console.log(matrix);
      return matrix;
    }
  


           
    
   
   







  
    
     
   

  
 
   

   
    
  
    
   

     
  



