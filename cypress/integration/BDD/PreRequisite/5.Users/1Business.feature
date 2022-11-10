Feature: Telco Operator Creation and Modification


################################# Likith   #########################################################
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
And Navigate to My Activity and Apply Add User filters
Then Assert Created Telco-Operator Mobile Number and Write Created on time
Then Logout


Scenario: To verify the approval of telco operator
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data for Telco-Operator
And Approve the Users
Then Added User status is approved



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
And Navigate to My Activity and Apply Modified User filters
Then Assert Created Telco-Operator Mobile Number and Write Created on time
Then Logout
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When Navigate to Approvals and filter by Modification of user status
And User click on submitted user data
Then Approve the Users
Then Edited User status is approved





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
And Navigate to My Activity and Apply Add User filters
Then Assert Created Buissness User Mobile Number and Write Created on time
Then Logout
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When Navigate to Approvals and filter by Submitted status
When User click on submitted user data for Unregistered
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
Then Verify the user suspend Confirmation message


################################# Likith   #########################################################

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
Then Verify Error message
##################################### Arpitha ####################################################




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
And Navigate to My Activity and Apply Modified User filters
Then Assert Created Buissness User Mobile Number and Write Created on time
