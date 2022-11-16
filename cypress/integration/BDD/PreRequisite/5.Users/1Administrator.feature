Feature: BA and CCA Modification and Approval

    This feature includes registering, Modifying and Approval of Business Admin and
    Customer Support Admin Users by System Admin

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
And Navigate to My Activity and Apply Modified User filters
And Assert Created Business Admin Mobile Number and Write Created on time

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
And Navigate to My Activity and Apply Add User filters
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
And User click on submitted user data for CCA
And Approve the Users
Then User status is approved
Then Logout

Scenario: Assertion of created Customer Care Admin
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
And Search with EmailID
And System Admin is able to view details
And System Admin is able to edit details of the user
Then Confirm the edit details Of the User
And Navigate to My Activity and Apply Modified User filters
Then Assert Created Customer care Admin Mobile Number and Write Created on time
Then Logout

Scenario: To verify approval of initiated modification request
Given Login into Mobiquity Portal as System admin Checker1
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data
And Approve the Users
Then User modified is approved
