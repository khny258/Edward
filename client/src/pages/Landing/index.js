import React from "react";

function Insights() {
  return (
    <container>
    <div class="container">
      <div className="row my-4">
        {/* <center><h2>Welcome to Edward</h2></center> */}
        <div className="col-md-6 text-center mb-3">
          <img src="https://www.uidownload.com/files/985/679/738/smart-boy-vector-character.jpg" className="img-fluid"></img>
        </div>
        <div className="col-md-6 align-self-center">
            <center><h1><b>Meet Edward! The smarter sibling of the <a href="https://www.sec.gov/edgar/searchedgar/companysearch.html" target="_blank">SEC's Edgar</a></b></h1>
            <h5><b>Become a well-informed investor!</b></h5>
            <button className="btn btn-primary">Signup for free</button> </center>
        </div>
      </div>
      <div className="row my-4 justify-content-md-center">
        <div className="col-md-8 text-center mb-3">
        <b><h2>What Edward Can Do For You</h2></b>
        <h5>Edward will simplify information available in SEC's Edgar and display what matters the most to you as an investor</h5>
        </div>

        {/* <img src="https://res.cloudinary.com/test-entreleadership-com/image/upload/v1510602799/6-financial-reports.jpg" className="img-fluid"></img> */}
      </div>
        <div class="card-deck my-4">
          <div class="card col-4 p-0">
            <img src="https://res.cloudinary.com/test-entreleadership-com/image/upload/v1510602799/6-financial-reports.jpg" class="card-img-top" alt="..."></img>
            <div class="card-body">
              <center><h6 class="card-title">Key Performance Indicators</h6></center>
              <a  href="/clustering" class="stretched-link"></a>
            </div>
          </div>
          <div class="card col-4 p-0">
            <img src="https://res.cloudinary.com/test-entreleadership-com/image/upload/v1510602799/6-financial-reports.jpg" class="card-img-top" alt="..."></img>
            <div class="card-body">
              <center><h6 class="card-title">Insider Transactions</h6></center>
            </div>
          </div>
          <div class="card col-4 p-0">
            <img src="https://res.cloudinary.com/test-entreleadership-com/image/upload/v1510602799/6-financial-reports.jpg" class="card-img-top" alt="..."></img>
            <div class="card-body">
              <center><h6 class="card-title">Financial Statement Key Textual Information</h6></center>
            </div>
          </div>
        </div>
      </div>  
    </container>
  );
}

export default Insights;
