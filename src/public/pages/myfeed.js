function fetchlocal(done){

 // console.log("token is ", localStorage.getItem('token'));
 // console.log("req.user "+JSON.stringify(req.params))
    $.ajax({
      url:'/api/articles/feed' ,type: "GET",
    beforeSend: function(xhr){xhr.setRequestHeader("Authorization" , "Token " +localStorage.getItem('token'));},
    success:(data)=>{
      console.log("sarthak ..........")
      done(data)
  }})
  .fail(function(jqXHR, textStatus, errorThrown){console.log("AmritEror"+errorThrown)});

}
    


fetchlocal((articles) => {
    display(articles);   
})

function display(articles){
  console.log("in display")
    let posts=$('.mypost')
    
    posts.empty()
     let v= JSON.parse(JSON.stringify(articles))
  

    for(let i= v.articles.length-1;i>=0;i--){
       // console.log(article)
        posts.append(`
        <div class="post-preview">
        <div class="post-meta">
          <a href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
          <div class="info">
          <a href="profile.html" class="author">${v.articles[i].author.username}</a>
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

        //console.log(posts)
    }
   // console.log(articles)
}