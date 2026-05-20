
Feature: :Ecommerce validation
@Validation

 Scenario Outline: Placing the Order
 Given a login to loginPractice application with "<username>" and "<password>"
 Then Verify error message is displayed

 Examples:
     | username  | password  | 
     | RY@gmail.com   | Password123   | 
     | hello@123l.com | Password   | 
     
 