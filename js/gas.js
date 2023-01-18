import axios from 'axios'


var positions = new Array();
let txt = ""
setPointsFromJson();

// 고속도로 영업소 위치정보 받아오기
function setPointsFromJson() {
  axios
  .get('http://data.ex.co.kr/openapi/business/curStateStation?key=4998350672&type=json&numOfRows=500&pageNo=1')
  .then(res =>{ 
    console.log(res.data.list)
	
    // for (let i = 0; i < res.data.list.length; i ++){
		// let title = res.data.list[i].unitName;
		// let x = res.data.list[i].xValue;
		// let y = res.data.list[i].yValue;

    // var temp = 
    //   {
    //       content: `<div style="font-size: 13px; padding:4px; text-align:center; width:150px">${title} 영업소</div>`, 
    //       latlng: new kakao.maps.LatLng(y, x)
    //   };
    // positions.push(temp)
    for (let i = 0; i <5; i ++)  {
      console.log(i)
      console.log(res.data.list.length)
    


    for (let n=i*20 ; n <(i*20)+20; n ++) {
      
      txt += (n+1) +"방향 : "+res.data.list[n].direction+" "+"디젤가격 : "+res.data.list[n].diselPrice+"<br>"
    }

    document.getElementById('demo').innerHTML = txt;
    txt += '-------------------------------<br>'

	}
   
  }
  )};


// let xhttp = new XMLHttpRequest();

// xhttp.onreadystatechange = function () {
// 	if(xhttp.readyState == 4 && xhttp.status == 200){
// 		jsonfunc(this.responseText); //this = xhttp
// //		jsonfunc(xhttp.responseText); // 둘다 가능
// 	}
// }
// xhttp.open("GET","member.json", true);
// xhttp.send();

// function jsonfunc( jsonText ) {

// 	let json = JSON.parse(jsonText); // String -> json으로 변환
	
// 	let txt = "";
// 	// 접근법 1
// 	for(i=0; i<json.length; i++){
// 		for(key in json[i]){ // key값 가져오기
// 			txt += key + ":" + json[i][key]; 
// 		}
// 		txt += "<br>";
// 	} 
// 	document.getElementById('demo').innerHTML = txt;
// }