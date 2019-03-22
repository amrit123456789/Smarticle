function fetchlocal(done){
    // console.log("req.user "+JSON.stringify(req.params))
       $.ajax({
         url:'/api/articles/how-to-train-your-dragon-il3jjq' ,type: "GET",
       beforeSend: function(xhr){xhr.setRequestHeader("Authorization" , "Token " +'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOTFmYzJiNDU5NWE1MTk0YTE0NWNkYyIsInVzZXJuYW1lIjoiYSIsImV4cCI6MTU1ODI4ODI0NCwiaWF0IjoxNTUzMTA0MjQ0fQ.CEI4T--eGv9UTVYgjd_N8qVPZ_czJr89JBzmZM89LgU');},
       success:(data)=>{
         console.log("sarthak ..........")
         done(data)
     }})
     .fail(function(jqXHR, textStatus, errorThrown){console.log("AmritEror"+errorThrown)});
   
   }
       
   
   
   fetchlocal((articles) => {
       display(articles);   
   })
   
   function display(article){
       console.log(article)
     console.log("following" ,typeof article.article.author.following)
       let post=$('.post-page')
       //let meta=$('.post-meta')
       post.empty()
        let v= JSON.parse(JSON.stringify(article))
       // console.log(v)
       // console.log(v.articles[0])
       // console.log(v.articles.length)
      // console.log(articles.get(0))
   
       
          // console.log(article)
           post.append(`
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
       
             <div class="col-md-8 col-md-offset-2">
       
               <div class="card">
                 <div class="card-block">
                   <p class="card-text">${article.article.comments}</p>
                 </div>
                 <div class="card-footer">
                   <a href="profile.html" class="comment-author">
                     <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
                   </a>
                   &nbsp;
                   <a href="profile.html" class="comment-author">${article.article.author.username}</a>
                   <span class="date-posted">${article.article.createdAt}</span>
                 </div>
               </div>
       
               
       
               <form class="card comment-form">
                 <div class="card-block">
                   <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
                 </div>
                 <div class="card-footer">
                   <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
                   <button class="btn btn-sm btn-primary">
                    Post Comment
                   </button>
                 </div>
               </form>
       
             </div>
       
           </div>
       
         </div>
   
   
                
           `)
   
           //console.log(posts)
       
      // console.log(articles)
   }