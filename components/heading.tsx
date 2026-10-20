import React from "react"

function Heading({ children }: { children: React.ReactNode }) {
  return <h1 className="text-xl leading-tight font-bold">{children}</h1>
}

export default Heading
