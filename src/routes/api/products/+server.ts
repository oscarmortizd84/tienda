import { PrismaClient } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

const prisma = new PrismaClient();

// Handler para solicitudes POST
export const POST: RequestHandler = async ({ request }) => {
    try {
        const data = await request.json();
        console.log('Datos recibidos:', data); // Log de los datos recibidos

        if (!data.name || !data.description || data.price === undefined || !data.categoryId) {
            console.error('Datos faltantes:', data); // Log si faltan datos
            return new Response(JSON.stringify({ error: 'Faltan datos necesarios.' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        const product = await prisma.product.create({
            data: {
                name: data.name,
                description: data.description,
                price: parseFloat(data.price),
                category: {
                    connect: { id: data.categoryId } // Conectar el producto a la categoría existente
                }
            }
        });

        console.log('Producto creado:', product); // Log del producto creado
        return new Response(JSON.stringify({ product }), {
            status: 201,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error al crear producto:', error); // Log del error
        return new Response(JSON.stringify({ error: 'Error al procesar la solicitud.', details: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};


// Handler para solicitudes GET
export const GET: RequestHandler = async ({ url }) => {
    const categoryId = url.searchParams.get('categoryId');
    
    try {
        const products = await prisma.product.findMany({
            where: {
                categoryId: categoryId ? parseInt(categoryId) : undefined
            },
            include: {
                category: true
            }
        });
        return new Response(JSON.stringify(products), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch products' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};