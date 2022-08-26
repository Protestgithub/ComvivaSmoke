Feature: User Management : Buissness

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
# When Navigate to Manage User, and search Business Admin
#And Search with the EmailID
#And System Admin is able to view details
#And System Admin is able to edit details of the user
#Then Confirm the edit details
#When Navigate to Manage User, and search Business Admin
#And Search with the LoginID
#And System Admin is able to view details
#And System Admin is able to edit details of the user
#Then Confirm the edit details
#When Navigate to Manage User, and search Business Admin
#And Search with the KYC Number
#And System Admin is able to view details
#And System Admin is able to edit details of the user
#Then Confirm the edit details



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

# Author: Arpitha C
# Last Updated: 26/05/2022
# Comments : 
# Scenario_ID : SC_169 

@test


Scenario:To verify that proper error message should be displayed when login id is already registered in the system.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on register
And Select User type as Business and Select user role
And Enter registered login id value
Then Login id Error message is displayed

# Author: Arpitha C
# Last Updated: 26/05/2022
# Comments : 
# Scenario_ID : SC_170 
@test


Scenario:To verify that proper error message should be displayed when Email Id  is registered in the system.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on register
And Select User type as Business and Select user role
And Enter registered email id value
Then Email Error message is displayed