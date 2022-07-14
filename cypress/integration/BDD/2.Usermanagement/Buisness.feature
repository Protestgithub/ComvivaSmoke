Feature: User Management : Buissness



################################# Likith   #########################################################



# Author: Likith R
# Last Updated:
# Comments
# Test Case_ID : TC_64
#

@test1

Scenario:To verify that System admin/Business Admin should be able to Add businsess user for unregistered Mobile number only.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on register
And Select User type as Business and Select user role
And Enter all the required business user details
Then Confirmation message is displayed
Then Logout
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data
Then Approve the Users





# Author: Likith R
# Last Updated:
# Comments
# Test Case_ID : TC_99
#
@test

Scenario: To verify that System admin is able to reset password of another system user of the lower hierarchy.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on manage user
And enter user mobile number and search
When User Click on eye button
And goto credencials submenu
And Click on reset icon to reset password

# Author: Likith R
# Last Updated:
# Comments
# Test Case_ID : TC_65
#
@test


Scenario: To Verify that System Admin/Business Admin can initiate Barring of the businsess user.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on manage user
And enter user mobile number and search
When User Click on eye button
Then Click on Suspend user icon
And write comments to Suspend user
And click on yes


# Author: Likith R
# Last Updated:
# Comments
# Test Case_ID : TC_63
#
@test

Scenario: To verify that the Proper error message should get displayed on WEB if user trying to modify businsess user for which request is already in approval stage.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on manage user
And enter user mobile number and search
When User Click on eye button
And Click on edit
And Edit the required details >> Click on Next
And Click on save



# Author: Likith R
# Last Updated:
# Comments
# Test Case_ID : TC_66
#
@test


Scenario: To verify that the System admin is able to Add telco operator through user management module.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on register
And Select User type as Business and click on Telco operator
And Enter all the mandatory Basic information details and click on next
Then Enter all the mandatory Profile details like marketing profile,regulatory profile,Operator profile.
And Click on Next >> click on Confirm
Then Confirmation message
Then Logout
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data
And Approve the Users


# Author: Likith R
# Last Updated:
# Comments
# Test Case_ID : Tc_67
#

@test

Scenario:To verify that the System admin is able to Modify  telco operator through user management module.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on manage user
And Enter Telco operator Mobile number and KYC number in search menu
When User Click on eye button
And Click on edit
And Edit the required details >> Click on Next
And Click on save
Then Confirmation modify message
Then Logout
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data
Then Approve the Users




##################################### Arpitha ####################################################


# Author: Arpitha
# Last Updated: 25-04-2022
# Comments 
# Scenario_ID :
# TC_53

@test

Scenario:To verify that valid System admin/Business Admin is able to initiate businsess user creation.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on register
And Select User type as Business and Select user role
And Enter all the required business user details
Then Confirmation message is displayed

# Author: Arpitha
# Last Updated: 25-04-2022
# Comments 
# Scenario_ID :
# TC_54

@test

Scenario:To verify that another System Admin/businsess User  is able to approve the initiated business user creation.
Given Login into Mobiquity Portal as System admin Checker1
When Navigate to Approvals and filter by Submitted status 
And User click on submitted user data
And Approve the Users
Then User status is approved

#Author: Arpitha C
# Last Updated: 25/04/2022
# Comments : refered here is narendra 
# Scenario_ID : TC_55
@test

Scenario:To verify that after successful creation of the businsess user, notification should be sent to the user
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on register
And Select User type as Business and Select user role
And Enter all the required business user details
Then Confirmation message is displayed
Then Logout
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When Navigate to Approvals and filter by Submitted status 
And User click on submitted user data
And Approve the Users
Then User status is approved



# Author: Arpitha C
# Last Updated: 25/04/2022
# Comments : refered here is narendra 
# Scenario_ID : TC_56 
@test

