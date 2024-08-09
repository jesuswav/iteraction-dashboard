import React, { useEffect, useState } from 'react'

const PostContext = React.createContext()

function PostsProvider({ children }) {
  const [estado, setEstado] = useState('')
  const [postsData, setPostsData] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [notFilteredPosts, setNotFilteredPosts] = useState(true)

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
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export { PostContext, PostsProvider }
