<template>
<tr>
    <td><router-link :to="item.product">{{item.product.title}}</router-link></td>
    <td>${{item.product.precio}}</td>
    <td>
        {{item.quantity}}
        <a @click="decrementQuantity(item)">-</a>
        <a @click="incrementQuantity(item)">+</a>
    </td>
    <td>${{getItemTotal(item).toFixed(2)}}</td>
    <td><button @click="removeFromCart(item)">Borrar</button></td>
</tr>
</template>

<script>
export default{
    name: 'CartItem',
    props:{
        initialItem:Object
    },
    data() {
        return {
            item: this.initialItem
        }
    },
    methods:{
        getItemTotal(item){
            return item.quantity * item.product.precio
        },
        decrementQuantity(item){
             item.quantity-=1

            if(item.quantity===0){
                this.$emit('removeFromCart', item)
            }
            this.updateCart()
        },
        incrementQuantity(item){
            item.quantity+=1

            this.updateCart();
        },
        updateCart(){
            localStorage.setItem('cart', JSON.stringify(this.$store.state.cart))
        },
        removeFromCart(item){
            this.$emit("removeFromCart", item)
            this.updateCart()
        }
    }
}
</script>