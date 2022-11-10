Feature: Transfer rules Validation Message Verification


############################################ Narendra #########################################



# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_14
# 
@test

Scenario: To verify that System admin should be able to add initiate Transfer Rule successfully.
Given Login into Mobiquity Portal as System admin Maker
When User Click on Transfer Rule.
And Select the Service Name and from details.
And Select the To details for Initiaion
And Select the From & To category.
When Click on Add Transfer Rule button.
And Select Status,Fixed Trf Level,Transfer type,Geographical Domain and Controlled Trf Level
Then Click on submit button.
Then Click on confirm button.
Then Verify initiate success Message

# Author: Narendra
# Last Updated:
# Comments 
# Test Case_ID : TC_164
# 
@test

Scenario: To verify that proper error message should be displayed when invalid character is entered in the amount.
Given Login into Mobiquity Portal as System admin Maker
When User clicks on O2C transfer rules
And Select Domain Name.
And Select Category Name.
And Select MFS Provider,Payment Instrument.
Then Enter First Approval Limit
And Click on submit.
And confirm the displayed Error Message


# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_19
# 
@test

Scenario: To verify that System admin should be able to add Approve Transfer Rule successfully.
Given Login into Mobiquity Portal as System admin Checker1
When User clicks on transfer rule approval
And Select rule and approve
Then click on submit
Then Verify Approval success Message



# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_15
# 
@test

Scenario: To verify that System admin should be able to Modify Transfer Rule successfully.
Given Login into Mobiquity Portal as System admin Maker
When User Click on Transfer Rule.
And Select the Service Name and from details.
And Select the To details for Initiaion
And Select the From & To category.
When User clicks on edit option.
Then Click on submit button.
Then Click on confirm button.
Then Verify Modify success Message

# Author: Narendra R
# Last Updated:
# Comments 
# Test Case_ID : TC_163
# 
@test

Scenario: To verify the error message when the System admin Tries to add initiate Existed Transfer Rule.
Given Login into Mobiquity Portal as System admin Maker
When User Click on Transfer Rule.
And Select the Service Name and from details.
And Select the To details for Initiaion
And Select the From & To category.
When Click on Add Transfer Rule button.
And Confirm the Error Message

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
Then Verify Approval success Message

