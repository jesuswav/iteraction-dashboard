import React, { useEffect, useState } from 'react'

const PostContext = React.createContext()

function PostsProvider({ children }) {
  const [estado, setEstado] = useState('')
  const [postsData, setPostsData] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [notFilteredPosts, setNotFilteredPosts] = useState(true)
  const [updatePost, setUpdatePost] = useState(false)

  return (
    <PostContext.Provider
      value={{
        estado,
        setEstado,
        postsData,
        setPostsData,
        filteredPosts,
        setFilteredPosts,
        notFilteredPosts,
        setNotFilteredPosts,
        updatePost,
        setUpdatePost,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export { PostContext, PostsProvider }
