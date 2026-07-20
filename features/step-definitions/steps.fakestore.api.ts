import { Then, When } from "@cucumber/cucumber"
import { expect } from "@playwright/test"
import { deletedProduct, newProduct, updatedProduct } from "../../api/test-data/products"
import { World } from "../config/world"

When<World>("I send a GET request to {string}", async function (url: string) {
    this.response = await this.request.get(url)
})

When<World>("I send a POST request to {string} with the new product payload", async function (url: string) {
    this.response = await this.request.post(url, { data: newProduct })
})

When<World>("I send a PUT request to {string} with the updated product payload", async function (url: string) {
    this.response = await this.request.put(url, { data: updatedProduct })
})

When<World>("I send a PATCH request to {string} with a new price", async function (url: string) {
    this.response = await this.request.patch(url, { data: { price: updatedProduct.price } })
})

When<World>("I send a DELETE request to {string}", async function (url: string) {
    this.response = await this.request.delete(url)
})

Then<World>("the response status should be {int}", async function (statusCode: number) {
    expect(this.response.status()).toBe(statusCode)
})

Then<World>("each product has a valid schema", async function () {
    const products = await this.response.json()
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

Then<World>("the response contains the new product with an id", async function () {
    const product = await this.response.json()
    const { id, ...responseProductWithoutID } = product
    expect(product).toHaveProperty('id')
    expect(product.id).toBeGreaterThan(0)
    expect(responseProductWithoutID).toEqual(newProduct)
})

Then<World>("the response matches the updated product", async function () {
    const product = await this.response.json()
    expect(product).toEqual({
        ...updatedProduct,
        image: expect.stringMatching(/^https:\/\/fakestoreapi\.com\/img\/.+$/)
    })
})

Then<World>("the response contains the patched product id and price", async function () {
    const { id, price } = updatedProduct
    const product = await this.response.json()
    expect(product).toEqual({ id, price })
})

Then<World>("the response matches the deleted product", async function () {
    const product = await this.response.json()
    expect(product).toEqual({
        ...deletedProduct,
        image: expect.stringMatching(/^https:\/\/fakestoreapi\.com\/img\/.+$/)
    })
})
