<!-- src/routes/__layout.svelte -->
<script>
import "../app.css";
  import { goto } from '$app/navigation';
</script>

<nav class="bg-gray-800 text-white p-4">
  <ul class="flex space-x-4">
    <li><a href="/products/create" class="hover:text-gray-300" on:click|preventDefault={() => goto('/products/create')}>Nuevo Producto</a></li>
    <li><a href="/orders/create" class="hover:text-gray-300" on:click|preventDefault={() => goto('/orders/create')}>Nuevo Pedido</a></li>
    <li><a href="/products" class="hover:text-gray-300" on:click|preventDefault={() => goto('/products')}>Productos</a></li>
    <li><a href="/customers" class="hover:text-gray-300" on:click|preventDefault={() => goto('/customers')}>Clientes</a></li>
    <li><a href="/orders" class="hover:text-gray-300" on:click|preventDefault={() => goto('/orders')}>Pedidos</a></li>
  </ul>
</nav>

<slot></slot> 




