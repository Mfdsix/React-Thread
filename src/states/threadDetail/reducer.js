import {
    ActionType, VoteType
} from './action';


function threadDetailReducer(thread = null, action = {}){
    switch(action.type){
        case ActionType.RECEIVE_THREAD_DETAIL:
            return action.payload.thread;
        case ActionType.ADD_COMMENT:
            return {
                ...thread,
                comments: [
                    {
                        ...action.payload.comment,
                        upVotesBy: [],
                        downVotesBy: [],
                    },
                    ...thread.comments
                ]
            };
        case ActionType.SET_STATUS_VOTE_COMMENT:
            return {
                ...thread,
                comments:  thread.comments.map((comment) => {
                if(comment.id == action.payload.comment){

                    let upVotesBy = thread.upVotesBy;
                    let downVotesBy = thread.downVotesBy;

                    if(action.payload.type == VoteType.UPVOTE){
                        if(action.payload.isRollback){
                            upVotesBy = upVotesBy.filter((userId) => userId != action.payload.userId);
                        }else{
                            upVotesBy.push(action.payload.userId);
                        }
                    }
                    if(action.payload.type == VoteType.DOWNVOTE){
                        if(action.payload.isRollback){
                            downVotesBy = downVotesBy.filter((userId) => userId != action.payload.userId);
                        }else{
                            downVotesBy.push(action.payload.userId);
                        }
                    }

                    return {
                        ...comment,
                        upVotesBy,
                        downVotesBy
                    }
                }

                return comment;
            })
        };
        default:
            return thread;
    }
}

export default threadDetailReducer;