

window.onload= function(){
    console.log("hello.......")

    let title= document.getElementById('title')
    let body= document.getElementById('body')
    let tagList= document.getElementById('tagList')
    let submit= document.getElementById('submit')
   // let name= document.getElementById('title')

   submit.onclick=function(){
    console.log(title.value)
    console.log(body.value)
    console.log(tagList.value)
  //  }

   

  $.ajax({
    url:'/api/articles/' ,type: "POST",
  beforeSend: function(xhr){xhr.setRequestHeader("Authorization" , "Token " +localStorage.getItem('token'));},
  dataType: "json",
  data:{
      "title":title.value,
      "body":body.value,
      "tagList":tagList.value
  },
  success:(data)=>{
    console.log("sarthak ..........")
    console.log(data)
  },
  error:function(jqXHR, textStatus, errorThrown){
    console.log("AmritEror"+errorThrown)
  }

  })


}
}
   
