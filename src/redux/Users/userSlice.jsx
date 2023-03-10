import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

export const userAdapter = createEntityAdapter();

export const userSelector = userAdapter.getSelectors((user) => state.user);

export const getLoggedUserData = createAsyncThunk("users/getUser", async (id) => {
    const res = await axios.post("https://contact-backend-dk27.onrender.com/users/getUser", { id });
    return res.data;
})



const userSlice = createSlice({
    name: "user",
    initialState: {
        status: "idle",
        logged: false,
        loggedUser: {},
        modalVisibility: false,
        editMode: false,
        editValues: {},
        confirmModalVisibility: false,
        confirmModalType: "",
        groupModalVisibility: false,
        groupEditMode: false,
        groupEditValues: {},
        memberListModal: false,
        memberListValues: [],
    },
    reducers: {
        setLogged: (state, action) => {
            state.logged = action.payload;
        },
        setLoggedUser: (state, action) => {
            state.loggedUser = action.payload;
        },
        setModalVisibility: (state, action) => {
            state.modalVisibility = action.payload;
        },
        setEditMode: (state, action) => {
            state.editMode = action.payload;
        },
        setEditValues: (state, action) => {
            state.editValues = action.payload;
        },
        setConfirmModalVisibility: (state, action) => {
            state.confirmModalVisibility = action.payload;
        },
        setConfirmModalType: (state, action) => {
            state.confirmModalType = action.payload;
        },
        setGroupModalVisibility: (state, action) => {
            state.groupModalVisibility = action.payload;
        },
        setGroupEditMode: (state, action) => {
            state.groupEditMode = action.payload;
        },
        setGroupEditValues: (state, action) => {
            state.groupEditValues = action.payload;
        },
        setMemberListModal: (state, action) => {
            state.memberListModal = action.payload;
        },
        setMemberListValues: (state, action) => {
            state.memberListValues = action.payload;
        },
        setDataStatus: (state, action) => {
            state.status = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getLoggedUserData.pending, (state, action) => {
            state.status = "pending";
        }),
            builder.addCase(getLoggedUserData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.loggedUser = action.payload;
            })
    }
});



export default userSlice.reducer;

export const {
    setLogged,
    setLoggedUser,
    setModalVisibility,
    setEditMode,
    setEditValues,
    setConfirmModalVisibility,
    setConfirmModalType,
    setGroupModalVisibility,
    setGroupEditMode,
    setGroupEditValues,
    setMemberListModal,
    setMemberListValues,
    setDataStatus } = userSlice.actions;