Scenario: System admin should be able to Initite modification searching with all values (Mobile, KYC, Email and Login)
Given Login into Mobiquity Portal as System admin Maker
When Navigate to Manage User, and search Business Admin
And Search with the Mobile Number
And System Admin is able to view details
And System Admin is able to edit details of the user
Then Confirm the edit details
When Navigate to Manage User, and search Business Admin
And Search with the EmailID
And System Admin is able to view details
And System Admin is able to edit details of the user
Then Confirm the edit details
When Navigate to Manage User, and search Business Admin
And Search with the LoginID
And System Admin is able to view details
And System Admin is able to edit details of the user
Then Confirm the edit details
When Navigate to Manage User, and search Business Admin
And Search with the KYC Number
And System Admin is able to view details
And System Admin is able to edit details of the user
Then Confirm the edit details



# Author: Arpitha C
# Last Updated: 25/04/2022
# Comments : 
# Scenario_ID : SC_57 

@test

Scenario:To verify that another System Admin/Business Admin User is able to approve the modified  businsess user deatails.
Given Login into Mobiquity Portal as System admin Checker1
When Navigate to Approvals and filter by Modification of user status
And Admin click on Modified user data
And Approve the Users
Then User modified is approved



# Author: Arpitha C
# Last Updated: 25/04/2022
# Comments : 
# Scenario_ID : SC_58 

@test

Scenario:To verify that System Admin/Business Admin is able to view the businsess user details.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to Manage User, and search Business Admin
And Search with the Mobile Number
And System Admin is able to view details
When Navigate to Manage User, and search Business Admin
And Search with the KYC Number
And System Admin is able to view details




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
        And  Enter Mobile numberin search Menu
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
        And  Enter Mobile number and KYC number in search menu for valid transaction with id
        And  Click on view Details for valid transaction with id
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
        And  Enter Mobile number and KYC number in search menu for transaction type
        And  Click on view Details for transaction type
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
        And  Enter Mobile number and KYC number in search menu based on the Date
        And  Click on view Details based on the Date
        And Click on Wallet Payment History based on the Date
        And Click on filter
        And Select start date and end date and  Click apply
        And Click on expand button based on the Date
        Then Click on view Details based on the Date range


###################################### Kalyani ####################################################

# Author: Kalyani M
# Last Updated:
# Comments : Business User Suspension
# Test Case_ID : TC_59
# 

@test

Scenario: To Verify that System Admin/Business Admin can initiate suspension of the businsess user.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on register
And Select User type as Business and Select user role
And Enter all the required business user details1
Then Confirmation message is displayed
Then Logout
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When Navigate to Approvals and filter by Submitted status 
And User click on submitted user data
And Approve the Users
Then User status is approved
Then Logout
Given Login into Mobiquity Portal as System admin Maker after Logout
When Navigate to User Management and Click on manage user
And  Enter Mobile number and KYC number in search for suspension
When User Click on eye button 
Then Verify View Details Page
Then Click on Suspend user icon
And  write comments to Suspend user
And  click on yes
Then Verify the user resume Confirmation message

# Author: Kalyani M
# Last Updated:
# Comments  :Approval
# Test Case_ID : TC_60
# 

@test

Scenario: To verify that SystemAdmin/Business Admin can initiate resumption of an suspended businsess user.
Given Login into Mobiquity Portal as System admin Checker1
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data
And Approve the Users
Then User status is Suspended

Scenario:Asserting the Suspended business user login 
Given Login into Mobiquity Portal as Business admin User

# Author: Kalyani M
# Last Updated:
# Comments   : Business user Resumption
# Test Case_ID : TC_61
# 

@test

Scenario: To verify that System admin is able to  Resume the details of searched user
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on manage user
And Enter Mobile number and KYC number in search for suspension
When User Click on eye button 
Then Verify View Details Page
Then Click on Suspend user icon
And  write comments to Suspend user
And  click on yes
Then Verify the user resume Confirmation message

# Author: Kalyani M
# Last Updated:
# Comments  : Approval
# Test Case_ID : TC_62
# 
@test

Scenario: System Admin/Business Admin can approve resumption initiate of an suspended businsess user.
Given Login into Mobiquity Portal as System admin Checker1
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data
And Approve the Users
Then User status is Resumed

Scenario:Asserting the Resumed business user login 
Given Login into Mobiquity Portal as Business admin User1

