# Author: Chetan.S
# Last Updated: 25-04-2022
# Comments 
# Scenario_ID :
# TC_68
@test

Scenario:To verify that valid SystemAdmin/businsess User is able to initiate Subscriber creation.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on register
And Select User type as Subscriber and click on Subscriber
And Enter all the required subscriber details
Then SubscrigReg Confirmation message is displayed

# Author: Chetan.S
# Last Updated: 25-04-2022
# Comments 
# Scenario_ID :
# TC_69
@test

Scenario:To verify that another System Admin/businsess User is able to approve the initiated Subscriber creation.
Given Login into Mobiquity Portal as System admin Checker1
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data
And Approve the Users
Then Added User status is approved

