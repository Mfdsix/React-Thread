import React from 'react'
import PropTypes from 'prop-types'

import {
    asyncAddComment
} from '../../states/threadDetail/action'
import { useDispatch } from 'react-redux'

function DetailComment({
    comments
}){

    const dispatch = useDispatch()

    return <>
        <div>List Comment</div>
    </>
}

DetailComment.propTypes = {
    thread: PropTypes.arrayOf<PropTypes.object>
}

export default DetailComment
