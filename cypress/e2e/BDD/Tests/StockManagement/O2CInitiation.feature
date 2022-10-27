Feature: Operator To Channel Initiation


############################################# Likith ######################################################
# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_83
# 
#
@test

Scenario: To verify that System admin can initiate the O2C successfully if valid details are entered.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to Stock Management and Click on Stock initiation
And Select MFS provider and Enter Reference number and Amount
Then click on Submit and Confirm button
When Navigate to Operator to channel and click on O2C transfer initiate
And Enter All the Mandatory Details
Then Click on submit and Confirm00



# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_86
# 
#
@test

Scenario: To verify that O2C transfer after initiation for amount transfer should go for Approval 1.
Given Login into Mobiquity Portal as System admin Checker1
When Navigate to Operator to channel and click on O2C transfer Approval1
And Assert Initiated O2C for Transaction1
When Navigate to Stock Management and Click on Stock initiation
And Select MFS provider and Enter Reference number and Amount
Then Assert Debited Stock
