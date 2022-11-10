Feature: Transfer To Bank

    This feature creates order details for customer and Business Admin 


# Author: Sudheer Baraker
# Last Updated:
# Comments 
# Test Case_ID : TC_130_Business admin 
# 

Scenario: To verify that Business admin is able to transfer wallet to bank
Given Login into Mobiquity Portal as Business admin User3
When Navigate to Transfer to Bank
And Enter all the information for Bank to Wallet transfer
Then Click on Transfer Button

