<template>
    <div>
        <h1>CheckOut</h1>
        <table class="table table-dark" v-if="cartTotalLength">
            <thead>
                <tr>
                    <th scope="col">Producto</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Total</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="item in cart.items" v-bind:key="item.product.id">
                    <td>{{ item.product.title }}</td>
                    <td>{{ item.product.precio }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ getItemTotal(item).toFixed(2) }}</td>
                </tr>
            </tbody>

            <tfoot>
                <tr>
                    <td>Total</td>
                    <td>{{ cartTotalLength }}</td>
                    <td>{{ cartTotalPrice.toFixed(2) }}</td>
                </tr>
            </tfoot>
        </table>
        <div class="column is-12 boc">
            <h2 class="subtitle">Detalles</h2>
            <p class="has-text-grey mb-4">Los siguentes campos son requeridos</p>

            <div class="form-group">
                <label for="exampleInputEmail1">Email</label>
                <input type="email" v-model="email" class="form-control" id="exampleInputEmail1"
                    aria-describedby="emailHelp" placeholder="Enter email">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Nombre</label>
                <input type="text" v-model="first_name" class="form-control" id="exampleInputPassword1"
                    placeholder="Nombre">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Lugar de envio</label>
                <input type="text" class="form-control" v-model="place" id="exampleInputPassword1"
                    placeholder="Lugar de envio">
            </div>
            <div class="form-group">
                <div id="card-element"></div>


            </div>

            <div v-if="cartTotalLength">
                <button class="btn btn-primary" @click="enviarPedido">Aceptar</button>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            cart: {
                items: []
            },
            stripe: {},
            card: {},
            first_name: "",
            email: "",
            place: "",
            errors: []


        }
    },
    mounted() {
        this.cart = this.$store.state.cart

        if (this.cartTotalLength > 0) {
            this.stripe = window.Stripe('pk_test_51LTv9ALtI8nMLxIZkeSKeoE4zKCgerBHE0sIiWuyR4HK6QlM2L9W5jEJEr3F8BTSVYPfi3K37755qM0ZBmmym0PQ00ARVZOaXE')
            const elements = this.stripe.elements();
            this.card = elements.create('card', { hidePostalCode: true })
            this.card.mount('#card-element')
        }
    },
    methods: {
        getItemTotal(item) {
            return item.quantity * item.product.precio
        },
        enviarPedido() {
            this.errors = []
            if (!this.errors.length) {
                this.$store.commit('setIsLoading', true)
                this.stripe.createToken(this.card).then(result => {
                    if (result.error) {
                        this.$store.commit('setIsLoading', false)
                        this.errors.push('Something went wrong with Stripe. Please try again')
                        console.log(result.error.message)
                    } else {
                        this.stripeTokenHandler(result.token)
                    }
                }).then(() => {
                    this.$store.commit('ClearCart')

                    this.$router.push('/success')
                })
            }


        },
        async stripeTokenHandler(token) {
            const items = []
            for (let i = 0; i < this.cart.items.length; i++) {
                const item = this.cart.items[i]
                const obj = {
                    product: item.product.id,
                    quantity: item.quantity,
                    price: item.product.precio * item.quantity
                }
                items.push(obj)
            }
            const data = {
                'first_name': this.first_name,
                'email': this.email,
                'place': this.place,
                'items': items,
                'stripe_token': token.id
            }
            await axios.post('https://djangoapiyo.herokuapp.com/cart/checkout/', data)
                .then(() => {
                    this.$store.commit('ClearCart')
                    this.$router.push('/success')
                })
                .catch(error => {
                    this.errors.push('Something went wrong. Please try again')
                    console.log(error)
                })
            this.$store.commit('setIsLoading', false)

        }

    },
    computed: {
        cartTotalLength() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.quantity
            }, 0)
        },
        cartTotalPrice() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.product.precio * curVal.quantity;
            }, 0)
        }
    },
}
</script>