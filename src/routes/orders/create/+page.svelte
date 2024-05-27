<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let customers = [];
    let products = [];
    let selectedCustomerId;
    let selectedProductId;
    let quantity = 1;
    let orderItems = [];
    let customerSelected = false;

    onMount(async () => {
        const [customerRes, productRes] = await Promise.all([
            fetch('/api/customers'),
            fetch('/api/products')
        ]);
        customers = await customerRes.json();
        products = await productRes.json();
    });

    function addToOrder() {
        if (!customerSelected && selectedCustomerId) {
            customerSelected = true; // Lock customer selection after first product is added
        }
        const product = products.find(p => p.id === selectedProductId);
        orderItems = [...orderItems, { product, quantity }];
        selectedProductId = null; // Reset selected product
        quantity = 1; // Reset quantity to default
    }

    async function createOrder() {
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ customerId: selectedCustomerId, items: orderItems.map(item => ({ productId: item.product.id, quantity: item.quantity })) })
        });

        if (response.ok) {
            goto('/orders');
        } else {
            alert('Error al guardar el pedido');
        }
    }
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <h1 class="text-lg font-bold mb-4">Crear Pedido</h1>
        <div>
            <label class="block text-gray-700 text-sm font-bold mb-2">Cliente</label>
            <select bind:value={selectedCustomerId} disabled={customerSelected} class="block w-full p-2 border border-gray-300 rounded">
                <option value="" disabled selected>Seleccione un cliente</option>
                {#each customers as customer}
                    <option value={customer.id}>{customer.name}</option>
                {/each}
            </select>
        </div>
        
        <div class="mt-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Producto</label>
            <select bind:value={selectedProductId} class="block w-full p-2 border border-gray-300 rounded">
                <option value="" disabled selected>Seleccione un producto</option>
                {#each products as product}
                    <option value={product.id}>{product.name}</option>
                {/each}
            </select>
        </div>

        <div class="mt-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Cantidad</label>
            <input type="number" min="1" bind:value={quantity} class="block w-full p-2 border border-gray-300 rounded"/>
        </div>

        <div class="mt-4">
            <button type="button" on:click={addToOrder} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Agregar al pedido
            </button>
        </div>

        {#if orderItems.length > 0}
            <ul class="mt-4 list-disc list-inside">
                {#each orderItems as item, index}
                    <li>{item.product.name} - Cantidad: {item.quantity}</li>
                {/each}
            </ul>
        {/if}

        <div class="mt-4">
            <button type="submit" on:click={createOrder} class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Crear Pedido
            </button>
        </div>
    </div>
</div>
