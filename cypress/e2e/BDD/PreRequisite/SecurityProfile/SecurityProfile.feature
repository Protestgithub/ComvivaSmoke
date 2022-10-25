Feature: SecurityProfile Creation

//----------------------------------------------------------------------------------------------------
# Author: Chetan.S
# Last Updated: 
# Comments 
# Scenario_ID :
# TC_109
@prerequisite

#subscriber
Scenario:To verify that security profiles can be configured in the system for different type of users under different workspaces.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to Security and click to select security profile
And Click on add profile select user type as subscriber and fill the details
And Fill the details-Subscriber Profile Name
And Fill the details-PasswordRestrictios
And Fill the details-PinRestrictions
And Fill the details-AuthRestrictions
And Fill the details-loginRestrictions
Then Click on add and confirm
