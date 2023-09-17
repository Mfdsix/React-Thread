import React from "react";
import { Link } from "react-router-dom";

function LeaderboardLink() {
  return <>
  <div className="my-1">
    <h3>Leaderboard</h3>
    <p>See who's make more contribution here</p>

    <div>
      <Link className="btn btn__block my-1 btn__submit" to='/leaderboard'>Go to Leaderboard</Link>
    </div>
  </div>
  </>;
}

export default LeaderboardLink;
