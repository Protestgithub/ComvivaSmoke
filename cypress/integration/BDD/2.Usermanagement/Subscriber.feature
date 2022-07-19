Feature: User Management : Subscriber

    This feature includes registering, Modifying and Approval of Business Admin and
    Customer Support Admin Users by System Admin



# Author: Narendra
# Last Updated: 27/04/2022
# Comments 
# Scenario_ID : 
# TestCase_ID : TC_182
@test

Scenario:To verify that proper error message should  be displayed when email id/contact number is not verified.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on register
And Select User type as Subscriber and click on Subscriber
Then Fill all required details and Enter Email and Contact Number which are not verified and confirm Error message
 
 
# Author: Narendra
# Last Updated: 27/04/2022
# Comments 
# Scenario_ID : 
# TestCase_ID : TC_183
@test

Scenario: To verify that immidiate error message should be displayed whne any invalid value is entered by the user.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on register
And Select User type as Subscriber and click on Subscriber
Then Fill all required details and Enter Invalid value and confirm Error message


# Author: Narendra
# Last Updated: 27/04/2022
# Comments 
# Scenario_ID : 
# TestCase_ID : TC_184
@test

Scenario: To verify that proper error message should  be displayed when Email id/contact number is not verified
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on register
And Select User type as Subscriber and click on Subscriber
And Fill all required details and Enter Email and Contact Number which are not verified and confirm Error message
And Enter all the mandatory KYC details and click on next
Then Enter all the marketing ,regulatory, authorization profile details and click on next


# Author: Narendra
# Last Updated: 27/04/2022
# Comments 
# Scenario_ID : 
# TestCase_ID : TC_185
@test

Scenario: To verify that immidiate Error Message should be displayed whne any invalid value is Entered by the user.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on register
And Select User type as Subscriber and click on Subscriber
And Fill all required details and Enter Invalid value and confirm Error message
And Enter all the mandatory KYC details and click on next
Then Enter all the marketing ,regulatory, authorization profile details and click on next


# Author: Narendra
# Last Updated: 27/04/2022
# Comments 
# Scenario_ID : 
# TestCase_ID : TC_187
@test

Scenario: To verify that Proper error message should be When contact Number/ Email  is registered in the system
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on register
And Select User type as Subscriber and click on Subscriber
And Fill all required details and enter registered EmailID and confirm Error message
And Enter all the mandatory KYC details and click on next
Then Enter all the marketing ,regulatory, authorization profile details and click on next



##################################### Chethan ###########################################################


# Author: Chetan.S
# Last Updated: 25-04-2022
# Comments 
# Scenario_ID :
# TC_68
@test

Scenario:To verify that valid SystemAdmin/businsess User is able to initiate Subscriber creation.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on register
And Select User type as Subscriber and click on Subscriber
And Enter all the required subscriber details
Then SubscrigReg Confirmation message is displayed

# Author: Chetan.S
# Last Updated: 25-04-2022
# Comments 
# Scenario_ID :
# TC_69
@test

Scenario:To verify that another System Admin/businsess User is able to approve the initiated Subscriber creation.
Given Login into Mobiquity Portal as System admin Checker1
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data
And Approve the Users
Then Added User status is approved

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
Then Confirm the edit details

# Author: Chetan.S
# Last Updated: 25-04-2022
# Comments 
# Scenario_ID :
# TC_71
@test

Scenario:To verify that another System Admin/businsess User is able to approve the Modified Subscriber Data.
Given Login into Mobiquity Portal as System admin Checker1
When Navigate to Approvals and filter by Modification of user status
And User click on submitted user data
And Approve the Users
Then Edited User status is approved
 
# Author: Chetan.S
# Last Updated: 25-04-2022
# Comments 
# Scenario_ID :
# TC_73
@test


Scenario:To verify that the System Admin is able to suspend a subscriber successfully through web.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on manage user
And enter user mobile number and search the SuspendResume user
And System Admin is able to view details
And Suspend the user by giving the comment
Then Verify the user suspend Confirmation message

# Author: Chetan.S
# Last Updated: 25-04-2022
# Comments 
# Scenario_ID :
# TC_73
@test


Scenario:To verify that the System Admin is able to Approve the suspended user
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When Navigate to Approvals
And Admin click on Suspended user data
And Approve to suspended the Users
Then Verify the user Suspended approval message

# Author: Chetan.S
# Last Updated: 25-04-2022
# Comments 
# Scenario_ID :
# TC_74

@test

Scenario:To verify that the System Admin is able to resume a suspend subscriber successfully through web.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on manage user
And enter user mobile number and search the SuspendResume user
And Resume the user by giving the comment
Then Verify the user resume Confirmation message

# Author: Chetan.S
# Last Updated: 25-04-2022
# Comments 
# Scenario_ID :
# TC_74

@test

Scenario:To verify that the System Admin is able to approve the resumed user.
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When Navigate to Approvals
And Admin click on Resumeded user data
And Approve the Resumed User
Then Verify the user Resumed approval message


############################################## Kalyani ####################################################


# Author: Kalyani M
# Last Updated:
# Comments 
# Test Case_ID : TC_52_Business admin_LowerHierarchy
# 
@test

Scenario: To verify that Business admin is able to  view Lower_Hierarchy details 
Given Login into Mobiquity Portal as Business admin User1
When Navigate to User Management and Click on manage user
And Enter Mobile number or KYC number in Search
When User Click on eye button 
Then Verify View Details Page

# Author: Kalyani M
# Last Updated:
# Comments  :Business admin able to  View Subscriber Details
# Test Case_ID : TC_90
# 
@test


Scenario:To verify that Business admin able to view subscriber details
Given Login into Mobiquity Portal as Business admin User1
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

Scenario:To verify that Super admin maker able to view subscriber details
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

Scenario: To verify that Business admin is able to  Lower Hierarchy details
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on manage user
And Enter Mobile number of subscriber in search
When User Click on eye button 
Then Verify View Details Page

########################################## Arpitha ###############################################


# Author: Arpitha C
# Last Updated: 26/05/2022
# Comments : 
# Scenario_ID : SC_169 

@test


Scenario:To verify that proper error message should be displayed when login id is already registered in the system.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on register
And Select User type as Business and Select Corporate
And Enter registered login id value
Then Login id Error message is displayed

# Author: Arpitha C
# Last Updated: 26/05/2022
# Comments : 
# Scenario_ID : SC_170 
@test


Scenario:To verify that proper error message should be displayed when Email Id  is registered in the system.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on register
And Select User type as Business and Select Corporate
And Enter registered email id value
Then Email Error message is displayed


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

# Author:Monica
# Last Updated:
# Comments 
# Scenario_ID : TC_140
# 
@test

Scenario:To Verify that Admin user can unlock user’s wallet as sender or receiver or both.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on manage user
And Enter Mobile number and KYC number in search menu1
And Click on view Details and Click on Account info
And select either UNLock outgoing payments or UNLock incoming payments or Lock both
Then Click On UNLock

# Author: Chetan.S
# Last Updated: 25-04-2022
# Comments 
# Scenario_ID :
# TC_72

@test


Scenario:To verify that modification message is sent to Subscriber successfully.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to User Management and Click on manage user
And enter user mobile number and search the user
And System Admin is able to view details
And System Admin is able to edit KYC details
Then Confirm the edit details
Then Logout
Given Login into Mobiquity Portal as another System admin Checker1 after logout
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data
Then verify message sent to user

