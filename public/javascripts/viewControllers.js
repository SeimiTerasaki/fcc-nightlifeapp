(function () {

var sendButton = document.querySelector("#formBtn");

function getLinks(data){
   document.getElementById('formInput').value = ""
   var Data = JSON.parse(data);
   var parent = document.getElementById('search-output');
   var itemIndex = -1;
   for(var i =0; i<Data.response.groups[0].items.length; i++){
   itemIndex++;
      parent.insertAdjacentHTML('beforeend',
      '<div class="row" id="list-row"><div class="col-sm-2" id="list-photos"><img src="'+Data.response.groups[0].items[i].venue.featuredPhotos.items[0].prefix+'500x500'+Data.response.groups[0].items[i].venue.featuredPhotos.items[0].suffix+'"></div><div class="col-sm-10" id="inner-list"><span class="badge" id="list-going"><button id="going-btn" value="'+itemIndex+'">0 Going</button></span><p class="poll" id="div-title"><a id="list-title" href="'+Data.response.groups[0].items[i].tips[0].canonicalUrl+'">'+Data.response.groups[0].items[i].venue.name+'</a><span id="list-address">'+Data.response.groups[0].items[i].venue.location.address+', '+Data.response.groups[0].items[i].venue.location.postalCode+'</span><p id="list-rating">Rating: '+Data.response.groups[0].items[i].venue.rating+'</p><p class="poll" id="list-description">"'+Data.response.groups[0].items[i].tips[0].text+'"</p></div></div>');
      }
   }

 sendButton.addEventListener('click', function(e){
    e.preventDefault();
   var parent = document.getElementById('search-output');
   while(parent.firstChild) {
    parent.removeChild(parent.firstChild);
}

 var input = document.getElementById('formInput').value;
 var url = '/search/'+input;
  ajaxFunctions.ajaxRequest('GET', url, getLinks);

}, false);


var goingButton = document.getElementsByTagName('button');
for (var i = 0; i < goingButton.length; i++) {
   
goingButton[i].addEventListener('click', function(e){
   var x = e.target.textContent;
   var num = parseInt(x);

   if (e.target.textContent.indexOf("You") !== -1){
      var num = parseInt(x.match(/\d+/))
      e.target.innerHTML = num +" Going";
      
       var input = e.target.value;
       var urlRemove = '/remove/'+input;
       ajaxFunctions.ajaxRequest('GET', urlRemove, function(err, doc){
       if(err) throw err;
       else null;
      }) 
   } else {
   e.target.innerHTML = "You and "+num+" others are going";
      
    var input = e.target.value;
    var urlGoing = '/going/'+input;
    ajaxFunctions.ajaxRequest('GET', urlGoing, function(err, doc){
    if(err) throw err;
    else null;
    });
   } else if(e.target.textContent.indexOf("Click") === 13){
      null;
   }
},false);
}

})();