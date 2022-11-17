Feature: System admin Creation


##################################### Security Profile Creation ################################################

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

Scenario:Approval of System Admin2
Given Login into Mobiquity Portal as Super admin Checker
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data
And Approve the Users and save loginID2
Then User status is approved

Scenario: Login in as System Admin2
Given Login into Mobiquity Portal as System admin Created by Master2

@prerequisite

Scenario: To create System Admins3
Given Login into Mobiquity Portal as Super admin Maker
When Navigate to User Management and click on Register
And Click On System Admin and select Single User
And Enter all required Fields
Then Confirmation message is displayed

Scenario: Approval of System Admin3
Given Login into Mobiquity Portal as Super admin Checker
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data
And Approve the Users and save loginID3
Then User status is approved

Scenario: Login of System Admin3
Given Login into Mobiquity Portal as System admin Created by Master3


