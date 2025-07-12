import {create} from 'zustand'
import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL;


export const useCartStore = create((set,get)=>({
    cart:[],
    fetchCart: async(uid)=>{
        const res = await axios.get(`${baseURL}/api/cart/${uid}`);
        set({cart:res.data})
    },

    addToCart : async({uid,productId,quantity,size})=>{
        const res = await axios.post(`${baseURL}/api/cart/add`,{uid,productId,quantity,size});
        set({cart:res.data.cart});
    },

    removeFromcart : async({uid,productId,size})=>{
        const res = await axios.delete(`${baseURL}/api/cart/remove`,{data:{uid,productId,size}});
        set({cart:res.data.cart})
    },

    updateCartItem : async({uid,productId,size,quantity})=>{
        const res = await axios.put(`${baseURL}/api/cart/update`,{uid,productId,size,quantity});
        set({cart:res.data.cart})

    },
    getSubtotal: () => {
        const cart = get().cart;
        return cart.reduce((sum, item) => sum + item.quantity * item.productId.price, 0);
    },

        clearCart: async(uid)=>{
        try {
            const res = await axios.delete(`${baseURL}/api/cart/clear`,{data:{uid}});
            set({cart:[]})
        } catch (error) {
            console.error('Error clearing cart:', error);
            set({cart:[]})
        }
    },


}))