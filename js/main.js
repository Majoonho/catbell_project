import axios from 'axios'


function setPointsFromJson() {
  axios
  .get('http://data.ex.co.kr/openapi/locationinfo/locationinfoUnit?key=4998350672&type=json&numOfRows=500&pageNo=1')
  .then(res =>{
    console.log(res)
    console.log(res.data.list      )
    console.log(res.data.list[0].unitName)
    console.log(res.data.list[0].xValue)
    console.log(res.data.list[0].yValue)
  })
}

setPointsFromJson()


