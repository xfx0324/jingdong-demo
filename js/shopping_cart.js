//缓存读取购物车内容
function shoppingCart() {
    var shoppingTable = document.getElementsByTagName("table")[0]
    var productArr = JSON.parse(localStorage.getItem('shoppingList'))
    // var productcount = JSON.parse(localStorage.getItem('shoppingListcount'))

    // console.log(productArr)
    for (let i =0; i < productArr.length; i++) {
        var row = shoppingTable.insertRow()
        row.insertCell().innerHTML = "<input type='checkbox' id='checkbox' class='checkbox' onclick='selectOnly()'>"
        row.insertCell().innerHTML = '<img src="' + productArr[i].img + '" alt="">'
        row.insertCell().innerHTML = productArr[i].productName
        row.insertCell().innerHTML = productArr[i].price
        row.insertCell().innerHTML = "<input type='button' value='-' onclick='minusNumber(this)'><input type='text' value=1 id='number' onchange='changeNumber(this)'><input type='button' value='+' onclick='addNumber(this)'>"
        row.insertCell().innerHTML = shoppingTable.rows[i+1].cells[3].innerHTML * (shoppingTable.rows[i+1].cells[4].children[1].value)
        row.insertCell().innerHTML = "<input type='button' value='删除' onclick='deleteRow(this)'>"
    }
}
shoppingCart()

//点击+增加产品数量
function addNumber(currentAdd){
    currentAdd.parentElement.children[1].value++;
    smallCount()
}
//点击—减少产品数量，不能小于1
function minusNumber(currentMinus){
    if(currentMinus.parentElement.children[1].value>1){
        currentMinus.parentElement.children[1].value--;
    }
    else{
        alert("购物车数量不能小于1哦")
    }
    smallCount()
}
//编辑input框时，数量改变
function changeNumber(inputText){
    if(inputText.value<=0){
        inputText.value=1
        alert("点餐数量不能小于1哦")
    }
    smallCount()
}
//小计
function smallCount(){
    var shoppingTable = document.getElementsByTagName("table")[0]
    for(let i=1;i<shoppingTable.rows.length;i++){
        shoppingTable.rows[i].cells[5].innerHTML=Number(((shoppingTable.rows[i].cells[3].innerHTML)*(shoppingTable.rows[i].cells[4].children[1].value)).toFixed(2))
    }
}
//删除当前行
function deleteRow(currentInput){
    var shoppingTable=document.getElementsByTagName("table")[0]
    var currentRow=currentInput.parentElement.parentElement
    shoppingTable.deleteRow(currentRow.rowIndex)
    totalMoney()
    var productArr=JSON.parse(localStorage.getItem('shoppingList')) 
    for(let i=0;i<productArr.length;i++){
        if(currentRow.cells[2].innerHTML==productArr[i].productName){
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
var flag=true;
function deleteSelect(){
    var checkbox=document.getElementsByClassName("checkbox")
    for(let i=checkbox.length-1;i>=0;i--){
        if(checkbox[i].checked){
            var shoppingTable=document.getElementsByTagName("table")[0]
            var currentRow=checkbox[i].parentElement.parentElement
            shoppingTable.deleteRow(currentRow.rowIndex)
            flag=false;
            var productArr=JSON.parse(localStorage.getItem('shoppingList')) 
            for(let i=0;i<productArr.length;i++){
                if(currentRow.cells[2].innerHTML==productArr[i].productName){
                    productArr.splice(i,1)
                    localStorage.setItem('shoppingList',JSON.stringify(productArr))
                }
            }
        }
    }
    if(flag){
        alert("请选择你要删除的产品")
    }
    document.getElementById("selectAll").checked=false;
    totalMoney()
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
    span.innerHTML=Number(totalMoney.toFixed(2));
}
