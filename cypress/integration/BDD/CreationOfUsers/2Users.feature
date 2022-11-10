Feature: Business User Creation

    This feature includes registering and approval of Business User


# Author: Arpitha
# Last Updated: 25-04-2022
# Comments 
# Scenario_ID :
# TC_53

@test

Scenario:To verify that valid System admin/Business Admin is able to initiate businsess user creation for O2C
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on register
And Select User type as Business and Select user role
And Enter all the required business user details for O2C
Then Confirmation message is displayed
And Navigate to My Activity and Aplly required filters
Then Assert Created Buissness User Mobile Number and Write Created on time for O2C


Scenario: To verify approval business user created for o2c
Given Login into Mobiquity Portal as System admin Checker1
When Navigate to Approvals and filter by Submitted status 
And User click on Buissness User submitted user data for O2C
And Approve the Users
Then User status is approved

# Author: Arpitha
# Last Updated: 25-04-2022
# Comments 
# Scenario_ID :
# TC_53

@test

Scenario:To verify that valid System admin/Business Admin is able to initiate businsess user creation.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on register
And Select User type as Business and Select user role
And Enter all the required business user details
Then Confirmation message is displayed
And Navigate to My Activity and Aplly required filters
Then Assert Created Buissness User Mobile Number and Write Created on time

# Author: Arpitha
# Last Updated: 25-04-2022
# Comments 
# Scenario_ID :
# TC_54

@test

Scenario:To verify that another System Admin/businsess User  is able to approve the initiated business user creation.
Given Login into Mobiquity Portal as System admin Checker1
When Navigate to Approvals and filter by Submitted status 
And User click on Buisness User submitted user data
And Approve the Users
Then User status is approved



############################################## Kalyani ####################################################

# Author: Kalyani M
# Last Updated:
# Comments 
# Test Case_ID : TC_51_Business admin
# 
@test

Scenario: To verify that Business admin is able to  view Self details 
Given Login into Mobiquity Portal as Business admin User1
When Navigate to User Management and Click on manage user
And Enter Mobile number or KYC number in search
When User Click on eye button 
Then Verify View Details Page

# Author: Kalyani M
# Last Updated:
# Comments 
# Test Case_ID : TC_52_Business admin_LowerHierarchy/TC_90
# 
@test

Scenario: To verify that Business admin is able to  view Lower_Hierarchy/Subscriber details 
Given Login into Mobiquity Portal as Business admin User2
When Navigate to User Management and Click on manage user
And Enter Mobile number or KYC number in Search
When User Click on eye button 
Then Verify View Details Page


