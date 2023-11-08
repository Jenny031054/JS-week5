let data = [
    {
      "id": 0,
      "name": "肥宅心碎賞櫻3日",
      "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
      "area": "高雄",
      "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
      "group": 87,
      "price": 1400,
      "rate": 10
    },
    {
      "id": 1,
      "name": "貓空纜車雙程票",
      "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      "area": "台北",
      "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
      "group": 99,
      "price": 240,
      "rate": 2
    },
    {
      "id": 2,
      "name": "台中谷關溫泉會1日",
      "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      "area": "台中",
      "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
      "group": 20,
      "price": 1765,
      "rate": 7
    }
  ];
const cardList = document.querySelector(".ticketCard-area");
const ticketRegion = document.querySelector("#ticketRegion");
const regionSearch = document.querySelector(".regionSearch");
const searchResultText =document.querySelector("#searchResult-text");

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
searchResultText.textContent = `本次搜尋共${data.length}筆資料`
};
function init(){
  renderData(data)   
};
init();

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

addTicketBtn.addEventListener("click",function(e){
  console.log("btn");

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
  init();
  


});