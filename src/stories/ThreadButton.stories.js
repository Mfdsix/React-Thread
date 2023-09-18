import '../styles'
import { ThreadButton } from '../components/thread/Detail'

export default {
  title: 'Thread Button',
  component: ThreadButton
}

export const Default = {
  args: {
  }
}

export const DefaultWithComment = {
  args: {
    commentCount: 100
  }
}

export const UpVoted = {
  args: {
    isUpvoted: true,
    upvotedCount: 20
  }
}

export const UpVotedWithComment = {
  args: {
    isUpvoted: true,
    upvotedCount: 20,
    commentCount: 100
  }
}

export const DownVoted = {
  args: {
    isDownVoted: true,
    upvotedCount: 20
  }
}

export const DownVotedWithComment = {
  args: {
    isDownVoted: true,
    upvotedCount: 20,
    commentCount: 100
  }
}
