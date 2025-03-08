import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

function Paste() {
  const pastes = useSelector((state) => state.paste.pastes)
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId))
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <input
        className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="search"
        placeholder="Search here..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="mt-6 space-y-4">
        {filteredData.length > 0 &&
          filteredData.map((paste) => (
            <div key={paste?._id} className="bg-black shadow rounded-lg p-4 text-gray-200">
              <h2 className="text-xl font-semibold mb-2">{paste.title}</h2>
              <p className="text-gray-300 mb-4">{paste.content}</p>
              <div className="flex flex-wrap gap-4 mb-4 justify-center">
                <Link
                  to={`/pastes/${paste?._id}`}
                  className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                >
                  View
                </Link>
                <button
                  onClick={() => handleDelete(paste?._id)}
                  className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content)
                    toast.success("Copied to clipboard")
                  }}
                  className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                >
                  Copy
                </button>
              </div>
              <div className="text-sm text-gray-400">
                Created at: {new Date(paste.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        {filteredData.length === 0 && (
          <p className="text-center text-gray-600">No pastes found.</p>
        )}
      </div>
    </div>
  )
}

export default Paste
