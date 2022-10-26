Feature: User Management : 2.Administrator/Business/Subscriber

    This feature includes registering, Modifying and Approval of Business Admin and
    Customer Support Admin Users by System Admin



# Author: Arpitha
# Last Updated: 25-04-2022
# Comments 
# Scenario_ID :
# TC_

@test
Scenario:To verify that valid System admin is able to initiate HeadMerchant businsess user creation .
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on register
And Select User type as Business and Select user role as HeadMerchant
And Enter all the required business user details Creation for HeadMerchant user role
Then Confirmation message is displayed
And Navigate to My Activity and Aplly required filters
Then Assert Created Buissness User Mobile Number and Write Created on time for HeadMerchant



Scenario: To verify approval business user created for HeadMerchant
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When Navigate to Approvals and filter by Submitted status 
And User click on Buissness Admin submitted user data for AtmMachine
And Approve the Users
Then User status is approved



# Author: Arpitha
# Last Updated: 25-04-2022
# Comments 
# Scenario_ID :
# TC_

@test
Scenario:To verify that valid System admin is able to initiate Merchant businsess user creation .
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on register
And Select User type as Business and Select user role as Merchant
And Enter all the required business user details Creation for Merchant user role
Then Confirmation message is displayed
And Navigate to My Activity and Aplly required filters
Then Assert Created Buissness User Mobile Number and Write Created on time for Merchant



Scenario: To verify approval business user created for Merchant
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When Navigate to Approvals and filter by Submitted status 
And User click on Buissness Admin submitted user data for AtmMachine
And Approve the Users
Then User status is approved


