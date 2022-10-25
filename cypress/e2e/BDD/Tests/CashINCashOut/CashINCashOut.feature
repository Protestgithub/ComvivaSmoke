Feature: Cash In



######################################################## Cashin

# Author: Chetan
# Last Updated:21-10-22
# Comments 
# Test Case_ID :16

Scenario: To verify that Business admin is able to Perform Cash in for Subscriber
Given Login into Mobiquity Portal as Business admin User3
When Navigate to Cash in or Cash out and Click on Cash in
And Enter all Mandatory details
Then Click on Submit and Click on Confirm Button 



######################################################## Cashout

# Author: Chetan
# Last Updated:21-10-22
# Comments 
# Test Case_ID :16

Scenario: To verify that Business admin is able to Perform Cash out for Subscriber
Given Login into Mobiquity Portal as Business admin User4
When Navigate to Cash in or Cash out and Click on Cash Out
And Enter all Mandatory details
Then Click on Submit and Click on Confirm Button 
