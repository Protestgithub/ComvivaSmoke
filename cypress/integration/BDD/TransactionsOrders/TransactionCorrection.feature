Feature:Transaction Correction

# Author: Kalyani M
# Last Updated:
# Comments 
# Test Case_ID : TC_91
# 
@test

Scenario:To verify that the Valid User should able to perform Transaction correction 
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on manage user
And Enter Mobile number or KYC number
When User Click on eye button for WalletHistory
Then Logout
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When Navigate to Transaction Correction and click on Transaction Approval


# Author: Kalyani M
# Last Updated:
# Comments 
# Test Case_ID : TC_92
# 
@test

Scenario:To verify that when the Roll Back Service charge option is selected, then along with service charge, the applicable tax should also be rolled back
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on manage user
And Enter Mobile number or KYC number
When User Click on eye button for WalletHistory1
Then Logout
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When Navigate to Transaction Correction and click on Transaction Approval1

# Author: Kalyani M
# Last Updated:
# Comments 
# Test Case_ID : TC_93
# 
@test

Scenario:To verify that when the Roll Back Commission option is selected, then along with commission, the applicable tax should also be rolled back
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on manage user
And Enter Mobile number or KYC number
When User Click on eye button for WalletHistory2
Then Logout
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When Navigate to Transaction Correction and click on Transaction Approval2

