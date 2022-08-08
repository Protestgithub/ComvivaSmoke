Feature: Operator To Channel,OrdersDetails,Transaction Correction

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
And Confirm the displayed Error Message


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
 
 # Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_87
# 
#
@test

Scenario:To verify that if Approval 1 current status should be 'Passed' then , it go for next Approval as 'O2C transfer Approval 2'.
Given Login into Mobiquity Portal as System admin Checker2
When Navigate to Operator to channel and click on O2C transfer Approval2

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
When Navigate to Operator to channel and click on O2C transfer initiate
And Enter All the Mandatory Details
Then Click on submit and Confirm0
And logout the user
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When Navigate to Operator to channel and click on O2C transfer Approval1



# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_21
# 
@test

Scenario:To verify that the O2C transaction should go for approval 2 only if transaction amount is greater than the O2C limit.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to Operator to channel and click on O2C transfer initiate
And Enter All the Mandatory Details
Then Click on submit and Confirm1
And logout the user

Given Login into Mobiquity Portal as System admin Checker1
When Navigate to Operator to channel and click on O2C transfer Approval1
And logout the user
Given Login into Mobiquity Portal as System admin Checker2
When Navigate to Operator to channel and click on O2C transfer Approval2


# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_21
# 
@test

Scenario:To verify that the O2C transaction should go for approval 2 only if transaction amount is greater than the O2C limit.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to Operator to channel and click on O2C transfer initiate
And Enter All the Mandatory Details1
Then Click on submit and Confirm2
And logout the user

Given Login into Mobiquity Portal as System admin Checker1
When Navigate to Operator to channel and click on O2C transfer Approval1
And logout the user
Given Login into Mobiquity Portal as System admin Checker2
When Navigate to Operator to channel and click on O2C transfer Approval2


################################### Kalyani  #######################################


# Author: Kalyani M
# Last Updated:
# Comments 
# Test Case_ID : TC_91
# 
@test

Scenario:To verify that the Valid User should able to perform Transaction correction 
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on manage user
And Enter Mobile number or KYC number
When User Click on eye button for WalletHistory
Then Logout
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When Navigate to Transaction Correction and click on Transaction Approval


# Author: Kalyani M
# Last Updated:
# Comments 
# Test Case_ID : TC_92
# 
@test

Scenario:To verify that when the Roll Back Service charge option is selected, then along with service charge, the applicable tax should also be rolled back
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on manage user
And Enter Mobile number or KYC number
When User Click on eye button for WalletHistory1
Then Logout
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When Navigate to Transaction Correction and click on Transaction Approval1

# Author: Kalyani M
# Last Updated:
# Comments 
# Test Case_ID : TC_93
# 
@test

Scenario:To verify that when the Roll Back Commission option is selected, then along with commission, the applicable tax should also be rolled back
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on manage user
And Enter Mobile number or KYC number
When User Click on eye button for WalletHistory2
Then Logout
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When Navigate to Transaction Correction and click on Transaction Approval2


######################################### Sudheer ##################################################


    # # # Author: Sudheer Baraker
    # # # Last Updated: 11/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_129
    # # #
@test

    Scenario: To verify that Admin user can view all the transaction details under Order details menu.
    Given Login into Mobiquity Portal as System admin Maker
        When  Click on user management and Manage users
        And  Enter Mobile numberin search Menu
        And  Click on view Details
        Then Click on order details

    # # # Author: Sudheer Baraker
    # # # Last Updated: 11/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_130
    # # #
@test

    Scenario: To verify that Admin user can check all the Order Details of a customer/ business users successfully.
   	 Given Login into Mobiquity Portal as System admin Maker
        When  Click on user management and Manage users
        And  Enter Mobile number and KYC number in search menu for customer/ business users
        And  Click on view Details
        Then Click on order details for customer/ business users


     # # # Author: Sudheer Baraker
    # # # Last Updated: 11/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_131
    # # #
@test

    Scenario: To verify that latest order transactions will be displayed on the first page of Order details screen.
    Given Login into Mobiquity Portal as System admin Maker
        When  Click on user management and Manage users
        And  Enter Mobile numberin search Menu
        And  Click on view Details
        Then Click on order details for latest order transactions


    # # # Author: Sudheer Baraker
    # # # Last Updated: 11/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_132
    # # #
@test

    Scenario: To verify that all the wallet transactions are displayed in statement screen sucessfully.
    Given Login into Mobiquity Portal as System admin Maker
        When  Click on user management and Manage users
        And  Enter Mobile numberin search Menu
        And  Click on view Details
        And Click on Wallet Payment History
        And Click on expand button
        Then Click on wallet view Details
@test

    # # # Author: Sudheer Baraker
    # # # Last Updated: 11/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_133
    # # #
@test

    Scenario: To verify that user can able to view all the wallet transactions by entering valid transaction id.
    Given Login into Mobiquity Portal as System admin Maker
        When  Click on user management and Manage users
        And  Enter Mobile numberin search Menu
        And  Click on view Details
        And Click on Wallet Payment History for valid transaction with id
        And Click on expand button on valid transaction with id
        Then Click on view Details for wallet transactions with id

    # # # Author: Sudheer Baraker
    # # # Last Updated: 11/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_134
    # # #
@test

    Scenario: To verify that user can able to fetch the Statement based on the transaction type (success, fail etc.)
    Given Login into Mobiquity Portal as System admin Maker
        When  Click on user management and Manage users
        And  Enter Mobile numberin search Menu
        And  Click on view Details
        And Click on Wallet Payment History for transaction type
        And Click on filter and Select status type and Select apply
        And Click on expand button for transaction type
        Then Click on view Details for transaction

    # # # Author: Sudheer Baraker
    # # # Last Updated: 11/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_135
    # # #
@test

    Scenario: To verify that user can able to fetch the Statement based on the Date range.
    Given Login into Mobiquity Portal as System admin Maker
        When  Click on user management and Manage users
        And  Enter Mobile numberin search Menu
        And  Click on view Details
        And Click on Wallet Payment History based on the Date
        And Click on filter
        And Select start date and end date and  Click apply
        And Click on expand button based on the Date
        Then Click on view Details based on the Date range


