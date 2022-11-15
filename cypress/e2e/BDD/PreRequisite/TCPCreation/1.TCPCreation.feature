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
Then Verify Add Intiation Message for Master

# Author: Kalyani M
# Last Updated:
# Comments : View
# Test Case_ID : TC_23
#
@prerequisite

Scenario:To verify that master admin is able to Approve the customer level TCP..
Given Login into Mobiquity Portal as Super admin Checker
When  Navigate to Transfer Control Profile
And Approve the TCP
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
Then Verify Add Intiation Message for Master1


# Author: Kalyani M
# Last Updated:
# Comments : View
# Test Case_ID : TC_23
#
@prerequisite

Scenario:To verify that master admin is able to Approve the customer level TCP of subscriber..
Given Login into Mobiquity Portal as Super admin Checker
When  Navigate to Transfer Control Profile
And Approve the TCP1
Then Verify Success Message for creation of TCP through Master admin1


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
And  Enter required Fields
And  Click on Create Button
And Enter all required amount and count
And Verify Success Message
When Navigate to Transfer Control Profile and Click on Manage Transfer Level TCP
And Click on Instrument Level TCP
Then Verify Add Intiation Message

# Author: Kalyani M
# Last Updated:
# Comments  :
# Test Case_ID : TC_24
# 
@prerequisite

Scenario:To verify that System admin is able to add initiate and approve instrument level TCP of subscriber.
Given Login into Mobiquity Portal as System admin Maker
When  Navigate to Transfer Control Profile and Click on Manage Transfer Level TCP
And   Click on Add New Button
And  Enter required Fields for Subscriber domain
And  Click on Create Button
And Enter all required amount and count for Subscriber domain
And Verify Success Message Subscriber domain
When Navigate to Transfer Control Profile and Click on Manage Transfer Level TCP
And Click on Instrument Level TCP1
Then Verify Add Intiation Message for Subscriber domain


################################### Marketing Profile ###################################




# Author:Monica
# Last Updated:
# Comments
# Scenario_ID : TC_147
#
@prerequisite
Scenario:To verify that system admin user can Add Marketing Profile.
Given Login into Mobiquity Portal as System admin Maker
When Navigate to UserManagement And Click on Marketing Profile
And Add Marketing Profile
Then Add Marketing Profile Wholesaler
