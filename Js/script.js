

const privatekey = 'e736b86241d5f235b647757d9655153a3f18b4d8',
      publickey = 'ce237e9954813c68a5635c3389e41102',
      content = document.getElementById('content'),
      search = document.getElementById('search');


      const getConnection = () =>{
          const ts = Date.now(),
              hash = MD5(ts + privatekey + publickey),
              URL = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publickey}&hash=${hash}`;
              fetch(URL)
              .then(response => response.json())
              .then(response => {
                response.data.results.forEach(e => {
                  drawHero(e);
                  
                });
              })
              .catch(e => console.log(e));          
      };

      const drawHero = e => {
        const image =`${e.thumbnail.path}/portrait_uncanny.${e.thumbnail.extension}`;
        const hero = `
        <div class="hero ed-item l-1-3">
        <h3>${e.name}</h3>
              <div class="hero-img">
              <img class="thumbnail" src="${image}">
              <p class="description">${e.description}</p>
              </div>
       </div>
        `;
        content.insertAdjacentHTML('beforeEnd',hero);

      };


      const searchHero = name => {
        const ts = Date.now(),
              hash = MD5(ts + privatekey + publickey),
              hero = encodeURIComponent(name),
              URL = `http://gateway.marvel.com/v1/public/characters?name=${hero}&ts=${ts}&apikey=${publickey}&hash=${hash}`;
              fetch(URL) 
              .then(response => response.json())
              .then(response =>{
                response.data.results.forEach(e =>{
                  drawHero(e);
                });
              }) 
              .catch(e => console.log(e)); 
      }; 

     search.addEventListener('keyup', e =>{
      if (e.keyCode === 13){
        content.innerHTML = '';
        searchHero(e.target.value.trim());
      }
     });    
      getConnection(); 	