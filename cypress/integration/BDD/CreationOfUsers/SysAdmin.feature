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
And Click on add profile select user type as subscriber and fill the details
And Fill the details-Subscriber Profile Name
And Fill the details-PasswordRestrictios
And Fill the details-AuthRestrictions
And Fill the details-loginRestrictions
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
When Navigate to User Management and click on Register
And Click On System Admin and select Single User
And Enter all required Fields
Then Confirmation message is displayed

# Author: Kalyani M
# Last Updated:
# Comments    :
# Test Case_ID : TC_41_sysadmin
# 

@prerequisite

Scenario:To verify that Master user can approve add initiation request of System admin.
Given Login into Mobiquity Portal as Super admin Checker
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data
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
When Navigate to User Management and click on Register
And Click On System Admin and select Single User
And Enter all required Fields
Then Confirmation message is displayed
Then Logout
Given Login into Mobiquity Portal as Super admin Checker after Logout
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data
And Approve the Users and save loginID2
Then User status is approved
Then Logout
Given Login into Mobiquity Portal as System admin Created by Master2

@prerequisite

Scenario: To create System Admins3
Given Login into Mobiquity Portal as Super admin Maker
When Navigate to User Management and click on Register
And Click On System Admin and select Single User
And Enter all required Fields
Then Confirmation message is displayed
Then Logout
Given Login into Mobiquity Portal as Super admin Checker after Logout
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data
And Approve the Users and save loginID3
Then User status is approved
Then Logout
Given Login into Mobiquity Portal as System admin Created by Master3


