import toast from 'react-hot-toast'
import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit'
import api from '../api'
import { formateResponse } from "../utils";

export const createNote = createAsyncThunk('notesReducer/createNote', async (payload = {}) => {
    return new Promise((resolve) => {
        api.notes.create(payload)
            .then((response) => formateResponse(response, 'Failed to Create the note, Please try after sometimes'))
            .then((data) => {
                if (data.message) toast.success(data.message);
                resolve({
                    data: data || null,
                });
            }).catch(() => {
                toast.error('Failed to Create the note, Please try after sometimes.');
                resolve({ data: null })
            })
    })
}
)

export const getAllNotes = createAsyncThunk('notesReducer/getAllNotes', async (payload = {}) => {
    return new Promise((resolve) => {
        api.notes.getAll(payload)
            .then((response) => formateResponse(response, 'Failed to get all notes, Please try after sometimes.'))
            .then((data) => {
                resolve({
                    data: data || null,
                });
            }).catch(() => {
                toast.error('Failed to get all notes, Please try after sometimes.');
                resolve({ data: null })
            })
    })
}
)

export const getNoteById = createAsyncThunk('notesReducer/getNoteById', async (payload = {}) => {
    return new Promise((resolve) => {
        api.notes.get(payload)
            .then((response) => formateResponse(response, 'Failed to get the note info, Please try after sometimes.'))
            .then((data) => {
                resolve({
                    data: data || null,
                });
            }).catch(() => {
                toast.error('Failed to get the note info, Please try after sometimes.');
                resolve({ data: null })
            })
    })
}
)

export const updateNoteById = createAsyncThunk('notesReducer/updateNoteById', async (payload = {}) => {
    return new Promise((resolve) => {
        api.notes.post(payload)
            .then((response) => formateResponse(response, 'Failed to Update the note, Please try after sometimes.'))
            .then((data) => {
                console.log('**data', data)
                resolve({
                    data: data || null,
                });
            }).catch(() => {
                toast.error('Failed to Update the note, Please try after sometimes.');
                resolve({ data: null })
            })
    })
}
)

export const deleteNoteById = createAsyncThunk('notesReducer/deleteNoteById', async (payload = {}) => {
    return new Promise((resolve) => {
        api.notes.delete(payload)
            .then((response) => formateResponse(response, 'Failed to Delete the note, Please try after sometimes.'))
            .then((data) => {
                console.log('**data', data)
                resolve({
                    data: data || null,
                });
            }).catch(() => {
                toast.error('Failed to Delete the note, Please try after sometimes.');
                resolve({ data: null })
            })
    })
}
)

export const notesReducerInitialState = {
    noteList: [],
    noteInfo: null,
    isError: false,
    isLoading: false,
}

const notesReducer = createSlice({
    name: 'notesReducer',
    initialState: notesReducerInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllNotes.fulfilled, (state, action) => {
            state.noteList = action.payload?.data?.data || [];
            state.noteInfo = null;
            state.isLoading = false;
        });
        builder.addCase(getNoteById.fulfilled, (state, action) => {
            state.noteInfo = action.payload.data;
            state.isLoading = false;
        });
        builder.addMatcher(isAnyOf(getAllNotes.pending, getNoteById.pending, createNote.pending, updateNoteById.pending, deleteNoteById.pending), (state) => {
            state.isLoading = true;
        });
        builder.addMatcher(isAnyOf(getAllNotes.rejected, getNoteById.rejected, createNote.rejected, updateNoteById.rejected, deleteNoteById.rejected), (state) => {
            state.isLoading = false;
        });
        builder.addMatcher(isAnyOf(createNote.fulfilled, updateNoteById.fulfilled, deleteNoteById.fulfilled), (state) => {
            state.noteInfo = null;
            state.isLoading = false;
        });
    },
})

export default notesReducer.reducer
