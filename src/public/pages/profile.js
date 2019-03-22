function fetchlocal(done){
    // console.log("req.user "+JSON.stringify(req.params))
       $.ajax({
         url:'/api/profiles/amrit' ,type: "GET",
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
    //  console.log("following" ,typeof article.article.author.following)
    //    let post=$('.post-page')
    //    //let meta=$('.post-meta')
    //    post.empty()
    //     let v= JSON.parse(JSON.stringify(article))
       
       
    //       // console.log(article)
    //        post.append(`
          
   
                
    //        `)
   
           //console.log(posts)
       
      // console.log(articles)
   }