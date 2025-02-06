import React from 'react'

export default function SideButton({ title, icon }) {
    return (
        <div className='flex gap-5 bg-zinc-700 rounded-md pl-5 p-1.5 hover:bg-zinc-600 text-xl'>
            <div>
                {icon}
            </div>
            <div>
                {title}
            </div>
        </div>
    )
}
