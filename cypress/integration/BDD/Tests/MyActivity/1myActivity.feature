Feature: System Admin My Activity


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
And Navigate to My Activity and Add the required filter
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
When Navigate to My Activity and Add the required filter
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
When Navigate to My Activity and Add the required filter
And Click on Expand and Resume button
And Enter all the required details of the user
And Click the >> Submit Button
Then Confirmation message is displayed

