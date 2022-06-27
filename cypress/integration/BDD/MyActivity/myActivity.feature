Feature: My Activity


    This feature includes registering, Modifying and Approval of Business Admin and 
    Customer Support Admin Users by System Admin


####################################### My Activity ################################################################


# Author: Narendra
# Last Updated: 10/05/2022
# Comments 
# Scenario_ID : 
# TestCase_ID : TC_123
@test

Scenario: To verify that system user can manage user registration application, which are not approved like saved,submitted users and rejected users
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on register
And Select User type as Adminstrator and click on Customer care Admin
And Enter all the User details
And Navigate to My Activity and Add the not Approved filters
Then Click on Expand and View Details button


# Author: Narendra
# Last Updated: 10/05/2022
# Comments 
# Scenario_ID : 
# TestCase_ID : TC_124
@test

Scenario: To verify that system user can view existing details of user's under saved filter whose registration initiation is incomplete
Given Login into Mobiquity Portal as System admin Maker
When Navigate to My Activity and Add the required filter
Then Click on Expand and View Details button


# Author: Narendra
# Last Updated: 11/05/2022
# Comments 
# Scenario_ID : 
# TestCase_ID : TC_125
@test

Scenario: To verify that system user can Add/edit details of user's whose registration is incomplete
Given Login into Mobiquity Portal as System admin Maker
When Navigate to My Activity and Add the not Approved filters
And Click on Expand and Resume button
And Enter all the required details of the user


# Author: Narendra
# Last Updated: 11/05/2022
# Comments 
# Scenario_ID : 
# TestCase_ID : TC_126
@test

Scenario: To verify that system user can Send for approval of user's whose registration is Incomplete
Given Login into Mobiquity Portal as System admin Maker
When Navigate to My Activity and Add the not Approved filters
And Click on Expand and Resume button
And Enter all the required details of the user
And Click the >> Submit Button
Then Confirmation message is displayed

# Author: Narendra
# Last Updated: 12/05/2022
# Comments 
# Scenario_ID : 
# TestCase_ID : TC_127
@test

Scenario: To verify that system user can Withdraw application of user's whose registration is incomplete and sent for Approval
Given Login into Mobiquity Portal as System admin Maker
When Navigate to My Activity and Add the not Approved filters
Then Click on Expand and Withdraw button

# Author: Narendra
# Last Updated: 12/05/2022
# Comments 
# Scenario_ID : 
# TestCase_ID : TC_128

@test

Scenario: To verify that system user can Send for approval of user's whose Registration rejected by approver.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on register
And Select User type as Adminstrator and click on Customer care Admin
And Enter all the details
Then Confirmation message is displayed
Then Logout
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data
And Reject the Users
Then Logout
Given Login into Mobiquity Portal as System admin Maker after Logout
And Navigate to My Activity and Add the Reject filter
And Click on Expand and Resume button
And Enter all the required details of the user
And Click the >> Submit Button
Then Confirmation message is displayed



