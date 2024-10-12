import React from 'react'

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[50vh]">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <h1>Laoging..</h1>
        </div>
    );
}

export default Loading