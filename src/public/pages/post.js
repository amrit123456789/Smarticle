function fetcharticle(obj){
  //  console.log("req.user "+JSON.stringify(req.params))
       $.ajax({
         url:'/api/articles/'+obj.id ,type: "GET",
       beforeSend: function(xhr){xhr.setRequestHeader("Authorization" , "Token " +localStorage.getItem('token'));},
       success:(data)=>{
        // console.log("sarthak ..........",data)
         getcomments(data)
     }})
     .fail(function(jqXHR, textStatus, errorThrown){console.log("AmritEror"+errorThrown)});
   
  
  console.log("post slug is ",obj.id)
  // if (!e) var e = window.event;
  //   e.cancelBubble = true;
  //   if (e.stopPropagation) e.stopPropagation();

}

function getcomments(article){
  let a=article.article
  //console.log("myarticle  is....",a)
  $.ajax({
    url:'/api/articles/'+a.slug+'/comments' ,type: "GET",
  beforeSend: function(xhr){xhr.setRequestHeader("Authorization" , "Token " +localStorage.getItem('token'));},
  success:(data)=>{
    window.comments=data
    // console.log("window.comments ..........",data)
    // console.log("window.comments creation..........",data.createdAt)
    display3(article)

}})
.fail(function(jqXHR, textStatus, errorThrown){console.log("AmritEror"+errorThrown)});
}
       

   
   
  
   
   function display3(article){
     window.sl = article.article.slug
     //  console.log(article)
    // console.log("following" ,typeof article.article.author.following)
       let post=$('.forpost')
       //let meta=$('.post-meta')
       post.empty()
        let v= JSON.parse(JSON.stringify(article))
        //console.log(v)
       // console.log(v.articles[0])
       // console.log(v.articles.length)
      // console.log(articles.get(0))
   
       
          // console.log(article)
           post.append(`
           <div class="post-page">
           <div class="banner">
           <div class="container">
       
             <h1>${article.article.title}</h1>
       
             <div class="post-meta">
               <a href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
               <div class="info">
                 <a href="profile.html" class="author">${article.article.author.username}</a>
                 <span class="date">${article.article.createdAt}</span>
               </div>
               <button class="btn btn-sm btn-outline-secondary">
                 <i class="ion-plus-round"></i>
                 &nbsp;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
                 Follow ${article.article.author.username} <span class="counter">(${article.article.favoritesCount})</span>
               </button>
               &nbsp;&nbsp;
               <button class="btn btn-sm btn-outline-primary">
                 <i class="ion-heart"></i>
                 &nbsp;
                 Favorite Post                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
               </button>
             </div>
       
           </div>
         </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
       
         <div class="container page">
       
           <div class="row post-content">
             <div class="col-md-12">
             ${article.article.body}
             </div>
           </div>
       
           <hr />
       
           <div class="post-actions">
             <div class="post-meta">
               <a href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
               <div class="info">
                 <a href="profile.html" class="author">${article.article.author.username}</a>
                 <span class="date">${article.article.createdAt}</span>
               </div>
       
               <button class="btn btn-sm btn-outline-secondary">
                 <i class="ion-plus-round"></i>
                 &nbsp;
                 Follow ${article.article.author.username} <span class="counter">(${article.article.favoritesCount})</span>
               </button>
               &nbsp;
               <button class="btn btn-sm btn-outline-primary">
                 <i class="ion-heart"></i>
                 &nbsp;
                 Favorite Post 
               </button>
             </div>
           </div>
       
           <div class="row">
       
             <div class="col-md-8 col-md-offset-2 mycomments">
       
               
       
             </div>
       
           </div>
       
         </div>
        </div>
   
                
           `)
          let mycom= $('.mycomments')
          let comarr =window.comments.comments
         // console.log("comarr is..",comarr)

          for(let i=comarr.length-1;i>=0;i--){
            mycom.append(`
            <div class="card">
            <div class="card-block">
              <p class="card-text">${comarr[i].body}</p>
            </div>
            <div class="card-footer">
              <a href="profile.html" class="comment-author">
                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
              </a>
              &nbsp;
              <a href="profile.html" class="comment-author">${comarr[i].author.username}</a>
              <span class="date-posted">2 days ago</span>
            </div>
          </div>
            `)
          }






          mycom.append(`
         
       
               
       
               <form class="card comment-form">
                 <div class="card-block">
                   <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
                 </div>
                 <div class="card-footer">
                   <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
                   <p  id="postit" onclick="console.log("hi")">
                    Post Comment...
                   </p>
                 </div>
               </form>`)


   
   }

   