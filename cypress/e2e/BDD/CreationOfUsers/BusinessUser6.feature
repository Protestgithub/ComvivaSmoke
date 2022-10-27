Feature: User Management : 2.Administrator/Business/Subscriber

    This feature includes registering, Modifying and Approval of Business Admin and
    Customer Support Admin Users by System Admin


Scenario: To verify that the System admin is able to Add telco operator through user management module.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on register
And Select User type as Business and click on Telco operator
And Enter all the mandatory Basic information details and click on next
Then Enter all the mandatory Profile details like marketing profile,regulatory profile,Operator profile.
And Click on Next >> click on Confirm
Then Confirmation message
And Navigate to My Activity and Aplly required filters
Then Assert Created Buissness User Mobile Number and Write Created on time for TelcoOperator
Then Logout
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When Navigate to Approvals and filter by Submitted status 
And User click on Buisness User submitted user data
And Approve the Users
Then User status is approved

