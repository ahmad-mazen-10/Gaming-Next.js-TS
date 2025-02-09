import React from 'react'

function Heading({text,className}:{text:string, className?:string}) {
    return <h1 className={className || ""}>{text}</h1>
}

export default Heading