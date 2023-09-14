import { CommentRequest, VoteRequest } from "../../data/api/dicoding-forum"

const ActionType = {
    RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
    ADD_COMMENT: 'ADD_COMMENT',
    SET_STATUS_VOTE_COMMENT: 'SET_STATUS_VOTE_COMMENT',   
}
const VoteType = {
    UPVOTE: 'UPVOTE',
    DOWNVOTE: 'DOWNVOTE',
    NEUTRALVOTE: 'NEUTRALVOTE',
}

function reveiceThreadDetailActionCreator(thread) {
    return {
        type: ActionType.RECEIVE_THREAD_DETAIL,
        payload: {
            thread
        }
    }
}

function addCommentActionCreator(comment) {
    return {
        type: ActionType.ADD_COMMENT,
        payload: {
            comment
        }
    }
}

function setStatusVoteCommentActionCreator({
    threadId,
    commentId,
    userId,
    type,
    isRollback = false
}) {
    return {
        type: ActionType.SET_STATUS_VOTE_COMMENT,
        payload: {
            threadId,
            commentId,
            userId,
            type,
            isRollback
        }
    }
}

function asyncAddComment({
    threadId,
    content
}) {
    return async (dispatch) => {
        try{
            const { error, message, data } = await CommentRequest.create(threadId, {
                content
            });

            if(error) return alert(message);

            dispatch(addCommentActionCreator(data.comment));
        }catch(error){
            alert(error.message);
        }
    }
}

function asyncSetStatusVoteComment({
    threadId,
    commentId,
    type = VoteType.UPVOTE
}){
    return async (dispatch, getState) => {
        const { authUser } = getState();
        dispatch(setStatusVoteCommentActionCreator({
            threadId,
            commentId,
            userId: authUser?.id,
            type
        }));

        try{
            switch(type){
                case VoteType.UPVOTE:
                    await VoteRequest.commentUpVote(threadId);
                case VoteType.DOWNVOTE:
                    await VoteRequest.commentDownVote(threadId);
                default:
                    await VoteRequest.commentNeutralVote(threadId);
            }
        }catch(error){
            alert(error.message);
            
            // rollback function
            dispatch(setStatusVoteCommentActionCreator({
                threadId,
                commentId,
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
    reveiceThreadDetailActionCreator,
    addCommentActionCreator,
    setStatusVoteCommentActionCreator,
    asyncAddComment,
    asyncSetStatusVoteComment
}