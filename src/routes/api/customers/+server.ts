import { PrismaClient } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const GET: RequestHandler = async () => {
    try {
        const customers = await prisma.customer.findMany({
            include: {
                orders: {
                    include: {
                        orderItems: {  // Usando el nombre correcto de la relación
                            include: {
                                product: true  // Incluye detalles del producto
                            }
                        }
                    }
                }
            }
        });

        const customersWithTotal = customers.map(customer => {
            const totalSpent = customer.orders.reduce((total, order) => {
                const orderTotal = order.orderItems.reduce((orderSum, item) => {
                    return orderSum + (item.quantity * item.product.price);  // Asegúrate de que 'price' es un campo en tu modelo de 'Product'
                }, 0);
                return total + orderTotal;
            }, 0);

            return {
                ...customer,
                totalSpent
            };
        });

        return new Response(JSON.stringify(customersWithTotal), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error fetching customers:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch customers', details: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};
