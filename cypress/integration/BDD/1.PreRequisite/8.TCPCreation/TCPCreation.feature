Feature: TCP Creation

##################################### TCP Creation ################################################


# Author: Kalyani M
# Last Updated:
# Comments : View
# Test Case_ID : TC_23
@prerequisite

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
@prerequisite

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
@prerequisite

Scenario:To verify that System admin is able to add initiate and approve instrument level TCP.
Given Login into Mobiquity Portal as System admin Maker
When  Navigate to Transfer Control Profile and Click on Manage Transfer Level TCP
And   Click on Add New Button
Then  Enter required Fields
And  Click on Create Button
Then Enter all required amount and count
Then Verify Success Message
When Navigate to Transfer Control Profile and Click on Manage Transfer Level TCP
And Click on Instrument Level TCP
Then Verify Add Intiation Message

