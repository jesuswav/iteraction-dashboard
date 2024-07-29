import React, { useEffect, useState } from 'react'

const PostContext = React.createContext()

function PostsProvider({ children }) {
  const [estado, setEstado] = useState('Hola')
  return (
    <PostContext.Provider value={{ estado, setEstado }}>
      {children}
    </PostContext.Provider>
  )
}

export { PostContext, PostsProvider }
