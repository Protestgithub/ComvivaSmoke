Feature: Transfer rules

# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_19
# 
@test

Scenario: To verify that System admin should be able to  Approve Transfer Rule successfully.
Given Login into Mobiquity Portal as System admin Checker1
When User clicks on transfer rule approval
And Select rule and approve
Then click on submit

# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_16
# 
@test

Scenario: To verify that System admin should be able to View Transfer Rule successfully.
Given Login into Mobiquity Portal as System admin Maker
When User Click on Transfer Rule.
And Select the Service Name and from details.
And Select the To details for Initiaion
And Select the From & To category.
When User clicks on view option.




# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_18
# 
@test

Scenario: To verify that System admin should be able to Suspend Transfer Rule successfully.
Given Login into Mobiquity Portal as System admin Maker
When User Click on Transfer Rule.
And Select the Service Name and from details.
And Select the To details for Initiaion
And Select the From & To category.
When User clicks on edit option.
And Suspend the status in transfer rule
Then Click on submit button.
Then Click on confirm button.

# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_19
# 
@test

Scenario: To verify that System admin should be able to add approves Transfer Rule successfully.
Given Login into Mobiquity Portal as System admin Checker1
When User clicks on transfer rule approval
And Select rule and approve
Then click on submit


# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_17
# 
@test

Scenario: To verify that System admin should be able to Delete Transfer Rule successfully.
Given Login into Mobiquity Portal as System admin Maker
When User Click on Transfer Rule.
And Select the Service Name and from details.
And Select the To details for Initiaion
And Select the From & To category.
When User clicks on Delete option.
Then Logout
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When User clicks on transfer rule approval
And Select rule and approve


########################################## Sudheer #######################################################


# Author: Sudheer
# Last Updated:
# Comments 
# Test Case_ID : TC_164
# 
@test
Scenario: Transfer rule Creation for Transfer to Bank
Given Login into Mobiquity Portal as System admin Maker
When User Click on Transfer Rule.
And Select the Service Name and from Details for Transfer to Bank
And Select the To details for Transfer to Bank
And Select the From & To category for Transfer to Bank
When Click on Add Transfer Rule button.
And Select Status,Fixed Trf Level,Transfer type,Geographical Domain and Controlled Trf Level
Then Click on submit button.
Then Click on confirm button.
Then Logout
And Login into Mobiquity Portal as another System admin Checker1 after logout
When User clicks on transfer rule approval
And Select rule and approve
Then click on submit

