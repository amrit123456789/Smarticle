function fetchglobal(done){

    $.get('/api/articles' ,(data)=>{
        done(data)
    })
}

fetchglobal((articles) => {
    display(articles);   
})

function display(articles){
    let posts=$('.mypost')
    //let meta=$('.post-meta')
    posts.empty()
    let v= JSON.parse(JSON.stringify(articles))
    // console.log(v)
    // console.log(v.articles[0])
    // console.log(v.articles.length)
   // console.log(articles.get(0))

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

        console.log(posts)
    }
   // console.log(articles)
}