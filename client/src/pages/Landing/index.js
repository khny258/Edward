import React from "react";

function Insights() {
  return (
    <>
    <div className="container">
      <div className="row my-4">

        <div className="col-md-6 text-center mb-3">
          <img src="https://www.uidownload.com/files/985/679/738/smart-boy-vector-character.jpg" className="img-fluid"></img>
        </div>
        <div className="col-md-6 align-self-center">
            <center><h1><b>Meet Edward! The smarter sibling of the <a href="https://www.sec.gov/edgar/searchedgar/companysearch.html" target="_blank" style={{color:"#a873fc"}}>SEC's Edgar</a></b></h1>
            <h5><b>Become a well-informed investor!</b></h5>
            <a className="btn text-light" style={{backgroundColor:"#a873fc"}} href="/signup">Sign Up for Free</a> </center>
        </div>
      </div>
      <div className="row my-4 justify-content-md-center">
        <div className="col-md-8 text-center mb-3">
        <b><h2>What Edward Can Do For You</h2></b>
        <h5>Edward will simplify information available in SEC's Edgar and display what matters the most to you as an investor</h5>
        </div>

      </div>
        <div className="row card-deck my-4 justify-content-md-center">
          <div className="card col-md-3 mx-5 border-0">
            <img src="https://image.flaticon.com/icons/svg/2638/2638127.svg" className="card-img-top" alt="..."></img>
            <div className="card-body">
              <center><h6 className="card-title">Key Performance Indicators</h6></center>
              <a  href="/clustering" className="stretched-link"></a>
            </div>
          </div>
          <div className="card col-md-3 mx-5 border-0">
            <img src="https://image.flaticon.com/icons/svg/2638/2638119.svg" className="card-img-top" alt="..."></img>
            <div className="card-body">
              <center><h6 className="card-title">Insider Transactions</h6></center>
            </div>
          </div>
          <div className="card col-md-3 mx-5 border-0">
            <img src="https://image.flaticon.com/icons/svg/3163/3163835.svg" className="card-img-top" alt="..."></img>
            <div className="card-body">
              <center><h6 className="card-title">Financial Statement Key Textual Information</h6></center>
            </div>
          </div>
        </div>
      </div>  
    </>
  );
}

export default Insights;
