import { createSlice } from "@reduxjs/toolkit"

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        items: [],   // [{ id, type }]
        total: 0,
    },
    reducers: {
        toggleWishlist: (state, action) => {
            const { id, type } = action.payload
            const existingIndex = state.items.findIndex(item => item.id === id && item.type === type)
            if (existingIndex >= 0) {
                state.items.splice(existingIndex, 1)
            } else {
                state.items.push({ id, type })
            }
            state.total = state.items.length
        },
        clearWishlist: (state) => {
            state.items = []
            state.total = 0
        }
    }
})

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer
