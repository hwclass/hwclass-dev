import React from "react"

export default function Layout({ children }) {
  return (
    <div style={{ background: `grey`, maxWidth: 650, padding: `0 1rem` }}>
      {children}
    </div>
  )
}