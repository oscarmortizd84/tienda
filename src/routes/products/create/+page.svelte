<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let categories = [];
    let selectedCategoryId = '';
    let name = '';
    let description = '';
    let price = 0;
    let isSubmitting = false;
    let errorMessage = '';

    onMount(async () => {
        const res = await fetch('/api/categories');
        if (res.ok) {
            categories = await res.json();
        } else {
            console.error('Failed to load categories');
        }
    });

    async function handleSubmit(event) {
        event.preventDefault();
        isSubmitting = true;
        errorMessage = '';
        const product = { name, description, price, categoryId: selectedCategoryId };

        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        isSubmitting = false;
        if (response.ok) {
            goto('/products'); // Redirigir a la lista de productos después de la creación
        } else {
            errorMessage = 'Error al guardar el producto. Intente de nuevo.';
        }
    }
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
    <form class="space-y-6 w-full max-w-lg p-8 bg-white shadow-md rounded-lg" on:submit={handleSubmit}>
        <!-- Mensaje de error -->
        {#if errorMessage}
            <div class="p-3 bg-red-200 text-red-800 rounded">
                {errorMessage}
            </div>
        {/if}

        <!-- Campo de selección de categoría -->
        <div>
            <label for="category" class="block text-sm font-medium text-gray-700">Categoría</label>
            <select id="category" bind:value={selectedCategoryId} class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option disabled value=''>Seleccione una categoría</option>
                {#each categories as category}
                    <option value={category.id}>{category.name}</option>
                {/each}
            </select>
        </div>
        <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Nombre del producto</label>
            <input type="text" id="name" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" bind:value={name} required>
        </div>
        <div>
            <label for="description" class="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea id="description" rows="4" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" bind:value={description} required></textarea>
        </div>
        <div>
            <label for="price" class="block text-sm font-medium text-gray-700">Precio</label>
            <input type="number" id="price" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" bind:value={price} required min="0" step="0.01">
        </div>
        <div>
            <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none" disabled={isSubmitting}>
                {isSubmitting ? 'Guardando...' : 'Crear Producto'}
            </button>
        </div>
    </form>
</div>
