<script>
    import { onMount } from 'svelte';
    let customers = [];

    onMount(async () => {
        const response = await fetch('/api/customers');
        if (response.ok) {
            customers = await response.json();
        } else {
            console.error('Failed to load customers');
        }
    });
</script>

<h1 class="text-xl font-bold mb-4 p-10">Lista de Clientes</h1>
<table class="min-w-full divide-y divide-gray-200 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
  <thead class="bg-gray-50">
    <tr>
      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Nombre
      </th>
      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Email
      </th>
      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Total Gastado
      </th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y divide-gray-200">
    {#each customers as customer}
    <tr>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {customer.name}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {customer.email}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        ${customer.totalSpent.toFixed(2)}
      </td>
    </tr>
    {/each}
  </tbody>
</table>
