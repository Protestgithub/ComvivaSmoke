Feature: Operator to Channel for Channel User


        Bulk initiate of Operator to Channel transfer

# Author: Arpitha C
# Last Updated:27/06/2022
# Comments 
# Test Case_ID :88 
# 
@test

Scenario:To verify that system should generate unique Batch Id on every transaction/service performed through Bulk payout tool.

Given Login into Mobiquity Portal as System admin Maker
When Navigate to Operator to channel and click on O2C transfer initiate
And Enter All the Mandatory Details for bulkpayout of business user
Then Click on submit and Confirm2 for bulk
And logout the user




Scenario:To verify that system is able to approve

Given Login into Mobiquity Portal as System admin Checker1
When Navigate to Operator to channel and click on O2C transfer Approval1
And logout the user