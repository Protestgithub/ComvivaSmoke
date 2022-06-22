Feature: Pre-Requisite


############################################### SysAdmin Creation #######################################

# Author: Kalyani M
# Last Updated:
# Comments    :
# Test Case_ID : TC_40_sysadmin
# 


Scenario: To verify that Master user can initiate add request of System admin
Given Login into Mobiquity Portal as Super admin Maker
When Navigate to User Management and click on Register
And Click On System Admin and select Single User
And Enter all required Fields
Then Confirmation message is displayed

# Author: Kalyani M
# Last Updated:
# Comments    :
# Test Case_ID : TC_41_sysadmin
# 


Scenario:To verify that Master user can approve add initiation request of System admin.
Given Login into Mobiquity Portal as Super admin Checker
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data
And Approve the Users and save loginID
Then User status is approved

# Author: Kalyani M
# Last Updated:
# Comments    :
# Test Case_ID : TC_41_sysadmin

Scenario: Checking whether we are able to login with created systemadmin crendentials
Given Login into Mobiquity Portal as System admin Created by Master


Scenario: To create System Admin2
Given Login into Mobiquity Portal as Super admin Maker
When Navigate to User Management and click on Register
And Click On System Admin and select Single User
And Enter all required Fields
Then Confirmation message is displayed
Then Logout
Given Login into Mobiquity Portal as Super admin Checker after Logout
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data
And Approve the Users and save loginID2
Then User status is approved
Then Logout
Given Login into Mobiquity Portal as System admin Created by Master2


Scenario: To create System Admins3
Given Login into Mobiquity Portal as Super admin Maker
When Navigate to User Management and click on Register
And Click On System Admin and select Single User
And Enter all required Fields
Then Confirmation message is displayed
Then Logout
Given Login into Mobiquity Portal as Super admin Checker after Logout
When Navigate to Approvals and filter by Submitted status
And User click on submitted user data
And Approve the Users and save loginID3
Then User status is approved
Then Logout
Given Login into Mobiquity Portal as System admin Created by Master3


######################################### Bank Creation ############################################

# Author: Narendra
# Last Updated: /05/2022
# Comments 
# Scenario_ID : 
# TestCase_ID : TC_04

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

Scenario: To verify that System admin is able to Add wallet successfully.
Given Login into Mobiquity Portal as System admin User
When Navigate Multiple Wallet Management and Click on Add Wallet
And Enter Wallet name and click on save

##################################### Domain Creation ################################################


# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_08
# 

Scenario:To verify that System admin should be able to add domain in the system.
Given Login into Mobiquity Portal as System admin Maker
When User Click on Domain Management >> Add Domain
And Enter Domain Name and Domain Code.
Then Click on submit button.

##################################### Category Creation ################################################


# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_09
# 

Scenario:To verify that System admin should be able to add Category in the system.
Given Login into Mobiquity Portal as System admin Maker
And Click Category Management.
Then Select Add Category.
And Enter Category Code and Category Name.
Then Select Domain and Parent Category.
And Click on Submit & confirm button.


# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_10
# 

Scenario:To verify that only System admin will be able to approve/reject the initiated category.
Given Login into Mobiquity Portal as System admin User2
And Click Add category approval.
Then Select Category approval.
Then Select the category that needs to be approved

##################################### Grade Creation ################################################


# Author: Likith R
# Last Updated:
# Comments 
# Test Case_ID : TC_12
# 

Scenario:To verify that Master user can create grade, if all fields in contains value upto their maximum length.
Given Login into Mobiquity Portal as masteradmin Maker
When Click on User Profile Management >> Add Grade
And Select the domain & category for which grade needs to be added.



#######################    Profiles Creation ##########################
 

# Author:Monica
# Last Updated:
# Comments 
# Scenario_ID : TC_143
# 


Scenario:To verify that system admin should be able to add regulatory profile in the system
Given Login into Mobiquity Portal as System admin User
When Navigate to UserManagement And Click on Regulatory Profile
And click on Add Regulatory Profile and Enter Profile Code and Profile Name
Then Click On Save Regulatory Profile

# Author:Monica
# Last Updated:
# Comments 
# Scenario_ID : TC_147
# 


Scenario:To verify that system admin user can Add Marketing Profile.
Given Login into Mobiquity Portal as System admin User
When Navigate to UserManagement And Click on Marketing Profile
And Add Marketing Profile
##################################### TCP Creation ################################################


