const searchRequest = {
  term:'',
  latitude: 0,
  longitude: 0,
  radius:500,
  price: '1,2,3,4',
  limit: 50,
  sort_by: "best_match",
  open_now: false
};

// Routes
// =============================================================
module.exports = function(app,client) {

 
  app.get("/api/searchreviews/:id",function(req,res){

    client.reviews(req.params.id).then(response => {
      console.log(response.jsonBody);
        return res.json(response.jsonBody);
    });
  });

  app.get("/api/searchdetails/:id",function(req,res){

    client.business(req.params.id).then(response => {
        //console.log(response.jsonBody);
        return res.json(response.jsonBody);
    });
  });


  app.get("/api/search/:lat/:lon/:term/:radius/:price/:sort_by", function(req,res){

    searchRequest.latitude = parseFloat(req.params.lat);
    searchRequest.longitude = parseFloat(req.params.lon);
    searchRequest.term = req.params.term;
    searchRequest.radius = parseInt(req.params.radius);
    searchRequest.price = req.params.price;
    searchRequest.sort_by = req.params.sort_by;

    console.log(searchRequest);

    client.search(searchRequest).then(response => {
      //console.log(response.jsonBody.businesses);
      const firstResult = response.jsonBody.businesses;
      const prettyJson = JSON.stringify(firstResult, null, 4);
      //console.log(prettyJson);
      return res.json(firstResult);
    }).catch(e => {
      console.log("Error" + e);
    });

  })
}
