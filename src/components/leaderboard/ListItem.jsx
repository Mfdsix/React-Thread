import React from "react";
import PropTypes from "prop-types";

function ListItem({ leaderboard }) {
  return (
    <>
      <div className="leaderboard__item my-1">
        {leaderboard.user && (
          <div className="leaderboard__user">
            <img src={leaderboard.user.avatar} alt={leaderboard.user.name} />
            <div>
              <h4 className="leaderboard__user__name">{leaderboard.user.name}</h4>
            </div>
          </div>
        )}
        <div className="leaderboard_score">{ leaderboard.score }</div>
      </div>
    </>
  );
}

ListItem.propTypes = {
  leaderboard: PropTypes.object,
};

export default ListItem;