# Author: Kalyani M
# Last Updated:
# Comments : View
# Test Case_ID : TC_23

Scenario:To verify that master is able to add initiate and  customer level TCP.
Given Login into Mobiquity Portal as Super admin Maker
When  Navigate to Transfer Control Profile
And Click on New Button
And Verify Add Intiation Message for Master

# Author: Kalyani M
# Last Updated:
# Comments : View
# Test Case_ID : TC_23
#

Scenario:To verify that master admin is able to Approve the customer level TCP..
Given Login into Mobiquity Portal as Super admin Checker
When  Navigate to Transfer Control Profile
Then Approve the TCP
Then Verify Success Message for creation of TCP through Master admin

# Author: Kalyani M
# Last Updated:
# Comments  :
# Test Case_ID : TC_24
# 

Scenario:To verify that System admin is able to add initiate and approve instrument level TCP.
Given Login into Mobiquity Portal as System admin User
When  Navigate to Transfer Control Profile and Click on Manage Transfer Level TCP
And   Click on Add New Button
Then  Enter required Fields
And  Click on Create Button
Then Enter all required amount and count
Then Verify Success Message
When Navigate to Transfer Control Profile and Click on Manage Transfer Level TCP
And Click on Instrument Level TCP
Then Verify Add Intiation Message

##################################### Security Profile Creation ################################################

# Author: Chetan.S
# Last Updated: 
# Comments 
# Scenario_ID :
# TC_109

#subscriber
Scenario:To verify that security profiles can be configured in the system for different type of users under different workspaces.
Given Login into Mobiquity Portal as System admin User
When Navigate to Security and click to select security profile
And Click on add profile select user type as subscriber and fill the details
And Fill the details-Subscriber Profile Name
And Fill the details-PasswordRestrictios
And Fill the details-PinRestrictions
And Fill the details-AuthRestrictions
And Fill the details-loginRestrictions
Then Click on add and confirm

#Administrator -- BusinessAdmin
When Navigate to Security and click to select security profile
And Click on add profile select user type as BusinessAdmin and fill the details
And Fill the details-BusinessAdmin Profile Name
And Fill the details-PasswordRestrictios
And Fill the details-AuthRestrictions
And Fill the details-loginRestrictions
Then Click on add and confirm

#Administrator -- CustomercareAdmin
When Navigate to Security and click to select security profile
And Click on add profile select user type as CustomercareAdmin and fill the details
And Fill the details-CustomercareAdmin Profile Name
And Fill the details-PasswordRestrictios
And Fill the details-AuthRestrictions
And Fill the details-loginRestrictions
Then Click on add and confirm

#Business -- Agent - (Pin Present)
When Navigate to Security and click to select security profile
And Click on add profile select user type as Agent and fill the details
And Fill the details-Agent Profile Name
And Fill the details-PasswordRestrictios
And Fill the details-PinRestrictions
And Fill the details-AuthRestrictions
And Fill the details-loginRestrictions
Then Click on add and confirm


#Business -- TelcoOperator --(pin Present)
When Navigate to Security and click to select security profile
And Click on add profile select user type as TelcoOperator and fill the details
And Fill the details-TelcoOperator Profile Name
And Fill the details-PasswordRestrictios
And Fill the details-PinRestrictions
And Fill the details-AuthRestrictions
And Fill the details-loginRestrictions
Then Click on add and confirm

#Business -- ATMMachine
When Navigate to Security and click to select security profile
And Click on add profile select user type as ATMMachine and fill the details
And Fill the details-ATMMachine Profile Name
And Fill the details-PasswordRestrictios
And Fill the details-AuthRestrictions
And Fill the details-loginRestrictions
Then Click on add and confirm

#Business -- HeadMerchant-----(Pin present)
#When Navigate to Security and click to select security profile
#And Click on add profile select user type as HeadMerchant and fill the details
#And Fill the details-HeadMerchant Profile Name
#And Fill the details-PasswordRestrictios
#And Fill the details-PinRestrictions
#And Fill the details-AuthRestrictions
#And Fill the details-loginRestrictions
#Then Click on add and confirm

#Business -- PaymentGateway
#When Navigate to Security and click to select security profile
#And Click on add profile select user type as PaymentGateway and fill the details
#And Fill the details-PaymentGateway Profile Name
#And Fill the details-PasswordRestrictios
#And Fill the details-AuthRestrictions
#And Fill the details-loginRestrictions
#Then Click on add and confirm

