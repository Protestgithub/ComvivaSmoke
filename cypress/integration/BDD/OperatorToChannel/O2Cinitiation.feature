Feature: Operator To Channel

############################################# Narendra ###################################################

# Author: Narendra
# Last Updated: 27/04/2022
# Comments 
# Scenario_ID : 
# TestCase_ID : TC_186

Scenario: To verify that proper error message should be displayed when business user is suspended in the system
Given Login into Mobiquity Portal as System admin User
When Navigate to Operator to channel and click on O2C transfer initiate
And Enter All the Mandatory details
And Click on submit and Confirm
Then Confirm the Error message

# Author: Narendra
# Last Updated: 27/04/2022
# Comments 
# Scenario_ID : 
# TestCase_ID : TC_165

Scenario: To verify that proper error message should be displayed when amount field contains any invalid character
Given Login into Mobiquity Portal as System admin User
When Navigate to Operator to channel and click on O2C transfer initiate
And Enter All the Mandatory details and type Invalid Character in Transfer amount
And Click on submit and Confirm Error Message

# Author: Narendra
# Last Updated: 27/04/2022
# Comments 
# Scenario_ID : 
# TestCase_ID : TC_166

Scenario: To verify that proper error message should be displayed when no stock is present in the IND01 wallet.
Given Login into Mobiquity Portal as System admin User
When Navigate to Operator to channel and click on O2C transfer initiate
And Enter All the Details
And Click on submit and Confirm
And logout the user
Given Login into Mobiquity Portal as System admin User2
When Navigate to Operator to channel and click on O2C transfer Approval1
And logout the user
Given Login into Mobiquity Portal as System admin User3
When Navigate to Operator to channel and click on O2C transfer Approval2
And Confirm the displayed Error Message



############################################# Likith ######################################################


# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_83
# 
#

Scenario: To verify that System admin can initiate the O2C successfully if valid details are entered.
Given Login into Mobiquity Portal as System admin User
When Navigate to Operator to channel and click on O2C transfer initiate
And Enter All the Mandatory Details
Then Click on submit and Confirm



# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_86
# 
#

Scenario: To verify that O2C transfer after initiation for amount transfer should go for Approval 1.
Given Login into Mobiquity Portal as System admin User2
When Navigate to Operator to channel and click on O2C transfer Approval1
 
 # Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_87
# 
#

Scenario:To verify that if Approval 1 current status should be 'Passed' then , it go for next Approval as 'O2C transfer Approval 2'.
Given Login into Mobiquity Portal as System admin User3
When Navigate to Operator to channel and click on O2C transfer Approval2

# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_85
# 

Scenario:To Verify that Channel admin can do O2C Enquiry.
Given Login into Mobiquity Portal as System admin User
When Navigate to User Management and Click on manage user 
And enter user mobile number and search
When User Click on eye button 
And click wallet Payment history.
And Enter TransactionID and check

# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_21
# 

Scenario:To verify that the O2C transaction should go for approval 2 only if transaction amount is greater than the O2C limit.
Given Login into Mobiquity Portal as System admin User
When Navigate to Operator to channel and click on O2C transfer initiate
And Enter All the Mandatory Details
Then Click on submit and Confirm
And logout the user
Given Login into Mobiquity Portal as System admin User2
When Navigate to Operator to channel and click on O2C transfer Approval1
And logout the user
Given Login into Mobiquity Portal as System admin User3
When Navigate to Operator to channel and click on O2C transfer Approval2

# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_22
# 

Scenario: To verify that the O2C transaction should go for approval 1 only if transaction amount is less than the O2C limit.
Given Login into Mobiquity Portal as System admin User
When Navigate to Operator to channel and click on O2C transfer initiate
And Enter All the Mandatory Details
Then Click on submit and Confirm
And logout the user
Given Login into Mobiquity Portal as System admin User2
When Navigate to Operator to channel and click on O2C transfer Approval1

