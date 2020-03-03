var restaurantdata = [];

//find reviews
function searchReviews(id, cb)
{
  $.get("/api/searchreviews/" + id , function(data)
  {
    //console.log(data);
    $("#yelpreviews").empty();
    $("#yelpreviews").append("<div>");
    $("#yelpreviews").append("<h3 style='color:brown;'>Top 3 Reviews</h3>");
    for(var j=0; j < data.reviews.length; j++)
    {
      $("#yelpreviews").append("<span style='color: blue' align='center'><i>" + data.reviews[j].user.name + " </i></span>");
      $("#yelpreviews").append("<br/>");
      $("#yelpreviews").append("<img class='thumbnail' src='" + data.reviews[j].user.image_url + "' height='75' align='center'>" + " </img>");
      $("#yelpreviews").append("<br/>");
      $("#yelpreviews").append("<span align='center'>Rating: " + data.reviews[j].rating + " </span>");
      $("#yelpreviews").append("<br/>");
      $("#yelpreviews").append("<span align='center'>" + data.reviews[j].text + " </span>");
      $("#yelpreviews").append("<br/>");
      $("#yelpreviews").append("<span align='center'>" + data.reviews[j].time_created + " </span>");
      $("#yelpreviews").append("<hr/>");
    }

    $("#yelpreviews").append("</div>");
    cb(data);
  });

}

//Search Parameters
function searchyelp(searchterms, cb)
{
$.get("/api/search/" + searchterms.latitude + "/" + searchterms.longitude + "/" +  searchterms.term + "/" + searchterms.radius + "/" + searchterms.price + "/" + searchterms.sort_by , function(data)
{
  //console.log(data);
  $("#list").empty();
  $("#list").append("<div>");
  $("#list").append("<strong style='background-color: brown; color: white;'>Found " + data.length + " open " + searchterms.term + "(s)</strong>");
  for(var i=0; i< data.length; i++)
  {
   if(data[i].coordinates != null || data[i].coordinates != null)
   {
    $("#list").append("<div align='middle' style='padding:5px;'>");
    $("#list").append("<h2><a target='_blank' href='" + data[i].url + "'>" + data[i].name + "</a></h2>");
    $("#list").append("<br/>");
    $("#list").append("Distance:" + parseFloat(data[i].distance).toFixed(2) + " meters");
    $("#list").append("<p style='text-align:center;''><img align='middle' class='center' width='300px' src='" + data[i].image_url + "'>" + "</img></p>");
    $("#list").append("<br/>");
    for(var j=0; j < data[i].categories.length; j++)
    {
      $("#list").append("<strong style='color:brown'>" + data[i].categories[j].title + " </strong>");
    }
    $("#list").append("<br/>");
    $("#list").append("Rating:" + data[i].rating);
    $("#list").append("<br/>");
    $("#list").append("Price:" + data[i].price);
    $("#list").append("<br/>");
    
    //$("#list").append("<br/>");
   /* $("#list").append(data[i].location.address1);
    $("#list").append("<br/>");
    if(data[i].location.address2 != "")
    {
    $("#list").append(data[i].location.address2);
    $("#list").append("<br/>");
    }
    $("#list").append(data[i].location.city);
    $("#list").append("<br/>");
    $("#list").append(data[i].location.state + ", " + data[i].location.zip_code); */
    $("#list").append("<br/>");
    $("#list").append("<a href='tel:" + data[i].display_phone + "'>" + "Phone: " + data[i].display_phone + "</a>");
 

    if(data[i].is_closed == true)
    {
      $("#list").append("<span style='color:red'>Closed</span>");
    }
    else
    {
      $("#list").append("<span style='color:green'>Open</span>");
    }
    
    $("#list").append("<br/>");
    $("#list").append("<button class='themeChanger' name='details'" + "value='" + data[i].id +"'>Details and Directions</button>");
    $("#list").append("<br/>");
    $("#list").append("<hr/>");
    $("#list").append("</div>");
   }
  }
  $("#list").append("<div>");
  cb(data);
});
}

function searchDetails(id, cb)
{
  $.get("/api/searchdetails/" + id , function(data)
  {
    //console.log(data);
    $("#yelpdetails").empty();
    $("#yelpdetails").append("<div style='background-color:black; corner-radius:5; border-width:1px; padding:5px;'");
    $("#yelpdetails").append("<h2 style='color:brown'><strong>" + data.name + "</strong></h2>");
    $("#yelpdetails").append("<hr/>");
    $("#yelpdetails").append("Reviews: " + data.review_count);
    $("#yelpdetails").append("<br/>");
    $("#yelpdetails").append("Rating: " + data.rating);
    $("#yelpdetails").append("<br/>");
    $("#yelpdetails").append("Price: " + data.price);
    $("#yelpdetails").append("<br/>");
    $("#yelpdetails").append("Address: " + data.location.display_address);
    $("#yelpdetails").append("<br/>");
    $("#yelpdetails").append("<a href='tel:" + data.display_phone + "'>" + "Phone: " + data.display_phone + "</a>");
    $("#yelpdetails").append("<br/>");
    for(var j=0; j < data.transactions.length; j++)
    {
      $("#yelpdetails").append("<span align='center'>" + data.transactions[j] + " </span>");
    }
    $("#yelpdetails").append("<p style='text-align:center;'>");
    for(var i=0;i<data.photos.length;i++)
    {
      $("#yelpdetails").append("<img class='thumbnail column' width='200px' src='" + data.photos[i] + "'>" + "</img>");
    }
    $("#yelpdetails").append("</p>");
    $("#yelpdetails").append("<hr/>");
    
    $("#yelpdetails").append("<br/>");
    $("#yelpdetails").append("<hr/>");
    $("#yelpdetails").append("</div>");
    cb(data);
  });

}
