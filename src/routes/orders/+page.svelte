<script>
    import { onMount } from 'svelte';

    let orders = [];

    onMount(async () => {
        const response = await fetch('/api/orders');
        if (response.ok) {
            orders = await response.json();
        } else {
            console.error('Failed to fetch orders');
        }
    });
</script>

<h1 class="text-xl font-bold mb-4 p-10">Listado de Pedidos</h1>
<table class="min-w-full divide-y divide-gray-200 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
  <thead class="bg-gray-50">
    <tr>
      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Pedido ID
      </th>
      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Cliente
      </th>
      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Detalles del Pedido
      </th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y divide-gray-200">
    {#each orders as order}
    <tr>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {order.id}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {order.customer.name}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <ul>
          {#each order.orderItems as item}
            <li>{item.product.name} - Cantidad: {item.quantity}</li>
          {/each}
        </ul>
      </td>
    </tr>
    {/each}
  </tbody>
</table>
