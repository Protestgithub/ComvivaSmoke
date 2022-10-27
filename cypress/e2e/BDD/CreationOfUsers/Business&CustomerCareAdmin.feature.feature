Feature: User Management : Administrator/Business/Subscriber

    This feature includes registering, Modifying and Approval of Business Admin and
    Customer Support Admin Users by System Admin



# Author: Automation Tester 1
# Last Updated: 17/03/2022
# Comments :
# Scenario_ID : S_01
#
@test
Scenario: Registration of Business Administrator
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on register
And Select User type as Adminstrator and click on BusinessAdmin
And Enter all the required details
Then Confirmation message is displayed
When Navigate to My Activity and Aplly required filters
And Assert Created Business Admin Mobile Number and Write Created on time


# Author: Automation Tester 2
# Last Updated: 18/03/2022
# Comments
# Scenario_ID : S_02
#
@test

Scenario: Approval of registered Business Administrator
Given Login into Mobiquity Portal as System admin Checker1
When Navigate to Approvals and filter by Submitted status
And User click on Buissness Admin submitted user data
And Approve the Users
Then User status is approved
Then Logout
Given Login into Mobiquity Portal as System admin Maker after Logout
When Navigate to Manage User, and search Business Admin
And Assert Created Business Admin Mobile Number



# Author: Narendra
# Last Updated: 20/04/2022
# Comments : 
# Scenario_ID : S_42
#
@test

Scenario: Registration of Business Administrator as Customer care Admin
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on register
And Select User type as Adminstrator and click on Customer care Admin
And Enter all the details
Then Confirmation message is displayed
And Navigate to My Activity and Aplly required filters
Then Assert Created Customer care Admin Mobile Number and Write Created on time

# Author: Narendra
# Last Updated: 20/04/2022
# Comments 
# Scenario_ID : S_43
# 
@test

Scenario: Approval  to create Customer Care Admin
Given Login into Mobiquity Portal as System admin Checker1
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data for Business Admin
And Approve the Users
Then User status is approved
Then Logout
Given Login into Mobiquity Portal as System admin Maker after Logout
When Navigate to Manage User, and search Business Admin
And Assert Created Customer Admin Mobile Number


# Author: Narendra
# Last Updated:
# Comments    :
# Test Case_ID : 
# 

@prerequisite
Scenario: To verify that Master user can initiate add request of Business Admin
Given Login into Mobiquity Portal as Super admin Maker
When Navigate to User Management and click on Register
And Click On Business Admin and select Single User
And Enter all Maker required Fields for BA
Then Confirmation message is displayed

# Author: Narendra
# Last Updated:
# Comments    :
# Test Case_ID : 
# 

@prerequisite

Scenario:To verify that SuperAdmin Checker  can approve add initiation request of Business Admin.
Given Login into Mobiquity Portal as Super admin Checker
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data
And Approve the Users and save loginID for BA
Then User status is approved

# Author: Narendra
# Last Updated:
# Comments    :
# Test Case_ID : 
@prerequisite

Scenario: Checking whether we are able to login with created BusinessAdmin crendentials
Given Login into Mobiquity Portal as Business admin Created by Master




