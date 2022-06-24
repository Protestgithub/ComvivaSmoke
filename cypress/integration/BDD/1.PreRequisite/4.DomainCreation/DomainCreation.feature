Feature: Domain Creation

##################################### Domain Creation ################################################


# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_08
# 

Scenario:To verify that System admin should be able to add domain in the system.
Given Login into Mobiquity Portal as System admin Maker
When User Click on Domain Management >> Add Domain
And Enter Domain Name and Domain Code.
Then Click on submit button.
