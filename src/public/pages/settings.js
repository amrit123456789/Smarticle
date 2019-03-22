

window.onload= function(){
    console.log("hello.......")

    let image= document.getElementById('image')
    let bio= document.getElementById('bio')
    let username= document.getElementById('name')
    let email= document.getElementById('email')
    let password= document.getElementById('password')
    let submit= document.getElementById('submit')

   submit.onclick=function(){
    console.log("username   ", username.value)
    // console.log(body.value)
    // console.log(tagList.value)
  //  }
    let person=new Object()
    person.image=image.value
    person.username=username.value
    person.bio=bio.value
    person.email=email.value
    person.password=password.value

   

  $.ajax({
    url:'/api/user/' ,type: "PUT",
  beforeSend: function(xhr){xhr.setRequestHeader("Authorization" , "Token " +localStorage.getItem('token'));},
  dataType: "json",
  data: person,
    success: function (data, textStatus, xhr) {  
    console.log(data);  
    alert("updated the data")
    },  
    error: function (xhr, textStatus, errorThrown) {  
        console.log("username   ", username.value)
    console.log('Error in Operation');  
    alert("did not update the data")
    }  


  })
};


}

   
