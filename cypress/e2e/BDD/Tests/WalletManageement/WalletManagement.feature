Feature: WalletManagement




# Author: Narendra
# Last Updated: /05/2022
# Comments 
# Scenario_ID : 
# TestCase_ID : TC_02
@test

Scenario: To verify that System admin should be able to view/delete/modify the Mwallet successfully.
Given Login into Mobiquity Portal as System admin Maker
When Navigate Multiple Wallet Management and Click on View Wallet


# Author: Monica D R
# Last Updated: 13-10-2022
# Comments 
# Scenario_ID :
# TC_40
@test

Scenario:To verify that the user is able to associate new wallet with MFS Provider.
Given Login into Mobiquity Portal as Super admin Checker
When Navigate to MFS provider Wallet Type Master and click Add Wallet
