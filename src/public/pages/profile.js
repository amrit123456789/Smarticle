function fetchlocal(username){
  console.log("here in onclick..............>>")
    $.ajax({
      url:'/api/profiles/amrit' ,type: "GET",
    beforeSend: function(xhr){xhr.setRequestHeader("Authorization" , "Token " +localStorage.getItem('token'));},
    success:(data)=>{
      console.log("sarthak ..........",data)
      display2(data)
  }})
  .fail(function(jqXHR, textStatus, errorThrown){console.log("AmritEror"+errorThrown)});

}

function myarticle(username){
  console.log("myarticle username is....",username)
  $.ajax({
    url:'/api/articles?author='+username ,type: "GET",
  beforeSend: function(xhr){xhr.setRequestHeader("Authorization" , "Token " +localStorage.getItem('token'));},
  success:(data)=>{
    console.log("sarthak ..........",data)
    display2(data)
}})
.fail(function(jqXHR, textStatus, errorThrown){console.log("AmritEror"+errorThrown)});
}
    

function display2(profile){
console.log("in display")


 let body=$('body,html')
 
 body.empty()
  let v= JSON.parse(JSON.stringify(profile))

     body.append(`
    yooooooooooooooo


          
     `)

     //console.log(posts)
 }
