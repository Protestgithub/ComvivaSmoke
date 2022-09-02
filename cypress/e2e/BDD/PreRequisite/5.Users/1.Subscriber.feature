Feature: User Management : Subscriber

    This feature includes registering, Modifying and Approval of Business Admin and
    Customer Support Admin Users by System Admin
##################################### Chethan ###########################################################

 

# Author: Chetan.S
# Last Updated: 25-04-2022
# Comments 
# Scenario_ID :
# TC_Prerequistite for suspension/Resumption
@test

Scenario:To verify that valid SystemAdmin/businsess User is able to initiate Subscriber creation for suspension and Resumption
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on register
And Select User type as Subscriber and click on Subscribers
And Enter all the required subscriber details for suspension and Resumption
Then SubscrigReg Confirmation message is displayed
And Navigate to My Activity and Apply Add User filters
Then Assert Suspension creation Subscriber Mobile Number and Write Created on time


# Author: Chetan.S
# Last Updated: 25-04-2022
# Comments 
# Scenario_ID :
# TC_Prerequistite for suspension/Resumption
@test

Scenario:To verify that another System Admin/businsess User is able to approve the initiated Subscriber creation for suspension and Resumption
Given Login into Mobiquity Portal as System admin Checker1
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data for Subscriber
And Approve the Users
Then Added User status is approved


# Author: Chetan.S
# Last Updated: 25-04-2022
# Comments 
# Scenario_ID :
# TC_73
@test


Scenario:To verify that the System Admin is able to suspend a subscriber successfully through web.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on manage user
And enter user mobile number and search the SuspendResume user
And System Admin is able to view details
And Suspend the user by giving the comment
Then Verify the user suspend Confirmation message
And Navigate to My Activity and Apply Modified User filters
Then Assert Suspension of Subscriber Mobile Number and Write Created on time

# Author: Chetan.S
# Last Updated: 25-04-2022
# Comments 
# Scenario_ID :
# TC_73
@test


Scenario:To verify that the System Admin is able to Approve the suspended user
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When Navigate to Approvals
And Admin click on Suspended user data
And Approve to suspended the Users
Then Verify the user Suspended approval message


# Author: Chetan.S
# Last Updated: 25-04-2022
# Comments 
# Scenario_ID :
# TC_74

@test

Scenario:To verify that the System Admin is able to resume a suspend subscriber successfully through web.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on manage user
And enter user mobile number and search the SuspendResume user
And Resume the user by giving the comment
Then Verify the user resume Confirmation message
And Navigate to My Activity and Apply Modified User filters
Then Assert Suspension of Subscriber Mobile Number and Write Created on time


# Author: Chetan.S
# Last Updated: 25-04-2022
# Comments 
# Scenario_ID :
# TC_74

@test

Scenario:To verify that the System Admin is able to approve the resumed user.
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When Navigate to Approvals
And Admin click on Resumeded user data
And Approve the Resumed User
Then Verify the user Resumed approval message


