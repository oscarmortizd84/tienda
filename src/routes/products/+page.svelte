<script>
  import { onMount } from 'svelte';
  let categories = [];
  let products = [];
  let selectedCategoryId = '';

  onMount(async () => {
      const catResponse = await fetch('/api/categories');
      if (catResponse.ok) {
          categories = await catResponse.json();
      }

      await fetchProducts();
  });

  async function fetchProducts() {
      const prodResponse = await fetch(`/api/products${selectedCategoryId ? '?categoryId=' + selectedCategoryId : ''}`);
      if (prodResponse.ok) {
          products = await prodResponse.json();
      } else {
          console.error('Failed to load products');
      }
  }

  function handleCategoryChange() {
      fetchProducts();
  }
</script>
<br>
<select bind:value={selectedCategoryId} on:change={handleCategoryChange} class="mb-4 p-2 bg-white border border-gray-300 rounded">
  <option value="">Seleccione una categoría</option>
  {#each categories as category}
      <option value={category.id}>{category.name}</option>
  {/each}
</select>

<h1 class="text-xl font-bold mb-4 p-10">Lista de Productos</h1>
<table class="min-w-full divide-y divide-gray-200 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
  <thead class="bg-gray-50">
    <tr>
      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Nombre
      </th>
      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Descripción
      </th>
      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Precio
      </th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y divide-gray-200">
    {#each products as product}
    <tr>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {product.name}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {product.description}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        ${product.price}
      </td>
    </tr>
    {/each}
  </tbody>
</table>
