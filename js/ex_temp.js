import axios from 'axios'

var arr=[];
var arrayList = new Array();

setPointsFromJson();

// 고속도로 영업소 위치정보 받아오기
function setPointsFromJson() {
  axios
  .get('http://data.ex.co.kr/openapi/locationinfo/locationinfoUnit?key=4998350672&type=json&numOfRows=500&pageNo=1')
  .then(res =>{
    //console.log(res)
	
    for (let i = 0; i < res.data.list.length; i ++){
		let title = res.data.list[i].unitName;
		let x = res.data.list[i].xValue;
		let y = res.data.list[i].yValue;
		
		//aaa = new kakao.maps.LatLng(x, y);
		//var aaa = "new kakao.maps.LatLng("+x+", "+y+")";
		var aaa = "("+x+", "+y+")";
		// 주소정보 받기
		
		let testlist = {content: `<div>${title}</div>`, latlng: `${aaa}`};
		var testListEJ = {content: `<div>${title}</div>`, latlng: `${aaa}`};
		arr.push(testlist);
		arrayList.push(testListEJ);
		//console.log("testlist ::: "+JSON.stringify(testlist));
		//console.log("arr setPointsFromJson ::: "+JSON.stringify(arr));
		//console.log("arrayList setPointsFromJson ::: "+JSON.stringify(arrayList));
	};
	//arrayList.push("test");
	//arr.push("test");
	console.log("arrayList ::: "+JSON.stringify(arrayList));

	var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
    mapOption = { 
        center: new kakao.maps.LatLng(33.451393, 126.570738), // 지도의 중심좌표
        level: 5 // 지도의 확대 레벨
    };

	var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

	var data = new Object();
	var points = new Array();
	for(var i=0; i<arrayList.length; i++){
		var data = new Object();
						
		data.content = arrayList[i].content;
		data.latlng = arrayList[i].latlng;
		
		points.push(data);
	}
	var pointss = [
		{
			content: "<div>카카오</div>", 
			latlng: new kakao.maps.LatLng(33.450705, 126.570677)
		},
		{
			content: "<div>생태연못</div>", 
			latlng: new kakao.maps.LatLng(33.450936, 126.569477)
		},
		{
			content: "<div>텃밭</div>", 
			latlng: new kakao.maps.LatLng(33.450879, 126.569940)
		},
		{
			content: null,
			latlng: null
		},
		{
			content: "<div>근린공원</div>",
			latlng: new kakao.maps.LatLng(33.451393, 126.570738)
		}
	];
	
	//샘플 적용된 포문
	// for (var i = 0; i < pointss.length; i++) {	
	// 	var latlat = JSON.stringify(arrayList[i].latlng);
	// 	var latlatReplace = latlat.replace(/"/g,"");
	// 	var contentcontent = JSON.stringify(arrayList[i].content);
	// 	var contentReplace = contentcontent.replace(/"/g,"");
	// 	console.log("latlatReplace :::"+latlatReplace);
	// 	console.log("contentReplace :::"+contentReplace);
	// 	console.log("=============================");
	// 	console.log("pointss[i].latlng:::"+pointss[i].latlng);
	// 	console.log("pointss[i].content :::"+pointss[i].content);
	// 	console.log("=============================");
	// 	// 마커를 생성합니다	
	// 	var marker = new kakao.maps.Marker({
	// 		map: map, // 마커를 표시할 지도
	// 		position: pointss[i].latlng // 마커의 위치
	// 	});
		      
	// 	// 마커에 표시할 인포윈도우를 생성합니다 
	// 	var infowindow = new kakao.maps.InfoWindow({
	// 		content: pointss[i].content // 인포윈도우에 표시할 내용
	// 	});
	// 	// 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
	// 	// 이벤트 리스너로는 클로저를 만들어 등록합니다 
	// 	// for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
	// 	kakao.maps.event.addListener(marker, 'click', makeOverListener(map, marker, infowindow));
	// 	kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
	// }


	//적용해야할 포문
	for (var i = 0; i < arrayList.length; i++) {
		var latlat = JSON.stringify(arrayList[i].latlng);
		var latlatReplace = latlat.replace(/"/g,"");
		var contentcontent = JSON.stringify(arrayList[i].content);
		var contentReplace = contentcontent.replace(/"/g,"");
		console.log("latlatReplace :::"+latlatReplace);
		console.log("contentReplace :::"+contentReplace);
		// 마커를 생성합니다	
		try{
			var marker = new kakao.maps.Marker({
				map: map, // 마커를 표시할 지도
				position: new kakao.maps.LatLng(latlatReplace) // 마커의 위치
			});
		} catch(error){
			console.log("marker error"+error);
		}
		// 마커에 표시할 인포윈도우를 생성합니다 
		try{
			var infowindow = new kakao.maps.InfoWindow({
				content: contentReplace // 인포윈도우에 표시할 내용
			});
		} catch(error) {
			console.log("infowindow error"+error);
		}
		// 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
		// 이벤트 리스너로는 클로저를 만들어 등록합니다 
		// for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
		kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
		kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
	}


	// 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
	function makeOverListener(map, marker, infowindow) {
		return function() {
			infowindow.open(map, marker);
		};
	}

	// 인포윈도우를 닫는 클로저를 만드는 함수입니다 
	function makeOutListener(infowindow) {
		return function() {
			infowindow.close();
		};
	};





})};





// var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
//     mapOption = { 
//         center: new kakao.maps.LatLng(37.396399, 127.1032), // 지도의 중심좌표
//         level: 3 // 지도의 확대 레벨
//     };

// var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
 
// // 마커를 표시할 위치와 내용을 가지고 있는 객체 배열입니다 
// var positions = [
//     {
//         content: '<div>판교</div>', 
//         latlng: new kakao.maps.LatLng(37.396399, 127.1032)
//     },
//     {
//         content: '<div>생태연못</div>', 
//         latlng: new kakao.maps.LatLng(33.450936, 126.569477)
//     },
//     {
//         content: '<div>텃밭</div>', 
//         latlng: new kakao.maps.LatLng(33.450879, 126.569940)
//     },
//     {
//         content: '<div>근린공원</div>',
//         latlng: new kakao.maps.LatLng(33.451393, 126.570738)
//     }
// ];

// for (let i = 0; i < positions.length; i ++) {
//     // 마커를 생성합니다
//     var marker = new kakao.maps.Marker({
//         map: map, // 마커를 표시할 지도
//         position: positions[i].latlng // 마커의 위치
//     });

//     // 마커에 표시할 인포윈도우를 생성합니다 
//     var infowindow = new kakao.maps.InfoWindow({
//         content: positions[i].content // 인포윈도우에 표시할 내용
//     });

//     // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
//     // 이벤트 리스너로는 클로저를 만들어 등록합니다 
//     // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
//     kakao.maps.event.addListener(marker, 'click', makeOverListener(map, marker, infowindow));
//     kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
// }

// // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
// function makeOverListener(map, marker, infowindow) {
//     return function() {
//         infowindow.open(map, marker);
//     };
// }

// // 인포윈도우를 닫는 클로저를 만드는 함수입니다 
// function makeOutListener(infowindow) {
//     return function() {
//         infowindow.close();
//     };
// };