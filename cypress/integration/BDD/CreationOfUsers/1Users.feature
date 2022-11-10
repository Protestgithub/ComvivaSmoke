Feature: Subscriber and Business Admin Creation

    This feature includes registering, Modifying and Approval of Subscriber and  Business Admin
    Users by System Admin


# Author: Chetan.S
# Last Updated: 25-04-2022
# Comments 
# Scenario_ID :
# TC_68
@test

Scenario:To verify that valid SystemAdmin/businsess User is able to initiate Subscriber creation.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on register
And Select User type as Subscriber and click on Subscribers
And Enter all the required subscriber details
Then Confirmation message is displayed
When Navigate to My Activity and Apply required filters
Then Assert Created Subscriber Mobile Number and Write Created on time

# Author: Chetan.S
# Last Updated: 25-04-2022
# Comments 
# Scenario_ID :
# TC_69
@test

Scenario:To verify that another System Admin/businsess User is able to approve the initiated Subscriber creation.
Given Login into Mobiquity Portal as System admin Checker1
When Navigate to Approvals and filter by Submitted status
And User click on Subscriber submitted user data
And Approve the Users
Then Added User status is approved



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
When Navigate to My Activity and Apply required filters
And Assert Created Business Admin Mobile Number and Write Created on time


# Author: Automation Tester 2
# Last Updated: 18/03/2022
# Comments
# Scenario_ID : S_02
#
@test

Scenario: Approval of registered Business Administrator
Given Login into Mobiquity Portal as System admin Checker1
Then Navigate to Approvals and filter by Submitted status
And User click on Buissness Admin submitted user data
And Approve the Users
Then User status is approved
Then Logout
Given Login into Mobiquity Portal as System admin Maker
When Navigate to Manage User, and search Business Admin
And Assert Created Business Admin Mobile Number


