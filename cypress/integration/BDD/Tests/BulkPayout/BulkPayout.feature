Feature: Bulk Payout

        Bulk initiate of Operator to Channel transfer

# Author: Arpitha C
# Last Updated:27/06/2022
# Comments 
# Test Case_ID :88 
# 
@test

Scenario:To verify that system admin is able to perform o2c transaction.

Given Login into Mobiquity Portal as System admin Maker
When Navigate to Operator to channel and click on O2C transfer initiate
And Enter All the Mandatory Details
Then Click on submit and Confirm2
And logout the user

Scenario:To verify that system is able to approve

Given Login into Mobiquity Portal as System admin Checker1
When Navigate to Operator to channel and click on O2C transfer Approval1


Scenario:To verify that system is able to initiate the Bulk Payout

Given Login into Mobiquity Portal as System admin Maker
When Click on BulkPayout tool
And Click on Bulk Payout Initiate
And Select service from dropdown list
And Download a blank .csv file from Download a File template link
And Enter Common Remarks
Then update the json data
And Upload a .csv file with valid details

   

# Author: Arpitha C
# Last Updated: 27/06/2022
# Comments 
# Test Case_ID : 89
# 

@test

Scenario:To verify that system should be able to approve the initiated Bulk Payout.
Given Login into Mobiquity Portal as System admin Checker1
When Click on BulkPayout tool
And Click on Bulk Payout Approval link.
And Select initiated service.
And Click on Approve button.
And Click on BulkPayout tool
And Click on Bulk Payout Dashboard
And Click on number of entries
Then Verify Batch Id
#Then Verify success


