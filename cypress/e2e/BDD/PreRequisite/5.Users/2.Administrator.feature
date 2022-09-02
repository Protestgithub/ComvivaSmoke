Feature: User Management : 2.Administrator

    This feature includes registering, Modifying and Approval of Business Admin and
    Customer Support Admin Users by System Admin
    
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
And Navigate to My Activity and Apply Modified User filters
Then Assert Created Customer care Admin Mobile Number and Write Created on time



# Author: Narendra
# Last Updated: 22/04/2022
# Comments 
# Scenario_ID : S_50
# 
@test

Scenario: Approve/Reject delete initiation of an existing Business Admin/Customer Care Admin.
Given Login into Mobiquity Portal as System admin Checker1
When Navigate to the Approvals
And User click on submitted user data for Business Admin
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
And System Admin is able to edit details of the BA user
Then Confirm the edit details Of the User
And Navigate to My Activity and Apply Modified User filters
Then Assert Created Customer care Admin Mobile Number and Write Created on time
Then Logout
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data for Business Admin
And Approve the Users
Then User modified is approved


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
And Navigate to My Activity and Apply Modified User filters
And Assert Created Business Admin Mobile Number and Write Created on time
Then Logout
Given Login into Mobiquity Portal as System admin Maker after Logout
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data for Business Admin
And Approve the Users and Check for SMS Notification sent to user