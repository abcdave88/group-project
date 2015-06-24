console.log('trending');

function sortProperties(obj)
{
  // convert object into array
    var sortable=[];
    for(var key in obj)
        if(obj.hasOwnProperty(key))
            sortable.push([key, obj[key]]); // each item is an array in format [key, value]

    // sort items by value
    sortable.sort(function(a, b)
    {
      return a[1]-b[1]; // compare numbers
    });
    return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
}


$(document).ready(function(){
var items = {};


  $.get('/trending', function(duplicates){
    // console.log(duplicates);

  }).done(function(duplicates){
    // console.log(duplicates);    
    for (var i = 0; i < duplicates.length; i ++){ 
     var value = duplicates[i].count;
     var key = duplicates[i]._id;  
     items[key] = value;
    }
    // console.log(items);
    var sortedArray = sortProperties(items);
    console.log(sortedArray);
  }) 

});//end of document.ready
