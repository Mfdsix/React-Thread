import React, { useEffect } from "react";
import PropTypes from "prop-types";

import ThreadComment from './DetailComment';

import { useDispatch, useSelector } from "react-redux";
import { asyncGetDetailThread } from "../../states/threadDetail/action";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaCommentAlt
} from 'react-icons/fa'

function ThreadDetail({ threadId }) {
  const { authUser, threadDetail, users } = useSelector((states) => states);
  const dispatch = useDispatch();

  const owner = threadDetail
    ? users.find((user) => user.id == threadDetail.ownerId)
    : null;

  useEffect(() => {
    dispatch(asyncGetDetailThread(threadId));
  }, [dispatch]);

  if (!threadDetail) {
    return (
      <>
        <div className="text-center">
          <h3>Thread Tidak Ditemukan</h3>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="thread__item thread__detail my-1">
        {owner && (
          <div className="thread__user">
            <img src={owner.avatar} alt={owner.name} />
            <h4 className="thread__user__name">{owner.name}</h4>
          </div>
        )}

        <div className="thread__content">
          <div className="thread__content__title">
            <h4>{threadDetail.title}</h4>
            <span className="thread__content__category">
              {threadDetail.category}
            </span>
          </div>
          <div
            className="thread__content__body"
            dangerouslySetInnerHTML={{ __html: threadDetail.body }}
          ></div>
        </div>

        <div className="thread__action">
          {authUser && (
            <>
              <div className="thread__action__button">
                <button onClick={(e) => onVote(VoteType.UPVOTE)}>
                  {authUser && threadDetail.upVotesBy.includes(authUser.id) ? (
                    <FaThumbsUp color="green" />
                  ) : (
                    <FaThumbsUp />
                  )}
                  {threadDetail.upVotesBy.length > 0 && (
                    <span>{threadDetail.upVotesBy.length}</span>
                  )}
                </button>
              </div>
              <div className="thread__action__button">
                <button onClick={(e) => onVote(VoteType.DOWNVOTE)}>
                  {authUser &&
                  threadDetail.downVotesBy.includes(authUser.id) ? (
                    <FaThumbsDown color="red" />
                  ) : (
                    <FaThumbsDown />
                  )}
                </button>
              </div>
            </>
          )}

          {threadDetail.totalComments > 0 && (
            <div className="thread__action__button">
              <FaCommentAlt /> <span>{threadDetail.totalComments}</span>
            </div>
          )}
        </div>
      </div>

      <div className="my-1">
        <ThreadComment threadId={threadDetail.id} comments={threadDetail.comments}/>
      </div>
    </>
  );
}

ThreadDetail.propTypes = {
  threadId: PropTypes.number,
};

export default ThreadDetail;
