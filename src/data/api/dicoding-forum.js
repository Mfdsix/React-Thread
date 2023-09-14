import { fetchUrl, fetchUrlWithToken } from './http'

const requestWrapper = async (request) => {
  try {
    const response = await request
    const { status, message, data } = await response.json()
    return {
      error: status !== 'success',
      message,
      data
    }
  } catch (e) {
    return {
      error: true,
      message: e.message
    }
  }
}

const AuthRequest = {
  async register ({
    name,
    email,
    password
  }) {
    return await requestWrapper(fetchUrl('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    }))
  },

  async login ({
    email,
    password
  }) {
    return await requestWrapper(fetchUrl('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    }))
  },

  async getAllUser () {
    return await requestWrapper(fetchUrl('/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }))
  },

  async profile () {
    return await requestWrapper(fetchUrlWithToken('/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }))
  }
}

const ThreadRequest = {
  async getAll () {
    return await requestWrapper(fetchUrlWithToken('/threads', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }))
  },

  async getById (threadId) {
    return await requestWrapper(fetchUrlWithToken(`/threads/${threadId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }))
  },

  async create ({
    title,
    body,
    category
  }) {
    return await requestWrapper(fetchUrlWithToken('/threads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        body,
        category
      })
    }))
  }
}

const CommentRequest = {
  async create (threadId, {
    content
  }) {
    return await requestWrapper(fetchUrlWithToken(`/threads/${threadId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content
      })
    }))
  }
}

const VoteRequest = {
  async upVote (threadId) {
    return await requestWrapper(fetchUrlWithToken(`/threads/${threadId}/up-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }))
  },

  async downVote (threadId) {
    return await requestWrapper(fetchUrlWithToken(`/threads/${threadId}/down-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }))
  },

  async neutralVote (threadId) {
    return await requestWrapper(fetchUrlWithToken(`/threads/${threadId}/neutral-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }))
  },

  async commentUpVote ({
    threadId,
    commentId
  }) {
    return await requestWrapper(fetchUrlWithToken(`/threads/${threadId}/comments/${commentId}/up-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }))
  },

  async commentDownVote ({
    threadId,
    commentId
  }) {
    return await requestWrapper(fetchUrlWithToken(`/threads/${threadId}/comments/${commentId}/down-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }))
  },

  async commentNeutralVote ({
    threadId,
    commentId
  }) {
    return await requestWrapper(fetchUrlWithToken(`/threads/${threadId}/comments/${commentId}/neutral-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }))
  }
}

const LeaderBoardRequest = {
  async getAll () {
    return await requestWrapper(fetchUrl('/leaderboards', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }))
  }
}

export {
  AuthRequest,
  ThreadRequest,
  CommentRequest,
  VoteRequest,
  LeaderBoardRequest
}
