function fetchlocal(username){
  console.log("here in onclick..............>>")
  console.log(username)
    $.ajax({
      url:'/api/profiles/'+username.id ,type: "GET",
    beforeSend: function(xhr){xhr.setRequestHeader("Authorization" , "Token " +localStorage.getItem('token'));},
    success:(data)=>{
      console.log("sarthak ..........",data)
      myarticle(data)
  }})
  .fail(function(jqXHR, textStatus, errorThrown){console.log("AmritEror"+errorThrown)});

}


function myarticle(profile){
  let usernam=profile.profile.username
  console.log("myarticle username is....",usernam)
  $.ajax({
    url:'/api/articles?author='+usernam ,type: "GET",
  beforeSend: function(xhr){xhr.setRequestHeader("Authorization" , "Token " +localStorage.getItem('token'));},
  success:(data)=>{
    window.articles=data
    console.log("window.articles ..........",data)
    display2(profile)

}})
.fail(function(jqXHR, textStatus, errorThrown){console.log("AmritEror"+errorThrown)});
}
    

function display2(profile){
// console.log("in display")
// console.log("profile is .. ..",JSON.parse(JSON.stringify(profile)))
// console.log("profile.username is .. ..",profile.profile.username)
 //myarticle(profile.profile.username)
 console.log("display2 articles", window.articles)

let v=window.articles
 let body=$('.home-page')
 
 body.empty()


     body.append(`

     <div class="profile-page">

     <div class="user-info">
       <div class="container">
         <div class="row">
   
           <div class="col-md-10 col-md-offset-1">
             <img src="http://i.imgur.com/Qr71crq.jpg" class="user-img" />
             <h4>${profile.profile.username}</h4>
             <p>
             
             </p>
             <button class="btn btn-sm btn-outline-secondary action-btn">
               <i class="ion-plus-round"></i>
               &nbsp;
               Follow ${profile.profile.username} <span class="counter">(2)</span>
             </button>
           </div>
   
         </div>
       </div>
     </div>
   
     <div class="container">
       <div class="row">
   
         <div class="col-md-10 col-md-offset-1 posts">
           <div class="posts-toggle">
             <ul class="nav nav-pills outline-active">
               <li class="nav-item">
                 <a class="nav-link active" href="#">My Posts</a>
               </li>
               
             </ul>
           </div>
           </div>
   
           </div>
           </div>
           
           </div>

          
`)

let posts=$(".posts")

for(let i= v.articles.length-1;i>=0;i--){
   // console.log(article)
    posts.append(`
    <div class="post-preview">
    <div class="post-meta">
      <a href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
      <div class="info">
      <a  class="author">${v.articles[i].author.username}</a>
        <span class="date">${v.articles[i].createdAt}</span>
      </div>
      <button class="btn btn-outline-primary btn-sm pull-xs-right">
        <i class="ion-heart"></i> ${v.articles[i].favoritesCount}
      </button>
    </div>
    <a href="post.html" class="preview-link">
      <h1>${v.articles[i].title}</h1>
      <p>${v.articles[i].body}</p>
      <span>Read more...</span>
    </a>
  </div>
     
    `)
}


  



  
 }
