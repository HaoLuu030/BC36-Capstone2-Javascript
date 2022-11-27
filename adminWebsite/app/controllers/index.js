


var itemList = [];

function itemListData(){
    var id1 = document.getElementById("id").value ;
    var name1 = document.getElementById("name").value ;
    var price1 = +document.getElementById("price").value ;
    var screen1 = document.getElementById("screen").value ;
    var backCamera1 = document.getElementById("BackCamera").value;
    var frontCamera1 = document.getElementById("FrontCamera").value ;
    var img1 = document.getElementById("picture").value;
    var desc1 = document.getElementById("discribe").value ;
    var type1 = document.getElementById("type").value ;
    // var action = document.getElementById("action").vlaue ;
    // var name = document.getElementById("name").vlaue ;
    // var name = document.getElementById("name").vlaue ;
    
    var Item = new ItemList(
        id1,
        name1,
        price1,
        screen1,
        backCamera1,
        frontCamera1,
        img1,
        desc1,
        type1
    );

   itemList.push(Item);
   renderItem(itemList);
//    saveData();
}

function renderItem(itemList){
    var html = "";
   for( var i=0 ; i < itemList.length ; i++ ){
   html += ` 
   <tr>
   <td>${itemList[i].id1}</td>
   <td>${itemList[i].name1}</td>
   <td>${itemList[i].price1}</td>
   <td>${itemList[i].img1}</td>
   <td>${itemList[i].desc1}</td>
   <td><button onclick="deleteItem('${itemList[i].id1}')" class="btn btn-danger">Xoa</button>
   <button onclick="getDataForm('${itemList[i].id1}')" class="btn btn-danger" data-toggle="modal" data-target="#exampleModal">Sua</button>
   </td>
   </tr>
   `;
   }

  

   document.getElementById("tableDanhSach").innerHTML = html;
   /* <td> <button onclick="DeleteStaff('${data[i].staffTK}')" class="btn btn-danger"> Xoa </button>
   <td> <button data-target="#myModal" data-toggle="modal" onclick="GetDataForm('${data[i].staffTK}')" class="btn btn-danger"> Sua </button> */
   }

  function findData(id){

   for( var i=0 ; i<itemList.length; i++){
  if(itemList[i].id1 == id){
    return i ;
  } }return -1;

   }

  function deleteItem(id1){
  var idItem = findData(id1);
 if(idItem === -1){
    console.log(" khong tim thay id phu hop")
 return;
 }
itemList.splice(idItem, 1);
renderItem(itemList);

}
function getDataForm(id)
  {
  var index = findData(id);
  if(index === -1){
    console.log("Khong tim thay id phu hop");
    return;
  }
 var dataItem = itemList[index];
    document.getElementById("id").value = dataItem.id1 ;
     document.getElementById("name").value =dataItem.name1;
    document.getElementById("price").value =dataItem.price1;
    document.getElementById("screen").value =dataItem.screen1;
    document.getElementById("BackCamera").value =dataItem.backCamera1;
    document.getElementById("FrontCamera").value =dataItem.frontCamera1;
     document.getElementById("picture").value = dataItem.img1;
     document.getElementById("discribe").value =dataItem.desc1;
   document.getElementById("type").value = dataItem.type1 ;
   document.getElementById("id").disabled = true; // nguoi dung khong sua dc id
  }
 
  function updateData(){
    var id1 = document.getElementById("id").value ;
    var name1 = document.getElementById("name").value ;
    var price1 = +document.getElementById("price").value ;
    var screen1 = document.getElementById("screen").value ;
    var backCamera1 = document.getElementById("BackCamera").value;
    var frontCamera1 = document.getElementById("FrontCamera").value ;
    var img1 = document.getElementById("picture").value;
    var desc1 = document.getElementById("discribe").value ;
    var type1 = document.getElementById("type").value ;
  var index = findData(id1);
  if(index === -1){
    console.log("khong tim thay id phu hop");
    return;
  }
  var dataItem = itemList[index];
  dataItem.id1 = id1;
  dataItem.name1= name1;
  dataItem.price1 = price1;
  dataItem.screen1=screen1;
  dataItem.backCamera1= backCamera1 ; 
  dataItem.frontCamera1 = frontCamera1 ;
  dataItem.img1 = img1;
  dataItem.desc1= desc1;
  dataItem.type1 = type1;
   renderItem (itemList);
  
   document.getElementById("QL").reset(); // reset form
   document.getElementById("id").disabled = false;

  }

 function searchItem(){


        var result =[];
        var keyword = document.getElementById("searchName").value;
        
        for(var i=0; i< itemList.length; i++){
          var ID = itemList[i].id1;
          var nameItem = itemList[i].name1;
          if(ID.includes(keyword)||nameItem.includes(keyword)){
            result.push(itemList[i]);
          }
          // else {
          //   return("khong co tu trung khop")
          // }
        }
        renderItem(result);
    }

 



   function saveData(){
    // chuyen mot mang ojb sang mang JSON 
    var JSONitemList = JSON.stringify(itemList);
    localStorage.setItem("Data",JSONitemList);
   }

