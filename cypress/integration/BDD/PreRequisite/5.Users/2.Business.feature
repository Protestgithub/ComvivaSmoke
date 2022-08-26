Feature: User Management : 2.Buissness

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
And Navigate to My Activity and Apply Add User filters
And Assert Created Buissness User Mobile Number for Suspension and Write Created on time
Then Logout


Scenario: To Verify that System Admin/Business Admin can approve suspension of the businsess user.
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When Navigate to Approvals and filter by Submitted status 
And User click on Suspended submitted user data
And Approve the Users
Then User status is approved
Then Logout