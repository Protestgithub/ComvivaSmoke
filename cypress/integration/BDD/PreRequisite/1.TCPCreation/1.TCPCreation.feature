Feature: TCP Creation

##################################### TCP Creation ################################################
# Author:Monica
# Last Updated:
# Comments 
# Scenario_ID : TC_143
# 

@prerequisite
Scenario:To verify that system admin should be able to add regulatory profile in the system
Given Login into Mobiquity Portal as System admin Maker
When Navigate to UserManagement And Click on Regulatory Profile
And click on Add Regulatory Profile and Enter Profile Code and Profile Name
Then Click On Save Regulatory Profile

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
# Comments : View
# Test Case_ID : TC_23
@prerequisite

Scenario:To verify that master is able to add initiate and  customer level TCP for subscriber.
Given Login into Mobiquity Portal as Super admin Maker
When  Navigate to Transfer Control Profile
And Click on New Button for Subscriber
And Verify Add Intiation Message for Master1

