import { PrismaClient } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

const prisma = new PrismaClient();

// Handler para solicitudes POST
export const POST: RequestHandler = async ({ request }) => {
    try {
        const { customerId, items } = await request.json();
        console.log('Datos recibidos:', { customerId, items });

        // Consolidar items
        const consolidatedItems = consolidateOrderItems(items);

        const order = await prisma.order.create({
            data: {
                customerId,
                orderItems: {
                    create: consolidatedItems.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity
                    }))
                }
            },
            include: {
                orderItems: true
            }
        });

        console.log('Pedido creado:', order);
        return new Response(JSON.stringify(order), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error al crear pedido:', error);
        return new Response(JSON.stringify({ error: 'Error al procesar la solicitud', details: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};




// Handler para solicitudes GET
export const GET: RequestHandler = async () => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                customer: true, // Asume que quieres ver los datos del cliente
                orderItems: {
                    include: {
                        product: true // Incluye los detalles del producto
                    }
                }
            }
        });
        return new Response(JSON.stringify(orders), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error al obtener pedidos:', error);
        return new Response(JSON.stringify({ error: 'Error al obtener los pedidos' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};


function consolidateOrderItems(items) {
    const itemMap = new Map();
    items.forEach(item => {
        if (itemMap.has(item.productId)) {
            const existingItem = itemMap.get(item.productId);
            existingItem.quantity += item.quantity;
        } else {
            itemMap.set(item.productId, { ...item });
        }
    });
    return Array.from(itemMap.values());
}