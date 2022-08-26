Feature: User Management : Subscriber

    This feature includes registering, Modifying and Approval of Business Admin and
    Customer Support Admin Users by System Admin

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

###################################### Monica ###########################################################

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