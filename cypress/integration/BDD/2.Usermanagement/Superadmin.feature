Feature: User Management : Super admin

# Author: Kalyani M
# Last Updated:
# Comments 
# Test Case_ID : TC_51_SuperadminMaker_selfdetails
# 
@test

Scenario: To verify that Super admin is able to  view Self details 
Given Login into Mobiquity Portal as Super admin Maker
When Navigate to User Management and Click on manage user
And Enter Mobile number or KYC number of superadmin in search
When User Click on eye button


# Author: Kalyani M
# Last Updated:
# Comments 
# Test Case_ID : TC_52_SuperadminChecker_LowerHierarchyDetails
# 
@test

Scenario: To verify that Super admin is able to  view Lower_Hierarchy details 
Given Login into Mobiquity Portal as Super admin Maker
When Navigate to User Management and Click on manage user
And Enter Mobile number or KYC number of subscriber user in search
When User Click on eye button

# Author: Kalyani M
# Last Updated:
# Comments    :
# Test Case_ID : TC_44_sysadmin
@test

Scenario: To verify that master admin can initiate and approve modification request of an System admin/ Bank admin.
Given Login into Mobiquity Portal as Super admin Maker
When Navigate to User Management and Click on manage user
And Enter Mobile number or KYC number of systemadmin in search
When User Click on eye button
And Click on edit
And Edit the required details >> Click on Next
And Click on save
Then Verify Sucess Message
Then Logout 
Given Login into Mobiquity Portal as Super admin Checker after Logout
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data
And Approve the modification/Deletion Request

# Author: Kalyani M
# Last Updated:
# Comments    :
# Test Case_ID : TC_47_sysadmin
@test

Scenario: To verify that Master user is able to initiate deletion of an existing System admin.
Given Login into Mobiquity Portal as Super admin Maker
When Navigate to User Management and Click on manage user
And Enter Mobile number or KYC number of systemadmin in search
When User Click on eye button
And Click on delete
And Verify Sucess Message
Then Logout 
Given Login into Mobiquity Portal as Super admin Checker after Logout
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data
And Approve the modification/Deletion Request


############################################# Monica ##############################################

#ERROR_MESSAGE

# Author:Monica
# Last Updated:
# Comments 
# Scenario_ID : TC_167
# 
@test

Scenario:To verify that proper error message should be when login id is already present in the system.
Given Login into Mobiquity Portal as Super admin Maker
When Navigate to User Management and click on Register
And Click On System Admin and select Single User
And Fill All Required Fields and Enter Registered LoginID
Then Error Message Should be displayed


# Author:Monica
# Last Updated:
# Comments 
# Scenario_ID : TC_168
# 
@test

Scenario:To verify that proper error message should be display when contact number/ email  is registered in the system.
Given Login into Mobiquity Portal as Super admin Maker
When Navigate to User Management and click on Register
And Click On System Admin and select Single User
And Fill All Required Fields and Enter Registered EmailID
Then Email Id Error Message Should be dispalyed

# Author:Monica
# Last Updated:
# Comments 
# Scenario_ID : TC_180
# 
@test

Scenario:To verify that proper error message should  be displayed when email id/contact number is not verified.
Given Login into Mobiquity Portal as Super admin Maker
When Navigate to User Management and click on Register
And Click On System Admin and select Single User
And Fill All Required Fields and Enter Not Verified EmailID
Then Not Registered EmailId Error Message

# Author:Monica
# Last Updated:
# Comments 
# Scenario_ID : TC_181
# 

@test

Scenario:TO verify that immidiate error message should be displayed whne any invalid value is entered by the user.
Given Login into Mobiquity Portal as Super admin Maker
When Navigate to User Management and click on Register
And Click On System Admin and select Single User
And enter invalid value in mandatory field
Then Invaild Value Error Message