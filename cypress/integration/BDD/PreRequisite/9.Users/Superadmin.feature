Feature: User Management : Super admin






# Author: Kalyani M
# Last Updated:
# Comments    :
# Test Case_ID : TC_44_sysadmin
@test

Scenario: To verify that master admin can initiate and approve modification request of an System admin/ Bank admin.
Given Login into Mobiquity Portal as Super admin Maker
When Navigate to User Management and Click on manage user
And Enter Mobile number or KYC number of System admin in Search
When User Click on eye button
And Click on edit
And Edit the required details >> Click on Next
And Click on save
#Then Verify Sucess Message
Then Logout 
Given Login into Mobiquity Portal as Super admin Checker after Logout
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data
And User click on approve

