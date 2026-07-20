@apiTests
Feature: Fake Store API

  @getProducts
  Scenario: Get all products and validate response
    When I send a GET request to "https://fakestoreapi.com/products"
    Then the response status should be 200
    And each product has a valid schema

  @postProduct
  Scenario: Create new product and validate response
    When I send a POST request to "https://fakestoreapi.com/products" with the new product payload
    Then the response status should be 201
    And the response contains the new product with an id

  @putProduct
  Scenario: Update a product and validate response
    When I send a PUT request to "https://fakestoreapi.com/products/8" with the updated product payload
    Then the response status should be 200
    And the response matches the updated product

  @patchProduct
  Scenario: Update product property and validate response
    When I send a PATCH request to "https://fakestoreapi.com/products/8" with a new price
    Then the response status should be 200
    And the response contains the patched product id and price

  @deleteProduct
  Scenario: Delete a product and validate response
    When I send a DELETE request to "https://fakestoreapi.com/products/9"
    Then the response status should be 200
    And the response matches the deleted product