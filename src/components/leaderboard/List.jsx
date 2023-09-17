import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    asyncReceiveLeaderboards
} from '../../states/leaderboards/action'
import ListItem from "./ListItem";

function List() {

    const {
        leaderboards
    } = useSelector((states) => states)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(asyncReceiveLeaderboards())
    }, [dispatch])

  return (
    <>
      <div className="my-1">
        <h3>Leaderboard</h3>
        <p>Best forum contributor</p>
      </div>

      { leaderboards.map((leaderboard) => (
        <ListItem key={leaderboard.user.id} leaderboard={leaderboard}/>
      )) }
    </>
  );
}

export default List;
