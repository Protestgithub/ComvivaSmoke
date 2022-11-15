Feature: Stock Management Initiation

    This feature includes Stock initiation,StockApproval1 and StockApproval2 by System Admin

########################################### Stock Management ####################################################


# Author: Narendra
# Last Updated: 5/05/2022
# Comments 
# Scenario_ID : 
# TestCase_ID : TC_75
@test

Scenario: To verify that System admin can initiate the stock successfully
Given Login into Mobiquity Portal as System admin Maker
When Navigate to Stock Management and Click on Stock initiation
And Select MFS provider and Enter Reference number and Amount
Then click on Submit and Confirm button

# Author: Narendra
# Last Updated: 5/05/2022
# Comments 
# Scenario_ID : 
# TestCase_ID : TC_76
@test

Scenario: To verify that System admin can successfully approve the stock at level>>1 
Given Login into Mobiquity Portal as System admin Checker1
When Navigate to Stock Management and Click on Stock Approval 1
And Click on Submit Button
Then Click on Approve button


# Author: Narendra
# Last Updated: 6/05/2022
# Comments 
# Scenario_ID : 
# TestCase_ID : TC_77
@test

Scenario: To verify that System admin can successfully approve the stock at level 2.
Given Login into Mobiquity Portal as System admin Checker2
When Navigate to Stock Management and Click on Stock Approval 2
And Click on Submit and Approve the Stock at level 2
And Navigate to Stock Management and Click on Stock initiation
And Select MFS provider and Enter Reference number and Amount
Then Assert Credit Stock