#Business -- Biller-(PIN Present)
#When Navigate to Security and click to select security profile
#And Click on add profile select user type as Biller and fill the details
#And Fill the details-Biller Profile Name
#And Fill the details-PasswordRestrictios
#And Fill the details-PinRestrictions
#And Fill the details-AuthRestrictions
#And Fill the details-loginRestrictions
#Then Click on add and confirm

#Business -- Employee-(Pin Present)
#When Navigate to Security and click to select security profile
#And Click on add profile select user type as Employee and fill the details
#And Fill the details-Employee Profile Name
#And Fill the details-PasswordRestrictios
#And Fill the details-PinRestrictions
#And Fill the details-AuthRestrictions
#And Fill the details-loginRestrictions
#Then Click on add and confirm

#Business -- Merchant-(Pin Present)
#When Navigate to Security and click to select security profile
#And Click on add profile select user type as Merchant and fill the details
#And Fill the details-Merchant Profile Name
#And Fill the details-PasswordRestrictios
#And Fill the details-PinRestrictions
#And Fill the details-AuthRestrictions
#And Fill the details-loginRestrictions
#Then Click on add and confirm



#Business -- Distributer---(pin present)
#Given Login into Mobiquity Portal as System admin User
#When Navigate to Security and click to select security profile
#And Click on add profile select user type as Distributer and fill the details
#And Fill the details-Distributer Profile Name
#And Fill the details-PasswordRestrictios
#And Fill the details-PinRestrictions
#And Fill the details-AuthRestrictions
#And Fill the details-loginRestrictions
#Then Click on add and confirm

#Business -- Corporate -- (Pin present)
#When Navigate to Security and click to select security profile
#And Click on add profile select user type as Corporate and fill the details
#And Fill the details-Corporate Profile Name
#And Fill the details-PasswordRestrictios
#And Fill the details-PinRestrictions
#And Fill the details-AuthRestrictions
#And Fill the details-loginRestrictions
#Then Click on add and confirm


#Business -- SuperAgent --(pin present)
#When Navigate to Security and click to select security profile
#And Click on add profile select user type as SuperAgent and fill the details
#And Fill the details-SuperAgent Profile Name
#And Fill the details-PasswordRestrictios
#And Fill the details-PinRestrictions
#And Fill the details-AuthRestrictions
#And Fill the details-loginRestrictions
#Then Click on add and confirm

    #######################   Authorization Profile Creation ##########################

    # # # Author: Sudheer Baraker
    # # # Last Updated: 17/05/2022
    # # # Comments :
    # # # Scenario_ID : TC_149
    # # #

    Scenario: To verify that system admin should be able to add authorization profile
        ### Subscriber ###
        Given Login into Mobiquity Portal as System admin User
        When  Select Authorization profile and add profile
        And  select Subscriber user type and select user role
        Then Fill all Details and Create Subscriber authorization profile
        Then Logout
        Given Login into Mobiquity Portal as another System admin User after logout
        Then User approval for Authorization profile

        # #Administrator -- BusinessAdmin
        When  Select Authorization profile and add profile
        And  select BusinessAdmin user type and select user role
        Then Fill all Details and Create BusinessAdmin authorization profile
        Then Logout
        Given Login into Mobiquity Portal as System admin User after Logout
        Then User approval for Authorization profile

        # # #Administrator -- CustomercareAdmin
        When  Select Authorization profile and add profile
        And  select CustomercareAdmin user type and select user role
        Then Fill all Details and Create CustomercareAdmin authorization profile
        Then Logout
        Given Login into Mobiquity Portal as another System admin User after logout
        Then User approval for Authorization profile

        
        # #Business -- Agent
        When  Select Authorization profile and add profile
        And   select Agent user type and select user role
        Then Fill all Details and Create Agent authorization profile
        Then Logout
        Given Login into Mobiquity Portal as System admin User after Logout
        Then User approval for Authorization profile

        #Business -- TelcoOperator
        When  Select Authorization profile and add profile
        And   select TelcoOperator user type and select user role
        Then Fill all Details and Create TelcoOperator authorization profile
        Then Logout
        Given Login into Mobiquity Portal as another System admin User after logout
        Then User approval for Authorization profile


