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


# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_85
# 
@test

Scenario:To Verify that Channel admin can do O2C Enquiry.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on manage user 
And enter user mobile number and search
When User Click on eye button 
And click wallet Payment history.
And Enter TransactionID and check


# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_22
# 
@test

Scenario: To verify that the O2C transaction should go for approval 1 only if transaction amount is less than the O2C limit.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to Stock Management and Click on Stock initiation
And Select MFS provider and Enter Reference number and Amount
Then click on Submit and Confirm button
When Navigate to Operator to channel and click on O2C transfer initiate
And Enter All the Mandatory Details
Then Click on submit and Confirm0
And logout the user
Given Login into Mobiquity Portal as System admin Checker1
When Navigate to Operator to channel and click on O2C transfer Approval1
And Assert Initiated O2C for Transaction1
When Navigate to Stock Management and Click on Stock initiation
And Select MFS provider and Enter Reference number and Amount
Then Assert Debited Stock



# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_21
# 
@test

Scenario:To verify that the O2C transaction initiated and Approved to perform Transaction correction 
Given Login into Mobiquity Portal as System admin Maker
When Navigate to Stock Management and Click on Stock initiation
And Select MFS provider and Enter Reference number and Amount
Then click on Submit and Confirm button
When Navigate to Operator to channel and click on O2C transfer initiate
And Enter All the Mandatory Details
Then Click on submit and Confirm1
And logout the user
Given Login into Mobiquity Portal as System admin Checker1
When Navigate to Operator to channel and click on O2C transfer Approval1
And Assert Initiated O2C for Transaction2
When Navigate to Stock Management and Click on Stock initiation
And Select MFS provider and Enter Reference number and Amount
Then Assert Debited Stock



# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_21
# 
@test

Scenario:To verify that the O2C transaction initiated and Approved to view all the wallet transactions
Given Login into Mobiquity Portal as System admin Maker
When Navigate to Stock Management and Click on Stock initiation
And Select MFS provider and Enter Reference number and Amount
Then click on Submit and Confirm button
When Navigate to Operator to channel and click on O2C transfer initiate
And Enter All the Mandatory Details
Then Click on submit and Confirm2
And logout the user
Given Login into Mobiquity Portal as System admin Checker1
When Navigate to Operator to channel and click on O2C transfer Approval1
And Assert Initiated O2C for Transaction3
When Navigate to Stock Management and Click on Stock initiation
And Select MFS provider and Enter Reference number and Amount
Then Assert Debited Stock




 # Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_87
# 
#
@test

Scenario:To verify that if Approval 1 current status should be 'Passed' then , it go for next Approval as 'O2C transfer Approval 2'.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to Operator to channel and click on O2C transfer initiate
And Enter All the Mandatory Details
Then Click on submit and Confirm
And logout the user
Given Login into Mobiquity Portal as System admin Checker1
When Navigate to Operator to channel and click on O2C transfer Approval1
And logout the user
Given Login into Mobiquity Portal as System admin Checker2
When Navigate to Operator to channel and click on O2C transfer Approval2

