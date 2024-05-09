import { useState, useEffect } from "react";
import { Toaster } from 'react-hot-toast';
import { Editor } from 'react-draft-wysiwyg';
import { useDispatch, useSelector } from "react-redux";
import { createNote, getAllNotes } from "./reducer/index";

import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import './App.css';
import { HTMLValueToDraft, draftValueToHTML } from "./utils";


function App() {
  const dispatch = useDispatch()
  const notes = useSelector(state => state.notesReducer)
  const emptyState = HTMLValueToDraft('');
  const [editorState, setEditorState] = useState(emptyState)
  const [noteList, setNoteList] = useState([])

  const loadAllNotes = () => {
    dispatch(getAllNotes());
  }

  useEffect(() => {
    loadAllNotes();
  }, [])

  useEffect(() => {
    if (notes?.noteList?.length > 0) {
      setNoteList(notes.noteList)
    }
  }, [notes])

  const saveTheNoteValue = () => {
    const finalHTML = draftValueToHTML(editorState);
    dispatch(createNote(finalHTML))
    loadAllNotes();
    setEditorState(emptyState);
  }

  return (
    <div className="App">
      <div className="bg-white p-4 mx-auto">
        <div className="mx-auto grid grid-cols-8 gap-2">
          <div className='col-span-6 border-slate-400'>
            <Editor
              editorState={editorState}
              textAlignment="left"
              wrapperClassName="border border-slate-400"
              editorClassName="demo-editor"
              onEditorStateChange={setEditorState}
            />
          </div>
          <div className='col-span-2 px-3 border border-slate-400 auto-scroll'>
            <ul role="list" className="divide-y divide-gray-100">
              {noteList.map((item) => (
                <li className="flex justify-between gap-x-6 py-5">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900 text-left">{item._id}</p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">{item.content}</p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">User 1</p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">Added on <time dateTime={item.createdAt}>3h ago</time></p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <button
            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={saveTheNoteValue}>Save</button>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
