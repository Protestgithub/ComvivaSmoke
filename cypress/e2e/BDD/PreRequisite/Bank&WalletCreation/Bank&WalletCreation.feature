Feature: WalletManagement

######################################### Bank Creation ############################################

# Author: Narendra
# Last Updated: /05/2022
# Comments 
# Scenario_ID : 
# TestCase_ID : TC_04
@prerequisite

Scenario: To verify that master is able to Add Bank successfully
Given Login with Master Admin Checker
When Navigate to Bank Master and Click on it
And Enter All the Required Details


##################################### wallet Creation ################################################

# Author: Narendra
# Last Updated: /05/2022
# Comments 
# Scenario_ID : 
# TestCase_ID : TC_01
@prerequisite

Scenario: To verify that System admin is able to Add wallet successfully.
Given Login into Mobiquity Portal as System admin Maker
When Navigate Multiple Wallet Management and Click on Add Wallet
And Enter Wallet name and click on save