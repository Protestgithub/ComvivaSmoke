Feature: User Management : Subscriber

    This feature includes registering, Modifying and Approval of Business Admin and
    Customer Support Admin Users by System Admin

# Author: Chetan.S
# Last Updated: 25-04-2022
# Comments 
# Scenario_ID :
# TC_70
@test

Scenario:To verify that System Admin/businsess user is able to modify Subscriber successfully.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on manage user
And enter user mobile number and search the user
And System Admin is able to view details
And System Admin is able to edit subscriber details
Then Confirm the edit details Of the User
And Navigate to My Activity and Apply Modified User filters
Then Assert Created Subscriber Mobile Number and Write Created on time

# Author: Chetan.S
# Last Updated: 25-04-2022
# Comments 
# Scenario_ID :
# TC_71
@test

Scenario:To verify that another System Admin/businsess User is able to approve the Modified Subscriber Data.
Given Login into Mobiquity Portal as System admin Checker1
When Navigate to Approvals and filter by Modification of user status
And User click on submitted user data for Subscriber
And Approve the Users
Then Edited User status is approved

############################################## Kalyani ####################################################



# Author: Kalyani M
# Last Updated:
# Comments   :
# Test Case_ID : TC_90
# 
@test


Scenario:To verify that System admin able to view subscriber details
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on manage user
And Enter Mobile number or KYC number in Search
When User Click on eye button
Then Verify View Details Page

# Author: Kalyani M
# Last Updated:
# Comments   :
# Test Case_ID : TC_90
# 
@test

Scenario:To verify that Super admin maker able to view Subscriber details
Given Login into Mobiquity Portal as Super admin Maker
When Navigate to User Management and Click on manage user
And Enter Mobile number or KYC number in Search
When User Click on eye button

# Author: Kalyani M
# Last Updated:
# Comments 
# Test Case_ID : TC_52_Sysadmin checking lower Hierarchy details
#
@test

Scenario: To verify that System admin is able to  Lower Hierarchy details
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on manage user
And Enter Mobile number of subscriber in search
When User Click on eye button 
Then Verify View Details Page


###################################### Monica ###########################################################

# Author:Monica
# Last Updated:
# Comments 
# Scenario_ID : TC_136
# 
@test

Scenario:To verify that user can view details of all wallets associated with the user along with their corresponding balances and status successfully.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on manage user
And Enter Mobile number and KYC number in search menu1
And Click on view Details and Click on Account info
Then Check All Wallet Details

# Author:
# Last Updated:
# Comments 
# Scenario_ID :TC_137
# 
@test

Scenario:To verify that Admin user can lock user’s wallet as sender or receiver or both.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on manage user
And Enter Mobile number and KYC number in search menu1
And Click on view Details and Click on Account info
And select either Lock outgoing payments or Lock incoming payments or Lock both
Then Click On lock all
    
# Author:
# Last Updated:
# Comments 
# Scenario_ID : TC_142
# 
@test

Scenario:To verify that admin user can reset the credentials of Business user and customer's successfully.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on manage user
And Enter Mobile number and KYC number in search menu1
And Click on view Details and Click on Credentials
And Click on refresh icon corresponding to the respective authentication factor