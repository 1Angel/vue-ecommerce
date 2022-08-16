<template>
    <div class="page-cart">
        <div>
            <title>Carro</title>
        </div>
        <div>
            <table class="table table-dark" v-if="cartTotalLength">
                <thead>
                    <tr>
                        <th scope="col">Producto</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <CartItem v-for="item in cart.items" v-bind:key="item.product.id" v-bind:initialItem="item" v-on:removeFromCart="removeFromCart"/>
                    </tbody>
            </table>
            <p v-else>No tienes produuctos en tu carrito</p>
        </div>
        <div>
            <h2>Total</h2>
            <strong>{{cartTotalPrice.toFixed(2)}}</strong>, {{cartTotalLength}} items

            <hr/>
            <router-link :to="{name: 'checkout'}" class="btn btn-green">Pagar</router-link>
        </div>
    </div>

</template>

<script>
//import axios from 'axios'
import CartItem from '../components/CartItem.vue'

export default {
    components: {
        CartItem,
        
    },
    data() {
        return {
            cart: {
                items: []
            }
        }
    },
    mounted() {
        this.cart = this.$store.state.cart
    },
    computed: {
        cartTotalLength() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.quantity
            }, 0)
        },
        cartTotalPrice(){
            return this.cart.items.reduce((acc, curVal)=>{
                return acc+=curVal.product.precio*curVal.quantity;
            },0)
        }
    },
    methods:{
        removeFromCart(item){
            this.cart.items = this.cart.items.filter(i=>i.product.id !==item.product.id)

        }
    }
}
</script>