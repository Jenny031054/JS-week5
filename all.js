

console.log(axios);
let data = [];
// function getData(){
//   axios.get("https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json")
//   .then(function(response){
//     data = response.data.data;
//     console.log(data[0]);
//     // alert("hello")

//   })
// };



const cardList = document.querySelector(".ticketCard-area");
const ticketRegion = document.querySelector("#ticketRegion");
const regionSearch = document.querySelector(".regionSearch");
const searchResultText =document.querySelector("#searchResult-text");


//取得資料、之後進行渲染
axios.get("https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json")
.then(function(response){
  data = response.data.data;
  console.log(data);
  // alert("hello")
  renderData(data);
  c3Chart(data);
})
.catch(function(error){
  console.log(error)
}); 


  // renderData(data)  
function renderData(data){
  let ticketCardHTML = ''; //如果放在function外面，只要執行renderData()就會被重複渲染，"全部地區"會變成超多個重複的卡片資訊
  data.forEach(function(item){
   
    ticketCardHTML +=  `
    <li class="ticketCard">
    <div class="ticketCard-img">
      <a href="#">
        <img src=${item.imgUrl} alt="">
      </a>
      <div class="ticketCard-region">${item.area}</div>
      <div class="ticketCard-rank">${item.rate}</div>
    </div>
    <div class="ticketCard-content">
      <div>
        <h3>
          <a href="#" class="ticketCard-name">${item.name}</a>
        </h3>
        <p class="ticketCard-description">
          ${item.description}
        </p>
      </div>
      <div class="ticketCard-info">
        <p class="ticketCard-num">
          <span><i class="fas fa-exclamation-circle"></i></span>
          剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
        </p>
        <p class="ticketCard-price">
          TWD <span id="ticketCard-price">$${item.price}</span>
        </p>
      </div>
    </div>
  </li>
    `;
});
cardList.innerHTML = ticketCardHTML;
searchResultText.textContent = `本次搜尋共${data.length}筆資料`;

};


//change
regionSearch.addEventListener("change",function(e){
    let selectValue = e.target.value; //data.area
    console.log(selectValue);
    let filterArray =[]; //建立一個新的陣列用來裝篩選後的資料，如果是選到全部，這個input裡的value是空的，所以先執行這功能；如果不是空字串代表有需要過濾的條件，將data使用filter過濾的語法，篩選出網頁切換選取到的值和每個data裡面的物件中，地區屬性相同的，組合成一個新陣列，然後回傳，最後將新的陣列渲染到網頁上
    if(selectValue == ""){
      filterArray = data
    }else{
      filterArray =  data.filter(function(item){
        return selectValue === item.area
       //回傳符合上面這條件的新陣列(選取到的選項與每個data資料中的area屬性相同的)，
         
      });
    };
    renderData(filterArray);
    
});

//新增套票功能
const addTicketBtn = document.querySelector(".addTicket-btn");
const addTicketName = document.querySelector("#ticketName");
const addTicketImgUrl = document.querySelector("#ticketImgUrl");
const addTicketRegion = document.querySelector("#ticketRegion");
const addTicketPrice = document.querySelector("#ticketPrice");
const addTicketNum = document.querySelector("#ticketNum");
const addTicketRate = document.querySelector("#ticketRate");
const addTicketDescription = document.querySelector("#ticketDescription");

function addTicket (){
//組好物件資料、推進data中
let newTicketObj = {
  "id": data.length-1,
  "name": addTicketName.value,
  "imgUrl": addTicketImgUrl.value,
  "area": addTicketRegion.value,
  "description": addTicketDescription.value,
  "group": addTicketNum.value,
  "price":addTicketPrice.value,
  "rate": addTicketRate.value
};

console.log(newTicketObj);
data.push(newTicketObj);
}

addTicketBtn.addEventListener("click",function(e){
  
  addTicket ();
  renderData(data);
  c3Chart()
 
});



//圖表功能
function c3Chart(){
  console.log(data);
  let areaNumArr = [];
  let areaNumObj = {};
  data.forEach(function(item){
    // {
    //   "高雄":1,
    //   "台北":2,
    // }
    console.log(areaNumObj[item.area])
    if(areaNumObj[item.area] === undefined){
      areaNumObj[item.area] = 1;
    }else{
      areaNumObj[item.area] ++ ;
    };
  });
  console.log(areaNumObj);
  let areaNumArrKeys = Object.keys(areaNumObj);
  console.log(areaNumArrKeys);
  areaNumArrKeys.forEach(function(item){
    let newArr= [];
   
    newArr.push(item);
    newArr.push(areaNumObj[item]);
    areaNumArr.push(newArr);
  });
  console.log(areaNumArr );
  

  // 推進圖表的地區比例陣列

  let chart = c3.generate({
    bindto: '#chart',
    data: {
      columns: areaNumArr ,
      colors: {
        '高雄':"#E68618",
        '台北':"#26C0C7",
        '台中':"#5151D3"
      },
      type:"donut",
    },
    donut: {
      title:"套票地區比重"
    }
  });

}

