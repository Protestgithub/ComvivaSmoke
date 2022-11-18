Feature: Transfer Control Profile error message and customer level TCP view



# Author: Kalyani M
# Last Updated:
# Comments : Error Message_provider
# Test Case_ID : TC_24
# 
@test

Scenario:To verify the error message when Provider is empty.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to Transfer Control Profile and Click on Manage Transfer Level TCP
And  Click on Add New Button
And  Click on Create Button
Then Verify Error Message for Provider

# Author: Kalyani M
# Last Updated:
# Comments : Error Message_Domain
# Test Case_ID : TC_24
# 
@test

Scenario:To verify the error message when Domain is empty.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to Transfer Control Profile and Click on Manage Transfer Level TCP
And  Click on Add New Button
And  Click on Create Button
Then Verify Error Message for Domain

# # Author: Kalyani M
# # Last Updated:
# # Comments : View
# # Test Case_ID : TC_25
# #
# @test

# Scenario:To verify that master is able to View customer level TCP..
# Given Login into Mobiquity Portal as Super admin Maker
# When  Navigate to Transfer Control Profile to View Details


