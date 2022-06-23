Feature:Transaction Correction

# Author: Kalyani M
# Last Updated:
# Comments 
# Test Case_ID : TC_91
# 

Scenario:To verify that the Valid User should able to perform Transaction correction for CASHIN,CASHOUT,P2P,MERCHANT PAYMENT. 
Given Login into Mobiquity Portal as System admin User
When Navigate to User Management and Click on manage user
And Enter Mobile number or KYC number of subscriber user
When User Click on eye button for WalletHistory
Scenario:Approve Transaction  with another Business User
Given Login into Mobiquity Portal as System admin User2
When Navigate to Transaction Correction and click on Transaction Approval


# Author: Kalyani M
# Last Updated:
# Comments 
# Test Case_ID : TC_92
# 

Scenario:To verify that when the Roll Back Service charge option is selected, then along with service charge, the applicable tax should also be rolled back
Given Login into Mobiquity Portal as System admin User
When Navigate to User Management and Click on manage user
And Enter Mobile number or KYC number of subscriber user
When User Click on eye button for WalletHistory1
Scenario:Approve Transaction  with another Business User
Given Login into Mobiquity Portal as System admin User2
When Navigate to Transaction Correction and click on Transaction Approval1

# Author: Kalyani M
# Last Updated:
# Comments 
# Test Case_ID : TC_93
# 

Scenario:To verify that when the Roll Back Commission option is selected, then along with commission, the applicable tax should also be rolled back
Given Login into Mobiquity Portal as System admin User
When Navigate to User Management and Click on manage user
And Enter Mobile number or KYC number of subscriber user
When User Click on eye button for WalletHistory2
Scenario:Approve Transaction with another Business User
Given Login into Mobiquity Portal as System admin User2
When Navigate to Transaction Correction and click on Transaction Approval2