import { expect, test } from '@playwright/test';
import { deletedProduct, newProduct, updatedProduct } from '../test-data/products';

test.describe('Fake Store API Tests', { tag: `@apiTests` }, () => {

    test('Get all products and validate response', async ({ request }) => {
        const response = await request.get('https://fakestoreapi.com/products')
        expect(response.status()).toBe(200)
        const products = await response.json()
        products.forEach((product: any) => {
            expect(product).toHaveProperty('id')
            expect(product).toHaveProperty('title')
            expect(product).toHaveProperty('price')
            expect(product).toHaveProperty('description')
            expect(product).toHaveProperty('category')
            expect(product).toHaveProperty('image')
            expect(product).toHaveProperty('rating')
            expect(product.rating).toHaveProperty('rate')
            expect(product.rating).toHaveProperty('count')
            expect(product.rating.rate).toBeGreaterThanOrEqual(0)
            expect(product.rating.rate).toBeLessThanOrEqual(5)
            expect(product.rating.count).toBeGreaterThanOrEqual(0)
        })
    })

    test('Create new product and validate response @postTest', async ({ request }) => {
        const response = await request.post('https://fakestoreapi.com/products', {
            data: newProduct
        })
        expect(response.status()).toBe(201)
        const product = await response.json()
        const { id, ...responseProductWithoutID } = product
        expect(product).toHaveProperty('id')
        expect(product.id).toBeGreaterThan(0)
        expect(responseProductWithoutID).toEqual(newProduct)
    })

    test('Update a product and validate response @putTest', async ({ request }) => {
        const putResponse = await request.put('https://fakestoreapi.com/products/8', {
            data: updatedProduct
        })
        expect(putResponse.status()).toBe(200)
        const updatedProductResponse = await putResponse.json()
        expect(updatedProductResponse).toEqual({
            ...updatedProduct,
            image: expect.stringMatching(/^https:\/\/fakestoreapi\.com\/img\/.+$/)
        })
    })

    test('Update product property and validate response @patchTest', async ({ request }) => {
        const { id, price } = updatedProduct
        const expectedPatchResponse = { id, price }
        const patchResponse = await request.patch('https://fakestoreapi.com/products/8', {
            data: {
                price: updatedProduct.price
            }
        })
        expect(patchResponse.status()).toBe(200)
        const updatedProductResponse = await patchResponse.json()
        expect(updatedProductResponse).toEqual(expectedPatchResponse)
    })

    test('Delete a product and validate response @deleteTest', async ({ request }) => {
        const deleteResponse = await request.delete('https://fakestoreapi.com/products/9')
        expect(deleteResponse.status()).toBe(200)
        const deletedProductResponse = await deleteResponse.json()
        expect(deletedProductResponse).toEqual({
            ...deletedProduct,
            image: expect.stringMatching(/^https:\/\/fakestoreapi\.com\/img\/.+$/)
        })
    })
})