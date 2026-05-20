Feature:Ecommerce validation
    @Regression
    Scenario: Placing the Order
        Given a login to Ecommerce application with "RY@gmail.com" and "Password123"
        When Add "iphone 13 pro" to cart
        Then verify "iphone 13 pro" is display in to the cart
        When Enter vaild details and place the Order
        Then verify the order is present in the OrderHistory



    @Validation

    Scenario Outline: Placing the Order
        Given a login to loginPractice application with "<username>" and "<password>"
        Then Verify error message is displayed

        Examples:
            | username       | password    |
            | RY@gmail.com   | Password123 |
            | hello@123l.com | Password    |

