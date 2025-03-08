import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
const allPastes = useSelector((state)=>state.paste.pastes);

useEffect(()=>{
    if(pasteId){
        const paste = allPastes.find((p) => p._id === pasteId);
        setTitle(paste.title);
        setValue(paste.content);
    }
    
},[pasteId])
  function createPaste() {
    const paste = {
        title: title,
        content: value,
        _id: pasteId || Date.now().toString(36),
        createdAt:new Date().toISOString(),
    }
    
    if(pasteId){
        //update
        dispatch(updateToPastes(paste));
    }
    else{
        //create
        dispatch(addToPastes(paste));
    }

    //after creation or updation
    setTitle('');
    setValue('');
    setSearchParams({});
  }
  return (
    <div className="mt-8 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <input
          className="flex-grow p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Enter title here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button 
          onClick={createPaste} 
          className="px-4 py-2 bg-black text-white rounded-xl shadow hover:bg-gray-800"
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>
      <textarea
        className="w-full p-4 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={value}
        placeholder="Enter content here..."
        onChange={(e) => setValue(e.target.value)}
        rows={20}
      />
    </div>
  );
};

export default Home;
