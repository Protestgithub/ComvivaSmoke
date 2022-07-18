Feature: User Management : Administrator

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



# Author: Automation Tester 2
# Last Updated: 18/03/2022
# Comments
# Scenario_ID : S_02
#
@test

Scenario: Approval of registered Business Administrator
Given Login into Mobiquity Portal as System admin Checker1
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data
And Approve the Users
Then User status is approved
Then Logout
Given Login into Mobiquity Portal as System admin Maker after Logout
When Navigate to Manage User, and search Business Admin
And Assert Created Business Admin Mobile Number

# Author: Automation Tester 1
# Last Updated: 21/03/2022
# Comments
# Scenario_ID : S_03
#
@test


Scenario: System Admin is able to initiate modification request of Business Admin
Given Login into Mobiquity Portal as System admin Checker1
When Navigate to Manage User, and search Business Admin
And Search Business Admin
And System Admin is able to view details
And System Admin is able to edit details
Then Confirm the edit details


# Author:
# Last Updated:
# Comments
# Scenario_ID : S_04
#
@test

Scenario: System Admin is able to approve of modification request of Business Admin
Given Login into Mobiquity Portal as System admin Maker
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data
And Approve the Users
Then User modified is approved


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

# Author: Narendra
# Last Updated: 20/04/2022
# Comments 
# Scenario_ID : S_43
# 
@test

Scenario: Approval  to create Customer Care Admin
Given Login into Mobiquity Portal as System admin Checker1
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data
And Approve the Users
Then User status is approved
Then Logout
Given Login into Mobiquity Portal as System admin Maker
When Navigate to Manage User, and search Business Admin
And Assert Created Customer Admin Mobile Number

# Author: Narendra
# Last Updated: 21/04/2022
# Comments 
# Scenario_ID : S_45
# 
@test

Scenario: System admin should be able to Initite modification searching with all values (Mobile,Email and Login)
Given Login into Mobiquity Portal as System admin Maker
When Navigate to Manage User, and search Business Admin
And Search with Mobile Number
And System Admin is able to view details
And System Admin is able to edit details of the user
Then Confirm the edit details Of the User
Then Logout
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data
And Approve the Users
Then User modified is approved

Then Logout
Given Login into Mobiquity Portal as System admin Maker after Logout
When Navigate to Manage User, and search Business Admin
And Search with EmailID
And System Admin is able to view details
And System Admin is able to edit details of the user
Then Confirm the edit details Of the User
Then Logout
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data
And Approve the Users
Then User modified is approved

Then Logout
Given Login into Mobiquity Portal as System admin Maker after Logout
When Navigate to Manage User, and search Business Admin
And Search with LoginID
And System Admin is able to view details
And System Admin is able to edit details of the user
Then Confirm the edit details Of the User
Then Logout
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data
And Approve the Users
Then User modified is approved



# Author: Narendra
# Last Updated: 22/04/2022
# Comments 
# Scenario_ID : S_48
# 
@test

Scenario: System admin should be able to initiate deletion of an existing Business Admin/Customer Care Admin.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to Manage User, and search Business Admin
And Search Business or Customer care Admin
Then System Admin is able to Delete the User


# Author: Narendra
# Last Updated: 22/04/2022
# Comments 
# Scenario_ID : S_50
# 
@test

Scenario: Approve/Reject delete initiation of an existing Business Admin/Customer Care Admin.
Given Login into Mobiquity Portal as System admin Checker1
When Navigate to the Approvals
And User click on submitted user data
Then Reject the Users

# Author: Narendra
# Last Updated: 21/04/2022
# Comments 
# Scenario_ID : S_49
# 
@test

Scenario: To verify that System admin can approve modification request of an existing Business Admin/Customer Care Admin
Given Login into Mobiquity Portal as System admin Maker
When Navigate to Manage User, and search Business Admin
And Search with Mobile Number
And System Admin is able to view details
And System Admin is able to edit details of the user
Then Confirm the edit details Of the User
Then Logout
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data
And Approve the Users
Then User modified is approved

# Author: Kalyani M
# Last Updated:
# Comments 
# Test Case_ID : TC_51_Business admin
# 
@test

Scenario: To verify that Business admin is able to  view Self details 
Given Login into Mobiquity Portal as Business admin User1
When Navigate to User Management and Click on manage user
And Enter Mobile number or KYC number in search
When User Click on eye button 
Then Verify View Details Page



# Author: Narendra
# Last Updated: 22/04/2022
# Comments 
# Scenario_ID : S_46
# 
@test

Scenario: To verify that the Proper SMS Notification & E>>mail should be sent to users after addition/modification/deletion in system. (If configured)
Given Login into Mobiquity Portal as System admin Checker1
When Navigate to Manage User, and search Business Admin
And Search Business Admin
And System Admin is able to view details
And System Admin is able to edit details
Then Confirm the edit details
Then Logout
Given Login into Mobiquity Portal as System admin Maker after Logout
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data
And Approve the Users and Check for SMS Notification sent to user