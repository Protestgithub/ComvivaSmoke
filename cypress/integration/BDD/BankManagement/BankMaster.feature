Feature: Bank Management

    This feature includes registering, Modifying and Approval of Business Admin and
    Customer Support Admin Users by System Admin

# Author: Narendra
# Last Updated: /05/2022
# Comments 
# Scenario_ID : 
# TestCase_ID : TC_06
@test

Scenario: To verify that the Proper error message should get generated on screen if user add bank on web without entering Bank Name
Given Login with Master Admin Checker
When Navigate to Bank Master and Click on it
And Enter all the details Except Bank Name
Then Confirm the Error message


# Author: Narendra
# Last Updated: /05/2022
# Comments 
# Scenario_ID : 
# TestCase_ID : TC_07
@test

Scenario: To verify that the master should be able to associate or disassociate services of bank
Given Login with Master Admin Checker
When Navigate to MFS provider Bank type master and Click on Modify or Delete Bank
Then Select the bank and associate new services
