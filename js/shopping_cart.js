//判断是否登录
var sessionUsers=JSON.parse(sessionStorage.getItem('users'))
if(!sessionUsers){
    // alert("请登录后查看购物车信息")
    location.href='login.html'
}


//缓存读取购物车内容
function shoppingCart() {
    var shoppingTable = document.getElementsByTagName("table")[0]
    var productArr = JSON.parse(localStorage.getItem('shoppingList'))
    // console.log(productArr)
    var p=document.getElementsByClassName('success')[0]
    if(productArr.length>0){
        p.innerHTML='商品已成功加入购物车!'
        for (let i =0; i < productArr.length; i++) {
            var row = shoppingTable.insertRow()
            row.insertCell().innerHTML = "<input type='checkbox' id='checkbox' class='checkbox' onclick='selectOnly()'>"
            row.insertCell().innerHTML = '<img src="' + productArr[i].img + '" alt="">'
            row.insertCell().innerHTML = '<p>'+productArr[i].productName+'</p>'+'<p>'+productArr[i].shopName+'</p>'
            row.insertCell().innerHTML = productArr[i].price
            row.insertCell().innerHTML = "<input type='button' value='-' onclick='minusNumber(this)'><input type='text' value="+productArr[i].number+" id='number' onchange='changeNumber(this)'><input type='button' value='+' onclick='addNumber(this)'>"
            row.insertCell().innerHTML = (productArr[i].price*productArr[i].number).toFixed(2)
            row.insertCell().innerHTML = "<input type='button' value='删除' onclick='deleteRow(this)'>"
        }
    }
    else{
        p.innerHTML='购物车已空'
    }
}
shoppingCart()

//点击+增加产品数量
function addNumber(currentAdd){
    var currentRow=currentAdd.parentElement.parentElement
    var currentInput=currentAdd.parentElement.children[1]
    currentInput.value++;
    smallCount()
    totalMoney()
    modifyLocalStorageNumber(currentRow,currentInput)
}
//点击—减少产品数量，不能小于1
function minusNumber(currentMinus){
    var currentRow=currentMinus.parentElement.parentElement
    var currentInput=currentMinus.parentElement.children[1]
    if(currentInput.value>1){
        currentInput.value--;
    }
    else{
        alert("购物车数量不能小于1哦")
    }
    smallCount()
    totalMoney()
    modifyLocalStorageNumber(currentRow,currentInput)
}
//编辑input框时，数量改变
function changeNumber(inputText){
    var currentRow=inputText.parentElement.parentElement
    if(inputText.value<=0){
        inputText.value=1
        alert("产品数量不能小于1哦")
    }
    smallCount()
    totalMoney()
    modifyLocalStorageNumber(currentRow,inputText)
}
//根据表格修改的数量实时修改缓存对应商品的数量
function modifyLocalStorageNumber(modifyRow,modifyInput){
    var productArr=JSON.parse(localStorage.getItem('shoppingList'))
    for(let i=0;i<productArr.length;i++){
        if(modifyRow.cells[2].children[0].innerHTML==productArr[i].productName){
            productArr[i].number=modifyInput.value
            localStorage.setItem('shoppingList',JSON.stringify(productArr))
        }
    } 
    
}
//小计
function smallCount(){
    var shoppingTable = document.getElementsByTagName("table")[0]
    for(let i=1;i<shoppingTable.rows.length;i++){
        var currentRow=shoppingTable.rows[i];
        currentRow.cells[5].innerHTML=((currentRow.cells[3].innerHTML)*(currentRow.cells[4].children[1].value)).toFixed(2)
    }
}
//删除当前行
function deleteRow(currentInput){
    var shoppingTable=document.getElementsByTagName("table")[0]
    var currentRow=currentInput.parentElement.parentElement
    shoppingTable.deleteRow(currentRow.rowIndex)
    totalMoney()
    deleteLocalStorage(currentRow)
    selectAll(currentCheck)
}
//根据表格内容删除情况删除对应的缓存
function deleteLocalStorage(deleteRows){
    var productArr=JSON.parse(localStorage.getItem('shoppingList')) 
    for(let i=0;i<productArr.length;i++){
        if(deleteRows.cells[2].children[0].innerHTML==productArr[i].productName){
            productArr.splice(i,1)
            localStorage.setItem('shoppingList',JSON.stringify(productArr))
        }
    }
}
//全选
function selectAll(currentCheck){
    var checkbox=document.getElementsByClassName("checkbox")
    for(let i=0;i<checkbox.length;i++){
        checkbox[i].checked=currentCheck.checked
    }
    totalMoney();
}
//反选
function selectOnly(){
    var selectAll=document.getElementById("selectAll")
    var checkbox=document.getElementsByClassName("checkbox")
    var flag=true;
    for(let i=0;i<checkbox.length;i++){
        if(!checkbox[i].checked){
            flag=false;
            break;
        }
    }
    if(flag){
        selectAll.checked=true;
    }
    else{
        selectAll.checked=false;
    }
    totalMoney();
}
//删除所选
function deleteSelect(){
    var flag=true;
    var checkbox=document.getElementsByClassName("checkbox")
    for(let i=checkbox.length-1;i>=0;i--){
        if(checkbox[i].checked){
            var shoppingTable=document.getElementsByTagName("table")[0]
            var currentRow=checkbox[i].parentElement.parentElement
            shoppingTable.deleteRow(currentRow.rowIndex)
            flag=false;
            deleteLocalStorage(currentRow)
        }
    }
    if(flag){
        alert("请选择你要删除的产品")
    }
    document.getElementById("selectAll").checked=false;
    totalMoney()
    selectAll(currentCheck)
}

//总计
function totalMoney(){
    var totalMoney=0;
    var span=document.getElementsByClassName("totalMoney")[0]
    var shoppingTable = document.getElementsByTagName("table")[0]
    var checkbox=document.getElementsByClassName("checkbox")
    for(let i=0;i<checkbox.length;i++){
        if(checkbox[i].checked){
            var currentRow=checkbox[i].parentElement.parentElement
            totalMoney+=Number(currentRow.cells[5].innerHTML)
        }
    }
    span.innerHTML=totalMoney.toFixed(2);
}
//去购物车结算
function settle(){
    var shoppingTable = document.getElementsByTagName("table")[0]
    var checkbox=document.getElementsByClassName("checkbox")
    var span=document.getElementsByClassName("totalMoney")[0]
    if(span.innerHTML!=0){
        var flag=confirm("您选购的产品共计"+span.innerHTML+"元,请确认是否结算")
        if(flag){
            for(let i=checkbox.length-1;i>=0;i--){
                if(checkbox[i].checked){
                    deleteLocalStorage(shoppingTable.rows[i+1])
                    shoppingTable.deleteRow(i+1)
                }
            }
        }
    }
    else{
        alert("您还没有选择要结算的商品哦")
    }
    document.getElementById("selectAll").checked=false;
    span.innerHTML="0.00";
}