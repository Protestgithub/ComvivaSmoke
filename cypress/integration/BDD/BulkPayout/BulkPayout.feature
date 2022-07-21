Feature: Bulk Payout


# Author: Arpitha C
# Last Updated:27/06/2022
# Comments 
# Test Case_ID :88 
# 
@test

Scenario:To verify that system should generate unique Batch Id on every transaction/service performed through Bulk payout tool.


Given Login into Mobiquity Portal as System admin Maker
When Navigate to Operator to channel and click on O2C transfer initiate
And Enter All the Mandatory Details
Then Click on submit and Confirm2
And logout the user

Given Login into Mobiquity Portal as System admin Checker1
When Navigate to Operator to channel and click on O2C transfer Approval1
And logout the user
Given Login into Mobiquity Portal as System admin Checker2
When Navigate to Operator to channel and click on O2C transfer Approval2
And logout the user

Given Login into Mobiquity Portal as System admin Maker
When Click on BulkPayout tool
And Click on Bulk Payout Initiate
Then update the json data
And Upload the data
Then Logout

   

# Author: Arpitha C
# Last Updated: 27/06/2022
# Comments 
# Test Case_ID : 89
# 

@test

Scenario:To verify that system should be able to perform the commission disbursement through Bulk payout tool.
Given Login into Mobiquity Portal as System admin Checker1
When Click on BulkPayout tool
And Click on Bulk Payout Approval link.
And Select initiated service.
And Click on Approve button.
And Click on BulkPayout tool
And Click on Bulk Payout Dashboard
And Click on number of entries
Then Verify Batch Id
Then Verify success


