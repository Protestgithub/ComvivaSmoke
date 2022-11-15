Feature: User Management : 2.Administrator/Business/Subscriber

    This feature includes registering, Modifying and Approval of Business Admin and
    Customer Support Admin Users by System Admin




# Author: Arpitha
# Last Updated: 25-04-2022
# Comments 
# Scenario_ID :
# TC_

@test
Scenario:To verify that valid System admin is able to initiate AtmMachine businsess user creation .
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on register
And Select User type as Business and Select user role as AtmMachine
And Enter all the required business user details Creation for AtmMachine user role
Then Confirmation message is displayed
And Navigate to My Activity and Aplly required filters
Then Assert Created Buissness User Mobile Number and Write Created on time for AtmMachine



Scenario: To verify approval business user created for AtmMachine
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
Scenario:To verify that valid System admin is able to initiate Corporate businsess user creation .
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on register
And Select User type as Business and Select user role as Corporate
And Enter all the required business user details Creation for Corporate user role
Then Confirmation message is displayed
And Navigate to My Activity and Aplly required filters
Then Assert Created Buissness User Mobile Number and Write Created on time for Corporate



Scenario: To verify approval business user created for Corporate
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When Navigate to Approvals and filter by Submitted status 
And User click on Buissness Admin submitted user data for AtmMachine
And Approve the Users
Then User status is approved

