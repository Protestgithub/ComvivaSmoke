Feature: WalletManagement



# Author: Narendra
# Last Updated: /05/2022
# Comments 
# Scenario_ID : 
# TestCase_ID : TC_02
@test

Scenario: To verify that System admin should be able to view/delete/modify the Mwallet successfully.
Given Login into Mobiquity Portal as System admin Maker
When Navigate Multiple Wallet Management and Click on Modify Wallet
And Click on Added Wallet and Click on Update


# Author: Narendra
# Last Updated: /05/2022
# Comments 
# Scenario_ID : 
# TestCase_ID : TC_03
@test

Scenario: To verify that System admin is not able to Add wallet with the same name of already existing wallet.
Given Login into Mobiquity Portal as System admin Maker
When Navigate Multiple Wallet Management and Click on Add Wallet
And Enter Wallet name and click on Save
