Feature: Transfer rules

# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_15
# 

Scenario: To verify that System admin should be able to Modify Transfer Rule successfully.
Given Login into Mobiquity Portal as System admin User
When User Click on Transfer Rule.
And Select the Service Name and from details.
And Select the To details.
And Select the From & To category.
When User clicks on edit option.
Then Click on submit button.
Then Click on confirm button.


# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_19
# 

Scenario: To verify that System admin should be able to add approve Transfer Rule successfully.
Given Login into Mobiquity Portal as System admin User
When User clicks on transfer rule approval
And Select rule and approve
Then click on submit



# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_14
# 

Scenario: To verify that System admin should be able to add initiate Transfer Rule successfully.
Given Login into Mobiquity Portal as System admin User
When User Click on Transfer Rule.
And Select the Service Name and from details.
And Select the To details.
And Select the From & To category.
When Click on Add Transfer Rule button.
And Select Status,Fixed Trf Level,Transfer type,Geographical Domain and Controlled Trf Level
Then Click on submit button.
Then Click on confirm button.


# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_16
# 

Scenario: To verify that System admin should be able to View Transfer Rule successfully.
Given Login into Mobiquity Portal as System admin User
When User Click on Transfer Rule.
And Select the Service Name and from details.
And Select the To details.
And Select the From & To category.
When User clicks on view option.



# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_17
# 

Scenario: To verify that System admin should be able to Delete Transfer Rule successfully.
Given Login into Mobiquity Portal as System admin User
When User Click on Transfer Rule.
And Select the Service Name and from details.
And Select the To details.
And Select the From & To category.
When User clicks on Delete option.

# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_18
# 

Scenario: To verify that System admin should be able to Suspend Transfer Rule successfully.
Given Login into Mobiquity Portal as System admin User
When User Click on Transfer Rule.
And Select the Service Name and from details.
And Select the To details.
And Select the From & To category.
When Click on Add Transfer Rule button.
And Suspend the status in transfer rule
Then Click on submit button.
Then Click on confirm button.


# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_20
# 

Scenario: To verify that System admin is able to add O2C Transfer Rule successfully.
Given Login into Mobiquity Portal as System admin User
When User clicks on O2C transfer rules
And Select Domain Name.
And Select Category Name.
And Select MFS Provider,Payment Instrument.
Then Enter First Approval Limit.
And Click on submit.
And Click on confirm.



############################################ Narendra #########################################

# Author: Narendra R
# Last Updated:
# Comments 
# Test Case_ID : TC_163
# 

Scenario: To verify that System admin should be able to add initiate Transfer Rule successfully.
Given Login into Mobiquity Portal as System admin User
When User Click on Transfer Rule.
And Select the Service Name and from details.
And Select the To details.
And Select the From & To category.
When Click on Add Transfer Rule button.
And Confirm the Error Message


# Author: Narendra
# Last Updated:
# Comments 
# Test Case_ID : TC_164
# 

Scenario: To verify that proper error message should be displayed when invalid character is entered in the amount.
Given Login into Mobiquity Portal as System admin User
When User clicks on O2C transfer rules
And Select Domain Name.
And Select Category Name.
And Select MFS Provider,Payment Instrument.
Then Enter First Approval Limit
And Click on submit.
And confirm the displayed Error Message
