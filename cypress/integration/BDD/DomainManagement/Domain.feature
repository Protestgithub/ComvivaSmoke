Feature: Domain Management


# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_175
# 

Scenario:To verify that proper error message should be displayed when domain code and domain name is not unique in the system
Given Login into Mobiquity Portal as System admin Maker
When User Click on Domain Management >> Add Domain
And Enter Domain Name and Domain code.
Then Click on submit buttonn