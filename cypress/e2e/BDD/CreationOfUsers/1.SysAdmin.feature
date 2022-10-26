Feature: System admin Creation

##################################### Security Profile Creation ################################################
# Author: Chetan.S
# Last Updated:
# Comments
# Scenario_ID :
# TC_
@prerequisite

#system Admin Security Profile
Scenario:To verify that security profiles can be configured in the system for different type of users under different workspaces.
Given Login into Mobiquity Portal as Super admin Maker
When Navigate to Security and click to select security profile
And Click on add profile select user type systemadmin and fill the details
And Fill the details-SystemAdmin Profile Name
And Fill the details-PasswordRestrictios for systemadmin
#And Fill the details-AuthRestrictions
And Fill the details-loginRestrictions for system admin
Then Click on add and confirm  
  
############################################### SysAdmin Creation #######################################

# Author: Kalyani M
# Last Updated:
# Comments    :
# Test Case_ID : TC_40_sysadmin
# 

@prerequisite
Scenario: To verify that Master user can initiate add request of System admin
Given Login into Mobiquity Portal as Super admin Maker
When Navigate to User Management and click on Register for superadmin
And Click On System Admin and select Single User
And Enter all Maker required Fields
Then Confirmation message is displayed

# Author: Kalyani M
# Last Updated:
# Comments    :
# Test Case_ID : TC_41_sysadmin
# 

@prerequisite

Scenario:To verify that Master user can approve add initiation request of System admin.
Given Login into Mobiquity Portal as Super admin Checker
When Navigate to Approvals and filter by Submitted status for SystemAdmin
And User click on System admin submitted user data
And Approve the Users and save loginID
Then User status is approved

# Author: Kalyani M
# Last Updated:
# Comments    :
# Test Case_ID : TC_41_sysadmin
@prerequisite

Scenario: Checking whether we are able to login with created systemadmin crendentials
Given Login into Mobiquity Portal as System admin Created by Master

@prerequisite

Scenario: To create System Admin2
Given Login into Mobiquity Portal as Super admin Maker
When Navigate to User Management and click on Register for superadmin
And Click On System Admin and select Single User
And Enter all required Fields
Then Confirmation message is displayed
Then Logout

Scenario:Approval of System Admin2
Given Login into Mobiquity Portal as Super admin Checker after Logout
When Navigate to Approvals and filter by Submitted status for SystemAdmin
And User click on System admin submitted user data
And Approve the Users and save loginID2
Then User status is approved
Then Logout

Scenario: Login in as System Admin2
Given Login into Mobiquity Portal as System admin Created by Master2

@prerequisite

Scenario: To create System Admins3
Given Login into Mobiquity Portal as Super admin Maker
When Navigate to User Management and click on Register for superadmin
And Click On System Admin and select Single User
And Enter all required Fields
Then Confirmation message is displayed
Then Logout

Scenario: Approval of System Admin3
Given Login into Mobiquity Portal as Super admin Checker after Logout
When Navigate to Approvals and filter by Submitted status for SystemAdmin
And User click on System admin submitted user data
And Approve the Users and save loginID3
Then User status is approved
Then Logout

Scenario: Login of System Admin3
Given Login into Mobiquity Portal as System admin Created by Master3



# Author: Rakesh SV
# Last Updated:
# Comments    :
# Test Case_ID : TC_41_sysadmin
Scenario: To create System Admin5
Given Login into Mobiquity Portal as Super admin Maker
When Navigate to User Management and click on Register
And Click On System Admin and select Single User
And Enter all required Fields
Then Confirmation message is displayed
Then Logout

Scenario:Approval of System Admin5
Given Login into Mobiquity Portal as Super admin Checker after Logout
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data
And Approve the Users and save loginID5
Then User status is approved
Then Logout

Scenario: Login in as System Admin5
Given Login into Mobiquity Portal as System admin Created by Master5



##############################  Change Password  ###################################
# Author: Rakesh SV
# Last Updated:
# Comments    :
# Test Case_ID : TC_38
# 

@test
Scenario: To verify that user should be able to change his/her password by entering his/her old password successfully.
Given Login into Mobiquity Portal as Systemadmin5
When Navigate to Profile icon and Click on Profile icon
And Click On Setting and click on Change Password
And Enter Old password and Enter New Password and Confirm New Password
Then Click on the change Password Button
Given Login into Mobiquity Portal as System admin with newly created Password

