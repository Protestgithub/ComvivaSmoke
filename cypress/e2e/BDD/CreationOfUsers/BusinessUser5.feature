Feature: User Management : 2.Administrator/Business/Subscriber

    This feature includes registering, Modifying and Approval of Business Admin and
    Customer Support Admin Users by System Admin






# Author:Rakesh
# Last Updated: 19-10-2022
# Comments 
# Scenario_ID :
# TC_

@test

Scenario:To verify that valid System admin/Business Admin is able to initiate Payment Gateway businsess user creation.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on register
And Select User type as Business and Select user role and click on Payment Gateway
And Enter all the required business user details for Payment gateway
Then Click on Submit Button and Verify the success message text
Then Confirmation message is displayed
And Navigate to My Activity and Aplly required filters
Then Assert Created Buissness User Mobile Number and Write Created on time for PaymentGateway



Scenario: To verify approval business user created for PaymentGateway
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When Navigate to Approvals and filter by Submitted status 
And User click on Buissness Admin submitted user data for AtmMachine
And Approve the Users
Then User status is approved