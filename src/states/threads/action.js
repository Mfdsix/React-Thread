import {
    ThreadRequest, VoteRequest
} from '../../data/api/dicoding-forum';

const ActionType = {
    RECEIVE_THREADS: 'RECEIVE_THREADS',
    ADD_THREAD: 'ADD_THREAD',
    SET_STATUS_VOTE_THREAD: 'SET_STATUS_VOTE_THREAD',
}
const VoteType = {
    UPVOTE: 'UPVOTE',
    DOWNVOTE: 'DOWNVOTE',
    NEUTRALVOTE: 'NEUTRALVOTE',
}

function reveiceThreadsActionCreator(threads) {
    return {
        type: ActionType.RECEIVE_THREADS,
        payload: {
            threads
        }
    }
}

function addThreadActionCreator(thread) {
    return {
        type: ActionType.ADD_THREAD,
        payload: {
            thread
        }
    }
}

function setStatusVoteThreadActionCreator({
    threadId,
    userId,
    type,
    isRollback = false
}) {
    return {
        type: ActionType.SET_STATUS_VOTE_THREAD,
        payload: {
            threadId,
            userId,
            type,
            isRollback
        }
    }
}

function asyncAddThread({
    title,
    body,
    category
}) {
    return async (dispatch) => {
        try{
            const { error, message, data } = await ThreadRequest.create({
                title, body, category
            });

            if(error) return alert(message);

            dispatch(addThreadActionCreator(data.thread));
        }catch(error){
            alert(error.message);
        }
    }
}

function asyncSetStatusVoteThread({
    threadId,
    type = VoteType.UPVOTE
}){
    return async (dispatch, getState) => {
        const { authUser } = getState();
        dispatch(setStatusVoteThreadActionCreator({
            threadId,
            userId: authUser?.id,
            type
        }));

        try{
            switch(type){
                case VoteType.UPVOTE:
                    await VoteRequest.upVote(threadId);
                case VoteType.DOWNVOTE:
                    await VoteRequest.downVote(threadId);
                default:
                    await VoteRequest.neutralVote(threadId);
            }
        }catch(error){
            alert(error.message);
            
            // rollback function
            dispatch(setStatusVoteThreadActionCreator({
                threadId,
                userId: authUser?.id,
                type,
                isRollback: true
            }));
        }
    }
}

export {
    ActionType,
    VoteType,
    reveiceThreadsActionCreator,
    addThreadActionCreator,
    setStatusVoteThreadActionCreator,
    asyncAddThread,
    asyncSetStatusVoteThread
}