Feature: Transfer Rules for C2C 


# Author: Kalyani M
# Last Updated:
# Comments 
# Test Case_ID : Transfer Rule for Inverse C2C
# 
@test

Scenario: To verify that System admin should be able to add initiate Transfer Rule successfully for Inverse C2C Commission to Normal
Given Login into Mobiquity Portal as System admin Maker
When User Click on Transfer Rule.
And Select the Service Name and from details for Inverse C2C
And Select the To details for Initiaion for Inverse C2C
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
# Test Case_ID : Transfer Rule for Inverse C2C
# 
@test

Scenario: To verify that System admin should be able to add initiate Transfer Rule successfully for inverse C2C Salary to Normal
Given Login into Mobiquity Portal as System admin Maker
When User Click on Transfer Rule.
And Select the Service Name and from details for Inverse C2C1
And Select the To details for Initiaion for Inverse C2C
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

