import React from 'react'

export default function ({ children, className }) {
    return (
        <div className={`bg-zinc-700 p-5 m-5 rounded-md ${className}`}>
            {children}
        </div>
    )
}
