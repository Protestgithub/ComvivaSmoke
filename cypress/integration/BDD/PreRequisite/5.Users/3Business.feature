Feature: Resumption of Business User



###################################### Kalyani ####################################################


# Author: Kalyani M
# Last Updated:
# Comments : Business User Suspension
# Test Case_ID : TC_59

Scenario: To Verify that System Admin/Business Admin can resume suspension of the businsess user.
Given Login into Mobiquity Portal as System admin Maker after Logout
When Navigate to User Management and Click on manage user
And  Enter Mobile number and KYC number in search for suspension
When User Click on eye button 
Then Verify View Details Page
Then Click on Suspend user icon
And  write comments to Suspend user
And  click on yes
Then Verify the user resume Confirmation message
And Navigate to My Activity and Apply Modified User filters
And Assert Buissness User Mobile Number for Suspension and Write Created on time


# Author: Kalyani M
# Last Updated:
# Comments  :Approval
# Test Case_ID : TC_60
# 

@test

Scenario: To verify that SystemAdmin/Business Admin can initiate resumption of an suspended businsess user.
Given Login into Mobiquity Portal as System admin Checker1
When Navigate to Approvals and  click on suspended data
And User click on Suspended submitted user data
And Approve the Users
Then User status is Suspended

Scenario:Asserting the Suspended business user login 
Given Login into Mobiquity Portal as Business admin User

# Author: Kalyani M
# Last Updated:
# Comments   : Business user Resumption
# Test Case_ID : TC_61
# 

@test

Scenario: To verify that System admin is able to  Resume the details of searched user
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on manage user
And Enter Mobile number and KYC number in search for suspension
When User Click on eye button 
Then Verify View Details Page
Then Click on Suspend user icon
And  write comments to Suspend user
And  click on yes
Then Verify the user resume Confirmation message
And Navigate to My Activity and Apply Modified User filters
And Assert Buissness User Mobile Number for Suspension and Write Created on time


# Author: Kalyani M
# Last Updated:
# Comments  : Approval
# Test Case_ID : TC_62
# 
@test

Scenario: System Admin/Business Admin can approve resumption initiate of an suspended businsess user.
Given Login into Mobiquity Portal as System admin Checker1
When Navigate to Approvals and filter by Submitted status
And User click on Suspended submitted user data
And Approve the Users
Then User status is Resumed

Scenario:Asserting the Resumed business user login 
Given Login into Mobiquity Portal as Business admin User1


# Author: Kalyani M
# Last Updated:
# Comments : Business User Suspension for O2C
# Test Case_ID : TC_59

Scenario:  Suspension of the businsess user for O2C
Given Login into Mobiquity Portal as System admin Maker after Logout
When Navigate to User Management and Click on manage user
And  Enter Mobile number and KYC number in search for suspension
When User Click on eye button 
Then Verify View Details Page
Then Click on Suspend user icon
And  write comments to Suspend user
And  click on yes
Then Verify the user resume Confirmation message
And Navigate to My Activity and Apply Modified User filters
And Assert Buissness User Mobile Number for Suspension and Write Created on time
Then Logout
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When Navigate to Approvals and  click on suspended data
And User click on Suspended submitted user data
And Approve the Users
Then User status is Suspended



#Author: Arpitha C
# Last Updated: 25/04/2022
# Comments : refered here is narendra 
# Scenario_ID : TC_55
@test

Scenario:To verify that after successful creation of the businsess user, notification should be sent to the user
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on register
And Select User type as Business and Select user role
And Enter all the required business user details
Then Confirmation message is displayed
When Navigate to My Activity and Apply Add User filters
Then Assert Created Buissness User Mobile Number and Write Created on time
Then Logout
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When Navigate to Approvals and filter by Submitted status 
And User click on submitted user data
And Approve the Users and Check for SMS Notification sent to user