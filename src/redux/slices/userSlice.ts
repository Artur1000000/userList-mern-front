import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { IInitialState, IUserData } from "../../types";


const initialState: IInitialState = {
    data: [],
    status: "",
    isLoading: false
}


export const getUsers = createAsyncThunk("users/getUsers", async () => {
    try {
        const { data } = await axios.get("/users");
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const blockUsers = createAsyncThunk("users/blockUsers", async (ids: string[]) => {
    try {
        const { data } = await axios.patch("/block-users", { ids });
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const unblockUsers = createAsyncThunk("users/unblockUsers", async (ids: string[]) => {
    try {
        const { data } = await axios.patch("/unblock-users", { ids });
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const deleteUsers = createAsyncThunk("users/deleteUsers", async (ids: string[]) => {
    try {
        const { data } = await axios.put("/delete-users", { ids });
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        check: (state, action) => {
            for (let element of state.data) {
                if (element.id === action.payload) {
                    element.cheked = !element.cheked;
                    break;
                }
            }
        },
        checkAllOn: (state) => {
            for (let element of state.data) {
                element.cheked = true;
            }
        },
        checkAllOff: (state) => {
            for (let element of state.data) {
                element.cheked = false;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state: IInitialState) => {
                state.isLoading = true;
                state.status = "loading";
            })
            .addCase(getUsers.fulfilled, (state, action: PayloadAction<IUserData[]>) => {
                state.isLoading = false;
                state.status = "resolved";
                state.data = action.payload.map((i) => { return { cheked: false, ...i } });
            })
            .addCase(getUsers.rejected, (state) => {
                state.isLoading = false;
                state.status = "rejected";
            })
            .addCase(blockUsers.pending, (state: IInitialState) => {
                state.isLoading = true;
                state.status = "loading";
            })
            .addCase(blockUsers.fulfilled, (state, action: PayloadAction<IUserData[]>) => {
                state.isLoading = false;
                state.status = "resolved";
                state.data = action.payload.map((i) => { return { cheked: false, ...i } });
            })
            .addCase(blockUsers.rejected, (state) => {
                state.isLoading = false;
                state.status = "rejected";
            })
            .addCase(unblockUsers.pending, (state: IInitialState) => {
                state.isLoading = true;
                state.status = "loading";
            })
            .addCase(unblockUsers.fulfilled, (state, action: PayloadAction<IUserData[]>) => {
                state.isLoading = false;
                state.status = "resolved";
                state.data = action.payload.map((i) => { return { cheked: false, ...i } });
            })
            .addCase(unblockUsers.rejected, (state) => {
                state.isLoading = false;
                state.status = "rejected";
            })
            .addCase(deleteUsers.pending, (state: IInitialState) => {
                state.isLoading = true;
                state.status = "loading";
            })
            .addCase(deleteUsers.fulfilled, (state, action: PayloadAction<IUserData[]>) => {
                state.isLoading = false;
                state.status = "resolved";
                state.data = action.payload.map((i) => { return { cheked: false, ...i } });
            })
            .addCase(deleteUsers.rejected, (state) => {
                state.isLoading = false;
                state.status = "rejected";
            })
    }
})

export const { check, checkAllOn, checkAllOff } = userSlice.actions

export default userSlice.reducer;