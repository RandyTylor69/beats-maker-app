// pad structure: 16 hh - 16 hh - 16 snare - 16 kick
var pads = [];
function populatePads(){
  var idNum = 1;
  while(idNum<=16){
    pads.push({
      id: idNum,
      type:"hihat1",
      on:false,
      color:"#606c38",
      scale:1
    })
    idNum++
  }
  while(idNum<=32){
    pads.push({
      id: idNum,
      type:"hihat2",
      on:false,
      color:"#283618",
      scale:1
    })
     idNum++
  }
  while(idNum<=48){
    pads.push({
      id: idNum,
      type:"snare",
      on:false,
      color:"#783017ff",
      scale:1
    })
     idNum++
  }
  while(idNum<=64){
    pads.push({
      id: idNum,
      type:"kick",
      on:false,
      color:"#023047",
      scale:1
    })
     idNum++
  }
}
populatePads()

export default pads;