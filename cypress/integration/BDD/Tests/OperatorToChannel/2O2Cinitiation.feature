Feature: Operator To Channel Validation Message Verification

############################################# Narendra ###################################################

# Author: Narendra
# Last Updated: 27/04/2022
# Comments 
# Scenario_ID : 
# TestCase_ID : TC_186
@test

Scenario: To verify that proper error message should be displayed when business user is suspended in the system
Given Login into Mobiquity Portal as System admin Maker
When Navigate to Operator to channel and click on O2C transfer initiate
And Enter All the Mandatory details
And Click on submit and Confirm
Then Confirm the Error message

# Author: Narendra
# Last Updated: 27/04/2022
# Comments 
# Scenario_ID : 
# TestCase_ID : TC_165
@test

Scenario: To verify that proper error message should be displayed when amount field contains any invalid character
Given Login into Mobiquity Portal as System admin Maker
When Navigate to Operator to channel and click on O2C transfer initiate
And Enter All the Mandatory details and type Invalid Character in Transfer amount
And Click on submit and Confirm Error Message

# Author: Narendra
# Last Updated: 27/04/2022
# Comments 
# Scenario_ID : 
# TestCase_ID : TC_166
@test

Scenario: To verify that proper error message should be displayed when no stock is present in the IND01 wallet.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to Operator to channel and click on O2C transfer initiate
And Enter All the Details
And Click on submit and Confirm

