
function fetchglobal(done){

  var sPageURL = window.location.search.substring(1);

  var sURLVariables = sPageURL.split('&');

  for (var i = 0; i < sURLVariables.length; i++)
 {

      var sParameterName = sURLVariables[i].split('=');

      localStorage.setItem('token', sParameterName[1])

      //    console.log("token is ", localStorage.getItem('token'));


  }

    $.get('/api/articles' ,(data)=>{
        done(data)
    })
}

fetchglobal((articles) => {
  console.log("displaying articles,..........")
    display(articles);   
})

//GetURLParameter(token)

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
<button  class="author" id=${v.articles[i].author.username} onclick="fetchlocal(this)">${v.articles[i].author.username}</button>
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

       // console.log(posts)
    }
   // console.log(articles)
}

// function fetchlocal(username){
//    console.log("here in onclick..............>>")
//      $.ajax({
//        url:'/api/profiles/amrit' ,type: "GET",
//      beforeSend: function(xhr){xhr.setRequestHeader("Authorization" , "Token " +localStorage.getItem('token'));},
//      success:(data)=>{
//        console.log("sarthak ..........",data)
//        display2(data)
//    }})
//    .fail(function(jqXHR, textStatus, errorThrown){console.log("AmritEror"+errorThrown)});
 
//  }
     

// function display2(profile){
// console.log("in display")
//   let body=$('body,html')
  
//   body.empty()
//    let v= JSON.parse(JSON.stringify(profile))

//       body.append(`
//      yooooooooooooooo


           
//       `)

//       //console.log(posts)
//   }
 

 
 