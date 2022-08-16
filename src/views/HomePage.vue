<template>
  <div>
    <div class="column" v-for="product in productos" :key="product.id">
      <router-link :to="{ name: 'details', params: { id: product.id } }">
        <div class="card">
          <img :src="product.imagen" class="card-img-top" alt="..." width="200" height="300" />
          <h3>{{ product.title }}</h3>
          <p>{{ product.description }}</p>
          <p>{{ product.precio }}</p>
        </div>
      </router-link>
    </div>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      productos: ''
    }
  },
  methods: {
    getproductos() {
      axios.get('https://djangoapiyo.herokuapp.com/productos/list/').then(response => this.productos = response.data)
    }
  },
  mounted() {
    this.getproductos();
  },
}
</script>


<style>
* {
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
}

/* Float four columns side by side */
.column {
  float: left;
  width: 25%;
  padding: 0 10px;
}

/* Remove extra left and right margins, due to padding */
.row {
  margin: 0 -5px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Responsive columns */
@media screen and (max-width: 600px) {
  .column {
    width: 100%;
    display: block;
    margin-bottom: 20px;
  }
}

/* Style the counter cards */
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 16px;
  text-align: center;
  background-color: #f1f1f1;
}
</style>