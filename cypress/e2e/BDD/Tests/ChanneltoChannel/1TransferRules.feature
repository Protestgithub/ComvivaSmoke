Feature: Transfer Rules for C2C

# Author: Kalyani M
# Last Updated:
# Comments 
# Test Case_ID : Transfer Rule for C2C Normal to Normal
# 
@test

Scenario: To verify that System admin should be able to add initiate Transfer Rule successfully for C2C Normal to Normal
Given Login into Mobiquity Portal as System admin Maker
When User Click on Transfer Rule.
And Select the Service Name and from details for C2C
And Select the To details for Initiaion for C2C
And Select the From & To category as Wholesaler
And Click on Add Transfer Rule button for C2C

# Author: Kalyani M
# Last Updated:
# Comments 
# Test Case_ID : Transfer rule Approval
# 
@test

Scenario: To verify that System admin should be able to add Approve Transfer Rule successfully.
Given Login into Mobiquity Portal as System admin Checker1
When User clicks on transfer rule approval
And Select rule and approval for C2C


# Author: Kalyani M
# Last Updated:
# Comments 
# Test Case_ID : Transfer Rule for C2C Normal to Salary
# 
@test

Scenario: To verify that System admin should be able to add initiate Transfer Rule successfully for C2C Normal to Salary
Given Login into Mobiquity Portal as System admin Maker
When User Click on Transfer Rule.
And Select the Service Name and from details for C2C
And Select the To details for Initiaion for C2C1
And Select the From & To category as Wholesaler
And Click on Add Transfer Rule button for C2C

# Author: Kalyani M
# Last Updated:
# Comments 
# Test Case_ID : Transfer rule Approval
# 
@test

Scenario: To verify that System admin should be able to add Approve Transfer Rule successfully.
Given Login into Mobiquity Portal as System admin Checker1
When User clicks on transfer rule approval
And Select rule and approval for C2C



