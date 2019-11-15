//ajax获取产品列表
function productList(){
    var xhr=new XMLHttpRequest();
    xhr.open('get','../js/data.json',true);
    xhr.send();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            var productLists=JSON.parse(xhr.responseText)
            console.log(productLists)
            var ul=document.getElementsByClassName("product_show")[0]
            for(let i=0;i<productLists.length;i++){
                var li=document.createElement("li")
                var img=document.createElement("img")
                var p1=document.createElement("p")
                var p2=document.createElement("p")
                var p3=document.createElement("p")
                var p4=document.createElement("p")
                img.src=productLists[i].pic
                p1.innerHTML='<span>￥</span>'+productLists[i].price
                p2.innerHTML=productLists[i].sale
                p3.innerHTML="已有<span>"+productLists[i].evaluation+"</span>人评价"
                p4.innerHTML=productLists[i].shop+"<button onclick='addCart(this)'>加入购物车</button>"
                ul.appendChild(li)
                li.appendChild(img)
                li.appendChild(p1)
                li.appendChild(p2)
                li.appendChild(p3)
                li.appendChild(p4)
            }
        }
    }
}
productList();
//加入购物车
function addCart(button){
//判断是否登录,如果登录点击的产品加入到缓存
if(true){
   var productObj={}
   var li=button.parentElement.parentElement
   productObj.img=li.children[0].src
   productObj.productName=li.children[2].innerHTML+','+li.children[4].childNodes[0].textContent
   productObj.price=li.children[1].childNodes[1].textContent
   var productArr=JSON.parse(localStorage.getItem('shoppingList')) 
   productArr.push(productObj)
    // console.log(productArr)
    localStorage.setItem('shoppingList',JSON.stringify(productArr))
}
else{
    location.href='login.html'
}
}
