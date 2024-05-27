import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


async function main() {


    // Crear categorías
    const categories = await prisma.category.createMany({
      data: [
        { name: "Frutas" },
        { name: "Verduras" },
        { name: "Granos" },
        { name: "Hierbas" },
        { name: "Carnes" }
      ]
    });
  
    // Crear productos
    const products = await prisma.product.createMany({
      data: [
        { name: "Aguacate", description: "Aguacate Hass fresco", price: 5000, categoryId: 1 },
        { name: "Guayaba", description: "Guayabas rojas", price: 20000, categoryId: 1 },
        { name: "Zanahoria", description: "Zanahorias orgánicas", price: 2000, categoryId: 2 },
        { name: "Frijol", description: "Frijol cascaras", price: 5000, categoryId: 3 },
        { name: "Pollo", description: "Pollo fresco", price: 3000, categoryId: 5 }
      ]
    });
  
    // Crear clientes
    const customers = await prisma.customer.createMany({
      data: [
        { name: "Juan Pérez", email: "juan@example.com" },
        { name: "Ana Gómez", email: "ana@example.com" }
      ]
    });
  
    // Crear pedidos
    const orders = await prisma.order.createMany({
      data: [
        { customerId: 1, date: new Date() },
        { customerId: 2, date: new Date() }
      ]
    });
  
    // Crear relación OrderProduct
    const orderProducts = await prisma.orderProduct.createMany({
      data: [
        { orderId: 1, productId: 1, quantity: 2 },
        { orderId: 1, productId: 3, quantity: 5 },
        { orderId: 2, productId: 2, quantity: 3 },
        { orderId: 2, productId: 5, quantity: 1 }
      ]
    });
  
    // Crear proveedores
    const suppliers = await prisma.supplier.createMany({
      data: [
        { name: "Verduras del Libano" },
        { name: "Carnes y Más" }
      ]
    });
  
    // Crear relación ProductSupplier
    const productSuppliers = await prisma.productSupplier.createMany({
      data: [
        { productId: 1, supplierId: 1 },
        { productId: 2, supplierId: 1 },
        { productId: 3, supplierId: 2 },
        { productId: 4, supplierId: 2 },
        { productId: 5, supplierId: 2 }
      ]
    });
  }
  
  main()
    .catch(e => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  