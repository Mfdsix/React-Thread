import React from "react";
import UserLayout from "../components/layouts/User";

import LeaderboardComponent from '../components/leaderboard/List'

function Leaderboard(){
    return <>
    <UserLayout>
        <LeaderboardComponent/>
    </UserLayout>
    </>
}

export default Leaderboard