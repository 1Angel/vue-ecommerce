<template>
    <v-app>
        <v-app-bar app color="#546E7A" dark>
            <v-toolbar-title to="/">
                Tienda
            </v-toolbar-title>
            <v-btn text rounded to="/admin" v-if="!!loggedIn">
                Admin
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn v-if="!!loggedIn" text rounded to="/profile">
                Perfil
            </v-btn>
            <v-btn text rounded to="/">
                Home
            </v-btn>
            <v-btn v-if="!loggedIn" text rounded to="/login">
                Login
            </v-btn>
            <v-btn v-if="!loggedIn" text rounded to="/register">
                Register
            </v-btn>
            <v-btn v-else text rounded @click="logout">Logout</v-btn>
            <v-btn text rounded to="/cart">
                Carro {{ cartTotalLength }}
            </v-btn>
        </v-app-bar>
        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>


</template>

<script>

import { authComputed } from './store/helpers'
export default {
    components: {


    },
    data() {
        return {
            cart: {
                items: []
            }
        }
    },
    beforeCreate() {
        this.$store.commit('carroinitial')
    },
    mounted() {
        this.cart = this.$store.state.cart
    },
    computed: {
        cartTotalLength() {
            let totalLength = 0

            for (let i = 0; i < this.cart.items.length; i++) {
                totalLength += this.cart.items[0].quantity
            }
            return totalLength
        },
        ...authComputed


    },
    methods: {
        logout() {
            this.$store.dispatch('logout');
        }
    }

}

</script>